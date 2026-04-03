# Memberly Server

Backend API for a gym membership management platform. This service handles authentication, gym creation/setup, invite-based onboarding, and user retrieval using Express + MongoDB.

## Tech Stack

- Node.js (CommonJS)
- Express 5
- MongoDB + Mongoose
- JWT (cookie + bearer support)
- Google OAuth (`google-auth-library`)
- Nodemailer (email invites + password reset)

## High-Level Architecture

- `server.js`
- Loads environment variables and connects to MongoDB.
- Starts Express server.

- `app.js`
- Registers global middleware (`cors`, `cookie-parser`, `express.json`, optional `morgan`).
- Mounts feature routers.
- Handles unknown routes and forwards to global error handler.

- `routes/*`
- Defines endpoint paths and route middleware chain.

- `controllers/*`
- Contains business logic for auth, gym setup, invites, and customer onboarding.

- `models/*`
- Mongoose schemas for users, gyms, invites, memberships, subscriptions, and payments.

- `utils/*`
- Shared helpers: async wrapper, app error class, and email sending.

## Request Lifecycle

1. Request enters Express through `app.js`.
2. Global middleware parses cookies and JSON body.
3. Request is routed to feature router under `/api/...`.
4. Route-level middleware runs (for protected routes: `protect` then `restrictTo`).
5. Controller executes database logic.
6. Success response is returned (JSON and sometimes JWT cookie).
7. Any thrown/async error is forwarded to `errorController`.

## Core Domain Logic

### 1) Owner + Gym Creation

Endpoint: `POST /api/auth/create-gym-owner`

- Uses a MongoDB transaction session.
- Creates gym and owner in one atomic flow.
- Owner is assigned role `owner` and linked to the created gym.
- If any step fails, transaction is rolled back.

### 2) Authentication

#### Local login

Endpoint: `POST /api/auth/login`

- Validates `email` and `password`.
- Loads user with hashed password.
- Rejects local login for Google-only accounts.
- On success, signs JWT and sets `jwt` cookie.

#### Google OAuth login

Endpoints:
- `GET /api/auth/google`
- `GET /api/auth/google/callback`

Flow:
1. Redirect user to Google consent.
2. Exchange callback code for tokens.
3. Verify ID token and extract user profile.
4. Find or create local user.
5. Decide frontend redirect:
- Has gym: `/dashboard`
- No gym: `/setup-gym`
6. Set JWT cookie and redirect.

#### Logout

Endpoint: `GET /api/auth/logout`

- Overwrites auth cookie with a placeholder value.

### 3) Route Protection + Authorization

- `protect` middleware:
- Reads JWT from `Authorization: Bearer ...` or `jwt` cookie.
- Verifies token.
- Loads current user from DB.
- Rejects if user removed or password changed after token issuance.

- `restrictTo(...roles)` middleware:
- Allows route access only for allowed roles.

### 4) Password Reset

#### Forgot password

Endpoint: `POST /api/auth/forgotPassword`

- Finds user by email.
- Blocks reset flow for Google provider accounts.
- Generates random reset token.
- Stores hashed token + expiry (10 min).
- Sends reset URL by email.

#### Reset password

Endpoint: `PATCH /api/auth/resetPassword/:token`

- Hashes incoming token and looks up valid non-expired record.
- Updates password fields.
- Clears reset token metadata.
- Issues fresh JWT.

### 5) Gym Setup + User Retrieval

#### Setup gym

Endpoint: `GET /api/gyms/setup-gym` (protected owner route)

- Intended to create gym data for owner context.
- Protected with `protect` + `restrictTo('owner')`.

#### Get users by gym

Endpoint: `GET /api/gyms/:gymId/users`

- Fetches all users in a gym.
- Optional query filter: `?role=member|coach|owner|...`

### 6) Invite System

#### Create invite

Endpoint: `POST /api/gyms/:gymId/invites/createInvite` (owner only)

- Confirms owner belongs to target gym.
- Validates invite type (`member` or `coach`) and recipient email.
- Generates human-readable invite code.
- Stores active invite with expiration.
- Sends join email with code-based URL.

#### Preview invite

Endpoint: `GET /api/gyms/preview?code=...`

- Verifies invite is active and not expired.
- Returns related gym info.

### 7) Customer Join via Invite

Endpoint: `POST /api/customers/join/:code`

- Finds invite by code.
- Validates expiration and active status.
- Creates member account attached to invite gym.
- Deactivates invite after successful use.
- Returns JWT cookie + token response.

## Data Model Overview

### `User`

Represents owners, coaches, members, and admins.

Important fields:
- `name`, `email`, `role`
- `gymId` (required relation to gym)
- `authProvider` (`local`, `google`, `both`)
- `password` / `passwordConfirm` (required for local/both)
- reset password token/expiry

Methods:
- `correctPassword`
- `passwordChangedAfter`
- `createResetPasswordToken`

### `Gym`

- `name` (unique)
- `owner` (User reference)
- metadata fields like `description`, `createdAt`

### `GymInvite`

- `code`
- `gymId`
- `type` (`member` or `coach`)
- `active`, `expiresAt`

### Other Schemas

- `CoachMember`: relation map between coach and member inside gym.
- `MemberProfile`: member profile container.
- `Subscription`: subscription type + status per member/gym.
- `Payment`: payment linked to member, gym, and subscription.

## API Routes (Current)

### Auth

- `POST /api/auth/create-gym-owner`
- `POST /api/auth/login`
- `GET /api/auth/logout`
- `POST /api/auth/forgotPassword`
- `PATCH /api/auth/resetPassword/:token`
- `GET /api/auth/google`
- `GET /api/auth/google/callback`

### Gyms

- `POST /api/gyms/:gymId/invites/createInvite`
- `GET /api/gyms/preview?code=...`
- `GET /api/gyms/setup-gym`
- `GET /api/gyms/:gymId/users`

### Users

- `GET /api/users/me`

### Customers

- `POST /api/customers/join/:code`

## Error Handling Strategy

- Controllers are wrapped with `catchAsync` to forward promise errors.
- `AppError` is used for operational/business errors.
- Global handler:
- Development: returns stack and full error details.
- Production: returns only safe operational messages.

## Environment Variables

Main variables used by the server:

- `PORT`
- `ENVIRONMENT`
- `DB_URL`
- `DB_PASSWORD`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `FRONTEND_URL`
- `PUBLIC_BACKEND_URL`
- `EMAIL_HOST`
- `EMAIL_PORT`
- `EMAIL_USER`
- `EMAIL_PASSWORD`

## Local Run

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables in `config.env`.

3. Start development server:

```bash
npm start
```

Server starts on `http://localhost:3000` by default.

## Current Status Notes

- Some modules are scaffolded and not fully wired yet (`MemberProfile`, payments/subscriptions endpoints).
- Several response and method naming inconsistencies exist; they can be normalized in a cleanup pass.
- `config.env` currently contains sensitive values and should be rotated and excluded from shared history for security.

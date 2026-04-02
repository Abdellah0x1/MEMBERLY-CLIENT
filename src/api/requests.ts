import type { LoginPayload, OwnerSingupPayload, MemberSingupPayload } from "../types/auth";
import api from "./axios";


//auth
export const createOwner = async (data: OwnerSingupPayload) => api.post('/auth/create-gym-owner', data);
export const login = async (data: LoginPayload) => api.post('/auth/login', data);
export const getMe = async ()=> api.get('/users/me');
export const logout = async ()=> api.get('/auth/logout');
export const googleLogin = async ()=> api.get('/auth/google');
export const forgotPassword = async (email:string) => api.post('/auth/forgotPassword', { email })
export const resetPassword = async (token: string, newPassword : string, newPasswordConfirm: string) => api.patch(`/auth/resetPassword/${token}`,{password:newPassword,passwordConfirm:newPasswordConfirm})

//gyms
export const previewGym = async (code: string | undefined) => api.get(`/gyms/preview?code=${code}`);
export const setupGym = async (gymPayload: {
    gymName: string,
    description: string,
    address: string
}
    
) => api.post('/gyms/setup-gym', gymPayload)

//invite
export const inviteMember = async (email :string, gymId: string) => api.post(`/gyms/${gymId}/invites/createInvite`, {to: email})

//members
export const addMember = async (member : MemberSingupPayload, inviteCode: string) => api.post(`/customers/join/${inviteCode}`,member);


//users
export const getUsersByRole = async (role: string,gymId: string | undefined) => api.get(`/gyms/${gymId}/users?role=${role}`)
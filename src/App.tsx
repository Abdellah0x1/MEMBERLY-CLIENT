import type React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Layout from "./pages/Layout"
import Home from "./pages/Home"
import Login from "./pages/Auth/Login"
import ForgotPassword from "./pages/Auth/ForgotPassword"
import Signup from "./pages/Auth/Signup"

import { ToastContainer } from 'react-toastify';
import { ProtectedRoute } from "./components/ProtectedRoute"
import Dashboard from "./pages/GymOwner/Dashboard"
import Members from "./pages/GymOwner/Members"
import Coaches from "./pages/GymOwner/Coaches"
import Settings from "./pages/GymOwner/Settings"
import Subscriptions from "./pages/GymOwner/Subscriptions"
import ResetPassword from "./pages/Auth/ResetPassword"
import JoinGym from "./pages/gym/JoinGym"

function App(): React.JSX.Element {
  

  return (
    <BrowserRouter>
      <ToastContainer position='top-center' theme="dark"/>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
        </Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/forgotPassword" element={<ForgotPassword/>}/>
        <Route element={<ProtectedRoute allowedRoles={["owner"]}/>}>
        <Route path="/dashboard" element={<Dashboard/>}>
          <Route path="members" element={<Members/>}/>
          <Route path="coaches" element={<Coaches/>}/>
          <Route path="settings" element={<Settings/>}/>
          <Route path="subscriptions" element={<Subscriptions/>}/>
        </Route>
      </Route>
      <Route path="/resetPassword/:token" element={<ResetPassword/>}/>
      <Route path="/joingym/:code" element={<JoinGym/>}/>
      </Routes>
      
        
      
    </BrowserRouter>
  )
}

export default App

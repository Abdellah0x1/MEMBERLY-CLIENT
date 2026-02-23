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
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Route>
      </Routes>
      
        
      
    </BrowserRouter>
  )
}

export default App

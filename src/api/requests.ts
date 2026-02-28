import type { LoginPayload, OwnerSingupPayload } from "../types/auth";
import api from "./axios";



export const createOwner = async (data: OwnerSingupPayload) => api.post('/auth/create-gym-owner', data);
export const login = async (data: LoginPayload) => api.post('/auth/login', data);
export const getMe = async ()=> api.get('/users/me');
export const logout = async ()=> api.get('/auth/logout');
export const googleLogin = async ()=> api.get('/auth/google');
export const forgotPassword = async (email:string) => api.post('/auth/forgotPassword', { email })
export const resetPassword = async (token: string, newPassword : string, newPasswordConfirm: string) => api.patch(`/auth/resetPassword/${token}`,{password:newPassword,passwordConfirm:newPasswordConfirm})
import { type ReactNode, createContext } from "react";
import {type User} from "../types/auth"

export type AuthContextValue = {
    user: User | null,
    isLoading: boolean,
    logout: () => void,
    reload: ()=> Promise<void>
}

export type AuthProviderProps = {
    children : ReactNode
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined) 

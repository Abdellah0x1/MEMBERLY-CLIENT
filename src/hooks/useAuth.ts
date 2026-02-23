import { useContext } from "react"
import { type AuthContextValue, AuthContext } from "../context/authContext"


export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext)
    if(!context) throw new Error('useAuth must be used inside the AuthContextProvider')

    return context
}
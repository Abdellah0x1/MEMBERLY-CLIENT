import React, { useEffect, useMemo, useState} from "react";
import {type User} from "../types/auth"
import { getMe, logout as LogoutApi } from "../api/requests";

import { type AuthContextValue,type AuthProviderProps } from "./authContext";
import { AuthContext } from "./authContext";





export function AuthProvider({children} : AuthProviderProps ): React.JSX.Element{
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    async function loadSession(){
            try {
                setIsLoading(true)
                const res = await getMe();
                setUser(res.data.data.user);
                setIsLoading(false)
            }catch(e){
                console.log(e);
                setUser(null)
            }finally{
                setIsLoading(false)
            }
        }

    useEffect(()=>{
        loadSession();
    },[])

    function logout():void{
        LogoutApi();
        setUser(null);
    }

    const value: AuthContextValue = useMemo(()=> ({user,logout,isLoading, reload: loadSession}), [user,isLoading])
    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}







import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./Spinner";

export const ProtectedRoute = ({allowedRoles}: {allowedRoles: string[]}) =>{
    const {user,isLoading} = useAuth();

    if (isLoading) {
        return <div className="flex min-h-screen items-center justify-center bg-black text-white">
            <Spinner size="lg" />
        </div>
    }

    if(!user) return <Navigate to="/login" replace/>

    if(!allowedRoles.includes(user.role)) return <Navigate to='/unauthorized' replace/>;

    return <div>
        <Outlet></Outlet>
    </div>
}


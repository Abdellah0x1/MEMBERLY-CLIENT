import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({allowedRoles}: {allowedRoles: [string]}) =>{
    const {user} = useAuth();
    

    if(!user) return <Navigate to="/login" replace/>

    if(!allowedRoles.includes(user.role)) return <Navigate to='/unauthorized' replace/>;

    return <div>
        <Outlet></Outlet>
    </div>
}


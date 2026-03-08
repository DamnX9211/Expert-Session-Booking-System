import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children}) {
    const { user } = useAuth();

    if(!user) {
        return <Navigate to ="/login" />

    }
    if(user.role !== "expert" ){
        return <Navigate to ="/"  />
    }
    return children;
}
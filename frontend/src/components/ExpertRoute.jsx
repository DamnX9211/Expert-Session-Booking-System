import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ExpertRoute({ children}) {
    const { user } = useAuth();

    if(!user) {
        return <Navigate to ="/login" />

    }
    if(user.role !== "expert" ){
        return <Navigate to ="/"  />
    }

    if(user.status !== "approved"){
        return <Navigate to ="/pending-approval"  />
    }
    return children;
}
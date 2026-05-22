import { Navigate } from "react-router-dom"
import { useAuth } from "../hook/useAuth"

function AdminProtectedRoute({ children }) {

    const { user } = useAuth()

    if(!user){return null}
   
    if(user.role != "ADMIN"){
       return  <Navigate to="/"/>
    }
    return children
}

export default AdminProtectedRoute
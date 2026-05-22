import { useAuth } from "../hook/useAuth.jsx"
import { Navigate } from "react-router-dom"

function TrainerProtectedRoute({ children }) {
  const { user } = useAuth()

  if(!user){return null}
   
   if(user.role != "TRAINER"){
    return <Navigate to="/"></Navigate>
   }

   return children
    
}

export default TrainerProtectedRoute
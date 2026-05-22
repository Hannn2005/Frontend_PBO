import axios from "axios"
import { useAuth } from "../../hook/useAuth.jsx"
import { useNavigate } from "react-router-dom"


function CustomerDashboard(){

    const {user,setUser} = useAuth()
    const navigate = useNavigate()

    async function handleLogout(){
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/logout`,"",{withCredentials:true})

            if(!res){return console.log("logout failed")}

            setUser(null)

            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return(
      <>
        <div>
            <div className="flex flex-col">
                <h1>{user?.username}</h1>
                <h1>{user?.email}</h1>

            </div>
            <button className="bg-red-500 p-3 text-white " onClick={()=>handleLogout()}>Logout</button>
        </div>
      
      </>
    )
}

export default CustomerDashboard

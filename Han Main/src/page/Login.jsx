import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hook/useAuth"


function Login() {

    const [input,setInput] = useState({})
    const navigate = useNavigate()
    const {setUser} = useAuth()

    async function handleLogin(){
       try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/login`,{
                email:input.email,
                password:input.password
            },{withCredentials:true})

            if(!res){console.log("login failed")}
            
            setUser(res.data)

            navigate("/")
       } catch (error) {
            console.log(error)
       }
    }

    return (
        <>
            <h1 className="p-10 font-bold text-2xl">Login Pages</h1>
            <input type="text" name="email" placeholder="user@gmail.com" onChange={(e)=>setInput(prev=>({...prev,[e.target.name] : e.target.value}))} value={input.email || ""}/>
            <input type="text" name="password" placeholder="password" onChange={(e)=>setInput(prev=>({...prev,[e.target.name] : e.target.value}))} value={input.password || ""}/>
            <button onClick={()=>handleLogin()}>Login</button>
        </>
    )
}

export default Login
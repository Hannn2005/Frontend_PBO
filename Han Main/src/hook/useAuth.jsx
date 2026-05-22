import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";


export const UseAuthContext = createContext()


function AuthContext ({children}){

    const [user,setUser] = useState(null)

    useEffect(()=>{
        async function getUserInfo() {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/user/dashboard`,{withCredentials:true})
                
                if(!res){return console.log("user not login yet")}
                
                console.log(res.data)
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        getUserInfo()

    },[])


   return(
        <UseAuthContext.Provider value={{user,setUser}}>
            {children}
        </UseAuthContext.Provider>
   ) 
}

export default AuthContext

export const useAuth = ()=> useContext(UseAuthContext)


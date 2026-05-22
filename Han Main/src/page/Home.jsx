import { useContext, useState } from "react"
import {useAuth} from "../hook/useAuth.jsx"
import FailedModal from "../component/FailedModal.jsx"
import SuccessModal from "../component/SuccessModal.jsx"


function Home() {

    const {user} = useAuth()

   
    const [openFailed,setOpenFailed] = useState(false)
    const [openSuccess,setOpenSuccess] = useState(false)

    console.log(user)

    
    return (
      <h1>
     

        {
            openFailed && <FailedModal message={"login failed"}  onClose={()=>setOpenFailed(false)}></FailedModal>
        }



        {
            openSuccess && <SuccessModal message={"login success"}  onClose={()=>setOpenSuccess(false)}></SuccessModal>
        }

        <button className="button" onClick={()=>setOpenFailed(true)}>open failed</button>
         <button className="button" onClick={()=>setOpenSuccess(true)}>open success</button>


         
      </h1>
    )
}

export default Home
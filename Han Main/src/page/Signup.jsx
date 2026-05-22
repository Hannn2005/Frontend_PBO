import axios from "axios"
import { useState } from "react"

function Signup() {
    const [input, setInput] = useState({})
    const [loading,setLoading] = useState(false)

    function handleChange(e) {
        const { name, value } = e.target
        setInput({ ...input, [name]: value })
    }

    async function handleSubmit() {
        try {
            setLoading(true)
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/user/signup`,input)

            if(!res){return console.log(res.status)}

            console.log(res.status)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
            setInput({})
        }
    }

    return (
        <>
            <div className="xl:m-10 xl:flex xl:flex-col
            xl:justify-center
            xl:items-center
            xl:gap-2 form__bg xl:w-xl bg-white">
                <h1 className="font-bold text-2xl">Signup Pages</h1>
                <div className="flex flex-col gap-3">
                    <input className="input__white"
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={(e) => handleChange(e)} 
                         value={input.username || ""}/>
                    <input className="input__white"
                        type="text"
                        placeholder="User@gmail.com"
                        name="email"
                        onChange={(e) => handleChange(e)} 
                        value={input.email || ""}/>
                    <input className="input__white"
                        type="password"
                        placeholder="Password" 
                        name="password"
                        onChange={(e) => handleChange(e)}
                        value={input.password || ""} />
                </div>
                <button className="button text-xl" onClick={() => handleSubmit()} disabled={loading}>
                    {
                        loading ? "Signing In" : "Signup"
                    }
                </button>
            </div>
        </>
    )
}

export default Signup
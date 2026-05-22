import { Link } from "react-router-dom"
import { useAuth } from "../hook/useAuth.jsx"

function Navbar() {

    const { user } = useAuth()

    console.log(user)
    return (
        <div className="flex justify-between py-5 px-10">
            <div>
                <div>
                    RogerGym
                </div>
            </div>

            <div>
                <ul className="flex gap-5">
                    <Link to="/">Home</Link>
                    <Link to="/class">Class</Link>

                    {
                        !user && <>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </>
                    }
                    {
                        user && <Link to="/dashboard">Dashboard</Link>
                    }

                </ul>
            </div>
        </div>
    )
}

export default Navbar
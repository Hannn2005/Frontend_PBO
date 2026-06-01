import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import axios from 'axios';
import { useState } from 'react';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API}/user/logout`, {}, { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error(error);
      setUser(null);
      navigate('/');
    }finally{
      setMobile(prev=>!prev)
    }
  };

  return (
    <>
      <nav className="bg-red-700 border-b border-red-800 px-8 py-4 sticky top-0 z-50 shadow-lg font-sans">

        {/* device medium - desktop */}
        <div className='md:flex justify-between hidden'>

          <Link to="/" className="text-2xl font-black tracking-widest text-white hover:scale-105 transition-transform duration-300">
            ROGER<span className="text-black">GYM</span>
          </Link>

          <div className="flex space-x-8 items-center">

            <Link to="/" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
              Home
            </Link>


            {
              (user?.role != "ADMIN") && (user?.role != "TRAINER") && (<>
                <Link to="/class" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
                  Jadwal
                </Link>
              </>)
            }

            {user ? (
              <div className="flex space-x-6 items-center">
                {user.role === 'CUSTOMER' && (
                  <Link to="/dashboard" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
                    Dashboard
                  </Link>
                )}

                {user.role === 'ADMIN' && (
                  <Link to="/admin" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
                    Dashboard
                  </Link>
                )}

                {user.role === 'TRAINER' && (
                  <Link to="/trainer" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
                    Dashboard
                  </Link>
                )}

                <button
                  onClick={() => handleLogout()}
                  className="ml-2 px-4 py-2 border-2 border-white/70 text-white rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-red-700 hover:border-white transition-all duration-300 shadow-sm"
                >
                  Logout
                </button>
              </div>
            ) : (

              <>
                <Link to="/login" className="ml-2 px-4 py-2 border-2 border-white/70 text-white rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-red-700 hover:border-white transition-all duration-300 shadow-sm">
                  Login
                </Link>

                <Link to="/signup" className="ml-2 px-4 py-2 border-2 border-white/70 text-white rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-red-700 hover:border-white transition-all duration-300 shadow-sm">
                  Signup
                </Link>
              </>


            )}

          </div>
        </div>




        <div className='md:hidden flex justify-between'>
          <Link to="/" className="text-2xl font-black tracking-widest text-white hover:scale-105 transition-transform duration-300">
            ROGER<span className="text-black">GYM</span>
          </Link>

          <div className='flex items-center'>
            <button onClick={() => setMobile(prev => !prev)}>

              {
                mobile ? (<>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </>) : (<>

                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>
                </>)
              }

            </button>

          </div>
        </div>


      </nav>

      {/* Mobile */}

      {
        mobile &&
        <div className='md:hidden'>
          <div className=' bg-red-800 text-white'>
            <div className='flex flex-col items-end px-8 py-4 gap-5'>
              <button onClick={() => setMobile(prev => !prev)}>
                <Link to="/" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide" >
                  Home
                </Link>
              </button>


             
                {
                  (user?.role != "ADMIN") && (user?.role != "TRAINER") && (<>

                   <button onClick={() => setMobile(prev => !prev)}>
                    <Link to="/class" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
                      Jadwal
                    </Link>
                    </button>
                    
                  </>)
                }
            




              {
                user ? (<>

                  {user.role === 'CUSTOMER' && (

                    <button onClick={() => setMobile(prev => !prev)}>
                      <Link to="/dashboard" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
                        Dashboard
                      </Link>
                    </button>

                  )}

                  {user.role === 'ADMIN' && (

                    <button onClick={() => setMobile(prev => !prev)}>
                      <Link to="/admin" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
                        Dashboard
                      </Link>
                    </button>
                  )}

                  {user.role === 'TRAINER' && (
                    <button onClick={() => setMobile(prev => !prev)}>
                      <Link to="/trainer" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
                        Dashboard
                      </Link>
                    </button>
                  )}

                  <button
                    onClick={() => handleLogout()}
                    className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide"
                  >
                    Logout
                  </button>
                </>) : (<>

                  <button onClick={() => setMobile(prev => !prev)}>

                    <Link to="/login" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
                      Login
                    </Link>

                  </button>

                  <button onClick={() => setMobile(prev => !prev)}>

                    <Link to="/signup" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
                      Signup
                    </Link>

                  </button>

                </>)
              }






            </div>
          </div>
        </div>

      }



    </>
  );
};

export default Navbar;
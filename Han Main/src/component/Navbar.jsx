import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import axios from 'axios';

const Navbar = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8080/user/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error(error);
      setUser(null);
      navigate('/');
    }
  };

  return (
    <nav className="bg-red-700 border-b border-red-800 px-8 py-4 sticky top-0 z-50 shadow-lg font-sans">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        
        <Link to="/" className="text-2xl font-black tracking-widest text-white hover:scale-105 transition-transform duration-300">
          ROGER<span className="text-black">GYM</span>
        </Link>

        <div className="flex space-x-8 items-center">
          
          {!user && (
            <Link to="/" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
              Home
            </Link>
          )}

          {user?.role === 'CUSTOMER' && (
            <Link to="/class" className="text-white hover:text-black transition duration-300 text-sm font-bold uppercase tracking-wide">
              Jadwal
            </Link>
          )}

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
                onClick={handleLogout} 
                className="ml-2 px-4 py-2 border-2 border-white/70 text-white rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-red-700 hover:border-white transition-all duration-300 shadow-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="ml-2 px-4 py-2 border-2 border-white/70 text-white rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white hover:text-red-700 hover:border-white transition-all duration-300 shadow-sm">
              Login
            </Link>
          )}
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
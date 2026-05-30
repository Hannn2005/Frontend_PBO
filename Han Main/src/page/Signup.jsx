import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post(`${import.meta.env.VITE_API}/user/signup`, {
        username,
        email,
        password,
        role
      });
      navigate('/login');
    } catch (err) {
      setError(err.response?.data || 'Gagal mendaftar akun.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 font-sans">
      <div className="max-w-md w-full bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wider">
          DAFTAR <span className="text-red-600">GYM</span>
        </h2>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded mb-6 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition duration-300"
              required
            />
          </div>

          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:border-red-600 transition duration-300"
                required
              />
             <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-800 hover:text-black focus:outline-none transition-colors"
                >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 text-sm font-medium mb-2">Daftar Sebagai</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition duration-300"
            >
              <option value="CUSTOMER">Member Gym (Customer)</option>
              <option value="TRAINER">Pelatih (Trainer)</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition duration-300 mt-4 tracking-widest"
          >
            DAFTAR SEKARANG
          </button>
        </form>

        <p className="text-zinc-400 text-center mt-6 text-sm">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-red-600 hover:text-red-500 transition duration-300 font-medium">
            Masuk di sini
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
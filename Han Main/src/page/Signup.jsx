import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:8080/user/signup', {
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
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition duration-300"
              required
            />
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
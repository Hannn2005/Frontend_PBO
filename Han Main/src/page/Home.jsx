import { Link } from 'react-router-dom';
import BmiCalculator from '../component/BmiCalculator';
import TrainerGallery from '../component/TrainerGallery';

const Home = () => {
  return (
    <div className="bg-black font-sans">
      
      <div 
        className="min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20 pb-16 relative overflow-hidden"
       style={{
         backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.8)), url('https://i.imgur.com/ljK4waf.jpeg')`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col items-center justify-center text-center px-4 relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            BENTUK VERSI TERBAIK <br /><span className="text-red-600">DIRIMU</span>
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mb-10">
            Fasilitas premium, pelatih profesional, dan komunitas yang solid. Mulai transformasi nyata tubuhmu hari ini juga.
          </p>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/class" className="bg-red-600 text-white font-bold px-8 py-4 rounded-lg hover:bg-red-700 transition duration-300 text-lg shadow-lg shadow-red-600/20 tracking-wide uppercase text-sm">
              Jelajahi Kelas
            </Link>
            <Link to="/signup" className="bg-transparent border border-white text-white font-bold px-8 py-4 rounded-lg hover:border-red-600 hover:text-red-500 transition duration-300 text-lg tracking-wide uppercase text-sm">
              Bergabung Sekarang
            </Link>
          </div>
        </div>
      </div>

      <BmiCalculator />
      <TrainerGallery />

      <div className="py-24 bg-black">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-16 tracking-wider">
            PILIHAN <span className="text-red-600">MEMBERSHIP</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
       
            <div className="group bg-zinc-900 border-2 border-zinc-800 p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-4 hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/20 cursor-pointer">
              <h3 className="text-white text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-red-500">Harian</h3>
              <p className="text-4xl font-black text-red-600 mb-6">Rp 50K</p>
              <ul className="text-zinc-400 space-y-4 mb-8 text-sm text-left">
                <li className="flex items-center">✓ Akses semua alat berat</li>
                <li className="flex items-center">✓ Loker harian</li>
                <li className="flex items-center">✓ Fasilitas kamar mandi</li>
              </ul>
              <Link to="/signup" className="block w-full border border-zinc-700 text-white py-3 rounded-lg transition-all duration-300 font-bold text-sm tracking-widest text-center group-hover:bg-red-600 group-hover:border-red-600">
                PILIH PAKET
              </Link>
            </div>
         
            <div className="group bg-zinc-900 border-2 border-zinc-800 p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-4 hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/20 cursor-pointer relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-zinc-400 text-xs font-bold px-4 py-1 rounded-full tracking-widest transition-colors duration-300 group-hover:bg-red-600 group-hover:text-white border border-zinc-700 group-hover:border-red-600">
                TERPOPULER
              </div>
              <h3 className="text-white text-xl font-bold mb-2 mt-2 transition-colors duration-300 group-hover:text-red-500">Bulanan</h3>
              <p className="text-4xl font-black text-red-600 mb-6">Rp 350K</p>
              <ul className="text-zinc-400 space-y-4 mb-8 text-sm text-left font-medium transition-colors duration-300 group-hover:text-zinc-300">
                <li className="flex items-center">✓ Semua fitur paket Harian</li>
                <li className="flex items-center">✓ Akses kelas aerobik & yoga</li>
                <li className="flex items-center">✓ Konsultasi trainer (1x)</li>
              </ul>
              <Link to="/signup" className="block w-full border border-zinc-700 text-white py-3 rounded-lg transition-all duration-300 font-bold text-sm tracking-widest text-center group-hover:bg-red-600 group-hover:border-red-600">
                PILIH PAKET
              </Link>
            </div>
            
            <div className="group bg-zinc-900 border-2 border-zinc-800 p-8 rounded-2xl transform transition-all duration-300 hover:-translate-y-4 hover:border-red-600 hover:shadow-2xl hover:shadow-red-600/20 cursor-pointer">
              <h3 className="text-white text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-red-500">Tahunan</h3>
              <p className="text-4xl font-black text-red-600 mb-6">Rp 3.5M</p>
              <ul className="text-zinc-400 space-y-4 mb-8 text-sm text-left">
                <li className="flex items-center">✓ Semua fitur paket Bulanan</li>
                <li className="flex items-center">✓ Bebas booking semua kelas</li>
                <li className="flex items-center">✓ Gratis merchandise gym</li>
              </ul>
              <Link to="/signup" className="block w-full border border-zinc-700 text-white py-3 rounded-lg transition-all duration-300 font-bold text-sm tracking-widest text-center group-hover:bg-red-600 group-hover:border-red-600">
                PILIH PAKET
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
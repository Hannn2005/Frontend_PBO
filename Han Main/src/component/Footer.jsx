import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-red-900 pt-16 pb-8 font-sans">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div>
          <Link to="/" className="text-3xl font-black tracking-widest text-white mb-6 inline-block">
            ROGER<span className="text-red-600">GYM</span>
          </Link>
          <p className="text-zinc-400 text-sm leading-relaxed pr-4">
            Pusat kebugaran nomor satu dengan fasilitas paling modern. Bergabunglah dengan komunitas kami, mari latih kemampuanmu dan wujudkan bentuk tubuh impianmu.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-bold tracking-widest uppercase mb-6">Tautan Cepat</h4>
          <ul className="space-y-3">
            <li><Link to="/" className="text-zinc-400 hover:text-red-500 transition text-sm">Home</Link></li>
            <li><Link to="/class" className="text-zinc-400 hover:text-red-500 transition text-sm">Jadwal Kelas</Link></li>
            <li><Link to="/login" className="text-zinc-400 hover:text-red-500 transition text-sm">Login Member</Link></li>
            <li><Link to="/signup" className="text-zinc-400 hover:text-red-500 transition text-sm">Daftar Baru</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold tracking-widest uppercase mb-6">Hubungi Kami</h4>
          <ul className="space-y-3 text-sm text-zinc-400">
            <li className="flex items-start">
              <span className="text-red-600 mr-3">📍</span> 
              Jl. Setiabudi No. 123, Medan, Sumatera Utara
            </li>
            <li className="flex items-center">
              <span className="text-red-600 mr-3">📞</span> 
              +62 812 3456 7890
            </li>
            <li className="flex items-center">
              <span className="text-red-600 mr-3">✉️</span> 
              support@rogergym.com
            </li>
          </ul>
        </div>
      </div>
      
      <div className="border-t border-zinc-900 pt-8 text-center">
        <p className="text-zinc-600 text-xs tracking-wider uppercase">
          &copy; {new Date().getFullYear()} ROGERGYM. Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
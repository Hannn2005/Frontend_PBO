import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hook/useAuth';

const CustomerDashboard = () => {
  const [myClasses, setMyClasses] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:8080/user/dashboard', { withCredentials: true })
      .then(res => setMyClasses(res.data.bookedClasses || []))
      .catch(err => console.error(err));
  }, []);

  const handleCancelBooking = async (bookingId) => {
    const isConfirmed = window.confirm("Apakah kamu yakin ingin membatalkan booking kelas ini?");
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`http://localhost:8080/api/bookings/${bookingId}`, { 
        withCredentials: true 
      });
      
      alert(response.data.message || "Booking berhasil dibatalkan!");
      
      setMyClasses(prevClasses => prevClasses.filter(item => item.id !== bookingId));
      
    } catch (error) {
      alert(error.response?.data?.message || "Gagal membatalkan booking.");
    }
  };
  // =================================================================

  return (
    <div className="bg-black min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
          Halo, <span className="text-red-600">{user?.username || 'Member'}</span>
        </h2>
        <p className="text-zinc-400 mb-8">Ini adalah daftar kelas yang sudah kamu ambil, kamu harus menunggu persetujuan dari admin untuk bisa masuk ke kelas.</p>

        {myClasses.length === 0 ? (
          <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center shadow-lg">
            <p className="text-zinc-400">Kamu belum membooking kelas apapun.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myClasses.map((item, index) => (
              <div key={item.id || index} className="bg-zinc-900 p-6 rounded-xl border border-red-600/30 flex justify-between items-center shadow-lg">
                <div>
                  <h3 className="text-xl font-bold text-white">{item.serviceName}</h3>
                  <p className="text-zinc-400 text-sm mt-1">{item.dayOfWeek}, {item.startTime} - {item.endTime}</p>
                </div>
                <div className="flex flex-col items-end gap-3">
                  
                  {item.status === 'APPROVED' ? (
                    <span className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase">
                      ● APPROVED
                    </span>
                  ) : (
                    <span className="bg-amber-500/10 border border-amber-500/50 text-amber-500 px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase animate-pulse">
                      ○ PENDING
                    </span>
                  )}

                  <button 
                    onClick={() => handleCancelBooking(item.id)}
                    className="text-xs font-bold text-zinc-500 hover:text-red-500 transition-colors uppercase tracking-wider underline underline-offset-4 decoration-zinc-700 hover:decoration-red-500"
                  >
                    Batalkan
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hook/useAuth';

const CustomerDashboard = () => {
  const [myClasses, setMyClasses] = useState([]);
  const { user } = useAuth();

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:8080/user/dashboard', { withCredentials: true });
      setMyClasses(res.data.bookedClasses || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const deleteBooking = async (bookingId) => {
    if (!window.confirm("Hapus riwayat kelas yang ditolak ini?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/bookings/delete/${bookingId}`, { withCredentials: true });
      fetchBookings(); // Refresh data
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus.");
    }
  };

  return (
    <div className="bg-black min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
          Halo, <span className="text-red-600">{user?.username || 'Member'}</span>
        </h2>
        <p className="text-zinc-400 mb-8">Ini adalah daftar kelas yang sudah kamu booking.</p>

        {myClasses.length === 0 ? (
          <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center shadow-lg">
            <p className="text-zinc-400">Kamu belum membooking kelas apapun.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {myClasses.map((item) => (
              <div key={item.id} className="relative bg-zinc-900 p-6 rounded-xl border border-zinc-800 flex justify-between items-center shadow-lg hover:border-zinc-700 transition">
                
                {item.status === 'REJECTED' && (
                  <button 
                    onClick={() => deleteBooking(item.id)}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-red-600 font-bold px-2"
                  >
                    X
                  </button>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white">{item.serviceName}</h3>
                  <p className="text-zinc-400 text-sm mt-1">{item.dayOfWeek}, {item.startTime} - {item.endTime}</p>
                </div>


                <span className={`px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase border ${
                  item.status === 'PENDING' ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500' :
                  item.status === 'APPROVED' ? 'bg-green-500/10 border-green-500/50 text-green-400' :
                  'bg-red-500/10 border-red-500/50 text-red-500'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
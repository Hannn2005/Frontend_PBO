import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hook/useAuth';

const TrainerDashboard = () => {
  const [mySchedules, setMySchedules] = useState([]);
  const { user } = useAuth(); 

  useEffect(() => {
    const fetchMySchedules = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/classes', { withCredentials: true });
        
        const filteredSchedules = res.data.filter(item => item.trainerName === user?.username);
        
        setMySchedules(filteredSchedules);
      } catch (error) {
        console.error("Gagal mengambil data jadwal:", error);
      }
    };

    if (user?.username) {
      fetchMySchedules();
    }
  }, [user]); 

  return (
    <div className="bg-black min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
          Jadwal <span className="text-red-600">Pelatih</span>
        </h2>
        <p className="text-zinc-400 mb-8">
          Selamat datang, <span className="text-white font-bold">{user?.username || 'Coach'}</span>! Berikut adalah jadwal kelas yang harus kamu pimpin.
        </p>

        {mySchedules.length === 0 ? (
          <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center shadow-lg">
            <p className="text-zinc-400">Saat ini kamu belum memiliki jadwal kelas untuk diajar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mySchedules.map((item) => (
              <div key={item.id} className="bg-zinc-900 p-6 rounded-xl border border-red-600/30 flex flex-col justify-between shadow-lg hover:border-red-500 transition-colors">
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-1">{item.serviceName}</h3>
                  <div className="w-10 h-1 bg-red-600 mb-4 rounded-full"></div>
                  
                  <div className="space-y-2 text-sm">
                    <p className="text-zinc-400">
                      Hari: <span className="text-white font-medium ml-2">{item.dayOfWeek}</span>
                    </p>
                    <p className="text-zinc-400">
                      Waktu: <span className="text-white font-medium ml-2">{item.startTime} - {item.endTime}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">Status:</span>
                  <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded text-xs font-bold tracking-widest uppercase border border-red-500/30">
                    KELAS ANDA
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default TrainerDashboard;
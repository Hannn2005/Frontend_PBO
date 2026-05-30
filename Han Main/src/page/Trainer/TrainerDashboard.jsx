import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hook/useAuth';

const TrainerDashboard = () => {
  const [mySchedules, setMySchedules] = useState([]);
  const [myMembers, setMyMembers] = useState([]);
  const { user } = useAuth(); 
  const token = user?.token || user?.accessToken || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { 'Authorization': `Bearer ${token}` },
          withCredentials: true
        };
        const resClasses = await axios.get(`${import.meta.env.VITE_API}/api/classes`, config);
        const filteredSchedules = resClasses.data.filter(item => item.trainerName === user?.username);
        setMySchedules(filteredSchedules);
        const resMembers = await axios.get(`${import.meta.env.VITE_API}/api/trainer/bookings`, config);
        setMyMembers(resMembers.data);

      } catch (error) {
        console.error("Gagal mengambil data server:", error);
      }
    };

    if (user?.username) {
      fetchData();
    }
  }, [user, token]); 
  const getMembersForClass = (classId) => {
    return myMembers.filter(member => member.classId === classId);
  };

  return (
    <div className="bg-black min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
          Jadwal <span className="text-red-600">Pelatih</span>
        </h2>
        <p className="text-zinc-400 mb-8">
          Selamat datang, <span className="text-white font-bold">{user?.username || 'Coach'}</span>! Berikut adalah jadwal kelas dan daftar peserta yang harus kamu pimpin.
        </p>

        {mySchedules.length === 0 ? (
          <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 text-center shadow-lg">
            <p className="text-zinc-400">Saat ini kamu belum memiliki jadwal kelas untuk diajar.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mySchedules.map((item) => {
              const classMembers = getMembersForClass(item.id);

              return (
                <div key={item.id} className="bg-zinc-900 p-6 rounded-xl border border-red-600/30 flex flex-col justify-between shadow-lg hover:border-red-500 transition-colors">
                  
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1">{item.serviceName}</h3>
                    <div className="w-10 h-1 bg-red-600 mb-4 rounded-full"></div>
                    
                    <div className="space-y-2 text-sm mb-6 pb-6 border-b border-zinc-800">
                      <p className="text-zinc-400">
                        Hari: <span className="text-white font-medium ml-2">{item.dayOfWeek}</span>
                      </p>
                      <p className="text-zinc-400">
                        Waktu: <span className="text-white font-medium ml-2">{item.startTime} - {item.endTime}</span>
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-red-600 mb-3 tracking-wider flex justify-between">
                        DAFTAR PESERTA 
                        <span className="bg-red-600/20 text-red-500 px-2 py-0.5 rounded-full text-xs">
                          {classMembers.length} Orang
                        </span>
                      </h4>
                      
                      {classMembers.length > 0 ? (
                        <ul className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                          {classMembers.map((member, idx) => (
                            <li key={idx} className="bg-black/50 p-2 rounded border border-zinc-800 flex justify-between items-center text-sm">
                              <span className="text-zinc-300 font-medium">{member.memberName}</span>
                              <span className="text-emerald-500 text-xs font-bold bg-emerald-500/10 px-2 py-1 rounded">
                                {member.status}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="bg-black/30 p-3 rounded border border-zinc-800/50 text-center">
                          <p className="text-zinc-500 text-sm italic">Belum ada peserta di kelas ini.</p>
                        </div>
                      )}
                    </div>
                  </div>

                  
                </div>
              );
            })}
          </div>
        )}
        
      </div>
    </div>
  );
};

export default TrainerDashboard;
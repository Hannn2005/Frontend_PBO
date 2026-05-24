import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hook/useAuth';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    axios.get('http://localhost:8080/api/classes', { withCredentials: true })
      .then(res => setSchedules(res.data))
      .catch(err => setErrorMessage(err.response?.data || err.message));
  }, []);

  const handleBooking = async (classId) => {
    if (!user) {
      alert('Silakan login terlebih dahulu untuk booking kelas!');
      return;
    }
    
    try {
      await axios.post(`http://localhost:8080/api/bookings/${classId}`, {}, { withCredentials: true });
      alert('Booking berhasil! Cek jadwal di Dashboard kamu.');
    } catch (error) {
      alert(error.response?.data || 'Gagal membooking kelas.');
    }
  };

  return (
    <div className="bg-black min-h-screen p-8 font-sans">
      <h2 className="text-3xl font-bold text-white mb-8 text-center uppercase tracking-wider">
        Jadwal <span className="text-red-600">Latihan</span>
      </h2>

      {errorMessage && (
        <div className="bg-red-900/50 border border-red-500 text-white p-6 rounded-xl max-w-2xl mx-auto text-center mb-8">
          <p className="font-bold text-xl mb-2">Gagal Menarik Data Server!</p>
          <p className="text-red-200">{errorMessage}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {schedules.map((item) => (
          <div key={item.id} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg hover:border-red-600/50 transition duration-300">
            <h3 className="text-xl font-bold text-white mb-3">{item.serviceName}</h3>
            
            <div className="space-y-2 mb-6">
              <p className="text-zinc-400 text-sm">
                Hari: <span className="text-white font-medium ml-1">{item.dayOfWeek}</span>
              </p>
              <p className="text-zinc-400 text-sm">
                Waktu: <span className="text-white font-medium ml-1">{item.startTime} - {item.endTime}</span>
              </p>
              <p className="text-zinc-400 text-sm">
                Pelatih: <span className="text-red-600 font-medium ml-1">{item.trainerName}</span>
              </p>
            </div>

            <button 
              onClick={() => handleBooking(item.id)}
              className="w-full bg-red-600 text-white font-bold py-2.5 rounded-lg hover:bg-red-700 transition duration-300 tracking-widest text-sm"
            >
              BOOKING KELAS
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleList;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hook/useAuth';

const ScheduleList = () => {
  const [schedules, setSchedules] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { user } = useAuth();
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [myBookings, setMyBookings] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API}/api/classes`, { withCredentials: true })
      .then(res => setSchedules(res.data))
      .catch(err => setErrorMessage(err.response?.data?.message || err.message));
    if (user) {
      axios.get(`${import.meta.env.VITE_API}/user/dashboard`, { withCredentials: true })
        .then(res => setMyBookings(res.data.bookedClasses || []))
        .catch(err => console.error("Gagal mengambil riwayat booking:", err));
    }
  }, [user]);
  
  const triggerNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3500);
  };
  const isClassBooked = (classId) => {
    return myBookings.some(booking => 
      booking.classId === classId || 
      booking.scheduleId === classId || 
      booking.schedule?.id === classId ||
      booking.id === classId ||
      booking.serviceName === schedules.find(s => s.id === classId)?.serviceName
    );
  };

  const handleBooking = async (classId) => {
    if (!user) {
      triggerNotification('Silakan login terlebih dahulu untuk booking kelas!', 'error');
      return;
    }
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/api/bookings/${classId}`, {}, { withCredentials: true });
      triggerNotification(response.data.message || 'Booking berhasil! Cek jadwal di Dashboard kamu.', 'success');
      
      const bookedClass = schedules.find(s => s.id === classId);
      setMyBookings(prev => [...prev, { id: classId, serviceName: bookedClass?.serviceName }]);

    } catch (error) {
      const backendError = error.response?.data?.message || 'Gagal membooking kelas.';
      triggerNotification(backendError, 'error');
    }
  };

  return (
    <div className="bg-black min-h-screen p-8 font-sans relative">
      {notification.show && (
        <div className={`fixed top-24 right-8 z-50 flex items-center p-4 rounded-lg shadow-2xl border transition-all duration-500 animate-bounce max-w-sm ${
          notification.type === 'success' 
            ? 'bg-zinc-900 border-green-500 text-green-400' 
            : 'bg-zinc-900 border-red-600 text-red-500'
        }`}>
          <div className="mr-3">
            {notification.type === 'success' ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            )}
          </div>
          <p className="text-sm font-bold tracking-wide uppercase">{notification.message}</p>
        </div>
      )}

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
        {schedules.map((item) => {
          const alreadyBooked = isClassBooked(item.id); 

          return (
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
                disabled={alreadyBooked} 
                className={`w-full font-bold py-2.5 rounded-lg transition duration-300 tracking-widest text-sm ${
                  alreadyBooked
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700' 
                    : 'bg-red-600 text-white hover:bg-red-700' 
                }`}
              >
                {alreadyBooked ? '✓ BOOKED' : 'BOOKING KELAS'}
              </button>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScheduleList;
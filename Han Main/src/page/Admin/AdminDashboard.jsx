import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [trainers, setTrainers] = useState([]); 
  
  const [refreshKey, setRefreshKey] = useState(0);

  const [formData, setFormData] = useState({
    serviceName: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    trainerName: ''
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const resClasses = await axios.get('http://localhost:8080/api/classes', { withCredentials: true });
        setClasses(resClasses.data);

        const resBookings = await axios.get('http://localhost:8080/api/admin/bookings', { withCredentials: true });
        setBookings(resBookings.data);

        const resUsers = await axios.get('http://localhost:8080/api/admin', { withCredentials: true });
        const trainerList = resUsers.data.filter(user => user.role === 'TRAINER');
        setTrainers(trainerList);

      } catch (error) {
        console.error("Gagal mengambil data dari server:", error);
      }
    };

    fetchAllData();
  }, [refreshKey]); 

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/admin/classes', formData, { withCredentials: true });
      alert(res.data?.message || "Kelas berhasil ditambahkan!");
      setFormData({ serviceName: '', dayOfWeek: '', startTime: '', endTime: '', trainerName: '' });
      setRefreshKey(oldKey => oldKey + 1); 
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Gagal menambahkan kelas");
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm("Yakin ingin menghapus kelas ini? Semua riwayat booking terkait juga akan terhapus.");
    if (!isConfirmed) return;

    try {
      const res = await axios.delete(`http://localhost:8080/api/admin/classes/${id}`, { withCredentials: true });
      alert(res.data?.message || "Kelas berhasil dihapus!");
      
      setRefreshKey(oldKey => oldKey + 1);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Gagal menghapus kelas");
    }
  };

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/bookings/${bookingId}`, { status }, { withCredentials: true });
      alert(`Booking berhasil di-${status.toLowerCase()}!`); 
      
      setRefreshKey(oldKey => oldKey + 1);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Gagal mengubah status booking");
    }
  };

  return (
    <div className="bg-black min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 uppercase tracking-wider">
          Admin <span className="text-red-600">Dashboard</span>
        </h2>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-red-600 mb-4 tracking-wider">PERSETUJUAN BOOKING PESERTA</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-zinc-300">
              <thead className="bg-black text-red-600">
                <tr>
                  <th className="p-4 rounded-tl-lg">Nama Member</th>
                  <th className="p-4">Kelas</th>
                  <th className="p-4">Jadwal</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 rounded-tr-lg">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-zinc-800 hover:bg-zinc-800 transition">
                    <td className="p-4 text-white font-medium">{b.username}</td>
                    <td className="p-4">{b.serviceName}</td>
                    <td className="p-4">{b.dayOfWeek}, {b.startTime}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded text-xs font-bold ${
                        b.status === 'PENDING' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/30' : 
                        b.status === 'APPROVED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 
                        'bg-zinc-800 text-zinc-400 border border-zinc-600'
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {b.status === 'PENDING' ? (
                        <div className="flex gap-2">
                          <button onClick={() => handleUpdateStatus(b.id, 'APPROVED')} className="bg-emerald-600 text-white px-3 py-1 rounded hover:bg-emerald-700 transition font-bold text-xs">TERIMA</button>
                          <button onClick={() => handleUpdateStatus(b.id, 'REJECTED')} className="bg-zinc-800 text-red-500 px-3 py-1 rounded border border-red-500/30 hover:bg-red-600 hover:text-white transition font-bold text-xs">TOLAK</button>
                        </div>
                      ) : (
                         <span className="text-zinc-600 text-xs italic">Selesai</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-red-600 mb-4 tracking-wider">TAMBAH KELAS BARU</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <input type="text" name="serviceName" placeholder="Nama Kelas" value={formData.serviceName} onChange={handleInputChange} className="bg-black text-white border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600" required />
            
            <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleInputChange} className="bg-black text-white border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600" required>
              <option value="" disabled>Pilih Hari</option>
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
              <option value="Minggu">Minggu</option>
            </select>

            <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} className="bg-black text-white border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600" required />
            <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} className="bg-black text-white border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600" required />
            
            <select 
              name="trainerName" 
              value={formData.trainerName} 
              onChange={handleInputChange} 
              className="bg-black text-white border border-zinc-700 rounded-lg px-4 py-2 focus:outline-none focus:border-red-600" 
              required
            >
              <option value="" disabled>Pilih Pelatih</option>
              {trainers.length === 0 ? (
                <option value="" disabled>Tidak ada data pelatih</option>
              ) : (
                trainers.map((t, index) => (
                  <option key={index} value={t.username}>{t.username}</option>
                ))
              )}
            </select>

            <button type="submit" className="bg-red-600 text-white font-bold py-2 rounded-lg hover:bg-red-700 transition tracking-widest text-sm">SIMPAN KELAS</button>
          </form>
        </div>
        <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg">
          <h3 className="text-xl font-bold text-red-600 mb-4 tracking-wider">DAFTAR KELAS</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-zinc-300">
              <thead className="bg-black text-red-600">
                <tr>
                  <th className="p-4 rounded-tl-lg">Nama Kelas</th>
                  <th className="p-4">Hari</th>
                  <th className="p-4">Waktu</th>
                  <th className="p-4">Pelatih</th>
                  <th className="p-4 rounded-tr-lg">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((c) => (
                  <tr key={c.id} className="border-b border-zinc-800 hover:bg-zinc-800 transition">
                    <td className="p-4 text-white font-medium">{c.serviceName}</td>
                    <td className="p-4">{c.dayOfWeek}</td>
                    <td className="p-4">{c.startTime} - {c.endTime}</td>
                    <td className="p-4">{c.trainerName}</td>
                    <td className="p-4">
                      <button onClick={() => handleDelete(c.id)} className="bg-red-500/10 text-red-500 px-4 py-2 rounded border border-red-500/50 hover:bg-red-600 hover:text-white transition font-bold text-sm tracking-wider">HAPUS</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminDashboard;
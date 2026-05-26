import { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({
    serviceName: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    trainerName: ''
  });

  const fetchClasses = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/classes', { withCredentials: true });
      setClasses(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/admin/bookings', { withCredentials: true });
      setBookings(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchBookings();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        startTime: `${formData.startTime}:00`,
        endTime: `${formData.endTime}:00`
      };

      await axios.post('http://localhost:8080/api/classes', payload, { withCredentials: true });
      alert("Kelas berhasil ditambahkan!");
      fetchClasses(); 
      setFormData({ serviceName: '', dayOfWeek: '', startTime: '', endTime: '', trainerName: '' }); 
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan kelas.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus kelas ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/api/classes/${id}`, { withCredentials: true });
      alert("Kelas berhasil dihapus!");
      fetchClasses();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus kelas.");
    }
  };

  const handleUpdateStatus = async (bookingId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/admin/bookings/${bookingId}`, { status }, { withCredentials: true });
      fetchBookings();
    } catch (error) {
      console.error(error);
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
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-zinc-500 italic">Belum ada booking peserta.</td>
                  </tr>
                ) : (
                  bookings.map((b) => (
                    <tr key={b.id} className="border-b border-zinc-800 hover:bg-zinc-800 transition">
                      <td className="p-4 text-white font-medium">{b.username}</td>
                      <td className="p-4">{b.serviceName}</td>
                      <td className="p-4">{b.dayOfWeek}, {b.startTime}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded text-xs font-bold ${b.status === 'PENDING' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/30' : b.status === 'APPROVED' ? 'bg-green-500/10 text-green-400 border border-green-500/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {b.status === 'PENDING' && (
                          <div className="flex gap-2">
                            <button onClick={() => handleUpdateStatus(b.id, 'APPROVED')} className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition font-bold text-xs">TERIMA</button>
                            <button onClick={() => handleUpdateStatus(b.id, 'REJECTED')} className="bg-zinc-800 text-red-500 px-3 py-1 rounded border border-red-500/30 hover:bg-red-600 hover:text-white transition font-bold text-xs">TOLAK</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 shadow-lg mb-8">
          <h3 className="text-xl font-bold text-red-600 mb-6 tracking-wider">TAMBAH KELAS BARU</h3>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
       
            <div className="flex flex-col">
              <label className="text-xs text-zinc-400 mb-2 uppercase tracking-wider font-bold">Nama Kelas</label>
              <input type="text" name="serviceName" placeholder="Contoh: Yoga Dasar" value={formData.serviceName} onChange={handleInputChange} className="w-full bg-zinc-950 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition" required />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-zinc-400 mb-2 uppercase tracking-wider font-bold">Pilih Hari</label>
              <select name="dayOfWeek" value={formData.dayOfWeek} onChange={handleInputChange} className="w-full bg-zinc-950 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition appearance-none" required>
                <option value="" disabled>Pilih Hari...</option>
                <option value="Senin">Senin</option>
                <option value="Selasa">Selasa</option>
                <option value="Rabu">Rabu</option>
                <option value="Kamis">Kamis</option>
                <option value="Jumat">Jumat</option>
                <option value="Sabtu">Sabtu</option>
                <option value="Minggu">Minggu</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-zinc-400 mb-2 uppercase tracking-wider font-bold">Jam Mulai</label>
              <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} className="w-full bg-zinc-950 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition" required />
            </div>

            <div className="flex flex-col">
              <label className="text-xs text-zinc-400 mb-2 uppercase tracking-wider font-bold">Jam Selesai</label>
              <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} className="w-full bg-zinc-950 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition" required />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-xs text-zinc-400 mb-2 uppercase tracking-wider font-bold">Nama Pelatih</label>
              <input type="text" name="trainerName" placeholder="Contoh: Coach Bima" value={formData.trainerName} onChange={handleInputChange} className="w-full bg-zinc-950 text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition" required />
            </div>
            
            <button type="submit" className="md:col-span-2 w-full bg-red-600 text-white font-bold py-4 rounded-lg hover:bg-red-700 transition duration-300 tracking-widest text-sm mt-4 shadow-lg shadow-red-600/20">
              SIMPAN KELAS
            </button>
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
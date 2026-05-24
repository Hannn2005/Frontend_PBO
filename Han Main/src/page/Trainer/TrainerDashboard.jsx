import { useAuth } from '../../hook/useAuth';

const TrainerDashboard = () => {
  const { user } = useAuth();
  const currentTrainerName = user?.username || '';

  const dummyClasses = [
    {
      serviceName: 'Powerlifting Heavy Session',
      dayOfWeek: 'Senin',
      startTime: '10:00',
      endTime: '12:00',
      trainerName: 'Bima Perkasa',
      bookedCount: 3,
      participants: [
        { username: 'Marcello Frans' },
        { username: 'Alex Situmorang' },
        { username: 'Rian Sitorus' }
      ]
    },
    {
      serviceName: 'Yoga & Flexibility',
      dayOfWeek: 'Rabu',
      startTime: '16:00',
      endTime: '17:30',
      trainerName: 'Sarah Wijaya',
      bookedCount: 2,
      participants: [
        { username: 'Angelina' },
        { username: 'Budi Santoso' }
      ]
    },
    {
      serviceName: 'Hypertrophy Bodybuilding',
      dayOfWeek: 'Jumat',
      startTime: '19:00',
      endTime: '21:00',
      trainerName: 'Darius Sinathrya',
      bookedCount: 4,
      participants: [
        { username: 'Marcello Frans' },
        { username: 'Kevin Wijaya' },
        { username: 'Dimas Pratama' },
        { username: 'Rizky Fadillah' }
      ]
    }
  ];

  const filtered = dummyClasses.filter(
    c => c.trainerName.toLowerCase() === currentTrainerName.toLowerCase()
  );

  const trainerClasses = filtered.length > 0 ? filtered : [
    {
      serviceName: 'Kelas Kustom Trainer',
      dayOfWeek: 'Selasa',
      startTime: '14:00',
      endTime: '16:00',
      trainerName: currentTrainerName || 'Pelatih',
      bookedCount: 2,
      participants: [
        { username: 'Marcello Frans' },
        { username: 'Aditya Perkasa' }
      ]
    }
  ];

  return (
    <div className="bg-black min-h-screen p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-2 uppercase tracking-wider">
          Trainer <span className="text-red-600">Dashboard</span>
        </h2>
        <p className="text-zinc-400 mb-8">Selamat datang, {user?.username || 'Pelatih'}. Berikut jadwal mengajar dan daftar peserta Anda.</p>

        <div className="grid grid-cols-1 gap-8">
          {trainerClasses.map((item, index) => (
            <div key={index} className="bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-lg">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-zinc-800 pb-4 mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white">{item.serviceName}</h3>
                  <p className="text-zinc-400 text-sm mt-1">{item.dayOfWeek}, {item.startTime} - {item.endTime}</p>
                </div>
                <div className="mt-2 md:mt-0 bg-black px-4 py-2 rounded border border-zinc-800">
                  <p className="text-red-600 text-xs font-bold uppercase tracking-widest text-center">Total Peserta</p>
                  <p className="text-white text-xl font-black text-center">{item.bookedCount || 0}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-red-600 tracking-wider mb-3 uppercase">Daftar Nama Peserta:</h4>
                {item.participants && item.participants.length > 0 ? (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {item.participants.map((p, idx) => (
                      <li key={idx} className="bg-black p-3 rounded border border-zinc-800 text-zinc-300 text-sm font-medium">
                        👤 {p.username}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-zinc-500 text-sm italic">Belum ada peserta yang disetujui masuk kelas ini.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerDashboard;
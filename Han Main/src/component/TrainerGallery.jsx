const TrainerGallery = () => {
  const trainers = [
    { 
      id: 1, 
      name: 'Bima Perkasa', 
      role: 'Head Coach / Powerlifting', 
      img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      id: 2, 
      name: 'Sarah Wijaya', 
      role: 'Yoga & Mobility Expert', 
      img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=800' 
    },
    { 
      id: 3, 
      name: 'Darius Sinathrya', 
      role: 'Bodybuilding Specialist', 
      img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800' 
    }
  ];

  return (
    <div className="bg-zinc-950 py-24 font-sans border-y border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4 tracking-wider">
          PELATIH <span className="text-red-600">PROFESIONAL</span>
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto mb-16 text-sm">
          Dibimbing langsung oleh para ahli yang telah tersertifikasi internasional. Kami memastikan setiap tetes keringatmu membuahkan hasil yang maksimal.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div key={trainer.id} className="group relative overflow-hidden rounded-2xl bg-black border border-zinc-800 hover:border-red-600 transition duration-500">
              <div className="h-80 w-full overflow-hidden">
                <img 
                  src={trainer.img} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-500 grayscale group-hover:grayscale-0"
                />
              </div>
              <div className="p-6 text-left relative z-10 bg-gradient-to-t from-black via-black to-transparent -mt-20 pt-20">
                <h3 className="text-xl font-bold text-white mb-1">{trainer.name}</h3>
                <p className="text-red-600 text-sm font-medium tracking-wide uppercase">{trainer.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerGallery;
import { useState } from 'react';

const BmiCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBmi(bmiValue);

      if (bmiValue < 18.5) setStatus('Kekurangan Berat Badan');
      else if (bmiValue >= 18.5 && bmiValue < 24.9) setStatus('Normal & Ideal');
      else if (bmiValue >= 25 && bmiValue < 29.9) setStatus('Kelebihan Berat Badan');
      else setStatus('Obesitas');
    }
  };

  return (
    <div className="bg-black py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-zinc-900 rounded-2xl p-8 md:p-12 shadow-2xl border border-zinc-800 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-white mb-4 tracking-wider">
              CEK <span className="text-red-600">BMI</span> KAMU
            </h2>
            <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
              Ketahui indeks massa tubuhmu untuk menentukan program latihan yang paling tepat. Fokus pada target, biarkan angka yang berbicara.
            </p>
            <form onSubmit={calculateBMI} className="space-y-4">
              <div className="flex gap-4">
                <input 
                  type="number" 
                  placeholder="Berat (kg)" 
                  value={weight} 
                  onChange={(e) => setWeight(e.target.value)} 
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition" 
                  required 
                />
                <input 
                  type="number" 
                  placeholder="Tinggi (cm)" 
                  value={height} 
                  onChange={(e) => setHeight(e.target.value)} 
                  className="w-full bg-zinc-950 text-white border border-zinc-800 rounded-lg px-4 py-3 focus:outline-none focus:border-red-600 transition" 
                  required 
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition tracking-widest text-sm"
              >
                HITUNG SEKARANG
              </button>
            </form>
          </div>
          
          {bmi && (
            <div className="flex-1 w-full bg-zinc-950 rounded-xl p-8 border border-red-600/30 text-center shadow-lg shadow-red-600/5">
              <p className="text-zinc-400 text-sm uppercase tracking-widest mb-2">Hasil Indeks</p>
              <p className="text-6xl font-black text-white mb-4">{bmi}</p>
              <div className="inline-block px-5 py-2 rounded-full bg-red-600/10 border border-red-600/50 text-red-500 font-bold text-sm tracking-wide">
                {status}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BmiCalculator;
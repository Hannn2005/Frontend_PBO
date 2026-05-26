const SuccessModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-sans">
      <div className="bg-slate-900 p-8 rounded-xl border border-gym-blue/30 text-center shadow-2xl max-w-sm w-full mx-4">
        <div className="text-gym-blue text-5xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-white mb-2">Berhasil!</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        <button onClick={onClose} className="bg-gym-blue text-gym-black font-bold py-2 px-6 rounded-lg hover:bg-sky-300 w-full transition">
          OK
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
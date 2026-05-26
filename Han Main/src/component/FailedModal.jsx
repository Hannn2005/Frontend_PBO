const FailedModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 font-sans">
      <div className="bg-slate-900 p-8 rounded-xl border border-red-500/30 text-center shadow-2xl max-w-sm w-full mx-4">
        <div className="text-red-500 text-5xl mb-4">✗</div>
        <h3 className="text-xl font-bold text-white mb-2">Gagal!</h3>
        <p className="text-gray-400 mb-6">{message}</p>
        <button onClick={onClose} className="bg-red-500 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-400 w-full transition">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default FailedModal;
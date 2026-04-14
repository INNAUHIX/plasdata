interface ToastProps {
  message: string;
  type: 'success' | 'info' | 'error';
  onClose: () => void;
}

export default function Toast({ message, type, onClose }: ToastProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-3 rounded-lg bg-gray-900 px-4 py-3 text-white shadow-lg animate-fade-in">
      <span className="text-sm font-medium text-white">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-2 rounded-full hover:bg-gray-700 p-1 text-white transition"
      >
        ×
      </button>
    </div>
  );
}

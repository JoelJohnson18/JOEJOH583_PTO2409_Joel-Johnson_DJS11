
import './Modal.css'; 

// Modal displaying its children content with close button //
export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return ( // Pop-up Modal with overlay displaying episodes for selected season //
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Close Button  */}
        <button onClick={onClose} className="modal-close-button" aria-label="Close modal">  
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

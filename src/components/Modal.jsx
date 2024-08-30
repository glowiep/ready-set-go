import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
    }}>
      <div className="bg-purple-200" style={{
        padding: '20px',
        borderRadius: '5px',
        maxWidth: '500px',
        width: '100%',
      }}>
        {children}
        <button 
          onClick={onClose} 
          style={{ marginTop: '1em' }}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
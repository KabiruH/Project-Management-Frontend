import React from 'react';
import Modal from 'react-modal';
import useModal from '../../hooks/useModal';
import styles from '../../styles/modal.module.css'; // Ensure correct import

const CustomModal = ({ isOpen, onRequestClose, title, children }) => {
  const { isOpening, isClosing } = useModal();

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={`${styles.modal} ${isOpening ? styles['modal-fade-in'] : isClosing ? styles['modal-fade-out'] : ''}`}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="modal-content bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl mb-4">{title}</h2>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;

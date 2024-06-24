import { useState, useEffect } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    setIsOpening(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Adjust timing based on your transition duration
  };

  useEffect(() => {
    if (isOpen) {
      setIsOpening(false);
    } else {
      setIsClosing(false);
    }
  }, [isOpen]);

  return {
    isOpen,
    isOpening,
    isClosing,
    openModal,
    closeModal,
  };
};

export default useModal;

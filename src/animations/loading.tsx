import { useEffect } from 'react';
import Lottie from 'lottie-react';
import animationData from './loader.json';

interface LoadingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />
      <div className="relative z-10 bg-white rounded-lg p-6 max-w-md w-full">
        <Lottie 
          animationData={animationData}
          loop={true}
          style={{ width: 256, height: 256 }}
        />
      </div>
    </div>
  );
};

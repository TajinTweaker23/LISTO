import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

interface ReAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  action: string;
}

const ReAuthModal: React.FC<ReAuthModalProps> = ({ isOpen, onClose, onSuccess, action }) => {
  const { reAuthenticate } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleReAuth = async () => {
    setLoading(true);
    await reAuthenticate(() => {
      onSuccess();
      onClose();
    });
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full mx-4"
      >
        <h3 className="text-lg font-semibold mb-4">Confirm Action</h3>
        <p className="text-gray-600 mb-6">Please verify to {action}.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-800 py-2 rounded">
            Cancel
          </button>
          <button onClick={handleReAuth} disabled={loading} className="flex-1 bg-blue-500 text-white py-2 rounded">
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ReAuthModal;

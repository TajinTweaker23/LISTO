import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaMicrophone, FaPlus } from 'react-icons/fa';

type QuickAddButtonProps = {
  onClick: () => void;
  onVoiceAdd?: (text: string) => void;
  onDragDrop?: (files: FileList) => void;
};

const QuickAddButton: React.FC<QuickAddButtonProps> = ({ onClick, onVoiceAdd, onDragDrop }) => {
  const [isListening, setIsListening] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleVoice = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        onVoiceAdd?.(text);
        setIsListening(false);
      };
      recognition.start();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    onDragDrop?.(files);
  };

  return (
    <motion.button
      type="button"
      className={`fixed bottom-10 right-10 p-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl hover:scale-110 hover:shadow-pink-500/60 transition-all duration-300 border-4 border-white/20 z-20 ring-4 ring-pink-400/30 focus:outline-none focus:ring-8 focus:ring-blue-400/40 animate-fab-pulse ${isDragOver ? 'scale-125' : ''}`}
      aria-label="Add"
      tabIndex={0}
      whileHover={{ scale: 1.13, boxShadow: "0 0 32px #f472b6" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="relative">
        <FaPlus className="h-8 w-8 drop-shadow-neon" />
        {isListening && <FaMicrophone className="absolute -top-2 -right-2 h-4 w-4 text-red-500 animate-pulse" />}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => onDragDrop?.(e.target.files!)}
      />
      <div className="absolute inset-0 rounded-full" onClick={() => fileInputRef.current?.click()} />
      <div className="absolute bottom-full right-0 mb-2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
        Quick Add (Voice/Drag)
      </div>
    </motion.button>
  );
};

export default QuickAddButton;

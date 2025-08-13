import React, { createContext, useState, useContext, ReactNode, useMemo } from 'react';
import { useToast } from '../hooks/useToast';
import { useAchievements } from '../hooks/useAchievements';
import Confetti from 'react-confetti';
import { AnimatePresence, motion } from 'framer-motion';

type Table = { rows: number; cols: number };

interface WhiteboardContextType {
  shapes: string[];
  tables: Table[];
  handleInsertShape: (shape: string) => void;
  handleInsertTable: (rows: number, cols: number) => void;
  triggerConfetti: () => void;
  triggerEmojiRain: () => void;
}

const WhiteboardContext = createContext<WhiteboardContextType | undefined>(undefined);

export const WhiteboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [shapes, setShapes] = useState<string[]>([]);
  const [tables, setTables] = useState<Table[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showEmojiRain, setShowEmojiRain] = useState(false);
  const { addToast } = useToast();
  const { unlockAchievement } = useAchievements();

  const triggerEmojiRain = () => {
    setShowEmojiRain(true);
    setTimeout(() => setShowEmojiRain(false), 2200);
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleInsertShape = (shape: string) => {
    setShapes((prevShapes) => [...prevShapes, shape]);
    triggerConfetti();
    addToast(`Shape "${shape}" added! ✨`, 'success');
    
    if ((shapes.length + 1) % 5 === 0) {
      triggerEmojiRain();
      unlockAchievement("shape-master");
    }
  };

  const handleInsertTable = (rows: number, cols: number) => {
    setTables((prevTables) => [...prevTables, { rows, cols }]);
    triggerConfetti();
    addToast(`Table ${rows}x${cols} added! 📊`, 'success');
    
    if ((tables.length + 1) % 3 === 0) {
      unlockAchievement("table-master");
    }
    if ((tables.length + 1) % 5 === 0) triggerEmojiRain();
  };

  const value = useMemo(() => ({
    shapes, tables, handleInsertShape, handleInsertTable, triggerConfetti, triggerEmojiRain
  }), [shapes, tables]);

  return (
    <WhiteboardContext.Provider value={value}>
      {children}
      {showConfetti && typeof window !== "undefined" && (
          <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} />
        )}
        
        <EmojiRain show={showEmojiRain} />
    </WhiteboardContext.Provider>
  );
};

export const useWhiteboard = () => {
  const context = useContext(WhiteboardContext);
  if (context === undefined) {
    throw new Error('useWhiteboard must be used within a WhiteboardProvider');
  }
  return context;
};

// Re-creating EmojiRain here to avoid circular dependencies
function EmojiRain({ show }: { readonly show: boolean }) {
    const emojis = ["🎉", "✨", "🥳", "💡", "🚀", "🎈"];
    return (
      <AnimatePresence>
        {show &&
          Array.from({ length: 18 }).map((_, i) => (
            <motion.div
              key={`emoji-${i}`}
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: "100vh", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2 + Math.random(),
                delay: Math.random() * 0.5,
              }}
              className="fixed left-0 pointer-events-none z-[99]"
              style={{
                left: `${Math.random() * 100}%`,
                fontSize: `${24 + Math.random() * 32}px`,
                top: 0,
              }}
            >
              {emojis[Math.floor(Math.random() * emojis.length)]}
            </motion.div>
          ))}
      </AnimatePresence>
    );
  }

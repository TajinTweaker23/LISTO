import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const EnhancedCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', mouseMove);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      mixBlendMode: 'difference' as const,
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
      variants={variants}
      animate={cursorVariant}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 28,
      }}
    />
  );
};

export default EnhancedCursor;

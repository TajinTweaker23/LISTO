'use client';

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FaqSection from "../components/FaqSection";

// Advanced landing page component with stunning visuals
export default function HomePage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<Array<{x: number, y: number, id: number}>>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const y3 = useTransform(scrollY, [0, 500], [0, 150]);
  const y4 = useTransform(scrollY, [0, 800], [0, -200]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Create cursor trail effect
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };
      
      setCursorTrail(prev => {
        const updated = [...prev, newTrail];
        return updated.slice(-8); // Keep only last 8 trail points
      });
    };
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      setScrollProgress(scrollPercent);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Clean up cursor trail
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorTrail(prev => prev.filter(trail => Date.now() - trail.id < 500));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        background: `linear-gradient(${scrollProgress * 360}deg, 
          rgba(99, 102, 241, ${0.1 + scrollProgress * 0.05}) 0%, 
          rgba(255, 255, 255, 1) 50%, 
          rgba(168, 85, 247, ${0.1 + scrollProgress * 0.05}) 100%)`
      }}
    >
      {/* Animated background grid with interaction */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
      }}></div>
      
      {/* Cursor trail effects */}
      {cursorTrail.map((trail, index) => (
        <motion.div
          key={trail.id}
          className="fixed w-3 h-3 rounded-full pointer-events-none z-50"
          style={{
            left: trail.x - 6,
            top: trail.y - 6,
            background: `radial-gradient(circle, ${
              index % 3 === 0 ? 'rgba(99, 102, 241, 0.8)' :
              index % 3 === 1 ? 'rgba(168, 85, 247, 0.8)' :
              'rgba(236, 72, 153, 0.8)'
            }, transparent)`
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1, 0], opacity: [1, 0.6, 0] }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      ))}
      
      {/* Enhanced mouse follower effect */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
      
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center relative">
        <div className="text-center z-20 px-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl md:text-9xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-8">
              LISTO
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-12 leading-relaxed">
              Life Intelligence System & Task Optimizer
            </p>
          </motion.div>
          
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto">
              An advanced personal productivity and wellness ecosystem that combines AI-powered task management, 
              health tracking, and neurodivergent-friendly features to optimize your daily life.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => window.location.href = '/medical-hub'}
              >
                Explore Medical Hub
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white border-2 border-purple-600 text-purple-600 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-purple-50"
                onClick={() => window.location.href = '/dashboard'}
              >
                View Dashboard
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Floating elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-32 right-32 w-96 h-96 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl"
        />
      </div>
      
      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-20 px-6 bg-white/50 backdrop-blur-sm"
      >
        <FaqSection />
      </motion.div>
    </div>
  );
}

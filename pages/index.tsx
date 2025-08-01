// pages/index.tsx

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { motion, useScroll, useTransform } from "framer-motion";
import FaqSection from "@/components/FaqSection";

// Advanced landing page component with stunning visuals
function LandingPage() {
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
        animate={{
          x: (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) * 0.05,
          y: (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) * 0.05,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      />
      
      {/* Secondary glow effect */}
      <motion.div
        className="fixed w-64 h-64 rounded-full pointer-events-none z-10 opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)',
          left: mousePosition.x - 128,
          top: mousePosition.y - 128,
        }}
        animate={{
          x: (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) * -0.03,
          y: (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) * -0.03,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      />

      {/* Hero Section with 3D effect */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Layered background with parallax */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-pink-600/10"
          style={{ y: y1 }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tl from-emerald-600/5 via-transparent to-cyan-600/5"
          style={{ y: y2 }}
        />
        
        {/* Enhanced floating geometric shapes with more variety */}
        <motion.div
          className="absolute top-20 left-[10%] w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl opacity-20 blur-sm"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1]
          }}
          transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-[15%] w-24 h-24 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-25"
          animate={{ 
            y: [0, 20, 0],
            x: [0, -15, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 right-[5%] w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 transform rotate-45 opacity-20"
          animate={{ 
            rotate: [45, 225, 405],
            scale: [1, 1.3, 1]
          }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />
        
        {/* Additional morphing shapes */}
        <motion.div
          className="absolute top-1/3 left-[5%] w-20 h-20 opacity-15"
          style={{
            background: 'linear-gradient(45deg, #f59e0b, #ef4444)',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%'
          }}
          animate={{ 
            borderRadius: [
              '60% 40% 30% 70% / 60% 30% 70% 40%',
              '30% 60% 70% 40% / 50% 60% 30% 60%',
              '60% 40% 30% 70% / 60% 30% 70% 40%'
            ],
            rotate: [0, 120, 240, 360],
            scale: [1, 1.2, 0.8, 1]
          }}
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-[20%] w-14 h-14 opacity-20"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
            borderRadius: '30% 70% 20% 80% / 30% 40% 70% 60%'
          }}
          animate={{ 
            borderRadius: [
              '30% 70% 20% 80% / 30% 40% 70% 60%',
              '70% 30% 80% 20% / 60% 70% 40% 30%',
              '30% 70% 20% 80% / 30% 40% 70% 60%'
            ],
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0]
          }}
          transition={{ repeat: Infinity, duration: 22, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-6 lg:px-8 relative z-20 w-full">
          <motion.div 
            className="max-w-7xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Main headline with gradient text */}
            <motion.h1 
              className="text-7xl sm:text-8xl lg:text-9xl xl:text-[12rem] font-black mb-8 leading-[0.85] tracking-tight"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.2 }}
            >
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                LISTO
              </span>
              <br />
              <motion.span 
                className="text-gray-800 text-6xl sm:text-7xl lg:text-8xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Vision to Reality
              </motion.span>
            </motion.h1>

            {/* Subtitle with typewriter effect */}
            <motion.p 
              className="text-2xl sm:text-3xl lg:text-4xl text-gray-600 mb-16 max-w-6xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              Transform chaotic dreams into organized success. The only productivity platform that thinks like you do.
            </motion.p>
            
            {/* CTA Button with advanced hover effects */}
            <motion.div 
              className="mb-20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <motion.a
                href="/login"
                className="group relative inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                {/* Animated border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <div className="magnetic-button relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-16 py-6 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border border-white/20 overflow-hidden">
                  Start Your Journey
                  {/* Shimmer effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.a>
            </motion.div>

            {/* Enhanced stats with animations */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
            >
              {[
                { number: "50K+", label: "Dreams Realized", color: "from-blue-500 to-cyan-500", icon: "🎯" },
                { number: "AI-Powered", label: "Smart Organization", color: "from-purple-500 to-pink-500", icon: "🧠" },
                { number: "24/7", label: "Sync Anywhere", color: "from-emerald-500 to-teal-500", icon: "⚡" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="group text-center p-8 rounded-3xl bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/50 transition-all duration-300 relative overflow-hidden"
                  whileHover={{ y: -10, scale: 1.02, rotateY: 5 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                  style={{ perspective: '1000px' }}
                >
                  {/* Floating icon */}
                  <motion.div 
                    className="text-4xl mb-4"
                    animate={{ 
                      y: [0, -5, 0],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3 + index * 0.5, 
                      ease: "easeInOut" 
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  
                  {/* Enhanced number with glow */}
                  <motion.div 
                    className={`text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3 relative`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {stat.number}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-20 blur-lg`}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                  
                  <div className="text-xl text-gray-700 font-medium">{stat.label}</div>
                  
                  {/* Animated background particles */}
                  <motion.div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          background: index % 3 === 0 ? '#60a5fa' : index % 3 === 1 ? '#a855f7' : '#10b981',
                          left: `${20 + i * 30}%`,
                          top: `${30 + i * 15}%`
                        }}
                        animate={{
                          y: [0, -20, 0],
                          opacity: [0, 1, 0],
                          scale: [0, 1, 0]
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 2,
                          delay: i * 0.3
                        }}
                      />
                    ))}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Revolutionary Features Section */}
      <section className="py-32 px-6 lg:px-8 relative z-10 overflow-hidden">
        {/* Enhanced section background with multiple animated layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
        
        {/* Multi-layer parallax background */}
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl"
          style={{ y: y3 }}
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-orange-300/30 rounded-full blur-3xl"
          style={{ y: y4 }}
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />
        
        {/* Additional floating elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-yellow-300/20 to-red-300/20 rounded-full blur-2xl"
          animate={{ 
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
            x: [0, 50, -30, 0],
            y: [0, -30, 20, 0]
          }}
          transition={{ repeat: Infinity, duration: 40, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 ? '#60a5fa' : i % 3 === 1 ? '#a855f7' : '#10b981',
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              repeat: Infinity,
              duration: 8 + i * 2,
              delay: i * 1.5,
              ease: "easeInOut"
            }}
          />
        ))}

        <div className="container mx-auto max-w-8xl relative z-10">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2 
              className="text-6xl sm:text-7xl lg:text-8xl font-black mb-8 leading-tight"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
                Features That
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Change Everything
              </span>
            </motion.h2>
            <motion.p 
              className="text-2xl sm:text-3xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Revolutionary tools designed for the ambitious minds of tomorrow.
            </motion.p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                icon: "🎨",
                title: "Neural Vision Boards",
                description: "AI-powered mood boards that evolve with your thinking. Create immersive visual landscapes that inspire breakthrough moments.",
                gradient: "from-blue-500 via-cyan-500 to-teal-500",
                delay: 0
              },
              {
                icon: "🧠",
                title: "Genius Mode Planning",
                description: "Our proprietary algorithm breaks down impossible dreams into perfectly actionable micro-steps that guarantee progress.",
                gradient: "from-purple-500 via-pink-500 to-rose-500",
                delay: 0.1
              },
              {
                icon: "⚡",
                title: "Lightning Sync",
                description: "Quantum-speed synchronization across all devices. Your ideas travel faster than your thoughts.",
                gradient: "from-amber-500 via-orange-500 to-red-500",
                delay: 0.2
              },
              {
                icon: "🎯",
                title: "Precision Targeting",
                description: "Laser-focused goal architecture with success probability calculations. Know exactly where you're headed.",
                gradient: "from-emerald-500 via-green-500 to-lime-500",
                delay: 0.3
              },
              {
                icon: "📊",
                title: "Success Analytics",
                description: "Advanced pattern recognition reveals your peak performance windows and optimization opportunities.",
                gradient: "from-indigo-500 via-blue-500 to-cyan-500",
                delay: 0.4
              },
              {
                icon: "🚀",
                title: "Momentum Engine",
                description: "Proprietary motivation algorithms that adapt to your energy cycles and keep you in the flow state.",
                gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
                delay: 0.5
              }
            ].map((feature, index) => (
              <motion.div
                key={`feature-${feature.title}`}
                className="group relative"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -10, rotateY: 5, rotateX: 5 }}
                style={{ perspective: '1000px' }}
              >
                {/* Enhanced card glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`} />
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700 rounded-3xl scale-110`} />
                
                {/* Main card with enhanced glass effect */}
                <div className="relative bg-white/60 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/40 hover:border-white/60 transition-all duration-500 h-full shadow-lg hover:shadow-2xl overflow-hidden group">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                      }}
                    />
                  </div>
                  
                  {/* Enhanced icon with multiple effects */}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 text-3xl shadow-lg relative overflow-hidden`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {/* Icon background shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '200%' }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                    <span className="relative z-10">{feature.icon}</span>
                  </motion.div>
                  
                  {/* Enhanced title with text effects */}
                  <motion.h3 
                    className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    {feature.title}
                    {/* Text glow effect */}
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300`}
                      style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                    >
                      {feature.title}
                    </motion.div>
                  </motion.h3>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>

                  {/* Enhanced hover indicator with pulse */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-3xl`}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  {/* Pulse effect on hover */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-3xl opacity-50`}
                    initial={{ width: 0, scale: 1 }}
                    whileHover={{ 
                      width: "100%",
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      width: { duration: 0.3 },
                      scale: { duration: 0.6, repeat: Infinity }
                    }}
                  />
                  
                  {/* Floating micro-interactions */}
                  <motion.div
                    className="absolute top-4 right-4 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [0, 1, 0],
                      y: [0, -10, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      delay: 0.5
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial/Social Proof Section */}
          <motion.div 
            className="text-center mt-32"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-6 py-3 mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-2xl">⭐⭐⭐⭐⭐</span>
              <span className="text-gray-700 font-medium">4.9/5 from 10,000+ users</span>
            </motion.div>
            
            <motion.h3 
              className="text-5xl sm:text-6xl font-black mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Join the productivity
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                revolution
              </span>
            </motion.h3>
            
            <motion.a
              href="/login"
              className="group relative inline-block"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              {/* Animated pulse rings */}
              <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/30 pulse-ring"></div>
              <div className="absolute inset-0 rounded-2xl border-2 border-purple-400/30 pulse-ring" style={{ animationDelay: '0.5s' }}></div>
              
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border border-white/20 overflow-hidden ripple-effect">
                Transform Your Life Today
                {/* Premium shimmer effect */}
                <div className="absolute inset-0 premium-shimmer opacity-0 group-hover:opacity-100"></div>
                <motion.div
                  className="absolute inset-0 bg-white/20 rounded-2xl"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.a>
          </motion.div>
        </div>
      </section>

      <FaqSection />
    </div>
  );
}

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  // Show landing page for non-authenticated users
  if (!user) {
    return <LandingPage />;
  }

  // Show loading while redirecting authenticated users  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="text-center relative z-10">
        {/* Animated LISTO logo */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            LISTO
          </h1>
        </motion.div>
        
        {/* Advanced loading spinner */}
        <motion.div
          className="relative w-20 h-20 mx-auto mb-6"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-20"></div>
          <div className="absolute inset-2 rounded-full border-4 border-transparent bg-gradient-to-r from-pink-600 via-blue-600 to-purple-600"></div>
          <div className="absolute inset-4 rounded-full bg-white"></div>
        </motion.div>
        
        <motion.p 
          className="text-xl text-gray-600 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Preparing your productivity paradise...
        </motion.p>
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-400 rounded-full opacity-60"
          animate={{ y: [0, -20, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-60"
          animate={{ y: [0, 15, 0], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        />
      </div>
    </div>
  );
}

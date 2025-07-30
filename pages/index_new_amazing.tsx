// pages/index.tsx

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { motion, useScroll, useTransform } from "framer-motion";
import FaqSection from "@/components/FaqSection";

// Advanced landing page component with stunning visuals
function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-y-auto">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Mouse follower effect */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-10"
        style={{
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
        }}
        animate={{
          x: (mousePosition.x - (typeof window !== 'undefined' ? window.innerWidth : 0) / 2) * 0.05,
          y: (mousePosition.y - (typeof window !== 'undefined' ? window.innerHeight : 0) / 2) * 0.05,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
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
        
        {/* Floating geometric shapes */}
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
                <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-16 py-6 rounded-2xl font-bold text-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border border-white/20">
                  Start Your Journey
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
                { number: "50K+", label: "Dreams Realized", color: "from-blue-500 to-cyan-500" },
                { number: "AI-Powered", label: "Smart Organization", color: "from-purple-500 to-pink-500" },
                { number: "24/7", label: "Sync Anywhere", color: "from-emerald-500 to-teal-500" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="group text-center p-8 rounded-3xl bg-white/30 backdrop-blur-sm border border-white/20 hover:bg-white/50 transition-all duration-300"
                  whileHover={{ y: -10, scale: 1.02 }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                >
                  <div className={`text-5xl font-black bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                    {stat.number}
                  </div>
                  <div className="text-xl text-gray-700 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Revolutionary Features Section */}
      <section className="py-32 px-6 lg:px-8 relative z-10 overflow-hidden">
        {/* Section background with animated blobs */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white"></div>
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-purple-300/30 rounded-full blur-3xl"
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ repeat: Infinity, duration: 30, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-br from-pink-300/30 to-orange-300/30 rounded-full blur-3xl"
          animate={{ x: [0, -100, 0], y: [0, 50, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "easeInOut" }}
        />

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
                whileHover={{ y: -10 }}
              >
                {/* Card glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`} />
                
                {/* Main card */}
                <div className="relative bg-white/60 backdrop-blur-xl p-8 lg:p-10 rounded-3xl border border-white/40 hover:border-white/60 transition-all duration-500 h-full shadow-lg hover:shadow-2xl">
                  {/* Icon with gradient background */}
                  <motion.div 
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 text-3xl shadow-lg`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>

                  {/* Hover indicator */}
                  <motion.div
                    className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${feature.gradient} rounded-b-3xl`}
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
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
              <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 border border-white/20">
                Transform Your Life Today
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

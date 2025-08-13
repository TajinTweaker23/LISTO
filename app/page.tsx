'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../components/ui/button';
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Brain, 
  Users, 
  Timer,
  Target,
  Shield,
  Zap,
  Calendar,
  Star
} from 'lucide-react';

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-gray-50 to-emerald-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/30 to-sage-200/30 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-96 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"
      />

      <div className="relative z-10 p-6 md:p-8 mobile-padding">
        {/* Header with Dynamic Greeting */}
        <motion.header 
          variants={itemVariants} 
          initial="hidden"
          animate="visible"
          className="text-center mb-16 app-header"
        >
          <div className="glass-morphism inline-block px-4 py-2 rounded-full mb-6">
            <span className="text-sage-700 font-medium">
              {getGreeting()}, Welcome back! 
              <span className="ml-2">✨</span>
            </span>
          </div>
          
          <h1 className="hero-text text-6xl md:text-8xl font-bold mb-6">
            <span className="text-gradient bg-gradient-to-r from-sage-600 via-emerald-600 to-sage-800 bg-clip-text text-transparent">
              LISTO
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-sage-700 max-w-3xl mx-auto mb-8">
            Your neurodivergent-friendly companion for 
            <span className="text-emerald-600 font-semibold"> growth</span>, 
            <span className="text-purple-600 font-semibold"> wellness</span>, and 
            <span className="text-blue-600 font-semibold"> meaningful connections</span>
          </p>

          {/* Quick Action Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/wellness">
              <Button className="btn-cta bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-full shadow-lg">
                <Heart className="w-5 h-5 mr-2" />
                Start Wellness Journey
              </Button>
            </Link>
            <Link href="/medical-hub">
              <Button variant="outline" className="btn-primary border-sage-300 text-sage-700 hover:bg-sage-50 px-8 py-3 rounded-full">
                <Brain className="w-5 h-5 mr-2" />
                Medical Hub
              </Button>
            </Link>
            <Link href="/vision-board">
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full shadow-lg">
                <Sparkles className="w-5 h-5 mr-2" />
                Vision Board
              </Button>
            </Link>
          </motion.div>
        </motion.header>

        {/* Quick Navigation Cards */}
        <motion.div 
          className="card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Wellness Card */}
          <motion.div variants={itemVariants} className="glass-morphism p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mr-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-sage-800">Wellness Hub</h3>
            </div>
            <p className="text-sage-600 mb-6">
              Track your mental health, mood, and daily wellness with neurodivergent-friendly tools designed for ADHD, autism, and anxiety management.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-sage-500">
                <Shield className="w-4 h-4 mr-2" />
                <span>Privacy-first mood tracking</span>
              </div>
              <div className="flex items-center text-sm text-sage-500">
                <Target className="w-4 h-4 mr-2" />
                <span>Personalized wellness goals</span>
              </div>
              <div className="flex items-center text-sm text-sage-500">
                <Users className="w-4 h-4 mr-2" />
                <span>Anonymous peer support</span>
              </div>
            </div>
            <Link href="/wellness">
              <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-105 transition-transform">
                Explore Wellness <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Medical Hub Card */}
          <motion.div variants={itemVariants} className="glass-morphism p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-sage-800">Medical Hub</h3>
            </div>
            <p className="text-sage-600 mb-6">
              Manage appointments, medications, and health insights with executive function support and ADHD-friendly reminders.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-sage-500">
                <Timer className="w-4 h-4 mr-2" />
                <span>Smart medication reminders</span>
              </div>
              <div className="flex items-center text-sm text-sage-500">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Appointment management</span>
              </div>
              <div className="flex items-center text-sm text-sage-500">
                <Brain className="w-4 h-4 mr-2" />
                <span>Health insights & trends</span>
              </div>
            </div>
            <Link href="/medical-hub">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:scale-105 transition-transform">
                Access Medical Hub <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Vision Board Card */}
          <motion.div variants={itemVariants} className="glass-morphism p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mr-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-sage-800">Vision Board</h3>
            </div>
            <p className="text-sage-600 mb-6">
              Create visual goal maps and inspiration boards tailored to neurodivergent thinking patterns and executive function needs.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-sm text-sage-500">
                <Target className="w-4 h-4 mr-2" />
                <span>Visual goal mapping</span>
              </div>
              <div className="flex items-center text-sm text-sage-500">
                <Star className="w-4 h-4 mr-2" />
                <span>AI-powered inspiration</span>
              </div>
              <div className="flex items-center text-sm text-sage-500">
                <Heart className="w-4 h-4 mr-2" />
                <span>Motivation tracking</span>
              </div>
            </div>
            <Link href="/vision-board">
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:scale-105 transition-transform">
                Create Vision <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Dashboard Card */}
          <motion.div variants={itemVariants} className="glass-morphism p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mr-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-sage-800">Dashboard</h3>
            </div>
            <p className="text-sage-600 mb-6">
              Your personalized command center with focus timers, quick actions, and progress tracking designed for neurodivergent minds.
            </p>
            <Link href="/dashboard">
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:scale-105 transition-transform">
                Open Dashboard <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Optimizer Card */}
          <motion.div variants={itemVariants} className="glass-morphism p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mr-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-sage-800">Life Optimizer</h3>
            </div>
            <p className="text-sage-600 mb-6">
              AI-powered life optimization tools that understand neurodivergent patterns and help you work with your brain, not against it.
            </p>
            <Link href="/optimizer">
              <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white hover:scale-105 transition-transform">
                Optimize Life <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Test Page Card */}
          <motion.div variants={itemVariants} className="glass-morphism p-8 rounded-2xl hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mr-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-sage-800">Test Features</h3>
            </div>
            <p className="text-sage-600 mb-6">
              Explore new features, animations, and components in development. Perfect for testing and feedback.
            </p>
            <Link href="/test-page">
              <Button className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:scale-105 transition-transform">
                Test Features <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="glass-morphism p-8 rounded-2xl mb-16"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-3xl font-bold text-center text-sage-800 mb-8">Community Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">12.4k</div>
              <div className="text-sage-600">Focus Sessions</div>
              <div className="text-xs text-sage-500 mt-1">This month</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">8.9k</div>
              <div className="text-sage-600">Goals Achieved</div>
              <div className="text-xs text-sage-500 mt-1">All time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-rose-600 mb-2">24.7k</div>
              <div className="text-sage-600">Community Support</div>
              <div className="text-xs text-sage-500 mt-1">Interactions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">156k</div>
              <div className="text-sage-600">Growth Moments</div>
              <div className="text-xs text-sage-500 mt-1">Tracked</div>
            </div>
          </div>
        </motion.div>

        {/* Floating Action Button - Break Reminder */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
        >
          <Button
            size="lg"
            className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg hover:scale-110 transition-transform pulse-glow"
            onClick={() => alert("Time for a 5-minute break! 🌟 Your brain deserves rest.")}
            title="Neurodivergent-Friendly Break Reminder"
          >
            <Timer className="w-6 h-6" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

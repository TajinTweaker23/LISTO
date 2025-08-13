
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
  Star,
  Bell,
  BarChart,
  Lightbulb,
  TrendingUp,
  Beaker,
  Settings,
  MessageCircle
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
      <div className="relative z-10 p-6 md:p-8">
        {/* Header with Dynamic Greeting */}
        <header className="text-center mb-16">
          <div className="card-glass inline-block px-4 py-2 rounded-full mb-6">
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
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/wellness">
              <Button className="btn-premium bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-8 py-3 rounded-full shadow-lg">
                <Heart className="w-5 h-5 mr-2" />
                Start Wellness Journey
              </Button>
            </Link>
            <Link href="/medical-hub">
              <Button variant="outline" className="border-sage-300 text-sage-700 hover:bg-sage-50 px-8 py-3 rounded-full">
                <Brain className="w-5 h-5 mr-2" />
                Medical Hub
              </Button>
            </Link>
          </div>
        </header>

        {/* Basic Feature Test */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-sage-800 mb-8">Premium Design Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-feature p-6 rounded-2xl">
              <Heart className="w-12 h-12 mx-auto mb-4 text-emerald-500" />
              <h3 className="text-xl font-semibold mb-2">Wellness Hub</h3>
              <p className="text-sage-600">Track your health and wellness journey</p>
            </div>
            <div className="card-feature p-6 rounded-2xl">
              <Brain className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2">Medical Hub</h3>
              <p className="text-sage-600">Medical education and assistance</p>
            </div>
            <div className="card-feature p-6 rounded-2xl">
              <Target className="w-12 h-12 mx-auto mb-4 text-purple-500" />
              <h3 className="text-xl font-semibold mb-2">Vision Board</h3>
              <p className="text-sage-600">Visualize and achieve your goals</p>
            </div>
          </div>
        </div>

        {/* Animated Background Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/30 to-sage-200/30 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute top-96 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl"
        />
      />

      <div className="relative z-10 p-6 md:p-8 mobile-padding">
        {/* Header with Dynamic Greeting */}
        <motion.header 
          variants={itemVariants} 
          initial="hidden"
          animate="visible"
          className="text-center mb-16 app-header"
        >
          <div className="glass-card inline-block px-6 py-3 rounded-full mb-8">
            <span className="text-slate-700 font-medium text-lg">
              {getGreeting()}, Welcome back! 
              <span className="ml-2">✨</span>
            </span>
          </div>
          
          <h1 className="hero-text text-6xl md:text-8xl font-black mb-8">
            <span className="text-gradient-premium bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              LISTO
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto mb-12 font-medium leading-relaxed">
            Your neurodivergent-friendly companion for 
            <span className="text-emerald-600 font-bold"> growth</span>, 
            <span className="text-purple-600 font-bold"> wellness</span>, and 
            <span className="text-blue-600 font-bold"> meaningful connections</span>
          </p>

          {/* Premium Quick Action Buttons */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Link href="/wellness">
              <button className="btn-premium btn-emerald px-10 py-4 text-lg">
                <Heart className="w-6 h-6 mr-3" />
                Start Wellness Journey
              </button>
            </Link>
            <Link href="/medical-hub">
              <button className="btn-premium btn-aurora px-10 py-4 text-lg">
                <Brain className="w-6 h-6 mr-3" />
                Medical Hub
              </button>
            </Link>
            <Link href="/vision-board">
              <button className="btn-premium btn-cosmic px-10 py-4 text-lg">
                <Target className="w-6 h-6 mr-3" />
                Vision Board
              </button>
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
          <motion.div variants={itemVariants} className="card-feature interactive-hover float-animation">
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-3xl flex items-center justify-center mr-6 pulse-glow">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Wellness Hub</h3>
            </div>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Track your mental health, mood, and daily wellness with neurodivergent-friendly tools designed for ADHD, autism, and anxiety management.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-600">
                <Shield className="w-5 h-5 mr-3 text-emerald-500" />
                <span className="font-medium">Privacy-first mood tracking</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Target className="w-5 h-5 mr-3 text-emerald-500" />
                <span className="font-medium">Personalized wellness goals</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Users className="w-5 h-5 mr-3 text-emerald-500" />
                <span className="font-medium">Anonymous peer support</span>
              </div>
            </div>
            <Link href="/wellness">
              <button className="btn-premium btn-emerald w-full text-base">
                Explore Wellness <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </motion.div>

          {/* Medical Hub Card */}
          <motion.div variants={itemVariants} className="card-feature interactive-hover" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl flex items-center justify-center mr-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Medical Hub</h3>
            </div>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Manage appointments, medications, and health insights with executive function support and ADHD-friendly reminders.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-600">
                <Timer className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-medium">Smart medication reminders</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-medium">Appointment management</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Brain className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-medium">Health insights & trends</span>
              </div>
            </div>
            <Link href="/medical-hub">
              <button className="btn-premium btn-aurora w-full text-base">
                Access Medical Hub <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </motion.div>

          {/* Vision Board Card */}
          <motion.div variants={itemVariants} className="card-feature interactive-hover float-animation" style={{animationDelay: '0.2s'}}>
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-3xl flex items-center justify-center mr-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Vision Board</h3>
            </div>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Create visual goal maps and inspiration boards tailored to neurodivergent thinking patterns and executive function needs.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-600">
                <Target className="w-5 h-5 mr-3 text-purple-500" />
                <span className="font-medium">Visual goal mapping</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Star className="w-5 h-5 mr-3 text-purple-500" />
                <span className="font-medium">AI-powered inspiration</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Heart className="w-5 h-5 mr-3 text-purple-500" />
                <span className="font-medium">Motivation tracking</span>
              </div>
            </div>
            <Link href="/vision-board">
              <button className="btn-premium btn-cosmic w-full text-base">
                Create Vision <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Premium Stats Section */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">
              Trusted by the <span className="text-gradient-premium">Neurodivergent Community</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Join thousands of users who've found their perfect wellness companion
            </p>
          </div>
          
          <div className="card-grid grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div variants={itemVariants} className="card-luxe p-8 text-center">
              <div className="text-3xl font-black text-emerald-600 mb-2">10K+</div>
              <div className="text-slate-600 font-medium">Active Users</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="card-luxe p-8 text-center">
              <div className="text-3xl font-black text-blue-600 mb-2">95%</div>
              <div className="text-slate-600 font-medium">Satisfaction Rate</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="card-luxe p-8 text-center">
              <div className="text-3xl font-black text-purple-600 mb-2">24/7</div>
              <div className="text-slate-600 font-medium">Support Available</div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="card-luxe p-8 text-center">
              <div className="text-3xl font-black text-pink-600 mb-2">100%</div>
              <div className="text-slate-600 font-medium">Privacy Focused</div>
            </motion.div>
          </div>
        </motion.div>

        {/* Dashboard Card */}
        <motion.div variants={itemVariants} className="card-feature group">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl flex items-center justify-center mr-6 transition-transform group-hover:scale-110 duration-300">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Dashboard</h3>
          </div>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Your personalized command center with focus timers, quick actions, and progress tracking designed for neurodivergent minds.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-slate-600">
              <Calendar className="w-5 h-5 mr-3 text-indigo-500" />
              <span className="font-medium">Smart scheduling</span>
            </div>
            <div className="flex items-center text-slate-600">
              <Bell className="w-5 h-5 mr-3 text-indigo-500" />
              <span className="font-medium">Gentle reminders</span>
            </div>
            <div className="flex items-center text-slate-600">
              <BarChart className="w-5 h-5 mr-3 text-indigo-500" />
              <span className="font-medium">Progress visualization</span>
            </div>
          </div>
          <Link href="/dashboard">
            <button className="btn-premium btn-aurora w-full text-base">
              Open Dashboard <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </motion.div>

        {/* Life Optimizer Card */}
        <motion.div variants={itemVariants} className="card-feature group">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mr-6 transition-transform group-hover:scale-110 duration-300">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Life Optimizer</h3>
          </div>
          <p className="text-slate-600 mb-8 leading-relaxed">
            AI-powered life optimization tools that understand neurodivergent patterns and help you work with your brain, not against it.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-slate-600">
              <Brain className="w-5 h-5 mr-3 text-orange-500" />
              <span className="font-medium">Pattern recognition</span>
            </div>
            <div className="flex items-center text-slate-600">
              <Lightbulb className="w-5 h-5 mr-3 text-orange-500" />
              <span className="font-medium">Smart suggestions</span>
            </div>
            <div className="flex items-center text-slate-600">
              <TrendingUp className="w-5 h-5 mr-3 text-orange-500" />
              <span className="font-medium">Growth tracking</span>
            </div>
          </div>
          <Link href="/optimizer">
            <button className="btn-premium btn-solar w-full text-base">
              Optimize Life <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </motion.div>

        {/* Test Features Card */}
        <motion.div variants={itemVariants} className="card-feature group">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center mr-6 transition-transform group-hover:scale-110 duration-300">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">Test Features</h3>
          </div>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Explore new features, animations, and components in development. Perfect for testing and feedback.
          </p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center text-slate-600">
              <Beaker className="w-5 h-5 mr-3 text-teal-500" />
              <span className="font-medium">Beta features</span>
            </div>
            <div className="flex items-center text-slate-600">
              <Settings className="w-5 h-5 mr-3 text-teal-500" />
              <span className="font-medium">Advanced settings</span>
            </div>
            <div className="flex items-center text-slate-600">
              <MessageCircle className="w-5 h-5 mr-3 text-teal-500" />
              <span className="font-medium">Direct feedback</span>
            </div>
          </div>
          <Link href="/test-page">
            <button className="btn-premium btn-ocean w-full text-base">
              Test Features <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </Link>
        </motion.div>

        {/* Premium Community Impact Section */}
        <motion.div 
          className="card-luxe p-12 mb-20 overflow-hidden relative"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5"></div>
          <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-800 mb-4">
                Community <span className="text-gradient-premium">Impact</span>
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Real metrics from our thriving neurodivergent community
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <motion.div 
                variants={itemVariants} 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl font-black text-gradient-emerald mb-3">12.4k</div>
                <div className="text-slate-700 font-semibold text-lg mb-1">Focus Sessions</div>
                <div className="text-sm text-slate-500 font-medium">This month</div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl font-black text-gradient-ocean mb-3">8.9k</div>
                <div className="text-slate-700 font-semibold text-lg mb-1">Goals Achieved</div>
                <div className="text-sm text-slate-500 font-medium">All time</div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl font-black text-gradient-sunset mb-3">24.7k</div>
                <div className="text-slate-700 font-semibold text-lg mb-1">Community Support</div>
                <div className="text-sm text-slate-500 font-medium">Interactions</div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants} 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl font-black text-gradient-cosmic mb-3">156k</div>
                <div className="text-slate-700 font-semibold text-lg mb-1">Growth Moments</div>
                <div className="text-sm text-slate-500 font-medium">Tracked</div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Premium Floating Action Button - Break Reminder */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-premium hover:shadow-premium-lg transition-all duration-300 backdrop-blur-sm border border-white/20 group relative overflow-hidden"
            onClick={() => alert("Time for a 5-minute break! 🌟 Your brain deserves rest.")}
            title="Neurodivergent-Friendly Break Reminder"
          >
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full"></div>
            
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            
            {/* Icon */}
            <div className="relative z-10 flex items-center justify-center h-full animate-pulse-gentle">
              <Timer className="w-7 h-7" />
            </div>
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full animate-ping-slow bg-gradient-to-br from-indigo-400/30 to-purple-400/30 scale-110"></div>
          </button>
        </motion.div>
      </div>
    </div>
  );
}

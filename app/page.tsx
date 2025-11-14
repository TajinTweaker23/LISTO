'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Brain, 
  Users, 
  Timer,
  Target,
  Shield,
  Calendar,
  Star
} from 'lucide-react';

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date());

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
      <div
        className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-emerald-200/30 to-sage-200/30 rounded-full blur-3xl opacity-50"
      />
      <div
        className="absolute top-96 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-3xl opacity-50"
      />

      <div className="relative z-10 p-6 md:p-8 mobile-padding">
        {/* Header with Dynamic Greeting */}
        <header 
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
            Your neurodivergent-friendly companion for{' '}
            <span className="text-emerald-600 font-bold"> growth</span>,{' '}
            <span className="text-purple-600 font-bold"> wellness</span>, and{' '}
            <span className="text-blue-600 font-bold"> meaningful connections</span>
          </p>

          {/* Centered CTA Section */}
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h3 className="text-2xl font-bold text-slate-800 mb-6 text-center">Get Started Today</h3>
              
              {/* Email Input */}
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              
              {/* Plan Selection Dropdown */}
              <div className="mb-4">
                <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Select a plan</option>
                  <option>Free Plan</option>
                  <option>LISTO Plus ($9.99/month)</option>
                  <option>LISTO Pro ($19.99/month)</option>
                </select>
              </div>
              
              {/* Terms Checkbox */}
              <div className="mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-slate-600">I agree to the Terms and Conditions</span>
                </label>
              </div>
              
              {/* CTA Button */}
              <button className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all">
                Start Your Journey
              </button>
            </div>
          </div>
        </header>

          {/* Quick Navigation Cards */}
        <div 
          className="card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {/* Wellness Card */}
          <div className="card-feature interactive-hover float-animation">
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
          </div>

          {/* Travel Hub Card */}
          <div className="card-feature interactive-hover" style={{animationDelay: '0.1s'}}>
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl flex items-center justify-center mr-6">
                <Plane className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Travel Hub</h3>
            </div>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Plan your adventures with itinerary builders, packing lists, and expense trackers designed for neurodivergent travelers.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-600">
                <Calendar className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-medium">Smart itinerary planning</span>
              </div>
              <div className="flex items-center text-slate-600">
                <CheckSquare className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-medium">Organized packing lists</span>
              </div>
              <div className="flex items-center text-slate-600">
                <DollarSign className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-medium">Expense tracking</span>
              </div>
            </div>
            <Link href="/travel">
              <button className="btn-premium btn-aurora w-full text-base">
                Start Planning <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>

          {/* Vision Board Card */}
          <div className="card-feature interactive-hover float-animation" style={{animationDelay: '0.2s'}}>
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
          </div>

          {/* Bucket List Card */}
          <div className="card-feature interactive-hover" style={{animationDelay: '0.3s'}}>
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl flex items-center justify-center mr-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Bucket List</h3>
            </div>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Your personal collection of dreams and goals with progress tracking, categorization, and multimedia attachments.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-600">
                <CheckSquare className="w-5 h-5 mr-3 text-orange-500" />
                <span className="font-medium">Goal organization</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Camera className="w-5 h-5 mr-3 text-orange-500" />
                <span className="font-medium">Photo attachments</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Link className="w-5 h-5 mr-3 text-orange-500" />
                <span className="font-medium">Link integration</span>
              </div>
            </div>
            <Link href="/bucket-list">
              <button className="btn-premium btn-sunset w-full text-base">
                View Goals <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>

          {/* Travel Map Card */}
          <div className="card-feature interactive-hover float-animation" style={{animationDelay: '0.4s'}}>
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-3xl flex items-center justify-center mr-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Travel Map</h3>
            </div>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Interactive map for exploring destinations, planning routes, and discovering attractions with personalized recommendations.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-600">
                <Navigation className="w-5 h-5 mr-3 text-teal-500" />
                <span className="font-medium">Route planning</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Heart className="w-5 h-5 mr-3 text-teal-500" />
                <span className="font-medium">Favorite locations</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Clock className="w-5 h-5 mr-3 text-teal-500" />
                <span className="font-medium">Visit tracking</span>
              </div>
            </div>
            <Link href="/map">
              <button className="btn-premium btn-ocean w-full text-base">
                Explore Map <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>

          {/* Medical Hub Card */}
          <div className="card-feature interactive-hover" style={{animationDelay: '0.5s'}}>
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-3xl flex items-center justify-center mr-6">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Medical Hub</h3>
            </div>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Manage appointments, medications, and health insights with executive function support and ADHD-friendly reminders.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center text-slate-600">
                <Timer className="w-5 h-5 mr-3 text-indigo-500" />
                <span className="font-medium">Smart medication reminders</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Calendar className="w-5 h-5 mr-3 text-indigo-500" />
                <span className="font-medium">Appointment management</span>
              </div>
              <div className="flex items-center text-slate-600">
                <Brain className="w-5 h-5 mr-3 text-indigo-500" />
                <span className="font-medium">Health insights & trends</span>
              </div>
            </div>
            <Link href="/medical-hub">
              <button className="btn-premium btn-indigo w-full text-base">
                Access Medical Hub <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </Link>
          </div>
        </div>

        {/* Premium Community Impact Section */}
        <div 
          className="card-luxe p-12 mb-20 overflow-hidden relative"
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
              <div 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl font-black text-gradient-emerald mb-3">12.4k</div>
                <div className="text-slate-700 font-semibold text-lg mb-1">Focus Sessions</div>
                <div className="text-sm text-slate-500 font-medium">This month</div>
              </div>
              
              <div 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl font-black text-gradient-ocean mb-3">8.9k</div>
                <div className="text-slate-700 font-semibold text-lg mb-1">Goals Achieved</div>
                <div className="text-sm text-slate-500 font-medium">All time</div>
              </div>
              
              <div 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl font-black text-gradient-sunset mb-3">24.7k</div>
                <div className="text-slate-700 font-semibold text-lg mb-1">Community Support</div>
                <div className="text-sm text-slate-500 font-medium">Interactions</div>
              </div>
              
              <div 
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="text-5xl font-black text-gradient-cosmic mb-3">156k</div>
                <div className="text-slate-700 font-semibold text-lg mb-1">Growth Moments</div>
                <div className="text-sm text-slate-500 font-medium">Tracked</div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Floating Action Button - Break Reminder */}
        <div
          className="fixed bottom-8 right-8 z-50"
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
        </div>

        {/* Footer */}
        <footer className="mt-20 bg-slate-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Company Info */}
              <div>
                <h4 className="text-xl font-bold mb-4">LISTO</h4>
                <p className="text-slate-300 mb-4">
                  Your neurodivergent-friendly companion for growth, wellness, and meaningful connections.
                </p>
                <p className="text-slate-400 text-sm">
                  Empowering lives through intelligent optimization.
                </p>
              </div>
              
              {/* Navigation Links */}
              <div>
                <h4 className="text-xl font-bold mb-4">Navigation</h4>
                <ul className="space-y-2">
                  <li><Link href="/wellness" className="text-slate-300 hover:text-white transition">Wellness Hub</Link></li>
                  <li><Link href="/medical-hub" className="text-slate-300 hover:text-white transition">Medical Hub</Link></li>
                  <li><Link href="/travel" className="text-slate-300 hover:text-white transition">Travel Hub</Link></li>
                  <li><Link href="/vision-board" className="text-slate-300 hover:text-white transition">Vision Board</Link></li>
                  <li><Link href="/bucket-list" className="text-slate-300 hover:text-white transition">Bucket List</Link></li>
                  <li><Link href="/map" className="text-slate-300 hover:text-white transition">Travel Map</Link></li>
                  <li><Link href="/explore" className="text-slate-300 hover:text-white transition">Explore</Link></li>
                </ul>
              </div>
              
              {/* Newsletter Sign-up */}
              <div>
                <h4 className="text-xl font-bold mb-4">Stay Updated</h4>
                <p className="text-slate-300 mb-4">
                  Subscribe to our newsletter for tips and updates.
                </p>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 rounded-l-lg text-slate-900"
                  />
                  <button className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-r-lg transition">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
            
            <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
              <p>&copy; 2025 LISTO. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { Calendar, Globe2, PartyPopper, Sparkle, HomeIcon, Sun, Moon, MapPin, Smile, BrainCircuit, Star, ChefHat, Move, Trash2, Loader2, Search, Mic, Loader, Flame, Leaf } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSpring, animated } from "@react-spring/web";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic<any>(
  () => import("react-leaflet").then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then(mod => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic<any>(
  () => import("react-leaflet").then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then(mod => mod.Popup),
  { ssr: false }
);

// Mock UI components to prevent import errors
const ProgressBar = ({ value, label, showPercentage, variant, steps, currentStep }: any) => (
  <div className="w-full bg-gray-200 rounded-full h-2">
    <div 
      className={`h-2 rounded-full transition-all duration-300 ${
        variant === 'success' ? 'bg-green-500' : 'bg-blue-500'
      }`}
      style={{ width: `${value}%` }}
    />
    {label && <div className="text-sm mt-1">{label}</div>}
  </div>
);

const FormField = ({ label, type, value, onChange, placeholder, variant, leftIcon, success, error }: any) => (
  <div className="space-y-2">
    {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
    />
    {success && <div className="text-green-600 text-xs">{success}</div>}
    {error && <div className="text-red-600 text-xs">{error}</div>}
  </div>
);

const Dropdown = ({ label, options, value, onChange, placeholder }: any) => (
  <div className="space-y-2">
    {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
    >
      <option value="">{placeholder}</option>
      {options?.map((option: any) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  </div>
);

const Toggle = ({ label, checked, onChange, size }: any) => (
  <div className="flex items-center justify-between">
    {label && <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

// Mock notifications hook
const useNotifications = () => ({
  addNotification: (message: string) => console.log('Notification:', message)
});

// --- Types
type SearchItem = {
  link: string;
  title: string;
  snippet: string;
  displayLink: string;
  pagemap?: { cse_image?: { src: string }[] };
  location?: { lat: number; lng: number };
};

type LocalProject = {
  title: string;
  desc: string;
  lat: number;
  lng: number;
  img?: string;
};

type Recipe = {
  name: string;
  desc: string;
  img: string;
  difficulty: string;
  link: string;
};

// --- Dynamic Daily Themes & Content ---
const dailyThemes = {
  monday: {
    theme: "Productivity & Focus",
    icon: "💪",
    color: "blue",
    highlights: [
      "🚀 Boost your productivity today",
      "⚡ Master your morning routine",
      "🎯 Set achievable daily goals",
      "💡 Learn efficiency hacks",
      "📝 Organize your workspace"
    ],
    quickCards: [
      { emoji: "⏰", title: "Time Management", desc: "Productivity hacks" },
      { emoji: "🧠", title: "Focus Techniques", desc: "Deep work tips" },
      { emoji: "📱", title: "Digital Minimalism", desc: "Less distractions" },
      { emoji: "🎯", title: "Goal Setting", desc: "SMART objectives" }
    ]
  },
  tuesday: {
    theme: "Community & Connection",
    icon: "🤝",
    color: "green",
    highlights: [
      "🌟 Connect with your community",
      "🤝 Meet like-minded people",
      "💝 Volunteer for a cause",
      "🎭 Join local events"
    ],
    quickCards: [
      { emoji: "🗓️", title: "Local Events", desc: "Community gatherings" },
      { emoji: "🤝", title: "Meetup Groups", desc: "Find your tribe" },
      { emoji: "💝", title: "Volunteer Opportunities", desc: "Give back" },
      { emoji: "🎨", title: "Creative Circles", desc: "Art & crafts" }
    ]
  },
  wednesday: {
    theme: "Wellness & Self-Care",
    icon: "🧘",
    color: "purple",
    highlights: [
      "🧘 Practice mindful moments",
      "💆 Prioritize self-care",
      "🌿 Embrace natural wellness",
      "😌 Find inner peace"
    ],
    quickCards: [
      { emoji: "🧘", title: "Meditation", desc: "Mindfulness practice" },
      { emoji: "🏃", title: "Fitness Routines", desc: "Home workouts" },
      { emoji: "🥗", title: "Healthy Eating", desc: "Nutrition tips" },
      { emoji: "😴", title: "Better Sleep", desc: "Rest optimization" }
    ]
  },
  thursday: {
    theme: "Learning & Growth",
    icon: "📚",
    color: "orange",
    highlights: [
      "🎓 Expand your knowledge",
      "🔬 Discover something new",
      "🎨 Explore creative skills",
      "💻 Learn digital tools"
    ],
    quickCards: [
      { emoji: "💻", title: "Online Courses", desc: "Skill development" },
      { emoji: "📖", title: "Reading Lists", desc: "Knowledge expansion" },
      { emoji: "🎨", title: "Creative Skills", desc: "Artistic pursuits" },
      { emoji: "🔬", title: "Science & Discovery", desc: "Curiosity driven" }
    ]
  },
  friday: {
    theme: "Adventure & Exploration",
    icon: "🎒",
    color: "teal",
    highlights: [
      "🗺️ Explore new places",
      "🎒 Plan your next adventure",
      "📸 Capture special moments",
      "🌟 Try something adventurous"
    ],
    quickCards: [
      { emoji: "🗺️", title: "Local Exploration", desc: "Hidden gems nearby" },
      { emoji: "🎒", title: "Weekend Trips", desc: "Short getaways" },
      { emoji: "📸", title: "Photography Spots", desc: "Scenic locations" },
      { emoji: "🥾", title: "Hiking Trails", desc: "Nature adventures" }
    ]
  },
  saturday: {
    theme: "Creativity & Expression",
    icon: "🎨",
    color: "pink",
    highlights: [
      "🎨 Express your creativity",
      "✍️ Write your thoughts",
      "🎵 Make some music",
      "📸 Capture the moment"
    ],
    quickCards: [
      { emoji: "🎨", title: "Art Projects", desc: "Creative expression" },
      { emoji: "✍️", title: "Writing Prompts", desc: "Tell your story" },
      { emoji: "🎵", title: "Music Making", desc: "Sound creation" },
      { emoji: "📸", title: "Photography", desc: "Visual storytelling" }
    ]
  },
  sunday: {
    theme: "Reflection & Planning",
    icon: "🌅",
    color: "indigo",
    highlights: [
      "🌅 Reflect on your week",
      "📋 Plan ahead mindfully",
      "🙏 Practice gratitude",
      "🎯 Set intentions"
    ],
    quickCards: [
      { emoji: "📝", title: "Weekly Review", desc: "Reflect & assess" },
      { emoji: "🎯", title: "Goal Planning", desc: "Set intentions" },
      { emoji: "🙏", title: "Gratitude Practice", desc: "Count blessings" },
      { emoji: "📚", title: "Learning Review", desc: "Knowledge recap" }
    ]
  }
};

// Get current day's theme
const getCurrentDayTheme = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  return dailyThemes[today as keyof typeof dailyThemes];
};

// Mock data
const mockProjects: LocalProject[] = [
  {
    title: "Local Food Bank",
    desc: "Help feed families in need",
    lat: 40.7608,
    lng: -111.8910,
    img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?fit=crop&w=300&q=80",
  },
  {
    title: "Community Garden",
    desc: "Grow fresh produce together",
    lat: 40.7540,
    lng: -111.8710,
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?fit=crop&w=300&q=80",
  },
];

const mockRecipes: Recipe[] = [
  {
    name: "15-min Avocado Toast Remix",
    desc: "Sourdough, smashed avo, chili flakes, drizzle of honey.",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?fit=crop&w=400&q=80",
    difficulty: "Easy",
    link: "https://www.allrecipes.com/recipe/240708/avocado-toast/",
  },
  {
    name: "One-Pan Lemon Garlic Chicken",
    desc: "Juicy chicken breast, roasted with lemon and garlic.",
    img: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?fit=crop&w=400&q=80",
    difficulty: "Beginner",
    link: "https://www.delish.com/cooking/recipe-ideas/a22889405/lemon-garlic-chicken-recipe/",
  }
];

const mockMicroVolunteer = [
  "Leave a positive review for a local business",
  "Pick up litter during your walk",
  "Send an encouraging message to someone",
  "Help an elderly neighbor with groceries"
];

// --- Main Component
export default function Explore() {
  // ✅ All hooks go here, at the top level of the function
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [highlight, setHighlight] = useState(getCurrentDayTheme().highlights[0]);
  const [darkMode, setDarkMode] = useState(false);
  const [grabBox, setGrabBox] = useState<SearchItem[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showItinerary, setShowItinerary] = useState(false);
  const [mood, setMood] = useState<string | null>(null);
  const [randomIndex, setRandomIndex] = useState<number>(0);
  const [recipeIndex, setRecipeIndex] = useState<number>(0);
  const [ecoSuggestions, setEcoSuggestions] = useState<LocalProject[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  
  // 🚀 Enhanced state for features
  const [achievements, setAchievements] = useState<string[]>([]);
  const [userPreferences, setUserPreferences] = useState({
    interests: [] as string[],
    ecoScore: 0,
    explorationStreak: 1,
    favoriteCategories: [] as string[],
    dailyGoalProgress: 0
  });
  const [particles, setParticles] = useState<Array<{id: string, x: number, y: number}>>([]);
  const [smartSuggestions, setSmartSuggestions] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  
  // 🎯 Dynamic Content State
  const [currentTheme, setCurrentTheme] = useState(getCurrentDayTheme());
  
  // 📱 Mobile App Design Elements State
  const { addNotification } = useNotifications();
  const [demoProgress, setDemoProgress] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    location: "",
    notifications: true,
    theme: "sage"
  });

  // Motion values for advanced animations
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  // 🎭 Magical cursor tracking effect
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    
    // Create particle trails
    if (Math.random() > 0.9) {
      const newParticle = {
        id: Date.now().toString(),
        x: e.clientX,
        y: e.clientY
      };
      setParticles(prev => [...prev.slice(-5), newParticle]);
    }
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // ✨ Clean up particles
  useEffect(() => {
    const cleanup = setInterval(() => {
      setParticles(prev => prev.slice(-3));
    }, 1000);
    return () => clearInterval(cleanup);
  }, []);

  // 🏆 Achievement system
  const unlockAchievement = useCallback((achievement: string) => {
    if (!achievements.includes(achievement)) {
      setAchievements(prev => [...prev, achievement]);
      setToast(`🏆 Achievement Unlocked: ${achievement}!`);
      setTimeout(() => setToast(null), 3000);
    }
  }, [achievements]);

  // 🎯 Smart content recommendations based on user behavior
  const generateSmartSuggestions = useCallback(() => {
    const suggestions = [
      "sustainable living tips",
      "local events near me",
      "outdoor activities today",
      "healthy recipes",
      "travel destinations",
      "mindfulness practices",
      "creative projects",
      "fitness routines"
    ];
    setSmartSuggestions(suggestions.slice(0, 5));
  }, []);

  // 🗣️ Voice search functionality
  const startVoiceSearch = useCallback(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        unlockAchievement("Voice Explorer");
      };
      
      recognition.onerror = () => {
        setIsListening(false);
      };
      
      recognition.start();
    }
  }, [unlockAchievement]);

  const toggleVoiceSearch = useCallback(() => {
    if (isListening) {
      setIsListening(false);
    } else {
      startVoiceSearch();
    }
  }, [isListening, startVoiceSearch]);

  // Animate highlight bar + smart content rotation with daily themes
  useEffect(() => {
    const interval = setInterval(() => {
      setHighlight((prev) => {
        const highlights = currentTheme.highlights;
        const idx = highlights.indexOf(prev);
        return highlights[(idx + 1) % highlights.length];
      });
      setRecipeIndex((i) => (i + 1) % mockRecipes.length);
      
      // Generate smart suggestions periodically
      if (Math.random() > 0.7) {
        generateSmartSuggestions();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [generateSmartSuggestions, currentTheme]);

  // Update theme daily
  useEffect(() => {
    const updateTheme = () => {
      const newTheme = getCurrentDayTheme();
      setCurrentTheme(newTheme);
      setHighlight(newTheme.highlights[0]);
    };
    
    updateTheme();
    const interval = setInterval(updateTheme, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);

  // Enhanced location tracking
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          unlockAchievement("Location Explorer");
        },
        () => {
          setUserLocation(null);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [unlockAchievement]);

  // Smart eco suggestions
  useEffect(() => {
    async function fetchEcoSuggestions() {
      if (userLocation) {
        const filteredProjects = mockProjects.filter(project => {
          if (mood === "😃") return project.title.includes("Community");
          if (mood === "🌱") return project.title.includes("Garden");
          return true;
        });
        setEcoSuggestions(filteredProjects);
        
        setUserPreferences(prev => ({
          ...prev,
          ecoScore: prev.ecoScore + 0.5
        }));
      }
    }
    fetchEcoSuggestions();
  }, [userLocation, mood]);

  // Smart streak tracking
  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = localStorage.getItem('lastExploreVisit');
    
    if (lastVisit !== today) {
      setUserPreferences(prev => ({
        ...prev,
        explorationStreak: lastVisit === new Date(Date.now() - 86400000).toDateString() 
          ? prev.explorationStreak + 1 
          : 1
      }));
      localStorage.setItem('lastExploreVisit', today);
      
      if (userPreferences.explorationStreak >= 3) {
        unlockAchievement("Streak Master");
      }
    }
  }, [unlockAchievement, userPreferences.explorationStreak]);

  // Enhanced search handler with progress tracking
  const handleSearch = async () => {
    if (!query.trim()) return;
    setErrorMessage(""); 
    setItems([]); 
    setLoading(true);
    
    // Track search behavior for recommendations
    setUserPreferences(prev => ({
      ...prev,
      interests: Array.from(new Set([...prev.interests, query.toLowerCase()]))
    }));
    
    try {
      // Simulate realistic loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Enhanced mock results
      const mockResults: SearchItem[] = [
        {
          link: `https://example.com/search/${query}`,
          title: `${query} - Trending Discovery`,
          snippet: `Hot topic! "${query}" is trending worldwide. See what everyone's talking about.`,
          displayLink: "trending.com",
          pagemap: {
            cse_image: [{
              src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?fit=crop&w=400&q=80"
            }]
          }
        },
        {
          link: `https://example.com/search/${query}-local`,
          title: `Local ${query} Near You`,
          snippet: `Find ${query} opportunities in your area. Personalized for your location.`,
          displayLink: "local-finder.com",
          pagemap: {
            cse_image: [{
              src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?fit=crop&w=400&q=80"
            }]
          }
        }
      ];
      
      setItems(mockResults);
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      
      // Achievement for first search
      if (userPreferences.interests.length === 1) {
        unlockAchievement("First Explorer");
      }
      
    } catch (e) {
      console.error("Search failed:", e);
      setErrorMessage("Oops! Something magical went wrong. Please try again! ✨");
    }
    setLoading(false);
  };

  // Drag/Drop for itinerary
  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    const reordered = Array.from(grabBox);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);
    setGrabBox(reordered);
  };

  const addToGrabBox = (item: SearchItem) => {
    if (!grabBox.find((i) => i.link === item.link)) {
      setGrabBox([...grabBox, item]);
      
      const celebrations = [
        "Added to your kawaii itinerary! 🌸",
        "Great choice! ✨ Adventure awaits!",
        "Boom! 💥 That's going places!"
      ];
      
      const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)];
      setToast(randomCelebration);
      setTimeout(() => setToast(null), 2000);
      
      if (grabBox.length + 1 >= 5) {
        unlockAchievement("Itinerary Master");
      }
    }
    setShowItinerary(true);
  };

  const removeFromGrabBox = (link: string) => setGrabBox(grabBox.filter(i => i.link !== link));
  const clearGrabBox = () => setGrabBox([]);

  // Enhanced surprise generator
  const handleRandomizer = () => {
    const newIndex = Math.floor(Math.random() * mockMicroVolunteer.length);
    setRandomIndex(newIndex);
    setHighlight("✨ Surprise: " + mockMicroVolunteer[newIndex]);
    unlockAchievement("Surprise Seeker");
  };

  // Animated eco impact
  const ecoImpact = grabBox.length * 1.2;
  const ecoSpring = useSpring({ number: ecoImpact, from: { number: 0 } });

  return (
    <div className={`${darkMode ? "dark" : ""} font-sans transition-all duration-300`} style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-gray-50 to-stone-50 dark:from-stone-900 dark:via-gray-900 dark:to-stone-900 text-stone-800 dark:text-stone-100">

        {/* ✨ Particle System */}
        <div className="fixed inset-0 pointer-events-none z-40">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1.5 h-1.5 bg-blue-400/70 rounded-full"
              initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
              animate={{ 
                y: particle.y - 60, 
                opacity: 0, 
                scale: 0,
                rotate: 180 
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          ))}
        </div>

        {/* 🏆 Achievement Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 20, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              className="fixed top-20 right-4 z-50 bg-white/95 dark:bg-stone-800/95 backdrop-blur-lg text-stone-700 dark:text-stone-200 px-5 py-3 rounded-2xl font-medium shadow-2xl border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm">{toast}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NAVBAR */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          className="flex justify-between items-center bg-white/90 dark:bg-stone-900/90 backdrop-blur-xl shadow-sm py-5 px-8 border-b border-stone-200/50 dark:border-stone-700/50 z-30"
        >
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <HomeIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-stone-800 dark:text-stone-200 tracking-tight">
                LISTO
              </span>
            </motion.div>
          </Link>
          
          <div className="flex items-center gap-6">
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-stone-700 to-blue-600 text-transparent bg-clip-text">
              Explore
            </span>
            
            {/* Streak Counter */}
            {userPreferences.explorationStreak > 1 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 bg-blue-100 dark:bg-blue-800/50 px-3 py-1.5 rounded-full"
              >
                <Flame className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                  {userPreferences.explorationStreak}
                </span>
              </motion.div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {/* Eco Score Badge */}
            {userPreferences.ecoScore > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-full border border-green-200/50 dark:border-green-700/50"
              >
                <Leaf className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span className="text-xs font-medium text-green-700 dark:text-green-300">
                  {Math.round(userPreferences.ecoScore)}
                </span>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setDarkMode(!darkMode)}
              className="rounded-xl p-2.5 bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? 
                <Sun className="w-4 h-4 text-stone-600 dark:text-stone-400" /> : 
                <Moon className="w-4 h-4 text-stone-600 dark:text-stone-400" />
              }
            </motion.button>
          </div>
        </motion.nav>

        {/* THEME HIGHLIGHT BAR */}
        <motion.div
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-center py-6 bg-gradient-to-r from-blue-50 via-stone-50 to-blue-50 dark:from-blue-900/30 dark:via-blue-900/30 dark:to-blue-900/30 border-b border-stone-200/50 dark:border-stone-700/50"
        >
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center gap-4 mb-2">
              <span className="text-2xl">{currentTheme.icon}</span>
              <span className="font-semibold text-xl text-stone-800 dark:text-stone-200 tracking-wide">
                {currentTheme.theme}
              </span>
              <span className="text-2xl">{currentTheme.icon}</span>
            </div>
            <div className="text-sm text-stone-600 dark:text-stone-400 font-medium max-w-2xl mx-auto leading-relaxed">
              {highlight}
            </div>
          </div>
        </motion.div>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-4 py-10" ref={resultsRef}>
          {/* ENHANCED SEARCH BAR */}
          <div className="mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center border-2 border-blue-100 dark:border-blue-900"
            >
              <div className="font-bold text-lg mb-2">Today's Smart Plan</div>
              <div className="text-blue-600 dark:text-blue-200 mb-4">Explore and discover new experiences!</div>
              
              <div className="flex gap-3 w-full max-w-md">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search images, articles, places..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSearch}
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? <Loader className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleVoiceSearch}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isListening 
                      ? 'bg-red-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  <Mic className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-xl"
            >
              <p className="text-center text-red-600 dark:text-red-400">{errorMessage}</p>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center items-center py-20"
            >
              <div className="text-center">
                <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
                <p className="text-stone-600 dark:text-stone-400">Searching for amazing discoveries...</p>
              </div>
            </motion.div>
          )}

          {/* SEARCH RESULTS */}
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid lg:grid-cols-2 gap-6 mb-10"
            >
              {items.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-stone-800 rounded-xl shadow-lg overflow-hidden border border-stone-200 dark:border-stone-700"
                >
                  {item.pagemap?.cse_image?.[0] && (
                    <img
                      src={item.pagemap.cse_image[0].src}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 text-stone-800 dark:text-stone-200">
                      {item.title}
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 mb-4 text-sm">
                      {item.snippet}
                    </p>
                    <div className="flex gap-3">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                      >
                        Visit →
                      </a>
                      <button
                        onClick={() => addToGrabBox(item)}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Add to Itinerary ✨
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* DAILY THEME QUICK CARDS */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-center mb-6 text-stone-800 dark:text-stone-200">
              {currentTheme.theme} Ideas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {currentTheme.quickCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white dark:bg-stone-800 rounded-xl p-4 shadow-lg border border-stone-200 dark:border-stone-700 cursor-pointer"
                  onClick={() => setQuery(card.title)}
                >
                  <div className="text-2xl mb-2">{card.emoji}</div>
                  <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-1">
                    {card.title}
                  </h3>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* SURPRISE GENERATOR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRandomizer}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              ✨ Surprise Me! ✨
            </motion.button>
            <p className="mt-4 text-stone-600 dark:text-stone-400">
              {mockMicroVolunteer[randomIndex]}
            </p>
          </motion.div>

        </main>

        {/* GRAB BOX FOOTER + ITINERARY (Drag-and-drop) */}
        {grabBox.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-stone-800/90 border-t-2 border-stone-200 dark:border-stone-700 p-4 shadow-inner z-50 rounded-t-3xl">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="grabBox" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex gap-3 flex-1 overflow-x-auto"
                    >
                      {grabBox.map((item, index) => (
                        <Draggable key={item.link} draggableId={item.link} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="min-w-48 bg-white dark:bg-stone-700 rounded-xl p-3 shadow-lg border border-stone-200 dark:border-stone-600"
                            >
                              <h4 className="font-medium text-sm text-stone-800 dark:text-stone-200 mb-1 truncate">
                                {item.title}
                              </h4>
                              <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                                {item.snippet}
                              </p>
                              <button
                                onClick={() => removeFromGrabBox(item.link)}
                                className="mt-2 text-red-500 hover:text-red-600 text-xs"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              
              <div className="flex gap-3 ml-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearGrabBox}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  Clear All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowItinerary(!showItinerary)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  {showItinerary ? "Hide" : "Show"} Itinerary ({grabBox.length})
                </motion.button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

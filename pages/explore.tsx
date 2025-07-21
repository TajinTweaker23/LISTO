import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { Calendar, Globe2, PartyPopper, Sparkle, HomeIcon, Sun, Moon, MapPin, Smile, BrainCircuit, Star, ChefHat, Move, Trash2, Loader2, Search, Mic, Loader, Flame, Leaf } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring as useFramerSpring } from "framer-motion";
import dynamic from "next/dynamic";

// Mobile App Design Components
import LoaderComponent from "../components/ui/Loader";
import ProgressBar from "../components/ui/ProgressBar";
import { FormField, Dropdown, Toggle } from "../components/ui/FormComponents";
import Tooltip from "../components/ui/Tooltip";
import { ProductCard, Accordion } from "../components/ui/EnhancedCards";
import { ImageCarousel } from "../components/ui/Carousel";
import { useNotifications } from "../components/ui/NotificationSystem";

// Dynamically import MapContainer to avoid SSR issues
const MapContainer = dynamic<any>(
  () => import("react-leaflet").then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then(mod => mod.TileLayer),
  { ssr: false }
);
import type { MarkerProps } from "react-leaflet";
const Marker = dynamic<MarkerProps>(
  () => import("react-leaflet").then(mod => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then(mod => mod.Popup),
  { ssr: false }
);
import { useSpring, animated } from "@react-spring/web";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
      { emoji: "🎯", title: "Goal Setting", desc: "SMART objectives" },
      { emoji: "📚", title: "Skill Building", desc: "Learning paths" },
      { emoji: "🔄", title: "Habit Tracking", desc: "Build routines" },
      { emoji: "🌱", title: "Personal Growth", desc: "Self improvement" },
      { emoji: "⚖️", title: "Work-Life Balance", desc: "Healthy boundaries" }
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
      "🎭 Join local events",
      "🗣️ Start meaningful conversations"
    ],
    quickCards: [
      { emoji: "�️", title: "Local Events", desc: "Community gatherings" },
      { emoji: "🤝", title: "Meetup Groups", desc: "Find your tribe" },
      { emoji: "💝", title: "Volunteer Opportunities", desc: "Give back" },
      { emoji: "🎨", title: "Creative Circles", desc: "Art & crafts" },
      { emoji: "🏃", title: "Fitness Groups", desc: "Active communities" },
      { emoji: "📚", title: "Book Clubs", desc: "Literary discussions" },
      { emoji: "🌱", title: "Environmental Groups", desc: "Eco initiatives" },
      { emoji: "🎭", title: "Social Activities", desc: "Fun connections" }
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
      "😌 Find inner peace",
      "🏃 Move your body joyfully"
    ],
    quickCards: [
      { emoji: "🧘", title: "Meditation", desc: "Mindfulness practice" },
      { emoji: "🏃", title: "Fitness Routines", desc: "Home workouts" },
      { emoji: "🥗", title: "Healthy Eating", desc: "Nutrition tips" },
      { emoji: "😴", title: "Better Sleep", desc: "Rest optimization" },
      { emoji: "🌿", title: "Natural Remedies", desc: "Holistic health" },
      { emoji: "💆", title: "Stress Relief", desc: "Relaxation techniques" },
      { emoji: "🎨", title: "Creative Therapy", desc: "Art for wellness" },
      { emoji: "📱", title: "Digital Detox", desc: "Screen-free time" }
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
      "💻 Learn digital tools",
      "🌍 Understand the world better"
    ],
    quickCards: [
      { emoji: "💻", title: "Online Courses", desc: "Skill development" },
      { emoji: "📖", title: "Reading Lists", desc: "Knowledge expansion" },
      { emoji: "🎨", title: "Creative Skills", desc: "Artistic pursuits" },
      { emoji: "🔬", title: "Science & Discovery", desc: "Curiosity driven" },
      { emoji: "🌍", title: "Language Learning", desc: "Global communication" },
      { emoji: "🎵", title: "Music & Audio", desc: "Sound exploration" },
      { emoji: "🏗️", title: "DIY Projects", desc: "Hands-on learning" },
      { emoji: "📈", title: "Professional Development", desc: "Career growth" }
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
      "🌟 Try something adventurous",
      "🚗 Discover hidden gems"
    ],
    quickCards: [
      { emoji: "🗺️", title: "Local Exploration", desc: "Hidden gems nearby" },
      { emoji: "🎒", title: "Weekend Trips", desc: "Short getaways" },
      { emoji: "📸", title: "Photography Spots", desc: "Scenic locations" },
      { emoji: "🥾", title: "Hiking Trails", desc: "Nature adventures" },
      { emoji: "🍽️", title: "Food Adventures", desc: "Culinary exploration" },
      { emoji: "�", title: "Entertainment", desc: "Fun activities" },
      { emoji: "🏛️", title: "Cultural Sites", desc: "Museums & history" },
      { emoji: "🌅", title: "Scenic Views", desc: "Beautiful vistas" }
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
      "📸 Capture the moment",
      "🎭 Perform and play"
    ],
    quickCards: [
      { emoji: "🎨", title: "Art Projects", desc: "Creative expression" },
      { emoji: "✍️", title: "Writing Prompts", desc: "Tell your story" },
      { emoji: "🎵", title: "Music Making", desc: "Sound creation" },
      { emoji: "📸", title: "Photography", desc: "Visual storytelling" },
      { emoji: "🎭", title: "Performance", desc: "Stage & screen" },
      { emoji: "�", title: "Crafting", desc: "Handmade creations" },
      { emoji: "🍳", title: "Culinary Arts", desc: "Food as art" },
      { emoji: "🏗️", title: "Building & Making", desc: "Create something" }
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
      "🎯 Set intentions",
      "🌱 Nurture your growth"
    ],
    quickCards: [
      { emoji: "📝", title: "Weekly Review", desc: "Reflect & assess" },
      { emoji: "🎯", title: "Goal Planning", desc: "Set intentions" },
      { emoji: "�", title: "Gratitude Practice", desc: "Count blessings" },
      { emoji: "📚", title: "Learning Review", desc: "Knowledge recap" },
      { emoji: "🌱", title: "Personal Growth", desc: "Self development" },
      { emoji: "🔮", title: "Future Visioning", desc: "Dream planning" },
      { emoji: "🧘", title: "Mindful Moments", desc: "Present awareness" },
      { emoji: "📊", title: "Progress Tracking", desc: "Measure growth" }
    ]
  }
};

// Get current day's theme
const getCurrentDayTheme = () => {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  return dailyThemes[today as keyof typeof dailyThemes];
};

const mockWeather = {
  icon: "🌤️",
  temp: "72°F",
  desc: "Sunny with light breeze",
  suggestion: "Perfect day for a walk or volunteering outdoors!",
};
// --- Travel Planning Data Structures ---
type TravelBoardItem = {
  id: string;
  type: 'place' | 'activity' | 'restaurant' | 'accommodation' | 'transport' | 'note' | 'media';
  title: string;
  description: string;
  location?: { lat: number; lng: number; address: string };
  timeEstimate?: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  scheduledTime?: string;
  cost?: number;
  tags: string[];
  media?: { type: 'image' | 'video' | 'link'; url: string; thumbnail?: string }[];
  notes?: string;
  addedDate: Date;
};

type TravelBoard = {
  id: string;
  name: string;
  destination: string;
  startDate?: Date;
  endDate?: Date;
  items: TravelBoardItem[];
  collaborators?: string[];
  isPublic: boolean;
  color: string;
};

// Professional travel planning tools data
const travelPlanningTools = [
  {
    name: "Itinerary Optimizer",
    description: "AI-powered route optimization to minimize travel time and maximize experiences",
    icon: "🗺️",
    action: "optimize-route"
  },
  {
    name: "Budget Tracker",
    description: "Track expenses and stay within budget with smart spending insights",
    icon: "💰",
    action: "track-budget"
  },
  {
    name: "Local Insights",
    description: "Get insider tips from locals and discover hidden gems",
    icon: "💎",
    action: "local-insights"
  },
  {
    name: "Weather Planner",
    description: "Plan activities based on weather forecasts and seasonal recommendations",
    icon: "🌤️",
    action: "weather-plan"
  },
  {
    name: "Group Collaboration",
    description: "Plan together with friends and family in real-time",
    icon: "👥",
    action: "collaborate"
  },
  {
    name: "Offline Access",
    description: "Download your plans for offline access during travel",
    icon: "📱",
    action: "offline-mode"
  }
];

// Location-based quick actions when user is near board items
const nearbyQuickActions = [
  {
    type: "check-in",
    label: "Check In Here",
    description: "Mark this location as visited",
    icon: "📍"
  },
  {
    type: "add-photos",
    label: "Add Photos",
    description: "Capture memories of this place",
    icon: "📸"
  },
  {
    type: "add-notes",
    label: "Add Notes",
    description: "Share your experience",
    icon: "📝"
  },
  {
    type: "extend-time",
    label: "Spending More Time?",
    description: "Find nearby items from your board",
    icon: "⏰"
  },
  {
    type: "share-location",
    label: "Share with Group",
    description: "Let others know where you are",
    icon: "📤"
  }
];

// Mock day plans for the Smart Plan widget
const mockDayPlans = [
  "Morning walk & coffee at a local shop",
  "Volunteer at the food bank",
  "Read a new book chapter",
  "Try a new recipe for dinner",
  "Attend a community event",
  "Plant a tree in your neighborhood",
  "Explore a new park nearby",
  "Support a local business",
  "Donate unused clothes",
  "Write a thank-you note",
  "Share a positive post online",
  "Call a friend or family member",
];

const mockMicroVolunteer = [
  "Leave a positive review for a local business",
  "Pick up litter during your walk",
  "Send an encouraging message to someone",
  "Help an elderly neighbor with groceries",
  "Donate books to a local library",
  "Volunteer at an animal shelter",
  "Plant flowers in your community",
  "Help someone learn a new skill",
];

const mockChallenges = [
  { badge: "🚲", challenge: "Bike instead of drive" },
  { badge: "🌱", challenge: "Plant something today" },
  { badge: "📚", challenge: "Read for 30 minutes" },
  { badge: "💌", challenge: "Send a thank you note" },
  { badge: "🏃", challenge: "Walk 10,000 steps" },
];

const mockGIFs = [
  { src: "https://media.giphy.com/media/26ufnwz3wDUli7GU0/giphy.gif", alt: "Inspiration" },
  { src: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif", alt: "Mindset" },
  { src: "https://media.giphy.com/media/3o7aCRloybJlXpNjSU/giphy.gif", alt: "Motivation" },
  { src: "https://media.giphy.com/media/26AHPxxnSw1L9T1rW/giphy.gif", alt: "Success" },
];

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

const mockNews = [
  {
    title: "Green Tech Innovation",
    url: "https://www.ksl.com/",
    snippet: "Green startups and local artists team up for sustainability...",
    img: "https://images.unsplash.com/photo-1497436072909-f5e4be1713c2?fit=crop&w=300&q=80",
    date: "Sat 8:30am",
  },
  {
    title: "Community Volunteer Day",
    url: "https://www.example.com/",
    snippet: "Join hundreds of volunteers for a city-wide cleanup event...",
    img: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?fit=crop&w=300&q=80",
    date: "Sun 9:00am",
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
  },
  {
    name: "Creamy Vegan Pasta",
    desc: "Cashew cream, spinach, tomatoes, penne.",
    img: "https://images.unsplash.com/photo-1512058564366-c9e2b1e01b63?fit=crop&w=400&q=80",
    difficulty: "Medium",
    link: "https://minimalistbaker.com/creamy-vegan-garlic-pasta/",
  },
];

const mockTrending = [
  "Mental Health Resources",
  "Volunteer in Your City", 
  "AI Tools for Creators",
  "How to Start a Side Hustle",
  "Productive Morning Routines",
  "Community Events Near Me",
  "Mindfulness Techniques",
  "Creative Writing Prompts"
];

const localImages = [
  { src: "/Digital tools and devices.avif", alt: "Digital tools and devices" },
  { src: "/Dinner inspo.jpg", alt: "Dinner Inspiration" },
  { src: "/Modern Workspace.avif", alt: "Modern Workspace" },
  { src: "/Night Sky.jpg", alt: "Night Sky" },
  { src: "/Salad.jpg", alt: "Salad" },
  { src: "/Sightseeing.jpg", alt: "Sightseeing" },
  { src: "/soccer.jpg", alt: "Soccer" },
  { src: "/Studying.avif", alt: "Studying" },
  { src: "/Wellness.avif", alt: "Wellness" },
  { src: "/Work Coffee.avif", alt: "Work Coffee" },
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
  
  // 🚀 Enhanced state for wow features
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

  // 🗺️ Travel Planning State
  const [travelBoards, setTravelBoards] = useState<TravelBoard[]>([]);
  const [activeTravelBoard, setActiveTravelBoard] = useState<string | null>(null);
  const [showTravelPlanning, setShowTravelPlanning] = useState(false);
  const [nearbyBoardItems, setNearbyBoardItems] = useState<TravelBoardItem[]>([]);
  const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);

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
  }, [userLocation]);

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
  }, []); // Keep empty dependency array

  // Enhanced location tracking with travel board integration
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationPermissionGranted(true);
          unlockAchievement("Location Explorer");
          
          // Check for nearby travel board items
          checkNearbyBoardItems(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          setUserLocation(null);
          setLocationPermissionGranted(false);
        },
        { enableHighAccuracy: true }
      );
    }
  }, [unlockAchievement, travelBoards]);

  // Function to check for nearby travel board items
  const checkNearbyBoardItems = useCallback((lat: number, lng: number) => {
    const nearbyItems: TravelBoardItem[] = [];
    const proximityThreshold = 0.01; // roughly 1km

    travelBoards.forEach(board => {
      board.items.forEach(item => {
        if (item.location && !item.completed) {
          const distance = Math.sqrt(
            Math.pow(item.location.lat - lat, 2) + 
            Math.pow(item.location.lng - lng, 2)
          );
          
          if (distance <= proximityThreshold) {
            nearbyItems.push(item);
          }
        }
      });
    });

    setNearbyBoardItems(nearbyItems);
    
    // Notify user if they're near board items
    if (nearbyItems.length > 0 && locationPermissionGranted) {
      setToast(`📍 You're near ${nearbyItems.length} item(s) from your travel board!`);
      setTimeout(() => setToast(null), 4000);
    }
  }, [travelBoards, locationPermissionGranted]);

  // Travel board management functions
  const createTravelBoard = useCallback((name: string, destination: string) => {
    const newBoard: TravelBoard = {
      id: Date.now().toString(),
      name,
      destination,
      items: [],
      isPublic: false,
      color: ['blue', 'green', 'purple', 'pink', 'orange'][Math.floor(Math.random() * 5)]
    };
    
    setTravelBoards(prev => [...prev, newBoard]);
    setActiveTravelBoard(newBoard.id);
    unlockAchievement("Travel Planner");
    
    return newBoard.id;
  }, [unlockAchievement]);

  // Smart eco suggestions with AI-like recommendations
  useEffect(() => {
    async function fetchEcoSuggestions() {
      if (userLocation) {
        // Simulate smart filtering based on user preferences
        const filteredProjects = mockProjects.filter(project => {
          if (mood === "😃") return project.title.includes("Community");
          if (mood === "🌱") return project.title.includes("Garden");
          return true;
        });
        setEcoSuggestions(filteredProjects);
        
        // Update eco score
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
      // Simulate realistic loading with progress
      const loadingSteps = [
        { progress: 20, message: "🔍 Analyzing your query..." },
        { progress: 40, message: "🌐 Searching the web..." },
        { progress: 60, message: "🎯 Finding perfect matches..." },
        { progress: 80, message: "✨ Adding personal touches..." },
        { progress: 100, message: "🎉 Ready to explore!" }
      ];
      
      for (const step of loadingSteps) {
        await new Promise(resolve => setTimeout(resolve, 300));
      }
      
      // Enhanced mock results with variety
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
        },
        {
          link: `https://example.com/search/${query}-guide`,
          title: `Ultimate ${query} Guide`,
          snippet: `Everything you need to know about ${query}. Expert tips and insider secrets.`,
          displayLink: "expert-guide.com",
          pagemap: {
            cse_image: [{
              src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?fit=crop&w=400&q=80"
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

  // Drag/Drop for itinerary (react-beautiful-dnd)
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
      
      // Enhanced celebration messages
      const celebrations = [
        "Added to your kawaii itinerary! 🌸",
        "Great choice! ✨ Adventure awaits!",
        "Boom! 💥 That's going places!",
        "Smart pick! 🎯 Your trip is shaping up!",
        "Excellent! 🌟 You're a natural explorer!"
      ];
      
      const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)];
      setToast(randomCelebration);
      setTimeout(() => setToast(null), 2000);
      
      // Create celebration particles
      for (let i = 0; i < 5; i++) {
        setTimeout(() => {
          const particle = {
            id: `celebration-${Date.now()}-${i}`,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight
          };
          setParticles(prev => [...prev, particle]);
        }, i * 100);
      }
      
      // Achievement tracking
      if (grabBox.length + 1 >= 5) {
        unlockAchievement("Itinerary Master");
      }
      
      // Update eco score for sustainable choices
      if (item.title.toLowerCase().includes('eco') || 
          item.title.toLowerCase().includes('green') ||
          item.title.toLowerCase().includes('sustainable')) {
        setUserPreferences(prev => ({
          ...prev,
          ecoScore: prev.ecoScore + 2
        }));
        unlockAchievement("Eco Warrior");
      }
    }
    setShowItinerary(true);
  };
  const removeFromGrabBox = (link: string) => setGrabBox(grabBox.filter(i => i.link !== link));
  const clearGrabBox = () => setGrabBox([]);

  // Accent gradient helper
  const accentGradient = "bg-gradient-to-r from-pink-200 via-indigo-200 to-teal-200 text-transparent bg-clip-text";

  // Enhanced surprise generator with mood-based suggestions
  const handleRandomizer = () => {
    let suggestions = mockMicroVolunteer;
    
    // Mood-based filtering
    if (mood === "😃") {
      suggestions = suggestions.filter(s => s.includes("positive") || s.includes("help") || s.includes("thank"));
    } else if (mood === "🌱") {
      suggestions = suggestions.filter(s => s.includes("plant") || s.includes("books") || s.includes("library"));
    }
    
    const newIndex = Math.floor(Math.random() * suggestions.length);
    setRandomIndex(newIndex);
    setHighlight("✨ Surprise: " + suggestions[newIndex]);
    
    // Achievement for using randomizer
    unlockAchievement("Surprise Seeker");
  };

  // Eco marker icon (kawaii pastel pin)
  const ecoIcon = useMemo(() => {
    if (typeof window === "undefined") return undefined;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const L = require("leaflet");
    return new L.Icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
      iconSize: [36, 36],
      iconAnchor: [18, 36],
    });
  }, []);

  // Animated eco impact
  const ecoImpact = grabBox.length * 1.2;
  const ecoSpring = useSpring({ number: ecoImpact, from: { number: 0 } });

  return (
    <div className={`${darkMode ? "dark" : ""} font-sans transition-all duration-300`} style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}>
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-sage-50 to-warm-gray-50 dark:from-stone-900 dark:via-sage-900 dark:to-warm-gray-900 text-stone-800 dark:text-stone-100">

        {/* ✨ Sophisticated Particle System */}
        <div className="fixed inset-0 pointer-events-none z-40">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-1.5 h-1.5 bg-sage-400/70 rounded-full"
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

        {/* 🏆 Elegant Achievement Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.95 }}
              animate={{ opacity: 1, y: 20, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.95 }}
              className="fixed top-20 right-4 z-50 bg-white/95 dark:bg-stone-800/95 backdrop-blur-lg text-stone-700 dark:text-stone-200 px-5 py-3 rounded-2xl font-medium shadow-2xl border border-sage-200/50 dark:border-sage-700/50"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-sage-400 rounded-full animate-pulse"></div>
                <span className="text-sm">{toast}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SOPHISTICATED NAVBAR - Pinterest/VSCO inspired */}
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
              <div className="w-8 h-8 bg-gradient-to-br from-sage-400 to-sage-600 rounded-xl flex items-center justify-center">
                <HomeIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold text-stone-800 dark:text-stone-200 tracking-tight">
                LISTO
              </span>
            </motion.div>
          </Link>
          
          <div className="flex items-center gap-6">
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-sage-600 via-stone-700 to-sage-600 text-transparent bg-clip-text">
              Explore
            </span>
            
            {/* Minimalist Streak Counter */}
            {userPreferences.explorationStreak > 1 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1.5 bg-sage-100 dark:bg-sage-800/50 px-3 py-1.5 rounded-full"
              >
                <Flame className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
                <span className="text-xs font-medium text-sage-700 dark:text-sage-300">
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

        {/* ELEGANT THEME HIGHLIGHT BAR - Squarespace inspired */}
        <motion.div
          animate={{ opacity: [0.9, 1, 0.9] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-center py-6 bg-gradient-to-r from-sage-50 via-stone-50 to-sage-50 dark:from-sage-900/30 dark:via-sage-900/30 dark:to-sage-900/30 border-b border-stone-200/50 dark:border-stone-700/50"
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

        {/* 📱 MOBILE APP DESIGN SHOWCASE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-sage-100 via-stone-100 to-sage-100 dark:from-sage-900/20 dark:via-stone-900/20 dark:to-sage-900/20 py-8 px-4 border-b border-stone-200/50 dark:border-stone-700/50"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <motion.h2
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-2xl font-bold text-stone-800 dark:text-stone-200 mb-2"
              >
                ✨ Enhanced Mobile Experience
              </motion.h2>
              <p className="text-stone-600 dark:text-stone-400">
                Professional mobile app design elements inspired by decode.agency
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Progress & Feedback */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                  📊 Progress & Feedback
                </h3>
                
                <div className="space-y-4">
                  <ProgressBar
                    value={demoProgress}
                    label="Daily Goals Progress"
                    showPercentage={true}
                    variant="success"
                  />
                  
                  <ProgressBar
                    value={0}
                    steps={["Setup", "Explore", "Create", "Share"]}
                    currentStep={1}
                    label="Onboarding Progress"
                  />
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setDemoProgress((prev) => Math.min(prev + 25, 100));
                      addNotification({
                        type: "success",
                        title: "Progress Updated!",
                        message: `You're ${Math.min(demoProgress + 25, 100)}% complete`,
                      });
                    }}
                    className="w-full py-3 px-4 bg-sage-600 text-white rounded-2xl font-medium hover:bg-sage-700 transition-colors"
                  >
                    Complete Task ✨
                  </motion.button>
                </div>
              </div>

              {/* Smart Forms */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                  📝 Smart Forms & Controls
                </h3>
                
                <div className="space-y-4">
                  <FormField
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    variant="floating"
                    leftIcon={<span className="text-sage-500">📧</span>}
                    success={formData.email.includes('@') ? "Valid email format" : undefined}
                    error={formData.email && !formData.email.includes('@') ? "Please enter a valid email" : undefined}
                  />
                  
                  <Dropdown
                    label="Preferred Location"
                    options={[
                      { value: "urban", label: "Urban Explorer" },
                      { value: "nature", label: "Nature Lover" },
                      { value: "mixed", label: "Mixed Adventures" }
                    ]}
                    value={formData.location}
                    onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
                    placeholder="Choose your vibe..."
                  />
                  
                  <Toggle
                    label="Smart Notifications"
                    checked={formData.notifications}
                    onChange={(checked) => setFormData(prev => ({ ...prev, notifications: checked }))}
                    size="md"
                  />
                </div>
              </div>

              {/* Interactive Showcase */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                  🎯 Interactive Elements
                </h3>
                
                <div className="space-y-4">
                  <Tooltip content="This demonstrates our smart tooltip system with contextual information and progressive disclosure" position="top">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="p-4 bg-white/80 dark:bg-stone-800/80 rounded-2xl border border-stone-200 dark:border-stone-700 cursor-help"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-sage-500 to-sage-600 rounded-full flex items-center justify-center">
                          💡
                        </div>
                        <div>
                          <p className="font-medium text-stone-800 dark:text-stone-200">Hover for Tips</p>
                          <p className="text-sm text-stone-600 dark:text-stone-400">Interactive learning</p>
                        </div>
                      </div>
                    </motion.div>
                  </Tooltip>
                  
                  <ProductCard
                    title="Weekend Adventure"
                    description="Discover hidden gems in your city with AI-powered recommendations"
                    image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
                    badge="Popular"
                    price="Free"
                    onClick={() => addNotification({
                      type: "info",
                      title: "Adventure Selected!",
                      message: "We'll help you plan the perfect weekend",
                      action: {
                        label: "Start Planning",
                        onClick: () => console.log("Starting adventure planning...")
                      }
                    })}
                  />
                </div>
              </div>
            </div>

            {/* Accordion Demo */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4 flex items-center gap-2">
                📋 Organized Content
              </h3>
              <Accordion
                items={[
                  {
                    id: "features",
                    title: "Enhanced Features",
                    icon: <span className="text-sage-600">🚀</span>,
                    content: (
                      <div className="space-y-3">
                        <p className="text-stone-600 dark:text-stone-400">
                          Our mobile-first design includes sophisticated progress indicators, smart form validation, 
                          contextual tooltips, and engaging micro-interactions.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {["Progress Bars", "Smart Forms", "Tooltips", "Notifications", "Cards", "Carousels"].map((feature) => (
                            <span key={feature} className="px-3 py-1 bg-sage-100 dark:bg-sage-900/30 text-sage-700 dark:text-sage-300 rounded-full text-sm">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )
                  },
                  {
                    id: "accessibility",
                    title: "Accessibility & Usability",
                    icon: <span className="text-blue-600">♿</span>,
                    content: (
                      <div className="text-stone-600 dark:text-stone-400 space-y-2">
                        <p>All components follow WCAG guidelines with proper focus management, keyboard navigation, and screen reader support.</p>
                        <p>Responsive design ensures optimal experience across all device sizes.</p>
                      </div>
                    )
                  },
                  {
                    id: "performance",
                    title: "Performance Optimizations",
                    icon: <span className="text-green-600">⚡</span>,
                    content: (
                      <div className="text-stone-600 dark:text-stone-400 space-y-2">
                        <p>Optimized animations with Framer Motion, efficient state management, and lazy loading for smooth 60fps interactions.</p>
                        <LoaderComponent variant="dots" sizes="sm" color="#6366f1" />
                      </div>
                    )
                  }
                ]}
                allowMultiple={true}
              />
            </div>

            {/* Carousel Demo */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-stone-800 dark:text-stone-200 mb-4 flex items-center gap-2">
                🎠 Interactive Carousel
              </h3>
              <ImageCarousel
                images={[
                  {
                    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
                    alt: "Mountain Adventure",
                    caption: "Discover breathtaking mountain views and hiking trails"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=400&fit=crop",
                    alt: "Forest Exploration",
                    caption: "Immerse yourself in pristine forest environments"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop",
                    alt: "Lakeside Serenity",
                    caption: "Find peace and tranquility by crystal clear lakes"
                  },
                  {
                    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=400&fit=crop",
                    alt: "Coastal Beauty",
                    caption: "Experience stunning coastal landscapes and ocean views"
                  }
                ]}
                className="rounded-2xl overflow-hidden"
              />
            </div>
          </div>
        </motion.div>

        {/* SOPHISTICATED MODE TOGGLE */}
        <div className="bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm py-6 px-4 border-b border-stone-200/50 dark:border-stone-700/50">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex bg-stone-100 dark:bg-stone-800 rounded-2xl p-1.5 shadow-inner"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowTravelPlanning(false)}
                className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
                  !showTravelPlanning 
                    ? 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 shadow-sm' 
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                ✨ Daily Explore
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowTravelPlanning(true)}
                className={`flex-1 py-3 px-6 rounded-xl font-medium text-sm transition-all duration-300 ${
                  showTravelPlanning 
                    ? 'bg-white dark:bg-stone-700 text-stone-800 dark:text-stone-200 shadow-sm' 
                    : 'text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                ✈️ Travel Planning
              </motion.button>
            </motion.div>

            {/* Nearby Items Notification */}
            {nearbyBoardItems.length > 0 && !showTravelPlanning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-center"
              >
                <button
                  onClick={() => setShowTravelPlanning(true)}
                  className="bg-sage-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-sage-600 transition-colors flex items-center gap-2 mx-auto"
                >
                  <span>📍</span>
                  <span>{nearbyBoardItems.length} travel board item(s) nearby!</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* SOPHISTICATED SEARCH BAR - VSCO/Pinterest inspired */}
        <div className="sticky top-0 z-20 bg-gradient-to-br from-stone-50/90 via-sage-50/90 to-warm-gray-50/90 dark:from-stone-900/90 dark:via-sage-900/90 dark:to-warm-gray-900/90 backdrop-blur-xl py-8 px-4 border-b border-stone-200/30 dark:border-stone-700/30">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative max-w-3xl mx-auto"
          >
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-sage-400 group-hover:text-sage-600 dark:group-hover:text-sage-300 transition-colors z-10 w-5 h-5" />
              
              <motion.input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                placeholder="Search for anything that inspires you..."
                className="w-full pl-14 pr-28 py-5 text-lg border border-stone-200 dark:border-stone-700 rounded-2xl bg-white/90 dark:bg-stone-800/90 text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-sage-400 dark:focus:border-sage-500 focus:ring-4 focus:ring-sage-100/50 dark:focus:ring-sage-800/50 transition-all shadow-sm backdrop-blur-sm"
                whileFocus={{ scale: 1.01 }}
              />

              {/* Voice Search Button */}
              <motion.button
                onClick={toggleVoiceSearch}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute right-20 top-1/2 transform -translate-y-1/2 p-2.5 rounded-xl transition-all ${
                  isListening 
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                    : 'bg-stone-100 dark:bg-stone-700 text-stone-500 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-600'
                }`}
                aria-label={isListening ? "Stop voice search" : "Start voice search"}
              >
                <Mic className="w-4 h-4" />
              </motion.button>

              {/* Search Button */}
              <motion.button
                onClick={handleSearch}
                disabled={!query.trim() || loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 disabled:from-stone-300 disabled:to-stone-400 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50 font-medium"
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  "Search"
                )}
              </motion.button>
            </div>

            {/* Smart Suggestions */}
            {smartSuggestions.length > 0 && query.length > 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-3 w-full bg-white/95 dark:bg-stone-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-200/50 dark:border-stone-700/50 z-20 overflow-hidden"
              >
                {smartSuggestions.slice(0, 5).map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 hover:bg-sage-50 dark:hover:bg-stone-700/50 cursor-pointer transition-colors border-b border-stone-100 dark:border-stone-700 last:border-b-0"
                    onClick={() => {
                      setQuery(suggestion);
                      setSmartSuggestions([]);
                      handleSearch();
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-sage-400" />
                      <span className="text-stone-700 dark:text-stone-300 font-medium">{suggestion}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Voice Recognition Feedback */}
            {isListening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-full mt-3 w-full bg-red-50/95 dark:bg-red-900/20 backdrop-blur-sm rounded-2xl p-5 border border-red-200/50 dark:border-red-800/50"
              >
                <div className="flex items-center justify-center gap-3 text-red-600 dark:text-red-400">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Mic className="w-5 h-5" />
                  </motion.div>
                  <span className="font-medium">Listening... Speak naturally</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* ENHANCED SEARCH BAR WITH SMART FEATURES */}
        <div className="sticky top-0 z-20 bg-gradient-to-r from-pink-50 via-indigo-50 to-teal-50 dark:from-indigo-950 dark:via-pink-950 dark:to-teal-950 py-6 px-4 border-b border-pink-100 dark:border-indigo-900 backdrop-blur-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="relative max-w-2xl mx-auto"
          >
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400 group-hover:text-indigo-500 transition-colors z-10" />
              
              <motion.input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSearch()}
                placeholder="Search for anything that inspires you..."
                className="w-full pl-14 pr-28 py-5 text-lg border border-stone-200 dark:border-stone-700 rounded-2xl bg-white/90 dark:bg-stone-800/90 text-stone-800 dark:text-stone-200 placeholder-stone-400 dark:placeholder-stone-500 focus:outline-none focus:border-sage-400 dark:focus:border-sage-500 focus:ring-4 focus:ring-sage-100/50 dark:focus:ring-sage-800/50 transition-all shadow-sm backdrop-blur-sm"
                whileFocus={{ scale: 1.01 }}
              />

              {/* Voice Search Button */}
              <motion.button
                onClick={toggleVoiceSearch}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute right-16 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all
                           ${isListening 
                             ? 'bg-red-500 text-white pulse-red' 
                             : 'bg-pink-100 dark:bg-indigo-800 text-pink-500 dark:text-indigo-300 hover:bg-pink-200 dark:hover:bg-indigo-700'
                           }`}
                aria-label={isListening ? "Stop voice search" : "Start voice search"}
              >
                <Mic className="w-4 h-4" />
              </motion.button>

              {/* Search Button */}
              <motion.button
                onClick={handleSearch}
                disabled={!query.trim() || loading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 disabled:from-stone-300 disabled:to-stone-400 text-white px-5 py-2.5 rounded-xl transition-all shadow-sm disabled:opacity-50 font-medium"
              >
                {loading ? (
                  <Loader className="w-4 h-4 animate-spin" />
                ) : (
                  "Search"
                )}
              </motion.button>
            </div>

            {/* Search Suggestions */}
            {smartSuggestions.length > 0 && query.length > 2 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 w-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200 dark:border-indigo-700 z-20"
              >
                {smartSuggestions.slice(0, 5).map((suggestion, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 hover:bg-pink-50 dark:hover:bg-indigo-900/50 cursor-pointer transition-colors first:rounded-t-2xl last:rounded-b-2xl border-b border-pink-100 dark:border-indigo-800 last:border-b-0"
                    onClick={() => {
                      setQuery(suggestion);
                      setSmartSuggestions([]);
                      handleSearch();
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <Search className="w-4 h-4 text-pink-400" />
                      <span className="text-gray-700 dark:text-gray-300">{suggestion}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* Voice Recognition Feedback */}
            {isListening && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-full mt-3 w-full bg-red-50/95 dark:bg-red-900/20 backdrop-blur-sm rounded-2xl p-5 border border-red-200/50 dark:border-red-800/50"
              >
                <div className="flex items-center justify-center gap-3 text-red-600 dark:text-red-400">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Mic className="w-5 h-5" />
                  </motion.div>
                  <span className="font-medium">Listening... Speak naturally</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* MAIN CONTENT */}
        <main className="max-w-7xl mx-auto px-4 py-10" ref={resultsRef}>
          {/* CONDITIONAL CONTENT BASED ON MODE */}
          {!showTravelPlanning ? (
            /* ---- DAILY EXPLORATION MODE ---- */
            <div>
              {/* WEATHER + DAY PLANNER */}
              <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
                {/* Smart Weather Card */}
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="flex-1 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/50 rounded-2xl shadow-lg p-6 text-center border-2 border-blue-200 dark:border-indigo-700 relative overflow-hidden smart-weather-card"
                >
                  <div className="absolute top-2 right-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <Sun className="w-5 h-5 text-yellow-500 opacity-70" />
                    </motion.div>
                  </div>
                  
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-4xl font-bold mb-2"
                  >
                    {mockWeather.icon} {mockWeather.temp}
                  </motion.div>
                  
                  <div className="text-lg mb-2">{mockWeather.desc}</div>
                  <div className="text-blue-600 dark:text-blue-300 font-semibold mb-3">{mockWeather.suggestion}</div>
                  
                  {/* Weather-based Activity Suggestions */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setQuery(mockWeather.desc.includes('sunny') ? 'outdoor activities' : 'indoor activities');
                      handleSearch();
                    }}
                    className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition shadow-md"
                  >
                    Find {mockWeather.desc.includes('sunny') ? 'Outdoor' : 'Indoor'} Activities
                  </motion.button>

                  {/* Location-based weather hint */}
                  {userLocation && (
                    <div className="mt-2 text-xs text-blue-500 dark:text-blue-400">
                      📍 Based on your location
                    </div>
                  )}
                </motion.div>
                <div className="flex-1 bg-pink-50 dark:bg-indigo-900/80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border-2 border-pink-100 dark:border-indigo-900">
                  <Calendar className="w-7 h-7 text-pink-400 mb-2" />
                  <div className="font-bold mb-1 text-lg">Today’s Smart Plan</div>
                  <div className="text-indigo-600 dark:text-indigo-200">{mockDayPlans[recipeIndex % mockDayPlans.length]}</div>
                  <button
                    className="mt-3 px-4 py-2 bg-pink-100 dark:bg-indigo-700 text-pink-700 dark:text-white rounded-full font-medium hover:bg-pink-200 dark:hover:bg-indigo-600 transition"
                    onClick={() => setRecipeIndex((i) => (i + 1) % mockDayPlans.length)}
                  >
                    Shuffle Plan
                  </button>
                </div>
              </div>

              {/* BREAKING NEWS */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="text-pink-400 animate-pulse">📰</span>{" "}
                  Breaking News
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockNews.map((n, idx) => (
                    <a
                      key={n.url}
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg flex items-center overflow-hidden hover:scale-[1.03] transition border-2 border-pink-100 dark:border-indigo-900"
                    >
                      key={n.url}
                      href={n.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group bg-white/80 dark:bg-gray-900/80 rounded-xl shadow-lg flex items-center overflow-hidden hover:scale-[1.03] transition border-2 border-pink-100 dark:border-indigo-900"
                    >
                      <img src={n.img} alt={n.title} className="w-32 h-28 object-cover" />
                      <div className="p-4 flex-1">
                        <div className="font-semibold text-lg group-hover:text-pink-400">{n.title}</div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">{n.snippet}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* RANDOMIZER & CHALLENGES */}
              <div className="flex flex-col md:flex-row gap-6 mb-10">
                <div className="flex-1 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center text-center border-2 border-pink-100 dark:border-indigo-900">
                  <Sparkle className="w-7 h-7 text-pink-400 mb-1" />
                  <div className="font-bold text-lg mb-2">Surprise Generator</div>
                  <div className="mb-3 text-indigo-700 dark:text-indigo-300">{mockMicroVolunteer[randomIndex]}</div>
                  <button
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-indigo-100 dark:from-indigo-800 dark:to-pink-900 text-indigo-800 dark:text-white text-sm hover:bg-pink-200 dark:hover:bg-indigo-700 font-medium shadow"
                    onClick={handleRandomizer}
                  >
                    Give me a random idea!
                  </button>
                </div>
                <div className="flex-1 bg-pink-50 dark:bg-indigo-900/80 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center border-2 border-pink-100 dark:border-indigo-900">
                  <PartyPopper className="w-7 h-7 text-pink-400 mb-2" />
                  <div className="font-bold mb-1 text-lg">Challenges</div>
                  <ul className="flex flex-wrap gap-2 justify-center">
                    {mockChallenges.map((c, idx) => (
                      <li key={idx} className="px-3 py-2 bg-white dark:bg-gray-800 rounded-lg shadow text-sm flex items-center gap-2 font-medium border border-pink-100 dark:border-indigo-900">
                        <span>{c.badge}</span> {c.challenge}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* QUICK EXPLORE CARDS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { emoji: "📰", title: "Breaking News", desc: "Global updates" },
                  { emoji: "🌿", title: "Green Living", desc: "Eco tips" },
                  { emoji: "📚", title: "Book Recs", desc: "Curated reads" },
                  { emoji: "⚽", title: "Sports", desc: "Highlights" },
                  { emoji: "🛠️", title: "DIY Projects", desc: "Hands-on" },
                  { emoji: "❤️", title: "Humanity Wins", desc: "Stories" },
                  { emoji: "💡", title: "Mindful Living", desc: "Peace & Prod" },
                  { emoji: "📢", title: "Get Involved", desc: "Volunteer" },
                ].map((card, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white/80 dark:bg-gray-900/80 p-8 rounded-2xl shadow-xl flex flex-col items-center text-center border-2 border-pink-100 dark:border-indigo-900 hover:border-pink-400 dark:hover:border-indigo-600 transition-all"
                    whileHover={{ scale: 1.06, rotate: 1.5 }}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * idx }}
                  >
                    <div className="text-4xl mb-2">{card.emoji}</div>
                    <div className={`font-bold text-lg mb-1 ${accentGradient}`}>{card.title}</div>
                    <div className="text-gray-600 dark:text-gray-400">{card.desc}</div>
                  </motion.div>
                ))}
              </div>

              {/* MAP: ECO-FRIENDLY LOCATIONS */}
              <div className="mb-14">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Globe2 className="w-5 h-5" /> Eco-Friendly Spots Near You
                  {userLocation && <span className="flex items-center text-xs ml-3 text-pink-400">
                    <MapPin className="w-3 h-3 mr-1" />
                    {`${userLocation.lat.toFixed(2)}, ${userLocation.lng.toFixed(2)}`}
                  </span>}
                </h2>
                {userLocation && (
                  <MapContainer
                    center={[userLocation.lat, userLocation.lng]}
                    zoom={13}
                    style={{ height: "350px", width: "100%", borderRadius: "1rem", boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)" }}
                    scrollWheelZoom={false}
                    className="mb-6"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[userLocation.lat, userLocation.lng]}>
                      <Popup>You are here! 🌸</Popup>
                    </Marker>
                    {ecoSuggestions.map((proj, idx) => (
                      <Marker
                        key={proj.title}
                        position={[proj.lat, proj.lng]}
                        // @ts-expect-error: icon is not in MarkerProps type but is supported by leaflet
                        icon={ecoIcon}
                        eventHandlers={{
                          click: () => setQuery(proj.title),
                        }}
                      >
                        <Popup>
                          <div className="text-center">
                            <div className="text-2xl mb-1">🌱</div>
                            <strong>{proj.title}</strong>
                            <br />
                            {proj.desc}
                            <br />
                            <button
                              className="mt-2 px-2 py-1 bg-pink-100 rounded text-pink-800 hover:bg-pink-200"
                              onClick={() => setQuery(proj.title)}
                            >
                              Add to Itinerary
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    ))}
                  </MapContainer>
                )}
              </div>

              {/* MICRO-VOLUNTEERING + MOOD TRACKER + ECO */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
                <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 text-center border-2 border-pink-100 dark:border-indigo-900">
                  <Star className="w-6 h-6 text-yellow-300 mb-1" />
                  <div className="font-bold mb-2">Micro-Volunteering</div>
                  <div className="mb-2 text-indigo-700 dark:text-indigo-300">{mockMicroVolunteer[randomIndex]}</div>
                  <div className="text-gray-500 text-xs">Take 5 min and make a difference now.</div>
                </div>
                <div className="bg-pink-50 dark:bg-indigo-900/80 rounded-2xl shadow-lg p-6 text-center border-2 border-pink-100 dark:border-indigo-900">
                  <Smile className="w-6 h-6 text-pink-400 mb-1" />
                  <div className="font-bold mb-2">Mood Tracker</div>
                  <div className="mb-2 text-indigo-700 dark:text-indigo-200">
                    {mood ? `Your current mood: ${mood}` : "How are you feeling today?"}
                  </div>
                  <div className="flex gap-2 justify-center">
                    {["😃", "🙂", "😐", "😢", "😡"].map((emoji, idx) => (
                      <button key={emoji} className="text-2xl hover:scale-125 transition" onClick={() => setMood(emoji)}>
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 text-center border-2 border-pink-100 dark:border-indigo-900">
                  <BrainCircuit className="w-6 h-6 text-indigo-400 mb-1" />
                  <div className="font-bold mb-2">Eco Impact Score</div>
                  <animated.div className="mb-2 text-pink-400 text-2xl font-bold">
                    <animated.span>{ecoSpring.number.to((n) => n.toFixed(1))}</animated.span> lbs CO₂ saved!
                  </animated.div>
                  <div className="text-gray-500 text-xs">Optimize your day, reduce your footprint.</div>
                </div>
              </div>

              {/* LEARN TO COOK WIDGET */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-14"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <ChefHat className="w-5 h-5" /> Learn to Cook: Easy Recipe of the Day
                </h2>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="flex flex-col sm:flex-row items-center gap-5 bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-5 border-2 border-pink-100 dark:border-indigo-900"
                >
                  <img src="/avocado-toast.jpg" alt="Avocado Toast" className="w-32 h-32 object-cover rounded-xl mb-3" />
                  <div className="flex-1">
                    <div className="font-bold text-lg text-pink-400 dark:text-indigo-200 mb-1">
                      {mockRecipes[recipeIndex].name}
                      <span className="ml-2 px-2 py-1 text-xs bg-pink-100 dark:bg-indigo-800 text-pink-700 dark:text-white rounded-full">{mockRecipes[recipeIndex].difficulty}</span>
                    </div>
                    <div className="text-gray-700 dark:text-gray-300 mb-2">{mockRecipes[recipeIndex].desc}</div>
                    <a
                      href={mockRecipes[recipeIndex].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pink-400 hover:text-indigo-500 underline font-medium"
                    >View Recipe</a>
                  </div>
                  <button
                    className="mt-3 px-3 py-2 rounded-full bg-pink-100 dark:bg-indigo-700 text-pink-700 dark:text-white font-medium hover:bg-pink-200 dark:hover:bg-indigo-600 transition"
                    onClick={() => setRecipeIndex((i) => (i + 1) % mockRecipes.length)}
                  >
                    Next Recipe
                  </button>
                </motion.div>
              </motion.div>

              {/* TRENDING GIFS */}
              <div className="mb-14">
                <h2 className="text-xl font-bold mb-4">🔥 Trending GIFs</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {mockGIFs.map((gif, idx) => (
                    <motion.div
                      key={idx}
                      className="overflow-hidden rounded-xl shadow-lg border-2 border-pink-100 dark:border-indigo-900"
                      whileHover={{ scale: 1.04 }}
                    >
                      <img src={gif.src} alt={gif.alt} className="w-full h-40 object-cover" />
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* TRENDING SEARCHES */}
              <div className="mb-12">
                <h2 className="text-xl font-bold mb-4">📌 Trending Searches</h2>
                <div className="flex flex-wrap gap-3">
                  {mockTrending.map((term, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => {
                        setQuery(term);
                        handleSearch();
                      }}
                      className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-100 to-indigo-100 dark:from-indigo-800 dark:to-pink-900 text-indigo-800 dark:text-white text-sm hover:bg-pink-200 dark:hover:bg-indigo-700 font-medium shadow"
                      whileHover={{ scale: 1.06 }}
                    >
                      {term}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* ---- TRAVEL PLANNING MODE ---- */
            <div className="space-y-8">
              {/* Travel Board Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text mb-4">
                  ✈️ Professional Travel Planning
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Plan your perfect trip with professional tools. Save locations, organize activities, 
                  and optimize your route. When you're nearby, we'll help you make the most of your time!
                </p>
              </div>

              {/* Travel Planning Tools */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {travelPlanningTools.map((tool, idx) => (
                  <motion.div
                    key={tool.name}
                    className="bg-white/80 dark:bg-gray-900/80 p-4 rounded-xl shadow-lg border-2 border-indigo-100 dark:border-indigo-900 hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <div className="text-2xl mb-2">{tool.icon}</div>
                    <h3 className="font-bold text-sm mb-1">{tool.name}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{tool.description}</p>
                  </motion.div>
                ))}
              </div>

              {/* Active Travel Boards */}
              <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 border-2 border-indigo-100 dark:border-indigo-900">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Your Travel Boards</h2>
                  <button
                    onClick={() => {
                      const name = prompt("Board name:");
                      const destination = prompt("Destination:");
                      if (name && destination) {
                        createTravelBoard(name, destination);
                      }
                    }}
                    className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-600 transition-colors"
                  >
                    + New Board
                  </button>
                </div>

                {travelBoards.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="text-4xl mb-4">🗺️</div>
                    <p>No travel boards yet. Create your first one to start planning!</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {travelBoards.map((board) => (
                      <motion.div
                        key={board.id}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          activeTravelBoard === board.id
                            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30'
                            : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                        }`}
                        onClick={() => setActiveTravelBoard(board.id)}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-3 h-3 rounded-full bg-${board.color}-500`}></div>
                          <h3 className="font-bold">{board.name}</h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{board.destination}</p>
                        <div className="text-xs text-gray-500">
                          {board.items.length} items • {board.items.filter(i => i.completed).length} completed
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Active Board Content */}
              {activeTravelBoard && (
                <div className="bg-white/80 dark:bg-gray-900/80 rounded-2xl shadow-lg p-6 border-2 border-indigo-100 dark:border-indigo-900">
                  <h2 className="text-xl font-bold mb-4">
                    Board: {travelBoards.find(b => b.id === activeTravelBoard)?.name}
                  </h2>
                  
                  {/* Drag & Drop Area for Travel Board */}
                  <div className="border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-xl p-8 text-center mb-4">
                    <div className="text-3xl mb-2">📌</div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      Drag any content from your searches here to add to your travel board
                    </p>
                    <p className="text-sm text-indigo-500">
                      Or search for places, activities, and experiences above
                    </p>
                  </div>

                  {/* Nearby Items Alert */}
                  {nearbyBoardItems.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">📍</span>
                        <h3 className="font-bold text-green-700 dark:text-green-300">You're nearby!</h3>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                        Perfect timing! You're near {nearbyBoardItems.length} item(s) from your travel board.
                      </p>
                      <div className="space-y-2">
                        {nearbyBoardItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg">
                            <div>
                              <h4 className="font-medium">{item.title}</h4>
                              <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                            <div className="flex gap-1">
                              {nearbyQuickActions.map((action) => (
                                <button
                                  key={action.type}
                                  className="p-2 bg-green-100 dark:bg-green-800 rounded-full text-xs hover:bg-green-200 dark:hover:bg-green-700 transition-colors"
                                  title={action.description}
                                >
                                  {action.icon}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* ERROR MESSAGE DISPLAY */
          errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-center"
            >
              <p className="text-red-600 dark:text-red-400">{errorMessage}</p>
            </motion.div>
          )}

          {/* LOADING STATE */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-20"
            >
              <LoaderComponent variant="spinner" sizes="lg" color="#6366f1" />
            </motion.div>
          )}

          {/* SEARCH RESULTS */}
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            >
              {items.map((item, idx) => (
                <motion.div
                  key={item.link}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white/80 dark:bg-stone-800/80 rounded-2xl shadow-lg overflow-hidden border border-stone-200 dark:border-stone-700 hover:shadow-xl transition-all"
                >
                  {item.pagemap?.cse_image?.[0]?.src && (
                    <img
                      src={item.pagemap.cse_image[0].src}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-stone-800 dark:text-stone-200">
                      {item.title}
                    </h3>
                    <p className="text-stone-600 dark:text-stone-400 text-sm mb-4">
                      {item.snippet}
                    </p>
                    <div className="flex justify-between items-center">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sage-600 dark:text-sage-400 hover:text-sage-700 dark:hover:text-sage-300 font-medium text-sm"
                      >
                        Visit →
                      </a>
                      <button
                        onClick={() => addToGrabBox(item)}
                        className="bg-sage-100 dark:bg-sage-800 text-sage-700 dark:text-sage-300 px-3 py-1 rounded-full text-sm font-medium hover:bg-sage-200 dark:hover:bg-sage-700 transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </main>

        {/* GRAB BOX FOOTER + ITINERARY (Drag-and-drop) */}
        {grabBox.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-stone-800/90 border-t-2 border-stone-200 dark:border-stone-700 p-4 shadow-inner z-50 rounded-t-3xl">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="grabBox" direction="horizontal">
                  {(provided) => (
                    <div
                      className="flex flex-wrap gap-2"
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {grabBox.map((item, idx) => (
                        <Draggable key={item.link} draggableId={item.link} index={idx}>
                          {(provided) => (
                            <span
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="px-2 py-1 bg-pink-200 dark:bg-indigo-700 text-xs rounded flex items-center gap-1 shadow border border-pink-300 dark:border-indigo-900"
                            >
                              <Move className="w-3 h-3 opacity-60" />
                              {item.title.slice(0, 25)}…
                              <button
                                className="ml-1 text-xs text-red-400 hover:text-red-600"
                                onClick={() => removeFromGrabBox(item.link)}
                              >✕</button>
                            </span>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              <button
                onClick={clearGrabBox}
                className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" /> Clear All
              </button>
            </div>
            <button
              className="absolute top-2 right-4 text-pink-400 hover:text-indigo-500 font-semibold"
              onClick={() => setShowItinerary(!showItinerary)}
            >
              {showItinerary ? "Hide Itinerary" : "Show Itinerary"}
            </button>
            {showItinerary && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-pink-50 dark:bg-indigo-900/80 rounded-xl shadow border-2 border-pink-100 dark:border-indigo-900"
              >
                <div className="font-bold mb-2 text-lg text-pink-400 dark:text-indigo-300">
                  🗺️ Your Drag & Drop Itinerary
                </div>
                <ul className="flex flex-wrap gap-3">
                  {grabBox.map((item, idx) => (
                    <li key={idx} className="bg-white/80 dark:bg-gray-800 px-3 py-2 rounded shadow text-sm flex items-center gap-2 border border-pink-100 dark:border-indigo-900">
                      <span className="font-medium">{item.title.slice(0, 30)}</span>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:text-indigo-500 underline"
                      >Visit</a>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-300">
                  * Drag items here as you explore. Plan your day to reduce extra travel & make the most of your trip!
                </div>
              </motion.div>
            )}
          </div>
        )}
        <motion.button
          className="fixed bottom-8 right-8 z-50 bg-sage-500 hover:bg-sage-600 text-white rounded-full shadow-xl p-5 text-3xl border-4 border-white dark:border-stone-800"
          whileHover={{ scale: 1.15, rotate: 8 }}
          whileTap={{ scale: 0.95 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-label="Quick Action"
          onClick={() => {
            // Add quick action functionality
            addNotification({
              type: "info",
              title: "Quick Action",
              message: "Feature coming soon!",
            });
          }}
        >
          +
        </motion.button>

        {/* Toast Notification */}
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed bottom-36 left-1/2 -translate-x-1/2 bg-white/90 dark:bg-stone-900/90 px-6 py-3 rounded-full shadow-xl border-2 border-sage-200 text-sage-600 font-bold z-50"
          >
            {toast}
          </motion.div>
        )}
      </div>
    </div>
  );
}

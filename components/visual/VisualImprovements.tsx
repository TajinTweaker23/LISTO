import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity, 
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Palette,
  Eye,
  Zap,
  Heart,
  Brain,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Waves,
  Gauge,
  Timer,
  Target,
  Award,
  Smile,
  Frown,
  Meh,
  TrendingDown,
  RotateCcw,
  Settings,
  Download,
  Share,
  Filter,
  Calendar,
  Clock
} from 'lucide-react';

interface DataVisualization {
  id: string;
  type: 'line' | 'bar' | 'pie' | 'gauge' | 'heatmap';
  title: string;
  data: number[];
  labels: string[];
  colors: string[];
  metric: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  trend: 'up' | 'down' | 'stable';
  insights: string[];
}

interface SoundscapeSettings {
  enabled: boolean;
  volume: number;
  currentTrack: string;
  tracks: {
    id: string;
    name: string;
    type: 'nature' | 'ambient' | 'focus' | 'relaxation' | 'binaural';
    url: string;
    description: string;
  }[];
  adaptiveMode: boolean;
  moodSync: boolean;
}

interface AnimationSettings {
  microInteractions: boolean;
  transitionSpeed: 'slow' | 'normal' | 'fast';
  particleEffects: boolean;
  fluidAnimations: boolean;
  contextualAnimations: boolean;
  accessibilityMode: boolean;
  customTiming: {
    entrance: number;
    exit: number;
    hover: number;
    tap: number;
  };
}

interface ThemeCustomization {
  colorScheme: 'light' | 'dark' | 'auto' | 'custom';
  primaryColor: string;
  accentColor: string;
  backgroundGradient: boolean;
  glassmorphism: boolean;
  neuomorphism: boolean;
  customFont: string;
  borderRadius: number;
  shadows: boolean;
  animations: boolean;
}

const VisualImprovements: React.FC = () => {
  const [visualizations, setVisualizations] = useState<DataVisualization[]>([]);
  const [soundscape, setSoundscape] = useState<SoundscapeSettings>({
    enabled: false,
    volume: 70,
    currentTrack: '',
    tracks: [],
    adaptiveMode: true,
    moodSync: true
  });
  const [animations, setAnimations] = useState<AnimationSettings>({
    microInteractions: true,
    transitionSpeed: 'normal',
    particleEffects: true,
    fluidAnimations: true,
    contextualAnimations: true,
    accessibilityMode: false,
    customTiming: {
      entrance: 300,
      exit: 200,
      hover: 150,
      tap: 100
    }
  });
  const [theme, setTheme] = useState<ThemeCustomization>({
    colorScheme: 'auto',
    primaryColor: '#6366f1',
    accentColor: '#10b981',
    backgroundGradient: true,
    glassmorphism: false,
    neuomorphism: false,
    customFont: 'Inter',
    borderRadius: 12,
    shadows: true,
    animations: true
  });

  const [activeSection, setActiveSection] = useState<'charts' | 'soundscape' | 'animations' | 'theme'>('charts');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVisualization, setCurrentVisualization] = useState<string>('overview');
  const [showParticles, setShowParticles] = useState(true);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  useEffect(() => {
    loadHealthData();
    loadProductivityData();
    loadSoundscapeSettings();
    initializeParticleSystem();
    setupThemeListener();
  }, []);

  const loadHealthData = () => {
    // Generate mock health visualization data
    const healthData: DataVisualization = {
      id: 'health-trends',
      type: 'line',
      title: 'Health & Wellness Trends',
      data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 100) + 50),
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      colors: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
      metric: 'Overall Score',
      period: 'monthly',
      trend: 'up',
      insights: [
        'Sleep quality improved by 15% this month',
        'Exercise consistency at 78%',
        'Stress levels decreased significantly'
      ]
    };

    const moodData: DataVisualization = {
      id: 'mood-analysis',
      type: 'pie',
      title: 'Mood Distribution',
      data: [45, 30, 15, 10],
      labels: ['Happy', 'Neutral', 'Anxious', 'Sad'],
      colors: ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444'],
      metric: 'Percentage',
      period: 'weekly',
      trend: 'stable',
      insights: [
        'Positive mood dominant this week',
        'Anxiety peaks on Mondays',
        'Weekend mood improvement noted'
      ]
    };

    setVisualizations([healthData, moodData]);
  };

  const loadProductivityData = () => {
    const focusData: DataVisualization = {
      id: 'focus-metrics',
      type: 'gauge',
      title: 'Focus Performance',
      data: [85],
      labels: ['Focus Score'],
      colors: ['#8b5cf6'],
      metric: 'Score',
      period: 'daily',
      trend: 'up',
      insights: [
        'Peak focus at 10 AM',
        'Break timing optimal',
        'Deep work sessions increased'
      ]
    };

    setVisualizations(prev => [...prev, focusData]);
  };

  const loadSoundscapeSettings = () => {
    const defaultTracks = [
      {
        id: 'forest-sounds',
        name: 'Forest Ambience',
        type: 'nature' as const,
        url: '/sounds/forest.mp3',
        description: 'Gentle forest sounds with birds and rustling leaves'
      },
      {
        id: 'rain-sounds',
        name: 'Soft Rain',
        type: 'nature' as const,
        url: '/sounds/rain.mp3',
        description: 'Calming rainfall for focus and relaxation'
      },
      {
        id: 'focus-beats',
        name: 'Focus Beats',
        type: 'focus' as const,
        url: '/sounds/focus.mp3',
        description: 'Rhythmic ambient music for deep concentration'
      },
      {
        id: 'meditation-bells',
        name: 'Meditation Bells',
        type: 'relaxation' as const,
        url: '/sounds/bells.mp3',
        description: 'Peaceful bells for mindfulness and meditation'
      }
    ];

    setSoundscape(prev => ({ ...prev, tracks: defaultTracks }));
  };

  const initializeParticleSystem = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }> = [];

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.3 + 0.1,
        color: theme.primaryColor
      });
    }

    const animate = () => {
      if (!showParticles || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    if (animations.particleEffects) {
      animate();
    }
  };

  const setupThemeListener = () => {
    if (theme.colorScheme === 'auto') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        // Auto theme switching logic
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  };

  const playSoundscape = (trackId: string) => {
    const track = soundscape.tracks.find(t => t.id === trackId);
    if (!track) return;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    audioRef.current = new Audio(track.url);
    audioRef.current.volume = soundscape.volume / 100;
    audioRef.current.loop = true;
    audioRef.current.play();

    setSoundscape(prev => ({ ...prev, currentTrack: trackId }));
    setIsPlaying(true);
  };

  const stopSoundscape = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setSoundscape(prev => ({ ...prev, currentTrack: '' }));
    setIsPlaying(false);
  };

  const updateAnimationSettings = (updates: Partial<AnimationSettings>) => {
    setAnimations(prev => ({ ...prev, ...updates }));
    localStorage.setItem('animation-settings', JSON.stringify({ ...animations, ...updates }));
  };

  const updateTheme = (updates: Partial<ThemeCustomization>) => {
    setTheme(prev => ({ ...prev, ...updates }));
    localStorage.setItem('theme-settings', JSON.stringify({ ...theme, ...updates }));
  };

  const renderLineChart = (viz: DataVisualization) => {
    const maxValue = Math.max(...viz.data);
    const minValue = Math.min(...viz.data);
    const range = maxValue - minValue;

    return (
      <div className="h-64 p-4">
        <svg width="100%" height="100%" viewBox="0 0 400 200">
          {/* Grid lines */}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={`grid-${i}`}
              x1="40"
              y1={40 + (i * 32)}
              x2="360"
              y2={40 + (i * 32)}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}
          
          {/* Data line */}
          <path
            d={`M 40 ${200 - ((viz.data[0] - minValue) / range) * 120 - 40} ${viz.data
              .map((value, index) => {
                const x = 40 + (index * (320 / (viz.data.length - 1)));
                const y = 200 - ((value - minValue) / range) * 120 - 40;
                return `L ${x} ${y}`;
              })
              .join(' ')}`}
            stroke={viz.colors[0]}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {viz.data.map((value, index) => {
            const x = 40 + (index * (320 / (viz.data.length - 1)));
            const y = 200 - ((value - minValue) / range) * 120 - 40;
            return (
              <motion.circle
                key={`point-${index}`}
                cx={x}
                cy={y}
                r="4"
                fill={viz.colors[0]}
                initial={{ r: 0 }}
                animate={{ r: 4 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ r: 6 }}
              />
            );
          })}
        </svg>
      </div>
    );
  };

  const renderPieChart = (viz: DataVisualization) => {
    const total = viz.data.reduce((sum, value) => sum + value, 0);
    let cumulativeAngle = 0;

    return (
      <div className="h-64 flex items-center justify-center">
        <svg width="200" height="200" viewBox="0 0 200 200">
          {viz.data.map((value, index) => {
            const startAngle = cumulativeAngle;
            const endAngle = cumulativeAngle + (value / total) * 360;
            cumulativeAngle = endAngle;

            const startRadians = (startAngle * Math.PI) / 180;
            const endRadians = (endAngle * Math.PI) / 180;

            const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

            const x1 = 100 + 80 * Math.cos(startRadians);
            const y1 = 100 + 80 * Math.sin(startRadians);
            const x2 = 100 + 80 * Math.cos(endRadians);
            const y2 = 100 + 80 * Math.sin(endRadians);

            const pathData = [
              `M 100 100`,
              `L ${x1} ${y1}`,
              `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');

            return (
              <motion.path
                key={`segment-${index}`}
                d={pathData}
                fill={viz.colors[index]}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              />
            );
          })}
        </svg>
      </div>
    );
  };

  const renderGaugeChart = (viz: DataVisualization) => {
    const value = viz.data[0];
    const angle = (value / 100) * 180;

    return (
      <div className="h-64 flex items-center justify-center">
        <div className="relative">
          <svg width="200" height="120" viewBox="0 0 200 120">
            {/* Background arc */}
            <path
              d="M 20 100 A 80 80 0 0 1 180 100"
              stroke="#e5e7eb"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Progress arc */}
            <motion.path
              d="M 20 100 A 80 80 0 0 1 180 100"
              stroke={viz.colors[0]}
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(angle / 180) * 251.2} 251.2`}
              initial={{ strokeDasharray: '0 251.2' }}
              animate={{ strokeDasharray: `${(angle / 180) * 251.2} 251.2` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            
            {/* Center text */}
            <text x="100" y="90" textAnchor="middle" className="text-2xl font-bold fill-gray-800">
              {value}%
            </text>
          </svg>
        </div>
      </div>
    );
  };

  const getVisualizationComponent = (viz: DataVisualization) => {
    switch (viz.type) {
      case 'line':
        return renderLineChart(viz);
      case 'pie':
        return renderPieChart(viz);
      case 'gauge':
        return renderGaugeChart(viz);
      default:
        return <div>Visualization type not supported</div>;
    }
  };

  const getMoodIcon = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'happy': return <Smile className="w-5 h-5 text-green-500" />;
      case 'sad': return <Frown className="w-5 h-5 text-red-500" />;
      case 'anxious': return <Meh className="w-5 h-5 text-yellow-500" />;
      default: return <Meh className="w-5 h-5 text-blue-500" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6" style={{ fontFamily: theme.customFont }}>
      {/* Particle Background */}
      {animations.particleEffects && showParticles && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-0"
          style={{ opacity: 0.1 }}
        />
      )}

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: theme.backgroundGradient 
            ? `linear-gradient(135deg, ${theme.primaryColor}20, ${theme.accentColor}20)`
            : 'white'
        }}
        className="rounded-2xl p-8 shadow-xl border border-gray-100 relative overflow-hidden"
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d'
          }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left - rect.width / 2);
            mouseY.set(e.clientY - rect.top - rect.height / 2);
          }}
        >
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className="w-10 h-10" style={{ color: theme.primaryColor }} />
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Visual Experience Hub</h1>
              <p className="text-xl text-gray-600">Enhanced visualizations, soundscapes, and micro-interactions</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Visualizations', value: visualizations.length, icon: BarChart3 },
              { label: 'Soundscape Status', value: isPlaying ? 'Playing' : 'Paused', icon: Volume2 },
              { label: 'Animation Style', value: animations.transitionSpeed, icon: Zap },
              { label: 'Theme Mode', value: theme.colorScheme, icon: Palette }
            ].map(({ label, value, icon: Icon }) => (
              <motion.div
                key={label}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/20"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-5 h-5" style={{ color: theme.accentColor }} />
                  <span className="text-sm text-gray-600">{label}</span>
                </div>
                <div className="text-lg font-semibold text-gray-800">{value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation */}
      <div className="flex overflow-x-auto bg-white rounded-xl p-2 shadow-lg">
        {[
          { id: 'charts', label: 'Data Visualizations', icon: BarChart3 },
          { id: 'soundscape', label: 'Soundscape', icon: Volume2 },
          { id: 'animations', label: 'Animations', icon: Zap },
          { id: 'theme', label: 'Theme', icon: Palette }
        ].map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            onClick={() => setActiveSection(id as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all whitespace-nowrap ${
              activeSection === id
                ? 'text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
            style={{
              backgroundColor: activeSection === id ? theme.primaryColor : 'transparent'
            }}
          >
            <Icon className="w-5 h-5" />
            {label}
          </motion.button>
        ))}
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeSection === 'charts' && (
          <motion.div
            key="charts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {visualizations.map((viz) => (
              <motion.div
                key={viz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      {getTrendIcon(viz.trend)}
                      {viz.title}
                    </h3>
                    <p className="text-gray-600">{viz.metric} • {viz.period}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Share className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                      <Filter className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {getVisualizationComponent(viz)}

                {/* Insights */}
                <div className="mt-6 space-y-2">
                  <h4 className="font-medium text-gray-700">Key Insights</h4>
                  {viz.insights.map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <div 
                        className="w-2 h-2 rounded-full" 
                        style={{ backgroundColor: viz.colors[index % viz.colors.length] }}
                      />
                      {insight}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeSection === 'soundscape' && (
          <motion.div
            key="soundscape"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Adaptive Soundscape</h3>
            
            {/* Controls */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={isPlaying ? stopSoundscape : () => playSoundscape(soundscape.tracks[0]?.id)}
                className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Volume2 className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">Volume: {soundscape.volume}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundscape.volume}
                  onChange={(e) => setSoundscape(prev => ({ ...prev, volume: parseInt(e.target.value) }))}
                  className="w-full"
                />
              </div>
            </div>

            {/* Track Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {soundscape.tracks.map((track) => (
                <motion.div
                  key={track.id}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => playSoundscape(track.id)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    soundscape.currentTrack === track.id
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-lg flex items-center justify-center">
                      <Waves className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{track.name}</div>
                      <div className="text-sm text-gray-600 capitalize">{track.type}</div>
                      <div className="text-xs text-gray-500 mt-1">{track.description}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeSection === 'animations' && (
          <motion.div
            key="animations"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Animation Settings</h3>
            
            <div className="space-y-6">
              {[
                { key: 'microInteractions', label: 'Micro-interactions', description: 'Subtle hover and tap animations' },
                { key: 'particleEffects', label: 'Particle Effects', description: 'Background particle animations' },
                { key: 'fluidAnimations', label: 'Fluid Animations', description: 'Smooth, natural motion' },
                { key: 'contextualAnimations', label: 'Contextual Animations', description: 'Mood-based animation styles' },
                { key: 'accessibilityMode', label: 'Accessibility Mode', description: 'Reduced motion for sensitivity' }
              ].map(({ key, label, description }) => (
                <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-800">{label}</div>
                    <div className="text-sm text-gray-600">{description}</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <span className="sr-only">Toggle {label}</span>
                    <input
                      type="checkbox"
                      checked={animations[key as keyof AnimationSettings] as boolean}
                      onChange={(e) => updateAnimationSettings({ [key]: e.target.checked })}
                      className="sr-only peer"
                      title={`Toggle ${label}`}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              ))}

              {/* Speed Control */}
              <div className="p-4 border border-gray-200 rounded-lg">
                <label htmlFor="animation-speed" className="block font-medium text-gray-800 mb-2">Animation Speed</label>
                <select
                  id="animation-speed"
                  value={animations.transitionSpeed}
                  onChange={(e) => updateAnimationSettings({ transitionSpeed: e.target.value as any })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="slow">Slow</option>
                  <option value="normal">Normal</option>
                  <option value="fast">Fast</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'theme' && (
          <motion.div
            key="theme"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Theme Customization</h3>
            
            <div className="space-y-6">
              {/* Color Scheme */}
              <div>
                <label htmlFor="color-scheme" className="block font-medium text-gray-800 mb-2">Color Scheme</label>
                <select
                  id="color-scheme"
                  value={theme.colorScheme}
                  onChange={(e) => updateTheme({ colorScheme: e.target.value as any })}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                  <option value="custom">Custom</option>
                </select>
              </div>

              {/* Primary Color */}
              <div>
                <label htmlFor="primary-color" className="block font-medium text-gray-800 mb-2">Primary Color</label>
                <input
                  id="primary-color"
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                  className="w-full h-12 rounded-lg border border-gray-300"
                />
              </div>

              {/* Accent Color */}
              <div>
                <label htmlFor="accent-color" className="block font-medium text-gray-800 mb-2">Accent Color</label>
                <input
                  id="accent-color"
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => updateTheme({ accentColor: e.target.value })}
                  className="w-full h-12 rounded-lg border border-gray-300"
                />
              </div>

              {/* Style Options */}
              {[
                { key: 'backgroundGradient', label: 'Background Gradients' },
                { key: 'glassmorphism', label: 'Glass Effects' },
                { key: 'neuomorphism', label: 'Soft UI Style' },
                { key: 'shadows', label: 'Drop Shadows' }
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <span className="font-medium text-gray-800">{label}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <span className="sr-only">Toggle {label}</span>
                    <input
                      type="checkbox"
                      checked={theme[key as keyof ThemeCustomization] as boolean}
                      onChange={(e) => updateTheme({ [key]: e.target.checked })}
                      className="sr-only peer"
                      title={`Toggle ${label}`}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setShowParticles(!showParticles)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full shadow-xl flex items-center justify-center z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ rotate: showParticles ? 0 : 180 }}
        title="Toggle particle effects"
      >
        <Sparkles className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default VisualImprovements;

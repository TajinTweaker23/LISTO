import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Ear, 
  Sun, 
  Volume2, 
  Settings,
  Lightbulb,
  Thermometer,
  Wind,
  Zap,
  Brain,
  Shield,
  Save,
  RotateCcw,
  TestTube
} from 'lucide-react';

interface SensoryProfile {
  visualSensitivity: {
    lightSensitivity: number; // 1-10 scale
    colorContrast: 'low' | 'medium' | 'high';
    motionSensitivity: number;
    textSize: 'small' | 'medium' | 'large' | 'xlarge';
    fontFamily: 'serif' | 'sans-serif' | 'dyslexic' | 'monospace';
    reducedAnimations: boolean;
    darkModePreference: 'light' | 'dark' | 'auto' | 'high-contrast';
  };
  auditorySensitivity: {
    volumeSensitivity: number; // 1-10 scale
    frequencyPreferences: string[];
    backgroundNoise: 'none' | 'white' | 'brown' | 'pink' | 'nature';
    soundAlerts: boolean;
    notificationStyle: 'visual' | 'audio' | 'vibration' | 'combined';
  };
  tactileSensitivity: {
    hapticFeedback: boolean;
    vibrationIntensity: number; // 1-10 scale
    texturePreferences: string[];
    temperatureSensitivity: number;
  };
  environmentalNeeds: {
    idealTemperature: number;
    humidityPreference: 'low' | 'medium' | 'high';
    airflow: 'still' | 'gentle' | 'moderate';
    lighting: 'dim' | 'soft' | 'bright' | 'variable';
    noiseLevel: 'silent' | 'quiet' | 'moderate' | 'bustling';
  };
  cognitivePreferences: {
    informationDensity: 'minimal' | 'moderate' | 'dense';
    multitasking: 'single' | 'limited' | 'multiple';
    interruptionTolerance: number; // 1-10 scale
    focusDuration: number; // in minutes
    breakFrequency: number; // minutes between breaks
  };
}

interface SensoryRecommendation {
  id: string;
  category: 'visual' | 'auditory' | 'tactile' | 'environmental' | 'cognitive';
  title: string;
  description: string;
  implementation: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  benefit: string;
  timeOfDay?: string[];
  activityType?: string[];
}

interface EnvironmentalCondition {
  timestamp: Date;
  lightLevel: number; // lux
  soundLevel: number; // decibels
  temperature: number; // celsius
  humidity: number; // percentage
  source: 'manual' | 'sensor' | 'estimated';
}

const SensoryConsiderations: React.FC = () => {
  const [profile, setProfile] = useState<SensoryProfile | null>(null);
  const [currentConditions, setCurrentConditions] = useState<EnvironmentalCondition | null>(null);
  const [recommendations, setRecommendations] = useState<SensoryRecommendation[]>([]);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [calibrationStep, setCalibrationStep] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [adaptiveMode, setAdaptiveMode] = useState(true);

  useEffect(() => {
    loadSensoryProfile();
    loadEnvironmentalData();
    generateRecommendations();
  }, []);

  useEffect(() => {
    if (adaptiveMode && profile && currentConditions) {
      generatePersonalizedRecommendations();
    }
  }, [profile, currentConditions, adaptiveMode]);

  const loadSensoryProfile = () => {
    const savedProfile = JSON.parse(localStorage.getItem('sensory-profile') || 'null');
    
    if (savedProfile) {
      setProfile(savedProfile);
    } else {
      // Set default profile
      const defaultProfile: SensoryProfile = {
        visualSensitivity: {
          lightSensitivity: 5,
          colorContrast: 'medium',
          motionSensitivity: 5,
          textSize: 'medium',
          fontFamily: 'sans-serif',
          reducedAnimations: false,
          darkModePreference: 'auto'
        },
        auditorySensitivity: {
          volumeSensitivity: 5,
          frequencyPreferences: ['mid'],
          backgroundNoise: 'none',
          soundAlerts: true,
          notificationStyle: 'combined'
        },
        tactileSensitivity: {
          hapticFeedback: true,
          vibrationIntensity: 5,
          texturePreferences: ['smooth'],
          temperatureSensitivity: 5
        },
        environmentalNeeds: {
          idealTemperature: 22,
          humidityPreference: 'medium',
          airflow: 'gentle',
          lighting: 'soft',
          noiseLevel: 'quiet'
        },
        cognitivePreferences: {
          informationDensity: 'moderate',
          multitasking: 'limited',
          interruptionTolerance: 5,
          focusDuration: 25,
          breakFrequency: 25
        }
      };
      setProfile(defaultProfile);
    }
  };

  const loadEnvironmentalData = () => {
    // In a real implementation, this would get data from sensors or APIs
    const mockConditions: EnvironmentalCondition = {
      timestamp: new Date(),
      lightLevel: 300, // lux
      soundLevel: 45, // decibels
      temperature: 23, // celsius
      humidity: 50, // percentage
      source: 'estimated'
    };
    setCurrentConditions(mockConditions);
  };

  const generateRecommendations = () => {
    const baseRecommendations: SensoryRecommendation[] = [
      {
        id: 'blue-light-filter',
        category: 'visual',
        title: 'Blue Light Management',
        description: 'Reduce blue light exposure during evening hours',
        implementation: 'Enable blue light filter or night mode on devices',
        priority: 'medium',
        benefit: 'Reduced eye strain and improved sleep quality',
        timeOfDay: ['evening', 'night'],
        activityType: ['screen-work', 'reading']
      },
      {
        id: 'background-sounds',
        category: 'auditory',
        title: 'Ambient Sound Control',
        description: 'Use consistent background sounds to mask distracting noises',
        implementation: 'Play white noise, brown noise, or nature sounds',
        priority: 'high',
        benefit: 'Improved focus and reduced auditory overwhelm',
        activityType: ['focus-work', 'reading', 'creative']
      },
      {
        id: 'break-reminders',
        category: 'cognitive',
        title: 'Sensory Break Alerts',
        description: 'Regular breaks to prevent sensory overload',
        implementation: 'Set gentle reminders every 20-30 minutes',
        priority: 'high',
        benefit: 'Prevents overwhelm and maintains processing capacity',
        activityType: ['all']
      },
      {
        id: 'lighting-optimization',
        category: 'environmental',
        title: 'Adaptive Lighting',
        description: 'Adjust lighting based on time of day and activity',
        implementation: 'Use adjustable LED lights or smart bulbs',
        priority: 'medium',
        benefit: 'Reduced visual fatigue and improved mood regulation',
        timeOfDay: ['all']
      }
    ];

    setRecommendations(baseRecommendations);
  };

  const generatePersonalizedRecommendations = useCallback(() => {
    if (!profile || !currentConditions) return;

    const personalizedRecs: SensoryRecommendation[] = [];

    // Visual sensitivity recommendations
    if (profile.visualSensitivity.lightSensitivity > 7) {
      personalizedRecs.push({
        id: 'high-light-sensitivity',
        category: 'visual',
        title: 'Light Sensitivity Management',
        description: 'Your light sensitivity is high. Consider these adjustments.',
        implementation: 'Lower screen brightness, use bias lighting, consider tinted glasses',
        priority: 'high',
        benefit: 'Reduced visual overwhelm and headaches'
      });
    }

    // Auditory sensitivity recommendations
    if (profile.auditorySensitivity.volumeSensitivity > 7) {
      personalizedRecs.push({
        id: 'high-sound-sensitivity',
        category: 'auditory',
        title: 'Sound Environment Optimization',
        description: 'High auditory sensitivity detected.',
        implementation: 'Use noise-canceling headphones, create quiet zones, limit notification sounds',
        priority: 'high',
        benefit: 'Reduced auditory stress and improved concentration'
      });
    }

    // Environmental conditions
    if (currentConditions.lightLevel > 500 && profile.visualSensitivity.lightSensitivity > 6) {
      personalizedRecs.push({
        id: 'current-light-too-bright',
        category: 'environmental',
        title: 'Current Lighting Too Bright',
        description: 'Detected high light levels that may cause discomfort.',
        implementation: 'Dim lights, close blinds, or move to a different location',
        priority: 'critical',
        benefit: 'Immediate relief from visual overwhelm'
      });
    }

    // Cognitive load considerations
    if (profile.cognitivePreferences.interruptionTolerance < 4) {
      personalizedRecs.push({
        id: 'interruption-management',
        category: 'cognitive',
        title: 'Interruption Minimization',
        description: 'Low interruption tolerance requires protected focus time.',
        implementation: 'Turn off non-essential notifications, use "Do Not Disturb" mode',
        priority: 'high',
        benefit: 'Maintained focus and reduced cognitive fatigue'
      });
    }

    setRecommendations(prev => [...prev, ...personalizedRecs]);
  }, [profile, currentConditions]);

  const saveSensoryProfile = () => {
    if (profile) {
      localStorage.setItem('sensory-profile', JSON.stringify(profile));
      // Show success message
    }
  };

  const startCalibration = () => {
    setIsCalibrating(true);
    setCalibrationStep(0);
  };

  const completeCalibration = () => {
    setIsCalibrating(false);
    saveSensoryProfile();
    generatePersonalizedRecommendations();
  };

  const updateProfileSection = (section: keyof SensoryProfile, updates: any) => {
    if (!profile) return;
    
    setProfile(prev => ({
      ...prev!,
      [section]: { ...prev![section], ...updates }
    }));
  };

  const resetToDefaults = () => {
    localStorage.removeItem('sensory-profile');
    loadSensoryProfile();
  };

  const getRecommendationColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getSensitivityLevel = (value: number): string => {
    if (value <= 3) return 'Low';
    if (value <= 6) return 'Moderate';
    if (value <= 8) return 'High';
    return 'Very High';
  };

  const getSensitivityColor = (value: number): string => {
    if (value <= 3) return 'text-green-600';
    if (value <= 6) return 'text-yellow-600';
    if (value <= 8) return 'text-orange-600';
    return 'text-red-600';
  };

  if (!profile) {
    return <div className="max-w-4xl mx-auto p-6">Loading sensory profile...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Sensory Considerations</h1>
              <p className="text-gray-600">Personalized environment optimization for neurodivergent needs</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-white/50"
              aria-label="Open sensory settings"
            >
              <Settings className="w-6 h-6" />
            </button>
            <button
              onClick={startCalibration}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <TestTube className="w-4 h-4" />
              Calibrate
            </button>
          </div>
        </div>

        {/* Current Environment Status */}
        {currentConditions && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/70 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Lightbulb className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-600">Light Level</span>
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {currentConditions.lightLevel} lux
              </div>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">Sound Level</span>
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {currentConditions.soundLevel} dB
              </div>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer className="w-4 h-4 text-red-600" />
                <span className="text-sm text-gray-600">Temperature</span>
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {currentConditions.temperature}°C
              </div>
            </div>
            <div className="bg-white/70 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Wind className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Humidity</span>
              </div>
              <div className="text-lg font-semibold text-gray-800">
                {currentConditions.humidity}%
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 bg-white rounded-lg p-2 shadow-sm">
        {[
          { id: 'overview', label: 'Overview', icon: Brain },
          { id: 'visual', label: 'Visual', icon: Eye },
          { id: 'auditory', label: 'Auditory', icon: Ear },
          { id: 'environmental', label: 'Environment', icon: Sun },
          { id: 'recommendations', label: 'Recommendations', icon: Lightbulb }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveSection(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeSection === id
                ? 'bg-purple-100 text-purple-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        {activeSection === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Sensitivity Overview */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Sensitivity Profile</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">Visual Sensitivity</span>
                  </div>
                  <div className={`font-semibold ${getSensitivityColor(profile.visualSensitivity.lightSensitivity)}`}>
                    {getSensitivityLevel(profile.visualSensitivity.lightSensitivity)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Ear className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">Auditory Sensitivity</span>
                  </div>
                  <div className={`font-semibold ${getSensitivityColor(profile.auditorySensitivity.volumeSensitivity)}`}>
                    {getSensitivityLevel(profile.auditorySensitivity.volumeSensitivity)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-600" />
                    <span className="text-gray-700">Tactile Sensitivity</span>
                  </div>
                  <div className={`font-semibold ${getSensitivityColor(profile.tactileSensitivity.vibrationIntensity)}`}>
                    {getSensitivityLevel(profile.tactileSensitivity.vibrationIntensity)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">Interruption Tolerance</span>
                  </div>
                  <div className={`font-semibold ${getSensitivityColor(11 - profile.cognitivePreferences.interruptionTolerance)}`}>
                    {getSensitivityLevel(11 - profile.cognitivePreferences.interruptionTolerance)}
                  </div>
                </div>
              </div>
            </div>

            {/* Current Adaptations */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Active Adaptations</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-green-700">Dark Mode</span>
                  <span className="text-green-600 capitalize">{profile.visualSensitivity.darkModePreference}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-700">Text Size</span>
                  <span className="text-blue-600 capitalize">{profile.visualSensitivity.textSize}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-700">Background Noise</span>
                  <span className="text-purple-600 capitalize">{profile.auditorySensitivity.backgroundNoise}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <span className="text-orange-700">Focus Duration</span>
                  <span className="text-orange-600">{profile.cognitivePreferences.focusDuration} min</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'visual' && (
          <motion.div
            key="visual"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Visual Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="light-sensitivity" className="block text-sm font-medium text-gray-700 mb-2">
                    Light Sensitivity: {profile.visualSensitivity.lightSensitivity}/10
                  </label>
                  <input
                    id="light-sensitivity"
                    type="range"
                    min="1"
                    max="10"
                    value={profile.visualSensitivity.lightSensitivity}
                    onChange={(e) => updateProfileSection('visualSensitivity', { 
                      lightSensitivity: parseInt(e.target.value) 
                    })}
                    className="w-full"
                  />
                  <div className="text-xs text-gray-500 mt-1">
                    1 = Not sensitive, 10 = Extremely sensitive
                  </div>
                </div>

                <div>
                  <label htmlFor="color-contrast" className="block text-sm font-medium text-gray-700 mb-2">Color Contrast</label>
                  <select
                    id="color-contrast"
                    value={profile.visualSensitivity.colorContrast}
                    onChange={(e) => updateProfileSection('visualSensitivity', { 
                      colorContrast: e.target.value 
                    })}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                  >
                    <option value="low">Low Contrast</option>
                    <option value="medium">Medium Contrast</option>
                    <option value="high">High Contrast</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="text-size" className="block text-sm font-medium text-gray-700 mb-2">Text Size</label>
                  <select
                    id="text-size"
                    value={profile.visualSensitivity.textSize}
                    onChange={(e) => updateProfileSection('visualSensitivity', { 
                      textSize: e.target.value 
                    })}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                    <option value="xlarge">Extra Large</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="dark-mode" className="block text-sm font-medium text-gray-700 mb-2">Dark Mode Preference</label>
                  <select
                    id="dark-mode"
                    value={profile.visualSensitivity.darkModePreference}
                    onChange={(e) => updateProfileSection('visualSensitivity', { 
                      darkModePreference: e.target.value 
                    })}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                  >
                    <option value="light">Always Light</option>
                    <option value="dark">Always Dark</option>
                    <option value="auto">Auto (time-based)</option>
                    <option value="high-contrast">High Contrast</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="font-family" className="block text-sm font-medium text-gray-700 mb-2">Font Family</label>
                  <select
                    id="font-family"
                    value={profile.visualSensitivity.fontFamily}
                    onChange={(e) => updateProfileSection('visualSensitivity', { 
                      fontFamily: e.target.value 
                    })}
                    className="w-full p-2 border border-gray-200 rounded-lg"
                  >
                    <option value="sans-serif">Sans Serif</option>
                    <option value="serif">Serif</option>
                    <option value="dyslexic">Dyslexic-friendly</option>
                    <option value="monospace">Monospace</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="reduced-animations"
                    checked={profile.visualSensitivity.reducedAnimations}
                    onChange={(e) => updateProfileSection('visualSensitivity', { 
                      reducedAnimations: e.target.checked 
                    })}
                    className="rounded"
                  />
                  <label htmlFor="reduced-animations" className="text-sm text-gray-700">
                    Reduce animations and motion
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeSection === 'recommendations' && (
          <motion.div
            key="recommendations"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Personalized Recommendations</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Adaptive Mode</span>
                  <button
                    onClick={() => setAdaptiveMode(!adaptiveMode)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      adaptiveMode ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle adaptive mode"
                  >
                    <motion.div
                      animate={{ x: adaptiveMode ? 24 : 0 }}
                      className="w-6 h-6 bg-white rounded-full shadow-sm"
                    />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {recommendations.map((rec) => (
                  <motion.div
                    key={rec.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-800">{rec.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs border ${getRecommendationColor(rec.priority)}`}>
                        {rec.priority}
                      </span>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <div className="text-sm font-medium text-gray-700 mb-1">Implementation:</div>
                      <div className="text-sm text-gray-600">{rec.implementation}</div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-sm text-green-700">{rec.benefit}</span>
                    </div>
                  </motion.div>
                ))}

                {recommendations.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Lightbulb className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No specific recommendations at this time.</p>
                    <p className="text-sm">Your current settings look good!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Save Button */}
      <div className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
        <button
          onClick={resetToDefaults}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Defaults
        </button>
        
        <button
          onClick={saveSensoryProfile}
          className="flex items-center gap-2 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          <Save className="w-4 h-4" />
          Save Preferences
        </button>
      </div>

      {/* Calibration Modal */}
      <AnimatePresence>
        {isCalibrating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Sensory Calibration - Step {calibrationStep + 1} of 5
              </h3>
              
              <div className="mb-6">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <progress
                    className="w-full h-2 rounded-full bg-purple-500"
                    value={calibrationStep + 1}
                    max={5}
                    aria-label="Calibration progress"
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-6">
                  We'll guide you through a quick calibration to optimize your sensory experience.
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setIsCalibrating(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Skip Calibration
                  </button>
                  <button
                    onClick={() => {
                      if (calibrationStep < 4) {
                        setCalibrationStep(calibrationStep + 1);
                      } else {
                        completeCalibration();
                      }
                    }}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    {calibrationStep < 4 ? 'Next' : 'Complete'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SensoryConsiderations;

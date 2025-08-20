import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Footprints, 
  Eye, 
  Zap, 
  Heart, 
  Brain, 
  Flower2,
  Settings,
  Play,
  Pause,
  Target
} from 'lucide-react';

interface BreakRecommendation {
  id: string;
  type: 'movement' | 'visual' | 'cognitive' | 'sensory' | 'emotional';
  title: string;
  description: string;
  duration: number; // in seconds
  instructions: string[];
  benefits: string[];
  neurodivergentFriendly: boolean;
  energyLevel: 'low' | 'medium' | 'high';
  icon: React.ComponentType<any>;
  soundPrompt?: string;
}

interface BreakSession {
  id: string;
  recommendation: BreakRecommendation;
  startTime: Date;
  completed: boolean;
  effectiveness?: number; // 1-5 rating
  notes?: string;
}

interface UserPattern {
  preferredBreakTypes: string[];
  effectivenessByTime: { [hour: number]: number };
  cyclePhasePreferences: { [phase: string]: string[] };
  weatherSensitivity: boolean;
  currentEnergyLevel: 'low' | 'medium' | 'high';
  currentMood: string;
  recentFocusSession: number; // minutes focused
}

const IntelligentBreakReminder: React.FC = () => {
  const [currentBreak, setCurrentBreak] = useState<BreakSession | null>(null);
  const [breakHistory, setBreakHistory] = useState<BreakSession[]>([]);
  const [userPattern, setUserPattern] = useState<UserPattern | null>(null);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoBreakEnabled, setAutoBreakEnabled] = useState(true);
  const [breakIntensity, setBreakIntensity] = useState<'gentle' | 'standard' | 'energizing'>('standard');

  const breakRecommendations: BreakRecommendation[] = [
    {
      id: 'micro-movement',
      type: 'movement',
      title: '3-Minute Micro Movement',
      description: 'Gentle movements to release tension and boost circulation',
      duration: 180,
      instructions: [
        'Stand up slowly and take 3 deep breaths',
        'Roll your shoulders back 5 times',
        'Gently stretch your neck side to side',
        'Do 10 gentle arm circles',
        'Wiggle your fingers and toes'
      ],
      benefits: ['Improved circulation', 'Reduced muscle tension', 'Increased alertness'],
      neurodivergentFriendly: true,
      energyLevel: 'low',
      icon: Footprints
    },
    {
      id: 'eye-relief',
      type: 'visual',
      title: '20-20-20 Vision Break',
      description: 'Give your eyes a rest with the evidence-based 20-20-20 rule',
      duration: 120,
      instructions: [
        'Look away from your screen',
        'Focus on something 20 feet away for 20 seconds',
        'Blink slowly 10 times',
        'Look up, down, left, and right',
        'Close your eyes for 10 seconds'
      ],
      benefits: ['Reduced eye strain', 'Prevented dry eyes', 'Better focus when returning'],
      neurodivergentFriendly: true,
      energyLevel: 'low',
      icon: Eye
    },
    {
      id: 'breathing-reset',
      type: 'cognitive',
      title: 'Cognitive Reset Breathing',
      description: 'Box breathing to reset your nervous system and improve focus',
      duration: 240,
      instructions: [
        'Sit comfortably with feet flat on floor',
        'Inhale for 4 counts through your nose',
        'Hold your breath for 4 counts',
        'Exhale for 4 counts through your mouth',
        'Hold empty for 4 counts',
        'Repeat 4-6 times'
      ],
      benefits: ['Reduced stress hormones', 'Improved concentration', 'Emotional regulation'],
      neurodivergentFriendly: true,
      energyLevel: 'medium',
      icon: Brain
    },
    {
      id: 'sensory-grounding',
      type: 'sensory',
      title: '5-4-3-2-1 Grounding',
      description: 'Sensory grounding technique for overwhelm or anxiety',
      duration: 300,
      instructions: [
        'Name 5 things you can see',
        'Name 4 things you can touch',
        'Name 3 things you can hear',
        'Name 2 things you can smell',
        'Name 1 thing you can taste',
        'Take 3 deep breaths'
      ],
      benefits: ['Reduced anxiety', 'Increased present-moment awareness', 'Sensory regulation'],
      neurodivergentFriendly: true,
      energyLevel: 'low',
      icon: Flower2
    },
    {
      id: 'energy-boost',
      type: 'movement',
      title: 'Quick Energy Boost',
      description: '5-minute energizing movement sequence',
      duration: 300,
      instructions: [
        'Do 10 jumping jacks (or arm movements if seated)',
        'March in place for 30 seconds',
        'Do 5 wall push-ups',
        'Stretch arms overhead and reach for the sky',
        'Take 5 energizing breaths'
      ],
      benefits: ['Increased energy', 'Better circulation', 'Mood boost'],
      neurodivergentFriendly: false,
      energyLevel: 'high',
      icon: Zap
    },
    {
      id: 'emotional-check',
      type: 'emotional',
      title: 'Emotional Check-In',
      description: 'Quick emotional awareness and regulation',
      duration: 180,
      instructions: [
        'Place one hand on your chest, one on your belly',
        'Notice your current emotion without judgment',
        'Rate your stress level 1-10',
        'Think of one thing you\'re grateful for',
        'Set an intention for the next hour'
      ],
      benefits: ['Emotional awareness', 'Stress reduction', 'Improved self-regulation'],
      neurodivergentFriendly: true,
      energyLevel: 'medium',
      icon: Heart
    }
  ];

  useEffect(() => {
    loadUserPattern();
    loadBreakHistory();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isBreakActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => {
          if (time <= 1) {
            completeBreak();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBreakActive, timeRemaining]);

  const loadUserPattern = () => {
    // Load user patterns from health data, focus timer data, etc.
    // These will be used when actual data is available
    JSON.parse(localStorage.getItem('focus-sessions-completed') || '0');
    JSON.parse(localStorage.getItem('health-data') || '{}');
    
    const pattern: UserPattern = {
      preferredBreakTypes: ['movement', 'visual', 'cognitive'],
      effectivenessByTime: {
        9: 4.2,
        14: 4.0,
        16: 3.8,
        20: 4.1
      },
      cyclePhasePreferences: {
        menstrual: ['sensory', 'emotional'],
        follicular: ['movement', 'cognitive'],
        ovulatory: ['movement', 'cognitive'],
        luteal: ['sensory', 'emotional']
      },
      weatherSensitivity: true,
      currentEnergyLevel: 'medium',
      currentMood: 'focused',
      recentFocusSession: 25
    };

    setUserPattern(pattern);
  };

  const loadBreakHistory = () => {
    const history = JSON.parse(localStorage.getItem('break-history') || '[]');
    setBreakHistory(history);
  };

  const getIntelligentBreakRecommendation = useCallback((): BreakRecommendation => {
    if (!userPattern) return breakRecommendations[0];

    const currentHour = new Date().getHours();
    const filtered = breakRecommendations.filter(rec => {
      // Filter by energy level
      if (userPattern.currentEnergyLevel === 'low' && rec.energyLevel === 'high') return false;
      
      // Filter by break intensity setting
      if (breakIntensity === 'gentle' && rec.energyLevel === 'high') return false;
      if (breakIntensity === 'energizing' && rec.energyLevel === 'low') return false;
      
      // Consider neurodivergent preferences
      if (userPattern.preferredBreakTypes.includes(rec.type)) return true;
      
      return rec.neurodivergentFriendly;
    });

    // Analyze recent focus session length to determine break type
    if (userPattern.recentFocusSession >= 45) {
      // Longer sessions need more comprehensive breaks
      const movementBreaks = filtered.filter(r => r.type === 'movement');
      if (movementBreaks.length > 0) return movementBreaks[0];
    } else if (userPattern.recentFocusSession >= 25) {
      // Standard Pomodoro - cognitive or visual breaks
      const cognitiveBreaks = filtered.filter(r => r.type === 'cognitive' || r.type === 'visual');
      if (cognitiveBreaks.length > 0) return cognitiveBreaks[0];
    }

    // Consider time of day effectiveness
    if (userPattern.effectivenessByTime[currentHour] < 3.5) {
      // Low effectiveness time - suggest sensory or emotional breaks
      const calmingBreaks = filtered.filter(r => r.type === 'sensory' || r.type === 'emotional');
      if (calmingBreaks.length > 0) return calmingBreaks[0];
    }

    return filtered[0] || breakRecommendations[0];
  }, [userPattern, breakIntensity]);

  const startBreak = (recommendation?: BreakRecommendation) => {
    const breakRec = recommendation || getIntelligentBreakRecommendation();
    
    const session: BreakSession = {
      id: `break-${Date.now()}`,
      recommendation: breakRec,
      startTime: new Date(),
      completed: false
    };

    setCurrentBreak(session);
    setTimeRemaining(breakRec.duration);
    setIsBreakActive(true);

    if (soundEnabled && breakRec.soundPrompt) {
      // Play sound prompt
      const audio = new Audio(breakRec.soundPrompt);
      audio.play().catch(() => {}); // Ignore if audio fails
    }
  };

  const pauseBreak = () => {
    setIsBreakActive(false);
  };

  const resumeBreak = () => {
    setIsBreakActive(true);
  };

  const completeBreak = () => {
    if (!currentBreak) return;

    const completedSession = {
      ...currentBreak,
      completed: true
    };

    const newHistory = [...breakHistory, completedSession];
    setBreakHistory(newHistory);
    localStorage.setItem('break-history', JSON.stringify(newHistory));

    setCurrentBreak(null);
    setIsBreakActive(false);
    setTimeRemaining(0);

    // Show completion feedback
    if (soundEnabled) {
      // Play completion sound
    }
  };

  const skipBreak = () => {
    setCurrentBreak(null);
    setIsBreakActive(false);
    setTimeRemaining(0);
  };

  const rateBreakEffectiveness = (rating: number) => {
    if (!currentBreak) return;

    const updatedSession = {
      ...currentBreak,
      effectiveness: rating
    };

    const updatedHistory = breakHistory.map(session => 
      session.id === currentBreak.id ? updatedSession : session
    );

    setBreakHistory(updatedHistory);
    localStorage.setItem('break-history', JSON.stringify(updatedHistory));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreakTypeColor = (type: string) => {
    switch (type) {
      case 'movement': return 'bg-green-100 text-green-700 border-green-200';
      case 'visual': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cognitive': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'sensory': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'emotional': return 'bg-pink-100 text-pink-700 border-pink-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Clock className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-800">Intelligent Break Coach</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
            aria-label="Open break settings"
            title="Configure break preferences"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>
        <p className="text-gray-600">
          AI-powered break recommendations based on your patterns and needs
        </p>
      </motion.div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Break Preferences</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="break-intensity-select" className="block text-sm font-medium text-gray-700 mb-2">Break Intensity</label>
                <select
                  id="break-intensity-select"
                  value={breakIntensity}
                  onChange={(e) => setBreakIntensity(e.target.value as any)}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  aria-label="Select break intensity level"
                >
                  <option value="gentle">Gentle (Low energy activities)</option>
                  <option value="standard">Standard (Balanced approach)</option>
                  <option value="energizing">Energizing (High energy activities)</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={soundEnabled}
                    onChange={(e) => setSoundEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Sound prompts</span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={autoBreakEnabled}
                    onChange={(e) => setAutoBreakEnabled(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Auto-suggest breaks</span>
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Break Session */}
      {currentBreak && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg border-2 border-blue-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <currentBreak.recommendation.icon className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{currentBreak.recommendation.title}</h2>
                <p className="text-gray-600">{currentBreak.recommendation.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{formatTime(timeRemaining)}</div>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getBreakTypeColor(currentBreak.recommendation.type)}`}>
                {currentBreak.recommendation.type}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-3">Follow along:</h3>
            <ul className="space-y-2">
              {currentBreak.recommendation.instructions.map((instruction, index) => (
                <li key={instruction} className="flex items-start gap-2 text-sm text-gray-700">
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  {instruction}
                </li>
              ))}
            </ul>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isBreakActive ? (
                <button
                  onClick={pauseBreak}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              ) : (
                <button
                  onClick={resumeBreak}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Resume
                </button>
              )}

              <button
                onClick={completeBreak}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <Target className="w-4 h-4" />
                Complete
              </button>
            </div>

            <button
              onClick={skipBreak}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Skip Break
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-4 p-3 bg-white/70 rounded-lg">
            <h4 className="text-sm font-medium text-gray-700 mb-2">Benefits:</h4>
            <div className="flex flex-wrap gap-2">
              {currentBreak.recommendation.benefits.map((benefit) => (
                <span key={benefit} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Break Suggestions */}
      {!currentBreak && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Recommended Break</h2>
            <button
              onClick={() => startBreak()}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
            >
              <Play className="w-5 h-5" />
              Start Smart Break
            </button>
          </div>

          {/* Intelligent Recommendation */}
          {userPattern && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-800">AI Recommendation</span>
              </div>
              <p className="text-blue-700 text-sm">
                Based on your recent {userPattern.recentFocusSession}-minute focus session and current energy level ({userPattern.currentEnergyLevel}), 
                I recommend a {getIntelligentBreakRecommendation().type} break to optimize your next work period.
              </p>
            </div>
          )}

          {/* Break Options Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {breakRecommendations.filter(rec => {
              if (breakIntensity === 'gentle') return rec.energyLevel !== 'high';
              if (breakIntensity === 'energizing') return rec.energyLevel !== 'low';
              return true;
            }).map((recommendation) => (
              <motion.div
                key={recommendation.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                onClick={() => startBreak(recommendation)}
              >
                <div className="flex items-center gap-3 mb-2">
                  <recommendation.icon className="w-6 h-6 text-gray-600" />
                  <div>
                    <h3 className="font-medium text-gray-800">{recommendation.title}</h3>
                    <p className="text-sm text-gray-600">{formatTime(recommendation.duration)}</p>
                  </div>
                  {recommendation.neurodivergentFriendly && (
                    <span className="ml-auto px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      ND-friendly
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getBreakTypeColor(recommendation.type)}`}>
                    {recommendation.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    {recommendation.energyLevel} energy
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Break History Summary */}
      {breakHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Break Sessions</h3>
          <div className="space-y-3">
            {breakHistory.slice(-3).map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <session.recommendation.icon className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-medium text-gray-800">{session.recommendation.title}</div>
                    <div className="text-sm text-gray-600">
                      {session.startTime.toLocaleDateString()} • {formatTime(session.recommendation.duration)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {session.effectiveness && (
                    <div className="text-sm text-gray-600">
                      {session.effectiveness}/5 ⭐
                    </div>
                  )}
                  <span className={`px-2 py-1 rounded text-xs ${session.completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {session.completed ? 'Completed' : 'Skipped'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default IntelligentBreakReminder;

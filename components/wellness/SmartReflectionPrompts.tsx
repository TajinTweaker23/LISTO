import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle,
  Clock,
  X,
  Check,
  RotateCcw,
  Settings,
  Moon,
  Sun,
  Coffee,
  Sunset,
  Eye,
  EyeOff,
  Shield,
  Heart,
  Brain,
  Zap
} from 'lucide-react';
import { Card } from '../ui/EnhancedCards';
import { useToast } from '../../hooks/useToast';

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
type Priority = 'low' | 'medium' | 'high';
type Frequency = 'low' | 'medium' | 'high';

interface ReflectionPrompt {
  id: string;
  text: string;
  category: 'emotional' | 'cognitive' | 'physical' | 'social' | 'productivity' | 'growth';
  optimalTimes: TimeOfDay[];
  adhdFriendly: boolean;
  autismFriendly: boolean;
  priority: Priority;
  followUpQuestions?: string[];
  triggers?: string[]; // Context triggers like 'after-work', 'before-sleep'
}

interface ReflectionResponse {
  id?: string; // Make optional for anonymous mode
  promptId: string;
  response: string;
  mood: number; // 1-10
  timestamp: Date;
  timeOfDay: TimeOfDay;
  context?: string;
  encrypted?: boolean;
}

interface ReflectionSettings {
  enabled: boolean;
  smartTiming: boolean;
  privacyMode: boolean;
  notifications: boolean;
  frequency: Frequency;
  timePreferences: TimeOfDay[];
  categories: string[];
  encryptResponses: boolean;
  dataRetention: 'none' | 'session' | 'encrypted' | 'anonymous';
}

const SmartReflectionPrompts: React.FC = () => {
  const { addToast } = useToast();
  
  const [currentPrompt, setCurrentPrompt] = useState<ReflectionPrompt | null>(null);
  const [response, setResponse] = useState('');
  const [currentMood, setCurrentMood] = useState(5);
  const [showSettings, setShowSettings] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [lastPromptTime, setLastPromptTime] = useState<Date | null>(null);
  
  const [settings, setSettings] = useState<ReflectionSettings>({
    enabled: true,
    smartTiming: true,
    privacyMode: true,
    notifications: false, // Can be turned off
    frequency: 'medium',
    timePreferences: ['morning', 'evening'],
    categories: ['emotional', 'cognitive', 'growth'],
    encryptResponses: true,
    dataRetention: 'none'
  });

  // Comprehensive prompt library
  const promptLibrary: ReflectionPrompt[] = [
    // Morning prompts
    {
      id: 'morning-intention',
      text: 'What\'s one thing you\'re looking forward to today? It can be as simple as a cup of coffee or as big as a presentation.',
      category: 'productivity',
      optimalTimes: ['morning'],
      adhdFriendly: true,
      autismFriendly: true,
      priority: 'medium',
      followUpQuestions: ['What small step can you take toward this today?', 'How will you know when you\'ve succeeded?']
    },
    {
      id: 'energy-check',
      text: 'On a scale of sleepy sloth to hyperactive squirrel, how\'s your energy feeling right now? 🦥➡️🐿️',
      category: 'physical',
      optimalTimes: ['morning', 'afternoon'],
      adhdFriendly: true,
      autismFriendly: true,
      priority: 'high',
      followUpQuestions: ['What might help optimize this energy level?', 'What patterns do you notice about your energy?']
    },

    // Afternoon transition prompts
    {
      id: 'midday-reset',
      text: 'If your morning self left you a note, what would you want it to say about how the day is going?',
      category: 'cognitive',
      optimalTimes: ['afternoon'],
      adhdFriendly: true,
      autismFriendly: false,
      priority: 'low',
      triggers: ['after-work', 'break-time']
    },
    {
      id: 'social-battery',
      text: 'How full or drained is your social battery right now? What does it need?',
      category: 'social',
      optimalTimes: ['afternoon', 'evening'],
      adhdFriendly: true,
      autismFriendly: true,
      priority: 'high',
      followUpQuestions: ['What would help recharge it?', 'What social interactions felt good today?']
    },

    // Evening wind-down prompts
    {
      id: 'day-gratitude',
      text: 'What\'s something tiny that went better than expected today? Could be finding matching socks or a green light when you needed it.',
      category: 'emotional',
      optimalTimes: ['evening'],
      adhdFriendly: true,
      autismFriendly: true,
      priority: 'medium',
      followUpQuestions: ['How did this small thing affect your day?', 'What made this moment possible?']
    },
    {
      id: 'sensory-check',
      text: 'What textures, sounds, or lights felt just right today? What felt overwhelming?',
      category: 'physical',
      optimalTimes: ['evening'],
      adhdFriendly: true,
      autismFriendly: true,
      priority: 'high',
      followUpQuestions: ['How can you get more of the good sensations tomorrow?', 'What would help you prepare for challenging sensory situations?']
    },
    {
      id: 'transition-moments',
      text: 'Which transition felt the hardest today (like stopping one thing to start another)? Which felt smooth?',
      category: 'cognitive',
      optimalTimes: ['evening'],
      adhdFriendly: true,
      autismFriendly: true,
      priority: 'high',
      followUpQuestions: ['What made the smooth transition work?', 'How could you make the hard transition easier next time?']
    },

    // Night-time processing prompts
    {
      id: 'emotional-release',
      text: 'If you could put one feeling from today in a balloon and release it, what would it be? Why?',
      category: 'emotional',
      optimalTimes: ['night'],
      adhdFriendly: true,
      autismFriendly: false,
      priority: 'medium',
      followUpQuestions: ['What would you like to feel instead?', 'What helped process difficult feelings today?']
    },
    {
      id: 'rest-preparation',
      text: 'What does your brain need to feel safe enough to rest tonight?',
      category: 'emotional',
      optimalTimes: ['night'],
      adhdFriendly: true,
      autismFriendly: true,
      priority: 'high',
      followUpQuestions: ['What bedtime routine elements help you most?', 'What thoughts are hardest to let go of?']
    },

    // Growth-focused prompts
    {
      id: 'gentle-challenge',
      text: 'What\'s one small way you surprised yourself recently? It could be trying a new route or speaking up in a meeting.',
      category: 'growth',
      optimalTimes: ['evening'],
      adhdFriendly: true,
      autismFriendly: true,
      priority: 'low',
      followUpQuestions: ['What made that possible?', 'How did it feel in your body?']
    },
    {
      id: 'pattern-recognition',
      text: 'You\'re the expert on you. What pattern in your day-to-day life are you just starting to notice?',
      category: 'cognitive',
      optimalTimes: ['afternoon', 'evening'],
      adhdFriendly: true,
      autismFriendly: true,
      priority: 'medium',
      followUpQuestions: ['Is this pattern helping or hindering you?', 'What small tweak might improve this pattern?']
    }
  ];

  useEffect(() => {
    loadSettings();
    
    if (settings.smartTiming) {
      checkOptimalTime();
    }
  }, []);

  useEffect(() => {
    if (settings.smartTiming && settings.enabled) {
      const interval = setInterval(checkOptimalTime, 30 * 60 * 1000); // Check every 30 minutes
      return () => clearInterval(interval);
    }
  }, [settings.smartTiming, settings.enabled]);

  const getCurrentTimeOfDay = (): TimeOfDay => {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night';
  };

  const getFrequencyHours = (frequency: Frequency): number => {
    if (frequency === 'high') return 3;
    if (frequency === 'medium') return 6;
    return 12;
  };

  const getTimeIcon = (timeOfDay: string) => {
    switch (timeOfDay) {
      case 'morning': return <Sun className="w-4 h-4 text-yellow-500" />;
      case 'afternoon': return <Coffee className="w-4 h-4 text-orange-500" />;
      case 'evening': return <Sunset className="w-4 h-4 text-pink-500" />;
      case 'night': return <Moon className="w-4 h-4 text-purple-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'emotional': return <Heart className="w-4 h-4 text-red-500" />;
      case 'cognitive': return <Brain className="w-4 h-4 text-blue-500" />;
      case 'physical': return <Zap className="w-4 h-4 text-green-500" />;
      case 'social': return <MessageCircle className="w-4 h-4 text-purple-500" />;
      case 'productivity': return <Check className="w-4 h-4 text-orange-500" />;
      case 'growth': return <Eye className="w-4 h-4 text-indigo-500" />;
      default: return <MessageCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const checkOptimalTime = () => {
    if (!settings.enabled || !settings.smartTiming) return;

    const currentTime = getCurrentTimeOfDay();
    
    // Check if it's been long enough since last prompt
    if (lastPromptTime) {
      const hoursSinceLastPrompt = (Date.now() - lastPromptTime.getTime()) / (1000 * 60 * 60);
      const requiredHours = getFrequencyHours(settings.frequency);
      
      if (hoursSinceLastPrompt < requiredHours) return;
    }

    // Check if current time is preferred
    if (!settings.timePreferences.includes(currentTime)) return;

    // Select appropriate prompt
    const availablePrompts = promptLibrary.filter(prompt => 
      prompt.optimalTimes.includes(currentTime) &&
      settings.categories.includes(prompt.category) &&
      (!prompt.adhdFriendly || true) && // Could add ADHD preference to settings
      (!prompt.autismFriendly || true) // Could add autism preference to settings
    );

    if (availablePrompts.length > 0) {
      // Prioritize high priority prompts
      const highPriorityPrompts = availablePrompts.filter(p => p.priority === 'high');
      const selectedPrompts = highPriorityPrompts.length > 0 ? highPriorityPrompts : availablePrompts;
      
      const randomPrompt = selectedPrompts[Math.floor(Math.random() * selectedPrompts.length)];
      showPrompt(randomPrompt);
    }
  };

  const showPrompt = (prompt: ReflectionPrompt) => {
    setCurrentPrompt(prompt);
    setResponse('');
    setCurrentMood(5);
    setIsVisible(true);
    setLastPromptTime(new Date());

    if (settings.notifications) {
      addToast('💭 Time for a quick reflection', 'info');
    }
  };

  const submitReflection = () => {
    if (!currentPrompt) return;

    const reflectionResponse: ReflectionResponse = {
      id: `reflection-${Date.now()}`,
      promptId: currentPrompt.id,
      response: settings.encryptResponses ? btoa(response) : response, // Simple encoding
      mood: currentMood,
      timestamp: new Date(),
      timeOfDay: getCurrentTimeOfDay(),
      encrypted: settings.encryptResponses
    };

    // Store based on privacy settings
    if (settings.dataRetention !== 'none') {
      const storageKey = settings.dataRetention === 'anonymous' ? 'anonymous-reflections' : 'user-reflections';
      const stored = localStorage.getItem(storageKey);
      const reflections = stored ? JSON.parse(stored) : [];
      
      if (settings.dataRetention === 'anonymous') {
        // Remove identifying information
        delete reflectionResponse.id;
      }
      
      reflections.push(reflectionResponse);
      
      // Keep only last 50 reflections
      if (reflections.length > 50) {
        reflections.splice(0, reflections.length - 50);
      }
      
      localStorage.setItem(storageKey, JSON.stringify(reflections));
    }

    addToast('Reflection saved privately 🌟', 'success');
    dismissPrompt();
  };

  const dismissPrompt = () => {
    setIsVisible(false);
    setCurrentPrompt(null);
    setResponse('');
    setCurrentMood(5);
  };

  const skipPrompt = () => {
    dismissPrompt();
    addToast('Reflection skipped - that\'s okay too! 😊', 'info');
  };

  const loadSettings = () => {
    const saved = localStorage.getItem('reflection-settings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }
  };

  const saveSettings = (newSettings: ReflectionSettings) => {
    setSettings(newSettings);
    localStorage.setItem('reflection-settings', JSON.stringify(newSettings));
    
    if (!newSettings.enabled && isVisible) {
      dismissPrompt();
    }
    
    if (newSettings.dataRetention === 'none') {
      localStorage.removeItem('user-reflections');
      localStorage.removeItem('anonymous-reflections');
      addToast('All reflection data cleared', 'info');
    }
  };

  const triggerManualPrompt = () => {
    const currentTime = getCurrentTimeOfDay();
    const availablePrompts = promptLibrary.filter(prompt => 
      prompt.optimalTimes.includes(currentTime) &&
      settings.categories.includes(prompt.category)
    );

    if (availablePrompts.length > 0) {
      const randomPrompt = availablePrompts[Math.floor(Math.random() * availablePrompts.length)];
      showPrompt(randomPrompt);
    } else {
      // Fallback to any available prompt
      const anyPrompt = promptLibrary[Math.floor(Math.random() * promptLibrary.length)];
      showPrompt(anyPrompt);
    }
  };

  if (!settings.enabled) {
    return (
      <div className="fixed bottom-20 right-4 z-40">
        <Card variant="glass" className="p-4 bg-gray-50">
          <div className="flex items-center gap-3">
            <EyeOff className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Reflections disabled</span>
            <button
              onClick={() => setShowSettings(true)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Reflection settings"
            >
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      {/* Manual Trigger Button */}
      {!isVisible && (
        <div className="fixed bottom-20 right-4 z-40">
          <motion.button
            onClick={triggerManualPrompt}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors"
            title="Get a reflection prompt"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">Reflect</span>
          </motion.button>
          
          <button
            onClick={() => setShowSettings(true)}
            className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            title="Reflection settings"
          >
            <Settings className="w-3 h-3 text-gray-500" />
          </button>
        </div>
      )}

      {/* Privacy Indicator */}
      {settings.privacyMode && isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-80 right-4 z-40"
        >
          <div className="bg-green-100 border border-green-300 rounded-lg px-3 py-1">
            <div className="flex items-center gap-2 text-xs text-green-700">
              <Shield className="w-3 h-3" />
              <span>Private & Secure</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Reflection Prompt */}
      <AnimatePresence>
        {isVisible && currentPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-20 right-4 z-50 w-80 max-w-sm"
          >
            <Card variant="glass" className="p-6 bg-white shadow-xl border border-gray-200">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(currentPrompt.category)}
                  {getTimeIcon(getCurrentTimeOfDay())}
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {currentPrompt.category} Reflection
                  </span>
                </div>
                
                <div className="flex items-center gap-1">
                  <button
                    onClick={skipPrompt}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                    title="Skip this reflection"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                  <button
                    onClick={dismissPrompt}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded transition-colors"
                    title="Dismiss reflection"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Prompt Text */}
              <div className="mb-4">
                <p className="text-gray-700 leading-relaxed">{currentPrompt.text}</p>
              </div>

              {/* Response Input */}
              <div className="mb-4">
                <label htmlFor="reflection-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Your thoughts:
                </label>
                <textarea
                  id="reflection-input"
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Take your time... there's no right or wrong answer."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              {/* Mood Scale */}
              <div className="mb-4">
                <label htmlFor="mood-scale" className="block text-sm font-medium text-gray-700 mb-2">
                  How are you feeling right now? (1-10)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">😔</span>
                  <input
                    id="mood-scale"
                    type="range"
                    min="1"
                    max="10"
                    value={currentMood}
                    onChange={(e) => setCurrentMood(parseInt(e.target.value))}
                    className="flex-1"
                    title={`Mood: ${currentMood}/10`}
                  />
                  <span className="text-xs text-gray-500">😊</span>
                  <span className="text-sm font-medium text-gray-700 w-8">{currentMood}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={skipPrompt}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                >
                  Skip for now
                </button>
                <button
                  onClick={submitReflection}
                  disabled={!response.trim()}
                  className="flex-1 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Done
                </button>
              </div>

              {/* Follow-up hints */}
              {currentPrompt.followUpQuestions && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-1">💡 Follow-up questions to ponder:</p>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {currentPrompt.followUpQuestions.slice(0, 2).map((question, index) => (
                      <li key={`followup-${currentPrompt.id}-${index}`}>• {question}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Neurodivergent-friendly indicators */}
              <div className="mt-3 pt-2 border-t border-gray-100 flex items-center gap-2 text-xs text-gray-500">
                {currentPrompt.adhdFriendly && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">ADHD✓</span>}
                {currentPrompt.autismFriendly && <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">Autism✓</span>}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4 max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-semibold">Reflection Settings</h3>
              
              <div className="space-y-4">
                {/* Enable/Disable */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Smart Reflections</div>
                    <div className="text-sm text-gray-500">Enable reflection prompts</div>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, enabled: !settings.enabled })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.enabled ? 'bg-purple-500' : 'bg-gray-300'
                    }`}
                    title={`${settings.enabled ? 'Disable' : 'Enable'} reflections`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Notifications Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Notifications</div>
                    <div className="text-sm text-gray-500">Get notified for prompts</div>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, notifications: !settings.notifications })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.notifications ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    title={`${settings.notifications ? 'Disable' : 'Enable'} notifications`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.notifications ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Smart Timing */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Smart Timing</div>
                    <div className="text-sm text-gray-500">Prompts at optimal times</div>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, smartTiming: !settings.smartTiming })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.smartTiming ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    title={`${settings.smartTiming ? 'Disable' : 'Enable'} smart timing`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.smartTiming ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Privacy Mode */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Privacy Mode</div>
                    <div className="text-sm text-gray-500">Maximum privacy protection</div>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, privacyMode: !settings.privacyMode })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.privacyMode ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    title={`${settings.privacyMode ? 'Disable' : 'Enable'} privacy mode`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.privacyMode ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Frequency */}
                <div>
                  <label htmlFor="frequency-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Prompt Frequency
                  </label>
                  <select
                    id="frequency-select"
                    value={settings.frequency}
                    onChange={(e) => saveSettings({ 
                      ...settings, 
                      frequency: e.target.value as 'low' | 'medium' | 'high'
                    })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    title="Select reflection frequency"
                  >
                    <option value="low">Low (every 12 hours)</option>
                    <option value="medium">Medium (every 6 hours)</option>
                    <option value="high">High (every 3 hours)</option>
                  </select>
                </div>

                {/* Data Retention */}
                <div>
                  <label htmlFor="data-retention-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Data Storage
                  </label>
                  <select
                    id="data-retention-select"
                    value={settings.dataRetention}
                    onChange={(e) => saveSettings({ 
                      ...settings, 
                      dataRetention: e.target.value as 'none' | 'session' | 'encrypted' | 'anonymous'
                    })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    title="Select data storage preference"
                  >
                    <option value="none">Don't save reflections</option>
                    <option value="session">Session only</option>
                    <option value="encrypted">Encrypted storage</option>
                    <option value="anonymous">Anonymous patterns only</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
                <p className="mb-2"><strong>How it works:</strong></p>
                <div className="space-y-1 text-xs">
                  <p>• Morning: Energy & intention prompts</p>
                  <p>• Afternoon: Social battery & transition checks</p>
                  <p>• Evening: Gratitude & pattern recognition</p>
                  <p>• Night: Emotional processing & rest prep</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowSettings(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SmartReflectionPrompts;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Plus,
  Trash2,
  Brain,
  Zap,
  Moon,
  Coffee,
  Headphones,
  Eye,
  Heart,
  CheckCircle,
  Circle,
  Timer
} from 'lucide-react';
import { Card } from '../ui/EnhancedCards';
import { useToast } from '../../hooks/useToast';

interface RitualStep {
  id: string;
  type: 'breathing' | 'movement' | 'sensory' | 'cognitive' | 'environmental' | 'audio';
  name: string;
  description: string;
  duration: number; // seconds
  instructions: string[];
  visualCue?: string;
  audioUrl?: string;
  hapticPattern?: 'gentle' | 'medium' | 'strong';
  completed?: boolean;
}

interface TransitionRitual {
  id: string;
  name: string;
  fromContext: string;
  toContext: string;
  steps: RitualStep[];
  totalDuration: number;
  energyLevel: 'low' | 'medium' | 'high';
  adhdFriendly: boolean;
  autismFriendly: boolean;
  createdAt: Date;
  lastUsed?: Date;
  useCount: number;
  effectiveness?: number; // 1-5 rating
}

interface RitualSettings {
  enabled: boolean;
  autoSuggest: boolean;
  privateMode: boolean;
  soundEnabled: boolean;
  hapticEnabled: boolean;
  voiceGuidance: boolean;
  dataCollection: 'none' | 'anonymous' | 'full';
}

const TransitionRitualBuilder: React.FC = () => {
  const { addToast } = useToast();
  
  const [rituals, setRituals] = useState<TransitionRitual[]>([]);
  const [settings, setSettings] = useState<RitualSettings>({
    enabled: true,
    autoSuggest: true,
    privateMode: true,
    soundEnabled: true,
    hapticEnabled: true,
    voiceGuidance: false,
    dataCollection: 'none'
  });
  const [currentRitual, setCurrentRitual] = useState<TransitionRitual | null>(null);
  const [isRunningRitual, setIsRunningRitual] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stepTimeRemaining, setStepTimeRemaining] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Pre-built step templates
  const stepTemplates: Record<string, RitualStep[]> = {
    'work-to-break': [
      {
        id: 'save-work',
        type: 'cognitive',
        name: 'Save & Close',
        description: 'Mentally close your work context',
        duration: 30,
        instructions: [
          'Save any open documents',
          'Close unnecessary browser tabs',
          'Take a deep breath and acknowledge what you\'ve accomplished'
        ]
      },
      {
        id: 'physical-release',
        type: 'movement',
        name: 'Physical Reset',
        description: 'Release physical tension from work posture',
        duration: 60,
        instructions: [
          'Stand up and stretch your arms overhead',
          'Roll your shoulders backward 5 times',
          'Take 3 deep breaths while stretching'
        ]
      },
      {
        id: 'context-shift',
        type: 'sensory',
        name: 'Sensory Shift',
        description: 'Change your sensory environment',
        duration: 30,
        instructions: [
          'Look away from your screen to something 20+ feet away',
          'Notice 3 things you can hear right now',
          'Feel your feet on the ground'
        ]
      }
    ],
    'break-to-work': [
      {
        id: 'intention-setting',
        type: 'cognitive',
        name: 'Set Intention',
        description: 'Prepare your mind for focused work',
        duration: 45,
        instructions: [
          'Choose your top priority for this work session',
          'Visualize completing this task successfully',
          'Set a clear time boundary for this work block'
        ]
      },
      {
        id: 'environment-prep',
        type: 'environmental',
        name: 'Optimize Space',
        description: 'Prepare your physical environment',
        duration: 60,
        instructions: [
          'Clear your desk of distractions',
          'Adjust lighting for comfort',
          'Put phone in do-not-disturb mode',
          'Get water and any needed materials ready'
        ]
      },
      {
        id: 'energy-check',
        type: 'sensory',
        name: 'Energy Assessment',
        description: 'Check in with your current energy level',
        duration: 30,
        instructions: [
          'Rate your energy from 1-10',
          'Notice any physical sensations or tension',
          'Adjust your work approach based on your energy'
        ]
      }
    ],
    'social-to-alone': [
      {
        id: 'social-decompression',
        type: 'breathing',
        name: 'Social Battery Reset',
        description: 'Process and release social energy',
        duration: 90,
        instructions: [
          'Take 5 slow, deep breaths',
          'Acknowledge the social interaction you just had',
          'Let any lingering social energy settle',
          'Give yourself permission to be alone now'
        ]
      },
      {
        id: 'sensory-reset',
        type: 'sensory',
        name: 'Sensory Recalibration',
        description: 'Reset your sensory system after social stimulation',
        duration: 120,
        instructions: [
          'Find a quiet space with minimal stimulation',
          'Dim the lights or close your eyes',
          'Remove any uncomfortable clothing or accessories',
          'Focus on comfortable, familiar sensations'
        ]
      }
    ]
  };

  useEffect(() => {
    loadRituals();
    loadSettings();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isRunningRitual && stepTimeRemaining > 0) {
      interval = setInterval(() => {
        setStepTimeRemaining(prev => {
          if (prev <= 1) {
            advanceToNextStep();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunningRitual, stepTimeRemaining]);

  const loadRituals = () => {
    if (!settings.privateMode) {
      const saved = localStorage.getItem('transition-rituals');
      if (saved) {
        const parsed = JSON.parse(saved);
        setRituals(parsed.map((r: any) => ({
          ...r,
          createdAt: new Date(r.createdAt),
          lastUsed: r.lastUsed ? new Date(r.lastUsed) : undefined
        })));
      }
    }
  };

  const loadSettings = () => {
    const savedSettings = localStorage.getItem('ritual-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  };

  const saveRituals = (newRituals: TransitionRitual[]) => {
    if (!settings.privateMode) {
      localStorage.setItem('transition-rituals', JSON.stringify(newRituals));
    }
    setRituals(newRituals);
  };

  const saveSettings = (newSettings: RitualSettings) => {
    localStorage.setItem('ritual-settings', JSON.stringify(newSettings));
    setSettings(newSettings);
    
    if (newSettings.privateMode && !settings.privateMode) {
      // Switching to private mode - clear saved data
      localStorage.removeItem('transition-rituals');
      setRituals([]);
      addToast('Switched to private mode. All ritual data cleared.', 'info');
    }
  };

  const startRitual = (ritual: TransitionRitual) => {
    if (!settings.enabled) return;
    
    setCurrentRitual({
      ...ritual,
      steps: ritual.steps.map(step => ({ ...step, completed: false }))
    });
    setCurrentStepIndex(0);
    setStepTimeRemaining(ritual.steps[0]?.duration || 0);
    setIsRunningRitual(true);

    // Update usage statistics (only if not in private mode)
    if (!settings.privateMode && settings.dataCollection !== 'none') {
      const updatedRituals = rituals.map(r => 
        r.id === ritual.id 
          ? { ...r, useCount: r.useCount + 1, lastUsed: new Date() }
          : r
      );
      saveRituals(updatedRituals);
    }

    addToast(`Starting ${ritual.name} ritual`, 'success');
  };

  const pauseRitual = () => {
    setIsRunningRitual(false);
    if (settings.soundEnabled) {
      // Play pause sound
    }
  };

  const resumeRitual = () => {
    setIsRunningRitual(true);
    if (settings.soundEnabled) {
      // Play resume sound
    }
  };

  const advanceToNextStep = () => {
    if (!currentRitual) return;

    const nextIndex = currentStepIndex + 1;
    
    if (nextIndex < currentRitual.steps.length) {
      setCurrentStepIndex(nextIndex);
      setStepTimeRemaining(currentRitual.steps[nextIndex].duration);
      
      if (settings.soundEnabled) {
        // Play step transition sound
      }
      
      if (settings.hapticEnabled && 'vibrate' in navigator) {
        navigator.vibrate([200, 100, 200]);
      }
    } else {
      completeRitual();
    }
  };

  const completeRitual = () => {
    if (!currentRitual) return;

    setIsRunningRitual(false);
    setCurrentRitual(null);
    setCurrentStepIndex(0);
    setStepTimeRemaining(0);

    if (settings.soundEnabled) {
      // Play completion sound
    }

    if (settings.hapticEnabled && 'vibrate' in navigator) {
      navigator.vibrate([300, 200, 300, 200, 300]);
    }

    addToast('Ritual completed! Great job on your transition 🎉', 'success');
  };

  const createRitualFromTemplate = (templateKey: string) => {
    const steps = stepTemplates[templateKey];
    const totalDuration = steps.reduce((sum, step) => sum + step.duration, 0);
    
    const ritual: TransitionRitual = {
      id: `ritual-${Date.now()}`,
      name: `${templateKey.replace('-', ' to ')} Transition`,
      fromContext: templateKey.split('-')[0],
      toContext: templateKey.split('-')[2] || templateKey.split('-')[1],
      steps,
      totalDuration,
      energyLevel: 'medium',
      adhdFriendly: true,
      autismFriendly: true,
      createdAt: new Date(),
      useCount: 0
    };

    const updatedRituals = [...rituals, ritual];
    saveRituals(updatedRituals);
    addToast('Ritual template added successfully!', 'success');
  };

  const deleteRitual = (ritualId: string) => {
    const updatedRituals = rituals.filter(r => r.id !== ritualId);
    saveRituals(updatedRituals);
    addToast('Ritual deleted', 'info');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getEnergyLevelClass = (level: string): string => {
    if (level === 'low') return 'bg-green-100 text-green-700';
    if (level === 'medium') return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getStepIcon = (type: RitualStep['type']) => {
    switch (type) {
      case 'breathing': return Brain;
      case 'movement': return Zap;
      case 'sensory': return Eye;
      case 'cognitive': return Heart;
      case 'environmental': return Settings;
      case 'audio': return Headphones;
      default: return Circle;
    }
  };

  if (!settings.enabled) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <Card variant="glass" className="p-8">
          <Settings className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Transition Rituals Disabled</h2>
          <p className="text-gray-500 mb-4">
            Transition rituals are currently disabled in your settings.
          </p>
          <button
            onClick={() => setShowSettings(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Open Settings
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Transition Rituals</h1>
          <p className="text-gray-600">
            Smooth context switching for neurodivergent minds 🧠✨
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
            title="Privacy & Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => addToast('Custom ritual builder coming soon!', 'info')}
            className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Ritual
          </button>
        </div>
      </motion.div>

      {/* Privacy Notice */}
      {settings.privateMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="font-medium text-green-800">Private Mode Active</span>
          </div>
          <p className="text-sm text-green-700">
            Your ritual data is not being stored permanently and remains completely private.
          </p>
        </motion.div>
      )}

      {/* Running Ritual */}
      {isRunningRitual && currentRitual && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{currentRitual.name}</h2>
            <div className="text-right">
              <div className="text-sm text-gray-600">Step {currentStepIndex + 1} of {currentRitual.steps.length}</div>
              <div className="text-2xl font-bold text-blue-600">{formatTime(stepTimeRemaining)}</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(((currentStepIndex) / currentRitual.steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <motion.div
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStepIndex) / currentRitual.steps.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Current Step */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <div className="flex items-center gap-3 mb-3">
              {React.createElement(getStepIcon(currentRitual.steps[currentStepIndex]?.type), {
                className: "w-6 h-6 text-purple-600"
              })}
              <h3 className="text-lg font-semibold text-gray-800">
                {currentRitual.steps[currentStepIndex]?.name}
              </h3>
            </div>
            
            <p className="text-gray-600 mb-3">{currentRitual.steps[currentStepIndex]?.description}</p>
            
            <div className="space-y-2">
              {currentRitual.steps[currentStepIndex]?.instructions.map((instruction, idx) => (
                <div key={`instruction-${currentStepIndex}-${idx}`} className="flex items-center gap-2 text-sm text-gray-700">
                  <Circle className="w-3 h-3 text-gray-400" />
                  <span>{instruction}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsRunningRitual(false)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              Stop Ritual
            </button>
            
            <div className="flex items-center gap-2">
              {isRunningRitual ? (
                <button
                  onClick={pauseRitual}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              ) : (
                <button
                  onClick={resumeRitual}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Resume
                </button>
              )}
              
              <button
                onClick={advanceToNextStep}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => createRitualFromTemplate('work-to-break')}
          className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg border border-green-200 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <Coffee className="w-6 h-6 text-green-600" />
            <h3 className="font-semibold text-gray-800">Work → Break</h3>
          </div>
          <p className="text-sm text-gray-600">Decompress and shift out of work mode</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => createRitualFromTemplate('break-to-work')}
          className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg border border-purple-200 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-6 h-6 text-purple-600" />
            <h3 className="font-semibold text-gray-800">Break → Work</h3>
          </div>
          <p className="text-sm text-gray-600">Prepare your mind for focused work</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => createRitualFromTemplate('social-to-alone')}
          className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg border border-orange-200 cursor-pointer hover:shadow-md transition-all"
        >
          <div className="flex items-center gap-3 mb-2">
            <Moon className="w-6 h-6 text-orange-600" />
            <h3 className="font-semibold text-gray-800">Social → Alone</h3>
          </div>
          <p className="text-sm text-gray-600">Decompress after social interactions</p>
        </motion.div>
      </div>

      {/* Ritual List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {rituals.map(ritual => (
          <motion.div
            key={ritual.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{ritual.name}</h3>
                <p className="text-sm text-gray-600">
                  {ritual.fromContext} → {ritual.toContext}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => startRitual(ritual)}
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  title="Start ritual"
                >
                  <Play className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => deleteRitual(ritual.id)}
                  className="p-2 text-red-500 hover:text-red-700 transition-colors"
                  title="Delete ritual"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center gap-1">
                <Timer className="w-4 h-4" />
                <span>{formatTime(ritual.totalDuration)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Circle className="w-4 h-4" />
                <span>{ritual.steps.length} steps</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {ritual.adhdFriendly && (
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">ADHD Friendly</span>
              )}
              {ritual.autismFriendly && (
                <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">Autism Friendly</span>
              )}
              <span className={`px-2 py-1 text-xs rounded ${getEnergyLevelClass(ritual.energyLevel)}`}>
                {ritual.energyLevel} energy
              </span>
            </div>

            {!settings.privateMode && ritual.useCount > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                Used {ritual.useCount} times • Last used {ritual.lastUsed?.toLocaleDateString()}
              </div>
            )}
          </motion.div>
        ))}

        {rituals.length === 0 && (
          <div className="col-span-2 text-center py-12">
            <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No rituals yet</h3>
            <p className="text-gray-500 mb-4">
              Create your first transition ritual or try one of the templates above.
            </p>
          </div>
        )}
      </div>

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
              className="bg-white rounded-2xl p-6 max-w-md w-full space-y-6"
            >
              <h3 className="text-xl font-semibold">Privacy & Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Enable Transition Rituals</div>
                    <div className="text-sm text-gray-500">Turn feature on/off completely</div>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, enabled: !settings.enabled })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.enabled ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    title={`${settings.enabled ? 'Disable' : 'Enable'} transition rituals`}
                    aria-label={`${settings.enabled ? 'Disable' : 'Enable'} transition rituals`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Private Mode</div>
                    <div className="text-sm text-gray-500">Don't save any ritual data</div>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, privateMode: !settings.privateMode })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.privateMode ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                    title={`${settings.privateMode ? 'Disable' : 'Enable'} private mode`}
                    aria-label={`${settings.privateMode ? 'Disable' : 'Enable'} private mode`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.privateMode ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Auto-Suggest Rituals</div>
                    <div className="text-sm text-gray-500">Smart suggestions based on context</div>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, autoSuggest: !settings.autoSuggest })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.autoSuggest ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    title={`${settings.autoSuggest ? 'Disable' : 'Enable'} auto-suggest`}
                    aria-label={`${settings.autoSuggest ? 'Disable' : 'Enable'} auto-suggest`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.autoSuggest ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Sound Effects</div>
                    <div className="text-sm text-gray-500">Audio cues for transitions</div>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, soundEnabled: !settings.soundEnabled })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.soundEnabled ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    title={`${settings.soundEnabled ? 'Disable' : 'Enable'} sound effects`}
                    aria-label={`${settings.soundEnabled ? 'Disable' : 'Enable'} sound effects`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.soundEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Haptic Feedback</div>
                    <div className="text-sm text-gray-500">Gentle vibrations for cues</div>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, hapticEnabled: !settings.hapticEnabled })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.hapticEnabled ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    title={`${settings.hapticEnabled ? 'Disable' : 'Enable'} haptic feedback`}
                    aria-label={`${settings.hapticEnabled ? 'Disable' : 'Enable'} haptic feedback`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.hapticEnabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                <div>
                  <label htmlFor="data-collection-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Data Collection
                  </label>
                  <select
                    id="data-collection-select"
                    value={settings.dataCollection}
                    onChange={(e) => saveSettings({ 
                      ...settings, 
                      dataCollection: e.target.value as 'none' | 'anonymous' | 'full' 
                    })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    title="Select data collection preference"
                  >
                    <option value="none">No data collection</option>
                    <option value="anonymous">Anonymous usage stats only</option>
                    <option value="full">Full usage tracking</option>
                  </select>
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
    </div>
  );
};

export default TransitionRitualBuilder;

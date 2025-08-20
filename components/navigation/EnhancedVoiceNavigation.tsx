import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic,
  MicOff,
  Settings,
  CheckCircle,
  XCircle,
  Loader2,
  Shield
} from 'lucide-react';
import { Card } from '../ui/EnhancedCards';
import { useToast } from '../../hooks/useToast';
import { useRouter } from 'next/router';

interface VoiceCommand {
  id: string;
  phrase: string;
  action: string;
  confidence: number;
  timestamp: Date;
  executed: boolean;
}

interface VoiceSettings {
  enabled: boolean;
  continuousMode: boolean;
  voiceConfirmation: boolean;
  privacyMode: boolean;
  language: string;
  sensitivity: 'low' | 'medium' | 'high';
  customCommands: boolean;
  dataRetention: 'none' | 'session' | 'persistent';
}

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface NavigationIntent {
  page: string;
  confidence: number;
  parameters?: Record<string, any>;
}

const EnhancedVoiceNavigation: React.FC = () => {
  const { addToast } = useToast();
  const router = useRouter();
  
  // Voice recognition state
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSilenceDetected, setIsSilenceDetected] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [recentCommands, setRecentCommands] = useState<VoiceCommand[]>([]);
  
  // Settings state
  const [settings, setSettings] = useState<VoiceSettings>({
    enabled: true,
    continuousMode: false,
    voiceConfirmation: true,
    privacyMode: true,
    language: 'en-US',
    sensitivity: 'medium',
    customCommands: false,
    dataRetention: 'none'
  });

  // Refs
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptRef = useRef<string>('');

  // Navigation mappings
  const navigationMap: Record<string, NavigationIntent> = {
    // Main pages
    'home': { page: '/', confidence: 0.9 },
    'dashboard': { page: '/dashboard', confidence: 0.9 },
    'calendar': { page: '/calendar', confidence: 0.9 },
    'health': { page: '/health', confidence: 0.9 },
    'profile': { page: '/profile', confidence: 0.9 },
    'settings': { page: '/settings', confidence: 0.9 },
    'explore': { page: '/explore', confidence: 0.9 },
    
    // Health related
    'mood tracker': { page: '/health', confidence: 0.8, parameters: { section: 'mood' } },
    'symptoms': { page: '/health', confidence: 0.8, parameters: { section: 'symptoms' } },
    'medication': { page: '/medical-hub', confidence: 0.8 },
    'medical hub': { page: '/medical-hub', confidence: 0.9 },
    
    // Productivity
    'focus timer': { page: '/dashboard', confidence: 0.8, parameters: { tool: 'focus' } },
    'task list': { page: '/dashboard', confidence: 0.8, parameters: { tool: 'tasks' } },
    'habits': { page: '/dashboard', confidence: 0.8, parameters: { tool: 'habits' } },
    
    // Social features
    'social decompression': { page: '/social-decompression', confidence: 0.9 },
    'resonance circles': { page: '/resonance', confidence: 0.9 },
    'impact projects': { page: '/impact-projects', confidence: 0.9 },
    
    // Entertainment
    'vision board': { page: '/vision-board', confidence: 0.9 },
    'mobile demo': { page: '/mobile-demo', confidence: 0.8 }
  };

  // Speech recognition setup
  useEffect(() => {
    if (!settings.enabled) return;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = settings.language;
      recognition.maxAlternatives = 3;
      
      recognition.onstart = () => {
        setIsListening(true);
        if (settings.voiceConfirmation) {
          addToast('Voice navigation active - speak your command', 'info');
        }
      };

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);
        transcriptRef.current = fullTranscript;

        // Reset silence timer on speech
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }

        // Set new silence timer based on sensitivity
        const getSilenceTimeout = (sensitivity: string) => {
          if (sensitivity === 'low') return 3000;
          if (sensitivity === 'medium') return 2000;
          return 1500;
        };
        const silenceTimeout = getSilenceTimeout(settings.sensitivity);
        
        silenceTimerRef.current = setTimeout(() => {
          if (finalTranscript || interimTranscript.trim().length > 10) {
            handleSilenceDetected();
          }
        }, silenceTimeout);
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        
        if (event.error === 'no-speech') {
          addToast('No speech detected. Try again.', 'info');
        } else if (event.error === 'not-allowed') {
          addToast('Microphone permission denied. Enable in browser settings.', 'error');
        } else {
          addToast('Speech recognition error. Please try again.', 'error');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
        if (settings.continuousMode && settings.enabled) {
          setTimeout(() => {
            if (settings.enabled) {
              recognition.start();
            }
          }, 1000);
        }
      };

      recognitionRef.current = recognition;
    } else {
      addToast('Speech recognition not supported in this browser', 'error');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, [settings.enabled, settings.language, settings.sensitivity, settings.continuousMode]);

  const startListening = () => {
    if (recognitionRef.current && settings.enabled) {
      setTranscript('');
      transcriptRef.current = '';
      setIsSilenceDetected(false);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
  };

  const handleSilenceDetected = () => {
    setIsSilenceDetected(true);
    setIsProcessing(true);
    
    const currentTranscript = transcriptRef.current.toLowerCase().trim();
    
    if (currentTranscript.length > 0) {
      processVoiceCommand(currentTranscript);
    }
    
    setTimeout(() => {
      stopListening();
      setIsProcessing(false);
      setIsSilenceDetected(false);
    }, 500);
  };

  const processVoiceCommand = async (transcript: string) => {
    if (!settings.enabled) return;

    const command: VoiceCommand = {
      id: `cmd-${Date.now()}`,
      phrase: transcript,
      action: 'analyzing...',
      confidence: 0,
      timestamp: new Date(),
      executed: false
    };

    // Extract navigation intent
    const intent = extractNavigationIntent(transcript);
    
    if (intent && intent.confidence > 0.6) {
      command.action = `Navigate to ${intent.page}`;
      command.confidence = intent.confidence;
      command.executed = true;

      // Execute navigation
      try {
        await router.push(intent.page);
        
        if (settings.voiceConfirmation) {
          addToast(`Navigated to ${intent.page} 🎯`, 'success');
        }
        
        // Voice feedback
        if (settings.voiceConfirmation && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(`Navigating to ${intent.page.replace('/', '').replace('-', ' ')}`);
          utterance.rate = 0.8;
          utterance.pitch = 1.1;
          speechSynthesis.speak(utterance);
        }
        
      } catch (error) {
        command.executed = false;
        console.error('Navigation error:', error);
        addToast('Navigation failed. Please try again.', 'error');
      }
    } else {
      // Try custom commands or general actions
      const customAction = processCustomCommand(transcript);
      
      if (customAction) {
        command.action = customAction.action;
        command.confidence = customAction.confidence;
        command.executed = customAction.executed;
      } else {
        command.action = 'Command not recognized';
        command.confidence = 0.1;
        addToast('Command not recognized. Try: "go to dashboard" or "open calendar"', 'info');
      }
    }

    // Store command (if privacy allows)
    if (settings.dataRetention !== 'none') {
      setRecentCommands(prev => [command, ...prev.slice(0, 9)]);
    }
  };

  const extractNavigationIntent = (transcript: string): NavigationIntent | null => {
    const text = transcript.toLowerCase();
    
    // Direct matches
    for (const [key, intent] of Object.entries(navigationMap)) {
      if (text.includes(key)) {
        return intent;
      }
    }
    
    // Fuzzy matching for common phrases
    const navPhrases = [
      { patterns: ['go to', 'navigate to', 'open', 'show me'], boost: 0.1 },
      { patterns: ['i want to', 'take me to', 'let me'], boost: 0.05 },
      { patterns: ['dashboard', 'main', 'home'], page: '/', confidence: 0.8 },
      { patterns: ['calendar', 'schedule', 'appointments'], page: '/calendar', confidence: 0.8 },
      { patterns: ['health', 'wellness', 'mood'], page: '/health', confidence: 0.7 },
      { patterns: ['profile', 'account', 'me'], page: '/profile', confidence: 0.8 }
    ];

    for (const phrase of navPhrases) {
      if (phrase.page && phrase.patterns.some(p => text.includes(p))) {
        return { page: phrase.page, confidence: phrase.confidence };
      }
    }
    
    return null;
  };

  const processCustomCommand = (transcript: string): { action: string; confidence: number; executed: boolean } | null => {
    const text = transcript.toLowerCase();
    
    // Focus/productivity commands
    if (text.includes('start focus') || text.includes('begin pomodoro')) {
      addToast('Starting focus session 🎯', 'success');
      return { action: 'Start focus session', confidence: 0.9, executed: true };
    }
    
    if (text.includes('take break') || text.includes('rest time')) {
      addToast('Time for a break! 😌', 'success');
      return { action: 'Initiate break time', confidence: 0.8, executed: true };
    }

    // Mood tracking
    if (text.includes('track mood') || text.includes('log feelings')) {
      router.push('/health?section=mood');
      addToast('Opening mood tracker 💭', 'success');
      return { action: 'Open mood tracker', confidence: 0.9, executed: true };
    }

    // Social features
    if (text.includes('decompress') || text.includes('social battery')) {
      router.push('/social-decompression');
      addToast('Opening social decompression space 🧘', 'success');
      return { action: 'Open decompression zone', confidence: 0.8, executed: true };
    }

    return null;
  };

  const saveSettings = (newSettings: VoiceSettings) => {
    setSettings(newSettings);
    if (newSettings.dataRetention === 'none' && settings.dataRetention !== 'none') {
      setRecentCommands([]);
      addToast('Voice command history cleared', 'info');
    }
    
    localStorage.setItem('voice-navigation-settings', JSON.stringify(newSettings));
  };

  // Load settings on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('voice-navigation-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  if (!settings.enabled) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Card variant="glass" className="p-4 bg-gray-50 border-gray-200">
          <div className="flex items-center gap-3">
            <MicOff className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-600">Voice navigation disabled</span>
            <button
              onClick={() => setShowSettings(true)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              title="Voice settings"
            >
              <Settings className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-3">
      {/* Privacy indicator */}
      {settings.privacyMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-100 border border-green-300 rounded-lg px-3 py-2 text-center"
        >
          <div className="flex items-center gap-2 text-sm text-green-700">
            <Shield className="w-4 h-4" />
            <span>Private Mode</span>
          </div>
        </motion.div>
      )}

      {/* Transcript Display */}
      <AnimatePresence>
        {(isListening || transcript) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-xl p-4 shadow-lg border border-gray-200 min-w-80 max-w-md"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {isListening ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Mic className="w-5 h-5 text-red-500" />
                  </motion.div>
                ) : (
                  <MicOff className="w-5 h-5 text-gray-400" />
                )}
                <span className="text-sm font-medium text-gray-700">
                  {isListening ? 'Listening...' : 'Voice Navigation'}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                {isProcessing && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                {isSilenceDetected && <CheckCircle className="w-4 h-4 text-green-500" />}
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Voice settings"
                >
                  <Settings className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {transcript && (
              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="text-sm text-gray-700 italic">"{transcript}"</p>
              </div>
            )}

            {isListening && (
              <div className="text-xs text-gray-500 mb-2">
                💡 Say commands like "go to dashboard" or "open calendar"
              </div>
            )}

            <div className="text-xs text-gray-400 text-center">
              {isListening ? 'Stop talking when you\'re done - "bitch don\'t kill my vibe" 😊' : 
               'Voice commands help you navigate hands-free'}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Control Button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex justify-end"
      >
        <button
          onClick={isListening ? stopListening : startListening}
          className={`relative p-4 rounded-full shadow-lg border-2 transition-all ${
            isListening 
              ? 'bg-red-500 text-white border-red-400 shadow-red-200' 
              : 'bg-blue-500 text-white border-blue-400 shadow-blue-200 hover:bg-blue-600'
          }`}
          title={isListening ? 'Stop listening' : 'Start voice navigation'}
        >
          {isListening ? (
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Mic className="w-6 h-6" />
            </motion.div>
          ) : (
            <MicOff className="w-6 h-6" />
          )}

          {isListening && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-red-300"
              animate={{ scale: [1, 1.5], opacity: [0.7, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </button>
      </motion.div>

      {/* Recent Commands (if enabled) */}
      <AnimatePresence>
        {settings.dataRetention !== 'none' && recentCommands.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white rounded-lg shadow-lg border border-gray-200 p-3 max-w-md"
          >
            <h3 className="text-xs font-medium text-gray-600 mb-2">Recent Commands</h3>
            <div className="space-y-1">
              {recentCommands.slice(0, 3).map(command => (
                <div key={command.id} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600 truncate flex-1 mr-2">"{command.phrase}"</span>
                  <div className="flex items-center gap-1">
                    {command.executed ? (
                      <CheckCircle className="w-3 h-3 text-green-500" />
                    ) : (
                      <XCircle className="w-3 h-3 text-red-500" />
                    )}
                    <span className="text-gray-400">{Math.round(command.confidence * 100)}%</span>
                  </div>
                </div>
              ))}
            </div>
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
              <h3 className="text-xl font-semibold">Voice Navigation Settings</h3>
              
              <div className="space-y-4">
                {/* Enable/Disable */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Voice Navigation</div>
                    <div className="text-sm text-gray-500">Enable voice commands</div>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, enabled: !settings.enabled })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.enabled ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    title={`${settings.enabled ? 'Disable' : 'Enable'} voice navigation`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.enabled ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Privacy Mode */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Privacy Mode</div>
                    <div className="text-sm text-gray-500">No data stored or transmitted</div>
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

                {/* Voice Confirmation */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-700">Voice Confirmation</div>
                    <div className="text-sm text-gray-500">Speak action confirmations</div>
                  </div>
                  <button
                    onClick={() => saveSettings({ ...settings, voiceConfirmation: !settings.voiceConfirmation })}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      settings.voiceConfirmation ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                    title={`${settings.voiceConfirmation ? 'Disable' : 'Enable'} voice confirmation`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      settings.voiceConfirmation ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>

                {/* Sensitivity */}
                <div>
                  <label htmlFor="sensitivity-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Speech Sensitivity
                  </label>
                  <select
                    id="sensitivity-select"
                    value={settings.sensitivity}
                    onChange={(e) => saveSettings({ 
                      ...settings, 
                      sensitivity: e.target.value as 'low' | 'medium' | 'high'
                    })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    title="Select speech recognition sensitivity"
                  >
                    <option value="low">Low (3s silence timeout)</option>
                    <option value="medium">Medium (2s silence timeout)</option>
                    <option value="high">High (1.5s silence timeout)</option>
                  </select>
                </div>

                {/* Data Retention */}
                <div>
                  <label htmlFor="retention-select" className="block text-sm font-medium text-gray-700 mb-2">
                    Command History
                  </label>
                  <select
                    id="retention-select"
                    value={settings.dataRetention}
                    onChange={(e) => saveSettings({ 
                      ...settings, 
                      dataRetention: e.target.value as 'none' | 'session' | 'persistent'
                    })}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    title="Select command history retention preference"
                  >
                    <option value="none">No command history</option>
                    <option value="session">Session only</option>
                    <option value="persistent">Remember between visits</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 text-sm text-gray-600">
                <p className="mb-2"><strong>Example Commands:</strong></p>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  <span>• "Go to dashboard"</span>
                  <span>• "Open calendar"</span>
                  <span>• "Track my mood"</span>
                  <span>• "Start focus session"</span>
                  <span>• "Social decompression"</span>
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

export default EnhancedVoiceNavigation;

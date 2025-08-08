import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mic, 
  MicOff, 
  Heart, 
  Battery, 
  Brain, 
  Wind, 
  Zap,
  MessageSquare,
  Save,
  Trash2,
  Calendar,
  Timer
} from 'lucide-react';
import { Card } from '../ui/EnhancedCards';
import { useToast } from '../../hooks/useToast';

interface SocialDecompressionProps {
  onSave?: (entry: SocialDecompressionEntry) => void;
  theme?: 'light' | 'dark';
}

interface SocialDecompressionEntry {
  id: string;
  timestamp: Date;
  socialEvent: string;
  energyBefore: number;
  energyAfter: number;
  voiceNotes: string[];
  copingStrategies: string[];
  aiInsights?: string;
  followUpReminders?: string[];
}

interface SpeechToTextState {
  isListening: boolean;
  isProcessing: boolean;
  transcript: string;
  micButtonPressed: boolean;
  hasFinishedSpeaking: boolean;
}

// Extend Window interface for speech recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const SocialDecompressionZone: React.FC<SocialDecompressionProps> = ({ 
  onSave, 
  theme = 'light' 
}) => {
  const { addToast } = useToast();
  const [energyBefore, setEnergyBefore] = useState(5);
  const [energyAfter, setEnergyAfter] = useState(5);
  const [socialEvent, setSocialEvent] = useState('');
  const [selectedCoping, setSelectedCoping] = useState<string[]>([]);
  const [voiceEntries, setVoiceEntries] = useState<string[]>([]);
  
  // Enhanced Speech-to-Text State
  const [speechState, setSpeechState] = useState<SpeechToTextState>({
    isListening: false,
    isProcessing: false,
    transcript: '',
    micButtonPressed: false,
    hasFinishedSpeaking: false
  });

  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const processingTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';
          let interimTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript;
            } else {
              interimTranscript += transcript;
            }
          }

          setSpeechState(prev => ({
            ...prev,
            transcript: prev.transcript + finalTranscript + interimTranscript
          }));

          // Reset silence timer on new speech
          if (silenceTimerRef.current) {
            clearTimeout(silenceTimerRef.current);
          }

          // Set silence timer - if no speech for 3 seconds, consider finished
          silenceTimerRef.current = setTimeout(() => {
            if (speechState.micButtonPressed && !speechState.hasFinishedSpeaking) {
              handleSpeechComplete();
            }
          }, 3000);
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          addToast('Speech recognition error. Please try again.', 'error');
          resetSpeechState();
        };
      }
    }
  }, []);

  const copingStrategies = [
    { id: 'breathing', label: '🫁 Deep Breathing', duration: '2 min' },
    { id: 'grounding', label: '🌱 5-4-3-2-1 Grounding', duration: '3 min' },
    { id: 'affirmations', label: '💪 Positive Affirmations', duration: '1 min' },
    { id: 'movement', label: '🚶 Gentle Movement', duration: '5 min' },
    { id: 'music', label: '🎵 Calming Playlist', duration: '10 min' },
    { id: 'journaling', label: '📝 Stream Writing', duration: '5 min' },
    { id: 'shower', label: '🚿 Sensory Reset', duration: '15 min' },
    { id: 'nature', label: '🌿 Nature Sounds', duration: '10 min' }
  ];

  const resetSpeechState = () => {
    setSpeechState({
      isListening: false,
      isProcessing: false,
      transcript: '',
      micButtonPressed: false,
      hasFinishedSpeaking: false
    });

    if (silenceTimerRef.current) {
      clearTimeout(silenceTimerRef.current);
    }
    if (processingTimerRef.current) {
      clearTimeout(processingTimerRef.current);
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) {
      addToast('Speech recognition not supported in this browser', 'error');
      return;
    }

    setSpeechState(prev => ({
      ...prev,
      isListening: true,
      micButtonPressed: true,
      transcript: '',
      hasFinishedSpeaking: false
    }));

    try {
      recognitionRef.current.start();
      addToast('🎤 Listening... Take your time, speak freely!', 'info');
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      resetSpeechState();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && speechState.isListening) {
      recognitionRef.current.stop();
      
      setSpeechState(prev => ({
        ...prev,
        micButtonPressed: false
      }));

      // Wait a moment for any final speech, then process
      processingTimerRef.current = setTimeout(() => {
        handleSpeechComplete();
      }, 1000);

      addToast('🔄 Processing your thoughts...', 'info');
    }
  };

  const handleSpeechComplete = async () => {
    setSpeechState(prev => ({
      ...prev,
      isListening: false,
      isProcessing: true,
      hasFinishedSpeaking: true
    }));

    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (speechState.transcript.trim()) {
      // Here you would call your AI service to process the transcript
      const processedText = await processVoiceWithAI(speechState.transcript);
      
      setVoiceEntries(prev => [...prev, processedText]);
      addToast('✨ Voice entry processed and organized!', 'success');
    }

    resetSpeechState();
  };

  // Mock AI processing function - replace with actual AI service
  const processVoiceWithAI = async (transcript: string): Promise<string> => {
    // This would connect to your AI service to clean up and organize the rambling
    return `Processed: ${transcript.trim()}`;
  };

  const handleCopingToggle = (strategyId: string) => {
    setSelectedCoping(prev => 
      prev.includes(strategyId)
        ? prev.filter(id => id !== strategyId)
        : [...prev, strategyId]
    );
  };

  const handleVoiceEntryRemove = (indexToRemove: number) => {
    setVoiceEntries(prev => prev.filter((_, i) => i !== indexToRemove));
  };

  const getBatteryColor = (value: number): string => {
    if (value <= 3) return 'text-red-500';
    if (value <= 6) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getMicButtonStyle = (): string => {
    if (speechState.isListening) return 'bg-red-500 animate-pulse shadow-lg shadow-red-500/30';
    if (speechState.isProcessing) return 'bg-yellow-500 animate-spin';
    return 'bg-sage-600 hover:bg-sage-700 shadow-lg';
  };

  const getMicIcon = () => {
    if (speechState.isProcessing) return <Timer className="w-8 h-8 animate-spin" />;
    if (speechState.isListening) return <MicOff className="w-8 h-8" />;
    return <Mic className="w-8 h-8" />;
  };

  const getMicStatusText = (): string => {
    if (speechState.isListening) return "Listening... Click to stop when you're done";
    if (speechState.isProcessing) return "Processing your thoughts...";
    return "Click to start voice dump";
  };

  const handleSave = () => {
    const entry: SocialDecompressionEntry = {
      id: Date.now().toString(),
      timestamp: new Date(),
      socialEvent,
      energyBefore,
      energyAfter,
      voiceNotes: voiceEntries,
      copingStrategies: selectedCoping,
      aiInsights: 'AI insights would be generated here based on patterns',
      followUpReminders: ['Check in tomorrow', 'Practice grounding technique']
    };

    onSave?.(entry);
    addToast('Social recovery session saved! 💜', 'success');
    
    // Reset form
    setSocialEvent('');
    setEnergyBefore(5);
    setEnergyAfter(5);
    setSelectedCoping([]);
    setVoiceEntries([]);
  };

  const EnergySlider = ({ 
    value, 
    onChange, 
    label, 
    color = 'sage' 
  }: { 
    value: number; 
    onChange: (value: number) => void; 
    label: string;
    color?: string;
  }) => (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center gap-2">
          <Battery className={`w-4 h-4 ${getBatteryColor(value)}`} />
          <span className="text-lg font-bold">{value}/10</span>
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min="1"
          max="10"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className={`w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-${color}`}
          title={`${label}: ${value}/10`}
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Drained</span>
          <span>Neutral</span>
          <span>Energized</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Social Decompression Zone
        </h1>
        <p className="text-gray-600">
          Safe space to process social interactions and recharge your energy
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Energy Assessment */}
        <Card variant="glass" className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-yellow-500" />
            <h2 className="text-xl font-semibold">Energy Assessment</h2>
          </div>

          <EnergySlider
            value={energyBefore}
            onChange={setEnergyBefore}
            label="Energy Before Social Event"
            color="blue"
          />

          <EnergySlider
            value={energyAfter}
            onChange={setEnergyAfter}
            label="Energy After Social Event"
            color="purple"
          />

          <div className="space-y-3">
            <label htmlFor="social-event-input" className="text-sm font-medium text-gray-700">
              What was the social event?
            </label>
            <input
              id="social-event-input"
              type="text"
              value={socialEvent}
              onChange={(e) => setSocialEvent(e.target.value)}
              placeholder="e.g., Work meeting, family dinner, friend hangout..."
              title="Describe the social event you want to process"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
            />
          </div>
        </Card>

        {/* Voice Processing */}
        <Card variant="glass" className="space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-500" />
            <h2 className="text-xl font-semibold">Voice Dump & Process</h2>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Say everything on your mind. AI will organize your thoughts after you're done.
            </p>

            <motion.button
              onClick={speechState.isListening ? stopListening : startListening}
              disabled={speechState.isProcessing}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold transition-all duration-300 ${getMicButtonStyle()}`}
            >
              {getMicIcon()}
            </motion.button>

            <p className="text-xs text-gray-500">
              {getMicStatusText()}
            </p>

            {speechState.transcript && (
              <div className="bg-gray-50 p-3 rounded-lg text-left">
                <p className="text-sm text-gray-700">{speechState.transcript}</p>
              </div>
            )}
          </div>

          {voiceEntries.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Processed Thoughts:</h3>
              {voiceEntries.map((entry, index) => (
                <motion.div
                  key={`voice-entry-${Date.now()}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-sage-50 p-3 rounded-lg border-l-4 border-sage-500"
                >
                  <p className="text-sm text-gray-700">{entry}</p>
                  <button
                    onClick={() => handleVoiceEntryRemove(index)}
                    className="text-red-500 hover:text-red-700 text-xs mt-2 flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Remove
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Coping Strategies */}
      <Card variant="glass" className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Heart className="w-6 h-6 text-pink-500" />
          <h2 className="text-xl font-semibold">Recovery Strategies</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {copingStrategies.map((strategy) => (
            <motion.button
              key={strategy.id}
              onClick={() => handleCopingToggle(strategy.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                p-4 rounded-xl border-2 transition-all text-left
                ${selectedCoping.includes(strategy.id)
                  ? 'border-sage-500 bg-sage-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-sage-300'
                }
              `}
            >
              <div className="font-medium text-sm mb-1">{strategy.label}</div>
              <div className="text-xs text-gray-500">{strategy.duration}</div>
            </motion.button>
          ))}
        </div>

        {selectedCoping.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 p-4 rounded-lg border border-green-200"
          >
            <p className="text-sm text-green-700 font-medium mb-2">
              Recovery Plan Ready! 🌟
            </p>
            <p className="text-xs text-green-600">
              Estimated total time: {selectedCoping.length * 5} minutes
            </p>
          </motion.div>
        )}
      </Card>

      {/* Save Button */}
      <motion.button
        onClick={handleSave}
        disabled={!socialEvent || voiceEntries.length === 0}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-sage-600 to-sage-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        <Save className="w-5 h-5" />
        Save Recovery Session
      </motion.button>
    </div>
  );
};

export default SocialDecompressionZone;

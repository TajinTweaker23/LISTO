import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Vibrate,
  Zap,
  Hand,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Square,
  Circle,
  Settings,
  Trash2,
  Heart,
  Focus,
  MessageSquare,
  Calendar,
  CheckSquare,
  X
} from 'lucide-react';

interface VoiceNote {
  id: string;
  title: string;
  duration: number; // in seconds
  timestamp: Date;
  transcription?: string;
  category: 'quick-note' | 'reminder' | 'idea' | 'journal' | 'instruction';
  audioBlob?: Blob;
  isPlaying: boolean;
  tags: string[];
}

interface GesturePattern {
  id: string;
  name: string;
  direction: 'up' | 'down' | 'left' | 'right' | 'tap' | 'long-press' | 'double-tap';
  action: string;
  enabled: boolean;
  sensitivity: number; // 1-10
  customAction?: () => void;
}

interface HapticSettings {
  enabled: boolean;
  intensity: number; // 1-10
  patterns: {
    notification: number[];
    success: number[];
    error: number[];
    warning: number[];
    focus: number[];
  };
  contextualFeedback: boolean;
  gestureConfirmation: boolean;
}

interface MobileOptimizationSettings {
  oneHandedMode: boolean;
  largeTargets: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
  speechRecognition: boolean;
  gestureNavigation: boolean;
  quickActions: boolean;
  voiceCommands: boolean;
  adaptiveUI: boolean;
  emergencyMode: boolean;
}

const EnhancedMobileOptimization: React.FC = () => {
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [gestures, setGestures] = useState<GesturePattern[]>([]);
  const [hapticSettings, setHapticSettings] = useState<HapticSettings>({
    enabled: true,
    intensity: 7,
    patterns: {
      notification: [100, 50, 100],
      success: [200],
      error: [100, 100, 100],
      warning: [300, 100, 300],
      focus: [50, 50, 50, 50]
    },
    contextualFeedback: true,
    gestureConfirmation: true
  });
  const [mobileSettings, setMobileSettings] = useState<MobileOptimizationSettings>({
    oneHandedMode: false,
    largeTargets: true,
    reducedMotion: false,
    highContrast: false,
    speechRecognition: true,
    gestureNavigation: true,
    quickActions: true,
    voiceCommands: true,
    adaptiveUI: true,
    emergencyMode: false
  });

  const [activeTab, setActiveTab] = useState<'voice' | 'gestures' | 'haptic' | 'settings'>('voice');
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcriptionText, setTranscriptionText] = useState('');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    loadVoiceNotes();
    loadGesturePatterns();
    loadMobileSettings();
    initializeSpeechRecognition();
    setupGestureListeners();
    
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const loadVoiceNotes = () => {
    const saved = JSON.parse(localStorage.getItem('voice-notes') || '[]');
    const notes = saved.map((note: any) => ({
      ...note,
      timestamp: new Date(note.timestamp),
      isPlaying: false
    }));
    setVoiceNotes(notes);
  };

  const loadGesturePatterns = () => {
    const defaultGestures: GesturePattern[] = [
      {
        id: 'swipe-up',
        name: 'Swipe Up',
        direction: 'up',
        action: 'Quick Actions',
        enabled: true,
        sensitivity: 7
      },
      {
        id: 'swipe-down',
        name: 'Swipe Down',
        direction: 'down',
        action: 'Close/Back',
        enabled: true,
        sensitivity: 7
      },
      {
        id: 'swipe-left',
        name: 'Swipe Left',
        direction: 'left',
        action: 'Previous Item',
        enabled: true,
        sensitivity: 6
      },
      {
        id: 'swipe-right',
        name: 'Swipe Right',
        direction: 'right',
        action: 'Next Item',
        enabled: true,
        sensitivity: 6
      },
      {
        id: 'double-tap',
        name: 'Double Tap',
        direction: 'double-tap',
        action: 'Focus Mode',
        enabled: true,
        sensitivity: 8
      },
      {
        id: 'long-press',
        name: 'Long Press',
        direction: 'long-press',
        action: 'Context Menu',
        enabled: true,
        sensitivity: 5
      }
    ];

    const saved = JSON.parse(localStorage.getItem('gesture-patterns') || 'null');
    setGestures(saved || defaultGestures);
  };

  const loadMobileSettings = () => {
    const saved = JSON.parse(localStorage.getItem('mobile-settings') || 'null');
    if (saved) {
      setMobileSettings(saved);
    }
  };

  const initializeSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
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

          setTranscriptionText(finalTranscript + interimTranscript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
      }
    }
  };

  const setupGestureListeners = () => {
    // This would set up touch event listeners for gesture recognition
    // In a real implementation, you'd use libraries like react-spring or custom touch handlers
  };

  const triggerHapticFeedback = (pattern: keyof HapticSettings['patterns']) => {
    if (!hapticSettings.enabled || !navigator.vibrate) return;
    
    const vibrationPattern = hapticSettings.patterns[pattern].map(
      duration => duration * (hapticSettings.intensity / 10)
    );
    
    navigator.vibrate(vibrationPattern);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        saveVoiceNote(audioBlob);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingDuration(0);
      triggerHapticFeedback('focus');

      // Start timer
      recordingTimerRef.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      triggerHapticFeedback('error');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
      }

      // Stop all tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      triggerHapticFeedback('success');
    }
  };

  const saveVoiceNote = (audioBlob: Blob) => {
    const note: VoiceNote = {
      id: `voice-${Date.now()}`,
      title: `Voice Note ${new Date().toLocaleTimeString()}`,
      duration: recordingDuration,
      timestamp: new Date(),
      transcription: transcriptionText || undefined,
      category: 'quick-note',
      audioBlob,
      isPlaying: false,
      tags: []
    };

    const updateNotesAndSave = (notes: VoiceNote[]) => {
      setVoiceNotes(notes);
      localStorage.setItem('voice-notes', JSON.stringify(
        notes.map(n => ({ ...n, audioBlob: undefined }))
      ));
    };

    const updated = [...voiceNotes, note];
    updateNotesAndSave(updated);
    setTranscriptionText('');
  };

  const playVoiceNote = (note: VoiceNote) => {
    if (!note.audioBlob) return;

    const audio = new Audio(URL.createObjectURL(note.audioBlob));
    audio.play();
    
    const updatePlayingState = (noteId: string, isPlaying: boolean) => {
      setVoiceNotes(prev => prev.map(n => ({
        ...n,
        isPlaying: n.id === noteId ? isPlaying : false
      })));
    };

    updatePlayingState(note.id, true);

    audio.onended = () => {
      updatePlayingState(note.id, false);
    };

    triggerHapticFeedback('notification');
  };

  const deleteVoiceNote = (noteId: string) => {
    const updated = voiceNotes.filter(n => n.id !== noteId);
    setVoiceNotes(updated);
    localStorage.setItem('voice-notes', JSON.stringify(updated));
    triggerHapticFeedback('warning');
  };

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
      triggerHapticFeedback('focus');
    }
  };

  const updateGesture = (gestureId: string, updates: Partial<GesturePattern>) => {
    setGestures(prev => prev.map(g => 
      g.id === gestureId ? { ...g, ...updates } : g
    ));
    localStorage.setItem('gesture-patterns', JSON.stringify(gestures));
  };

  const updateHapticSettings = (updates: Partial<HapticSettings>) => {
    const newSettings = { ...hapticSettings, ...updates };
    setHapticSettings(newSettings);
    localStorage.setItem('haptic-settings', JSON.stringify(newSettings));
  };

  const updateMobileSettings = (updates: Partial<MobileOptimizationSettings>) => {
    const newSettings = { ...mobileSettings, ...updates };
    setMobileSettings(newSettings);
    localStorage.setItem('mobile-settings', JSON.stringify(newSettings));
  };

  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGestureIcon = (direction: string) => {
    switch (direction) {
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      case 'left': return ArrowLeft;
      case 'right': return ArrowRight;
      case 'tap': return Circle;
      case 'double-tap': return Circle;
      case 'long-press': return Square;
      default: return Hand;
    }
  };

  const quickActions = [
    { id: 'voice-note', icon: Mic, label: 'Voice Note', action: startRecording },
    { id: 'focus-mode', icon: Focus, label: 'Focus Mode', action: () => {} },
    { id: 'quick-journal', icon: MessageSquare, label: 'Quick Journal', action: () => {} },
    { id: 'add-reminder', icon: Calendar, label: 'Add Reminder', action: () => {} },
    { id: 'check-task', icon: CheckSquare, label: 'Complete Task', action: () => {} },
    { id: 'emergency', icon: Heart, label: 'Emergency Mode', action: () => {} }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center gap-3 mb-4">
          <Smartphone className="w-8 h-8 text-green-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Enhanced Mobile Experience</h1>
            <p className="text-gray-600">Optimized for one-handed use with voice, gesture, and haptic support</p>
          </div>
        </div>

        {/* Mobile-specific indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/70 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Hand className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">One-Handed</span>
            </div>
            <div className="text-lg font-semibold text-green-700">
              {mobileSettings.oneHandedMode ? 'Active' : 'Inactive'}
            </div>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Vibrate className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">Haptic</span>
            </div>
            <div className="text-lg font-semibold text-blue-700">
              {hapticSettings.enabled ? 'On' : 'Off'}
            </div>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Mic className="w-4 h-4 text-purple-600" />
              <span className="text-sm text-gray-600">Voice Notes</span>
            </div>
            <div className="text-lg font-semibold text-purple-700">
              {voiceNotes.length}
            </div>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-orange-600" />
              <span className="text-sm text-gray-600">Gestures</span>
            </div>
            <div className="text-lg font-semibold text-orange-700">
              {gestures.filter(g => g.enabled).length}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="flex overflow-x-auto bg-white rounded-lg p-2 shadow-sm">
        {[
          { id: 'voice', label: 'Voice Notes', icon: Mic },
          { id: 'gestures', label: 'Gestures', icon: Hand },
          { id: 'haptic', label: 'Haptic', icon: Vibrate },
          { id: 'settings', label: 'Mobile Settings', icon: Settings }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
              activeTab === id
                ? 'bg-green-100 text-green-700'
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
        {activeTab === 'voice' && (
          <motion.div
            key="voice"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {/* Voice Recording Controls */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Voice Recording</h3>
              
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                      isRecording 
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                        : 'bg-green-500 hover:bg-green-600'
                    }`}
                    onTouchStart={() => triggerHapticFeedback('notification')}
                  >
                    {isRecording ? (
                      <Square className="w-8 h-8 text-white" />
                    ) : (
                      <Mic className="w-8 h-8 text-white" />
                    )}
                  </button>
                  
                  {isRecording && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {formatDuration(recordingDuration)}
                    </div>
                  )}
                </div>

                <div className="text-center">
                  <p className="text-gray-600">
                    {isRecording ? 'Recording...' : 'Tap to start recording'}
                  </p>
                  {isRecording && recordingDuration > 0 && (
                    <p className="text-sm text-gray-500 mt-1">
                      Duration: {formatDuration(recordingDuration)}
                    </p>
                  )}
                </div>

                {/* Speech Recognition Toggle */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={toggleSpeechRecognition}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isListening
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    {isListening ? 'Stop Listening' : 'Speech Recognition'}
                  </button>
                </div>

                {/* Live Transcription */}
                {transcriptionText && (
                  <div className="w-full p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-700">{transcriptionText}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Voice Notes List */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Voice Notes</h3>
              
              {voiceNotes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Mic className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No voice notes yet</p>
                  <p className="text-sm">Start recording to create your first note</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {voiceNotes.slice(-5).map((note) => (
                    <motion.div
                      key={note.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => playVoiceNote(note)}
                          className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                          onTouchStart={() => triggerHapticFeedback('notification')}
                        >
                          {note.isPlaying ? (
                            <Pause className="w-4 h-4" />
                          ) : (
                            <Play className="w-4 h-4" />
                          )}
                        </button>
                        <div>
                          <div className="font-medium text-gray-800">{note.title}</div>
                          <div className="text-sm text-gray-600">
                            {formatDuration(note.duration)} • {note.timestamp.toLocaleDateString()}
                          </div>
                          {note.transcription && (
                            <div className="text-xs text-gray-500 mt-1 max-w-60 truncate">
                              "{note.transcription}"
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteVoiceNote(note.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onTouchStart={() => triggerHapticFeedback('warning')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'gestures' && (
          <motion.div
            key="gestures"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Gesture Controls</h3>
            
            <div className="space-y-4">
              {gestures.map((gesture) => {
                const IconComponent = getGestureIcon(gesture.direction);
                return (
                  <div key={gesture.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-6 h-6 text-gray-600" />
                      <div>
                        <div className="font-medium text-gray-800">{gesture.name}</div>
                        <div className="text-sm text-gray-600">{gesture.action}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-500">
                        Sensitivity: {gesture.sensitivity}/10
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={gesture.enabled}
                          onChange={(e) => updateGesture(gesture.id, { enabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="fixed bottom-4 right-4 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm">
              Gesture controls are available
            </div>
          </motion.div>
        )}

        {activeTab === 'haptic' && (
          <motion.div
            key="haptic"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Haptic Feedback</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-800">Enable Haptic Feedback</div>
                  <div className="text-sm text-gray-600">Vibration feedback for interactions</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <span className="sr-only">Enable Haptic Feedback</span>
                  <input
                    type="checkbox"
                    checked={hapticSettings.enabled}
                    onChange={(e) => updateHapticSettings({ enabled: e.target.checked })}
                    className="sr-only peer"
                    title="Enable haptic feedback"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div>
                <label htmlFor="haptic-intensity" className="block text-sm font-medium text-gray-700 mb-2">
                  Intensity: {hapticSettings.intensity}/10
                </label>
                <input
                  id="haptic-intensity"
                  type="range"
                  min="1"
                  max="10"
                  value={hapticSettings.intensity}
                  onChange={(e) => updateHapticSettings({ intensity: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-800">Test Haptic Patterns</h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(hapticSettings.patterns).map((pattern) => (
                    <button
                      key={pattern}
                      onClick={() => triggerHapticFeedback(pattern as keyof HapticSettings['patterns'])}
                      className="p-3 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors capitalize"
                      disabled={!hapticSettings.enabled}
                    >
                      {pattern}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            key="settings"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Mobile Optimization Settings</h3>
            
            <div className="space-y-4">
              {[
                { key: 'oneHandedMode', label: 'One-Handed Mode', description: 'Optimize UI for single-hand use' },
                { key: 'largeTargets', label: 'Large Touch Targets', description: 'Increase button and link sizes' },
                { key: 'reducedMotion', label: 'Reduced Motion', description: 'Minimize animations for sensitivity' },
                { key: 'highContrast', label: 'High Contrast', description: 'Enhanced visibility in bright light' },
                { key: 'speechRecognition', label: 'Speech Recognition', description: 'Voice-to-text input' },
                { key: 'gestureNavigation', label: 'Gesture Navigation', description: 'Swipe gestures for navigation' },
                { key: 'quickActions', label: 'Quick Actions', description: 'Fast access to common features' },
                { key: 'voiceCommands', label: 'Voice Commands', description: 'Control app with voice' },
                { key: 'adaptiveUI', label: 'Adaptive UI', description: 'Interface adapts to usage patterns' },
                { key: 'emergencyMode', label: 'Emergency Mode', description: 'Simplified interface for urgent situations' }
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
                      checked={mobileSettings[key as keyof MobileOptimizationSettings] as boolean}
                      onChange={(e) => updateMobileSettings({ [key]: e.target.checked })}
                      className="sr-only peer"
                      title={`Toggle ${label}`}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions Overlay */}
      <AnimatePresence>
        {showQuickActions && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="fixed bottom-4 left-4 right-4 bg-white rounded-xl p-4 shadow-2xl z-50 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Quick Actions</h3>
              <button
                onClick={() => setShowQuickActions(false)}
                className="p-2 text-gray-400 hover:text-gray-600"
                title="Close quick actions"
                aria-label="Close quick actions"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {quickActions.map(({ id, icon: Icon, label, action }) => (
                <button
                  key={id}
                  onClick={() => {
                    action();
                    triggerHapticFeedback('notification');
                    setShowQuickActions(false);
                  }}
                  className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Icon className="w-6 h-6 text-gray-600" />
                  <span className="text-xs text-gray-700">{label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedMobileOptimization;

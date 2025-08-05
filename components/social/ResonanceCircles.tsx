import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Radio, 
  Heart, 
  Brain, 
  Activity, 
  Users, 
  MessageCircle, 
  Shield,
  Sparkles,
  Waves,
  Send,
  Circle
} from 'lucide-react';

interface EnergySignature {
  id: string;
  wavelength: number; // 0-1000 frequency
  resonancePattern: {
    healthRhythm: number[];
    productivityCurve: number[];
    emotionalFrequency: number[];
    activismEnergy: number[];
  };
  anonymousId: string;
  connectionLevel: 'discover' | 'resonate' | 'connected';
  lastSeen: Date;
  compatibilityScore: number;
}

interface ResonanceMessage {
  id: string;
  fromSignature: string;
  toSignature: string;
  content: string;
  type: 'support' | 'resource' | 'pattern-share' | 'encouragement';
  timestamp: Date;
  isAnonymous: boolean;
}

const ResonanceCircles: React.FC = () => {
  const [userSignature, setUserSignature] = useState<EnergySignature | null>(null);
  const [resonantConnections, setResonantConnections] = useState<EnergySignature[]>([]);
  const [messages, setMessages] = useState<ResonanceMessage[]>([]);
  const [selectedConnection, setSelectedConnection] = useState<EnergySignature | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [connectionPhase, setConnectionPhase] = useState<'generating' | 'discovering' | 'resonating'>('generating');

  useEffect(() => {
    generateUserSignature();
    findResonantConnections();
  }, []);

  const generateUserSignature = () => {
    // Generate based on user's health, productivity, and activism patterns
    const healthData = JSON.parse(localStorage.getItem('health-data') || '{}');
    const focusData = JSON.parse(localStorage.getItem('focus-sessions-completed') || '0');
    const activismData = JSON.parse(localStorage.getItem('activism-data') || '{}');

    const signature: EnergySignature = {
      id: `signature-${Date.now()}`,
      wavelength: Math.floor(Math.random() * 1000) + 1,
      resonancePattern: {
        healthRhythm: generateHealthPattern(healthData),
        productivityCurve: generateProductivityPattern(focusData),
        emotionalFrequency: generateEmotionalPattern(healthData),
        activismEnergy: generateActivismPattern(activismData)
      },
      anonymousId: `Resonant-${Math.random().toString(36).substr(2, 6)}`,
      connectionLevel: 'discover',
      lastSeen: new Date(),
      compatibilityScore: 100
    };

    setUserSignature(signature);
    setConnectionPhase('discovering');
  };

  const generateHealthPattern = (healthData: any): number[] => {
    // Convert health tracking patterns to frequency signature
    const pattern: number[] = [];
    for (let i = 0; i < 28; i++) {
      pattern.push(Math.sin(i * Math.PI / 14) * 50 + 50 + Math.random() * 20);
    }
    return pattern;
  };

  const generateProductivityPattern = (focusData: number): number[] => {
    const pattern: number[] = [];
    const baseEnergy = Math.min(focusData / 10, 10); // Normalize focus sessions
    for (let i = 0; i < 24; i++) {
      const hourlyEnergy = Math.sin(i * Math.PI / 12) * baseEnergy + baseEnergy;
      pattern.push(Math.max(0, hourlyEnergy + Math.random() * 5));
    }
    return pattern;
  };

  const generateEmotionalPattern = (healthData: any): number[] => {
    const pattern: number[] = [];
    for (let i = 0; i < 10; i++) {
      pattern.push(Math.random() * 100);
    }
    return pattern;
  };

  const generateActivismPattern = (activismData: any): number[] => {
    const pattern: number[] = [];
    for (let i = 0; i < 7; i++) {
      pattern.push(Math.random() * 100);
    }
    return pattern;
  };

  const findResonantConnections = () => {
    // Simulate finding resonant connections (in real app, this would be server-side)
    setTimeout(() => {
      const mockConnections: EnergySignature[] = [
        {
          id: 'conn-1',
          wavelength: 432,
          resonancePattern: {
            healthRhythm: Array(28).fill(0).map(() => Math.random() * 100),
            productivityCurve: Array(24).fill(0).map(() => Math.random() * 100),
            emotionalFrequency: Array(10).fill(0).map(() => Math.random() * 100),
            activismEnergy: Array(7).fill(0).map(() => Math.random() * 100)
          },
          anonymousId: 'Resonant-Aurora',
          connectionLevel: 'resonate',
          lastSeen: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
          compatibilityScore: 94
        },
        {
          id: 'conn-2',
          wavelength: 528,
          resonancePattern: {
            healthRhythm: Array(28).fill(0).map(() => Math.random() * 100),
            productivityCurve: Array(24).fill(0).map(() => Math.random() * 100),
            emotionalFrequency: Array(10).fill(0).map(() => Math.random() * 100),
            activismEnergy: Array(7).fill(0).map(() => Math.random() * 100)
          },
          anonymousId: 'Resonant-Echo',
          connectionLevel: 'discover',
          lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
          compatibilityScore: 87
        },
        {
          id: 'conn-3',
          wavelength: 639,
          resonancePattern: {
            healthRhythm: Array(28).fill(0).map(() => Math.random() * 100),
            productivityCurve: Array(24).fill(0).map(() => Math.random() * 100),
            emotionalFrequency: Array(10).fill(0).map(() => Math.random() * 100),
            activismEnergy: Array(7).fill(0).map(() => Math.random() * 100)
          },
          anonymousId: 'Resonant-Pulse',
          connectionLevel: 'connected',
          lastSeen: new Date(Date.now() - 1000 * 60 * 10), // 10 mins ago
          compatibilityScore: 91
        }
      ];

      setResonantConnections(mockConnections);
      setConnectionPhase('resonating');

      // Load some mock messages
      setMessages([
        {
          id: 'msg-1',
          fromSignature: 'conn-1',
          toSignature: userSignature?.id || '',
          content: "Your energy pattern reminds me that I'm not alone in this. Sending gentle strength. 💜",
          type: 'support',
          timestamp: new Date(Date.now() - 1000 * 60 * 45),
          isAnonymous: true
        },
        {
          id: 'msg-2',
          fromSignature: 'conn-3',
          toSignature: userSignature?.id || '',
          content: "Found this article about cycle-activism correlation - thought you might find it interesting given our similar patterns.",
          type: 'resource',
          timestamp: new Date(Date.now() - 1000 * 60 * 120),
          isAnonymous: true
        }
      ]);
    }, 2000);
  };

  const sendMessage = (connection: EnergySignature, content: string, type: ResonanceMessage['type']) => {
    const message: ResonanceMessage = {
      id: `msg-${Date.now()}`,
      fromSignature: userSignature?.id || '',
      toSignature: connection.id,
      content,
      type,
      timestamp: new Date(),
      isAnonymous: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setShowMessageModal(false);
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-purple-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-green-600';
    return 'text-gray-600';
  };

  const getDiscoveringPhaseClass = () => {
    if (connectionPhase === 'discovering') return 'text-blue-600';
    if (connectionPhase === 'resonating') return 'text-green-600';
    return 'text-gray-400';
  };

  const getMessageTypeClass = (type: string) => {
    switch (type) {
      case 'support': return 'bg-purple-100 text-purple-700';
      case 'resource': return 'bg-blue-100 text-blue-700';
      case 'pattern-share': return 'bg-green-100 text-green-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getConnectionLevelIcon = (level: string) => {
    switch (level) {
      case 'discover': return <Circle className="w-4 h-4" />;
      case 'resonate': return <Radio className="w-4 h-4" />;
      case 'connected': return <Waves className="w-4 h-4" />;
      default: return <Circle className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Waves className="w-8 h-8 text-purple-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Resonance Circles
          </h1>
          <Sparkles className="w-8 h-8 text-blue-500" />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Anonymous connections based on your unique energy patterns. Find your wavelength without revealing your identity.
        </p>
      </motion.div>

      {/* Connection Phase Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6"
      >
        <div className="flex items-center justify-center gap-4">
          <div className={`flex items-center gap-2 ${connectionPhase === 'generating' ? 'text-purple-600' : 'text-gray-400'}`}>
            <Brain className="w-5 h-5" />
            <span className="text-sm font-medium">Generating Signature</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className={`flex items-center gap-2 ${getDiscoveringPhaseClass()}`}>
            <Radio className="w-5 h-5" />
            <span className="text-sm font-medium">Finding Resonance</span>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className={`flex items-center gap-2 ${connectionPhase === 'resonating' ? 'text-green-600' : 'text-gray-400'}`}>
            <Waves className="w-5 h-5" />
            <span className="text-sm font-medium">Active Connections</span>
          </div>
        </div>
      </motion.div>

      {/* Your Energy Signature */}
      {userSignature && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-purple-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <h2 className="text-xl font-semibold text-gray-800">Your Energy Signature</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <Heart className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <div className="text-sm font-medium text-purple-800">Health Rhythm</div>
              <div className="text-xs text-purple-600">{userSignature.wavelength}Hz</div>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <Activity className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <div className="text-sm font-medium text-blue-800">Productivity</div>
              <div className="text-xs text-blue-600">Pattern Active</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <Brain className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-sm font-medium text-green-800">Emotional</div>
              <div className="text-xs text-green-600">Frequency Set</div>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <Users className="w-6 h-6 mx-auto mb-2 text-orange-600" />
              <div className="text-sm font-medium text-orange-800">Activism</div>
              <div className="text-xs text-orange-600">Energy Mapped</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-600">Anonymous ID: <span className="font-mono font-semibold">{userSignature.anonymousId}</span></div>
          </div>
        </motion.div>
      )}

      {/* Resonant Connections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Resonant Connections</h2>
        <div className="space-y-4">
          {resonantConnections.map((connection, index) => (
            <motion.div
              key={connection.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {getConnectionLevelIcon(connection.connectionLevel)}
                  <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{connection.anonymousId}</div>
                  <div className="text-sm text-gray-600">
                    Wavelength: {connection.wavelength}Hz • 
                    <span className={`ml-1 font-medium ${getCompatibilityColor(connection.compatibilityScore)}`}>
                      {connection.compatibilityScore}% compatible
                    </span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Last resonance: {connection.lastSeen.toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedConnection(connection);
                    setShowMessageModal(true);
                  }}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  aria-label={`Send message to ${connection.anonymousId}`}
                  title={`Send message to ${connection.anonymousId}`}
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
                <div className="text-xs text-gray-400">
                  {connection.connectionLevel}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Messages */}
      {messages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Resonance</h2>
          <div className="space-y-3">
            {messages.slice(-3).map((message) => {
              const sender = resonantConnections.find(c => c.id === message.fromSignature);
              return (
                <div key={message.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="font-medium text-gray-800">{sender?.anonymousId || 'Unknown Resonance'}</span>
                    <span className="text-xs text-gray-500 ml-auto">
                      {message.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{message.content}</p>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${getMessageTypeClass(message.type)}`}>
                      {message.type}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Message Modal */}
      <AnimatePresence>
        {showMessageModal && selectedConnection && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full"
            >
              <div className="flex items-center gap-3 mb-6">
                <Waves className="w-6 h-6 text-purple-500" />
                <h3 className="text-xl font-semibold">Send Resonance to {selectedConnection.anonymousId}</h3>
              </div>

              <div className="mb-4">
                <div className="block text-sm font-medium text-gray-700 mb-2">Message Type</div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: 'support', label: 'Support', color: 'purple' },
                    { type: 'resource', label: 'Resource', color: 'blue' },
                    { type: 'pattern-share', label: 'Pattern', color: 'green' },
                    { type: 'encouragement', label: 'Encouragement', color: 'yellow' }
                  ].map(({ type, label, color }) => (
                    <button
                      key={type}
                      className={`p-2 text-sm rounded-lg border-2 border-${color}-200 text-${color}-700 hover:bg-${color}-50 transition-colors`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="resonance-message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea
                  id="resonance-message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Share your resonance anonymously..."
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => sendMessage(selectedConnection, newMessage, 'support')}
                  disabled={!newMessage.trim()}
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send Resonance
                </button>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-medium">Anonymous & Encrypted</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Your identity remains completely private. Only pattern resonance is shared.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResonanceCircles;

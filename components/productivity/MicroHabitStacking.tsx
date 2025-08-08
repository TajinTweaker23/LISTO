import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Link2, 
  Plus, 
  Star, 
  Zap, 
  Timer, 
  Coffee, 
  Phone, 
  BookOpen, 
  Droplets,
  Laptop,
  Heart,
  Save,
  Trash2,
  Play,
  CheckCircle2,
  Target
} from 'lucide-react';
import { Card } from '../ui/EnhancedCards';
import { useToast } from '../../hooks/useToast';
import { useAchievements } from '../../hooks/useAchievements';

interface MicroHabit {
  id: string;
  name: string;
  icon: React.ReactNode;
  duration: number; // in seconds
  category: 'physical' | 'mental' | 'social' | 'productivity' | 'wellness';
  difficulty: 1 | 2 | 3; // spoons required
  connectedTo?: string[]; // IDs of connected habits
  completedToday: boolean;
  streak: number;
  bestStreak: number;
  lastCompleted?: Date;
}

interface HabitChain {
  id: string;
  name: string;
  habits: string[]; // habit IDs in order
  trigger: string;
  context: string;
  completedToday: boolean;
  chainStreak: number;
  bestChainStreak: number;
}

interface MicroHabitStackingProps {
  onSave?: (chains: HabitChain[]) => void;
  theme?: 'light' | 'dark';
}

const MicroHabitStacking: React.FC<MicroHabitStackingProps> = ({ 
  onSave, 
  theme = 'light' 
}) => {
  const { addToast } = useToast();
  const { unlockAchievement } = useAchievements();
  
  const [habits, setHabits] = useState<MicroHabit[]>([]);
  const [chains, setChains] = useState<HabitChain[]>([]);
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);
  const [showChainBuilder, setShowChainBuilder] = useState(false);
  const [newChain, setNewChain] = useState<Partial<HabitChain>>({
    name: '',
    trigger: '',
    context: '',
    habits: []
  });
  const [activeChain, setActiveChain] = useState<string | null>(null);

  // Predefined micro-habits
  const predefinedHabits: Omit<MicroHabit, 'id' | 'completedToday' | 'streak' | 'bestStreak'>[] = [
    { name: 'Take 3 deep breaths', icon: <Heart className="w-4 h-4" />, duration: 30, category: 'wellness', difficulty: 1 },
    { name: 'Drink a sip of water', icon: <Droplets className="w-4 h-4" />, duration: 5, category: 'physical', difficulty: 1 },
    { name: 'Check phone notifications', icon: <Phone className="w-4 h-4" />, duration: 15, category: 'productivity', difficulty: 1 },
    { name: 'Open laptop', icon: <Laptop className="w-4 h-4" />, duration: 10, category: 'productivity', difficulty: 1 },
    { name: 'Write one word', icon: <BookOpen className="w-4 h-4" />, duration: 10, category: 'mental', difficulty: 1 },
    { name: 'Make a coffee', icon: <Coffee className="w-4 h-4" />, duration: 120, category: 'physical', difficulty: 2 },
    { name: 'Stretch one muscle', icon: <Zap className="w-4 h-4" />, duration: 15, category: 'physical', difficulty: 1 },
    { name: 'Say one affirmation', icon: <Star className="w-4 h-4" />, duration: 10, category: 'mental', difficulty: 1 },
    { name: 'Check calendar', icon: <Timer className="w-4 h-4" />, duration: 20, category: 'productivity', difficulty: 1 },
    { name: 'Smile at reflection', icon: <Heart className="w-4 h-4" />, duration: 5, category: 'wellness', difficulty: 1 }
  ];

  // Initialize habits on mount
  useEffect(() => {
    const initialHabits = predefinedHabits.map((habit, index) => ({
      ...habit,
      id: `habit-${index}`,
      completedToday: false,
      streak: 0,
      bestStreak: 0
    }));
    setHabits(initialHabits);

    // Load saved data
    const savedChains = localStorage.getItem('micro-habit-chains');
    if (savedChains) {
      setChains(JSON.parse(savedChains));
    }
  }, []);

  const getCategoryColor = (category: MicroHabit['category']): string => {
    const colors = {
      physical: 'bg-blue-50 border-blue-200 text-blue-700',
      mental: 'bg-purple-50 border-purple-200 text-purple-700',
      social: 'bg-pink-50 border-pink-200 text-pink-700',
      productivity: 'bg-green-50 border-green-200 text-green-700',
      wellness: 'bg-orange-50 border-orange-200 text-orange-700'
    };
    return colors[category];
  };

  const getDifficultySpoons = (difficulty: number): string => {
    return '🥄'.repeat(difficulty) + '⚪'.repeat(3 - difficulty);
  };

  const handleHabitToggle = (habitId: string) => {
    setSelectedHabits(prev => 
      prev.includes(habitId)
        ? prev.filter(id => id !== habitId)
        : [...prev, habitId]
    );
  };

  const handleCompleteHabit = (habitId: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newStreak = habit.completedToday ? habit.streak : habit.streak + 1;
        return {
          ...habit,
          completedToday: true,
          streak: newStreak,
          bestStreak: Math.max(habit.bestStreak, newStreak),
          lastCompleted: new Date()
        };
      }
      return habit;
    }));

    addToast('Micro-habit completed', 'success');
    
    // Check for achievements
    const completedCount = habits.filter(h => h.completedToday).length + 1;
    if (completedCount === 5) {
      unlockAchievement('micro-habit-champion');
    }
  };

  const handleCreateChain = () => {
    if (!newChain.name || !newChain.trigger || selectedHabits.length < 2) {
      addToast('Please fill all fields and select at least 2 habits', 'error');
      return;
    }

    const chain: HabitChain = {
      id: `chain-${Date.now()}`,
      name: newChain.name!,
      habits: selectedHabits,
      trigger: newChain.trigger!,
      context: newChain.context || '',
      completedToday: false,
      chainStreak: 0,
      bestChainStreak: 0
    };

    setChains(prev => [...prev, chain]);
    setSelectedHabits([]);
    setNewChain({ name: '', trigger: '', context: '', habits: [] });
    setShowChainBuilder(false);
    
    addToast('Habit chain created', 'success');
    
    // Save to localStorage
    const updatedChains = [...chains, chain];
    localStorage.setItem('micro-habit-chains', JSON.stringify(updatedChains));
    onSave?.(updatedChains);
  };

  const handleStartChain = (chainId: string) => {
    setActiveChain(chainId);
    addToast('Starting habit chain. Take it one micro-step at a time', 'info');
  };

  const handleCompleteChain = (chainId: string) => {
    setChains(prev => prev.map(chain => {
      if (chain.id === chainId) {
        const newStreak = chain.completedToday ? chain.chainStreak : chain.chainStreak + 1;
        return {
          ...chain,
          completedToday: true,
          chainStreak: newStreak,
          bestChainStreak: Math.max(chain.bestChainStreak, newStreak)
        };
      }
      return chain;
    }));

    setActiveChain(null);
    addToast('Chain completed. Strong consistency', 'success');
    unlockAchievement('chain-master');
  };

  const handleDeleteChain = (chainId: string) => {
    setChains(prev => prev.filter(chain => chain.id !== chainId));
    addToast('Chain deleted', 'info');
  };

  const formatDuration = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
  };

  const getChainTotalDuration = (chainHabits: string[]): number => {
    return chainHabits.reduce((total, habitId) => {
      const habit = habits.find(h => h.id === habitId);
      return total + (habit?.duration || 0);
    }, 0);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Micro-Habit Constellation
        </h1>
        <p className="text-gray-600">
          Build tiny habits that chain together. Perfect for low-energy days.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card variant="glass" size="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {habits.filter(h => h.completedToday).length}
            </div>
            <div className="text-xs text-gray-600">Completed Today</div>
          </div>
        </Card>
        <Card variant="glass" size="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {chains.filter(c => c.completedToday).length}
            </div>
            <div className="text-xs text-gray-600">Chains Completed</div>
          </div>
        </Card>
        <Card variant="glass" size="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.max(...habits.map(h => h.streak), 0)}
            </div>
            <div className="text-xs text-gray-600">Best Streak</div>
          </div>
        </Card>
        <Card variant="glass" size="sm">
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {chains.length}
            </div>
            <div className="text-xs text-gray-600">Active Chains</div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Available Micro-Habits */}
        <Card variant="glass" className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Micro-Habits Library
            </h2>
            <button
              onClick={() => setShowChainBuilder(!showChainBuilder)}
              className="bg-sage-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-sage-700 transition-colors flex items-center gap-1"
            >
              <Plus className="w-4 h-4" />
              Create Chain
            </button>
          </div>

          <div className="grid gap-2 max-h-96 overflow-y-auto">
            {habits.map((habit) => (
              <motion.div
                key={habit.id}
                layout
                className={`
                  p-3 rounded-lg border-2 transition-all cursor-pointer
                  ${selectedHabits.includes(habit.id)
                    ? 'border-sage-500 bg-sage-50 shadow-md'
                    : habit.completedToday
                    ? 'border-green-300 bg-green-50'
                    : 'border-gray-200 bg-white hover:border-sage-300'
                  }
                `}
                onClick={() => handleHabitToggle(habit.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getCategoryColor(habit.category)}`}>
                      {habit.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{habit.name}</div>
                      <div className="text-xs text-gray-500 flex items-center gap-2">
                        <span>{formatDuration(habit.duration)}</span>
                        <span>{getDifficultySpoons(habit.difficulty)}</span>
                        {habit.streak > 0 && (
                          <span className="text-orange-600">🔥{habit.streak}</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {habit.completedToday && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                    {!habit.completedToday && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCompleteHabit(habit.id);
                        }}
                        title={`Complete ${habit.name}`}
                        className="bg-green-100 text-green-700 p-1 rounded-full hover:bg-green-200 transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Habit Chains */}
        <Card variant="glass" className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Link2 className="w-5 h-5 text-blue-500" />
            Habit Chains
          </h2>

          {chains.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No chains created yet</p>
              <p className="text-sm">Select habits and create your first chain.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {chains.map((chain) => (
                <motion.div
                  key={chain.id}
                  layout
                  className={`
                    p-4 rounded-lg border-2 transition-all
                    ${activeChain === chain.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : chain.completedToday
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-white'
                    }
                  `}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800">{chain.name}</h3>
                      <p className="text-sm text-gray-600">Trigger: {chain.trigger}</p>
                      {chain.context && (
                        <p className="text-xs text-gray-500">Context: {chain.context}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      {chain.chainStreak > 0 && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                          🔥{chain.chainStreak}
                        </span>
                      )}
                      <button
                        onClick={() => handleDeleteChain(chain.id)}
                        title={`Delete chain: ${chain.name}`}
                        className="text-red-400 hover:text-red-600 p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Chain visualization */}
                  <div className="flex items-center gap-2 mb-3 overflow-x-auto">
                    {chain.habits.map((habitId, index) => {
                      const habit = habits.find(h => h.id === habitId);
                      if (!habit) return null;
                      
                      return (
                        <React.Fragment key={habitId}>
                          <div className={`
                            flex items-center gap-2 px-2 py-1 rounded-lg text-xs
                            ${habit.completedToday ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}
                          `}>
                            {habit.icon}
                            <span className="whitespace-nowrap">{habit.name}</span>
                          </div>
                          {index < chain.habits.length - 1 && (
                            <Link2 className="w-3 h-3 text-gray-400 flex-shrink-0" />
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Total time: {formatDuration(getChainTotalDuration(chain.habits))}</span>
                    <span>{chain.habits.length} habits</span>
                  </div>

                  <div className="flex gap-2">
                    {!chain.completedToday && activeChain !== chain.id && (
                      <button
                        onClick={() => handleStartChain(chain.id)}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Start Chain
                      </button>
                    )}
                    
                    {activeChain === chain.id && (
                      <button
                        onClick={() => handleCompleteChain(chain.id)}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Complete Chain
                      </button>
                    )}

                    {chain.completedToday && (
                      <div className="flex-1 bg-green-100 text-green-700 py-2 px-4 rounded-lg text-sm text-center">
                        ✅ Completed Today
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Chain Builder Modal */}
      <AnimatePresence>
        {showChainBuilder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowChainBuilder(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-md w-full space-y-4"
            >
              <h3 className="text-xl font-semibold">Create Habit Chain</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="chain-name-input" className="block text-sm font-medium text-gray-700 mb-1">
                    Chain Name
                  </label>
                  <input
                    id="chain-name-input"
                    type="text"
                    value={newChain.name || ''}
                    onChange={(e) => setNewChain(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Morning Momentum"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="chain-trigger-input" className="block text-sm font-medium text-gray-700 mb-1">
                    Trigger
                  </label>
                  <input
                    id="chain-trigger-input"
                    type="text"
                    value={newChain.trigger || ''}
                    onChange={(e) => setNewChain(prev => ({ ...prev, trigger: e.target.value }))}
                    placeholder="e.g., When I wake up"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="chain-context-input" className="block text-sm font-medium text-gray-700 mb-1">
                    Context (optional)
                  </label>
                  <input
                    id="chain-context-input"
                    type="text"
                    value={newChain.context || ''}
                    onChange={(e) => setNewChain(prev => ({ ...prev, context: e.target.value }))}
                    placeholder="e.g., In my bedroom"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selected Habits ({selectedHabits.length})
                  </label>
                  <div className="text-sm text-gray-600 max-h-32 overflow-y-auto">
                    {selectedHabits.length === 0 ? (
                      <p className="text-gray-400">Select habits from the library above</p>
                    ) : (
                      selectedHabits.map((habitId, index) => {
                        const habit = habits.find(h => h.id === habitId);
                        return habit ? (
                          <div key={habitId} className="flex items-center gap-2 py-1">
                            <span className="text-gray-400">{index + 1}.</span>
                            {habit.icon}
                            <span>{habit.name}</span>
                          </div>
                        ) : null;
                      })
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setShowChainBuilder(false)}
                  className="flex-1 px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateChain}
                  disabled={!newChain.name || !newChain.trigger || selectedHabits.length < 2}
                  className="flex-1 px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Create Chain
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MicroHabitStacking;

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Star, 
  Target, 
  Zap, 
  Heart,
  Users,
  Book,
  Calendar,
  CheckCircle,
  Crown
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'social' | 'wellness' | 'consistency' | 'milestone';
  difficulty: 'bronze' | 'silver' | 'gold' | 'diamond';
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  unlockedAt?: Date;
  xpReward: number;
  icon: string;
  rarityColor: string;
}

interface UserLevel {
  currentLevel: number;
  currentXP: number;
  xpToNextLevel: number;
  totalXP: number;
  title: string;
}

interface StreakData {
  type: 'study' | 'social' | 'selfcare' | 'learning';
  name: string;
  current: number;
  best: number;
  icon: string;
  color: string;
}

interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  category: 'focus' | 'social' | 'wellness' | 'learning';
  difficulty: 'easy' | 'medium' | 'hard';
}

export const GamificationHub: React.FC = () => {
  const [userLevel] = useState<UserLevel>({
    currentLevel: 12,
    currentXP: 2450,
    xpToNextLevel: 550,
    totalXP: 14500,
    title: 'Knowledge Seeker'
  });

  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [streaks, setStreaks] = useState<StreakData[]>([]);
  const [dailyChallenges, setDailyChallenges] = useState<DailyChallenge[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | Achievement['category']>('all');
  const [showRecentUnlocks, setShowRecentUnlocks] = useState(false);

  useEffect(() => {
    // Simulated achievements data
    const mockAchievements: Achievement[] = [
      {
        id: '1',
        title: 'First Steps',
        description: 'Complete your first learning session',
        category: 'learning',
        difficulty: 'bronze',
        progress: 1,
        maxProgress: 1,
        unlocked: true,
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        xpReward: 100,
        icon: '🎯',
        rarityColor: 'from-orange-400 to-orange-600'
      },
      {
        id: '2',
        title: 'Social Butterfly',
        description: 'Participate in 10 community discussions',
        category: 'social',
        difficulty: 'silver',
        progress: 7,
        maxProgress: 10,
        unlocked: false,
        xpReward: 250,
        icon: '🦋',
        rarityColor: 'from-gray-400 to-gray-600'
      },
      {
        id: '3',
        title: 'Consistency King',
        description: 'Maintain a 30-day learning streak',
        category: 'consistency',
        difficulty: 'gold',
        progress: 23,
        maxProgress: 30,
        unlocked: false,
        xpReward: 500,
        icon: '👑',
        rarityColor: 'from-yellow-400 to-yellow-600'
      },
      {
        id: '4',
        title: 'Wellness Warrior',
        description: 'Complete 50 self-care activities',
        category: 'wellness',
        difficulty: 'gold',
        progress: 32,
        maxProgress: 50,
        unlocked: false,
        xpReward: 400,
        icon: '🧘',
        rarityColor: 'from-yellow-400 to-yellow-600'
      },
      {
        id: '5',
        title: 'Diamond Mind',
        description: 'Reach 10,000 total XP',
        category: 'milestone',
        difficulty: 'diamond',
        progress: 14500,
        maxProgress: 10000,
        unlocked: true,
        unlockedAt: new Date(Date.now() - 1000 * 60 * 60 * 48),
        xpReward: 1000,
        icon: '💎',
        rarityColor: 'from-cyan-400 to-blue-600'
      }
    ];

    const mockStreaks: StreakData[] = [
      {
        type: 'study',
        name: 'Study Streak',
        current: 23,
        best: 45,
        icon: '📚',
        color: 'from-blue-500 to-indigo-600'
      },
      {
        type: 'social',
        name: 'Community',
        current: 7,
        best: 12,
        icon: '👥',
        color: 'from-green-500 to-emerald-600'
      },
      {
        type: 'selfcare',
        name: 'Self-Care',
        current: 15,
        best: 28,
        icon: '🌱',
        color: 'from-pink-500 to-rose-600'
      },
      {
        type: 'learning',
        name: 'Learning',
        current: 31,
        best: 31,
        icon: '🎓',
        color: 'from-purple-500 to-violet-600'
      }
    ];

    const mockChallenges: DailyChallenge[] = [
      {
        id: '1',
        title: 'Focus Sprint',
        description: 'Complete a 25-minute focused study session',
        xpReward: 50,
        completed: true,
        category: 'focus',
        difficulty: 'easy'
      },
      {
        id: '2',
        title: 'Community Helper',
        description: 'Give helpful feedback to 3 community members',
        xpReward: 75,
        completed: false,
        category: 'social',
        difficulty: 'medium'
      },
      {
        id: '3',
        title: 'Mindful Moment',
        description: 'Complete a 10-minute mindfulness exercise',
        xpReward: 40,
        completed: false,
        category: 'wellness',
        difficulty: 'easy'
      }
    ];

    setAchievements(mockAchievements);
    setStreaks(mockStreaks);
    setDailyChallenges(mockChallenges);

    // Check for recent unlocks
    const recentUnlocks = mockAchievements.filter(a => 
      a.unlocked && a.unlockedAt && 
      Date.now() - a.unlockedAt.getTime() < 1000 * 60 * 60 * 72 // 72 hours
    );
    if (recentUnlocks.length > 0) {
      setShowRecentUnlocks(true);
    }
  }, []);

  const getDifficultyBadge = (difficulty: Achievement['difficulty']) => {
    const configs = {
      bronze: { color: 'from-orange-400 to-orange-600', icon: Trophy },
      silver: { color: 'from-gray-400 to-gray-600', icon: Trophy },
      gold: { color: 'from-yellow-400 to-yellow-600', icon: Crown },
      diamond: { color: 'from-cyan-400 to-blue-600', icon: Star }
    };
    return configs[difficulty];
  };

  const getCategoryIcon = (category: Achievement['category']) => {
    switch (category) {
      case 'learning': return Book;
      case 'social': return Users;
      case 'wellness': return Heart;
      case 'consistency': return Calendar;
      case 'milestone': return Target;
      default: return Trophy;
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(a => a.category === selectedCategory);

  const levelProgress = (userLevel.currentXP / (userLevel.currentXP + userLevel.xpToNextLevel)) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-4">
      {/* Recent Unlocks Modal */}
      <AnimatePresence>
        {showRecentUnlocks && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowRecentUnlocks(false)}
          >
            <motion.div
              className="bg-white rounded-3xl p-8 max-w-md mx-auto text-center"
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Achievement Unlocked!
              </h2>
              {achievements.filter(a => a.unlocked && a.unlockedAt && Date.now() - a.unlockedAt.getTime() < 1000 * 60 * 60 * 72).map(achievement => (
                <div key={achievement.id} className="mb-4">
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h3 className="font-bold text-lg">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                  <div className="inline-flex items-center space-x-1 bg-purple-100 px-3 py-1 rounded-full mt-2">
                    <Zap className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-600 font-medium">+{achievement.xpReward} XP</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Level Progress */}
      <motion.div 
        className="mb-8 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Achievement Center
          </h1>
          <p className="text-gray-600">
            Track your progress, unlock achievements, and celebrate your growth
          </p>
        </div>

        {/* Level Progress Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">👤</div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Level {userLevel.currentLevel}</h2>
                <p className="text-purple-600 font-medium">{userLevel.title}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">{userLevel.totalXP.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Total XP</div>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>{userLevel.currentXP} XP</span>
              <span>{userLevel.currentXP + userLevel.xpToNextLevel} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-blue-600 h-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${levelProgress}%` }}
                transition={{ duration: 1, delay: 0.2 }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-600 text-center">
            {userLevel.xpToNextLevel} XP to next level
          </p>
        </div>

        {/* Streaks */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {streaks.map((streak, index) => (
            <motion.div
              key={streak.type}
              className={`bg-gradient-to-br ${streak.color} rounded-xl p-4 text-white`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{streak.icon}</div>
                <div className="text-2xl font-bold">{streak.current}</div>
                <div className="text-sm opacity-90">{streak.name}</div>
                <div className="text-xs opacity-70">Best: {streak.best}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Daily Challenges */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-lg font-bold text-gray-900">Today's Challenges</h3>
          </div>
          <div className="space-y-3">
            {dailyChallenges.map(challenge => (
              <div key={challenge.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  {challenge.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                  )}
                  <div>
                    <h4 className={`font-medium ${challenge.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {challenge.title}
                    </h4>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 text-purple-600">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">+{challenge.xpReward}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Achievement Categories */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {(['all', 'learning', 'social', 'wellness', 'consistency', 'milestone'] as const).map(category => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${selectedCategory === category 
                  ? 'bg-purple-500 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-purple-50'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredAchievements.map((achievement, index) => {
              const CategoryIcon = getCategoryIcon(achievement.category);
              const difficultyConfig = getDifficultyBadge(achievement.difficulty);
              const DifficultyIcon = difficultyConfig.icon;
              const progressPercent = (achievement.progress / achievement.maxProgress) * 100;

              return (
                <motion.div
                  key={achievement.id}
                  className={`
                    relative bg-white rounded-2xl shadow-lg overflow-hidden
                    ${achievement.unlocked ? 'ring-2 ring-green-200' : 'opacity-75'}
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  layout
                >
                  {/* Rarity Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${achievement.rarityColor}`} />
                  
                  <div className="p-6">
                    {/* Achievement Icon & Status */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{achievement.title}</h3>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                      
                      {achievement.unlocked && (
                        <CheckCircle className="w-6 h-6 text-green-500" />
                      )}
                    </div>

                    {/* Progress Bar */}
                    {!achievement.unlocked && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>{achievement.progress} / {achievement.maxProgress}</span>
                          <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div
                            className={`bg-gradient-to-r ${achievement.rarityColor} h-2 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${progressPercent}%` }}
                            transition={{ duration: 1, delay: 0.2 }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <CategoryIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-xs text-gray-500 capitalize">{achievement.category}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`p-1 bg-gradient-to-r ${difficultyConfig.color} rounded`}>
                          <DifficultyIcon className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex items-center space-x-1 text-purple-600">
                          <Zap className="w-3 h-3" />
                          <span className="text-sm font-medium">{achievement.xpReward}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GamificationHub;

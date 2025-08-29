'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Timer, 
  Users, 
  Star, 
  PlayCircle,
  Calendar,
  TrendingUp,
  Award,
  Crown,
  Target,
  Zap,
  Clock,
  Medal,
  Flame,
  Gift,
  Swords,
  MapPin,
  Camera,
  Brain,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Filter,
  SortDesc,
  ChevronRight,
  Coins,
  Sparkles,
  Laugh,
  Coffee,
  Sun,
  Moon
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'cleaning' | 'cooking' | 'organizing' | 'self-care' | 'productivity' | 'fitness' | 'laundry' | 'bills';
  difficulty: 'trivial' | 'amateur' | 'professional' | 'legendary' | 'mythical';
  timeLimit: number; // in seconds
  points: number;
  requiredItems?: string[];
  tips: string[];
  currentParticipants: number;
  totalCompletions: number;
  worldRecord?: {
    time: number;
    holder: string;
    video?: string;
  };
  trending: boolean;
  emoji: string;
  seasonalBonus?: number;
  humor: string; // The funny description
  warningLabels: string[]; // Ridiculous warnings
  achievements: Achievement[];
  createdBy: {
    username: string;
    title: string;
  };
  sponsored?: {
    brand: string;
    prize: string;
  };
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedBy: number; // percentage of players who have this
}

interface UserStats {
  totalChallengesCompleted: number;
  totalTimeSpent: number; // in seconds
  favoriteCategory: string;
  currentStreak: number;
  longestStreak: number;
  level: number;
  experience: number;
  badges: Achievement[];
  rank: {
    global: number;
    category: Record<string, number>;
  };
  nemesis?: {
    username: string;
    winsAgainst: number;
    lossesAgainst: number;
  };
}

interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  score: number;
  badge: string;
  streak: number;
  isRival: boolean;
  specialTitle: string;
}

const MundaneTaskLeague: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({} as UserStats);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'trending' | 'difficulty' | 'participants' | 'new'>('trending');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'challenges' | 'leaderboard' | 'achievements' | 'rivals'>('challenges');
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening'>('morning');

  // Mock data with hilarious challenges
  useEffect(() => {
    const mockChallenges: Challenge[] = [
      {
        id: 'bed-fold-olympics',
        title: 'The Olympic Bed Fold',
        description: 'Transform your sleep-wrinkled battlefield into a hotel-worthy masterpiece',
        category: 'cleaning',
        difficulty: 'amateur',
        timeLimit: 60,
        points: 50,
        requiredItems: ['fitted sheet', 'top sheet', 'pillows', 'determination'],
        tips: [
          'Hospital corners are your friend',
          'Fluff the pillows like your life depends on it',
          'Channel your inner drill sergeant'
        ],
        currentParticipants: 1247,
        totalCompletions: 45892,
        worldRecord: {
          time: 23,
          holder: 'BedMasterFlex',
          video: '/videos/bed-record.mp4'
        },
        trending: true,
        emoji: '🛏️',
        seasonalBonus: 25,
        humor: 'Because adulting means your bed can\'t look like a crime scene',
        warningLabels: [
          'May cause excessive pride in domestic skills',
          'Side effects include feeling superior to your past self',
          'Warning: May lead to judging other people\'s unmade beds'
        ],
        achievements: [
          {
            id: 'speed-demon',
            title: 'Speed Demon',
            description: 'Complete in under 30 seconds',
            emoji: '⚡',
            rarity: 'rare',
            unlockedBy: 15
          }
        ],
        createdBy: {
          username: 'CleanFreakCarl',
          title: 'Chief Domestic Officer'
        }
      },
      {
        id: 'dish-jenga',
        title: 'Dish Jenga: The Sink Edition',
        description: 'Stack dishes in the drying rack without triggering an avalanche',
        category: 'cleaning',
        difficulty: 'professional',
        timeLimit: 180,
        points: 100,
        requiredItems: ['dirty dishes', 'dish soap', 'ninja-like precision'],
        tips: [
          'Physics is your enemy',
          'Start with the biggest items',
          'Pray to the dish gods'
        ],
        currentParticipants: 892,
        totalCompletions: 23451,
        trending: false,
        emoji: '🍽️',
        humor: 'It\'s like Tetris, but with consequences',
        warningLabels: [
          'May result in dish casualties',
          'Not responsible for kitchen flooding',
          'Possible friendship strain if using roommate\'s dishes'
        ],
        achievements: [
          {
            id: 'dish-architect',
            title: 'Dish Architect',
            description: 'Stack 20+ items without collapse',
            emoji: '🏗️',
            rarity: 'epic',
            unlockedBy: 8
          }
        ],
        createdBy: {
          username: 'SinkSensei',
          title: 'Master of Aquatic Cleaning'
        }
      },
      {
        id: 'laundry-tetris',
        title: 'Laundry Tetris: Maximum Stuffing',
        description: 'Fit an impossible amount of clothes into one washing machine load',
        category: 'laundry',
        difficulty: 'legendary',
        timeLimit: 300,
        points: 200,
        requiredItems: ['overflowing laundry basket', 'spatial reasoning', 'complete disregard for care labels'],
        tips: [
          'Roll, don\'t fold',
          'Socks are your secret weapon',
          'Engineering degree recommended but not required'
        ],
        currentParticipants: 2156,
        totalCompletions: 67834,
        worldRecord: {
          time: 127,
          holder: 'LaundryNinja99',
        },
        trending: true,
        emoji: '👕',
        humor: 'Because doing laundry twice is for quitters',
        warningLabels: [
          'May void washing machine warranty',
          'Could result in clothes coming out wrinklier than raisins',
          'Do not attempt if you actually care about your clothes'
        ],
        achievements: [
          {
            id: 'tetris-master',
            title: 'Tetris Master',
            description: 'Fit 3+ loads into 1',
            emoji: '🎮',
            rarity: 'legendary',
            unlockedBy: 3
          }
        ],
        createdBy: {
          username: 'WashWarrior',
          title: 'Laundromat Legend'
        }
      },
      {
        id: 'midnight-snack-speedrun',
        title: 'Midnight Snack Speedrun',
        description: 'Create a gourmet snack without waking anyone up',
        category: 'cooking',
        difficulty: 'professional',
        timeLimit: 420,
        points: 150,
        requiredItems: ['stealth mode', 'random fridge contents', 'questionable creativity'],
        tips: [
          'The microwave beep is your enemy',
          'Master the art of silent unwrapping',
          'Cereal is always an option'
        ],
        currentParticipants: 3421,
        totalCompletions: 156789,
        trending: true,
        emoji: '🥪',
        seasonalBonus: 50,
        humor: 'Ninja skills meet culinary desperation',
        warningLabels: [
          'May result in weird food combinations',
          'Not responsible for family awakening',
          'Side effects include questioning your life choices'
        ],
        achievements: [
          {
            id: 'midnight-chef',
            title: 'Midnight Chef',
            description: 'Complete without making noise',
            emoji: '🥷',
            rarity: 'epic',
            unlockedBy: 12
          }
        ],
        createdBy: {
          username: 'NightCrawler',
          title: 'Fridge Raider Supreme'
        },
        sponsored: {
          brand: 'Silent-Snack Co.',
          prize: '$50 grocery card'
        }
      },
      {
        id: 'email-purge',
        title: 'The Great Email Purge',
        description: 'Delete 1000+ emails without accidentally deleting something important',
        category: 'productivity',
        difficulty: 'mythical',
        timeLimit: 900,
        points: 300,
        requiredItems: ['overflowing inbox', 'courage', 'backup plan'],
        tips: [
          'Sort by sender first',
          'When in doubt, archive',
          'That email from 2019 can probably go'
        ],
        currentParticipants: 567,
        totalCompletions: 8934,
        trending: false,
        emoji: '📧',
        humor: 'Because 47,382 unread emails is too many',
        warningLabels: [
          'May accidentally delete work assignments',
          'Could cause existential crisis about digital hoarding',
          'Warning: You might actually find important emails'
        ],
        achievements: [
          {
            id: 'inbox-zero',
            title: 'Inbox Zero Hero',
            description: 'Achieve the mythical inbox zero',
            emoji: '🏆',
            rarity: 'legendary',
            unlockedBy: 1
          }
        ],
        createdBy: {
          username: 'DigitalMinimalist',
          title: 'Email Exorcist'
        }
      }
    ];

    const mockUserStats: UserStats = {
      totalChallengesCompleted: 127,
      totalTimeSpent: 45623,
      favoriteCategory: 'cleaning',
      currentStreak: 7,
      longestStreak: 23,
      level: 12,
      experience: 2847,
      badges: [
        {
          id: 'rookie',
          title: 'Rookie Adult',
          description: 'Completed your first challenge',
          emoji: '🌱',
          rarity: 'common',
          unlockedBy: 95
        }
      ],
      rank: {
        global: 1247,
        category: {
          cleaning: 234,
          cooking: 567,
          organizing: 890
        }
      },
      nemesis: {
        username: 'CleanFreakCarl',
        winsAgainst: 7,
        lossesAgainst: 12
      }
    };

    setChallenges(mockChallenges);
    setUserStats(mockUserStats);

    // Determine time of day for contextual challenges
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) setTimeOfDay('morning');
    else if (hour >= 12 && hour < 18) setTimeOfDay('afternoon');
    else setTimeOfDay('evening');
  }, []);

  const categories = [
    { id: 'all', name: 'All', emoji: '🎯' },
    { id: 'cleaning', name: 'Cleaning', emoji: '🧽' },
    { id: 'cooking', name: 'Cooking', emoji: '👨‍🍳' },
    { id: 'organizing', name: 'Organizing', emoji: '📦' },
    { id: 'self-care', name: 'Self Care', emoji: '🧘‍♀️' },
    { id: 'productivity', name: 'Productivity', emoji: '⚡' },
    { id: 'laundry', name: 'Laundry', emoji: '👕' },
    { id: 'bills', name: 'Bills & Paperwork', emoji: '📄' }
  ];

  const difficultyColors = {
    trivial: 'bg-green-100 text-green-800',
    amateur: 'bg-blue-100 text-blue-800',
    professional: 'bg-purple-100 text-purple-800',
    legendary: 'bg-orange-100 text-orange-800',
    mythical: 'bg-red-100 text-red-800'
  };

  const rarityColors = {
    common: 'text-gray-500',
    rare: 'text-blue-500',
    epic: 'text-purple-500',
    legendary: 'text-orange-500'
  };

  const getTimeBasedGreeting = () => {
    switch (timeOfDay) {
      case 'morning':
        return 'Ready to conquer your morning routine?';
      case 'afternoon':
        return 'Time to tackle those afternoon tasks!';
      case 'evening':
        return 'Evening productivity vibes incoming!';
    }
  };

  const getTimeBasedIcon = () => {
    switch (timeOfDay) {
      case 'morning': return Sun;
      case 'afternoon': return Coffee;
      case 'evening': return Moon;
    }
  };

  const filteredChallenges = challenges
    .filter(challenge => selectedCategory === 'all' || challenge.category === selectedCategory)
    .sort((a, b) => {
      switch (sortBy) {
        case 'trending':
          return b.currentParticipants - a.currentParticipants;
        case 'difficulty':
          const diffOrder = { trivial: 1, amateur: 2, professional: 3, legendary: 4, mythical: 5 };
          return diffOrder[b.difficulty] - diffOrder[a.difficulty];
        case 'participants':
          return b.currentParticipants - a.currentParticipants;
        case 'new':
          return 0; // Would sort by creation date
        default:
          return 0;
      }
    });

  const mockLeaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      username: 'CleanFreakCarl',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face',
      score: 15420,
      badge: '👑',
      streak: 45,
      isRival: true,
      specialTitle: 'Supreme Overlord of Mundane'
    },
    {
      rank: 2,
      username: 'LaundryQueen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b167?w=50&h=50&fit=crop&crop=face',
      score: 14892,
      badge: '🧺',
      streak: 32,
      isRival: false,
      specialTitle: 'Fabric Whisperer'
    },
    {
      rank: 3,
      username: 'DishNinja',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop&crop=face',
      score: 13567,
      badge: '🥷',
      streak: 28,
      isRival: false,
      specialTitle: 'Master of Suds'
    }
  ];

  const ChallengeCard: React.FC<{ challenge: Challenge }> = ({ challenge }) => (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Challenge Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{challenge.emoji}</span>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{challenge.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[challenge.difficulty]}`}>
                {challenge.difficulty.toUpperCase()}
              </span>
              {challenge.trending && (
                <span className="flex items-center gap-1 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                  <Flame className="w-3 h-3" />
                  TRENDING
                </span>
              )}
              {challenge.seasonalBonus && (
                <span className="bg-yellow-100 text-yellow-600 px-2 py-1 rounded-full text-xs font-medium">
                  +{challenge.seasonalBonus} bonus
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-purple-600">{challenge.points}</div>
          <div className="text-xs text-gray-500">points</div>
        </div>
      </div>

      {/* Humor Description */}
      <p className="text-gray-600 mb-3 italic">"{challenge.humor}"</p>

      {/* Challenge Description */}
      <p className="text-gray-700 mb-4">{challenge.description}</p>

      {/* Stats Row */}
      <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Timer className="w-4 h-4" />
          {Math.floor(challenge.timeLimit / 60)}:{(challenge.timeLimit % 60).toString().padStart(2, '0')}
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-4 h-4" />
          {challenge.currentParticipants.toLocaleString()}
        </div>
        {challenge.worldRecord && (
          <div className="flex items-center gap-1">
            <Trophy className="w-4 h-4 text-yellow-500" />
            {challenge.worldRecord.time}s by {challenge.worldRecord.holder}
          </div>
        )}
      </div>

      {/* Warning Labels */}
      {challenge.warningLabels.length > 0 && (
        <div className="mb-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="text-xs font-medium text-yellow-800 mb-1">⚠️ Warning Labels:</div>
            {challenge.warningLabels.map((warning, index) => (
              <div key={index} className="text-xs text-yellow-700">• {warning}</div>
            ))}
          </div>
        </div>
      )}

      {/* Sponsored Challenge */}
      {challenge.sponsored && (
        <div className="mb-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-3">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-800">
              Sponsored by {challenge.sponsored.brand}
            </span>
          </div>
          <div className="text-xs text-green-700">Prize: {challenge.sponsored.prize}</div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <motion.button
          className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <PlayCircle className="w-5 h-5" />
          Start Challenge
        </motion.button>
        <motion.button
          className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Share2 className="w-5 h-5 text-gray-600" />
        </motion.button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-4">
      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Mundane Task League
          </h1>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            {React.createElement(getTimeBasedIcon(), { className: "w-5 h-5" })}
            <p className="text-lg">{getTimeBasedGreeting()}</p>
          </div>
        </div>

        {/* User Stats Card */}
        <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{userStats.level || 0}</div>
              <div className="text-sm text-gray-600">Level</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{userStats.currentStreak || 0}</div>
              <div className="text-sm text-gray-600">Day Streak</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{userStats.totalChallengesCompleted || 0}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">#{userStats.rank?.global || 'N/A'}</div>
              <div className="text-sm text-gray-600">Global Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{Math.floor((userStats.totalTimeSpent || 0) / 3600)}h</div>
              <div className="text-sm text-gray-600">Time Spent</div>
            </div>
          </div>
          
          {userStats.nemesis && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Swords className="w-5 h-5 text-red-500" />
                  <span className="font-medium">Nemesis: {userStats.nemesis.username}</span>
                </div>
                <span className="text-sm text-gray-600">
                  {userStats.nemesis.winsAgainst}W - {userStats.nemesis.lossesAgainst}L
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['challenges', 'leaderboard', 'achievements', 'rivals'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                activeTab === tab
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-purple-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab === 'challenges' && <Trophy className="w-5 h-5 inline mr-2" />}
              {tab === 'leaderboard' && <Crown className="w-5 h-5 inline mr-2" />}
              {tab === 'achievements' && <Award className="w-5 h-5 inline mr-2" />}
              {tab === 'rivals' && <Swords className="w-5 h-5 inline mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              {/* Filters */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="mr-1">{category.emoji}</span>
                        {category.name}
                      </motion.button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="trending">🔥 Trending</option>
                      <option value="difficulty">💪 By Difficulty</option>
                      <option value="participants">👥 Most Popular</option>
                      <option value="new">✨ Newest</option>
                    </select>
                    
                    <motion.button
                      onClick={() => setShowCreateModal(true)}
                      className="px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Plus className="w-4 h-4" />
                      Create
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Challenges Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredChallenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Crown className="w-6 h-6 text-yellow-500" />
                Global Leaderboard
              </h2>
              
              <div className="space-y-4">
                {mockLeaderboard.map((entry) => (
                  <motion.div
                    key={entry.rank}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      entry.isRival ? 'bg-red-50 border border-red-200' : 'bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-2xl font-bold text-gray-500 w-8 text-center">
                      {entry.rank}
                    </div>
                    <img
                      src={entry.avatar}
                      alt={entry.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-gray-900">{entry.username}</span>
                        <span className="text-lg">{entry.badge}</span>
                        {entry.isRival && (
                          <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                            RIVAL
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{entry.specialTitle}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-purple-600">
                        {entry.score.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">
                        {entry.streak} day streak
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MundaneTaskLeague;

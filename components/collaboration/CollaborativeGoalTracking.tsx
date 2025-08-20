import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Target, 
  Trophy, 
  Heart, 
  MessageCircle, 
  Plus,
  Share2,
  Lock,
  Globe,
  UserPlus,
  Calendar,
  MoreHorizontal,
  Star,
  Award,
  Zap,
  Flame,
  Users2,
  Sparkles
} from 'lucide-react';

interface SharedGoal {
  id: string;
  title: string;
  description: string;
  category: 'health' | 'productivity' | 'learning' | 'wellness' | 'activism' | 'personal';
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: Date;
  privacy: 'public' | 'friends' | 'private';
  collaborators: Collaborator[];
  creator: string;
  createdAt: Date;
  progress: number;
  milestones: Milestone[];
  supportMessages: SupportMessage[];
  isCompleted: boolean;
  completedAt?: Date;
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  tags: string[];
  challengeType?: 'individual' | 'team' | 'community';
}

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  role: 'creator' | 'collaborator' | 'supporter';
  contribution: number;
  joinedAt: Date;
  isActive: boolean;
  achievements: string[];
  supportLevel: number; // 1-5 stars
}

interface Milestone {
  id: string;
  title: string;
  targetValue: number;
  isCompleted: boolean;
  completedBy?: string;
  completedAt?: Date;
  celebrationMessage?: string;
}

interface SupportMessage {
  id: string;
  from: string;
  content: string;
  type: 'encouragement' | 'tip' | 'celebration' | 'check-in';
  timestamp: Date;
  reactions: { emoji: string; count: number; userIds: string[] }[];
}

interface CommunityChallenge {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  participants: number;
  maxParticipants?: number;
  category: string;
  difficulty: string;
  rewards: {
    type: 'badge' | 'points' | 'feature' | 'recognition';
    name: string;
    description: string;
    icon: string;
  }[];
  leaderboard: {
    userId: string;
    name: string;
    progress: number;
    rank: number;
  }[];
  isActive: boolean;
  requirements: string[];
}

interface GoalTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  suggestedDuration: number; // days
  difficulty: string;
  milestones: string[];
  tips: string[];
  popularityScore: number;
  successRate: number;
}

const CollaborativeGoalTracking: React.FC = () => {
  const [sharedGoals, setSharedGoals] = useState<SharedGoal[]>([]);
  const [communityGoals, setCommunityGoals] = useState<SharedGoal[]>([]);
  const [challenges, setChallenges] = useState<CommunityChallenge[]>([]);
  const [templates, setTemplates] = useState<GoalTemplate[]>([]);
  const [activeTab, setActiveTab] = useState<'my-goals' | 'community' | 'challenges' | 'templates'>('my-goals');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SharedGoal | null>(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'health' as SharedGoal['category'],
    targetValue: 0,
    unit: '',
    deadline: '',
    privacy: 'friends' as SharedGoal['privacy'],
    collaborators: [] as string[],
    difficulty: 'medium' as SharedGoal['difficulty'],
    tags: [] as string[]
  });
  const [supportMessage, setSupportMessage] = useState('');
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    loadUserGoals();
    loadCommunityGoals();
    loadChallenges();
    loadTemplates();
  }, []);

  const loadUserGoals = () => {
    // Load user's shared goals (mock data)
    const mockGoals: SharedGoal[] = [
      {
        id: 'goal-1',
        title: '10,000 Steps Daily Challenge',
        description: 'Walking 10,000 steps every day for better health and energy',
        category: 'health',
        targetValue: 10000,
        currentValue: 7500,
        unit: 'steps',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        privacy: 'friends',
        collaborators: [
          {
            id: 'user-1',
            name: 'Alex Runner',
            avatar: '/avatars/alex.jpg',
            role: 'collaborator',
            contribution: 85,
            joinedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            isActive: true,
            achievements: ['Consistency Champion', 'Motivation Master'],
            supportLevel: 5
          }
        ],
        creator: 'current-user',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        progress: 75,
        milestones: [
          {
            id: 'milestone-1',
            title: 'First Week Complete',
            targetValue: 70000,
            isCompleted: true,
            completedBy: 'current-user',
            completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            celebrationMessage: 'First week completed'
          },
          {
            id: 'milestone-2',
            title: 'Two Weeks Strong',
            targetValue: 140000,
            isCompleted: false
          }
        ],
        supportMessages: [
          {
            id: 'msg-1',
            from: 'Alex Runner',
            content: 'Solid progress. Keep the consistency going',
            type: 'encouragement',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            reactions: [
              { emoji: '❤️', count: 3, userIds: ['user-1', 'user-2', 'current-user'] },
              { emoji: '💪', count: 2, userIds: ['user-1', 'user-3'] }
            ]
          }
        ],
        isCompleted: false,
        difficulty: 'medium',
        tags: ['fitness', 'daily', 'wellness'],
        challengeType: 'team'
      }
    ];

    setSharedGoals(mockGoals);
  };

  const loadCommunityGoals = () => {
    // Load trending community goals
    const mockCommunityGoals: SharedGoal[] = [
      {
        id: 'community-1',
        title: 'Climate Action Challenge',
        description: 'Reduce carbon footprint through sustainable daily actions',
        category: 'activism',
        targetValue: 100,
        currentValue: 67,
        unit: 'eco-actions',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        privacy: 'public',
        collaborators: [
          {
            id: 'eco-1',
            name: 'Green Warrior',
            avatar: '/avatars/eco1.jpg',
            role: 'creator',
            contribution: 100,
            joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            isActive: true,
            achievements: ['Eco Champion', 'Community Leader'],
            supportLevel: 5
          }
        ],
        creator: 'eco-1',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        progress: 67,
        milestones: [],
        supportMessages: [],
        isCompleted: false,
        difficulty: 'medium',
        tags: ['environment', 'sustainability', 'activism'],
        challengeType: 'community'
      }
    ];

    setCommunityGoals(mockCommunityGoals);
  };

  const loadChallenges = () => {
    const mockChallenges: CommunityChallenge[] = [
      {
        id: 'challenge-1',
        title: 'Mindfulness March',
        description: 'Daily meditation practice for the entire month',
        startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        participants: 847,
        maxParticipants: 1000,
        category: 'wellness',
        difficulty: 'easy',
        rewards: [
          {
            type: 'badge',
            name: 'Zen Master',
            description: 'Completed 30 days of mindfulness',
            icon: '🧘'
          },
          {
            type: 'points',
            name: '500 Wellness Points',
            description: 'Boost your wellness score',
            icon: '⭐'
          }
        ],
        leaderboard: [
          { userId: 'user-1', name: 'Meditation Mike', progress: 28, rank: 1 },
          { userId: 'user-2', name: 'Zen Zara', progress: 27, rank: 2 },
          { userId: 'user-3', name: 'Mindful Maya', progress: 26, rank: 3 }
        ],
        isActive: true,
        requirements: ['Complete daily meditation session', 'Log mindfulness activity', 'Share weekly reflection']
      }
    ];

    setChallenges(mockChallenges);
  };

  const loadTemplates = () => {
    const mockTemplates: GoalTemplate[] = [
      {
        id: 'template-1',
        title: 'Digital Detox Challenge',
        description: 'Reduce screen time and increase mindful activities',
        category: 'wellness',
        suggestedDuration: 30,
        difficulty: 'medium',
        milestones: ['Week 1: Reduce by 25%', 'Week 2: Reduce by 50%', 'Week 3: Establish new habits', 'Week 4: Maintain balance'],
        tips: ['Set app time limits', 'Create phone-free zones', 'Find alternative activities'],
        popularityScore: 92,
        successRate: 78
      },
      {
        id: 'template-2',
        title: 'Learning a New Skill',
        description: 'Master a new skill through consistent daily practice',
        category: 'learning',
        suggestedDuration: 90,
        difficulty: 'medium',
        milestones: ['Week 1-2: Basics', 'Week 3-6: Intermediate', 'Week 7-10: Advanced', 'Week 11-13: Mastery'],
        tips: ['Practice daily for 30 minutes', 'Join online communities', 'Track progress visually'],
        popularityScore: 88,
        successRate: 71
      }
    ];

    setTemplates(mockTemplates);
  };

  const createSharedGoal = () => {
    const goal: SharedGoal = {
      id: `goal-${Date.now()}`,
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      targetValue: newGoal.targetValue,
      currentValue: 0,
      unit: newGoal.unit,
      deadline: new Date(newGoal.deadline),
      privacy: newGoal.privacy,
      collaborators: [],
      creator: 'current-user',
      createdAt: new Date(),
      progress: 0,
      milestones: [],
      supportMessages: [],
      isCompleted: false,
      difficulty: newGoal.difficulty,
      tags: newGoal.tags,
      challengeType: 'individual'
    };

    setSharedGoals(prev => [...prev, goal]);
    setShowCreateModal(false);
    
    // Reset form
    setNewGoal({
      title: '',
      description: '',
      category: 'health',
      targetValue: 0,
      unit: '',
      deadline: '',
      privacy: 'friends',
      collaborators: [],
      difficulty: 'medium',
      tags: []
    });
  };

  const sendSupportMessage = (goalId: string) => {
    if (!supportMessage.trim()) return;

    const message: SupportMessage = {
      id: `msg-${Date.now()}`,
      from: 'current-user',
      content: supportMessage,
      type: 'encouragement',
      timestamp: new Date(),
      reactions: []
    };

    setSharedGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, supportMessages: [...goal.supportMessages, message] }
        : goal
    ));

    setSupportMessage('');
    setShowSupportModal(false);
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge =>
      challenge.id === challengeId
        ? { ...challenge, participants: challenge.participants + 1 }
        : challenge
    ));
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health': return <Heart className="w-5 h-5" />;
      case 'productivity': return <Zap className="w-5 h-5" />;
      case 'learning': return <Award className="w-5 h-5" />;
      case 'wellness': return <Sparkles className="w-5 h-5" />;
      case 'activism': return <Users className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-orange-600 bg-orange-100';
      case 'expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPrivacyIcon = (privacy: string) => {
    switch (privacy) {
      case 'public': return <Globe className="w-4 h-4" />;
      case 'friends': return <Users className="w-4 h-4" />;
      case 'private': return <Lock className="w-4 h-4" />;
      default: return <Lock className="w-4 h-4" />;
    }
  };

  const formatTimeRemaining = (deadline: Date): string => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Expired';
    if (days === 0) return 'Today';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 shadow-lg"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Users2 className="w-10 h-10 text-blue-600" />
          </motion.div>
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Collaborative Goals</h1>
            <p className="text-xl text-gray-600">Achieve more together with peer support and community challenges</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/70 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Active Goals</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">{sharedGoals.filter(g => !g.isCompleted).length}</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Collaborators</span>
            </div>
            <div className="text-2xl font-bold text-green-700">
              {sharedGoals.reduce((sum, goal) => sum + goal.collaborators.length, 0)}
            </div>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-600" />
              <span className="text-sm text-gray-600">Completed</span>
            </div>
            <div className="text-2xl font-bold text-yellow-700">{sharedGoals.filter(g => g.isCompleted).length}</div>
          </div>
          <div className="bg-white/70 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">Challenges</span>
            </div>
            <div className="text-2xl font-bold text-red-700">{challenges.filter(c => c.isActive).length}</div>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-2 bg-white rounded-xl p-3 shadow-lg">
        {[
          { id: 'my-goals', label: 'My Goals', icon: Target },
          { id: 'community', label: 'Community Goals', icon: Globe },
          { id: 'challenges', label: 'Challenges', icon: Trophy },
          { id: 'templates', label: 'Templates', icon: Star }
        ].map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            onClick={() => setActiveTab(id as any)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeTab === id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </motion.button>
        ))}

        <motion.button
          onClick={() => setShowCreateModal(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
          <Plus className="w-4 h-4" />
          Create Goal
        </motion.button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'my-goals' && (
          <motion.div
            key="my-goals"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {sharedGoals.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <Target className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No goals yet</h3>
                <p className="text-gray-600 mb-6">Create your first collaborative goal to get started</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Your First Goal
                </button>
              </div>
            ) : (
              sharedGoals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-100">
                        {getCategoryIcon(goal.category)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">{goal.title}</h3>
                        <p className="text-gray-600 mt-1">{goal.description}</p>
                        <div className="flex items-center gap-4 mt-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(goal.difficulty)}`}>
                            {goal.difficulty}
                          </span>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            {getPrivacyIcon(goal.privacy)}
                            <span className="capitalize">{goal.privacy}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {formatTimeRemaining(goal.deadline)}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title="Goal options"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {goal.currentValue.toLocaleString()} / {goal.targetValue.toLocaleString()} {goal.unit}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(goal.currentValue / goal.targetValue) * 100}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <div className="text-center mt-1">
                      <span className="text-lg font-bold text-blue-600">{goal.progress}% Complete</span>
                    </div>
                  </div>

                  {/* Collaborators */}
                  {goal.collaborators.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Team Members</div>
                      <div className="flex items-center gap-2">
                        {goal.collaborators.slice(0, 3).map((collaborator) => (
                          <div key={collaborator.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                              {collaborator.name.charAt(0)}
                            </div>
                            <span className="text-sm text-gray-700">{collaborator.name}</span>
                            <div className="flex items-center">
                              {Array.from({ length: collaborator.supportLevel }).map((_, starIndex) => (
                                <Star key={`star-${collaborator.id}-${starIndex}`} className="w-3 h-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        ))}
                        {goal.collaborators.length > 3 && (
                          <span className="text-sm text-gray-500">+{goal.collaborators.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Recent Support */}
                  {goal.supportMessages.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">Recent Support</div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Heart className="w-4 h-4 text-red-500 mt-1" />
                          <div>
                            <div className="text-sm text-gray-700">{goal.supportMessages[goal.supportMessages.length - 1].content}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              from {goal.supportMessages[goal.supportMessages.length - 1].from}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedGoal(goal);
                        setShowSupportModal(true);
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Send Support
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                      <UserPlus className="w-4 h-4" />
                      Invite Friend
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                      <Share2 className="w-4 h-4" />
                      Share
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}

        {activeTab === 'community' && (
          <motion.div
            key="community"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Trending Community Goals</h3>
              
              {communityGoals.map((goal) => (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-4 last:mb-0 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                      {getCategoryIcon(goal.category)}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{goal.title}</h4>
                      <p className="text-sm text-gray-600">{goal.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          {goal.collaborators.length} participants
                        </span>
                        <span className="text-xs text-gray-500">{goal.progress}% complete</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Join Goal
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'challenges' && (
          <motion.div
            key="challenges"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            {challenges.map((challenge) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-xl flex items-center justify-center">
                      <Trophy className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{challenge.title}</h3>
                      <p className="text-gray-600 mt-1">{challenge.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(challenge.difficulty)}`}>
                          {challenge.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">
                          {challenge.participants} / {challenge.maxParticipants} participants
                        </span>
                        <span className="text-sm text-gray-500">
                          Ends {challenge.endDate.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => joinChallenge(challenge.id)}
                    className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all shadow-lg"
                  >
                    Join Challenge
                  </button>
                </div>

                {/* Rewards */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Rewards</h4>
                  <div className="flex gap-2">
                    {challenge.rewards.map((reward) => (
                      <div key={`${challenge.id}-${reward.name}`} className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-2 rounded-lg">
                        <span>{reward.icon}</span>
                        <span className="text-sm">{reward.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leaderboard */}
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Leaderboard</h4>
                  <div className="space-y-2">
                    {challenge.leaderboard.slice(0, 3).map((leader) => (
                      <div key={leader.userId} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            {leader.rank}
                          </div>
                          <span className="font-medium text-gray-800">{leader.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{leader.progress} points</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'templates' && (
          <motion.div
            key="templates"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {templates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{template.title}</h3>
                    <p className="text-gray-600 mt-1">{template.description}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{template.popularityScore}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Success Rate</span>
                    <span className="text-sm font-semibold text-green-600">{template.successRate}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Duration</span>
                    <span className="text-sm font-semibold text-gray-800">{template.suggestedDuration} days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Difficulty</span>
                    <span className={`text-sm px-2 py-1 rounded-full ${getDifficultyColor(template.difficulty)}`}>
                      {template.difficulty}
                    </span>
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Use Template
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Goal Modal */}
      <AnimatePresence>
        {showCreateModal && (
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
              className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Create Shared Goal</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="goal-title" className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
                  <input
                    id="goal-title"
                    type="text"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your goal title"
                  />
                </div>

                <div>
                  <label htmlFor="goal-description" className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    id="goal-description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe your goal"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="goal-category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      id="goal-category"
                      value={newGoal.category}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, category: e.target.value as any }))}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="health">Health</option>
                      <option value="productivity">Productivity</option>
                      <option value="learning">Learning</option>
                      <option value="wellness">Wellness</option>
                      <option value="activism">Activism</option>
                      <option value="personal">Personal</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="goal-difficulty" className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select
                      id="goal-difficulty"
                      value={newGoal.difficulty}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, difficulty: e.target.value as any }))}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                      <option value="expert">Expert</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="goal-target" className="block text-sm font-medium text-gray-700 mb-2">Target Value</label>
                    <input
                      id="goal-target"
                      type="number"
                      value={newGoal.targetValue}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, targetValue: parseInt(e.target.value) }))}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="100"
                    />
                  </div>

                  <div>
                    <label htmlFor="goal-unit" className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                    <input
                      id="goal-unit"
                      type="text"
                      value={newGoal.unit}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="steps, hours, books"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="goal-deadline" className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                  <input
                    id="goal-deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="goal-privacy" className="block text-sm font-medium text-gray-700 mb-2">Privacy</label>
                  <select
                    id="goal-privacy"
                    value={newGoal.privacy}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, privacy: e.target.value as any }))}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="private">Private (Only you)</option>
                    <option value="friends">Friends (People you invite)</option>
                    <option value="public">Public (Anyone can join)</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={createSharedGoal}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Create Goal
                </button>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Support Message Modal */}
      <AnimatePresence>
        {showSupportModal && selectedGoal && (
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
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Send Support Message</h3>
              <p className="text-gray-600 mb-4">Send encouragement to: <strong>{selectedGoal.title}</strong></p>
              
              <textarea
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                rows={4}
                placeholder="Write an encouraging message..."
              />

              <div className="flex gap-3">
                <button
                  onClick={() => sendSupportMessage(selectedGoal.id)}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4" />
                  Send Support
                </button>
                <button
                  onClick={() => setShowSupportModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CollaborativeGoalTracking;

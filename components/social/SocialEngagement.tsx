'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  ThumbsUp, 
  Share2, 
  BookOpen, 
  Award,
  Clock,
  Heart,
  Shield,
  Zap
} from 'lucide-react';

interface EngagementPost {
  id: string;
  type: 'achievement' | 'question' | 'resource' | 'check-in' | 'celebration';
  author: {
    id: string;
    name: string;
    avatar: string;
    neurodiversityType: string[];
    safetyBadge: 'verified' | 'trusted' | 'new';
  };
  content: string;
  timestamp: Date;
  reactions: {
    likes: number;
    hearts: number;
    celebrations: number;
  };
  responses: number;
  tags: string[];
  supportLevel: 'peer' | 'mentor' | 'professional';
  isAnonymous: boolean;
}

interface InteractionMetrics {
  engagementStreak: number;
  helpfulResponses: number;
  supportGiven: number;
  safeSpaceContribution: number;
}

export const SocialEngagement: React.FC = () => {
  const [posts, setPosts] = useState<EngagementPost[]>([]);
  const [userMetrics] = useState<InteractionMetrics>({
    engagementStreak: 7,
    helpfulResponses: 23,
    supportGiven: 45,
    safeSpaceContribution: 89
  });

  const [filterType, setFilterType] = useState<'all' | 'achievement' | 'question' | 'resource' | 'check-in'>('all');

  useEffect(() => {
    // Simulated posts data
    const mockPosts: EngagementPost[] = [
      {
        id: '1',
        type: 'achievement',
        author: {
          id: 'u1',
          name: 'Alex M.',
          avatar: '🌟',
          neurodiversityType: ['ADHD'],
          safetyBadge: 'verified'
        },
        content: "Just finished my first full week of consistent morning routine! 🎉 It took 3 months to find what works for my ADHD brain, but celebrating small wins feels amazing.",
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 min ago
        reactions: { likes: 24, hearts: 12, celebrations: 18 },
        responses: 8,
        tags: ['morning-routine', 'adhd-wins', 'consistency'],
        supportLevel: 'peer',
        isAnonymous: false
      },
      {
        id: '2',
        type: 'question',
        author: {
          id: 'u2',
          name: 'Anonymous Seeker',
          avatar: '💭',
          neurodiversityType: ['Autism'],
          safetyBadge: 'new'
        },
        content: "How do you handle social exhaustion after work? I love my job but feel completely drained by evening. Looking for gentle strategies that actually work.",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        reactions: { likes: 15, hearts: 22, celebrations: 3 },
        responses: 14,
        tags: ['social-battery', 'autism-support', 'self-care'],
        supportLevel: 'peer',
        isAnonymous: true
      },
      {
        id: '3',
        type: 'resource',
        author: {
          id: 'u3',
          name: 'Dr. Sarah Chen',
          avatar: '👩‍⚕️',
          neurodiversityType: ['Professional Ally'],
          safetyBadge: 'verified'
        },
        content: "New research on workplace accommodations for neurodivergent employees. This study shows simple changes can improve productivity by 40%. Link to free PDF in comments 📚",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        reactions: { likes: 67, hearts: 28, celebrations: 15 },
        responses: 23,
        tags: ['workplace', 'research', 'accommodations'],
        supportLevel: 'professional',
        isAnonymous: false
      }
    ];
    
    setPosts(mockPosts);
  }, []);

  const getPostIcon = (type: EngagementPost['type']) => {
    switch (type) {
      case 'achievement': return Award;
      case 'question': return MessageCircle;
      case 'resource': return BookOpen;
      case 'check-in': return Heart;
      case 'celebration': return Zap;
      default: return MessageCircle;
    }
  };

  const getPostGradient = (type: EngagementPost['type']) => {
    switch (type) {
      case 'achievement': return 'from-yellow-400 to-orange-500';
      case 'question': return 'from-blue-400 to-indigo-500';
      case 'resource': return 'from-green-400 to-emerald-500';
      case 'check-in': return 'from-pink-400 to-rose-500';
      case 'celebration': return 'from-purple-400 to-violet-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getSafetyBadgeColor = (badge: 'verified' | 'trusted' | 'new') => {
    switch (badge) {
      case 'verified': return 'bg-green-500';
      case 'trusted': return 'bg-blue-500';
      case 'new': return 'bg-yellow-500';
    }
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const filteredPosts = filterType === 'all' 
    ? posts 
    : posts.filter(post => post.type === filterType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-pink-50 p-4">
      {/* Header with User Metrics */}
      <motion.div 
        className="mb-8 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Community Hub
          </h1>
          <p className="text-gray-600">
            Connect, share, and grow together in our supportive community
          </p>
        </div>

        {/* User Engagement Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-orange-500">{userMetrics.engagementStreak}</div>
            <div className="text-sm text-gray-600">Day Streak</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-blue-500">{userMetrics.helpfulResponses}</div>
            <div className="text-sm text-gray-600">Helpful Posts</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-green-500">{userMetrics.supportGiven}</div>
            <div className="text-sm text-gray-600">Support Given</div>
          </div>
          <div className="bg-white rounded-xl p-4 text-center shadow-lg">
            <div className="text-2xl font-bold text-purple-500">{userMetrics.safeSpaceContribution}%</div>
            <div className="text-sm text-gray-600">Safe Space</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {(['all', 'achievement', 'question', 'resource', 'check-in'] as const).map((filter) => (
            <motion.button
              key={filter}
              onClick={() => setFilterType(filter)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all
                ${filterType === filter 
                  ? 'bg-indigo-500 text-white shadow-lg' 
                  : 'bg-white text-gray-600 hover:bg-indigo-50'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1).replace('-', ' ')}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Posts Feed */}
      <div className="max-w-2xl mx-auto space-y-6">
        <AnimatePresence>
          {filteredPosts.map((post, index) => {
            const IconComponent = getPostIcon(post.type);
            
            return (
              <motion.article
                key={post.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                {/* Post Header */}
                <div className={`h-2 bg-gradient-to-r ${getPostGradient(post.type)}`} />
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <div className="text-2xl">{post.author.avatar}</div>
                        <div className={`
                          absolute -bottom-1 -right-1 w-4 h-4 rounded-full
                          ${getSafetyBadgeColor(post.author.safetyBadge)}
                          flex items-center justify-center
                        `}>
                          <Shield className="w-2 h-2 text-white" />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">
                            {post.author.name}
                          </span>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {post.author.neurodiversityType.join(', ')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(post.timestamp)}</span>
                          <IconComponent className="w-3 h-3" />
                          <span className="capitalize">{post.type}</span>
                        </div>
                      </div>
                    </div>
                    
                    {post.supportLevel === 'professional' && (
                      <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                        Professional
                      </div>
                    )}
                  </div>

                  {/* Post Content */}
                  <p className="text-gray-800 mb-4 leading-relaxed">
                    {post.content}
                  </p>

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map(tag => (
                        <span 
                          key={tag}
                          className="bg-indigo-50 text-indigo-600 px-2 py-1 rounded-full text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Engagement Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-6">
                      <motion.button
                        className="flex items-center space-x-1 text-gray-500 hover:text-blue-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span className="text-sm">{post.reactions.likes}</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-1 text-gray-500 hover:text-red-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{post.reactions.hearts}</span>
                      </motion.button>
                      
                      <motion.button
                        className="flex items-center space-x-1 text-gray-500 hover:text-indigo-500"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm">{post.responses}</span>
                      </motion.button>
                    </div>
                    
                    <motion.button
                      className="flex items-center space-x-1 text-gray-500 hover:text-green-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="text-sm">Share</span>
                    </motion.button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Floating Action to Create Post */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    </div>
  );
};

export default SocialEngagement;

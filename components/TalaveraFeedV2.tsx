'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TalaveraCard from './TalaveraCard';
import VideoUploadStudio from './VideoUploadStudio';
import { 
  Plus, 
  Search, 
  TrendingUp, 
  Users, 
  Trophy,
  Upload,
  X
} from 'lucide-react';

interface TalaveraPost {
  id: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    isVerified: boolean;
    isFollowing: boolean;
    badges: ('mundane-master' | 'speed-demon' | 'creativity-king' | 'consistency-champion')[];
  };
  content: {
    videoUrl: string;
    thumbnailUrl: string;
    caption: string;
    duration: number;
    aspectRatio: '9:16' | '1:1' | '16:9';
  };
  audio?: {
    trackName: string;
    artistName: string;
    audioUrl: string;
    isOriginal: boolean;
  };
  tags: string[];
  challengeData?: {
    challengeId: string;
    challengeName: string;
    category: 'cleaning' | 'cooking' | 'organizing' | 'self-care' | 'productivity' | 'fitness';
    timeLimit?: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'insane';
    points: number;
  };
  engagementMetrics: {
    likes: number;
    shares: number;
    comments: number;
    views: number;
    isLiked: boolean;
    isShared: boolean;
    isSaved: boolean;
  };
  timestamp: string;
  isReported: boolean;
  visibility: 'public' | 'friends' | 'private';
  location?: string;
}

// Seed content for initial feed population
const seedPosts: TalaveraPost[] = [
  {
    id: 'seed-1',
    author: {
      id: 'listo-team',
      username: 'listo_official',
      displayName: 'LISTO Team',
      avatar: '/user.png',
      isVerified: true,
      isFollowing: false,
      badges: ['mundane-master', 'creativity-king']
    },
    content: {
      videoUrl: 'placeholder-video-1',
      thumbnailUrl: '/Digital tools and devices.avif',
      caption: 'Welcome to Talavera! 🎉 Your new favorite place for adulting wins and creative challenges. Share your mundane task victories! #AdultingWins #TalaveraLaunch',
      duration: 15,
      aspectRatio: '9:16'
    },
    tags: ['welcome', 'adulting', 'productivity', 'launch'],
    challengeData: {
      challengeId: 'welcome-challenge',
      challengeName: 'First Post Challenge',
      category: 'productivity',
      difficulty: 'easy',
      points: 100
    },
    engagementMetrics: {
      likes: 847,
      shares: 142,
      comments: 89,
      views: 15420,
      isLiked: false,
      isShared: false,
      isSaved: false
    },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isReported: false,
    visibility: 'public',
    location: 'LISTO HQ'
  },
  {
    id: 'seed-2',
    author: {
      id: 'demo-user-1',
      username: 'speedyclean_sarah',
      displayName: 'Sarah M.',
      avatar: '/user.png',
      isVerified: false,
      isFollowing: false,
      badges: ['speed-demon', 'consistency-champion']
    },
    content: {
      videoUrl: 'placeholder-video-2',
      thumbnailUrl: '/Work Coffee.avif',
      caption: '60-second kitchen cleanup! ⏰ Who says adulting has to be boring? Challenge accepted! #SpeedCleaning #MundaneTaskLeague #AdultingLife',
      duration: 62,
      aspectRatio: '9:16'
    },
    tags: ['cleaning', 'kitchen', 'speed', 'challenge'],
    challengeData: {
      challengeId: 'speed-clean-60',
      challengeName: '60-Second Kitchen Cleanup',
      category: 'cleaning',
      timeLimit: 60,
      difficulty: 'medium',
      points: 250
    },
    engagementMetrics: {
      likes: 523,
      shares: 87,
      comments: 34,
      views: 8934,
      isLiked: false,
      isShared: false,
      isSaved: false
    },
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    isReported: false,
    visibility: 'public'
  },
  {
    id: 'seed-3',
    author: {
      id: 'demo-user-2',
      username: 'mindful_mike',
      displayName: 'Mike Chen',
      avatar: '/user.png',
      isVerified: false,
      isFollowing: false,
      badges: ['mundane-master']
    },
    content: {
      videoUrl: 'placeholder-video-3',
      thumbnailUrl: '/Wellness.avif',
      caption: 'Making the bed mindfully 🧘‍♂️ Small wins, big impact. Every mundane task is a chance for mindfulness! #MindfulLiving #MundaneTasks #Wellness',
      duration: 45,
      aspectRatio: '9:16'
    },
    tags: ['mindfulness', 'morning', 'routine', 'wellness'],
    challengeData: {
      challengeId: 'mindful-bed-making',
      challengeName: 'Mindful Bed Making',
      category: 'self-care',
      difficulty: 'easy',
      points: 150
    },
    engagementMetrics: {
      likes: 392,
      shares: 56,
      comments: 23,
      views: 5672,
      isLiked: false,
      isShared: false,
      isSaved: false
    },
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    isReported: false,
    visibility: 'public'
  },
  {
    id: 'seed-4',
    author: {
      id: 'demo-user-3',
      username: 'creative_chef_alex',
      displayName: 'Alex Rodriguez',
      avatar: '/user.png',
      isVerified: false,
      isFollowing: false,
      badges: ['creativity-king', 'mundane-master']
    },
    content: {
      videoUrl: 'placeholder-video-4',
      thumbnailUrl: '/Salad.jpg',
      caption: '5-minute healthy meal prep! 🥗 Turning boring meal prep into a creative challenge. Who else loves efficient cooking? #MealPrep #HealthyEating #CookingHacks',
      duration: 78,
      aspectRatio: '9:16'
    },
    tags: ['cooking', 'meal-prep', 'healthy', 'efficiency'],
    challengeData: {
      challengeId: 'quick-meal-prep',
      challengeName: '5-Minute Healthy Meal',
      category: 'cooking',
      timeLimit: 300,
      difficulty: 'medium',
      points: 300
    },
    engagementMetrics: {
      likes: 678,
      shares: 134,
      comments: 67,
      views: 12340,
      isLiked: false,
      isShared: false,
      isSaved: false
    },
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    isReported: false,
    visibility: 'public'
  }
];

interface TalaveraFeedProps {
  className?: string;
}

const TalaveraFeed: React.FC<TalaveraFeedProps> = ({ className = '' }) => {
  const [posts, setPosts] = useState<TalaveraPost[]>(seedPosts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for auto-scroll
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleLike = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            engagementMetrics: {
              ...post.engagementMetrics,
              isLiked: !post.engagementMetrics.isLiked,
              likes: post.engagementMetrics.isLiked 
                ? post.engagementMetrics.likes - 1 
                : post.engagementMetrics.likes + 1
            }
          }
        : post
    ));
  }, []);

  const handleSave = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            engagementMetrics: {
              ...post.engagementMetrics,
              isSaved: !post.engagementMetrics.isSaved
            }
          }
        : post
    ));
  }, []);

  const handleShare = useCallback((postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      if (navigator.share) {
        navigator.share({
          title: 'Check out this amazing challenge!',
          text: post.content.caption,
          url: window.location.href
        });
      } else {
        navigator.clipboard.writeText(window.location.href);
        // Could add toast notification here
      }
      
      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? {
              ...p,
              engagementMetrics: {
                ...p.engagementMetrics,
                shares: p.engagementMetrics.shares + 1
              }
            }
          : p
      ));
    }
  }, [posts]);

  const handleComment = useCallback((postId: string) => {
    // Open comment modal or navigate to comments section
    console.log('Opening comments for post:', postId);
  }, []);

  const handleFollow = useCallback((userId: string) => {
    setPosts(prev => prev.map(post => 
      post.author.id === userId 
        ? {
            ...post,
            author: {
              ...post.author,
              isFollowing: !post.author.isFollowing
            }
          }
        : post
    ));
  }, []);

  const handleUpload = useCallback((newPost: Partial<TalaveraPost>) => {
    const post: TalaveraPost = {
      id: `user-${Date.now()}`,
      author: {
        id: 'current-user',
        username: 'you',
        displayName: 'Your Name',
        avatar: '/user.png',
        isVerified: false,
        isFollowing: false,
        badges: []
      },
      content: {
        videoUrl: newPost.content?.videoUrl || '',
        thumbnailUrl: newPost.content?.thumbnailUrl || '',
        caption: newPost.content?.caption || '',
        duration: newPost.content?.duration || 30,
        aspectRatio: '9:16'
      },
      tags: newPost.tags || [],
      challengeData: newPost.challengeData,
      engagementMetrics: {
        likes: 0,
        shares: 0,
        comments: 0,
        views: 0,
        isLiked: false,
        isShared: false,
        isSaved: false
      },
      timestamp: new Date().toISOString(),
      isReported: false,
      visibility: 'public'
    };

    setPosts(prev => [post, ...prev]);
    setShowUploadModal(false);
  }, []);

  // Filter posts based on search and filters
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.content.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'trending' && post.engagementMetrics.likes > 500) ||
      (selectedFilter === 'challenges' && post.challengeData) ||
      (post.challengeData?.category === selectedFilter);
    
    return matchesSearch && matchesFilter;
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (e.key === 'ArrowDown' && currentIndex < filteredPosts.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, filteredPosts.length]);

  return (
    <div className={`relative w-full h-screen bg-black overflow-hidden ${className}`}>
      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-sage-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            {['all', 'trending', 'challenges', 'cleaning', 'cooking'].map((filter) => (
              <motion.button
                key={filter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  selectedFilter === filter
                    ? 'bg-sage-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {filter === 'all' && <TrendingUp className="h-3 w-3 mr-1 inline" />}
                {filter === 'trending' && <TrendingUp className="h-3 w-3 mr-1 inline" />}
                {filter === 'challenges' && <Trophy className="h-3 w-3 mr-1 inline" />}
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Upload Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowUploadModal(true)}
          className="bg-sage-600 hover:bg-sage-700 text-white p-3 rounded-full shadow-lg transition-colors"
        >
          <Plus className="h-6 w-6" />
        </motion.button>
      </div>

      {/* Video Feed */}
      <div 
        ref={containerRef}
        className="w-full h-full snap-y snap-mandatory overflow-y-scroll scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {filteredPosts.map((post, index) => (
          <div
            key={post.id}
            className="w-full h-full snap-start relative"
          >
            <TalaveraCard
              post={post}
              isVisible={Math.abs(index - currentIndex) <= 1}
              onLike={handleLike}
              onSave={handleSave}
              onShare={handleShare}
              onComment={handleComment}
              onFollow={handleFollow}
              onChallengeJoin={(challengeId) => console.log('Joining challenge:', challengeId)}
            />
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-lg">Loading more content...</div>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          >
            <VideoUploadStudio
              onClose={() => setShowUploadModal(false)}
              onUpload={handleUpload}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default TalaveraFeed;

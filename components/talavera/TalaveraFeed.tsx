"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TalaveraCard from "../TalaveraCard";
import VideoUploadStudio from "./VideoUploadStudio";
import Button from "../Button";
import { Plus, Search, TrendingUp, Trophy, Zap, Target, Heart } from "lucide-react";

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
  engagementMetrics: {
    likes: number;
    shares: number;
    comments: number;
    views: number;
    isLiked: boolean;
    isShared: boolean;
    isSaved: boolean;
  };
  challengeData?: {
    challengeId: string;
    challengeName: string;
    category: 'cleaning' | 'cooking' | 'organizing' | 'self-care' | 'productivity' | 'fitness';
    timeLimit?: number;
    difficulty: 'easy' | 'medium' | 'hard' | 'insane';
    points: number;
  };
  timestamp: string;
  isReported: boolean;
  visibility: 'public' | 'private' | 'friends';
}

// Sample data for development
const seedPosts: TalaveraPost[] = [
  {
    id: '1',
    author: {
      id: 'user1',
      username: 'productivity_pro',
      displayName: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      isVerified: true,
      isFollowing: false,
      badges: ['mundane-master', 'consistency-champion']
    },
    content: {
      videoUrl: '/videos/productivity-hack.mp4',
      thumbnailUrl: '/thumbnails/productivity.jpg',
      caption: 'My morning routine that transformed my productivity 📈 #MorningRoutine #ProductivityHack',
      duration: 45,
      aspectRatio: '9:16'
    },
    audio: {
      trackName: 'Motivational Beat',
      artistName: 'Focus Sounds',
      audioUrl: '/audio/motivational.mp3',
      isOriginal: false
    },
    tags: ['productivity', 'morning-routine', 'self-improvement'],
    engagementMetrics: {
      likes: 1247,
      shares: 89,
      comments: 156,
      views: 5432,
      isLiked: false,
      isShared: false,
      isSaved: true
    },
    challengeData: {
      challengeId: 'prod-challenge-1',
      challengeName: 'Morning Routine Challenge',
      category: 'productivity',
      difficulty: 'medium',
      timeLimit: 30,
      points: 100
    },
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isReported: false,
    visibility: 'public'
  },
  {
    id: '2',
    author: {
      id: 'user2',
      username: 'wellness_warrior',
      displayName: 'Alex Martinez',
      avatar: '/avatars/alex.jpg',
      isVerified: false,
      isFollowing: true,
      badges: ['speed-demon']
    },
    content: {
      videoUrl: '/videos/meditation.mp4',
      thumbnailUrl: '/thumbnails/meditation.jpg',
      caption: '5-minute meditation that changed my life 🧘‍♀️ Who else needs this inner peace?',
      duration: 32,
      aspectRatio: '9:16'
    },
    tags: ['meditation', 'wellness', 'mental-health'],
    engagementMetrics: {
      likes: 892,
      shares: 234,
      comments: 67,
      views: 3210,
      isLiked: true,
      isShared: false,
      isSaved: false
    },
    timestamp: new Date(Date.now() - 7200000).toISOString(),
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
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLike = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            engagementMetrics: {
              ...post.engagementMetrics,
              likes: post.engagementMetrics.isLiked 
                ? post.engagementMetrics.likes - 1 
                : post.engagementMetrics.likes + 1,
              isLiked: !post.engagementMetrics.isLiked
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
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            engagementMetrics: {
              ...post.engagementMetrics,
              shares: post.engagementMetrics.isShared 
                ? post.engagementMetrics.shares - 1 
                : post.engagementMetrics.shares + 1,
              isShared: !post.engagementMetrics.isShared
            }
          }
        : post
    ));
  }, []);

  const handleComment = useCallback((postId: string) => {
    console.log('Comment on post:', postId);
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
    setIsLoading(true);
    
    // Simulate upload delay
    setTimeout(() => {
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
      setIsLoading(false);
    }, 1000); // Simulate 1 second upload time
  }, []);

  // Filter posts based on search and filters
  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.content.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'trending' && post.engagementMetrics.likes > 500) ||
      (selectedFilter === 'challenges' && post.challengeData) ||
      (post.challengeData?.category === selectedFilter) ||
      post.tags.includes(selectedFilter);
    
    return matchesSearch && matchesFilter;
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCurrentIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCurrentIndex(prev => Math.min(filteredPosts.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredPosts.length]);

  const filterConfig = [
    { 
      key: 'all', 
      label: 'For You', 
      icon: Heart, 
      description: 'Personalized content based on your interests' 
    },
    { 
      key: 'trending', 
      label: 'Trending', 
      icon: TrendingUp, 
      description: 'Most popular videos right now' 
    },
    { 
      key: 'challenges', 
      label: 'Challenges', 
      icon: Trophy, 
      description: 'Join community challenges and competitions' 
    },
    { 
      key: 'productivity', 
      label: 'Focus', 
      icon: Target, 
      description: 'Productivity tips and focus techniques' 
    },
    { 
      key: 'wellness', 
      label: 'Wellness', 
      icon: Zap, 
      description: 'Health, fitness, and mental wellbeing' 
    }
  ];

  return (
    <div className={`w-full h-full bg-black relative ${className}`}>
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/90 via-black/60 to-transparent p-3 sm:p-4 md:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide">Talavera</h1>
          <Button
            onClick={() => setShowUploadModal(true)}
            variant="animated"
            theme="purple"
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-3 sm:px-4 py-2"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Create</span>
            <span className="sm:hidden">+</span>
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4 sm:mb-6">
          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Discover amazing content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2 sm:py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl sm:rounded-2xl text-sm sm:text-base text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 sm:gap-3 overflow-x-auto scrollbar-hide pb-2">
          {filterConfig.map((filter) => {
            const IconComponent = filter.icon;
            const isSelected = selectedFilter === filter.key;
            
            return (
              <motion.div
                key={filter.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setSelectedFilter(filter.key)}
                  variant="animated"
                  theme={isSelected ? "purple" : undefined}
                  className={`flex-shrink-0 flex items-center gap-1 sm:gap-2 text-xs px-2 sm:px-3 py-1 sm:py-2 ${
                    isSelected ? '' : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                  style={!isSelected ? {
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#d1d5db'
                  } : undefined}
                >
                  <IconComponent className="h-3 w-3" />
                  <span className="hidden sm:inline">{filter.label}</span>
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Filter Description */}
        <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-gray-400 hidden md:block">
          {filterConfig.find(f => f.key === selectedFilter)?.description || ''}
        </div>
      </div>

      {/* Video Feed */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto scrollbar-hide pt-32 sm:pt-40 md:pt-52 pb-16 sm:pb-20"
      >
        {filteredPosts.map((post, index) => (
          <TalaveraCard
            key={post.id}
            post={post}
            isVisible={index === currentIndex}
            onLike={handleLike}
            onSave={handleSave}
            onShare={handleShare}
            onComment={handleComment}
            onFollow={handleFollow}
          />
        ))}

        {/* Empty State */}
        {filteredPosts.length === 0 && !isLoading && (
          <div className="w-full h-full flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="text-center max-w-sm mx-auto">
              <div className="text-gray-400 text-4xl sm:text-5xl md:text-6xl mb-3 sm:mb-4">🎬</div>
              <h3 className="text-white text-lg sm:text-xl font-semibold mb-2">
                No videos found
              </h3>
              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
                {searchQuery 
                  ? `No results for "${searchQuery}"`
                  : `No ${filterConfig.find(f => f.key === selectedFilter)?.label.toLowerCase()} content yet`
                }
              </p>
              <Button
                onClick={() => setShowUploadModal(true)}
                variant="animated"
                theme="purple"
                className="mx-auto text-sm sm:text-base"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                Create First Video
              </Button>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-white text-base sm:text-lg">Loading more content...</div>
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
              isOpen={true}
              onClose={() => setShowUploadModal(false)}
              onPublish={(videoData) => {
                handleUpload({
                  content: {
                    videoUrl: URL.createObjectURL(videoData.file),
                    thumbnailUrl: '',
                    caption: videoData.caption,
                    duration: 30,
                    aspectRatio: '9:16'
                  },
                  tags: videoData.tags
                });
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TalaveraFeed;

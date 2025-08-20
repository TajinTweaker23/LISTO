'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Volume2,
  VolumeX,
  MoreVertical,
  Flag,
  UserPlus,
  Music,
  Sparkles,
  Trophy,
  Timer,
  Target
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

interface TalaveraCardProps {
  post: TalaveraPost;
  isVisible: boolean;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onShare: (postId: string) => void;
  onComment: (postId: string) => void;
  onFollow: (userId: string) => void;
  onChallengeJoin?: (challengeId: string) => void;
}

const TalaveraCard: React.FC<TalaveraCardProps> = ({
  post,
  isVisible,
  onLike,
  onSave,
  onShare,
  onComment,
  onFollow,
  onChallengeJoin
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play when visible and pause when not
  useEffect(() => {
    if (videoRef.current) {
      if (isVisible && !isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      } else if (!isVisible && isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  }, [isVisible]);

  // Update progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const progress = (video.currentTime / video.duration) * 100;
      setProgress(progress);
      setCurrentTime(video.currentTime);
    };

    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', onEnded);
    };
  }, []);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'mundane-master': return Trophy;
      case 'speed-demon': return Timer;
      case 'creativity-king': return Sparkles;
      case 'consistency-champion': return Target;
      default: return Trophy;
    }
  };

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'mundane-master': return 'text-yellow-500';
      case 'speed-demon': return 'text-red-500';
      case 'creativity-king': return 'text-purple-500';
      case 'consistency-champion': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  const getChallengeEmoji = (category: string) => {
    switch (category) {
      case 'cleaning': return '🧽';
      case 'cooking': return '👨‍🍳';
      case 'organizing': return '📦';
      case 'self-care': return '🧘‍♀️';
      case 'productivity': return '⚡';
      case 'fitness': return '💪';
      default: return '🎯';
    }
  };

  return (
    <motion.div
      className="relative w-full h-screen bg-black rounded-none sm:rounded-xl md:rounded-2xl overflow-hidden shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      {/* Video Container */}
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          src={post.content.videoUrl}
          poster={post.content.thumbnailUrl}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          onClick={togglePlayPause}
          aria-label={`Video by ${post.author.displayName}: ${post.content.caption}`}
        >
          <track kind="captions" src="" srcLang="en" label="English captions" />
        </video>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div 
            className="h-full bg-white transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Play/Pause Overlay */}
        <AnimatePresence>
          {!isPlaying && (
            <motion.button
              className="absolute inset-0 flex items-center justify-center bg-black/20"
              onClick={togglePlayPause}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Play className="w-16 h-16 text-white" fill="white" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Audio Track Info */}
        {post.audio && (
          <motion.div
            className="absolute bottom-20 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Music className="w-4 h-4 text-white" />
            <div className="text-white text-sm">
              <div className="font-medium">{post.audio.trackName}</div>
              <div className="text-xs opacity-70">{post.audio.artistName}</div>
            </div>
            {post.audio.isOriginal && (
              <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                Original
              </span>
            )}
          </motion.div>
        )}

        {/* Challenge Banner */}
        {post.challengeData && (
          <motion.div
            className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl p-2 sm:p-3 text-white max-w-[calc(100%-120px)] sm:max-w-[calc(100%-150px)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <span className="text-sm sm:text-lg">{getChallengeEmoji(post.challengeData.category)}</span>
              <span className="font-bold text-xs sm:text-sm truncate">
                {post.challengeData.challengeName}
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs">
              <span className={`px-1 sm:px-2 py-1 rounded-full bg-white/20 text-xs`}>
                {post.challengeData.difficulty.toUpperCase()}
              </span>
              {Boolean(post.challengeData?.timeLimit) && (
                <span className="flex items-center gap-1">
                  <Timer className="w-2 h-2 sm:w-3 sm:h-3" />
                  {post.challengeData.timeLimit}s
                </span>
              )}
              <span className="flex items-center gap-1">
                <Trophy className="w-2 h-2 sm:w-3 sm:h-3" />
                {post.challengeData.points}pts
              </span>
            </div>
          </motion.div>
        )}

        {/* Controls */}
        <div className="absolute top-2 sm:top-4 right-2 sm:right-4 flex flex-col gap-1 sm:gap-2">
          <motion.button
            onClick={toggleMute}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            whileTap={{ scale: 0.9 }}
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </motion.button>

          <motion.button
            onClick={() => setShowMenu(!showMenu)}
            className="w-8 h-8 sm:w-10 sm:h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
            whileTap={{ scale: 0.9 }}
          >
            <MoreVertical className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          {/* Menu Dropdown */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                className="bg-black/80 backdrop-blur-sm rounded-xl p-2 text-white text-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <button className="flex items-center gap-2 w-full p-2 hover:bg-white/10 rounded">
                  <Flag className="w-4 h-4" />
                  Report
                </button>
                <button className="flex items-center gap-2 w-full p-2 hover:bg-white/10 rounded">
                  <UserPlus className="w-4 h-4" />
                  Not Interested
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-2 sm:right-4 bottom-16 sm:bottom-24 flex flex-col items-center gap-3 sm:gap-4">
          {/* Author Avatar with Follow Button */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={post.author.avatar}
              alt={post.author.displayName}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white"
            />
            {post.author.isVerified && (
              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
            {!post.author.isFollowing && (
              <motion.button
                onClick={() => onFollow(post.author.id)}
                className="absolute -bottom-1 sm:-bottom-2 left-1/2 transform -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs"
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            )}
          </motion.div>

          {/* Author Badges */}
          {post.author.badges.length > 0 && (
            <div className="flex flex-col gap-1">
              {post.author.badges.map((badge) => {
                const BadgeIcon = getBadgeIcon(badge);
                return (
                  <motion.div
                    key={badge}
                    className={`w-6 h-6 sm:w-8 sm:h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center ${getBadgeColor(badge)}`}
                    whileHover={{ scale: 1.1 }}
                    title={badge.replace('-', ' ')}
                  >
                    <BadgeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Like Button */}
          <motion.button
            onClick={() => onLike(post.id)}
            className="flex flex-col items-center"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                post.engagementMetrics.isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-black/50 backdrop-blur-sm text-white'
              }`}
              whileHover={{ scale: 1.1 }}
            >
              <Heart 
                className="w-5 h-5 sm:w-6 sm:h-6" 
                fill={post.engagementMetrics.isLiked ? 'currentColor' : 'none'} 
              />
            </motion.div>
            <span className="text-white text-xs mt-1">
              {post.engagementMetrics.likes > 1000 
                ? `${(post.engagementMetrics.likes / 1000).toFixed(1)}K` 
                : post.engagementMetrics.likes
              }
            </span>
          </motion.button>

          {/* Comment Button */}
          <motion.button
            onClick={() => onComment(post.id)}
            className="flex flex-col items-center"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
              whileHover={{ scale: 1.1 }}
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
            <span className="text-white text-xs mt-1">
              {post.engagementMetrics.comments > 1000 
                ? `${(post.engagementMetrics.comments / 1000).toFixed(1)}K` 
                : post.engagementMetrics.comments
              }
            </span>
          </motion.button>

          {/* Share Button */}
          <motion.button
            onClick={() => onShare(post.id)}
            className="flex flex-col items-center"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white"
              whileHover={{ scale: 1.1 }}
            >
              <Share2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
            <span className="text-white text-xs mt-1">
              {post.engagementMetrics.shares > 1000 
                ? `${(post.engagementMetrics.shares / 1000).toFixed(1)}K` 
                : post.engagementMetrics.shares
              }
            </span>
          </motion.button>

          {/* Save Button */}
          <motion.button
            onClick={() => onSave(post.id)}
            className="flex flex-col items-center"
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${
                post.engagementMetrics.isSaved 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-black/50 backdrop-blur-sm text-white'
              }`}
              whileHover={{ scale: 1.1 }}
            >
              <Bookmark 
                className="w-5 h-5 sm:w-6 sm:h-6" 
                fill={post.engagementMetrics.isSaved ? 'currentColor' : 'none'} 
              />
            </motion.div>
          </motion.button>

          {/* Join Challenge Button */}
          {post.challengeData && onChallengeJoin && (
            <motion.button
              onClick={() => onChallengeJoin(post.challengeData?.challengeId || '')}
              className="flex flex-col items-center"
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white"
                whileHover={{ scale: 1.1 }}
              >
                <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
              <span className="text-white text-xs mt-1">Join</span>
            </motion.button>
          )}
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-16 sm:right-20 md:right-24 text-white">
          <div className="mb-1 sm:mb-2">
            <div className="flex items-center gap-1 sm:gap-2 mb-1">
              <span className="font-bold text-sm sm:text-lg truncate">@{post.author.username}</span>
              {post.author.isVerified && (
                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
            </div>
            <p className="text-xs sm:text-sm opacity-90 line-clamp-2 pr-2">
              {post.content.caption}
            </p>
          </div>

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-1 sm:mb-2">
              {post.tags.slice(0, window.innerWidth < 640 ? 2 : 3).map((tag) => (
                <span
                  key={tag}
                  className="bg-black/30 backdrop-blur-sm rounded-full px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > (window.innerWidth < 640 ? 2 : 3) && (
                <span className="text-xs opacity-70">
                  +{post.tags.length - (window.innerWidth < 640 ? 2 : 3)} more
                </span>
              )}
            </div>
          )}

          {/* Video Info */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs opacity-70">
            <span className="whitespace-nowrap">{formatTime(currentTime)} / {formatTime(post.content.duration)}</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">
              {(() => {
                const views = post.engagementMetrics.views;
                if (views > 1000000) {
                  return `${(views / 1000000).toFixed(1)}M views`;
                } else if (views > 1000) {
                  return `${(views / 1000).toFixed(1)}K views`;
                } else {
                  return `${views} views`;
                }
              })()}
            </span>
            {post.location && (
              <>
                <span className="hidden md:inline">•</span>
                <span className="hidden md:inline truncate">{post.location}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TalaveraCard;

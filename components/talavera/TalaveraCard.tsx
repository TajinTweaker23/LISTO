"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, MessageCircle, Bookmark, Play, Pause, Volume2, VolumeX, MoreHorizontal, Trophy, Clock } from 'lucide-react';

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

interface TalaveraCardProps {
  post: TalaveraPost;
  onLike?: (postId: string) => void;
  onShare?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onSave?: (postId: string) => void;
  onFollow?: (userId: string) => void;
  isActive?: boolean;
  isVisible?: boolean;
}

const TalaveraCard: React.FC<TalaveraCardProps> = ({
  post,
  onLike,
  onShare,
  onComment,
  onSave,
  onFollow,
  isActive = false,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLiked, setIsLiked] = useState(post.engagementMetrics.isLiked);
  const [isSaved, setIsSaved] = useState(post.engagementMetrics.isSaved);
  const [likes, setLikes] = useState(post.engagementMetrics.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
    onLike?.(post.id);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
    onSave?.(post.id);
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getBadgeIcon = (badge: string) => {
    switch (badge) {
      case 'mundane-master':
        return '🏆';
      case 'speed-demon':
        return '⚡';
      case 'creativity-king':
        return '👑';
      case 'consistency-champion':
        return '🎯';
      default:
        return '⭐';
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'cleaning': return 'bg-blue-500';
      case 'cooking': return 'bg-orange-500';
      case 'organizing': return 'bg-purple-500';
      case 'self-care': return 'bg-pink-500';
      case 'productivity': return 'bg-green-500';
      case 'fitness': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="relative w-full h-full bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
    >
      {/* Video/Content Area */}
      <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Thumbnail/Video placeholder */}
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <div className="text-center">
            <Play className="w-16 h-16 text-white/50 mx-auto mb-4" />
            <p className="text-white/50 text-sm">Video Content</p>
          </div>
        </div>

        {/* Challenge Badge */}
        {post.challengeData && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-2 rounded-full">
            <Trophy className={`w-4 h-4 ${getCategoryColor(post.challengeData.category)}`} />
            <span className="text-white text-xs font-semibold">{post.challengeData.challengeName}</span>
            {post.challengeData.timeLimit && (
              <>
                <Clock className="w-3 h-3 text-white/70" />
                <span className="text-white/70 text-xs">{post.challengeData.timeLimit}s</span>
              </>
            )}
          </div>
        )}

        {/* Author Info Overlay */}
        <div className="absolute bottom-20 left-4 right-20 text-white">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-white font-bold">{post.author.displayName.charAt(0)}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold">{post.author.username}</span>
                {post.author.isVerified && <span className="text-blue-400">✓</span>}
                {post.author.badges.map((badge, idx) => (
                  <span key={idx} className="text-sm">{getBadgeIcon(badge)}</span>
                ))}
              </div>
              <p className="text-xs text-white/70">{post.author.displayName}</p>
            </div>
            {!post.author.isFollowing && (
              <button
                onClick={() => onFollow?.(post.author.id)}
                className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold hover:bg-white/30 transition-all"
              >
                Follow
              </button>
            )}
          </div>

          {/* Caption */}
          <p className="text-sm leading-relaxed line-clamp-3 mb-2">
            {post.content.caption}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="text-xs text-white/70 hover:text-white cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          {/* Audio Info */}
          {post.audio && (
            <div className="mt-2 flex items-center gap-2 text-xs bg-black/50 backdrop-blur-md rounded-full px-3 py-1 w-fit">
              <Volume2 className="w-3 h-3" />
              <span>{post.audio.trackName} · {post.audio.artistName}</span>
            </div>
          )}
        </div>

        {/* Interaction Buttons */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleLike}
            className="flex flex-col items-center"
          >
            <Heart
              className={`w-8 h-8 ${isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
            <span className="text-white text-xs mt-1">{formatNumber(likes)}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onComment?.(post.id)}
            className="flex flex-col items-center"
          >
            <MessageCircle className="w-8 h-8 text-white" />
            <span className="text-white text-xs mt-1">{formatNumber(post.engagementMetrics.comments)}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => onShare?.(post.id)}
            className="flex flex-col items-center"
          >
            <Share2 className="w-8 h-8 text-white" />
            <span className="text-white text-xs mt-1">{formatNumber(post.engagementMetrics.shares)}</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleSave}
            className="flex flex-col items-center"
          >
            <Bookmark
              className={`w-8 h-8 ${isSaved ? 'fill-yellow-500 text-yellow-500' : 'text-white'}`}
            />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="flex flex-col items-center"
          >
            <MoreHorizontal className="w-8 h-8 text-white" />
          </motion.button>
        </div>

        {/* Play/Pause Control */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 flex items-center justify-center group"
        >
          {!isPlaying && (
            <div className="bg-black/50 backdrop-blur-sm rounded-full p-4 group-hover:bg-black/70 transition-all">
              <Play className="w-12 h-12 text-white" />
            </div>
          )}
        </button>

        {/* Mute Control */}
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md p-2 rounded-full hover:bg-black/70 transition-all"
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-white" />
          ) : (
            <Volume2 className="w-5 h-5 text-white" />
          )}
        </button>
      </div>
    </motion.div>
  );
};

export default TalaveraCard;

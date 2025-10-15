'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Share2, MessageCircle, MoreVertical } from 'lucide-react';

interface TalaveraCardProps {
  post: any;
  isVisible: boolean;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onShare: (postId: string) => void;
  onComment: (postId: string) => void;
  onFollow: (userId: string) => void;
}

const TalaveraCard: React.FC<TalaveraCardProps> = ({
  post,
  isVisible,
  onLike,
  onSave,
  onShare,
  onComment,
  onFollow,
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full h-full bg-gray-900 rounded-2xl overflow-hidden relative"
    >
      {/* Video/Image Content */}
      <div className="w-full h-full relative">
        {post.mediaType === 'video' ? (
          <video
            src={post.mediaUrl}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <img
            src={post.mediaUrl}
            alt={post.caption}
            className="w-full h-full object-cover"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

        {/* Post Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            <img
              src={post.author.avatar}
              alt={post.author.displayName}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold">{post.author.displayName}</span>
                {post.author.isVerified && (
                  <span className="text-blue-400">✓</span>
                )}
              </div>
              <span className="text-sm text-gray-300">@{post.author.username}</span>
            </div>
            {!post.author.isFollowing && (
              <button
                onClick={() => onFollow(post.author.id)}
                className="px-4 py-1 bg-blue-500 hover:bg-blue-600 rounded-full text-sm font-medium transition-colors"
              >
                Follow
              </button>
            )}
          </div>

          {/* Caption */}
          {post.caption && (
            <p className="text-sm mb-4 line-clamp-2">{post.caption}</p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-white/20 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <span>{post.likes.toLocaleString()} likes</span>
            <span>{post.comments.toLocaleString()} comments</span>
            <span>{post.shares.toLocaleString()} shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute right-4 bottom-32 flex flex-col gap-4">
          <button
            onClick={() => onLike(post.id)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              post.isLiked ? 'bg-red-500 text-white' : 'bg-white/20 text-white'
            }`}
          >
            <Heart className={`w-6 h-6 ${post.isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={() => onComment(post.id)}
            className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <MessageCircle className="w-6 h-6" />
          </button>

          <button
            onClick={() => onSave(post.id)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
              post.isSaved ? 'bg-yellow-500 text-white' : 'bg-white/20 text-white'
            }`}
          >
            <Bookmark className={`w-6 h-6 ${post.isSaved ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={() => onShare(post.id)}
            className="w-12 h-12 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <Share2 className="w-6 h-6" />
          </button>
        </div>

        {/* More Options */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};

export default TalaveraCard;

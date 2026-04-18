'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, Sparkles, Brain, Target, Timer } from 'lucide-react';

interface FeedPost {
  id: string;
  author: {
    name: string;
    avatar: string;
    badge?: string;
  };
  content: string;
  type: 'wellness' | 'achievement' | 'support' | 'milestone';
  likes: number;
  comments: number;
  timeAgo: string;
  isLiked: boolean;
  isSaved: boolean;
  tags: string[];
}

const seedPosts: FeedPost[] = [
  {
    id: '1',
    author: { name: 'Sarah M.', avatar: '🌸', badge: '✨ Streak 7d' },
    content: 'Just completed my morning routine without any reminders! Small wins count. 🎉',
    type: 'achievement',
    likes: 24,
    comments: 5,
    timeAgo: '2m ago',
    isLiked: false,
    isSaved: false,
    tags: ['ADHD', 'morningroutine'],
  },
  {
    id: '2',
    author: { name: 'Alex R.', avatar: '🧠' },
    content: `Reminder: it's okay to take breaks. Your brain needs rest to function well. 💙`,
    type: 'support',
    likes: 61,
    comments: 12,
    timeAgo: '15m ago',
    isLiked: true,
    isSaved: true,
    tags: ['mentalhealth', 'selfcare'],
  },
  {
    id: '3',
    author: { name: 'Jordan K.', avatar: '🌿', badge: '🏆 Goal Crusher' },
    content: 'Hit my hydration goal every day this week! The app reminders really help me remember.',
    type: 'milestone',
    likes: 43,
    comments: 8,
    timeAgo: '1h ago',
    isLiked: false,
    isSaved: false,
    tags: ['hydration', 'wellness'],
  },
  {
    id: '4',
    author: { name: 'Taylor W.', avatar: '💜' },
    content: 'Does anyone else find the Pomodoro timer helpful for managing focus? Game changer for me.',
    type: 'wellness',
    likes: 17,
    comments: 22,
    timeAgo: '2h ago',
    isLiked: false,
    isSaved: false,
    tags: ['productivity', 'focus'],
  },
];

const typeConfig = {
  wellness: { icon: Heart, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Wellness' },
  achievement: { icon: Sparkles, color: 'text-amber-500', bg: 'bg-amber-50', label: 'Achievement' },
  support: { icon: Brain, color: 'text-blue-500', bg: 'bg-blue-50', label: 'Support' },
  milestone: { icon: Target, color: 'text-purple-500', bg: 'bg-purple-50', label: 'Milestone' },
};

const filterOptions = ['All', 'Wellness', 'Achievement', 'Support', 'Milestone'];

const FeedMode: React.FC = () => {
  const [posts, setPosts] = useState<FeedPost[]>(seedPosts);
  const [activeFilter, setActiveFilter] = useState('All');

  const toggleLike = (id: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const toggleSave = (id: string) => {
    setPosts(prev =>
      prev.map(post =>
        post.id === id ? { ...post, isSaved: !post.isSaved } : post
      )
    );
  };

  const filteredPosts =
    activeFilter === 'All'
      ? posts
      : posts.filter(p => p.type === activeFilter.toLowerCase());

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <Timer className="w-6 h-6 text-emerald-500" />
          Community Feed
        </h2>
        <span className="text-sm text-slate-500 font-medium">Live Updates</span>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {filterOptions.map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Posts */}
      <AnimatePresence mode="popLayout">
        {filteredPosts.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 text-slate-400"
          >
            <Sparkles className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No posts yet in this category.</p>
            <p className="text-sm mt-1">Be the first to share! 🌱</p>
          </motion.div>
        ) : (
          filteredPosts.map(post => {
            const { icon: TypeIcon, color, bg, label } = typeConfig[post.type];
            return (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 space-y-4"
              >
                {/* Author Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{post.author.avatar}</span>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{post.author.name}</p>
                      {post.author.badge && (
                        <p className="text-xs text-slate-500">{post.author.badge}</p>
                      )}
                    </div>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${bg} ${color}`}>
                    <TypeIcon className="w-3 h-3" />
                    {label}
                  </div>
                </div>

                {/* Content */}
                <p className="text-slate-700 leading-relaxed">{post.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Actions Row */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-50">
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => toggleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                        post.isLiked ? 'text-red-500' : 'text-slate-400 hover:text-red-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </motion.button>

                    <button className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-blue-400 transition-colors font-medium">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </button>

                    <button className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-emerald-400 transition-colors font-medium">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.85 }}
                      onClick={() => toggleSave(post.id)}
                      className={`transition-colors ${
                        post.isSaved ? 'text-amber-500' : 'text-slate-300 hover:text-amber-400'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-current' : ''}`} />
                    </motion.button>
                    <span className="text-xs text-slate-400">{post.timeAgo}</span>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedMode;

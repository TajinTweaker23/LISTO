"use client";

import React, { useState } from 'react';
import CreatePost from './CreatePost';
import { ThumbsUp, MessageSquare } from 'lucide-react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mb-6">
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full h-auto object-cover" style={{maxHeight: '400px'}} />}
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <span>By {post.author || 'Anonymous'}</span>
          <span>{new Date(post.timestamp).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="px-4 py-2 bg-gray-50 dark:bg-gray-700 flex items-center justify-around">
        <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200">
          <ThumbsUp size={18} />
          <span>Like</span>
        </button>
        <button className="flex items-center space-x-1 text-gray-600 hover:text-green-500 dark:text-gray-300 dark:hover:text-green-400 transition-colors duration-200">
          <MessageSquare size={18} />
          <span>Comment</span>
        </button>
      </div>
    </div>
  );
};


const TalaveraFeed = () => {
  // Placeholder data moved to state
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Art as a Form of Protest",
      content: "Exploring how street art and murals have been used to convey powerful political messages throughout history.",
      imageUrl: "https://source.unsplash.com/random/800x600?street-art",
      author: "Artivist",
      timestamp: "2025-08-12T10:00:00Z",
    },
    {
      id: 2,
      title: "Upcoming Rally for Climate Action",
      content: "Join us this Saturday at City Hall to demand stronger environmental policies. Your voice matters!",
      imageUrl: null,
      author: "ClimateNow",
      timestamp: "2025-08-11T15:30:00Z",
    },
    {
        id: 3,
        title: "The Philosophy of Stoicism",
        content: "A brief introduction to Stoic philosophy and how its principles can be applied to modern life for greater resilience and tranquility.",
        imageUrl: "https://source.unsplash.com/random/800x600?philosophy",
        author: "Modern Stoic",
        timestamp: "2025-08-10T09:00:00Z",
    }
  ]);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost onAddPost={handleAddPost} />
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default TalaveraFeed;

"use client";

import React, { useState, useEffect } from 'react';
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
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleAddPost = async (newPost) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
      if (response.ok) {
        fetchPosts(); // Refetch posts to include the new one
      }
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <CreatePost onAddPost={handleAddPost} />
      {loading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  );
};

export default TalaveraFeed;

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaHeart, FaComment, FaShare } from "react-icons/fa";

const posts = [
  { id: 1, user: "User1", content: "Excited for the new features!", likes: 12 },
  { id: 2, user: "User2", content: "This app is amazing!", likes: 8 },
];

const SocialFeed: React.FC = () => {
  const [liked, setLiked] = useState<{ [key: number]: boolean }>({});

  const toggleLike = (id: number) => {
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-md mx-auto space-y-4"
    >
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white p-4 rounded-xl shadow-lg border border-gray-200"
        >
          <h4 className="font-semibold text-gray-800 mb-2">{post.user}</h4>
          <p className="text-gray-600 mb-4">{post.content}</p>
          <div className="flex items-center gap-4">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleLike(post.id)}
              className={`flex items-center gap-1 ${liked[post.id] ? "text-red-500" : "text-gray-400"}`}
            >
              <FaHeart /> {post.likes + (liked[post.id] ? 1 : 0)}
            </motion.button>
            <button className="flex items-center gap-1 text-gray-400">
              <FaComment /> 3
            </button>
            <button className="flex items-center gap-1 text-gray-400">
              <FaShare />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default SocialFeed;
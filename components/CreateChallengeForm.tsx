import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

const CreateChallengeForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Challenge "${title}" created!`);
  };

  return (
    <motion.form
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create Challenge</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          rows={4}
          required
        />
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold shadow-lg flex items-center justify-center gap-2"
      >
        <FaPlus /> Create Challenge
      </motion.button>
    </motion.form>
  );
};

export default CreateChallengeForm;
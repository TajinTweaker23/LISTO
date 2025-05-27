"use client";

import React from "react";
import UniversalSearch from "../components/UniversalSearch";
import { motion } from "framer-motion";

const categories = [
  {
    title: "🌟 Inspire Me",
    description: "Curated stories tailored to your interests.",
  },
  {
    title: "🎥 Stream of the Day",
    description: "Handpicked insightful videos daily.",
  },
  {
    title: "💡 Quick Eco-Tips",
    description: "Bite-sized daily actions to help the planet.",
  },
  {
    title: "🛠️ DIY Innovation",
    description: "Creative DIY projects to spark your innovation.",
  },
  {
    title: "🎧 Podcasts for Growth",
    description: "Top episodes to accelerate personal growth.",
  },
  {
    title: "📅 Event Radar",
    description: "Upcoming webinars, meetups, and more.",
  },
];

export default function Explore() {
  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-white to-indigo-50">
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-center text-gray-800 mb-10"
      >
        🚀 Explore LISTO
      </motion.h1>

      {/* Search UI */}
      <div className="max-w-4xl mx-auto">
        <UniversalSearch />
      </div>

      {/* Feature Categories */}
      <section className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="p-6 rounded-xl shadow-lg backdrop-blur bg-white bg-opacity-70 border border-indigo-100 hover:shadow-xl transition-shadow duration-300"
          >
            <h3 className="text-xl font-bold mb-2">{category.title}</h3>
            <p className="text-gray-600 text-sm">{category.description}</p>
            <button className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-full shadow-md transition">
              Explore →
            </button>
          </motion.div>
        ))}
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="inline-block px-6 py-3 border border-indigo-200 bg-white shadow rounded-full hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          🚀 Back to top
        </motion.div>
      </footer>
    </main>
  );
}

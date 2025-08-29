"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Leaf, Heart, Moon, Sun, Activity, Zap } from "lucide-react";

export default function Wellness() {
  const [selectedCategory, setSelectedCategory] = useState("mindfulness");

  const categories = [
    { id: "mindfulness", label: "Mindfulness", icon: Leaf, color: "emerald" },
    { id: "fitness", label: "Fitness", icon: Activity, color: "blue" },
    { id: "nutrition", label: "Nutrition", icon: Heart, color: "red" },
    { id: "sleep", label: "Sleep", icon: Moon, color: "purple" },
    { id: "energy", label: "Energy", icon: Zap, color: "yellow" }
  ];

  const content = {
    mindfulness: {
      title: "Mindfulness & Mental Health",
      items: [
        { name: "Daily Meditation", progress: 75, streak: 12 },
        { name: "Breathing Exercises", progress: 60, streak: 8 },
        { name: "Gratitude Journal", progress: 90, streak: 25 }
      ]
    },
    fitness: {
      title: "Physical Fitness",
      items: [
        { name: "Daily Steps", progress: 85, streak: 15 },
        { name: "Workout Sessions", progress: 70, streak: 6 },
        { name: "Stretching", progress: 55, streak: 4 }
      ]
    },
    nutrition: {
      title: "Nutrition & Diet",
      items: [
        { name: "Water Intake", progress: 80, streak: 18 },
        { name: "Vegetable Servings", progress: 65, streak: 10 },
        { name: "Meal Planning", progress: 45, streak: 3 }
      ]
    },
    sleep: {
      title: "Sleep Quality",
      items: [
        { name: "Sleep Duration", progress: 88, streak: 22 },
        { name: "Bedtime Routine", progress: 72, streak: 14 },
        { name: "Screen-Free Time", progress: 40, streak: 2 }
      ]
    },
    energy: {
      title: "Energy & Vitality",
      items: [
        { name: "Morning Routine", progress: 95, streak: 30 },
        { name: "Afternoon Energy", progress: 68, streak: 9 },
        { name: "Evening Wind-down", progress: 82, streak: 16 }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-emerald-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sage-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <Leaf className="h-8 w-8 text-emerald-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-sage-600 bg-clip-text text-transparent">
                Wellness Hub
              </h1>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-sage-600">Wellness Score</div>
                <div className="text-lg font-bold text-emerald-600">8.2/10</div>
              </div>
              <Sun className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-emerald-500 to-sage-500 text-white shadow-lg"
                  : "bg-white/70 backdrop-blur-sm text-sage-700 hover:bg-white/90 border border-sage-200"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <category.icon className="h-4 w-4" />
              <span>{category.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-sage-900 mb-6">
            {content[selectedCategory].title}
          </h2>

          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {content[selectedCategory].items.map((item) => (
              <motion.div
                key={item.name}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sage-100"
                whileHover={{ scale: 1.02, y: -5 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-semibold text-sage-900">{item.name}</h3>
                  <div className="text-right">
                    <div className="text-sm text-sage-600">Streak</div>
                    <div className="font-bold text-emerald-600">{item.streak} days</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-sage-600 mb-2">
                    <span>Progress</span>
                    <span>{item.progress}%</span>
                  </div>
                  <div className="w-full bg-sage-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-emerald-500 to-sage-500 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <motion.button
                  className="w-full py-2 px-4 bg-gradient-to-r from-emerald-500 to-sage-500 text-white rounded-lg font-medium hover:shadow-md transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Update Progress
                </motion.button>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sage-100">
            <h3 className="text-lg font-semibold text-sage-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Start Session", icon: "🧘‍♀️", color: "emerald" },
                { label: "Log Mood", icon: "😊", color: "yellow" },
                { label: "Set Reminder", icon: "⏰", color: "blue" },
                { label: "View Stats", icon: "📊", color: "purple" }
              ].map((action) => (
                <motion.button
                  key={action.label}
                  className="flex flex-col items-center space-y-2 p-4 bg-sage-50 rounded-lg border border-sage-100 hover:bg-sage-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-sm font-medium text-sage-700">{action.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

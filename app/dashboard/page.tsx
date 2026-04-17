'use client';

import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { Plus, BarChart3, Heart, Activity } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-sage-900 mb-2">Dashboard</h1>
          <p className="text-sage-600">Welcome back! Here's your health and wellness overview.</p>
        </header>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">❤️</span>
              </div>
              <span className="text-emerald-600 text-sm font-medium">+2.3%</span>
            </div>
            <h3 className="text-2xl font-bold text-sage-900">98%</h3>
            <p className="text-sage-600 text-sm">Health Score</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🎯</span>
              </div>
              <span className="text-blue-600 text-sm font-medium">+12</span>
            </div>
            <h3 className="text-2xl font-bold text-sage-900">24</h3>
            <p className="text-sage-600 text-sm">Tasks Completed</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">😊</span>
              </div>
              <span className="text-pink-600 text-sm font-medium">Good</span>
            </div>
            <h3 className="text-2xl font-bold text-sage-900">8.2</h3>
            <p className="text-sage-600 text-sm">Mood Average</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🔥</span>
              </div>
              <span className="text-purple-600 text-sm font-medium">7 days</span>
            </div>
            <h3 className="text-2xl font-bold text-sage-900">15</h3>
            <p className="text-sage-600 text-sm">Day Streak</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg border border-sage-200">
            <h2 className="text-xl font-semibold text-sage-900 mb-6">Recent Activities</h2>
            <div className="space-y-4">
              {[
                { icon: "🏃", activity: "Morning workout completed", time: "2 hours ago", color: "emerald" },
                { icon: "💊", activity: "Medications logged", time: "4 hours ago", color: "blue" },
                { icon: "📝", activity: "Mood check-in", time: "6 hours ago", color: "pink" },
                { icon: "🥗", activity: "Healthy meal logged", time: "8 hours ago", color: "green" },
                { icon: "💤", activity: "Sleep goal achieved", time: "Yesterday", color: "purple" },
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 hover:bg-sage-50 rounded-lg transition-colors">
                  <div className={`w-10 h-10 bg-${item.color}-100 rounded-lg flex items-center justify-center`}>
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sage-900">{item.activity}</p>
                    <p className="text-sm text-sage-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
              <h2 className="text-xl font-semibold text-sage-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Button 
                  variant="default"
                  className="w-full bg-brand-primary hover:bg-brand-dark text-white font-medium"
                  leftIcon={<Plus className="w-4 h-4" />}
                >
                  Log Symptoms
                </Button>
                <Button 
                  variant="default"
                  className="w-full bg-sage-600 hover:bg-sage-700 text-white font-medium"
                  leftIcon={<Heart className="w-4 h-4" />}
                >
                  Check Mood
                </Button>
                <Button 
                  variant="default"
                  className="w-full bg-accent-primary hover:bg-accent-dark text-white font-medium"
                  leftIcon={<Activity className="w-4 h-4" />}
                >
                  Add Task
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
              <h2 className="text-xl font-semibold text-sage-900 mb-4">Today's Goals</h2>
              <div className="space-y-3">
                {[
                  { task: "Drink 8 glasses of water", progress: 75 },
                  { task: "Complete workout", progress: 100 },
                  { task: "Take medications", progress: 50 },
                ].map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-sage-700">{goal.task}</span>
                      <span className="text-sage-500">{goal.progress}%</span>
                    </div>
                    <div className="w-full bg-sage-200 rounded-full h-2">
                      <div
                        className="bg-brand-primary h-2 rounded-full transition-all"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 text-center">
          <div className="flex flex-wrap justify-center gap-3">
            <Button 
              onClick={() => window.location.href = '/'}
              variant="default"
              className="bg-sage-600 hover:bg-sage-700 text-white"
            >
              ← Back to Home
            </Button>
            <Button 
              onClick={() => window.location.href = '/test-styling'}
              variant="default"
              className="bg-brand-primary hover:bg-brand-dark text-white"
            >
              Color Palette
            </Button>
            <Button 
              onClick={() => window.location.href = '/button-demo'}
              variant="default"
              className="bg-accent-primary hover:bg-accent-dark text-white"
            >
              Button Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

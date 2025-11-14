'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { 
  Users, 
  Heart, 
  Target, 
  MessageCircle, 
  Trophy, 
  Calendar,
  Sparkles,
  ArrowLeft,
  Plus,
  CheckCircle,
  Clock,
  Star
} from 'lucide-react';
import Link from 'next/link';

// Type definitions
interface Pod {
  id: number;
  name: string;
  description: string;
  members: number;
  maxMembers: number;
  meetingTime: string;
  tags: string[];
  color: string;
  icon: string;
  currentChallenge: string;
  completionRate: number;
  recentWin: string;
}

// Innovative Social Concept: "Growth Pods" 
// Small, curated communities (max 12 people) focused on specific growth areas
const AVAILABLE_PODS = [
  {
    id: 1,
    name: "ADHD Champions",
    description: "Support and strategies for thriving with ADHD",
    members: 8,
    maxMembers: 12,
    meetingTime: "Tuesdays 7PM EST",
    tags: ["ADHD", "Productivity", "Self-compassion"],
    color: "from-purple-400 to-pink-400",
    icon: "🧠",
    currentChallenge: "30-day focus routine",
    completionRate: 78,
    recentWin: "Sarah completed her first book in 2 years! 📚"
  },
  {
    id: 2,
    name: "Anxiety Warriors",
    description: "Gentle support for managing anxiety with courage",
    members: 11,
    maxMembers: 12,
    meetingTime: "Sundays 6PM EST",
    tags: ["Anxiety", "Mindfulness", "Breathing"],
    color: "from-blue-400 to-cyan-400",
    icon: "💙",
    currentChallenge: "Daily gratitude practice",
    completionRate: 85,
    recentWin: "Michael gave his first presentation without panic! 🎤"
  },
  {
    id: 3,
    name: "Night Owl Creatives",
    description: "For creators who do their best work after hours",
    members: 6,
    maxMembers: 12,
    meetingTime: "Fridays 10PM EST",
    tags: ["Creativity", "Night Owls", "Art"],
    color: "from-indigo-400 to-purple-400",
    icon: "🦉",
    currentChallenge: "Create something daily",
    completionRate: 92,
    recentWin: "Jamie launched their Etsy shop with 50 sales! 🎨"
  },
  {
    id: 4,
    name: "Chronic Illness Champions",
    description: "Navigating life with chronic conditions together",
    members: 9,
    maxMembers: 12,
    meetingTime: "Wednesdays 2PM EST",
    tags: ["Chronic Illness", "Spoon Theory", "Self-care"],
    color: "from-green-400 to-emerald-400",
    icon: "🌱",
    currentChallenge: "Energy tracking & optimization",
    completionRate: 73,
    recentWin: "Alex found a treatment that's helping their pain! ✨"
  }
];

const MY_PODS = [
  {
    id: 2,
    name: "Anxiety Warriors",
    role: "Member",
    nextMeeting: "Tomorrow 6PM",
    unreadMessages: 3,
    currentStreak: 15
  }
];

const RECENT_ACTIVITY = [
  {
    type: "win",
    user: "Sarah M.",
    pod: "ADHD Champions",
    content: "Finished reading 'Atomic Habits' - first book in 2 years!",
    time: "2 hours ago",
    reactions: 12
  },
  {
    type: "support",
    user: "Michael K.",
    pod: "Anxiety Warriors",
    content: "Feeling nervous about tomorrow's meeting. Any tips?",
    time: "4 hours ago",
    reactions: 8,
    replies: 5
  },
  {
    type: "milestone",
    user: "Jamie L.",
    pod: "Night Owl Creatives",
    content: "Hit 50 sales on my Etsy shop! 🎉",
    time: "6 hours ago",
    reactions: 24
  }
];

export default function GrowthPodsPage() {
  const [activeTab, setActiveTab] = useState('discover');
  const [selectedPod, setSelectedPod] = useState<Pod | null>(null);

  const renderPodCard = (pod: Pod, isMember = false) => (
    <motion.div
      key={pod.id}
      className="card-elegant p-6 hover:scale-[1.02] transition-all duration-300"
      whileHover={{ y: -5 }}
      layout
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${pod.color} rounded-2xl flex items-center justify-center text-2xl`}>
          {pod.icon}
        </div>
        <div className="text-right">
          <div className="text-sm text-sage-600">
            {pod.members}/{pod.maxMembers} members
          </div>
          <div className="w-16 h-2 bg-sage-200 rounded-full mt-1">
            <div 
              className={`h-full bg-gradient-to-r ${pod.color} rounded-full`}
              style={{ width: `${(pod.members / pod.maxMembers) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-sage-900 mb-2">{pod.name}</h3>
      <p className="text-sage-600 mb-4">{pod.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {pod.tags.map(tag => (
          <span key={tag} className="px-2 py-1 bg-sage-100 text-sage-700 rounded-full text-xs">
            {tag}
          </span>
        ))}
      </div>

      <div className="space-y-2 mb-4 text-sm text-sage-600">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          {pod.meetingTime}
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4" />
          {pod.currentChallenge}
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4" />
          {pod.completionRate}% challenge completion
        </div>
      </div>

      {pod.recentWin && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4">
          <p className="text-sm text-emerald-800">
            🎉 Recent Win: {pod.recentWin}
          </p>
        </div>
      )}

      <Button
        className={`w-full ${
          isMember 
            ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white' 
            : pod.members >= pod.maxMembers
            ? 'bg-sage-300 text-sage-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
        }`}
        disabled={!isMember && pod.members >= pod.maxMembers}
      >
        {isMember ? 'Enter Pod' : pod.members >= pod.maxMembers ? 'Pod Full' : 'Join Pod'}
      </Button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-warm-gray-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/" className="inline-flex items-center text-sage-600 hover:text-sage-800 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-4xl font-bold text-sage-900 mb-2">Growth Pods</h1>
            <p className="text-lg text-sage-600 max-w-2xl">
              Join small, supportive communities where real growth happens. 
              Maximum 12 members per pod for meaningful connections.
            </p>
          </div>
          <Button
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
            leftIcon={<Plus className="w-5 h-5" />}
          >
            Create Pod
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8">
          {[
            { id: 'discover', label: 'Discover Pods', icon: Sparkles },
            { id: 'my-pods', label: 'My Pods', icon: Users },
            { id: 'activity', label: 'Activity Feed', icon: MessageCircle }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                variant={activeTab === tab.id ? 'default' : 'outline'}
                className={activeTab === tab.id 
                  ? 'bg-gradient-to-r from-sage-500 to-sage-600 text-white' 
                  : 'border-sage-300 text-sage-700 hover:bg-sage-50'
                }
                leftIcon={<Icon className="w-4 h-4" />}
              >
                {tab.label}
              </Button>
            );
          })}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'discover' && (
            <motion.div
              key="discover"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AVAILABLE_PODS.map(pod => renderPodCard(pod))}
              </div>
            </motion.div>
          )}

          {activeTab === 'my-pods' && (
            <motion.div
              key="my-pods"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {MY_PODS.length === 0 ? (
                <div className="text-center py-16">
                  <Users className="w-16 h-16 text-sage-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-sage-800 mb-2">No pods yet!</h3>
                  <p className="text-sage-600 mb-6">Join a pod to start your growth journey.</p>
                  <Button
                    onClick={() => setActiveTab('discover')}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white"
                  >
                    Discover Pods
                  </Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {MY_PODS.map(pod => {
                    const fullPod = AVAILABLE_PODS.find(p => p.id === pod.id);
                    if (!fullPod) return null;
                    return (
                      <div key={pod.id} className="card-elegant p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`w-10 h-10 bg-gradient-to-r ${fullPod.color} rounded-xl flex items-center justify-center text-xl`}>
                            {fullPod.icon}
                          </div>
                          {pod.unreadMessages > 0 && (
                            <div className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                              {pod.unreadMessages}
                            </div>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-sage-900 mb-1">{pod.name}</h3>
                        <p className="text-sm text-sage-600 mb-4">{pod.role}</p>
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-sage-600">Next meeting:</span>
                            <span className="font-medium">{pod.nextMeeting}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sage-600">Current streak:</span>
                            <span className="font-medium text-emerald-600">{pod.currentStreak} days</span>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
                          Enter Pod
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              key="activity"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-2xl mx-auto space-y-6">
                {RECENT_ACTIVITY.map((activity, index) => (
                  <motion.div
                    key={index}
                    className="card-elegant p-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.type === 'win' ? 'bg-yellow-100 text-yellow-600' :
                        activity.type === 'support' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {activity.type === 'win' ? '🏆' : 
                         activity.type === 'support' ? '🤝' : '🎉'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-sage-900">{activity.user}</span>
                          <span className="text-sage-500">in</span>
                          <span className="text-emerald-600 font-medium">{activity.pod}</span>
                          <span className="text-sage-400 text-sm ml-auto">{activity.time}</span>
                        </div>
                        <p className="text-sage-700 mb-3">{activity.content}</p>
                        <div className="flex items-center gap-4 text-sm text-sage-500">
                          <button className="flex items-center gap-1 hover:text-emerald-600">
                            <Heart className="w-4 h-4" />
                            {activity.reactions}
                          </button>
                          {activity.replies && (
                            <button className="flex items-center gap-1 hover:text-blue-600">
                              <MessageCircle className="w-4 h-4" />
                              {activity.replies} replies
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

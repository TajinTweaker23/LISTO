import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Plus, Calendar, Target, Heart, Brain, Sparkles, 
  Users, TrendingUp, Bell, ArrowUp, Clock, CheckCircle,
  BarChart3, Activity, Zap
} from 'lucide-react'
import Sidebar from './Sidebar'
import Logo from './Logo'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
  category: string
  dueDate?: string
}

interface ListoMainHubProps {
  user?: any
}

export default function ListoMainHubPro({ user }: ListoMainHubProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [showAddTask, setShowAddTask] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [completedToday, setCompletedToday] = useState(0)

  // Sample data for demonstration
  useEffect(() => {
    setTasks([
      { id: '1', title: 'Complete wellness assessment', completed: false, priority: 'high', category: 'Health' },
      { id: '2', title: 'Review project proposal', completed: true, priority: 'medium', category: 'Work' },
      { id: '3', title: 'Schedule therapy session', completed: false, priority: 'medium', category: 'Mental Health' },
      { id: '4', title: 'Team standup meeting', completed: true, priority: 'high', category: 'Work' },
      { id: '5', title: 'Grocery shopping', completed: false, priority: 'low', category: 'Personal' },
    ])
    setCompletedToday(2)
  }, [])

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        completed: false,
        priority: 'medium',
        category: 'Personal'
      }
      setTasks([newTask, ...tasks])
      setNewTaskTitle('')
      setShowAddTask(false)
    }
  }

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => {
      if (task.id === id) {
        const updatedTask = { ...task, completed: !task.completed }
        if (updatedTask.completed && !task.completed) {
          setCompletedToday(prev => prev + 1)
        } else if (!updatedTask.completed && task.completed) {
          setCompletedToday(prev => Math.max(0, prev - 1))
        }
        return updatedTask
      }
      return task
    }))
  }

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const completionRate = tasks.length > 0 ? (tasks.filter(t => t.completed).length / tasks.length) * 100 : 0
  const pendingTasks = tasks.filter(t => !t.completed).length
  const highPriorityTasks = tasks.filter(t => !t.completed && t.priority === 'high').length

  const stats = [
    { 
      label: 'Tasks Completed', 
      value: completedToday.toString(), 
      icon: CheckCircle, 
      color: 'from-emerald-500 to-emerald-600',
      change: '+2 from yesterday',
      changeType: 'positive' as const
    },
    { 
      label: 'Wellness Score', 
      value: '87%', 
      icon: Heart, 
      color: 'from-pink-500 to-pink-600',
      change: '+5% this week',
      changeType: 'positive' as const
    },
    { 
      label: 'Focus Time', 
      value: '4.2h', 
      icon: Brain, 
      color: 'from-blue-500 to-blue-600',
      change: '30min above target',
      changeType: 'positive' as const
    },
    { 
      label: 'Social Impact', 
      value: '3.2k', 
      icon: Users, 
      color: 'from-purple-500 to-purple-600',
      change: '+12% this month',
      changeType: 'positive' as const
    },
  ]

  const quickActions = [
    { label: 'Focus Session', icon: Brain, href: '/focus', color: 'bg-blue-50 hover:bg-blue-100 text-blue-700' },
    { label: 'Mood Check', icon: Heart, href: '/health', color: 'bg-pink-50 hover:bg-pink-100 text-pink-700' },
    { label: 'Calendar', icon: Calendar, href: '/calendar', color: 'bg-green-50 hover:bg-green-100 text-green-700' },
    { label: 'Impact Projects', icon: Sparkles, href: '/impact-projects', color: 'bg-purple-50 hover:bg-purple-100 text-purple-700' },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200'
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      case 'low': return 'bg-green-50 text-green-700 border-green-200'
      default: return 'bg-gray-50 text-gray-700 border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 p-8 max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Logo variant="icon" size="md" />
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Welcome back{user?.name ? `, ${user.name}` : ''}
                </h1>
                <p className="text-lg text-gray-600 mt-1">Ready to tackle today's priorities</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-3 hover:bg-gray-100 rounded-2xl transition-all duration-200 group">
                <Bell className="w-6 h-6 text-gray-600 group-hover:text-gray-800" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs text-white font-medium">
                  3
                </div>
              </button>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card-premium p-6 hover-lift cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                  }`}>
                    <ArrowUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="mb-2">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                </div>
                <div className={`text-xs font-medium ${
                  stat.changeType === 'positive' ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tasks Section */}
            <div className="lg:col-span-2">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-premium p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Today's Focus</h2>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {pendingTasks} remaining
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {highPriorityTasks} high priority
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowAddTask(true)}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center gap-3 hover-lift shadow-lg"
                  >
                    <Plus className="w-5 h-5" />
                    Add Task
                  </button>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-gray-900 placeholder-gray-500"
                  />
                </div>

                {/* Add Task Form */}
                <AnimatePresence>
                  {showAddTask && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200"
                    >
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Enter task title..."
                          value={newTaskTitle}
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addTask()}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                          autoFocus
                        />
                        <button
                          onClick={addTask}
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowAddTask(false)}
                          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-300 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Tasks List */}
                <div className="space-y-4">
                  {filteredTasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl hover:border-gray-200 hover:shadow-md transition-all duration-200 group"
                    >
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border-2 transition-all duration-200 flex items-center justify-center ${
                          task.completed
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-gray-300 hover:border-emerald-400 group-hover:border-emerald-500'
                        }`}
                      >
                        {task.completed && (
                          <CheckCircle className="w-4 h-4 fill-current" />
                        )}
                      </button>
                      
                      <div className="flex-1 min-w-0">
                        <div className={`font-medium text-lg transition-colors ${
                          task.completed 
                            ? 'line-through text-gray-500' 
                            : 'text-gray-900 group-hover:text-gray-800'
                        }`}>
                          {task.title}
                        </div>
                        <div className="text-sm text-gray-600 mt-1 font-medium">
                          {task.category}
                        </div>
                      </div>

                      <div className={`px-3 py-2 rounded-xl text-xs font-bold border ${getPriorityColor(task.priority)}`}>
                        {task.priority.toUpperCase()}
                      </div>
                    </motion.div>
                  ))}

                  {filteredTasks.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12 text-gray-500"
                    >
                      <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <div className="text-xl font-semibold text-gray-900 mb-2">No tasks found</div>
                      <div className="text-sm">Add a task to get started</div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="card-premium p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                <div className="space-y-3">
                  {quickActions.map((action) => (
                    <a
                      key={action.label}
                      href={action.href}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${action.color} hover-lift`}
                    >
                      <div className="p-2 bg-white rounded-xl shadow-sm">
                        <action.icon className="w-5 h-5" />
                      </div>
                      <span className="font-semibold">
                        {action.label}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Progress Dashboard */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="card-premium p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Progress Overview</h3>
                
                {/* Completion Rate Circle */}
                <div className="text-center mb-6">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        className="text-gray-200"
                      />
                      <motion.circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="6"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - completionRate / 100)}`}
                        className="text-blue-500"
                        strokeLinecap="round"
                        initial={{ strokeDashoffset: `${2 * Math.PI * 40}` }}
                        animate={{ strokeDashoffset: `${2 * Math.PI * 40 * (1 - completionRate / 100)}` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-gray-900">{Math.round(completionRate)}%</span>
                      <span className="text-xs text-gray-600">Complete</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 font-medium mt-2">
                    Solid progress today. Stay consistent.
                  </p>
                </div>

                {/* Detailed Stats */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">Daily Streak</span>
                    </div>
                    <span className="text-lg font-bold text-blue-600">7 days</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5 text-yellow-600" />
                      <span className="font-medium text-gray-900">Energy Level</span>
                    </div>
                    <span className="text-lg font-bold text-yellow-600">High</span>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                      <span className="font-medium text-gray-900">Weekly Goal</span>
                    </div>
                    <span className="text-lg font-bold text-green-600">85%</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

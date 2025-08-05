import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  CheckSquare, 
  Play,
  Pause,
  Plus,
  Trash2,
  Focus,
  ListChecks,
  Lightbulb
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimatedTime: number; // in minutes
  actualTime?: number;
  difficulty: 'easy' | 'medium' | 'hard';
  energyRequired: 'low' | 'medium' | 'high';
  category: 'work' | 'personal' | 'health' | 'creative' | 'admin';
  deadline?: Date;
  completed: boolean;
  subtasks: SubTask[];
  dependencies: string[]; // task IDs
  createdAt: Date;
  completedAt?: Date;
  procrastinationLevel?: number; // 1-5 scale
  emotionalWeight?: number; // 1-5 scale
}

interface SubTask {
  id: string;
  title: string;
  completed: boolean;
  estimatedTime: number;
}

interface FocusSession {
  id: string;
  taskId: string;
  startTime: Date;
  endTime?: Date;
  duration: number; // actual duration in minutes
  quality: number; // 1-5 rating
  distractions: number;
  notes?: string;
}

interface ExecutiveFunctionMetrics {
  taskInitiation: number; // 1-10 scale
  workingMemory: number;
  cognitiveFlexibility: number;
  inhibitoryControl: number;
  emotionalRegulation: number;
  planningSelf: number;
  timeManagement: number;
  organizationSelf: number;
}

interface ExecutiveSupportState {
  currentTask: Task | null;
  currentSession: FocusSession | null;
  isTimerActive: boolean;
  timeRemaining: number;
  taskQueue: Task[];
  completedTasks: Task[];
  dailyMetrics: ExecutiveFunctionMetrics;
  cognitiveLoad: number; // 1-10 scale
  attentionSpan: number; // current estimated attention span in minutes
  energyLevel: 'depleted' | 'low' | 'medium' | 'high' | 'peak';
  timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

const ExecutiveFunctionSupport: React.FC = () => {
  const [state, setState] = useState<ExecutiveSupportState>({
    currentTask: null,
    currentSession: null,
    isTimerActive: false,
    timeRemaining: 0,
    taskQueue: [],
    completedTasks: [],
    dailyMetrics: {
      taskInitiation: 7,
      workingMemory: 6,
      cognitiveFlexibility: 8,
      inhibitoryControl: 5,
      emotionalRegulation: 7,
      planningSelf: 6,
      timeManagement: 5,
      organizationSelf: 7
    },
    cognitiveLoad: 4,
    attentionSpan: 25,
    energyLevel: 'medium',
    timeOfDay: 'morning'
  });

  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    priority: 'medium',
    estimatedTime: 30,
    difficulty: 'medium',
    energyRequired: 'medium',
    category: 'work',
    subtasks: []
  });

  useEffect(() => {
    loadTasks();
    loadDailyMetrics();
    updateTimeContext();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (state.isTimerActive && state.timeRemaining > 0) {
      interval = setInterval(() => {
        setState(prev => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1
        }));
      }, 60000); // Update every minute
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [state.isTimerActive, state.timeRemaining]);

  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem('executive-tasks') || '[]');
    const savedCompleted = JSON.parse(localStorage.getItem('executive-completed') || '[]');
    
    setState(prev => ({
      ...prev,
      taskQueue: savedTasks,
      completedTasks: savedCompleted
    }));
  };

  const loadDailyMetrics = () => {
    const today = new Date().toDateString();
    const savedMetrics = JSON.parse(localStorage.getItem(`executive-metrics-${today}`) || 'null');
    
    if (savedMetrics) {
      setState(prev => ({
        ...prev,
        dailyMetrics: savedMetrics
      }));
    }
  };

  const updateTimeContext = () => {
    const hour = new Date().getHours();
    let timeOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
    
    if (hour >= 6 && hour < 12) timeOfDay = 'morning';
    else if (hour >= 12 && hour < 17) timeOfDay = 'afternoon';
    else if (hour >= 17 && hour < 22) timeOfDay = 'evening';
    else timeOfDay = 'night';

    setState(prev => ({
      ...prev,
      timeOfDay
    }));
  };

  const getIntelligentTaskRecommendation = useCallback((): Task | null => {
    if (state.taskQueue.length === 0) return null;

    // Filter tasks based on current state
    const availableTasks = state.taskQueue.filter(task => {
      // Check if dependencies are met
      const dependenciesMet = task.dependencies.every(depId => 
        state.completedTasks.some(completed => completed.id === depId)
      );
      
      if (!dependenciesMet) return false;

      // Match energy requirements with current energy level
      const energyMatch = matchEnergyRequirement(task.energyRequired, state.energyLevel);
      if (!energyMatch) return false;

      // Consider cognitive load
      if (state.cognitiveLoad > 7 && task.difficulty === 'hard') return false;
      if (state.cognitiveLoad < 4 && task.difficulty === 'easy') return false;

      // Time of day considerations
      if (state.timeOfDay === 'morning' && task.category === 'creative') return true;
      if (state.timeOfDay === 'afternoon' && task.category === 'work') return true;
      if (state.timeOfDay === 'evening' && task.category === 'personal') return true;

      return true;
    });

    if (availableTasks.length === 0) return state.taskQueue[0];

    // Score tasks based on multiple factors
    const scoredTasks = availableTasks.map(task => {
      let score = 0;

      // Priority scoring
      switch (task.priority) {
        case 'urgent': score += 10; break;
        case 'high': score += 7; break;
        case 'medium': score += 4; break;
        case 'low': score += 1; break;
      }

      // Deadline urgency
      if (task.deadline) {
        const daysUntilDeadline = Math.ceil((task.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        if (daysUntilDeadline <= 1) score += 8;
        else if (daysUntilDeadline <= 3) score += 5;
        else if (daysUntilDeadline <= 7) score += 2;
      }

      // Time fit with attention span
      const timeFit = Math.abs(task.estimatedTime - state.attentionSpan);
      score += Math.max(0, 5 - timeFit / 5);

      // Procrastination penalty
      if (task.procrastinationLevel) {
        score += (6 - task.procrastinationLevel) * 2;
      }

      // Emotional weight consideration
      if (task.emotionalWeight && task.emotionalWeight > 3) {
        if (state.dailyMetrics.emotionalRegulation > 6) score += 3;
        else score -= 2;
      }

      return { task, score };
    });

    // Return highest scoring task
    scoredTasks.sort((a, b) => b.score - a.score);
    return scoredTasks[0]?.task || null;
  }, [state]);

  const matchEnergyRequirement = (required: string, current: string): boolean => {
    const energyLevels = { 'depleted': 0, 'low': 1, 'medium': 2, 'high': 3, 'peak': 4 };
    const requiredLevel = energyLevels[required as keyof typeof energyLevels];
    const currentLevel = energyLevels[current as keyof typeof energyLevels];
    
    return currentLevel >= requiredLevel - 1; // Allow one level below
  };

  const startTask = (task: Task) => {
    const session: FocusSession = {
      id: `session-${Date.now()}`,
      taskId: task.id,
      startTime: new Date(),
      duration: 0,
      quality: 0,
      distractions: 0
    };

    setState(prev => ({
      ...prev,
      currentTask: task,
      currentSession: session,
      isTimerActive: true,
      timeRemaining: task.estimatedTime
    }));
  };

  const pauseTimer = () => {
    setState(prev => ({ ...prev, isTimerActive: false }));
  };

  const resumeTimer = () => {
    setState(prev => ({ ...prev, isTimerActive: true }));
  };

  const completeTask = () => {
    if (!state.currentTask || !state.currentSession) return;

    const completedTask = {
      ...state.currentTask,
      completed: true,
      completedAt: new Date(),
      actualTime: state.currentTask.estimatedTime - state.timeRemaining
    };

    const completedSession = {
      ...state.currentSession,
      endTime: new Date(),
      duration: state.currentTask.estimatedTime - state.timeRemaining
    };

    setState(prev => ({
      ...prev,
      completedTasks: [...prev.completedTasks, completedTask],
      taskQueue: prev.taskQueue.filter(t => t.id !== state.currentTask!.id),
      currentTask: null,
      currentSession: null,
      isTimerActive: false,
      timeRemaining: 0
    }));

    // Save to localStorage
    const newCompleted = [...state.completedTasks, completedTask];
    const newQueue = state.taskQueue.filter(t => t.id !== state.currentTask!.id);
    
    localStorage.setItem('executive-completed', JSON.stringify(newCompleted));
    localStorage.setItem('executive-tasks', JSON.stringify(newQueue));

    // Update metrics based on completion
    updateMetricsOnCompletion(completedTask, completedSession);
  };

  const updateMetricsOnCompletion = (task: Task, session: FocusSession) => {
    setState(prev => {
      const newMetrics = { ...prev.dailyMetrics };
      
      // Improve task initiation if task was started quickly
      if (session.duration >= task.estimatedTime * 0.8) {
        newMetrics.taskInitiation = Math.min(10, newMetrics.taskInitiation + 0.1);
      }

      // Update time management based on estimation accuracy
      const estimationAccuracy = Math.abs(task.estimatedTime - session.duration) / task.estimatedTime;
      if (estimationAccuracy < 0.2) {
        newMetrics.timeManagement = Math.min(10, newMetrics.timeManagement + 0.2);
      }

      // Save updated metrics
      const today = new Date().toDateString();
      localStorage.setItem(`executive-metrics-${today}`, JSON.stringify(newMetrics));

      return {
        ...prev,
        dailyMetrics: newMetrics
      };
    });
  };

  const addNewTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      id: `task-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority || 'medium',
      estimatedTime: newTask.estimatedTime || 30,
      difficulty: newTask.difficulty || 'medium',
      energyRequired: newTask.energyRequired || 'medium',
      category: newTask.category || 'work',
      deadline: newTask.deadline,
      completed: false,
      subtasks: newTask.subtasks || [],
      dependencies: newTask.dependencies || [],
      createdAt: new Date(),
      procrastinationLevel: newTask.procrastinationLevel,
      emotionalWeight: newTask.emotionalWeight
    };

    setState(prev => ({
      ...prev,
      taskQueue: [...prev.taskQueue, task]
    }));

    // Save to localStorage
    const newQueue = [...state.taskQueue, task];
    localStorage.setItem('executive-tasks', JSON.stringify(newQueue));

    // Reset form
    setNewTask({
      title: '',
      priority: 'medium',
      estimatedTime: 30,
      difficulty: 'medium',
      energyRequired: 'medium',
      category: 'work',
      subtasks: []
    });
    setShowNewTaskForm(false);
  };

  const deleteTask = (taskId: string) => {
    setState(prev => ({
      ...prev,
      taskQueue: prev.taskQueue.filter(t => t.id !== taskId)
    }));

    const newQueue = state.taskQueue.filter(t => t.id !== taskId);
    localStorage.setItem('executive-tasks', JSON.stringify(newQueue));
  };

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

  const getCognitiveLoadColor = (load: number) => {
    if (load <= 3) return 'text-green-600';
    if (load <= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const recommendedTask = getIntelligentTaskRecommendation();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header with Executive Function Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Executive Function Support</h1>
              <p className="text-gray-600">AI-powered task management for neurodivergent minds</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-600">Cognitive Load</div>
            <div className={`text-2xl font-bold ${getCognitiveLoadColor(state.cognitiveLoad)}`}>
              {state.cognitiveLoad}/10
            </div>
          </div>
        </div>

        {/* Daily Metrics Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/70 rounded-lg p-3">
            <div className="text-sm text-gray-600">Task Initiation</div>
            <div className="text-lg font-semibold text-purple-600">
              {state.dailyMetrics.taskInitiation.toFixed(1)}/10
            </div>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="text-sm text-gray-600">Time Management</div>
            <div className="text-lg font-semibold text-blue-600">
              {state.dailyMetrics.timeManagement.toFixed(1)}/10
            </div>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="text-sm text-gray-600">Working Memory</div>
            <div className="text-lg font-semibold text-green-600">
              {state.dailyMetrics.workingMemory.toFixed(1)}/10
            </div>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="text-sm text-gray-600">Energy Level</div>
            <div className="text-lg font-semibold text-indigo-600 capitalize">
              {state.energyLevel}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Current Task Session */}
      {state.currentTask && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg border-2 border-blue-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Focus className="w-8 h-8 text-blue-600" />
              <div>
                <h2 className="text-xl font-semibold text-gray-800">{state.currentTask.title}</h2>
                <p className="text-gray-600">{state.currentTask.description}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">{formatTime(state.timeRemaining)}</div>
              <div className="text-sm text-gray-600">remaining</div>
            </div>
          </div>

          {/* Task Progress */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{Math.round(((state.currentTask.estimatedTime - state.timeRemaining) / state.currentTask.estimatedTime) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <progress
                className="bg-blue-500 h-2 rounded-full transition-all duration-300 w-full"
                value={(state.currentTask.estimatedTime - state.timeRemaining)}
                max={state.currentTask.estimatedTime}
                aria-label="Task progress"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {state.isTimerActive ? (
                <button
                  onClick={pauseTimer}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  Pause
                </button>
              ) : (
                <button
                  onClick={resumeTimer}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Play className="w-4 h-4" />
                  Resume
                </button>
              )}

              <button
                onClick={completeTask}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                <CheckSquare className="w-4 h-4" />
                Complete
              </button>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(state.currentTask.priority)}`}>
                {state.currentTask.priority}
              </span>
              <span>{getDifficultyIcon(state.currentTask.difficulty)} {state.currentTask.difficulty}</span>
            </div>
          </div>

          {/* Subtasks */}
          {state.currentTask.subtasks.length > 0 && (
            <div className="mt-4 p-3 bg-white/70 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Subtasks:</h4>
              <div className="space-y-1">
                {state.currentTask.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={subtask.completed}
                      onChange={() => {
                        // Update subtask completion
                      }}
                      className="rounded"
                      aria-label={`Mark subtask "${subtask.title}" as complete`}
                    />
                    <span className={`text-sm ${subtask.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {subtask.title}
                    </span>
                    <span className="text-xs text-gray-500">({formatTime(subtask.estimatedTime)})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Intelligent Task Recommendation */}
      {!state.currentTask && recommendedTask && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg border-2 border-green-200"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold text-gray-800">Recommended Next Task</h3>
            </div>
            <button
              onClick={() => startTask(recommendedTask)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <Play className="w-4 h-4" />
              Start Task
            </button>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-800">{recommendedTask.title}</h4>
              <span className="text-sm text-gray-600">{formatTime(recommendedTask.estimatedTime)}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{recommendedTask.description}</p>
            
            <div className="flex items-center gap-3 text-xs">
              <span className={`px-2 py-1 rounded border ${getPriorityColor(recommendedTask.priority)}`}>
                {recommendedTask.priority}
              </span>
              <span>{getDifficultyIcon(recommendedTask.difficulty)} {recommendedTask.difficulty}</span>
              <span className="text-gray-500">Energy: {recommendedTask.energyRequired}</span>
              <span className="text-gray-500">Category: {recommendedTask.category}</span>
            </div>
          </div>

          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Why this task?</span>
            </div>
            <p className="text-xs text-blue-700">
              Based on your current energy level ({state.energyLevel}), time of day ({state.timeOfDay}), 
              and cognitive load ({state.cognitiveLoad}/10), this task matches your optimal performance window.
            </p>
          </div>
        </motion.div>
      )}

      {/* Task Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Task List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Task Queue</h3>
            <button
              onClick={() => setShowNewTaskForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Task
            </button>
          </div>

          <div className="space-y-3">
            {state.taskQueue.slice(0, 5).map((task) => (
              <motion.div
                key={task.id}
                whileHover={{ scale: 1.02 }}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{task.title}</h4>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => startTask(task)}
                      className="p-1 text-blue-600 hover:text-blue-800"
                      aria-label={`Start task: ${task.title}`}
                    >
                      <Play className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="p-1 text-red-600 hover:text-red-800"
                      aria-label={`Delete task: ${task.title}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <span>{getDifficultyIcon(task.difficulty)}</span>
                    <span className="text-gray-500">{formatTime(task.estimatedTime)}</span>
                  </div>
                  <span className="text-gray-500 capitalize">{task.category}</span>
                </div>

                {task.deadline && (
                  <div className="mt-2 text-xs text-orange-600">
                    Due: {task.deadline.toLocaleDateString()}
                  </div>
                )}
              </motion.div>
            ))}

            {state.taskQueue.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <ListChecks className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No tasks in queue. Add a task to get started!</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Completed Tasks & Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-6">Today's Progress</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-600">{state.completedTasks.length}</div>
              <div className="text-sm text-green-700">Completed</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-600">{state.taskQueue.length}</div>
              <div className="text-sm text-blue-700">Remaining</div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-gray-700">Recent Completions</h4>
            {state.completedTasks.slice(-3).map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-800">{task.title}</div>
                  <div className="text-sm text-gray-600">
                    {task.completedAt?.toLocaleTimeString()} • {formatTime(task.actualTime || task.estimatedTime)}
                  </div>
                </div>
                <CheckSquare className="w-5 h-5 text-green-600" />
              </div>
            ))}

            {state.completedTasks.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                <span className="text-sm">Complete your first task to see progress!</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* New Task Form Modal */}
      <AnimatePresence>
        {showNewTaskForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowNewTaskForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Add New Task</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="task-title" className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                  <input
                    id="task-title"
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="What needs to be done?"
                  />
                </div>

                <div>
                  <label htmlFor="task-description" className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    id="task-description"
                    value={newTask.description || ''}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Additional details..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="task-priority" className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      id="task-priority"
                      value={newTask.priority}
                      onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="task-time" className="block text-sm font-medium text-gray-700 mb-2">Estimated Time (minutes)</label>
                    <input
                      id="task-time"
                      type="number"
                      value={newTask.estimatedTime}
                      onChange={(e) => setNewTask({ ...newTask, estimatedTime: parseInt(e.target.value) })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      min="5"
                      max="480"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="task-difficulty" className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                    <select
                      id="task-difficulty"
                      value={newTask.difficulty}
                      onChange={(e) => setNewTask({ ...newTask, difficulty: e.target.value as any })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="task-energy" className="block text-sm font-medium text-gray-700 mb-2">Energy Required</label>
                    <select
                      id="task-energy"
                      value={newTask.energyRequired}
                      onChange={(e) => setNewTask({ ...newTask, energyRequired: e.target.value as any })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="task-category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      id="task-category"
                      value={newTask.category}
                      onChange={(e) => setNewTask({ ...newTask, category: e.target.value as any })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="health">Health</option>
                      <option value="creative">Creative</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowNewTaskForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addNewTask}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    disabled={!newTask.title}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExecutiveFunctionSupport;

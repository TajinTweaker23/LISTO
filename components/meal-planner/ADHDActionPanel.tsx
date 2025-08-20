import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  ShoppingCart, 
  Zap, 
  Timer, 
  Bell,
  CheckCircle,
  Plus,
  Sparkles,
  Brain,
  Target
} from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface ADHDActionPanelProps {
  onQuickAdd: () => void;
  onAutoSchedule: () => void;
  onShoppingList: () => void;
  onSetReminders: () => void;
  focusMode: boolean;
  onToggleFocus: () => void;
}

export const ADHDActionPanel: React.FC<ADHDActionPanelProps> = ({
  onQuickAdd,
  onAutoSchedule,
  onShoppingList,
  onSetReminders,
  focusMode,
  onToggleFocus
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [completedActions, setCompletedActions] = useState<Set<string>>(new Set());

  const markActionComplete = useCallback((actionId: string) => {
    setCompletedActions(prev => new Set([...prev, actionId]));
    toast.success("Action completed! 🎉", {
      description: "Great job staying on track!"
    });
  }, []);

  const actionItems = [
    {
      id: 'quick-add',
      icon: Plus,
      label: 'Quick Add Meal',
      description: 'Add a meal in 30 seconds',
      color: 'from-emerald-400 to-emerald-600',
      action: () => {
        onQuickAdd();
        markActionComplete('quick-add');
      },
      urgency: 'low'
    },
    {
      id: 'auto-schedule',
      icon: Sparkles,
      label: 'Auto-Schedule Week',
      description: 'AI plans your entire week',
      color: 'from-purple-400 to-purple-600',
      action: () => {
        onAutoSchedule();
        markActionComplete('auto-schedule');
      },
      urgency: 'medium'
    },
    {
      id: 'shopping',
      icon: ShoppingCart,
      label: 'Generate Shopping List',
      description: 'Instant grocery list from meals',
      color: 'from-blue-400 to-blue-600',
      action: () => {
        onShoppingList();
        markActionComplete('shopping');
      },
      urgency: 'high'
    },
    {
      id: 'reminders',
      icon: Bell,
      label: 'Set Smart Reminders',
      description: 'Prep & cook notifications',
      color: 'from-orange-400 to-orange-600',
      action: () => {
        onSetReminders();
        markActionComplete('reminders');
      },
      urgency: 'medium'
    }
  ];

  return (
    <motion.div
      className={`fixed top-4 right-4 z-50 ${focusMode ? 'opacity-30 hover:opacity-100' : ''}`}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Focus Mode Toggle */}
      <motion.div 
        className="mb-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onToggleFocus}
          className={`flex items-center gap-2 ${
            focusMode 
              ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
              : 'bg-white/80 text-gray-700 border border-gray-200'
          }`}
          size="sm"
        >
          <Brain className="w-4 h-4" />
          {focusMode ? 'Focus Mode ON' : 'Focus Mode OFF'}
        </Button>
      </motion.div>

      {/* Main Action Panel */}
      <motion.div
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
        layout
      >
        {/* Header */}
        <motion.div 
          className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span className="font-semibold">ADHD Action Hub</span>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="w-4 h-4" />
            </motion.div>
          </div>
          
          {!isExpanded && (
            <motion.div 
              className="mt-2 text-sm opacity-90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Tap to access quick actions
            </motion.div>
          )}
        </motion.div>

        {/* Expandable Actions */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="p-4 space-y-3">
                {actionItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <motion.button
                      onClick={item.action}
                      className={`w-full p-3 rounded-xl text-left bg-gradient-to-r ${item.color} text-white shadow-lg hover:shadow-xl transition-all duration-200 group relative overflow-hidden`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={completedActions.has(item.id)}
                    >
                      {/* Urgency Indicator */}
                      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                        item.urgency === 'high' ? 'bg-red-300' :
                        item.urgency === 'medium' ? 'bg-yellow-300' : 'bg-green-300'
                      }`} />
                      
                      {/* Content */}
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          {completedActions.has(item.id) ? (
                            <CheckCircle className="w-5 h-5" />
                          ) : (
                            <item.icon className="w-5 h-5" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm">
                            {item.label}
                          </div>
                          <div className="text-xs opacity-90 truncate">
                            {item.description}
                          </div>
                        </div>
                      </div>

                      {/* Completion Overlay */}
                      {completedActions.has(item.id) && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                            className="text-white font-bold"
                          >
                            ✓ Done!
                          </motion.div>
                        </motion.div>
                      )}

                      {/* Hover Effect */}
                      <motion.div
                        className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={false}
                      />
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* Progress Indicator */}
              <div className="px-4 pb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Timer className="w-4 h-4" />
                  <span>
                    {completedActions.size}/{actionItems.length} actions completed
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(completedActions.size / actionItems.length) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Quick Actions (when collapsed) */}
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-4 flex flex-col gap-2"
          >
            {actionItems.slice(0, 2).map((item, index) => (
              <motion.button
                key={item.id}
                onClick={item.action}
                className={`p-3 rounded-full bg-gradient-to-r ${item.color} text-white shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <item.icon className="w-5 h-5" />
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

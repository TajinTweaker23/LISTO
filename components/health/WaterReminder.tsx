import React, { useState, useEffect } from 'react';

interface WaterIntake {
  id: string;
  amount: number; // in ml
  timestamp: Date;
  type: 'water' | 'tea' | 'coffee' | 'juice' | 'other';
  multiplier: number; // hydration effectiveness
}

const DRINK_TYPES = {
  water: { name: 'Water', multiplier: 1.0, icon: '💧' },
  tea: { name: 'Tea', multiplier: 0.9, icon: '🍵' },
  coffee: { name: 'Coffee', multiplier: 0.8, icon: '☕' },
  juice: { name: 'Juice', multiplier: 0.7, icon: '🧃' },
  other: { name: 'Other', multiplier: 0.6, icon: '🥤' }
};

export const WaterReminder: React.FC = () => {
  const [todayIntake, setTodayIntake] = useState<WaterIntake[]>([]);
  const [dailyGoal] = useState(2500); // ml
  const [lastReminder] = useState<Date | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    // Load today's intake
    const today = new Date().toDateString();
    const savedIntake = localStorage.getItem(`water-${today}`);
    if (savedIntake) {
      setTodayIntake(JSON.parse(savedIntake));
    }

    // Load streak
    const savedStreak = localStorage.getItem('water-streak');
    if (savedStreak) {
      setStreak(parseInt(savedStreak));
    }
  }, []);

  const addWaterIntake = (amount: number, type: keyof typeof DRINK_TYPES) => {
    const newIntake: WaterIntake = {
      id: Date.now().toString(),
      amount,
      timestamp: new Date(),
      type,
      multiplier: DRINK_TYPES[type].multiplier
    };

    const updated = [...todayIntake, newIntake];
    setTodayIntake(updated);

    // Save to localStorage
    const today = new Date().toDateString();
    localStorage.setItem(`water-${today}`, JSON.stringify(updated));
  };

  const getEffectiveIntake = () => {
    return todayIntake.reduce((total, intake) => 
      total + (intake.amount * intake.multiplier), 0
    );
  };

  const getProgressPercentage = () => {
    return Math.min((getEffectiveIntake() / dailyGoal) * 100, 100);
  };

  const shouldShowReminder = () => {
    if (!lastReminder) return true;
    const hoursSince = (Date.now() - lastReminder.getTime()) / (1000 * 60 * 60);
    return hoursSince >= 2; // Remind every 2 hours
  };

  const getMedicalInsight = () => {
    const percentage = getProgressPercentage();
    if (percentage < 25) return "🚨 Severe dehydration risk. Your kidneys are working overtime.";
    if (percentage < 50) return "⚠️ Mild dehydration. Your blood is getting thicker.";
    if (percentage < 75) return "👍 On track. Your cells are getting what they need.";
    return "🎉 Excellent hydration! Your body is operating optimally.";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Hydration Station</h2>
        <div className="flex items-center gap-2">
          <span className="text-blue-500">💧</span>
          <span className="text-sm font-medium text-gray-600">{streak} day streak</span>
        </div>
      </div>

      {/* Progress Circle */}
      <div className="relative w-32 h-32 mx-auto mb-6">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="64"
            cy="64"
            r="56"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={`${2 * Math.PI * 56}`}
            strokeDashoffset={`${2 * Math.PI * 56 * (1 - getProgressPercentage() / 100)}`}
            className="text-blue-500 transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-blue-600">
            {Math.round(getProgressPercentage())}%
          </span>
          <span className="text-xs text-gray-500">
            {Math.round(getEffectiveIntake())}ml
          </span>
        </div>
      </div>

      {/* Medical Insight */}
      <div className="bg-blue-50 rounded-lg p-3 mb-4">
        <p className="text-sm text-blue-700 font-medium">
          {getMedicalInsight()}
        </p>
      </div>

      {/* Quick Add Buttons */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {Object.entries(DRINK_TYPES).map(([key, drink]) => (
          <button
            key={key}
            onClick={() => addWaterIntake(250, key as keyof typeof DRINK_TYPES)}
            className="flex items-center justify-center gap-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
          >
            <span className="text-lg">{drink.icon}</span>
            <span className="text-sm font-medium">250ml</span>
          </button>
        ))}
      </div>

      {/* Today's Log */}
      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-700 mb-2">Today's Intake</h3>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {todayIntake.slice(-3).map((intake) => (
            <div key={intake.id} className="flex justify-between items-center text-sm">
              <span className="flex items-center gap-2">
                {DRINK_TYPES[intake.type].icon}
                {intake.amount}ml {DRINK_TYPES[intake.type].name}
              </span>
              <span className="text-gray-500">
                {new Date(intake.timestamp).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Smart Reminder */}
      {shouldShowReminder() && getProgressPercentage() < 80 && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            💡 <strong>MA Insight:</strong> It's been 2+ hours since your last drink. 
            Even mild dehydration (2% body water loss) impairs cognitive function.
          </p>
        </div>
      )}
    </div>
  );
};

export default WaterReminder;

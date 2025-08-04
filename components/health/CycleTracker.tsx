import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp, Activity, Brain } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { CycleSymptom, PainData, MoodData } from '../../types/health';

const getPeriodStatusText = (daysUntilPeriod: number): string => {
  return daysUntilPeriod > 0 ? `In ${daysUntilPeriod} days` : 'Expected now';
};

const CycleTracker: React.FC = () => {
  const { 
    currentCycle, 
    addCycleEntry, 
    updateCycleEntry, 
    insights, 
    predictNextPeriod
  } = useHealth();
  
  const [showDetailedEntry, setShowDetailedEntry] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<CycleSymptom[]>([]);
  const [selectedMoods, setSelectedMoods] = useState<MoodData[]>([]);
  const [selectedPain, setSelectedPain] = useState<PainData[]>([]);
  const [flow, setFlow] = useState<'light' | 'medium' | 'heavy' | 'spotting'>('medium');
  const [energy, setEnergy] = useState(5);
  const [notes, setNotes] = useState('');

  const symptomTypes = [
    { type: 'cramps', label: 'Cramps', icon: '🔥' },
    { type: 'bloating', label: 'Bloating', icon: '🎈' },
    { type: 'headache', label: 'Headache', icon: '🧠' },
    { type: 'nausea', label: 'Nausea', icon: '🤢' },
    { type: 'breast_tenderness', label: 'Breast Tenderness', icon: '💙' },
    { type: 'acne', label: 'Acne', icon: '🎯' },
    { type: 'fatigue', label: 'Fatigue', icon: '😴' },
    { type: 'irritability', label: 'Irritability', icon: '😤' },
    { type: 'anxiety', label: 'Anxiety', icon: '😰' },
    { type: 'depression', label: 'Depression', icon: '😔' },
    { type: 'brain_fog', label: 'Brain Fog', icon: '🌫️' },
    { type: 'insomnia', label: 'Insomnia', icon: '🌙' }
  ] as const;

  const moodTypes = [
    { type: 'anxiety', label: 'Anxiety', color: 'red' },
    { type: 'depression', label: 'Depression', color: 'blue' },
    { type: 'irritability', label: 'Irritability', color: 'orange' },
    { type: 'euphoria', label: 'Euphoria', color: 'yellow' },
    { type: 'stable', label: 'Stable', color: 'green' },
    { type: 'overwhelmed', label: 'Overwhelmed', color: 'purple' },
    { type: 'focused', label: 'Focused', color: 'teal' },
    { type: 'scattered', label: 'Scattered', color: 'pink' },
    { type: 'emotional', label: 'Emotional', color: 'indigo' },
    { type: 'numb', label: 'Numb', color: 'gray' }
  ] as const;

  const nextPeriod = predictNextPeriod();
  const currentDate = new Date();
  const daysUntilPeriod = nextPeriod 
    ? Math.ceil((nextPeriod.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24))
    : null;

  const handleAddSymptom = (symptomType: string) => {
    const existingSymptom = selectedSymptoms.find(s => s.type === symptomType);
    if (existingSymptom) {
      setSelectedSymptoms(prev => prev.filter(s => s.type !== symptomType));
    } else {
      const newSymptom: CycleSymptom = {
        type: symptomType as any,
        severity: 5,
        duration: 60,
        timestamp: new Date()
      };
      setSelectedSymptoms(prev => [...prev, newSymptom]);
    }
  };

  const handleAddMood = (moodType: string) => {
    const existingMood = selectedMoods.find(m => m.type === moodType);
    if (existingMood) {
      setSelectedMoods(prev => prev.filter(m => m.type !== moodType));
    } else {
      const newMood: MoodData = {
        type: moodType as any,
        intensity: 5,
        timestamp: new Date()
      };
      setSelectedMoods(prev => [...prev, newMood]);
    }
  };

  const handleSaveEntry = () => {
    if (currentCycle) {
      updateCycleEntry(currentCycle.id, {
        symptoms: [...(currentCycle.symptoms || []), ...selectedSymptoms],
        mood: [...(currentCycle.mood || []), ...selectedMoods],
        pain: [...(currentCycle.pain || []), ...selectedPain],
        flow,
        energy,
        notes: currentCycle.notes ? `${currentCycle.notes}\n${notes}` : notes
      });
    } else {
      addCycleEntry({
        periodStart: new Date(),
        symptoms: selectedSymptoms,
        mood: selectedMoods,
        pain: selectedPain,
        flow,
        energy,
        notes
      });
    }

    // Reset form
    setSelectedSymptoms([]);
    setSelectedMoods([]);
    setSelectedPain([]);
    setNotes('');
    setShowDetailedEntry(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-sage-800 mb-2">Cycle Tracker</h1>
        <p className="text-sage-600">Evidence-based menstrual health tracking</p>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-sage-600" />
            <div>
              <h3 className="font-semibold text-sage-800">Next Period</h3>
              <p className="text-sage-600">
                {daysUntilPeriod !== null ? (
                  getPeriodStatusText(daysUntilPeriod)
                ) : 'Calculating...'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-sage-800">Insights</h3>
              <p className="text-sage-600">{insights.length} patterns detected</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-sage-200">
          <div className="flex items-center gap-3">
            <Activity className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-sage-800">Current Phase</h3>
              <p className="text-sage-600">
                {currentCycle ? 'Tracking active' : 'Start tracking'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Entry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-sage-200"
      >
        <h2 className="text-xl font-semibold text-sage-800 mb-4">Quick Entry</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <button
            onClick={() => addCycleEntry({ periodStart: new Date(), flow: 'light' })}
            className="p-4 rounded-lg bg-pink-50 hover:bg-pink-100 border border-pink-200 transition-colors"
          >
            <span className="text-2xl block mb-1">🩸</span>
            <span className="text-sm font-medium">Period Started</span>
          </button>

          <button
            onClick={() => setShowDetailedEntry(true)}
            className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
          >
            <span className="text-2xl block mb-1">📝</span>
            <span className="text-sm font-medium">Log Symptoms</span>
          </button>

          <button
            onClick={() => handleAddMood('anxiety')}
            className="p-4 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
          >
            <span className="text-2xl block mb-1">🧠</span>
            <span className="text-sm font-medium">Mood Check</span>
          </button>

          <button
            className="p-4 rounded-lg bg-green-50 hover:bg-green-100 border border-green-200 transition-colors"
          >
            <span className="text-2xl block mb-1">📊</span>
            <span className="text-sm font-medium">View Stats</span>
          </button>
        </div>
      </motion.div>

      {/* Detailed Entry Modal */}
      {showDetailedEntry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-sage-800">Detailed Entry</h2>
              <button
                onClick={() => setShowDetailedEntry(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {/* Flow Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-sage-800 mb-3">Flow</h3>
              <div className="grid grid-cols-4 gap-2">
                {(['spotting', 'light', 'medium', 'heavy'] as const).map((flowType) => (
                  <button
                    key={flowType}
                    onClick={() => setFlow(flowType)}
                    className={`p-3 rounded-lg border transition-colors ${
                      flow === flowType
                        ? 'bg-sage-100 border-sage-500 text-sage-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    {flowType.charAt(0).toUpperCase() + flowType.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Energy Level */}
            <div className="mb-6">
              <h3 className="font-semibold text-sage-800 mb-3">Energy Level</h3>
              <div className="flex items-center gap-4">
                <span className="text-sm text-sage-600">Low</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="flex-1"
                  aria-label="Energy level slider"
                  title="Energy level from 1 (low) to 10 (high)"
                />
                <span className="text-sm text-sage-600">High</span>
                <span className="font-semibold text-sage-800 w-8">{energy}</span>
              </div>
            </div>

            {/* Symptoms */}
            <div className="mb-6">
              <h3 className="font-semibold text-sage-800 mb-3">Symptoms</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {symptomTypes.map((symptom) => (
                  <button
                    key={symptom.type}
                    onClick={() => handleAddSymptom(symptom.type)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedSymptoms.some(s => s.type === symptom.type)
                        ? 'bg-red-50 border-red-200 text-red-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg mr-2">{symptom.icon}</span>
                    <span className="text-sm font-medium">{symptom.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mood */}
            <div className="mb-6">
              <h3 className="font-semibold text-sage-800 mb-3">Mood</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {moodTypes.map((mood) => (
                  <button
                    key={mood.type}
                    onClick={() => handleAddMood(mood.type)}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      selectedMoods.some(m => m.type === mood.type)
                        ? `bg-${mood.color}-50 border-${mood.color}-200 text-${mood.color}-800`
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-sm font-medium">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="mb-6">
              <h3 className="font-semibold text-sage-800 mb-3">Notes</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSaveEntry}
                className="flex-1 bg-sage-600 text-white py-3 rounded-lg font-semibold hover:bg-sage-700 transition-colors"
              >
                Save Entry
              </button>
              <button
                onClick={() => setShowDetailedEntry(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Insights */}
      {insights.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 shadow-lg border border-sage-200"
        >
          <div className="flex items-center gap-3 mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-sage-800">Health Insights</h2>
          </div>
          
          <div className="space-y-4">
            {insights.slice(0, 3).map((insight) => (
              <div key={insight.id} className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-800 mb-2">{insight.title}</h3>
                <p className="text-purple-700 text-sm mb-3">{insight.description}</p>
                {insight.recommendations.length > 0 && (
                  <div>
                    <h4 className="font-medium text-purple-800 text-xs uppercase tracking-wider mb-2">
                      Research-Based Recommendations:
                    </h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      {insight.recommendations.map((rec) => (
                        <li key={rec.substring(0, 20)} className="flex items-start gap-2">
                          <span className="text-purple-500 mt-1">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">
                    {Math.round(insight.confidence * 100)}% confidence
                  </span>
                  {insight.researchBased && (
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                      Research-backed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CycleTracker;

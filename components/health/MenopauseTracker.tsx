import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Moon, Brain, TrendingUp } from 'lucide-react';
import { useHealth } from '../../context/HealthContext';
import { MenopauseSymptom, HotFlashData } from '../../types/health';

const MenopauseTracker: React.FC = () => {
  const { menopauseData, updateMenopauseData, insights } = useHealth();
  
  const [showHotFlashEntry, setShowHotFlashEntry] = useState(false);
  const [showSymptomEntry, setShowSymptomEntry] = useState(false);
  const [hotFlashData, setHotFlashData] = useState<Partial<HotFlashData>>({
    intensity: 5,
    duration: 5,
    location: 'face',
    sweating: false
  });

  const [selectedSymptoms, setSelectedSymptoms] = useState<MenopauseSymptom[]>([]);

  const menopauseSymptoms = [
    { type: 'hot_flashes', label: 'Hot Flashes', icon: '🔥', color: 'red' },
    { type: 'night_sweats', label: 'Night Sweats', icon: '💧', color: 'blue' },
    { type: 'sleep_disturbances', label: 'Sleep Issues', icon: '😴', color: 'purple' },
    { type: 'mood_changes', label: 'Mood Changes', icon: '😤', color: 'orange' },
    { type: 'vaginal_dryness', label: 'Vaginal Dryness', icon: '💙', color: 'teal' },
    { type: 'decreased_libido', label: 'Low Libido', icon: '💔', color: 'pink' },
    { type: 'weight_gain', label: 'Weight Gain', icon: '⚖️', color: 'yellow' },
    { type: 'hair_loss', label: 'Hair Changes', icon: '💇', color: 'brown' },
    { type: 'dry_skin', label: 'Dry Skin', icon: '🧴', color: 'green' },
    { type: 'memory_issues', label: 'Memory Issues', icon: '🧠', color: 'indigo' },
    { type: 'concentration_problems', label: 'Focus Problems', icon: '🎯', color: 'cyan' },
    { type: 'joint_stiffness', label: 'Joint Stiffness', icon: '🦴', color: 'gray' }
  ] as const;

  const stageInfo = {
    perimenopause: {
      title: 'Perimenopause',
      description: 'Transitional period before menopause, typically lasting 4-10 years',
      keyPoints: [
        'Irregular periods are common',
        'Hormone levels fluctuate significantly',
        'Symptoms can vary widely month to month'
      ]
    },
    menopause: {
      title: 'Menopause',
      description: 'Defined as 12 consecutive months without a period',
      keyPoints: [
        'Average age is 51 in developed countries',
        'Estrogen and progesterone levels drop significantly',
        'Symptoms often peak during this phase'
      ]
    },
    postmenopause: {
      title: 'Postmenopause',
      description: 'All years after menopause',
      keyPoints: [
        'Hormone levels stabilize at lower levels',
        'Focus shifts to long-term health risks',
        'Bone and cardiovascular health become priorities'
      ]
    }
  };

  const currentStageInfo = menopauseData ? stageInfo[menopauseData.stage] : stageInfo.perimenopause;

  const handleAddSymptom = (symptomType: string) => {
    const existingSymptom = selectedSymptoms.find(s => s.type === symptomType);
    if (existingSymptom) {
      setSelectedSymptoms(prev => prev.filter(s => s.type !== symptomType));
    } else {
      const newSymptom: MenopauseSymptom = {
        type: symptomType as any,
        severity: 5,
        frequency: 'occasional',
        timestamp: new Date(),
        impact: 'moderate'
      };
      setSelectedSymptoms(prev => [...prev, newSymptom]);
    }
  };

  const handleSaveHotFlash = () => {
    const newHotFlash: HotFlashData = {
      intensity: hotFlashData.intensity || 5,
      duration: hotFlashData.duration || 5,
      location: hotFlashData.location || 'face',
      sweating: hotFlashData.sweating || false,
      triggers: hotFlashData.triggers || [],
      timestamp: new Date()
    };

    const updatedData = {
      ...menopauseData,
      hotFlashes: [...(menopauseData?.hotFlashes || []), newHotFlash]
    };

    updateMenopauseData(updatedData);
    setShowHotFlashEntry(false);
    setHotFlashData({ intensity: 5, duration: 5, location: 'face', sweating: false });
  };

  const handleSaveSymptoms = () => {
    const updatedData = {
      ...menopauseData,
      symptoms: [...(menopauseData?.symptoms || []), ...selectedSymptoms]
    };

    updateMenopauseData(updatedData);
    setSelectedSymptoms([]);
    setShowSymptomEntry(false);
  };

  const getRecentHotFlashes = () => {
    if (!menopauseData?.hotFlashes) return 0;
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return menopauseData.hotFlashes.filter(hf => hf.timestamp >= weekAgo).length;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-3xl font-bold text-sage-800 mb-2">Menopause Tracker</h1>
        <p className="text-sage-600">Evidence-based menopause health management</p>
      </motion.div>

      {/* Stage Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200"
      >
        <h2 className="text-xl font-semibold text-purple-800 mb-3">{currentStageInfo.title}</h2>
        <p className="text-purple-700 mb-4">{currentStageInfo.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {currentStageInfo.keyPoints.map((point, index) => (
            <div key={point.substring(0, 10)} className="flex items-start gap-2">
              <span className="text-purple-500 mt-1">•</span>
              <span className="text-sm text-purple-700">{point}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl p-6 shadow-lg border border-red-200">
          <div className="flex items-center gap-3">
            <Thermometer className="w-8 h-8 text-red-600" />
            <div>
              <h3 className="font-semibold text-sage-800">Hot Flashes</h3>
              <p className="text-sage-600">{getRecentHotFlashes()} this week</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-200">
          <div className="flex items-center gap-3">
            <Moon className="w-8 h-8 text-blue-600" />
            <div>
              <h3 className="font-semibold text-sage-800">Sleep Quality</h3>
              <p className="text-sage-600">Track patterns</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-200">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-purple-600" />
            <div>
              <h3 className="font-semibold text-sage-800">Cognitive</h3>
              <p className="text-sage-600">Memory & focus</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-green-200">
          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-sage-800">Insights</h3>
              <p className="text-sage-600">{insights.length} patterns</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-sage-200"
      >
        <h2 className="text-xl font-semibold text-sage-800 mb-4">Quick Entry</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={() => setShowHotFlashEntry(true)}
            className="p-4 rounded-lg bg-red-50 hover:bg-red-100 border border-red-200 transition-colors"
          >
            <span className="text-2xl block mb-1">🔥</span>
            <span className="text-sm font-medium">Hot Flash</span>
          </button>

          <button
            onClick={() => setShowSymptomEntry(true)}
            className="p-4 rounded-lg bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors"
          >
            <span className="text-2xl block mb-1">📝</span>
            <span className="text-sm font-medium">Log Symptoms</span>
          </button>

          <button
            className="p-4 rounded-lg bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
          >
            <span className="text-2xl block mb-1">😴</span>
            <span className="text-sm font-medium">Sleep Log</span>
          </button>

          <button
            className="p-4 rounded-lg bg-green-50 hover:bg-green-100 border border-green-200 transition-colors"
          >
            <span className="text-2xl block mb-1">🧠</span>
            <span className="text-sm font-medium">Mood Check</span>
          </button>
        </div>
      </motion.div>

      {/* Hot Flash Entry Modal */}
      {showHotFlashEntry && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 max-w-lg w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-sage-800">Log Hot Flash</h2>
              <button
                onClick={() => setShowHotFlashEntry(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="intensity-slider" className="block text-sm font-medium text-sage-800 mb-2">
                  Intensity (1-10)
                </label>
                <input
                  id="intensity-slider"
                  type="range"
                  min="1"
                  max="10"
                  value={hotFlashData.intensity || 5}
                  onChange={(e) => setHotFlashData(prev => ({ ...prev, intensity: Number(e.target.value) }))}
                  className="w-full"
                  aria-label="Hot flash intensity rating from 1 to 10"
                />
                <div className="flex justify-between text-xs text-sage-600 mt-1">
                  <span>Mild</span>
                  <span className="font-semibold">{hotFlashData.intensity}</span>
                  <span>Severe</span>
                </div>
              </div>

              <div>
                <label htmlFor="duration-input" className="block text-sm font-medium text-sage-800 mb-2">
                  Duration (minutes)
                </label>
                <input
                  id="duration-input"
                  type="number"
                  min="1"
                  max="60"
                  value={hotFlashData.duration || 5}
                  onChange={(e) => setHotFlashData(prev => ({ ...prev, duration: Number(e.target.value) }))}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  placeholder="Enter duration in minutes"
                />
              </div>

              <div>
                <label htmlFor="location-select" className="block text-sm font-medium text-sage-800 mb-2">
                  Location
                </label>
                <select
                  id="location-select"
                  value={hotFlashData.location || 'face'}
                  onChange={(e) => setHotFlashData(prev => ({ ...prev, location: e.target.value as any }))}
                  className="w-full p-2 border border-gray-200 rounded-lg"
                  aria-label="Hot flash location"
                >
                  <option value="face">Face</option>
                  <option value="neck">Neck</option>
                  <option value="chest">Chest</option>
                  <option value="whole_body">Whole Body</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="sweating"
                  checked={hotFlashData.sweating || false}
                  onChange={(e) => setHotFlashData(prev => ({ ...prev, sweating: e.target.checked }))}
                />
                <label htmlFor="sweating" className="text-sm font-medium text-sage-800">
                  Included sweating
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveHotFlash}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Save Hot Flash
              </button>
              <button
                onClick={() => setShowHotFlashEntry(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Symptom Entry Modal */}
      {showSymptomEntry && (
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
              <h2 className="text-xl font-semibold text-sage-800">Log Symptoms</h2>
              <button
                onClick={() => setShowSymptomEntry(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              {menopauseSymptoms.map((symptom) => (
                <button
                  key={symptom.type}
                  onClick={() => handleAddSymptom(symptom.type)}
                  className={`p-3 rounded-lg border text-left transition-colors ${
                    selectedSymptoms.some(s => s.type === symptom.type)
                      ? `bg-${symptom.color}-50 border-${symptom.color}-200 text-${symptom.color}-800`
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-lg mr-2">{symptom.icon}</span>
                  <span className="text-sm font-medium">{symptom.label}</span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleSaveSymptoms}
                className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Save Symptoms
              </button>
              <button
                onClick={() => setShowSymptomEntry(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Research-Based Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-sage-200"
      >
        <h2 className="text-xl font-semibold text-sage-800 mb-4">Evidence-Based Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2">Lifestyle Interventions</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Regular exercise reduces hot flash frequency by 40-60%</li>
              <li>• Mediterranean diet supports hormonal balance</li>
              <li>• Stress reduction techniques improve sleep quality</li>
            </ul>
          </div>

          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Cognitive Health</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Brain fog affects 60% during perimenopause</li>
              <li>• Omega-3 supplementation shows cognitive benefits</li>
              <li>• Sleep optimization crucial for memory consolidation</li>
            </ul>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <h3 className="font-semibold text-purple-800 mb-2">Bone Health</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Bone loss accelerates during menopause transition</li>
              <li>• Weight-bearing exercise essential for bone density</li>
              <li>• Calcium + Vitamin D combination most effective</li>
            </ul>
          </div>

          <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
            <h3 className="font-semibold text-pink-800 mb-2">Cardiovascular</h3>
            <ul className="text-sm text-pink-700 space-y-1">
              <li>• Heart disease risk increases post-menopause</li>
              <li>• Blood pressure monitoring becomes critical</li>
              <li>• Plant-based diets reduce cardiovascular risk</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MenopauseTracker;

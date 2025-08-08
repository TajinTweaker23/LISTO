import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Brain, 
  Activity, 
  Moon, 
  Calendar,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Zap,
  Target
} from 'lucide-react';
import { Card } from '../ui/EnhancedCards';
import MoodWeatherTracker from './MoodWeatherTracker';
import CycleTracker from './CycleTracker';
import MenopauseTracker from './MenopauseTracker';
import WaterTracker from './WaterTracker';
import EnhancedMoodTracker from './EnhancedMoodTracker';
import HealthGoalTracker from './HealthGoalTracker';
import MedicationCorrelationTracker from './MedicationCorrelationTracker';

type HealthSection = 'overview' | 'cycle' | 'menopause' | 'mood-weather' | 'medication' | 'water' | 'goals' | 'enhanced-mood';

interface OverviewDashboardProps {
  healthSections: Array<{
    id: HealthSection;
    title: string;
    description: string;
    icon: React.ReactElement;
    color: string;
  }>;
  onSectionSelect: (section: HealthSection) => void;
}

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ healthSections, onSectionSelect }) => (
  <div className="space-y-8">
    {/* Welcome Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <Heart className="w-8 h-8 text-red-500" />
        <h1 className="text-4xl font-bold text-sage-800">Holistic Health Hub</h1>
        <Sparkles className="w-8 h-8 text-yellow-500" />
      </div>
      <p className="text-xl text-sage-600 max-w-3xl mx-auto">
        Evidence-based, neurodivergent-friendly health tracking that respects your complexity. 
        Research-backed insights for your reproductive health, mental wellness, and environmental correlations.
      </p>
    </motion.div>

    {/* Research Highlight */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200"
    >
      <div className="flex items-center gap-3 mb-4">
        <TrendingUp className="w-6 h-6 text-indigo-600" />
        <h2 className="text-xl font-semibold text-indigo-800">Latest Research Integration</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div className="p-3 bg-white rounded-lg">
          <strong className="text-indigo-800">Menstrual Health:</strong>
          <p className="text-indigo-700 mt-1">67% of people experience cycle-related mood changes. Our tracking correlates 14 symptoms with hormonal phases.</p>
        </div>
        <div className="p-3 bg-white rounded-lg">
          <strong className="text-purple-800">Menopause Research:</strong>
          <p className="text-purple-700 mt-1">Perimenopause lasts 4-10 years on average. We track 12 validated symptoms with severity scoring.</p>
        </div>
        <div className="p-3 bg-white rounded-lg">
          <strong className="text-blue-800">Neurodivergent Weather:</strong>
          <p className="text-blue-700 mt-1">43% of ADHD individuals are barometric pressure sensitive. We correlate 9 environmental factors.</p>
        </div>
      </div>
    </motion.div>

    {/* Health Sections Grid */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {healthSections.map((section) => (
        <motion.div
          key={section.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSectionSelect(section.id)}
          className="cursor-pointer"
        >
          <Card variant="glass" className="p-6 h-full hover:shadow-lg transition-all duration-300">
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-${section.color}-100 text-${section.color}-600`}>
                {section.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">{section.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{section.description}</p>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  <span>Explore</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>

    {/* Privacy Notice */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-gray-50 rounded-xl p-6 border border-gray-200"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <span className="text-green-600 text-sm">🔒</span>
        </div>
        <h3 className="font-semibold text-gray-800">Your Privacy Matters</h3>
      </div>
      <p className="text-gray-600 text-sm">
        All health data is stored locally on your device with optional encryption. 
        You maintain complete control over your sensitive information, with options to export 
        for healthcare providers when needed.
      </p>
    </motion.div>
  </div>
);

const HealthDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<HealthSection>('overview');

  const healthSections = [
    {
      id: 'cycle' as const,
      title: 'Cycle Tracking',
      description: 'Comprehensive menstrual health monitoring',
      icon: <Calendar className="w-6 h-6" />,
      color: 'pink',
      component: CycleTracker
    },
    {
      id: 'menopause' as const,
      title: 'Menopause Support',
      description: 'Evidence-based perimenopause & menopause tracking',
      icon: <Moon className="w-6 h-6" />,
      color: 'purple',
      component: MenopauseTracker
    },
    {
      id: 'mood-weather' as const,
      title: 'Mood & Weather',
      description: 'Environmental correlations with neurodivergent traits',
      icon: <Brain className="w-6 h-6" />,
      color: 'blue',
      component: MoodWeatherTracker
    },
    {
      id: 'medication' as const,
      title: 'Medication Correlation',
      description: 'Statistical analysis of medication effectiveness',
      icon: <Activity className="w-6 h-6" />,
      color: 'green',
      component: MedicationCorrelationTracker
    },
    {
      id: 'water' as const,
      title: 'Hydration',
      description: 'Water intake tracking and reminders',
      icon: <Zap className="w-6 h-6" />,
      color: 'cyan',
      component: WaterTracker
    },
    {
      id: 'goals' as const,
      title: 'Health Goals',
      description: 'Track and achieve your wellness objectives',
      icon: <Target className="w-6 h-6" />,
      color: 'orange',
      component: HealthGoalTracker
    },
    {
      id: 'enhanced-mood' as const,
      title: 'Enhanced Mood',
      description: 'Advanced mood tracking with correlations',
      icon: <Sparkles className="w-6 h-6" />,
      color: 'indigo',
      component: EnhancedMoodTracker
    }
  ];

  const getCurrentComponent = () => {
    const section = healthSections.find(s => s.id === activeSection);
    if (section) {
      const Component = section.component;
      return <Component />;
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        {activeSection !== 'overview' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6"
          >
            <button
              onClick={() => setActiveSection('overview')}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Back to Health Overview</span>
            </button>
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'overview' ? (
            <OverviewDashboard 
              healthSections={healthSections} 
              onSectionSelect={setActiveSection}
            />
          ) : (
            getCurrentComponent()
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HealthDashboard;

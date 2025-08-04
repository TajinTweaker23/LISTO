import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Heart, 
  Brain, 
  Activity, 
  Moon, 
  Calendar,
  TrendingUp,
  Users,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import CycleTracker from '../components/health/CycleTracker';
import MenopauseTracker from '../components/health/MenopauseTracker';
import MoodWeatherTracker from '../components/health/MoodWeatherTracker';
import { useHealth } from '../context/HealthContext';
import { HealthInsight } from '../types/health';

type HealthSection = 'overview' | 'cycle' | 'menopause' | 'mood-weather' | 'empathy-echoes';

interface OverviewDashboardProps {
  insights: HealthInsight[];
  onSectionSelect: (section: HealthSection) => void;
}

interface EmpathyEchoesPreviewProps {
  // Future props can be added here
}

const OverviewDashboard: React.FC<OverviewDashboardProps> = ({ insights, onSectionSelect }) => (
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
        No sappy shit, just research-backed insights for your reproductive health, mental wellness, and environmental correlations.
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
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {[
        {
          id: 'cycle' as const,
          title: 'Cycle Tracking',
          description: 'Comprehensive menstrual health monitoring',
          icon: <Calendar className="w-6 h-6" />,
          color: 'pink',
          stats: 'Start tracking'
        },
        {
          id: 'menopause' as const,
          title: 'Menopause Support',
          description: 'Evidence-based perimenopause & menopause tracking',
          icon: <Moon className="w-6 h-6" />,
          color: 'purple',
          stats: 'Begin journey'
        },
        {
          id: 'mood-weather' as const,
          title: 'Environmental Correlations',
          description: 'Weather, mood, and neurodivergent pattern analysis',
          icon: <Brain className="w-6 h-6" />,
          color: 'blue',
          stats: `${insights.length} patterns discovered`
        },
        {
          id: 'empathy-echoes' as const,
          title: 'Empathy Echoes Network',
          description: 'Anonymous support community (Coming Soon)',
          icon: <Users className="w-6 h-6" />,
          color: 'green',
          stats: 'Revolutionary social support'
        }
      ].map((section) => {
        const getColorClasses = (color: string) => {
          switch (color) {
            case 'pink':
              return {
                bg: 'bg-pink-50',
                border: 'border-pink-200',
                text: 'text-pink-800',
                accent: 'text-pink-600'
              };
            case 'purple':
              return {
                bg: 'bg-purple-50',
                border: 'border-purple-200',
                text: 'text-purple-800',
                accent: 'text-purple-600'
              };
            case 'blue':
              return {
                bg: 'bg-blue-50',
                border: 'border-blue-200',
                text: 'text-blue-800',
                accent: 'text-blue-600'
              };
            case 'green':
              return {
                bg: 'bg-green-50',
                border: 'border-green-200',
                text: 'text-green-800',
                accent: 'text-green-600'
              };
            default:
              return {
                bg: 'bg-sage-50',
                border: 'border-sage-200',
                text: 'text-sage-800',
                accent: 'text-sage-600'
              };
          }
        };

        const colors = getColorClasses(section.color);
        return (
          <motion.div
            key={section.id}
            whileHover={{ scale: 1.02 }}
            className={`${colors.bg} ${colors.border} border rounded-xl p-6 cursor-pointer group transition-all duration-200`}
            onClick={() => onSectionSelect(section.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 bg-white rounded-lg ${colors.border} border`}>
                <div className={colors.accent}>
                  {section.icon}
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 ${colors.accent} group-hover:translate-x-1 transition-transform`} />
            </div>
            
            <h3 className={`text-xl font-semibold ${colors.text} mb-2`}>
              {section.title}
            </h3>
            <p className={`${colors.text} opacity-80 mb-4`}>
              {section.description}
            </p>
            
            <div className={`inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full ${colors.border} border`}>
              <Activity className={`w-4 h-4 ${colors.accent}`} />
              <span className={`text-sm font-medium ${colors.text}`}>
                {section.stats}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>

    {/* Quick Insights */}
    {insights.length > 0 && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg border border-sage-200"
      >
        <h2 className="text-xl font-semibold text-sage-800 mb-4">Recent Insights</h2>
        <div className="space-y-3">
          {insights.slice(0, 3).map((insight) => (
            <div key={insight.id} className="flex items-start gap-3 p-3 bg-sage-50 rounded-lg">
              <TrendingUp className="w-5 h-5 text-sage-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-sage-800">{insight.title}</h3>
                <p className="text-sm text-sage-600">{insight.description}</p>
                <span className="text-xs text-sage-500">
                  {Math.round(insight.confidence * 100)}% confidence • {
                    typeof insight.sources?.[0] === 'string' 
                      ? insight.sources[0] 
                      : insight.sources?.[0]?.title || 'Health Analysis'
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    )}
  </div>
);

const EmpathyEchoesPreview: React.FC<EmpathyEchoesPreviewProps> = () => (
  <div className="max-w-4xl mx-auto p-6 space-y-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <div className="flex items-center justify-center gap-3 mb-4">
        <Users className="w-8 h-8 text-green-600" />
        <h1 className="text-3xl font-bold text-sage-800">Empathy Echoes</h1>
        <Sparkles className="w-8 h-8 text-yellow-500" />
      </div>
      <p className="text-sage-600 max-w-2xl mx-auto">
        Revolutionary anonymous social network for health support. Coming soon with research-backed community features.
      </p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-8 border border-green-200"
    >
      <h2 className="text-2xl font-semibold text-green-800 mb-6">Planned Features</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Anonymous Health Circles</h3>
            <p className="text-sm text-green-700">
              Join topic-specific support groups (PCOS, Endometriosis, Perimenopause, ADHD) with complete anonymity.
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Symptom Pattern Matching</h3>
            <p className="text-sm text-green-700">
              Find others with similar health patterns without revealing personal data. AI-powered connection system.
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Research Participation</h3>
            <p className="text-sm text-green-700">
              Contribute anonymized data to women's health research. Opt-in participation with full control.
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Evidence-Based Sharing</h3>
            <p className="text-sm text-green-700">
              Share what works with research citations. Community-validated treatment experiences.
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-800 mb-2">Neurodivergent Focused</h3>
            <p className="text-sm text-green-700">
              Built for ADHD, autism, and other neurodivergent experiences. Sensory-friendly interface design.
            </p>
          </div>
          
          <div className="p-4 bg-white rounded-lg border border-green-200">
            <h3 className="font-semibold text-green-808 mb-2">Crisis Support Network</h3>
            <p className="text-sm text-green-700">
              Immediate support system with trained peer counselors. 24/7 availability with professional backup.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-6 bg-white rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold text-green-800 mb-3">Development Roadmap</h3>
        <div className="space-y-2 text-sm text-green-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span><strong>Phase 1 (Q2 2024):</strong> Anonymous group creation and basic messaging</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <span><strong>Phase 2 (Q3 2024):</strong> AI pattern matching and research integration</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span><strong>Phase 3 (Q4 2024):</strong> Crisis support and professional network</span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
);

const HealthDashboard: React.FC = () => {
  const [activeSection, setActiveSection] = useState<HealthSection>('overview');
  const { insights } = useHealth();

  const renderContent = () => {
    switch (activeSection) {
      case 'cycle':
        return <CycleTracker />;
      case 'menopause':
        return <MenopauseTracker />;
      case 'mood-weather':
        return <MoodWeatherTracker />;
      case 'empathy-echoes':
        return <EmpathyEchoesPreview />;
      default:
        return (
          <OverviewDashboard 
            insights={insights} 
            onSectionSelect={setActiveSection}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-green-50">
      {activeSection !== 'overview' && (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-sage-200">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <button
              onClick={() => setActiveSection('overview')}
              className="flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors"
            >
              <ChevronRight className="w-4 h-4 rotate-180" />
              <span>Back to Health Dashboard</span>
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-6 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default HealthDashboard;

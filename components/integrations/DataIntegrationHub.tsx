import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Activity, 
  Heart, 
  Cloud, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  TrendingUp,
  Brain,
  Zap,
  Shield
} from 'lucide-react';

interface IntegrationData {
  healthLowEnergyDays: Date[];
  activismOptimalDays: Date[];
  focusOptimalTimes: { hour: number; effectiveness: number }[];
  weatherAlerts: WeatherAlert[];
  predictiveInsights: PredictiveInsight[];
  crossCorrelations: CrossCorrelation[];
}

interface WeatherAlert {
  id: string;
  type: 'pressure_drop' | 'temperature_extreme' | 'humidity_spike' | 'uv_warning';
  severity: 'low' | 'medium' | 'high';
  message: string;
  suggestions: string[];
  triggerTime: Date;
  affectedSystems: string[];
}

interface PredictiveInsight {
  id: string;
  prediction: string;
  confidence: number;
  timeframe: '1day' | '3days' | '1week' | '1month';
  category: 'health' | 'productivity' | 'activism' | 'mood';
  actionableAdvice: string[];
  dataPoints: string[];
}

interface CrossCorrelation {
  id: string;
  pattern: string;
  strength: number; // 0-1
  description: string;
  examples: string[];
  recommendations: string[];
}

const DataIntegrationHub: React.FC = () => {
  const [integrationData, setIntegrationData] = useState<IntegrationData | null>(null);
  const [activeTab, setActiveTab] = useState<'calendar' | 'predictions' | 'correlations' | 'alerts'>('calendar');
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    generateIntegrationData();
  }, []);

  const generateIntegrationData = async () => {
    setIsGenerating(true);
    
    // Simulate AI analysis of user's data patterns
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockData: IntegrationData = {
      healthLowEnergyDays: [
        new Date(2025, 7, 12), // Aug 12
        new Date(2025, 7, 26), // Aug 26
        new Date(2025, 8, 9),  // Sep 9
      ],
      activismOptimalDays: [
        new Date(2025, 7, 8),  // Aug 8
        new Date(2025, 7, 15), // Aug 15
        new Date(2025, 7, 22), // Aug 22
      ],
      focusOptimalTimes: [
        { hour: 9, effectiveness: 92 },
        { hour: 14, effectiveness: 87 },
        { hour: 16, effectiveness: 78 },
        { hour: 20, effectiveness: 82 },
      ],
      weatherAlerts: [
        {
          id: 'alert-1',
          type: 'pressure_drop',
          severity: 'high',
          message: 'Significant barometric pressure drop expected tomorrow',
          suggestions: [
            'Schedule lighter tasks',
            'Prepare migraine management kit',
            'Plan indoor activism activities',
            'Set up cozy focus environment'
          ],
          triggerTime: new Date(Date.now() + 1000 * 60 * 60 * 18), // 18 hours
          affectedSystems: ['focus', 'mood', 'physical-comfort']
        },
        {
          id: 'alert-2',
          type: 'temperature_extreme',
          severity: 'medium',
          message: 'Heat wave approaching - cognitive performance may be impacted',
          suggestions: [
            'Schedule important work for morning hours',
            'Increase hydration reminders',
            'Plan virtual activism meetings',
            'Prepare cooling strategies'
          ],
          triggerTime: new Date(Date.now() + 1000 * 60 * 60 * 72), // 3 days
          affectedSystems: ['cognitive-function', 'energy-levels']
        }
      ],
      predictiveInsights: [
        {
          id: 'insight-1',
          prediction: 'Your activism energy will peak in 4 days (cycle day 16)',
          confidence: 89,
          timeframe: '3days',
          category: 'activism',
          actionableAdvice: [
            'Schedule important advocacy calls for Aug 8-10',
            'Plan community organizing events',
            'Draft compelling social media content',
            'Prepare for high-energy activism work'
          ],
          dataPoints: ['menstrual cycle phase', 'historical activism engagement', 'energy tracking']
        },
        {
          id: 'insight-2',
          prediction: 'Focus challenges likely on Aug 12 due to cycle + weather convergence',
          confidence: 76,
          timeframe: '1week',
          category: 'productivity',
          actionableAdvice: [
            'Block calendar for self-care on Aug 12',
            'Prepare gentle, low-cognitive-load tasks',
            'Set up sensory comfort kit',
            'Plan supportive environmental adjustments'
          ],
          dataPoints: ['cycle tracking', 'weather sensitivity', 'focus timer patterns']
        },
        {
          id: 'insight-3',
          prediction: 'Optimal health tracking window: Aug 5-8 (high self-awareness period)',
          confidence: 93,
          timeframe: '3days',
          category: 'health',
          actionableAdvice: [
            'Complete detailed health check-ins',
            'Review and update health patterns',
            'Document nuanced symptom experiences',
            'Set health goals for next cycle'
          ],
          dataPoints: ['mood patterns', 'cycle phase', 'previous tracking consistency']
        }
      ],
      crossCorrelations: [
        {
          id: 'corr-1',
          pattern: 'Weather + Cycle Phase = Productivity Sweet Spot',
          strength: 0.84,
          description: 'Your highest productivity occurs when follicular phase coincides with stable barometric pressure',
          examples: [
            'July 15-18: Follicular + stable pressure = 40% higher focus timer completion',
            'June 8-11: Similar pattern = completed 3 major activism projects'
          ],
          recommendations: [
            'Schedule important deadlines for follicular + stable weather periods',
            'Use luteal + pressure-sensitive days for planning and reflection',
            'Build weather-cycle calendar template for project planning'
          ]
        },
        {
          id: 'corr-2',
          pattern: 'Activism Success × Self-Care Balance',
          strength: 0.78,
          description: 'Your most impactful activism work happens when preceded by intentional health tracking',
          examples: [
            'Post-health check days show 60% higher activism engagement',
            'Weeks with consistent mood tracking = more sustained activism energy'
          ],
          recommendations: [
            'Plan activism campaigns after health reflection periods',
            'Use health insights to time advocacy efforts',
            'Create activism sustainability protocols based on health patterns'
          ]
        }
      ]
    };

    setIntegrationData(mockData);
    setIsGenerating(false);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getConfidenceClass = (confidence: number) => {
    if (confidence >= 85) return 'bg-green-100 text-green-700';
    if (confidence >= 70) return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 85) return 'High';
    if (confidence >= 70) return 'Medium';
    return 'Low';
  };

  const getTimeEffectivenessLabel = (effectiveness: number) => {
    if (effectiveness >= 90) return 'Peak time';
    if (effectiveness >= 80) return 'Great time';
    return 'Good time';
  };

  const getStrengthClass = (strength: number) => {
    if (strength >= 0.8) return 'bg-purple-100 text-purple-700';
    if (strength >= 0.6) return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health': return <Heart className="w-5 h-5" />;
      case 'productivity': return <Brain className="w-5 h-5" />;
      case 'activism': return <Zap className="w-5 h-5" />;
      case 'mood': return <Activity className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getWeatherIcon = (type: string) => {
    switch (type) {
      case 'pressure_drop': return <TrendingUp className="w-5 h-5 rotate-180" />;
      case 'temperature_extreme': return <AlertTriangle className="w-5 h-5" />;
      case 'humidity_spike': return <Cloud className="w-5 h-5" />;
      case 'uv_warning': return <Activity className="w-5 h-5" />;
      default: return <Cloud className="w-5 h-5" />;
    }
  };

  if (isGenerating) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6"
          >
            <Brain className="w-full h-full text-purple-500" />
          </motion.div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Analyzing Your Patterns</h2>
          <p className="text-gray-600">Cross-referencing health, productivity, activism, and environmental data...</p>
          <div className="mt-6 space-y-2">
            <div className="text-sm text-gray-500">🔍 Processing cycle correlations</div>
            <div className="text-sm text-gray-500">🌤️ Analyzing weather sensitivities</div>
            <div className="text-sm text-gray-500">⚡ Generating predictive insights</div>
            <div className="text-sm text-gray-500">🎯 Creating optimization recommendations</div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!integrationData) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Shield className="w-8 h-8 text-blue-500" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Integration Hub
          </h1>
          <Brain className="w-8 h-8 text-purple-500" />
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          AI-powered cross-correlation of your health, productivity, activism, and environmental data
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-xl p-2 shadow-lg"
      >
        <div className="flex space-x-1">
          {[
            { id: 'calendar', label: 'Smart Calendar', icon: Calendar },
            { id: 'predictions', label: 'Predictions', icon: TrendingUp },
            { id: 'correlations', label: 'Correlations', icon: Activity },
            { id: 'alerts', label: 'Weather Alerts', icon: Cloud },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                activeTab === id
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {activeTab === 'calendar' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Optimal Energy Calendar */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                High Energy Windows
              </h3>
              <div className="space-y-3">
                {integrationData.activismOptimalDays.map((date) => (
                  <div key={date.toISOString()} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <div className="font-medium text-green-800">{date.toDateString()}</div>
                      <div className="text-sm text-green-600">Optimal for activism & important work</div>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Low Energy Days */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-purple-500" />
                Self-Care Priority Days
              </h3>
              <div className="space-y-3">
                {integrationData.healthLowEnergyDays.map((date) => (
                  <div key={date.toISOString()} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <div>
                      <div className="font-medium text-purple-800">{date.toDateString()}</div>
                      <div className="text-sm text-purple-600">Plan gentle activities & rest</div>
                    </div>
                    <Heart className="w-5 h-5 text-purple-500" />
                  </div>
                ))}
              </div>
            </div>

            {/* Focus Time Optimization */}
            <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Brain className="w-5 h-5 text-blue-500" />
                Daily Focus Optimization
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {integrationData.focusOptimalTimes.map((time) => (
                  <div key={`focus-${time.hour}`} className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="text-2xl font-bold text-blue-600">{time.hour}:00</div>
                    <div className="text-sm text-blue-700 font-medium">{time.effectiveness}% effective</div>
                    <div className="text-xs text-blue-600 mt-1">
                      {getTimeEffectivenessLabel(time.effectiveness)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'predictions' && (
          <div className="space-y-6">
            {integrationData.predictiveInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-blue-500"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(insight.category)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{insight.prediction}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>Confidence: {insight.confidence}%</span>
                        <span>•</span>
                        <span>{insight.timeframe}</span>
                      </div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${getConfidenceClass(insight.confidence)}`}>
                    {getConfidenceLabel(insight.confidence)} Confidence
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-700 mb-2">Recommended Actions:</h4>
                  <ul className="space-y-1">
                    {insight.actionableAdvice.map((advice) => (
                      <li key={advice.substring(0, 20)} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {advice}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <details className="text-sm text-gray-500">
                    <summary className="cursor-pointer font-medium">Data Sources</summary>
                    <ul className="mt-2 space-y-1">
                      {insight.dataPoints.map((point) => (
                        <li key={point} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </details>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'correlations' && (
          <div className="space-y-6">
            {integrationData.crossCorrelations.map((correlation, index) => (
              <motion.div
                key={correlation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{correlation.pattern}</h3>
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-600">Strength:</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStrengthClass(correlation.strength)}`}>
                      {Math.round(correlation.strength * 100)}%
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{correlation.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Examples:</h4>
                    <ul className="space-y-2">
                      {correlation.examples.map((example) => (
                        <li key={example.substring(0, 20)} className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Recommendations:</h4>
                    <ul className="space-y-2">
                      {correlation.recommendations.map((rec) => (
                        <li key={rec.substring(0, 20)} className="flex items-start gap-2 text-sm text-gray-600">
                          <TrendingUp className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-6">
            {integrationData.weatherAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-xl p-6 shadow-lg border-2 ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-white shadow-sm">
                    {getWeatherIcon(alert.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{alert.message}</h3>
                      <div className="text-sm font-medium">
                        {alert.triggerTime.toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="text-sm font-medium mb-2">Affected Systems:</div>
                      <div className="flex flex-wrap gap-2">
                        {alert.affectedSystems.map((system) => (
                          <span key={system} className="px-2 py-1 bg-white rounded text-xs font-medium">
                            {system}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-2">Suggested Preparations:</div>
                      <ul className="space-y-1">
                        {alert.suggestions.map((suggestion) => (
                          <li key={suggestion.substring(0, 20)} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {integrationData.weatherAlerts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow-lg">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">All Clear!</h3>
                <p className="text-gray-600">No weather alerts affecting your patterns right now.</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default DataIntegrationHub;

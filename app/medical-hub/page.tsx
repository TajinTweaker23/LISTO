'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import MedicalMicroLearning from '../../components/medical/MedicalMicroLearning';
import MedicalAdminAssistant from '../../components/medical/MedicalAdminAssistant';
import DiseasePreventionHub from '../../components/medical/DiseasePreventionHub';
import { 
  Stethoscope, 
  Shield, 
  Brain, 
  GraduationCap,
  HeartHandshake
} from 'lucide-react';

const TABS = [
  { 
    id: 'learning', 
    label: 'Brain Rot Learning', 
    icon: Brain,
    description: 'Medical facts in TikTok-style bite-sized format'
  },
  { 
    id: 'prevention', 
    label: 'Disease Prevention', 
    icon: Shield,
    description: 'Evidence-based + holistic prevention strategies'
  },
  { 
    id: 'assistant', 
    label: 'MA Assistant', 
    icon: HeartHandshake,
    description: 'Navigate healthcare like an insider'
  }
];

export default function MedicalHub() {
  const [activeTab, setActiveTab] = useState('learning');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'learning':
        return <MedicalMicroLearning />;
      case 'prevention':
        return <DiseasePreventionHub />;
      case 'assistant':
        return <MedicalAdminAssistant />;
      default:
        return <MedicalMicroLearning />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Stethoscope className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Medical Education Hub
            </h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Combining no-nonsense medical facts with holistic wellness approach. 
            Built by MA expertise for real-world healthcare navigation.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col md:flex-row justify-center mb-8"
        >
          <div className="bg-white rounded-2xl p-2 shadow-sm inline-flex flex-col md:flex-row gap-2">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-6 py-4 rounded-xl transition-all duration-300 flex items-center gap-3 group ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <div className="text-left">
                    <div className="font-medium">{tab.label}</div>
                    <div className={`text-xs opacity-80 ${
                      activeTab === tab.id ? 'text-white' : 'text-gray-500'
                    }`}>
                      {tab.description}
                    </div>
                  </div>
                  
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-green-500 rounded-xl -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="min-h-[600px]"
        >
          {renderTabContent()}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12 pt-8 border-t border-gray-200"
        >
          <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
            <GraduationCap className="w-5 h-5" />
            <span className="font-medium">Evidence-Based Medical Education</span>
          </div>
          <p className="text-sm text-gray-500">
            Combining clinical expertise with holistic wellness • Built for healthcare professionals and patients
          </p>
        </motion.div>
      </div>
    </div>
  );
}

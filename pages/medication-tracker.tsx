import React from 'react';
import { motion } from 'framer-motion';
import { Pill, TrendingUp, Shield, Brain, BarChart3, Lock } from 'lucide-react';
import MedicationCorrelationTracker from '../components/health/MedicationCorrelationTracker';

const MedicationTrackerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-blue-50">
      <div className="container mx-auto py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-sage-800 mb-4 flex items-center justify-center gap-3">
            <Pill className="w-10 h-10 text-blue-600" />
            Medication Correlation Tracker
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Evidence-based medication effectiveness tracking with comprehensive privacy controls
          </p>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white p-6 rounded-xl border border-blue-200 text-center">
            <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-sage-800 mb-2">Smart Correlations</h3>
            <p className="text-sm text-sage-600">
              AI-powered analysis identifies medication effectiveness patterns across symptoms
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-purple-200 text-center">
            <Brain className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-semibold text-sage-800 mb-2">Neurodivergent Focus</h3>
            <p className="text-sm text-sage-600">
              Track ADHD, autism, and other neurodivergent medication responses
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-green-200 text-center">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-sage-800 mb-2">Privacy First</h3>
            <p className="text-sm text-sage-600">
              Local-only storage with encryption options. Your data stays private
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-teal-200 text-center">
            <BarChart3 className="w-8 h-8 text-teal-600 mx-auto mb-3" />
            <h3 className="font-semibold text-sage-800 mb-2">Clinical Integration</h3>
            <p className="text-sm text-sage-600">
              Export data for healthcare provider discussions and treatment optimization
            </p>
          </div>
        </motion.div>

        {/* Key Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-8 border border-sage-200 mb-8"
        >
          <h2 className="text-2xl font-bold text-sage-800 mb-6 text-center">
            Why Track Medication Correlations?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-sage-800 mb-4">🎯 For ADHD & Neurodivergent Minds</h3>
              <ul className="space-y-2 text-sage-700">
                <li>• Track stimulant effectiveness across different symptoms</li>
                <li>• Identify optimal dosing timing for focus and executive function</li>
                <li>• Monitor side effects and their patterns</li>
                <li>• Correlate medication effects with environmental factors</li>
                <li>• Document what works for provider discussions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-sage-800 mb-4">📊 Evidence-Based Approach</h3>
              <ul className="space-y-2 text-sage-700">
                <li>• Statistical significance testing on correlations</li>
                <li>• Confidence scoring for medication effectiveness</li>
                <li>• Sample size requirements for reliable patterns</li>
                <li>• Research-backed recommendations</li>
                <li>• Clinical-grade data export functionality</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Privacy Commitment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200 mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-sage-800">Privacy & Security Commitment</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Local Storage</h4>
              <p className="text-sm text-blue-700">
                All medication data stored on your device by default. No cloud storage without your explicit consent.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Configurable Privacy</h4>
              <p className="text-sm text-blue-700">
                Choose encryption levels, data retention periods, and what information to include in exports.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Provider Control</h4>
              <p className="text-sm text-blue-700">
                Decide what information to share with healthcare providers. Remove sensitive details when needed.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Research Foundation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-sage-200 mb-8"
        >
          <h3 className="text-lg font-semibold text-sage-800 mb-4">Research Foundation</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-sage-50 rounded-lg border border-sage-200">
              <h4 className="font-semibold text-sage-800 mb-2">ADHD Medication Research</h4>
              <ul className="text-sm text-sage-700 space-y-1">
                <li>• Individual response variation up to 300% in effectiveness</li>
                <li>• Peak effectiveness typically 1-3 hours post-dose</li>
                <li>• Food, sleep, and stress significantly affect absorption</li>
                <li>• Environmental factors influence medication effectiveness</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Correlation Analysis Standards</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Minimum 10 data points for basic correlation analysis</li>
                <li>• 30+ data points required for statistical significance</li>
                <li>• Effect size calculations using Cohen's d methodology</li>
                <li>• Confidence intervals for all correlation estimates</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Main Application */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <MedicationCorrelationTracker />
        </motion.div>
      </div>
    </div>
  );
};

export default MedicationTrackerPage;

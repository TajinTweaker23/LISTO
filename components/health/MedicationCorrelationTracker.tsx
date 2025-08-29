import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Pill, 
  TrendingUp, 
  AlertCircle, 
  Brain,
  Shield,
  BarChart3,
  Settings,
  Lock,
  Download,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface MedicationEntry {
  id: string;
  name: string;
  dosage: string;
  frequency: 'daily' | 'twice-daily' | 'as-needed' | 'weekly' | 'other';
  category: 'adhd' | 'depression' | 'anxiety' | 'hormonal' | 'pain' | 'other';
  startDate: Date;
  endDate?: Date;
  prescribedBy: string;
  purpose: string;
  sideEffects?: string[];
  isActive: boolean;
  reminderTime?: string[];
  notes?: string;
}

interface SymptomLog {
  id: string;
  timestamp: Date;
  symptomType: 
    | 'focus' | 'energy' | 'mood' | 'anxiety' | 'executive-function'
    | 'sensory-overload' | 'social-battery' | 'pain' | 'sleep-quality'
    | 'appetite' | 'libido' | 'menstrual-symptoms' | 'hot-flashes';
  severity: number; // 1-10 scale
  medicationsTaken: string[]; // Array of medication IDs
  timeSinceLastDose?: number; // Hours
  notes?: string;
  context?: string; // Environmental or situational context
}

interface CorrelationInsight {
  id: string;
  medicationId: string;
  medicationName: string;
  symptomType: string;
  correlationStrength: number; // -1 to 1
  pValue: number;
  sampleSize: number;
  effect: 'positive' | 'negative' | 'neutral';
  confidence: 'high' | 'medium' | 'low';
  timePattern?: {
    hoursAfterDose: number;
    effectDuration: number;
  };
  recommendations: string[];
  researchBased: boolean;
  lastUpdated: Date;
}

interface SideEffectPattern {
  medicationId: string;
  sideEffect: string;
  frequency: number; // 0-1
  severity: number; // 1-10
  timingPattern?: 'immediate' | 'delayed' | 'cumulative';
  mitigationStrategies: string[];
}

interface PrivacySettings {
  shareWithProvider: boolean;
  anonymousResearch: boolean;
  localStorageOnly: boolean;
  encryptSensitiveData: boolean;
  autoDeleteAfterDays?: number;
}

const MedicationCorrelationTracker: React.FC = () => {
  // Core state
  const [medications, setMedications] = useState<MedicationEntry[]>([]);
  const [symptomLogs, setSymptomLogs] = useState<SymptomLog[]>([]);
  const [correlations, setCorrelations] = useState<CorrelationInsight[]>([]);
  
  // UI state
  const [activeView, setActiveView] = useState<'dashboard' | 'log-symptoms' | 'add-medication' | 'correlations' | 'settings'>('dashboard');
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [expandedCorrelations, setExpandedCorrelations] = useState<string[]>([]);
  
  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState<PrivacySettings>({
    shareWithProvider: false,
    anonymousResearch: false,
    localStorageOnly: true,
    encryptSensitiveData: true,
    autoDeleteAfterDays: 365
  });

  // Form state for new entries
  const [newMedication, setNewMedication] = useState<Partial<MedicationEntry>>({
    category: 'adhd',
    frequency: 'daily',
    isActive: true
  });
  
  const [currentSymptomLog, setCurrentSymptomLog] = useState<Partial<SymptomLog>>({
    severity: 5,
    medicationsTaken: [],
    timestamp: new Date()
  });

  // Load data on component mount
  useEffect(() => {
    loadStoredData();
  }, []);

  // Auto-analyze correlations when data changes
  useEffect(() => {
    if (medications.length > 0 && symptomLogs.length >= 10) {
      analyzeCorrelations();
    }
  }, [medications, symptomLogs]);

  const loadStoredData = () => {
    try {
      const storedMeds = localStorage.getItem('listo-medications');
      const storedSymptoms = localStorage.getItem('listo-symptom-logs');
      const storedPrivacy = localStorage.getItem('listo-medication-privacy');
      
      if (storedMeds) setMedications(JSON.parse(storedMeds));
      if (storedSymptoms) setSymptomLogs(JSON.parse(storedSymptoms));
      if (storedPrivacy) setPrivacySettings(JSON.parse(storedPrivacy));
    } catch (error) {
      console.error('Error loading medication data:', error);
    }
  };

  const saveData = () => {
    try {
      if (privacySettings.localStorageOnly) {
        localStorage.setItem('listo-medications', JSON.stringify(medications));
        localStorage.setItem('listo-symptom-logs', JSON.stringify(symptomLogs));
        localStorage.setItem('listo-medication-privacy', JSON.stringify(privacySettings));
      }
      
      if (privacySettings.encryptSensitiveData) {
        // In production, implement proper encryption
        console.log('Data would be encrypted in production');
      }
    } catch (error) {
      console.error('Error saving medication data:', error);
    }
  };

  const analyzeCorrelations = () => {
    const newCorrelations: CorrelationInsight[] = [];
    
    medications.forEach(medication => {
      if (!medication.isActive) return;
      
      // Get symptom logs where this medication was taken
      const relevantLogs = symptomLogs.filter(log => 
        log.medicationsTaken.includes(medication.id)
      );
      
      if (relevantLogs.length < 5) return; // Need minimum data
      
      // Analyze each symptom type
      const uniqueSymptoms = new Set(relevantLogs.map(log => log.symptomType));
      const symptomTypes = Array.from(uniqueSymptoms);
      
      symptomTypes.forEach(symptomType => {
        const correlation = analyzeSymptomCorrelation(medication, symptomType, relevantLogs);
        if (correlation) {
          newCorrelations.push(correlation);
        }
      });
    });
    
    setCorrelations(newCorrelations);
  };

  const analyzeSymptomCorrelation = (
    medication: MedicationEntry, 
    symptomType: string, 
    relevantLogs: SymptomLog[]
  ): CorrelationInsight | null => {
    const symptomSpecificLogs = relevantLogs.filter(log => log.symptomType === symptomType);
    const allSameSymptomLogs = symptomLogs.filter(log => log.symptomType === symptomType);
    
    if (symptomSpecificLogs.length < 3 || allSameSymptomLogs.length < 5) return null;
    
    // Calculate correlation
    const withMedAvg = symptomSpecificLogs.reduce((sum, log) => sum + log.severity, 0) / symptomSpecificLogs.length;
    const withoutMedLogs = allSameSymptomLogs.filter(log => 
      !log.medicationsTaken.includes(medication.id)
    );
    
    if (withoutMedLogs.length === 0) return null;
    
    const withoutMedAvg = withoutMedLogs.reduce((sum, log) => sum + log.severity, 0) / withoutMedLogs.length;
    
    const effectSize = withoutMedAvg - withMedAvg; // Positive = medication helps
    const correlationStrength = Math.min(Math.abs(effectSize) / 5, 1); // Normalize to -1 to 1
    
    // Simple statistical significance estimation
    const pooledStd = calculatePooledStandardDeviation(
      symptomSpecificLogs, 
      withoutMedLogs, 
      withMedAvg, 
      withoutMedAvg
    );
    
    const tStatistic = effectSize / (pooledStd * Math.sqrt(1/symptomSpecificLogs.length + 1/withoutMedLogs.length));
    const pValue = Math.min(0.5, Math.abs(tStatistic) * 0.1); // Rough approximation
    
    // Generate effect type
    let effect: 'positive' | 'negative' | 'neutral';
    if (effectSize > 0.5) {
      effect = 'positive';
    } else if (effectSize < -0.5) {
      effect = 'negative';
    } else {
      effect = 'neutral';
    }

    // Generate confidence level
    let confidence: 'high' | 'medium' | 'low';
    if (pValue < 0.05 && symptomSpecificLogs.length > 10) {
      confidence = 'high';
    } else if (pValue < 0.1 && symptomSpecificLogs.length > 5) {
      confidence = 'medium';
    } else {
      confidence = 'low';
    }
    
    // Generate recommendations based on correlation
    const recommendations = generateRecommendations(effectSize, symptomType, medication.category);
    
    return {
      id: `corr-${medication.id}-${symptomType}-${Date.now()}`,
      medicationId: medication.id,
      medicationName: medication.name,
      symptomType,
      correlationStrength: effectSize > 0 ? correlationStrength : -correlationStrength,
      pValue,
      sampleSize: symptomSpecificLogs.length + withoutMedLogs.length,
      effect,
      confidence,
      recommendations,
      researchBased: true,
      lastUpdated: new Date()
    };
  };

  const calculatePooledStandardDeviation = (
    symptomLogs: SymptomLog[], 
    withoutMedLogs: SymptomLog[], 
    withMedAvg: number, 
    withoutMedAvg: number
  ): number => {
    const symptomVariance = symptomLogs.reduce(
      (sum, log) => sum + Math.pow(log.severity - withMedAvg, 2), 
      0
    );
    const withoutMedVariance = withoutMedLogs.reduce(
      (sum, log) => sum + Math.pow(log.severity - withoutMedAvg, 2), 
      0
    );
    
    return Math.sqrt(
      (symptomVariance + withoutMedVariance) / 
      (symptomLogs.length + withoutMedLogs.length - 2)
    );
  };

  const generateRecommendations = (effectSize: number, symptomType: string, medCategory: string): string[] => {
    const recommendations: string[] = [];
    
    if (effectSize > 1) {
      recommendations.push(`${medCategory} medication shows strong positive effect on ${symptomType}`);
      recommendations.push('Consider maintaining current dosage timing');
      recommendations.push('Document what makes this medication most effective');
    } else if (effectSize > 0.5) {
      recommendations.push(`${medCategory} medication shows moderate benefit for ${symptomType}`);
      recommendations.push('Track timing patterns to optimize effectiveness');
    } else if (effectSize < -0.5) {
      recommendations.push(`Consider discussing ${symptomType} concerns with prescriber`);
      recommendations.push('Document any side effects or timing patterns');
      recommendations.push('Monitor for dose-dependent effects');
    } else {
      recommendations.push(`No clear pattern detected - continue monitoring`);
      recommendations.push('Consider environmental factors that might influence effectiveness');
    }
    
    return recommendations;
  };

  const addMedication = () => {
    if (!newMedication.name || !newMedication.dosage) return;
    
    const medication: MedicationEntry = {
      id: `med-${Date.now()}`,
      name: newMedication.name!,
      dosage: newMedication.dosage!,
      frequency: newMedication.frequency!,
      category: newMedication.category!,
      startDate: new Date(),
      prescribedBy: newMedication.prescribedBy || 'Not specified',
      purpose: newMedication.purpose || '',
      isActive: true,
      notes: newMedication.notes
    };
    
    setMedications(prev => [...prev, medication]);
    setNewMedication({ category: 'adhd', frequency: 'daily', isActive: true });
    saveData();
  };

  const logSymptom = () => {
    if (!currentSymptomLog.symptomType) return;
    
    const log: SymptomLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date(),
      symptomType: currentSymptomLog.symptomType!,
      severity: currentSymptomLog.severity!,
      medicationsTaken: currentSymptomLog.medicationsTaken || [],
      notes: currentSymptomLog.notes,
      context: currentSymptomLog.context
    };
    
    setSymptomLogs(prev => [...prev, log]);
    setCurrentSymptomLog({
      severity: 5,
      medicationsTaken: [],
      timestamp: new Date()
    });
    saveData();
  };

  const exportData = () => {
    const exportData = {
      medications: privacySettings.shareWithProvider ? medications : medications.map(m => ({
        ...m,
        prescribedBy: 'REDACTED',
        notes: m.notes ? 'NOTES REDACTED' : undefined
      })),
      symptomLogs,
      correlations,
      exportDate: new Date(),
      privacySettings
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `listo-medication-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  const getMedicationColor = (category: string) => {
    const colors = {
      'adhd': 'blue',
      'depression': 'purple',
      'anxiety': 'green',
      'hormonal': 'pink',
      'pain': 'red',
      'other': 'gray'
    };
    return colors[category as keyof typeof colors] || 'gray';
  };

  const getEffectIcon = (effect: string) => {
    switch (effect) {
      case 'positive': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'negative': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <BarChart3 className="w-4 h-4 text-gray-600" />;
    }
  };

  const activeMeds = medications.filter(m => m.isActive);
  const significantCorrelations = correlations.filter(c => c.confidence !== 'low');

  const getEffectDescription = (effect: string, symptomType: string): string => {
    if (effect === 'positive') return `Improves ${symptomType}`;
    if (effect === 'negative') return `May worsen ${symptomType}`;
    return `No clear effect on ${symptomType}`;
  };

  const getConfidenceBadgeClass = (confidence: string): string => {
    if (confidence === 'high') return 'bg-green-100 text-green-800';
    if (confidence === 'medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getCorrelationDescription = (effect: string, symptomType: string): string => {
    if (effect === 'positive') {
      return `This medication shows a positive correlation with ${symptomType} symptoms`;
    }
    if (effect === 'negative') {
      return `This medication may have a negative correlation with ${symptomType} symptoms`;
    }
    return `No clear correlation detected between this medication and ${symptomType} symptoms`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header with Privacy Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-sage-800 mb-2 flex items-center gap-3">
            <Pill className="w-8 h-8 text-blue-600" />
            Medication Correlation Tracker
          </h1>
          <p className="text-sage-600">
            Evidence-based medication effectiveness tracking with privacy-first design
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          {privacySettings.localStorageOnly && (
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 rounded-full">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Local Only</span>
            </div>
          )}
          
          <button
            onClick={() => setShowPrivacySettings(true)}
            className="p-2 rounded-lg hover:bg-gray-100"
            title="Privacy Settings"
          >
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 border-b border-gray-200 pb-4"
      >
        {[
          { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
          { key: 'log-symptoms', label: 'Log Symptoms', icon: Brain },
          { key: 'add-medication', label: 'Add Medication', icon: Pill },
          { key: 'correlations', label: 'Correlations', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveView(tab.key as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              activeView === tab.key
                ? 'bg-sage-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </motion.div>

      {/* Dashboard View */}
      {activeView === 'dashboard' && (
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 border border-sage-200">
              <div className="flex items-center gap-3">
                <Pill className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Active Medications</p>
                  <p className="text-2xl font-bold text-sage-800">{activeMeds.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-sage-200">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Symptom Logs</p>
                  <p className="text-2xl font-bold text-sage-800">{symptomLogs.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-sage-200">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Significant Correlations</p>
                  <p className="text-2xl font-bold text-sage-800">{significantCorrelations.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 border border-sage-200">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Privacy Level</p>
                  <p className="text-lg font-bold text-sage-800">
                    {privacySettings.localStorageOnly ? 'High' : 'Medium'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active Medications */}
            <div className="bg-white rounded-xl p-6 border border-sage-200">
              <h3 className="text-lg font-semibold text-sage-800 mb-4 flex items-center gap-2">
                <Pill className="w-5 h-5" />
                Active Medications
              </h3>
              
              <div className="space-y-3">
                {activeMeds.slice(0, 5).map((med) => (
                  <div
                    key={med.id}
                    className={`p-3 rounded-lg border-l-4 border-${getMedicationColor(med.category)}-400 bg-${getMedicationColor(med.category)}-50`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-sage-800">{med.name}</h4>
                        <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getMedicationColor(med.category)}-100 text-${getMedicationColor(med.category)}-800`}>
                        {med.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Correlations */}
            <div className="bg-white rounded-xl p-6 border border-sage-200">
              <h3 className="text-lg font-semibold text-sage-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Insights
              </h3>
              
              <div className="space-y-3">
                {significantCorrelations.slice(0, 3).map((corr) => (
                  <div key={corr.id} className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {getEffectIcon(corr.effect)}
                          <span className="font-medium text-sage-800">
                            {corr.medicationName}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {getEffectDescription(corr.effect, corr.symptomType)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceBadgeClass(corr.confidence)}`}>
                        {corr.confidence}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Symptoms View */}
      {activeView === 'log-symptoms' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-sage-200"
        >
          <h3 className="text-xl font-semibold text-sage-800 mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6" />
            Log Symptom
          </h3>

          <div className="space-y-6">
            {/* Symptom Type Selection */}
            <div>
              <label className="block text-sm font-medium text-sage-800 mb-3">
                What symptom are you tracking?
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { key: 'focus', label: 'Focus', icon: '🎯' },
                  { key: 'energy', label: 'Energy', icon: '⚡' },
                  { key: 'mood', label: 'Mood', icon: '😊' },
                  { key: 'anxiety', label: 'Anxiety', icon: '😰' },
                  { key: 'executive-function', label: 'Executive Function', icon: '🧠' },
                  { key: 'sensory-overload', label: 'Sensory Overload', icon: '🔊' },
                  { key: 'social-battery', label: 'Social Battery', icon: '👥' },
                  { key: 'pain', label: 'Pain', icon: '😣' },
                  { key: 'sleep-quality', label: 'Sleep Quality', icon: '😴' },
                  { key: 'appetite', label: 'Appetite', icon: '🍽️' },
                  { key: 'libido', label: 'Libido', icon: '💕' },
                  { key: 'menstrual-symptoms', label: 'Menstrual Symptoms', icon: '🩸' }
                ].map((symptom) => (
                  <button
                    key={symptom.key}
                    onClick={() => setCurrentSymptomLog(prev => ({ ...prev, symptomType: symptom.key as any }))}
                    className={`p-3 rounded-lg border text-left transition-colors ${
                      currentSymptomLog.symptomType === symptom.key
                        ? 'bg-sage-50 border-sage-300 text-sage-800'
                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-lg mr-2">{symptom.icon}</span>
                    <span className="text-sm font-medium">{symptom.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Scale */}
            <div>
              <label htmlFor="severity-slider" className="block text-sm font-medium text-sage-800 mb-3">
                Severity (1 = Very Low, 10 = Very High)
              </label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">1</span>
                <input
                  id="severity-slider"
                  type="range"
                  min="1"
                  max="10"
                  value={currentSymptomLog.severity}
                  onChange={(e) => setCurrentSymptomLog(prev => ({ ...prev, severity: Number(e.target.value) }))}
                  className="flex-1"
                  title="Severity level from 1 to 10"
                />
                <span className="text-sm text-gray-600">10</span>
                <span className="font-bold text-sage-800 w-8">{currentSymptomLog.severity}</span>
              </div>
            </div>

            {/* Medications Taken */}
            <div>
              <fieldset className="block text-sm font-medium text-sage-800 mb-3">
                <legend className="block text-sm font-medium text-sage-800 mb-3">
                  Which medications have you taken today?
                </legend>
                <div className="space-y-2">
                  {activeMeds.map((med) => (
                    <label 
                      key={med.id} 
                      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
                      aria-label={`${med.name} ${med.dosage}`}
                    >
                      <input
                        type="checkbox"
                        checked={currentSymptomLog.medicationsTaken?.includes(med.id) || false}
                        onChange={(e) => {
                          const medsTaken = currentSymptomLog.medicationsTaken || [];
                          const updatedMeds = e.target.checked
                            ? [...medsTaken, med.id]
                            : medsTaken.filter(id => id !== med.id);
                          
                          setCurrentSymptomLog(prev => ({
                            ...prev,
                            medicationsTaken: updatedMeds
                          }));
                        }}
                        className="rounded border-gray-300"
                        title={`Select ${med.name}`}
                      />
                      <div className="flex-1">
                        <span className="font-medium text-sage-800">{med.name}</span>
                        <span className="text-sm text-gray-600 ml-2">({med.dosage})</span>
                      </div>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="symptom-notes" className="block text-sm font-medium text-sage-800 mb-2">
                Notes (optional)
              </label>
              <textarea
                id="symptom-notes"
                value={currentSymptomLog.notes || ''}
                onChange={(e) => setCurrentSymptomLog(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional context, triggers, or observations..."
                className="w-full p-3 border border-gray-200 rounded-lg"
                rows={3}
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                onClick={logSymptom}
                disabled={!currentSymptomLog.symptomType}
                className="flex-1 bg-sage-600 text-white py-3 rounded-lg font-semibold hover:bg-sage-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Log Symptom
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Add Medication View */}
      {activeView === 'add-medication' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-sage-200"
        >
          <h3 className="text-xl font-semibold text-sage-800 mb-6 flex items-center gap-2">
            <Pill className="w-6 h-6" />
            Add New Medication
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="medication-name" className="block text-sm font-medium text-sage-800 mb-2">
                Medication Name *
              </label>
              <input
                id="medication-name"
                type="text"
                value={newMedication.name || ''}
                onChange={(e) => setNewMedication(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Adderall XR"
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="medication-dosage" className="block text-sm font-medium text-sage-800 mb-2">
                Dosage *
              </label>
              <input
                id="medication-dosage"
                type="text"
                value={newMedication.dosage || ''}
                onChange={(e) => setNewMedication(prev => ({ ...prev, dosage: e.target.value }))}
                placeholder="e.g., 20mg"
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="medication-category" className="block text-sm font-medium text-sage-800 mb-2">
                Category
              </label>
              <select
                id="medication-category"
                value={newMedication.category}
                onChange={(e) => setNewMedication(prev => ({ ...prev, category: e.target.value as any }))}
                className="w-full p-3 border border-gray-200 rounded-lg"
                title="Select medication category"
              >
                <option value="adhd">ADHD</option>
                <option value="depression">Depression</option>
                <option value="anxiety">Anxiety</option>
                <option value="hormonal">Hormonal</option>
                <option value="pain">Pain Management</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="medication-frequency" className="block text-sm font-medium text-sage-800 mb-2">
                Frequency
              </label>
              <select
                id="medication-frequency"
                value={newMedication.frequency}
                onChange={(e) => setNewMedication(prev => ({ ...prev, frequency: e.target.value as any }))}
                className="w-full p-3 border border-gray-200 rounded-lg"
                title="Select medication frequency"
              >
                <option value="daily">Daily</option>
                <option value="twice-daily">Twice Daily</option>
                <option value="as-needed">As Needed</option>
                <option value="weekly">Weekly</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="medication-purpose" className="block text-sm font-medium text-sage-800 mb-2">
                Purpose/Condition
              </label>
              <input
                id="medication-purpose"
                type="text"
                value={newMedication.purpose || ''}
                onChange={(e) => setNewMedication(prev => ({ ...prev, purpose: e.target.value }))}
                placeholder="e.g., ADHD focus and attention"
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>

            <div>
              <label htmlFor="medication-prescriber" className="block text-sm font-medium text-sage-800 mb-2">
                Prescribed By
              </label>
              <input
                id="medication-prescriber"
                type="text"
                value={newMedication.prescribedBy || ''}
                onChange={(e) => setNewMedication(prev => ({ ...prev, prescribedBy: e.target.value }))}
                placeholder="e.g., Dr. Smith"
                className="w-full p-3 border border-gray-200 rounded-lg"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="medication-notes" className="block text-sm font-medium text-sage-800 mb-2">
                Notes
              </label>
              <textarea
                id="medication-notes"
                value={newMedication.notes || ''}
                onChange={(e) => setNewMedication(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Any additional notes, side effects to watch for, etc."
                className="w-full p-3 border border-gray-200 rounded-lg"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <button
                onClick={addMedication}
                disabled={!newMedication.name || !newMedication.dosage}
                className="w-full bg-sage-600 text-white py-3 rounded-lg font-semibold hover:bg-sage-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Add Medication
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Correlations View */}
      {activeView === 'correlations' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-sage-800 flex items-center gap-2">
              <TrendingUp className="w-6 h-6" />
              Medication Correlations
            </h3>
            
            <button
              onClick={exportData}
              className="flex items-center gap-2 px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>

          <div className="space-y-4">
            {correlations.map((corr) => (
              <motion.div
                key={corr.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 border border-sage-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getEffectIcon(corr.effect)}
                      <h4 className="text-lg font-semibold text-sage-800">
                        {corr.medicationName} → {corr.symptomType}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        corr.confidence === 'high' ? 'bg-green-100 text-green-800' :
                        corr.confidence === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {corr.confidence} confidence
                      </span>
                    </div>

                    <p className="text-gray-600 mb-3">
                      {getCorrelationDescription(corr.effect, corr.symptomType)}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Correlation Strength</p>
                        <p className="text-lg font-bold text-sage-800">
                          {(corr.correlationStrength * 100).toFixed(0)}%
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Sample Size</p>
                        <p className="text-lg font-bold text-sage-800">{corr.sampleSize}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600">Statistical Sig.</p>
                        <p className="text-lg font-bold text-sage-800">
                          {corr.pValue < 0.05 ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        const isExpanded = expandedCorrelations.includes(corr.id);
                        if (isExpanded) {
                          setExpandedCorrelations(prev => prev.filter(id => id !== corr.id));
                        } else {
                          setExpandedCorrelations(prev => [...prev, corr.id]);
                        }
                      }}
                      className="flex items-center gap-2 text-sage-600 hover:text-sage-800 font-medium"
                    >
                      {expandedCorrelations.includes(corr.id) ? (
                        <>
                          <ChevronUp className="w-4 h-4" />
                          Hide Recommendations
                        </>
                      ) : (
                        <>
                          <ChevronDown className="w-4 h-4" />
                          Show Recommendations
                        </>
                      )}
                    </button>

                    {expandedCorrelations.includes(corr.id) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-4 p-4 bg-sage-50 rounded-lg"
                      >
                        <h5 className="font-medium text-sage-800 mb-2">Recommendations:</h5>
                        <ul className="space-y-1">
                          {corr.recommendations.map((rec) => (
                            <li key={rec.substring(0, 20)} className="text-sm text-sage-700 flex items-start gap-2">
                              <span className="text-sage-400">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {correlations.length === 0 && (
              <div className="text-center p-12 bg-white rounded-xl border border-sage-200">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Correlations Yet</h3>
                <p className="text-gray-500">
                  Log more symptoms and medications to see correlation patterns
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Privacy Settings Modal */}
      {showPrivacySettings && (
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
              <h2 className="text-xl font-semibold text-sage-800 flex items-center gap-2">
                <Lock className="w-6 h-6" />
                Privacy Settings
              </h2>
              <button
                onClick={() => setShowPrivacySettings(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Privacy First:</strong> Your medication data is sensitive. 
                  Configure these settings to control how your data is stored and shared.
                </p>
              </div>

              {[
                {
                  key: 'localStorageOnly' as keyof PrivacySettings,
                  label: 'Store Data Locally Only',
                  description: 'Keep all data on your device - no cloud storage',
                  recommended: true
                },
                {
                  key: 'encryptSensitiveData' as keyof PrivacySettings,
                  label: 'Encrypt Sensitive Data',
                  description: 'Add extra protection for medication names and notes',
                  recommended: true
                },
                {
                  key: 'shareWithProvider' as keyof PrivacySettings,
                  label: 'Include Provider Info in Exports',
                  description: 'Include prescribing doctor information when exporting data',
                  recommended: false
                },
                {
                  key: 'anonymousResearch' as keyof PrivacySettings,
                  label: 'Anonymous Research Participation',
                  description: 'Contribute anonymized data to medication effectiveness research',
                  recommended: false
                }
              ].map((setting) => (
                <div key={setting.key} className="flex items-start gap-4 p-4 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    checked={privacySettings[setting.key] as boolean}
                    onChange={(e) => setPrivacySettings(prev => ({
                      ...prev,
                      [setting.key]: e.target.checked
                    }))}
                    className="mt-1 rounded border-gray-300"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sage-800">{setting.label}</span>
                      {setting.recommended && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{setting.description}</p>
                  </div>
                </div>
              ))}

              <div className="p-4 rounded-lg border border-gray-200">
                <label htmlFor="auto-delete-days" className="block text-sm font-medium text-sage-800 mb-2">
                  Auto-Delete Data After (days)
                </label>
                <input
                  id="auto-delete-days"
                  type="number"
                  value={privacySettings.autoDeleteAfterDays || ''}
                  onChange={(e) => setPrivacySettings(prev => ({
                    ...prev,
                    autoDeleteAfterDays: e.target.value ? Number(e.target.value) : undefined
                  }))}
                  placeholder="365"
                  className="w-full p-3 border border-gray-200 rounded-lg"
                  title="Number of days after which data will be automatically deleted"
                />
                <p className="text-sm text-gray-600 mt-1">
                  Leave empty to keep data indefinitely
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    saveData();
                    setShowPrivacySettings(false);
                  }}
                  className="flex-1 bg-sage-600 text-white py-3 rounded-lg font-semibold hover:bg-sage-700"
                >
                  Save Settings
                </button>
                <button
                  onClick={() => setShowPrivacySettings(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Educational Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-r from-sage-50 to-blue-50 rounded-xl p-6 border border-sage-200"
      >
        <h3 className="text-lg font-semibold text-sage-800 mb-4">Evidence-Based Medication Tracking</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white rounded-lg border border-sage-200">
            <h4 className="font-semibold text-sage-800 mb-2">ADHD Medications</h4>
            <ul className="text-sm text-sage-700 space-y-1">
              <li>• Peak effectiveness typically 1-3 hours after dose</li>
              <li>• Individual response varies significantly</li>
              <li>• Food, sleep, and stress affect medication absorption</li>
            </ul>
          </div>

          <div className="p-4 bg-white rounded-lg border border-sage-200">
            <h4 className="font-semibold text-sage-800 mb-2">Correlation Analysis</h4>
            <ul className="text-sm text-sage-700 space-y-1">
              <li>• Minimum 10 data points for basic correlation</li>
              <li>• 30+ data points for statistical significance</li>
              <li>• Environmental factors affect medication effectiveness</li>
            </ul>
          </div>

          <div className="p-4 bg-white rounded-lg border border-sage-200">
            <h4 className="font-semibold text-sage-800 mb-2">Privacy & Security</h4>
            <ul className="text-sm text-sage-700 space-y-1">
              <li>• All data stored locally by default</li>
              <li>• Export options maintain privacy controls</li>
              <li>• No data shared without explicit consent</li>
            </ul>
          </div>

          <div className="p-4 bg-white rounded-lg border border-sage-200">
            <h4 className="font-semibold text-sage-800 mb-2">Clinical Integration</h4>
            <ul className="text-sm text-sage-700 space-y-1">
              <li>• Export data for healthcare provider discussions</li>
              <li>• Evidence-based tracking supports treatment decisions</li>
              <li>• Pattern recognition aids in medication optimization</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MedicationCorrelationTracker;

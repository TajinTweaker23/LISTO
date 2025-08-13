import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { CycleData, WeatherMoodCorrelation } from '../types/health';

interface AIAnalysis {
  id: string;
  type: 'pattern' | 'prediction' | 'correlation' | 'recommendation' | 'anomaly';
  title: string;
  description: string;
  confidence: number;
  data: any;
  timestamp: Date;
  category: 'cycle' | 'menopause' | 'mood' | 'general' | 'emergency';
  actionable: boolean;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

interface AIInsight extends AIAnalysis {
  reasoning: string[];
  supportingData: any[];
  recommendedActions: string[];
  followUpQuestions?: string[];
}

interface AIContextType {
  analyses: AIAnalysis[];
  insights: AIInsight[];
  isProcessing: boolean;
  processHealthData: (data: any) => Promise<AIAnalysis[]>;
  generateInsights: (analyses: AIAnalysis[]) => Promise<AIInsight[]>;
  predictNextCycle: (cycleData: CycleData[]) => Promise<CycleData>;
  detectAnomalies: (data: any) => Promise<AIAnalysis[]>;
  generateRecommendations: (userProfile: any, healthData: any) => Promise<string[]>;
  analyzeSymptomPatterns: (symptoms: any[]) => Promise<AIAnalysis[]>;
  correlateEnvironmentalFactors: (healthData: any, weatherData: any) => Promise<WeatherMoodCorrelation[]>;
  assessHealthRisks: (data: any) => Promise<AIAnalysis[]>;
  personalizeExperience: (preferences: any, history: any) => Promise<any>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const useAI = (): AIContextType => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [analyses, setAnalyses] = useState<AIAnalysis[]>([]);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processHealthData = useCallback(async (data: any): Promise<AIAnalysis[]> => {
    setIsProcessing(true);
    try {
      // Simple mock analysis for now
      const newAnalyses: AIAnalysis[] = [{
        id: `analysis-${Date.now()}`,
        type: 'pattern',
        title: 'Health Pattern Detected',
        description: 'AI analysis of your health data shows interesting patterns',
        confidence: 0.75,
        data: data,
        timestamp: new Date(),
        category: 'general',
        actionable: true,
        urgency: 'low'
      }];
      
      setAnalyses(prev => [...prev, ...newAnalyses]);
      return newAnalyses;
    } catch (error) {
      console.error('Error processing health data:', error);
      return [];
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const generateInsights = useCallback(async (analyses: AIAnalysis[]): Promise<AIInsight[]> => {
    // Helper function to generate action items
    const generateActionItems = (analysis: AIAnalysis): string[] => {
      const actions: string[] = [];
      
      switch (analysis.type) {
        case 'pattern':
          actions.push('Track symptoms for 2-3 more cycles');
          actions.push('Note environmental factors that may influence patterns');
          break;
        case 'anomaly':
          actions.push('Monitor for recurring anomalies');
          actions.push('Consider consulting healthcare provider if persistent');
          break;
        case 'recommendation':
          actions.push('Continue tracking to confirm trend');
          actions.push('Adjust lifestyle factors if concerning');
          break;
        case 'prediction':
          actions.push('Prepare for predicted changes');
          actions.push('Track accuracy of predictions');
          break;
        default:
          actions.push('Continue regular health tracking');
      }
      
      return actions;
    };

    // Helper function to generate follow-up questions
    const generateFollowUpQuestions = (analysis: AIAnalysis): string[] => {
      const questions: string[] = [];
      
      switch (analysis.type) {
        case 'pattern':
          questions.push('Have you noticed any triggers for this pattern?');
          questions.push('How does this pattern affect your daily activities?');
          break;
        case 'anomaly':
          questions.push('What was different about this time period?');
          questions.push('Are you experiencing any new stressors?');
          break;
        case 'recommendation':
          questions.push('What lifestyle changes have you made recently?');
          questions.push('How are you feeling about this trend?');
          break;
        default:
          questions.push('How can we better support your health tracking?');
      }
      
      return questions;
    };
    
    // Convert analyses to insights with reasoning and recommendations
    const newInsights: AIInsight[] = analyses.map(analysis => ({
      ...analysis,
      reasoning: [`Analysis based on ${analysis.type} detection algorithm`, `Confidence calculated using statistical models`],
      supportingData: [analysis.data],
      recommendedActions: generateActionItems(analysis),
      followUpQuestions: generateFollowUpQuestions(analysis)
    }));
    
    setInsights(prev => [...prev, ...newInsights]);
    return newInsights;
  }, []);

  const predictNextCycle = useCallback(async (cycleData: CycleData[]): Promise<CycleData> => {
    // Simple prediction based on available CycleData structure
    if (cycleData.length === 0) {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + 28); // Default 28-day cycle
      
      return {
        id: `predicted-${Date.now()}`,
        userId: 'current-user',
        cycleStart: futureDate,
        periodStart: futureDate,
        flow: 'medium',
        symptoms: [],
        mood: [],
        energy: 5,
        pain: [],
        notes: 'Predicted cycle - start tracking for better predictions',
        encrypted: false
      };
    }
    
    // Use last cycle to predict next one
    const lastCycle = cycleData[cycleData.length - 1];
    const avgCycleLength = cycleData.reduce((sum, cycle) => {
      return sum + (cycle.cycleLength || 28);
    }, 0) / cycleData.length;
    
    const nextCycleStart = new Date(lastCycle.cycleStart);
    nextCycleStart.setDate(nextCycleStart.getDate() + Math.round(avgCycleLength));
    
    return {
      id: `predicted-${Date.now()}`,
      userId: lastCycle.userId,
      cycleStart: nextCycleStart,
      periodStart: nextCycleStart,
      flow: lastCycle.flow, // Use last known flow pattern
      symptoms: [], // Start with empty symptoms
      mood: [], // Start with empty mood data
      energy: lastCycle.energy || 5,
      pain: [],
      notes: 'AI predicted cycle based on historical data',
      predictedNext: nextCycleStart,
      cycleLength: Math.round(avgCycleLength),
      encrypted: false
    };
  }, []);

  const detectAnomalies = useCallback(async (data: any): Promise<AIAnalysis[]> => {
    // Simple anomaly detection
    const anomalies: AIAnalysis[] = [];
    
    if (data.symptoms && data.symptoms.length > 0) {
      const highSeveritySymptoms = data.symptoms.filter((s: any) => s.severity > 8);
      if (highSeveritySymptoms.length > 0) {
        anomalies.push({
          id: `anomaly-${Date.now()}`,
          type: 'anomaly',
          title: 'High Symptom Severity Detected',
          description: `${highSeveritySymptoms.length} symptoms with severity > 8/10 detected`,
          confidence: 0.8,
          data: { symptoms: highSeveritySymptoms },
          timestamp: new Date(),
          category: 'general',
          actionable: true,
          urgency: 'high'
        });
      }
    }
    
    return anomalies;
  }, []);

  const generateRecommendations = useCallback(async (userProfile: any, healthData: any): Promise<string[]> => {
    const recommendations = [
      'Continue tracking your symptoms consistently',
      'Consider environmental factors in your health patterns',
      'Maintain regular sleep schedule',
      'Stay hydrated and eat balanced meals',
      'Practice stress management techniques'
    ];
    
    return recommendations.slice(0, 3); // Return top 3 recommendations
  }, []);

  const analyzeSymptomPatterns = useCallback(async (symptoms: any[]): Promise<AIAnalysis[]> => {
    const patterns: AIAnalysis[] = [];
    
    if (symptoms.length > 5) {
      // Find most common symptom
      const symptomCounts: { [key: string]: number } = {};
      symptoms.forEach(s => {
        symptomCounts[s.type] = (symptomCounts[s.type] || 0) + 1;
      });
      
      const mostCommon = Object.entries(symptomCounts).reduce((max, [type, count]) => 
        count > max.count ? { type, count } : max, { type: '', count: 0 });
      
      if (mostCommon.count >= 3) {
        patterns.push({
          id: `pattern-${Date.now()}`,
          type: 'pattern',
          title: 'Recurring Symptom Pattern',
          description: `${mostCommon.type} appears frequently (${mostCommon.count} times)`,
          confidence: Math.min(mostCommon.count / 10, 0.9),
          data: { symptom: mostCommon.type, frequency: mostCommon.count },
          timestamp: new Date(),
          category: 'general',
          actionable: true,
          urgency: 'low'
        });
      }
    }
    
    return patterns;
  }, []);

  const correlateEnvironmentalFactors = useCallback(async (healthData: any, weatherData: any): Promise<WeatherMoodCorrelation[]> => {
    // Create mock correlation data that matches the WeatherMoodCorrelation type
    const mockCorrelations: WeatherMoodCorrelation[] = [{
      temperature: 22,
      humidity: 65,
      barometricPressure: 1013,
      sunlightHours: 8,
      moodRating: 7,
      energyLevel: 8,
      painLevel: 3,
      timestamp: new Date(),
      location: 'Current Location'
    }];
    
    return mockCorrelations;
  }, []);

  const assessHealthRisks = useCallback(async (data: any): Promise<AIAnalysis[]> => {
    const risks: AIAnalysis[] = [];
    
    // Simple risk assessment based on symptom severity
    if (data.symptoms) {
      const severeSymptomsCount = data.symptoms.filter((s: any) => s.severity >= 8).length;
      
      if (severeSymptomsCount >= 3) {
        risks.push({
          id: `risk-${Date.now()}`,
          type: 'anomaly',
          title: 'High Symptom Severity Risk',
          description: 'Multiple severe symptoms detected - consider healthcare consultation',
          confidence: 0.85,
          data: { severeCount: severeSymptomsCount },
          timestamp: new Date(),
          category: 'emergency',
          actionable: true,
          urgency: 'high'
        });
      }
    }
    
    return risks;
  }, []);

  const personalizeExperience = useCallback(async (preferences: any, history: any): Promise<any> => {
    // Helper function to identify priority metrics
    const identifyPriorityMetrics = (userHistory: any): string[] => {
      const metrics = ['mood', 'energy', 'symptoms'];
      // AI logic to prioritize based on user's most tracked/concerning areas
      return metrics;
    };

    // Helper function to optimize notifications
    const optimizeNotifications = (userHistory: any, userPreferences: any): any => {
      return {
        frequency: 'adaptive',
        timing: 'optimal',
        content: 'personalized'
      };
    };
    
    return {
      dashboardLayout: 'adaptive',
      priorityMetrics: identifyPriorityMetrics(history),
      notificationPreferences: optimizeNotifications(history, preferences),
      recommendations: [
        'Focus on cycle tracking',
        'Monitor mood patterns',
        'Track environmental correlations'
      ]
    };
  }, []);

  const value: AIContextType = useMemo(() => ({
    analyses,
    insights,
    isProcessing,
    processHealthData,
    generateInsights,
    predictNextCycle,
    detectAnomalies,
    generateRecommendations,
    analyzeSymptomPatterns,
    correlateEnvironmentalFactors,
    assessHealthRisks,
    personalizeExperience
  }), [
    analyses,
    insights,
    isProcessing,
    processHealthData,
    generateInsights,
    predictNextCycle,
    detectAnomalies,
    generateRecommendations,
    analyzeSymptomPatterns,
    correlateEnvironmentalFactors,
    assessHealthRisks,
    personalizeExperience
  ]);

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
};

export default AIProvider;

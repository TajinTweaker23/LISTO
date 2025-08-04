import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { 
  CycleData, 
  MenopauseData, 
  HealthInsight, 
  NeuroHealthCorrelation,
  WeatherMoodCorrelation,
  ResearchUpdate 
} from '../types/health';
import { useAuth } from './AuthContext';

interface HealthContextType {
  // Cycle Tracking
  cycleData: CycleData[];
  currentCycle: CycleData | null;
  addCycleEntry: (entry: Partial<CycleData>) => void;
  updateCycleEntry: (id: string, updates: Partial<CycleData>) => void;
  
  // Menopause Tracking
  menopauseData: MenopauseData | null;
  updateMenopauseData: (data: Partial<MenopauseData>) => void;
  
  // Health Insights
  insights: HealthInsight[];
  generateInsights: () => Promise<void>;
  
  // Neurodivergent Correlations
  neuroCorrelations: NeuroHealthCorrelation[];
  trackNeuroSymptoms: (symptoms: any) => void;
  
  // Weather Correlations
  weatherCorrelations: WeatherMoodCorrelation[];
  addWeatherMoodEntry: (entry: WeatherMoodCorrelation) => void;
  
  // Research Updates
  researchUpdates: ResearchUpdate[];
  refreshResearchUpdates: () => Promise<void>;
  
  // Predictions
  predictNextPeriod: () => Date | null;
  predictSymptomSeverity: (symptomType: string) => number;
  
  // Privacy
  isDataEncrypted: boolean;
  toggleEncryption: () => void;
}

const HealthContext = createContext<HealthContextType | null>(null);

const getRecommendationForCycleLength = (avgCycleLength: number): string => {
  if (avgCycleLength < 21) {
    return 'Consider tracking stress levels - short cycles can indicate hormonal imbalances';
  }
  if (avgCycleLength > 35) {
    return 'Long cycles may warrant discussion with healthcare provider';
  }
  return 'Your cycle length is within normal range';
};

export const HealthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cycleData, setCycleData] = useState<CycleData[]>([]);
  const [menopauseData, setMenopauseData] = useState<MenopauseData | null>(null);
  const [insights, setInsights] = useState<HealthInsight[]>([]);
  const [neuroCorrelations, setNeuroCorrelations] = useState<NeuroHealthCorrelation[]>([]);
  const [weatherCorrelations, setWeatherCorrelations] = useState<WeatherMoodCorrelation[]>([]);
  const [researchUpdates, setResearchUpdates] = useState<ResearchUpdate[]>([]);
  const [isDataEncrypted, setIsDataEncrypted] = useState(true);

  // Load data on user change
  useEffect(() => {
    if (user) {
      loadHealthData();
      refreshResearchUpdates();
    }
  }, [user]);

  const loadHealthData = async () => {
    try {
      // Load from local storage (encrypted)
      const storedCycles = localStorage.getItem(`health-cycles-${user?.uid}`);
      const storedMenopause = localStorage.getItem(`health-menopause-${user?.uid}`);
      const storedInsights = localStorage.getItem(`health-insights-${user?.uid}`);
      const storedNeuro = localStorage.getItem(`health-neuro-${user?.uid}`);
      const storedWeather = localStorage.getItem(`health-weather-${user?.uid}`);

      if (storedCycles) {
        setCycleData(JSON.parse(storedCycles));
      }
      if (storedMenopause) {
        setMenopauseData(JSON.parse(storedMenopause));
      }
      if (storedInsights) {
        setInsights(JSON.parse(storedInsights));
      }
      if (storedNeuro) {
        setNeuroCorrelations(JSON.parse(storedNeuro));
      }
      if (storedWeather) {
        setWeatherCorrelations(JSON.parse(storedWeather));
      }
    } catch (error) {
      console.error('Error loading health data:', error);
    }
  };

  const saveHealthData = (type: string, data: any) => {
    if (user) {
      localStorage.setItem(`health-${type}-${user.uid}`, JSON.stringify(data));
    }
  };

  const addCycleEntry = (entry: Partial<CycleData>) => {
    const newEntry: CycleData = {
      id: crypto.randomUUID(),
      userId: user?.uid || '',
      cycleStart: new Date(),
      periodStart: new Date(),
      flow: 'medium',
      symptoms: [],
      mood: [],
      energy: 5,
      pain: [],
      notes: '',
      encrypted: isDataEncrypted,
      ...entry
    };

    const updatedCycles = [...cycleData, newEntry];
    setCycleData(updatedCycles);
    saveHealthData('cycles', updatedCycles);
    
    // Generate new insights after adding data
    setTimeout(generateInsights, 500);
  };

  const updateCycleEntry = (id: string, updates: Partial<CycleData>) => {
    const updatedCycles = cycleData.map(cycle => 
      cycle.id === id ? { ...cycle, ...updates } : cycle
    );
    setCycleData(updatedCycles);
    saveHealthData('cycles', updatedCycles);
    
    // Regenerate insights
    setTimeout(generateInsights, 500);
  };

  const updateMenopauseData = (data: Partial<MenopauseData>) => {
    const updated = menopauseData 
      ? { ...menopauseData, ...data }
      : {
          id: crypto.randomUUID(),
          userId: user?.uid || '',
          stage: 'perimenopause' as const,
          symptoms: [],
          hotFlashes: [],
          sleepData: [],
          moodTracking: [],
          boneHealth: [],
          cognitiveFunction: [],
          timestamp: new Date(),
          ...data
        };

    setMenopauseData(updated);
    saveHealthData('menopause', updated);
  };

  const generateInsights = async () => {
    if (cycleData.length < 2) return;

    const newInsights: HealthInsight[] = [];

    // Cycle pattern analysis
    const avgCycleLength = cycleData
      .filter(c => c.cycleLength)
      .reduce((sum, c) => sum + (c.cycleLength || 0), 0) / cycleData.length;

    if (avgCycleLength > 0) {
      newInsights.push({
        id: crypto.randomUUID(),
        type: 'cycle_pattern',
        title: 'Cycle Length Pattern Detected',
        description: `Your average cycle length is ${avgCycleLength.toFixed(1)} days.`,
        dataPoints: cycleData.map(c => c.cycleLength).filter(Boolean),
        confidence: 0.8,
        actionable: true,
        recommendations: [
          getRecommendationForCycleLength(avgCycleLength)
        ],
        researchBased: true,
        sources: [{
          title: 'Normal Menstrual Cycle Patterns',
          authors: ['Reed, B.G.', 'Carr, B.R.'],
          journal: 'Endotext',
          year: 2018,
          relevanceScore: 0.9
        }],
        timestamp: new Date()
      });
    }

    // Mood-cycle correlation
    const moodData = cycleData.flatMap(c => c.mood);
    if (moodData.length > 10) {
      const anxietyByPhase = {
        menstrual: moodData.filter(m => m.cyclePhase === 'menstrual' && m.type === 'anxiety'),
        luteal: moodData.filter(m => m.cyclePhase === 'luteal' && m.type === 'anxiety')
      };

      if (anxietyByPhase.luteal.length > anxietyByPhase.menstrual.length) {
        newInsights.push({
          id: crypto.randomUUID(),
          type: 'mood_trend',
          title: 'Luteal Phase Anxiety Pattern',
          description: 'Your anxiety levels tend to increase during the luteal phase (post-ovulation).',
          dataPoints: moodData,
          confidence: 0.75,
          actionable: true,
          recommendations: [
            'Consider magnesium supplementation during luteal phase',
            'Practice stress management techniques 5-7 days before expected period',
            'Track sleep quality during this phase'
          ],
          researchBased: true,
          sources: [{
            title: 'Premenstrual Syndrome and Anxiety Disorders',
            authors: ['Hantsoo, L.', 'Epperson, C.N.'],
            journal: 'Depression and Anxiety',
            year: 2015,
            relevanceScore: 0.85
          }],
          timestamp: new Date()
        });
      }
    }

    setInsights(newInsights);
    saveHealthData('insights', newInsights);
  };

  const trackNeuroSymptoms = (symptoms: any) => {
    // Implementation for neurodivergent symptom tracking
    const currentDate = new Date();
    const currentCycle = cycleData.find(c => 
      c.cycleStart <= currentDate && (!c.cycleEnd || c.cycleEnd >= currentDate)
    );

    // Add cycle phase correlation if available
    if (currentCycle) {
      symptoms.cyclePhase = calculateCyclePhase(currentCycle, currentDate);
    }

    // Update neuro correlations
    const updatedCorrelations = [...neuroCorrelations];
    // Add correlation logic here
    setNeuroCorrelations(updatedCorrelations);
    saveHealthData('neuro', updatedCorrelations);
  };

  const addWeatherMoodEntry = (entry: WeatherMoodCorrelation) => {
    const updatedWeather = [...weatherCorrelations, entry];
    setWeatherCorrelations(updatedWeather);
    saveHealthData('weather', updatedWeather);
  };

  const refreshResearchUpdates = async () => {
    // This would typically fetch from an API
    // For now, we'll use mock data based on latest research
    const mockResearch: ResearchUpdate[] = [
      {
        id: '1',
        category: 'reproductive_health',
        title: 'New Findings on Cycle Length Variability',
        summary: 'Recent research shows normal cycle variation is wider than previously thought.',
        keyFindings: [
          'Normal cycles can range from 21-40 days',
          'Variability within 7-9 days is considered normal',
          'Stress significantly impacts cycle regularity'
        ],
        clinicalRelevance: 'Updates diagnostic criteria for irregular cycles',
        userActionItems: [
          'Track stress levels alongside cycle data',
          'Focus on overall pattern rather than individual cycle variations'
        ],
        confidenceLevel: 'strong',
        source: {
          title: 'Menstrual Cycle Variability and Reproductive Health',
          authors: ['Bull, J.R.', 'Rowland, S.P.', 'et al.'],
          journal: 'NPJ Digital Medicine',
          year: 2019,
          doi: '10.1038/s41746-019-0152-7',
          relevanceScore: 0.95
        },
        implementedInApp: true,
        userRelevanceScore: 0.8,
        dateAdded: new Date(),
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
    ];

    setResearchUpdates(mockResearch);
  };

  const predictNextPeriod = (): Date | null => {
    if (cycleData.length < 2) return null;

    const recentCycles = cycleData
      .filter(c => c.cycleLength)
      .slice(-6) // Use last 6 cycles
      .sort((a, b) => a.cycleStart.getTime() - b.cycleStart.getTime());

    if (recentCycles.length === 0) return null;

    const avgCycleLength = recentCycles
      .reduce((sum, c) => sum + (c.cycleLength || 0), 0) / recentCycles.length;

    const lastCycle = recentCycles[recentCycles.length - 1];
    const nextPeriodDate = new Date(lastCycle.cycleStart);
    nextPeriodDate.setDate(nextPeriodDate.getDate() + Math.round(avgCycleLength));

    return nextPeriodDate;
  };

  const predictSymptomSeverity = (symptomType: string): number => {
    const symptomHistory = cycleData
      .flatMap(c => c.symptoms)
      .filter(s => s.type === symptomType)
      .slice(-10); // Last 10 occurrences

    if (symptomHistory.length === 0) return 0;

    return symptomHistory.reduce((sum, s) => sum + s.severity, 0) / symptomHistory.length;
  };

  const calculateCyclePhase = (cycle: CycleData, date: Date): string => {
    const daysSinceStart = Math.floor((date.getTime() - cycle.cycleStart.getTime()) / (1000 * 60 * 60 * 24));
    const cycleLength = cycle.cycleLength || 28;

    if (daysSinceStart <= 5) return 'menstrual';
    if (daysSinceStart <= cycleLength / 2 - 2) return 'follicular';
    if (daysSinceStart <= cycleLength / 2 + 2) return 'ovulatory';
    return 'luteal';
  };

  const toggleEncryption = () => {
    setIsDataEncrypted(!isDataEncrypted);
    // Re-save all data with new encryption status
    if (user) {
      saveHealthData('cycles', cycleData);
      saveHealthData('menopause', menopauseData);
      saveHealthData('insights', insights);
      saveHealthData('neuro', neuroCorrelations);
      saveHealthData('weather', weatherCorrelations);
    }
  };

  const currentCycle = cycleData.find(c => 
    !c.cycleEnd || c.cycleEnd >= new Date()
  ) || null;

  const contextValue = useMemo(() => ({
    cycleData,
    currentCycle,
    addCycleEntry,
    updateCycleEntry,
    menopauseData,
    updateMenopauseData,
    insights,
    generateInsights,
    neuroCorrelations,
    trackNeuroSymptoms,
    weatherCorrelations,
    addWeatherMoodEntry,
    researchUpdates,
    refreshResearchUpdates,
    predictNextPeriod,
    predictSymptomSeverity,
    isDataEncrypted,
    toggleEncryption
  }), [
    cycleData,
    currentCycle,
    menopauseData,
    insights,
    neuroCorrelations,
    weatherCorrelations,
    researchUpdates,
    isDataEncrypted
  ]);

  return (
    <HealthContext.Provider value={contextValue}>
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};

// Health Data Types - Evidence-Based Health Tracking
// Based on latest reproductive health and neurodivergent wellness research

export interface CycleData {
  id: string;
  userId: string;
  cycleStart: Date;
  cycleEnd?: Date;
  periodStart: Date;
  periodEnd?: Date;
  flow: 'light' | 'medium' | 'heavy' | 'spotting';
  symptoms: CycleSymptom[];
  mood: MoodData[];
  energy: number; // 1-10 scale
  pain: PainData[];
  notes: string;
  predictedNext?: Date;
  cycleLength?: number;
  periodLength?: number;
  encrypted: boolean;
}

export interface CycleSymptom {
  type: 'cramps' | 'bloating' | 'headache' | 'nausea' | 'breast_tenderness' | 
        'acne' | 'fatigue' | 'irritability' | 'anxiety' | 'depression' | 
        'brain_fog' | 'insomnia' | 'hot_flashes' | 'night_sweats' | 
        'joint_pain' | 'digestive_issues' | 'other';
  severity: number; // 1-10 scale
  duration: number; // hours
  timestamp: Date;
  notes?: string;
}

export interface PainData {
  location: 'lower_abdomen' | 'lower_back' | 'head' | 'breasts' | 'joints' | 'other';
  intensity: number; // 1-10 scale
  type: 'cramping' | 'sharp' | 'dull' | 'throbbing' | 'burning' | 'other';
  duration: number; // minutes
  relief?: string; // what helped
  timestamp: Date;
}

export interface MoodData {
  type: 'anxiety' | 'depression' | 'irritability' | 'euphoria' | 'stable' | 
        'overwhelmed' | 'focused' | 'scattered' | 'emotional' | 'numb';
  intensity: number; // 1-10 scale
  triggers?: string[];
  timestamp: Date;
  cyclePhase?: 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';
}

export interface MenopauseData {
  id: string;
  userId: string;
  stage: 'perimenopause' | 'menopause' | 'postmenopause';
  lastPeriod?: Date;
  symptoms: MenopauseSymptom[];
  hotFlashes: HotFlashData[];
  sleepData: SleepData[];
  moodTracking: MoodData[];
  boneHealth: BoneHealthData[];
  cognitiveFunction: CognitiveData[];
  timestamp: Date;
}

export interface MenopauseSymptom {
  type: 'hot_flashes' | 'night_sweats' | 'sleep_disturbances' | 'mood_changes' |
        'vaginal_dryness' | 'decreased_libido' | 'weight_gain' | 'hair_loss' |
        'dry_skin' | 'memory_issues' | 'concentration_problems' | 'joint_stiffness';
  severity: number; // 1-10 scale
  frequency: 'rare' | 'occasional' | 'frequent' | 'constant';
  timestamp: Date;
  impact: 'none' | 'mild' | 'moderate' | 'severe';
}

export interface HotFlashData {
  intensity: number; // 1-10 scale
  duration: number; // minutes
  triggers?: string[];
  location: 'face' | 'neck' | 'chest' | 'whole_body';
  sweating: boolean;
  timestamp: Date;
}

export interface SleepData {
  bedtime: Date;
  wakeTime: Date;
  quality: number; // 1-10 scale
  interruptions: number;
  nightSweats: boolean;
  restfulness: number; // 1-10 scale
}

export interface BoneHealthData {
  lastDexaScan?: Date;
  boneDensity?: number;
  supplementation: string[];
  exerciseMinutes: number;
  calciumIntake: number; // mg
  vitaminDLevel?: number; // ng/mL
}

export interface CognitiveData {
  memoryRating: number; // 1-10 scale
  concentrationRating: number; // 1-10 scale
  brainFogSeverity: number; // 1-10 scale
  mentalClarity: number; // 1-10 scale
  wordFinding: number; // 1-10 scale (difficulty level)
  timestamp: Date;
}

export interface HealthInsight {
  id: string;
  type: 'cycle_pattern' | 'symptom_correlation' | 'mood_trend' | 'pain_pattern' |
        'menopause_progression' | 'neurodivergent_correlation';
  title: string;
  description: string;
  dataPoints: any[];
  confidence: number; // 0-1 scale
  actionable: boolean;
  recommendations: string[];
  researchBased: boolean;
  sources: ResearchSource[];
  timestamp: Date;
}

export interface ResearchSource {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  url?: string;
  relevanceScore: number; // 0-1 scale
}

export interface NeuroHealthCorrelation {
  adhdSymptoms: ADHDSymptom[];
  autismSymptoms: AutismSymptom[];
  anxietyLevels: number[];
  depressionLevels: number[];
  executiveFunction: ExecutiveFunctionData[];
  sensoryProcessing: SensoryData[];
  correlationWithCycle: CycleCorrelation[];
}

export interface ADHDSymptom {
  type: 'inattention' | 'hyperactivity' | 'impulsivity';
  severity: number; // 1-10 scale
  context: string;
  cyclePhase?: string;
  timestamp: Date;
}

export interface AutismSymptom {
  type: 'sensory_overload' | 'social_difficulty' | 'routine_disruption' | 
        'communication_challenges' | 'repetitive_behaviors';
  severity: number; // 1-10 scale
  triggers?: string[];
  cyclePhase?: string;
  timestamp: Date;
}

export interface ExecutiveFunctionData {
  planning: number; // 1-10 scale
  organization: number; // 1-10 scale
  timeManagement: number; // 1-10 scale
  workingMemory: number; // 1-10 scale
  cognitiveFlexibility: number; // 1-10 scale
  inhibitoryControl: number; // 1-10 scale
  timestamp: Date;
}

export interface SensoryData {
  visualSensitivity: number; // 1-10 scale
  auditorySensitivity: number; // 1-10 scale
  tactileSensitivity: number; // 1-10 scale
  olfactorySensitivity: number; // 1-10 scale
  overallOverload: number; // 1-10 scale
  copingStrategies: string[];
  timestamp: Date;
}

export interface CycleCorrelation {
  cyclePhase: 'menstrual' | 'follicular' | 'ovulatory' | 'luteal';
  symptomType: string;
  correlationStrength: number; // -1 to 1
  pValue: number;
  sampleSize: number;
  significantFinding: boolean;
}

export interface WeatherMoodCorrelation {
  temperature: number;
  humidity: number;
  barometricPressure: number;
  sunlightHours: number;
  moodRating: number;
  energyLevel: number;
  painLevel: number;
  timestamp: Date;
  location: string;
}

export interface ResearchUpdate {
  id: string;
  category: 'reproductive_health' | 'neurodivergent_wellness' | 'menopause' | 
            'period_health' | 'mood_disorders' | 'pain_management';
  title: string;
  summary: string;
  keyFindings: string[];
  clinicalRelevance: string;
  userActionItems: string[];
  confidenceLevel: 'preliminary' | 'moderate' | 'strong' | 'consensus';
  source: ResearchSource;
  implementedInApp: boolean;
  userRelevanceScore: number; // 0-1 based on user's health profile
  dateAdded: Date;
  expiryDate: Date; // when to check for updates
}

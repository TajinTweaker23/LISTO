'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Heart, 
  Brain, 
  CheckCircle,
  Clock,
  Target,
  Activity,
  Zap
} from 'lucide-react';

interface PreventionStrategy {
  id: string;
  disease: string;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  noNonsenseAction: string;
  holisticApproach: string;
  timeframe: string;
  evidenceLevel: 'strong' | 'moderate' | 'emerging';
  costEffectiveness: 'free' | 'low' | 'moderate' | 'high';
  immediateSteps: string[];
  longTermStrategy: string;
  biomarkers: string[];
  lifestyle: string[];
  category: 'cardiovascular' | 'metabolic' | 'cancer' | 'neurological' | 'autoimmune' | 'infectious';
}

const DISEASE_PREVENTION_STRATEGIES: PreventionStrategy[] = [
  {
    id: 'cvd-1',
    disease: 'Heart Disease (Leading Cause of Death)',
    riskLevel: 'critical',
    noNonsenseAction: 'Walk 30 minutes daily, stop smoking immediately, check blood pressure weekly. No excuses.',
    holisticApproach: 'Heart health reflects whole-body inflammation. Address stress (cortisol damages arteries), optimize sleep (repairs cardiovascular system), build social connections (loneliness increases heart disease risk by 29%).',
    timeframe: '90 days to see measurable improvement',
    evidenceLevel: 'strong',
    costEffectiveness: 'free',
    immediateSteps: [
      'Take stairs instead of elevators starting today',
      'Replace one sugary drink with water daily',
      'Check pulse and note irregularities',
      'Schedule blood pressure check this week'
    ],
    longTermStrategy: 'Mediterranean diet + consistent cardio + stress management + strong social connections = 80% reduction in heart disease risk',
    biomarkers: ['Blood pressure', 'Resting heart rate', 'Cholesterol panel', 'CRP (inflammation)'],
    lifestyle: ['Daily movement', 'Stress management', 'Social connections', 'Quality sleep'],
    category: 'cardiovascular'
  },
  {
    id: 'dm-1',
    disease: 'Type 2 Diabetes (90% Preventable)',
    riskLevel: 'high',
    noNonsenseAction: 'Lose 7% body weight, walk after every meal, cut liquid calories. Diabetes is largely a lifestyle disease.',
    holisticApproach: 'Insulin resistance starts in muscle and liver, spreads system-wide. Address root causes: chronic stress (elevates cortisol), poor sleep (disrupts glucose metabolism), inflammation from processed foods.',
    timeframe: '6 months to reverse prediabetes',
    evidenceLevel: 'strong',
    costEffectiveness: 'free',
    immediateSteps: [
      'Measure waist circumference (indicator of visceral fat)',
      'Eliminate sugary drinks completely',
      '10-minute walk after each meal starting today',
      'Request HbA1c test if over 35'
    ],
    longTermStrategy: 'Whole foods + intermittent fasting + resistance training + stress reduction = 58% diabetes risk reduction (DPP study)',
    biomarkers: ['HbA1c', 'Fasting glucose', 'Waist circumference', 'Blood pressure'],
    lifestyle: ['Whole food diet', 'Regular meals', 'Strength training', 'Adequate sleep'],
    category: 'metabolic'
  },
  {
    id: 'cancer-1',
    disease: 'Cancer (40% Preventable)',
    riskLevel: 'high',
    noNonsenseAction: 'Stop smoking, limit alcohol, maintain healthy weight, get recommended screenings. Cancer prevention is real.',
    holisticApproach: 'Cancer thrives in environments of chronic inflammation, immune dysfunction, and cellular damage. Support natural cancer surveillance: optimize immune function, reduce oxidative stress, maintain circadian rhythms.',
    timeframe: 'Lifelong prevention strategy',
    evidenceLevel: 'strong',
    costEffectiveness: 'low',
    immediateSteps: [
      'Schedule overdue cancer screenings',
      'Audit household chemicals and replace toxic ones',
      'Increase vegetable intake to 5+ servings daily',
      'Establish consistent sleep schedule'
    ],
    longTermStrategy: 'Plant-rich diet + regular screening + toxin avoidance + immune support + stress management = 40% cancer risk reduction',
    biomarkers: ['BMI', 'Inflammatory markers', 'Vitamin D', 'Screening results'],
    lifestyle: ['Antioxidant-rich foods', 'Regular screenings', 'Toxin avoidance', 'Immune support'],
    category: 'cancer'
  },
  {
    id: 'alzheimer-1',
    disease: 'Alzheimer\'s/Dementia (30% Preventable)',
    riskLevel: 'moderate',
    noNonsenseAction: 'Exercise regularly, control blood pressure, stay socially engaged, challenge your brain daily. Your lifestyle determines brain fate.',
    holisticApproach: 'Brain health is whole-body health. Alzheimer\'s often called "Type 3 Diabetes" - metabolic dysfunction in the brain. Address vascular health, inflammation, sleep quality, and cognitive reserve.',
    timeframe: 'Start in 40s for maximum benefit',
    evidenceLevel: 'strong',
    costEffectiveness: 'free',
    immediateSteps: [
      'Learn something new (instrument, language, skill)',
      'Prioritize 7+ hours quality sleep',
      'Add omega-3 rich foods 3x weekly',
      'Schedule social activities weekly'
    ],
    longTermStrategy: 'Aerobic exercise + Mediterranean diet + lifelong learning + strong relationships + quality sleep = 30% dementia risk reduction',
    biomarkers: ['Blood pressure', 'Cholesterol', 'Blood glucose', 'Cognitive assessments'],
    lifestyle: ['Continuous learning', 'Social engagement', 'Physical exercise', 'Mental stimulation'],
    category: 'neurological'
  },
  {
    id: 'stroke-1',
    disease: 'Stroke (80% Preventable)',
    riskLevel: 'high',
    noNonsenseAction: 'Control blood pressure aggressively, manage diabetes, quit smoking, recognize F.A.S.T. signs. Strokes are largely preventable.',
    holisticApproach: 'Stroke is endpoint of systemic vascular dysfunction. Address whole cardiovascular system: blood pressure, cholesterol, inflammation, clotting factors, and vessel flexibility.',
    timeframe: 'Risk reduction starts immediately',
    evidenceLevel: 'strong',
    costEffectiveness: 'low',
    immediateSteps: [
      'Learn F.A.S.T. stroke recognition signs',
      'Monitor blood pressure weekly at home',
      'Add potassium-rich foods (bananas, spinach)',
      'Reduce sodium to <2300mg daily'
    ],
    longTermStrategy: 'BP control + anticoagulation if needed + healthy diet + regular exercise = 80% stroke prevention',
    biomarkers: ['Blood pressure', 'Cholesterol', 'Atrial fibrillation screening', 'Carotid ultrasound'],
    lifestyle: ['Low sodium diet', 'Regular exercise', 'Medication compliance', 'Stress management'],
    category: 'cardiovascular'
  },
  {
    id: 'osteoporosis-1',
    disease: 'Osteoporosis (Mostly Preventable)',
    riskLevel: 'moderate',
    noNonsenseAction: 'Weight-bearing exercise, adequate calcium/vitamin D, quit smoking, limit alcohol. Peak bone mass determines future fracture risk.',
    holisticApproach: 'Bone health reflects overall mineral metabolism, hormone balance, and mechanical stress. Support bone formation: optimize nutrition, maintain muscle mass, ensure hormonal balance.',
    timeframe: 'Build peak bone mass by age 30',
    evidenceLevel: 'strong',
    costEffectiveness: 'low',
    immediateSteps: [
      'Add resistance training 2x weekly minimum',
      'Get 15 minutes sun exposure daily',
      'Include calcium-rich foods in meals',
      'Check vitamin D level if over 50'
    ],
    longTermStrategy: 'Weight-bearing exercise + adequate calcium/D3 + hormone optimization + fall prevention = major fracture risk reduction',
    biomarkers: ['Bone density scan', 'Vitamin D level', 'Calcium levels', 'Hormone levels'],
    lifestyle: ['Resistance training', 'Balance exercises', 'Adequate protein', 'Fall prevention'],
    category: 'metabolic'
  }
];

const HOLISTIC_PREVENTION_PILLARS = [
  {
    pillar: 'Inflammation Control',
    noNonsense: 'Chronic inflammation kills. Period.',
    holistic: 'Inflammation is the root of most chronic diseases. Address sources: processed foods, chronic stress, poor sleep, environmental toxins, gut dysfunction.',
    actions: ['Anti-inflammatory foods', 'Stress management', 'Quality sleep', 'Toxin reduction'],
    biomarker: 'CRP, ESR'
  },
  {
    pillar: 'Metabolic Health',
    noNonsense: 'Insulin resistance = disease accelerator.',
    holistic: 'Metabolic dysfunction cascades through every system. Optimize glucose metabolism, mitochondrial function, and hormonal balance.',
    actions: ['Intermittent fasting', 'Whole foods', 'Strength training', 'Sleep optimization'],
    biomarker: 'HbA1c, Insulin'
  },
  {
    pillar: 'Immune Function',
    noNonsense: 'Strong immunity = disease resistance.',
    holistic: 'Immune system requires balanced nutrients, adequate rest, managed stress, and healthy gut microbiome to function optimally.',
    actions: ['Nutrient diversity', 'Stress reduction', 'Quality sleep', 'Microbiome support'],
    biomarker: 'WBC count, Vitamin D'
  },
  {
    pillar: 'Vascular Health',
    noNonsense: 'Healthy blood vessels = healthy organs.',
    holistic: 'Vascular system delivers nutrients and removes waste. Support with movement, proper nutrition, blood pressure management.',
    actions: ['Daily movement', 'Nitric oxide foods', 'BP management', 'Hydration'],
    biomarker: 'Blood pressure, Flow-mediated dilation'
  }
];

interface DiseasePreventionHubProps {
  currentHealth?: {
    age: number;
    conditions: string[];
    medications: string[];
    familyHistory: string[];
  };
  onPreventionPlan?: (strategies: PreventionStrategy[]) => void;
}

const DiseasePreventionHub: React.FC<DiseasePreventionHubProps> = ({
  currentHealth,
  onPreventionPlan
}) => {
  const [activeTab, setActiveTab] = useState<'prevention' | 'pillars' | 'assessment'>('prevention');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [userProgress, setUserProgress] = useState<{[key: string]: boolean}>({});
  const [personalizedStrategies, setPersonalizedStrategies] = useState<PreventionStrategy[]>([]);

  useEffect(() => {
    // Load user progress from localStorage
    const savedProgress = localStorage.getItem('diseasePreventionProgress');
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress));
    }

    // Personalize strategies based on current health
    if (currentHealth) {
      const prioritized = DISEASE_PREVENTION_STRATEGIES
        .sort((a, b) => {
          // Prioritize based on age and family history
          let aScore = 0, bScore = 0;
          
          if (currentHealth.age > 40) {
            if (a.category === 'cardiovascular') aScore += 2;
            if (b.category === 'cardiovascular') bScore += 2;
          }
          
          if (currentHealth.familyHistory.some(h => a.disease.toLowerCase().includes(h.toLowerCase()))) {
            aScore += 3;
          }
          if (currentHealth.familyHistory.some(h => b.disease.toLowerCase().includes(h.toLowerCase()))) {
            bScore += 3;
          }

          return bScore - aScore;
        });
      
      setPersonalizedStrategies(prioritized);
    } else {
      setPersonalizedStrategies(DISEASE_PREVENTION_STRATEGIES);
    }
  }, [currentHealth]);

  const saveProgress = (strategyId: string, completed: boolean) => {
    const newProgress = { ...userProgress, [strategyId]: completed };
    setUserProgress(newProgress);
    localStorage.setItem('diseasePreventionProgress', JSON.stringify(newProgress));
  };

  const getAgeFocus = (age: number): string => {
    if (age < 40) return 'Foundation building';
    if (age < 60) return 'Active prevention';
    return 'Maintenance & screening';
  };

  const filteredStrategies = selectedCategory === 'all' 
    ? personalizedStrategies 
    : personalizedStrategies.filter(s => s.category === selectedCategory);

  // Get unique categories from strategies  
  const categorySet = DISEASE_PREVENTION_STRATEGIES.reduce((acc, s) => {
    acc.add(s.category);
    return acc;
  }, new Set<string>());
  const categories = Array.from(categorySet);
  const completedStrategies = Object.values(userProgress).filter(Boolean).length;

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'moderate': return 'yellow';
      case 'low': return 'green';
      default: return 'gray';
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-green-600" />
          <div>
            <h2 className="font-bold text-2xl text-gray-800">Disease Prevention Hub</h2>
            <p className="text-sm text-gray-600">No-nonsense prevention + holistic health</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500">Strategies Implemented</div>
          <div className="font-bold text-green-600 flex items-center gap-1">
            <Target className="w-4 h-4" />
            {completedStrategies}/{DISEASE_PREVENTION_STRATEGIES.length}
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-500">
            {filteredStrategies.filter(s => s.riskLevel === 'critical').length}
          </div>
          <div className="text-xs text-gray-500">Critical Risks</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-500">
            {filteredStrategies.filter(s => s.riskLevel === 'high').length}
          </div>
          <div className="text-xs text-gray-500">High Risks</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600">
            {filteredStrategies.filter(s => s.costEffectiveness === 'free').length}
          </div>
          <div className="text-xs text-gray-500">Free Prevention</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {filteredStrategies.filter(s => s.evidenceLevel === 'strong').length}
          </div>
          <div className="text-xs text-gray-500">Strong Evidence</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex mb-6 bg-white rounded-lg p-1 shadow-sm">
        <button
          onClick={() => setActiveTab('prevention')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'prevention'
              ? 'bg-green-100 text-green-700' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🛡️ Disease Prevention
        </button>
        <button
          onClick={() => setActiveTab('pillars')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'pillars'
              ? 'bg-green-100 text-green-700' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          🏛️ Holistic Pillars
        </button>
        <button
          onClick={() => setActiveTab('assessment')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'assessment'
              ? 'bg-green-100 text-green-700' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          📊 Risk Assessment
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'prevention' && (
          <motion.div
            key="prevention"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Diseases
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-green-100 text-green-700'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Disease Prevention Strategies */}
            <div className="space-y-6">
              {filteredStrategies.map(strategy => {
                const riskColor = getRiskColor(strategy.riskLevel);
                const isCompleted = userProgress[strategy.id];

                return (
                  <div key={strategy.id} className="bg-white rounded-2xl p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-xl text-gray-800">{strategy.disease}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium bg-${riskColor}-100 text-${riskColor}-700`}>
                            {strategy.riskLevel} risk
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            strategy.evidenceLevel === 'strong' 
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {strategy.evidenceLevel} evidence
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            strategy.costEffectiveness === 'free'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {strategy.costEffectiveness} cost
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => saveProgress(strategy.id, !isCompleted)}
                        className={`p-2 rounded-lg transition-colors ${
                          isCompleted
                            ? 'bg-green-100 text-green-600'
                            : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                        }`}
                      >
                        {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                      </button>
                    </div>

                    {/* No-Nonsense vs Holistic Approach */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      <div className="bg-red-50 border-l-4 border-red-400 rounded-lg p-4">
                        <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          No-Nonsense Action
                        </h4>
                        <p className="text-red-700 text-sm">{strategy.noNonsenseAction}</p>
                        <div className="mt-3">
                          <div className="text-xs text-red-600 mb-1">Immediate Steps:</div>
                          <ul className="space-y-1">
                            {strategy.immediateSteps.map((step) => (
                              <li key={step} className="text-xs text-red-700 flex items-center gap-1">
                                <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                                {step}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-4">
                        <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          Holistic Understanding
                        </h4>
                        <p className="text-blue-700 text-sm">{strategy.holisticApproach}</p>
                        <div className="mt-3">
                          <div className="text-xs text-blue-600 mb-1">Long-term Strategy:</div>
                          <p className="text-xs text-blue-700">{strategy.longTermStrategy}</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics and Timeline */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Timeline
                        </h5>
                        <p className="text-sm text-gray-600">{strategy.timeframe}</p>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-1">
                          <Activity className="w-4 h-4" />
                          Key Biomarkers
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {strategy.biomarkers.map((marker) => (
                            <span key={marker} className="text-xs bg-white text-gray-600 px-2 py-1 rounded-full">
                              {marker}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-lg p-3">
                        <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          Lifestyle Pillars
                        </h5>
                        <div className="flex flex-wrap gap-1">
                          {strategy.lifestyle.map((factor) => (
                            <span key={factor} className="text-xs bg-white text-gray-600 px-2 py-1 rounded-full">
                              {factor}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'pillars' && (
          <motion.div
            key="pillars"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6">
              <h3 className="font-bold text-xl text-gray-800 mb-3">
                🏛️ The Four Pillars of Disease Prevention
              </h3>
              <p className="text-gray-700 mb-4">
                No-nonsense truth: These four systems determine your disease risk more than genetics. 
                Holistic understanding: They're interconnected - optimizing one supports all others.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {HOLISTIC_PREVENTION_PILLARS.map((pillar) => (
                <div key={pillar.pillar} className="bg-white rounded-2xl p-6 shadow-sm">
                  <h4 className="font-bold text-lg text-gray-800 mb-3">{pillar.pillar}</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-red-50 border-l-4 border-red-400 rounded p-3">
                      <h5 className="font-medium text-red-800 mb-1">No-Nonsense Truth:</h5>
                      <p className="text-sm text-red-700">{pillar.noNonsense}</p>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 rounded p-3">
                      <h5 className="font-medium text-blue-800 mb-1">Holistic Understanding:</h5>
                      <p className="text-sm text-blue-700">{pillar.holistic}</p>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3">
                      <h5 className="font-medium text-green-800 mb-2">Action Steps:</h5>
                      <div className="grid grid-cols-2 gap-2">
                        {pillar.actions.map((action) => (
                          <div key={action} className="text-xs bg-white text-green-700 px-2 py-1 rounded-full text-center">
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-3">
                      <h5 className="font-medium text-yellow-800 mb-1">Track This:</h5>
                      <p className="text-sm text-yellow-700">{pillar.biomarker}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'assessment' && (
          <motion.div
            key="assessment"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl p-6"
          >
            <h3 className="font-bold text-xl text-gray-800 mb-4">
              📊 Personal Risk Assessment
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-800 mb-3">High-Impact Screenings by Age</h4>
                <div className="space-y-3">
                  <div className="border rounded-lg p-3">
                    <div className="font-medium text-gray-800">Ages 20-39</div>
                    <div className="text-sm text-gray-600">Blood pressure, cholesterol, diabetes screening, cancer risk assessment</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="font-medium text-gray-800">Ages 40-49</div>
                    <div className="text-sm text-gray-600">+ Mammography, colonoscopy prep, heart disease risk, bone density</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="font-medium text-gray-800">Ages 50+</div>
                    <div className="text-sm text-gray-600">+ Regular colonoscopy, lung cancer screening (if smoker), comprehensive metabolic panel</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">Priority Prevention Matrix</h4>
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="font-medium text-red-800">Immediate Action Required</div>
                    <div className="text-sm text-red-600">High risk + Strong evidence + Free/Low cost</div>
                  </div>
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                    <div className="font-medium text-orange-800">Plan This Month</div>
                    <div className="text-sm text-orange-600">Moderate risk + Strong evidence</div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="font-medium text-yellow-800">Consider Long-term</div>
                    <div className="text-sm text-yellow-600">Lower risk + Emerging evidence</div>
                  </div>
                </div>
              </div>
            </div>

            {currentHealth && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Your Personalized Priorities</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-blue-600">Age-based focus:</div>
                    <div className="font-medium text-blue-800">
                      {getAgeFocus(currentHealth.age)}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-600">Family history alerts:</div>
                    <div className="text-blue-800 text-sm">
                      {currentHealth.familyHistory.length > 0 
                        ? currentHealth.familyHistory.join(', ')
                        : 'No specific genetic predispositions noted'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-blue-600">Current conditions:</div>
                    <div className="text-blue-800 text-sm">
                      {currentHealth.conditions.length > 0 
                        ? currentHealth.conditions.join(', ')
                        : 'No current chronic conditions'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper component for circle icon
const Circle = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth={2} />
  </svg>
);

export default DiseasePreventionHub;

import React, { useState, useMemo } from 'react';

interface MedicalAbbreviation {
  abbr: string;
  full: string;
  context: string;
  magicWords: string[];
}

interface CrisisScenario {
  id: string;
  title: string;
  urgency: 'emergency' | 'urgent' | 'routine';
  symptoms: string[];
  magicWords: string[];
  triageAdvice: string;
  insurance?: string;
}

const MEDICAL_ABBREVIATIONS: MedicalAbbreviation[] = [
  {
    abbr: 'SOB',
    full: 'Shortness of Breath',
    context: 'Respiratory complaint',
    magicWords: ['chest pain', 'difficulty breathing', 'cannot catch breath']
  },
  {
    abbr: 'N/V',
    full: 'Nausea and Vomiting',
    context: 'GI symptoms',
    magicWords: ['feel sick', 'throwing up', 'can\'t keep food down']
  },
  {
    abbr: 'A&O x3',
    full: 'Alert and Oriented to Person, Place, Time',
    context: 'Mental status',
    magicWords: ['confused', 'disoriented', 'not acting right']
  },
  {
    abbr: 'CP',
    full: 'Chest Pain',
    context: 'Cardiac complaint',
    magicWords: ['heart pain', 'pressure in chest', 'tight chest']
  },
  {
    abbr: 'HA',
    full: 'Headache',
    context: 'Neurological complaint',
    magicWords: ['head hurts', 'migraine', 'severe headache']
  }
];

const CRISIS_SCENARIOS: CrisisScenario[] = [
  {
    id: 'stroke',
    title: 'Possible Stroke',
    urgency: 'emergency',
    symptoms: ['facial drooping', 'arm weakness', 'speech difficulty', 'time'],
    magicWords: ['FAST assessment', 'stroke symptoms', 'neurological emergency'],
    triageAdvice: 'Call 911 immediately. Note exact time symptoms started. This affects treatment options.',
    insurance: 'Emergency - insurance will cover. Get care first, sort billing later.'
  },
  {
    id: 'chest_pain',
    title: 'Chest Pain',
    urgency: 'emergency',
    symptoms: ['chest pressure', 'left arm pain', 'jaw pain', 'sweating'],
    magicWords: ['heart attack', 'cardiac event', 'chest pain radiating'],
    triageAdvice: 'Do NOT drive yourself. Call 911. Chew aspirin if not allergic.',
    insurance: 'Emergency room visits for chest pain are covered. Document everything.'
  },
  {
    id: 'severe_allergic',
    title: 'Severe Allergic Reaction',
    urgency: 'emergency',
    symptoms: ['difficulty breathing', 'swelling', 'hives', 'dizziness'],
    magicWords: ['anaphylaxis', 'allergic reaction', 'can\'t breathe'],
    triageAdvice: 'Use EpiPen if available, then call 911. Even if you feel better, you need medical evaluation.',
    insurance: 'Life-threatening allergic reactions are emergency coverage.'
  }
];

const INSURANCE_MAGIC_WORDS = {
  authorization: [
    'medically necessary',
    'conservative treatment failed',
    'affecting daily function',
    'documented symptoms',
    'provider recommendation'
  ],
  appeals: [
    'medical necessity',
    'standard of care',
    'peer review',
    'clinical evidence',
    'quality of life impact'
  ],
  emergency: [
    'life-threatening',
    'emergent condition',
    'immediate medical attention required',
    'unstable patient'
  ]
};

export const MedicalAdminAssistant: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'abbreviations' | 'crisis' | 'insurance'>('abbreviations');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAbbreviations = useMemo(() => {
    return MEDICAL_ABBREVIATIONS.filter(abbr =>
      abbr.abbr.toLowerCase().includes(searchTerm.toLowerCase()) ||
      abbr.full.toLowerCase().includes(searchTerm.toLowerCase()) ||
      abbr.context.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredCrises = useMemo(() => {
    return CRISIS_SCENARIOS.filter(crisis =>
      crisis.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crisis.symptoms.some(symptom => symptom.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-100 text-red-700 border-red-200';
      case 'urgent': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'routine': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Medical Admin Assistant</h2>
        <p className="text-gray-600">Leveraging MA expertise for healthcare navigation</p>
        
        {/* Search Bar */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search abbreviations, symptoms, or scenarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {[
          { id: 'abbreviations', label: 'Medical Terms', icon: '📚' },
          { id: 'crisis', label: 'Crisis Guide', icon: '🚨' },
          { id: 'insurance', label: 'Insurance Magic', icon: '💳' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {/* Medical Abbreviations Tab */}
        {activeTab === 'abbreviations' && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-blue-700 font-medium">
                💡 <strong>MA Pro Tip:</strong> When documenting or communicating with providers, 
                using correct medical terminology shows you understand the severity and helps prioritize your case.
              </p>
            </div>
            
            <div className="grid gap-4">
              {filteredAbbreviations.map((abbr) => (
                <div key={abbr.abbr} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg text-blue-600">{abbr.abbr}</h3>
                      <p className="text-gray-800 font-medium">{abbr.full}</p>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {abbr.context}
                    </span>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-green-600 mb-1">Magic Words to Use:</p>
                    <div className="flex flex-wrap gap-2">
                      {abbr.magicWords.map((word) => (
                        <span key={word} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          "{word}"
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Crisis Management Tab */}
        {activeTab === 'crisis' && (
          <div className="space-y-4">
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <p className="text-red-700 font-medium">
                🚨 <strong>Emergency Reminder:</strong> When in doubt, go to the ER. 
                Your health {'>'}insurance concerns. Document everything for billing disputes later.
              </p>
            </div>
            
            <div className="grid gap-4">
              {filteredCrises.map((crisis) => (
                <div key={crisis.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg text-gray-800">{crisis.title}</h3>
                    <span className={`text-xs px-3 py-1 rounded-full border ${getUrgencyColor(crisis.urgency)}`}>
                      {crisis.urgency.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-2">Symptoms to Watch:</p>
                      <ul className="text-sm space-y-1">
                        {crisis.symptoms.map((symptom) => (
                          <li key={symptom} className="flex items-center gap-2">
                            <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                            {symptom}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="text-sm font-medium text-green-600 mb-2">Magic Words for Triage:</p>
                      <div className="space-y-1">
                        {crisis.magicWords.map((word) => (
                          <span key={word} className="inline-block text-xs bg-green-100 text-green-700 px-2 py-1 rounded mr-1 mb-1">
                            "{word}"
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="text-sm font-medium text-gray-700 mb-1">Triage Advice:</p>
                    <p className="text-sm text-gray-600">{crisis.triageAdvice}</p>
                    
                    {crisis.insurance && (
                      <div className="mt-2">
                        <p className="text-sm font-medium text-blue-600 mb-1">Insurance Note:</p>
                        <p className="text-sm text-blue-700">{crisis.insurance}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Insurance Magic Words Tab */}
        {activeTab === 'insurance' && (
          <div className="space-y-6">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-green-700 font-medium">
                💳 <strong>Insurance Magic:</strong> The right words can mean the difference between 
                approval and denial. These phrases trigger positive responses in insurance systems.
              </p>
            </div>
            
            {Object.entries(INSURANCE_MAGIC_WORDS).map(([category, words]) => (
              <div key={category} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg text-gray-800 mb-3 capitalize">
                  {category.replace('_', ' ')} Magic Words
                </h3>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {words.map((phrase) => (
                    <div key={phrase} className="bg-blue-50 border border-blue-200 rounded p-3">
                      <p className="text-sm font-medium text-blue-700">"{phrase}"</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <p className="text-sm text-yellow-700">
                    <strong>Usage Tip:</strong> Always combine these phrases with specific medical documentation 
                    from your provider. Insurance companies need both the magic words AND clinical support.
                  </p>
                </div>
              </div>
            ))}
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-bold text-gray-800 mb-3">MA's Emergency Insurance Strategy</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700">
                <li>Get care first, fight billing second</li>
                <li>Document everything - photos, times, symptoms</li>
                <li>Request written denial reasons if rejected</li>
                <li>Use the phrase "medically necessary" in all communications</li>
                <li>Know your plan's appeal process before you need it</li>
                <li>Hospital financial aid exists - ASK about it</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicalAdminAssistant;

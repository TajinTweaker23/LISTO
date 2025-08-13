'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HeartHandshake, 
  FileText, 
  Phone, 
  AlertCircle, 
  CheckCircle,
  Clock,
  DollarSign,
  Shield
} from 'lucide-react';

const CRISIS_SCENARIOS = [
  {
    id: 1,
    scenario: "Insurance denied my procedure",
    magicWords: "I need to file a formal appeal with peer-to-peer review",
    explanation: "Triggers internal review process - insurance companies hate denying after peer review",
    timeline: "File within 60 days of denial notice",
    nextSteps: ["Request complete medical records", "Get physician letter of medical necessity", "Submit appeal with clinical documentation"]
  },
  {
    id: 2,
    scenario: "Doctor won't listen to my symptoms",
    magicWords: "Please document in my chart that you're refusing this test/referral",
    explanation: "Creates legal liability - forces documentation of their refusal",
    timeline: "Ask immediately during appointment",
    nextSteps: ["Request copy of visit notes", "Seek second opinion", "Consider patient advocate"]
  },
  {
    id: 3,
    scenario: "Surprise medical bill after insurance",
    magicWords: "I invoke the No Surprises Act for balance billing protection",
    explanation: "Federal law protects against surprise bills from out-of-network providers",
    timeline: "Within 120 days of bill",
    nextSteps: ["Contact provider billing dept", "File complaint with state insurance", "Request itemized bill"]
  }
];

const MEDICAL_ABBREVIATIONS = [
  { abbr: "PRN", meaning: "As needed", context: "Take this medication PRN for pain" },
  { abbr: "BID", meaning: "Twice daily", context: "Take medication BID with meals" },
  { abbr: "QHS", meaning: "At bedtime", context: "Take QHS for better sleep" },
  { abbr: "NPO", meaning: "Nothing by mouth", context: "Patient is NPO before surgery" },
  { abbr: "STAT", meaning: "Immediately", context: "Draw labs STAT" },
  { abbr: "PRN", meaning: "As needed", context: "Call if pain increases" }
];

const INSURANCE_NAVIGATION = [
  {
    situation: "Prior authorization needed",
    solution: "Ask for 'urgent' status if time-sensitive - reduces wait from 15 days to 72 hours",
    tip: "Have doctor's office call insurance directly while you're there"
  },
  {
    situation: "Claim was processed incorrectly", 
    solution: "Request 'claims research' - different department with more authority than regular customer service",
    tip: "Always get reference numbers and representative names"
  },
  {
    situation: "Need specialist referral",
    solution: "Ask for 'standing referral' if chronic condition - covers multiple visits",
    tip: "Get referral authorization number before scheduling"
  }
];

export default function MedicalAdminAssistant() {
  const [activeSection, setActiveSection] = useState('crisis');

  const renderCrisisManagement = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-red-700 mb-2">Medical Crisis Navigation</h3>
        <p className="text-gray-600">The exact words that get results when healthcare fails you</p>
      </div>

      <div className="grid gap-6">
        {CRISIS_SCENARIOS.map((crisis) => (
          <motion.div
            key={crisis.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: crisis.id * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-red-100"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-3">{crisis.scenario}</h4>
                
                <div className="bg-red-50 rounded-lg p-4 mb-4">
                  <div className="text-sm text-red-600 font-medium mb-1">Say exactly this:</div>
                  <div className="font-bold text-red-800 text-lg">{crisis.magicWords}</div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Why it works:</div>
                    <p className="text-sm text-gray-600">{crisis.explanation}</p>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700 mb-2">Timeline:</div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {crisis.timeline}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-medium text-gray-700 mb-2">Next steps:</div>
                  <ul className="space-y-1">
                    {crisis.nextSteps.map((step, idx) => (
                      <li key={step} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-green-500" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderInsuranceNavigation = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-blue-700 mb-2">Insurance Navigation Secrets</h3>
        <p className="text-gray-600">MA insider knowledge for dealing with insurance companies</p>
      </div>

      <div className="grid gap-4">
        {INSURANCE_NAVIGATION.map((item, idx) => (
          <div key={item.situation} className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h4 className="font-bold text-gray-800 mb-2">{item.situation}</h4>
                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <div className="text-sm font-medium text-blue-800">{item.solution}</div>
                </div>
                <div className="text-sm text-gray-600 italic">💡 Pro tip: {item.tip}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMedicalDecoder = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-green-700 mb-2">Medical Abbreviation Decoder</h3>
        <p className="text-gray-600">Understand what your medical team is really saying</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {MEDICAL_ABBREVIATIONS.map((item, idx) => (
          <div key={`${item.abbr}-${idx}`} className="bg-white rounded-2xl p-4 shadow-sm border border-green-100">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-2xl text-green-700">{item.abbr}</span>
              <FileText className="w-5 h-5 text-green-500" />
            </div>
            <div className="font-medium text-gray-800 mb-1">{item.meaning}</div>
            <div className="text-sm text-gray-600 italic">{item.context}</div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <HeartHandshake className="w-8 h-8 text-blue-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Medical Administrative Assistant
          </h2>
        </div>
        <p className="text-gray-600 text-lg">
          Navigate healthcare like an insider • MA-level expertise • Get the care you deserve
        </p>
      </div>

      {/* Section Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-2xl p-2 shadow-sm inline-flex gap-2">
          {[
            { id: 'crisis', label: 'Crisis Management', icon: AlertCircle },
            { id: 'insurance', label: 'Insurance Navigation', icon: Shield },
            { id: 'decoder', label: 'Medical Decoder', icon: FileText }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-lg'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Content */}
      <motion.div
        key={activeSection}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeSection === 'crisis' && renderCrisisManagement()}
        {activeSection === 'insurance' && renderInsuranceNavigation()}
        {activeSection === 'decoder' && renderMedicalDecoder()}
      </motion.div>

      {/* Emergency Disclaimer */}
      <div className="mt-12 bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-red-800 mb-2">Medical Emergency Disclaimer</h4>
            <p className="text-red-700 text-sm">
              This tool is for administrative navigation only. In medical emergencies, call 911 immediately. 
              This information does not replace medical advice from licensed healthcare providers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

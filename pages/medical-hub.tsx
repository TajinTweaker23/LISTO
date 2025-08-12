import React from 'react';
import { MedicalMicroLearning } from '../components/medical/MedicalMicroLearning';
import { WaterReminder } from '../components/health/WaterReminder';
import HealthGoalTracker from '../components/health/HealthGoalTracker';

const MedicalHub: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🏥 LISTO Medical Knowledge Hub
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Evidence-based health education meets real-world medical administration expertise. 
            Built by someone with MA experience who understands healthcare navigation.
          </p>
          
          <div className="flex justify-center gap-4 mt-6">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              ✓ MA Approved Content
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              🔬 Research-Backed
            </span>
            <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
              🧠 Brain-Rot Friendly
            </span>
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
              💡 No-Nonsense Approach
            </span>
          </div>
        </div>

        {/* Value Proposition */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Why This Medical Hub is Different
              </h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="text-green-500 font-bold">✓</span>
                  <div>
                    <strong>MA Experience:</strong> Built with real medical office workflow knowledge and insurance navigation expertise
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-500 font-bold">✓</span>
                  <div>
                    <strong>Passive Learning:</strong> TikTok-style medical education that actually sticks while you're doing other things
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-purple-500 font-bold">✓</span>
                  <div>
                    <strong>Holistic + No-Nonsense:</strong> Evidence-based medical facts with practical healthcare system survival tips
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-orange-500 font-bold">✓</span>
                  <div>
                    <strong>Completely Free:</strong> No subscriptions, no tracking, no premium tiers. Your health education shouldn't cost extra.
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg p-6">
              <div className="text-center">
                <div className="text-3xl mb-3">🎯</div>
                <h3 className="font-bold text-gray-800 mb-2">Perfect For:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Healthcare workers seeking efficiency tips</li>
                  <li>• Patients navigating complex medical systems</li>
                  <li>• Anyone wanting digestible medical education</li>
                  <li>• People with medical admin backgrounds</li>
                  <li>• Those seeking evidence-based wellness</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Medical Micro Learning */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-4">
              <h3 className="text-xl font-bold mb-2">🧠 Brain Rot Medical Education</h3>
              <p className="text-purple-100">
                TikTok-style medical facts that actually teach you something useful. 
                15-second digestible chunks of real medical knowledge.
              </p>
            </div>
            <div className="p-6">
              <MedicalMicroLearning />
              <div className="mt-4 text-sm text-gray-600">
                <strong>Features:</strong> Auto-rotation, progress tracking, MA-verified accuracy ratings, 
                related health topic integration, brain rot level indicators.
              </div>
            </div>
          </div>

          {/* Medical Admin Assistant */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-4">
              <h3 className="text-xl font-bold mb-2">🏥 Medical Admin Navigator</h3>
              <p className="text-green-100">
                Real-world healthcare system navigation tools. Insurance magic words, 
                crisis protocols, and medical abbreviation decoder.
              </p>
            </div>
            <div className="p-6">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl mb-1">📚</div>
                    <div className="text-sm font-medium">Medical Terms</div>
                    <div className="text-xs text-gray-500">Decode abbreviations</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">🚨</div>
                    <div className="text-sm font-medium">Crisis Guide</div>
                    <div className="text-xs text-gray-500">Emergency protocols</div>
                  </div>
                  <div>
                    <div className="text-2xl mb-1">💳</div>
                    <div className="text-sm font-medium">Insurance Magic</div>
                    <div className="text-xs text-gray-500">Authorization words</div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                <strong>MA Insight:</strong> These are the exact phrases and protocols 
                used in real medical offices. Know the system to work the system.
              </p>
            </div>
          </div>
        </div>

        {/* Health Tools Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Water Reminder */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4">
              <h3 className="text-xl font-bold mb-2">💧 Smart Hydration Tracker</h3>
              <p className="text-blue-100">
                Medical-grade hydration insights with drink type multipliers. 
                Your kidneys will thank you.
              </p>
            </div>
            <div className="p-6">
              <WaterReminder />
              <div className="mt-4 text-sm text-gray-600">
                <strong>Medical Insight:</strong> Even 2% dehydration impairs cognitive function. 
                This tracker includes drink effectiveness multipliers and streak tracking.
              </div>
            </div>
          </div>

          {/* Health Goal Tracker */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4">
              <h3 className="text-xl font-bold mb-2">🎯 Evidence-Based Goals</h3>
              <p className="text-orange-100">
                Health goals backed by actual research, not wellness industry BS. 
                Realistic, achievable, medically sound.
              </p>
            </div>
            <div className="p-6">
              <HealthGoalTracker />
              <div className="mt-4 text-sm text-gray-600">
                <strong>Holistic Approach:</strong> Pre-built goals based on medical literature 
                with progress tracking and achievement recognition.
              </div>
            </div>
          </div>
        </div>

        {/* Footer Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Level Up Your Health Knowledge?</h3>
            <p className="text-lg mb-6 text-purple-100">
              This is just the beginning. More medical education tools, admin navigation guides, 
              and evidence-based health features coming soon.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl mb-2">🔬</div>
                <div className="font-medium mb-1">Coming Soon: Lab Results Decoder</div>
                <div className="text-sm text-purple-200">Understand your bloodwork like a pro</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl mb-2">💊</div>
                <div className="font-medium mb-1">Coming Soon: Medication Interaction Checker</div>
                <div className="text-sm text-purple-200">Safety-first drug interaction alerts</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <div className="text-3xl mb-2">📋</div>
                <div className="font-medium mb-1">Coming Soon: Symptom Journal</div>
                <div className="text-sm text-purple-200">Track patterns your doctor actually wants to see</div>
              </div>
            </div>
            
            <div className="mt-8">
              <p className="text-purple-200 text-sm">
                Built with love by someone who's been there - from medical admin work to patient advocacy. 
                Your health journey deserves better tools.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalHub;

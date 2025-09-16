import React from 'react';
import { motion } from 'framer-motion';
import EnhancedVoiceNavigation from '../navigation/EnhancedVoiceNavigation';
import SmartReflectionPrompts from '../wellness/SmartReflectionPrompts';

interface EnhancedAppLayoutProps {
  children: React.ReactNode;
  showAllFeatures?: boolean;
}

const EnhancedAppLayout: React.FC<EnhancedAppLayoutProps> = ({ 
  children, 
  showAllFeatures = true 
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-green-50 to-blue-50">
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>

      {/* Enhanced Features Overlay */}
      {showAllFeatures && (
        <div className="relative">
          {/* Voice Navigation - Always available */}
          <EnhancedVoiceNavigation />
          
          {/* Smart Reflection Prompts - Context aware */}
          <SmartReflectionPrompts />
          
          {/* Transition Rituals would be rendered on specific pages */}
          {/* <TransitionRitualBuilder /> */}
        </div>
      )}

      {/* Privacy & Security Notice */}
      <div className="fixed bottom-2 left-2 z-30">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm rounded px-2 py-1"
        >
          🔒 Privacy-first design • Your data stays local
        </motion.div>
      </div>
    </div>
  );
};

export default EnhancedAppLayout;

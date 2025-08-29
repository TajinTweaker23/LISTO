import React, { useState } from 'react';
import TalaveraFeed from '../components/TalaveraFeed';
import VideoUploadStudio from '../components/VideoUploadStudio';
import { motion } from 'framer-motion';
import { Plus, Sidebar, X } from 'lucide-react';

export default function TalaveraPage() {
  const [showUploadStudio, setShowUploadStudio] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<'full' | 'sidebar' | 'hidden'>('full');

  const toggleSidebarMode = () => {
    setSidebarMode(prev => {
      if (prev === 'full') return 'sidebar';
      if (prev === 'sidebar') return 'hidden';
      return 'full';
    });
  };

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      {/* Main Content Area */}
      <div className={`transition-all duration-300 ${
        sidebarMode === 'full' ? 'w-full' : 
        sidebarMode === 'sidebar' ? 'w-3/4 ml-auto' : 'w-full'
      }`}>
        <TalaveraFeed />
      </div>

      {/* Video Sidebar - TikTok Style */}
      {sidebarMode === 'sidebar' && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="fixed left-0 top-0 w-1/4 h-full bg-gradient-to-b from-sage-900 to-warm-gray-900 z-40 border-r border-sage-600/30"
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-sage-600/30">
            <h3 className="text-white font-semibold text-lg">Video Feed</h3>
            <p className="text-sage-300 text-sm">Discover trending content</p>
          </div>

          {/* Mini Video Feed in Sidebar */}
          <div className="flex-1 overflow-y-auto scrollbar-hide">
            <div className="p-2 space-y-3">
              {/* Example sidebar video items - replace with actual feed */}
              {[1, 2, 3, 4, 5].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ scale: 1.02 }}
                  className="bg-warm-gray-800 rounded-xl p-3 cursor-pointer hover:bg-warm-gray-700 transition-colors"
                >
                  <div className="aspect-video bg-gradient-to-br from-sage-600 to-warm-gray-600 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-white text-xs">Preview {item}</span>
                  </div>
                  <p className="text-white text-sm font-medium">Sample Video {item}</p>
                  <p className="text-sage-300 text-xs">@username • 1.2K views</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="p-4 border-t border-sage-600/30">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUploadStudio(true)}
              className="w-full bg-gradient-to-r from-sage-600 to-sage-700 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:from-sage-500 hover:to-sage-600 transition-all"
            >
              <Plus className="h-5 w-5" />
              Create Video
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Mode Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleSidebarMode}
        className="fixed top-4 left-4 z-50 bg-warm-gray-800/80 backdrop-blur-sm text-white p-3 rounded-full hover:bg-warm-gray-700/80 transition-all"
      >
        {sidebarMode === 'sidebar' ? <X className="h-6 w-6" /> : <Sidebar className="h-6 w-6" />}
      </motion.button>

      {/* Upload Studio Modal */}
      {showUploadStudio && (
        <div className="fixed inset-0 z-50">
          <VideoUploadStudio 
            isOpen={true}
            onClose={() => setShowUploadStudio(false)} 
            onPublish={(videoData) => {
              console.log('Video published:', videoData);
              setShowUploadStudio(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { 
  Sparkles, 
  Heart, 
  Download, 
  Send, 
  Zap, 
  Star,
  Play,
  Pause,
  Save,
  Upload
} from 'lucide-react';

export default function AnimatedButtonShowcase() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleProgressDemo = () => {
    if (progress === 100) {
      setProgress(0);
      return;
    }
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 3000);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          ⚡ Animated Button Showcase
        </h1>
        <p className="text-lg text-purple-200">
          Your custom button component with all its amazing features!
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Glow Effects Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-6">✨ Glow Effects</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            <Button 
              variant="glow" 
              size="lg"
              className="text-xl px-8"
            >
              <Sparkles className="mr-2" />
              NEON GLOW
            </Button>
            
            <Button 
              variant="glow" 
              size="lg"
              className="text-xl px-8"
            >
              <Zap className="mr-2" />
              ELECTRIC
            </Button>
            
            <Button 
              variant="glow" 
              size="lg"
              className="text-xl px-8"
            >
              <Star className="mr-2" />
              STELLAR
            </Button>
          </div>
        </section>

        {/* Interactive Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-6">🎮 Interactive Buttons</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Play/Pause Button */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-white font-medium mb-4">Play/Pause Toggle</h3>
              <Button 
                onClick={() => setIsPlaying(!isPlaying)}
                leftIcon={isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                className="w-full"
              >
                {isPlaying ? 'Pause' : 'Play'} Music
              </Button>
            </div>

            {/* Progress Button */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-white font-medium mb-4">Progress Demo</h3>
              <Button 
                onClick={handleProgressDemo}
                progress={progress}
                className="w-full"
                leftIcon={<Download className="w-4 h-4" />}
              >
                {progress === 100 ? 'Complete!' : 'Download'} ({progress}%)
              </Button>
            </div>

            {/* Upload Button */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-white font-medium mb-4">Upload with Loading</h3>
              <Button 
                onClick={handleUpload}
                loading={uploading}
                loadingVariant="dots"
                className="w-full"
                leftIcon={!uploading ? <Upload className="w-4 h-4" /> : undefined}
              >
                {uploading ? 'Uploading...' : 'Upload File'}
              </Button>
            </div>
          </div>
        </section>

        {/* Loading Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-6">⏳ Loading States</h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            {/* Spinner */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-white font-medium mb-4">Spinner Loading</h3>
              <Button 
                loading={saving}
                loadingVariant="spinner"
                onClick={handleSave}
                className="w-full"
              >
                Save Changes
              </Button>
            </div>

            {/* Dots */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-white font-medium mb-4">Dots Loading</h3>
              <Button 
                loading={uploading}
                loadingVariant="dots"
                onClick={handleUpload}
                className="w-full"
              >
                Process Data
              </Button>
            </div>

            {/* Bars */}
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-white font-medium mb-4">Bars Loading</h3>
              <Button 
                loading={saving}
                loadingVariant="bars"
                onClick={handleSave}
                className="w-full"
              >
                Generate Report
              </Button>
            </div>
          </div>
        </section>

        {/* Button Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-6">🎨 Style Variants</h2>
          <div className="space-y-4">
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="default">
                Default Style
              </Button>
              <Button variant="outline">
                Outline Style
              </Button>
              <Button variant="ghost">
                Ghost Style
              </Button>
              <Button variant="danger">
                Danger Style
              </Button>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="sm" leftIcon={<Heart className="w-3 h-3" />}>
                Small
              </Button>
              <Button size="default" leftIcon={<Heart className="w-4 h-4" />}>
                Default
              </Button>
              <Button size="lg" leftIcon={<Heart className="w-5 h-5" />}>
                Large
              </Button>
            </div>
          </div>
        </section>

        {/* Ripple Effect Demo */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-6">💫 Ripple Effects</h2>
          <p className="text-purple-200 text-center mb-6">
            Click any button to see the beautiful ripple animation!
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="h-20 text-lg">
              Click Me!
            </Button>
            <Button variant="outline" className="h-20 text-lg">
              Ripple Test
            </Button>
            <Button variant="danger" className="h-20 text-lg">
              Red Ripple
            </Button>
            <Button variant="glow" className="h-20 text-lg">
              Glow Ripple
            </Button>
          </div>
        </section>

        {/* Code Example */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-6">💾 Usage Examples</h2>
          <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
            <div className="text-sm">
              <div className="mb-4">
                <h4 className="text-green-400 font-medium mb-2">Basic Glow Button:</h4>
                <code className="text-purple-300 bg-gray-900/50 px-3 py-1 rounded block">
                  &lt;Button variant="glow"&gt;GLOW BUTTON&lt;/Button&gt;
                </code>
              </div>
              
              <div className="mb-4">
                <h4 className="text-green-400 font-medium mb-2">With Loading State:</h4>
                <code className="text-purple-300 bg-gray-900/50 px-3 py-1 rounded block">
                  &lt;Button loading={'{isLoading}'} loadingVariant="spinner"&gt;Save Changes&lt;/Button&gt;
                </code>
              </div>
              
              <div className="mb-4">
                <h4 className="text-green-400 font-medium mb-2">With Progress Bar:</h4>
                <code className="text-purple-300 bg-gray-900/50 px-3 py-1 rounded block">
                  &lt;Button progress={'{uploadProgress}'}&gt;Upload ({'{uploadProgress}'}%)&lt;/Button&gt;
                </code>
              </div>
            </div>
          </div>
        </section>

        {/* Features List */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-white mb-6">🔥 Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-white font-medium mb-4">Animations</h3>
              <ul className="space-y-2 text-purple-200">
                <li>• Ripple effects on click</li>
                <li>• Hover scale animations</li>
                <li>• Glow border effects</li>
                <li>• Icon slide animations</li>
                <li>• Loading state transitions</li>
              </ul>
            </div>
            
            <div className="bg-black/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
              <h3 className="text-white font-medium mb-4">States & Variants</h3>
              <ul className="space-y-2 text-purple-200">
                <li>• Multiple loading variants</li>
                <li>• Progress bar support</li>
                <li>• Icon positioning</li>
                <li>• Size variations</li>
                <li>• Disabled states</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

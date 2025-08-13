import Link from 'next/link';
import { Button } from '../components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 to-sage-100 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-sage-600 to-brand-primary bg-clip-text text-transparent mb-4">
            LISTO
          </h1>
          <p className="text-xl text-sage-700 max-w-2xl mx-auto">
            Your comprehensive health & wellness companion - rebuilt and working!
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="/medical-hub" className="bg-white rounded-2xl p-6 shadow-lg border border-sage-200 hover:shadow-xl transition-shadow block group">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🏥</span>
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">Medical Hub</h3>
            <p className="text-sage-600">AI-powered health insights and disease prevention</p>
          </Link>

          <Link href="/wellness" className="bg-white rounded-2xl p-6 shadow-lg border border-sage-200 hover:shadow-xl transition-shadow block group">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">❤️</span>
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">Wellness Tracker</h3>
            <p className="text-sage-600">Holistic health monitoring and mood tracking</p>
          </Link>

          <Link href="/optimizer" className="bg-white rounded-2xl p-6 shadow-lg border border-sage-200 hover:shadow-xl transition-shadow block group">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">Life Optimizer</h3>
            <p className="text-sage-600">Smart productivity system and focus tools</p>
          </Link>

          <Link href="/vision-board" className="bg-white rounded-2xl p-6 shadow-lg border border-sage-200 hover:shadow-xl transition-shadow block group">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">💭</span>
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">Vision Board</h3>
            <p className="text-sage-600">Visualize and track your goals and dreams</p>
          </Link>

          <Link href="/dashboard" className="bg-white rounded-2xl p-6 shadow-lg border border-sage-200 hover:shadow-xl transition-shadow block group">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">Dashboard</h3>
            <p className="text-sage-600">Comprehensive overview of all your data</p>
          </Link>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-sage-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">✊</span>
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">Activism Hub</h3>
            <p className="text-sage-600">Stay informed and take action on important causes</p>
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-sage-900">Quick Navigation</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Button 
              onClick={() => window.location.href = '/test-styling'}
              variant="default"
              className="bg-brand-primary hover:bg-brand-dark"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              View Color Palette
            </Button>
            <Button 
              onClick={() => window.location.href = '/button-demo'}
              variant="outline"
              className="border-sage-600 text-sage-600 hover:bg-sage-50"
              rightIcon={<Sparkles className="w-4 h-4" />}
            >
              Button Showcase
            </Button>
            <Button 
              onClick={() => window.location.href = '/simple-test'}
              variant="ghost"
              className="text-accent-primary hover:bg-accent-primary/10"
            >
              Simple Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-sage-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🏥</span>
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">Medical Hub</h3>
            <p className="text-sage-600">AI-powered health insights and disease prevention</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-sage-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">❤️</span>
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">Wellness Tracker</h3>
            <p className="text-sage-600">Holistic health monitoring and mood tracking</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-sage-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">Life Optimizer</h3>
            <p className="text-sage-600">Smart productivity system and focus tools</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-sage-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💭</span>
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">Vision Board</h3>
            <p className="text-sage-600">Visualize and track your goals and dreams</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-sage-200 hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-sage-900 mb-2">Dashboard</h3>
            <p className="text-sage-600">Comprehensive overview of all your data</p>
          </div>

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
            <a href="/test-styling" className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark transition-colors">
              View Color Palette
            </a>
            <a href="/button-demo" className="px-4 py-2 bg-sage-600 text-white rounded-lg hover:bg-sage-700 transition-colors">
              Button Showcase
            </a>
            <a href="/simple-test" className="px-4 py-2 bg-accent-primary text-white rounded-lg hover:bg-accent-dark transition-colors">
              Simple Test
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

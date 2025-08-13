'use client';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-2xl mx-4">
        <div className="text-6xl mb-6">🎯</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to LISTO
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your Life Intelligence System & Task Optimizer
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="/login"
            className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            Get Started
          </a>
          <a 
            href="/medical-hub"
            className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
          >
            Explore Features
          </a>
        </div>
      </div>
    </div>
  );
}

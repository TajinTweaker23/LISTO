'use client';
import { useState } from 'react';
import {
  Smartphone,
  Tablet,
  Monitor,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Eye,
  Settings,
  Download
} from 'lucide-react';

interface DeviceMockup {
  id: string;
  name: string;
  icon: any;
  width: number;
  height: number;
  borderRadius: number;
  screenContent: string;
}

const devices: DeviceMockup[] = [
  {
    id: 'iphone',
    name: 'iPhone 15 Pro',
    icon: Smartphone,
    width: 393,
    height: 852,
    borderRadius: 55,
    screenContent: 'iPhone'
  },
  {
    id: 'ipad',
    name: 'iPad Pro 12.9"',
    icon: Tablet,
    width: 1024,
    height: 1366,
    borderRadius: 20,
    screenContent: 'iPad'
  },
  {
    id: 'desktop',
    name: 'Desktop (1920x1080)',
    icon: Monitor,
    width: 1920,
    height: 1080,
    borderRadius: 0,
    screenContent: 'Desktop'
  }
];

export default function InterfacePreviewPage() {
  const [selectedDevice, setSelectedDevice] = useState('iphone');
  const [zoom, setZoom] = useState(0.5);
  const [showGrid, setShowGrid] = useState(false);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');

  const currentDevice = devices.find(d => d.id === selectedDevice)!;

  const getScaledDimensions = () => {
    const scale = zoom;
    return {
      width: currentDevice.width * scale,
      height: currentDevice.height * scale,
      borderRadius: currentDevice.borderRadius * scale
    };
  };

  const mockupContent = {
    iPhone: (
      <div className="w-full h-full bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50 p-4 flex flex-col">
        {/* Status Bar */}
        <div className="flex justify-between items-center text-xs text-slate-600 mb-4">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2 bg-slate-400 rounded-sm"></div>
            <div className="w-4 h-2 bg-slate-400 rounded-sm"></div>
            <div className="w-4 h-2 bg-slate-400 rounded-sm"></div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-2 bg-slate-400 rounded-sm"></div>
            <span>100%</span>
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1 flex flex-col">
          <h1 className="text-2xl font-black mb-6 text-center">
            <span className="text-gradient-premium bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              LISTO
            </span>
          </h1>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-3">
                <span className="text-white font-bold">♥</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Wellness</h3>
              <p className="text-xs text-slate-600">Track mood & health</p>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center mb-3">
                <span className="text-white font-bold">🧳</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-2">Travel</h3>
              <p className="text-xs text-slate-600">Plan adventures</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 mb-4">
            <h3 className="font-bold text-slate-800 mb-3">Today's Focus</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-emerald-500 rounded-full"></div>
                <span className="text-sm text-slate-700">Morning meditation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-slate-700">Review goals</span>
              </div>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-around pt-4 border-t border-slate-200">
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-indigo-500 rounded mb-1"></div>
              <span className="text-xs text-indigo-600 font-medium">Home</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-slate-400 rounded mb-1"></div>
              <span className="text-xs text-slate-400">Explore</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-6 h-6 bg-slate-400 rounded mb-1"></div>
              <span className="text-xs text-slate-400">Profile</span>
            </div>
          </div>
        </div>

        {/* Home Indicator */}
        <div className="flex justify-center mt-2">
          <div className="w-32 h-1 bg-slate-400 rounded-full"></div>
        </div>
      </div>
    ),
    iPad: (
      <div className="w-full h-full bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50 p-8 flex flex-col">
        {/* Status Bar */}
        <div className="flex justify-between items-center text-sm text-slate-600 mb-6">
          <span>9:41</span>
          <div className="flex gap-2">
            <div className="w-6 h-3 bg-slate-400 rounded"></div>
            <div className="w-6 h-3 bg-slate-400 rounded"></div>
            <div className="w-6 h-3 bg-slate-400 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-3 bg-slate-400 rounded"></div>
            <span>100%</span>
          </div>
        </div>

        {/* App Content */}
        <div className="flex-1 flex">
          {/* Sidebar */}
          <div className="w-80 bg-white/90 backdrop-blur-sm rounded-2xl mr-6 p-6 shadow-lg border border-white/20">
            <h1 className="text-3xl font-black mb-8">
              <span className="text-gradient-premium bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                LISTO
              </span>
            </h1>

            <nav className="space-y-4">
              {[
                { name: 'Dashboard', active: true },
                { name: 'Wellness Hub', active: false },
                { name: 'Travel Hub', active: false },
                { name: 'Vision Board', active: false },
                { name: 'Bucket List', active: false },
                { name: 'Medical Hub', active: false }
              ].map((item) => (
                <div
                  key={item.name}
                  className={`p-3 rounded-xl cursor-pointer transition-colors ${
                    item.active
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {item.name}
                </div>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
            <h2 className="text-4xl font-bold text-slate-800 mb-8">Welcome to LISTO</h2>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">Wellness Hub</h3>
                <p className="mb-4">Track your mental health and daily wellness patterns.</p>
                <button className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                  Explore Wellness
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl p-6 text-white">
                <h3 className="text-2xl font-bold mb-4">Travel Hub</h3>
                <p className="mb-4">Plan your adventures with smart itinerary builders.</p>
                <button className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors">
                  Start Planning
                </button>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Today's Overview</h3>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">8</div>
                  <div className="text-slate-600">Tasks Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">2.5h</div>
                  <div className="text-slate-600">Focus Time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                  <div className="text-slate-600">Wellness Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    Desktop: (
      <div className="w-full h-full bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50 flex">
        {/* Sidebar */}
        <div className="w-80 bg-white/95 backdrop-blur-sm p-8 shadow-lg border-r border-white/20">
          <h1 className="text-4xl font-black mb-12">
            <span className="text-gradient-premium bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              LISTO
            </span>
          </h1>

          <nav className="space-y-6">
            {[
              { name: 'Dashboard', icon: '🏠', active: true },
              { name: 'Wellness Hub', icon: '💚', active: false },
              { name: 'Travel Hub', icon: '🧳', active: false },
              { name: 'Vision Board', icon: '✨', active: false },
              { name: 'Bucket List', icon: '🎯', active: false },
              { name: 'Medical Hub', icon: '🏥', active: false },
              { name: 'Settings', icon: '⚙️', active: false }
            ].map((item) => (
              <div
                key={item.name}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                  item.active
                    ? 'bg-indigo-100 text-indigo-700 shadow-md'
                    : 'text-slate-600 hover:bg-slate-100 hover:shadow-sm'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="absolute bottom-8 left-8 right-8">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-xl">👤</span>
                </div>
                <div>
                  <div className="font-semibold">Welcome back!</div>
                  <div className="text-sm opacity-90">Ready for another productive day?</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-5xl font-bold text-slate-800 mb-12">Your LISTO Dashboard</h2>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-8 mb-12">
              {[
                { label: 'Tasks Completed', value: '24', color: 'emerald' },
                { label: 'Focus Sessions', value: '8', color: 'blue' },
                { label: 'Wellness Score', value: '92%', color: 'purple' },
                { label: 'Goals Achieved', value: '12', color: 'orange' }
              ].map((stat) => (
                <div key={stat.label} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                  <div className={`text-4xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-3 gap-8 mb-12">
              {[
                { title: 'Wellness Hub', desc: 'Track mental health & mood', color: 'emerald' },
                { title: 'Travel Hub', desc: 'Plan adventures & itineraries', color: 'blue' },
                { title: 'Vision Board', desc: 'Visualize your goals', color: 'purple' },
                { title: 'Bucket List', desc: 'Life goals & achievements', color: 'orange' },
                { title: 'Medical Hub', desc: 'Health appointments & meds', color: 'indigo' },
                { title: 'Explore', desc: 'Discover new features', color: 'teal' }
              ].map((feature) => (
                <div key={feature.title} className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 hover:shadow-xl transition-all cursor-pointer group">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${feature.color}-400 to-${feature.color}-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <span className="text-white text-2xl">
                      {feature.color === 'emerald' ? '💚' :
                       feature.color === 'blue' ? '🧳' :
                       feature.color === 'purple' ? '✨' :
                       feature.color === 'orange' ? '🎯' :
                       feature.color === 'indigo' ? '🏥' : '🔍'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{feature.title}</h3>
                  <p className="text-slate-600 mb-6">{feature.desc}</p>
                  <button className={`text-${feature.color}-600 font-semibold hover:text-${feature.color}-700 transition-colors`}>
                    Explore →
                  </button>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { action: 'Completed morning meditation', time: '2 hours ago', type: 'wellness' },
                  { action: 'Added new travel destination', time: '4 hours ago', type: 'travel' },
                  { action: 'Updated vision board', time: '1 day ago', type: 'vision' },
                  { action: 'Achieved fitness goal', time: '2 days ago', type: 'fitness' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.type === 'wellness' ? 'bg-emerald-500' :
                      activity.type === 'travel' ? 'bg-blue-500' :
                      activity.type === 'vision' ? 'bg-purple-500' : 'bg-orange-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="font-medium text-slate-800">{activity.action}</div>
                      <div className="text-sm text-slate-600">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      <div className="p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4">
            <span className="text-gradient-premium bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Interface Preview
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Preview how LISTO looks and feels across different devices and screen sizes.
          </p>
        </div>

        {/* Device Selection */}
        <div className="flex justify-center gap-8 mb-12">
          {devices.map((device) => {
            const Icon = device.icon;
            return (
              <button
                key={device.id}
                onClick={() => setSelectedDevice(device.id)}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl transition-all ${
                  selectedDevice === device.id
                    ? 'bg-indigo-100 text-indigo-700 shadow-lg'
                    : 'bg-white text-slate-600 hover:bg-slate-50 shadow-md'
                }`}
              >
                <Icon className="w-8 h-8" />
                <span className="font-semibold">{device.name}</span>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md">
            <button
              onClick={() => setZoom(Math.max(0.2, zoom - 0.1))}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              title="Zoom out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>

            <span className="font-medium text-slate-700 min-w-16 text-center">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              title="Zoom in"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => setOrientation(orientation === 'portrait' ? 'landscape' : 'portrait')}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-md hover:bg-slate-50 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Rotate
          </button>

          <button
            onClick={() => setShowGrid(!showGrid)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl shadow-md transition-colors ${
              showGrid ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Eye className="w-5 h-5" />
            Grid
          </button>

          <button className="flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl shadow-md hover:bg-emerald-600 transition-colors">
            <Download className="w-5 h-5" />
            Export
          </button>
        </div>

        {/* Device Mockup */}
        <div className="flex justify-center">
          <div className="relative">
            {/* Device Frame */}
            <div
              className="bg-slate-800 rounded-3xl shadow-2xl border-8 border-slate-800 relative overflow-hidden"
              style={{
                width: getScaledDimensions().width + 32,
                height: getScaledDimensions().height + 32,
                borderRadius: getScaledDimensions().borderRadius + 16
              }}
            >
              {/* Screen */}
              <div
                className="bg-white overflow-hidden"
                style={{
                  width: getScaledDimensions().width,
                  height: getScaledDimensions().height,
                  margin: 16,
                  borderRadius: getScaledDimensions().borderRadius
                }}
              >
                {mockupContent[currentDevice.screenContent as keyof typeof mockupContent]}
              </div>

              {/* Grid Overlay */}
              {showGrid && (
                <div
                  className="absolute inset-4 pointer-events-none opacity-20"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #ef4444 1px, transparent 1px),
                      linear-gradient(to bottom, #ef4444 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                  }}
                />
              )}
            </div>

            {/* Device Label */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
              {currentDevice.name}
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="max-w-md mx-auto mt-16 bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-slate-800 mb-4 text-center">Device Specifications</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Screen Size:</span>
              <span className="font-medium">{currentDevice.width} × {currentDevice.height}px</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Aspect Ratio:</span>
              <span className="font-medium">{(currentDevice.width / currentDevice.height).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Current Zoom:</span>
              <span className="font-medium">{Math.round(zoom * 100)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Orientation:</span>
              <span className="font-medium capitalize">{orientation}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
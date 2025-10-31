'use client';

import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Moon, Sun, Bell, Lock, User } from 'lucide-react';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Settings</h1>
        <p className="text-slate-600 mb-8">Customize your LISTO experience</p>

        {/* General Settings */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <User className="w-6 h-6" />
            General Settings
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                {darkMode ? <Moon className="w-5 h-5 text-slate-600" /> : <Sun className="w-5 h-5 text-yellow-500" />}
                <div>
                  <p className="font-semibold text-slate-800">Dark Mode</p>
                  <p className="text-sm text-slate-500">Toggle dark/light theme</p>
                </div>
              </div>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`relative w-12 h-6 rounded-full transition ${
                  darkMode ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    darkMode ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-semibold text-slate-800">Notifications</p>
                  <p className="text-sm text-slate-500">Get reminders and updates</p>
                </div>
              </div>
              <button
                onClick={() => setNotifications(!notifications)}
                className={`relative w-12 h-6 rounded-full transition ${
                  notifications ? 'bg-emerald-500' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    notifications ? 'translate-x-6' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Privacy & Security
          </h2>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Change Password
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Privacy Policy
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Terms of Service
            </Button>
            <Button variant="danger" className="w-full justify-start">
              Delete Account
            </Button>
          </div>
        </div>

        {/* Theme Colors */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Theme Colors</h2>
          
          <div className="grid grid-cols-4 gap-3">
            {[
              { name: 'Purple', color: '#8b5cf6' },
              { name: 'Green', color: '#10b981' },
              { name: 'Blue', color: '#3b82f6' },
              { name: 'Red', color: '#ef4444' },
              { name: 'Orange', color: '#f59e0b' },
              { name: 'Pink', color: '#ec4899' },
              { name: 'Cyan', color: '#06b6d4' },
              { name: 'Amber', color: '#f59e0b' },
            ].map(theme => (
              <button
                key={theme.name}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-slate-50 transition"
              >
                <div
                  className="w-12 h-12 rounded-lg"
                  style={{ backgroundColor: theme.color }}
                />
                <span className="text-sm text-slate-600">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
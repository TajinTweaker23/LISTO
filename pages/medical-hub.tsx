"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Activity, Calendar, User, Settings, Bell } from "lucide-react";

export default function MedicalHub() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-emerald-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-sage-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <Heart className="h-8 w-8 text-sage-600" />
                <h1 className="text-xl font-bold text-sage-900">Medical Hub</h1>
              </motion.div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Bell className="h-5 w-5 text-sage-600 hover:text-sage-800 cursor-pointer" />
              <Settings className="h-5 w-5 text-sage-600 hover:text-sage-800 cursor-pointer" />
              <div className="w-8 h-8 bg-sage-200 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-sage-700" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex space-x-1 bg-white/50 backdrop-blur-sm p-1 rounded-lg">
          {[
            { id: "overview", label: "Overview", icon: Activity },
            { id: "appointments", label: "Appointments", icon: Calendar },
            { id: "medications", label: "Medications", icon: Heart },
            { id: "records", label: "Records", icon: User }
          ].map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-sage-600 text-white shadow-md"
                  : "text-sage-600 hover:bg-sage-100"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Health Metrics Cards */}
              <motion.div 
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sage-100"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sage-900">Heart Rate</h3>
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
                <div className="text-2xl font-bold text-sage-800">72 BPM</div>
                <div className="text-sm text-sage-600">Normal range</div>
              </motion.div>

              <motion.div 
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sage-100"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sage-900">Blood Pressure</h3>
                  <Activity className="h-5 w-5 text-blue-500" />
                </div>
                <div className="text-2xl font-bold text-sage-800">120/80</div>
                <div className="text-sm text-sage-600">Optimal</div>
              </motion.div>

              <motion.div 
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sage-100"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-sage-900">Next Appointment</h3>
                  <Calendar className="h-5 w-5 text-purple-500" />
                </div>
                <div className="text-lg font-bold text-sage-800">Aug 15, 2025</div>
                <div className="text-sm text-sage-600">Dr. Smith - Checkup</div>
              </motion.div>
            </div>
          )}

          {activeTab === "appointments" && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sage-100">
              <h3 className="text-lg font-semibold text-sage-900 mb-4">Upcoming Appointments</h3>
              <div className="space-y-4">
                {[
                  { date: "Aug 15, 2025", doctor: "Dr. Smith", type: "Annual Checkup" },
                  { date: "Aug 22, 2025", doctor: "Dr. Johnson", type: "Specialist Consultation" },
                  { date: "Sep 1, 2025", doctor: "Dr. Brown", type: "Follow-up" }
                ].map((apt) => (
                  <motion.div
                    key={`${apt.date}-${apt.doctor}`}
                    className="flex items-center justify-between p-4 bg-sage-50 rounded-lg border border-sage-100"
                    whileHover={{ backgroundColor: "rgba(147, 197, 114, 0.1)" }}
                  >
                    <div>
                      <div className="font-medium text-sage-900">{apt.type}</div>
                      <div className="text-sm text-sage-600">{apt.doctor}</div>
                    </div>
                    <div className="text-sm text-sage-700">{apt.date}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "medications" && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sage-100">
              <h3 className="text-lg font-semibold text-sage-900 mb-4">Current Medications</h3>
              <div className="space-y-4">
                {[
                  { name: "Vitamin D3", dosage: "1000 IU", frequency: "Daily" },
                  { name: "Omega-3", dosage: "1000mg", frequency: "Twice daily" },
                  { name: "Multivitamin", dosage: "1 tablet", frequency: "Daily" }
                ].map((med) => (
                  <motion.div
                    key={med.name}
                    className="flex items-center justify-between p-4 bg-sage-50 rounded-lg border border-sage-100"
                    whileHover={{ backgroundColor: "rgba(147, 197, 114, 0.1)" }}
                  >
                    <div>
                      <div className="font-medium text-sage-900">{med.name}</div>
                      <div className="text-sm text-sage-600">{med.dosage}</div>
                    </div>
                    <div className="text-sm text-sage-700">{med.frequency}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "records" && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-sage-100">
              <h3 className="text-lg font-semibold text-sage-900 mb-4">Medical Records</h3>
              <div className="text-sage-600">
                <p>Your medical records and history will be displayed here.</p>
                <p className="mt-2">This section is currently being developed.</p>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  Plane,
  MapPin,
  Calendar,
  DollarSign,
  CheckSquare,
  Plus,
  ArrowRight,
  Clock,
  Users,
  Camera
} from 'lucide-react';

export default function TravelPage() {
  const [activeTab, setActiveTab] = useState('itinerary');

  const tabs = [
    { id: 'itinerary', label: 'Itinerary Builder', icon: Calendar },
    { id: 'packing', label: 'Packing Lists', icon: CheckSquare },
    { id: 'expenses', label: 'Expense Tracker', icon: DollarSign },
    { id: 'photos', label: 'Travel Photos', icon: Camera }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4">
            <span className="text-gradient-premium bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Travel Hub
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Plan your adventures with neurodivergent-friendly tools designed for seamless travel experiences.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg'
                    : 'bg-white/80 text-slate-700 hover:bg-white shadow-md'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'itinerary' && <ItineraryBuilder />}
          {activeTab === 'packing' && <PackingLists />}
          {activeTab === 'expenses' && <ExpenseTracker />}
          {activeTab === 'photos' && <TravelPhotos />}
        </div>
      </div>
    </div>
  );
}

function ItineraryBuilder() {
  const [trips, setTrips] = useState([
    {
      id: 1,
      name: 'Mexico City Adventure',
      dates: 'Dec 15-22, 2025',
      destinations: ['Mexico City', 'Teotihuacan', 'Xochimilco'],
      activities: [
        { day: 1, time: '10:00', activity: 'Arrive and check into hotel', location: 'Mexico City' },
        { day: 1, time: '14:00', activity: 'Visit Zócalo', location: 'Centro Histórico' },
        { day: 2, time: '09:00', activity: 'Pyramids of Teotihuacan', location: 'Teotihuacan' }
      ]
    }
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Your Itineraries</h2>
        <button className="btn-premium bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-600 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New Trip
        </button>
      </div>

      <div className="grid gap-6">
        {trips.map((trip) => (
          <div key={trip.id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{trip.name}</h3>
                <div className="flex items-center gap-4 text-slate-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {trip.dates}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {trip.destinations.length} destinations
                  </div>
                </div>
              </div>
              <button className="btn-premium btn-indigo">
                Edit Trip <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            <div className="space-y-3">
              {trip.activities.slice(0, 3).map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-2 text-slate-600 min-w-0">
                    <span className="font-medium">Day {activity.day}</span>
                    <Clock className="w-4 h-4" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-800">{activity.activity}</p>
                    <p className="text-sm text-slate-600">{activity.location}</p>
                  </div>
                </div>
              ))}
              {trip.activities.length > 3 && (
                <p className="text-slate-500 text-sm">+{trip.activities.length - 3} more activities</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PackingLists() {
  const [lists, setLists] = useState([
    {
      id: 1,
      name: 'Mexico City Essentials',
      category: 'Clothing',
      items: [
        { name: 'Light jacket', packed: true },
        { name: 'Comfortable walking shoes', packed: false },
        { name: 'Sunscreen', packed: true }
      ]
    }
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Packing Lists</h2>
        <button className="btn-premium bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          New List
        </button>
      </div>

      <div className="grid gap-6">
        {lists.map((list) => (
          <div key={list.id} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{list.name}</h3>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                  {list.category}
                </span>
              </div>
              <button className="btn-premium btn-emerald">
                Edit List <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            <div className="space-y-3">
              {list.items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={item.packed}
                    className="w-5 h-5 text-emerald-500 rounded focus:ring-emerald-500"
                  />
                  <span className={`flex-1 ${item.packed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Flight to Mexico City', amount: 450, category: 'Transportation', date: '2025-12-15' },
    { id: 2, description: 'Hotel - 5 nights', amount: 750, category: 'Accommodation', date: '2025-12-15' },
    { id: 3, description: 'Museum tickets', amount: 25, category: 'Activities', date: '2025-12-16' }
  ]);

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Expense Tracker</h2>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-sm text-slate-600">Total Spent</p>
            <p className="text-2xl font-bold text-slate-800">${total}</p>
          </div>
          <button className="btn-premium bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add Expense
          </button>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800">{expense.description}</h4>
                <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                  <span>{expense.category}</span>
                  <span>{expense.date}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-slate-800">${expense.amount}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TravelPhotos() {
  const [photos, setPhotos] = useState([
    { id: 1, url: '/Sightseeing.jpg', caption: 'Beautiful view from Chapultepec Castle', location: 'Mexico City' },
    { id: 2, url: '/Dinner inspo.jpg', caption: 'Traditional Mexican cuisine', location: 'Centro Histórico' }
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-800">Travel Photos</h2>
        <button className="btn-premium bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Upload Photos
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <div key={photo.id} className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20">
            <img src={photo.url} alt={photo.caption} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h4 className="font-semibold text-slate-800 mb-2">{photo.caption}</h4>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{photo.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
'use client';
import { useState } from 'react';
import Link from 'next/link';
import {
  CheckSquare,
  Plus,
  Star,
  MapPin,
  Calendar,
  DollarSign,
  Camera,
  Upload,
  Link as LinkIcon,
  X,
  ArrowRight
} from 'lucide-react';

interface BucketListItem {
  id: string;
  title: string;
  description: string;
  category: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  location?: string;
  cost?: number;
  images: string[];
  links: string[];
}

export default function BucketListPage() {
  const [items, setItems] = useState<BucketListItem[]>([
    {
      id: '1',
      title: 'Visit Machu Picchu',
      description: 'Explore the ancient Incan citadel in Peru',
      category: 'Travel',
      completed: false,
      priority: 'high',
      location: 'Peru',
      cost: 1500,
      images: ['/Sightseeing.jpg'],
      links: ['https://en.wikipedia.org/wiki/Machu_Picchu']
    },
    {
      id: '2',
      title: 'Learn Spanish',
      description: 'Become fluent in Spanish through immersion',
      category: 'Education',
      completed: false,
      priority: 'medium',
      dueDate: '2026-12-31',
      images: [],
      links: ['https://www.duolingo.com']
    },
    {
      id: '3',
      title: 'Run a Marathon',
      description: 'Complete a full 42km marathon',
      category: 'Fitness',
      completed: true,
      priority: 'high',
      images: ['/Work Coffee.jpg'],
      links: []
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState<Partial<BucketListItem>>({
    title: '',
    description: '',
    category: 'Travel',
    priority: 'medium',
    images: [],
    links: []
  });

  const categories = ['Travel', 'Education', 'Fitness', 'Career', 'Personal', 'Adventure', 'Culture'];

  const toggleComplete = (id: string) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const addItem = () => {
    if (newItem.title) {
      const item: BucketListItem = {
        id: Date.now().toString(),
        title: newItem.title,
        description: newItem.description || '',
        category: newItem.category || 'Travel',
        completed: false,
        priority: newItem.priority as 'low' | 'medium' | 'high' || 'medium',
        dueDate: newItem.dueDate,
        location: newItem.location,
        cost: newItem.cost,
        images: newItem.images || [],
        links: newItem.links || []
      };
      setItems([...items, item]);
      setNewItem({ title: '', description: '', category: 'Travel', priority: 'medium', images: [], links: [] });
      setShowAddModal(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-50';
      case 'medium': return 'text-orange-500 bg-orange-50';
      case 'low': return 'text-green-500 bg-green-50';
      default: return 'text-slate-500 bg-slate-50';
    }
  };

  const completedCount = items.filter(item => item.completed).length;
  const totalCount = items.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black mb-4">
            <span className="text-gradient-premium bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Bucket List
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
            Your personal collection of dreams, goals, and adventures waiting to be achieved.
          </p>

          {/* Progress Stats */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600">{completedCount}</div>
              <div className="text-slate-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-indigo-600">{totalCount - completedCount}</div>
              <div className="text-slate-600">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{Math.round((completedCount / totalCount) * 100)}%</div>
              <div className="text-slate-600">Progress</div>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn-premium bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:from-indigo-600 hover:to-blue-600 transition-all flex items-center gap-3 mx-auto"
          >
            <Plus className="w-6 h-6" />
            Add New Goal
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {['All', ...categories].map((category) => (
            <button
              key={category}
              className="px-6 py-3 rounded-full font-semibold transition-all bg-white/80 text-slate-700 hover:bg-white shadow-md"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Bucket List Items */}
        <div className="grid gap-6 max-w-4xl mx-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className={`bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all hover:shadow-xl ${
                item.completed ? 'opacity-75' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <button
                  onClick={() => toggleComplete(item.id)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    item.completed
                      ? 'bg-emerald-500 border-emerald-500 text-white'
                      : 'border-slate-300 hover:border-emerald-400'
                  }`}
                >
                  {item.completed && <CheckSquare className="w-5 h-5" />}
                </button>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className={`text-xl font-bold mb-2 ${item.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                        {item.title}
                      </h3>
                      <p className={`text-slate-600 mb-4 ${item.completed ? 'line-through' : ''}`}>
                        {item.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(item.priority)}`}>
                        {item.priority}
                      </span>
                      <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="flex flex-wrap gap-4 mb-4 text-sm text-slate-600">
                    {item.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {item.location}
                      </div>
                    )}
                    {item.dueDate && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {item.dueDate}
                      </div>
                    )}
                    {item.cost && (
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        ${item.cost}
                      </div>
                    )}
                  </div>

                  {/* Images and Links */}
                  <div className="flex gap-4">
                    {item.images.length > 0 && (
                      <div className="flex gap-2">
                        {item.images.slice(0, 3).map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Image ${index + 1}`}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                        ))}
                        {item.images.length > 3 && (
                          <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 font-medium">
                            +{item.images.length - 3}
                          </div>
                        )}
                      </div>
                    )}

                    {item.links.length > 0 && (
                      <div className="flex gap-2">
                        {item.links.slice(0, 2).map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-sm"
                          >
                            <LinkIcon className="w-4 h-4" />
                            Link {index + 1}
                          </a>
                        ))}
                        {item.links.length > 2 && (
                          <div className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                            +{item.links.length - 2} more
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-800">Add New Goal</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title *</label>
                  <input
                    type="text"
                    value={newItem.title || ''}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="What do you want to achieve?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <textarea
                    value={newItem.description || ''}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 h-24 resize-none"
                    placeholder="Add more details..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                    <select
                      value={newItem.category || 'Travel'}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
                    <select
                      value={newItem.priority || 'medium'}
                      onChange={(e) => setNewItem({ ...newItem, priority: e.target.value as 'low' | 'medium' | 'high' })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={newItem.location || ''}
                      onChange={(e) => setNewItem({ ...newItem, location: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Where?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Cost</label>
                    <input
                      type="number"
                      value={newItem.cost || ''}
                      onChange={(e) => setNewItem({ ...newItem, cost: parseFloat(e.target.value) || undefined })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="$"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={newItem.dueDate || ''}
                    onChange={(e) => setNewItem({ ...newItem, dueDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  onClick={addItem}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add Goal
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
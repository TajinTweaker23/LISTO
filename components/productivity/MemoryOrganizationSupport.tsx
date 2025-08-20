import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  BookOpen, 
  Pin, 
  Search, 
  Plus,
  X,
  Bell,
  FileText,
  Bookmark,
  Lightbulb,
  Target,
  Eye
} from 'lucide-react';

interface MemoryItem {
  id: string;
  title: string;
  content: string;
  type: 'note' | 'reminder' | 'reference' | 'snippet' | 'idea' | 'instruction';
  tags: string[];
  category: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: Date;
  updatedAt: Date;
  accessCount: number;
  lastAccessed?: Date;
  location?: string;
  context?: string;
  relatedItems: string[]; // IDs of related items
  attachments: MemoryAttachment[];
  reminders: MemoryReminder[];
  archived: boolean;
  pinned: boolean;
  color?: string;
}

interface MemoryAttachment {
  id: string;
  type: 'image' | 'file' | 'link' | 'audio';
  name: string;
  url: string;
  description?: string;
}

interface MemoryReminder {
  id: string;
  datetime: Date;
  type: 'time' | 'location' | 'context';
  triggered: boolean;
  recurring?: 'daily' | 'weekly' | 'monthly';
}

interface OrganizationPattern {
  preferredCategories: string[];
  tagUsage: { [tag: string]: number };
  accessPatterns: { [hour: number]: number };
  searchTerms: string[];
  forgettingCurve: { [itemId: string]: number }; // time until likely forgotten
  associationStrength: { [itemPair: string]: number };
}

interface CognitiveAssist {
  workingMemorySupport: boolean;
  spaceRepetition: boolean;
  contextualReminders: boolean;
  visualOrganization: boolean;
  speechToText: boolean;
  aiSuggestions: boolean;
}

const MemoryOrganizationSupport: React.FC = () => {
  const [memoryItems, setMemoryItems] = useState<MemoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MemoryItem[]>([]);
  const [organizationPattern, setOrganizationPattern] = useState<OrganizationPattern | null>(null);
  const [cognitiveAssist, setCognitiveAssist] = useState<CognitiveAssist>({
    workingMemorySupport: true,
    spaceRepetition: true,
    contextualReminders: true,
    visualOrganization: true,
    speechToText: false,
    aiSuggestions: true
  });

  const [activeView, setActiveView] = useState<'grid' | 'list' | 'timeline'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'frequent' | 'alphabetical' | 'priority'>('recent');
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<MemoryItem>>({
    title: '',
    content: '',
    type: 'note',
    tags: [],
    category: 'general',
    priority: 'medium',
    color: '#3B82F6'
  });

  useEffect(() => {
    loadMemoryItems();
    loadOrganizationPattern();
  }, []);

  useEffect(() => {
    filterAndSortItems();
  }, [memoryItems, searchQuery, selectedTags, selectedCategory, sortBy]);

  const loadMemoryItems = () => {
    const saved = JSON.parse(localStorage.getItem('memory-items') || '[]');
    const items = saved.map((item: any) => ({
      ...item,
      createdAt: new Date(item.createdAt),
      updatedAt: new Date(item.updatedAt),
      lastAccessed: item.lastAccessed ? new Date(item.lastAccessed) : undefined,
      reminders: item.reminders?.map((r: any) => ({
        ...r,
        datetime: new Date(r.datetime)
      })) || []
    }));
    setMemoryItems(items);
  };

  const loadOrganizationPattern = () => {
    const saved = JSON.parse(localStorage.getItem('organization-pattern') || 'null');
    if (saved) {
      setOrganizationPattern(saved);
    } else {
      const defaultPattern: OrganizationPattern = {
        preferredCategories: ['general', 'work', 'personal', 'learning'],
        tagUsage: {},
        accessPatterns: {},
        searchTerms: [],
        forgettingCurve: {},
        associationStrength: {}
      };
      setOrganizationPattern(defaultPattern);
    }
  };

  const loadCognitiveSettings = () => {
    const saved = JSON.parse(localStorage.getItem('cognitive-assist') || 'null');
    if (saved) {
      setCognitiveAssist(saved);
    }
  };

  const filterAndSortItems = useCallback(() => {
    let filtered = memoryItems.filter(item => {
      if (item.archived && activeView !== 'timeline') return false;
      
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesContent = item.content.toLowerCase().includes(query);
        const matchesTags = item.tags.some(tag => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesContent && !matchesTags) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;

      // Tags filter
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every(tag => item.tags.includes(tag));
        if (!hasAllTags) return false;
      }

      return true;
    });

    // Sort items
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'frequent':
          return b.accessCount - a.accessCount;
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'priority': {
          const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        }
        default:
          return 0;
      }
    });

    // Pinned items always on top
    const pinned = filtered.filter(item => item.pinned);
    const unpinned = filtered.filter(item => !item.pinned);
    
    setFilteredItems([...pinned, ...unpinned]);
  }, [memoryItems, searchQuery, selectedTags, selectedCategory, sortBy, activeView]);

  const saveMemoryItems = (items: MemoryItem[]) => {
    localStorage.setItem('memory-items', JSON.stringify(items));
    setMemoryItems(items);
  };

  const addMemoryItem = () => {
    if (!newItem.title) return;

    const item: MemoryItem = {
      id: `memory-${Date.now()}`,
      title: newItem.title,
      content: newItem.content || '',
      type: newItem.type || 'note',
      tags: newItem.tags || [],
      category: newItem.category || 'general',
      priority: newItem.priority || 'medium',
      createdAt: new Date(),
      updatedAt: new Date(),
      accessCount: 0,
      relatedItems: [],
      attachments: [],
      reminders: [],
      archived: false,
      pinned: false,
      color: newItem.color
    };

    const updated = [...memoryItems, item];
    saveMemoryItems(updated);
    updateOrganizationPattern(item);

    // Reset form
    setNewItem({
      title: '',
      content: '',
      type: 'note',
      tags: [],
      category: 'general',
      priority: 'medium',
      color: '#3B82F6'
    });
    setShowNewItemForm(false);
  };

  const updateMemoryItem = (id: string, updates: Partial<MemoryItem>) => {
    const updated = memoryItems.map(item => 
      item.id === id 
        ? { ...item, ...updates, updatedAt: new Date() }
        : item
    );
    saveMemoryItems(updated);
  };

  const deleteMemoryItem = (id: string) => {
    const updated = memoryItems.filter(item => item.id !== id);
    saveMemoryItems(updated);
  };

  const accessMemoryItem = (id: string) => {
    const item = memoryItems.find(i => i.id === id);
    if (!item) return;

    updateMemoryItem(id, {
      accessCount: item.accessCount + 1,
      lastAccessed: new Date()
    });

    updateAccessPattern();
  };

  const updateOrganizationPattern = (item: MemoryItem) => {
    if (!organizationPattern) return;

    const updated = { ...organizationPattern };
    
    // Update tag usage
    item.tags.forEach(tag => {
      updated.tagUsage[tag] = (updated.tagUsage[tag] || 0) + 1;
    });

    // Update category preferences
    if (!updated.preferredCategories.includes(item.category)) {
      updated.preferredCategories.push(item.category);
    }

    setOrganizationPattern(updated);
    localStorage.setItem('organization-pattern', JSON.stringify(updated));
  };

  const updateAccessPattern = () => {
    if (!organizationPattern) return;

    const hour = new Date().getHours();
    const updated = { ...organizationPattern };
    updated.accessPatterns[hour] = (updated.accessPatterns[hour] || 0) + 1;

    setOrganizationPattern(updated);
    localStorage.setItem('organization-pattern', JSON.stringify(updated));
  };

  const suggestRelatedItems = (itemId: string): MemoryItem[] => {
    const item = memoryItems.find(i => i.id === itemId);
    if (!item) return [];

    return memoryItems
      .filter(i => i.id !== itemId)
      .map(i => {
        let score = 0;
        
        // Tag similarity
        const commonTags = item.tags.filter(tag => i.tags.includes(tag));
        score += commonTags.length * 3;

        // Category match
        if (item.category === i.category) score += 2;

        // Content similarity (simple word matching)
        const itemWords = item.content.toLowerCase().split(/\s+/);
        const iWords = i.content.toLowerCase().split(/\s+/);
        const commonWords = itemWords.filter(word => 
          word.length > 3 && iWords.includes(word)
        );
        score += commonWords.length;

        return { item: i, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ item }) => item);
  };

  const addTag = (tag: string) => {
    if (!tag.trim() || newItem.tags?.includes(tag)) return;
    setNewItem(prev => ({
      ...prev,
      tags: [...(prev.tags || []), tag.trim()]
    }));
  };

  const removeTag = (tagToRemove: string) => {
    setNewItem(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const getAllTags = (): string[] => {
    const allTags = new Set<string>();
    memoryItems.forEach(item => {
      item.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  };

  const getAllCategories = (): string[] => {
    const categories = new Set<string>();
    memoryItems.forEach(item => categories.add(item.category));
    return Array.from(categories).sort();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'note': return BookOpen;
      case 'reminder': return Bell;
      case 'reference': return Bookmark;
      case 'snippet': return FileText;
      case 'idea': return Lightbulb;
      case 'instruction': return Target;
      default: return FileText;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Memory & Organization</h1>
              <p className="text-gray-600">AI-powered external memory system for neurodivergent minds</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowNewItemForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Memory
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/70 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">{memoryItems.length}</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="text-2xl font-bold text-purple-600">{getAllTags().length}</div>
            <div className="text-sm text-gray-600">Unique Tags</div>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">
              {memoryItems.filter(i => i.accessCount > 0).length}
            </div>
            <div className="text-sm text-gray-600">Accessed</div>
          </div>
          <div className="bg-white/70 rounded-lg p-3">
            <div className="text-2xl font-bold text-orange-600">
              {memoryItems.filter(i => i.pinned).length}
            </div>
            <div className="text-sm text-gray-600">Pinned</div>
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 shadow-lg">
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {/* Search */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search memories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Filter by category"
          >
            <option value="all">All Categories</option>
            {getAllCategories().map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Sort items"
          >
            <option value="recent">Most Recent</option>
            <option value="frequent">Most Accessed</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="priority">Priority</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            {(['grid', 'list', 'timeline'] as const).map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  activeView === view
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tag Filter */}
        {getAllTags().length > 0 && (
          <div className="flex flex-wrap gap-2">
            {getAllTags().slice(0, 10).map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTags(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Memory Items Display */}
      <AnimatePresence mode="wait">
        {activeView === 'grid' && (
          <motion.div
            key="grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item) => {
              const IconComponent = getTypeIcon(item.type);
              return (
                <motion.div
                  key={item.id}
                  layout
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl p-4 shadow-lg border-l-4 cursor-pointer"
                  style={{ borderLeftColor: item.color || '#3B82F6' }}
                  onClick={() => accessMemoryItem(item.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <IconComponent className="w-5 h-5 text-gray-600" />
                      <h3 className="font-semibold text-gray-800 truncate">{item.title}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      {item.pinned && <Pin className="w-4 h-4 text-orange-500" />}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          updateMemoryItem(item.id, { pinned: !item.pinned });
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        aria-label={`${item.pinned ? 'Unpin' : 'Pin'} item`}
                      >
                        <Pin className={`w-4 h-4 ${item.pinned ? 'text-orange-500' : ''}`} />
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{item.content}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          #{tag}
                        </span>
                      ))}
                      {item.tags.length > 3 && (
                        <span className="text-xs text-gray-400">+{item.tags.length - 3}</span>
                      )}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs border ${getPriorityColor(item.priority)}`}>
                      {item.priority}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-500">
                      {item.updatedAt.toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Eye className="w-3 h-3" />
                      {item.accessCount}
                    </div>
                  </div>
                </motion.div>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="col-span-full text-center py-12">
                <Brain className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">No memories found</h3>
                <p className="text-gray-400 mb-4">
                  {memoryItems.length === 0 
                    ? "Start building your external memory system" 
                    : "Try adjusting your search or filters"
                  }
                </p>
                <button
                  onClick={() => setShowNewItemForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Your First Memory
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* New Item Form Modal */}
      <AnimatePresence>
        {showNewItemForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowNewItemForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">Add New Memory</h3>
                <button
                  onClick={() => setShowNewItemForm(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  aria-label="Close form"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label htmlFor="memory-title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    id="memory-title"
                    type="text"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What do you want to remember?"
                  />
                </div>

                <div>
                  <label htmlFor="memory-content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                  <textarea
                    id="memory-content"
                    value={newItem.content}
                    onChange={(e) => setNewItem({ ...newItem, content: e.target.value })}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    placeholder="Detailed information, instructions, or notes..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="memory-type" className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      id="memory-type"
                      value={newItem.type}
                      onChange={(e) => setNewItem({ ...newItem, type: e.target.value as any })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="note">Note</option>
                      <option value="reminder">Reminder</option>
                      <option value="reference">Reference</option>
                      <option value="snippet">Snippet</option>
                      <option value="idea">Idea</option>
                      <option value="instruction">Instruction</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="memory-category" className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <input
                      id="memory-category"
                      type="text"
                      value={newItem.category}
                      onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., work, personal, learning"
                    />
                  </div>

                  <div>
                    <label htmlFor="memory-priority" className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <select
                      id="memory-priority"
                      value={newItem.priority}
                      onChange={(e) => setNewItem({ ...newItem, priority: e.target.value as any })}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                </div>

                {/* Tags Input */}
                <div>
                  <label htmlFor="memory-tags" className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newItem.tags?.map(tag => (
                      <span key={tag} className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        #{tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="text-blue-500 hover:text-blue-700"
                          aria-label={`Remove tag ${tag}`}
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add tags (press Enter)"
                    className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = e.currentTarget.value.trim();
                        if (value) {
                          addTag(value);
                          e.currentTarget.value = '';
                        }
                      }
                    }}
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    onClick={() => setShowNewItemForm(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addMemoryItem}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    disabled={!newItem.title}
                  >
                    Save Memory
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MemoryOrganizationSupport;

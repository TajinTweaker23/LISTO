'use client';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  MapPin,
  Navigation,
  Search,
  Plus,
  Star,
  Clock,
  DollarSign,
  Camera,
  Heart,
  X
} from 'lucide-react';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  id: string;
  name: string;
  position: LatLngExpression;
  type: 'attraction' | 'restaurant' | 'hotel' | 'activity' | 'custom';
  description?: string;
  rating?: number;
  price?: string;
  image?: string;
  visited?: boolean;
  favorite?: boolean;
}

const sampleLocations: Location[] = [
  {
    id: '1',
    name: 'Zócalo',
    position: [19.4326, -99.1332] as LatLngExpression,
    type: 'attraction',
    description: 'Main square of Mexico City',
    rating: 4.5,
    visited: false,
    favorite: true
  },
  {
    id: '2',
    name: 'Museo Frida Kahlo',
    position: [19.3553, -99.1626] as LatLngExpression,
    type: 'attraction',
    description: 'Casa Azul - Frida Kahlo Museum',
    rating: 4.7,
    visited: true,
    favorite: true
  },
  {
    id: '3',
    name: 'Pujol',
    position: [19.4254, -99.1635] as LatLngExpression,
    type: 'restaurant',
    description: 'World-renowned Mexican cuisine',
    rating: 4.9,
    price: '$$$$',
    visited: false
  },
  {
    id: '4',
    name: 'Zocalo Central Hotel',
    position: [19.4319, -99.1329] as LatLngExpression,
    type: 'hotel',
    description: 'Boutique hotel in historic center',
    rating: 4.3,
    price: '$$$'
  }
];

function MapController({ center }: { center: LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

export default function EnhancedMapPage() {
  const [locations, setLocations] = useState<Location[]>(sampleLocations);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [mapCenter, setMapCenter] = useState<LatLngExpression>([19.4326, -99.1332]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAddLocation, setShowAddLocation] = useState(false);

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         location.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === 'all' || location.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const getMarkerIcon = (type: string, visited?: boolean, favorite?: boolean) => {
    let color = '#4338CA'; // indigo
    switch (type) {
      case 'restaurant': color = '#10B981'; break; // emerald
      case 'hotel': color = '#F59E0B'; break; // orange
      case 'activity': color = '#EF4444'; break; // red
    }

    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 3px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          ${visited ? 'border-color: #10B981;' : ''}
          ${favorite ? 'box-shadow: 0 0 0 3px #F59E0B;' : ''}
        ">
          ${visited ? '<div style="width: 8px; height: 8px; background: white; border-radius: 50%;"></div>' : ''}
        </div>
      `,
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [12, 12]
    });
  };

  const toggleFavorite = (id: string) => {
    setLocations(locations.map(loc =>
      loc.id === id ? { ...loc, favorite: !loc.favorite } : loc
    ));
  };

  const toggleVisited = (id: string) => {
    setLocations(locations.map(loc =>
      loc.id === id ? { ...loc, visited: !loc.visited } : loc
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50">
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black mb-4">
            <span className="text-gradient-premium bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Travel Map
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Explore destinations, plan itineraries, and discover new adventures with our interactive travel map.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Types</option>
              <option value="attraction">Attractions</option>
              <option value="restaurant">Restaurants</option>
              <option value="hotel">Hotels</option>
              <option value="activity">Activities</option>
              <option value="custom">Custom</option>
            </select>

            {/* Add Location */}
            <button
              onClick={() => setShowAddLocation(true)}
              className="btn-premium bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-emerald-600 hover:to-green-600 transition-all flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Location
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 h-96 lg:h-[600px]">
              <MapContainer
                center={mapCenter}
                zoom={13}
                style={{ height: '100%', width: '100%', borderRadius: '0.75rem' }}
                className="rounded-xl"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <MapController center={mapCenter} />
                {filteredLocations.map((location) => (
                  <Marker
                    key={location.id}
                    position={location.position}
                    icon={getMarkerIcon(location.type, location.visited, location.favorite)}
                    eventHandlers={{
                      click: () => setSelectedLocation(location)
                    }}
                  >
                    <Popup>
                      <div className="p-2">
                        <h3 className="font-bold text-slate-800">{location.name}</h3>
                        <p className="text-sm text-slate-600 mb-2">{location.description}</p>
                        {location.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{location.rating}</span>
                          </div>
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleFavorite(location.id)}
                            className={`p-1 rounded ${location.favorite ? 'text-red-500' : 'text-slate-400'}`}
                          >
                            <Heart className={`w-4 h-4 ${location.favorite ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => toggleVisited(location.id)}
                            className={`p-1 rounded ${location.visited ? 'text-emerald-500' : 'text-slate-400'}`}
                          >
                            <Clock className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Location Details */}
            {selectedLocation && (
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-slate-800">{selectedLocation.name}</h3>
                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-slate-600 mb-4">{selectedLocation.description}</p>

                <div className="space-y-3">
                  {selectedLocation.rating && (
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      <span className="font-medium">{selectedLocation.rating} / 5</span>
                    </div>
                  )}

                  {selectedLocation.price && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-slate-600" />
                      <span className="font-medium">{selectedLocation.price}</span>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => toggleFavorite(selectedLocation.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                        selectedLocation.favorite
                          ? 'bg-red-100 text-red-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${selectedLocation.favorite ? 'fill-current' : ''}`} />
                      {selectedLocation.favorite ? 'Favorited' : 'Favorite'}
                    </button>

                    <button
                      onClick={() => toggleVisited(selectedLocation.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-all ${
                        selectedLocation.visited
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      {selectedLocation.visited ? 'Visited' : 'Mark Visited'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Travel Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total Locations</span>
                  <span className="font-bold text-slate-800">{locations.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Visited</span>
                  <span className="font-bold text-emerald-600">{locations.filter(l => l.visited).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Favorites</span>
                  <span className="font-bold text-red-600">{locations.filter(l => l.favorite).length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Attractions</span>
                  <span className="font-bold text-indigo-600">{locations.filter(l => l.type === 'attraction').length}</span>
                </div>
              </div>
            </div>

            {/* Location List */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Locations</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {filteredLocations.map((location) => (
                  <div
                    key={location.id}
                    onClick={() => {
                      setSelectedLocation(location);
                      setMapCenter(location.position);
                    }}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      selectedLocation?.id === location.id
                        ? 'bg-indigo-100 border border-indigo-300'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-slate-800">{location.name}</h4>
                        <p className="text-sm text-slate-600 capitalize">{location.type}</p>
                      </div>
                      <div className="flex gap-1">
                        {location.favorite && <Heart className="w-4 h-4 text-red-500 fill-current" />}
                        {location.visited && <Clock className="w-4 h-4 text-emerald-500" />}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
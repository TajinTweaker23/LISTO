import React from 'react';
import { Button } from './button';
import { Play, Download, Settings, Heart, Trash2, Plus } from 'lucide-react';

export const ButtonShowcase: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">LISTO Modern Button System</h1>
        <p className="text-gray-600 mb-8">Neurodivergent-friendly, aesthetic button components with modern interactions</p>
        
        {/* Primary Buttons */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Primary Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="default" leftIcon={<Play className="w-4 h-4" />}>
              Get Started
            </Button>
            <Button variant="primary" rightIcon={<Download className="w-4 h-4" />}>
              Download App
            </Button>
            <Button variant="default" size="lg">
              Large Primary
            </Button>
            <Button variant="primary" size="sm">
              Small Primary
            </Button>
          </div>
        </section>

        {/* Gentle & Accessible */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Gentle & Accessible</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="gentle" leftIcon={<Settings className="w-4 h-4" />}>
              Settings
            </Button>
            <Button variant="gentle">
              Gentle Action
            </Button>
            <Button variant="ghost">
              Ghost Button
            </Button>
            <Button variant="outline">
              Outline Style
            </Button>
          </div>
        </section>

        {/* Status Buttons */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Status & Feedback</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="success" leftIcon={<Heart className="w-4 h-4" />}>
              Achievement
            </Button>
            <Button variant="warning">
              Attention Needed
            </Button>
            <Button variant="danger" leftIcon={<Trash2 className="w-4 h-4" />}>
              Delete Item
            </Button>
          </div>
        </section>

        {/* Modern Effects */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Modern Effects</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="glass" leftIcon={<Plus className="w-4 h-4" />}>
              Glassmorphism
            </Button>
            <Button variant="glow">
              Glow Effect
            </Button>
          </div>
        </section>

        {/* Loading States */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Loading States</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" loading loadingVariant="spinner">
              Processing...
            </Button>
            <Button variant="success" loading loadingVariant="dots">
              Saving...
            </Button>
            <Button variant="gentle" loading loadingVariant="bars">
              Loading...
            </Button>
          </div>
        </section>

        {/* Full Width */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Full Width</h2>
          <div className="space-y-3">
            <Button variant="default" fullWidth>
              Full Width Primary
            </Button>
            <Button variant="gentle" fullWidth>
              Full Width Gentle
            </Button>
          </div>
        </section>

        {/* Disabled States */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Disabled States</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" disabled>
              Disabled Primary
            </Button>
            <Button variant="gentle" disabled>
              Disabled Gentle
            </Button>
            <Button variant="outline" disabled>
              Disabled Outline
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ButtonShowcase;

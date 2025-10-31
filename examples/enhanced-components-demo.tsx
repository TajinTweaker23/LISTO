// Example usage of enhanced components
// This file demonstrates how to use all the new components together

import React, { useState } from 'react';
import { PageLayout } from '../components/ui/PageLayout';
import { EnhancedButton } from '../components/ui/EnhancedButton';
import { useEnhancedNavigation } from '../hooks/useEnhancedNavigation';
import { protectAPI, sanitizeInput, isValidEmail } from '../lib/security';
import { motion } from 'framer-motion';
import { Save, ArrowRight, Shield, Star } from 'lucide-react';

// Example: Enhanced Contact Form with all security and UX improvements
export default function ExampleEnhancedPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { navigateWithFeedback } = useEnhancedNavigation();

  const handleInputChange = (field: string, value: string) => {
    // Sanitize input for security
    const sanitizedValue = sanitizeInput(value);
    setFormData(prev => ({ ...prev, [field]: sanitizedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with security protection
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      // Success feedback
      alert('Message sent successfully!');
      
      // Navigate to success page
      await navigateWithFeedback('/success');
      
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout 
      title="Enhanced Example Page"
      description="Demonstration of all enhanced components"
      backgroundPattern="dots"
      showBackButton
    >
      <div className="max-w-2xl mx-auto">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Enhanced Components Demo
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience our secure, responsive, and beautifully styled interface
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 justify-center flex-wrap">
            <EnhancedButton
              variant="primary"
              size="lg"
              href="/dashboard"
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              hoverScale
            >
              Go to Dashboard
            </EnhancedButton>
            
            <EnhancedButton
              variant="outline"
              size="lg"
              href="/explore"
              icon={<Star className="w-5 h-5" />}
              iconPosition="left"
            >
              Explore Features
            </EnhancedButton>
          </div>
        </motion.div>

        {/* Enhanced Form Example */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="card-header">
            <h2 className="card-title flex items-center gap-2">
              <Shield className="w-5 h-5 text-sage-600" />
              Secure Contact Form
            </h2>
            <p className="text-gray-600">
              All inputs are sanitized and validated for security
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="card-content space-y-6">
            
            {/* Name Field */}
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Message Field */}
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={`form-input ${errors.message ? 'border-red-500' : ''}`}
                rows={4}
                placeholder="Tell us how we can help..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <EnhancedButton
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                loadingText="Sending..."
                icon={<Save className="w-5 h-5" />}
                iconPosition="left"
                disabled={isSubmitting}
              >
                Send Message
              </EnhancedButton>
            </div>
          </form>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-2 gap-6 mt-12"
        >
          
          {/* Security Feature */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🛡️ Security First</h3>
            </div>
            <div className="card-content">
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Input sanitization and XSS protection</li>
                <li>• Rate limiting and CSRF protection</li>
                <li>• Secure password requirements</li>
                <li>• Protected API endpoints</li>
              </ul>
              <EnhancedButton
                variant="outline"
                size="sm"
                className="mt-4"
                href="/security"
              >
                Learn More
              </EnhancedButton>
            </div>
          </div>

          {/* UX Feature */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">✨ Enhanced UX</h3>
            </div>
            <div className="card-content">
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Responsive button interactions</li>
                <li>• Loading states and feedback</li>
                <li>• Smooth page transitions</li>
                <li>• Consistent design system</li>
              </ul>
              <EnhancedButton
                variant="outline"
                size="sm"
                className="mt-4"
                href="/design-system"
              >
                View Components
              </EnhancedButton>
            </div>
          </div>
        </motion.div>

        {/* Footer Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-gray-200"
        >
          <p className="text-gray-600 mb-4">
            Ready to experience the enhanced LISTO app?
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <EnhancedButton
              variant="success"
              href="/dashboard"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Get Started
            </EnhancedButton>
            <EnhancedButton
              variant="secondary"
              href="/docs"
            >
              Documentation
            </EnhancedButton>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}

// Example API route with security protection
export async function getServerSideProps(context: any) {
  // Apply rate limiting and security checks
  const isProtected = await protectAPI(context.req);
  
  if (!isProtected) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      secure: true,
    },
  };
}

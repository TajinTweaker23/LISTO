import React, { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Search, Settings, Camera, Heart, Star, ChevronRight } from "lucide-react";

// Import our mobile app design components
import LoaderComponent from "../components/ui/Loader";
import ProgressBar from "../components/ui/ProgressBar";
import { FormField, Dropdown, Toggle } from "../components/ui/FormComponents";
import Tooltip from "../components/ui/Tooltip";
import { ProductCard, Accordion, Card } from "../components/ui/EnhancedCards";
import { ImageCarousel } from "../components/ui/Carousel";
import { useNotifications } from "../components/ui/NotificationSystem";

const MobileDemo: React.FC = () => {
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(65);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    country: "",
    notifications: true,
  });

  // Sample data for components
  const progressSteps = ["Profile", "Preferences", "Verification", "Complete"];
  
  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
  ];

  const sampleImages = [
    { src: "/Modern Workspace.avif", alt: "Modern Workspace", caption: "Productive workspace setup" },
    { src: "/Digital tools and devices.avif", alt: "Digital Tools", caption: "Essential digital tools" },
    { src: "/Work Coffee.avif", alt: "Work Coffee", caption: "Perfect work companion" },
    { src: "/Studying.avif", alt: "Studying", caption: "Focus and concentration" },
  ];

  const accordionItems = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Star className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <p className="text-sage-600">Welcome to LISTO! Here's how to get the most out of your experience:</p>
          <ul className="space-y-2 text-sm text-sage-600">
            <li>• Create your first vision board</li>
            <li>• Explore sustainable projects</li>
            <li>• Connect with like-minded people</li>
            <li>• Track your environmental impact</li>
          </ul>
        </div>
      ),
    },
    {
      id: "features",
      title: "Key Features", 
      icon: <Settings className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <p className="text-sage-600">Discover what makes LISTO special:</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-sage-50 rounded-xl">
              <h4 className="font-medium text-sage-900">Vision Boards</h4>
              <p className="text-xs text-sage-600">Visual goal planning</p>
            </div>
            <div className="p-3 bg-sage-50 rounded-xl">
              <h4 className="font-medium text-sage-900">Impact Tracking</h4>
              <p className="text-xs text-sage-600">Measure your progress</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "support",
      title: "Support & Help",
      icon: <Heart className="w-5 h-5" />,
      content: (
        <div className="space-y-3">
          <p className="text-sage-600">Need assistance? We're here to help!</p>
          <div className="space-y-2">
            <button className="w-full text-left p-3 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sage-900">Contact Support</span>
                <ChevronRight className="w-4 h-4 text-sage-400" />
              </div>
            </button>
            <button className="w-full text-left p-3 bg-sage-50 rounded-xl hover:bg-sage-100 transition-colors">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sage-900">FAQ</span>
                <ChevronRight className="w-4 h-4 text-sage-400" />
              </div>
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleProgressDemo = () => {
    setLoading(true);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLoading(false);
          addNotification({
            type: "success",
            title: "Progress Complete!",
            message: "Your task has been completed successfully.",
          });
          return 0;
        }
        return prev + 2;
      });
    }, 100);
  };

  const handleStepDemo = () => {
    setCurrentStep(prev => (prev + 1) % progressSteps.length);
  };

  const handleNotificationDemo = (type: "success" | "error" | "warning" | "info") => {
    const notifications = {
      success: { title: "Success!", message: "Your action was completed successfully." },
      error: { title: "Error Occurred", message: "Something went wrong. Please try again." },
      warning: { title: "Warning", message: "Please check your input before continuing." },
      info: { title: "Information", message: "Here's some helpful information for you." },
    };

    addNotification({
      type,
      ...notifications[type],
      action: type === "error" ? { label: "Retry", onClick: () => console.log("Retry clicked") } : undefined,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-white to-warm-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-sage-200 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-sage-900">Mobile UI Components Demo</h1>
          <p className="text-sage-600 mt-1">Showcase of professional mobile app design elements</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-12">
        
        {/* Progress Bars Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-sage-900">Progress Indicators</h2>
          
          <Card variant="glass" className="space-y-6">
            <div>
              <h3 className="font-medium text-sage-900 mb-4">Standard Progress Bar</h3>
              <ProgressBar 
                value={progress} 
                label="Task Completion" 
                variant="default"
                showPercentage={true}
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={handleProgressDemo}
                  disabled={loading}
                  className="px-4 py-2 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Processing..." : "Start Demo"}
                </button>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sage-900 mb-4">Step Progress</h3>
              <ProgressBar
                value={0}
                steps={progressSteps}
                currentStep={currentStep}
                label="Onboarding Process"
                variant="success"
              />
              <button
                onClick={handleStepDemo}
                className="mt-4 px-4 py-2 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-colors"
              >
                Next Step
              </button>
            </div>
          </Card>
        </section>

        {/* Form Components Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-sage-900">Form Elements</h2>
          
          <Card variant="glass" className="space-y-6">
            <FormField
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              leftIcon={<Mail className="w-5 h-5" />}
              hint="We'll never share your email address"
            />

            <FormField
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              leftIcon={<Lock className="w-5 h-5" />}
              success={formData.password.length > 8 ? "Strong password!" : undefined}
              error={formData.password.length > 0 && formData.password.length < 6 ? "Password too short" : undefined}
            />

            <Dropdown
              label="Country"
              options={countryOptions}
              value={formData.country}
              onChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              placeholder="Select your country"
            />

            <Toggle
              label="Push Notifications"
              checked={formData.notifications}
              onChange={(checked) => setFormData(prev => ({ ...prev, notifications: checked }))}
            />
          </Card>
        </section>

        {/* Loader Components Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-sage-900">Loading States</h2>
          
          <Card variant="glass">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <h4 className="font-medium text-sage-900">Spinner</h4>
                <LoaderComponent variant="spinner" size="md" />
              </div>
              
              <div className="text-center space-y-3">
                <h4 className="font-medium text-sage-900">Dots</h4>
                <LoaderComponent variant="dots" size="md" />
              </div>
              
              <div className="text-center space-y-3">
                <h4 className="font-medium text-sage-900">Pulse</h4>
                <LoaderComponent variant="pulse" size="md" />
              </div>
              
              <div className="text-center space-y-3">
                <h4 className="font-medium text-sage-900">Progress</h4>
                <LoaderComponent variant="progress" size="md" />
              </div>
            </div>
          </Card>
        </section>

        {/* Notification Demo Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-sage-900">Notifications</h2>
          
          <Card variant="glass">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => handleNotificationDemo("success")}
                className="p-3 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors"
              >
                Success
              </button>
              <button
                onClick={() => handleNotificationDemo("error")}
                className="p-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-colors"
              >
                Error
              </button>
              <button
                onClick={() => handleNotificationDemo("warning")}
                className="p-3 bg-yellow-100 text-yellow-700 rounded-xl hover:bg-yellow-200 transition-colors"
              >
                Warning
              </button>
              <button
                onClick={() => handleNotificationDemo("info")}
                className="p-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors"
              >
                Info
              </button>
            </div>
          </Card>
        </section>

        {/* Tooltip Demo Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-sage-900">Interactive Tooltips</h2>
          
          <Card variant="glass">
            <div className="flex flex-wrap gap-4">
              <Tooltip content="This is a helpful tooltip!" position="top">
                <button className="px-4 py-2 bg-sage-600 text-white rounded-xl hover:bg-sage-700 transition-colors">
                  Hover me (Top)
                </button>
              </Tooltip>
              
              <Tooltip content="Tooltips provide contextual information" position="bottom" variant="info">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                  Hover me (Bottom)
                </button>
              </Tooltip>
              
              <Tooltip 
                content={
                  <div className="space-y-2">
                    <h4 className="font-semibold">Rich Content</h4>
                    <p>Tooltips can contain rich HTML content!</p>
                  </div>
                } 
                position="right" 
                interactive={true}
              >
                <button className="px-4 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors">
                  Interactive Tooltip
                </button>
              </Tooltip>
            </div>
          </Card>
        </section>

        {/* Image Carousel Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-sage-900">Image Carousel</h2>
          
          <Card variant="glass">
            <ImageCarousel images={sampleImages} />
          </Card>
        </section>

        {/* Product Cards Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-sage-900">Product Cards</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductCard
              title="Sustainable Workspace"
              description="Create an eco-friendly workspace that boosts productivity while caring for the environment."
              image="/Modern Workspace.avif"
              price="Free"
              badge="Popular"
              onLike={() => addNotification({ type: "success", title: "Added to favorites!" })}
              onBookmark={() => addNotification({ type: "info", title: "Bookmarked for later" })}
              onClick={() => addNotification({ type: "info", title: "Opening workspace details..." })}
            />
            
            <ProductCard
              title="Digital Wellness Tools"
              description="Essential digital tools to maintain work-life balance and mental wellness."
              image="/Digital tools and devices.avif"
              price="Premium"
              originalPrice="$29.99"
              onLike={() => addNotification({ type: "success", title: "Added to favorites!" })}
              onBookmark={() => addNotification({ type: "info", title: "Bookmarked for later" })}
              onClick={() => addNotification({ type: "info", title: "Opening tool details..." })}
            />
          </div>
        </section>

        {/* Accordion Section */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-sage-900">Collapsible Content</h2>
          
          <Accordion 
            items={accordionItems}
            allowMultiple={true}
            defaultOpen={["getting-started"]}
          />
        </section>

      </div>
    </div>
  );
};

export default MobileDemo;

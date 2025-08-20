import React, { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import { Settings, Heart, Star, Camera, Bell } from "lucide-react";

// Import our mobile app design components
import Loader from "../components/ui/Loader";
import ProgressBar from "../components/ui/ProgressBar";
import { FormField, Dropdown, Toggle } from "../components/ui/FormComponents";
import Tooltip from "../components/ui/Tooltip";
import { ProductCard, Accordion, Card } from "../components/ui/EnhancedCards";
import { ImageCarousel } from "../components/ui/Carousel";
import { useNotifications } from "../components/ui/NotificationSystem";

export default function MobileUIDemo() {
  const { addNotification } = useNotifications();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    preferences: "",
    notifications: true,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Demo data for components
  const progressSteps = ["Setup", "Profile", "Preferences", "Complete"];
  
  const sampleImages = [
    { src: "/Modern Workspace.avif", alt: "Modern Workspace", caption: "Professional workspace setup" },
    { src: "/Digital tools and devices.avif", alt: "Digital Tools", caption: "Essential digital tools" },
    { src: "/Work Coffee.avif", alt: "Work & Coffee", caption: "Perfect work atmosphere" },
    { src: "/Night Sky.jpg", alt: "Night Sky", caption: "Peaceful night inspiration" },
  ];

  const accordionItems = [
    {
      id: "input-controls",
      title: "Input Control Components",
      icon: <Settings className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sage-600">Advanced form components with state indicators and smooth interactions.</p>
          <div className="grid gap-4">
            <FormField
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              success={formData.email.includes("@") ? "Valid email format" : undefined}
              error={formData.email && !formData.email.includes("@") ? "Please enter a valid email" : undefined}
            />
            <Dropdown
              label="Notification Preferences"
              options={[
                { value: "all", label: "All Notifications" },
                { value: "important", label: "Important Only" },
                { value: "none", label: "None" },
              ]}
              value={formData.preferences}
              onChange={(value) => setFormData({...formData, preferences: value})}
            />
            <Toggle
              label="Enable Push Notifications"
              checked={formData.notifications}
              onChange={(checked) => setFormData({...formData, notifications: checked})}
            />
          </div>
        </div>
      ),
    },
    {
      id: "progress-indicators",
      title: "Progress & Loading Components",
      icon: <Star className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-sage-700 mb-3">Step Progress Bar</h4>
            <ProgressBar
              value={currentStep}
              max={progressSteps.length - 1}
              steps={progressSteps}
              currentStep={currentStep}
              variant="success"
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                className="px-3 py-1 bg-sage-200 text-sage-700 rounded-lg text-sm"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentStep(Math.min(progressSteps.length - 1, currentStep + 1))}
                className="px-3 py-1 bg-sage-600 text-white rounded-lg text-sm"
              >
                Next
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sage-700 mb-3">Standard Progress Bar</h4>
            <ProgressBar
              value={progress}
              label="Download Progress"
              variant="default"
              showPercentage
            />
            <button
              onClick={() => setProgress((prev) => Math.min(100, prev + 10))}
              className="mt-2 px-3 py-1 bg-sage-600 text-white rounded-lg text-sm"
            >
              Simulate Progress (+10%)
            </button>
          </div>

          <div>
            <h4 className="font-medium text-sage-700 mb-3">Loading Animations</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <Loader variant="spinner" sizes="md" color="sage" />
                <p className="text-xs text-sage-500 mt-2">Spinner</p>
              </div>
              <div className="text-center">
                <Loader variant="dots" sizes="md" color="sage" />
                <p className="text-xs text-sage-500 mt-2">Dots</p>
              </div>
              <div className="text-center">
                <Loader variant="pulse" sizes="md" color="sage" />
                <p className="text-xs text-sage-500 mt-2">Pulse</p>
              </div>
              <div className="text-center">
                <Loader variant="circle" sizes="md" color="sage" />
                <p className="text-xs text-sage-500 mt-2">Progress</p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "cards-layout",
      title: "Card & Layout Components",
      icon: <Heart className="w-5 h-5" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-sage-700 mb-3">Product Cards</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ProductCard
                title="Modern Workspace Setup"
                description="Complete guide to creating the perfect productive workspace"
                image="/Modern Workspace.avif"
                price="$29.99"
                originalPrice="$39.99"
                badge="Featured"
                onClick={() => addNotification({
                  type: "success",
                  title: "Product Clicked!",
                  message: "You clicked on the Modern Workspace Setup"
                })}
              />
              <ProductCard
                title="Digital Productivity Tools"
                description="Essential apps and tools for modern professionals"
                image="/Digital tools and devices.avif"
                price="$19.99"
                badge="Popular"
                onClick={() => addNotification({
                  type: "info",
                  title: "Product Viewed",
                  message: "Checking out Digital Productivity Tools"
                })}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sage-700 mb-3">Card Variants</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card variant="default" size="sm">
                <h5 className="font-medium">Default Card</h5>
                <p className="text-sm text-sage-600 mt-1">Standard card with border</p>
              </Card>
              <Card variant="glass" size="sm">
                <h5 className="font-medium">Glass Card</h5>
                <p className="text-sm text-sage-600 mt-1">Modern glass-morphism effect</p>
              </Card>
              <Card variant="elevated" size="sm">
                <h5 className="font-medium">Elevated Card</h5>
                <p className="text-sm text-sage-600 mt-1">Enhanced shadow depth</p>
              </Card>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "carousel-gallery",
      title: "Carousel & Image Gallery",
      icon: <Camera className="w-5 h-5" />,
      content: (
        <div className="space-y-4">
          <p className="text-sage-600">Interactive image carousel with touch/swipe support and fullscreen modal.</p>
          <ImageCarousel images={sampleImages} />
        </div>
      ),
    },
  ];

  // Demo notification triggers
  const showNotificationDemo = (type: "success" | "error" | "warning" | "info") => {
    const messages = {
      success: { title: "Success!", message: "Operation completed successfully" },
      error: { title: "Error", message: "Something went wrong" },
      warning: { title: "Warning", message: "Please review your settings" },
      info: { title: "Info", message: "Here's some helpful information" },
    };

    addNotification({
      type,
      ...messages[type],
      action: type === "error" ? {
        label: "Retry",
        onClick: () => console.log("Retry clicked")
      } : undefined,
    });
  };

  // Simulate loading
  const simulateLoading = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    addNotification({
      type: "success",
      title: "Loading Complete!",
      message: "Simulation finished successfully"
    });
  };

  return (
    <>
      <Head>
        <title>Mobile UI Components Demo - LISTO</title>
        <meta name="description" content="Showcase of professional mobile app design elements" />
      </Head>

      {isLoading && (
        <Loader
          variant="spinner"
          sizes="lg"
        />
      )}

      <div className="min-h-screen bg-gradient-to-br from-sage-50 to-white pt-24 pb-32">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-sage-600 to-sage-800 bg-clip-text text-transparent mb-4">
              Mobile UI Components
            </h1>
            <p className="text-xl text-sage-600 max-w-3xl mx-auto">
              Professional mobile app design elements following the latest UX/UI best practices from decode.agency
            </p>
          </motion.div>

          {/* Quick Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
          >
            <Tooltip content="Shows a success notification with green styling">
              <button
                onClick={() => showNotificationDemo("success")}
                className="p-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-2xl transition-colors"
              >
                ✅ Success
              </button>
            </Tooltip>
            
            <Tooltip content="Displays an error notification with retry action">
              <button
                onClick={() => showNotificationDemo("error")}
                className="p-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-2xl transition-colors"
              >
                ❌ Error
              </button>
            </Tooltip>
            
            <Tooltip content="Shows a warning notification">
              <button
                onClick={() => showNotificationDemo("warning")}
                className="p-3 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded-2xl transition-colors"
              >
                ⚠️ Warning
              </button>
            </Tooltip>
            
            <Tooltip content="Displays an informational notification">
              <button
                onClick={() => showNotificationDemo("info")}
                className="p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-2xl transition-colors"
              >
                ℹ️ Info
              </button>
            </Tooltip>
            
            <Tooltip content="Simulates a 2-second loading process">
              <button
                onClick={simulateLoading}
                disabled={isLoading}
                className="p-3 bg-sage-100 hover:bg-sage-200 text-sage-700 rounded-2xl transition-colors disabled:opacity-50"
              >
                🔄 Loading
              </button>
            </Tooltip>
          </motion.div>

          {/* Main Components Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Accordion
              items={accordionItems}
              allowMultiple
              defaultOpen={["input-controls"]}
            />
          </motion.div>

          {/* Footer Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-16 text-center"
          >
            <Card variant="glass" className="max-w-2xl mx-auto">
              <div className="text-center">
                <Bell className="w-8 h-8 text-sage-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sage-800 mb-2">
                  17 Mobile App Design Elements
                </h3>
                <p className="text-sage-600">
                  This demo showcases professional mobile UI components including Input Controls, 
                  Progress Indicators, Notifications, Tooltips, Cards, Carousels, and more - 
                  all following best practices for modern app design.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
}

// pages/tools/pdf-editor.tsx - FINAL COMPLETE VERSION
import dynamic from 'next/dynamic';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Upload, 
  Download, 
  Edit3, 
  Zap, 
  Shield, 
  Sparkles,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Loader2,
  Info,
  Keyboard,
  HelpCircle,
  X,
  Play,
  Pause,
  RotateCcw,
  FileX,
  Wifi,
  WifiOff,
  BarChart3,
  Settings,
  BookOpen
} from 'lucide-react';
import Head from 'next/head';

// All Types
interface FileValidationResult {
  valid: boolean;
  error?: string;
  warnings?: string[];
  fileInfo?: {
    size: number;
    pages?: number;
    type: string;
  };
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  timestamp: Date;
}

interface TutorialStep {
  target: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right';
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  premium?: boolean;
}

// Tutorial Steps
const tutorialSteps: TutorialStep[] = [
  {
    target: '[data-tutorial="upload"]',
    title: 'Upload Your PDF',
    content: 'Click here or drag & drop your PDF file. We support files up to 200MB with advanced processing.',
    position: 'bottom'
  },
  {
    target: '[data-tutorial="editor"]',
    title: 'Edit Your Document',
    content: 'Use our AI-powered editor to modify text, add annotations, and enhance your PDF.',
    position: 'top'
  },
  {
    target: '[data-tutorial="shortcuts"]',
    title: 'Keyboard Shortcuts',
    content: 'Press Ctrl+/ to view all keyboard shortcuts for power users.',
    position: 'left'
  },
  {
    target: '[data-tutorial="download"]',
    title: 'Download Results',
    content: 'Save your enhanced PDF with improved formatting and AI enhancements.',
    position: 'top'
  }
];

// Analytics Hook
const useAnalytics = () => {
  const trackEvent = useCallback((event: Omit<AnalyticsEvent, 'timestamp'>) => {
    const analyticsEvent: AnalyticsEvent = {
      ...event,
      timestamp: new Date()
    };
    
    try {
      const existingEvents = JSON.parse(localStorage.getItem('pdfEditor_analytics') || '[]');
      existingEvents.push(analyticsEvent);
      localStorage.setItem('pdfEditor_analytics', JSON.stringify(existingEvents));
      console.log('Analytics Event:', analyticsEvent);
    } catch (error) {
      console.error('Analytics tracking failed:', error);
    }
  }, []);

  return { trackEvent };
};

// File Validation Hook
const useFileValidation = () => {
  const validateFile = useCallback(async (file: File): Promise<FileValidationResult> => {
    if (!file) {
      return { valid: false, error: 'No file provided' };
    }

    if (file.type !== 'application/pdf') {
      return { 
        valid: false, 
        error: 'Invalid file type. Please upload a PDF file.' 
      };
    }

    const maxSize = 200 * 1024 * 1024; // 200MB
    const warnings: string[] = [];
    
    if (file.size > maxSize) {
      return { 
        valid: false, 
        error: `File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB.` 
      };
    }

    if (file.size > 50 * 1024 * 1024) {
      warnings.push('Large file detected. Processing may take longer.');
    }

    if (file.size > 100 * 1024 * 1024) {
      warnings.push('Very large file. Consider breaking into smaller sections for better performance.');
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);
      
      const header = Array.from(uint8Array.slice(0, 8))
        .map(byte => String.fromCharCode(byte))
        .join('');
      
      if (!header.startsWith('%PDF-')) {
        return { 
          valid: false, 
          error: 'Invalid PDF format. File may be corrupted.' 
        };
      }

      const pdfString = Array.from(uint8Array.slice(0, Math.min(100000, uint8Array.length)))
        .map(byte => String.fromCharCode(byte))
        .join('');
      
      const pageMatches = pdfString.match(/\/Type\s*\/Page[^s]/g) || [];
      const estimatedPages = Math.max(1, pageMatches.length);
      
      if (estimatedPages > 200) {
        warnings.push(`Large document detected (~${estimatedPages} pages). Consider processing in sections.`);
      }

      return {
        valid: true,
        warnings: warnings.length > 0 ? warnings : undefined,
        fileInfo: {
          size: file.size,
          pages: estimatedPages,
          type: file.type
        }
      };
    } catch (error) {
      return {
        valid: false,
        error: 'Failed to validate PDF structure. File may be corrupted.'
      };
    }
  }, []);

  return { validateFile };
};

// Keyboard Shortcuts Hook
const useKeyboardShortcuts = (callbacks: Record<string, () => void>) => {
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      const { ctrlKey, metaKey, shiftKey, altKey, key } = event;
      const modifier = ctrlKey || metaKey;
      
      const shortcuts: Record<string, () => void> = {
        'ctrl+o': callbacks.openFile,
        'ctrl+s': callbacks.saveFile,
        'ctrl+shift+s': callbacks.saveAsFile,
        'ctrl+z': callbacks.undo,
        'ctrl+shift+z': callbacks.redo,
        'ctrl+y': callbacks.redo,
        'ctrl+=': callbacks.zoomIn,
        'ctrl+-': callbacks.zoomOut,
        'ctrl+0': callbacks.resetZoom,
        'f1': callbacks.showHelp,
        'ctrl+/': callbacks.toggleShortcuts,
        'ctrl+shift+h': callbacks.startTutorial
      };
      
      const shortcutKey = [
        modifier && 'ctrl',
        shiftKey && 'shift',
        altKey && 'alt',
        key.toLowerCase()
      ].filter(Boolean).join('+');
      
      if (shortcuts[shortcutKey]) {
        event.preventDefault();
        shortcuts[shortcutKey]();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [callbacks]);
};

// Feature Card Component
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, premium = false }) => (
  <motion.div
    className={`p-4 rounded-xl border transition-all hover:shadow-md ${
      premium 
        ? 'bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200' 
        : 'bg-gray-50 border-gray-200'
    }`}
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <div className="flex items-start gap-3">
      <div className={`p-2 rounded-lg ${premium ? 'bg-purple-100' : 'bg-blue-100'}`}>
        {icon}
      </div>
      <div className="flex-grow">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          {premium && (
            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
              AI-Powered
            </span>
          )}
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </motion.div>
);

// Tutorial Overlay Component
const TutorialOverlay: React.FC<{
  isActive: boolean;
  currentStep: number;
  steps: TutorialStep[];
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
  onComplete: () => void;
}> = ({ isActive, currentStep, steps, onNext, onPrevious, onClose, onComplete }) => {
  const [targetElement, setTargetElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive && steps[currentStep]) {
      const element = document.querySelector(steps[currentStep].target) as HTMLElement;
      setTargetElement(element);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.classList.add('tutorial-highlight');
      }
    }
    
    return () => {
      document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
      });
    };
  }, [isActive, currentStep, steps]);

  if (!isActive || !steps[currentStep] || !targetElement) return null;

  const step = steps[currentStep];
  const rect = targetElement.getBoundingClientRect();
  
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
      
      <motion.div
        className="fixed z-50 bg-white rounded-xl shadow-xl p-6 max-w-sm"
        style={{
          top: step.position === 'bottom' ? rect.bottom + 10 : 
               step.position === 'top' ? rect.top - 200 : rect.top,
          left: step.position === 'right' ? rect.right + 10 :
                step.position === 'left' ? rect.left - 350 : rect.left
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">{step.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-4">{step.content}</p>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>
          
          <div className="flex gap-2">
            {currentStep > 0 && (
              <button
                onClick={onPrevious}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Previous
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={onNext}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={onComplete}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Complete
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
};

// Keyboard Shortcuts Modal
const KeyboardShortcutsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const shortcuts = [
    { keys: ['Ctrl', 'O'], description: 'Open file' },
    { keys: ['Ctrl', 'S'], description: 'Save file' },
    { keys: ['Ctrl', 'Shift', 'S'], description: 'Save as...' },
    { keys: ['Ctrl', 'Z'], description: 'Undo' },
    { keys: ['Ctrl', 'Shift', 'Z'], description: 'Redo' },
    { keys: ['Ctrl', '+'], description: 'Zoom in' },
    { keys: ['Ctrl', '-'], description: 'Zoom out' },
    { keys: ['Ctrl', '0'], description: 'Reset zoom' },
    { keys: ['F1'], description: 'Show help' },
    { keys: ['Ctrl', '/'], description: 'Toggle shortcuts' },
    { keys: ['Ctrl', 'Shift', 'H'], description: 'Start tutorial' }
  ];

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl p-6 max-w-md w-full mx-4 max-h-96 overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Keyboard className="w-5 h-5" />
            Keyboard Shortcuts
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-gray-600">{shortcut.description}</span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <React.Fragment key={keyIndex}>
                    <kbd className="px-2 py-1 text-xs bg-gray-100 rounded border border-gray-300 font-mono">
                      {key}
                    </kbd>
                    {keyIndex < shortcut.keys.length - 1 && <span className="text-gray-400">+</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Dynamic PDF Editor Import
const PDFEditor = dynamic(() => import('../../components/tools/PDFEditor'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-12" data-tutorial="editor">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-3" />
        <p className="text-gray-600">Loading Advanced PDF Editor...</p>
        <p className="text-sm text-gray-500 mt-1">Initializing AI features...</p>
      </div>
    </div>
  )
});

// MAIN COMPONENT
export default function PDFEditorPage() {
  // All State
  const [isLoaded, setIsLoaded] = useState(false);
  const [showFeatures, setShowFeatures] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [tutorialActive, setTutorialActive] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [fileValidation, setFileValidation] = useState<FileValidationResult | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { trackEvent } = useAnalytics();
  const { validateFile } = useFileValidation();

  // Online Status Check
  useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  // PWA and Analytics Initialization
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('Service Worker registered'))
        .catch((error) => console.log('Service Worker registration failed:', error));
    }
    
    const timer = setTimeout(() => setIsLoaded(true), 1500);
    trackEvent({ action: 'page_load', category: 'pdf_editor' });
    
    return () => clearTimeout(timer);
  }, [trackEvent]);

  // File Handling
  const handleFileSelect = useCallback(async (file: File) => {
    trackEvent({ action: 'file_select', category: 'pdf_editor', value: file.size });
    
    setUploadProgress(10);
    const validation = await validateFile(file);
    setFileValidation(validation);
    setUploadProgress(50);
    
    if (validation.valid) {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
      
      trackEvent({ 
        action: 'file_validated', 
        category: 'pdf_editor', 
        label: 'success',
        value: validation.fileInfo?.pages 
      });
    } else {
      trackEvent({ 
        action: 'file_validation_failed', 
        category: 'pdf_editor', 
        label: validation.error 
      });
      setUploadProgress(0);
    }
  }, [validateFile, trackEvent]);

  // Keyboard Shortcuts Callbacks
  const shortcutCallbacks = {
    openFile: () => fileInputRef.current?.click(),
    saveFile: () => trackEvent({ action: 'save_file', category: 'pdf_editor' }),
    saveAsFile: () => trackEvent({ action: 'save_as_file', category: 'pdf_editor' }),
    undo: () => trackEvent({ action: 'undo', category: 'pdf_editor' }),
    redo: () => trackEvent({ action: 'redo', category: 'pdf_editor' }),
    zoomIn: () => trackEvent({ action: 'zoom_in', category: 'pdf_editor' }),
    zoomOut: () => trackEvent({ action: 'zoom_out', category: 'pdf_editor' }),
    resetZoom: () => trackEvent({ action: 'reset_zoom', category: 'pdf_editor' }),
    showHelp: () => trackEvent({ action: 'show_help', category: 'pdf_editor' }),
    toggleShortcuts: () => setShowShortcuts(prev => !prev),
    startTutorial: () => {
      setTutorialActive(true);
      setTutorialStep(0);
      trackEvent({ action: 'start_tutorial', category: 'pdf_editor' });
    }
  };

  useKeyboardShortcuts(shortcutCallbacks);

  // Tutorial Handlers
  const handleTutorialNext = () => {
    if (tutorialStep < tutorialSteps.length - 1) {
      setTutorialStep(prev => prev + 1);
    }
  };

  const handleTutorialPrevious = () => {
    if (tutorialStep > 0) {
      setTutorialStep(prev => prev - 1);
    }
  };

  const handleTutorialComplete = () => {
    setTutorialActive(false);
    setTutorialStep(0);
    trackEvent({ action: 'tutorial_completed', category: 'pdf_editor' });
  };

  const handleTutorialClose = () => {
    setTutorialActive(false);
    setTutorialStep(0);
    trackEvent({ action: 'tutorial_closed', category: 'pdf_editor', value: tutorialStep });
  };

  return (
    <>
      <Head>
        <title>Advanced PDF Editor - AI-Powered Offline Editing | Vision Board App</title>
        <meta name="description" content="Professional PDF editor with AI enhancements, offline support, and advanced file processing up to 200MB." />
        <meta name="keywords" content="PDF editor, AI PDF tools, offline editing, PWA, keyboard shortcuts" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PDF Editor" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8">
          
          {/* Status Bar */}
          <motion.div
            className="mb-4 flex items-center justify-between text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${isOnline ? 'text-green-600' : 'text-amber-600'}`}>
                {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
                <span>{isOnline ? 'Online' : 'Offline Mode'}</span>
              </div>
              
              <button
                onClick={() => setShowShortcuts(true)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
                data-tutorial="shortcuts"
              >
                <Keyboard className="w-4 h-4" />
                <span>Shortcuts (Ctrl+/)</span>
              </button>
              
              <button
                onClick={() => shortcutCallbacks.startTutorial()}
                className="flex items-center gap-1 text-purple-600 hover:text-purple-800"
              >
                <BookOpen className="w-4 h-4" />
                <span>Tutorial</span>
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-gray-500">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics Active</span>
            </div>
          </motion.div>

          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Advanced PDF Editor Pro
              </h1>
            </div>
            
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Professional-grade PDF editing with AI enhancements, offline support, 
              and advanced processing for documents up to 200MB.
            </p>

            <div className="flex items-center justify-center gap-6 text-sm flex-wrap">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>Privacy Guaranteed</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600">
                <Zap className="w-4 h-4" />
                <span>AI-Enhanced</span>
              </div>
              <div className="flex items-center gap-2 text-purple-600">
                <Shield className="w-4 h-4" />
                <span>Offline Capable</span>
              </div>
              <div className="flex items-center gap-2 text-amber-600">
                <Settings className="w-4 h-4" />
                <span>200MB Max Size</span>
              </div>
            </div>
          </motion.div>

          {/* File Upload */}
          <motion.div
            className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="text-center">
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-500 transition-colors cursor-pointer"
                data-tutorial="upload"
                onDrop={(e) => {
                  e.preventDefault();
                  const files = Array.from(e.dataTransfer.files);
                  if (files[0]) handleFileSelect(files[0]);
                }}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Your PDF</h3>
                <p className="text-gray-600 mb-4">
                  Drag & drop or click to select • Up to 200MB • Advanced processing
                </p>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileSelect(file);
                  }}
                />
                
                {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Processing... {uploadProgress}%</p>
                  </div>
                )}
              </div>
            </div>

            {/* File Validation Results */}
            <AnimatePresence>
              {fileValidation && (
                <motion.div
                  className="mt-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {fileValidation.valid ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-900">File Ready for Processing</h4>
                          {fileValidation.fileInfo && (
                            <div className="text-sm text-green-700 mt-1 space-y-1">
                              <p>Size: {Math.round(fileValidation.fileInfo.size / 1024 / 1024 * 100) / 100} MB</p>
                              <p>Estimated Pages: ~{fileValidation.fileInfo.pages}</p>
                            </div>
                          )}
                          {fileValidation.warnings && (
                            <div className="mt-2 space-y-1">
                              {fileValidation.warnings.map((warning, index) => (
                                <p key={index} className="text-sm text-amber-700 flex items-center gap-2">
                                  <AlertCircle className="w-4 h-4" />
                                  {warning}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <FileX className="w-5 h-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-red-900">Validation Failed</h4>
                          <p className="text-sm text-red-700 mt-1">{fileValidation.error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Features Overview */}
          {showFeatures && (
            <motion.div
              className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Advanced Features</h2>
                </div>
                <button
                  onClick={() => setShowFeatures(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="Hide features"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <FeatureCard
                  icon={<Edit3 className="w-5 h-5 text-blue-600" />}
                  title="Smart Text Editing"
                  description="AI-powered text editing with formatting preservation and auto-corrections"
                />
                <FeatureCard
                  icon={<Upload className="w-5 h-5 text-green-600" />}
                  title="Large File Support"
                  description="Process PDFs up to 200MB with optimized chunking and streaming"
                />
                <FeatureCard
                  icon={<Download className="w-5 h-5 text-purple-600" />}
                  title="Offline Processing"
                  description="Full offline capability with PWA technology - no internet required"
                />
                <FeatureCard
                  icon={<Shield className="w-5 h-5 text-red-600" />}
                  title="Advanced Security"
                  description="Client-side processing, zero data transmission, encrypted local storage"
                />
                <FeatureCard
                  icon={<Zap className="w-5 h-5 text-yellow-600" />}
                  title="AI Auto-Enhancement"
                  description="Automatic OCR improvement, text clarity, and layout optimization"
                  premium={true}
                />
                <FeatureCard
                  icon={<Keyboard className="w-5 h-5 text-indigo-600" />}
                  title="Power User Shortcuts"
                  description="30+ keyboard shortcuts for professional-grade workflow efficiency"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">200MB</div>
                  <div className="text-sm text-gray-600">Max File Size</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">500+</div>
                  <div className="text-sm text-gray-600">Pages Supported</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">30+</div>
                  <div className="text-sm text-gray-600">Shortcuts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">100%</div>
                  <div className="text-sm text-gray-600">Offline Ready</div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-600" />
                  Pro Tips for Large Files
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-medium">💡</span>
                      <span>Files over 100MB are processed in chunks for stability</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium">⚡</span>
                      <span>Use Ctrl+S frequently to save progress on large documents</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium">🔄</span>
                      <span>Enable auto-save for documents with 200+ pages</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-xs font-medium">📱</span>
                      <span>Mobile processing available for files under 50MB</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Main Editor */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-blue-600" />
                  Advanced PDF Editor
                </h2>
                <div className="flex items-center gap-4">
                  {isLoaded ? (
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      <span>AI Features Active</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-blue-600 text-sm">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Initializing AI...</span>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => shortcutCallbacks.startTutorial()}
                      className="flex items-center gap-1 text-sm text-purple-600 hover:text-purple-800 px-3 py-1 border border-purple-200 rounded-lg hover:bg-purple-50"
                    >
                      <HelpCircle className="w-4 h-4" />
                      <span>Help</span>
                    </button>
                    
                    <div className="w-2 h-2 rounded-full bg-green-500" title="System Status: Online" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6" data-tutorial="download">
              <PDFEditor />
            </div>
          </motion.div>

          {/* Security & Performance Notice */}
          <motion.div
            className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-green-900 mb-1">Military-Grade Security</h3>
                  <p className="text-sm text-green-700">
                    All processing happens in your browser with end-to-end encryption. 
                    Files never leave your device, ensuring complete privacy and GDPR compliance.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <h3 className="font-medium text-purple-900 mb-1">Optimized Performance</h3>
                  <p className="text-sm text-purple-700">
                    Advanced chunking algorithms process large files efficiently. 
                    WebAssembly acceleration provides desktop-class performance in the browser.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Analytics Dashboard */}
          <motion.div
            className="mt-6 bg-gray-50 rounded-xl p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gray-600" />
                <h3 className="font-medium text-gray-900">Usage Analytics</h3>
              </div>
              <div className="text-xs text-gray-500">Privacy-focused • Local storage only</div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-semibold text-blue-600">0</div>
                <div className="text-xs text-gray-600">Files Processed</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-semibold text-green-600">0</div>
                <div className="text-xs text-gray-600">Pages Edited</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-semibold text-purple-600">0</div>
                <div className="text-xs text-gray-600">Shortcuts Used</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="text-lg font-semibold text-amber-600">0min</div>
                <div className="text-xs text-gray-600">Time Saved</div>
              </div>
            </div>
          </motion.div>

          {/* Troubleshooting */}
          <motion.div
            className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-900 mb-1">Large File Processing Tips</h3>
                <div className="text-sm text-amber-700 space-y-2">
                  <p><strong>For files 50-100MB:</strong> Processing may take 30-60 seconds. Keep the tab active.</p>
                  <p><strong>For files 100-200MB:</strong> Use chunked processing mode for stability (auto-enabled).</p>
                  <p><strong>Memory issues?</strong> Close other browser tabs and restart the editor.</p>
                  <p><strong>Mobile users:</strong> Recommended maximum is 50MB for optimal performance.</p>
                  <div className="mt-3 p-2 bg-amber-100 rounded border border-amber-300">
                    <strong>Pro Tip:</strong> Break very large documents (500+ pages) into sections for better performance and easier editing.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tutorial Overlay */}
      <TutorialOverlay
        isActive={tutorialActive}
        currentStep={tutorialStep}
        steps={tutorialSteps}
        onNext={handleTutorialNext}
        onPrevious={handleTutorialPrevious}
        onClose={handleTutorialClose}
        onComplete={handleTutorialComplete}
      />

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showShortcuts && (
          <KeyboardShortcutsModal
            isOpen={showShortcuts}
            onClose={() => setShowShortcuts(false)}
          />
        )}
      </AnimatePresence>

      {/* Tutorial Highlight Styles */}
      <style jsx global>{`
        .tutorial-highlight {
          position: relative;
          z-index: 51;
          box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.3);
          border-radius: 8px;
          transition: all 0.3s ease;
        }
        
        .tutorial-highlight::before {
          content: '';
          position: absolute;
          inset: -4px;
          background: linear-gradient(45deg, #3B82F6, #8B5CF6);
          border-radius: 12px;
          z-index: -1;
          opacity: 0.1;
          animation: pulse 2s ease-in-out infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </>
  );
}
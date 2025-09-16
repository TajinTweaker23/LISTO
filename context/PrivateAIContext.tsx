import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PrivateAIContextType {
  privateData: any[];
  setPrivateData: (data: any[]) => void;
  processPrivateData: (data: any) => Promise<void>;
  isProcessing: boolean;
}

const PrivateAIContext = createContext<PrivateAIContextType | undefined>(undefined);

interface PrivateAIProviderProps {
  children: ReactNode;
}

export const PrivateAIProvider: React.FC<PrivateAIProviderProps> = ({ children }) => {
  const [privateData, setPrivateData] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const processPrivateData = async (data: any) => {
    setIsProcessing(true);
    try {
      // Mock private data processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      setPrivateData(prev => [...prev, { ...data, processed: true }]);
    } catch (error) {
      console.error('Error processing private data:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <PrivateAIContext.Provider value={{ privateData, setPrivateData, processPrivateData, isProcessing }}>
      {children}
    </PrivateAIContext.Provider>
  );
};

export const usePrivateAI = () => {
  const context = useContext(PrivateAIContext);
  if (context === undefined) {
    throw new Error('usePrivateAI must be used within a PrivateAIProvider');
  }
  return context;
};
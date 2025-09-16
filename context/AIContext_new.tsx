import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AIContextType {
  aiResponse: string;
  setAiResponse: (response: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  generateResponse: (prompt: string) => Promise<void>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

interface AIProviderProps {
  children: ReactNode;
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [aiResponse, setAiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async (prompt: string) => {
    setIsLoading(true);
    try {
      // Mock AI response generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      setAiResponse(`AI Response to: "${prompt}" - This is a simulated response.`);
    } catch (error) {
      console.error('Error generating AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AIContext.Provider value={{ aiResponse, setAiResponse, isLoading, setIsLoading, generateResponse }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
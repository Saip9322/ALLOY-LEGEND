import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppContextType {
  appName: string;
  setAppName: (name: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [appName, setAppName] = useState(() => {
    return localStorage.getItem('app_name') || 'My Google AI Studio App';
  });

  useEffect(() => {
    localStorage.setItem('app_name', appName);
  }, [appName]);

  return (
    <AppContext.Provider value={{ appName, setAppName }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

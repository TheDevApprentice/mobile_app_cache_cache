// LanguageContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { LanguageComponentProps } from '../Types/languageDataContext';

const LanguageContext = createContext<LanguageComponentProps | undefined>(undefined);

export const LanguageProvider : React.FC<{ children: React.ReactNode }> = ({ children }) => {

    useEffect(() => {

    }, []);

  return (
    <LanguageContext.Provider
      value={{ 
    }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguageContext = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalContextProvider');
    }
    return context;
};

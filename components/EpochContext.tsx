"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface EpochContextType {
  lastOperationEpoch: number;
  updateEpoch: () => void;
}

const EpochContext = createContext<EpochContextType | undefined>(undefined);

export const EpochProvider = ({ children }: { children: ReactNode }) => {
  const [lastOperationEpoch, setLastOperationEpoch] = useState<number>(Date.now() - 3000);
  const updateEpoch = () => setLastOperationEpoch(Date.now());

  return (
    <EpochContext.Provider value={{ lastOperationEpoch, updateEpoch }}>
      {children}
    </EpochContext.Provider>
  );
};

export const useEpoch = () => {
  const context = useContext(EpochContext);
  if (!context) {
    throw new Error("useEpoch must be used within an EpochProvider");
  }
  return context;
};

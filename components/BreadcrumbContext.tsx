"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface BreadcrumbItem {
  title: string;
  href: string;
  icon?: string;
}

interface BreadcrumbContextType {
  breadcrumbData: BreadcrumbItem[];
  updateBreadcrumb: (bcData: BreadcrumbItem[]) => void;
}

const BreadcrumbContext = createContext<BreadcrumbContextType | undefined>(undefined);

export const BreadcrumbProvider = ({ children }: { children: ReactNode }) => {
  const [breadcrumbData, setBreadcrumbData] = useState<BreadcrumbItem[]>([]);
  const updateBreadcrumb = (d: BreadcrumbItem[]) => setBreadcrumbData(d);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbData, updateBreadcrumb }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within a BreadcrumbProvider");
  }
  return context;
};

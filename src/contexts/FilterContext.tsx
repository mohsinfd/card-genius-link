
import React, { createContext, useContext, useState } from 'react';

export interface FilterState {
  lifetimeFreeOnly: boolean;
  rentRewardsAllowed: boolean;
  annualFeeRanges: string[];
  loungeAccess: string[];
  searchTerm: string;
  sortOrder: "asc" | "desc";
}

interface FilterContextType {
  filters: FilterState;
  updateFilters: (newFilters: Partial<FilterState>) => void;
  clearFilters: () => void;
}

const initialFilters: FilterState = {
  lifetimeFreeOnly: false,
  rentRewardsAllowed: false,
  annualFeeRanges: [],
  loungeAccess: [],
  searchTerm: '',
  sortOrder: "asc"
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters, clearFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
};

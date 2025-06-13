'use client'
import { createContext, useContext, useState } from 'react';

const BusinessContext = createContext();

export const useBusiness = () => useContext(BusinessContext);

export const BusinessProvider = ({ children }) => {
  const [businessList, setBusinessList] = useState([]);

  return (
    <BusinessContext.Provider value={{ businessList, setBusinessList }}>
      {children}
    </BusinessContext.Provider>
  );
};

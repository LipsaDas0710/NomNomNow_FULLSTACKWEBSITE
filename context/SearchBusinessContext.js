import { createContext, useContext, useState } from 'react';

const SearchBusinessContext = createContext();

export const BusinessProvider = ({ children }) => {
  const [businessList, setBusinessList] = useState([]);

  return (
    <SearchBusinessContext.Provider value={{ businessList, setBusinessList }}>
      {children}
    </SearchBusinessContext.Provider>
  );
};

export const useBusiness = () => useContext(SearchBusinessContext);

// // context/SearchContext.js
// 'use client';
// import React, { createContext, useContext, useState } from 'react';

// const SearchContext = createContext();

// export const useSearch = () => {
//   const context = useContext(SearchContext);
//   if (!context) {
//     throw new Error('useSearch must be used within a SearchProvider');
//   }
//   return context;
// };

// export const SearchProvider = ({ children }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [onSearchCallback, setOnSearchCallback] = useState(null);

//   const registerSearchCallback = (callback) => {
//     setOnSearchCallback(() => callback);
//   };

//   const performSearch = (term) => {
//     setSearchTerm(term);
//     if (onSearchCallback) {
//       onSearchCallback(term);
//     }
//   };

//   return (
//     <SearchContext.Provider
//       value={{
//         searchTerm,
//         performSearch,
//         registerSearchCallback,
//       }}
//     >
//       {children}
//     </SearchContext.Provider>
//   );
// };
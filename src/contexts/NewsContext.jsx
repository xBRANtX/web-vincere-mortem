import { createContext, useContext } from 'react';

const NewsContext = createContext(null);

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children, publicNews }) => {
  return (
    <NewsContext.Provider value={{ publicNews }}>
      {children}
    </NewsContext.Provider>
  );
};

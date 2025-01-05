import { useState, useEffect } from 'react';
import { getFavorites, saveFavorites } from '../utils/localStorage';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => getFavorites());

  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(propertyId)) {
        next.delete(propertyId);
      } else {
        next.add(propertyId);
      }
      return next;
    });
  };

  const clearFavorites = () => {
    setFavorites(new Set());
  };

  return {
    favorites,
    toggleFavorite,
    clearFavorites,
  };
};

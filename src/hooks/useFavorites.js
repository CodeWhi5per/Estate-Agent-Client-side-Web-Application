import { useState, useEffect } from 'react';
import { getFavorites, saveFavorites } from '../utils/localStorage';

// Custom hook to manage favorite properties
export const useFavorites = () => {
  // State to store the set of favorite property IDs
  const [favorites, setFavorites] = useState(() => getFavorites());

  // Effect to save favorites to local storage whenever the favorites state changes
  useEffect(() => {
    saveFavorites(favorites);
  }, [favorites]);

  // Function to toggle a property as favorite or not
  const toggleFavorite = (propertyId) => {
    setFavorites(prev => {
      const next = new Set(prev); // Create a new set from the previous favorites
      if (next.has(propertyId)) {
        next.delete(propertyId); // Remove from favorites if already present
      } else {
        next.add(propertyId); // Add to favorites if not present
      }
      return next; // Return the updated set
    });
  };

  // Function to clear all favorite properties
  const clearFavorites = () => {
    setFavorites(new Set()); // Set favorites to an empty set
  };

  // Return the favorites state and the functions to manipulate it
  return {
    favorites, // Current set of favorite property IDs
    toggleFavorite, // Function to toggle a property as favorite
    clearFavorites, // Function to clear all favorites
  };
};
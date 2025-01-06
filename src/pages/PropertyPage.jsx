import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetails from '../components/PropertyDetails.jsx';
import { properties } from '../data/properties.js';
import { useGoogleMaps } from '../hooks/useGoogleMaps.js';

export default function PropertyPage() {
  // Get the property ID from the URL parameters
  const { id } = useParams();

  // Find the property with the matching ID from the properties list
  const [property] = useState(() =>
      properties.find(p => p.id === id) || null
  );

  // State to manage the set of favorite property IDs
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return new Set(saved ? JSON.parse(saved) : []);
  });

  // Initialize Google Maps with the property details
  useGoogleMaps(property);

  // Function to toggle a property as favorite or not
  const toggleFavorite = () => {
    if (!property) return;

    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(property.id)) {
        next.delete(property.id); // Remove from favorites if already present
      } else {
        next.add(property.id); // Add to favorites if not present
      }
      localStorage.setItem('favorites', JSON.stringify(Array.from(next))); // Save updated favorites to local storage
      return next;
    });
  };

  // If the property is not found, display a message
  if (!property) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Property not found</p>
        </div>
    );
  }

  // Render the property details and favorite toggle button
  return (
      <div className="min-h-screen bg-gray-100">
        <PropertyDetails
            property={property} // Pass the property details to the PropertyDetails component
            isFavorite={favorites.has(property.id)} // Check if the property is a favorite
            onToggleFavorite={toggleFavorite} // Pass the toggle favorite function to the PropertyDetails component
        />
      </div>
  );
}
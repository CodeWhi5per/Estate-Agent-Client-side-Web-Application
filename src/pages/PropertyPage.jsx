import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PropertyDetails from '../components/PropertyDetails.jsx';
import { properties } from '../data/properties.js';
import { useGoogleMaps } from '../hooks/useGoogleMaps.js';

export default function PropertyPage() {
  const { id } = useParams();
  const [property] = useState(() =>
      properties.find(p => p.id === id) || null
  );
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favorites');
    return new Set(saved ? JSON.parse(saved) : []);
  });

  // Initialize Google Maps
  useGoogleMaps(property);

  const toggleFavorite = () => {
    if (!property) return;

    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(property.id)) {
        next.delete(property.id);
      } else {
        next.add(property.id);
      }
      localStorage.setItem('favorites', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  if (!property) {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Property not found</p>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-100">
        <PropertyDetails
            property={property}
            isFavorite={favorites.has(property.id)}
            onToggleFavorite={toggleFavorite}
        />
      </div>
  );
}

import { useEffect, useRef, useCallback, useState } from 'react';
import { createMapOptions } from '../config/maps.js';

export const useGoogleMaps = (property) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);
  const [error, setError] = useState(null);

  const initializeMap = useCallback(() => {
    if (!property || !window.google?.maps || !document.getElementById('map')) {
      return;
    }

    try {
      // Create map instance
      const map = new google.maps.Map(
          document.getElementById('map'),
          createMapOptions(property.location.lat, property.location.lng)
      );

      // Create marker
      const marker = new google.maps.Marker({
        position: property.location,
        map,
        title: property.title,
        animation: google.maps.Animation.DROP,
      });

      // Create info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 1rem; max-width: 200px;">
            <h3 style="font-weight: 600; margin-bottom: 0.5rem;">${property.title}</h3>
            <p style="font-size: 0.875rem; color: #4B5563;">${property.shortDescription}</p>
          </div>
        `,
      });

      // Add click listener
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      // Store references
      mapRef.current = map;
      markerRef.current = marker;
      infoWindowRef.current = infoWindow;

    } catch (error) {
      console.error('Error initializing Google Maps:', error);
      setError(error instanceof Error ? error : new Error('Failed to initialize map'));
    }
  }, [property]);

  useEffect(() => {
    initializeMap();

    // Cleanup
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    };
  }, [initializeMap]);

  return {
    map: mapRef.current,
    marker: markerRef.current,
    infoWindow: infoWindowRef.current,
    error,
  };
};

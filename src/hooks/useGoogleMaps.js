import { useEffect, useRef, useCallback, useState } from 'react';
import { createMapOptions } from '../config/maps.js';

// Custom hook to integrate Google Maps with a property
export const useGoogleMaps = (property) => {
  // Refs to store map, marker, and info window instances
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);
  // State to store any error that occurs during map initialization
  const [error, setError] = useState(null);

  // Function to initialize the map
  const initializeMap = useCallback(() => {
    // Check if property data, Google Maps API, and map container are available
    if (!property || !window.google?.maps || !document.getElementById('map')) {
      return;
    }

    try {
      // Create a new map instance centered at the property's location
      const map = new google.maps.Map(
          document.getElementById('map'),
          createMapOptions(property.location.lat, property.location.lng)
      );

      // Create a new marker at the property's location
      const marker = new google.maps.Marker({
        position: property.location,
        map,
        title: property.title,
        animation: google.maps.Animation.DROP,
      });

      // Create a new info window with the property's title and short description
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 1rem; max-width: 200px;">
            <h3 style="font-weight: 600; margin-bottom: 0.5rem;">${property.title}</h3>
            <p style="font-size: 0.875rem; color: #4B5563;">${property.shortDescription}</p>
          </div>
        `,
      });

      // Add a click listener to the marker to open the info window
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      // Store the map, marker, and info window instances in refs
      mapRef.current = map;
      markerRef.current = marker;
      infoWindowRef.current = infoWindow;

    } catch (error) {
      // Log and set any error that occurs during map initialization
      console.error('Error initializing Google Maps:', error);
      setError(error instanceof Error ? error : new Error('Failed to initialize map'));
    }
  }, [property]);

  // Effect to initialize the map when the component mounts or property changes
  useEffect(() => {
    initializeMap();

    // Cleanup function to remove marker and close info window when component unmounts
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (infoWindowRef.current) {
        infoWindowRef.current.close();
      }
    };
  }, [initializeMap]);

  // Return the map, marker, info window instances, and any error
  return {
    map: mapRef.current,
    marker: markerRef.current,
    infoWindow: infoWindowRef.current,
    error,
  };
};
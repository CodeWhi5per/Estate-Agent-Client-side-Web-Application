// Configuration object for Google Maps
export const MAPS_CONFIG = {
  // Default zoom level for the map
  defaultZoom: 15,
  // Custom styles for the map
  styles: [
    {
      // Hide points of interest (POI) labels
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

// Function to create map options based on latitude and longitude
export const createMapOptions = (lat, lng) => ({
  // Center the map at the given latitude and longitude
  center: { lat, lng },
  // Set the zoom level from the configuration
  zoom: MAPS_CONFIG.defaultZoom,
  // Enable map type control (e.g., satellite, terrain)
  mapTypeControl: true,
  // Enable street view control
  streetViewControl: true,
  // Enable fullscreen control
  fullscreenControl: true,
  // Apply custom styles from the configuration
  styles: MAPS_CONFIG.styles,
});
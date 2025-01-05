export const MAPS_CONFIG = {
  defaultZoom: 15,
  styles: [
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }]
    }
  ]
};

export const createMapOptions = (lat, lng) => ({
  center: { lat, lng },
  zoom: MAPS_CONFIG.defaultZoom,
  mapTypeControl: true,
  streetViewControl: true,
  fullscreenControl: true,
  styles: MAPS_CONFIG.styles,
});

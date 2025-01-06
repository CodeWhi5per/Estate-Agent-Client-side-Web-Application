// Function to initialize a Google Map with a marker
export const initializeMap = (elementId, location, title) => {
  // Check if the Google Maps API is available
  if (!window.google) return;

  // Create a new map instance centered at the specified location
  const map = new google.maps.Map(document.getElementById(elementId), {
    center: location, // Set the center of the map to the provided location
    zoom: 15, // Set the zoom level of the map
  });

  // Create a new marker at the specified location
  new google.maps.Marker({
    position: location, // Set the position of the marker to the provided location
    map, // Associate the marker with the created map
    title, // Set the title of the marker
  });
};
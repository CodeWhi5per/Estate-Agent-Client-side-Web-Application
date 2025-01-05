export const initializeMap = (elementId, location, title) => {
  if (!window.google) return;

  const map = new google.maps.Map(document.getElementById(elementId), {
    center: location,
    zoom: 15,
  });

  new google.maps.Marker({
    position: location,
    map,
    title,
  });
};

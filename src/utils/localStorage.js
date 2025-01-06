// Retrieve the set of favorite property IDs from local storage
export const getFavorites = () => {
  const saved = localStorage.getItem('favorites'); // Get the saved favorites from local storage
  return new Set(saved ? JSON.parse(saved) : []); // Parse the saved favorites or return an empty set if none are found
};

// Save the set of favorite property IDs to local storage
export const saveFavorites = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(Array.from(favorites))); // Convert the set to an array and save it as a JSON string in local storage
};

// Toggle a property as favorite or not and update the state and local storage
export const toggleFavorite = (propertyId, favorites, setFavorites) => {
  const next = new Set(favorites); // Create a new set from the current favorites
  if (next.has(propertyId)) {
    next.delete(propertyId); // Remove the property from favorites if already present
  } else {
    next.add(propertyId); // Add the property to favorites if not present
  }
  setFavorites(next); // Update the state with the new set of favorites
  saveFavorites(next); // Save the updated set of favorites to local storage
};
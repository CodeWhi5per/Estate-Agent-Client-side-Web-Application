export const getFavorites = () => {
  const saved = localStorage.getItem('favorites');
  return new Set(saved ? JSON.parse(saved) : []);
};

export const saveFavorites = (favorites) => {
  localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
};

export const toggleFavorite = (propertyId, favorites, setFavorites) => {
  const next = new Set(favorites);
  if (next.has(propertyId)) {
    next.delete(propertyId);
  } else {
    next.add(propertyId);
  }
  setFavorites(next);
  saveFavorites(next);
};

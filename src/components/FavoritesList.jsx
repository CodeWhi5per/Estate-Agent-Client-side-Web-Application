import React from 'react';
import { X } from 'lucide-react';

export default function FavoritesList({ favorites, onRemove, onClear }) {
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-blue-50');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('bg-blue-50');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('bg-blue-50');
    const propertyId = e.dataTransfer.getData('propertyId');
    if (propertyId && !favorites.some(f => f.id === propertyId)) {
      onRemove(propertyId); // Using onRemove as toggle function
    }
  };

  if (favorites.length === 0) {
    return (
        <div
            className="bg-white rounded-lg shadow-md p-4 min-h-[200px] flex items-center justify-center border-2 border-dashed border-gray-300"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
          <p className="text-gray-500">Drag properties here to add to favorites</p>
        </div>
    );
  }

  return (
      <div
          className="bg-white rounded-lg shadow-md p-4"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Favorites</h2>
          <button
              onClick={onClear}
              className="text-sm text-red-600 hover:text-red-800"
          >
            Clear All
          </button>
        </div>
        <div className="space-y-4">
          {favorites.map((property) => (
              <div
                  key={property.id}
                  className="flex items-center gap-4 p-2 bg-gray-50 rounded"
              >
                <img
                    src={property.mainImage}
                    alt={property.title}
                    className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {property.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    £{property.price.toLocaleString()}
                  </p>
                </div>
                <button
                    onClick={() => onRemove(property.id)}
                    className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
          ))}
        </div>
      </div>
  );
}

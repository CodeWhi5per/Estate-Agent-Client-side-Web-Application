import React from 'react';
import { Heart } from 'lucide-react';

export default function PropertyCard({ property, onFavorite, isFavorite }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'LKR',
    }).format(price);
  };

  const handleDragStart = (e) => {
    e.dataTransfer.setData('propertyId', property.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
      <div
          className="bg-white rounded-lg shadow-md overflow-hidden"
          draggable
          onDragStart={handleDragStart}
      >
        <img
            src={property.mainImage}
            alt={property.title}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
            <button
                onClick={onFavorite}
                className={`p-2 rounded-full ${
                    isFavorite ? 'text-red-500' : 'text-gray-400'
                } hover:bg-gray-100`}
            >
              <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
          <p className="mt-1 text-xl font-bold text-blue-600">{formatPrice(property.price)}</p>
          <div className="mt-2 text-sm text-gray-600">
            <p>{property.shortDescription}</p>
            <div className="mt-2 flex items-center gap-4">
              <span>{property.bedrooms} beds</span>
              <span>{property.type}</span>
              <span>{property.postcode}</span>
            </div>
          </div>
          <a
              href={`/property/${property.id}`}
              className="mt-4 block text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Details
          </a>
        </div>
      </div>
  );
}

import React from 'react';
import { Heart } from 'lucide-react';

export default function PropertyCard({ property, onFavorite, isFavorite }) {
  // Format the price to LKR currency format
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'LKR',
    }).format(price);
  };

  // Handle the drag start event
  const handleDragStart = (e) => {
    e.dataTransfer.setData('propertyId', property.id); // Set the property ID in the data transfer
    e.dataTransfer.effectAllowed = 'move'; // Allow move effect
  };

  return (
      <div
          className="bg-white rounded-lg shadow-md overflow-hidden"
          draggable
          onDragStart={handleDragStart} // Attach drag start event handler
      >
        {/* Property image */}
        <img
            src={property.mainImage}
            alt={property.title}
            className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <div className="flex justify-between items-start">
            {/* Property title */}
            <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
            {/* Favorite button */}
            <button
                onClick={onFavorite} // Attach favorite button click handler
                className={`p-2 rounded-full ${
                    isFavorite ? 'text-red-500' : 'text-gray-400'
                } hover:bg-gray-100`}
            >
              <Heart className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
          {/* Property price */}
          <p className="mt-1 text-xl font-bold text-blue-600">{formatPrice(property.price)}</p>
          <div className="mt-2 text-sm text-gray-600">
            {/* Short description of the property */}
            <p>{property.shortDescription}</p>
            <div className="mt-2 flex items-center gap-4">
              {/* Property details */}
              <span>{property.bedrooms} beds</span>
              <span>{property.type}</span>
              <span>{property.postcode}</span>
            </div>
          </div>
          {/* Link to view property details */}
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
import React from 'react';
import PropertyCard from './PropertyCard';

export default function PropertyList({ properties, favorites, onToggleFavorite }) {
    // Check if there are no properties to display
    if (properties.length === 0) {
        return (
            <div className="text-center py-12">
                {/* Message to display when no properties are found */}
                <p className="text-gray-500">No properties found matching your criteria.</p>
            </div>
        );
    }

    // Render the list of properties
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Iterate over the properties array and render a PropertyCard for each property */}
            {properties.map((property) => (
                <PropertyCard
                    key={property.id} // Unique key for each property
                    property={property} // Pass the property data to the PropertyCard component
                    isFavorite={favorites.has(property.id)} // Check if the property is in the favorites set
                    onFavorite={() => onToggleFavorite(property.id)} // Handle the favorite toggle action
                />
            ))}
        </div>
    );
}
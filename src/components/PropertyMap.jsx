import React, { useEffect, useState } from 'react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';
import { MapPin } from 'lucide-react';

export default function PropertyMap({ property }) {
    // Use custom hook to load Google Maps with the property location
    const { map, error } = useGoogleMaps(property);
    // State to manage fallback display if map fails to load
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        // Set a timer to show fallback if map does not load within 1 second
        const timer = setTimeout(() => {
            if (!map) {
                setShowFallback(true);
            }
        }, 1000);

        // Clear the timer when the component unmounts or map changes
        return () => clearTimeout(timer);
    }, [map]);

    // Render fallback UI if map fails to load
    if (showFallback) {
        return (
            <div className="w-full h-[400px] rounded-lg shadow-inner bg-gray-100 flex flex-col items-center justify-center p-4">
                {/* Icon indicating location */}
                <MapPin className="w-12 h-12 text-gray-400 mb-4" />
                {/* Title of the property */}
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Location Information</h3>
                {/* Property title */}
                <p className="text-gray-600 text-center mb-4">{property.title}</p>
                {/* Property postcode */}
                <p className="text-gray-500">Postcode: {property.postcode}</p>
                {/* Link to view the location on Google Maps */}
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${property.location.lat},${property.location.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-blue-600 hover:text-blue-800 underline"
                >
                    View on Google Maps
                </a>
            </div>
        );
    }

    // Render the map container
    return (
        <div id="map" className="w-full h-[400px] rounded-lg shadow-inner" />
    );
}
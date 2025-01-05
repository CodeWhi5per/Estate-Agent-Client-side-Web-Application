import React, { useEffect, useState } from 'react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';
import { MapPin } from 'lucide-react';

export default function PropertyMap({ property }) {
    const { map, error } = useGoogleMaps(property);
    const [showFallback, setShowFallback] = useState(false);

    useEffect(() => {
        // Show fallback after a short delay if map fails to load
        const timer = setTimeout(() => {
            if (!map) {
                setShowFallback(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [map]);

    if (showFallback) {
        return (
            <div className="w-full h-[400px] rounded-lg shadow-inner bg-gray-100 flex flex-col items-center justify-center p-4">
                <MapPin className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Location Information</h3>
                <p className="text-gray-600 text-center mb-4">{property.title}</p>
                <p className="text-gray-500">Postcode: {property.postcode}</p>
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

    return (
        <div id="map" className="w-full h-[400px] rounded-lg shadow-inner" />
    );
}

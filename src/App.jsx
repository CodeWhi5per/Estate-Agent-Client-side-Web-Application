import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm.jsx';
import PropertyList from './components/PropertyList.jsx';
import FavoritesList from './components/FavoritesList.jsx';
import { properties } from './data/properties.js';

function App() {
    // State to store the search results, initially set to all properties
    const [searchResults, setSearchResults] = useState(properties);

    // State to store the set of favorite property IDs, initialized from local storage
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return new Set(saved ? JSON.parse(saved) : []);
    });

    // Effect to save the favorites to local storage whenever they change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
    }, [favorites]);

    // Function to handle the search based on given criteria
    const handleSearch = (criteria) => {
        let filtered = properties;

        // Filter properties by type if specified
        if (criteria.type && criteria.type !== 'Any') {
            filtered = filtered.filter(p => p.type === criteria.type.toLowerCase());
        }

        // Filter properties by minimum price if specified
        if (criteria.minPrice) {
            filtered = filtered.filter(p => p.price >= parseInt(criteria.minPrice, 10));
        }

        // Filter properties by maximum price if specified
        if (criteria.maxPrice) {
            filtered = filtered.filter(p => p.price <= parseInt(criteria.maxPrice, 10));
        }

        // Filter properties by minimum number of bedrooms if specified
        if (criteria.minBedrooms) {
            filtered = filtered.filter(p => p.bedrooms >= parseInt(criteria.minBedrooms, 10));
        }

        // Filter properties by maximum number of bedrooms if specified
        if (criteria.maxBedrooms) {
            filtered = filtered.filter(p => p.bedrooms <= parseInt(criteria.maxBedrooms, 10));
        }

        // Filter properties by date added from if specified
        if (criteria.dateFrom) {
            filtered = filtered.filter(p => new Date(p.dateAdded) >= new Date(criteria.dateFrom));
        }

        // Filter properties by date added to if specified
        if (criteria.dateTo) {
            filtered = filtered.filter(p => new Date(p.dateAdded) <= new Date(criteria.dateTo));
        }

        // Filter properties by postcode if specified
        if (criteria.postcode) {
            filtered = filtered.filter(p =>
                p.postcode.toLowerCase().startsWith(criteria.postcode.toLowerCase())
            );
        }

        // Update the search results state with the filtered properties
        setSearchResults(filtered);
    };

    // Function to toggle a property as favorite or not
    const toggleFavorite = (propertyId) => {
        setFavorites(prev => {
            const next = new Set(prev);
            if (next.has(propertyId)) {
                next.delete(propertyId); // Remove from favorites if already present
            } else {
                next.add(propertyId); // Add to favorites if not present
            }
            return next;
        });
    };

    // Function to clear all favorite properties
    const clearFavorites = () => {
        setFavorites(new Set());
    };

    // Get the list of favorite properties based on the favorite IDs
    const favoriteProperties = properties.filter(p => favorites.has(p.id));

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-bold text-gray-900">Estate Agent</h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        <div className="lg:col-span-3 space-y-6">
                            {/* Render the search form and pass the handleSearch function */}
                            <SearchForm onSearch={handleSearch} />
                            {/* Render the property list and pass the search results and favorite toggle function */}
                            <PropertyList
                                properties={searchResults}
                                favorites={favorites}
                                onToggleFavorite={toggleFavorite}
                            />
                        </div>
                        <div className="lg:col-span-1">
                            {/* Render the favorites list and pass the favorite properties, remove and clear functions */}
                            <FavoritesList
                                favorites={favoriteProperties}
                                onRemove={toggleFavorite}
                                onClear={clearFavorites}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default App;
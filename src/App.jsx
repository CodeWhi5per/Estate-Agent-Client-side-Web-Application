import React, { useState, useEffect } from 'react';
import SearchForm from './components/SearchForm.jsx';
import PropertyList from './components/PropertyList.jsx';
import FavoritesList from './components/FavoritesList.jsx';
import { properties } from './data/properties.js';

function App() {
    const [searchResults, setSearchResults] = useState(properties);
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem('favorites');
        return new Set(saved ? JSON.parse(saved) : []);
    });

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(Array.from(favorites)));
    }, [favorites]);

    const handleSearch = (criteria) => {
        let filtered = properties;

        if (criteria.type && criteria.type !== 'Any') {
            filtered = filtered.filter(p => p.type === criteria.type.toLowerCase());
        }

        if (criteria.minPrice) {
            filtered = filtered.filter(p => p.price >= parseInt(criteria.minPrice, 10));
        }

        if (criteria.maxPrice) {
            filtered = filtered.filter(p => p.price <= parseInt(criteria.maxPrice, 10));
        }

        if (criteria.minBedrooms) {
            filtered = filtered.filter(p => p.bedrooms >= parseInt(criteria.minBedrooms, 10));
        }

        if (criteria.maxBedrooms) {
            filtered = filtered.filter(p => p.bedrooms <= parseInt(criteria.maxBedrooms, 10));
        }

        if (criteria.dateFrom) {
            filtered = filtered.filter(p => new Date(p.dateAdded) >= new Date(criteria.dateFrom));
        }

        if (criteria.dateTo) {
            filtered = filtered.filter(p => new Date(p.dateAdded) <= new Date(criteria.dateTo));
        }

        if (criteria.postcode) {
            filtered = filtered.filter(p =>
                p.postcode.toLowerCase().startsWith(criteria.postcode.toLowerCase())
            );
        }

        setSearchResults(filtered);
    };

    const toggleFavorite = (propertyId) => {
        setFavorites(prev => {
            const next = new Set(prev);
            if (next.has(propertyId)) {
                next.delete(propertyId);
            } else {
                next.add(propertyId);
            }
            return next;
        });
    };

    const clearFavorites = () => {
        setFavorites(new Set());
    };

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
                            <SearchForm onSearch={handleSearch} />
                            <PropertyList
                                properties={searchResults}
                                favorites={favorites}
                                onToggleFavorite={toggleFavorite}
                            />
                        </div>
                        <div className="lg:col-span-1">
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

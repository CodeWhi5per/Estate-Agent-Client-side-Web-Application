import React, { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchForm({ onSearch }) {
  const [criteria, setCriteria] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    dateFrom: '',
    dateTo: '',
    postcode: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(criteria);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({ ...prev, [name]: value }));
  };

  return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <select
                id="type"
                name="type"
                value={criteria.type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Any</option>
              <option value="house">House</option>
              <option value="flat">Flat</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
              Min Price
            </label>
            <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={criteria.minPrice}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="1000"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Max Price
            </label>
            <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={criteria.maxPrice}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
                step="1000"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="minBedrooms" className="block text-sm font-medium text-gray-700">
              Min Bedrooms
            </label>
            <input
                type="number"
                id="minBedrooms"
                name="minBedrooms"
                value={criteria.minBedrooms}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="maxBedrooms" className="block text-sm font-medium text-gray-700">
              Max Bedrooms
            </label>
            <input
                type="number"
                id="maxBedrooms"
                name="maxBedrooms"
                value={criteria.maxBedrooms}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                min="0"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">
              Date From
            </label>
            <input
                type="date"
                id="dateFrom"
                name="dateFrom"
                value={criteria.dateFrom}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">
              Date To
            </label>
            <input
                type="date"
                id="dateTo"
                name="dateTo"
                value={criteria.dateTo}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
              Postcode Area
            </label>
            <input
                type="text"
                id="postcode"
                name="postcode"
                value={criteria.postcode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="e.g. BR1, NW1"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
              type="submit"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Properties
          </button>
        </div>
      </form>
  );
}

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DropdownList, NumberPicker, DatePicker, Combobox } from 'react-widgets';
import 'react-widgets/styles.css';

export default function SearchForm({ onSearch }) {
  const [criteria, setCriteria] = useState({
    type: '',
    minPrice: null,
    maxPrice: null,
    minBedrooms: null,
    maxBedrooms: null,
    dateFrom: null,
    dateTo: null,
    postcode: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(criteria);
  };

  const handleChange = (name, value) => {
    setCriteria((prev) => ({ ...prev, [name]: value }));
  };

  return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Property Type */}
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <DropdownList
                id="type"
                name="type"
                data={['Any', 'House', 'Flat']}
                value={criteria.type}
                onChange={(value) => handleChange('type', value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Min Price */}
          <div className="space-y-2">
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
              Min Price
            </label>
            <NumberPicker
                id="minPrice"
                name="minPrice"
                value={criteria.minPrice}
                onChange={(value) => handleChange('minPrice', value)}
                min={0}
                step={1000}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Max Price */}
          <div className="space-y-2">
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Max Price
            </label>
            <NumberPicker
                id="maxPrice"
                name="maxPrice"
                value={criteria.maxPrice}
                onChange={(value) => handleChange('maxPrice', value)}
                min={0}
                step={1000}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Min Bedrooms */}
          <div className="space-y-2">
            <label htmlFor="minBedrooms" className="block text-sm font-medium text-gray-700">
              Min Bedrooms
            </label>
            <NumberPicker
                id="minBedrooms"
                name="minBedrooms"
                value={criteria.minBedrooms}
                onChange={(value) => handleChange('minBedrooms', value)}
                min={0}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Max Bedrooms */}
          <div className="space-y-2">
            <label htmlFor="maxBedrooms" className="block text-sm font-medium text-gray-700">
              Max Bedrooms
            </label>
            <NumberPicker
                id="maxBedrooms"
                name="maxBedrooms"
                value={criteria.maxBedrooms}
                onChange={(value) => handleChange('maxBedrooms', value)}
                min={0}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Date From */}
          <div className="space-y-2">
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">
              Date From
            </label>
            <DatePicker
                id="dateFrom"
                name="dateFrom"
                value={criteria.dateFrom}
                onChange={(value) => handleChange('dateFrom', value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Date To */}
          <div className="space-y-2">
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">
              Date To
            </label>
            <DatePicker
                id="dateTo"
                name="dateTo"
                value={criteria.dateTo}
                onChange={(value) => handleChange('dateTo', value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Postcode */}
          <div className="space-y-2">
            <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
              Postcode Area
            </label>
            <Combobox
                id="postcode"
                name="postcode"
                data={['BR1', 'NW1']} // Add real postcode data
                value={criteria.postcode}
                onChange={(value) => handleChange('postcode', value)}
                placeholder="Select or type postcode"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
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

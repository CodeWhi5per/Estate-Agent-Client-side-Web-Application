import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { DropdownList, NumberPicker, DatePicker, Combobox } from 'react-widgets';
import 'react-widgets/styles.css';
import { format } from 'date-fns';

// SearchForm component allows users to search for properties based on various criteria
export default function SearchForm({ onSearch }) {
  // State to hold the search criteria
  const [criteria, setCriteria] = useState({
    type: '', // Property type (e.g., House, Flat)
    minPrice: null, // Minimum price
    maxPrice: null, // Maximum price
    minBedrooms: null, // Minimum number of bedrooms
    maxBedrooms: null, // Maximum number of bedrooms
    dateFrom: null, // Start date for the search
    dateTo: null, // End date for the search
    postcode: '', // Postcode area
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSearch(criteria); // Call the onSearch function with the current criteria
  };

  // Handle changes to the form inputs
  const handleChange = (name, value) => {
    if (name === 'dateFrom' || name === 'dateTo') {
      value = value ? format(new Date(value), 'yyyy-MM-dd') : null; // Format date values
    }
    setCriteria((prev) => ({ ...prev, [name]: value })); // Update the criteria state
  };

  return (
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Property Type Dropdown */}
          <div className="space-y-2">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Property Type
            </label>
            <DropdownList
                id="type"
                name="type"
                data={['Any', 'House', 'Flat']} // Options for property type
                value={criteria.type} // Current value of the property type
                onChange={(value) => handleChange('type', value)} // Handle change in property type
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Minimum Price Picker */}
          <div className="space-y-2">
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
              Min Price
            </label>
            <NumberPicker
                id="minPrice"
                name="minPrice"
                value={criteria.minPrice} // Current value of the minimum price
                onChange={(value) => handleChange('minPrice', value)} // Handle change in minimum price
                min={0} // Minimum value for the picker
                step={1000} // Step value for the picker
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Maximum Price Picker */}
          <div className="space-y-2">
            <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
              Max Price
            </label>
            <NumberPicker
                id="maxPrice"
                name="maxPrice"
                value={criteria.maxPrice} // Current value of the maximum price
                onChange={(value) => handleChange('maxPrice', value)} // Handle change in maximum price
                min={0} // Minimum value for the picker
                step={1000} // Step value for the picker
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Minimum Bedrooms Picker */}
          <div className="space-y-2">
            <label htmlFor="minBedrooms" className="block text-sm font-medium text-gray-700">
              Min Bedrooms
            </label>
            <NumberPicker
                id="minBedrooms"
                name="minBedrooms"
                value={criteria.minBedrooms} // Current value of the minimum bedrooms
                onChange={(value) => handleChange('minBedrooms', value)} // Handle change in minimum bedrooms
                min={0} // Minimum value for the picker
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Maximum Bedrooms Picker */}
          <div className="space-y-2">
            <label htmlFor="maxBedrooms" className="block text-sm font-medium text-gray-700">
              Max Bedrooms
            </label>
            <NumberPicker
                id="maxBedrooms"
                name="maxBedrooms"
                value={criteria.maxBedrooms} // Current value of the maximum bedrooms
                onChange={(value) => handleChange('maxBedrooms', value)} // Handle change in maximum bedrooms
                min={0} // Minimum value for the picker
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Date From Picker */}
          <div className="space-y-2">
            <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700">
              Date From
            </label>
            <DatePicker
                id="dateFrom"
                name="dateFrom"
                value={criteria.dateFrom ? new Date(criteria.dateFrom) : null} // Current value of the start date
                onChange={(value) => handleChange('dateFrom', value)} // Handle change in start date
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Date To Picker */}
          <div className="space-y-2">
            <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700">
              Date To
            </label>
            <DatePicker
                id="dateTo"
                name="dateTo"
                value={criteria.dateTo ? new Date(criteria.dateTo) : null} // Current value of the end date
                onChange={(value) => handleChange('dateTo', value)} // Handle change in end date
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Postcode Area Combobox */}
          <div className="space-y-2">
            <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
              Postcode Area
            </label>
            <Combobox
                id="postcode"
                name="postcode"
                data={['BR1', 'NW1']} // Options for postcode area
                value={criteria.postcode} // Current value of the postcode area
                onChange={(value) => handleChange('postcode', value)} // Handle change in postcode area
                placeholder="Select or type postcode" // Placeholder text
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
            <Search className="w-5 h-5 mr-2" /> {/* Search icon */}
            Search Properties
          </button>
        </div>
      </form>
  );
}
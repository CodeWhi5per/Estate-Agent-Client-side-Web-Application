import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import PropertyMap from './PropertyMap.jsx';

export default function PropertyDetails({ property, isFavorite, onToggleFavorite }) {
  // State to track the current image index in the image gallery
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to store the selected image for the modal
  const [selectedImage, setSelectedImage] = useState(null);

  // Function to go to the next image in the gallery
  const nextImage = () => {
    setCurrentImageIndex((prev) =>
        prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  // Function to go to the previous image in the gallery
  const previousImage = () => {
    setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  // Function to format the price to GBP currency format
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
    }).format(price);
  };

  // Function to open the modal with the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-96">
            <img
                src={property.images[currentImageIndex]}
                alt={`Property image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => openModal(property.images[currentImageIndex])}
            />
            <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {property.images.map((_, index) => (
                  <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                  />
              ))}
            </div>
          </div>

          {/* Property Header */}
          <div className="p-6 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{property.title}</h1>
                <p className="mt-2 text-2xl font-semibold text-blue-600">
                  {formatPrice(property.price)}
                </p>
              </div>
              <button
                  onClick={onToggleFavorite}
                  className={`p-2 rounded-full ${
                      isFavorite ? 'text-red-500' : 'text-gray-400'
                  } hover:bg-gray-100`}
              >
                <Heart className="w-6 h-6" fill={isFavorite ? 'currentColor' : 'none'} />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-4 text-gray-600">
              <span>{property.bedrooms} bedrooms</span>
              <span>{property.type}</span>
              <span>{property.postcode}</span>
              <span>Added: {new Date(property.dateAdded).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Tabs for Description, Floor Plan, and Map */}
          <Tabs className="p-6">
            <TabList className="flex border-b">
              <Tab className="px-4 py-2 text-gray-600 cursor-pointer border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 hover:border-b-4 text-lg font-bold">
                DESCRIPTION
              </Tab>
              <Tab className="px-4 py-2 text-gray-600 cursor-pointer border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 hover:border-b-4 text-lg font-bold">
                FLOOR PLAN
              </Tab>
              <Tab className="px-4 py-2 text-gray-600 cursor-pointer border-b-2 border-transparent hover:text-blue-600 hover:border-blue-600 hover:border-b-4 text-lg font-bold">
                MAP
              </Tab>
            </TabList>

            <TabPanel>
              <div className="py-4">
                <p className="text-gray-700 leading-relaxed">{property.longDescription}</p>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="py-4">
                <img
                    src={property.floorPlan}
                    alt="Floor Plan"
                    className="max-w-full h-auto"
                />
              </div>
            </TabPanel>

            <TabPanel>
              <div className="py-4">
                <PropertyMap property={property} />
              </div>
            </TabPanel>
          </Tabs>
        </div>

        {/* Thumbnail Gallery */}
        <div className="mt-6 grid grid-cols-6 gap-4">
          {property.images.map((image, index) => (
              <button
                  key={index}
                  onClick={() => openModal(image)}
                  className={`relative rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                  }`}
              >
                <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-20 object-cover"
                />
              </button>
          ))}
        </div>

        {/* Image Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="relative bg-white rounded-lg overflow-hidden">
                <button
                    onClick={closeModal}
                    className="absolute top-2 right-2 bg-red-600 rounded-full w-12 h-12 flex items-center justify-center"
                >
                  <span className="text-4xl text-white">&times;</span>
                </button>
                <img src={selectedImage} alt="Selected" className="max-w-full max-h-screen"/>
              </div>
            </div>
        )}
      </div>
  );
}
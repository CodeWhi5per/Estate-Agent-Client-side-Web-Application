// Function to filter properties based on given criteria
export const filterProperties = (properties, criteria) => {
  // Use the filter method to iterate over each property and apply the criteria
  return properties.filter(property => {
    // Check if the property type matches the criteria type
    if (criteria.type && property.type !== criteria.type) {
      return false; // Exclude the property if the type does not match
    }

    // Check if the property price is greater than or equal to the minimum price
    if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) {
      return false; // Exclude the property if the price is less than the minimum price
    }

    // Check if the property price is less than or equal to the maximum price
    if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) {
      return false; // Exclude the property if the price is greater than the maximum price
    }

    // Check if the property has at least the minimum number of bedrooms
    if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) {
      return false; // Exclude the property if the number of bedrooms is less than the minimum
    }

    // Check if the property has at most the maximum number of bedrooms
    if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) {
      return false; // Exclude the property if the number of bedrooms is greater than the maximum
    }

    // Check if the property was added on or after the specified start date
    if (criteria.dateFrom && new Date(property.dateAdded) < new Date(criteria.dateFrom)) {
      return false; // Exclude the property if the date added is before the start date
    }

    // Check if the property was added on or before the specified end date
    if (criteria.dateTo && new Date(property.dateAdded) > new Date(criteria.dateTo)) {
      return false; // Exclude the property if the date added is after the end date
    }

    // Check if the property postcode starts with the specified postcode
    if (criteria.postcode && !property.postcode.toLowerCase().startsWith(criteria.postcode.toLowerCase())) {
      return false; // Exclude the property if the postcode does not match
    }

    // Include the property if all criteria are met
    return true;
  });
};
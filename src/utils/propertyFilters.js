export const filterProperties = (properties, criteria) => {
  return properties.filter(property => {
    if (criteria.type && property.type !== criteria.type) {
      return false;
    }

    if (criteria.minPrice && property.price < parseInt(criteria.minPrice)) {
      return false;
    }

    if (criteria.maxPrice && property.price > parseInt(criteria.maxPrice)) {
      return false;
    }

    if (criteria.minBedrooms && property.bedrooms < parseInt(criteria.minBedrooms)) {
      return false;
    }

    if (criteria.maxBedrooms && property.bedrooms > parseInt(criteria.maxBedrooms)) {
      return false;
    }

    if (criteria.dateFrom && new Date(property.dateAdded) < new Date(criteria.dateFrom)) {
      return false;
    }

    if (criteria.dateTo && new Date(property.dateAdded) > new Date(criteria.dateTo)) {
      return false;
    }

    if (criteria.postcode && !property.postcode.toLowerCase().startsWith(criteria.postcode.toLowerCase())) {
      return false;
    }

    return true;
  });
};

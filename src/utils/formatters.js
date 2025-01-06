// Function to format a price value as a currency string
export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency', // Format as currency
    currency: 'LKR', // Use Sri Lankan Rupee as the currency
  }).format(price); // Format the price value
};

// Function to format a date string into a more readable format
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-GB', {
    year: 'numeric', // Display the full year
    month: 'long', // Display the full month name
    day: 'numeric', // Display the day of the month
  });
};
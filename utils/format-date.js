const convertISOToDDMMYYYY = (dateString) => {
  // Check if the input is already in dd/mm/yyyy format using regular expression
  const ddmmyyyyRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (ddmmyyyyRegex.test(dateString)) {
    return dateString;
  }

  // Parse ISO 8601 date format
  const isoDate = new Date(dateString);

  // Check if the date is valid
  if (isNaN(isoDate.getTime())) {
    throw new Error('Invalid date format');
  }

  // Extract day, month, and year
  const day = String(isoDate.getDate()).padStart(2, '0');
  const month = String(isoDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = isoDate.getFullYear();

  // Return formatted date
  return `${day}/${month}/${year}`;
};

export { convertISOToDDMMYYYY };

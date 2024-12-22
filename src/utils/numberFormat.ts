export const formatCurrency = (value: string): string => {
  // Remove any non-digit characters except decimal point
  const cleanValue = value.replace(/[^\d.]/g, '');
  
  // Ensure only one decimal point
  const parts = cleanValue.split('.');
  const wholePart = parts[0];
  const decimalPart = parts.length > 1 ? '.' + parts[1].slice(0, 2) : '';

  // Add commas to the whole number part
  const formattedWholePart = wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return formattedWholePart + decimalPart;
};

export const unformatCurrency = (value: string): string => {
  return value.replace(/,/g, '');
};
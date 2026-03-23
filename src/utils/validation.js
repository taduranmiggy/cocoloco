// utils/validation.js - Form validation utilities

/**
 * Email validation
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email format
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Password validation
 * @param {string} password - Password to validate
 * @returns {object} { isValid, errors }
 */
export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }

  if (!/[A-Z]/.test(password)) {
    // Optional: require uppercase
    // errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[0-9]/.test(password)) {
    // Optional: require number
    // errors.push('Password must contain at least one number');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Mobile number validation (11 digits - Philippine format)
 * @param {string} mobile - Mobile number to validate
 * @returns {boolean} True if valid 11-digit number (e.g., 09XXXXXXXXX)
 */
export const validateMobileNumber = (mobile) => {
  const mobileRegex = /^\d{11}$/;
  return mobileRegex.test(mobile);
};

/**
 * Password confirmation validation
 * @param {string} password - Password
 * @param {string} confirmPassword - Confirmation password
 * @returns {boolean} True if passwords match
 */
export const validatePasswordMatch = (password, confirmPassword) => {
  return password === confirmPassword;
};

/**
 * Credit card validation (basic Luhn algorithm)
 * @param {string} cardNumber - Card number
 * @returns {boolean} True if valid card number
 */
export const validateCardNumber = (cardNumber) => {
  const sanitized = cardNumber.replace(/\D/g, '');

  if (sanitized.length < 13 || sanitized.length > 19) {
    return false;
  }

  // Luhn algorithm
  let sum = 0;
  let isEven = false;

  for (let i = sanitized.length - 1; i >= 0; i--) {
    let digit = parseInt(sanitized[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
};

/**
 * Expiry date validation
 * @param {string} expiry - Expiry date in MM/YY format
 * @returns {boolean} True if valid expiry date
 */
export const validateExpiryDate = (expiry) => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

  if (!expiryRegex.test(expiry)) {
    return false;
  }

  const [month, year] = expiry.split('/');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear() % 100;
  const currentMonth = currentDate.getMonth() + 1;

  const expiryYear = parseInt(year, 10);
  const expiryMonth = parseInt(month, 10);

  if (expiryYear < currentYear) {
    return false;
  }

  if (expiryYear === currentYear && expiryMonth < currentMonth) {
    return false;
  }

  return true;
};

/**
 * CVV validation
 * @param {string} cvv - CVV code
 * @returns {boolean} True if valid CVV
 */
export const validateCVV = (cvv) => {
  const cvvRegex = /^\d{3,4}$/;
  return cvvRegex.test(cvv);
};

/**
 * Full address validation
 * @param {string} address - Address to validate
 * @returns {boolean} True if address is not empty
 */
export const validateAddress = (address) => {
  return address && address.trim().length > 0;
};

/**
 * Full name validation
 * @param {string} name - Full name to validate
 * @returns {boolean} True if name is valid
 */
export const validateFullName = (name) => {
  return name && name.trim().length >= 2;
};

/**
 * Price validation
 * @param {number|string} price - Price to validate
 * @returns {boolean} True if valid positive price
 */
export const validatePrice = (price) => {
  const numPrice = parseFloat(price);
  return !isNaN(numPrice) && numPrice > 0;
};

/**
 * Quantity validation
 * @param {number|string} quantity - Quantity to validate
 * @returns {boolean} True if valid positive integer quantity
 */
export const validateQuantity = (quantity) => {
  const numQuantity = parseInt(quantity, 10);
  return !isNaN(numQuantity) && numQuantity > 0;
};

/**
 * URL validation
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Product name validation
 * @param {string} name - Product name to validate
 * @returns {boolean} True if valid product name
 */
export const validateProductName = (name) => {
  return name && name.trim().length >= 3 && name.trim().length <= 100;
};

export default {
  validateEmail,
  validatePassword,
  validateMobileNumber,
  validatePasswordMatch,
  validateCardNumber,
  validateExpiryDate,
  validateCVV,
  validateAddress,
  validateFullName,
  validatePrice,
  validateQuantity,
  validateURL,
  validateProductName,
};

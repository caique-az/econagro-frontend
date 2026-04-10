/**
 * Parses a price value into a float number.
 *
 * Handles both numeric values and Brazilian currency strings (e.g. "R$ 10,50").
 *
 * @param {string|number} price - The price to parse.
 * @returns {number} The parsed float value, or 0 if parsing fails.
 *
 * @example
 * parsePrice('R$ 10,50') // 10.5
 * parsePrice(10.5)       // 10.5
 */
export const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  return parseFloat(String(price).replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
};

/**
 * Formats a number as a Brazilian Real currency string.
 *
 * @param {number} value - The numeric value to format.
 * @returns {string} Formatted string, e.g. "R$ 10,50".
 *
 * @example
 * formatPrice(10.5) // "R$ 10,50"
 */
export const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

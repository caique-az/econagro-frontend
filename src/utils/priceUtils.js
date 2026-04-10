/**
 * Converte um preço (string ou número) para float.
 * Suporta formatos como "R$ 10,50" ou 10.50.
 */
export const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  return parseFloat(String(price).replace('R$', '').replace(/\./g, '').replace(',', '.').trim()) || 0;
};

/**
 * Formata um número para o padrão monetário BR: "R$ 10,50"
 */
export const formatPrice = (value) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

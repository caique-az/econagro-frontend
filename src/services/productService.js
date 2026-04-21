import api from './api';
import { FALLBACK_IMAGE_PRODUCT } from '../constants/images';

const productService = {
  /**
   * Fetches products from the API, optionally filtered by category.
   *
   * Normalises each product to ensure a consistent `id` field (from either
   * `product.id` or `product._id`) and resolves relative image URLs against
   * the API base URL.
   *
   * @param {string} [category] - Category name to filter by. Omit to fetch all.
   * @returns {Promise<Array>} Normalised product array.
   * @throws Will re-throw any network or API error.
   */
  async getProducts(category) {
    try {
      const endpoint = category
        ? `/products/category/${encodeURIComponent(category)}`
        : '/products';
      const response = await api.get(endpoint);

      let products = [];
      if (Array.isArray(response.data)) {
        products = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        products = response.data.data;
      }

      const apiBase = api.defaults.baseURL.replace(/\/api\/?$/, '');

      return products.map(product => {
        const id = product.id ?? product._id;
        const image = product.image && product.image.startsWith('http')
          ? product.image
          : product.image
            ? `${apiBase}${product.image}`
            : FALLBACK_IMAGE_PRODUCT;

        return { ...product, id, image };
      });
    } catch (error) {
      console.error('Erro no serviço de produtos:', error);
      throw error;
    }
  }
};

export default productService;

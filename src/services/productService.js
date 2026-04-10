import api from './api';

const FALLBACK_IMAGE = 'https://placehold.co/300x200?text=Imagem+não+encontrada';

const productService = {
  /**
   * Busca todos os produtos ou produtos de uma categoria específica
   * @param {string} [category] - Categoria opcional para filtrar
   * @returns {Promise<Array>} Lista de produtos formatada
   */
  async getProducts(category) {
    try {
      let response;
      if (category) {
        response = await api.get(`/products/category/${encodeURIComponent(category)}`);
      } else {
        response = await api.get('/products');
      }

      let products = [];
      if (response.data) {
        if (Array.isArray(response.data)) {
          products = response.data;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          products = response.data.data;
        } else {
          console.warn('Estrutura de dados inesperada:', response.data);
          products = [];
        }
      }

      // Normaliza URLs de imagem
      const apiBase = api.defaults.baseURL.replace(/\/api\/?$/, '');
      return products.map(product => {
        const fullImg = product.img && product.img.startsWith('http')
          ? product.img
          : product.img
            ? `${apiBase}${product.img}`
            : FALLBACK_IMAGE;
        
        return { ...product, img: fullImg };
      });
    } catch (error) {
      console.error('Erro no serviço de produtos:', error);
      throw error;
    }
  }
};

export default productService;

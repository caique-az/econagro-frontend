import api from "./api";
import { FALLBACK_IMAGE_PRODUCT } from "../constants/images";

const productService = {
  async getProducts({ category, search } = {}) {
    try {
      const endpoint = category
        ? `/products/category/${encodeURIComponent(category)}`
        : "/products";

      const params = new URLSearchParams();
      if (!category && search?.trim()) {
        params.set("search", search.trim());
      }

      const query = params.toString();
      const response = await api.get(query ? `${endpoint}?${query}` : endpoint);

      let products = [];
      if (Array.isArray(response.data)) {
        products = response.data;
      } else if (response.data?.data && Array.isArray(response.data.data)) {
        products = response.data.data;
      }

      const apiBase = api.defaults.baseURL.replace(/\/api\/?$/, "");

      const resolveImage = (image) => {
        if (!image) return FALLBACK_IMAGE_PRODUCT;
        if (image.startsWith("http")) return image;
        if (image.startsWith("/")) return `${apiBase}${image}`;
        return FALLBACK_IMAGE_PRODUCT;
      };

      return products.map((product) => {
        const id = product.id ?? product._id;
        const image = resolveImage(product.image);

        return { ...product, id, image };
      });
    } catch (error) {
      console.error("Erro no serviço de produtos:", error);
      throw error;
    }
  },
};

export default productService;

import api from "./api";
import { FALLBACK_IMAGE_CATEGORY } from "../constants/images";

const resolveImage = (image, apiBase) => {
  if (!image) return FALLBACK_IMAGE_CATEGORY;
  if (image.startsWith("http")) return image;
  if (image.startsWith("/")) return `${apiBase}${image}`;
  return FALLBACK_IMAGE_CATEGORY;
};

const categoryService = {
  async getCategories() {
    const response = await api.get("/categories");

    let categories = [];
    if (Array.isArray(response.data)) {
      categories = response.data;
    } else if (response.data?.data && Array.isArray(response.data.data)) {
      categories = response.data.data;
    }

    const apiBase = api.defaults.baseURL.replace(/\/api\/?$/, "");

    return categories.map((cat) => ({
      ...cat,
      id: cat.id ?? cat._id,
      image: resolveImage(cat.image, apiBase),
    }));
  },
};

export default categoryService;

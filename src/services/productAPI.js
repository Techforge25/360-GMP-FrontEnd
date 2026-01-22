import api from "@/lib/axios";

class ProductAPI {
  /**
   * Get all products
   */
  async getAll(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/products?${queryParams}` : "/products";

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get featured products
   */
  async getFeatured(limit = 3) {
    return await api.get({
      url: `/products/featured?limit=${limit}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get products sorted by price (highest first)
   */
  async getTopRanking(limit = 2) {
    return await api.get({
      url: `/products/top-ranking?limit=${limit}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get new products (recently created)
   */
  async getNewProducts(limit = 2) {
    return await api.get({
      url: `/products/new?limit=${limit}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get a single product by ID
   */
  async getById(productId) {
    return await api.get({
      url: `/products/${productId}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Create a new product
   */
  async create(productData) {
    return await api.post({
      url: "/products",
      payload: productData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Update an existing product
   */
  async update(productId, productData) {
    return await api.put({
      url: `/products/${productId}`,
      payload: productData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Delete a product
   */
  async delete(productId) {
    return await api.delete({
      url: `/products/${productId}`,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }
}

const productAPI = new ProductAPI();

export default productAPI;

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
  async getFeatured(limit = 6) {
    return await api.get({
      url: `/products?isFeatured=true&limit=${limit}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get products sorted by price (highest first)
   */
  async getTopRanking(limit = 4) {
    return await api.get({
      url: `/products?sortBy=pricePerUnit&order=desc&limit=${limit}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get new products (recently created)
   */
  async getNewProducts(limit = 4) {
    return await api.get({
      url: `/products?sortBy=createdAt&order=desc&limit=${limit}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
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

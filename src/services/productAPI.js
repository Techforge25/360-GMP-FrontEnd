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
  async getFeatured(limit = 10) {
    return await api.get({
      url: `/products/featured?limit=${limit}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get business-specific featured products (Shown on business profile)
   */
  async getBusinessFeaturedProducts(
    businessId,
    params = { page: 1, limit: 10 },
  ) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `/products/business/${businessId}?${queryParams}`
      : `/products/business/${businessId}`;

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get products sorted by price (highest first)
   */
  async getTopRanking(limit = 8) {
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
  async getNewProducts(limit = 8) {
    return await api.get({
      url: `/products/new?limit=${limit}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get flash deals (Top-deals products)
   */
  async getFlashDeals(limit = 4) {
    return await api.get({
      url: `/products/top-deals?limit=${limit}`,
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

  /**
   * Get my products (for business dashboard)
   */
  async getMyProducts(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `/business-profile-management/my-products?${queryParams}`
      : "/business-profile-management/my-products";

    return await api.get({
      url,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get filtered products by inventory status
   */
  async getInStockProducts(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `/business-profile-management/in-stock-products?${queryParams}`
      : "/business-profile-management/in-stock-products";

    return await api.get({
      url,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  async getLowStockProducts(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `/business-profile-management/low-stock-products?${queryParams}`
      : "/business-profile-management/low-stock-products";

    return await api.get({
      url,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  async getOutOfStockProducts(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `/business-profile-management/out-of-stock-products?${queryParams}`
      : "/business-profile-management/out-of-stock-products";

    return await api.get({
      url,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }
}

const productAPI = new ProductAPI();

export default productAPI;

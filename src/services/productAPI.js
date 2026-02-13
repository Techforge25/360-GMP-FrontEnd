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

  /**
   * Get recently viewed products (Mocked for UI development)
   */
//   async getRecentlyViewed(limit = 4) {
//     // Simulating API response delay
//     await new Promise((resolve) => setTimeout(resolve, 500));

//     const mockProducts = [
//       {
//         _id: "65c123abc456def789000001",
//         title: "Precision Disc Brake System",
//         detail: "Precision milling and turning of complex geometries ..",
//         stockQty: 145,
//         minOrderQty: 300,
//         pricePerUnit: 1256,
//         image:
//           "https://res.cloudinary.com/dzt6v3z7v/image/upload/v1739431800/brake_system.png",
//       },
//       {
//         _id: "65c123abc456def789000002",
//         title: "IoT-Enabled Temperature Sensor Module",
//         detail: "Precision milling and turning of complex geometries...",
//         stockQty: 14,
//         minOrderQty: 200,
//         pricePerUnit: 230,
//         image:
//           "https://res.cloudinary.com/dzt6v3z7v/image/upload/v1739431801/sensor_module.png",
//       },
//       {
//         _id: "65c123abc456def789000003",
//         title: "Heavy-Duty Pallet Jack (Hydraulic)",
//         detail:
//           "Ergonomic, 5,500 lb capacity hydraulic pallet truck for warehouse..",
//         stockQty: 100,
//         minOrderQty: 100,
//         pricePerUnit: 980,
//         image:
//           "https://res.cloudinary.com/dzt6v3z7v/image/upload/v1739431802/pallet_jack.png",
//       },
//       {
//         _id: "65c123abc456def789000004",
//         title: "Precision CNC Machined Aluminum Enclosure",
//         detail:
//           "High-tolerance, corrosion-resistant housing for industrial sensors.",
//         stockQty: 145,
//         minOrderQty: 300,
//         pricePerUnit: 1256,
//         image:
//           "https://res.cloudinary.com/dzt6v3z7v/image/upload/v1739431803/cnc_enclosure.png",
//       },
//     ];

//     return {
//       success: true,
//       data: mockProducts.slice(0, limit),
//     };
//   }
}

const productAPI = new ProductAPI();

export default productAPI;

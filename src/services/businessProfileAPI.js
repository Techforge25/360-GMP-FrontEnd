import api from "@/lib/axios";

class BusinessProfileAPI {
  /**
   * Get all business profiles
   */
  /**
   * Get all business profiles
   */
  async getAll(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `/businessProfile?${queryParams}`
      : "/businessProfile";

    return await api.get({
      url,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get a single business profile by ID
   */
  async getById(businessId) {
    return await api.get({
      url: `/businessProfile/${businessId}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get the current user's business profile
   */
  async getMyProfile() {
    return await api.get({
      url: "/businessProfile/me",
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Create a new business profile
   */
  async create(profileData) {
    return await api.post({
      url: "/businessProfile",
      payload: profileData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Update an existing business profile
   */
  async update(businessId, profileData) {
    return await api.put({
      url: `/businessProfile/${businessId}`,
      payload: profileData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Update the current user's business profile
   */
  async updateMyProfile(profileData) {
    return await api.put({
      url: "/businessProfile",
      payload: profileData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Delete a business profile
   */
  async delete(businessId) {
    return await api.delete({
      url: `/businessProfile/${businessId}`,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Get view counts
   */
  async getViewCounts() {
    return await api.get({
      url: "/business-profile-management/view-counts",
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get new leads count
   */
  async getNewLeads(range = "7d") {
    return await api.get({
      url: `/business-profile-management/new-leads?range=${range}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get conversion rate
   */
  async getConversionRate(range = "7d") {
    return await api.get({
      url: `/business-profile-management/count-conversion-rate?range=${range}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get low stock products
   */
  async getLowStockProducts(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `/business-profile-management/low-stock-products?${queryParams}`
      : "/business-profile-management/low-stock-products";

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get recent job applicants
   */
  async getRecentJobApplications() {
    return await api.get({
      url: "/business-profile-management/recent-job-applicants",
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Update business contact info
   */
  async updateContactInfo(data) {
    return await api.patch({
      url: "/business-profile-management/contact-info",
      payload: data,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * View a business profile (tracks views and returns complete profile data)
   */
  async viewBusinessProfile(businessProfileId) {
    return await api.get({
      url: `/business-profile-management/view/${businessProfileId}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }
}

const businessProfileAPI = new BusinessProfileAPI();

export default businessProfileAPI;

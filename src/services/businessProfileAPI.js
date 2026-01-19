import api from "@/lib/axios";

class BusinessProfileAPI {
  /**
   * Get all business profiles
   */
  async getAll() {
    return await api.get({
      url: "/businessProfile",
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
}

const businessProfileAPI = new BusinessProfileAPI();

export default businessProfileAPI;

import api from "@/lib/axios";

class CommunityAPI {
  /**
   * Get all communities with filtering
   */
  async getAll(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/community?${queryParams}` : "/community";

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get a single community by ID
   */
  async getById(communityId) {
    return await api.get({
      url: `/community/${communityId}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }
}

const communityAPI = new CommunityAPI();

export default communityAPI;

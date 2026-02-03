import api from "@/lib/axios";

class UserProfileAPI {
  /**
   * Get the current user's profile
   */
  async getMyProfile() {
    return await api.get({
      url: "/userProfile/view",
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Create a new user profile
   */
  async create(profileData) {
    return await api.post({
      url: "/userProfile",
      payload: profileData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Update the current user's profile
   */
  async updateMyProfile(profileData) {
    return await api.put({
      url: "/userProfile",
      payload: profileData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Get user analytics
   */
  async getAnalytics(range = "7d") {
    return await api.get({
      url: `/userProfile/analytics?range=${range}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get a user profile by ID
   */
  async getById(userId) {
    return await api.get({
      url: `/userProfile/${userId}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Delete user profile
   */
  async delete() {
    return await api.delete({
      url: "/userProfile",
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }
}

const userProfileAPI = new UserProfileAPI();

export default userProfileAPI;
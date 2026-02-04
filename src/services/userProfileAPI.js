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
   * Update user profile basic info (fullName, bio)
   */
  async updateBasicInfo(basicData) {
    return await api.patch({
      url: "/userProfile/update/basic-info",
      payload: basicData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Update user profile contact info (email, phone, location)
   */
  async updateContactInfo(contactData) {
    return await api.patch({
      url: "/userProfile/update/contact-info",
      payload: contactData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Update user profile logo/avatar
   */
  async updateLogo(logoData) {
    return await api.patch({
      url: "/userProfile/logo",
      payload: logoData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Update user profile resume
   */
  async updateResume(resumeData) {
    return await api.patch({
      url: "/userProfile/update/resume",
      payload: resumeData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Update user profile education
   */
  async updateEducation(educationData) {
    return await api.patch({
      url: "/userProfile/update/education",
      payload: educationData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Update the current user's profile (legacy method)
   */
  async updateMyProfile(profileData) {
    return await api.patch({
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
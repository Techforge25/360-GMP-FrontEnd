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
      url: "/userProfile/update/logo",
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
   * Update user profile banner
   */
  async updateBanner(bannerData) {
    return await api.patch({
      url: "/userProfile/update/banner",
      payload: bannerData,
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
   * Update job preferences
   */
  async updateJobPreferences(jobPreferencesData) {
    return await api.patch({
      url: "/userProfile/update/job-preferences",
      payload: jobPreferencesData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Create a new social link for user profile
   * POST /userProfile/social
   */
  async createSocialLink(socialLinkData) {
    return await api.post({
      url: "/userProfile/social",
      payload: socialLinkData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Get all social links for user profile
   * GET /userProfile/social
   */
  async getSocialLinks() {
    return await api.get({
      url: "/userProfile/social",
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Update a social link for user profile
   * PATCH /userProfile/social/socialId
   */
  async updateSocialLink(socialId, socialLinkData) {
    return await api.patch({
      url: `/userProfile/social/${socialId}`,
      payload: socialLinkData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Delete a social link for user profile
   * DELETE /userProfile/social/socialId
   */
  async deleteSocialLink(socialId) {
    return await api.delete({
      url: `/userProfile/social/${socialId}`,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Get job matches based on user preferences
   * GET /userProfile/job-matches
   */
  async getJobMatches(page = 1, limit = 10) {
    return await api.get({
      url: `/userProfile/job-matches?page=${page}&limit=${limit}`,
      activateLoader: false,
      enableSuccessMessage: false,
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
   * Generate and download resume PDF
   */
  async generateResume() {
    return await api.get({
      url: "/userProfile/generate-resume",
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
      responseType: "blob", // Important for file download
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

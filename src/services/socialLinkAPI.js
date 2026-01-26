import api from "@/lib/axios";

class SocialLinkAPI {
  /**
   * Create a new social link
   */
  async create(data) {
    return await api.post({
      url: "/socialLinks",
      payload: data,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Get social links for a business profile
   */
  async getByBusinessProfileId(businessProfileId) {
    return await api.get({
      url: `/socialLinks/${businessProfileId}`,
      activateLoader: false, // Don't block UI for initial fetch
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Remove a social link
   */
  async delete(socialLinkId) {
    return await api.delete({
      url: `/socialLinks/${socialLinkId}`,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }
}

const socialLinkAPI = new SocialLinkAPI();

export default socialLinkAPI;

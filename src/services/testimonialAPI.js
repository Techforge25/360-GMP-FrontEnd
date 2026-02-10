import api from "@/lib/axios";

class TestimonialAPI {
  /**
   * Check if an invite token is valid
   * @param {string} inviteToken
   */
  async checkInviteToken(inviteToken) {
    return await api.get({
      url: `/testimonials/invite/${inviteToken}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Create a new testimonial
   * @param {string} inviteToken
   * @param {object} data - { rating, title, description }
   */
  async createTestimonial(inviteToken, data) {
    return await api.post({
      url: `/testimonials/invite/${inviteToken}`,
      payload: data,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }
}

const testimonialAPI = new TestimonialAPI();

export default testimonialAPI;

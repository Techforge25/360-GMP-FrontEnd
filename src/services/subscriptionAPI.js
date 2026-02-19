import api from "@/lib/axios";

// Helper function to get business profile ID
const getBusinessProfileId = async () => {
  try {
    const response = await api.get({
      url: `/businessProfile/me`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
    return response?.data?._id || null;
  } catch (error) {
    console.error("Failed to fetch business profile ID:", error);
    return null;
  }
};

class SubscriptionAPI {
  /**
   * Create Stripe checkout session for subscription
   * @param {string} planId - The plan ID from backend
   * @param {string} profile - User profile (business or user)
   */
  async createStripeCheckout(
    planId,
    profile = "business",
    successUrl,
    cancelUrl,
  ) {
    // Sending params in both URL and Body to ensure backend finds them
    // Also sending success/cancel URLs in query param as a fallback
    const queryParams = new URLSearchParams({
      planId,
      profile,
      success_url: successUrl,
      cancel_url: cancelUrl,
    }).toString();

    return await api.post({
      url: `/subscription/stripe/create?${queryParams}`,
      payload: {
        planId: planId,
        profile: profile,
        successUrl: successUrl,
        cancelUrl: cancelUrl,
        success_url: successUrl,
        cancel_url: cancelUrl,
      },
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Cancel subscription
   * @param {string} subscriptionId - The subscription ID
   */
  async cancelSubscription(subscriptionId) {
    return await api.post({
      url: `/subscription/${subscriptionId}/cancel`,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Verify Stripe payment success
   * @param {string} sessionId - Stripe session ID
   */
  async verifyStripePayment(sessionId) {
    return await api.get({
      url: `/subscription/stripe/success?session_id=${sessionId}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get current user subscription
   */
  async getMySubscription() {
    return await api.get({
      url: `/subscription`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Check subscription status for a specific plan
   * @param {string} planId - The plan ID from backend
   */
  async checkSubscriptionStatus(planId) {
    return await api.get({
      url: `/subscription/status/${planId}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get total spent on subscriptions
   */
  async getTotalSpent() {
    return await api.get({
      url: `/subscription/total-spent`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get business usage limits/counts
   * @param {string} businessId - Optional business profile ID, will auto-fetch if not provided
   */
  async getBusinessUsage(businessId = null) {
    try {
      // Auto-fetch businessId if not provided
      const finalBusinessId = businessId || (await getBusinessProfileId());

      if (!finalBusinessId) {
        console.log("No business profile found for user");
        return { communities: 0, jobs: 0, products: 0 };
      }

      console.log("Fetching business usage for businessId:", finalBusinessId);

      const [communitiesResponse, jobsResponse, productsResponse] =
        await Promise.all([
          api.get({
            url: `/community?businessId=${finalBusinessId}`,
            activateLoader: false,
            enableSuccessMessage: false,
            enableErrorMessage: false,
          }),
          api.get({
            url: `/jobs?businessId=${finalBusinessId}`,
            activateLoader: false,
            enableSuccessMessage: false,
            enableErrorMessage: false,
          }),
          api.get({
            url: `/products/business/${finalBusinessId}`,
            activateLoader: false,
            enableSuccessMessage: false,
            enableErrorMessage: false,
          }),
        ]);

      const usage = {
        communities: communitiesResponse?.data?.totalDocs || 0,
        jobs: jobsResponse?.data?.totalDocs || 0,
        products: productsResponse?.data?.totalDocs || 0,
      };

      console.log("Business usage fetched:", usage);
      return usage;
    } catch (error) {
      console.error("Failed to fetch business usage:", error);
      return {
        communities: 0,
        jobs: 0,
        products: 0,
      };
    }
  }

  /**
   * Store subscription data in localStorage
   * @param {object} subscriptionData - Subscription data from backend
   */
  storeSubscription(subscriptionData) {
    if (typeof window !== "undefined") {
      localStorage.setItem("subscription", JSON.stringify(subscriptionData));

      // Also update user object if it exists
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          user.subscription = subscriptionData;
          localStorage.setItem("user", JSON.stringify(user));
        } catch (e) {
          console.error("Failed to update user subscription:", e);
        }
      }
    }
  }

  /**
   * Get subscription from localStorage
   */
  getStoredSubscription() {
    if (typeof window !== "undefined") {
      const subStr = localStorage.getItem("subscription");
      if (subStr) {
        try {
          return JSON.parse(subStr);
        } catch (e) {
          console.error("Failed to parse subscription:", e);
          return null;
        }
      }
    }
    return null;
  }

  /**
   * Clear subscription from localStorage
   */
  clearSubscription() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("subscription");

      // Also remove from user object
      const userStr = localStorage.getItem("user");
      if (userStr) {
        try {
          const user = JSON.parse(userStr);
          delete user.subscription;
          localStorage.setItem("user", JSON.stringify(user));
        } catch (e) {
          console.error("Failed to clear user subscription:", e);
        }
      }
    }
  }
}

const subscriptionAPI = new SubscriptionAPI();

export default subscriptionAPI;

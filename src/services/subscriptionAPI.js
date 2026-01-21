import api from "@/lib/axios";

class SubscriptionAPI {
  /**
   * Create Stripe checkout session for subscription
   * @param {string} planId - The plan ID from backend
   * @param {string} role - User role (business or user)
   */
  async createStripeCheckout(planId, role = "business", successUrl, cancelUrl) {
    // Sending params in both URL and Body to ensure backend finds them
    // Also sending success/cancel URLs in query param as a fallback
    const queryParams = new URLSearchParams({
      planId,
      role,
      success_url: successUrl,
      cancel_url: cancelUrl,
    }).toString();

    return await api.post({
      url: `/subscription/stripe/create?${queryParams}`,
      payload: {
        planId: planId,
        role: role,
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

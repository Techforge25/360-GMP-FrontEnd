import api from "@/lib/axios";

class UserSearchAPI {
  /**
   * Create a new user search entry
   * @param {string} searchedContent
   */
  async createUserSearch(searchedContent) {
    return await api.post({
      url: "/userSearches",
      payload: { searchedContent },
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Fetch searches for the current logged-in user
   * @param {Object} params - Pagination params { page, limit }
   */
  async fetchMySearches(params = { page: 1, limit: 10 }) {
    const queryParams = new URLSearchParams(params).toString();
    const url = `/userSearches/my?${queryParams}`;

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Fetch searches for a specific user (admin/owner use case)
   * @param {string} userId
   * @param {Object} params - Pagination params { page, limit }
   */
  async fetchUserSearches(userId, params = { page: 1, limit: 10 }) {
    const queryParams = new URLSearchParams(params).toString();
    const url = `/userSearches/user/${userId}?${queryParams}`;

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }
}

const userSearchAPI = new UserSearchAPI();

export default userSearchAPI;

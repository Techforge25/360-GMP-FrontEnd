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

  /**
   * Create a new community
   */
  async create(communityData) {
    return await api.post({
      url: "/community",
      payload: communityData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Join a community
   */
  async join(communityId) {
    return await api.post({
      url: `/community/${communityId}/join`,
      payload: {},
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Get community members
   */
  async getMembers(communityId, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `/community/${communityId}/members?${queryParams}`
      : `/community/${communityId}/members`;

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get pending join requests (for private/featured communities)
   */
  async getPendingRequests(communityId, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams
      ? `/community/${communityId}/pending-requests?${queryParams}`
      : `/community/${communityId}/pending-requests`;

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Approve or reject membership request
   */
  async approveMembership(communityId, userProfileId, status) {
    return await api.post({
      url: `/community/${communityId}/approve-membership`,
      payload: { userProfileId, status },
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Get suggested communities based on user search history
   */
  async getSuggestedCommunities() {
    return await api.get({
      url: "/community/suggestions/show",
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get communities owned by a specific business
   */
  async getOwnedCommunities(businessId) {
    return await api.get({
      url: `/community?businessId=${businessId}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }
  /**
   * Remove a member from the community
   */
  async removeMember(communityId, memberId) {
    return await api.delete({
      url: `/community-membership/${communityId}/members/${memberId}/remove`,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Update a member's role (e.g. make admin)
   */
  async updateMemberRole(communityId, memberId, role) {
    return await api.patch({
      url: `/community/${communityId}/members/${memberId}`,
      payload: { role },
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }
  /**
   * Get all communities the user is a member of (including business profiles)
   */
  async getMyCommunities() {
    return await api.get({
      url: "/my-communities/show",
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }
}

const communityAPI = new CommunityAPI();

export default communityAPI;

import api from "@/lib/axios";

class PostsAPI {
  /**
   * Get all posts
   */
  async getAllPosts(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/community-posts?${queryParams}` : "/community-posts";

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: false,
    });
  }

  /**
   * Get posts for a specific community
   */
  async getCommunityPosts(communityId, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams 
      ? `/community-posts/community/${communityId}?${queryParams}` 
      : `/community-posts/community/${communityId}`;

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get a single post by ID
   */
  async getPostById(postId) {
    return await api.get({
      url: `/community-posts/${postId}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Create a new post
   */
  async createPost(postData) {
    return await api.post({
      url: "/community-posts",
      payload: postData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Update a post
   */
  async updatePost(postId, postData) {
    console.log("postsAPI.updatePost called with:", { postId, postData });
    
    return await api.put({
      url: `/community-posts/${postId}`,
      payload: postData, // Don't include postId in body for update
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Delete a post
   */
  async deletePost(postId) {
    console.log("postsAPI.deletePost called with:", { postId });
    
    return await api.delete({
      url: `/community-posts/${postId}`,
      // Don't include payload for delete operations
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Like/Unlike a post
   */
  async likePost(postId) {
    console.log("postsAPI.likePost called with:", { postId });
    
    try {
      return await api.post({
        url: `/community-posts/${postId}/like`,
        payload: { 
          postId // Include postId in body for validation
        },
        activateLoader: false,
        enableSuccessMessage: false,
        enableErrorMessage: true,
      });
    } catch (error) {
      console.error("Error in likePost API:", error);
      throw error;
    }
  }

  /**
   * Add comment to a post
   */
  async addComment(postId, content) {
    console.log("postsAPI.addComment called with:", { postId, content });
    
    return await api.post({
      url: `/community-posts/${postId}/comment`,
      payload: { 
        content,
        postId // Send postId in body as fallback
      },
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Get comments for a post
   */
  async getPostComments(postId, params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams 
      ? `/community-posts/${postId}/comments?${queryParams}` 
      : `/community-posts/${postId}/comments`;

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }
}

const postsAPI = new PostsAPI();

export default postsAPI;
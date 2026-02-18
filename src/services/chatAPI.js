import api from "@/lib/axios";

class ChatAPI {
  /**
   * Send a private message
   * POST /chats/private-message
   */
  async sendPrivateMessage(payload) {
    return await api.post({
      url: "/chats/private-message",
      payload,
      activateLoader: false, // seamless experience
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Fetch private messages between two users
   * GET /chats/private-message?senderId=...&receiverId=...
   */
  async fetchPrivateMessages(senderId, receiverId) {
    if (!senderId || !receiverId) return null;
    return await api.get({
      url: `/chats/private-message?senderId=${senderId}&receiverId=${receiverId}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Fetch my conversations list
   * GET /chats/my-conversations?filter=...
   */
  async fetchMyConversations(filter = "") {
    let url = "/chats/my-conversations";
    if (filter) {
      url += `?filter=${filter}`;
    }

    return await api.get({
      url,
      activateLoader: true, // loading state for list is fine
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }
}

const chatAPI = new ChatAPI();
export default chatAPI;

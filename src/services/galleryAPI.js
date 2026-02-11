import api from "@/lib/axios";

class GalleryAPI {
  /**
   * Upload a new album with images
   *Endpoint: POST /gallery/upload-album
   */
  async uploadAlbum(data) {
    // data should be a JSON object containing albumName, description, and images (URLs)
    return await api.post({
      url: "/gallery/album",
      payload: data,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Fetch albums for a specific business profile
   * Endpoint: GET /gallery/albums/:businessProfileId
   */
  async fetchAlbums(businessProfileId, page = 1, limit = 10) {
    return await api.get({
      url: `/gallery/albums/${businessProfileId}?page=${page}&limit=${limit}`,
      activateLoader: false, // Don't block UI for fetching list
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * View a specific album
   * Endpoint: GET /gallery/album/:albumId
   */
  async viewAlbum(albumId) {
    return await api.get({
      url: `/gallery/album/${albumId}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Delete an album
   * Endpoint: DELETE /gallery/album/:albumId
   */
  async deleteAlbum(albumId) {
    return await api.delete({
      url: `/gallery/album/${albumId}`,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }
}

const galleryAPI = new GalleryAPI();

export default galleryAPI;

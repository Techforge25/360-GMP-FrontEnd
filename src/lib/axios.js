import axios from "axios";
import { backendURL } from "../constants";
import {
  startLoading,
  startSaving,
  stopLoading,
  stopSaving,
} from "../utils/loadingManager";
import { showSuccess, showError } from "../utils/toasterMessage";

// Create instance
const client = axios.create({
  baseURL: `${backendURL}`,
  withCredentials: true,
  timeout: 0,
});

// Request interceptor
client.interceptors.request.use(
  async (request) => {
    try {
      // Manual token injection fallback
      if (typeof window !== "undefined") {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          const token = user?.token || user?.accessToken;
          const userKeys = Object.keys(user || {});
          if (token) {
            request.headers.Authorization = `Bearer ${token}`;
            console.log(
              `📡 Axios Request: ${request.method?.toUpperCase()} ${request.url} [Auth Attached: Yes]`,
            );
          } else {
            console.warn(
              `📡 Axios Request: ${request.method?.toUpperCase()} ${request.url} [Auth Attached: No]`,
              {
                hasUser: !!user,
                userKeys,
                tokenType: typeof token,
                tokenValue:
                  token === null
                    ? "null"
                    : token === ""
                      ? "empty string"
                      : "undefined",
              },
            );
          }
        }
      }
    } catch (e) {
      console.error("Token injection error", e);
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
client.interceptors.response.use(
  (response) => {
    // For blob responses, return the response as-is
    if (response.config.responseType === "blob") {
      return response;
    }

    const headers = response.headers;
    return { ...response.data, headers };
  },
  (error) => {
    const data = error?.response?.data || null;
    const success = data?.success || false;
    const message = data?.message || error.message || "An unknown error occur";
    const statusCode = error?.response?.status || null;
    const stack = error?.stack || null;
    return Promise.reject({ data, message, success, statusCode, stack });
  },
);

// Blue Print For API Request Service Providers
class ApiRequest {
  // Get request
  async get({
    url,
    activateLoader = true,
    enableSuccessMessage = false,
    enableErrorMessage = true,
    responseType = "json",
  }) {
    if (activateLoader) startLoading();
    try {
      const options = responseType !== "json" ? { responseType } : {};
      const response = await client.get(url, options);

      // For blob responses, return the raw data
      if (responseType === "blob") {
        return response.data;
      }

      if (enableSuccessMessage) showSuccess(response.message);
      return response;
    } catch (error) {
      if (enableErrorMessage) showError(error.message);
      throw error;
    } finally {
      stopLoading();
    }
  }

  // Post request
  async post({
    url,
    payload,
    fileAttachment = false,
    activateLoader = true,
    enableSuccessMessage = true,
    enableErrorMessage = true,
  }) {
    if (activateLoader) startSaving();
    try {
      let options = {};
      if (fileAttachment)
        options = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await client.post(url, payload, options);
      if (enableSuccessMessage) showSuccess(response.message);
      return response;
    } catch (error) {
      if (enableErrorMessage) showError(error.message);
      throw error;
    } finally {
      stopSaving();
    }
  }

  // Put request
  async put({
    url,
    payload,
    fileAttachment = false,
    activateLoader = true,
    enableSuccessMessage = true,
    enableErrorMessage = true,
  }) {
    if (activateLoader) startSaving();
    try {
      let options = {};
      if (fileAttachment)
        options = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await client.put(url, payload, options);
      if (enableSuccessMessage) showSuccess(response.message);
      return response;
    } catch (error) {
      if (enableErrorMessage) showError(error.message);
      throw error;
    } finally {
      stopSaving();
    }
  }

  // Patch request
  async patch({
    url,
    payload,
    fileAttachment = false,
    activateLoader = true,
    enableSuccessMessage = true,
    enableErrorMessage = true,
  }) {
    if (activateLoader) startSaving();
    try {
      let options = {};
      if (fileAttachment)
        options = { headers: { "Content-Type": "multipart/form-data" } };
      const response = await client.patch(url, payload, options);
      if (enableSuccessMessage) showSuccess(response.message);
      return response;
    } catch (error) {
      if (enableErrorMessage) showError(error.message);
      throw error;
    } finally {
      stopSaving();
    }
  }

  // Delete request
  async delete({
    url,
    activateLoader = true,
    enableSuccessMessage = true,
    enableErrorMessage = true,
  }) {
    if (activateLoader) startSaving();
    try {
      const response = await client.delete(url);
      if (enableSuccessMessage) showSuccess(response.message);
      return response;
    } catch (error) {
      if (enableErrorMessage) showError(error.message);
      throw error;
    } finally {
      stopSaving();
    }
  }
}

// Instance
const api = new ApiRequest();

export default api;

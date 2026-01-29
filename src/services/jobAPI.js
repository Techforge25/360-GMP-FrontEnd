import api from "@/lib/axios";

class JobAPI {
  /**
   * Get all jobs
   */
  async getAll(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams ? `/jobs?${queryParams}` : "/jobs";

    return await api.get({
      url,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Create a new job
   */
  async create(jobData) {
    return await api.post({
      url: "/jobs",
      payload: jobData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Get latest jobs
   * @param {number} limit - Number of jobs to fetch
   */
  async getLatestJobs(limit = 4) {
    return await api.get({
      url: `/jobs?page=1&limit=${limit}`,
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get a single job by ID
   */
  async getById(jobId) {
    return await api.get({
      url: `/jobs/${jobId}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Apply for a job
   */
  async apply(jobId, data) {
    return await api.post({
      url: `/jobApplication/${jobId}`,
      payload: data,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Get my job applications
   */
  async getMyApplications(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return await api.get({
      url: `/jobs/user/applied${queryParams ? `?${queryParams}` : ""}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Get my hired jobs
   */
  async getMyHiredJobs(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    return await api.get({
      url: `/jobs/user/hired${queryParams ? `?${queryParams}` : ""}`,
      activateLoader: true,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }
}

const jobAPI = new JobAPI();

export default jobAPI;

import api from "@/lib/axios";

class WorkExperienceAPI {
  /**
   * Create a new work experience
   */
  async create(workExperienceData) {
    return await api.post({
      url: "/userProfile/work-experience",
      payload: workExperienceData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Get all work experiences for the current user
   */
  async getMyWorkExperiences() {
    return await api.get({
      url: "/userProfile/work-experience",
      activateLoader: false,
      enableSuccessMessage: false,
      enableErrorMessage: true,
    });
  }

  /**
   * Update a work experience
   */
  async update(workExperienceId, workExperienceData) {
    return await api.put({
      url: `/userProfile/work-experience/${workExperienceId}`,
      payload: workExperienceData,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }

  /**
   * Delete a work experience
   */
  async delete(workExperienceId) {
    return await api.delete({
      url: `/userProfile/work-experience/${workExperienceId}`,
      activateLoader: true,
      enableSuccessMessage: true,
      enableErrorMessage: true,
    });
  }
}

const workExperienceAPI = new WorkExperienceAPI();

export default workExperienceAPI;
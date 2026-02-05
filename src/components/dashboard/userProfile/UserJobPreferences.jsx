"use client";
import React, { useState, useEffect } from "react";
import { FiEdit2 } from "react-icons/fi";
import userProfileAPI from "@/services/userProfileAPI";
import JobPreferencesModal from "./JobPreferencesModal";

const UserJobPreferences = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showJobPreferencesModal, setShowJobPreferencesModal] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setIsLoading(true);
      const response = await userProfileAPI.getMyProfile();
      if (response?.data) {
        setProfileData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditJobPreferences = () => {
    setShowJobPreferencesModal(true);
  };

  const handleSaveJobPreferences = async (jobPreferencesData) => {
    try {
      const response = await userProfileAPI.updateJobPreferences(jobPreferencesData);
      if (response?.data) {
        setProfileData(response.data);
      }
      setShowJobPreferencesModal(false);
    } catch (error) {
      console.error('Failed to save job preferences:', error);
      throw error;
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-purple-100/50 flex items-center justify-center text-purple-600">
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 6V4h-4v2h4zM4 8v11h16V8H4zm16-2c1.11 0 2 .89 2 2v11c0 1.11-.89 2-2 2H4c-1.11 0-2-.89-2-2V8c0-1.11.89-2 2-2h6V4c0-1.11.89-2 2-2h4c1.11 0 2 .89 2 2v2h6z"/>
              </svg>
            </span>
            Jobs Preferences
          </h2>
          <button 
            onClick={handleEditJobPreferences}
            className="text-gray-400 hover:text-blue-500 p-1.5 bg-gray-50 rounded-md transition-colors"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
        </div>

        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="flex gap-2">
                <div className="h-7 bg-gray-200 rounded w-20"></div>
                <div className="h-7 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Title Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Title</h3>
              <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
                <p className="text-sm sm:text-base text-gray-900 font-medium">
                  {profileData?.title || "Not specified"}
                </p>
              </div>
            </div>

            {/* Employment Type Section */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Employment Type</h3>
              <div className="flex flex-wrap gap-2">
                {profileData?.employmentType && profileData.employmentType.length > 0 ? (
                  profileData.employmentType.map((type, index) => (
                    <span
                      key={index}
                      className="bg-[#240457] text-white text-sm px-3 py-1.5 rounded-lg font-medium"
                    >
                      {type}
                    </span>
                  ))
                ) : (
                  <span className="bg-gray-100 text-gray-500 text-sm px-3 py-1.5 rounded-lg font-medium">
                    Not specified
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Job Preferences Modal */}
      {showJobPreferencesModal && (
        <JobPreferencesModal
          isOpen={showJobPreferencesModal}
          onClose={() => setShowJobPreferencesModal(false)}
          onSave={handleSaveJobPreferences}
          currentPreferences={profileData}
        />
      )}
    </>
  );
};

export default UserJobPreferences;
"use client";
import React, { useState, useEffect } from "react";
import { FiEdit2, FiPlus } from "react-icons/fi";
import userProfileAPI from "@/services/userProfileAPI";
import EducationModal from "./EducationModal";

const UserEducation = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);

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

  const handleAddEducation = () => {
    setEditingEducation(null);
    setShowEducationModal(true);
  };

  const handleEditEducation = () => {
    setEditingEducation(profileData?.education || null);
    setShowEducationModal(true);
  };

  const handleSaveEducation = async (educationData) => {
    try {
      const response = await userProfileAPI.updateEducation(educationData);
      if (response?.data) {
        // Update with the full response data or just the education part
        setProfileData(response.data);
      }
      setShowEducationModal(false);

      // Also refetch to ensure we have latest data
      await fetchProfileData();
    } catch (error) {
      console.error("Failed to save education:", error);
      throw error;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-blue-100/50 flex items-center justify-center text-blue-600">
              <svg
                className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9L12 3zm2.5 6L12 10.5 9.5 9 12 7.5 14.5 9zm-2.5 9.5l-5-2.73V11.5l5 2.73 5-2.73v5.27L12 18.5z" />
              </svg>
            </span>
            Education
          </h2>
        </div>

        {isLoading ? (
          <div className="animate-pulse border border-gray-100 rounded-xl p-4 sm:p-5">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        ) : profileData?.education ? (
          <div className="border border-gray-100 rounded-xl p-4 sm:p-5 relative group hover:bg-gray-50/30 transition-colors">
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={handleEditEducation}
                className="text-gray-400 hover:text-blue-500 p-1.5 bg-white rounded shadow-sm border border-gray-100"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
            </div>

            <div className="pr-12">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1">
                {profileData.education.degree}{" "}
                {profileData.education.fieldOfStudy &&
                  `in ${profileData.education.fieldOfStudy}`}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-1">
                {profileData.education.institution}
              </p>
              <p className="text-sm text-[#240457] font-medium mb-2">
                {formatDate(profileData.education.startDate)} –{" "}
                {profileData.education.isCurrent
                  ? "Present"
                  : formatDate(profileData.education.endDate)}
              </p>
              {profileData.education.description && (
                <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
                  {profileData.education.description}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="border border-dashed border-gray-300 rounded-xl p-6 text-center">
            <div className="text-gray-400 mb-3">
              <svg
                className="w-12 h-12 mx-auto"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6L23 9L12 3zm2.5 6L12 10.5 9.5 9 12 7.5 14.5 9zm-2.5 9.5l-5-2.73V11.5l5 2.73 5-2.73v5.27L12 18.5z" />
              </svg>
            </div>
            <h3 className="text-base font-medium text-gray-600 mb-2">
              No education added yet
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Add your education to showcase your academic background
            </p>
          </div>
        )}

        <div className="mt-4 sm:mt-6">
          <button
            onClick={
              profileData?.education ? handleEditEducation : handleAddEducation
            }
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-dashed border-gray-300 rounded-lg text-sm font-medium text-gray-500 hover:text-[#240457] hover:border-[#240457] transition-all"
          >
            <FiPlus className="w-4 h-4" />
            {profileData?.education ? "Update Education" : "Add Education"}
          </button>
        </div>
      </div>

      {/* Education Modal */}
      {showEducationModal && (
        <EducationModal
          isOpen={showEducationModal}
          onClose={() => setShowEducationModal(false)}
          onSave={handleSaveEducation}
          editingEducation={editingEducation}
        />
      )}
    </>
  );
};

export default UserEducation;

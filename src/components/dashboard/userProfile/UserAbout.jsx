"use client";
import React, { useState, useEffect } from "react";
import { FiEdit2, FiCheckCircle } from "react-icons/fi";
import userProfileAPI from "@/services/userProfileAPI";

const UserAbout = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await userProfileAPI.getMyProfile();
        if (response?.data) {
          setProfileData(response.data);
        }
      } catch (error) {
        // Handle 404 errors gracefully (profile doesn't exist yet)
        if (error?.status === 404 || error?.statusCode === 404) {
          console.log("Profile not found - user hasn't created profile yet");
          setProfileData(null);
          return;
        }
        console.error("Failed to fetch user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 mb-6 sm:mb-8 relative group">
      <div className="flex justify-between items-start mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">About</h2>
        <button className="p-1 sm:p-1.5 hover:bg-gray-50 rounded transition-colors text-gray-400 hover:text-gray-600">
          <FiEdit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </button>
      </div>

      {isLoading ? (
        <div className="h-20 bg-gray-200 rounded animate-pulse mb-4 sm:mb-6"></div>
      ) : (
        <p className="text-gray-600 text-sm sm:text-sm leading-relaxed mb-4 sm:mb-6">
          {profileData?.bio || "No bio available. Please update your profile to add a bio."}
        </p>
      )}

      <div className="space-y-3 sm:space-y-4">
        <div>
          <h3 className="text-sm sm:text-sm font-bold text-gray-900 mb-0.5 sm:mb-1">Member Since</h3>
          {isLoading ? (
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          ) : (
            <p className="text-sm sm:text-sm text-gray-500">
              {profileData?.createdAt 
                ? new Date(profileData.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })
                : 'Not available'
              }
            </p>
          )}
        </div>

        <div>
          <h3 className="text-sm sm:text-sm font-bold text-gray-900 mb-0.5 sm:mb-1">
            Profile Status
          </h3>
          {isLoading ? (
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          ) : (
            <div className={`flex items-center gap-1.5 sm:gap-2 text-sm sm:text-sm font-medium ${
              profileData?.isVerified ? 'text-[#185ADB]' : 'text-yellow-600'
            }`}>
              {profileData?.isVerified ? 'Verified' : 'Unverified'}
              <FiCheckCircle className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                profileData?.isVerified ? 'text-[#185ADB]' : 'text-yellow-600'
              }`} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAbout;

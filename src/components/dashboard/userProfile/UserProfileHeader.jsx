"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  FiMapPin,
  FiBriefcase,
  FiEdit2,
  FiCheckCircle,
  FiCamera,
} from "react-icons/fi";
import userProfileAPI from "@/services/userProfileAPI";
import { uploadToCloudinary } from "@/lib/cloudinary";

const UserProfileHeader = ({ activeTab = "Profile", onTabChange }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newAvatar, setNewAvatar] = useState(null);
  const [newCover, setNewCover] = useState(null);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingCover, setIsUploadingCover] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

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

  const handleBannerClick = () => bannerInputRef.current?.click();
  const handleAvatarClick = () => avatarInputRef.current?.click();

  const handleCoverChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File must be under 10MB");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setNewCover({ file, previewUrl });
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File must be under 10MB");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setNewAvatar({ file, previewUrl });
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setIsUpdating(true);
      const updates = {};

      if (newAvatar) {
        setIsUploadingAvatar(true);
        const avatarUrl = await uploadToCloudinary(
          newAvatar.file,
          "user/profile",
        );
        updates.logo = avatarUrl;
        setIsUploadingAvatar(false);
      }

      if (newCover) {
        setIsUploadingCover(true);
        const coverUrl = await uploadToCloudinary(
          newCover.file,
          "user/cover",
        );
        updates.coverImage = coverUrl;
        setIsUploadingCover(false);
      }

      if (Object.keys(updates).length > 0) {
        console.log("Updating profile with:", updates);

        let response;
        
        // Use specific API methods based on what's being updated
        if (updates.logo && Object.keys(updates).length === 1) {
          // If only updating logo, use the specific logo endpoint
          response = await userProfileAPI.updateLogo({ logo: updates.logo });
        } else {
          // For other updates, use the general update method
          response = await userProfileAPI.updateMyProfile(updates);
        }

        if (response?.data) {
          setProfileData(response.data);
          setNewAvatar(null);
          setNewCover(null);

          if (newAvatar?.previewUrl) URL.revokeObjectURL(newAvatar.previewUrl);
          if (newCover?.previewUrl) URL.revokeObjectURL(newCover.previewUrl);
        }
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
      console.error("Error message:", error?.message);
      console.error("Error statusCode:", error?.statusCode);
      console.error("Error data:", error?.data);
      alert(`Failed to update profile: ${error?.message || "Unknown error"}`);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
          <div className="animate-pulse">
            <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 bg-gray-200 rounded-xl mb-4 mx-auto"></div>
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/3 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-gray-500 text-center text-sm sm:text-base">
            No user profile found. Please complete your profile setup.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Cover Image */}
      <div className="h-40 sm:h-48 md:h-56 lg:h-64 w-full relative bg-gray-200 group">
        <Image
          src={
            newCover?.previewUrl ||
            profileData.coverImage ||
            "/assets/images/profileBanner.png"
          }
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

        {newCover && (
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-yellow-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
            <span className="hidden sm:inline">New cover selected - Click "Update Profile" to save</span>
            <span className="sm:hidden">New cover - Update to save</span>
          </div>
        )}

        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className="hidden"
        />

        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
          <button className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl text-xs sm:text-sm font-medium text-black hover:bg-white transition-colors flex items-center gap-1.5 sm:gap-2">
            <img src="/assets/images/eyeIcon.png" alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">View as a user</span>
            <span className="sm:hidden">View</span>
          </button>
          <button
            onClick={handleBannerClick}
            disabled={isUploadingCover}
            className="bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl text-xs sm:text-sm font-medium text-black hover:bg-white transition-colors flex items-center gap-1.5 sm:gap-2 disabled:opacity-50"
          >
            <FiCamera className="w-3 h-3 sm:w-4 sm:h-4" />
            {isUploadingCover ? (
              <span className="hidden sm:inline">Uploading...</span>
            ) : (
              <>
                <span className="hidden sm:inline">Update Cover</span>
                <span className="sm:hidden">Cover</span>
              </>
            )}
          </button>
        </div>

        <div className="absolute top-2 sm:top-4 right-2 sm:right-4">
          <button
            onClick={handleUpdateProfile}
            disabled={isUpdating || (!newAvatar && !newCover)}
            className="bg-[#240457] text-white px-3 sm:px-6 py-1.5 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium hover:bg-[#240457] transition-colors shadow-sm flex items-center gap-1.5 sm:gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <img
              src="/assets/images/updateProfileIcon.png"
              alt=""
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
            {isUpdating ? (
              <span className="hidden sm:inline">Updating...</span>
            ) : (
              <>
                <span className="hidden sm:inline">Update Profile</span>
                <span className="sm:hidden">Update</span>
              </>
            )}
          </button>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="relative -mt-10 sm:-mt-12 md:-mt-14 lg:-mt-16 mb-4 flex flex-col items-center">
          {/* User Avatar */}
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-lg sm:rounded-xl bg-white p-1 shadow-lg overflow-hidden">
              <div className="w-full h-full relative rounded-md sm:rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <img
                  src={
                    newAvatar?.previewUrl ||
                    profileData.imageProfile ||
                    "/assets/images/userAvatar.png"
                  }
                  alt={profileData.fullName || "User"}
                  className="w-full h-full object-cover"
                />
                {newAvatar && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-xs sm:text-sm font-medium text-center px-2">
                      New avatar
                    </span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleAvatarClick}
              disabled={isUploadingAvatar}
              className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 p-1.5 sm:p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-[#240457] transition-colors disabled:opacity-50"
            >
              <FiEdit2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="text-center mt-3">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              {profileData.fullName || "User"}
              {profileData.isVerified && (
                <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
              )}
            </h1>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 mt-2 text-xs sm:text-sm text-gray-500">
              {profileData.title && (
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 sm:w-4 sm:h-4 flex items-center justify-center">
                    <FiBriefcase />
                  </span>
                  {profileData.title}
                </div>
              )}
              {profileData.targetJob && (
                <div className="flex items-center gap-1.5">
                  <img
                    src="/assets/images/manufacturingIcon.png"
                    alt=""
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                  {profileData.targetJob}
                </div>
              )}
              {profileData.location && (
                <div className="flex items-center gap-1.5">
                  <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  {profileData.location}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center border-t border-gray-100 pt-3 sm:pt-4 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-px scrollbar-hide mt-4 sm:mt-6">
          <TabButton
            label="Profile"
            src="/assets/images/homeIcon.png"
            active={activeTab === "Profile"}
            onClick={() => onTabChange("Profile")}
          />
          <TabButton
            label="Jobs"
            src="/assets/images/jobIcon.png"
            active={activeTab === "Jobs"}
            onClick={() => onTabChange("Jobs")}
          />
          <TabButton
            label="Communities"
            src="/assets/images/communitiesIcon.png"
            active={activeTab === "Communities"}
            onClick={() => onTabChange("Communities")}
          />
          <TabButton
            label="Orders"
            src="/assets/images/orderIcon.png"
            active={activeTab === "Orders"}
            onClick={() => onTabChange("Orders")}
          />
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ label, src, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 sm:gap-2 pb-3 sm:pb-4 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap px-1 sm:px-2 ${
      active
        ? "border-[#240457] text-[#240457]"
        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"
    }`}
  >
    <img
      src={src}
      alt={label}
      className={`w-3 h-3 sm:w-4 sm:h-4 ${active ? "" : "grayscale opacity-70"}`}
    />
    <span className="hidden xs:inline sm:inline">{label}</span>
  </button>
);

export default UserProfileHeader;

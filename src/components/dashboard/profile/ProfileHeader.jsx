"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  FiMapPin,
  FiCalendar,
  FiBox,
  FiDollarSign,
  FiUsers,
  FiEdit2,
  FiCheckCircle,
  FiHome,
  FiInfo,
  FiShoppingBag,
  FiBriefcase,
  FiGrid,
} from "react-icons/fi";
import businessProfileAPI from "@/services/businessProfileAPI";
import { uploadToCloudinary } from "@/lib/cloudinary";

const ProfileHeader = ({ activeTab = "Home", onTabChange }) => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newLogo, setNewLogo] = useState(null);
  const [newBanner, setNewBanner] = useState(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const logoInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  useEffect(() => {
    const fetchBusinessProfile = async () => {
      try {
        setIsLoading(true);
        const response = await businessProfileAPI.getMyProfile();
        if (response?.data) {
          setProfileData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch business profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinessProfile();
  }, []);

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleBannerClick = () => {
    bannerInputRef.current?.click();
  };

  const handleLogoChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File must be under 10MB");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setNewLogo({ file, previewUrl });
      // Immediately update profile with new logo
      try {
        setIsUploadingLogo(true);
        setIsUpdating(true);
        const logoUrl = await uploadToCloudinary(file, "business/profile");
        const response = await businessProfileAPI.updateMyProfile({ logo: logoUrl });
        if (response?.data) {
          setProfileData(response.data);
          setNewLogo(null);
          if (previewUrl) URL.revokeObjectURL(previewUrl);
        }
      } catch (error) {
        console.error("Failed to update logo:", error);
        alert(`Failed to update logo: ${error?.message || "Unknown error"}`);
      } finally {
        setIsUploadingLogo(false);
        setIsUpdating(false);
      }
    }
  };

  const handleBannerChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File must be under 10MB");
        return;
      }
      const previewUrl = URL.createObjectURL(file);
      setNewBanner({ file, previewUrl });
      // Immediately update profile with new banner
      try {
        setIsUploadingBanner(true);
        setIsUpdating(true);
        const bannerUrl = await uploadToCloudinary(file, "business/banner");
        const response = await businessProfileAPI.updateMyProfile({ banner: bannerUrl });
        if (response?.data) {
          setProfileData(response.data);
          setNewBanner(null);
          if (previewUrl) URL.revokeObjectURL(previewUrl);
        }
      } catch (error) {
        console.error("Failed to update banner:", error);
        alert(`Failed to update banner: ${error?.message || "Unknown error"}`);
      } finally {
        setIsUploadingBanner(false);
        setIsUpdating(false);
      }
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setIsUpdating(true);
      const updates = {};

      if (newLogo) {
        setIsUploadingLogo(true);
        const logoUrl = await uploadToCloudinary(
          newLogo.file,
          "business/profile",
        );
        updates.logo = logoUrl;
        setIsUploadingLogo(false);
      }

      if (newBanner) {
        setIsUploadingBanner(true);
        const bannerUrl = await uploadToCloudinary(
          newBanner.file,
          "business/banner",
        );
        updates.banner = bannerUrl;
        setIsUploadingBanner(false);
      }

      if (Object.keys(updates).length > 0) {
        console.log("Updating profile with:", updates);

        // Use updateMyProfile instead of update(id)
        const response = await businessProfileAPI.updateMyProfile(updates);

        if (response?.data) {
          setProfileData(response.data);
          setNewLogo(null);
          setNewBanner(null);

          if (newLogo?.previewUrl) URL.revokeObjectURL(newLogo.previewUrl);
          if (newBanner?.previewUrl) URL.revokeObjectURL(newBanner.previewUrl);
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

  const calculateYearsInBusiness = (foundedDate) => {
    if (!foundedDate) return "N/A";
    const founded = new Date(foundedDate);
    const now = new Date();
    const years = now.getFullYear() - founded.getFullYear();
    return `${years} yrs`;
  };

  if (isLoading) {
    return (
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
          <div className="animate-pulse">
            <div className="h-40 sm:h-48 md:h-56 lg:h-64 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 bg-gray-200 rounded-2xl mb-4 mx-auto sm:mx-0"></div>
            <div className="h-6 sm:h-8 bg-gray-200 rounded w-1/3 mb-2 mx-auto sm:mx-0"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto sm:mx-0"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8">
          <p className="text-gray-500 text-center text-sm sm:text-base">No business profile found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border-b border-gray-200">
      <p className="text-gray-500 text-sm sm:text-sm md:text-base max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4">
        Home <span className="text-[#240457]">/ {profileData.companyName}</span>
      </p>
      {/* Cover Image */}
      <div className="h-40 sm:h-48 md:h-56 lg:h-64 w-full relative bg-gray-200">
        <Image
          src={
            newBanner?.previewUrl ||
            profileData.banner ||
            "/assets/images/profileBanner.png"
          }
          alt="Cover"
          fill
          className="object-cover"
        />
        {newBanner && (
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-yellow-500 text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-sm sm:text-sm font-medium">
            <span className="hidden sm:inline">New banner selected - Click "Update Profile" to save</span>
            <span className="sm:hidden">New banner - Update to save</span>
          </div>
        )}
        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          onChange={handleBannerChange}
          className="hidden"
        />
        <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex gap-2 sm:gap-3">
          <button className="bg-white/90 backdrop-blur-sm px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl text-sm sm:text-base font-medium text-black hover:bg-white transition-colors flex items-center gap-1 sm:gap-2">
            <img src="/assets/images/eyeIcon.png" alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">View as a user</span>
            <span className="sm:hidden">View</span>
          </button>
          <button
            onClick={handleBannerClick}
            disabled={isUploadingBanner}
            className="bg-white/90 backdrop-blur-sm px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl sm:rounded-3xl text-sm sm:text-base font-medium text-black hover:bg-white transition-colors flex items-center gap-1 sm:gap-2 disabled:opacity-50"
          >
            <img src="/assets/images/cameraIcon.png" alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
            {isUploadingBanner ? (
              <span className="hidden sm:inline">Uploading...</span>
            ) : (
              <>
                <span className="hidden sm:inline">Update cover</span>
                <span className="sm:hidden">Cover</span>
              </>
            )}
          </button>
          <div className="absolute -bottom-16 sm:-bottom-18 right-1 sm:right-2">
            <button
              className="bg-[#240457] text-white px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium hover:bg-[#240457] transition-colors shadow-sm flex items-center gap-1 sm:gap-2 mx-auto sm:mx-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <img src="/assets/images/updateProfileIcon.png" alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
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
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="relative -mt-12 sm:-mt-14 md:-mt-16 mb-4 sm:mb-6 flex flex-col items-center justify-center sm:items-start sm:flex-row gap-4 sm:gap-6">
          {/* Company Logo */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-xl sm:rounded-2xl bg-white p-1 sm:p-1.5 shadow-lg border-2 border-gray-300">
              <div className="w-full h-full bg-white rounded-lg sm:rounded-xl flex items-center justify-center overflow-hidden relative">
                <img
                  src={
                    newLogo?.previewUrl ||
                    profileData.logo ||
                    "/assets/images/profileLogo.png"
                  }
                  alt="Profile"
                  className="w flex-1 h-full object-contain"
                />
                {newLogo && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-sm font-medium text-center px-2">
                      New logo
                    </span>
                  </div>
                )}
              </div>
            </div>
            <input
              ref={logoInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="hidden"
            />
            <button
              onClick={handleLogoClick}
              disabled={isUploadingLogo}
              className="absolute bottom-6 sm:bottom-8 md:bottom-10 -right-3 sm:-right-4 md:-right-5 p-1.5 sm:p-2 md:p-2.5 border border-gray-300 bg-white rounded-full shadow-lg text-gray-600 hover:text-indigo-600 transition-colors z-10 disabled:opacity-50"
            >
              <FiEdit2 className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Profile Info */}
        </div>
        <div className="flex-1 pt-3 sm:pt-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-3 sm:gap-4">
            <div className="flex flex-col flex-wrap items-center justify-center sm:justify-start gap-x-4 sm:gap-x-6 gap-y-1.5 sm:gap-y-2 mt-2 sm:mt-3 text-sm sm:text-base text-gray-500">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-1.5 sm:gap-2">
                {profileData.companyName}
                {profileData.isVerified && (
                  <FiCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                )}
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-3 sm:gap-x-4 md:gap-x-6 gap-y-1.5 sm:gap-y-2 mt-1.5 sm:mt-2 text-sm sm:text-sm md:text-base text-gray-500 mb-8 sm:mb-10 md:mb-12">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <img src="/assets/images/employeesIcon.png" alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{profileData.companySize || "N/A"}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>
                    {calculateYearsInBusiness(profileData.foundedDate)}
                  </span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <img src="/assets/images/manufacturingIcon.png" alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="truncate max-w-[120px] sm:max-w-none">{profileData.primaryIndustry || "N/A"}</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="truncate max-w-[120px] sm:max-w-none">
                    {profileData.location?.city && profileData.location?.country
                      ? `${profileData.location.city}, ${profileData.location.country}`
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-gray-200 pt-3 sm:pt-4 gap-4 sm:gap-6 lg:gap-8 overflow-x-auto pb-px scrollbar-hide">
          <TabButton
            label="Home"
            src="/assets/images/homeIcon.png"
            active={activeTab === "Home"}
            onClick={() => onTabChange("Home")}
          />
          <TabButton
            label="About"
            src="/assets/images/aboutIcon.png"
            active={activeTab === "About"}
            onClick={() => onTabChange("About")}
          />
          <TabButton
            label="Product"
            src="/assets/images/productIcon.png"
            active={activeTab === "Product"}
            onClick={() => onTabChange("Product")}
          />
          <TabButton
            label="Orders"
            src="/assets/images/orderIcon.png"
            active={activeTab === "Orders"}
            onClick={() => onTabChange("Orders")}
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
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ label, src, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 sm:gap-2 pb-3 sm:pb-4 text-sm sm:text-base font-medium border-b-2 transition-colors whitespace-nowrap px-1 sm:px-2 ${active ? "border-[#240457] text-[#240457]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
  >
    <img src={src} alt={label} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
    <span className="hidden xs:inline sm:inline">{label}</span>
  </button>
);

// Custom helper because FiCube wasn't in the original import list and I don't want to break it if it doesn't exist in the set I chose.
// Replacing FiCube with FiBox which was imported.
import { FiBox as FiCube } from "react-icons/fi";

export default ProfileHeader;

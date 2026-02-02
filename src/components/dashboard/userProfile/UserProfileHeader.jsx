"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  FiMapPin,
  FiBriefcase,
  FiEdit2,
  FiCheckCircle,
  FiCamera,
} from "react-icons/fi";

const UserProfileHeader = ({ activeTab = "Profile", onTabChange }) => {
  // Mock data - replace with actual user data later
  const [profileData] = useState({
    name: "Alex Morgan",
    title: "Supply Chain Manager",
    industry: "Automotive Industry",
    location: { city: "Los Angeles", country: "USA" },
    isVerified: true,
    avatar: "/assets/images/userAvatar.png", // Fallback will be handled
    cover: "/assets/images/profileBanner.png",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const bannerInputRef = useRef(null);
  const avatarInputRef = useRef(null);

  const handleBannerClick = () => bannerInputRef.current?.click();
  const handleAvatarClick = () => avatarInputRef.current?.click();

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Cover Image */}
      <div className="h-64 w-full relative bg-gray-200 group">
        <Image
          src={profileData.cover}
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />

        <input
          ref={bannerInputRef}
          type="file"
          accept="image/*"
          className="hidden"
        />

        <div className="absolute bottom-4 right-4 flex gap-3">
          <button className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-3xl text-sm font-medium text-black hover:bg-white transition-colors flex items-center gap-2">
            <img src="/assets/images/eyeIcon.png" alt="" className="w-4 h-4" />
            View as a user
          </button>
          <button
            onClick={handleBannerClick}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-3xl text-sm font-medium text-black hover:bg-white transition-colors flex items-center gap-2"
          >
            <FiCamera className="w-4 h-4" />
            Update Cover
          </button>
        </div>

        <div className="absolute top-4 right-4">
          <button className="bg-[#240457] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#240457] transition-colors shadow-sm flex items-center gap-2">
            <img
              src="/assets/images/updateProfileIcon.png"
              alt=""
              className="w-4 h-4"
            />
            Update Profile
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 mb-4 flex flex-col items-center">
          {/* User Avatar */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-xl bg-white p-1 shadow-lg overflow-hidden">
              <div className="w-full h-full relative rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {/* Using a placeholder if image load fails or is missing, but assuming src is valid for now */}
                <Image
                  src={profileData.avatar}
                  alt={profileData.name}
                  width={128}
                  height={128}
                  className="object-cover"
                />
              </div>
            </div>
            <button
              onClick={handleAvatarClick}
              className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-[#240457] transition-colors"
            >
              <FiEdit2 className="w-4 h-4" />
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* User Info */}
          <div className="text-center mt-3">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
              {profileData.name}
              {profileData.isVerified && (
                <FiCheckCircle className="w-5 h-5 text-blue-500" />
              )}
            </h1>

            <div className="flex items-center justify-center gap-6 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 flex items-center justify-center">
                  <FiBriefcase />
                </span>
                {profileData.title}
              </div>
              <div className="flex items-center gap-1.5">
                <img
                  src="/assets/images/manufacturingIcon.png"
                  alt=""
                  className="w-4 h-4"
                />
                {profileData.industry}
              </div>
              <div className="flex items-center gap-1.5">
                <FiMapPin className="w-4 h-4" />
                {profileData.location.city} {profileData.location.country}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center border-t border-gray-100 pt-4 gap-8 overflow-x-auto pb-px scrollbar-hide mt-6">
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
    className={`flex items-center gap-2 pb-4 text-base font-medium border-b-2 transition-colors whitespace-nowrap px-2 ${active ? "border-[#240457] text-[#240457]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200"}`}
  >
    <img
      src={src}
      alt={label}
      className={`w-4 h-4 ${active ? "" : "grayscale opacity-70"}`}
    />
    {label}
  </button>
);

export default UserProfileHeader;

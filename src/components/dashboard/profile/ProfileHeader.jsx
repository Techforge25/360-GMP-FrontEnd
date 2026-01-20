"use client";
import React from "react";
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

const ProfileHeader = () => {
  return (
    <div className="bg-white border-b border-gray-200">
      <p className="text-gray-500 text-sm max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        Home <span className="text-[#240457]">/ Global Manufacturing Co.</span>
      </p>
      {/* Cover Image */}
      <div className="h-64 w-full relative bg-gray-200">
        <Image
          src="/assets/images/profileBanner.png" // Placeholder or dynamic
          alt="Cover"
          fill
          className="object-cover"
        />
        <div className="absolute bottom-4 right-4 flex gap-3">
          <button className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-3xl text-sm font-medium text-black hover:bg-white transition-colors flex items-center gap-2">
            <img src="/assets/images/eyeIcon.png" alt="" />
            View as a user
          </button>
          <button className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-3xl text-sm font-medium text-black hover:bg-white transition-colors flex items-center gap-2">
            <img src="/assets/images/cameraIcon.png" alt="" />
            Update cover
          </button>
          <div className="absolute -bottom-18 right-2">
            <button className="bg-[#240457] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-900 transition-colors shadow-sm flex items-center gap-2 mx-auto sm:mx-0">
              <img src="/assets/images/updateProfileIcon.png" alt="" />
              Update Profile
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 mb-6 flex flex-col items-center justify-center sm:items-start sm:flex-row gap-6">
          {/* Company Logo */}
          <div className="relative">
            <div className="w-32 h-32 rounded-xl bg-white p-1 shadow-lg border border-gray-100 overflow-hidden">
              <div className="w-full h-full bg-orange-50 flex items-center justify-center text-orange-500 text-4xl font-bold">
                M
              </div>
            </div>
            <button className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full shadow-md text-gray-500 hover:text-indigo-600 transition-colors border border-gray-100">
              <FiEdit2 className="w-3 h-3" />
            </button>
          </div>

          {/* Profile Info */}
        </div>
        <div className="flex-1 pt-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4">
            <div className="flex flex-col flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 mt-3 text-sm text-gray-500">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center justify-center sm:justify-start gap-2">
                Global Manufacturing Co.
                <FiCheckCircle className="w-5 h-5 text-blue-500" />
              </h1>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 mt-2 text-sm text-gray-500 mb-12">
                <div className="flex items-center gap-1.5">
                  <FiUsers className="w-4 h-4" />
                  <span>500-1000 Employees</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiDollarSign className="w-4 h-4" />
                  <span>Revenue • USD $3.6M+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiCalendar className="w-4 h-4" />
                  <span>3 yrs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiBox className="w-4 h-4" />
                  <span>Manufacturing</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FiMapPin className="w-4 h-4" />
                  <span>Ottawa, Canada</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center border-t border-gray-200 pt-4 gap-8 overflow-x-auto pb-px scrollbar-hide">
          <TabButton label="Home" src="/assets/images/homeIcon.png" active />
          <TabButton label="About" src="/assets/images/aboutIcon.png" />
          <TabButton label="Product" src="/assets/images/productIcon.png" />
          <TabButton label="Orders" src="/assets/images/orderIcon.png" />
          <TabButton label="Jobs" src="/assets/images/jobIcon.png" />
          <TabButton
            label="Communities"
            src="/assets/images/communitiesIcon.png"
          />
        </div>
      </div>
    </div>
  );
};

const TabButton = ({ label, src, active }) => (
  <button
    className={`flex items-center gap-2 pb-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${active ? "border-[#240457] text-[#240457]" : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"}`}
  >
    <img src={src} alt={label} className="w-4 h-4" />
    {label}
  </button>
);

// Custom helper because FiCube wasn't in the original import list and I don't want to break it if it doesn't exist in the set I chose.
// Replacing FiCube with FiBox which was imported.
import { FiBox as FiCube } from "react-icons/fi";

export default ProfileHeader;

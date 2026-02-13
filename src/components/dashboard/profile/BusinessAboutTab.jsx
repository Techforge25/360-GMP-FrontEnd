"use client";
import React, { useState } from "react";
import { FiExternalLink, FiCamera, FiEdit2, FiTrash2 } from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Custom Tooltip component - defined outside to prevent re-creation on each render
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-900">{payload[0].name}</p>
        <p className="text-sm text-gray-600">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

import UploadGalleryModal from "./UploadGalleryModal";
import ViewAlbumModal from "./ViewAlbumModal";
import galleryAPI from "@/services/galleryAPI";
import businessProfileAPI from "@/services/businessProfileAPI";
import { useUserRole } from "@/context/UserContext";

const BusinessAboutTab = ({ businessId }) => {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isViewAlbumModalOpen, setIsViewAlbumModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [profileData, setProfileData] = useState(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const { role, user } = useUserRole();
  // Helper to decode JWT (internal or from utils)
  const getProfileIdFromToken = (token) => {
    if (!token) return null;
    try {
      if (typeof window === "undefined") return null;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );
      const decoded = JSON.parse(jsonPayload);
      return decoded.profiles?.businessProfileId;
    } catch (e) {
      console.error("Failed to decode token", e);
      return null;
    }
  };

  const tokenBusinessId = getProfileIdFromToken(
    user?.accessToken || user?.token,
  );

  // Use the ID from props or current user's profile or token
  const derivedBusinessId =
    user?.profiles?.businessProfileId || tokenBusinessId;
  const targetBusinessId = businessId || derivedBusinessId;

  console.log("Debug IDs:", {
    propBusinessId: businessId,
    userProfileId: user?.profiles?.businessProfileId,
    tokenBusinessId,
    finalTargetId: targetBusinessId,
  });

  // const isOwner =
  //   role === "business" && (derivedBusinessId === businessId || !businessId);

  // Mock data - replace with API data later
  const [aboutData] = useState({
    storyMission:
      "Global Manufacturing Co. is a leading Tier 1 and Tier 2 supplier specializing in high-tolerance components, advanced material production, and efficient sub-assembly modules. With over 15 years of operational excellence, we partner with automotive OEMs and other suppliers to ensure supply chain resilience, superior component quality, and compliance with strict industry standards (like IATF 16949). We drive manufacturing optimization from raw material input to just-in-time delivery.",
  });

  const [exportData] = useState([
    { name: "North America", value: 25, color: "#6366F1" },
    { name: "South America", value: 15, color: "#8B5CF6" },
    { name: "European Union", value: 0, color: "#F97316" },
    { name: "Asia Pacific", value: 20, color: "#3B82F6" },
    { name: "Other", value: 10, color: "#6B7280" },
  ]);

  const [certifications] = useState([
    {
      id: 1,
      name: "ISO 9001:2025",
      description: "Quality Management",
      icon: "🏅",
    },
    {
      id: 2,
      name: "CE Certified",
      description: "European Conformity",
      icon: "✓",
    },
  ]);

  // Fetch Profile data
  const fetchProfile = async () => {
    if (targetBusinessId) {
      try {
        setIsLoadingProfile(true);
        // If viewing own profile from dashboard, we might want to use getMyProfile
        // but since we have targetBusinessId, viewBusinessProfile is more versatile
        const response =
          await businessProfileAPI.viewBusinessProfile(targetBusinessId);

        if (response.success && response.data) {
          setProfileData(response.data);
        } else {
          console.error("Fetch profile failed:", response.message);
        }
      } catch (error) {
        console.error("Failed to fetch business profile:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    }
  };

  // Fetch albums on component mount
  const fetchAlbums = async () => {
    if (targetBusinessId) {
      try {
        console.log("Fetching albums for:", targetBusinessId);
        const response = await galleryAPI.fetchAlbums(targetBusinessId);
        console.log("Fetch albums FULL response:", response);

        if (response.success) {
          // Handle various possible response structures:
          // 1. Direct array: response.data = [...]
          // 2. Paginated: response.data.docs = [...]
          // 3. Profile object: response.data.gallery = [...]

          let galleryData = [];
          if (Array.isArray(response.data)) {
            galleryData = response.data;
          } else if (Array.isArray(response.data?.docs)) {
            galleryData = response.data.docs;
          } else if (Array.isArray(response.data?.gallery)) {
            galleryData = response.data.gallery;
          }

          console.log("Extracted gallery data:", galleryData);
          setGallery(galleryData);
        } else {
          console.error("Fetch albums failed:", response.message);
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    }
  };

  React.useEffect(() => {
    fetchAlbums();
    fetchProfile();
  }, [targetBusinessId]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-4 sm:space-y-6">
        {/* Our Story & Mission */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-5 xl:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Company Mission And Bio
            </h2>
            {/* {isOwner && ( */}
            <button className="flex items-center gap-1.5 sm:gap-2 text-[#240457] text-sm sm:text-sm font-semibold hover:underline">
              {/* <span className="hidden sm:inline">Edit About Section</span> */}
              {/* <span className="sm:hidden">Edit</span> */}
              {/* <FiExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> */}
            </button>
            {/* )} */}
          </div>

          <div className="text-sm sm:text-sm text-gray-600 leading-relaxed min-h-[100px]">
            {isLoadingProfile ? (
              <span className="flex items-center gap-2 text-gray-400">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
                Loading description...
              </span>
            ) : profileData?.description ? (
              profileData.description
            ) : (
              "No description available."
            )}
          </div>
        </div>

        {/* Export Market Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-5 xl:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Export Market Distribution
            </h2>
            {/* {isOwner && ( */}
            <button className="flex items-center gap-1.5 sm:gap-2 text-[#240457] text-sm sm:text-sm font-semibold hover:underline">
              {/* <span className="hidden sm:inline">Manage Featured Products</span> */}
              {/* <span className="sm:hidden">Manage</span> */}
              {/* <FiExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> */}
            </button>
            {/* )} */}
          </div>

          {/* Chart */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[250px] sm:max-w-[300px] h-[200px] sm:h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={exportData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    className="sm:innerRadius-[60] sm:outerRadius-[100]"
                  >
                    {exportData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg shadow-sm border border-gray-100">
                <p className="text-sm sm:text-sm text-gray-500">
                  European Union
                </p>
                <p className="text-base sm:text-lg font-bold text-orange-500">
                  0
                </p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4">
              {exportData.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5 sm:gap-2">
                  <div
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm sm:text-sm text-gray-600">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-lg font-bold text-gray-900">Gallery</h2>
            {/* {isOwner && ( */}
            <button
              onClick={() => setIsGalleryModalOpen(true)}
              className="flex items-center gap-2 text-[#240457] text-sm font-semibold hover:underline"
            >
              Add To Your Profile
              <span className="text-gray-400">|</span>
              <FiCamera className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Photo</span>
            </button>
            {/* )} */}
          </div>

          {/* Gallery Grid */}
          {gallery.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery.map((album) => (
                <div
                  key={album._id || album.id}
                  onClick={() => {
                    setSelectedAlbum(album);
                    setIsViewAlbumModalOpen(true);
                  }}
                  className="relative rounded-xl overflow-hidden group aspect-[4/3] cursor-pointer"
                >
                  {/* Image */}
                  <div className="absolute inset-0 bg-gray-200">
                    <img
                      src={
                        album.images?.[0] || "/assets/images/placeholder.png"
                      }
                      alt={album.albumName || album.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.parentElement.style.background =
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                      }}
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:via-black/40" />

                  {/* Image Count Badge */}
                  {album.images?.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-md flex items-center gap-1">
                      <FiCamera className="w-3 h-3" />
                      {album.images.length}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {/* {isOwner && ( */}
                  <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {/* )} */}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                    <h3 className="text-white font-semibold text-base mb-1 line-clamp-1">
                      {album.albumName || album.title}
                    </h3>
                    <p className="text-white/80 text-sm sm:text-sm line-clamp-2">
                      {album.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <FiCamera className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-900">
                No albums yet
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Share photos of your facilities and products.
              </p>
              {/* {isOwner && ( */}
              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="mt-4 text-[#240457] font-medium text-sm hover:underline"
              >
                Create your first album
              </button>
              {/* )} */}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Certifications */}
      <div className="w-full lg:w-[320px] xl:w-[350px]">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Certifications</h3>
            {/* {isOwner && ( */}
            {/* <button className="text-[#240457] text-sm font-semibold hover:underline">
              Manage
            </button> */}
            {/* )} */}
          </div>

          <div className="space-y-3">
            {isLoadingProfile ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-4 border-[#240457]/10 border-t-[#240457] rounded-full animate-spin"></div>
              </div>
            ) : profileData?.certifications &&
              profileData.certifications.length > 0 ? (
              profileData.certifications
                .filter(
                  (cert) =>
                    typeof cert === "string" && !cert.startsWith("http"),
                )
                .map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-[#F8F5FF] rounded-xl"
                  >
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                      <div className="w-6 h-6 bg-[#240457] rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900">
                        {cert}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Verified Certification
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-500">
                  No certifications listed
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <UploadGalleryModal
        isOpen={isGalleryModalOpen}
        onClose={() => setIsGalleryModalOpen(false)}
        onUploadSuccess={fetchAlbums}
      />

      <ViewAlbumModal
        isOpen={isViewAlbumModalOpen}
        onClose={() => {
          setIsViewAlbumModalOpen(false);
          setSelectedAlbum(null);
        }}
        album={selectedAlbum}
      />
    </div>
  );
};

export default BusinessAboutTab;

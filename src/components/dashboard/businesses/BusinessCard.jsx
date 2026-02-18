"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FiMapPin, FiGlobe, FiPhone, FiCheck, FiFolder } from "react-icons/fi";
import { FaCheckCircle, FaStar, FaCrown } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { useUserRole } from "@/context/UserContext";
import businessProfileAPI from "@/services/businessProfileAPI";
import SlateRenderer from "@/components/ui/SlateRenderer";

const BusinessCard = ({ business, onContactClick }) => {
  const { user } = useUserRole();
  const role = user?.role;
  const router = useRouter();

  // More robust check for free trial (role or subscription plan)
  const isFreeTrial =
    role === "free_trial" ||
    user?.subscription?.planName?.toLowerCase()?.includes("trial") ||
    user?.subscription?.plan?.name?.toLowerCase()?.includes("trial");

  const basePath =
    user?.role === "business" ? "/dashboard/business" : "/dashboard/user";
  const profileUrl = `${basePath}/businesses/${business?.id || "mock-id"}`;

  const handleViewProfile = async (e) => {
    e.preventDefault();

    try {
      const businessId = business?._id || business?.id;

      console.log("🔍 Attempting to track view for business:", {
        businessId,
        businessName: business?.companyName || business?.name,
        fullBusinessObject: business,
      });

      if (!businessId) {
        console.error("❌ No business ID found - cannot track view");
        router.push(profileUrl);
        return;
      }

      // Call the backend API to track the view
      const response = await businessProfileAPI.viewBusinessProfile(businessId);

      console.log("📡 API Response:", response);

      if (response?.success && response?.data) {
        const businessData = response.data;
        const viewCount = businessData.viewsCount || 0;
        const uniqueViewers = businessData.viewedBy?.length || 0;

        console.log("=".repeat(60));
        console.log(
          `✅ Business Profile Viewed: ${businessData.companyName || business?.name}`,
        );
        console.log(`📊 Total View Count: ${viewCount}`);
        console.log(`👥 Unique Viewers: ${uniqueViewers}`);
        console.log(
          `ℹ️  Note: Count only increments for first-time unique viewers`,
        );
        console.log("=".repeat(60));
      } else {
        console.warn(
          "⚠️ API call succeeded but response structure unexpected:",
          response,
        );
      }
    } catch (error) {
      console.error("❌ Failed to track business profile view:");
      console.error("Error details:", error);
      console.error("Error message:", error?.message);
      console.error("Error response:", error?.response);
    } finally {
      // Navigate to profile page regardless of tracking success
      router.push(profileUrl);
    }
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onContactClick) {
      onContactClick(business);
    }
  };

  // Mock data handling if props not provided
  const {
    name = "TechVision Solutions",
    logo = "/assets/images/logo_placeholder_1.png",
    verified = true,
    rating = "N/A",
    reviews = "N/A",
    category = "Manufacturing",
    established = "2012",
    location = "Sydney, Australia",
    description = "TechVision Solutions is a premier B2B platform specializing in the wholesale supply and trade of advanced electronic components. Connecting buyers and manufacturers components.",
    stats = {
      minOrder: "100 Pcs",
      responseRate: ">95%",
      onTime: "98%",
      transactions: "500+",
      products: "200+",
    },
    actions = {
      website: "#",
      directions: "#",
      contact: "#",
      profile: "#",
    },
    sponsored = false,
  } = business || {};

  return (
    <div
      className={`bg-[#F8F9FB] rounded-xl p-6 border-2 ${
        sponsored
          ? "border-indigo-200 shadow-md ring-1 ring-indigo-50"
          : "border-gray-200"
      } mb-4 relative`}
    >
      {sponsored && (
        <span className="absolute top-4 right-4 bg-white text-gray-600 text-[14px] px-2 py-0.5 rounded font-medium">
          Ad
        </span>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4 ">
        <div className="w-16 h-16 rounded-full border border-gray-100 shadow-sm flex items-center justify-center p-2 bg-white flex-shrink-0">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3
              onClick={handleViewProfile}
              className="text-lg font-bold hover:underline text-gray-900 cursor-pointer"
            >
              {name}
            </h3>
            {verified && <FaCheckCircle className="text-blue-500 text-base" />}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar /> <span className="text-gray-400">{rating}</span>
              {/* <span className="text-gray-400">({reviews})</span> */}
            </div>
            <span className="flex items-center gap-1">
              <FiFolder /> {category}
            </span>
            <span className="flex items-center gap-1">Est {established}</span>
            <span className="flex items-center gap-1">
              <FiMapPin /> {isFreeTrial ? "Hidden Location" : location}
            </span>
          </div>

          <div className="text-sm text-gray-600 leading-relaxed mb-4">
            <SlateRenderer content={description} maxLength={74} />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-50/50 rounded-lg p-4 mb-6 border border-gray-100">
        <div>
          <p className="text-sm text-black font-semibold mb-1">
            On-time delivery
          </p>
          <p className="text-sm font-sm text-gray-600">N/A</p>
        </div>
        <div>
          <p className="text-sm text-black font-semibold mb-1">Reorder rate</p>
          <p className="text-sm font-sm text-gray-600">N/A</p>
        </div>
        <div>
          <p className="text-sm text-black font-semibold mb-1">Response time</p>
          <p className="text-sm font-sm text-gray-600">N/A</p>
        </div>
        <div>
          <p className="text-sm text-black font-semibold mb-1">
            Online revenue
          </p>
          {isFreeTrial ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-purple-50 border border-purple-100 rounded-full group cursor-pointer hover:bg-purple-100 transition-colors">
              <FaCrown className="text-purple-600 text-[10px]" />
              <span className="text-[11px] font-bold text-purple-600 uppercase tracking-tight">
                Upgrade
              </span>
            </div>
          ) : (
            <p className="text-sm font-sm text-gray-600">N/A</p>
          )}
        </div>
        <div>
          <p className="text-sm text-black font-semibold mb-1">Products</p>
          <p className="text-sm font-sm text-gray-600">0</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {actions.website !== "#" ? (
          <a
            href={actions.website}
            target="_blank"
            rel="noopener noreferrer"
            className={`h-9 text-[14px] font-semibold border-white hover:text-[#2402457] text-[#240457] bg-indigo-50 hover:bg-indigo-100 flex items-center justify-center rounded-md border ${
              isFreeTrial
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : ""
            }`}
          >
            <FiGlobe className="mr-2" /> Website
          </a>
        ) : (
          <Button
            variant="outline"
            className="h-9 text-[14px] font-semibold border-white hover:text-[#2402457] text-[#240457] bg-indigo-50 hover:bg-indigo-100"
            disabled={true}
          >
            <FiGlobe className="mr-2" /> Website
          </Button>
        )}
        <Button
          variant="outline"
          className="h-9 text-[14px] font-semibold border-white hover:text-[#2402457] text-[#240457] bg-indigo-50 hover:bg-indigo-100"
          disabled={isFreeTrial}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            const {
              latitude,
              longitude,
              rawLocation,
              location: displayLocation,
            } = business || {};
            let destination = "";

            if (latitude && longitude && (latitude !== 0 || longitude !== 0)) {
              destination = `${latitude},${longitude}`;
            } else if (rawLocation) {
              const parts = [
                rawLocation.addressLine,
                rawLocation.city,
                rawLocation.country,
              ].filter(Boolean);
              destination = parts.join(", ");
            } else if (
              displayLocation &&
              displayLocation !== "Location not specified"
            ) {
              destination = displayLocation;
            }

            if (destination) {
              window.open(
                `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`,
                "_blank",
              );
            } else {
              alert("Location details are not available.");
            }
          }}
        >
          <FiMapPin className="mr-2" /> Get Directions
        </Button>
        <Button
          onClick={handleContactClick}
          variant="outline"
          className="h-9 text-[14px] font-semibold border-white hover:text-[#2402457] text-[#240457] bg-indigo-50 hover:bg-indigo-100"
          disabled={isFreeTrial && role !== "business"}
        >
          <FiPhone className="mr-2" /> Contact
        </Button>
        <Button
          onClick={handleViewProfile}
          variant="outline"
          className="h-9 text-[14px] font-semibold border border-white hover:text-[#2402457] text-[#240457] bg-indigo-50 hover:bg-indigo-100"
        >
          <FiFolder className="mr-2" /> View Profile
        </Button>
      </div>
    </div>
  );
};

export default BusinessCard;

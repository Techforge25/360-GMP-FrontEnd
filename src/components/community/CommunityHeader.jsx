"use client";
import React, { useState } from "react";
import { FiUsers } from "react-icons/fi";
import communityAPI from "@/services/communityAPI";

const CommunityHeader = ({
  community,
  isOwner,
  isMember,
  membershipStatus,
  user,
  onMembershipUpdate,
}) => {
  const [isJoining, setIsJoining] = useState(false);

  if (!community) return null;

  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count?.toString() || "0";
  };

  // Get business info if populated
  const businessInfo = community.businessId;
  const businessName =
    businessInfo?.companyName || businessInfo?.name || "Unknown Business";

  const handleJoinCommunity = async () => {
    // Modify condition to allow business owners to join if they aren't members
    if (!user) return;
    if (user.role !== "user" && !isOwner) return; // Only allow business if they are the owner

    try {
      setIsJoining(true);
      const response = await communityAPI.join(community._id);

      if (response.success) {
        // Call callback to update parent component state
        if (onMembershipUpdate) {
          onMembershipUpdate({
            isMember: response.data.status === "approved",
            membershipStatus: response.data.status,
          });
        }
      }
    } catch (error) {
      console.error("Error joining community:", error);
    } finally {
      setIsJoining(false);
    }
  };

  // Determine button state based on membership status
  const getJoinButtonContent = () => {
    if (isMember) {
      return (
        <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-[#240457] text-white rounded-lg hover:bg-[#1a0340] font-semibold transition-colors text-sm whitespace-nowrap">
          Joined
        </button>
      );
    }

    if (membershipStatus === "pending") {
      return (
        <button
          disabled
          className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-yellow-100 text-yellow-800 rounded-lg font-semibold text-sm whitespace-nowrap cursor-not-allowed"
        >
          Request Pending
        </button>
      );
    }

    if (membershipStatus === "rejected") {
      return (
        <button
          disabled
          className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 bg-red-100 text-red-800 rounded-lg font-semibold text-sm whitespace-nowrap cursor-not-allowed"
        >
          Request Rejected
        </button>
      );
    }

    return (
      <button
        onClick={handleJoinCommunity}
        disabled={isJoining}
        className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors text-sm whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isJoining ? (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            Joining...
          </div>
        ) : (
          "Join Community"
        )}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          {/* Logo */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
            {community.profileImage || community.logo ? (
              <img
                src={community.profileImage || community.logo}
                alt={community.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-bold">${community.name?.charAt(0) || "C"}</div>`;
                }}
              />
            ) : (
              <span className="text-white text-2xl font-bold">
                {community.name?.charAt(0) || "C"}
              </span>
            )}
          </div>

          {/* Info & Actions */}
          <div className="flex-1 w-full min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              {community.name}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1 line-clamp-2">
              {community.shortDescription || community.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-sm sm:text-sm text-gray-500">
              <span className="font-medium text-gray-700">
                {formatMemberCount(community.memberCount)} members
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>
                {community.status === "active"
                  ? "Active Community"
                  : "Community"}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="capitalize">{community.type || "Public"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {(user?.role === "user" || (isOwner && !isMember)) && (
            <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              {getJoinButtonContent()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;

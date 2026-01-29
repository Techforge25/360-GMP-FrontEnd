"use client";
import React from "react";
import { FiUsers } from "react-icons/fi";

const CommunityHeader = ({ community, isOwner, isMember }) => {
  if (!community) return null;

  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count?.toString() || "0";
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
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-2 text-xs sm:text-sm text-gray-500">
              <span className="font-medium text-gray-700">
                {formatMemberCount(community.memberCount)} members
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>Active Community</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="capitalize">{community.type || "Public"}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-red-400 text-red-500 rounded-lg hover:bg-red-50 font-semibold transition-colors text-sm whitespace-nowrap">
              Leave Community
            </button>
            <button className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-2.5 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition-colors text-sm whitespace-nowrap">
              View Community
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;

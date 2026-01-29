"use client";
import React from "react";

const CommunityInfoCard = ({ community }) => {
  if (!community) return null;

  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count?.toString() || "0";
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-4">Community Info</h3>

      <p className="text-gray-600 text-sm leading-relaxed mb-5">
        {community.description || community.purpose || "No description available."}
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Members</span>
          <span className="font-bold text-gray-900">
            {formatMemberCount(community.memberCount)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Posts (Last 30 days)</span>
          <span className="font-bold text-gray-900">
            {community.postsCount || 32}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Founded</span>
          <span className="font-bold text-gray-900">
            {community.founded || "Jan 2023"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommunityInfoCard;

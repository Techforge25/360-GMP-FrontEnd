"use client";
import React from "react";
import { format } from "date-fns";

const CommunityInfoCard = ({ community }) => {
  if (!community) return null;

  const foundedDate = community.createdAt
    ? format(new Date(community.createdAt), "MMM yyyy")
    : "Recent";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Community Info</h3>

      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        {community.purpose ||
          community.description ||
          "No description available."}
      </p>

      <div className="space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <span className="text-gray-500 text-sm">Members</span>
          <span className="font-semibold text-gray-900">
            {community.memberCount || 0}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <span className="text-gray-500 text-sm">Posts (Last 30 days)</span>
          <span className="font-semibold text-gray-900">
            {community.postsCount || 321}
          </span>
        </div>
        <div className="flex items-center justify-between py-2 border-b border-gray-50">
          <span className="text-gray-500 text-sm">Founded</span>
          <span className="font-semibold text-gray-900">{foundedDate}</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityInfoCard;

"use client";
import React from "react";
import SlateRenderer from "@/components/ui/SlateRenderer";

const CommunityInfoCard = ({ community }) => {
  if (!community) return null;

  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count?.toString() || "0";
  };

  const formatFoundedDate = (date) => {
    if (!date) return "Unknown";

    try {
      const createdDate = new Date(date);
      return createdDate.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return "Unknown";
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-base font-bold text-gray-900 mb-4">Community Info</h3>

      <div className="text-gray-600 text-sm leading-relaxed mb-5">
        {community.description ? (
          <p className="whitespace-pre-wrap">{community.description}</p>
        ) : community.purpose ? (
          <SlateRenderer content={community.purpose} />
        ) : (
          <p>No description available.</p>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Members</span>
          <span className="font-bold text-gray-900">
            {formatMemberCount(community.memberCount)}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Founded</span>
          <span className="font-bold text-gray-900">
            {formatFoundedDate(community.createdAt)}
          </span>
        </div>
        {community.businessId && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Created by</span>
            <span className="font-bold text-gray-900">
              {community.businessId?.companyName ||
                community.businessId?.name ||
                "Business"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityInfoCard;

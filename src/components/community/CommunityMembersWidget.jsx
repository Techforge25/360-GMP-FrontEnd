"use client";
import React, { useState, useEffect } from "react";
import { FiArrowRight } from "react-icons/fi";
import communityAPI from "@/services/communityAPI";

const CommunityMembersWidget = ({
  communityId,
  community,
  totalCount = 0,
  onViewAll,
}) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!communityId) return;

      try {
        setLoading(true);
        const response = await communityAPI.getMembers(communityId, {
          page: 1,
          limit: 6, // Only fetch first 6 for widget preview
        });

        if (response.success) {
          setMembers(response.data.members || []);
        }
      } catch (error) {
        console.error("Error fetching members for widget:", error);
        setMembers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [communityId]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900">Community Members</h3>
        <span className="text-gray-500 text-sm font-semibold">
          {totalCount || 0}
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#240457]"></div>
        </div>
      ) : members.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No members yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {members.slice(0, 6).map((member, index) => {
            // Creator = business profile. Use community.businessId for owner
            const isCreator = member.role === "owner" && community?.businessId;
            const isBusiness =
              member.memberModel === "BusinessProfile" || isCreator;
            const displayName = isCreator
              ? community.businessId?.companyName ||
                community.businessId?.name ||
                "Business"
              : isBusiness
                ? member.memberId?.companyName ||
                  member.userProfileId?.fullName ||
                  "Unknown"
                : member.userProfileId?.fullName ||
                  member.memberId?.companyName ||
                  "Unknown Member";
            const displayImage = isCreator
              ? community.businessId?.logo ||
                "/assets/images/Portrait_Placeholder.png"
              : isBusiness
                ? member.memberId?.logo ||
                  member.userProfileId?.imageProfile ||
                  "/assets/images/Portrait_Placeholder.png"
                : member.userProfileId?.imageProfile ||
                  member.memberId?.logo ||
                  "/assets/images/Portrait_Placeholder.png";
            const displaySubtitle = isCreator
              ? community.businessId?.primaryIndustry ||
                community.businessId?.businessType ||
                "Business"
              : isBusiness
                ? member.memberId?.primaryIndustry ||
                  member.memberId?.businessType ||
                  "Business"
                : member.userProfileId?.title ||
                  member.memberId?.industry ||
                  "Member";
            return (
              <div
                key={member._id || index}
                className="flex items-center gap-3"
              >
                <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
                  <img
                    src={displayImage}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/assets/images/Portrait_Placeholder.png";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {displayName}
                  </h4>
                  <p className="text-sm text-gray-500 truncate">
                    {displaySubtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={onViewAll}
        className="flex items-center justify-center gap-1 mt-5 pt-4 border-t border-gray-100 text-[#240457] font-semibold text-sm hover:underline w-full"
      >
        View All Members
        <FiArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default CommunityMembersWidget;

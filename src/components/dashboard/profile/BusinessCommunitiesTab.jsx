"use client";
import React, { useState, useEffect } from "react";
import {
  FiUsers,
  FiChevronRight,
  FiEdit2,
  FiPlus,
  FiSearch,
} from "react-icons/fi";
import Link from "next/link";
import communityAPI from "@/services/communityAPI";
import businessProfileAPI from "@/services/businessProfileAPI";
import userSearchAPI from "@/services/userSearchAPI";
import { cn, getSlateText } from "@/lib/utils";

const BusinessCommunitiesTab = () => {
  const [ownedCommunities, setOwnedCommunities] = useState([]);
  const [suggestedCommunities, setSuggestedCommunities] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      setLoading(true);

      // Fetch business profile to get businessId
      const businessResponse = await businessProfileAPI.getMyProfile();
      const businessId = businessResponse?.data?._id;

      // Fetch owned communities
      if (businessId) {
        const ownedResponse =
          await communityAPI.getOwnedCommunities(businessId);
        if (ownedResponse?.success && ownedResponse?.data) {
          const communities = ownedResponse.data.docs || ownedResponse.data;
          setOwnedCommunities(Array.isArray(communities) ? communities : []);
        }
      }

      // Fetch suggested communities
      const suggestedResponse = await communityAPI.getSuggestedCommunities();
      if (suggestedResponse?.success && suggestedResponse?.data) {
        const suggestions = Array.isArray(suggestedResponse.data)
          ? suggestedResponse.data
          : [];
        setSuggestedCommunities(suggestions);
      }

      // Fetch recent searches
      const searchResponse = await userSearchAPI.fetchMySearches({ limit: 5 });
      if (searchResponse?.success && searchResponse?.data?.docs) {
        setRecentSearches(searchResponse.data.docs);
      }
    } catch (error) {
      console.error("Failed to fetch communities:", error);
      setOwnedCommunities([]);
      setSuggestedCommunities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCommunity = async (communityId) => {
    if (
      !confirm(
        "Are you sure you want to delete this community? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      // API call to delete community
      // await api.delete({ url: `/community/${communityId}` });
      setOwnedCommunities((prev) => prev.filter((c) => c._id !== communityId));
    } catch (error) {
      console.error("Failed to delete community:", error);
    }
  };

  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count?.toString() || "0";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 sm:py-12">
        <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-[#240457] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
      {/* Main Content - Owned Communities */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">
            Owned Communities
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {ownedCommunities.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 text-center">
              <FiUsers className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                No Communities Created
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">
                You have not created any communities yet. Create one to connect
                with others.
              </p>
              <Link href="/dashboard/business/create-community">
                <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#240457] text-white rounded-lg text-sm sm:text-base font-medium hover:bg-[#1a0340] transition-colors">
                  Create a Community
                </button>
              </Link>
            </div>
          ) : (
            ownedCommunities.map((community) => (
              <OwnedCommunityCard
                key={community._id}
                community={community}
                onDelete={handleDeleteCommunity}
                formatMemberCount={formatMemberCount}
              />
            ))
          )}
        </div>
      </div>

      {/* Right Sidebar - Suggested Communities */}
      <div className="w-full lg:w-[320px] xl:w-[350px]">
        <div className="mb-4 flex justify-between items-center">
          <Link href="/dashboard/business/create-community">
            <button className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#240457] text-white rounded-lg font-semibold hover:bg-[#1a0340] transition-colors text-sm">
              <span className="hidden sm:inline">Create a Community</span>
              <span className="sm:hidden">Create</span>
              <FiPlus className="w-4 h-4" />
            </button>
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
          {/* {recentSearches.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search) => (
                  <Link
                    key={search._id}
                    href={`/dashboard/business/communities?search=${encodeURIComponent(search.searchedContent)}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-full text-xs sm:text-sm text-gray-600 transition-colors border border-gray-100"
                  >
                    <FiSearch className="text-gray-400" />
                    {search.searchedContent}
                  </Link>
                ))}
              </div>
            </div>
          )} */}

          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
            Suggested Communities
          </h3>

          <div className="space-y-1">
            {suggestedCommunities.map((community) => (
              <SuggestedCommunityItem
                key={community._id}
                community={community}
                formatMemberCount={formatMemberCount}
              />
            ))}
          </div>

          <Link
            href="/dashboard/business/communities"
            className="flex items-center justify-start gap-1 text-[#240457] font-semibold text-sm mt-4 sm:mt-5 hover:underline"
          >
            Explore Communities
            <FiChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Owned Community Card Component
const OwnedCommunityCard = ({ community, onDelete, formatMemberCount }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Community Avatar */}
        <div className="flex-shrink-0 mx-auto sm:mx-0">
          <div className="w-16 h-16 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
            {community.profileImage || community.coverImage ? (
              <img
                src={community.profileImage || community.coverImage}
                alt={community.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">${community.name?.charAt(0) || "C"}</div>`;
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-xl font-bold">
                {community.name?.charAt(0) || "C"}
              </div>
            )}
          </div>
        </div>

        {/* Community Info */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-gray-900">
                  {community.name}
                </h3>
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <FiEdit2 className="w-4 h-4" />
                </button>
                <span className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-600 text-sm sm:text-sm font-medium rounded-full whitespace-nowrap">
                  {community.category || "General"}
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {community.description ||
                  getSlateText(community.purpose) ||
                  "A community for like-minded professionals."}
              </p>
            </div>
          </div>

          {/* Member Avatars */}
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
            <div className="flex -space-x-2">
              {(community.members || [{ avatar: "" }, { avatar: "" }])
                .slice(0, 3)
                .map((member, index) => (
                  <div
                    key={index}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                  >
                    <img
                      src={
                        member.avatar ||
                        "/assets/images/Portrait_Placeholder.png"
                      }
                      alt="Member"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "/assets/images/Portrait_Placeholder.png";
                      }}
                    />
                  </div>
                ))}
            </div>
            <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {formatMemberCount(community.memberCount) || "4k"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 text-sm sm:text-sm text-gray-500 flex-wrap">
          <span>Active {community.lastActive || "2h ago"}</span>
          <div className="flex items-center gap-1.5">
            <FiUsers className="w-4 h-4" />
            <span>{formatMemberCount(community.memberCount)} Members</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <button
            onClick={() => onDelete(community._id)}
            className="w-full sm:w-auto px-3 sm:px-4 py-2 border-2 border-red-400 text-red-500 rounded-lg text-sm font-semibold hover:bg-red-50 transition-colors whitespace-nowrap"
          >
            Delete Community
          </button>
          <Link href={`/community/${community._id}`}>
            <button className="w-full sm:w-auto px-3 sm:px-4 py-2 border-2 border-[#240457] text-[#240457] rounded-lg text-sm font-semibold hover:bg-[#240457] hover:text-white transition-colors whitespace-nowrap">
              View Community
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Suggested Community Item Component
const SuggestedCommunityItem = ({ community, formatMemberCount }) => {
  return (
    <Link href={`/community/${community._id}`}>
      <div className="flex items-center justify-between py-2 sm:py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="w-10 h-10 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            {community.profileImage || community.coverImage ? (
              <img
                src={community.profileImage || community.coverImage}
                alt={community.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">${community.name?.charAt(0) || "C"}</div>`;
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                {community.name?.charAt(0) || "C"}
              </div>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-sm sm:text-sm font-semibold text-gray-900 truncate">
              {community.name}
            </h4>
            <p className="text-sm sm:text-sm text-gray-500">
              {formatMemberCount(community.memberCount)} Members
              {community.type === "featured" && (
                <span className="text-[#240457] font-medium"> • Premium</span>
              )}
            </p>
          </div>
        </div>
        <FiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-[#240457] transition-colors flex-shrink-0" />
      </div>
    </Link>
  );
};

export default BusinessCommunitiesTab;

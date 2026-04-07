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
import { toast } from "react-toastify";

const BusinessCommunitiesTab = () => {
  const [ownedCommunities, setOwnedCommunities] = useState([]);
  const [suggestedCommunities, setSuggestedCommunities] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [loading, setLoading] = useState(true);

  // Track community to delete
  const [communityToDelete, setCommunityToDelete] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const businessResponse = await businessProfileAPI.getMyProfile();
      const businessId = businessResponse?.data?._id;

      if (businessId) {
        const ownedResponse = await communityAPI.getOwnedCommunities(businessId);
        const communities = ownedResponse?.data?.docs || ownedResponse?.data || [];
        setOwnedCommunities(Array.isArray(communities) ? communities : []);
      }

      const suggestedResponse = await communityAPI.getSuggestedCommunities();
      setSuggestedCommunities(Array.isArray(suggestedResponse?.data) ? suggestedResponse.data : []);

      const searchResponse = await userSearchAPI.fetchMySearches({ limit: 5 });
      setRecentSearches(searchResponse?.data?.docs || []);
    } catch (error) {
      console.error("Failed to fetch communities:", error);
      setOwnedCommunities([]);
      setSuggestedCommunities([]);
    } finally {
      setLoading(false);
    }
  };

  // Open popup instead of directly deleting
  const confirmDeleteCommunity = (community) => {
    setCommunityToDelete(community);
    setShowDeletePopup(true);
  };

  // Delete API call after confirmation
  const handleDeleteCommunity = async () => {
    if (!communityToDelete) return;
    try {
      await communityAPI.deleteCommunity(communityToDelete._id);
      toast.success("Community deleted successfully!");
      // Remove deleted community from state
      setOwnedCommunities((prev) =>
        prev.filter((c) => c._id !== communityToDelete._id)
      );
    } catch (error) {
      console.error("Failed to delete community:", error);
      toast.error("Failed to delete community");
    } finally {
      setShowDeletePopup(false);
      setCommunityToDelete(null);
    }
  };

  const formatMemberCount = (count) =>
    count >= 1000 ? (count / 1000).toFixed(1) + "k" : (count || 0).toString();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8 sm:py-12">
        <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-[#240457] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
      {/* Owned Communities */}
      <div className="flex-1">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Owned Communities</h2>
        <div className="space-y-3 sm:space-y-4">
          {ownedCommunities.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 text-center">
              <FiUsers className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                No Communities Created
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">
                You have not created any communities yet. Create one to connect with others.
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
                setShowDeletePopup={setShowDeletePopup}
                onDelete={() => confirmDeleteCommunity(community)}
                formatMemberCount={formatMemberCount}
              />
            ))
          )}
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-[320px] xl:w-[350px]">
        {/* Suggested Communities & Create Button */}
      </div>

      {showDeletePopup && (
        <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 sm:w-96 shadow-lg text-center">
            <h3 className="text-lg text-black font-semibold mb-4">Delete Community?</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{communityToDelete?.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteCommunity}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => setShowDeletePopup(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Owned Community Card Component
const OwnedCommunityCard = ({ community, onDelete, formatMemberCount, setShowDeletePopup }) => {
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
            onClick={() => {
              onDelete(community._id)
              setShowDeletePopup(true)
            }}
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

"use client";
import React, { useState, useEffect } from "react";
import { FiUsers, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import api from "@/lib/axios";

const UserCommunities = () => {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const [suggestedCommunities, setSuggestedCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      
      // Fetch joined communities
      const joinedResponse = await api.get({
        url: `/community/joined?page=1&limit=10`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
      });

      // Fetch suggested communities
      const suggestedResponse = await api.get({
        url: `/community?page=1&limit=3&status=active`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
      });

      if (joinedResponse.success && joinedResponse.data?.docs) {
        setJoinedCommunities(joinedResponse.data.docs);
      } else {
        // Fallback mock data for joined communities
        setJoinedCommunities([
          {
            _id: "1",
            name: "Job Search Support Group",
            description: "Job search support you to find the best jobs according to your expertise",
            category: "General",
            memberCount: 66300,
            lastActive: "2h ago",
            profileImage: "/assets/images/community1.png",
            members: [
              { avatar: "/assets/images/Portrait_Placeholder.png" },
              { avatar: "/assets/images/Portrait_Placeholder.png" },
              { avatar: "/assets/images/Portrait_Placeholder.png" },
            ],
          },
          {
            _id: "2",
            name: "Future of Global Supply Chain Forum",
            description: "Dedicated space for logistics experts to discuss efficient distribution and sourcing.",
            category: "Manufacturing",
            memberCount: 56300,
            lastActive: "2h ago",
            profileImage: "/assets/images/community2.png",
            members: [
              { avatar: "/assets/images/Portrait_Placeholder.png" },
              { avatar: "/assets/images/Portrait_Placeholder.png" },
            ],
          },
          {
            _id: "3",
            name: "Industrial Tech & Automation Nexus",
            description: "Connect with engineers and innovators to explore IoT, Robotics, and advanced manufacturing trends.",
            category: "Manufacturing",
            memberCount: 56300,
            lastActive: "2h ago",
            profileImage: "/assets/images/community3.png",
            members: [
              { avatar: "/assets/images/Portrait_Placeholder.png" },
              { avatar: "/assets/images/Portrait_Placeholder.png" },
            ],
          },
        ]);
      }

      if (suggestedResponse.success && suggestedResponse.data?.docs) {
        setSuggestedCommunities(suggestedResponse.data.docs);
      } else {
        // Fallback mock data for suggested communities
        setSuggestedCommunities([
          {
            _id: "s1",
            name: "Global Logistics Network",
            memberCount: 2400,
            type: "featured",
            profileImage: "/assets/images/community-suggested1.png",
          },
          {
            _id: "s2",
            name: "Tech Innovators Hub",
            memberCount: 2400,
            type: "featured",
            profileImage: "/assets/images/community-suggested2.png",
          },
          {
            _id: "s3",
            name: "Medical Leaders Forum",
            memberCount: 2400,
            type: "featured",
            profileImage: "/assets/images/community-suggested3.png",
          },
        ]);
      }
    } catch (error) {
      console.error("Failed to fetch communities:", error);
      // Set fallback data on error
      setJoinedCommunities([
        {
          _id: "1",
          name: "Job Search Support Group",
          description: "Job search support you to find the best jobs according to your expertise",
          category: "General",
          memberCount: 66300,
          lastActive: "2h ago",
          profileImage: "/assets/images/community1.png",
          members: [
            { avatar: "/assets/images/Portrait_Placeholder.png" },
            { avatar: "/assets/images/Portrait_Placeholder.png" },
            { avatar: "/assets/images/Portrait_Placeholder.png" },
          ],
        },
        {
          _id: "2",
          name: "Future of Global Supply Chain Forum",
          description: "Dedicated space for logistics experts to discuss efficient distribution and sourcing.",
          category: "Manufacturing",
          memberCount: 56300,
          lastActive: "2h ago",
          profileImage: "/assets/images/community2.png",
          members: [
            { avatar: "/assets/images/Portrait_Placeholder.png" },
            { avatar: "/assets/images/Portrait_Placeholder.png" },
          ],
        },
        {
          _id: "3",
          name: "Industrial Tech & Automation Nexus",
          description: "Connect with engineers and innovators to explore IoT, Robotics, and advanced manufacturing trends.",
          category: "Manufacturing",
          memberCount: 56300,
          lastActive: "2h ago",
          profileImage: "/assets/images/community3.png",
          members: [
            { avatar: "/assets/images/Portrait_Placeholder.png" },
            { avatar: "/assets/images/Portrait_Placeholder.png" },
          ],
        },
      ]);
      setSuggestedCommunities([
        {
          _id: "s1",
          name: "Global Logistics Network",
          memberCount: 2400,
          type: "featured",
          profileImage: "/assets/images/community-suggested1.png",
        },
        {
          _id: "s2",
          name: "Tech Innovators Hub",
          memberCount: 2400,
          type: "featured",
          profileImage: "/assets/images/community-suggested2.png",
        },
        {
          _id: "s3",
          name: "Medical Leaders Forum",
          memberCount: 2400,
          type: "featured",
          profileImage: "/assets/images/community-suggested3.png",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveCommunity = async (communityId) => {
    try {
      await api.post({
        url: `/community/${communityId}/leave`,
        enableErrorMessage: true,
        enableSuccessMessage: true,
      });
      setJoinedCommunities((prev) =>
        prev.filter((c) => c._id !== communityId)
      );
    } catch (error) {
      console.error("Failed to leave community:", error);
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
      {/* Main Content - Joined Communities */}
      <div className="flex-1">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
          Communities You Have Joined
        </h2>

        <div className="space-y-3 sm:space-y-4">
          {joinedCommunities.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 text-center">
              <FiUsers className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                No Communities Joined
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4">
                You have not joined any communities yet. Explore and join communities to connect with others.
              </p>
              <Link href="/dashboard/user/communities">
                <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-[#240457] text-white rounded-lg text-sm sm:text-base font-medium hover:bg-[#1a0340] transition-colors">
                  Explore Communities
                </button>
              </Link>
            </div>
          ) : (
            joinedCommunities.map((community) => (
              <CommunityCard
                key={community._id}
                community={community}
                onLeave={handleLeaveCommunity}
                formatMemberCount={formatMemberCount}
              />
            ))
          )}
        </div>
      </div>

      {/* Right Sidebar - Suggested Communities */}
      <div className="w-full lg:w-[320px] xl:w-[350px]">
        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5">
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
            href="/dashboard/user/communities"
            className="flex items-center justify-start gap-1 text-[#240457] font-semibold text-sm sm:text-sm mt-4 sm:mt-5 hover:underline"
          >
            Explore Communities
            <FiChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Community Card Component
const CommunityCard = ({ community, onLeave, formatMemberCount }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-5">
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        {/* Community Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
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
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-1.5 sm:gap-2 flex-wrap">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">
                  {community.name}
                </h3>
                <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gray-100 text-gray-600 text-sm sm:text-sm font-medium rounded-full whitespace-nowrap">
                  {community.category || "General"}
                </span>
              </div>
              <p className="text-sm sm:text-sm text-gray-500 mt-1 line-clamp-2">
                {community.description || community.purpose || "A community for like-minded professionals."}
              </p>
            </div>
          </div>

          {/* Member Avatars */}
          <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
            <div className="flex -space-x-1.5 sm:-space-x-2">
              {(community.members || [{ avatar: "" }, { avatar: "" }])
                .slice(0, 3)
                .map((member, index) => (
                  <div
                    key={index}
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full border-2 border-white overflow-hidden bg-gray-200"
                  >
                    <img
                      src={member.avatar || "/assets/images/Portrait_Placeholder.png"}
                      alt="Member"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "/assets/images/Portrait_Placeholder.png";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 sm:gap-4 text-sm sm:text-sm text-gray-500">
          <span>Active {community.lastActive || "2h ago"}</span>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <FiUsers className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>{formatMemberCount(community.memberCount)} Members</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onLeave(community._id)}
            className="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 border-2 border-red-400 text-red-500 rounded-lg text-sm sm:text-sm font-semibold hover:bg-red-50 transition-colors whitespace-nowrap"
          >
            <span className="hidden sm:inline">Leave Community</span>
            <span className="sm:hidden">Leave</span>
          </button>
          <Link href={`/community/${community._id}`}>
            <button className="px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 border-2 border-[#240457] text-[#240457] rounded-lg text-sm sm:text-sm font-semibold hover:bg-[#240457] hover:text-white transition-colors whitespace-nowrap">
              <span className="hidden sm:inline">View Community</span>
              <span className="sm:hidden">View</span>
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
      <div className="flex items-center justify-between py-2.5 sm:py-3 px-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            {community.profileImage || community.coverImage ? (
              <img
                src={community.profileImage || community.coverImage}
                alt={community.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-sm font-bold">${community.name?.charAt(0) || "C"}</div>`;
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white text-sm sm:text-sm font-bold">
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

export default UserCommunities;

"use client";
import React, { useState } from "react";
import { FiArrowLeft, FiSearch, FiMessageCircle, FiUserPlus } from "react-icons/fi";

const CommunityMembersView = ({ onBack, communityName = "Community" }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Dummy members data
  const allMembers = [
    {
      id: 1,
      name: "Sophia Martinez",
      role: "Green Manufacturing Consultant",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: true,
    },
    {
      id: 2,
      name: "James Carter",
      role: "Lean Production Specialist",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: false,
    },
    {
      id: 3,
      name: "Olivia Bennett",
      role: "Sustainable Operations Analyst",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: true,
    },
    {
      id: 4,
      name: "Ethan Ramirez",
      role: "Mechanical Design Lead",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: false,
    },
    {
      id: 5,
      name: "Marcus Bennett",
      role: "Manufacturing Operations Manager",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: true,
    },
    {
      id: 6,
      name: "David Kim",
      role: "Environmental Policy Analyst",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: false,
    },
    {
      id: 7,
      name: "Michael Torres",
      role: "Senior Sustainability Consultant",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: true,
    },
    {
      id: 8,
      name: "Sofia Andrade",
      role: "Materials & Metallurgy Engineer",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: false,
    },
    {
      id: 9,
      name: "Ava Thompson",
      role: "Automotive Parts Quality Inspector",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: true,
    },
    {
      id: 10,
      name: "Lucas Johnson",
      role: "Supply Chain Analyst",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: false,
    },
    {
      id: 11,
      name: "Emma Wilson",
      role: "Process Engineer",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: true,
    },
    {
      id: 12,
      name: "Noah Davis",
      role: "Quality Assurance Manager",
      image: "/assets/images/Portrait_Placeholder.png",
      isOnline: false,
    },
  ];

  const filters = ["All", "Online", "New Members", "Admins"];

  // Filter members based on search and active filter
  const filteredMembers = allMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "Online") {
      return matchesSearch && member.isOnline;
    }
    return matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                Community Members
              </h1>
              <p className="text-sm text-gray-500">
                {allMembers.length} members in {communityName}
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto scrollbar-hide">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? "bg-[#240457] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Members Grid */}
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No members found matching your search.</p>
          </div>
        )}

        {/* Load More */}
        <div className="flex justify-center mt-8">
          <button className="px-8 py-3 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
            Load more
          </button>
        </div>
      </div>
    </div>
  );
};

// Member Card Component
const MemberCard = ({ member }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        {/* Avatar with online indicator */}
        <div className="relative shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
            <img
              src={member.image || "/assets/images/Portrait_Placeholder.png"}
              alt={member.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/assets/images/Portrait_Placeholder.png";
              }}
            />
          </div>
          {member.isOnline && (
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 truncate">
            {member.name}
          </h3>
          <p className="text-sm text-gray-500 truncate mt-0.5">{member.role}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 mt-4">
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#240457] text-white rounded-lg text-sm font-medium hover:bg-[#1a0340] transition-colors">
          <FiMessageCircle className="w-3.5 h-3.5" />
          Message
        </button>
        <button className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
          <FiUserPlus className="w-3.5 h-3.5" />
          Connect
        </button>
      </div>
    </div>
  );
};

export default CommunityMembersView;

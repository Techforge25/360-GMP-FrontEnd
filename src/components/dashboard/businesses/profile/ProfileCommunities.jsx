"use client";
import React, { useState, useEffect } from "react";
import { BsGlobe } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";
import communityAPI from "@/services/communityAPI";
import { cn, getSlateText } from "@/lib/utils";

export default function ProfileCommunities({ businessId }) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (businessId) {
      fetchCommunities();
    }
  }, [businessId]);

  const fetchCommunities = async () => {
    try {
      setLoading(true);
      const response = await communityAPI.getAll({ businessId, limit: 2 });

      console.log("Communities API Response:", response);

      if (response.success && response.data) {
        const communitiesData = response.data.docs || response.data || [];
        setCommunities(communitiesData);
      }
    } catch (error) {
      console.error("Failed to fetch communities:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatLastActive = (date) => {
    if (!date) return "Recently";
    const now = new Date();
    const active = new Date(date);
    const diffMinutes = Math.floor((now - active) / (1000 * 60));

    if (diffMinutes < 60) return `Active ${diffMinutes}m ago`;
    if (diffMinutes < 1440)
      return `Active ${Math.floor(diffMinutes / 60)}h ago`;
    return `Active ${Math.floor(diffMinutes / 1440)}d ago`;
  };

  const dummyCommunities = [
    {
      id: 1,
      title: "MedTech Pioneers Community",
      category: "Healthcare",
      description:
        "Connecting healthcare professionals to discuss telemedicine, AI diagnostics, and patient care...",
      active: "Active 8h ago",
      members: "56.3k Members",
      image: "healthcare-bg",
      avatars: [1, 2, 3],
    },
    {
      id: 2,
      title: "Future Of Fintech Community",
      category: "Finance",
      description:
        "Blockchain adoption, decentralized finance (DeFi), and digital banking security protocols.",
      active: "Active 5m ago",
      members: "50.8k Members",
      image: "finance-bg",
      avatars: [1, 2, 3],
    },
  ];

  const communityList = communities.length > 0 ? communities : dummyCommunities;

  if (loading) {
    return (
      <div className="mb-10 text-center mt-28">
        <h2 className="text-3xl font-semibold text-black mb-2">Communities</h2>
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading communities...</div>
        </div>
      </div>
    );
  }

  if (communities.length === 0) {
    return (
      <div className="mb-10 text-center mt-28">
        <h2 className="text-3xl font-semibold text-black mb-2">Communities</h2>
        <div className="text-center py-8 text-gray-500">
          No communities found
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10 text-center mt-28">
      <h2 className="text-3xl font-semibold text-black mb-2">Communities</h2>
      <p className="text-gray-500 text-sm mb-8 max-w-3xl mx-auto">
        A dedicated professional hub for discussing the latest trends and
        practical applications in Industrial Technology, Manufacturing
        Automation, and Supply Chain Digitization. Join to share insights, find
        expert answers, and network with industry leaders in B2B Tech
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
        {communityList.map((comm) => (
          <div
            key={comm._id || comm.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Banner */}
            <div className="h-40 bg-gray-200 relative">
              {comm.coverImage || comm.profileImage ? (
                <img
                  src={comm.coverImage || comm.profileImage}
                  alt={comm.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"></div>
              )}

              {comm.category && (
                <span className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-sm font-semibold shadow-sm">
                  {comm.category}
                </span>
              )}

              <div className="absolute bottom-3 right-3 bg-white p-1 rounded-full shadow-sm text-blue-500">
                <BsGlobe />
              </div>
            </div>

            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 text-lg leading-tight w-3/4">
                  {comm.name || comm.title}
                </h3>
                <div className="flex -space-x-2">
                  {/* Dummy Avatars */}
                  <div className="w-6 h-6 rounded-full bg-gray-300 border border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-400 border border-white"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[8px] font-bold text-gray-600">
                    {comm.memberCount > 1000
                      ? `${(comm.memberCount / 1000).toFixed(1)}k`
                      : comm.memberCount || "0"}
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {comm.description || getSlateText(comm.purpose)}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-400 pt-4 border-t border-gray-100 mb-4">
                <span>
                  {formatLastActive(comm.updatedAt) ||
                    comm.active ||
                    "Active recently"}
                </span>
                <span className="flex items-center gap-1">
                  <HiOutlineUserGroup />{" "}
                  {comm.memberCount
                    ? `${comm.memberCount} Members`
                    : comm.members || "0 Members"}
                </span>
              </div>

              <button className="w-full border border-indigo-900 text-indigo-900 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                Join Community
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

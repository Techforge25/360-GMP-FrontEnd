"use client";
import React, { useState, useEffect } from "react";
import { FiUsers, FiGlobe, FiSearch } from "react-icons/fi";
import { LuCrown } from "react-icons/lu";
import { MdLockOutline } from "react-icons/md";
import { BsBuilding, BsGlobe2 } from "react-icons/bs";
import { FaChevronRight } from "react-icons/fa";
import api from "@/lib/axios";
import Link from "next/link";

export default function CommunitiesPageContent({ canCreateCommunity = false }) {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Filters
  const [sortBy, setSortBy] = useState("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [industry, setIndustry] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    // Reset and fetch initial data when filters change
    setPage(1);
    setHasMore(true);
    fetchInitialCommunities();
  }, [searchQuery, industry, region, sortBy]);

  const fetchInitialCommunities = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: 1,
        limit: 4,
        status: "active",
        search: searchQuery,
        industry: industry,
        region: region,
        // Backend doesn't support generic sort param in provided snippet, but passing it just in case or for future
      });

      const response = await api.get({
        url: `/community?${queryParams.toString()}`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
      });

      if (response.success && response.data?.docs) {
        setCommunities(response.data.docs);
        setHasMore(response.data.hasNextPage);
        // Next page to fetch will be 2
        setPage(2);
      } else {
        setCommunities([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch communities:", error);
      setCommunities([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreCommunities = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      // We want to load 8 more items.
      // Since we started with limit=4 (Page 1), the next logical chunks are Page 2 and Page 3 (each limit=4).
      // This gives us indices 4-7 and 8-11, total 8 items.

      // Fetch Page A
      const queryParamsA = new URLSearchParams({
        page: page,
        limit: 4,
        status: "active",
        search: searchQuery,
        industry: industry,
        region: region,
      });

      const resA = await api.get({
        url: `/community?${queryParamsA.toString()}`,
        enableErrorMessage: false,
        enableSuccessMessage: false,
      });

      let newDocs = [];
      let nextHasMore = false;
      let nextPage = page + 1;

      if (resA.success && resA.data?.docs) {
        newDocs = [...resA.data.docs];
        // If Page A has a next page, we fetch Page B to fulfill the "8 items" requirement
        if (resA.data.hasNextPage) {
          const queryParamsB = new URLSearchParams({
            page: page + 1,
            limit: 4,
            status: "active",
            search: searchQuery,
            industry: industry,
            region: region,
          });

          const resB = await api.get({
            url: `/community?${queryParamsB.toString()}`,
            enableErrorMessage: false,
            enableSuccessMessage: false,
          });

          if (resB.success && resB.data?.docs) {
            newDocs = [...newDocs, ...resB.data.docs];
            nextHasMore = resB.data.hasNextPage;
            nextPage = page + 2;
          } else {
            nextHasMore = false;
          }
        } else {
          nextHasMore = false;
        }

        setCommunities((prev) => [...prev, ...newDocs]);
        setHasMore(nextHasMore);
        setPage(nextPage);
      }
    } catch (error) {
      console.error("Failed to load more communities:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const getCommunityIcon = (type) => {
    switch (type) {
      case "public":
        return <FiGlobe className="w-5 h-5 text-blue-600" />;
      case "private":
        return <MdLockOutline className="w-5 h-5 text-purple-600" />;
      case "featured":
        return <LuCrown className="w-5 h-5 text-yellow-600" />;
      default:
        return <FiGlobe className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative w-full rounded-3xl overflow-hidden mx-4 sm:mx-6 lg:mx-8 mt-6 mb-8 shadow-2xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/community-hero.png"
            alt="Community"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.backgroundColor = "#4c1d95";
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 sm:px-12 lg:px-16 py-16">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
              Connect With Global Community
              <br />
              <span className="text-white">Find Your Industry Forum</span>
            </h1>
            <p className="text-md sm:text-md text-white/90 mb-10 max-w-4xl mx-auto leading-relaxed">
              Join thousands of professionals in specialized micro-communities.
              Share insights, solve challenges, and grow your network in a space
              built for meaningful connection
            </p>

            {/* Search Bar */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl">
                  <FiSearch className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="find community by name or topic"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                  />
                </div>

                {/* Industry Dropdown */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl">
                  <BsBuilding className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <select
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 appearance-none cursor-pointer"
                  >
                    <option value="">Industry</option>
                    <option value="technology">Technology</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="finance">Finance</option>
                  </select>
                </div>

                {/* Region Dropdown */}
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white rounded-xl">
                  <BsGlobe2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 appearance-none cursor-pointer"
                  >
                    <option value="">Region</option>
                    <option value="north-america">North America</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia</option>
                    <option value="global">Global</option>
                  </select>
                </div>

                {/* Search Button */}
                <button className="px-8 py-3 bg-purple-900 hover:bg-purple-800 text-white rounded-xl font-semibold transition-all shadow-lg flex items-center justify-center gap-2 sm:w-auto w-full">
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Header Section */}
      <div className="">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                All Communities
              </h2>
              <p className="text-gray-600 mt-1 text-sm">
                Discover Active Groups Matching Your Expertise
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort By</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 text-black"
                >
                  <option value="recent">Most Recent</option>
                  <option value="members">Most Members</option>
                  <option value="active">Most Active</option>
                </select>
              </div>
              {canCreateCommunity && (
                <button className="px-6 py-2 bg-purple-900 text-white rounded-lg font-medium hover:bg-purple-800 transition-colors">
                  Create a Community
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Communities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading communities...</p>
          </div>
        ) : communities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No communities found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities.map((community) => (
                <div
                  key={community._id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Community Cover Image */}
                  <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                    {community.coverImage ? (
                      <img
                        src={community.coverImage}
                        alt={community.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FiUsers className="w-16 h-16 text-white opacity-50" />
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700">
                        {community.category || "General"}
                      </span>
                    </div>

                    {/* Type Icon */}
                    <div className="absolute bottom-3 right-3 bg-white p-2 rounded-full">
                      {getCommunityIcon(community.type)}
                    </div>
                  </div>

                  {/* Community Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {community.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[40px]">
                      {community.description ||
                        community.purpose ||
                        "Join this community to connect with like-minded professionals"}
                    </p>

                    {/* Members Info */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {[1, 2, 3].map((i) => (
                            <div
                              key={i}
                              className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                            >
                              {String.fromCharCode(64 + i)}
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          +{community.memberCount || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <FiUsers className="w-4 h-4" />
                        <span>{community.memberCount || 0} Members</span>
                      </div>
                    </div>

                    {/* View Community Button */}
                    <Link href={`/community/${community._id}`}>
                      <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                        View Community
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={loadMoreCommunities}
                  disabled={loadingMore}
                  className="px-8 py-3 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <div className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
                      Loading...
                    </>
                  ) : (
                    "View all communities"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

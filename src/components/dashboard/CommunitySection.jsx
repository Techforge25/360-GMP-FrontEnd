"use client";
import React, { useState, useEffect } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { LuCrown } from "react-icons/lu";
import { PiGlobeBold } from "react-icons/pi";
import { MdLockOutline } from "react-icons/md";
import api from "@/lib/axios";

const CommunitySection = () => {
  const scrollRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await api.get({
          url: "/community?limit=8&status=active",
          enableErrorMessage: false,
          enableSuccessMessage: false,
        });

        if (response.success && response.data?.communities) {
          setCommunities(response.data.communities);
        }
      } catch (error) {
        console.error("Failed to fetch communities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunities();
  }, []);

  const scrollTo = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollRef.current.scrollLeft / width);
      setActiveIndex(index);
    }
  };

  const communityType = {
    public: {
      iconColor: "text-green-600",
      icon: <PiGlobeBold className="text-lg" />,
    },
    private: {
      iconColor: "text-blue-600",
      icon: <MdLockOutline className="text-lg" />,
    },
    featured: {
      iconColor: "text-purple-600",
      icon: <LuCrown className="text-lg" />,
    },
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-8">
            <h2 className="text-2xl font-bold text-indigo-950 mb-1">
              Communities
            </h2>
            <p className="text-sm text-gray-500">Loading communities...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!communities || communities.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-2xl font-bold text-indigo-950 mb-1">
            Communities
          </h2>
          <p className="text-sm text-gray-500">
            Connect with businesses and professionals.
          </p>
        </div>

        {/* Slider Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {communities.map((comm) => {
            const typeConfig = communityType[comm.type] || communityType.public;
            return (
              <div
                key={comm._id}
                className="min-w-[280px] md:min-w-[300px] lg:min-w-[calc(25%-18px)] max-w-[calc(25%-18px)] snap-start bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all group flex-shrink-0"
              >
                <div className="h-32 rounded-lg bg-gray-50 mb-4 overflow-hidden relative">
                  <img
                    src={comm.coverImage || "/assets/images/community.png"}
                    alt={comm.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "/assets/images/community.png";
                    }}
                  />
                  <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm p-2 rounded-full">
                    <span className={typeConfig.iconColor}>
                      {typeConfig.icon}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 text-sm mb-1 truncate">
                  {comm.name}
                </h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                  {comm.description || comm.purpose || "Join this community"}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 mb-4">
                    {comm.memberCount || 0} Members
                  </p>
                  <Link
                    href={`/community/${comm._id}`}
                    className="p-2 bg-brand-primary/30 rounded-card align-right"
                  >
                    <FaArrowRightLong
                      size={16}
                      className="text-brand-primary"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Slider Dots */}
        <div className="flex justify-center mt-6 gap-1">
          {Array.from({ length: Math.ceil(communities.length / 4) || 1 }).map(
            (_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? "w-6 bg-indigo-900"
                    : "w-1.5 bg-gray-300"
                }`}
              />
            )
          )}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <button className="px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm">
          Explore all communities
        </button>
      </div>
    </section>
  );
};

export default CommunitySection;

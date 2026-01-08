"use client";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { LuCrown } from "react-icons/lu";
import { PiGlobeBold } from "react-icons/pi";
import { MdLockOutline } from "react-icons/md";

const CommunitySection = ({ communities = [] }) => {
  const scrollRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  if (!communities || communities.length === 0) return null;

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
      iconColor: "text-brand-primary",
      icon: <LuCrown className="text-lg" />,
    },
    private: {
      iconColor: "text-blue-dark",
      icon: <PiGlobeBold className="text-lg" />,
    },
    premium: {
      iconColor: "text-accent-danger",
      icon: <MdLockOutline className="text-lg" />,
    },
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-indigo-950 mb-1">
              Join Communities
            </h2>
            <p className="text-sm text-gray-500">
              Connect with businesses and professionals.
            </p>
          </div>
          <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 flex items-center">
            View All <FiArrowRight className="ml-1" />
          </button>
        </div>

        {/* Slider Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 -mx-4 px-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {communities.map((comm, i) => {
            const typeConfig = communityType[comm.type] || communityType.public;
            return (
              <div
                key={i}
                className="min-w-[280px] md:min-w-[300px] lg:min-w-[calc(25%-18px)] max-w-[calc(25%-18px)] snap-start bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-all group flex-shrink-0"
              >
                <div className="h-32 rounded-lg bg-gray-50 mb-4 overflow-hidden relative">
                  <img
                    src={comm.image || "/assets/images/community.png"}
                    alt={comm.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = "none";
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
                  {comm.title}
                </h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                  {comm.description}
                </p>

                <div className="flex justify-between items-center">
                  <p className="text-xs text-gray-500 mb-4">
                    {comm.members} Members
                  </p>
                  <Link
                    href={`/community/${comm.id}`}
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
    </section>
  );
};

export default CommunitySection;

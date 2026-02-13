"use client";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

const FeedTabs = ({ activeTab, setActiveTab, postCounts }) => {
  const tabs = [
    {
      id: "recent",
      label: "Recent",
      dropdown: true,
      count: postCounts?.total || 0,
    },
    {
      id: "posts",
      label: "Posts",
      count: postCounts?.posts || 0,
    },
    {
      id: "discussion",
      label: "Documents",
      count: postCounts?.discussions || 0,
    },
    {
      id: "events",
      label: "Events",
      count: postCounts?.events || 0,
    },
    {
      id: "polls",
      label: "Polls",
      count: postCounts?.polls || 0,
    },
  ];

  return (
    <div className="flex items-center gap-6 sm:gap-8 border-b border-gray-200 mb-6 overflow-x-auto scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`pb-3 text-sm font-medium transition-all relative whitespace-nowrap flex items-center gap-1 ${
            activeTab === tab.id
              ? "text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab.label}
          {tab.count > 0 && (
            <span className="bg-gray-100 text-gray-600 text-sm px-2 py-0.5 rounded-full">
              {tab.count}
            </span>
          )}
          {tab.dropdown && <FiChevronDown className="w-4 h-4" />}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-primary rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default FeedTabs;

"use client";
import React from "react";
import { FiChevronDown } from "react-icons/fi";

const FeedTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "recent", label: "Recent", dropdown: true },
    { id: "posts", label: "Posts" },
    { id: "discussions", label: "Discussions" },
    { id: "events", label: "Events" },
    { id: "resources", label: "Resources" },
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
          {tab.dropdown && <FiChevronDown className="w-4 h-4" />}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#240457] rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default FeedTabs;

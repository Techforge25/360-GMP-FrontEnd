"use client";
import React from "react";

const FeedTabs = ({ activeTab, setActiveTab }) => {
  const tabs = ["Recent", "Posts", "Discussions"];

  return (
    <div className="flex items-center gap-6 border-b border-gray-200 mb-6 px-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={`pb-3 text-sm font-medium transition-all relative ${
            activeTab === tab.toLowerCase()
              ? "text-[#240457]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
          {activeTab === tab.toLowerCase() && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#240457] rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
};

export default FeedTabs;

"use client";
import React from "react";

const TopSearchKeywordsSection = () => {
  const keywords = [
    { text: "Data Analyst", count: 0 },
    { text: "Product Designer", count: 0 },
    { text: "Architecture Designer", count: 0 },
    { text: "Data Annalist", count: 0 },
    { text: "Architecture Designer", count: 0 },
    { text: "Data Annalist", count: 0 },
    { text: "Data Annalist", count: 0 },
    { text: "Product Designer", count: 0 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6 shadow-sm flex flex-col">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-900 mb-1">
          Top Search Keywords
        </h3>
        <p className="text-sm text-gray-500">
          Keywords recruiters used to find your profile
        </p>
      </div>

      <div className="flex flex-wrap gap-2 content-start">
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className="flex items-center bg-gray-100 rounded-full px-4 py-1.5"
          >
            <span className="text-smfont-medium text-gray-700 mr-2">
              {keyword.text}
            </span>
            <span className="text-smfont-bold text-gray-900">
              {keyword.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSearchKeywordsSection;

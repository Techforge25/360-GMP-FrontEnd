"use client";
import React from "react";
import { FiImage, FiFileText, FiCalendar, FiHelpCircle } from "react-icons/fi";

const FeedInput = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
      <div className="mb-4">
        <textarea
          placeholder="Share an insight, ask a question, start a discussion..."
          className="w-full text-gray-700 placeholder:text-gray-400 border-none focus:ring-0 resize-none h-20 bg-transparent text-base"
        />
      </div>

      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 text-sm font-medium transition-colors">
            <FiImage className="text-gray-500" />
            Photo/video
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 text-sm font-medium transition-colors">
            <FiFileText className="text-gray-500" />
            Document
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 text-sm font-medium transition-colors">
            <FiCalendar className="text-gray-500" />
            Event
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-600 text-sm font-medium transition-colors">
            <FiHelpCircle className="text-gray-500" />
            Question
          </button>
        </div>

        <button className="px-6 py-2 bg-[#240457] text-white rounded-lg font-medium hover:bg-[#1a0340] transition-colors">
          Post
        </button>
      </div>
    </div>
  );
};

export default FeedInput;

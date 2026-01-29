"use client";
import React from "react";
import { FiImage, FiFileText, FiCalendar, FiHelpCircle } from "react-icons/fi";

const FeedInput = () => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
      <div className="mb-4">
        <textarea
          placeholder="Share an insight, ask a question, start a discussion..."
          className="w-full text-gray-700 placeholder:text-gray-400 border-none focus:ring-0 focus:outline-none resize-none bg-transparent text-sm"
          rows={3}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-100 pt-4">
        <div className="flex flex-wrap gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-medium transition-colors">
            <FiImage className="w-4 h-4" />
            <span>Photo/video</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-medium transition-colors">
            <FiFileText className="w-4 h-4" />
            <span>Document</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-medium transition-colors">
            <FiCalendar className="w-4 h-4" />
            <span>Event</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-medium transition-colors">
            <FiHelpCircle className="w-4 h-4" />
            <span>Question</span>
          </button>
        </div>

        <button className="px-6 py-2 bg-[#240457] text-white rounded-lg font-semibold hover:bg-[#1a0340] transition-colors text-sm w-full sm:w-auto">
          Post
        </button>
      </div>
    </div>
  );
};

export default FeedInput;

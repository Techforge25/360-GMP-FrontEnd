"use client";
import React, { useState } from "react";
import { FiImage, FiFileText, FiCalendar, FiHelpCircle } from "react-icons/fi";
import postsAPI from "@/services/postsAPI";

const FeedInput = ({ communityId, onPostCreated, isMember = false, membershipStatus = null }) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user has posting privileges
  const canPost = isMember && membershipStatus === "approved";
  const showSoonLabels = !canPost;

  const handleSubmit = async () => {
    if (!content.trim() || !communityId || isSubmitting || !canPost) return;

    try {
      setIsSubmitting(true);
      const response = await postsAPI.createPost({
        communityId,
        content: content.trim(),
      });

      if (response.success && onPostCreated) {
        onPostCreated(response.data);
        setContent("");
      }
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
      {!canPost && (
        <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            {!isMember 
              ? "You need to join this community to post." 
              : membershipStatus === "pending" 
                ? "Your membership request is pending approval."
                : "You need approval to post in this community."
            }
          </p>
        </div>
      )}
      
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={canPost 
            ? "Share an insight, ask a question, start a discussion..." 
            : "Join the community to start posting..."
          }
          className="w-full text-gray-700 placeholder:text-gray-400 border-none focus:ring-0 focus:outline-none resize-none bg-transparent text-sm"
          rows={3}
          maxLength={1000}
          disabled={!canPost}
        />
        {content.length > 0 && canPost && (
          <div className="text-sm text-gray-400 mt-1 text-right">
            {content.length}/1000
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-100 pt-4">
        <div className="flex flex-wrap gap-2">
          <button 
            disabled={!canPost}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              canPost 
                ? "hover:bg-gray-50 text-gray-600" 
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiImage className="w-4 h-4" />
            <span>Photo/video</span>
            {showSoonLabels && <span className="text-sm">(Soon)</span>}
          </button>
          <button 
            disabled={!canPost}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              canPost 
                ? "hover:bg-gray-50 text-gray-600" 
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiFileText className="w-4 h-4" />
            <span>Document</span>
            {showSoonLabels && <span className="text-sm">(Soon)</span>}
          </button>
          <button 
            disabled={!canPost}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              canPost 
                ? "hover:bg-gray-50 text-gray-600" 
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiCalendar className="w-4 h-4" />
            <span>Event</span>
            {showSoonLabels && <span className="text-sm">(Soon)</span>}
          </button>
          <button 
            disabled={!canPost}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              canPost 
                ? "hover:bg-gray-50 text-gray-600" 
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiHelpCircle className="w-4 h-4" />
            <span>Question</span>
            {showSoonLabels && <span className="text-sm">(Soon)</span>}
          </button>
        </div>

        <button 
          onClick={handleSubmit}
          disabled={!content.trim() || isSubmitting || !canPost}
          className="px-6 py-2 bg-[#240457] text-white rounded-lg font-semibold hover:bg-[#1a0340] transition-colors text-sm w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default FeedInput;

"use client";
import React, { useState } from "react";
import {
  FiMoreHorizontal,
  FiThumbsUp,
  FiMessageSquare,
  FiShare2,
  FiClock,
  FiMapPin,
  FiUsers,
  FiEye,
  FiDownload,
  FiPlay,
} from "react-icons/fi";
import { AiFillLike } from "react-icons/ai";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Event Post Type
  if (post.type === "event") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5">
          {/* Event Header */}
          <div className="flex gap-4">
            {/* Date Badge */}
            <div className="flex-shrink-0 w-14 h-14 bg-blue-500 rounded-lg flex flex-col items-center justify-center text-white">
              <span className="text-xs font-semibold">
                {post.date.split(" ")[0]}
              </span>
              <span className="text-xl font-bold">
                {post.date.split(" ")[1]}
              </span>
            </div>

            {/* Event Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-gray-900">
                  {post.title}
                </h3>
                <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full whitespace-nowrap">
                  Event
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {post.description}
              </p>

              <div className="space-y-1.5 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <FiClock className="w-4 h-4" />
                  <span>{post.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiMapPin className="w-4 h-4" />
                  <span>{post.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiUsers className="w-4 h-4" />
                  <span>{post.attendees} Attending</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 px-5 pb-4">
          <button className="px-4 py-2 bg-[#240457] text-white rounded-lg font-semibold text-sm hover:bg-[#1a0340] transition-colors">
            Register
          </button>
        </div>
      </div>
    );
  }

  // Document Post Type
  if (post.type === "document") {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {/* Author Header */}
        {post.author && (
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={
                    post.author?.image ||
                    "/assets/images/Portrait_Placeholder.png"
                  }
                  alt={post.author?.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/images/Portrait_Placeholder.png";
                  }}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  {post.author?.name}
                </h4>
                <div className="flex items-center text-xs text-gray-500 gap-1">
                  <span>{post.author?.role}</span>
                  <span>•</span>
                  <span>{post.timeAgo}</span>
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <FiMoreHorizontal size={20} />
            </button>
          </div>
        )}

        {/* Document Card */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          {/* File Icon */}
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-green-600 text-xs font-bold">
              {post.fileType}
            </span>
          </div>

          {/* Document Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 mb-1">
              {post.title}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {post.description}
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <FiDownload className="w-3 h-3" />
              <span>{post.downloads} Downloads</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-medium transition-colors flex items-center gap-2">
              <FiEye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>
          <button className="px-4 py-2 bg-[#240457] text-white rounded-lg font-semibold text-sm hover:bg-[#1a0340] transition-colors flex items-center gap-2">
            <FiDownload className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    );
  }

  // Regular Post (with optional image, video, or poll)
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
            <img
              src={
                post.author?.image || "/assets/images/Portrait_Placeholder.png"
              }
              alt={post.author?.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "/assets/images/Portrait_Placeholder.png";
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-gray-900">
                {post.author?.name}
              </h4>
              {post.tag && (
                <span className="px-2.5 py-0.5 bg-green-50 text-green-600 text-xs font-semibold rounded-full">
                  {post.tag}
                </span>
              )}
            </div>
            <div className="flex items-center text-xs text-gray-500 gap-1">
              <span>{post.author?.role}</span>
              <span>•</span>
              <span>{post.timeAgo}</span>
            </div>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <FiMoreHorizontal size={20} />
        </button>
      </div>

      {/* Post Title */}
      {post.title && (
        <h3 className="font-bold text-gray-900 mb-3 text-sm sm:text-base">
          {post.title}
        </h3>
      )}

      {/* Post Content */}
      {(post.content || post.videoTitle) && (
        <div className="mb-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            {post.content || post.videoTitle}
          </p>
          {post.readMore && (
            <button className="text-blue-600 text-sm font-medium hover:underline mt-1">
              Read more...
            </button>
          )}
        </div>
      )}

      {/* Poll/Quiz Options */}
      {post.type === "question" && post.options && (
        <div className="space-y-2 mb-4">
          {post.options.map((option, idx) => (
            <button
              key={idx}
              className="w-full p-3 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors text-left flex items-center gap-2"
            >
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 flex-shrink-0" />
              <span>{option.text}</span>
            </button>
          ))}
        </div>
      )}

      {/* Post Media - Image */}
      {post.image && (
        <div className="relative w-full rounded-lg overflow-hidden mb-4 bg-gray-100">
          <img
            src={post.image}
            alt="Post"
            className="w-full h-auto object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>
      )}

      {/* Post Media - Video Thumbnail */}
      {post.videoThumbnail && (
        <div className="relative w-full rounded-lg overflow-hidden mb-4 bg-gray-100">
          <img
            src={post.videoThumbnail}
            alt="Video"
            className="w-full h-auto object-cover"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors cursor-pointer">
              <FiPlay className="w-8 h-8 text-[#240457] ml-1" />
            </div>
          </div>
        </div>
      )}

      {/* Interactions Stats */}
      <div className="flex items-center gap-3 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
        <span>{post.likes || 0} Likes</span>
        <span>•</span>
        <span>{post.comments || 0} Comments</span>
        {post.shares > 0 && (
          <>
            <span>•</span>
            <span>{post.shares} Shares</span>
          </>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg text-sm font-semibold transition-colors flex-1 justify-center ${
            liked ? "text-red-500" : "text-gray-600"
          }`}
        >
          {liked ? (
            <AiFillLike className="w-5 h-5" />
          ) : (
            <FiThumbsUp className="w-5 h-5" />
          )}
          <span>Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-semibold transition-colors flex-1 justify-center"
        >
          <FiMessageSquare className="w-5 h-5" />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-semibold transition-colors flex-1 justify-center">
          <FiShare2 className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && post.commentsList && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button className="text-[#240457] text-sm font-semibold hover:underline flex items-center gap-1">
            View Discussion
            <FiMessageSquare className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;

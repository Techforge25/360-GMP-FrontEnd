"use client";
import React from "react";
import Image from "next/image";
import {
  FiMoreHorizontal,
  FiThumbsUp,
  FiMessageSquare,
  FiShare2,
} from "react-icons/fi";

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 mb-4">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-3">
          <div className="relative w-10 h-10">
            <Image
              src={
                post.author?.image || "/assets/images/Portrait_Placeholder.png"
              }
              alt={post.author?.name}
              fill
              className="rounded-full object-cover"
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

      {/* Post Content */}
      <h3 className="font-bold text-gray-900 mb-2">{post.title}</h3>
      {post.content && (
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          {post.content}
        </p>
      )}

      {/* Post Media */}
      {post.image && (
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden mb-4">
          <Image
            src={post.image}
            alt="Post image"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Poll or Quiz placeholder */}
      {post.type === "question" && (
        <div className="space-y-2 mb-4">
          {post.options?.map((option, idx) => (
            <div
              key={idx}
              className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              {option.text}
            </div>
          ))}
        </div>
      )}

      {/* Interactions Stats */}
      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pb-4 border-b border-gray-100">
        <span>{post.likes} Likes</span>
        <span>{post.comments} Comments</span>
        <span>{post.shares} Shares</span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-medium transition-colors">
          <FiThumbsUp />
          Like
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-medium transition-colors">
          <FiMessageSquare />
          Comment
        </button>
        <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-medium transition-colors">
          <FiShare2 />
          Share
        </button>
      </div>
    </div>
  );
};

export default PostCard;

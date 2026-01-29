"use client";
import React from "react";
import { FiUsers, FiEdit2, FiSettings, FiPlus } from "react-icons/fi";
import { MdVerified } from "react-icons/md";
import Image from "next/image";

const CommunityHeader = ({ community, isOwner, isMember }) => {
  if (!community) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
      {/* Cover Image */}
      <div className="h-48 sm:h-64 relative bg-gray-100">
        {community.coverImage && (
          <Image
            src={community.coverImage}
            alt="Cover"
            fill
            className="object-cover"
          />
        )}
      </div>

      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5 -mt-10 sm:-mt-12 relative z-10">
          {/* Logo */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl border-4 border-white bg-white shadow-md overflow-hidden relative flex-shrink-0">
            {community.profileImage || community.logo ? (
              <Image
                src={community.profileImage || community.logo}
                alt={community.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-500 font-bold text-3xl">
                {community.name?.charAt(0)}
              </div>
            )}
          </div>

          {/* Info & Actions */}
          <div className="flex-1 w-full pt-2 sm:pt-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
                  {community.name}
                  {community.isVerified && (
                    <MdVerified className="text-blue-500 text-xl" />
                  )}
                </h1>
                <p className="text-gray-600 mt-1 text-base max-w-2xl">
                  {community.shortDescription || community.description}
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <FiUsers className="w-4 h-4" />
                    <span className="font-medium text-gray-700">
                      {community.memberCount || 0}
                    </span>{" "}
                    Members
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="text-green-600 font-medium">
                    Active Community
                  </span>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <span className="capitalize">
                    {community.type || "Public"}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {isOwner ? (
                  <>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                      <FiSettings className="w-4 h-4" />
                      <span>Manage</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                      <FiEdit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </>
                ) : (
                  <button className="flex items-center gap-2 px-6 py-2.5 bg-[#240457] text-white rounded-lg hover:bg-[#1a0340] font-medium transition-colors shadow-sm">
                    {isMember ? "Joined" : "Join Community"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;

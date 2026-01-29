"use client";
import React, { useState } from "react";
import {
  FiMapPin,
  FiEdit2,
  FiMail,
  FiPhone,
  FiTrash2,
  FiPlus,
} from "react-icons/fi";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";

const UserSidebar = () => {
  const [socialLinks] = useState([
    { id: 1, platform: "linkedin", url: "#" },
    { id: 2, platform: "twitter", url: "#" },
    { id: 3, platform: "facebook", url: "#" },
  ]);

  const socialIcons = {
    linkedin: FaLinkedinIn,
    twitter: FaTwitter,
    facebook: FaFacebookF,
    instagram: FaInstagram,
  };

  return (
    <div className="space-y-6">
      {/* Profile Strength */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
        <div className="flex items-center gap-2 justify-center mb-2">
          <h3 className="text-lg font-semibold text-[#240457]">
            Profile Strength
          </h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-2">75 %</p>

        <div className="w-full bg-gray-100 rounded-full h-2.5 mb-6">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full"
            style={{ width: "75%" }}
          ></div>
        </div>

        <button className="w-full bg-[#240457] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-900 transition-colors flex items-center justify-center gap-2">
          Complete Your Profile
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Contact Info</h3>
          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400">
            <FiEdit2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 bg-gray-50/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#240457]">
              <FiMail className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-600">alex@gmail.com</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#240457]">
              <FiPhone className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-600">+123456789</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#240457]">
              <FiMapPin className="w-4 h-4" />
            </div>
            <span className="text-sm text-gray-600">San Francisco, CA</span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-3">Social Media</p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => {
              const Icon = socialIcons[link.platform] || FiMail;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  className="w-8 h-8 rounded-full bg-[#ECEFF6] flex items-center justify-center text-[#240457] hover:bg-indigo-100 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
          <button className="w-full mt-4 bg-[#240457] text-white py-2 rounded-lg text-xs font-semibold hover:bg-indigo-900 transition-colors flex items-center justify-center gap-1">
            Add Social Link <FiPlus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Resume Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Resume</h3>

        <div className="border border-gray-200 rounded-lg p-3 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gray-100 p-2 rounded">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-gray-500"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">Resume</p>
              <p className="text-xs text-gray-500">Uploaded On 12-1-2025</p>
            </div>
          </div>
          <button className="text-red-500 hover:text-red-700 p-1">
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>

        <button className="w-full bg-[#240457] text-white py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-900 transition-colors flex items-center justify-center gap-2">
          Update Resume/Portfolio
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserSidebar;

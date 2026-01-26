"use client";
import React from "react";
import { FiX, FiCheck, FiUser, FiArrowRight } from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import Link from "next/link";
import { useUserRole } from "@/context/UserContext";

const ProfileSwitchModal = ({ isOpen, onClose, userRole, onSwitch }) => {
  if (!isOpen) return null;

  const isBusiness = userRole === "business";

  // Configuration based on CURRENT role
  const config = isBusiness
    ? {
        // Business -> Personal
        sourceLabel: "BUSINESS",
        targetLabel: "PERSONAL",
        title: "Switch To Personal Profile?",
        description: (
          <span>
            You are leaving the{" "}
            <strong className="text-gray-900">Global Manufacturing Co.</strong>{" "}
            dashboard. Switch to your Personal Profile to continue shopping,
            message other suppliers, or track your job applications
          </span>
        ),
        stayBtnText: "Stay On Business Profile",
        switchBtnText: "Switch To User Profile & Continue",
        footerText: "Don't Have A User Profile?",
        footerLinkText: "Create One",
        sourceIcon: (
          <div className="w-20 h-20 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center mb-3">
            <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
          </div>
        ),
        targetIcon: (
          <div className="w-20 h-20 rounded-full border-2 border-purple-500 bg-white flex items-center justify-center mb-3">
            <img
              src="/assets/images/avatar.png"
              alt="User"
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.innerHTML =
                  '<svg stroke="currentColor" fill="none" class="w-10 h-10 text-gray-500" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
              }}
            />
          </div>
        ),
      }
    : {
        // Personal -> Business
        sourceLabel: "PERSONAL",
        targetLabel: "BUSINESS",
        title: "Switch To Business Profile?",
        description: (
          <span>
            Ready to get back to work? Switch to{" "}
            <strong>Global Manufacturing Co.</strong> to fulfill pending orders,
            update your product inventory, or review job applicants. Your
            personal browsing history will be saved
          </span>
        ),
        stayBtnText: "Stay On User Profile",
        switchBtnText: "Switch To Business Profile",
        footerText: "Don't Have A Business Profile?", // Adjusted logic as per typical flow, though image says "Don't Have A User Profile?" on the business switch one too? Wait, let me check the image again.
        // Image 1 (User -> Business): Footer says "Don't Have A User Profile? Create One". This seems like a typo in the design or I'm misinterpreting.
        // If I'm switching TO Business, I might need to create a Business profile.
        // But the image "uploaded_image_0..." (Personal -> Business) says "Don't Have A User Profile?". That's odd.
        // The second image (Business -> Personal) says "Don't Have A User Profile?".
        // I will follow the image exactly for the Footer as requested "Switch to User... Don't Have A User Profile?" makes sense.
        // "Switch to Business... Don't Have A User Profile?" makes less sense, but maybe it implies something else.
        // I will stick to "Don't Have A User Profile? Create One" for both if that's what the images imply, OR maybe the generic "Don't Have A User Profile?" is a global footer.
        // Let's look closely at image 0 (Switch to Business). Footer: "Don't Have A User Profile? Create One".
        // Let's look closely at image 1 (Switch to Personal). Footer: "Don't Have A User Profile? Create One".
        // Okay, I will use that exact text for both cases to be safe.
        footerLinkText: "Create One",
        sourceIcon: (
          <div className="w-20 h-20 rounded-full border-2 border-purple-500 bg-white flex items-center justify-center mb-3">
            <img
              src="/assets/images/avatar.png"
              alt="User"
              className="w-16 h-16 rounded-full object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentNode.innerHTML =
                  '<svg stroke="currentColor" fill="none" class="w-10 h-10 text-gray-500" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
              }}
            />
          </div>
        ),
        targetIcon: (
          <div className="w-20 h-20 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center mb-3">
            <div className="w-10 h-10 bg-orange-500 rounded flex items-center justify-center text-white font-bold text-xl">
              M
            </div>
          </div>
        ),
      };

  // For the Footer text, to be exact match:
  // Image 1 (Personal -> Business): "Don't Have A User Profile? Create One"
  // Image 2 (Business -> Personal): "Don't Have A User Profile? Create One"
  // I will hardcode it.

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl w-full max-w-3xl overflow-hidden shadow-2xl scale-100 animate-in zoom-in-95 duration-200 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 flex items-center gap-1 text-md font-medium"
        >
          Close <FiX className="w-5 h-5" />
        </button>

        <div className="p-8 pt-12 flex flex-col items-center text-center">
          {/* Icons Row */}
          <div className="flex items-center justify-center gap-8 mb-8 w-full">
            {/* Source */}
            <div className="flex flex-col items-center">
              {config.sourceIcon}
              <span className="text-sm font-medium text-gray-600 tracking-wider">
                {config.sourceLabel}
              </span>
            </div>

            {/* Arrow */}
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mx-2">
              <FiArrowRight className="w-5 h-5" />
            </div>

            {/* Target */}
            <div className="flex flex-col items-center">
              {config.targetIcon}
              <span className="text-sm font-medium text-gray-600 tracking-wider">
                {config.targetLabel}
              </span>
            </div>
          </div>

          {/* Text Content */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {config.title}
          </h2>
          <div className="text-gray-600 mb-8 max-w-lg mx-auto leading-relaxed">
            {config.description}
          </div>

          {/* Success Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-500 rounded-lg text-green-700 text-sm font-semibold mb-8">
            <div className="bg-green-600 rounded-full p-0.5">
              <FiCheck className="w-3 h-3 text-white" />
            </div>
            Don't Worry, Your Progress Is Saved.
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-6 w-full py-3 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              {config.stayBtnText}
            </button>
            <button
              onClick={onSwitch}
              className="flex-1 px-6 w-full py-3 rounded-lg bg-[#240457] text-white font-medium hover:bg-[#1a0340] transition-colors flex items-center justify-center gap-2"
            >
              {config.switchBtnText}
              <FiUser className="w-4 h-4" />
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-sm text-gray-600 mb-8">
            {isBusiness
              ? "Don't Have A User Profile?"
              : "Don't Have A Business Profile?"}{" "}
            <Link
              href={
                isBusiness
                  ? "/onboarding/user-profile"
                  : "/onboarding/business-profile"
              }
              className="text-blue-600 hover:underline"
            >
              {config.footerLinkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSwitchModal;

"use client";
import React from "react";
import { FiPower } from "react-icons/fi";

const SignOutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  const handleSignOut = () => {
    // Handle sign out logic here
    // For example: clear localStorage, redirect to login, etc.
    if (onConfirm) {
      onConfirm();
    } else {
      // Default sign out behavior
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl w-full max-w-md shadow-2xl animate-in zoom-in-95 duration-200 relative">
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          {/* Red Power Icon */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-500 flex items-center justify-center">
              <FiPower className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
            Sign Out Account
          </h2>

          {/* Description */}
          <p className="text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-sm mx-auto px-2">
            Logging out will end your current session. You can sign back in at
            any time to track your earnings and job posts
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              No
            </button>
            <button
              onClick={handleSignOut}
              className="flex-1 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;

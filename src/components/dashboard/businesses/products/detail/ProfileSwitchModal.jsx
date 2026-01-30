"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function ProfileSwitchModal({ isOpen, onClose, onProceed, businessName }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSwitchProfile = () => {
    onProceed();
  };

  const handleCreateProfile = () => {
    router.push("/onboarding/user-profile");
    onClose();
  };

return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-30 backdrop-blur-sm">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 relative">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
                <span className="text-sm font-medium mr-2">Close</span>
                <X className="w-5 h-5 inline" />
            </button>

            {/* Icon */}
            <div className="flex justify-center pt-8 pb-4">
                <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center">
                    <svg
                        className="w-12 h-12 text-yellow-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                    </svg>
                </div>
            </div>

            {/* Content */}
            <div className="px-8 pb-8">
                <h2 className="text-2xl font-bold text-center mb-4">
                    <span className="text-yellow-600">Action Required :</span>{" "}
                    <span className="text-gray-900">Switch Profile Context</span>
                </h2>

                <p className="text-center text-gray-600 mb-6">
                    You are currently logged in as {businessName || "Global Manufacturing Co."} (Business
                    Profile).
                </p>

                {/* Warning Box */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">
                        <span className="font-bold text-yellow-700">Note:</span> Business Profiles Are For
                        Selling Products And Posting Jobs Only. To Purchase Items, You Must Switch To Your
                        User Profile.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 mb-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                        Stay On Business Profile
                    </button>
                    <button
                        onClick={handleSwitchProfile}
                        className="flex-1 px-6 py-3 bg-[#110026] text-white rounded-lg font-semibold hover:bg-[#2a0b4d] transition-colors flex items-center justify-center gap-2"
                    >
                        Switch To User Profile & Continue
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    </button>
                </div>

                {/* Create Profile Link */}
                <p className="text-center text-sm text-gray-600">
                    Don&apos;t Have A User Profile?{" "}
                    <button
                        onClick={handleCreateProfile}
                        className="text-blue-600 font-semibold hover:underline"
                    >
                        Create One
                    </button>
                </p>
            </div>
        </div>
    </div>
);
}

"use client";
import React, { useState, useEffect } from "react";
import { FiX, FiPlus } from "react-icons/fi";

const SOCIAL_PATTERNS = {
  linkedin: /^https:\/\/(www\.)?linkedin\.com\/in\//i,
  twitter: /^https:\/\/(www\.)?(twitter\.com|x\.com)\//i,
  facebook: /^https:\/\/(www\.)?facebook\.com\//i,
  instagram: /^https:\/\/(www\.)?instagram\.com\//i,
  github: /^https:\/\/(www\.)?github\.com\//i,
  website: /^https?:\/\//i,
};

const SocialLinkModal = ({ isOpen, onClose, onSave, editingLink = null }) => {
  const [formData, setFormData] = useState({
    platformName: "",
    url: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const platformOptions = [
    {
      value: "linkedin",
      label: "LinkedIn",
      placeholder: "https://linkedin.com/in/yourprofile",
    },
    {
      value: "twitter",
      label: "Twitter",
      placeholder: "https://twitter.com/yourhandle",
    },
    {
      value: "facebook",
      label: "Facebook",
      placeholder: "https://facebook.com/yourprofile",
    },
    {
      value: "instagram",
      label: "Instagram",
      placeholder: "https://instagram.com/yourhandle",
    },
    {
      value: "github",
      label: "GitHub",
      placeholder: "https://github.com/yourusername",
    },
    {
      value: "website",
      label: "Personal Website",
      placeholder: "https://yourwebsite.com",
    },
    { value: "other", label: "Other", placeholder: "https://yourlink.com" },
  ];

  useEffect(() => {
    if (editingLink) {
      setFormData({
        platformName: editingLink.platformName || "",
        url: editingLink.url || "",
      });
    } else {
      setFormData({
        platformName: "",
        url: "",
      });
    }
    setError("");
  }, [editingLink, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setError("");
  };

  const getSelectedPlatform = () => {
    return platformOptions.find((p) => p.value === formData.platformName);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const pattern = SOCIAL_PATTERNS[formData.platformName];
    if (pattern && !pattern.test(formData.url)) {
      setError(
        `Invalid ${formData.platformName} URL. Please include the correct prefix.`,
      );
      return;
    }

    setIsLoading(true);

    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Failed to save social link:", error);
      setError(
        error?.message || "Failed to save social link. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50  flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {editingLink ? "Edit Social Link" : "Add Social Link"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Platform Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Platform
            </label>
            <select
              value={formData.platformName}
              onChange={(e) =>
                handleInputChange("platformName", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#240457] text-gray-600"
              required
            >
              <option value="">Select Platform</option>
              {platformOptions.map((platform) => (
                <option key={platform.value} value={platform.value}>
                  {platform.label}
                </option>
              ))}
            </select>
          </div>

          {/* URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange("url", e.target.value)}
              placeholder={
                getSelectedPlatform()?.placeholder || "https://example.com"
              }
              className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-[#240457] text-gray-600 ${error ? "border-red-500" : "border-gray-300"}`}
              required
            />
            {error && <p className="mt-1.5 text-[13px] text-red-500">{error}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-2.5 px-4 bg-[#240457] text-white rounded-lg hover:bg-[#240457]/90 transition-colors disabled:opacity-50"
            >
              {isLoading ? "Saving..." : editingLink ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SocialLinkModal;

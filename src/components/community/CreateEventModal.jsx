"use client";
import React, { useState, useRef } from "react";
import { FiX, FiMapPin, FiGlobe, FiChevronDown } from "react-icons/fi";
import { uploadToCloudinary } from "@/lib/cloudinary";
import postsAPI from "@/services/postsAPI";

const CreateEventModal = ({ isOpen, onClose, onSubmit, communityId }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    location: "",
    tags: "",
    shareTo: "public",
  });
  const [bannerImage, setBannerImage] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size must be less than 10MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    setBannerImage(file);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setBannerImage(null);
    if (bannerPreview) {
      URL.revokeObjectURL(bannerPreview);
      setBannerPreview(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.date ||
      !formData.location ||
      !formData.description
    ) {
      alert("Please fill in all event details");
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = null;

      if (bannerImage) {
        setIsUploading(true);
        try {
          imageUrl = await uploadToCloudinary(bannerImage, "community/events");
        } catch (error) {
          console.error("Image upload failed:", error);
          alert("Failed to upload event banner");
          setIsUploading(false);
          setIsSubmitting(false);
          return;
        }
        setIsUploading(false);
      }

      // Combine date and time (default to 00:00 if no time)
      const timeString = formData.time || "00:00";
      const eventDate = new Date(`${formData.date}T${timeString}`);

      const payload = {
        communityId,
        // content: formData.description, // Main content is the description
        type: "event",
        event: {
          name: formData.name,
          description: formData.description,
          date: eventDate,
          location: formData.location,
        },
        images: imageUrl ? [imageUrl] : [],
        tags: formData.tags,
        shareTo: formData.shareTo,
      };

      const response = await postsAPI.createPost(payload);

      if (response.success && onSubmit) {
        onSubmit(response.data);
        onClose();
        // Reset form
        setFormData({
          name: "",
          description: "",
          date: "",
          time: "",
          location: "",
          tags: "",
          shareTo: "public",
        });
        handleRemoveImage();
      }
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Failed to create event");
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Create Event</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Description */}
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell people what your event is about..."
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-sm resize-none"
              />
            </div>

            {/* Event Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Event Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="e.g. Community Meetup 2024"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-sm"
              />
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="e.g. New York Convention Center or Zoom Link"
                  className="w-full px-4 py-2.5 pl-10 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-sm"
                />
                <FiMapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Tags Section */}
            {/* <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Tags</label>
              <div className="relative">
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="Tag business or user (@ company or @user)"
                  className="w-full px-4 py-2.5 pr-10 rounded-xl border border-gray-200 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all text-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <FiChevronDown className="text-gray-400 w-4 h-4" />
                </div>
              </div>
            </div> */}

            {/* Share To Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">
                  Share To
                </span>
                <FiGlobe className="text-[#6366f1] w-4 h-4" />
              </div>

              <div className="flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="shareTo"
                    value="public"
                    checked={formData.shareTo === "public"}
                    onChange={handleInputChange}
                    className="w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#240457] checked:border-[5px] appearance-none transition-all cursor-pointer"
                  />
                  <span
                    className={`text-sm transition-colors ${
                      formData.shareTo === "public"
                        ? "text-[#6366f1] font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    Public
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="radio"
                    name="shareTo"
                    value="private"
                    checked={formData.shareTo === "private"}
                    onChange={handleInputChange}
                    className="w-5 h-5 border-2 border-gray-300 rounded-full checked:border-[#240457] checked:border-[5px] appearance-none transition-all cursor-pointer"
                  />
                  <span
                    className={`text-sm transition-colors ${
                      formData.shareTo === "private"
                        ? "text-indigo-900 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    Private
                  </span>
                </label>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isUploading}
                className="px-8 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#240457] hover:bg-[#1a0340] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {isUploading
                  ? "Uploading..."
                  : isSubmitting
                    ? "Creating..."
                    : "Create Event"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;

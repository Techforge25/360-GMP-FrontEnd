"use client";
import React, { useState, useRef } from "react";
import { FiX, FiCamera, FiGlobe, FiChevronDown } from "react-icons/fi";
import { IoCameraOutline } from "react-icons/io5";
import { uploadToCloudinary } from "@/lib/cloudinary";
import postsAPI from "@/services/postsAPI";

const CreatePostModal = ({ isOpen, onClose, onSubmit, communityId }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit

      if (!isImage && !isVideo) {
        alert(`${file.name} is not a valid image or video file.`);
        return false;
      }
      if (!isValidSize) {
        alert(`${file.name} exceeds 10MB size limit.`);
        return false;
      }
      return true;
    });

    // Create preview URLs
    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      type: file.type.startsWith("image/") ? "image" : "video",
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => {
      const updated = [...prev];
      URL.revokeObjectURL(updated[index].preview);
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleSubmit = async () => {
    if (!content.trim() && selectedImages.length === 0) {
      alert("Please add some content or images to your post.");
      return;
    }

    setIsSubmitting(true);
    setIsUploading(true);

    try {
      // Upload images to Cloudinary
      const uploadedImageUrls = [];

      for (let i = 0; i < selectedImages.length; i++) {
        const image = selectedImages[i];
        setUploadProgress(Math.round(((i + 1) / selectedImages.length) * 100));

        try {
          const folder = "community/posts";
          const imageUrl = await uploadToCloudinary(image.file, folder);
          uploadedImageUrls.push(imageUrl);
        } catch (uploadError) {
          console.error(`Failed to upload image ${i + 1}:`, uploadError);
          throw new Error(`Failed to upload image ${i + 1}`);
        }
      }

      setIsUploading(false);

      // Create post payload
      const postPayload = {
        communityId,
        content: content.trim(),
        type: uploadedImageUrls.length > 0 ? "post" : "post",
        images: uploadedImageUrls,
      };

      // Call backend API
      const response = await postsAPI.createPost(postPayload);

      if (response.success) {
        // Call parent onSubmit if provided
        if (onSubmit) {
          await onSubmit(response.data);
        }

        // Reset form
        setContent("");
        setTags("");
        setSelectedImages([]);
        setUploadProgress(0);
        onClose();
      }
    } catch (error) {
      console.error("Failed to create post:", error);
      alert(error.message || "Failed to create post. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <div className="bg-white w-full max-w-7xl rounded-2xl shadow-xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-[#111827]">Create A Post</h2>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500 disabled:opacity-50"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area - Scrollable */}
        <div className="px-6 py-5 space-y-5 overflow-y-auto flex-1">
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind? start a post..."
              className="w-full min-h-[140px] p-4 text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-xl focus:ring-0 focus:outline-none resize-none bg-white transition-all text-base"
              disabled={isSubmitting}
            />
          </div>

          {/* Image Previews */}
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {selectedImages.map((image, index) => (
                <div
                  key={index}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                >
                  {image.type === "image" ? (
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={image.preview}
                      className="w-full h-full object-cover"
                      muted
                    />
                  )}
                  <button
                    onClick={() => handleRemoveImage(index)}
                    disabled={isSubmitting}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">
                  Uploading images...
                </span>
                <span className="text-sm font-semibold text-blue-900">
                  {uploadProgress}%
                </span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Tags Section */}
          <div className="space-y-2">
            <label className="text-lg font-semibold text-gray-900">Tags</label>
            <div className="relative">
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tag Business Or Mention User (@Company Or @User)"
                className="w-full p-4 pr-12 text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-xl focus:ring-0 focus:outline-none bg-white transition-all text-base"
                disabled={isSubmitting}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <FiChevronDown className="text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Add To Your Post Section */}
          <div className="flex items-center gap-3 py-3 border-t border-gray-50">
            <span className="text-base font-medium text-gray-500">
              Add To Your Post
            </span>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting}
              className="flex items-center gap-2 group transition-all disabled:opacity-50"
            >
              <IoCameraOutline className="text-[#22c55e] w-6 h-6" />
              <span className="text-[#22c55e] font-medium text-base">
                Photo
              </span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              className="hidden"
              accept="image/*,video/*"
              multiple
              disabled={isSubmitting}
            />
          </div>

          {/* Share To Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold text-gray-900">
                Share To
              </span>
              <FiGlobe className="text-[#6366f1] w-5 h-5" />
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="visibility"
                  value="public"
                  checked={visibility === "public"}
                  onChange={(e) => setVisibility(e.target.value)}
                  disabled={isSubmitting}
                  className="w-6 h-6 border-2 border-gray-300 rounded-full checked:border-[#240457] checked:border-[7px] appearance-none transition-all cursor-pointer disabled:opacity-50"
                />
                <span
                  className={`text-lg transition-colors ${visibility === "public" ? "text-[#6366f1]" : "text-gray-500"}`}
                >
                  Public
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="visibility"
                  value="private"
                  checked={visibility === "private"}
                  onChange={(e) => setVisibility(e.target.value)}
                  disabled={isSubmitting}
                  className="w-6 h-6 border-2 border-gray-300 rounded-full checked:border-[#240457] checked:border-[7px] appearance-none transition-all cursor-pointer disabled:opacity-50"
                />
                <span
                  className={`text-lg transition-colors ${visibility === "private" ? "text-indigo-900" : "text-gray-500"}`}
                >
                  Private
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-5 flex items-center justify-end gap-3 border-t border-gray-50">
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="px-10 py-2.5 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-all border border-gray-200 bg-white min-w-[120px] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={
              (!content.trim() && selectedImages.length === 0) || isSubmitting
            }
            className="px-12 py-2.5 text-base font-semibold text-white bg-[#1a0144] hover:bg-[#1a0144]/90 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          >
            {isUploading
              ? "Uploading..."
              : isSubmitting
                ? "Posting..."
                : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;

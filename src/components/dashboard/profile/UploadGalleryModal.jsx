"use client";
import React, { useState, useRef } from "react";
import {
  FiX,
  FiCamera,
  FiUpload,
  FiArrowRight,
  FiLoader,
} from "react-icons/fi"; // Added FiLoader
import galleryAPI from "@/services/galleryAPI";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { toast } from "react-toastify";

const UploadGalleryModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [albumName, setAlbumName] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      // Validate file size and type if needed
      const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024); // 10MB limit

      setSelectedFiles((prev) => [...prev, ...validFiles]);

      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      setPreviews((prev) => [...prev, ...newPreviews]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileChange({ target: { files } });
    }
  };

  const removeFile = (index) => {
    const newFiles = [...selectedFiles];
    newFiles.splice(index, 1);
    setSelectedFiles(newFiles);

    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]); // Cleanup
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  const handleSubmit = async () => {
    if (!albumName.trim()) {
      toast.error("Please enter an album name");
      return;
    }
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    setUploading(true);
    try {
      // 1. Upload images to Cloudinary
      const uploadPromises = selectedFiles.map((file) =>
        uploadToCloudinary(file, "gallery_images"),
      );

      const imageUrls = await Promise.all(uploadPromises);

      // 2. Submit album data with URLs
      const payload = {
        albumName,
        description,
        images: imageUrls,
      };

      const response = await galleryAPI.uploadAlbum(payload);

      if (response.success) {
        toast.success("Album uploaded successfully!");
        onUploadSuccess && onUploadSuccess();
        handleClose();
      }
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error(error.message || "Failed to upload album");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setSelectedFiles([]);
    setPreviews([]);
    setAlbumName("");
    setDescription("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
          <h2 className="text-lg font-bold text-gray-900">
            Upload Gallery Album
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
          {/* Upload Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Images
            </label>
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                previews.length > 0
                  ? "border-gray-200 bg-gray-50"
                  : "border-gray-200 hover:border-[#240457] hover:bg-purple-50 bg-white"
              }`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/jpeg,image/png,video/*"
                className="hidden"
                multiple // Allow multiple selection
              />

              {previews.length > 0 ? (
                <div className="grid grid-cols-3 gap-2">
                  {previews.map((url, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img
                        src={url}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeFile(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:text-[#240457] hover:border-[#240457] hover:bg-purple-50 transition-colors"
                  >
                    <FiUpload className="w-5 h-5" />
                    <span className="text-xs mt-1">Add More</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4 py-4">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="text-base font-medium text-gray-900 flex items-center gap-2">
                      <span className="flex items-center gap-1.5 text-[#240457]">
                        <FiCamera className="w-6 h-6" />
                      </span>
                      Create New Album
                    </div>
                    <p className="text-xs text-gray-400">
                      Drag & drop multiple images or click to browse
                    </p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-[#240457] text-white text-sm font-medium rounded-lg hover:bg-[#3b0b85] transition-colors flex items-center gap-2 mx-auto"
                  >
                    <FiUpload className="w-4 h-4" />
                    Select Photos
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Album Name Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Album Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              placeholder="e.g Factory Tour 2024"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#240457]/20 focus:border-[#240457]"
            />
          </div>

          {/* Description Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description{" "}
              <span className="text-gray-400 font-normal">(Optional)</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about this collection of images..."
              rows={3}
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#240457]/20 focus:border-[#240457] resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 shrink-0">
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className={`w-full py-3 bg-[#240457] text-white rounded-xl font-semibold hover:bg-[#3b0b85] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#240457]/20 active:scale-[0.99] ${uploading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {uploading ? (
              <>
                <FiLoader className="w-5 h-5 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                Upload Album
                <FiArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadGalleryModal;

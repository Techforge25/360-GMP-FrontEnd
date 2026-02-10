"use client";
import React, { useState, useRef } from "react";
import { FiX, FiGlobe, FiChevronDown, FiFile, FiUpload } from "react-icons/fi";
import { uploadToCloudinary } from "@/lib/cloudinary";
import postsAPI from "@/services/postsAPI";

const ShareDocumentModal = ({ isOpen, onClose, onSubmit, communityId }) => {
  const [content, setContent] = useState("");
  const [documentTitle, setDocumentTitle] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDocumentSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "text/plain",
    ];

    if (!validTypes.includes(file.type)) {
      alert(
        "Please select a valid document file (PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT)",
      );
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size exceeds 10MB limit.");
      return;
    }

    setSelectedDocument(file);
  };

  const handleRemoveDocument = () => {
    setSelectedDocument(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    if (!content.trim() || !selectedDocument || !documentTitle.trim()) {
      alert("Please fill in all required fields and select a document.");
      return;
    }

    setIsSubmitting(true);
    setIsUploading(true);

    try {
      // Upload document to Cloudinary
      const folder = "community/documents";
      const documentUrl = await uploadToCloudinary(
        selectedDocument,
        folder,
        (progress) => {
          setUploadProgress(progress);
        },
      );

      setIsUploading(false);

      // Create post payload
      const postPayload = {
        communityId,
        content: content.trim(),
        type: "document",
        file: {
          url: documentUrl,
          name: documentTitle.trim(),
          size: selectedDocument.size,
          mimeType: selectedDocument.type,
        },
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
        setDocumentTitle("");
        setTags("");
        setSelectedDocument(null);
        setUploadProgress(0);
        onClose();
      }
    } catch (error) {
      console.error("Failed to share document:", error);
      alert(error.message || "Failed to share document. Please try again.");
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4">
      <div className="bg-white w-full max-w-7xl rounded-2xl shadow-xl relative overflow-hidden animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <h2 className="text-2xl font-bold text-[#111827]">
            Share A Document/Or Report
          </h2>
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
          {/* Main Content Textarea */}
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Main post body text explaining the document.."
              className="w-full min-h-[140px] p-4 text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-xl focus:ring-0 focus:outline-none resize-none bg-white transition-all text-base"
              disabled={isSubmitting}
            />
          </div>

          <p className="text-sm text-gray-600">
            Main Text Area Will Serve As The Caption Explaining The Document.
          </p>

          {/* Document Title */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                value={documentTitle}
                onChange={(e) => setDocumentTitle(e.target.value)}
                placeholder="Required: Descriptive File Title (e.g Q4 2025 Financial Report)"
                className="w-full p-4 pr-12 text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-xl focus:ring-0 focus:outline-none bg-white transition-all text-base"
                disabled={isSubmitting}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <FiChevronDown className="text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Tags Section */}
          <div className="space-y-2">
            <label className="text-lg font-semibold text-gray-900">Tags</label>
            <div className="relative">
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tag business or user (@ company or @user)"
                className="w-full p-4 pr-12 text-gray-700 placeholder:text-gray-400 border border-gray-200 rounded-xl focus:ring-0 focus:outline-none bg-white transition-all text-base"
                disabled={isSubmitting}
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <FiChevronDown className="text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Document Preview */}
          {selectedDocument && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiFile className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {selectedDocument.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(selectedDocument.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleRemoveDocument}
                  disabled={isSubmitting}
                  className="p-2 hover:bg-gray-200 rounded-full text-gray-500 transition-colors disabled:opacity-50"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-900">
                  Uploading document...
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

          {/* Add To Your Post Section */}
          <div className="flex items-center gap-3 py-3 border-t border-gray-50">
            <span className="text-base font-medium text-gray-500">
              Add To Your Post
            </span>
            <span className="text-gray-300">|</span>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isSubmitting || selectedDocument}
              className="flex items-center gap-2 group transition-all disabled:opacity-50"
            >
              <FiUpload className="text-[#6366f1] w-5 h-5" />
              <span className="text-[#6366f1] font-medium text-base">
                Documet
              </span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleDocumentSelect}
              className="hidden"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
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
              !content.trim() ||
              !selectedDocument ||
              !documentTitle.trim() ||
              isSubmitting
            }
            className="px-12 py-2.5 text-base font-semibold text-white bg-[#1a0144] hover:bg-[#1a0144]/90 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed min-w-[160px]"
          >
            {isUploading
              ? "Uploading..."
              : isSubmitting
                ? "Posting..."
                : "Post Document"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareDocumentModal;

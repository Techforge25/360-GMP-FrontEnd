"use client";
import React, { useState } from "react";
import {
  FiImage,
  FiFileText,
  FiCalendar,
  FiHelpCircle,
  FiX,
} from "react-icons/fi";
import postsAPI from "@/services/postsAPI";
import { uploadToCloudinary } from "@/lib/cloudinary";
import CreatePostModal from "./CreatePostModal";
import ShareDocumentModal from "./ShareDocumentModal";
import CreateEventModal from "./CreateEventModal";
import CreatePollModal from "./CreatePollModal";

const FeedInput = ({
  communityId,
  onPostCreated,
  isMember = false,
  membershipStatus = null,
  isOwner = false,
}) => {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isPollModalOpen, setIsPollModalOpen] = useState(false);
  const fileInputRef = React.useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit.");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Check if user has posting privileges (owner can always post)
  const canPost = isOwner || (isMember && membershipStatus === "approved");
  const showSoonLabels = !canPost;

  const handleSubmit = async () => {
    if (
      (!content.trim() && !selectedFile) ||
      !communityId ||
      isSubmitting ||
      !canPost
    )
      return;

    try {
      setIsSubmitting(true);

      let fileUrl = null;
      let fileType = null;

      if (selectedFile) {
        setIsUploading(true);
        try {
          const folder = "community/documents";
          fileUrl = await uploadToCloudinary(selectedFile, folder);
          fileType = selectedFile.type;
        } catch (uploadError) {
          console.error("File upload failed:", uploadError);
          alert("Failed to upload file. Please try again.");
          setIsUploading(false);
          setIsSubmitting(false);
          return;
        }
        setIsUploading(false);
      }

      const postPayload = {
        communityId,
        content: content.trim(),
        type: selectedFile ? "document" : "post",
        ...(fileUrl && {
          file: {
            url: fileUrl,
            name: selectedFile.name,
            size: selectedFile.size,
            mimeType: selectedFile.type,
          },
        }),
      };

      const response = await postsAPI.createPost(postPayload);

      if (response.success && onPostCreated) {
        onPostCreated(response.data);
        setContent("");
        handleRemoveFile();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      const errorMessage =
        error?.message || "Failed to create post. Please try again.";
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
      setIsUploading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4">
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={onPostCreated}
        communityId={communityId}
      />

      <ShareDocumentModal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
        onSubmit={onPostCreated}
        communityId={communityId}
      />

      <CreateEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onSubmit={onPostCreated}
        communityId={communityId}
      />

      <CreatePollModal
        isOpen={isPollModalOpen}
        onClose={() => setIsPollModalOpen(false)}
        onSubmit={onPostCreated}
        communityId={communityId}
      />

      {!canPost && (
        <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            {!isMember
              ? "You need to join this community to post."
              : membershipStatus === "pending"
                ? "Your membership request is pending approval."
                : "You need approval to post in this community."}
          </p>
        </div>
      )}

      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            canPost
              ? "Share an insight, ask a question, start a discussion..."
              : "Join the community to start posting..."
          }
          className="w-full text-gray-700 placeholder:text-gray-400 border-none focus:ring-0 focus:outline-none resize-none bg-transparent text-sm"
          rows={3}
          maxLength={1000}
          disabled={!canPost}
        />
        {/* Selected File Preview */}
        {selectedFile && (
          <div className="mt-2 flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center flex-shrink-0 text-blue-600">
                <FiFileText />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {selectedFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              className="p-1 hover:bg-gray-200 rounded-full text-gray-500 transition-colors"
            >
              <FiX className="w-4 h-4" />
            </button>
          </div>
        )}

        {content.length > 0 && canPost && (
          <div className="text-sm text-gray-400 mt-1 text-right">
            {content.length}/1000
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-gray-100 pt-4">
        <div className="flex flex-wrap gap-2">
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.txt" // Allow document types
          />

          <button
            disabled={!canPost}
            onClick={() => setIsModalOpen(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              canPost
                ? "hover:bg-gray-50 text-gray-600"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiImage className="w-4 h-4" />
            <span>Photo/video</span>
            {showSoonLabels && <span className="text-sm">(Soon)</span>}
          </button>
          <button
            disabled={!canPost}
            onClick={() => setIsDocumentModalOpen(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              canPost
                ? "hover:bg-gray-50 text-gray-600"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiFileText className="w-4 h-4" />
            <span>Document</span>
          </button>
          <button
            disabled={!canPost}
            onClick={() => setIsEventModalOpen(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              canPost
                ? "hover:bg-gray-50 text-gray-600"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiCalendar className="w-4 h-4" />
            <span>Event</span>
          </button>
          <button
            disabled={!canPost}
            onClick={() => setIsPollModalOpen(true)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              canPost
                ? "hover:bg-gray-50 text-gray-600"
                : "text-gray-400 cursor-not-allowed"
            }`}
          >
            <FiHelpCircle className="w-4 h-4" />
            <span>Poll</span>
            {showSoonLabels && <span className="text-sm">(Soon)</span>}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={
            (!content.trim() && !selectedFile) || isSubmitting || !canPost
          }
          className="px-6 py-2 bg-[#240457] text-white rounded-lg font-semibold hover:bg-[#1a0340] transition-colors text-sm w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? "Uploading..." : isSubmitting ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
};

export default FeedInput;

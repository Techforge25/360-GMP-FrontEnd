"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import testimonialAPI from "@/services/testimonialAPI";
import { showSuccess, showError } from "@/utils/toasterMessage";

export default function PostReviewModal({ isOpen, onClose, businessName }) {
  const [step, setStep] = useState(1); // 1: Invite, 2: Review
  const [inviteToken, setInviteToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Review Data
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  if (!isOpen) return null;

  const handleVerifyToken = async (e) => {
    e.preventDefault();
    if (!inviteToken.trim()) {
      setError("Please enter a valid invite token");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await testimonialAPI.checkInviteToken(inviteToken);
      if (response && response.success) {
        setStep(2);
      } else {
        // Fallback if success is not explicitly true but no error thrown (though axios interceptor usually throws)
        if (response?.isUsed) {
          setError("This invite token has already been used.");
        } else {
          setStep(2); // Assuming if API call succeeds without error, it's valid.
          // Ideally API should return precise status. Based on req:
          // "Review invite is valid"
        }
      }
    } catch (err) {
      console.error("Token verification failed:", err);
      // Backend error message is usually in err.message or err.data.message
      setError(err.message || "Invalid or expired invite token");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (!description.trim()) {
      setError("Please write a description");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = {
        rating,
        title,
        description,
      };

      const response = await testimonialAPI.createTestimonial(
        inviteToken,
        data,
      );

      if (response && response.success) {
        showSuccess("Review submitted successfully!");
        handleClose();
      }
    } catch (err) {
      console.error("Review submission failed:", err);
      setError(err.message || "Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setInviteToken("");
    setRating(0);
    setTitle("");
    setDescription("");
    setError("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-800">
            {step === 1 ? "Enter Invite Code" : "Write a Review"}
          </h3>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        {/* content */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center">
              {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleVerifyToken}>
              <p className="text-gray-600 mb-4 text-sm">
                To ensure authentic reviews, we require an invite code from{" "}
                <strong>{businessName}</strong>. Please enter the code you
                received below.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Invite Token
                </label>
                <input
                  type="text"
                  value={inviteToken}
                  onChange={(e) => setInviteToken(e.target.value)}
                  placeholder="Enter your invite token"
                  className="w-full text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#240457] text-white py-2.5 rounded-lg font-semibold hover:bg-[#1a0340] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Verify Token"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitReview}>
              {/* Rating */}
              <div className="mb-5 text-center">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rate your experience
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="text-2xl transition-transform hover:scale-110 focus:outline-none"
                    >
                      <FaStar
                        className={
                          star <= (hoverRating || rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <p className="text-sm text-purple-600 font-medium mt-1">
                    {rating === 5
                      ? "Excellent!"
                      : rating === 4
                        ? "Good"
                        : rating === 3
                          ? "Average"
                          : rating === 2
                            ? "Poor"
                            : "Terrible"}
                  </p>
                )}
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Summarize your experience"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none"
                />
              </div>

              {/* Description */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Tell us about your experience..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent outline-none resize-none"
                  required
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-[#240457] text-white py-2 rounded-lg font-semibold hover:bg-[#1a0340] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Submit Review"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

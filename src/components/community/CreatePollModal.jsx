"use client";
import React, { useState } from "react";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import { MdPublic, MdLock } from "react-icons/md";
import postsAPI from "@/services/postsAPI";

const CreatePollModal = ({ isOpen, onClose, onSubmit, communityId }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [duration, setDuration] = useState("1week");
  const [tags, setTags] = useState("");
  const [shareTo, setShareTo] = useState("public");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const durationOptions = [
    { value: "1day", label: "1 Day" },
    { value: "2days", label: "2 Days" },
    { value: "3days", label: "3 Days" },
    { value: "1week", label: "1 Week" },
    { value: "2weeks", label: "2 Weeks" },
  ];

  const calculateDurationDate = (durationValue) => {
    const now = new Date();
    const durationMap = {
      "1day": 1,
      "2days": 2,
      "3days": 3,
      "1week": 7,
      "2weeks": 14,
    };
    const days = durationMap[durationValue] || 7;
    now.setDate(now.getDate() + days);
    return now.toISOString();
  };

  const handleAddOption = () => {
    if (options.length < 10) {
      setOptions([...options, ""]);
    }
  };

  const handleRemoveOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async () => {
    if (!question.trim()) {
      alert("Please enter a poll question");
      return;
    }

    const validOptions = options.filter((opt) => opt.trim());
    if (validOptions.length < 2) {
      alert("Please provide at least 2 options");
      return;
    }

    try {
      setIsSubmitting(true);

      const pollPayload = {
        communityId,
        type: "poll",
        poll: {
          question: question.trim(),
          options: validOptions.map((opt) => ({ option: opt.trim() })),
          duration: calculateDurationDate(duration),
        },
        shareTo,
        tags: tags.trim() || "",
      };

      const response = await postsAPI.createPost(pollPayload);

      if (response.success && onSubmit) {
        onSubmit(response.data);
        handleClose();
      }
    } catch (error) {
      console.error("Error creating poll:", error);
      alert(error?.message || "Failed to create poll. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setQuestion("");
    setOptions(["", ""]);
    setDuration("1week");
    setTags("");
    setShareTo("public");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Create Poll
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">
              Poll Setup
            </h3>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="The main question text (Required)"
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#240457] focus:border-transparent outline-none text-sm"
                  maxLength={500}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Options (Min 2 Required)
                </label>
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        placeholder={`Option ${index + 1}`}
                        className="flex-1 text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#240457] focus:border-transparent outline-none text-sm"
                        maxLength={200}
                      />
                      {options.length > 2 && (
                        <button
                          onClick={() => handleRemoveOption(index)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {options.length < 10 && (
                  <button
                    onClick={handleAddOption}
                    className="mt-2 flex items-center gap-2 text-[#240457] hover:text-[#1a0340] text-sm font-medium"
                  >
                    <FiPlus className="w-4 h-4" />
                    Add Option
                  </button>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poll Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#240457] focus:border-transparent outline-none text-sm bg-white"
                >
                  {durationOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Tag business or user (@company or @user)"
                  className="w-full text-black px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#240457] focus:border-transparent outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                  Share To <MdPublic className="w-4 h-4" />
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="shareTo"
                      value="public"
                      checked={shareTo === "public"}
                      onChange={(e) => setShareTo(e.target.value)}
                      className="w-4 h-4 text-[#240457] focus:ring-[#240457]"
                    />
                    <span className="text-sm text-gray-700">Public</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="shareTo"
                      value="private"
                      checked={shareTo === "private"}
                      onChange={(e) => setShareTo(e.target.value)}
                      className="w-4 h-4 text-[#240457] focus:ring-[#240457]"
                    />
                    <span className="text-sm text-gray-700">Private</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="px-6 py-2.5 bg-[#240457] text-white rounded-lg font-semibold hover:bg-[#1a0340] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Posting..." : "Post Question/Poll"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePollModal;

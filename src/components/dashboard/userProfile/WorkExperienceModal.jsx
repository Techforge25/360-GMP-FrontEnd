"use client";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const WorkExperienceModal = ({
  isOpen,
  onClose,
  onSave,
  editingExperience = null,
}) => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    employmentType: [],
    companyName: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    isCurrentlyWorking: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const employmentTypes = [
    "Full Time",
    "Part-Time",
    "Contract",
    "Remote",
    "Hybrid",
  ];

  useEffect(() => {
    if (editingExperience) {
      setFormData({
        jobTitle: editingExperience.jobTitle || "",
        employmentType: editingExperience.employmentType || [],
        companyName: editingExperience.companyName || "",
        location: editingExperience.location || "",
        description: editingExperience.description || "",
        startDate: editingExperience.startDate
          ? new Date(editingExperience.startDate).toISOString().split("T")[0]
          : "",
        endDate: editingExperience.endDate
          ? new Date(editingExperience.endDate).toISOString().split("T")[0]
          : "",
        isCurrentlyWorking: editingExperience.isCurrentlyWorking || false,
      });
    } else {
      setFormData({
        jobTitle: "",
        employmentType: [],
        companyName: "",
        location: "",
        description: "",
        startDate: "",
        endDate: "",
        isCurrentlyWorking: false,
      });
    }
  }, [editingExperience, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleEmploymentTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      employmentType: prev.employmentType.includes(type)
        ? prev.employmentType.filter((t) => t !== type)
        : [...prev.employmentType, type],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.jobTitle ||
      !formData.companyName ||
      !formData.location ||
      !formData.startDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSaving(true);
    try {
      // Send dates as ISO strings for better serialization
      await onSave({
        ...formData,
        startDate: formData.startDate, // Already in YYYY-MM-DD format
        endDate: formData.endDate || null,
      });
      onClose();
    } catch (error) {
      console.error("Failed to save work experience:", error);
      alert("Failed to save work experience. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingExperience ? "Edit Experience" : "Add Experience"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent"
              placeholder="e.g. Software Engineer"
              required
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Employment Type
            </label>
            <div className="flex flex-wrap gap-3">
              {employmentTypes.map((type) => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.employmentType.includes(type)}
                    onChange={() => handleEmploymentTypeChange(type)}
                    className="w-4 text-black h-4 text-[#240457] border-gray-300 rounded focus:ring-[#240457]"
                  />
                  <span className="ml-2 text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Organization <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent"
              placeholder="e.g. Google"
              required
            />
          </div>

          {/* Currently Working Checkbox */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.isCurrentlyWorking}
                onChange={(e) =>
                  handleInputChange("isCurrentlyWorking", e.target.checked)
                }
                className="w-4 h-4 text-[#240457] border-gray-300 rounded focus:ring-[#240457]"
              />
              <span className="ml-2 text-sm text-gray-700">
                I Am Currently Working In This Role
              </span>
            </label>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent"
              required
            />
          </div>

          {/* End Date */}
          {!formData.isCurrentlyWorking && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent"
              />
            </div>
          )}

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent"
              placeholder="e.g. San Francisco, CA"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={4}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent"
              placeholder="Describe your role and achievements..."
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-[#240457] text-white rounded-md hover:bg-[#240457]/90 transition-colors disabled:opacity-50"
            >
              {isSaving ? "Saving..." : editingExperience ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkExperienceModal;

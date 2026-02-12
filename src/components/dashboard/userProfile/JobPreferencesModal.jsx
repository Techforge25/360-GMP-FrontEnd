"use client";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const JobPreferencesModal = ({ isOpen, onClose, onSave, currentPreferences = null }) => {
  const [formData, setFormData] = useState({
    title: "",
    targetJob: "",
    employmentType: [],
    minSalary: "",
    maxSalary: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const employmentTypes = [
    "Full-Time",
    "Contract", 
    "Remote",
    "Hybrid",
    "Part-Time"
  ];

  useEffect(() => {
    if (currentPreferences) {
      setFormData({
        title: currentPreferences.title || "",
        targetJob: currentPreferences.targetJob || "",
        employmentType: currentPreferences.employmentType || [],
        minSalary: currentPreferences.minSalary || "",
        maxSalary: currentPreferences.maxSalary || ""
      });
    } else {
      setFormData({
        title: "",
        targetJob: "",
        employmentType: [],
        minSalary: "",
        maxSalary: ""
      });
    }
  }, [currentPreferences, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmploymentTypeChange = (type) => {
    setFormData(prev => ({
      ...prev,
      employmentType: prev.employmentType.includes(type)
        ? prev.employmentType.filter(t => t !== type)
        : [...prev.employmentType, type]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const jobPreferencesData = {
        ...formData,
        minSalary: formData.minSalary ? Number(formData.minSalary) : undefined,
        maxSalary: formData.maxSalary ? Number(formData.maxSalary) : undefined
      };

      await onSave(jobPreferencesData);
      onClose();
    } catch (error) {
      console.error("Failed to save job preferences:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Edit Jobs Preferences</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Target Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Job Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="e.g. Supply Chain Analyst"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#240457] text-gray-600"
              required
            />
          </div>

          {/* Employment Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Employment Type
            </label>
            
            {/* Selected Tags */}
            {formData.employmentType.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.employmentType.map((type) => (
                  <span
                    key={type}
                    className="bg-[#240457] text-white text-sm px-3 py-1.5 rounded-lg font-medium flex items-center gap-2"
                  >
                    {type}
                    <button
                      type="button"
                      onClick={() => handleEmploymentTypeChange(type)}
                      className="hover:bg-white/20 rounded-full p-0.5"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Checkboxes */}
            <div className="grid grid-cols-2 gap-3">
              {employmentTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.employmentType.includes(type)}
                    onChange={() => handleEmploymentTypeChange(type)}
                    className="w-4 h-4 text-[#240457] border-gray-300 rounded focus:ring-[#240457]"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
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
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobPreferencesModal;
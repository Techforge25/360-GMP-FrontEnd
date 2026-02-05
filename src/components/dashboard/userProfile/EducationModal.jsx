"use client";
import React, { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

const EducationModal = ({ isOpen, onClose, onSave, editingEducation = null }) => {
  const [formData, setFormData] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    grade: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

  useEffect(() => {
    if (editingEducation) {
      const startDate = editingEducation.startDate ? new Date(editingEducation.startDate) : null;
      const endDate = editingEducation.endDate ? new Date(editingEducation.endDate) : null;
      
      setFormData({
        institution: editingEducation.institution || "",
        degree: editingEducation.degree || "",
        fieldOfStudy: editingEducation.fieldOfStudy || "",
        startDate: startDate ? `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}` : "",
        endDate: endDate ? `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}` : "",
        isCurrent: editingEducation.isCurrent || false,
        description: editingEducation.description || "",
        grade: editingEducation.grade || ""
      });
    } else {
      setFormData({
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startDate: "",
        endDate: "",
        isCurrent: false,
        description: "",
        grade: ""
      });
    }
  }, [editingEducation, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const educationData = {
        ...formData,
        startDate: formData.startDate ? new Date(formData.startDate + "-01") : null,
        endDate: !formData.isCurrent && formData.endDate ? new Date(formData.endDate + "-01") : null
      };

      await onSave(educationData);
      onClose();
    } catch (error) {
      console.error("Failed to save education:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {editingEducation ? "Edit Education" : "Add Education"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* School */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              School
            </label>
            <input
              type="text"
              value={formData.institution}
              onChange={(e) => handleInputChange("institution", e.target.value)}
              placeholder="e.g Boston University"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#240457] text-gray-600"
              required
            />
          </div>

          {/* Degree */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Degree
            </label>
            <input
              type="text"
              value={formData.degree}
              onChange={(e) => handleInputChange("degree", e.target.value)}
              placeholder="e.g Bachelor Of Science"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#240457] text-gray-600"
              required
            />
          </div>

          {/* Field of Study */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Field Of Study
            </label>
            <input
              type="text"
              value={formData.fieldOfStudy}
              onChange={(e) => handleInputChange("fieldOfStudy", e.target.value)}
              placeholder="e.g Business"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#240457] text-gray-600"
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <input
              type="month"
              value={formData.startDate}
              onChange={(e) => handleInputChange("startDate", e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#240457] text-gray-600"
              required
            />
          </div>

          {/* Currently Studying */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isCurrent"
              checked={formData.isCurrent}
              onChange={(e) => handleInputChange("isCurrent", e.target.checked)}
              className="w-4 h-4 text-[#240457] border-gray-300 rounded focus:ring-[#240457]"
            />
            <label htmlFor="isCurrent" className="ml-2 text-sm text-gray-700">
              I am currently studying here
            </label>
          </div>

          {/* End Date */}
          {!formData.isCurrent && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="month"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#240457] text-gray-600"
              />
            </div>
          )}

          {/* Grade */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grade (Optional)
            </label>
            <input
              type="text"
              value={formData.grade}
              onChange={(e) => handleInputChange("grade", e.target.value)}
              placeholder="e.g 3.8 GPA, First Class"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#240457] text-gray-600"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your studies, projects, achievements..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#240457] text-gray-600 resize-none"
            />
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
              {isLoading ? "Saving..." : editingEducation ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EducationModal;
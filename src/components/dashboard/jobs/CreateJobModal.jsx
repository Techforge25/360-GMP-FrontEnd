"use client";
import React, { useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { cn } from "@/lib/utils";
import jobAPI from "@/services/jobAPI";
import { CountrySelect } from "@/components/ui/CountrySelect";

const JOB_CATEGORIES = [
  "Manufacturing",
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Sales",
];

const EXPERIENCE_LEVELS = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Director",
  "Executive",
];

const SALARY_PERIODS = ["Month", "Year", "Hour"];

const POSTING_DURATIONS = ["15 Days", "30 Days", "60 Days", "90 Days"];

const EMPLOYMENT_TYPES = [
  { id: "full-time", label: "Full Time" },
  { id: "remote", label: "Remote" },
  { id: "contract", label: "Contract" },
  { id: "hybrid", label: "Hybrid" },
  { id: "part-time", label: "Part Time" },
];

export default function CreateJobModal({
  isOpen,
  onClose,
  onSuccess,
  businessId,
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobCategory: "",
    experienceLevel: "",
    employmentType: "",
    location: {
      country: "",
      city: "",
    },
    salary: {
      min: "",
      max: "",
      period: "Month",
    },
    postingDuration: "30 Days",
    description: "",
  });

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const handleSalaryChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        [field]: value,
      },
    }));
  };

  const handleEmploymentTypeToggle = (typeLabel) => {
    setFormData((prev) => ({
      ...prev,
      employmentType: prev.employmentType === typeLabel ? "" : typeLabel,
    }));
  };

  const handleSubmit = async () => {
    // Basic Validation
    if (
      !formData.jobTitle ||
      !formData.jobCategory ||
      !formData.description ||
      !formData.employmentType ||
      !formData.location.country ||
      !formData.location.city ||
      !formData.salary.min ||
      !formData.salary.max
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!businessId) {
      alert("Business ID is missing. Please reload the page.");
      return;
    }

    try {
      setLoading(true);

      // Transform data for API if needed.
      // Assuming backend expects flat structure or specific nested objects.
      // Based on previous conversations, schema has:
      // jobTitle, jobCategory, employmentType (String), experienceLevel, description,
      // salaryMin, salaryMax, location: { country, city }

      const payload = {
        businessId, // Added businessId to payload
        jobTitle: formData.jobTitle,
        jobCategory: formData.jobCategory,
        employmentType: formData.employmentType,
        experienceLevel: formData.experienceLevel,
        description: formData.description,
        salaryMin: Number(formData.salary.min),
        salaryMax: Number(formData.salary.max),
        location: formData.location,
        // postingDuration is likely used for expiration logic on backend or just stored
      };

      const response = await jobAPI.create(payload);

      if (response.success) {
        if (onSuccess) onSuccess();
        onClose();
      }
    } catch (error) {
      console.error("Failed to create job:", error);
      alert(error.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Create a job</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Job Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g Lead Supply Chain Analyst"
              value={formData.jobTitle}
              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              className="w-full text-black h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2E1065] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Job Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Job Category <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.jobCategory}
                  onChange={(e) =>
                    handleInputChange("jobCategory", e.target.value)
                  }
                  className="w-full text-black h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2E1065] focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  {JOB_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Experience Level */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Experience Level
              </label>
              <div className="relative">
                <select
                  value={formData.experienceLevel}
                  onChange={(e) =>
                    handleInputChange("experienceLevel", e.target.value)
                  }
                  className="w-full text-black h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2E1065] focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                >
                  <option value="" disabled>
                    Select Level
                  </option>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Employment Type */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-700">
              Employment Type <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-wrap gap-3">
              {EMPLOYMENT_TYPES.map((type) => {
                const isSelected = formData.employmentType === type.label;
                return (
                  <button
                    key={type.id}
                    onClick={() => handleEmploymentTypeToggle(type.label)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all",
                      isSelected
                        ? "bg-[#2E1065] border-[#2E1065] text-white"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100",
                    )}
                  >
                    <div
                      className={cn(
                        "w-4 h-4 rounded border flex items-center justify-center transition-colors",
                        isSelected
                          ? "border-white bg-[#2E1065]"
                          : "border-gray-400 bg-white",
                      )}
                    >
                      {isSelected && <FiCheck className="text-white w-3 h-3" />}
                    </div>
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Country <span className="text-red-500">*</span>
              </label>
              <CountrySelect
                value={formData.location.country}
                onChange={(value) => handleLocationChange("country", value)}
                className="h-12 text-black border-gray-200 focus:ring-2 focus:ring-[#2E1065]"
              />
            </div>

            {/* City */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                City State
              </label>
              <input
                type="text"
                placeholder="e.g Los Angeles"
                value={formData.location.city}
                onChange={(e) => handleLocationChange("city", e.target.value)}
                className="w-full text-black h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2E1065] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_120px] gap-6 items-end">
            {/* Salary Range (Min) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Salary Range (Min)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  placeholder="700"
                  value={formData.salary.min}
                  onChange={(e) => handleSalaryChange("min", e.target.value)}
                  className="w-full text-black h-12 pl-8 pr-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2E1065] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Salary Range (Max) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Salary Range (Max)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="number"
                  placeholder="1200"
                  value={formData.salary.max}
                  onChange={(e) => handleSalaryChange("max", e.target.value)}
                  className="w-full text-black h-12 pl-8 pr-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2E1065] focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Salary Period */}
            <div className="space-y-2">
              <div className="relative">
                <select
                  value={formData.salary.period}
                  onChange={(e) => handleSalaryChange("period", e.target.value)}
                  className="w-full text-black h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2E1065] focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
                >
                  {SALARY_PERIODS.map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1.5L6 6.5L11 1.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Posting Duration */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Posting Duration
            </label>
            <div className="relative">
              <select
                value={formData.postingDuration}
                onChange={(e) =>
                  handleInputChange("postingDuration", e.target.value)
                }
                className="w-full text-black h-12 px-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2E1065] focus:border-transparent outline-none appearance-none bg-white cursor-pointer"
              >
                {POSTING_DURATIONS.map((dur) => (
                  <option key={dur} value={dur}>
                    {dur}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Job Description
            </label>
            <div className="relative">
              <textarea
                placeholder="*"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                className="w-full text-black h-32 p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#2E1065] focus:border-transparent outline-none transition-all resize-none"
              />
              <div className="absolute top-4 left-4 pointer-events-none">
                {!formData.description && (
                  <span className="text-blue-500">*</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100">
            <p className="font-medium text-gray-900 mb-1">Summary</p>
            <p className="text-sm text-gray-500">
              You are posting{" "}
              <span className="text-gray-900 font-medium">
                {formData.jobTitle || "[Job Title]"}
              </span>{" "}
              in{" "}
              <span className="text-gray-900 font-medium">
                {formData.location.city || "[Location]"}
              </span>
              . Status: Pending Review upon submission.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="px-6 h-12 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 h-12 rounded-lg bg-[#2E1065] text-white font-medium hover:bg-[#1a0638] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Posting..." : "Post a Job"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

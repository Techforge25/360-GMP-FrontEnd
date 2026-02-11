"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { Stepper } from "@/components/ui/Stepper";
import { useStepper } from "@/hooks/useStepper";
import { SuccessModal } from "@/components/ui/SuccessModal";
import { useUserRole } from "@/context/UserContext";
import {
  FiArrowLeft,
  FiArrowRight,
  FiUpload,
  FiChevronDown,
  FiPlus,
} from "react-icons/fi";
import api from "@/lib/axios";
import { FileUpload } from "@/components/ui/FileUpload";
import { uploadToCloudinary } from "@/lib/cloudinary";
import userProfileAPI from "@/services/userProfileAPI";

const IndustryOptions = [
  "Manufacturing",
  "Technology",
  "Retail",
  "Healthcare",
  "Finance",
  "Construction",
  "Education",
  "Other",
];

const CountryOptions = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Germany",
  "France",
  "India",
  "China",
  "Japan",
  "Brazil",
  "Mexico",
  "Spain",
  "Italy",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Finland",
  "Switzerland",
  "Austria",
  "Belgium",
  "Poland",
  "Ireland",
  "New Zealand",
  "Singapore",
  "South Korea",
  "United Arab Emirates",
  "Saudi Arabia",
  "South Africa",
  "Argentina",
  "Chile",
  "Colombia",
  "Peru",
  "Portugal",
  "Greece",
  "Czech Republic",
  "Hungary",
  "Romania",
  "Turkey",
  "Israel",
  "Egypt",
  "Nigeria",
  "Kenya",
  "Pakistan",
  "Bangladesh",
  "Vietnam",
  "Thailand",
  "Malaysia",
  "Indonesia",
  "Philippines",
  "Other",
];

const Step1 = ({ formData, handleChange, setIsUploading, onUpdateLogo }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
    {/* Required Fields Notice */}
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
      <div className="text-blue-600 pt-0.5">
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <div>
        <p className="text-sm font-medium text-blue-800">
          All fields marked with <span className="text-red-500">*</span> are
          required
        </p>
        <p className="text-sm text-blue-700 mt-1">
          Please complete all required fields before proceeding to the next
          step.
        </p>
      </div>
    </div>

    <div>
      <div className="space-y-6">
        {/* Profile Photo Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            Upload Profile Photo <span className="text-red-500">*</span>
          </h3>

          {/* Show uploaded image preview */}
          {formData.logo && (
            <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                <Image
                  src={formData.logo}
                  alt="Profile Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">
                  Profile photo uploaded successfully!
                </p>
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      // Show file upload again for updating
                      handleChange("logo", "");
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Update photo
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange("logo", "")}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove photo
                  </button>
                </div>
              </div>
            </div>
          )}

          {!formData.logo && (
            <FileUpload
              label="Upload Profile Photo"
              subLabel="JPG, PNG (Max 5MB)"
              onUploadingChange={setIsUploading}
              onUpload={async (file, onProgress) => {
                const url = await uploadToCloudinary(
                  file,
                  "user/profile",
                  onProgress,
                );
                handleChange("logo", url);

                // If updating existing profile, call update API
                if (onUpdateLogo) {
                  await onUpdateLogo(url);
                }

                return url;
              }}
            />
          )}
        </div>

        {/* Banner Image Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upload Banner Image</h3>

          {/* Show uploaded banner preview */}
          {formData.banner && (
            <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={formData.banner}
                  alt="Banner Preview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">
                  Banner image uploaded successfully!
                </p>
                <div className="flex gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      handleChange("banner", "");
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Update banner
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange("banner", "")}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove banner
                  </button>
                </div>
              </div>
            </div>
          )}

          {!formData.banner && (
            <FileUpload
              label="Upload Banner Image"
              subLabel="JPG, PNG (Max 5MB, Recommended: 1920x400px)"
              onUploadingChange={setIsUploading}
              onUpload={async (file, onProgress) => {
                const url = await uploadToCloudinary(
                  file,
                  "user/banner",
                  onProgress,
                );
                handleChange("banner", url);
                return url;
              }}
            />
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-base font-medium">
              Full Name <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Alex Morgan"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">
              Email Address <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="alex.morgan@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">
              Current Title / Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
                placeholder="e.g Supply Chain Analyst"
                value={formData.currentTitle || ""}
                onChange={(e) => handleChange("currentTitle", e.target.value)}
                required
              >
                <option value="">Select Title</option>
                {IndustryOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-3.5 text-text-secondary pointer-events-none" />
            </div>

            {/* Show custom input when "Other" is selected */}
            {formData.currentTitle === "Other" && (
              <Input
                placeholder="Enter your custom title"
                value={formData.customTitle || ""}
                onChange={(e) => handleChange("customTitle", e.target.value)}
                required
              />
            )}
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">
              Contact Phone Number <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="+128895949965"
              value={formData.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              required
            />
          </div>
        </div>

        {/* Location Fields */}
        <div className="space-y-2">
          <div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-base font-medium">
                  Country <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
                    value={formData.country || ""}
                    onChange={(e) => handleChange("country", e.target.value)}
                    required
                  >
                    <option value="">Select Country</option>
                    {CountryOptions.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="absolute right-3 top-3.5 text-text-secondary pointer-events-none" />
                </div>

                {/* Show custom input when "Other" is selected */}
                {formData.country === "Other" && (
                  <Input
                    placeholder="Enter your country"
                    value={formData.customCountry || ""}
                    onChange={(e) =>
                      handleChange("customCountry", e.target.value)
                    }
                    required
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="text-base font-medium">
                  City <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Ottawa"
                  value={formData.city || ""}
                  onChange={(e) => handleChange("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-base font-medium">
                  Address Line <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="street address"
                  value={formData.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-base font-medium">Description</label>
      <textarea
        className="w-full min-h-[150px] rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        placeholder="..."
        value={formData.bio || ""}
        onChange={(e) => handleChange("bio", e.target.value)}
      ></textarea>
    </div>
  </div>
);

const Step2 = ({ formData, handleChange, setIsUploading }) => {
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null); // Track which entry is being edited
  const [educationDraft, setEducationDraft] = useState({
    institution: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
    grade: "",
  });

  const handleSaveEducation = () => {
    const {
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      isCurrent,
      description,
      grade,
    } = educationDraft;

    if (
      !institution ||
      !degree ||
      !fieldOfStudy ||
      !startDate ||
      (!isCurrent && !endDate) ||
      !description ||
      !grade
    ) {
      alert("Please fill all education fields");
      return;
    }

    if (editingEducationIndex !== null) {
      // Update existing entry
      const updatedEducation = [...formData.education];
      updatedEducation[editingEducationIndex] = educationDraft;
      handleChange("education", updatedEducation);
      setEditingEducationIndex(null);
    } else {
      // Add new entry
      handleChange("education", [...formData.education, educationDraft]);
    }

    setEducationDraft({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
      grade: "",
    });

    setShowEducationForm(false);
  };

  const handleEditEducation = (index) => {
    setEducationDraft(formData.education[index]);
    setEditingEducationIndex(index);
    setShowEducationForm(true);
  };

  const handleDeleteEducation = (index) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      const updatedEducation = formData.education.filter((_, i) => i !== index);
      handleChange("education", updatedEducation);
    }
  };

  const handleCancelEdit = () => {
    setShowEducationForm(false);
    setEditingEducationIndex(null);
    setEducationDraft({
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      isCurrent: false,
      description: "",
      grade: "",
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upload your resume</h3>

        {/* Show uploaded resume confirmation */}
        {formData.resumeUrl && (
          <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">
                Resume uploaded successfully!
              </p>
              <p className="text-sm text-green-700 mt-1">
                Your resume is ready for submission
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    handleChange("resumeUrl", "");
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Update resume
                </button>
                <button
                  type="button"
                  onClick={() => handleChange("resumeUrl", "")}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove resume
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Show upload component when no resume */}
        {!formData.resumeUrl && (
          <FileUpload
            label="Upload Document"
            subLabel="PDF, DOC, DOCX, JPG, PNG (Max 10MB)"
            onUploadingChange={setIsUploading}
            onUpload={(file, onProgress) =>
              uploadToCloudinary(file, "user/resume", onProgress).then(
                (url) => {
                  handleChange("resumeUrl", url);
                  return url;
                },
              )
            }
          />
        )}
      </div>

      <div className="space-y-2">
        <label className="text-base font-medium">
          Key Skills/Expertise <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="e.g Python,Java,Figma,"
          value={formData.skills || ""}
          onChange={(e) => handleChange("skills", e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <label className="text-base font-medium">Education <span className="text-red-500">*</span></label>

        <p className="text-sm text-text-secondary">
          {formData.education.length} Education Entries Added
        </p>

        <div className="space-y-2">
          {formData.education.map((edu, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 bg-surface relative group"
            >
              <p className="text-base font-medium">
                {edu.degree} in {edu.fieldOfStudy}
              </p>
              <p className="text-sm text-text-secondary">{edu.institution}</p>
              <p className="text-sm text-text-secondary">
                {edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate}
              </p>

              {/* Edit and Delete buttons */}
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => handleEditEducation(index)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Edit"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteEducation(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {!showEducationForm && formData.education.length < 3 && (
          <button
            type="button"
            onClick={() => setShowEducationForm(true)}
            className="w-full border border-dashed border-border-light rounded-lg p-4 flex items-center gap-3 text-text-secondary hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
              <FiPlus />
            </div>
            <span className="text-base font-medium">Add Education</span>
          </button>
        )}

        {showEducationForm && (
          <div className="border rounded-lg p-4 space-y-3 bg-white">
            <Input
              placeholder="Institution"
              value={educationDraft.institution}
              onChange={(e) =>
                setEducationDraft((p) => ({
                  ...p,
                  institution: e.target.value,
                }))
              }
              required
            />

            <Input
              placeholder="Degree"
              value={educationDraft.degree}
              onChange={(e) =>
                setEducationDraft((p) => ({ ...p, degree: e.target.value }))
              }
              required
            />

            <Input
              placeholder="Field of Study"
              value={educationDraft.fieldOfStudy}
              onChange={(e) =>
                setEducationDraft((p) => ({
                  ...p,
                  fieldOfStudy: e.target.value,
                }))
              }
              required
            />

            <div className="flex gap-2">
              <Input
                type="date"
                className="block"
                value={educationDraft.startDate}
                onChange={(e) =>
                  setEducationDraft((p) => ({
                    ...p,
                    startDate: e.target.value,
                  }))
                }
                required
              />

              <Input
                type="date"
                className="block"
                disabled={educationDraft.isCurrent}
                value={educationDraft.endDate}
                onChange={(e) =>
                  setEducationDraft((p) => ({ ...p, endDate: e.target.value }))
                }
                required={!educationDraft.isCurrent}
              />
            </div>

            <label className="flex items-center gap-2 text-base">
              <input
                type="checkbox"
                checked={educationDraft.isCurrent}
                onChange={(e) =>
                  setEducationDraft((p) => ({
                    ...p,
                    isCurrent: e.target.checked,
                    endDate: e.target.checked ? "" : p.endDate,
                  }))
                }
              />
              Currently studying here
            </label>

            <Input
              placeholder="Grade (e.g. GPA 3.8 / First Class)"
              value={educationDraft.grade}
              onChange={(e) =>
                setEducationDraft((p) => ({ ...p, grade: e.target.value }))
              }
              required
            />

            <textarea
              className="w-full min-h-[80px] rounded-md border border-border-light px-3 py-2 text-base"
              placeholder="Description"
              value={educationDraft.description}
              onChange={(e) =>
                setEducationDraft((p) => ({
                  ...p,
                  description: e.target.value,
                }))
              }
              required
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                Cancel
              </Button>
              <Button onClick={handleSaveEducation}>
                {editingEducationIndex !== null ? "Update" : "Save"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Step3 = ({ formData, handleChange }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="space-y-2">
      <label className="text-base font-medium">Target Job Title</label>
      <Input
        placeholder="e.g Supply Chain Analyst"
        value={formData.jobTitle || ""}
        onChange={(e) => handleChange("jobTitle", e.target.value)}
        required
      />
      <p className="text-sm text-text-secondary">
        This Focus Your Job Recomendation
      </p>
    </div>

    <div>
      <label className="text-base font-medium mb-3 block">
        Employment Type
      </label>
      <div className="space-y-3">
        {["Full Time", "Remote", "Contract", "Hybrid", "Part-Time"].map(
          (type) => (
            <label
              key={type}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border-light text-brand-primary focus:ring-brand-primary"
                  checked={formData.employeeType.includes(type)}
                  onChange={(e) => {
                    const newTypes = e.target.checked
                      ? [...formData.employeeType, type]
                      : formData.employeeType.filter((t) => t !== type);
                    handleChange("employeeType", newTypes);
                  }}
                />
              </div>
              <span className="text-base text-text-secondary font-medium">
                {type}
              </span>
            </label>
          ),
        )}
      </div>
    </div>

    <div>
      <label className="text-base font-medium mb-2 block">
        Preferred Annual Salary Range (USD)
      </label>
      <div className="grid grid-cols-2 gap-4">
        <Input
          placeholder="Min ($)"
          value={formData.minSalary || ""}
          onChange={(e) => handleChange("minSalary", e.target.value)}
          required
        />
        <Input
          placeholder="Max ($)"
          value={formData.maxSalary || ""}
          onChange={(e) => handleChange("maxSalary", e.target.value)}
          required
        />
      </div>
    </div>

    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3 text-base text-orange-800">
      <div className="pt-0.5">
        <div className="w-4 h-4 rounded-full bg-orange-200 flex items-center justify-center text-sm font-bold">
          !
        </div>
      </div>
      <div>
        <p className="font-bold">Important Review</p>
        <p>
          Please review all information above. Once submitted, your profile will
          enter the verification queue.
        </p>
      </div>
    </div>
  </div>
);

export default function UserProfilePage() {
  const steps = [
    { id: 1, label: "Personal Information" },
    { id: 2, label: "Education/Resume/Skills" },
    { id: 3, label: "Job Preferences" },
  ];

  const { currentStep, nextStep, prevStep } = useStepper(1, steps.length);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useUserRole();

  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "", // Pre-populate with user's email if available
    currentTitle: "",
    customTitle: "", // For when "Other" is selected
    phone: "",
    // location: "",
    country: "",
    customCountry: "", // For when "Other" is selected in country dropdown
    city: "",
    address: "",
    bio: "",
    skills: "",
    jobTitle: "",
    minSalary: "",
    education: [],
    maxSalary: "",
    employeeType: [],
    resumeUrl: "",
    logo: "", // Profile photo URL
    banner: "", // Banner image URL
  });
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // testing
    console.log(formData);

    // Validation check with better email handling
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.email.trim() || // Ensure email is not just whitespace
      !formData.logo ||
      !formData.currentTitle ||
      !formData.phone ||
      !formData.city ||
      !formData.country ||
      !formData.address ||
      !formData.bio ||
      !formData.skills ||
      !formData.jobTitle ||
      !formData.minSalary ||
      !formData.maxSalary ||
      // !formData.resumeUrl || // Resume is optional
      formData.employeeType.length === 0 ||
      formData.education.length === 0
    ) {
      setError("Please fill all required fields before submitting.");
      return;
    }

    // ... inside component
    try {
      // Format payload to match backend schema
      const payload = {
        ...formData,
        email: formData.email.trim().toLowerCase(), // Ensure email is trimmed and lowercase
        skills: formData.skills
          ? formData.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        employmentType: formData.employeeType,

        // Convert salary fields to numbers as expected by backend
        minSalary: formData.minSalary ? Number(formData.minSalary) : 0,
        maxSalary: formData.maxSalary ? Number(formData.maxSalary) : 0,

        // Convert education array to object format for backend
        education:
          formData.education.length > 0
            ? formData.education[0]
            : {
                institution: "",
                degree: "",
                fieldOfStudy: "",
                startDate: "",
                endDate: "",
                isCurrent: false,
                description: "",
                grade: "",
              },

        // Backend expects 'title' field to be required
        // Use customTitle if "Other" is selected, otherwise use currentTitle
        title:
          formData.currentTitle === "Other"
            ? formData.customTitle
            : formData.currentTitle,

        // Optional targetJob field
        targetJob: formData.jobTitle,

        // Location mapping - use customCountry if "Other" is selected
        location: `${formData.city || ""}, ${
          formData.country === "Other"
            ? formData.customCountry
            : formData.country
        }`,

        // Ensure logo is included (required by backend)
        logo: formData.logo,

        // Include banner image if uploaded
        banner: formData.banner || undefined,
      };

      // Remove fields that shouldn't be sent to backend
      delete payload.employeeType; // Already mapped to employmentType
      delete payload.currentTitle; // Not needed in backend
      delete payload.customTitle; // Temporary UI field, already mapped to title
      delete payload.jobTitle; // Already mapped to title and targetJob
      delete payload.city; // Already mapped to location
      delete payload.country; // Already mapped to location
      delete payload.customCountry; // Temporary UI field, already mapped to location
      delete payload.address; // Not in backend schema

      const response = await api.post({
        url: "/userProfile",
        payload: payload,
      });

      if (!response.success) {
        setError(response.message || "Signup failed");
        return false;
      }

      return true;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    // Validate current step before proceeding
    setError("");

    if (currentStep === 1) {
      // Step 1 validation - check each field individually for specific error messages
      if (!formData.fullName) {
        setError("Full Name is required");
        return;
      }
      if (!formData.email || !formData.email.trim()) {
        setError("Email Address is required");
        return;
      }
      if (!formData.logo) {
        setError("Please upload a profile photo");
        return;
      }
      if (!formData.currentTitle) {
        setError("Current Title / Role is required");
        return;
      }
      if (formData.currentTitle === "Other" && !formData.customTitle) {
        setError("Please enter your custom title");
        return;
      }
      if (!formData.phone) {
        setError("Contact Phone Number is required");
        return;
      }
      if (!formData.country) {
        setError("Country is required");
        return;
      }
      if (formData.country === "Other" && !formData.customCountry) {
        setError("Please enter your country name");
        return;
      }
      if (!formData.city) {
        setError("City is required");
        return;
      }
      if (!formData.address) {
        setError("Address Line is required");
        return;
      }
    } else if (currentStep === 2) {
      // Step 2 validation - check each field individually
      if (!formData.skills || !formData.skills.trim()) {
        setError("Key Skills/Expertise is required");
        return;
      }
      if (formData.education.length === 0) {
        setError("Please add at least one education entry");
        return;
      }
    } else if (currentStep === 3) {
      // Step 3 validation - check each field individually
      if (!formData.jobTitle) {
        setError("Target Job Title is required");
        return;
      }
      if (formData.employeeType.length === 0) {
        setError("Please select at least one Employment Type");
        return;
      }
      if (!formData.minSalary) {
        setError("Minimum salary is required");
        return;
      }
      if (!formData.maxSalary) {
        setError("Maximum salary is required");
        return;
      }

      // Validate salary range (backend requires maxSalary > minSalary)
      const minSal = Number(formData.minSalary);
      const maxSal = Number(formData.maxSalary);
      if (isNaN(minSal) || isNaN(maxSal) || maxSal <= minSal) {
        setError(
          "Please enter valid salary range. Maximum salary must be greater than minimum salary.",
        );
        return;
      }
    }

    if (currentStep < steps.length) {
      nextStep();
      return;
    }

    if (isUploading) {
      setError("Please wait for file upload to finish.");
      return;
    }

    setLoading(true);
    const success = await handleSubmit();
    setLoading(false);

    if (success) {
      setIsSuccessModalOpen(true);
    }
  };

  const handleBack = () => {
    const changed = prevStep();
    if (!changed) {
      router.push("/onboarding/plans");
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSuccessNext = () => {
    // Update user role in localStorage
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      storedUser.role = "user";
      storedUser.isNewToPlatform = false;
      localStorage.setItem("user", JSON.stringify(storedUser));
      window.location.href = "/dashboard/user";
    }
  };
  const [isUploading, setIsUploading] = useState(false);

  // Function to update logo via API
  const handleUpdateLogo = async (newLogoUrl) => {
    try {
      const response = await userProfileAPI.updateLogo({ logo: newLogoUrl });

      if (response.success) {
        // Update local form data
        handleChange("logo", newLogoUrl);
        console.log("Logo updated successfully");
      } else {
        console.error("Failed to update logo:", response.message);
      }
    } catch (error) {
      console.error("Error updating logo:", error);
      // Handle error gracefully - don't break the form flow
    }
  };

  return (
    <div className="min-h-screen">
      <Card className="w-full sm:w-3x lg:w-4xl max-w-5xl mx-auto mt-16 md:mt-10 flex-shrink-0 bg-white shadow-xl min-h-[800px]">
        <div className="p-8 pb-0">
          <h1 className="text-[#40444C] text-2xl font-semibold text-center mb-8">
            Complete Your Profile
          </h1>
          <h3 className="text-lg text-[#40444C] font-semibold mb-6 border-t border-border-light pt-6">
            Personal Information
          </h3>
          <Stepper currentStep={currentStep} steps={steps} />
        </div>

        <CardContent className="p-8 pt-4">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-base text-center">
              {error}
            </div>
          )}

          {currentStep === 1 && (
            <Step1
              formData={formData}
              handleChange={handleChange}
              setIsUploading={setIsUploading}
              onUpdateLogo={handleUpdateLogo}
            />
          )}
          {currentStep === 2 && (
            <Step2
              formData={formData}
              handleChange={handleChange}
              setIsUploading={setIsUploading}
            />
          )}
          {currentStep === 3 && (
            <Step3 formData={formData} handleChange={handleChange} />
          )}
        </CardContent>

        <div className="p-8 border-t border-border-light flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <FiArrowLeft /> Back
          </Button>

          <div className="flex gap-4">
            <Button
              variant="default"
              onClick={handleNext}
              isLoading={loading || isUploading}
              disabled={isUploading}
              className="min-w-[140px]"
            >
              {isUploading
                ? "Uploading..."
                : currentStep === steps.length
                  ? "Submit"
                  : "Next"}{" "}
              <FiArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </Card>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        title="Profile Complete!"
        description="Your Job Seeker Profile Has Been Successfully Saved. You Would Now Be Redirected To The Job Dashboard."
        onNext={handleSuccessNext}
      />
    </div>
  );
}

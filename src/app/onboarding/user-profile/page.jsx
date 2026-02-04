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

const Step1 = ({ formData, handleChange, setIsUploading }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
    <div>
      <div className="space-y-6">
        {/* Profile Photo Upload */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Upload Profile Photo</h3>
          <FileUpload
            label="Upload Profile Photo"
            subLabel="JPG, PNG (Max 5MB)"
            onUploadingChange={setIsUploading}
            onUpload={(file, onProgress) =>
              uploadToCloudinary(file, "user/profile", onProgress).then((url) => {
                handleChange("logo", url);
                return url;
              })
            }
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-base font-medium">Full Name</label>
            <Input
              placeholder="Alex Morgan"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">Email Address</label>
            <Input
              type="email"
              placeholder="alex.morgan@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">Current Title / Role</label>
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
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">Contact Phone Number</label>
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
                <label className="text-base font-medium">Country</label>
                <Input
                  placeholder="e.g Canada"
                  value={formData.country || ""}
                  onChange={(e) => handleChange("country", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-base font-medium">City</label>
                <Input
                  placeholder="Ottawa"
                  value={formData.city || ""}
                  onChange={(e) => handleChange("city", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-base font-medium">Address Line</label>
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

    handleChange("education", [...formData.education, educationDraft]);

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

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upload your resume</h3>
        <FileUpload
          label="Upload Document"
          subLabel="PDF, DOC, DOCX, JPG, PNG (Max 10MB)"
          onUploadingChange={setIsUploading}
          onUpload={(file, onProgress) =>
            uploadToCloudinary(file, "user/resume", onProgress).then((url) => {
              handleChange("resumeUrl", url);
              return url;
            })
          }
        />
      </div>

      <div className="space-y-2">
        <label className="text-base font-medium">
          Key Skills/Expertise(Mandatory)
        </label>
        <Input
          placeholder="e.g Python,Java,Figma,"
          value={formData.skills || ""}
          onChange={(e) => handleChange("skills", e.target.value)}
          required
        />
      </div>

      <div className="space-y-4">
        <label className="text-base font-medium">Education</label>

        <p className="text-sm text-text-secondary">
          {formData.education.length} Education Entries Added
        </p>

        <div className="space-y-2">
          {formData.education.map((edu, index) => (
            <div key={index} className="border rounded-lg p-4 bg-surface">
              <p className="text-base font-medium">
                {edu.degree} in {edu.fieldOfStudy}
              </p>
              <p className="text-sm text-text-secondary">{edu.institution}</p>
              <p className="text-sm text-text-secondary">
                {edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate}
              </p>
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
              <Button
                variant="outline"
                onClick={() => setShowEducationForm(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveEducation}>Save</Button>
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
    phone: "",
    // location: "",
    country: "",
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
  });
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    // testing
    console.log(formData);

    if (
      !formData.fullName ||
      !formData.email ||
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
        skills: formData.skills
          ? formData.skills
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean)
          : [],
        employmentType: formData.employeeType,

        // Mapping inferred from errors and UI usage:
        // 1. "location" expects a string (seen in UserHeader)
        location: `${formData.city || ""}, ${formData.country || ""}`,

        // 2. "currentTitle" in UI selects from IndustryOptions
        // Not sending currentTitle/industry/profession as it causes 400 Bad Request

        // 3. "jobTitle" (Target Job Title) map to "title"
        title: formData.jobTitle,
      };

      // Remove forbidden/mapped keys
      delete payload.employeeType;
      delete payload.currentTitle;
      delete payload.jobTitle;
      delete payload.city;
      delete payload.country;
      delete payload.address;

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
      // Step 1 validation
      if (
        !formData.fullName ||
        !formData.email ||
        !formData.logo ||
        !formData.currentTitle ||
        !formData.phone ||
        !formData.country ||
        !formData.city ||
        !formData.address
      ) {
        setError("Please fill all required fields and upload a profile photo before proceeding.");
        return;
      }
    } else if (currentStep === 2) {
      // Step 2 validation
      if (
        !formData.skills ||
        formData.education.length === 0
      ) {
        setError("Please fill all required fields and add at least one education entry.");
        return;
      }
    } else if (currentStep === 3) {
      // Step 3 validation
      if (
        !formData.jobTitle ||
        !formData.minSalary ||
        !formData.maxSalary ||
        formData.employeeType.length === 0
      ) {
        setError("Please fill all required fields and select at least one employment type.");
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

  return (
    <div className="min-h-screen">
      <Card className="w-full sm:w-3xl lg:w-5xl max-w-5xl mx-auto mt-16 md:mt-10 flex-shrink-0 bg-white shadow-xl min-h-[800px]">
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

"use client";

import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FileUpload } from "@/components/ui/FileUpload";
import { TagInput } from "@/components/ui/TagInput";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function UserProfileStep2({
  formData,
  handleChange,
  setIsUploading,
  skillSuggestions,
}) {
  const [showEducationForm, setShowEducationForm] = useState(false);
  const [editingEducationIndex, setEditingEducationIndex] = useState(null);
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

  const resetDraft = () => {
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

  const handleSaveEducation = () => {
    const {
      institution,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      isCurrent,
      description,
    } = educationDraft;

    if (description && description.length >= 1000) {
      alert("Description cannot exceed 1000 characters");
      return;
    }
    if (!institution || !degree || !fieldOfStudy || !startDate || (!isCurrent && !endDate)) {
      alert("Please fill all education fields");
      return;
    }

    if (editingEducationIndex !== null) {
      const updatedEducation = [...formData.education];
      updatedEducation[editingEducationIndex] = educationDraft;
      handleChange("education", updatedEducation);
      setEditingEducationIndex(null);
    } else {
      handleChange("education", [...formData.education, educationDraft]);
    }

    resetDraft();
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
    resetDraft();
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Upload your resume</h3>

        {formData.resumeUrl && (
          <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        {!formData.resumeUrl && (
          <FileUpload
            label="Upload Document"
            subLabel="PDF, DOC, DOCX, JPG, PNG (Max 5MB)"
            onUploadingChange={setIsUploading}
            onUpload={(file, onProgress) =>
              uploadToCloudinary(file, "user/resume", onProgress).then((url) => {
                handleChange("resumeUrl", url);
                return url;
              })
            }
          />
        )}
      </div>

      <div className="space-y-2">
        <label className="text-base font-medium">
          Key Skills/Expertise <span className="text-red-500">*</span>
        </label>
        <TagInput
          tags={formData.skills || []}
          onChange={(tags) => handleChange("skills", tags)}
          maxTags={5}
          placeholder="Type a skill and press Enter or comma (e.g. Python, Java)"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          <span className="text-sm text-text-hint w-full mb-1">Suggestions:</span>
          {skillSuggestions.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => {
                const current = formData.skills || [];
                if (current.length < 5 && !current.includes(skill)) {
                  handleChange("skills", [...current, skill]);
                }
              }}
              disabled={(formData.skills || []).length >= 5}
              className="px-2 py-0.5 text-sm bg-gray-100 text-text-secondary rounded hover:bg-brand-primary/10 hover:text-brand-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + {skill}
            </button>
          ))}
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Add up to 5 skills to showcase your expertise.
        </p>
      </div>

      <div className="space-y-4">
        <label className="text-base font-medium">
          Education <span className="text-red-500">*</span>
        </label>

        <p className="text-sm text-text-secondary">
          {formData.education.length} Education Entries Added
        </p>

        <div className="space-y-2">
          {formData.education.map((edu, index) => (
            <div key={index} className="border rounded-lg p-4 bg-surface relative group">
              <p className="text-base font-medium">
                {edu.degree} in {edu.fieldOfStudy}
              </p>
              <p className="text-sm text-text-secondary">{edu.institution}</p>
              <p className="text-sm text-text-secondary">
                {edu.startDate} – {edu.isCurrent ? "Present" : edu.endDate}
              </p>
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => handleEditEducation(index)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Edit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              onChange={(e) => setEducationDraft((p) => ({ ...p, degree: e.target.value }))}
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
            <div className="flex gap-4">
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium text-text-secondary">
                  Start Date <span className="text-red-500">*</span>
                </label>
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
              </div>
              <div className="flex-1 space-y-1">
                <label className="text-sm font-medium text-text-secondary">
                  {educationDraft.isCurrent ? "End Date" : "End Date"}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  className="block"
                  disabled={educationDraft.isCurrent}
                  value={educationDraft.endDate}
                  onChange={(e) =>
                    setEducationDraft((p) => ({
                      ...p,
                      endDate: e.target.value,
                    }))
                  }
                  required={!educationDraft.isCurrent}
                />
              </div>
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
              onChange={(e) => setEducationDraft((p) => ({ ...p, grade: e.target.value }))}
            />
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm font-medium text-text-secondary">
                Description
              </span>
              <span
                className={cn(
                  "text-sm font-medium",
                  (educationDraft.description?.length || 0) >= 1000
                    ? "text-red-500"
                    : "text-text-secondary",
                )}
              >
                {educationDraft.description?.length || 0} / 1000
              </span>
            </div>
            <textarea
              className={cn(
                "w-full min-h-[100px] rounded-md border px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary",
                (educationDraft.description?.length || 0) >= 1000
                  ? "border-red-500 ring-1 ring-red-500"
                  : "border-border-light",
              )}
              placeholder="Tell us about your studies, achievements, etc."
              value={educationDraft.description}
              maxLength={1000}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 1000) {
                  setEducationDraft((p) => ({
                    ...p,
                    description: value,
                  }));
                }
              }}
            />
            {(educationDraft.description?.length || 0) >= 1000 && (
              <p className="text-sm text-red-500 font-medium">
                Description cannot exceed 1000 characters
              </p>
            )}
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
}

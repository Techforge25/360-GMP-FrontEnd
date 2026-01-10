"use client";
import React, { useState } from "react";
import {
  FiX,
  FiUploadCloud,
  FiCheck,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

// Step Constants
const STEPS = [
  { id: 1, label: "Resume" },
  { id: 2, label: "Questions" },
  { id: 3, label: "Review" },
];

export function ApplicationModal({ isOpen, onClose, jobTitle, companyName }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    resume: null,
    portfolioUrl: "",
    experience: "",
    whyFit: "",
  });

  if (!isOpen) return null;

  // Handlers
  const handleNext = () => setStep((prev) => Math.min(prev + 1, 4));
  const handleBack = () => setStep((prev) => Math.max(prev - 1, 1));
  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      handleNext(); // Move to success step (4)
    }, 1000);
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // --- Step Content Renders ---

  const renderStep1 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-text-primary">
          Upload Your Resume
        </h3>
        <p className="text-sm text-text-secondary">
          Please upload your CV (PDF, DOCX) to proceed.
        </p>
      </div>

      {/* File Upload Area */}
      <div className="border-2 border-dashed border-border-light rounded-xl p-8 hover:bg-gray-50 transition-colors cursor-pointer text-center group">
        <div className="w-12 h-12 bg-blue-50 text-brand-primary rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
          <FiUploadCloud size={24} />
        </div>
        <p className="font-medium text-text-primary mb-1">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-text-secondary">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-text-primary">
          Portfolio URL (Optional)
        </label>
        <Input
          placeholder="https://dribbble.com/your-work"
          value={formData.portfolioUrl}
          onChange={(e) => updateField("portfolioUrl", e.target.value)}
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-text-primary">
          Application Questions
        </h3>
        <p className="text-sm text-text-secondary">
          Help us get to know you better.
        </p>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-text-primary">
          Years of Experience
        </label>
        <select
          className="w-full h-11 px-3 py-2 bg-white border border-border-light rounded-md text-sm shadow-sm placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50"
          value={formData.experience}
          onChange={(e) => updateField("experience", e.target.value)}
        >
          <option value="">Select experience</option>
          <option value="0-1">0-1 Years</option>
          <option value="1-3">1-3 Years</option>
          <option value="3-5">3-5 Years</option>
          <option value="5+">5+ Years</option>
        </select>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-text-primary">
          Why do you think you are a good fit?
        </label>
        <textarea
          className="w-full min-h-[120px] px-3 py-2 bg-white border border-border-light rounded-md text-sm shadow-sm placeholder:text-text-tertiary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary disabled:cursor-not-allowed disabled:opacity-50 resize-y"
          placeholder="Share your relevant experience and motivation..."
          value={formData.whyFit}
          onChange={(e) => updateField("whyFit", e.target.value)}
        />
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-text-primary">
          Review Application
        </h3>
        <p className="text-sm text-text-secondary">
          Please review your details before submitting.
        </p>
      </div>

      <div className="bg-gray-50 rounded-lg p-5 space-y-4 border border-border-light text-sm">
        <div className="flex justify-between border-b border-gray-200 pb-3">
          <span className="text-text-secondary">Job Role</span>
          <span className="font-medium text-text-primary">{jobTitle}</span>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-3">
          <span className="text-text-secondary">Company</span>
          <span className="font-medium text-text-primary">{companyName}</span>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-3">
          <span className="text-text-secondary">Portfolio</span>
          <span className="font-medium text-text-primary truncate max-w-[200px]">
            {formData.portfolioUrl || "N/A"}
          </span>
        </div>
        <div className="flex justify-between border-b border-gray-200 pb-3">
          <span className="text-text-secondary">Experience</span>
          <span className="font-medium text-text-primary">
            {formData.experience || "Not specified"}
          </span>
        </div>
        <div>
          <span className="text-text-secondary block mb-1">Why Fit Answer</span>
          <p className="text-text-primary italic bg-white p-3 rounded border border-gray-100">
            "{formData.whyFit || "No answer provided"}"
          </p>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in-95 duration-300">
      <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
        <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg shadow-green-200">
          <FiCheck size={28} />
        </div>
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">
        Application Sent!
      </h2>
      <p className="text-text-secondary text-center max-w-xs mb-8">
        Your application for{" "}
        <span className="font-semibold text-text-primary">{jobTitle}</span> has
        been successfully submitted to {companyName}.
      </p>
      <Button onClick={onClose} className="w-full max-w-[200px]">
        Go to Dashboard
      </Button>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <Card className="w-full max-w-lg bg-white shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]">
        {/* Close Button */}
        {step !== 4 && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <FiX size={20} />
          </button>
        )}

        <CardContent className="p-0 flex flex-col h-full">
          {/* Header / Stepper (Only show if not success state) */}
          {step !== 4 && (
            <div className="bg-gray-50 border-b border-border-light px-8 py-6">
              <div className="flex justify-between items-center relative">
                {/* Progress Bar Background */}
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0 rounded-full" />

                {/* Progress Bar Active */}
                <div
                  className="absolute top-1/2 left-0 h-1 bg-brand-primary -z-0 rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    width: `${((step - 1) / (STEPS.length - 1)) * 100}%`,
                  }}
                />

                {STEPS.map((s) => {
                  const isActive = s.id <= step;
                  const isCurrent = s.id === step;
                  return (
                    <div
                      key={s.id}
                      className="relative z-10 flex flex-col items-center gap-2 group cursor-default"
                    >
                      <div
                        className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300",
                          isActive
                            ? "bg-brand-primary border-brand-primary text-white shadow-md scale-110"
                            : "bg-white border-gray-300 text-gray-400 group-hover:border-gray-400"
                        )}
                      >
                        {isActive ? <FiCheck size={14} /> : s.id}
                      </div>
                      <span
                        className={cn(
                          "text-xs font-semibold absolute -bottom-6 w-20 text-center transition-colors",
                          isCurrent ? "text-brand-primary" : "text-gray-400"
                        )}
                      >
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Scrollable Body */}
          <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderSuccess()}
          </div>

          {/* Footer Actions (Only if not success state) */}
          {step !== 4 && (
            <div className="p-6 border-t border-border-light bg-white flex justify-between items-center gap-4">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className={cn(step === 1 && "invisible")}
              >
                Back
              </Button>

              <Button
                onClick={step === 3 ? handleSubmit : handleNext}
                className="bg-[#2A1C52] hover:bg-[#2A1C52]/90 w-32"
              >
                {step === 3 ? "Submit" : "Next"}
                {step !== 3 && <FiChevronRight className="ml-1" />}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

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
import {
  FiArrowLeft,
  FiArrowRight,
  FiUpload,
  FiChevronDown,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiPlus,
} from "react-icons/fi";
import { BsPersonFill } from "react-icons/bs";

// --- Components ---

const FileUpload = ({ label, subLabel }) => (
  <label className="border-2 border-dashed border-border-light rounded-lg p-8 text-center bg-surface hover:bg-surface-muted transition-colors cursor-pointer block h-full flex flex-col items-center justify-center">
    <input type="file" className="hidden" />
    <div className="w-10 h-10 bg-surface-elevated rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm border border-border-light">
      <FiUpload className="text-brand-primary" />
    </div>
    <p className="text-sm font-medium text-brand-primary mb-1">{label}</p>
    <p className="text-xs text-text-secondary">{subLabel}</p>
  </label>
);

// --- Steps ---

const Step1 = ({ formData, handleChange }) => (
  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
    <div>
      <h3 className="text-lg font-semibold mb-6">Personal Information</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input
            placeholder="Alex Morgan"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Current Title / Role</label>
          <div className="relative">
            <Input placeholder="e.g Supply Chain Analyst" />
            <FiChevronDown className="absolute right-3 top-3 text-text-secondary" />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Contact Phone Number</label>
          <Input placeholder="+128895949965" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Location (City,State,Country)
          </label>
          <div className="relative">
            <Input placeholder="e.g San Francisco, CA ,USA" />
            <FiChevronDown className="absolute right-3 top-3 text-text-secondary" />
          </div>
        </div>
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">Description</label>
      <textarea
        className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        placeholder="..."
      ></textarea>
    </div>
  </div>
);

const Step2 = ({ formData, handleChange }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Upload your resume</h3>
      <div className="border border-dashed border-border-light border-indigo-100 bg-indigo-50/20 rounded-xl p-10 text-center">
        <div className="flex flex-col items-center justify-center">
          <h4 className="font-semibold mb-1">Upload Document</h4>
          <p className="text-xs text-text-secondary mb-4">
            PDF, DOC, DOCX, JPG, PNG (Max 5MB)
          </p>
          <Button className="bg-indigo-900 text-white hover:bg-indigo-800 gap-2 min-w-[120px]">
            <FiUpload /> Upload
          </Button>
        </div>
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-sm font-medium">
        Key Skills/Expertise(Mandatory)
      </label>
      <Input placeholder="e.g Python,Java,Figma," />
    </div>

    <div className="space-y-4">
      <label className="text-sm font-medium">Education</label>
      <p className="text-xs text-text-secondary">
        No Education Entries Added Yet
      </p>
      <button className="w-full border border-dashed border-border-light rounded-lg p-4 flex items-center gap-3 text-text-secondary hover:bg-gray-50 transition-colors">
        <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
          <FiPlus />
        </div>
        <span className="text-sm font-medium">Add Education</span>
      </button>
    </div>
  </div>
);

const Step3 = ({ formData, handleChange }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="space-y-2">
      <label className="text-sm font-medium">Target Job Title</label>
      <Input placeholder="e.g Python,Java,Figma," />
      <p className="text-xs text-text-secondary">
        This Focus Your Job Recomendation
      </p>
    </div>

    <div>
      <label className="text-sm font-medium mb-3 block">Employment Type</label>
      <div className="space-y-3">
        {["Full Time", "Remote", "Contract", "Hybrid", "Part-Time"].map(
          (type, i) => (
            <label key={i} className="flex items-center gap-3 cursor-pointer">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border-light text-brand-primary focus:ring-brand-primary"
                  defaultChecked={i === 1}
                />
              </div>
              <span className="text-sm text-text-secondary font-medium">
                {type}
              </span>
            </label>
          )
        )}
      </div>
    </div>

    <div>
      <label className="text-sm font-medium mb-2 block">
        Preferred Annual Salary Range (USD)
      </label>
      <div className="grid grid-cols-2 gap-4">
        <Input placeholder="Min ($)" />
        <Input placeholder="Max ($)" />
      </div>
    </div>

    <div className="space-y-4">
      <label className="text-sm font-medium">Education</label>
      <p className="text-xs text-text-secondary">
        No Education Entries Added Yet
      </p>
      <button className="w-full border border-dashed border-border-light rounded-lg p-4 flex items-center gap-3 text-text-secondary hover:bg-gray-50 transition-colors">
        <div className="w-8 h-8 rounded-md bg-gray-100 flex items-center justify-center">
          <FiPlus />
        </div>
        <span className="text-sm font-medium">Add Education</span>
      </button>
    </div>

    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3 text-sm text-orange-800">
      <div className="pt-0.5">
        <div className="w-4 h-4 rounded-full bg-orange-200 flex items-center justify-center text-xs font-bold">
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

// --- Main Page ---

export default function UserProfilePage() {
  const steps = [
    { id: 1, label: "Personal Information" },
    { id: 2, label: "Education/Resume/Skills" },
    { id: 3, label: "Job Preferences" },
  ];

  const { currentStep, nextStep, prevStep } = useStepper(1, steps.length);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    // ...
  });
  const router = useRouter();

  const handleNext = () => {
    if (currentStep === steps.length) {
      setIsSuccessModalOpen(true);
    } else {
      nextStep();
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
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen">
      <Card className="w-full sm:w-3xl lg:w-5xl max-w-5xl mx-auto mt-16 md:mt-10 flex-shrink-0 bg-white shadow-xl min-h-[800px]">
        <div className="p-8 pb-0">
          <h1 className="text-2xl font-bold text-center mb-8">
            Complete Your Profile
          </h1>
          <Stepper currentStep={currentStep} steps={steps} />
        </div>

        <CardContent className="p-8 pt-4">
          {currentStep === 1 && (
            <Step1 formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 2 && (
            <Step2 formData={formData} handleChange={handleChange} />
          )}
          {currentStep === 3 && (
            <Step3 formData={formData} handleChange={handleChange} />
          )}
        </CardContent>

        <div className="p-8 border-t border-border-light flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-text-secondary hover:text-brand-primary font-medium"
          >
            <FiArrowLeft /> Back
          </button>

          <div className="flex gap-4">
            <Button
              onClick={handleNext}
              className="bg-indigo-900 hover:bg-indigo-800 text-white min-w-[140px]"
            >
              {currentStep === steps.length ? "Submit" : "Next"}{" "}
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

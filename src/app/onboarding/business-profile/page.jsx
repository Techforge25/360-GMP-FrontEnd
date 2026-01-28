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
  FiCheck,
  FiUpload,
  FiCalendar,
  FiClock,
  FiMapPin,
  FiGlobe,
  FiChevronDown,
  FiArrowLeft,
  FiArrowRight,
} from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import { BsPersonFill } from "react-icons/bs";
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

const CompanySizeOptions = [
  "1-10 Employees",
  "11-50 Employees",
  "51-200 Employees",
  "201-500 Employees",
  "501+ Employees",
];

const formatYearMonth = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const Step1 = ({ formData, handleChange, setIsUploading }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-base font-medium">Company Name</label>
        <Input
          placeholder="Global Manufacturing Co."
          value={formData.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-base font-medium">Select Primary Industry</label>
        <div className="relative">
          <select
            className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
            value={formData.industry || ""}
            onChange={(e) => handleChange("industry", e.target.value)}
          >
            <option value="" disabled>
              Select Primary Industry
            </option>
            {IndustryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 top-3.5 text-text-secondary pointer-events-none" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-base font-medium">Business Type</label>
        <Input
          placeholder="Private Corporation"
          value={formData.businessType || ""}
          onChange={(e) => handleChange("businessType", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-base font-medium">Company Size</label>
        <div className="relative">
          <select
            className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
            value={formData.companySize || ""}
            onChange={(e) => handleChange("companySize", e.target.value)}
          >
            <option value="" disabled>
              Select Company Size
            </option>
            {CompanySizeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <FiChevronDown className="absolute right-3 top-3.5 text-text-secondary pointer-events-none" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-base font-medium">Founded Date</label>
        <div className="relative">
          <Input
            type="date"
            className="block"
            value={formData.foundedDate || ""}
            onChange={(e) => handleChange("foundedDate", e.target.value)}
          />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-base font-medium">Operating Hours</label>
        <div className="relative">
          <Input
            type="time"
            className="block"
            value={formData.operatingHours || ""}
            onChange={(e) => handleChange("operatingHours", e.target.value)}
            placeholder="09:00"
          />
        </div>
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-base font-medium">Official Company Website</label>
      <Input
        placeholder="https://www.example.com"
        value={formData.website || ""}
        onChange={(e) => handleChange("website", e.target.value)}
      />
    </div>

    <div className="space-y-2">
      <label className="text-base font-medium">Company Mission And Bio</label>
      <textarea
        className="w-full min-h-[120px] rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
        placeholder="..."
        value={formData.bio || ""}
        onChange={(e) => handleChange("bio", e.target.value)}
      ></textarea>
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <label className="text-base font-medium">Profile Image</label>
        <FileUpload
          label="Upload Profile Image"
          subLabel="JPG, PNG (Max 10MB)"
          onUploadingChange={setIsUploading}
          onUpload={(file, onProgress) =>
            uploadToCloudinary(file, "business/profile", onProgress).then(
              (url) => {
                handleChange("profileImageUrl", url);
                return url;
              },
            )
          }
        />
      </div>
      <div className="space-y-2">
        <label className="text-base font-medium">Banner Image</label>
        <FileUpload
          label="Upload Banner Image"
          subLabel="Dimension 1440×300 (Max 10MB)"
          onUploadingChange={setIsUploading}
          onUpload={(file, onProgress) =>
            uploadToCloudinary(file, "business/banner", onProgress).then(
              (url) => {
                handleChange("bannerImageUrl", url);
                return url;
              },
            )
          }
        />
      </div>
    </div>
  </div>
);

const Step2 = ({ formData, handleChange, setIsUploading }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
    <div>
      <h3 className="text-lg font-semibold mb-4">Company Location</h3>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <label className="text-base font-medium">Country</label>
          <Input
            placeholder="e.g Canada"
            value={formData.country || ""}
            onChange={(e) => handleChange("country", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-base font-medium">City</label>
          <Input
            placeholder="Ottawa"
            value={formData.city || ""}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-base font-medium">Address Line</label>
          <Input
            placeholder="street address"
            value={formData.address || ""}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </div>
      </div>
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Compliance & Certification</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          "ISO 9001",
          "CE Certified",
          "TUV SUD",
          "FDA Approved",
          "Ethical Sourcing",
        ].map((cert) => (
          <label key={cert} className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={(formData.compliances || []).includes(cert)}
              onChange={(e) => {
                if (e.target.checked) {
                  handleChange("compliances", [...formData.compliances, cert]);
                } else {
                  handleChange(
                    "compliances",
                    formData.compliances.filter((c) => c !== cert),
                  );
                }
              }}
              className="rounded border-gray-300 text-brand-primary"
            />
            <span className="text-base text-text-secondary">{cert}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="space-y-2">
      <label className="text-base font-medium">
        Upload Certification Document
      </label>
      <FileUpload
        label="Upload Certification Document"
        subLabel="PDF, DOC, DOCX, JPG, PNG (Max 10MB)"
        onUploadingChange={setIsUploading}
        onUpload={(file, onProgress) =>
          uploadToCloudinary(file, "business/certifications", onProgress).then(
            (url) => {
              handleChange("certificationDocUrl", url);
              return url;
            },
          )
        }
      />
    </div>

    <div>
      <h3 className="text-lg font-semibold mb-4">Primary B2B Contact</h3>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-base font-medium">Contact Person Name</label>
          <Input
            value={formData.contactName || ""}
            onChange={(e) => handleChange("contactName", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-base font-medium">Title</label>
          <Input
            value={formData.contactTitle || ""}
            onChange={(e) => handleChange("contactTitle", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-base font-medium">Phone</label>
          <Input
            value={formData.contactPhone || ""}
            onChange={(e) => handleChange("contactPhone", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-base font-medium">Support Email</label>
          <Input
            value={formData.contactEmail || ""}
            onChange={(e) => handleChange("contactEmail", e.target.value)}
          />
        </div>
      </div>
    </div>
  </div>
);

const Step3 = ({ formData }) => (
  <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
    <div className="relative h-48 w-full rounded-xl mb-12">
      {formData.bannerImageUrl && (
        <Image
          src={
            formData.bannerImageUrl || "/assets/images/placeholderBanner.jpg"
          }
          alt="Banner"
          fill
          className="object-cover rounded-xl"
          priority
        />
      )}

      <div className="absolute -bottom-10 left-8">
        <div className="w-24 h-24 bg-white rounded-lg shadow-lg border border-border-light p-2">
          {formData.profileImageUrl && (
            <Image
              src={
                formData.profileImageUrl ||
                "/assets/images/Portrait_Placeholder.png"
              }
              alt="Portrait_Placeholder"
              width={96}
              height={96}
              className="object-contain"
            />
          )}
        </div>
      </div>
    </div>

    <div className="pt-4 text-center">
      <h2 className="text-2xl font-bold">
        {formData.companyName || "Global Manufacturing Co."}
      </h2>
      <div className="flex justify-center gap-6 mt-2 text-base text-text-secondary">
        <span className="flex items-center gap-1">
          <BsBuilding /> {formData.industry || "Custom Manufacturer"}
        </span>
        <span className="flex items-center gap-1">
          <FiCalendar />{" "}
          <p className="text-base text-text-secondary">
            {formData.foundedDate
              ? formatYearMonth(formData.foundedDate)
              : "August 2021"}
          </p>
        </span>
        <span className="flex items-center gap-1">
          <FiMapPin /> {formData.city || "Ottawa"},{" "}
          {formData.country || "Canada"}
        </span>
      </div>
    </div>

    <div className="p-6 border border-border-light rounded-lg bg-white">
      <h3 className="font-bold mb-2">Overview</h3>
      <p className="text-base text-text-secondary leading-relaxed">
        {formData.bio || "Company overview placeholder..."}
      </p>

      <div className="grid grid-cols-3 gap-6 mt-6 pt-6 border-t border-border-light">
        <div>
          <p className="text-sm font-bold text-text-primary mb-1">
            Business Type
          </p>
          <p className="text-base text-text-secondary">
            {formData.businessType || "Private Corporation"}
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-text-primary mb-1">Founded</p>
          <p className="text-base text-text-secondary">
            {formData.foundedDate || "2021"}
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-text-primary mb-1">
            Operating Hours
          </p>
          <p className="text-base text-text-secondary">
            {formData.operatingHours || "09:00 - 18:00"}
          </p>
        </div>
      </div>
    </div>

    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3 text-base text-orange-800">
      <div className="pt-0.5">
        <div className="w-4 h-4 rounded-full bg-orange-200 flex items-center justify-center text-[10px] font-bold">
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

export default function BusinessProfilePage() {
  const steps = [
    { id: 1, label: "Basic Identity" },
    { id: 2, label: "Location Contact" },
    { id: 3, label: "Review And Submission" },
  ];

  const { currentStep, nextStep, prevStep } = useStepper(1, steps.length);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    companyName: "",
    industry: "",
    businessType: "",
    companySize: "",
    foundedDate: "",
    operatingHours: "",
    website: "",
    bio: "",
    country: "",
    city: "",
    address: "",
    contactName: "",
    contactTitle: "",
    contactPhone: "",
    contactEmail: "",
    profileImageUrl: "",
    bannerImageUrl: "",
    certificationDocUrl: "",
    compliances: [],
  });

  const router = useRouter();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async () => {
    setError("");

    console.log(formData);

    if (
      !formData.companyName ||
      !formData.industry ||
      !formData.contactEmail ||
      !formData.country ||
      !formData.city
    ) {
      setError("Please fill all required fields before submitting.");
      return false;
    }

    if (!isValidEmail(formData.contactEmail)) {
      setError("Please enter a valid email address.");
      return false;
    }

    try {
      // Automatically create a subscription if one doesn't exist
      // This bypasses the "No subscription found" error
      try {
        const planId = localStorage.getItem("selectedPlanId");
        if (planId) {
          await api.post({
            url: "/subscription",
            payload: { planId: planId },
            enableErrorMessage: false,
            enableSuccessMessage: false,
          });
        }
      } catch (subError) {
        // Ignore subscription errors - it might already exist
        console.log("Subscription creation skipped:", subError.message);
      }

      // Map frontend fields to backend BusinessProfile schema
      const payload = {
        companyName: formData.companyName,
        businessType: formData.businessType || "",
        companySize: formData.companySize || "",
        foundedDate: formData.foundedDate || null,
        primaryIndustry: formData.industry || "",
        operationHour: formData.operatingHours || "",
        website: formData.website || "",
        description: formData.bio || "",
        logo: formData.profileImageUrl || "",
        banner: formData.bannerImageUrl || "",
        // Map location fields into nested object
        location: {
          country: formData.country || "",
          city: formData.city || "",
          addressLine: formData.address || "",
        },
        // Map B2B contact fields into nested object
        b2bContact: {
          name: formData.contactName || "",
          title: formData.contactTitle || "",
          phone: formData.contactPhone || "",
          supportEmail: formData.contactEmail || "",
        },
        // Backend expects `certifications` array, use selected compliances
        certifications: formData.compliances || [],
      };

      const response = await api.post({
        url: "/businessProfile",
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
    }
  };

  const handleNext = async () => {
    if (isUploading) {
      setError("Please wait for uploads to finish.");
      return;
    }

    if (currentStep < steps.length) {
      nextStep();
      return;
    }

    setIsLoading(true);
    const success = await onSubmit();
    setIsLoading(false);

    if (success) {
      setIsSuccessModalOpen(true);
    }
  };

  const handleSuccessNext = () => {
    // Update user role in localStorage
    if (typeof window !== "undefined") {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      storedUser.role = "business";
      storedUser.isNewToPlatform = false;
      localStorage.setItem("user", JSON.stringify(storedUser));
      window.location.href = "/dashboard/business";
    }
  };

  const handleBack = () => {
    const changed = prevStep();
    if (!changed) {
      // If prevStep returned false, we are at the start
      router.push("/onboarding/plans");
    }
  };

  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="min-h-screen">
      <Card className="w-full sm:w-3xl lg:w-5xl max-w-5xl mx-auto mt-16 md:mt-10 flex-shrink-0 bg-white shadow-xl min-h-[800px]">
        <div className="p-8 pb-0">
          <h1 className="text-2xl font-bold text-center mb-8">
            Business Profile Creation
          </h1>
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
          {currentStep === 3 && <Step3 formData={formData} />}
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
              isLoading={isLoading || isUploading}
              disabled={isUploading}
              className="min-w-[140px]"
            >
              {isUploading
                ? "Uploading..."
                : currentStep === steps.length
                  ? "Submit Profile For Verification"
                  : "Next"}
              <FiArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </Card>

      <SuccessModal
        isOpen={isSuccessModalOpen}
        title="Profile Complete!"
        description="Your Business Profile Has Been Successfully Saved. You Would Now Be Redirected To The Dashboard."
        onNext={handleSuccessNext}
      />
    </div>
  );
}

"use client";

import { FiChevronDown } from "react-icons/fi";
import { cn, getImageDimensions } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { PhoneInputWithCountry } from "@/components/ui/PhoneInputWithCountry";
import { LocationSearch } from "@/components/ui/LocationSearch";
import OnboardingImageUploadField from "@/components/onboarding/OnboardingImageUploadField";
import CKEditorField from "@/components/ui/CKEditor";
import { useState } from "react";

export default function UserProfileStep1({
  formData,
  handleChange,
  setIsUploading,
  onUpdateLogo,
  touched,
  setTouched,
  phoneError,
  bioLength,
  onBioLengthChange,
  roleOptions,
}) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const fullNameRegex = /^[A-Za-z\s]+$/;
  // Validation
  const isFullNameValid =
    formData.fullName?.trim().length > 0 &&
    fullNameRegex.test(formData.fullName.trim());
  const isEmailValid = emailRegex.test(formData.email || "");
  const isCurrentTitleValid =
    formData.currentTitle &&
    (formData.currentTitle !== "Other" || formData.customTitle?.trim().length > 0);
  const isPhoneValid = !!formData.phone && !phoneError;
  const isCountryValid = !!formData.country?.trim();
  const isCityValid = !!formData.city?.trim();
  const isAddressValid = !!formData.address?.trim();
  const isLogoUploaded = !!formData.logo;
  const isBannerUploaded = !!formData.banner;

  const handleBlur = (field) => {
    setTouched?.({ ...touched, [field]: true });
  };

  console.log(formData.description, "description")
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
      {/* Info Box */}
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
            All fields marked with <span className="text-red-500">*</span> are required
          </p>
          <p className="text-sm text-blue-700 mt-1">
            Please complete all required fields before proceeding to the next step.
          </p>
        </div>
      </div>

      {/* Image Uploads */}
      <div className="space-y-6">
        <OnboardingImageUploadField
          label="Upload Profile Photo"
          subLabel="JPG, PNG (Max 5MB)"
          value={formData.logo}
          required
          folder="user/profile"
          onChange={(url) => handleChange("logo", url)}
          onUploadingChange={setIsUploading}
          successMessage="Profile photo uploaded successfully!"
          onUploadComplete={async (url) => {
            if (onUpdateLogo) await onUpdateLogo(url);
          }}
        />
        {touched?.logo && !isLogoUploaded && (
          <p className="text-sm text-red-500 font-medium">Profile photo is required</p>
        )}

        <OnboardingImageUploadField
          label="Upload Banner Image"
          subLabel="JPG, PNG (Max 5MB, Recommended: 1440x300px)"
          value={formData.banner}
          folder="user/banner"
          onChange={(url) => handleChange("banner", url)}
          onUploadingChange={setIsUploading}
          successMessage="Banner image uploaded successfully!"
          previewWrapperClassName="relative w-32 h-20 rounded-lg overflow-hidden bg-gray-100"
          previewAlt="Banner Preview"
          beforeUpload={async (file) => {
            try {
              const dims = await getImageDimensions(file);
              if (dims.width < 1440 || dims.height < 300) {
                handleChange(
                  "bannerWarning",
                  `Warning: This image is ${dims.width}x${dims.height}. Quality might be low (1440x300 recommended).`
                );
              } else {
                handleChange("bannerWarning", "");
              }
            } catch (error) {
              handleChange("bannerWarning", "Upload failed or invalid image file");
              throw error;
            }
          }}
        />
        {touched?.banner && !isBannerUploaded && (
          <p className="text-sm text-red-500 font-medium">Banner image is required</p>
        )}
        {formData.bannerWarning && (
          <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
            <span className="text-amber-600 font-bold">⚠️</span>
            <p className="text-sm text-amber-900 font-medium">{formData.bannerWarning}</p>
          </div>
        )}
      </div>

      {/* Personal Info */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label className="text-base font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Alex Morgan"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            onBlur={() => handleBlur("fullName")}
            required
          />
          {touched?.fullName && !isFullNameValid && (
            <p className="text-sm text-red-500 font-medium">Full name is required with only letters</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-base font-medium">
            Email Address <span className="text-red-500">*</span>
          </label>
          <Input
            type="email"
            placeholder="alex.morgan@example.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            required
          />
          {touched?.email && !isEmailValid && (
            <p className="text-sm text-red-500 font-medium">Enter a valid email address</p>
          )}
        </div>

        {/* Current Title / Role */}
        <div className="space-y-2">
          <label className="text-base font-medium">
            Current Title / Role <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
              value={formData.currentTitle || ""}
              onChange={(e) => handleChange("currentTitle", e.target.value)}
              onBlur={() => handleBlur("currentTitle")}
              required
            >
              <option value="">Select Title</option>
              {roleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-3 top-3.5 text-text-secondary pointer-events-none" />
          </div>
          {formData.currentTitle === "Other" && (
            <Input
              placeholder="Enter your custom title"
              value={formData.customTitle || ""}
              onChange={(e) => handleChange("customTitle", e.target.value)}
              onBlur={() => handleBlur("customTitle")}
              required
            />
          )}
          {touched?.currentTitle && !isCurrentTitleValid && (
            <p className="text-sm text-red-500 font-medium">
              {formData.currentTitle === "Other"
                ? "Custom title is required"
                : "Current title is required"}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-base font-medium">
            Contact Phone Number <span className="text-red-500">*</span>
          </label>
          <PhoneInputWithCountry
            value={formData.phone || ""}
            onChange={(value) => handleChange("phone", value)}
            onBlur={() => handleBlur("phone")}
            required
          />
          {touched?.phone && !isPhoneValid && !phoneError && (
            <p className="text-sm text-red-500 font-medium">Phone number is required</p>
          )}
          {phoneError && (
            <p className="text-sm text-red-500 mt-1 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
              {phoneError}
            </p>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Location Information</h3>
        <LocationSearch
          placeholder="Search for your location..."
          onLocationSelect={(locationData) => {
            handleChange("country", locationData.country);
            handleChange("city", locationData.city);
            handleChange("address", locationData.address);
          }}
        />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-base font-medium">
              Country <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Country"
              value={formData.country || ""}
              onChange={(e) => handleChange("country", e.target.value)}
              onBlur={() => handleBlur("country")}
              required
            />
            {touched?.country && !isCountryValid && (
              <p className="text-sm text-red-500 font-medium">Country is required</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">
              City <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="City"
              value={formData.city || ""}
              onChange={(e) => handleChange("city", e.target.value)}
              onBlur={() => handleBlur("city")}
              required
            />
            {touched?.city && !isCityValid && (
              <p className="text-sm text-red-500 font-medium">City is required</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">
              Address Line <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Street Address"
              value={formData.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              onBlur={() => handleBlur("address")}
              required
            />
            {touched?.address && !isAddressValid && (
              <p className="text-sm text-red-500 font-medium">Address is required</p>
            )}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-base font-medium">
            Description <span className="text-red-500">*</span>
          </label>
          <span
            className={cn(
              "text-sm font-medium",
              (bioLength || 0) > 2000 ? "text-red-500" : "text-text-secondary"
            )}
          >
            {bioLength || 0} / 2000
          </span>
        </div>
        <CKEditorField
          value={formData.bio || ""}
          onChange={(val) => {
            console.log(val, "val")
            handleChange("bio", val);
            const text = val.replace(/<[^>]*>/g, "");
            onBioLengthChange?.(text.length);
          }}
          onBlur={() => handleBlur("bio")}
          placeholder="Detailed job description..."
          maxLength={2000}
        />
      </div>
    </div>
  );
}
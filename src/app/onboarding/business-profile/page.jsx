"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { cn, getImageDimensions } from "@/lib/utils";
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
import { useUserRole } from "@/context/UserContext";
import { PhoneInputWithCountry } from "@/components/ui/PhoneInputWithCountry";
import { CountrySelect } from "@/components/ui/CountrySelect";
import { LocationSearch } from "@/components/ui/LocationSearch";
import dynamic from "next/dynamic";
import SlateRenderer from "@/components/ui/SlateRenderer";
import { PDFViewer } from "@/components/ui/PDFViewer";

const SlateEditor = dynamic(() => import("@/components/ui/SlateEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[150px] bg-gray-50 animate-pulse rounded-md border" />
  ),
});

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

const isValidPhone = (phone) => {
  const cleanPhone = phone.replace(/\s+/g, "");
  return /^\+[1-9]\d{6,14}$/.test(cleanPhone);
};

const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === "http:" || urlObj.protocol === "https:";
  } catch {
    return false;
  }
};

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

// Remove hardcoded TIMEZONES and generate them dynamically
const TIMEZONES = Intl.supportedValuesOf
  ? Intl.supportedValuesOf("timeZone")
  : [
      "PST",
      "EST",
      "CST",
      "MST",
      "UTC",
      "GMT",
      "IST",
      "CET",
      "EET",
      "JST",
      "AEST",
    ];

const generateTimeOptions = () => {
  const times = [];
  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 2; j++) {
      const hour = i;
      const minute = j === 0 ? "00" : "30";
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      times.push(`${displayHour}:${minute} ${ampm}`);
    }
  }
  return times;
};

const TIME_OPTIONS = generateTimeOptions();

const Step1 = ({
  formData,
  handleChange,
  setIsUploading,
  companyNameError,
  bioLength,
  onBioLengthChange,
}) => {
  // Parse existing operating hours or set defaults
  const [schedule, setSchedule] = useState(() => {
    const defaultSchedule = {
      startDay: "Monday",
      endDay: "Friday",
      startTime: "9:00 AM",
      endTime: "6:00 PM",
      timezone: "PST",
    };

    if (formData.operatingHours) {
      // Try to parse format: "Monday - Friday: 9:00 AM - 6:00 PM PST"
      // Regex matches: "Day - Day: Time - Time Zone"
      const regex = /^(.*?) - (.*?): (.*?) - (.*?) (.*)$/;
      const match = formData.operatingHours.match(regex);
      if (match) {
        return {
          startDay: match[1],
          endDay: match[2],
          startTime: match[3],
          endTime: match[4],
          timezone: match[5],
        };
      }
    }
    return defaultSchedule;
  });

  // Update formData when schedule changes
  React.useEffect(() => {
    const formatted = `${schedule.startDay} - ${schedule.endDay}: ${schedule.startTime} - ${schedule.endTime} ${schedule.timezone}`;
    if (formatted !== formData.operatingHours) {
      handleChange("operatingHours", formatted);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedule]);

  const handleScheduleChange = (field, value) => {
    setSchedule((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-base font-medium">
            Company Name <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Global Manufacturing Co."
            value={formData.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            required
            className={cn(
              companyNameError && "border-red-500 focus-visible:ring-red-500",
            )}
          />
          {companyNameError && (
            <p className="text-sm text-red-500 mt-1 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
              {companyNameError}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-base font-medium">
            Select Primary Industry <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
              value={formData.industry || ""}
              onChange={(e) => handleChange("industry", e.target.value)}
              required
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
          <label className="text-base font-medium">
            Business Type <span className="text-red-500">*</span>
          </label>
          <Input
            placeholder="Private Corporation"
            value={formData.businessType || ""}
            onChange={(e) => handleChange("businessType", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <label className="text-base font-medium">
            Company Size <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
              value={formData.companySize || ""}
              onChange={(e) => handleChange("companySize", e.target.value)}
              required
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
          <label className="text-base font-medium">
            Founded Date <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              type="date"
              className="block"
              value={formData.foundedDate || ""}
              onChange={(e) => handleChange("foundedDate", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="space-y-2 md:col-span-1">
          <label className="text-base font-medium">
            Operating Hours <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {/* Days Row */}
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <select
                  className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
                  value={schedule.startDay}
                  onChange={(e) =>
                    handleScheduleChange("startDay", e.target.value)
                  }
                >
                  {DAYS.map((d) => (
                    <option key={`start-${d}`} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-3.5 text-text-secondary pointer-events-none w-4 h-4" />
              </div>
              <div className="relative">
                <select
                  className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
                  value={schedule.endDay}
                  onChange={(e) =>
                    handleScheduleChange("endDay", e.target.value)
                  }
                >
                  {DAYS.map((d) => (
                    <option key={`end-${d}`} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-3.5 text-text-secondary pointer-events-none w-4 h-4" />
              </div>
            </div>

            {/* Times Row */}
            <div className="grid grid-cols-3 gap-2">
              <div className="relative col-span-1">
                <select
                  className="w-full h-11 rounded-md border border-border-light bg-surface px-2 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none truncate"
                  value={schedule.startTime}
                  onChange={(e) =>
                    handleScheduleChange("startTime", e.target.value)
                  }
                >
                  {TIME_OPTIONS.map((t) => (
                    <option key={`start-${t}`} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-2 top-3.5 text-text-secondary pointer-events-none w-3 h-3" />
              </div>
              <div className="relative col-span-1">
                <select
                  className="w-full h-11 rounded-md border border-border-light bg-surface px-2 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none truncate"
                  value={schedule.endTime}
                  onChange={(e) =>
                    handleScheduleChange("endTime", e.target.value)
                  }
                >
                  {TIME_OPTIONS.map((t) => (
                    <option key={`end-${t}`} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-2 top-3.5 text-text-secondary pointer-events-none w-3 h-3" />
              </div>
              <div className="relative col-span-1">
                <select
                  className="w-full h-11 rounded-md border border-border-light bg-surface px-2 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none truncate"
                  value={schedule.timezone}
                  onChange={(e) =>
                    handleScheduleChange("timezone", e.target.value)
                  }
                >
                  {TIMEZONES.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-2 top-3.5 text-text-secondary pointer-events-none w-3 h-3" />
              </div>
            </div>
            <p className="text-sm text-gray-500">
              Format: Day - Day: Time - Time Zone
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-base font-medium">
          Official Company Website <span className="text-red-500">*</span>
        </label>
        <Input
          placeholder="https://www.example.com"
          value={
            formData.website.startsWith("https://")
              ? formData.website
              : "https://" + formData.website || ""
          }
          onChange={(e) => handleChange("website", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-base font-medium">
            Company Mission And Bio <span className="text-red-500">*</span>
          </label>
          <span
            className={cn(
              "text-sm font-medium",
              bioLength > 5000 ? "text-red-500" : "text-text-secondary",
            )}
          >
            {bioLength} / 5000
          </span>
        </div>
        <SlateEditor
          value={formData.bio}
          onChange={(val) => handleChange("bio", val)}
          onLengthChange={onBioLengthChange}
          placeholder="Tell us about your company..."
          maxLength={5000}
        />
        {bioLength > 5000 && (
          <p className="text-sm text-red-500 font-medium">
            Description cannot exceed 5000 characters
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-base font-medium">
            Profile Image <span className="text-red-500">*</span>
          </label>

          {formData.profileImageUrl ? (
            <div className="relative group">
              <label className="border-2 border-border-light rounded-lg p-4 bg-surface hover:bg-surface-muted cursor-pointer block transition-all">
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 10 * 1024 * 1024) {
                      alert("File must be under 10MB");
                      return;
                    }
                    setIsUploading(true);
                    try {
                      const url = await uploadToCloudinary(
                        file,
                        "business/profile",
                        () => {},
                      );
                      handleChange("profileImageUrl", url);
                    } catch (err) {
                      alert("Upload failed");
                      console.error(err);
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                />
                <div className="w-28 h-28 mx-auto border border-gray-200 rounded-lg overflow-hidden mb-3">
                  <Image
                    src={formData.profileImageUrl}
                    alt="Profile Preview"
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                  />
                </div>
                <p className="text-sm font-medium text-center text-text-secondary">
                  Click to change image
                </p>
              </label>
            </div>
          ) : (
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
          )}
        </div>
        <div className="space-y-2">
          <label className="text-base font-medium">
            Banner Image <span className="text-red-500">*</span>
          </label>
          {formData.bannerImageUrl ? (
            <div className="relative group">
              <label className="border-2 border-border-light rounded-lg p-4 bg-surface hover:bg-surface-muted cursor-pointer block transition-all">
                <input
                  type="file"
                  className="hidden"
                  accept=".jpg,.jpeg,.png"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    if (file.size > 10 * 1024 * 1024) {
                      alert("File must be under 10MB");
                      return;
                    }

                    try {
                      const dims = await getImageDimensions(file);
                      if (dims.width < 1440 || dims.height < 300) {
                        handleChange(
                          "bannerWarning",
                          `Warning: This image is ${dims.width}x${dims.height}. Quality might be low (1440x300 recommended).`,
                        );
                      } else {
                        handleChange("bannerWarning", "");
                      }

                      setIsUploading(true);
                      const url = await uploadToCloudinary(
                        file,
                        "business/banner",
                        () => {},
                      );
                      handleChange("bannerImageUrl", url);
                    } catch (err) {
                      handleChange(
                        "bannerWarning",
                        "Upload failed or invalid image file",
                      );
                      console.error(err);
                    } finally {
                      setIsUploading(false);
                    }
                  }}
                />
                <div className="relative w-full aspect-[1440/300] mx-auto border border-gray-200 rounded-lg overflow-hidden mb-3">
                  <Image
                    src={formData.bannerImageUrl}
                    alt="Banner Preview"
                    fill
                    className="object-cover w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <p className="text-sm font-medium text-center text-text-secondary">
                  Click to change image
                </p>
              </label>
            </div>
          ) : (
            <FileUpload
              label="Upload Banner Image"
              subLabel="Dimension 1440*300 (Max 10MB)"
              onUploadingChange={setIsUploading}
              onUpload={async (file, onProgress) => {
                try {
                  const dims = await getImageDimensions(file);
                  if (dims.width < 1440 || dims.height < 300) {
                    handleChange(
                      "bannerWarning",
                      `Warning: This image is ${dims.width}x${dims.height}. Quality might be low (1440x300 recommended).`,
                    );
                  } else {
                    handleChange("bannerWarning", "");
                  }

                  return uploadToCloudinary(
                    file,
                    "business/banner",
                    onProgress,
                  ).then((url) => {
                    handleChange("bannerImageUrl", url);
                    return url;
                  });
                } catch (err) {
                  handleChange(
                    "bannerWarning",
                    "Upload failed or invalid image file",
                  );
                  console.error(err);
                  throw err;
                }
              }}
            />
          )}

          {formData.bannerWarning && (
            <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2 animate-in fade-in slide-in-from-top-1 duration-200">
              <span className="text-amber-600 font-bold">⚠️</span>
              <p className="text-sm text-amber-900 font-medium">
                {formData.bannerWarning}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Step2 = ({ formData, handleChange, setIsUploading, phoneError }) => {
  const [currentCertName, setCurrentCertName] = useState("");
  const [isCustomCert, setIsCustomCert] = useState(false);
  const [uploadingCert, setUploadingCert] = useState(false);
  const [previewCert, setPreviewCert] = useState(null);

  const predefinedCerts = [
    "ISO 9001",
    "CE Certified",
    "TUV SUD",
    "FDA Approved",
    "Ethical Sourcing",
  ];

  const handleAddCert = (name, url) => {
    const currentCerts = formData.certifications || [];
    if (currentCerts.length >= 3) return;

    handleChange("certifications", [...currentCerts, { name, url }]);
    setCurrentCertName("");
    setIsCustomCert(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
      <div>
        <h3 className="text-lg font-semibold mb-4">Company Location</h3>

        {/* Location Search */}
        <div className="space-y-2 mb-6">
          <label className="text-base font-medium">
            Search Location <span className="text-red-500">*</span>
          </label>
          <LocationSearch
            placeholder="Search for your business location..."
            onLocationSelect={(locationData) => {
              handleChange("country", locationData.country);
              handleChange("city", locationData.city);
              handleChange("address", locationData.address);
            }}
          />
          <p className="text-sm text-text-secondary">
            Search and select your location, then edit the fields below if
            needed
          </p>
        </div>

        {/* Manual Input Fields */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-base font-medium">
              Country <span className="text-red-500">*</span>
            </label>
            <Input
              placeholder="Country"
              value={formData.country || ""}
              onChange={(e) => handleChange("country", e.target.value)}
              required
            />
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

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Compliance & Certification</h3>

        <div className="bg-gray-50 border border-border-light rounded-xl p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-semibold text-text-primary">
                Select or Enter Certificate Name
              </label>
              {!isCustomCert ? (
                <div className="relative">
                  <select
                    className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
                    value={currentCertName}
                    onChange={(e) => {
                      if (e.target.value === "Other") {
                        setIsCustomCert(true);
                        setCurrentCertName("");
                      } else {
                        setCurrentCertName(e.target.value);
                      }
                    }}
                  >
                    <option value="">Select Certificate</option>
                    {predefinedCerts.map((cert) => (
                      <option key={cert} value={cert}>
                        {cert}
                      </option>
                    ))}
                    <option value="Other">Other (Custom)</option>
                  </select>
                  <FiChevronDown className="absolute right-3 top-3.5 text-text-secondary pointer-events-none" />
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter custom certificate name"
                    value={currentCertName}
                    onChange={(e) => setCurrentCertName(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsCustomCert(false);
                      setCurrentCertName("");
                    }}
                    className="shrink-0"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-text-primary">
                {currentCertName
                  ? `Upload for ${currentCertName}`
                  : "Upload Document"}
              </label>
              <FileUpload
                label="Upload Document"
                subLabel="JPG, PNG, PDF (Max 5MB)"
                disabled={
                  !currentCertName ||
                  (formData.certifications || []).length >= 3
                }
                onUploadingChange={setIsUploading}
                onUpload={(file, onProgress) => {
                  if (!currentCertName) {
                    alert("Please select or enter a certificate name first");
                    return Promise.reject("No name");
                  }
                  return uploadToCloudinary(
                    file,
                    "business/certifications",
                    onProgress,
                  ).then((url) => {
                    handleAddCert(currentCertName, url);
                    return url;
                  });
                }}
              />
            </div>
          </div>

          <p className="text-sm text-text-secondary italic">
            * Select a certificate name first, then upload the corresponding
            image. You can add up to 3 certifications.
          </p>
        </div>

        {/* List of Added Certificates */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-base font-semibold">Added Certifications</h4>
            <span className="text-sm text-text-secondary">
              {(formData.certifications || []).length} / 3
            </span>
          </div>

          {(formData.certifications || []).length === 0 ? (
            <div className="text-center py-8 border border-dashed border-border-light rounded-xl bg-gray-50/50">
              <p className="text-sm text-text-secondary">
                No certifications added yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {formData.certifications.map((cert, index) => {
                const isPDF = cert.url?.toLowerCase().endsWith(".pdf");

                return (
                  <div
                    key={index}
                    className="relative group p-4 border border-border-light rounded-xl bg-white hover:border-brand-primary/30 transition-all shadow-sm"
                  >
                    <div
                      className="relative aspect-video w-full border border-gray-100 rounded-lg overflow-hidden bg-gray-50 mb-3 cursor-pointer hover:opacity-80 transition-opacity flex items-center justify-center"
                      onClick={() => setPreviewCert(cert)}
                    >
                      {isPDF ? (
                        <div className="text-center p-4">
                          <div className="text-5xl mb-2">📄</div>
                          <p className="text-xs text-text-secondary truncate px-2">
                            {cert.name}.pdf
                          </p>
                        </div>
                      ) : (
                        <Image
                          src={cert.url}
                          alt={cert.name}
                          fill
                          className="object-contain p-2"
                        />
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <span
                        className="text-sm font-medium text-text-primary truncate"
                        title={cert.name}
                      >
                        {cert.name}
                      </span>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setPreviewCert(cert)}
                          className="text-sm font-semibold text-brand-primary hover:text-brand-primary/80 flex items-center gap-1 transition-colors flex-1"
                        >
                          View Certificate
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.certifications.filter(
                              (_, i) => i !== index,
                            );
                            handleChange("certifications", updated);
                          }}
                          className="text-sm font-semibold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Primary B2B Contact</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-base font-medium">
              Contact Person Name <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.contactName || ""}
              onChange={(e) => handleChange("contactName", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">
              Title <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.contactTitle || ""}
              onChange={(e) => handleChange("contactTitle", e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">
              Phone <span className="text-red-500">*</span>
            </label>
            <PhoneInputWithCountry
              value={formData.contactPhone || ""}
              onChange={(value) => handleChange("contactPhone", value)}
              required
            />
            {phoneError && (
              <p className="text-sm text-red-500 mt-1 font-medium animate-in fade-in slide-in-from-top-1 duration-200">
                {phoneError}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">
              Support Email <span className="text-red-500">*</span>
            </label>
            <Input
              value={formData.contactEmail || ""}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      {/* Certificate Preview Modal */}
      {previewCert && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewCert(null)}
        >
          <div
            className="relative bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-border-light p-4 flex justify-between items-center z-10">
              <h3 className="text-lg font-semibold">{previewCert.name}</h3>
              <div className="flex items-center gap-3">
                {/* <a
                  href={previewCert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-brand-primary hover:text-brand-primary/80 transition-colors"
                >
                  Open in New Tab
                </a> */}
                <button
                  type="button"
                  onClick={() => setPreviewCert(null)}
                  className="text-2xl text-text-secondary hover:text-text-primary transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-6">
              {previewCert.url?.toLowerCase().endsWith(".pdf") ? (
                <PDFViewer url={previewCert.url} fileName={previewCert.name} />
              ) : (
                <div className="relative w-full min-h-[400px]">
                  <Image
                    src={previewCert.url}
                    alt={previewCert.name}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

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
      <SlateRenderer
        content={formData.bio}
        maxLength={500}
        className="text-base text-text-secondary leading-relaxed"
      />

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
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div>
          <p className="text-sm font-bold text-text-primary mb-1">
            Official Company Website
          </p>
          <p className="text-base text-text-secondary">
            {formData.website || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-text-primary mb-1">Location</p>
          <span className="flex text-text-secondary items-center gap-1">
            {formData.address || "Canada"}, {formData.city || "Ottawa"},{" "}
            {formData.country || "Canada"}
          </span>
        </div>
      </div>
    </div>

    {formData.certifications?.length > 0 && (
      <div className="p-6 border border-border-light rounded-lg bg-white mt-6">
        <h3 className="font-bold mb-3">Certifications & Compliance</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {formData.certifications.map((cert, index) => {
            const isPDF = cert.url?.toLowerCase().endsWith(".pdf");

            return (
              <div key={index} className="flex flex-col gap-2">
                <div className="relative aspect-video w-full border border-gray-100 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                  {isPDF ? (
                    <div className="text-center p-4">
                      <div className="text-5xl mb-2">📄</div>
                      <p className="text-xs text-text-secondary truncate px-2">
                        {cert.name}.pdf
                      </p>
                    </div>
                  ) : (
                    <Image
                      src={cert.url}
                      alt={cert.name}
                      fill
                      className="object-contain p-2"
                    />
                  )}
                </div>
                <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold w-fit">
                  {cert.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    )}

    <div className="p-6 border border-border-light rounded-lg bg-white">
      {/* <div className="grid grid-cols-3 gap-6 mt-6">
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
      <div className="grid grid-cols-3 gap-6 mt-6">
        <div>
          <p className="text-sm font-bold text-text-primary mb-1">
            Official Company Website
          </p>
          <p className="text-base text-text-secondary">
            {formData.website || "N/A"}
          </p>
        </div>
        <div>
          <p className="text-sm font-bold text-text-primary mb-1">
            Location
          </p>
          <span className="flex text-text-secondary items-center gap-1">
            {formData.address || "Canada"},{" "}
            {formData.city || "Ottawa"},{" "}
            {formData.country || "Canada"}
          </span>
        </div>
      </div> */}

      <div>
        <h3 className="text-lg font-semibold mb-4">Primary B2B Contact</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-base font-medium">Contact Person Name</label>
            <p className="text-base text-text-secondary">
              {formData.contactName}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">Title</label>
            <p className="text-base text-text-secondary">
              {formData.contactTitle}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">Phone</label>
            <p className="text-base text-text-secondary">
              {formData.contactPhone}
            </p>
          </div>
          <div className="space-y-2">
            <label className="text-base font-medium">Support Email</label>
            <p className="text-base text-text-secondary">
              {formData.contactEmail}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex gap-3 text-base text-orange-800">
      <div className="pt-0.5">
        <div className="w-4 h-4 rounded-full bg-orange-200 flex items-center justify-center text-[14px] font-bold">
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
  const [phoneError, setPhoneError] = useState("");
  const [companyNameError, setCompanyNameError] = useState("");
  const [bioLength, setBioLength] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

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
    bannerWarning: "",
    certifications: [], // Array of { name: string, url: string }
    customCountry: "",
  });
  const [createdProfile, setCreatedProfile] = useState(null);
  const [newToken, setNewToken] = useState(null);
  const { login } = useUserRole();

  const router = useRouter();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Real-time phone validation for contactPhone
    if (field === "contactPhone") {
      if (!value) {
        setPhoneError("");
      } else if (!isValidPhone(value)) {
        setPhoneError(
          "Please enter a valid international phone number (e.g., +923001234567)",
        );
      } else {
        setPhoneError("");
      }
    }

    // Real-time validation for companyName
    if (field === "companyName") {
      if (!value || value.trim() === "") {
        setCompanyNameError("Company name is required");
      } else {
        setCompanyNameError("");
      }
    }
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
          phone: formData.contactPhone
            ? formData.contactPhone.replace(/\s+/g, "")
            : "",
          supportEmail: formData.contactEmail || "",
        },
        // Backend expects `certifications` as an array of strings
        // Each entry is a single string: "Name|URL" to stay within the 3-item limit
        certifications: (formData.certifications || []).map(
          (c) => `${c.name}|${c.url}`,
        ),
      };

      const response = await api.post({
        url: "/businessProfile",
        payload: payload,
      });

      if (!response.success) {
        setError(response.message || "Signup failed");
        return false;
      }
      if (response.data) {
        setCreatedProfile(response.data);
      }

      // Capture new token if provided (fixes 403 stale token issue)
      const token =
        response.accessToken ||
        response.token ||
        response.data?.accessToken ||
        response.data?.token;
      if (token) {
        setNewToken(token);
        console.log("New token captured from business profile creation");
      }

      return true;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error(err);
      return false;
    }
  };

  const handleNext = async () => {
    // Validate current step before proceeding
    setError("");

    if (currentStep === 1) {
      // Step 1 validation: Basic Identity
      if (
        !formData.companyName ||
        !formData.industry ||
        !formData.businessType ||
        !formData.companySize ||
        !formData.foundedDate ||
        !formData.operatingHours ||
        !formData.website ||
        !formData.bio
      ) {
        setError("Please fill all required fields before proceeding.");
        return;
      }

      if (bioLength === 0) {
        setError("Company Mission And Bio is required.");
        return;
      }

      if (bioLength > 5000) {
        setError("Company Mission And Bio cannot exceed 5000 characters.");
        return;
      }

      if (!isValidUrl(formData.website)) {
        setError(
          "Please enter a valid website URL (e.g., https://www.example.com).",
        );
        return;
      }
    } else if (currentStep === 2) {
      // Step 2 validation: Location Contact with specific field messages
      if (!formData.country) {
        setError("Please enter the country.");
        return;
      }
      if (!formData.city) {
        setError("Please enter the city.");
        return;
      }
      if (!formData.address) {
        setError("Please enter the address line.");
        return;
      }
      if (!formData.contactName) {
        setError("Please enter the contact person name.");
        return;
      }
      if (!formData.contactTitle) {
        setError("Please enter the contact person title.");
        return;
      }
      if (!formData.contactPhone) {
        setError("Please enter the contact phone number.");
        return;
      }
      if (!isValidPhone(formData.contactPhone)) {
        setError(
          "Please enter a valid international phone number (e.g., +923001234567).",
        );
        return;
      }
      if (!formData.contactEmail) {
        setError("Please enter the support email.");
        return;
      }

      if (!isValidEmail(formData.contactEmail)) {
        setError("Please enter a valid email address.");
        return;
      }

      // No extra validation needed for certifications here as Step2 handles it
    }

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

  const handleSuccessNext = async () => {
    // Update user auth and profile in localStorage
    if (typeof window !== "undefined") {
      const baseUser = JSON.parse(localStorage.getItem("user") || "{}");

      // Try to refresh auth token so backend gets latest businessId/profileId.
      // This mirrors logging in again, which is why things work on 2nd login.
      let refreshedUser = { ...baseUser };
      try {
        const refresh = await api.get({
          url: "/auth/refreshToken/updateRole?role=business",
          activateLoader: false,
          enableSuccessMessage: false,
          enableErrorMessage: false,
        });

        if (refresh?.success) {
          refreshedUser = {
            ...refreshedUser,
            ...(refresh.data || {}),
          };

          const refreshedToken =
            refresh.accessToken ||
            refresh.token ||
            refresh.data?.accessToken ||
            refresh.data?.token;

          if (refreshedToken) {
            refreshedUser.accessToken = refreshedToken;
            refreshedUser.token = refreshedToken;
          }
        }
      } catch (e) {
        console.warn("Token refresh after business profile creation failed", e);
      }

      // Ensure we keep correct role and onboarding flags
      const finalUser = {
        ...refreshedUser,
        role: "business",
        isNewToPlatform: false,
      };

      // Store the created business profile payload for convenient access
      if (createdProfile) {
        finalUser.profilePayload = createdProfile;
      }

      // Fallback to token from profile creation if present
      if (newToken) {
        finalUser.accessToken = newToken;
        finalUser.token = newToken;
      }

      localStorage.setItem("user", JSON.stringify(finalUser));

      // Update global context so axios immediately sends the fresh token
      if (login) {
        login(finalUser);
      }

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
              companyNameError={companyNameError}
              bioLength={bioLength}
              onBioLengthChange={setBioLength}
            />
          )}
          {currentStep === 2 && (
            <Step2
              formData={formData}
              handleChange={handleChange}
              setIsUploading={setIsUploading}
              phoneError={phoneError}
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
        description="Your Business Profile Has Been Successfully Saved. Waiting for admin approval (to be done in next phase) till then you can explore the login the account without approval."
        onNext={handleSuccessNext}
      />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { cn, getImageDimensions } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import OnboardingImageUploadField from "@/components/onboarding/OnboardingImageUploadField";

export default function BusinessProfileStep1({
  formData,
  handleChange,
  setIsUploading,
  companyNameError,
  bioLength,
  onBioLengthChange,
  SlateEditor,
  industryOptions,
  companySizeOptions,
  days,
  timeOptions,
  timezones,
}) {
  const [schedule, setSchedule] = useState(() => {
    const defaultSchedule = {
      startDay: "Monday",
      endDay: "Friday",
      startTime: "9:00 AM",
      endTime: "6:00 PM",
      timezone: "PST",
    };

    if (formData.operatingHours) {
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

  useEffect(() => {
    const formatted = `${schedule.startDay} - ${schedule.endDay}: ${schedule.startTime} - ${schedule.endTime} ${schedule.timezone}`;
    if (formatted !== formData.operatingHours) {
      handleChange("operatingHours", formatted);
    }
  }, [schedule]); // eslint-disable-line react-hooks/exhaustive-deps

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
            className={cn(companyNameError && "border-red-500 focus-visible:ring-red-500")}
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
              {industryOptions.map((opt) => (
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
              {companySizeOptions.map((opt) => (
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
            <div className="grid grid-cols-2 gap-2">
              <div className="relative">
                <select
                  className="w-full h-11 rounded-md border border-border-light bg-surface px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none"
                  value={schedule.startDay}
                  onChange={(e) => handleScheduleChange("startDay", e.target.value)}
                >
                  {days.map((d) => (
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
                  onChange={(e) => handleScheduleChange("endDay", e.target.value)}
                >
                  {days.map((d) => (
                    <option key={`end-${d}`} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-3 top-3.5 text-text-secondary pointer-events-none w-4 h-4" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="relative col-span-1">
                <select
                  className="w-full h-11 rounded-md border border-border-light bg-surface px-2 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary appearance-none truncate"
                  value={schedule.startTime}
                  onChange={(e) => handleScheduleChange("startTime", e.target.value)}
                >
                  {timeOptions.map((t) => (
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
                  onChange={(e) => handleScheduleChange("endTime", e.target.value)}
                >
                  {timeOptions.map((t) => (
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
                  onChange={(e) => handleScheduleChange("timezone", e.target.value)}
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
                <FiChevronDown className="absolute right-2 top-3.5 text-text-secondary pointer-events-none w-3 h-3" />
              </div>
            </div>
            <p className="text-sm text-gray-500">Format: Day - Day: Time - Time Zone</p>
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
          <OnboardingImageUploadField
            label="Profile Image"
            subLabel="JPG, PNG (Max 10MB)"
            value={formData.profileImageUrl}
            required
            folder="business/profile"
            maxSizeMb={10}
            onChange={(url) => handleChange("profileImageUrl", url)}
            onUploadingChange={setIsUploading}
            updateLabel="Click to change image"
            showRemove={false}
            previewContainerClassName="border-2 border-border-light rounded-lg p-4 bg-surface hover:bg-surface-muted transition-all"
            previewWrapperClassName="w-28 h-28 mx-auto border border-gray-200 rounded-lg overflow-hidden mb-3 relative"
            previewImageClassName="object-cover w-full h-full"
          />
        </div>
        <div className="space-y-2">
          <OnboardingImageUploadField
            label="Banner Image"
            subLabel="Dimension 1440*300 (Max 10MB)"
            value={formData.bannerImageUrl}
            required
            folder="business/banner"
            maxSizeMb={10}
            onChange={(url) => handleChange("bannerImageUrl", url)}
            onUploadingChange={setIsUploading}
            updateLabel="Click to change image"
            showRemove={false}
            previewContainerClassName="border-2 border-border-light rounded-lg p-4 bg-surface hover:bg-surface-muted transition-all"
            previewWrapperClassName="relative w-full aspect-[1440/300] mx-auto border border-gray-200 rounded-lg overflow-hidden mb-3"
            previewImageClassName="object-cover w-full h-full"
            previewAlt="Banner Preview"
            beforeUpload={async (file) => {
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
              } catch (error) {
                handleChange(
                  "bannerWarning",
                  "Upload failed or invalid image file",
                );
                throw error;
              }
            }}
          />

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
}

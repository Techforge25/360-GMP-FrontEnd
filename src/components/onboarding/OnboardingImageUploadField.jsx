"use client";

import Image from "next/image";
import { FileUpload } from "@/components/ui/FileUpload";
import { uploadToCloudinary } from "@/lib/cloudinary";

export default function OnboardingImageUploadField({
  label,
  subLabel,
  value,
  required = false,
  folder,
  onChange,
  onUploadingChange,
  beforeUpload,
  onUploadComplete,
  maxSizeMb = 5,
  accept = ".jpg,.jpeg,.png",
  previewAlt = "Preview",
  previewWrapperClassName = "relative w-16 h-16 rounded-full overflow-hidden bg-gray-100",
  previewImageClassName = "object-cover",
  previewContainerClassName = "flex items-center gap-4 p-4 bg-green-50 border border-green-200 rounded-lg",
  successMessage,
  updateLabel = "Update",
  removeLabel = "Remove",
  showRemove = true,
}) {
  const runUpload = async (file, onProgress = () => {}) => {
    if (!file) return value;

    if (file.size > maxSizeMb * 1024 * 1024) {
      throw new Error(`File must be under ${maxSizeMb}MB`);
    }

    if (beforeUpload) {
      await beforeUpload(file);
    }

    const url = await uploadToCloudinary(file, folder, onProgress);
    onChange(url);

    if (onUploadComplete) {
      await onUploadComplete(url, file);
    }

    return url;
  };

  const handleNativeFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      onUploadingChange?.(true);
      await runUpload(file);
    } catch (error) {
      console.error("Image upload failed", error);
    } finally {
      onUploadingChange?.(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </h3>

      {value ? (
        <div className={previewContainerClassName}>
          <div className={previewWrapperClassName}>
            <Image src={value} alt={previewAlt} fill className={previewImageClassName} />
          </div>
          <div className="flex-1">
            {successMessage && (
              <p className="text-sm font-medium text-green-800">{successMessage}</p>
            )}
            <div className="mt-2 flex gap-3">
              <label className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer">
                {updateLabel}
                <input
                  type="file"
                  className="hidden"
                  accept={accept}
                  onChange={handleNativeFileChange}
                />
              </label>
              {showRemove && (
                <button
                  type="button"
                  onClick={() => onChange("")}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  {removeLabel}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <FileUpload
          label={label}
          subLabel={subLabel}
          onUploadingChange={onUploadingChange}
          onUpload={runUpload}
        />
      )}
    </div>
  );
}

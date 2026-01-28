import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";

export const FileUpload = ({
  label,
  subLabel,
  onUpload,
  onUploadingChange,
}) => {
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File must be under 10MB");
      return;
    }

    setUploading(true);
    if (onUploadingChange) onUploadingChange(true);
    setProgress(0);

    try {
      const url = await onUpload(file, (percent) => {
        setProgress(percent);
      });
      console.log("Uploaded:", url);
    } catch (err) {
      alert("Upload failed");
      console.error(err);
    } finally {
      setUploading(false);
      if (onUploadingChange) onUploadingChange(false);
    }
  };

  return (
    <div className="space-y-3">
      <label className="border-2 border-dashed border-border-light rounded-lg p-8 text-center bg-surface hover:bg-surface-muted cursor-pointer block">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
        />
        <div className="w-10 h-10 mx-auto mb-3 flex items-center justify-center rounded-lg border">
          <FiUpload />
        </div>
        <p className="text-base font-medium">
          {uploading ? "Uploading..." : label}
        </p>
        <p className="text-sm text-text-secondary">{subLabel}</p>
      </label>

      {uploading && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-brand-primary h-2 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

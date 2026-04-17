"use client";
import { uploadToCloudinary } from "@/lib/cloudinary";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdStar } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";
import { MdDelete, MdOutlineClear, MdOutlinePhotoCamera } from "react-icons/md";

const BusinessProductReviewModal = ({ onClose }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [files, setFiles] = useState([]); // store uploaded items
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    // limit check
    if (files.length + selectedFiles.length > 3) {
      alert("Maximum 3 files allowed");
      return;
    }

    setUploading(true);

    try {
      const uploadedFiles = await Promise.all(
        selectedFiles.map(async (file) => {
          const fileType = file.type.startsWith("video") ? "video" : "image";

          const url = await uploadToCloudinary(file, fileType);

          return {
            url,
            type: fileType,
          };
        }),
      );

      setFiles((prev) => [...prev, ...uploadedFiles]);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-[32rem] sm:h-auto h-[32rem] overflow-hidden overflow-y-auto py-[1.25rem] px-[1.25rem] rounded-[0.75rem] relative">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-text-primary font-primary font-semibold md:text-[22px] sm:text-[20px] text-[18px] ">
              Post A Review
            </h2>
            <p className="font-secondary sm:text-[14px] text-[12px] text-text-setting-light ">
              Reviewing: Precision Disc Brake Systemn
            </p>
          </div>

          <button onClick={onClose} className="">
            <MdOutlineClear size={22} className="text-text-primary" />
          </button>
        </div>

        <div className="sm:py-[2rem] py-[1rem]">
          <hr />
        </div>

        {/* Rating */}
        <div className="sm:py-[0.75rem] py-[0.375rem] ">
          <p className="text-[16px] font-semibold font-primary text-text-secondary">
            RATE YOUR EXPERIENCE
          </p>

          <div className="flex items-center sm:gap-[8px] gap-[2]">
            {[1, 2, 3, 4, 5].map((star) => (
              <IoMdStar
                key={star}
                size={39}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={`cursor-pointer transition-colors duration-200 text-3xl ${
                  star <= (hover || rating)
                    ? "text-brand-rating-star fill "
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Textarea */}
        <textarea
          className="w-full border-[0.063rem] border-brand-rating-star-border outline-none px-[0.938rem] py-[0.938rem]  rounded-[0.5rem] text-text-gray-more text-[0.875rem] font-secondary placeholder:text-text-gray-more "
          rows="4"
          placeholder="How was the quality? Did it meet your technical specifications?"
        />

        {/* Upload Box */}
        <div className="py-[0.5rem] w-[7.125rem] flex sm:gap-[10px] gap-[4px] items-center">
          {files.length < 3 && (
            <label className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50">
              <input
                onChange={handleFileChange}
                type="file"
                accept="image/*,video/*"
                className="hidden"
              />
              <span className="text-brand-primary">
                <MdOutlinePhotoCamera size={24} />
              </span>
              <p className="text-[0.875] text-brand-rating-text-border font-secondary text-center">
                Upload Photo/Video
              </p>
            </label>
          )}

          {/* Preview Section */}
          <div className="flex sm:gap-3 gap-1.5 mt-4 flex-row">
            {files.map((item, index) => (
              <div
                key={index}
                className="relative w-[100px] h-[100px] border rounded-lg overflow-hidden"
              >
                {/* Image Preview */}
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt="preview"
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                ) : (
                  <video
                    src={item.url}
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(index)}
                  className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1"
                >
                  <MdDelete size={16} />
                </button>
              </div>
            ))}
          </div>

          {/* Uploading State */}
          {uploading && (
            <p className="text-sm text-gray-500 mt-2">Uploading...</p>
          )}
        </div>

        {/* Info Box */}
        <div className="py-[1.5rem]">
          <div className="px-[16px] py-[16px] flex items-start gap-[0.75rem] bg-brand-business-button-light rounded-[4px]">
            <span>
              <IoAlertCircleOutline size={20} className="text-text-secondary" />
            </span>
            <p className="text-text-secondary text-secondary text-[1rem]">
              Your review helps our executive team maintain high quality
              standards for industrial manufacturing assets.
            </p>
          </div>
        </div>

        {/* Submit */}
        <button className="w-full py-[0.719rem] border-[1px] border-border-outline-light rounded-[0.5rem] bg-brand-primary text-white ">
          Submit
        </button>
      </div>
    </div>
  );
};

export default BusinessProductReviewModal;

"use client";

import { useEffect } from "react";
import { IoIosTrash } from "react-icons/io";
import { MdDownload } from "react-icons/md";

export default function CertificateModal({ isOpen, onClose, fileUrl }) {
  // Close on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-[90%] max-w-4xl rounded-lg shadow-lg border border-blue-500">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 border-b">
          <div className="flex items-center gap-3">
            {/* Delete icon (optional) */}
            <button className="text-accent-danger">
              <IoIosTrash size={24} />
            </button>

            {/* Download button */}
            <a
              href={fileUrl}
              download
              className="bg-brand-primary text-white px-[16px] py-[8px] rounded-md text-[16px] flex items-center gap-[2px]"
            >
              <span>
                <MdDownload size={24} className="text-white" />
              </span>
              <span>Download</span>
            </a>
          </div>

          {/* Close */}
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black text-lg"
          >
            ✕
          </button>
        </div>

        {/* Body (Preview) */}
        <div className="p-6 flex justify-center bg-gray-100">
          <iframe src={fileUrl} className="w-full h-[600px] border rounded" />
        </div>
      </div>
    </div>
  );
}

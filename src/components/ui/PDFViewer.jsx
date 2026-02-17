"use client";
import React from "react";
import { FiDownload, FiExternalLink } from "react-icons/fi";

export const PDFViewer = ({ url, fileName }) => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName || "certificate.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Controls Bar */}
      <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <span className="text-sm font-medium text-gray-700">
          {fileName || "Certificate"}
        </span>
        <div className="flex gap-2">
          {/* <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors"
            type="button"
          >
            <FiDownload className="w-4 h-4" />
            Download
          </button> */}
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors"
          >
            <FiExternalLink className="w-4 h-4" />
            Open in New Tab
          </a>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="w-full border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <iframe
          src={`${url}#toolbar=1&navpanes=1&scrollbar=1`}
          className="w-full h-[600px] border-0"
          title={fileName || "PDF Certificate"}
          style={{ minHeight: "600px" }}
        />
      </div>

      
    </div>
  );
};

"use client";
import React, { useState } from "react";
import { FiX, FiImage, FiCalendar } from "react-icons/fi";

const ViewAlbumModal = ({ isOpen, onClose, album }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  if (!isOpen || !album) return null;

  const handleClose = () => {
    setSelectedImage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {album.albumName || "Untitled Album"}
            </h2>
            {album.description && (
              <p className="text-sm text-gray-500 mt-1">{album.description}</p>
            )}
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-50">
          {album.images && album.images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {album.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer border border-gray-200 shadow-sm bg-white"
                >
                  <img
                    src={image}
                    alt={`Album image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <FiImage className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <FiImage className="w-12 h-12 mb-3 opacity-50" />
              <p>No images in this album</p>
            </div>
          )}
        </div>

        {/* Footer info (optional) */}
        <div className="px-6 py-3 border-t border-gray-100 bg-white text-xs text-gray-400 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <FiCalendar className="w-3.5 h-3.5" />
            <span>
              Created{" "}
              {new Date(album.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
          <span>{album.images?.length || 0} items</span>
        </div>
      </div>

      {/* Lightbox for Selected Image */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <FiX className="w-8 h-8" />
          </button>
          <img
            src={selectedImage}
            alt="Full view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default ViewAlbumModal;

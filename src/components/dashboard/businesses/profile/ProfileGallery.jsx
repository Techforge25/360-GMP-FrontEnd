"use client";
import React, { useState, useEffect } from "react";
import galleryAPI from "@/services/galleryAPI";
import { FiCamera } from "react-icons/fi";

import ViewAlbumModal from "../../profile/ViewAlbumModal";

export default function ProfileGallery({ businessProfileId }) {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isViewing, setIsViewing] = useState(false);

  useEffect(() => {
    const fetchGallery = async () => {
      if (!businessProfileId) {
        setLoading(false);
        return;
      }

      try {
        const response = await galleryAPI.fetchAlbums(businessProfileId, 1, 8);

        if (response.success) {
          // Handle various possible response structures
          let galleryData = [];
          if (Array.isArray(response.data)) {
            galleryData = response.data;
          } else if (Array.isArray(response.data?.docs)) {
            galleryData = response.data.docs;
          } else if (Array.isArray(response.data?.gallery)) {
            galleryData = response.data.gallery;
          }

          setAlbums(galleryData.slice(0, 8)); // Ensure max 8 items
        }
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [businessProfileId]);

  const handleAlbumClick = async (albumId) => {
    if (isViewing) return;

    try {
      setIsViewing(true);
      const response = await galleryAPI.viewAlbum(albumId);
      if (response.success && response.data) {
        setSelectedAlbum(response.data);
        setIsViewModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to view album:", error);
    } finally {
      setIsViewing(false);
    }
  };

  if (loading) {
    // ... existing loading state ...
  }

  if (!albums || albums.length === 0) {
    // ... existing empty state ...
  }

  return (
    <div className="mb-12">
      <h2 className="text-center text-3xl font-semibold text-black mb-8">
        Gallery
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums.map((album, index) => (
          <div
            key={album._id || album.id || index}
            onClick={() => handleAlbumClick(album._id || album.id)}
            className={`h-64 bg-gray-200 rounded-lg overflow-hidden relative group cursor-pointer ${isViewing ? "opacity-70" : ""}`}
          >
            {/* Album Cover Image ... */}
            {album.images && album.images.length > 0 ? (
              <img
                src={album.images[0]}
                alt={album.albumName || `Album ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.background =
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center">
                <FiCamera className="w-12 h-12 text-white/50" />
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Album Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                {album.albumName || "Untitled Album"}
              </h3>
              {album.description && (
                <p className="text-white/80 text-sm line-clamp-2">
                  {album.description}
                </p>
              )}
              {album.images && album.images.length > 1 && (
                <p className="text-white/60 text-sm mt-1">
                  {album.images.length} photos
                </p>
              )}
            </div>

            {/* Image Count Badge */}
            {album.images && album.images.length > 1 && (
              <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-md flex items-center gap-1">
                <FiCamera className="w-3 h-3" />
                {album.images.length}
              </div>
            )}
          </div>
        ))}
      </div>

      <ViewAlbumModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedAlbum(null);
        }}
        album={selectedAlbum}
      />
    </div>
  );
}

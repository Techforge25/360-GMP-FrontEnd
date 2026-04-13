"use client";
import React, { useState } from "react";
import { FiCamera, FiEdit2, FiTrash2 } from "react-icons/fi";
import UploadGalleryModal from "./UploadGalleryModal";
import ViewAlbumModal from "./ViewAlbumModal";
import galleryAPI from "@/services/galleryAPI";
import businessProfileAPI from "@/services/businessProfileAPI";
import { useUserRole } from "@/context/UserContext";
import SlateRenderer from "@/components/ui/SlateRenderer";
import Image from "next/image";
import { toast } from "react-toastify";
import UpdateGalleryModal from "./UpdateGalleryModal";

const BusinessAboutTab = ({ businessId }) => {
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [isViewAlbumModalOpen, setIsViewAlbumModalOpen] = useState(false);
  const [isUpdateAlbumModalOpen, setIsUpdateAlbumModalOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [singleAlbum, setSingleAlbum] = useState(null);
  const [updateAlbum, setUpdateAlbum] = useState(false);
  const { role, user } = useUserRole();

  const getProfileIdFromToken = (token) => {
    if (!token) return null;
    try {
      if (typeof window === "undefined") return null;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join(""),
      );
      const decoded = JSON.parse(jsonPayload);
      return decoded.profiles?.businessProfileId;
    } catch (e) {
      console.error("Failed to decode token", e);
      return null;
    }
  };

  const tokenBusinessId = getProfileIdFromToken(
    user?.accessToken || user?.token,
  );

  console.log("Debug IDs:", {
    propBusinessId: businessId,
    userProfileId: user?.profiles?.businessProfileId,
    tokenBusinessId,
  });

  const fetchProfile = async () => {
    if (businessId) {
      try {
        const response =
          await businessProfileAPI.viewBusinessProfile(businessId);

        if (response.success && response.data) {
          console.log(response.data, "response data")
          setProfileData(response.data);
        } else {
          console.error("Fetch profile failed:", response.message);
        }
      } catch (error) {
        console.error("Failed to fetch business profile:", error);
      } finally {
      }
    }
  };

  const fetchAlbums = async () => {
    if (businessId) {
      try {
        console.log("Fetching albums for:", businessId);
        const response = await galleryAPI.fetchAlbums(businessId);
        console.log("Fetch albums FULL response:", response);
        console.log("abcdef")
        setGallery(response.data.docs);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    }
  };

  const deleteAlbum = async (e, id) => {
    e.stopPropagation()
    try {
      const response = await businessProfileAPI.deleteBusinessProfileAlbum(id);
      if (response.success) {
        toast.success("Album deleted successfully!");
        fetchAlbums();
      }
    } catch (error) {
      console.error("Failed to delete album:", error);
      toast.error(error?.response?.data?.message || "Failed to delete album");
    }
  }

  React.useEffect(() => { 
    fetchAlbums();
    fetchProfile();
  }, [businessId, isViewAlbumModalOpen, isGalleryModalOpen, updateAlbum]);

  return (
    <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-4 sm:space-y-6">
        {/* Our Story & Mission */}
        <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-5 xl:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3 sm:mb-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-900">
              Company Mission And Bio
            </h2>
          </div>

          <div className="text-sm sm:text-sm text-gray-600 leading-relaxed min-h-[100px]">
            {/* <p className="text-sm sm:text-sm text-gray-600 leading-relaxed min-h-[100px]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(profileData?.description),
              }}
            /> */}
            {profileData?.description ? (
              <SlateRenderer
                content={profileData.description}
                className="text-sm sm:text-sm text-gray-600 leading-relaxed"
              />
            ) : (
              "No description available."
            )}
          </div>
        </div>


        {/* Gallery */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-lg font-bold text-gray-900">Gallery</h2>
            {/* {isOwner && ( */}
            <button
              onClick={() => setIsGalleryModalOpen(true)}
              className="flex items-center gap-2 text-[#240457] text-sm font-semibold hover:underline"
            >
              Add To Your Profile
              <span className="text-gray-400">|</span>
              <FiCamera className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Photo</span>
            </button>
            {/* )} */}
          </div>

          {/* Gallery Grid */}
          {gallery?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {gallery?.map((album) => (
                <div
                  key={album._id || album.id}
                  onClick={() => {
                    setSelectedAlbum(album);
                    setIsViewAlbumModalOpen(true);
                    setIsViewAlbumModalOpen(false)
                  }}
                  className="relative rounded-xl overflow-hidden group aspect-[4/3] cursor-pointer"
                >
                  {/* Image */}
                  {album?.images?.map((image, index) => {
                    return (
                      <div key={index} className="absolute inset-0 bg-gray-200">
                        <Image
                          src={
                            image
                          }
                          fill
                          alt={"gallery image"}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    )
                  })}


                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:via-black/40" />

                  {/* Image Count Badge */}
                  {album.images?.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-sm px-2 py-1 rounded-md flex items-center gap-1">
                      <FiCamera className="w-3 h-3" />
                      {album.images.length}
                    </div>
                  )}

                  {/* Action Buttons */}
                  {/* {isOwner && ( */}
                  <div className="absolute top-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors" onClick={(e) => deleteAlbum(e, album._id)}>
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="p-1.5 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition-colors" onClick={() => {
                      setSingleAlbum(album)
                      setIsUpdateAlbumModalOpen(true)
                    }}>
                      <FiEdit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  {/* )} */}

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-300 translate-y-2 group-hover:translate-y-0">
                    <h3 className="text-white font-semibold text-base mb-1 line-clamp-1">
                      {album.albumName || album.title}
                    </h3>
                    <p className="text-white/80 text-sm sm:text-sm line-clamp-2">
                      {album.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <FiCamera className="w-6 h-6 text-gray-400" />
              </div>
              <h3 className="text-base font-medium text-gray-900">
                No albums yet
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Share photos of your facilities and products.
              </p>
              {/* {isOwner && ( */}
              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="mt-4 text-[#240457] font-medium text-sm hover:underline"
              >
                Create your first album
              </button>
              {/* )} */}
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Certifications */}
      <div className="w-full lg:w-[320px] xl:w-[350px]">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Certifications</h3>
            {/* {isOwner && ( */}
            {/* <button className="text-[#240457] text-sm font-semibold hover:underline">
              Manage
            </button> */}
            {/* )} */}
          </div>

          <div className="space-y-3">
            {Array.isArray(profileData?.certifications) &&
              profileData.certifications.length > 0 ? (
              profileData.certifications.map((url, index) => {
                const getFileType = (url) => {
                  const ext = url.split(".").pop().toLowerCase();
                  if (["jpg", "jpeg", "png", "webp"].includes(ext)) return "image";
                  if (ext === "pdf") return "pdf";
                  if (["doc", "docx"].includes(ext)) return "word";
                  return "other";
                };

                const fileType = getFileType(url);
                const name = `Certification ${index + 1}`;

                return (
                  <div
                    key={index}
                    className="p-4 bg-[#F8F5FF] rounded-xl space-y-3"
                  >
                    <div className="rounded-lg overflow-hidden border bg-white">
                      {fileType === "image" && (
                        <Image
                          src={url}
                          alt={name}
                          width={300}
                          height={400}
                          className="w-full max-h-60 object-contain"
                        />
                      )}

                      {fileType === "pdf" && (
                        <iframe
                          src={url}
                          title={name}
                          className="w-full h-64"
                        />
                      )}

                      {fileType === "word" && (
                        <iframe
                          src={`https://docs.google.com/gview?url=${encodeURIComponent(
                            optimizedUrl
                          )}&embedded=true`}
                          title={name}
                          className="w-full h-64"
                        />
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                <p className="text-sm text-gray-500">
                  No certifications listed
                </p>
              </div>
            )}
          </div>
        </div>
      </div>


      {isUpdateAlbumModalOpen && (
        <UpdateGalleryModal
          isOpen={isUpdateAlbumModalOpen}
          onClose={() => setIsUpdateAlbumModalOpen(false)}
          album={singleAlbum}
          setUpdateAlbum={setUpdateAlbum}
        />

      )}

      {isViewAlbumModalOpen && (
        <ViewAlbumModal
          isOpen={isViewAlbumModalOpen}
          onClose={() => {
            setIsViewAlbumModalOpen(false);
            setSelectedAlbum(null);
          }}
          album={selectedAlbum}
        />
      )}


    </div>
  );
};

export default BusinessAboutTab;

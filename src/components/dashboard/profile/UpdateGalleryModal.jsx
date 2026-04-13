"use client";
import React from "react";
import {
     FiX,
     FiArrowRight,
     FiLoader,
} from "react-icons/fi";
import { useForm } from "react-hook-form";
import { updateAlbums } from "@/validations/albums";
import { yupResolver } from "@hookform/resolvers/yup";
import businessProfileAPI from "@/services/businessProfileAPI";
import { toast } from "react-toastify";

const UpdateGalleryModal = ({ onClose, album, setUpdateAlbum }) => {
     const {
          register,
          handleSubmit,
          getValues,
          formState: { errors, isValid, isSubmitting },
     } = useForm({
          resolver: yupResolver(updateAlbums),
          mode: "onChange",
          defaultValues: {
               albumName: album?.albumName || "",
               description: album?.description || ""
          }
     });

     const updateAlbum = async () => {
          try {
               const response = await businessProfileAPI.updateBusinessProfileAlbum(album._id, {
                    albumName: getValues("albumName"),
                    description: getValues("description")
               });
               if (response.success) {
                    toast.success("Album updated successfully!");
               }
               setUpdateAlbum(true)
               onClose();
          } catch (error) {
               console.error("Error updating album:", error);
          }
     }

     return (
          <form onSubmit={handleSubmit(updateAlbum)}>
               <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] flex flex-col">
                         {/* Header */}
                         <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
                              <h2 className="text-lg font-bold text-gray-900">
                                   Update Album
                              </h2>
                              <div onClick={onClose}>
                                   <FiX className="w-5 h-5 text-[#240457] cursor-pointer hover:text-gray-700 transition-colors" />
                              </div>
                         </div>

                         <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Album Name <span className="text-red-500">*</span>
                                   </label>
                                   <input
                                        type="text"
                                        {...register("albumName")}
                                        placeholder="e.g Factory Tour 2024"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#240457]/20 focus:border-[#240457]"
                                   />
                                   {errors.albumName && (
                                        <p className="text-red-500 text-sm mt-1">
                                             {errors.albumName.message}
                                        </p>
                                   )}
                              </div>

                              <div>
                                   <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Description
                                        <span className="text-gray-400 font-normal">(Optional)</span>
                                   </label>
                                   <textarea
                                        {...register("description")}
                                        placeholder="Tell us about this collection of images..."
                                        rows={3}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#240457]/20 focus:border-[#240457] resize-none"
                                   />
                                   {errors.description && (
                                        <p className="text-red-500 text-sm mt-1">
                                             {errors.description.message}
                                        </p>
                                   )}
                              </div>
                         </div>

                         <div className="p-6 pt-0 shrink-0">
                              <button
                                   type="submit"
                                   disabled={!isValid || isSubmitting}
                                   className={`w-full py-3 bg-[#240457] text-white rounded-xl font-semibold hover:bg-[#3b0b85] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#240457]/20 active:scale-[0.99]"`}
                              >
                                   Update Album
                                   <FiArrowRight className="w-5 h-5" />
                              </button>
                         </div>
                    </div>
               </div>
          </form>
     )
};

export default UpdateGalleryModal;
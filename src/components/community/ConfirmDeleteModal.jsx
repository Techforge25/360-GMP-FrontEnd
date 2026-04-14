"use client";
import postsAPI from "@/services/postsAPI";
import React from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

const ConfirmDeleteModal = ({ post, onClose, loading }) => {
     const handleDelete = async () => {
          try {
               await postsAPI.deletePost(post?._id);
               toast.success("Post delete successfully!")
               onClose();
               // if (response?.success && onDelete) {
               //      onDelete(post._id);
               // }
          } catch (error) {
               console.error("Error deleting post:", error);
          }
     }
     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
               <div className="bg-white w-full max-w-md rounded-2xl shadow-xl animate-in fade-in zoom-in duration-200">
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b">
                         <div className="flex items-center gap-2">
                              <FiAlertTriangle className="text-yellow-500 w-5 h-5" />
                              <h2 className="text-lg font-semibold text-gray-900">
                                   Confirm Delete
                              </h2>
                         </div>
                         <button onClick={onClose}>
                              <FiX className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                         </button>
                    </div>

                    {/* Body */}
                    <div className="p-5 text-sm text-gray-600">
                         Are you sure you want to delete this post?
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 p-5 pt-0">
                         <button
                              onClick={onClose}
                              className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-100"
                         >
                              Cancel
                         </button>

                         <button
                              onClick={handleDelete}
                              disabled={loading}
                              className="px-4 py-2 text-sm rounded-lg bg-[#5C24D2] text-white hover:bg-[#4a1db0] disabled:opacity-60"
                         >
                              {loading ? "Deleting..." : "Yes, delete it!"}
                         </button>
                    </div>
               </div>
          </div>
     );
};

export default ConfirmDeleteModal;
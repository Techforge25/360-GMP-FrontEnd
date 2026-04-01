import { FiUpload, FiTrash2, FiLoader, FiFileText } from "react-icons/fi";

export const UploadField = ({
     label,
     value,
     onUpload,
     onRemove,
     loading,
     isImage = true,
}) => {
     const isPDF = value && value.toLowerCase().endsWith(".pdf");
     return (
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
               <p className="text-sm font-semibold text-gray-700 mb-3">
                    {label}
               </p>

               {!value ? (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-gray-400 transition">

                         {loading ? (
                              <FiLoader className="animate-spin text-2xl text-gray-400 mb-2" />
                         ) : (
                              <FiUpload className="text-2xl text-gray-400 mb-2" />
                         )}

                         <p className="text-sm text-gray-500">
                              {loading ? "Uploading..." : "Click to upload"}
                         </p>

                         <input
                              type="file"
                              className="hidden"
                              accept={isImage ? "image/*" : "application/pdf"}
                              onChange={(e) => {
                                   const file = e.target.files[0];
                                   if (file) onUpload(file);
                              }}
                         />
                    </label>
               ) : (
                    <div className="flex flex-col gap-3 bg-gray-50 rounded-xl p-3">

                         {/* Preview Section */}
                         <div className="flex items-center gap-3">
                              {isImage ? (
                                   <img
                                        src={value}
                                        className="w-12 h-12 rounded-lg object-cover"
                                   />
                              ) : isPDF ? (
                                   <FiFileText className="text-xl text-gray-500" />
                              ) : null}

                              <p className="text-sm text-gray-700 truncate">Uploaded</p>
                         </div>

                         {/* PDF Viewer */}
                         {!isImage && isPDF && (
                              <iframe
                                   src={value}
                                   className="w-full h-64 rounded-lg border"
                                   title="PDF Preview"
                              />
                         )}

                         {/* Remove Button */}
                         <button
                              type="button"
                              onClick={onRemove}
                              className="self-end text-red-500 hover:text-red-600"
                         >
                              <FiTrash2 />
                         </button>
                    </div>
               )}
          </div>
     );
};
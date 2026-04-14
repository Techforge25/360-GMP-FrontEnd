"use client";
import { useRef, useEffect } from "react";
import { FiMoreVertical } from "react-icons/fi";

export default function JobDropdown({
     isOpen,
     onEdit,
     onView,
     onDelete,
}) {
     const ref = useRef();
     return (
          <div className="relative" ref={ref}>
               {/* Dropdown */}
               {isOpen && (
                    <div className="absolute right-0 top-0 mt-2 w-48 bg-white border rounded-xl shadow-lg z-50">
                         <button
                              onClick={onEdit}
                              className="w-full text-left px-4 py-3 text-sm hover:bg-gray-100"
                         >
                              Edit Job
                         </button>

                         <button
                              onClick={onView}
                              className="w-full text-left px-4 py-3 text-sm border-t hover:bg-gray-100"
                         >
                              View Job Detail
                         </button>

                         <button
                              onClick={onDelete}
                              className="w-full text-left px-4 py-3 text-sm border-t text-red-600 hover:bg-red-50"
                         >
                              Delete Job
                         </button>

                    </div>
               )}

          </div>
     );
}
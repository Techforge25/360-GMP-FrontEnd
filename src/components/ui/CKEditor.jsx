"use client";

import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CKEditorField({
     value,
     onChange,
     onLengthChange,
     maxLength = 5000,
     placeholder,
}) {
     return (
          <div className="ck-editor-wrapper">
               <CKEditor
                    editor={ClassicEditor}
                    data={value || ""}
                    config={{
                         placeholder: placeholder,
                    }}
                    onChange={(event, editor) => {
                         const data = editor.getData();
                         const textLength = data.replace(/<[^>]*>/g, "").length;

                         if (textLength <= maxLength) {
                              onChange?.(data);
                              onLengthChange?.(textLength);
                         }
                    }}
               />

               {/* Custom Styling */}
               <style jsx global>{`
        /* Text color */
        .ck-editor__editable {
          color: black !important;
          min-height: 250px; /* Increase height */
        }

        /* Placeholder color */
        .ck-placeholder {
          color: #9ca3af !important; /* Tailwind gray-400 */
        }

        /* Toolbar border radius (optional nice UI) */
        .ck-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }

        .ck-editor__editable_inline {
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
        }
      `}</style>
          </div>
     );
}
"use client";

import dynamic from "next/dynamic";
import { useRef, useMemo, useState, useEffect } from "react";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

export default function JoditEditorClient({
  value,
  onChange,
  placeholder,
  className,
}) {
  const editor = useRef(null);
  // Use internal state to prevent cursor reset on every keystroke
  const [internalValue, setInternalValue] = useState(value || "");
  const debounceTimer = useRef(null);

  // Sync internal value when prop changes from outside
  useEffect(() => {
    if (value !== internalValue) {
      setInternalValue(value || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Memoize config to prevent re-creation on every render
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Type something...",
      minHeight: 200,
      maxHeight: 400,
      toolbarButtonSize: "small",
      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "link",
        "|",
        "undo",
        "redo",
      ],
      showCharsCounter: false,
      showWordsCounter: false,
      showXPathInStatusbar: false,
    }),
    [placeholder],
  );

  const handleChange = (newContent) => {
    // Update internal state immediately for smooth typing
    setInternalValue(newContent);

    // Debounce parent update for character count (300ms)
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      onChange?.(newContent);
    }, 300);
  };

  return (
    <div className={className}>
      <JoditEditor
        ref={editor}
        value={internalValue}
        config={config}
        onBlur={(newContent) => {
          // Clear debounce timer and update immediately on blur
          if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
          }
          onChange?.(newContent);
        }}
        onChange={handleChange}
      />
    </div>
  );
}

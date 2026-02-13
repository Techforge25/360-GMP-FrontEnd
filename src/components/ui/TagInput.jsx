"use client";
import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { cn } from "@/lib/utils";

export const TagInput = ({
  tags = [],
  onChange,
  placeholder = "Add a tag...",
  maxTags = 5,
  className,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  const addTag = () => {
    const tag = inputValue.trim();
    if (tag && tags.length < maxTags && !tags.includes(tag)) {
      onChange([...tags, tag]);
      setInputValue("");
    }
  };

  const removeTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    onChange(newTags);
  };

  return (
    <div
      className={cn(
        "flex flex-wrap min-h-11 w-full gap-2 rounded-md border border-border-light bg-surface px-3 py-2 text-base ring-offset-surface focus-within:ring-2 focus-within:ring-brand-primary focus-within:ring-offset-2",
        className,
      )}
    >
      {tags.map((tag, index) => (
        <span
          key={`${tag}-${index}`}
          className="flex items-center gap-1.5 px-2 py-1 bg-brand-primary/10 text-brand-primary rounded-md text-sm font-medium border border-brand-primary/20"
        >
          {tag}
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="hover:text-brand-primary/70 transition-colors"
          >
            <FiX className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={addTag}
        disabled={tags.length >= maxTags}
        placeholder={
          tags.length < maxTags ? placeholder : `Max ${maxTags} reached`
        }
        className="flex-1 bg-transparent border-none outline-none placeholder:text-text-hint min-w-[120px] disabled:cursor-not-allowed"
      />
    </div>
  );
};

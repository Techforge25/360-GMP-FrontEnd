"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Renders Slate JSON content or plain text.
 */
export default function SlateRenderer({ content, className }) {
  if (!content) return null;

  let nodes;
  try {
    // Check if it looks like Slate JSON
    if (
      typeof content === "string" &&
      content.trim().startsWith("[") &&
      content.trim().endsWith("]")
    ) {
      nodes = JSON.parse(content);
    } else if (Array.isArray(content)) {
      nodes = content;
    } else {
      // Fallback for plain text
      return <p className={cn("whitespace-pre-wrap", className)}>{content}</p>;
    }
  } catch (e) {
    // If parsing fails, treat as plain text
    return <p className={cn("whitespace-pre-wrap", className)}>{content}</p>;
  }

  // If it parsed but is not an array, fallback
  if (!Array.isArray(nodes)) {
    return (
      <p className={cn("whitespace-pre-wrap", className)}>{String(content)}</p>
    );
  }

  return (
    <div className={cn("space-y-1", className)}>
      {nodes.map((node, i) => (
        <div key={i}>
          {node.type === "paragraph" ? (
            <p className="min-h-[1.2em]">
              {node.children.map((child, j) => (
                <span
                  key={j}
                  style={{
                    fontWeight: child.bold ? "bold" : "normal",
                    fontStyle: child.italic ? "italic" : "normal",
                    textDecoration: child.underline ? "underline" : "none",
                  }}
                >
                  {child.text}
                </span>
              ))}
            </p>
          ) : (
            // Basic fallback for other potential block types
            <p className="min-h-[1.2em]">
              {node.children?.map((child, j) => (
                <span
                  key={j}
                  style={{
                    fontWeight: child.bold ? "bold" : "normal",
                    fontStyle: child.italic ? "italic" : "normal",
                    textDecoration: child.underline ? "underline" : "none",
                  }}
                >
                  {child.text}
                </span>
              )) || ""}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

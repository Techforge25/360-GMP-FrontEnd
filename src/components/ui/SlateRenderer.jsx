"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders Slate JSON content or plain text with optional truncation.
 */
export default function SlateRenderer({ content, className, maxLength }) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  // Calculate total text length
  const getTotalTextLength = (nodes) => {
    let totalLength = 0;
    nodes.forEach((node) => {
      if (node.children) {
        node.children.forEach((child) => {
          totalLength += (child.text || "").length;
        });
      }
    });
    return totalLength;
  };

  // Truncate nodes to maxLength characters
  const truncateNodes = (nodes, maxLength) => {
    let currentLength = 0;
    const truncatedNodes = [];

    for (const node of nodes) {
      if (currentLength >= maxLength) break;

      const truncatedNode = { ...node, children: [] };

      if (node.children) {
        for (const child of node.children) {
          const textLength = (child.text || "").length;

          if (currentLength + textLength <= maxLength) {
            truncatedNode.children.push(child);
            currentLength += textLength;
          } else {
            const remainingChars = maxLength - currentLength;
            if (remainingChars > 0) {
              truncatedNode.children.push({
                ...child,
                text: child.text.substring(0, remainingChars) + "...",
              });
            }
            currentLength = maxLength;
            break;
          }
        }
      }

      if (truncatedNode.children.length > 0) {
        truncatedNodes.push(truncatedNode);
      }
    }

    return truncatedNodes;
  };

  const totalLength = getTotalTextLength(nodes);
  const shouldTruncate = maxLength && totalLength > maxLength;
  const displayNodes =
    shouldTruncate && !isExpanded ? truncateNodes(nodes, maxLength) : nodes;

  return (
    <div>
      <div className={cn("space-y-1", className)}>
        {displayNodes.map((node, i) => (
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

      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-brand-primary hover:text-brand-primary/80 font-medium text-sm mt-2 transition-colors"
        >
          {isExpanded ? "See less" : "See more..."}
        </button>
      )}
    </div>
  );
}

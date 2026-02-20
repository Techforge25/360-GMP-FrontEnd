"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Renders Slate JSON content or plain text with optional truncation.
 */
export default function SlateRenderer({ content, className, maxLength }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!content) return null;

  let isSlateJson = false;
  let nodes = null;
  let plainText = "";

  try {
    // Check if it looks like Slate JSON
    if (
      typeof content === "string" &&
      content.trim().startsWith("[") &&
      content.trim().endsWith("]")
    ) {
      nodes = JSON.parse(content);
      if (Array.isArray(nodes)) {
        isSlateJson = true;
      }
    } else if (Array.isArray(content)) {
      nodes = content;
      isSlateJson = true;
    }
  } catch (e) {
    isSlateJson = false;
  }

  // Calculate total length and extract plain text if needed
  const extractPlainText = (nodeArray) => {
    let text = "";
    nodeArray.forEach((node) => {
      if (node.children) {
        node.children.forEach((child) => {
          text += child.text || "";
        });
      }
    });
    return text;
  };

  if (isSlateJson) {
    plainText = extractPlainText(nodes);
  } else {
    // Strip HTML tags and decode common entities if the content is raw HTML
    const strippedHtml = String(content)
      .replace(/<[^>]*>?/gm, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, "\"")
      .replace(/&#39;/g, "'");

    plainText = strippedHtml;
  }

  const totalLength = plainText.length;
  const shouldTruncate = maxLength && totalLength > maxLength;
  const isCurrentlyTruncated = shouldTruncate && !isExpanded;

  // Helper to truncate Slate nodes array
  const truncateNodes = (nodes, max) => {
    let currentLength = 0;
    const truncatedNodes = [];

    for (const node of nodes) {
      if (currentLength >= max) break;
      const truncatedNode = { ...node, children: [] };
      if (node.children) {
        for (const child of node.children) {
          const textLength = (child.text || "").length;
          if (currentLength + textLength <= max) {
            truncatedNode.children.push(child);
            currentLength += textLength;
          } else {
            const remainingChars = max - currentLength;
            if (remainingChars > 0) {
              truncatedNode.children.push({
                ...child,
                text: child.text.substring(0, remainingChars) + "...",
              });
            }
            currentLength = max;
            break;
          }
        }
      }
      if (truncatedNode.children.length > 0) truncatedNodes.push(truncatedNode);
    }
    return truncatedNodes;
  };

  return (
    <div>
      <div className={cn("space-y-1", className)}>
        {isSlateJson ? (
          (isCurrentlyTruncated ? truncateNodes(nodes, maxLength) : nodes).map(
            (node, i) => (
              <div key={i}>
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
              </div>
            ),
          )
        ) : (
          <p className="whitespace-pre-wrap">
            {isCurrentlyTruncated
              ? plainText.substring(0, maxLength) + "..."
              : plainText}
          </p>
        )}
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

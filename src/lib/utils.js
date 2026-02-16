import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getSlateText(content) {
  if (!content) return "";
  try {
    let nodes;
    if (typeof content === "string" && content.trim().startsWith("[")) {
      nodes = JSON.parse(content);
    } else if (Array.isArray(content)) {
      nodes = content;
    } else {
      return content;
    }

    return nodes
      .map((node) => node.children?.map((child) => child.text).join(""))
      .join(" ");
  } catch (e) {
    return content;
  }
}

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

export function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => reject("Failed to load image");
      img.src = e.target.result;
    };
    reader.onerror = () => reject("Failed to read file");
    reader.readAsDataURL(file);
  });
}

"use client";

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { createEditor, Editor, Transforms, Text, Node } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { FiBold, FiItalic, FiUnderline, FiList, FiHash } from "react-icons/fi";
import { cn } from "@/lib/utils";

const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });
    return !!match;
  },

  isBlockActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === format,
    });
    return !!match;
  },

  toggleBlock(editor, format) {
    const isActive = CustomEditor.isBlockActive(editor, format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        n.type === "bulleted-list" || n.type === "numbered-list",
      split: true,
    });

    const newType = isActive ? "paragraph" : format;

    Transforms.setNodes(editor, { type: newType });

    if (!isActive && (format === "bulleted-list" || format === "numbered-list")) {
      Transforms.wrapNodes(editor, {
        type: format,
        children: [],
      });
    }
  },

  isItalicMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic === true,
      universal: true,
    });
    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },

  toggleItalicMark(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true },
    );
  },
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
      }}
    >
      {props.children}
    </span>
  );
};

const DefaultElement = (props) => {
  return <p {...props.attributes}>{props.children}</p>;
};

export default function SlateEditor({
  value,
  onChange,
  onLengthChange,
  placeholder = "Type something...",
  className,
  maxLength = 1000,
}) {
  const [editor] = useState(() => withHistory(withReact(createEditor())));

  // Initial value for Slate (must be an array of nodes)
  const initialValue = useMemo(() => {
    if (!value) {
      return [{ type: "paragraph", children: [{ text: "" }] }];
    }
    // Simple serialization: check if it's already a string or JSON string
    try {
      if (typeof value === "string") {
        if (value.startsWith("[") && value.endsWith("]")) {
          return JSON.parse(value);
        }
        return [{ type: "paragraph", children: [{ text: value }] }];
      }
      return value;
    } catch (e) {
      return [{ type: "paragraph", children: [{ text: String(value) }] }];
    }
  }, [value]);

  useEffect(() => {
    // Initial length check
    const text = initialValue.map((n) => Node.string(n)).join("\n");
    onLengthChange?.(text.length);
  }, [initialValue, onLengthChange]);

  const renderElement = useCallback((props) => {
    switch (props.element.type) {
      case "paragraph":
        return <DefaultElement {...props} />;
      case "bulleted-list":
        return <ul {...props.attributes} style={{ paddingLeft: "20px" }}>
          {props.children}
        </ul>;

      case "numbered-list":
        return <ol {...props.attributes} style={{ paddingLeft: "20px" }}>
          {props.children}
        </ol>;

      case "list-item":
        return <li {...props.attributes}>{props.children}</li>;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const handleKeyDown = (event) => {
    if (!event.ctrlKey) {
      return;
    }

    switch (event.key) {
      case "b": {
        event.preventDefault();
        CustomEditor.toggleBoldMark(editor);
        break;
      }
      case "i": {
        event.preventDefault();
        CustomEditor.toggleItalicMark(editor);
        break;
      }
      default:
        break;
    }
  };

  return (
    <div
      className={cn("border rounded-md bg-surface overflow-hidden", className)}
    >
      <div className="flex items-center gap-1 p-2 border-b bg-gray-50/50">
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
          }}
          className={cn(
            "p-2 rounded hover:bg-white hover:shadow-sm transition-all",
            CustomEditor.isBoldMarkActive(editor)
              ? "text-brand-primary bg-white shadow-sm"
              : "text-gray-500",
          )}
          title="Bold (Ctrl+B)"
        >
          <FiBold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleItalicMark(editor);
          }}
          className={cn(
            "p-2 rounded hover:bg-white hover:shadow-sm transition-all",
            CustomEditor.isItalicMarkActive(editor)
              ? "text-brand-primary bg-white shadow-sm"
              : "text-gray-500",
          )}
          title="Italic (Ctrl+I)"
        >
          <FiItalic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBlock(editor, "bulleted-list");
          }}
          className="p-2 rounded hover:bg-white hover:shadow-sm transition-all text-black"
          title="Bullet List"
        >
          <FiList className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(event) => {
            event.preventDefault();
            CustomEditor.toggleBlock(editor, "numbered-list");
          }}
          className="p-2 rounded hover:bg-white hover:shadow-sm transition-all text-gray-500"
          title="Numbered List"
        >
          <FiHash className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 min-h-[150px] max-h-[400px] overflow-y-auto">
        <Slate
          editor={editor}
          initialValue={initialValue}
          onChange={(val) => {
            // Check if length is exceeded
            const text = val.map((n) => Node.string(n)).join("\n");
            onLengthChange?.(text.length);
            if (text.length <= maxLength) {
              // Return internal representation as string if necessary,
              // but for Slate it's better to return the nodes
              // We'll serialize to plain text for the character count display
              onChange?.(JSON.stringify(val), text.length);
            }
          }}
        >
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className="focus:outline-none min-h-[150px] text-base"
          />
        </Slate>
      </div>
    </div>
  );
}

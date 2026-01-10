"use client";
import React from "react";
import Image from "next/image";
import { FiMoreHorizontal, FiMaximize2, FiX } from "react-icons/fi";
import { Card } from "@/components/ui/Card";

export const ChatWidget = () => {
  // This replicates the "Messaging" blob in the bottom right of the design
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 shadow-2xl border border-border-light bg-white rounded-lg p-0 overflow-hidden">
        <div className="flex items-center justify-between p-3 border-b border-border-light bg-surface">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src="https://ui-avatars.com/api/?name=Messaging&background=random"
                  alt="User"
                />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h4 className="text-sm font-bold text-text-primary">Messaging</h4>
              <p className="text-xs text-text-secondary">
                Global Manufacturing Co.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-text-secondary">
            <button className="hover:text-text-primary">
              <FiMoreHorizontal />
            </button>
            <button className="hover:text-text-primary">
              <FiChevronUp />
            </button>
            {/* Note: In design it looks like expand/collapse icons */}
            <button className="hover:text-text-primary">
              <FiMaximize2 className="rotate-90" size={12} />
            </button>
          </div>
        </div>
        {/* Minimized or content can go here, but design shows just the header-like blob usually until opened. 
            For now, I'll match the "Messaging" toast look from the first image which acts like a minimized chat head or status.
        */}
      </Card>
    </div>
  );
};

/* 
  Correction: The image shows a small toast-like widget, not a full open chat window. 
  "Messaging - Global Manufacturing Co... ^ [External]"
*/
import { FiChevronUp } from "react-icons/fi";

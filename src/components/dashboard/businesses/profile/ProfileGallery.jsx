"use client";
import React from "react";

export default function ProfileGallery() {
  // Placeholder images - using simple colors for placeholders if needed, or specific dummy images.
  const images = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="mb-12">
      <h2 className="text-center text-3xl font-semibold text-black mb-8">Gallery</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="h-64 bg-gray-200 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 bg-yellow-100/50 hover:bg-transparent transition-colors"></div>
                {/* Image 1: Factory interior yellow/green tone */}
          </div>
          <div className="h-64 bg-gray-300 rounded-lg overflow-hidden">
                {/* Image 2: Machine drill */}
          </div>
          <div className="h-64 bg-gray-400 rounded-lg overflow-hidden">
                {/* Image 3: Robotic arm orange */}
          </div>
          <div className="h-64 bg-gray-500 rounded-lg overflow-hidden">
                {/* Image 4: Assembly line blue tone */}
          </div>
          
           <div className="h-64 bg-gray-500 rounded-lg overflow-hidden">
                {/* Image 5: Drill close up */}
          </div>
           <div className="h-64 bg-gray-400 rounded-lg overflow-hidden">
                {/* Image 6: Factory orange arms multiple */}
          </div>
           <div className="h-64 bg-gray-300 rounded-lg overflow-hidden">
                {/* Image 7: Pipes industrial */}
          </div>
           <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                {/* Image 8: Worker manual labor */}
          </div>
      </div>
    </div>
  );
}

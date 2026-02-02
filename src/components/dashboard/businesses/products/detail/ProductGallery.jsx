"use client";
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function ProductGallery({ images }) {
  const [currentImage, setCurrentImage] = useState(0);

  const defaultImages = [
    "/assets/images/products/earbuds.png",
    "/assets/images/products/earbuds-2.png",
    "/assets/images/products/earbuds-3.png"
  ];
  
  const imgList = images && images.length > 0 ? images : defaultImages;

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? imgList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImage((prev) => (prev === imgList.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full">
      {/* Main Image */}
      <div className="relative bg-gray-100 rounded-xl overflow-hidden mb-4 h-[400px] flex items-center justify-center group">
        <span className="absolute top-4 right-4 bg-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full z-10">
            Hot Seller
        </span>
        
        <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 z-10"
        >
            <FaArrowLeft className="text-sm" />
        </button>
        
        <img 
            src={imgList[currentImage]} 
            alt="Product" 
            className="w-full h-full object-contain mix-blend-multiply p-8"
            onError={(e) => e.target.style.display = 'none'}
        />

        <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white w-8 h-8 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:text-gray-900 z-10"
        >
            <FaArrowRight className="text-sm" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-3 gap-4">
        {imgList.map((img, idx) => (
            <div 
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`cursor-pointer bg-gray-100 rounded-xl h-50 overflow-hidden p-2 flex items-center justify-center border-2 ${currentImage === idx ? 'border-indigo-900' : 'border-transparent'}`}
            >
                <img 
                    src={img} 
                    alt={`Thumbnail ${idx}`} 
                    className="w-full h-full object-contain mix-blend-multiply" 
                />
            </div>
        ))}
      </div>
    </div>
  );
}

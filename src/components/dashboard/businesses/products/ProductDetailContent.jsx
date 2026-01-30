"use client";
import React from "react";
import ProductGallery from "./detail/ProductGallery";
import ProductInfo from "./detail/ProductInfo";
import ProductSpecs from "./detail/ProductSpecs";
import RelatedProducts from "./detail/RelatedProducts";

export default function ProductDetailContent({ productId, businessId }) {
  return (
    <div className="bg-white min-h-screen pb-24">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 mb-6 font-medium">
                Business List <span className="mx-1">&gt;</span> Techvision Solutions <span className="mx-1">&gt;</span> Product List <span className="mx-1 font-bold text-gray-900">&gt; Product Detail</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 mb-16">
                 {/* Left Column: Gallery */}
                 <div className="w-full lg:w-1/2">
                    <ProductGallery />
                 </div>

                 {/* Right Column: Info */}
                 <div className="w-full lg:w-1/2">
                    <ProductInfo />
                 </div>
            </div>

            <ProductSpecs />
            
            <RelatedProducts businessId={businessId} />
       </div>
    </div>
  );
}

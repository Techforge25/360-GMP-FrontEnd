"use client";
import React from "react";
import Link from "next/link";
import { useUserRole } from "@/context/UserContext";

export default function ProductListCard({ product }) {
  const { role } = useUserRole();
  const basePath = role === "business" ? "/dashboard/business" : "/dashboard/user";
  // Assuming we are inside a business context, we might need the business ID. 
  // For now, let's use a placeholder or assume it's passed or available in context. 
  // Ideally, product object should contain businessId or we retrieve it from params if available.
  // Since this component is used in a list where the business ID is known (ProductListingContent), we can assume it's passed or we use a fallback.
  // BUT: The component doesn't currently receive businessId. 
  // Let's assume for this specific flow, we are in a known business context "mock-id".
  // Or simpler: Just append /products/[id] to the current URL if we can, but Link needs absolute or relative properly.
  // Safest: pass businessId prop or use a hardcoded fallback for the demo until wired up.
  
  // Let's modify the component to accept businessId or extract it from window location (not safe in SSR)
  // Better: Component usage should pass businessId.
  // I'll update usage in ProductListingContent.jsx and RelatedProducts.jsx next.
  
  const businessId = product.businessId || "mock-id"; 
  const productUrl = `${basePath}/businesses/${businessId}/products/${product.id}`;

  const {
      name,
      description,
      moq,
      price,
      image,
      isNew
  } = product;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow bg-opacity-50">
      <div className="h-48 bg-gray-100 relative p-4 flex items-center justify-center">
          {isNew && (
              <span className="absolute top-3 right-3 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                  New
              </span>
          )}
          
          <div className="w-full h-full relative">
               <img 
                 src={image} 
                 alt={name}
                 className="w-full h-full object-contain mix-blend-multiply"
                 onError={(e) => e.target.style.display = 'none'} 
               />
          </div>
      </div>

      <div className="p-4">
          <h3 className="font-bold text-gray-900 text-sm mb-2">{name}</h3>
          <p className="text-xs text-gray-500 mb-4 line-clamp-2 h-8 leading-4">
              {description}
          </p>

          <div className="flex justify-between items-center text-[10px] text-gray-500 mb-4 pb-4 border-b border-gray-100">
              <div className="flex flex-col">
                  <span className="mb-1">MOQ: {moq}</span>
              </div>
              <div className="flex flex-col text-right">
                   <span>{price}</span>
              </div>
          </div>

          <Link href={productUrl} className="block w-full text-center border border-indigo-900 text-indigo-900 py-2 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors uppercase">
              View Product
          </Link>
      </div>
    </div>
  );
}

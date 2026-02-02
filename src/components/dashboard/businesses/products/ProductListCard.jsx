"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useUserRole } from "@/context/UserContext";
import productAPI from "@/services/productAPI";

export default function ProductListCard({ product }) {
  const router = useRouter();
  const { user } = useUserRole();
  const role = user?.role;
  const basePath = role === "business" ? "/dashboard/business" : "/dashboard/user";
  
  const businessId = product.businessId || "mock-id"; 
  const productId = product.id || product._id;
  const productUrl = `${basePath}/businesses/${businessId}/products/${productId}`;

  const {
      name,
      description,
      moq,
      price,
      image,
      isNew
  } = product;

  const handleViewProduct = async (e) => {
    e.preventDefault();
    try {
      await productAPI.getById(productId);
      router.push(productUrl);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      router.push(productUrl);
    }
  };

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
          <p className="text-sm text-gray-500 mb-4 line-clamp-2 h-8 leading-4">
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

          <button 
            onClick={handleViewProduct}
            className="block w-full text-center border border-indigo-900 text-indigo-900 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors uppercase"
          >
              View Product
          </button>
      </div>
    </div>
  );
}

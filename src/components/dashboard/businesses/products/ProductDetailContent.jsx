"use client";
import React, { useState, useEffect } from "react";
import ProductGallery from "./detail/ProductGallery";
import ProductInfo from "./detail/ProductInfo";
import ProductSpecs from "./detail/ProductSpecs";
import RelatedProducts from "./detail/RelatedProducts";
import productAPI from "@/services/productAPI";

export default function ProductDetailContent({ productId, businessId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getById(productId);
        if (response.success) {
          setProduct(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen pb-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-white min-h-screen pb-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <p className="text-gray-500">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-24">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="text-xs text-gray-500 mb-6 font-medium">
                Business List <span className="mx-1">&gt;</span> {product.businessId?.name || 'Business'} <span className="mx-1">&gt;</span> Product List <span className="mx-1 font-bold text-gray-900">&gt; Product Detail</span>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 mb-16">
                 {/* Left Column: Gallery */}
                 <div className="w-full lg:w-1/2">
                    <ProductGallery images={product.image ? [product.image] : []} />
                 </div>

                 {/* Right Column: Info */}
                 <div className="w-full lg:w-1/2">
                    <ProductInfo product={product} />
                 </div>
            </div>

            <ProductSpecs product={product} />
            
            <RelatedProducts businessId={product.businessId?._id || businessId} currentProductId={productId} />
       </div>
    </div>
  );
}

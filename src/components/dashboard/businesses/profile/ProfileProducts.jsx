"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useUserRole } from "@/context/UserContext";
import productAPI from "@/services/productAPI";

export default function ProfileProducts({ products, businessId }) {
  const { role } = useUserRole();
  const basePath = role === "business" ? "/dashboard/business" : "/dashboard/user";
  const productsUrl = `${basePath}/businesses/${businessId || 'mock-id'}/products`;
  
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (businessId) {
      fetchFeaturedProducts();
    }
  }, [businessId]);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getFeatured(8);
      
      console.log("Featured Products API Response:", response);

      if (response.success && response.data) {
        const productsData = response.data.docs || response.data || [];
        // Filter products by businessId if available
        const filteredProducts = productsData.filter(
          (product) => product.businessProfileId === businessId || product.businessProfile === businessId
        );
        setFeaturedProducts(filteredProducts.length > 0 ? filteredProducts : productsData.slice(0, 8));
      }
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
    } finally {
      setLoading(false);
    }
  };

  const productList = featuredProducts.length > 0 ? featuredProducts : (products);

  if (loading) {
    return (
      <div className="mb-10">
        <h2 className="text-3xl font-medium text-black mb-6">Featured Products</h2>
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Loading products...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-10">
      <h2 className="text-3xl font-medium text-black mb-6">Featured Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {productList.map((product) => (
              <div key={product.id || product._id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                       {product.images && product.images.length > 0 ? (
                         <img 
                           src={product.images[0] || product.image} 
                           alt={product.name || product.title}
                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                           onError={(e) => {
                             e.target.onerror = null;
                             e.target.src = "/assets/images/products/placeholder.png";
                           }}
                         />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                           <span className="text-xs">Product Image</span>
                         </div>
                       )}
                  </div>
                  
                  <div className="p-4">
                      <h3 className="text-base font-semibold text-black mb-2 line-clamp-2">
                        {product.title || product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.detail || product.description}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-3">
                          <span className="text-base font-bold text-black">
                            ${product.pricePerUnit || product.minPrice || 0}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                      </div>
                      
                      {role === "business" ? (
                        <button className="w-full py-2 border border-[#240457] text-[#240457] rounded-lg text-base hover:bg-[#240457] hover:text-white transition-colors">
                          View Product
                        </button>
                      ) : (
                        <div className="grid grid-cols-2 gap-2">
                           <button className="py-2 border border-[#240457] text-[#240457] rounded-lg text-sm hover:bg-[#240457] hover:text-white transition-colors">
                               Add To Cart
                           </button>
                           <button className="py-2 border border-[#240457] text-[#fff] rounded-lg text-sm bg-[#240457] hover:bg-[#fff] hover:text-[#240457] transition-colors">
                               Chat Now
                           </button>
                        </div>
                      )}
                  </div>
              </div>
          ))}
      </div>

       <div className="mt-8 flex justify-center">
           <Link href={productsUrl} className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
               View All Product &rarr;
           </Link>
       </div>
    </div>
  );
}

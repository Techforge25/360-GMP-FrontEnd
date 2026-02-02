"use client";
import React, { useState, useEffect } from "react";
import ProductListCard from "../ProductListCard";
import productAPI from "@/services/productAPI";

export default function RelatedProducts({ businessId, currentProductId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!businessId) return;
      
      try {
        setLoading(true);
        const response = await productAPI.getAll({ limit: 4 });
        if (response.success) {
          const allProducts = response.data.docs || response.data || [];
          // Filter out the current product
          const filtered = allProducts.filter(p => p._id !== currentProductId).slice(0, 4);
          setProducts(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch related products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [businessId, currentProductId]);

  if (loading) {
    return (
      <div className="py-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-900"></div>
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="border-t border-gray-100 pt-10">
      <h2 className="text-2xl font-medium text-black mb-6">Related Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
                <ProductListCard 
                  key={p._id} 
                  product={{
                    ...p,
                    name: p.title,
                    description: p.detail,
                    moq: `${p.minOrderQty} pc`,
                    price: `USD $${p.pricePerUnit}`
                  }} 
                />
            ))}
      </div>
    </div>
  );
}

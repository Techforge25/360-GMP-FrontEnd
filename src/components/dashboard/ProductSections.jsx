"use client";
import React, { useState, useEffect } from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import productAPI from "@/services/productAPI";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductSections = () => {
  const [featured, setFeatured] = useState([]);
  const [topRanking, setTopRanking] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching products from API...");

      // Fetch all three categories in parallel
      const [featuredRes, topRankingRes, newProductsRes] = await Promise.all([
        productAPI.getFeatured(6),
        productAPI.getTopRanking(4),
        productAPI.getNewProducts(4),
      ]);

      console.log("Featured products response:", featuredRes);
      console.log("Top ranking products response:", topRankingRes);
      console.log("New products response:", newProductsRes);

      // Transform and set featured products
      if (featuredRes.success && featuredRes.data) {
        const transformedFeatured = Array.isArray(featuredRes.data)
          ? featuredRes.data.map(transformProduct)
          : [transformProduct(featuredRes.data)];
        setFeatured(transformedFeatured);
      }

      // Transform and set top ranking products
      if (topRankingRes.success && topRankingRes.data) {
        const transformedTopRanking = Array.isArray(topRankingRes.data)
          ? topRankingRes.data.map(transformProduct)
          : [transformProduct(topRankingRes.data)];
        setTopRanking(transformedTopRanking);
      }

      // Transform and set new products
      if (newProductsRes.success && newProductsRes.data) {
        const transformedNewProducts = Array.isArray(newProductsRes.data)
          ? newProductsRes.data.map(transformProduct)
          : [transformProduct(newProductsRes.data)];
        setNewProducts(transformedNewProducts);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const transformProduct = (product) => {
    return {
      id: product._id,
      name: product.title || "Unnamed Product",
      image: product.image || "/assets/images/Portrait_Placeholder.png",
      desc: product.detail?.substring(0, 50) || "No description",
      price: `$${product.pricePerUnit?.toFixed(2) || "0.00"}`,
      category: product.category || "General",
      tag: product.isFeatured
        ? "Featured"
        : product.status === "approved"
          ? "Approved"
          : "New",
      minOrder: product.minOrderQty || 1,
      stock: product.stockQty || 0,
      shipping: product.shippingMethod || "Standard",
      deliveryDays: product.estimatedDeliveryDays || "5-7 days",
    };
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-brand-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-sm text-gray-500 mt-4">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  // Don't show anything if all sections are empty
  if (
    featured.length === 0 &&
    topRanking.length === 0 &&
    newProducts.length === 0
  ) {
    return null;
  }

  return (
    <div className="space-y-16 py-12">
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm text-center">
              <strong>Error:</strong> {error}
            </p>
          </div>
        </div>
      )}

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar */}
            <div className="lg:w-80 flex-shrink-0 rounded-2xl p-6 flex flex-col justify-start">
              <div>
                <h2 className="text-2xl font-semibold text-black mb-3">
                  Feature Product
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Continue your search and access 140+ million product on 360GMP
                </p>
              </div>
              <Button className="bg-[#240457] hover:bg-[#1a0340] text-white rounded-xl px-6 py-3 font-medium flex items-center justify-center gap-2 w-fit">
                View All Product
                <FiArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Carousel Container */}
            <div className="flex-1 relative">
              {/* Navigation Arrows */}
              <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-[#240457] text-white flex items-center justify-center shadow-lg hover:bg-[#1a0340] transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-[#240457] text-white flex items-center justify-center shadow-lg hover:bg-[#1a0340] transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Products Grid/Carousel */}
              <div className="overflow-x-auto scrollbar-hide">
                <div className="flex gap-4 pb-2">
                  {featured.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex-shrink-0 w-[280px] sm:w-[300px] bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {/* Product Image */}
                      <div className="h-48 bg-gray-100 relative">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "/assets/images/Portrait_Placeholder.png";
                          }}
                        />
                        <button className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                          <img src="/assets/images/star.png" alt="" />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                          {prod.name}
                        </h3>
                        <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                          {prod.desc}
                        </p>

                        {/* MOQ and Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xs text-[#787878]">
                            <span className="block">
                              MOQ: {prod.minOrder || 300} pc
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs text-[#787878]">
                              USD {prod.price.replace("$", "")}
                            </span>
                          </div>
                        </div>

                        {/* View Product Button */}
                        <button className="w-full py-2 border border-[#240457] text-[#240457] rounded-xl font-medium hover:bg-[#240457] hover:text-white transition-colors text-sm">
                          View Product
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Split Section: Top Ranking & New Products */}
      {(topRanking.length > 0 || newProducts.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Ranking (Purple Gradient) */}
            {topRanking.length > 0 && (
              <div className="bg-[#9747FF] rounded-2xl p-6 text-white">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Top Ranking</h2>
                    <p className="text-white/80 text-xs">
                      Highest priced premium products
                    </p>
                  </div>
                  <span className="text-xs flex items-center gap-1 font-bold cursor-pointer hover:underline">
                    View More <ChevronRight />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {topRanking.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-3 text-gray-900 shadow-lg"
                    >
                      <div className="h-24 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                        {/* <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "/assets/images/Portrait_Placeholder.png";
                          }}
                        /> */}
                      </div>
                      <h3 className="font-bold text-sm truncate">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2 truncate">
                        {item.desc}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-indigo-900 text-sm">
                          {item.price}
                        </span>
                        <button className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-indigo-900 hover:text-white transition-colors">
                          <FiArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Product (Dark Overlay) */}
            {newProducts.length > 0 && (
              <div className="bg-[#3A373E] rounded-2xl p-6 text-white relative overflow-hidden">
                {/* Background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full blur-3xl -mr-10 -mt-10" />

                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div>
                    <h2 className="text-xl font-bold">New Product</h2>
                    <p className="text-[#D9D9D9] text-xs">
                      stay ahead with the latest offering
                    </p>
                  </div>
                  <span className="text-xs flex items-center gap-1 font-bold cursor-pointer hover:underline">
                    View More <ChevronRight />
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {newProducts.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-3 border border-gray-700 shadow-lg"
                    >
                      <div className="h-24 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                        {/* <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "/assets/images/Portrait_Placeholder.png";
                          }}
                        /> */}
                      </div>
                      <h3 className="font-bold text-sm truncate text-black">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2 truncate">
                        {item.desc}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-black text-sm">
                          {item.price}
                        </span>
                        <button className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black transition-colors">
                          <FiArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductSections;

"use client";
import React, { useState, useEffect } from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import productAPI from "@/services/productAPI";

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
      image: product.image || "/assets/images/product-placeholder.png",
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
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl font-bold text-indigo-950">
                Feature Product
              </h2>
              <p className="text-sm text-gray-500">
                Curated high-quality items for you.
              </p>
            </div>
            <Button
              variant="outline"
              className="text-indigo-900 border-indigo-200"
            >
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group"
              >
                <div className="h-48 bg-gray-100 relative">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/assets/images/product-placeholder.png";
                    }}
                  />
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
                    {prod.tag}
                  </span>
                  <button className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 hover:bg-white flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors">
                    <FiHeart />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1 truncate">
                    {prod.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                    {prod.desc}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-900">
                      {prod.price}
                    </span>
                    <Button
                      size="sm"
                      className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Split Section: Top Ranking & New Products */}
      {(topRanking.length > 0 || newProducts.length > 0) && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Ranking (Purple Gradient) */}
            {topRanking.length > 0 && (
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-6 text-white">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">Top Ranking</h2>
                    <p className="text-white/80 text-xs">
                      Highest priced premium products
                    </p>
                  </div>
                  <span className="text-xs font-bold cursor-pointer hover:underline">
                    See All &gt;
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {topRanking.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl p-3 text-gray-900 shadow-lg"
                    >
                      <div className="h-24 bg-gray-100 rounded-lg mb-3 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "/assets/images/product-placeholder.png";
                          }}
                        />
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
              <div className="bg-gray-900 rounded-2xl p-6 text-white relative overflow-hidden">
                {/* Background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-full blur-3xl -mr-10 -mt-10" />

                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div>
                    <h2 className="text-xl font-bold">New Product</h2>
                    <p className="text-gray-400 text-xs">
                      Just arrived in the marketplace
                    </p>
                  </div>
                  <span className="text-xs font-bold cursor-pointer hover:underline">
                    See All &gt;
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {newProducts.map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-800 rounded-xl p-3 border border-gray-700 shadow-lg"
                    >
                      <div className="h-24 bg-gray-700 rounded-lg mb-3 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "/assets/images/product-placeholder.png";
                          }}
                        />
                      </div>
                      <h3 className="font-bold text-sm truncate text-gray-200">
                        {item.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2 truncate">
                        {item.desc}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-white text-sm">
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

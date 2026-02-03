"use client";
import React, { useState, useEffect } from "react";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import productAPI from "@/services/productAPI";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

const ProductSections = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [featured, setFeatured] = useState([]);
  const [topRanking, setTopRanking] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const carouselRef = React.useRef(null);
  const topRankingRef = React.useRef(null);
  const newProductsRef = React.useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollTopRankingLeft = () => {
    if (topRankingRef.current) {
      topRankingRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollTopRankingRight = () => {
    if (topRankingRef.current) {
      topRankingRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const scrollNewLeft = () => {
    if (newProductsRef.current) {
      newProductsRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollNewRight = () => {
    if (newProductsRef.current) {
      newProductsRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  const handleViewAllProducts = () => {
    if (pathname.includes('/dashboard/business')) {
      router.push('/dashboard/business/marketplace');
    } else if (pathname.includes('/dashboard/user')) {
      router.push('/dashboard/user/marketplace');
    }
  };

  const handleViewProduct = (productId) => {
    if (pathname.includes('/dashboard/business')) {
      router.push(`/dashboard/business/products/${productId}`);
    } else if (pathname.includes('/dashboard/user')) {
      router.push(`/dashboard/user/products/${productId}`);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      // const newProductsRef = React.useRef(null);

      // const scrollNewLeft = () => {
      //   if (newProductsRef.current) {
      //     newProductsRef.current.scrollBy({ left: -320, behavior: "smooth" });
      //   }
      // };

      // const scrollNewRight = () => {
      //   if (newProductsRef.current) {
      //     newProductsRef.current.scrollBy({ left: 320, behavior: "smooth" });
      //   }
      // };

      console.log("Fetching products from API...");

      // Fetch all three categories in parallel - remove limits to get more products
      const [featuredRes, topRankingRes, newProductsRes] = await Promise.all([
        productAPI.getFeatured(10),
        productAPI.getTopRanking(8),
        productAPI.getNewProducts(8),
      ]);

      console.log("Featured products response:", featuredRes);
      console.log("Top ranking products response:", topRankingRes);
      console.log("New products response:", newProductsRes);

      // Transform and set featured products
      // Featured endpoint returns paginated response with docs array
      if (
        featuredRes.success &&
        featuredRes.data?.docs &&
        featuredRes.data.docs.length > 0
      ) {
        const transformedFeatured = featuredRes.data.docs.map(transformProduct);
        setFeatured(transformedFeatured);
      } else {
        setFeatured([]);
      }

      // Transform and set top ranking products
      // Top-ranking endpoint returns direct array
      if (
        topRankingRes.success &&
        Array.isArray(topRankingRes.data) &&
        topRankingRes.data.length > 0
      ) {
        const transformedTopRanking = topRankingRes.data.map(transformProduct);
        setTopRanking(transformedTopRanking);
      } else {
        setTopRanking([]);
      }

      // Transform and set new products
      // New products endpoint returns direct array
      if (
        newProductsRes.success &&
        Array.isArray(newProductsRes.data) &&
        newProductsRes.data.length > 0
      ) {
        const transformedNewProducts = newProductsRes.data.map(transformProduct);
        setNewProducts(transformedNewProducts);
      } else {
        setNewProducts([]);
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err.message || "Failed to load products");
      // Set empty arrays on error
      setFeatured([]);
      setTopRanking([]);
      setNewProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const transformProduct = (product) => {
    return {
      id: product._id || product.productId,
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
      minOrder: product.minOrderQty || product.moq || 1,
      stock: product.stockQty || 0,
      shipping: product.shippingMethod || "Standard",
      deliveryDays: product.estimatedDeliveryDays || "5-7 days",
    };
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin h-8 w-8 border-2 border-brand-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-base text-gray-500 mt-4">Loading products...</p>
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
    <div className="space-y-16 py-12 relative overflow-hidden">
      {error && (
        <div className="max-w-[1400px] relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-base text-center">
              <strong>Error:</strong> {error}
            </p>
          </div>
        </div>
      )}

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar */}
            <div className="lg:w-80 flex-shrink-0 rounded-2xl p-6 flex flex-col justify-start">
              <div>
                <h2 className="text-2xl font-semibold text-black mb-3">
                  Feature Product
                </h2>
                <p className="text-base text-gray-600 mb-6">
                  Continue your search and access 140+ million product on 360GMP
                </p>
              </div>
              <Button 
                onClick={handleViewAllProducts}
                className="bg-[#240457] hover:bg-[#1a0340] text-white rounded-xl px-6 py-3 font-medium flex items-center justify-center gap-2 w-fit"
              >
                View All Product
                <FiArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Carousel Container */}
            <div className="flex-1 relative">
              {/* Navigation Arrows - Only show when there are more than 3 products */}
              {featured.length > 3 && (
                <>
                  <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 rounded-full bg-[#240457] text-white flex items-center justify-center shadow-lg hover:bg-[#1a0340] transition-colors"
                  >
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
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 rounded-full bg-[#240457] text-white flex items-center justify-center shadow-lg hover:bg-[#1a0340] transition-colors"
                  >
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
                </>
              )}

              {/* Products Grid/Carousel */}
              <div 
                ref={carouselRef}
                className="overflow-x-auto scrollbar-hide scroll-smooth"
                style={{ 
                  width: featured.length <= 3 ? '100%' : '932px', // Show max 3 products (300px each + 16px gap)
                  maxWidth: '100%'
                }}
              >
                <div
                  className="flex gap-4 pb-2"
                  style={{ width: 'max-content' }}
                >
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
                        <p className="text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                          {prod.desc}
                        </p>

                        {/* MOQ and Price */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-[#787878]">
                            <span className="block">
                              MOQ: {prod.minOrder || 300} pc
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-[#787878]">
                              USD {prod.price.replace("$", "")}
                            </span>
                          </div>
                        </div>

                        {/* View Product Button */}
                        <button 
                          onClick={() => handleViewProduct(prod.id)}
                          className="w-full py-2 border border-[#240457] text-[#240457] rounded-xl font-medium hover:bg-[#240457] hover:text-white transition-colors text-base"
                        >
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
        <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Top Ranking (Purple Gradient) */}
            {topRanking.length > 0 && (
              <div className="bg-[#9747FF] rounded-2xl p-6 text-white relative group">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-semibold">Top Ranking</h2>
                    <p className="text-white/80 text-sm">
                      Highest priced premium products
                    </p>
                  </div>
                  <span className="text-sm flex items-center gap-1 font-bold cursor-pointer hover:underline">
                    View More <ChevronRight />
                  </span>
                </div>
                
                {/* Navigation Arrows */}
                {topRanking.length > 2 && (
                  <>
                    <button
                      onClick={scrollTopRankingLeft}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-20 w-8 h-8 rounded-full bg-[#240457] text-white flex items-center justify-center shadow-lg hover:bg-[#1a0340] transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={scrollTopRankingRight}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-8 h-8 rounded-full bg-[#240457] text-white flex items-center justify-center shadow-lg hover:bg-[#1a0340] transition-all opacity-0 group-hover:opacity-100"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </>
                )}
                
                <div 
                  ref={topRankingRef}
                  className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                >
                  {topRanking.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleViewProduct(item.id)}
                      className="min-w-[calc(50%-8px)] flex-shrink-0 bg-white rounded-xl p-3 text-gray-900 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    >
                      <div className="h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "/assets/images/Portrait_Placeholder.png";
                          }}
                        />
                      </div>
                      <h3 className="font-bold text-base truncate mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3 truncate">
                        {item.desc}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-600">
                        <span>MOQ: {item.minOrder || 100}</span>
                        <span className="text-sm text-gray-500">
                          USD {item.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Product (Dark Overlay) */}
            {newProducts.length > 0 && (
              <div className="bg-[#3A373E] rounded-2xl p-6 text-white relative overflow-hidden group">
                {/* Background element */}
                <div className="absolute  top-0 right-0 w-32 h-32 bg-gray-800 rounded-full blur-3xl -mr-10 -mt-10" />

                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div>
                    <h2 className="text-xl font-semibold">New Product</h2>
                    <p className="text-[#D9D9D9] text-sm">
                      stay ahead with the latest offering
                    </p>
                  </div>
                  <span className="text-sm flex items-center gap-1 font-bold cursor-pointer hover:underline">
                    View More <ChevronRight />
                  </span>
                </div>
                
                {/* Carousel Container */}
                <div className="relative">
                  {/* Navigation Arrows */}
                  {newProducts.length > 2 && (
                    <>
                      <button
                        onClick={scrollNewLeft}
                        className="absolute left-0 top-1/2 shadow-amber-50 -translate-y-1/2 -translate-x-3 z-20 w-8 h-8 rounded-full bg-[#240457] text-white flex items-center justify-center shadow-lg hover:bg-[#1a0340] transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={scrollNewRight}
                        className="absolute right-0 shadow-amber-50 top-1/2 -translate-y-1/2 translate-x-3 z-20 w-8 h-8 rounded-full bg-[#240457] text-white flex items-center justify-center shadow-lg hover:bg-[#1a0340] transition-all opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  <div
                    ref={newProductsRef}
                    className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                  >
                    {newProducts.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleViewProduct(item.id)}
                        className="min-w-[200px] w-[calc(50%-8px)] bg-white rounded-xl p-3 border border-gray-700 shadow-lg flex-shrink-0 cursor-pointer hover:shadow-xl transition-shadow"
                      >
                        <div className="h-32 bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.target.src =
                                "/assets/images/Portrait_Placeholder.png";
                            }}
                          />
                        </div>
                        <h3 className="font-bold text-base truncate text-black mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-3 truncate">
                          {item.desc}
                        </p>
                        <div className="flex justify-between items-center text-sm text-gray-600">
                          <span>MOQ: {item.minOrder || 100}</span>
                          <span className="text-sm text-gray-500">
                            USD {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
      {/* Decorative element */}
      <div className="absolute bottom-16 -right-4 w-16 h-16 border-[12px] border-[#9747FF] rounded-full opacity-100 pointer-events-none"></div>
    </div>
  );
};

export default ProductSections;

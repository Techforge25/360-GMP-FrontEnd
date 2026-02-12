"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  X,
  MapPin,
  Filter,
} from "lucide-react";
import productAPI from "@/services/productAPI";
import { useUserRole } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";

export default function MarketplaceContent() {
  const router = useRouter();
  const { user } = useUserRole();
  const { addToCart } = useCart();
  const isBusinessUser = user?.role === "business";
  const [expandedCategories, setExpandedCategories] = useState({
    product: true,
    country: false,
    ratings: false,
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const pathname = usePathname();

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({ ...prev, [category]: !prev[category] }));
  };

  const popularCategories = [
    "Manufacturing",
    "Healthcare",
    "Insustrial Machinery",
    "Apparel&Fashion",
    "Electronic",
    "Beauty&Personal Care",
  ];

  const productCategories = [
    { name: "Insustrial Machinery", count: 0 },
    { name: "Apparel & Fashion", count: 0 },
    { name: "Beauty And Personal Care", count: 0 },
    { name: "Electronic", count: 0 },
    { name: "Category A", count: 0 },
    { name: "Category B", count: 0 },
    { name: "Category C", count: 0 },
  ];

  const countries = [
    { name: "Pakistan", flag: "🇵🇰" },
    { name: "United States of America", flag: "🇺🇸" },
    { name: "Canada", flag: "🇨🇦" },
    { name: "Germany", flag: "🇩🇪" },
    { name: "China", flag: "🇨🇳" },
    { name: "Belgium", flag: "🇧🇪" },
    { name: "Spain", flag: "🇪🇸" },
    { name: "France", flag: "🇫🇷" },
    { name: "South Africa", flag: "🇿🇦" },
    { name: "United Arab Emirates", flag: "🇦🇪" },
    { name: "United Kingdom", flag: "🇬🇧" },
  ];

  // const ratings = [5, 4, 3.5, 3, 2.5, 2, 1.5, 1];
  const ratings = ["Coming soon in phase 5"];

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topRankingProducts, setTopRankingProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countrySearchQuery, setCountrySearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const productsParams = { limit: 20 };
        if (selectedCategories.length > 0) {
          productsParams.category = selectedCategories.join(",");
        }
        if (selectedCountry) {
          productsParams.country = selectedCountry.toLowerCase();
        }

        const [featuredRes, topRankingRes, newRes, flashRes, allRes] =
          await Promise.all([
            productAPI.getFeatured(6),
            productAPI.getTopRanking(3),
            productAPI.getNewProducts(3),
            productAPI.getFlashDeals(3),
            productAPI.getAll(productsParams),
          ]);

        if (featuredRes.success)
          setFeaturedProducts(featuredRes.data.docs || featuredRes.data || []);
        if (topRankingRes.success)
          setTopRankingProducts(topRankingRes.data || []);
        if (newRes.success) setNewProducts(newRes.data || []);
        if (flashRes.success) setFlashDeals(flashRes.data || []);

        let productsList = [];
        if (allRes.success) {
          productsList = allRes.data.docs || allRes.data || [];
          setAllProducts(productsList);
        }
        setFilteredProducts(productsList);
      } catch (error) {
        console.error("Failed to fetch marketplace data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategories, selectedCountry]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const params = { search: query };
      if (selectedCategories.length > 0) {
        params.category = selectedCategories.join(",");
      }
      if (selectedCountry) {
        params.country = selectedCountry.toLowerCase();
      }
      const response = await productAPI.getAll(params);
      if (response.success) {
        setFilteredProducts(response.data.docs || response.data || []);
      } else {
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Search failed", error);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryToggle = (categoryName) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(categoryName);
      if (isSelected) {
        return prev.filter((c) => c !== categoryName);
      } else {
        return [...prev, categoryName];
      }
    });
  };

  const handleViewTopRanking = () => {
    if (pathname.includes("/dashboard/business")) {
      router.push("/dashboard/business/products/top-ranking");
    } else if (pathname.includes("/dashboard/user")) {
      router.push("/dashboard/user/products/top-ranking");
    }
  };

  const handleViewNewProducts = () => {
    if (pathname.includes("/dashboard/business")) {
      router.push("/dashboard/business/products/new");
    } else if (pathname.includes("/dashboard/user")) {
      router.push("/dashboard/user/products/new");
    }
  };

  const handleCountrySelect = (countryName) => {
    setSelectedCountry((prev) => (prev === countryName ? "" : countryName));
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedCountry("");
    setCountrySearchQuery("");
    setQuery("");
  };

  const handleProductClick = async (product) => {
    const productId = product._id || product.id;
    const businessId =
      typeof product.businessId === "object"
        ? product.businessId?._id
        : product.businessId;

    if (!productId || !businessId) {
      console.error("Missing productId or businessId", { product });
      return;
    }

    // Pre-fetch product data if needed (optional optimization)
    // await productAPI.getById(productId);

    const basePath = isBusinessUser ? "/dashboard/business" : "/dashboard/user";
    router.push(`${basePath}/businesses/${businessId}/products/${productId}`);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-3 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="text-gray-900 text-sm sm:text-base lg:text-lg font-medium">
            Market Place
          </h1>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pb-16 sm:pb-20 lg:pb-24">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/assets/images/marketplace.png"
            alt="Marketplace Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 pb-6 sm:pb-8 pt-12 sm:pt-16">
          <div className="text-center">
            <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 sm:mb-4 lg:mb-6 px-2">
              Find Verified supplier Across the Globe
            </h1>
            <p className="text-purple-100 text-sm sm:text-base lg:text-lg xl:text-xl max-w-3xl mx-auto px-4 sm:px-6">
              Connect with top-rated verified suppliers. Low MOQ, Fast Shipping,
              and Trade Assurance.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section - Overlapping */}
      <div className="relative z-20 max-w-[1150px] mx-auto px-3 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 lg:-mt-24">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="relative w-full">
              <div className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search products, or supplier..."
                className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400 text-sm sm:text-base"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-brand-primary cursor-pointer hover:bg-brand-primary/90 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg sm:rounded-xl font-medium transition-colors duration-200 whitespace-nowrap w-full sm:w-auto text-sm sm:text-base"
            >
              Search
            </button>
          </div>

          <div className="flex flex-wrap items-start sm:items-center gap-2 sm:gap-3">
            <p className="text-gray-600 text-sm sm:text-base font-medium mb-1 sm:mb-0 w-full sm:w-auto">
              Popular:
            </p>
            <div className="flex flex-wrap gap-2">
              {popularCategories.map((category, index) => (
                <button
                  key={index}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-[#E5E7EB] text-gray-700 rounded-full text-sm sm:text-sm lg:text-base font-medium transition-colors duration-200 hover:bg-gray-300"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {loading ? (
          <div className="flex justify-center py-16 sm:py-20">
            <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-t-2 border-b-2 border-purple-900"></div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-3 mb-4 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-brand-primary" />
              <span className="font-medium text-gray-700">
                Filters
                {(selectedCategories.length > 0 || selectedCountry) &&
                  ` (${selectedCategories.length + (selectedCountry ? 1 : 0)})`}
              </span>
            </button>

            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden top-4">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Filter</h3>
                  {(selectedCategories.length > 0 || selectedCountry) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-brand-primary hover:underline font-medium"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Product Category */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleCategory("product")}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                      Product / Category
                    </span>
                    {expandedCategories.product ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedCategories.product && (
                    <div className="px-4 pb-4">
                      {productCategories.map((cat, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-2.5 py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded transition-colors"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                            checked={selectedCategories.includes(cat.name)}
                            onChange={() => handleCategoryToggle(cat.name)}
                          />
                          <span className="text-sm sm:text-base text-gray-700 flex-1">
                            {cat.name}
                          </span>
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                        </label>
                      ))}
                      <button className="text-purple-600 text-sm sm:text-base mt-2 hover:text-purple-700 transition-colors">
                        More
                      </button>
                    </div>
                  )}
                </div>

                {/* Country */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleCategory("country")}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                      Country
                    </span>
                    {expandedCategories.country ? (
                      <ChevronUp className="w-4 h-4 text-gray-900" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-900" />
                    )}
                  </button>
                  {expandedCategories.country && (
                    <div className="px-4 pb-4 bg-white">
                      {/* Country Search Bar */}
                      <div className="flex items-center gap-2 mb-4 p-1 border border-gray-200 rounded-lg shadow-sm">
                        <div className="flex-1 flex items-center pl-2">
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 mr-2" />
                          <input
                            type="text"
                            placeholder="Search Location"
                            className="w-full py-1.5 text-sm sm:text-base focus:outline-none placeholder:text-gray-400 text-gray-700"
                            value={countrySearchQuery}
                            onChange={(e) =>
                              setCountrySearchQuery(e.target.value)
                            }
                          />
                        </div>
                        <button className="bg-[#1D064F] hover:bg-[#2D0A75] text-white px-3 sm:px-4 py-1.5 rounded-md text-sm sm:text-sm font-semibold transition-colors">
                          Search
                        </button>
                      </div>

                      {/* Country List */}
                      <div className="space-y-1 max-h-64 overflow-y-auto custom-scrollbar pr-1">
                        {countries
                          .filter((c) =>
                            c.name
                              .toLowerCase()
                              .includes(countrySearchQuery.toLowerCase()),
                          )
                          .map((country, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleCountrySelect(country.name)}
                              className={`w-full flex items-center gap-2.5 sm:gap-3 py-2 px-3 rounded-md transition-all duration-200 group ${
                                selectedCountry === country.name
                                  ? "bg-gray-100"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <span className="text-lg sm:text-xl flex-shrink-0 grayscale-0 group-hover:grayscale-0 transition-all">
                                {country.flag}
                              </span>
                              <span
                                className={`text-sm sm:text-sm lg:text-base flex-1 text-left ${
                                  selectedCountry === country.name
                                    ? "text-gray-900 font-medium"
                                    : "text-gray-600 group-hover:text-gray-900"
                                }`}
                              >
                                {country.name}
                              </span>
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Ratings */}
                <div>
                  <button
                    onClick={() => toggleCategory("ratings")}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900 text-sm sm:text-base">
                      Ratings
                    </span>
                    {expandedCategories.ratings ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </button>
                  {expandedCategories.ratings && (
                    <div className="px-4 pb-4">
                      {ratings.map((rating, idx) => (
                        <label
                          key={idx}
                          className="flex items-center gap-2.5 py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded transition-colors"
                        >
                          <input
                            type="radio"
                            name="rating"
                            className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-sm sm:text-base text-gray-700">
                            {/* ★ {rating} */}
                            {rating}
                          </span>
                        </label>
                      ))}
                      {/* <label className="flex items-center gap-2.5 py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded transition-colors">
                        <input
                          type="radio"
                          name="rating"
                          className="w-4 h-4 text-purple-600 focus:ring-purple-500"
                        />
                        <span className="text-sm sm:text-base text-gray-700">
                          No rating
                        </span>
                      </label> */}
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Mobile Filter Modal */}
            {isMobileFilterOpen && (
              <>
                {/* Backdrop */}
                <div
                  className="lg:hidden fixed inset-0 bg-black/50 z-50"
                  onClick={() => setIsMobileFilterOpen(false)}
                />

                {/* Modal */}
                <div className="lg:hidden fixed inset-x-4 top-4 bottom-4 z-50 bg-white rounded-lg shadow-2xl overflow-y-auto">
                  {/* Modal Header */}
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
                    <h3 className="font-semibold text-gray-900 text-lg">
                      Filters
                    </h3>
                    <div className="flex items-center gap-3">
                      {(selectedCategories.length > 0 || selectedCountry) && (
                        <button
                          onClick={clearFilters}
                          className="text-sm text-brand-primary hover:underline font-medium"
                        >
                          Clear All
                        </button>
                      )}
                      <button
                        onClick={() => setIsMobileFilterOpen(false)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                  </div>

                  {/* Filter Content - Reuse same structure but with mobile spacing */}
                  <div className="p-4">
                    {/* Mobile version of filters with same content but better mobile spacing */}
                    <div className="space-y-6">
                      {/* Product Category - Mobile */}
                      <div className="border-b border-gray-200 pb-4">
                        <button
                          onClick={() => toggleCategory("product")}
                          className="w-full flex items-center justify-between py-3 hover:bg-gray-50 transition-colors rounded-lg px-2"
                        >
                          <span className="font-medium text-gray-900 text-base">
                            Product / Category
                          </span>
                          {expandedCategories.product ? (
                            <ChevronDown className="w-5 h-5" />
                          ) : (
                            <ChevronRight className="w-5 h-5" />
                          )}
                        </button>
                        {expandedCategories.product && (
                          <div className="mt-3 space-y-3">
                            {productCategories.map((cat, idx) => (
                              <label
                                key={idx}
                                className="flex items-center gap-3 py-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 transition-colors"
                              >
                                <input
                                  type="checkbox"
                                  className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                  checked={selectedCategories.includes(
                                    cat.name,
                                  )}
                                  onChange={() =>
                                    handleCategoryToggle(cat.name)
                                  }
                                />
                                <span className="text-base text-gray-700 flex-1">
                                  {cat.name}
                                </span>
                              </label>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Apply Button */}
                      <div className="pt-4 border-t border-gray-200">
                        <button
                          onClick={() => setIsMobileFilterOpen(false)}
                          className="w-full bg-brand-primary text-white font-medium py-3 rounded-lg hover:bg-brand-primary/90 transition-colors"
                        >
                          Apply Filters
                          {(selectedCategories.length > 0 || selectedCountry) &&
                            ` (${selectedCategories.length + (selectedCountry ? 1 : 0)})`}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {/* Featured Products */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold text-black mb-3 sm:mb-4">
                  Featured Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                  {featuredProducts.length > 0 ? (
                    featuredProducts.map((product, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative bg-gray-100 h-40 sm:h-48 cursor-pointer group">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onClick={() => handleProductClick(product)}
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center shadow bg-white">
                              <img
                                className="w-3 h-3 object-contain"
                                src="/assets/images/star.png"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div className="p-3 sm:p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-sm sm:text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.detail || product.description}
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-sm sm:text-sm text-gray-500">
                              Min: {product.minOrderQty} pc
                            </span>
                            <span className="text-sm sm:text-sm text-gray-600">
                              USD ${product.pricePerUnit}
                            </span>
                          </div>
                          {isBusinessUser ? (
                            <button
                              onClick={() => handleProductClick(product)}
                              className="w-full py-2.5 border border-[#240457] text-[#240457] rounded-lg text-sm sm:text-base hover:bg-[#240457] hover:text-white transition-colors"
                            >
                              View Product
                            </button>
                          ) : (
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                onClick={() => {
                                  addToCart(product, product.minOrderQty || 1);
                                  router.push("/dashboard/user/cart");
                                }}
                                className="py-2 border border-[#240457] text-[#240457] rounded-lg text-sm sm:text-sm hover:bg-[#240457] hover:text-white transition-colors"
                              >
                                Add To Cart
                              </button>
                              <button
                                onClick={() =>
                                  router.push(
                                    isBusinessUser
                                      ? "/dashboard/business/messages"
                                      : "/dashboard/user/messages",
                                  )
                                }
                                className="py-2 border border-[#240457] text-[#fff] rounded-lg text-sm sm:text-sm bg-[#240457] hover:bg-[#fff] hover:text-[#240457] transition-colors"
                              >
                                Chat Now
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm sm:text-base text-gray-500 col-span-full text-center py-8">
                      No featured products found
                    </div>
                  )}
                </div>
              </div>

              {/* Top Ranking */}
              <div className="mb-6 sm:mb-8 bg-[#9747FF] rounded-lg p-4 sm:p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
                  <h2 className="text-lg sm:text-xl font-bold">Top Ranking</h2>
                  <button
                    onClick={handleViewTopRanking}
                    className="text-sm sm:text-base hover:underline flex items-center gap-1 self-start sm:self-center"
                  >
                    View More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-purple-100 text-sm sm:text-base mb-4 sm:mb-6">
                  Discover highly-rated products
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {topRankingProducts.length > 0 ? (
                    topRankingProducts.map((product, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-100 h-28 sm:h-32 cursor-pointer group">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onClick={() => handleProductClick(product)}
                          />
                        </div>
                        <div className="p-3 sm:p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-sm sm:text-sm text-gray-600 line-clamp-2 mb-2">
                            {product.detail || product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm sm:text-sm text-gray-500">
                              Min: {product.moq} pc
                            </span>
                            <span className="text-sm sm:text-sm text-gray-600">
                              USD ${product.pricePerUnit}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm sm:text-base text-purple-100 col-span-full text-center py-8">
                      No top ranking products found
                    </div>
                  )}
                </div>
              </div>

              {/* New Product */}
              <div className="bg-gray-800 rounded-lg p-4 sm:p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 gap-3">
                  <div>
                    <h2 className="text-lg sm:text-xl font-bold mb-1">
                      New Product
                    </h2>
                    <p className="text-gray-400 text-sm sm:text-base">
                      Browse newly-listed products
                    </p>
                  </div>
                  <button
                    onClick={handleViewNewProducts}
                    className="text-sm sm:text-base hover:underline flex items-center gap-1 self-start sm:self-center"
                  >
                    View More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {newProducts.length > 0 ? (
                    newProducts.map((product, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-100 h-32 sm:h-40 cursor-pointer group">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            onClick={() => handleProductClick(product)}
                          />
                        </div>
                        <div className="p-3 sm:p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-sm sm:text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.detail || product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm sm:text-sm text-gray-500">
                              Min: {product.minOrderQty} pc
                            </span>
                            <span className="text-sm sm:text-sm text-gray-600">
                              USD ${product.pricePerUnit}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm sm:text-base text-gray-400 col-span-full text-center py-8">
                      No new products found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Deals Section */}
        <TopDealsSection
          deals={flashDeals}
          isBusinessUser={isBusinessUser}
          router={router}
          addToCart={addToCart}
          onProductClick={handleProductClick}
        />

        <section className="w-full bg-white py-8 sm:py-12 px-3 sm:px-6 lg:px-8">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden cursor-pointer group">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      onClick={() => handleProductClick(product)}
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm sm:text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.detail || product.description}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm sm:text-sm text-gray-500">
                        Min: {product.minOrderQty} pc
                      </span>
                      <span className="text-sm sm:text-sm text-gray-600">
                        USD ${product.pricePerUnit}
                      </span>
                    </div>
                    {isBusinessUser ? (
                      <button
                        onClick={() => handleProductClick(product)}
                        className="w-full py-2.5 border border-[#240457] text-[#240457] rounded-lg text-sm sm:text-sm lg:text-base hover:bg-[#240457] hover:text-white transition-colors"
                      >
                        View Product
                      </button>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => {
                            addToCart(product, product.minOrderQty || 1);
                            router.push("/dashboard/user/cart");
                          }}
                          className="py-2 border border-[#240457] text-[#240457] rounded-lg text-sm sm:text-sm hover:bg-[#240457] hover:text-white transition-colors"
                        >
                          Add To Cart
                        </button>
                        <button
                          onClick={() =>
                            router.push(
                              isBusinessUser
                                ? "/dashboard/business/messages"
                                : "/dashboard/user/messages",
                            )
                          }
                          className="py-2 border border-[#240457] text-[#fff] rounded-lg text-sm sm:text-sm bg-[#240457] hover:bg-[#fff] hover:text-[#240457] transition-colors"
                        >
                          Chat Now
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-12 sm:py-16 text-gray-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg font-medium mb-2">No products found</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </section>
        <div className="flex justify-center mt-6 sm:mt-8 px-3 sm:px-6 lg:px-8">
          <button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 sm:px-8 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto text-sm sm:text-base">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

function TopDealsSection({
  deals = [],
  isBusinessUser = false,
  router,
  addToCart,
  onProductClick,
}) {
  if (!deals || deals.length === 0) return null;

  return (
    <div className="py-8 lg:py-12 mt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Top Deals</h2>
          <p className="text-gray-600 text-base">
            All our season products on curated marketing
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((deal, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative bg-gray-100 h-48 flex items-center justify-center cursor-pointer group">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onClick={() => onProductClick(deal)}
                />
                {deal.extras && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-brand-primary text-white text-sm px-2 py-1 rounded">
                      {deal.extras}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-base line-clamp-1">
                  {deal.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {deal.detail || deal.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-purple-600 font-bold text-xl">
                    ${deal.pricePerUnit}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">
                    Min: {deal.minOrderQty}
                  </span>
                </div>

                {isBusinessUser ? (
                  <button
                    onClick={() => onProductClick(deal)}
                    className="w-full py-2 border border-[#240457] text-[#240457] rounded-lg text-base hover:bg-[#240457] hover:text-white transition-colors"
                  >
                    View Product
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        addToCart(deal, deal.minOrderQty || 1);
                        router.push("/dashboard/user/cart");
                      }}
                      className="py-2 border border-[#240457] text-[#240457] rounded-lg text-sm hover:bg-[#240457] hover:text-white transition-colors"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() =>
                        router.push(
                          isBusinessUser
                            ? "/dashboard/business/messages"
                            : "/dashboard/user/messages",
                        )
                      }
                      className="py-2 border border-[#240457] text-[#fff] rounded-lg text-sm bg-[#240457] hover:bg-[#fff] hover:text-[#240457] transition-colors"
                    >
                      Chat Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

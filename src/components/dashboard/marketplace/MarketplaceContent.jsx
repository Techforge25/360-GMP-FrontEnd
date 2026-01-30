"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  X,
  MapPin,
} from "lucide-react";
import productAPI from "@/services/productAPI";
import { useUserRole } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";

export default function MarketplaceContent() {
  const router = useRouter();
  const { role } = useUserRole();
  const { addToCart } = useCart();
  const isBusinessUser = role === "business";
  const [expandedCategories, setExpandedCategories] = useState({
    product: true,
    country: false,
    ratings: false,
  });

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

  const ratings = [5, 4, 3.5, 3, 2.5, 2, 1.5, 1];

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

  const handleCountrySelect = (countryName) => {
    setSelectedCountry((prev) => (prev === countryName ? "" : countryName));
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedCountry("");
    setCountrySearchQuery("");
    setQuery("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-gray-500 text-lg font-sm">Market Place</h1>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pb-24">
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4 sm:mb-6">
              Find Verified supplier Across the Globe
            </h1>
            <p className="text-purple-100 text-xl sm:text-lg max-w-3xl mx-auto px-4">
              Connect with top-rated verified suppliers. Low MOQ, Fast Shipping,
              and Trade Assurance.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section - Overlapping */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6">
            <div className="relative w-full max-w-lg">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="search products, or supplier..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-brand-primary cursor-pointer hover:bg-brand-primary/90 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200 whitespace-nowrap"
            >
              Search
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="flex flex-wrap gap-2">
              {popularCategories.map((category, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm sm:text-base font-medium transition-colors duration-200"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden top-4">
                <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Filter</h3>
                </div>

                {/* Product Category */}
                <div className="border-b border-gray-200">
                  <button
                    onClick={() => toggleCategory("product")}
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900 text-base">
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
                          className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded"
                        >
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 text-purple-600"
                            checked={selectedCategories.includes(cat.name)}
                            onChange={() => handleCategoryToggle(cat.name)}
                          />
                          <span className="text-base text-gray-700 flex-1">
                            {cat.name}
                          </span>
                          <ChevronRight className="w-3 h-3 text-gray-400" />
                        </label>
                      ))}
                      <button className="text-purple-600 text-base mt-2 hover:text-purple-700">
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
                    <span className="font-bold text-gray-900 text-base">
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
                          <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                          <input
                            type="text"
                            placeholder="Search Location"
                            className="w-full py-1.5 text-base focus:outline-none placeholder:text-gray-400 text-gray-700"
                            value={countrySearchQuery}
                            onChange={(e) =>
                              setCountrySearchQuery(e.target.value)
                            }
                          />
                        </div>
                        <button className="bg-[#1D064F] hover:bg-[#2D0A75] text-white px-4 py-1.5 rounded-md text-sm font-semibold transition-colors">
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
                              className={`w-full flex items-center gap-3 py-2 px-3 rounded-md transition-all duration-200 group ${
                                selectedCountry === country.name
                                  ? "bg-gray-100"
                                  : "hover:bg-gray-50"
                              }`}
                            >
                              <span className="text-xl flex-shrink-0 grayscale-0 group-hover:grayscale-0 transition-all">
                                {country.flag}
                              </span>
                              <span
                                className={`text-base flex-1 text-left ${
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
                    className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                  >
                    <span className="font-medium text-gray-900 text-base">
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
                          className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded"
                        >
                          <input
                            type="radio"
                            name="rating"
                            className="w-4 h-4 text-purple-600"
                          />
                          <span className="text-base text-gray-700">
                            ★ {rating}
                          </span>
                        </label>
                      ))}
                      <label className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded">
                        <input
                          type="radio"
                          name="rating"
                          className="w-4 h-4 text-purple-600"
                        />
                        <span className="text-base text-gray-700">
                          No rating
                        </span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Featured Products */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Featured Products
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredProducts.length > 0 ? (
                    featuredProducts.map((product, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="relative bg-gray-100 h-48">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 right-2 flex gap-1">
                            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50">
                              ♡
                            </button>
                            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50">
                              ⋯
                            </button>
                          </div>
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 text-base line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.detail || product.description}
                          </p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-purple-600 font-semibold text-base">
                              ${product.pricePerUnit}
                            </span>
                            <span className="text-sm text-gray-500">
                              Min: {product.minOrderQty}
                            </span>
                          </div>
                          {isBusinessUser ? (
                            <button 
                              onClick={async () => {
                                await productAPI.getById(product._id);
                                router.push(`/dashboard/business/businesses/${product.businessId}/products/${product._id}`);
                              }}
                              className="w-full py-2 border border-[#240457] text-[#240457] rounded-lg text-base hover:bg-[#240457] hover:text-white transition-colors"
                            >
                              View Product
                            </button>
                          ) : (
                            <div className="grid grid-cols-2 gap-2">
                              <button 
                                onClick={() => {
                                  addToCart(product, product.minOrderQty || 1);
                                  router.push('/dashboard/user/cart');
                                }}
                                className="py-2 border border-[#240457] text-[#240457] rounded-lg text-sm hover:bg-[#240457] hover:text-white transition-colors"
                              >
                                Add To Cart
                              </button>
                              <button className="py-2 border border-[#240457] text-[#fff] rounded-lg text-sm bg-[#240457] hover:bg-[#fff] hover:text-[#240457] transition-colors">
                                Chat Now
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-base text-gray-500">
                      No featured products found
                    </div>
                  )}
                </div>
              </div>

              {/* Top Ranking */}
              <div className="mb-8 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg p-6 text-white">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Top Ranking</h2>
                  <button className="text-base hover:underline flex items-center gap-1">
                    View More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-purple-100 text-base mb-6">
                  Discover highly-rated products
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {topRankingProducts.length > 0 ? (
                    topRankingProducts.map((product, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-100 h-32">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 text-base line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {product.detail || product.description}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-base text-purple-100 col-span-3">
                      No top ranking products found
                    </div>
                  )}
                </div>
              </div>

              {/* New Product */}
              <div className="bg-gray-800 rounded-lg p-6 text-white">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold mb-1">New Product</h2>
                    <p className="text-gray-400 text-base">
                      Browse newly-listed products
                    </p>
                  </div>
                  <button className="text-base hover:underline flex items-center gap-1">
                    View More <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {newProducts.length > 0 ? (
                    newProducts.map((product, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-lg overflow-hidden"
                      >
                        <div className="bg-gray-100 h-40">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-semibold text-gray-900 mb-2 text-base line-clamp-1">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {product.detail || product.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-purple-600 font-semibold text-base">
                              ${product.pricePerUnit}
                            </span>
                            <span className="text-sm text-gray-500">
                              Min: {product.minOrderQty}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-base text-gray-400 col-span-3">
                      No new products found
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Deals Section */}
        <TopDealsSection deals={flashDeals} isBusinessUser={isBusinessUser} />

        <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.detail || product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base font-bold text-gray-900">
                        ${product.pricePerUnit}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    {isBusinessUser ? (
                    <button 
                      onClick={async () => {
                        await productAPI.getById(product._id);
                        router.push(`/dashboard/business/businesses/${product.businessId}/products/${product._id}`);
                      }}
                      className="w-full py-2 border border-[#240457] text-[#240457] rounded-lg text-base hover:bg-[#240457] hover:text-white transition-colors"
                    >
                        View Product
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => {
                          addToCart(product, product.minOrderQty || 1);
                          router.push('/dashboard/user/cart');
                        }}
                        className="py-2 border border-[#240457] text-[#240457] rounded-lg text-sm hover:bg-[#240457] hover:text-white transition-colors"
                      >
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
            {filteredProducts.length === 0 && (
              <div className="text-center py-10 text-gray-500">
                No products found matching your search.
              </div>
            )}
          </div>
        </section>
        <div className="flex justify-center mt-8">
          <button className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

function TopDealsSection({ deals = [], isBusinessUser = false }) {
  if (!deals || deals.length === 0) return null;

  return (
    <div className="bg-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <div className="relative bg-gray-100 h-48 flex items-center justify-center">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover"
                />
                {deal.extras && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-brand-primary text-white text-sm px-2 py-1 rounded">
                      {deal.extras}
                    </span>
                  </div>
                )}
                <div className="absolute top-2 right-2 flex gap-1">
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50">
                    ♡
                  </button>
                  <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow hover:bg-gray-50">
                    ↗
                  </button>
                </div>
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
                    onClick={async () => {
                      await productAPI.getById(product._id);
                      router.push(`/dashboard/business/businesses/${product.businessId}/products/${product._id}`);
                    }}
                    className="w-full py-2 border border-[#240457] text-[#240457] rounded-lg text-base hover:bg-[#240457] hover:text-white transition-colors"
                  >
                    View Product
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => {
                        addToCart(product, product.minOrderQty || 1);
                        router.push('/dashboard/user/cart');
                      }}
                      className="py-2 border border-[#240457] text-[#240457] rounded-lg text-sm hover:bg-[#240457] hover:text-white transition-colors"
                    >
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
      </div>
    </div>
  );
}

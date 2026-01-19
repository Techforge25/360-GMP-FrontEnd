"use client";

import React, { useState } from "react";
import { Search, ChevronDown, ChevronRight, X } from "lucide-react";

export default function MarketplacePage() {
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

  const featuredProducts = [
    {
      image: "/placeholder1.jpg",
      title: "AMC Zro MEMS6 Gimbal",
      description:
        "Exclusive Drone gimbal, top pick for worldwide commercial aerial...",
      price: "US$ 300",
      minOrder: "5 Piece",
    },
    {
      image: "/placeholder2.jpg",
      title: "Industrial Smart Watch",
      description:
        "Rugges wearable technology for modern workforce. 50+ patterns",
      price: "US$ 200-$350",
      minOrder: "200 Piece",
    },
    {
      image: "/placeholder3.jpg",
      title: "Power Steering kick & Pinion",
      description:
        "Premium steering solution. For modern vehicles. Best quality.",
      price: "US$ 300",
      minOrder: "5 Piece",
    },
    {
      image: "/placeholder4.jpg",
      title: "Turntable Direct Drive",
      description: "Premium vinyl turntable for DJ companies performance",
      price: "US$ 700-$1200",
      minOrder: "1 Piece",
    },
    {
      image: "/placeholder5.jpg",
      title: "Industrial Dynamometer Sensor",
      description:
        "One-stop solution, powerful electronic, precision dosing. Robust...",
      price: "US$ 100-$750",
      minOrder: "5 Piece",
    },
    {
      image: "/placeholder6.jpg",
      title: "Heavy-Duty Pallet Jack Hydraulics",
      description:
        "Magnifica. Sturdy construction, smooth operation. 5,500 lb. load max",
      price: "US$ 350",
      minOrder: "2 Piece",
    },
  ];

  const topRankingProducts = [
    {
      image: "/placeholder7.jpg",
      title: "High-Density PCB V4.1",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      image: "/placeholder8.jpg",
      title: "Huawei Solar Film",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
    {
      image: "/placeholder9.jpg",
      title: "Huawei Solar Film",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    },
  ];

  const newProducts = [
    {
      image: "/placeholder10.jpg",
      title: "IoT-Enabled Temperature Sensor",
      description:
        "Temperature sensing capability for modern electronics. 60+ products",
      price: "US$ 100",
      minOrder: "100 Piece",
    },
    {
      image: "/placeholder11.jpg",
      title: "Power Steering Rack & Pinion",
      description:
        "Premium steering capability. For modern vehicles. 60+ products",
      price: "US$ 300",
      minOrder: "5 Piece",
    },
    {
      image: "/placeholder12.jpg",
      title: "Heavy-Duty Pallet Jack Hydraulics",
      description:
        "Magnifica. 5,500 lb capacity for modern working environment",
      price: "US$ 350",
      minOrder: "2 Piece",
    },
  ];

  const products = [
    {
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
      title: "AIR Pro Wireless Earbuds",
      description: "Active Noise Cancellation | Superior Sound Quality",
      price: "$199.99",
      originalPrice: "$249.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
      title: "Industrial Smart Watch",
      description: "Rugged design with advanced fitness tracking",
      price: "$299.99",
      originalPrice: "$349.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1624823183493-ed5832f48f18?w=400&h=300&fit=crop",
      title: "Multi-Port Industrial IoT Gateway",
      description: "Connect and manage IoT devices seamlessly",
      price: "$449.99",
      originalPrice: "$529.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
      title: "High Speed USB-C Data Cable",
      description: "Fast charging and data transfer capabilities",
      price: "$29.99",
      originalPrice: "$39.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop",
      title: "Power Sharing Rack & Plates",
      description: "Efficient power distribution for industrial use",
      price: "$599.99",
      originalPrice: "$699.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
      title: "Precision Disc Brake System",
      description: "High-performance braking for vehicles",
      price: "$799.99",
      originalPrice: "$899.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
      title: "High Speed USB-C Data Cable",
      description: "Fast charging and data transfer capabilities",
      price: "$29.99",
      originalPrice: "$39.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop",
      title: "Noise Reduction Headset",
      description: "Premium audio with active noise cancellation",
      price: "$249.99",
      originalPrice: "$299.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop",
      title: "Studio Professional Headset",
      description: "Professional grade audio monitoring",
      price: "$349.99",
      originalPrice: "$399.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop",
      title: "Power Sharing Rack & Plates",
      description: "Advanced power management system",
      price: "$599.99",
      originalPrice: "$699.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
      title: "High Speed USB-C Data Cable",
      description: "Ultra-fast data transfer technology",
      price: "$29.99",
      originalPrice: "$39.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
      title: "Precision Disc Brake System",
      description: "Advanced braking technology",
      price: "$799.99",
      originalPrice: "$899.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop",
      title: "Power Sharing Rack & Plates",
      description: "Industrial grade power distribution",
      price: "$599.99",
      originalPrice: "$699.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=300&fit=crop",
      title: "Noise Reduction Headset",
      description: "Immersive audio experience",
      price: "$249.99",
      originalPrice: "$299.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
      title: "High Speed USB-C Data Cable",
      description: "Premium quality cable",
      price: "$29.99",
      originalPrice: "$39.99",
    },
    {
      image:
        "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=300&fit=crop",
      title: "Precision Disc Brake System",
      description: "Superior braking performance",
      price: "$799.99",
      originalPrice: "$899.99",
    },
  ];

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
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Find Verified supplier Across the Globe
            </h1>
            <p className="text-purple-100 text-base sm:text-lg max-w-3xl mx-auto px-4">
              Connect with top-rated verified suppliers. Low MOQ, Fast Shipping,
              and Trade Assurance.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section - Overlapping */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24">
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
              />
            </div>
            <button className="bg-purple-950 hover:bg-purple-900 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200 whitespace-nowrap">
              Search
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {/* <span className="text-gray-600 font-medium text-sm sm:text-base whitespace-nowrap">
              Popular:
            </span> */}
            <div className="flex flex-wrap gap-2">
              {popularCategories.map((category, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-xs sm:text-sm font-medium transition-colors duration-200"
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
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden top-4">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Filter</h3>
                <button className="text-purple-600 text-sm hover:text-purple-700">
                  ×Clear
                </button>
              </div>

              {/* Product Category */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleCategory("product")}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900 text-sm">
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
                        />
                        <span className="text-sm text-gray-700 flex-1">
                          {cat.name}
                        </span>
                        <ChevronRight className="w-3 h-3 text-gray-400" />
                      </label>
                    ))}
                    <button className="text-purple-600 text-sm mt-2 hover:text-purple-700">
                      More
                    </button>
                  </div>
                )}
              </div>

              {/* Country */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleCategory("country")}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900 text-sm">
                    Country
                  </span>
                  {expandedCategories.country ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
                {expandedCategories.country && (
                  <div className="px-4 pb-4">
                    <div className="mb-3">
                      <button className="px-3 py-1 bg-purple-600 text-white rounded text-xs">
                        Pakistan ×
                      </button>
                    </div>
                    {countries.map((country, idx) => (
                      <label
                        key={idx}
                        className="flex items-center gap-2 py-2 cursor-pointer hover:bg-gray-50 -mx-2 px-2 rounded"
                      >
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-purple-600"
                        />
                        <span className="text-base mr-1">{country.flag}</span>
                        <span className="text-sm text-gray-700 flex-1">
                          {country.name}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Ratings */}
              <div>
                <button
                  onClick={() => toggleCategory("ratings")}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50"
                >
                  <span className="font-medium text-gray-900 text-sm">
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
                        <span className="text-sm text-gray-700">
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
                      <span className="text-sm text-gray-700">No rating</span>
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
                {featuredProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative bg-gray-100 h-48">
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
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-purple-600 font-semibold text-sm">
                          {product.price}
                        </span>
                        <span className="text-xs text-gray-500">
                          {product.minOrder}
                        </span>
                      </div>
                      <button className="w-full py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                        View Product
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Ranking */}
            <div className="mb-8 bg-gradient-to-r from-purple-600 to-purple-500 rounded-lg p-6 text-white">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Top Ranking</h2>
                <button className="text-sm hover:underline flex items-center gap-1">
                  View More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-purple-100 text-sm mb-6">
                Discover highly-rated products
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topRankingProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-100 h-32"></div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* New Product */}
            <div className="bg-gray-800 rounded-lg p-6 text-white">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold mb-1">New Product</h2>
                  <p className="text-gray-400 text-sm">
                    Browse newly-listed products
                  </p>
                </div>
                <button className="text-sm hover:underline flex items-center gap-1">
                  View More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {newProducts.map((product, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-lg overflow-hidden"
                  >
                    <div className="bg-gray-100 h-40"></div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 text-sm">
                        {product.title}
                      </h3>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-600 font-semibold text-sm">
                          {product.price}
                        </span>
                        <span className="text-xs text-gray-500">
                          {product.minOrder}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Top Deals Section */}
        <TopDealsSection />

        <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, index) => (
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
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-bold text-gray-900">
                        {product.price}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {product.originalPrice}
                      </span>
                    </div>
                    <button className="w-full bg-white border border-gray-300 text-gray-700 text-sm font-medium py-2 px-4 rounded hover:bg-gray-50 transition-colors duration-200">
                      View Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <div className="flex justify-center mt-8">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}

function TopDealsSection() {
  const topDeals = [
    {
      image: "/placeholder.jpg",
      badge: "Best Seller",
      title: "Turntable Direct Drive",
      description:
        "One-stop solution vinyl turntable for DJ company performance",
      currentPrice: "US$ 1,200",
      originalPrice: "US$ 1,350",
      discount: "-20%",
      sold: "400 Sold",
    },
    {
      image: "/placeholder.jpg",
      title: "Noise Reduction Headset",
      description:
        "High-end headset, premium sound designed for modern entertainment",
      currentPrice: "US$ 150",
      originalPrice: "US$ 200",
      discount: "-15%",
      sold: "250 Sold",
    },
    {
      image: "/placeholder.jpg",
      title: "Industrial Smart Watch",
      description: "Rugges wearable, a pipeline for the modern workforce",
      currentPrice: "US$ 300",
      originalPrice: "US$ 350",
      discount: "-10%",
      sold: "180 Sold",
    },
  ];

  return (
    <div className="bg-white py-8 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Top Deals</h2>
          <p className="text-gray-600 text-sm">
            All our season products on curated marketing
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-4">
          {topDeals.map((deal, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative bg-gray-100 h-48 flex items-center justify-center">
                {deal.badge && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded">
                      {deal.badge}
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
                {/* Placeholder for product image */}
                <div className="w-32 h-32 bg-gray-200 rounded"></div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm line-clamp-1">
                  {deal.title}
                </h3>
                <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                  {deal.description}
                </p>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-purple-600 font-bold text-base">
                    {deal.currentPrice}
                  </span>
                  <span className="text-gray-400 text-xs line-through">
                    {deal.originalPrice}
                  </span>
                  <span className="text-red-500 text-xs font-medium">
                    {deal.discount}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-500">{deal.sold}</span>
                </div>

                <button className="w-full py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

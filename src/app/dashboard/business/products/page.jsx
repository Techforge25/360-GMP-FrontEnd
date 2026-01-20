"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  FiSearch,
  FiAlertCircle,
  FiMoreHorizontal,
  FiExternalLink,
  FiEdit2,
  FiBarChart2,
  FiTrash2,
} from "react-icons/fi";
import { HiOutlineChatAlt } from "react-icons/hi";

const MyProductsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Mock Data
  const products = [
    {
      id: 1,
      name: "CNC Machined Component",
      sku: "CMC-01",
      category: "Manufacturing > Machine Component",
      moq: "100 Pc",
      priceRange: "$1200-$1500",
      status: "Live",
      stockStatus: "In Stock",
      stockCount: "1200 Units",
      image: "/assets/images/product1.png", // Ensure this path exists or use a placeholder
    },
    {
      id: 2,
      name: "Silent Block Suspension Parts",
      sku: "SBS-02",
      category: "Manufacturing > Machine Component",
      moq: "1200 Pc",
      priceRange: "$1800-$3000",
      status: "Pending",
      stockStatus: "In Stock",
      stockCount: "1278 Units",
      image: "/assets/images/product2.png",
    },
    {
      id: 3,
      name: "CNC Machined Component",
      sku: "CMC-01",
      category: "Manufacturing > Machine Component",
      moq: "100 Pc",
      priceRange: "$1200-$1500",
      status: "Live",
      stockStatus: "In Stock",
      stockCount: "1200 Units",
      image: "/assets/images/product1.png",
    },
  ];

  const tabs = [
    { id: "all", label: "All Procuct", count: null },
    { id: "live", label: "Live/Approved", count: 12 },
    { id: "rejected", label: "Rejected", count: 1 },
    { id: "pending", label: "Pending/Review", count: 1 },
    { id: "draft", label: "Draft", count: 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* 1. Hero / Header Section */}
      <div className="relative bg-[#8B5CF6]">
        {/* Background Pattern (Abstract shapes/gradients) */}
        <div className="absolute inset-0 opacity-20"></div>
        <div
          className="absolute inset-0 opacity-200"
          style={{
            backgroundImage: "url('/assets/images/settingsBanner.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            My Products Management
          </h1>
          <p className="text-white text-sm md:text-base mt-4">
            Manage Your Product & See Product Peformance
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto relative z-10 translate-y-25 bg-white p-2 rounded-xl shadow-lg">
            <div className="flex flex-row items-center w-full bg-white rounded-lg h-14 border border-gray-200">
              <div className="flex flex-1 items-center pl-4">
                <FiSearch className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products, SKU, or product ID"
                  className="w-full px-4 text-gray-700 placeholder-gray-400 focus:outline-none"
                />
              </div>
              <div className="flex items-center pr-2">
                <button className="h-10 px-8 bg-[#2e1065] text-white text-sm font-semibold rounded-md hover:bg-[#1e0a45] transition-colors">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 relative z-10">
        {/* 2. Inventory Alert */}
        <div className="bg-red-50 border border-red-100 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between mb-8 shadow-sm">
          <div className="flex items-start gap-3 mb-4 md:mb-0">
            <FiAlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-red-600 font-semibold text-sm mb-1">
                Inventory Alert
              </h3>
              <p className="text-gray-600 text-sm">
                5 Listings Are Below Minimum Safety Stock Levels.
              </p>
            </div>
          </div>
          <button className="px-4 py-3 bg-red-100 text-red-600 text-xs font-semibold rounded hover:bg-red-200 transition-colors border border-red-600">
            Update Inventory
          </button>
        </div>

        {/* 3. Controls & Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-gray-900">My Products</h2>
            <span className="px-3 py-1 bg-white border border-gray-200 text-gray-600 text-xs rounded-full flex items-center gap-1">
              34 records found{" "}
              <span className="cursor-pointer hover:text-gray-800">×</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-black">Inventory Status</span>
              <select className="border border-gray-300 rounded-md text-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black bg-white">
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-black">Inventory Status</span>
              <select className="border border-gray-300 rounded-md text-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black bg-white">
                <option>Raw Materials</option>
                <option>Sub-Components</option>
                <option>Finished Goods</option>
                <option>Manufacturing</option>
                <option>Category 5</option>
                <option>Category 6</option>
                <option>Category 7</option>
              </select>
            </div>
          </div>
        </div>

        {/* 4. Tabs & Action Button */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-gray-200 border border-gray-200 p-4 rounded-t-lg bg-white">
          <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-[#2e1065] text-white"
                    : "bg-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                {tab.label} {tab.count !== null && `(${tab.count})`}
              </button>
            ))}
          </div>

          <button className="flex-shrink-0 bg-[#2e1065] text-white text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-[#1e0a45] transition-colors flex items-center gap-2">
            Create A New Product <span>→</span>
          </button>


        </div>
        {/* 5. Product List Table */}
        <div className="bg-white shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#F0F0F0] border-b border-gray-100 text-xs font-semibold text-gray-500">
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 focus:ring-0"
              />
            </div>
            <div className="col-span-3 text-black">Products</div>
            <div className="col-span-2 text-black">MOQ & Price Range</div>
            <div className="col-span-2 text-black">Status</div>
            <div className="col-span-2 text-black">Stock</div>
            <div className="col-span-1 text-black">SKU</div>
            <div className="col-span-1 text-right text-black">Action</div>
          </div>

          {/* Table Rows */}
          {products.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors last:border-none"
            >

              {/* Product Info */}
              <div className="col-span-4 flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden flex items-center justify-center border border-gray-200">
                  <span className="text-[8px] text-gray-400 text-center px-1">
                    Img
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 leading-tight mb-0.5">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-400 font-medium mb-0.5">
                    SKU:{product.sku}
                  </p>
                  <p className="text-[12px] text-black truncate">
                    {product.category}
                  </p>
                </div>
              </div>

              {/* MOQ & Price */}
              <div className="col-span-2 text-xs">
                <p className="text-gray-600 mb-1">MOQ:{product.moq}</p>
                <p className="text-gray-500">Price: {product.priceRange}</p>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span
                  className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-medium
                  ${product.status === "Live" ? "bg-green-100 text-green-800" : ""}
                  ${product.status === "Pending" ? "bg-yellow-100 text-yellow-800" : ""}
                `}
                >
                  {product.status}
                </span>
              </div>

              {/* Stock */}
              <div className="col-span-2 text-xs">
                <span className="inline-block px-3 py-2 bg-green-50 text-green-700 rounded font-medium mb-1">
                  {product.stockStatus}
                </span>
              </div>

              {/* SKU / Units */}
              <div className="col-span-1 text-xs text-gray-600 font-medium">
                {product.stockCount}
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center justify-end gap-2">
                <button className="text-gray-400 hover:text-indigo-600 transition-colors">
                  <img src="/assets/images/editIcon.png" alt="" srcset="" />
                </button>
                <button className="text-gray-400 hover:text-green-600 transition-colors">
                  <img src="/assets/images/chartIcon.png" alt="" srcset="" />
                </button>
                <button className="text-gray-400 hover:text-red-500 transition-colors">
                  <img src="/assets/images/deleteIcon.png" alt="" srcset="" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-8">
            <button className="flex-shrink-0 bg-[#2e1065] text-white text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-[#1e0a45] transition-colors flex items-center justify-center gap-2">Load More</button>
        </div>  

      </div>
    </div>
  );
};

export default MyProductsPage;

"use client";
import React, { useState, useEffect } from "react";
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
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import AddProductModal from "@/components/dashboard/products/AddProductModal";
import ProductDetailModal from "@/components/dashboard/products/ProductDetailModal";
import productAPI from "@/services/productAPI";

const MyProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  // Filters
  const [inventoryFilter, setInventoryFilter] = useState(""); // In Stock, Low Stock, etc.
  const [stockLevelFilter, setStockLevelFilter] = useState("all"); // The dropdown value actually
  const [categoryFilter, setCategoryFilter] = useState("");

  // We need to pass inventory filter to fetchProducts
  const fetchProducts = async (
    currentPage,
    statusFilter,
    stockFilter = "all",
    catFilter = "",
  ) => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit: 10,
      };

      if (catFilter) {
        params.category = catFilter;
      }

      const tabStatusMap = {
        live: "approved",
        pending: "pending",
        rejected: "rejected",
        draft: "draft",
      };

      if (statusFilter !== "all" && tabStatusMap[statusFilter]) {
        params.filter = tabStatusMap[statusFilter];
      }

      let response;

      // Determine which API method to call based on stockFilter
      switch (stockFilter) {
        case "In Stock":
          response = await productAPI.getInStockProducts(params);
          break;
        case "Low Stock":
          response = await productAPI.getLowStockProducts(params);
          break;
        case "Out of Stock":
          response = await productAPI.getOutOfStockProducts(params);
          break;
        default:
          response = await productAPI.getMyProducts(params);
      }

      if (response?.data) {
        if (currentPage === 1) {
          setProducts(response.data.docs || []);
        } else {
          setProducts((prev) => [...prev, ...response.data.docs]);
        }
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1, activeTab, stockLevelFilter, categoryFilter);
    setPage(1);
  }, [activeTab, stockLevelFilter, categoryFilter]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchProducts(nextPage, activeTab, stockLevelFilter, categoryFilter);
    }
  };

  const handleProductCreated = () => {
    fetchProducts(1, activeTab, stockLevelFilter, categoryFilter);
    setPage(1);
  };

  const handleEdit = (product, e) => {
    if (e) e.stopPropagation();
    setEditingProduct(product);
    setIsAddModalOpen(true);
  };

  const handleDelete = async (productId, e) => {
    if (e) e.stopPropagation();
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await productAPI.delete(productId);
        handleProductCreated();
      } catch (err) {
        console.error("Failed to delete product:", err);
      }
    }
  };

  const tabs = [
    { id: "all", label: "All Product" },
    { id: "live", label: "Live/Approved" },
    { id: "rejected", label: "Rejected" },
    { id: "pending", label: "Pending/Review" },
    { id: "draft", label: "Draft" },
  ];

  return (
    <div className=" bg-gray-50">
      <p className="text-gray-500 text-sm max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        My Product
      </p>
      {/* 1. Hero / Header Section */}
      <div className="relative bg-[#8B5CF6]">
        {/* Background Pattern */}
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
                Check for products below minimum safety stock levels.
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
              {products.length} records found{" "}
              <span className="cursor-pointer hover:text-gray-800">×</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-black">Inventory Status</span>
              <select
                className="border border-gray-300 rounded-md text-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black bg-white"
                value={stockLevelFilter}
                onChange={(e) => setStockLevelFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-black">Product Category</span>
              <select
                className="border border-gray-300 rounded-md text-sm py-1.5 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black bg-white"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Category</option>
                <option value="Raw Materials">Raw Materials</option>
                <option value="Sub-Components">Sub-Components</option>
                <option value="Finished Goods">Finished Goods</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Metals & Fabrication">
                  Metals & Fabrication
                </option>
                <option value="Electronics">Electronics</option>
                <option value="Textiles">Textiles</option>
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
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setEditingProduct(null);
              setIsAddModalOpen(true);
            }}
            className="flex-shrink-0 bg-[#2e1065] text-white text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-[#1e0a45] transition-colors flex items-center gap-2"
          >
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
          {loading && page === 1 ? (
            <div className="p-8 text-center text-gray-500">
              Loading products...
            </div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                onClick={() => {
                  setSelectedProduct(product);
                  setIsDetailModalOpen(true);
                }}
                className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-gray-100 items-center hover:bg-gray-50 transition-colors last:border-none cursor-pointer"
              >
                {/* Product Info */}
                <div className="col-span-4 flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden flex items-center justify-center border border-gray-200 relative">
                    {product.image ? (
                      <Image
                        src={
                          product.image.startsWith("http") ||
                          product.image.startsWith("/")
                            ? product.image
                            : `/${product.image}`
                        }
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-[8px] text-gray-400 text-center px-1">
                        Img
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 leading-tight mb-0.5">
                      {product.title}
                    </h3>
                    <p className="text-[12px] text-[#240457] truncate">
                      {product.category}
                    </p>
                  </div>
                </div>

                {/* MOQ & Price */}
                <div className="col-span-2 text-xs">
                  <p className="text-gray-600 mb-1">
                    MOQ:{product.minOrderQty}
                  </p>
                  <p className="text-gray-500">
                    Price: ${product.pricePerUnit}
                  </p>
                </div>

                {/* Status */}
                <div className="col-span-2">
                  <span
                    className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-medium capitalize
                    ${product.status === "approved" ? "bg-green-100 text-green-800" : ""}
                    ${product.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                    ${product.status === "rejected" ? "bg-red-100 text-red-800" : ""}
                    ${product.status === "draft" ? "bg-gray-100 text-gray-800" : ""}
                  `}
                  >
                    {product.status === "approved" ? "Live" : product.status}
                  </span>
                </div>

                {/* Stock */}
                <div className="col-span-2 text-xs">
                  <span
                    className={`inline-block px-3 py-2 rounded font-medium mb-1 capitalize
                     ${product.stockFlag === "out-of-stock" ? "bg-red-100 text-red-800" : ""}
                     ${product.stockFlag === "critical-threshold" ? "bg-yellow-100 text-yellow-800" : ""}
                     ${product.stockFlag === "in-stock" ? "bg-green-100 text-green-800" : ""}
                     ${!product.stockFlag ? "bg-green-100 text-green-800" : ""}
                  `}
                  >
                    {product.stockFlag?.replace("-", " ") || "In Stock"}
                  </span>
                </div>

                {/* SKU / Units */}
                <div className="col-span-1 text-xs text-gray-600 font-medium">
                  {product.stockQty} Units
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <button
                    onClick={(e) => handleEdit(product, e)}
                    className="text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <img src="/assets/images/editIcon.png" alt="" />
                  </button>
                  <button className="text-gray-400 hover:text-green-600 transition-colors">
                    <img src="/assets/images/chartIcon.png" alt="" />
                  </button>
                  <button
                    onClick={(e) => handleDelete(product._id, e)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <img src="/assets/images/deleteIcon.png" alt="" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>

        {page < totalPages && (
          <div className="flex justify-center items-center mt-8 mb-8">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="flex-shrink-0 bg-[#2e1065] text-white text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-[#1e0a45] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
      <div className="mt-10">
        <DashboardFooter />
      </div>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setEditingProduct(null);
        }}
        onSuccess={handleProductCreated}
        editProduct={editingProduct}
      />

      <ProductDetailModal
        isOpen={isDetailModalOpen}
        product={selectedProduct}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={(prod) => {
          setIsDetailModalOpen(false);
          setEditingProduct(prod);
          setIsAddModalOpen(true);
        }}
      />
    </div>
  );
};

export default MyProductsPage;

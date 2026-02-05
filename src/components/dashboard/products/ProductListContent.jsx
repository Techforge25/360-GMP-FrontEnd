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

const ProductListContent = ({ isProfileView = false }) => {
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
  const [inventoryFilter, setInventoryFilter] = useState("");
  const [stockLevelFilter, setStockLevelFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("");

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
    <div className={isProfileView ? "bg-gray-50" : "bg-gray-50"}>
      {!isProfileView && (
        <>
          <p className="text-gray-500 text-base max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            My Product
          </p>
          {/* Hero / Header Section */}
          <div className="relative bg-[#8B5CF6]">
            <div className="absolute inset-0 opacity-20"></div>
            <div
              className="absolute inset-0 opacity-200"
              style={{
                backgroundImage: "url('/assets/images/settingsBanner.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-12  text-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 px-2">
                My Products Management
              </h1>
              <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:mt-4 px-4">
                Manage Your Product & See Product Performance
              </p>

              {/* Search Bar */}
              <div className="max-w-4xl mx-auto relative z-10 translate-y-8 bg-white p-2 rounded-xl shadow-lg mt-6 sm:mt-8">
                <div className="flex flex-col sm:flex-row items-center w-full bg-white rounded-lg min-h-14 border border-gray-200 gap-2 sm:gap-0">
                  <div className="flex flex-1 items-center pl-4 w-full sm:w-auto order-1">
                    <FiSearch className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Search products, SKU, or product ID"
                      className="w-full px-2 sm:px-4 text-sm sm:text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                  <div className="flex items-center pr-2 w-full sm:w-auto order-2">
                    <button className="w-full sm:w-auto h-10 px-4 sm:px-8 bg-[#2e1065] text-white text-sm sm:text-base font-semibold rounded-md hover:bg-[#1e0a45] transition-colors">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Main Content Container */}
      <div
        className={`${isProfileView ? "w-full p-4 sm:p-6" : "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 lg:mt-20"} relative z-10`}
      >
        {/* Inventory Alert - Hide in profile view if desired, or keep. User said 'without header and footer' so maybe keep body intact */}
        {!isProfileView && (
          <div className="bg-red-50 border border-red-100 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 shadow-sm gap-3 sm:gap-4">
            <div className="flex items-start gap-2 sm:gap-3 flex-1">
              <FiAlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-red-600 font-semibold text-sm sm:text-base mb-1">
                  Inventory Alert
                </h3>
                <p className="text-gray-600 text-sm sm:text-sm lg:text-base">
                  Check for products below minimum safety stock levels.
                </p>
              </div>
            </div>
            <button className="w-full sm:w-auto px-3 sm:px-4 py-2 sm:py-3 bg-red-100 text-red-600 text-sm sm:text-sm font-semibold rounded hover:bg-red-200 transition-colors border border-red-600 whitespace-nowrap">
              Update Inventory
            </button>
          </div>
        )}

        {/* Controls & Title Header */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900">My Products</h2>
              <span className="px-2 sm:px-3 py-1 bg-white border border-gray-200 text-gray-600 text-sm sm:text-sm rounded-full flex items-center gap-1 w-fit">
                {products.length} records found{" "}
                <span className="cursor-pointer hover:text-gray-800">×</span>
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <span className="text-sm sm:text-base text-black font-medium">Inventory Status</span>
              <select
                className="border border-gray-300 rounded-md text-sm sm:text-base py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black bg-white w-full sm:w-auto min-w-[140px]"
                value={stockLevelFilter}
                onChange={(e) => setStockLevelFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="In Stock">In Stock</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
              <span className="text-sm sm:text-base text-black font-medium">Product Category</span>
              <select
                className="border border-gray-300 rounded-md text-sm sm:text-base py-2 px-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-black bg-white w-full sm:w-auto min-w-[160px]"
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

        {/* Tabs & Action Button */}
        <div className="flex flex-col gap-4 border border-gray-200 p-3 sm:p-4 rounded-t-lg bg-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-1 overflow-x-auto w-full scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm sm:text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
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
              className="w-full sm:w-auto flex-shrink-0 bg-[#2e1065] text-white text-sm sm:text-sm font-semibold px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg hover:bg-[#1e0a45] transition-colors flex items-center justify-center gap-2"
            >
              <span className="hidden sm:inline">Create A New Product</span>
              <span className="sm:hidden">Add Product</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white shadow-sm overflow-hidden mb-6 sm:mb-8">
          {/* Desktop Table Header - Hidden on mobile */}
          <div className="hidden lg:grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-[#F0F0F0] border-b border-gray-100 text-sm sm:text-sm font-semibold text-gray-500">
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

          {/* Product Items */}
          {loading && page === 1 ? (
            <div className="p-6 sm:p-8 text-center text-gray-500">
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
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-none cursor-pointer"
              >
                {/* Mobile Card Layout */}
                <div className="lg:hidden p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden flex items-center justify-center border border-gray-200 relative">
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
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-medium text-gray-900 leading-tight mb-1 truncate">
                        {product.title}
                      </h3>
                      <p className="text-sm sm:text-sm text-[#240457] truncate mb-2">
                        {product.category}
                      </p>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium capitalize
                          ${product.status === "approved" ? "bg-green-100 text-green-800" : ""}
                          ${product.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
                          ${product.status === "rejected" ? "bg-red-100 text-red-800" : ""}
                          ${product.status === "draft" ? "bg-gray-100 text-gray-800" : ""}
                        `}
                        >
                          {product.status === "approved" ? "Live" : product.status}
                        </span>
                        <span
                          className={`inline-block px-2 py-1 rounded text-sm font-medium capitalize
                           ${product.stockFlag === "out-of-stock" ? "bg-red-100 text-red-800" : ""}
                           ${product.stockFlag === "critical-threshold" ? "bg-yellow-100 text-yellow-800" : ""}
                           ${product.stockFlag === "in-stock" ? "bg-green-100 text-green-800" : ""}
                           ${!product.stockFlag ? "bg-green-100 text-green-800" : ""}
                        `}
                        >
                          {product.stockFlag?.replace("-", " ") || "In Stock"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                      <button
                        onClick={(e) => handleEdit(product, e)}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-indigo-600 transition-colors rounded"
                      >
                        <img src="/assets/images/editIcon.png" alt="Edit" className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-green-600 transition-colors rounded"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <img src="/assets/images/chartIcon.png" alt="Analytics" className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(product._id, e)}
                        className="p-1.5 sm:p-2 text-gray-400 hover:text-red-500 transition-colors rounded"
                      >
                        <img src="/assets/images/deleteIcon.png" alt="Delete" className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm sm:text-sm">
                    <div>
                      <p className="text-gray-500 font-medium mb-1">MOQ & Price</p>
                      <p className="text-gray-600">MOQ: {product.minOrderQty}</p>
                      <p className="text-gray-600">Price: ${product.pricePerUnit}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 font-medium mb-1">Stock</p>
                      <p className="text-gray-600 font-medium">{product.stockQty} Units</p>
                    </div>
                  </div>
                </div>

                {/* Desktop Table Row */}
                <div className="hidden lg:grid grid-cols-12 gap-4 px-4 sm:px-6 py-3 sm:py-4 items-center">
                  <div className="col-span-1 flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-indigo-600 focus:ring-0"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  {/* Product Info */}
                  <div className="col-span-3 flex items-start gap-3">
                    <div className="w-10 h-10 xl:w-12 xl:h-12 bg-gray-100 rounded-md flex-shrink-0 overflow-hidden flex items-center justify-center border border-gray-200 relative">
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
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm xl:text-base font-medium text-gray-900 leading-tight mb-0.5 truncate">
                        {product.title}
                      </h3>
                      <p className="text-sm xl:text-sm text-[#240457] truncate">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  {/* MOQ & Price */}
                  <div className="col-span-2 text-sm xl:text-sm">
                    <p className="text-gray-600 mb-1">
                      MOQ: {product.minOrderQty}
                    </p>
                    <p className="text-gray-500">
                      Price: ${product.pricePerUnit}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="col-span-2">
                    <span
                      className={`inline-flex items-center px-2 xl:px-3 py-1 xl:py-2 rounded-full text-sm xl:text-sm font-medium capitalize
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
                  <div className="col-span-2 text-sm xl:text-sm">
                    <span
                      className={`inline-block px-2 xl:px-3 py-1 xl:py-2 rounded font-medium mb-1 capitalize
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
                  <div className="col-span-1 text-sm xl:text-sm text-gray-600 font-medium">
                    {product.stockQty} Units
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center justify-end gap-1 xl:gap-2">
                    <button
                      onClick={(e) => handleEdit(product, e)}
                      className="p-1 text-gray-400 hover:text-indigo-600 transition-colors"
                    >
                      <img src="/assets/images/editIcon.png" alt="Edit" className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img src="/assets/images/chartIcon.png" alt="Analytics" className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(product._id, e)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <img src="/assets/images/deleteIcon.png" alt="Delete" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 sm:p-8 text-center text-gray-500">
              No products found.
            </div>
          )}
        </div>

        {page < totalPages && (
          <div className="flex justify-center items-center mt-6 sm:mt-8 mb-6 sm:mb-8 px-4">
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="w-full sm:w-auto bg-[#2e1065] text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg hover:bg-[#1e0a45] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-w-[120px]"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>

      {!isProfileView && (
        <div className="mt-8 sm:mt-10 lg:mt-12">
          <DashboardFooter />
        </div>
      )}

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

export default ProductListContent;

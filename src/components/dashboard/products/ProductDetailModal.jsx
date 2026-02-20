import React from "react";
import { FiX, FiEdit2 } from "react-icons/fi";
import Image from "next/image";
import SlateRenderer from "@/components/ui/SlateRenderer";

const ProductDetailModal = ({ isOpen, onClose, product, onEdit }) => {
  if (!isOpen || !product) return null;

  // Helper to ensure image URL is valid
  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith("http") || url.startsWith("/")) return url;
    return `/${url}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Product Detail</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column (Main Content) */}
            <div className="flex-1 space-y-8">
              {/* Image Gallery Section */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative w-full aspect-[4/3] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                  {product.image ? (
                    <Image
                      src={getImageUrl(product.image)}
                      alt={product.title}
                      fill
                      className="object-contain p-4"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-300">
                      No Image
                    </div>
                  )}
                </div>

                {/* Gallery Grid - Placeholder if no gallery in schema yet, but UI required */}
                {/* Assuming product.galleryImages or just placeholders for design match */}
                <div className="grid grid-cols-3 gap-4">
                  {product.groupImages && product.groupImages.length > 0 ? (
                    product.groupImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100"
                      >
                        <Image
                          src={getImageUrl(img)}
                          alt={`Gallery ${idx}`}
                          fill
                          className="object-cover opacity-70 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ))
                  ) : (
                    // Fallback placeholders if no gallery images
                    [1, 2, 3].map((_, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square bg-gray-100/50 rounded-xl border border-dashed border-gray-200"
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Logistics Section */}
              <div className="border border-indigo-900/10 rounded-xl overflow-hidden">
                <div className="bg-gray-50/50 p-4 border-b border-gray-100">
                  <h3 className="text-base font-bold text-gray-900">
                    Logistics
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Lead Time
                    </label>
                    <div className="w-full text-base p-3 bg-white border border-gray-200 rounded-lg text-gray-600">
                      {product.estimatedDeliveryDays || "N/A"}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Shipping Terms
                    </label>
                    <div className="w-full text-base p-3 bg-white border border-gray-200 rounded-lg text-gray-600 flex justify-between items-center">
                      {product.shippingMethod || "N/A"}
                      <FiEdit2 className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Status Bar */}
              <div className="bg-blue-50/30 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 border border-blue-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 p-1 relative overflow-hidden">
                    {product.image && (
                      <Image
                        src={getImageUrl(product.image)}
                        alt="Small"
                        fill
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Product ID</p>
                    <p className="text-base font-medium text-gray-900">
                      SKU: {product._id?.slice(-6).toUpperCase() || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">(MOQ)</p>
                    <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-base text-gray-600 min-w-[80px]">
                      {product.minOrderQty} Units
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Stock Quantity</p>
                    <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-base text-gray-600 min-w-[80px]">
                      {product.stockQty}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Pricing Model</p>
                    <div className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg text-base text-gray-600 min-w-[80px]">
                      ${product.pricePerUnit}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    {/* Toggle Mock */}
                    <div className="w-10 h-5 bg-blue-600 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="w-full lg:w-80 space-y-6 flex-shrink-0">
              {/* Pricing Card */}
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h3 className="text-base font-bold text-gray-900 mb-4">
                  Pricing And Minimum Order Quantity
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-base">
                    <span className="text-gray-600">Price</span>
                    <span className="text-blue-600 font-bold">
                      ${product.pricePerUnit}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-base">
                    <span className="text-gray-600">Stock Quantity</span>
                    <span className="text-blue-600 font-bold">
                      {product.stockQty}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-base">
                    <span className="text-gray-600">Low Stock Threshold</span>
                    <span className="text-blue-600 font-bold">
                      {product.lowStockThreshold || 0} Units
                    </span>
                  </div>
                </div>
              </div>

              {/* Detail Fields */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Title
                </label>
                <div className="w-full text-base p-3 bg-white border border-gray-200 rounded-lg text-gray-500">
                  {product.title}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Product Category
                </label>
                <div className="w-full text-base p-3 bg-white border border-gray-200 rounded-lg text-gray-500">
                  {product.category}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Low Stock Threshold
                </label>
                <div className="w-full text-base p-3 bg-white border border-gray-200 rounded-lg text-gray-500">
                  {product.lowStockThreshold} units
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">
                  Description
                </label>
                <div className="w-full text-base p-3 bg-white border border-gray-200 rounded-lg text-gray-500 min-h-[120px]">
                  {product.detail || product.description ? (
                    <SlateRenderer
                      content={product.detail || product.description}
                    />
                  ) : (
                    "No description provided."
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 flex justify-end">
          <button
            onClick={() => onEdit && onEdit(product)}
            className="px-8 py-2.5 bg-[#240457] text-white text-sm font-bold rounded-lg hover:bg-[#1a0340] transition-colors"
          >
            Edit Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;

"use client";
import React from "react";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiSliders } from "react-icons/fi";

const FeatureProduct = () => {
  const products = [
    {
      id: 1,
      name: "CNC Machined Component",
      desc: "Precision milling and turning of complex geometries...",
      moq: "100 pc",
      price: "$980",
      stock: 145,
      image: "/assets/images/product1.png", // Placeholder
    },
    {
      id: 2,
      name: "Silent Block Suspension Parts",
      desc: "Precision milling and turning of complex geometries...",
      moq: "100 pc",
      price: "$880",
      stock: 145,
      image: "/assets/images/product2.png", // Placeholder
    },
    {
      id: 3,
      name: "CNC Machined Component",
      desc: "Precision milling and turning of complex geometries...",
      moq: "100 pc",
      price: "$980",
      stock: 145,
      image: "/assets/images/product1.png", // Placeholder
    },
    {
      id: 4,
      name: "Precision Disc Brake System",
      desc: "Precision milling and turning of complex geometries...",
      moq: "100 pc",
      price: "$980",
      stock: 14,
      stockColor: "bg-red-500",
      image: "/assets/images/product3.png", // Placeholder
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
          Feature Product
        </h2>
        <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 bg-gray-50 text-[#240457] rounded-md text-sm sm:text-sm font-medium hover:bg-gray-100 transition-colors">
          <span className="hidden sm:inline">Manage Featured Products</span>
          <span className="sm:hidden">Manage Products</span>
          <img src="/assets/images/manageIcon.png" alt="" className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="aspect-[4/3] bg-gray-50 relative p-3 sm:p-4 flex items-center justify-center">
              {/* Stock Badge */}
              <div
                className={`absolute top-2 sm:top-3 right-2 sm:right-3 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-xl sm:rounded-2xl text-[9px] sm:text-[14px] font-bold text-white ${product.stockColor || "bg-green-600"}`}
              >
                Stock {product.stock}
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 flex gap-1 bg-[#00000033] p-1 rounded-full opacity-100 transition-opacity">
                <button className="p-1 sm:p-1.5 bg-white rounded-full shadow text-gray-500">
                  <FiEdit2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
                <button className="p-1 sm:p-1.5 bg-white rounded-full shadow text-red-600">
                  <FiTrash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>

              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                {/* Placeholder for Product Image */}
                <span className="text-sm sm:text-sm">Product Image</span>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">
                {product.name}
              </h3>
              <p className="text-sm sm:text-sm text-gray-500 line-clamp-2 mb-2 sm:mb-3">
                {product.desc}
              </p>

              <div className="flex items-center justify-between text-sm sm:text-sm mb-3 sm:mb-4">
                <span className="text-gray-500">MOQ: {product.moq}</span>
                <span className="text-gray-500 font-semibold">
                  USD {product.price}
                </span>
              </div>

              <button className="w-full py-1.5 sm:py-2 border border-[#240457] rounded-lg text-sm sm:text-sm font-semibold text-[#240457] hover:bg-gray-50 transition-all">
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureProduct;

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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Feature Product</h2>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors">
          Manage Featured Products
          <FiSliders className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
          >
            <div className="aspect-[4/3] bg-gray-50 relative p-4 flex items-center justify-center">
              {/* Stock Badge */}
              <div
                className={`absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold text-white ${product.stockColor || "bg-green-600"}`}
              >
                Stock {product.stock}
              </div>

              {/* Action Buttons */}
              <div className="absolute bottom-3 left-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-1.5 bg-white rounded-full shadow text-gray-500 hover:text-indigo-600">
                  <FiEdit2 className="w-3.5 h-3.5" />
                </button>
                <button className="p-1.5 bg-white rounded-full shadow text-gray-500 hover:text-red-600">
                  <FiTrash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                {/* Placeholder for Product Image */}
                <span className="text-xs">Product Image</span>
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-gray-900 text-sm mb-1">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">
                {product.desc}
              </p>

              <div className="flex items-center justify-between text-xs mb-4">
                <span className="text-gray-500">MOQ: {product.moq}</span>
                <span className="text-gray-900 font-semibold">
                  USD {product.price}
                </span>
              </div>

              <button className="w-full py-2 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-50 hover:text-[#240457] hover:border-[#240457]/30 transition-all">
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

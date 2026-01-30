"use client";
import React, { useState } from "react";
import { FaStar, FaMinus, FaPlus, FaShoppingCart, FaCommentAlt } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsShieldCheck, BsCashCoin, BsHeadset } from "react-icons/bs";

export default function ProductInfo() {
  const [quantity, setQuantity] = useState(100);
  const pricePerUnit = 98.00;

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">ANC Pro Wireless Earbuds</h1>
      <p className="text-gray-500 text-sm mb-4">
        High-fidelity audio with Active Noise Cancellation for hands-free factory communication.
      </p>

      {/* Ratings */}
      <div className="flex items-center gap-2 text-sm mb-6">
        <span className="font-bold text-gray-900">5.0</span>
        <div className="flex text-orange-400 text-xs">
            <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
        </div>
        <span className="text-gray-500 underline">(2 Reviews)</span>
        <span className="text-gray-300">•</span>
        <span className="text-gray-500">103 (Sold)</span>
      </div>

      {/* Price */}
      <div className="flex justify-between items-end mb-6 border-b border-gray-100 pb-6">
          <div className="flex items-baseline gap-1">
             <span className="text-3xl font-bold text-gray-900">${pricePerUnit.toFixed(2)}</span>
             <span className="text-gray-500 text-sm font-medium">/Pc</span>
          </div>
          <span className="text-gray-500 text-sm">MOQ: 100 pc</span>
      </div>

      {/* Supplier Card */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-white flex items-center justify-center border border-green-200">
                  {/* Logo Placeholder */}
                  <div className="text-cyan-500 text-lg">🌐</div>
              </div>
              <span className="font-semibold text-gray-900 text-sm">Tech Vision Solution</span>
          </div>
          <div className="border-l border-gray-300 h-6 mx-2"></div>
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <MdVerified /> Verified Supplier
          </span>
      </div>

      {/* Quantity & Subtotal */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
              <span className="text-gray-600 text-sm font-medium">Quantity :</span>
              <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-l-lg"
                  >
                      <FaMinus className="text-[10px]" />
                  </button>
                  <input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="w-12 text-center text-sm font-bold text-gray-900 border-x border-gray-200 py-1 outline-none"
                  />
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-r-lg"
                  >
                      <FaPlus className="text-[10px]" />
                  </button>
              </div>
          </div>
          
          <div className="text-gray-600 text-sm font-medium">
              Sub Total: <span className="text-gray-900 font-bold">${(quantity * pricePerUnit).toLocaleString()}</span>
          </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mb-8">
          <button className="flex-1 bg-[#110026] text-white py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#2a0b4d] transition-colors">
              Add To Cart <FaShoppingCart />
          </button>
          <button className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              Chat Now <FaCommentAlt />
          </button>
      </div>

      {/* Trust Badges */}
      <div className="space-y-4">
          <div className="flex gap-3">
              <BsShieldCheck className="text-indigo-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Secure payments</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                      Escrow Protection Assurance: Full B2B protection benefits are exclusively provided for orders successfully placed and paid through the secure 360GMP Escrow Service.
                  </p>
              </div>
          </div>
          <div className="flex gap-3">
              <BsCashCoin className="text-indigo-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">Money-back protection</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                      360GMP Order Protection: Claim a full refund if your goods were not shipped, are missing, or arrive with verified quality or product defects
                  </p>
              </div>
          </div>
          <div className="flex gap-3">
              <BsHeadset className="text-indigo-600 text-xl flex-shrink-0 mt-0.5" />
              <div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">24/7 support</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                      Dedicated Global Support: Access our comprehensive virtual help center 24/7 or connect with a live B2B support agent for immediate assistance.
                  </p>
              </div>
          </div>
      </div>

    </div>
  );
}

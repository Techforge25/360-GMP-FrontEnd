"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiTrash2, FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import { HiShieldCheck } from "react-icons/hi"; // For secure payments
import { RiMoneyDollarCircleLine, RiCustomerService2Line } from "react-icons/ri"; // For money back and support

const CartPage = () => {
  const [quantity, setQuantity] = useState(100);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  // Data from screenshot
  const product = {
    title: "ANC Pro Wireless Earbuds",
    image: "/assets/images/earbuds.png", 
    price: 99.00,
    verifiedSupplier: true,
    supplierYears: 3,
    supplierName: "Global Manufacturing",
  };

  const subtotal = 98.00; // From screenshot, though quantity is 100 * 99 = 9900. The screenshot shows Quantity: 100, Unit Price: $99.00. But Subtotal $98.00. 
  // Wait, looking closer at the screenshot. 
  // "Quantity: 100", "Unit Price: $99.00".
  // Order Summary says "Subtotal (01Items) $98.00".
  // "Total Estimated $108.00" (Subtotal $98 + Shipping $10).
  // This math doesn't check out with Quantity 100 * $99. 
  // Maybe the 100 in the input is just a variation or min order? 
  // Or maybe the screenshot has dummy data that doesn't add up.
  // I will follow the screenshot's TEXT exactly, even if math is off, but I will make the quantity selector work visually.
  // Actually, let's just stick to the text in the screenshot for the Summary, but allow the quantity to change visually (no real calc needed to match UI).
  // Wait, if I change quantity, users expect price to change. 
  // The screenshot shows "Quantity: 100". Maybe that's the moq?
  // I'll set initial state quantity to 100 to match screenshot.
  // I'll keep the summary static to match the screenshot exactly as requested ("exact UI").

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-sm text-gray-500 flex items-center gap-1">
          <span>Business List</span>
          <span>&gt;</span>
          <span>Techvision Solutions</span>
          <span>&gt;</span>
          <span>Product List</span>
          <span>&gt;</span>
          <span>Product Detail</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">Add To Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#F8F9FB]">
                <h2 className="text-lg font-bold text-gray-900">Shopping Cart (1 Item)</h2>
                <button className="text-blue-600 text-sm font-medium hover:underline">Edit</button>
              </div>
              
              <div className="p-6">
                {/* Supplier Info */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-xs font-medium border border-blue-100">
                        <div className="w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                            <FiCheck className="w-2 h-2 text-white" />
                        </div>
                        verified supplier
                    </span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-600 text-sm">3 yrs</span>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-600 text-sm">Global Manufacturing</span>
                </div>

                {/* Product Item */}
                <div className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    {/* Image */}
                    <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative">
                        {/* Using a placeholder if actual image not available, but user attached specific pic so I try to mimic */}
                        <img 
                            src="/assets/images/earbuds.png" 
                            alt="ANC Pro Wireless Earbuds" 
                            className="w-full h-full object-cover"
                            onError={(e) => {e.target.src = "https://placehold.co/100x100?text=Earbuds"}}
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                            <div>
                                <h3 className="text-base font-bold text-gray-900 mb-1">ANC Pro Wireless Earbuds</h3>
                                <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                                    <div className="flex items-center gap-6 mt-4">
                                         <div className="flex items-center gap-2">
                                            <span className="text-gray-600">Quantity:</span>
                                            <div className="flex items-center border border-gray-200 rounded text-sm">
                                                <button onClick={decrementQuantity} className="px-2 py-1 text-gray-500 hover:bg-gray-50">-</button>
                                                <input 
                                                    type="text" 
                                                    value={quantity} 
                                                    readOnly 
                                                    className="w-10 text-center py-1 text-gray-900 font-medium focus:outline-none"
                                                />
                                                <button onClick={incrementQuantity} className="px-2 py-1 text-gray-500 hover:bg-gray-50">+</button>
                                            </div>
                                         </div>

                                         <div className="flex items-center gap-1 text-gray-600">
                                            <span>Unit Price:</span>
                                            <span className="font-medium text-gray-900">$99.00</span>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            
                            <button className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors self-end sm:self-center">
                                <FiTrash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-[380px] space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-bold text-gray-900">Order Summary (1 Variation)</h2>
                </div>
                
                <div className="p-6">
                    {/* Tiny Product Preview */}
                    <div className="mb-6 relative inline-block">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden border border-gray-200">
                            <img 
                                src="/assets/images/earbuds.png" 
                                alt="Item" 
                                className="w-full h-full object-cover"
                                onError={(e) => {e.target.src = "https://placehold.co/50x50?text=Item"}}
                            />
                        </div>
                        <span className="absolute -top-2 -right-2 bg-[#240457] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                            1
                        </span>
                    </div>

                    {/* Summary Lines */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="font-bold text-gray-700">Subtotal <span className="text-gray-500 font-normal">(01Items)</span></span>
                            <span className="font-bold text-gray-900">$98.00</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold text-gray-700">Shipping <span className="text-gray-500 font-normal">(Estimated)</span></span>
                            <span className="font-bold text-gray-900">$10</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold text-gray-700">Shipping Discount <span className="text-gray-500 font-normal">(Estimated)</span></span>
                            <span className="font-bold text-gray-900">$0</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-6">
                         <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <span className="font-bold text-blue-800">Total Estimated</span>
                            <span className="font-bold text-blue-800 text-lg">$108.00</span>
                        </div>
                    </div>

                    <Link href="/dashboard/user/checkout" className="block w-full text-center bg-[#110026] text-white py-3 rounded-lg font-semibold hover:bg-[#2a0b4d] transition-colors">
                        Check Out
                    </Link>
                </div>
            </div>

            {/* Trust Signals */}
            <div className="space-y-6 px-2">
                <div className="flex gap-3">
                    <div className="shrink-0 mt-1">
                        <HiShieldCheck className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">Secure payments</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Escrow Protection Assurance: Full B2B protection benefits are exclusively provided for orders successfully placed and paid through the secure 360GMP Escrow Service.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="shrink-0 mt-1">
                        <RiMoneyDollarCircleLine className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">Money-back protection</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                             360GMP Order Protection: Claim a full refund if your goods were not shipped, are missing, or arrive with verified quality or product defects
                        </p>
                    </div>
                </div>

                 <div className="flex gap-3">
                    <div className="shrink-0 mt-1">
                        <RiCustomerService2Line className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-sm mb-1">24/7 support</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Dedicated Global Support: Access our comprehensive virtual help center 24/7 or connect with a live B2B support agent for immediate assistance.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

"use client";

import React, { useState } from "react";
import Link from "next/link";

const PlaceOrderPage = () => {
  const [selectedMethod, setSelectedMethod] = useState("credit_card");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  const handlePlaceOrder = () => {
    // Yahan real API call / payment logic aa sakta hai
    // Abhi sirf demo ke liye direct success modal khol rahe hain
    setShowSuccessModal(true);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-16">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 text-sm text-gray-500">
          Market Place &gt; Electronic &gt; Product Detail &gt; Cart &gt; Checkout &gt;{" "}
          <span className="text-gray-900 font-medium">Place Order</span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left side - Payment + Items */}
            <div className="lg:col-span-2 space-y-8">
              {/* Payment Method Selection */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Payment Method Selection</h2>
                </div>

                <div className="p-6 space-y-6">
                  {/* Credit Card - Recommended */}
                  <div
                    className={`p-5 border rounded-xl cursor-pointer transition-all ${
                      selectedMethod === "credit_card"
                        ? "border-[#240457] bg-[#f8f5ff] ring-2 ring-[#240457]/30"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleMethodChange("credit_card")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedMethod === "credit_card" ? "border-[#240457]" : "border-gray-400"
                        }`}>
                          {selectedMethod === "credit_card" && <div className="w-3 h-3 bg-[#240457] rounded-full" />}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
                            Recommended
                          </span>
                          <h3 className="font-semibold text-gray-900">Credit Card Visa/MC</h3>
                        </div>

                        <p className="text-sm text-gray-600 leading-relaxed">
                          The safest way to pay. Funds are held in a secure trust account and released to the seller only after you confirm delivery and quality inspection.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-green-700 font-medium">
                          <span>✔ Money-Back Protection</span>
                          <span>✔ Secure Hold Receipt</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bank Transfer */}
                  <div
                    className={`p-5 border rounded-xl cursor-pointer transition-all ${
                      selectedMethod === "bank_transfer"
                        ? "border-[#240457] bg-[#f8f5ff] ring-2 ring-[#240457]/30"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleMethodChange("bank_transfer")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="mt-1">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedMethod === "bank_transfer" ? "border-[#240457]" : "border-gray-400"
                        }`}>
                          {selectedMethod === "bank_transfer" && <div className="w-3 h-3 bg-[#240457] rounded-full" />}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-gray-900">Bank Transfer (TT)</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Direct Business-to-Business Transfer
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Escrow Hold Info */}
                  <div className="bg-purple-50 border border-purple-100 rounded-lg p-4 text-sm text-purple-900 flex items-start gap-3">
                    <div className="mt-0.5">
                      <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <p>
                      <strong>Escrow Hold:</strong> Your funds will be held in a regulated escrow account. The seller cannot access these funds until the product is delivered and verified by you.
                    </p>
                  </div>

                  {/* Card Details Form */}
                  {selectedMethod === "credit_card" && (
                    <div className="mt-8 space-y-6 border-t pt-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name on Card *
                        </label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent text-sm"
                          placeholder="Name on Card *"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            maxLength={19}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent text-sm"
                            placeholder="eg. 0000 0000 0000 0000"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                            <img src="https://img.icons8.com/color/24/000000/visa.png" alt="Visa" className="h-5" />
                            <img src="https://img.icons8.com/color/24/000000/mastercard.png" alt="Mastercard" className="h-5" />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry *
                          </label>
                          <input
                            type="text"
                            maxLength={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent text-sm"
                            placeholder="eg. 12/27"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVC *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              maxLength={4}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent text-sm"
                              placeholder="eg. 123"
                            />
                            <img src="https://img.icons8.com/color/24/000000/mastercard-logo.png" alt="Card" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 opacity-70" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Items & Delivery Options */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Items & Delivery Options</h2>
                </div>

                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold">Global Manufacturing</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                        Verified Supplier
                      </span>
                    </div>
                    <span className="text-green-600 font-medium">+4.8 Rating</span>
                  </div>

                  <div className="flex gap-4 py-4 border-t border-gray-200">
                    <div className="w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img src="/placeholder-earbuds.jpg" alt="ANC Pro Wireless Earbuds" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">ANC Pro Wireless Earbuds</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Quantity: 100 • Unit Price: $99.00
                      </p>
                    </div>

                    <div className="text-right font-medium text-lg">$1,256</div>
                  </div>

                  <div className="space-y-3 text-sm pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Item Total</span>
                      <span>$1,256</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Shipping</span>
                      <span>$175</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Shipping Discount</span>
                      <span>-$75</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Escrow Fee Deduction</span>
                      <span>-$0</span>
                    </div>
                    <div className="pt-3 border-t font-bold flex justify-between text-base">
                      <span>Grand Total</span>
                      <span>$1,356</span>
                    </div>
                    <div className="flex justify-between text-gray-800 font-medium">
                      <span>Est. Net Payout</span>
                      <span>$9,900</span>
                    </div>
                  </div>

                  <div className="pt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#240457] resize-none text-sm"
                      placeholder="Lorem ipsum Simply Dummy Text of the Printing And Typesetting Industry..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">Order Summary (1 Variation)</h2>
                  <span className="bg-[#240457] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    #100
                  </span>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden">
                    <img src="/placeholder-earbuds.jpg" alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">ANC Pro Wireless Earbuds</p>
                    <p className="text-sm text-gray-600 mt-1">Qty: 100</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Subtotal (000 items)</span>
                    <span className="font-medium">$9,800</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700">Shipping (Estimated)</span>
                    <span className="font-medium">$175</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Shipping Discount (Estimated)</span>
                    <span>-$75</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
                      <span className="font-semibold text-blue-900">Total Estimated</span>
                      <span className="font-bold text-blue-900 text-lg">$9,900</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-500 mb-6 leading-relaxed">
                  By placing this order, you agree to the{" "}
                  <Link href="#" className="text-[#240457] hover:underline">
                    Trade Assurance Terms
                  </Link>{" "}
                  and the supplier's warranty policy.
                </p>

                {/* Place Order Button - yeh modal trigger karega */}
                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#240457] hover:bg-[#1a033f] text-white font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 shadow-md"
                >
                  Place Order & Pay Securely
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>

            <div className="p-8 text-center">
              {/* Shield Icon */}
              <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Payment Secured in Escrow
              </h2>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Great news! We've secured your funds. The seller has been notified to prepare your shipment.<br />
                Funds will only be released once you confirm delivery.
              </p>

              {/* Order Reference Card */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                <div className="flex justify-between items-center mb-5 pb-4 border-b border-gray-200">
                  <span className="font-bold text-gray-900">Order Reference</span>
                  <span className="font-bold text-gray-900">#39201</span>
                </div>

                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800">Payment Verified</h4>
                      <p className="text-sm text-gray-600">Your card was successfully charged.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800">Funds Locked</h4>
                      <p className="text-sm text-gray-600">Money is currently in 360 Safe Vault.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 py-3 px-6 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition"
                >
                  Back to Home
                </button>

                <Link
                  href="/dashboard/user/orders/39201" // real order ID dynamic kar sakte ho
                  className="flex-1 py-3 px-6 bg-[#240457] text-white rounded-xl font-medium hover:bg-[#1a033f] transition flex items-center justify-center gap-2 shadow-md"
                  onClick={() => setShowSuccessModal(false)}
                >
                  Track Order →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PlaceOrderPage;
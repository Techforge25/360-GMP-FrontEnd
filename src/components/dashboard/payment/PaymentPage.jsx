"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { FiCheck, FiCreditCard, FiDollarSign } from "react-icons/fi";
import { HiShieldCheck } from "react-icons/hi";
import { BsBank } from "react-icons/bs";
import { useCart } from "@/context/CartContext";
import productAPI from "@/services/productAPI";

const PaymentPage = () => {
  const { cartItems } = useCart();
  const [productsCache, setProductsCache] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("credit-card");
  const [orderNotes, setOrderNotes] = useState("Lorem Ipsum Is Simply Dummy Text Of The Printing And Typesetting Industry.");

  // Memoized products from cache and cart items
  const products = useMemo(() => {
    return cartItems.map(item => {
      const cachedProduct = productsCache[item.productId];
      return cachedProduct ? {
        ...cachedProduct,
        quantity: item.quantity
      } : null;
    }).filter(Boolean);
  }, [cartItems, productsCache]);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cartItems.length === 0) {
        setLoading(false);
        return;
      }

      // Find products not in cache
      const missingProducts = cartItems.filter(item => !productsCache[item.productId]);
      
      if (missingProducts.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const productPromises = missingProducts.map((item) =>
          productAPI.getById(item.productId)
        );
        const results = await Promise.all(productPromises);
        
        // Update cache with new products
        const newCache = { ...productsCache };
        results.forEach((result, index) => {
          if (result.data) {
            newCache[missingProducts[index].productId] = result.data;
          }
        });
        
        setProductsCache(newCache);
      } catch (error) {
        console.error("Failed to fetch cart products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [cartItems, productsCache]);

  // Calculate totals
  const calculateSubtotal = () => {
    return products.reduce((total, product) => {
      return total + (product.pricePerUnit * product.quantity);
    }, 0);
  };

  const getTotalQuantity = () => {
    return products.reduce((total, product) => total + product.quantity, 0);
  };

  const subtotal = calculateSubtotal();
  const totalQuantity = getTotalQuantity();
  const shipping = 175;
  const shippingDiscount = -75;
  const escrowFeeDeduction = 0;
  const total = subtotal + shipping + shippingDiscount - escrowFeeDeduction;

  // Handle empty cart
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  if (cartItems.length === 0 || products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Please add items to your cart before proceeding to payment.</p>
          <Link href="/dashboard/user/marketplace" className="bg-[#240457] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2a0b4d] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
          <span>Techvision Solutions</span>
          <span>&gt;</span>
          <span>Product List</span>
          <span>&gt;</span>
          <span>Product Detail</span>
          <span>&gt;</span>
          <span>Add To Cart</span>
          <span>&gt;</span>
          <span>Check Out</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">Place Order</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Payment & Items */}
          <div className="flex-1 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#F8F9FB]">
                <h2 className="text-lg font-bold text-gray-900">Payment Method Selection</h2>
                <span className="bg-[#5D5FEF] text-white px-3 py-1 rounded-full text-xs font-medium">Recommended</span>
              </div>
              
              <div className="p-6">
                {/* Payment Method Selection Box */}
                <div className="border-2 border-orange-300 rounded-xl p-4 mb-6 bg-orange-50">
                  <h3 className="font-bold text-gray-900 mb-3">Payment Method Selection</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    The safest way to pay. Funds are held in a secure trust account and released to the seller only after you confirm delivery and pass quality inspection.
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <FiCheck className="w-4 h-4" />
                      <span className="text-sm font-medium">Money-Back Protection</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-600">
                      <HiShieldCheck className="w-4 h-4" />
                      <span className="text-sm font-medium">Secure Hold Until Receipt</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="credit-card"
                        checked={selectedPaymentMethod === "credit-card"}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700">Credit Card & Visa/MC</span>
                    </label>
                    
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="wire-transfer"
                        checked={selectedPaymentMethod === "wire-transfer"}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm font-medium text-gray-700">Wire Transfer To Trust Acct</span>
                    </label>
                  </div>
                </div>

                {/* Bank Transfer Option */}
                <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="bank-transfer"
                    checked={selectedPaymentMethod === "bank-transfer"}
                    onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600"
                  />
                  <div>
                    <div className="font-bold text-gray-900">Bank Transfer (T&T)</div>
                    <div className="text-sm text-gray-600">Direct Business-To-Business Transfer.</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Items & Delivery Options */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Items & Delivery Options</h2>
              </div>
              
              <div className="p-6">
                {/* Supplier Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <span className="text-gray-900 font-medium">Global Manufacturing</span>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-sm font-medium border border-blue-100 w-fit">
                      <HiShieldCheck className="w-3 h-3" />
                      <span>Verified Supplier</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-orange-500">★</span>
                    <span className="text-sm font-medium text-gray-700">4.8 Rating</span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product._id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 rounded-lg">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                        <img 
                          src={product.image || "/assets/images/earbuds.png"} 
                          alt={product.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {e.target.src = "https://placehold.co/64x64?text=Product"}}
                        />
                      </div>
                      <div className="flex-1 w-full">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h3 className="font-bold text-gray-900">{product.title}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mt-1">
                              <span>Quantity: {product.quantity}</span>
                              <span>Unit Price: ${product.pricePerUnit.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="font-bold text-gray-900">${(product.pricePerUnit * product.quantity).toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Payment Summary */}
                <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Item Total</span>
                    <span className="font-medium">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">${shipping}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-green-600">Escrow Fee Deduction</span>
                    <span className="font-medium text-green-600">-${escrowFeeDeduction}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t border-gray-200 pt-3">
                    <span>Grand Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-blue-600">
                    <span>Est. Net Payout</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Order Notes */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order Notes</label>
                  <textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add any special instructions or notes for your order..."
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-[380px]">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-bold text-gray-900">Order Summary ({products.length} Variation{products.length !== 1 ? 's' : ''})</h2>
              </div>
              
              <div className="p-6">
                {/* Product Preview */}
                <div className="mb-6 relative inline-block">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden border border-gray-200">
                    <img 
                      src={products[0]?.image || "/assets/images/earbuds.png"} 
                      alt="Item" 
                      className="w-full h-full object-cover"
                      onError={(e) => {e.target.src = "https://placehold.co/50x50?text=Item"}}
                    />
                  </div>
                  <span className="absolute -top-2 -right-2 bg-[#240457] text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-white">
                    {totalQuantity > 99 ? '99+' : totalQuantity}
                  </span>
                </div>

                {/* Summary Lines */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-gray-700">Subtotal <span className="text-gray-500 font-normal">({totalQuantity} Items)</span></span>
                    <span className="font-bold text-gray-900">${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-gray-700">Shipping <span className="text-gray-500 font-normal">(Estimated)</span></span>
                    <span className="font-bold text-gray-900">${shipping}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-gray-700">Shipping Discount <span className="text-gray-500 font-normal">(Estimated)</span></span>
                    <span className="font-bold text-gray-900">${shippingDiscount}</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <span className="font-bold text-blue-800">Total Estimated</span>
                    <span className="font-bold text-blue-800 text-lg">${total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-4 text-xs text-gray-500">
                  By placing this order, you agree to the <Link href="#" className="text-blue-600 underline">Trade Assurance Terms</Link> and the Supplier's warranty policy.
                </div>

                <button className="w-full bg-gray-300 text-gray-600 py-3 rounded-lg font-bold text-base cursor-not-allowed flex items-center justify-center gap-2">
                  <HiShieldCheck className="w-5 h-5" />
                  Place Order & Pay Securely
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
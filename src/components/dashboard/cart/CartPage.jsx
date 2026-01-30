"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiTrash2, FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import { HiShieldCheck } from "react-icons/hi";
import { RiMoneyDollarCircleLine, RiCustomerService2Line } from "react-icons/ri";
import { useCart } from "@/context/CartContext";
import productAPI from "@/services/productAPI";

const CartPage = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartProducts = async () => {
      if (cartItems.length === 0) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const productPromises = cartItems.map((item) =>
          productAPI.getById(item.productId)
        );
        const results = await Promise.all(productPromises);
        
        const productsWithQuantity = results.map((result, index) => ({
          ...result.data,
          quantity: cartItems[index].quantity,
        }));

        setProducts(productsWithQuantity);
      } catch (error) {
        console.error("Failed to fetch cart products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCartProducts();
  }, [cartItems.length]); // Only refetch when items are added/removed, not quantity changes

  const incrementQuantity = (productId) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
      // Update local products state immediately
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p._id === productId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    }
  };

  const decrementQuantity = (productId) => {
    const item = cartItems.find((i) => i.productId === productId);
    if (item && item.quantity > 1) {
      updateQuantity(productId, item.quantity - 1);
      // Update local products state immediately
      setProducts(prevProducts => 
        prevProducts.map(p => 
          p._id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    }
  };

  const calculateSubtotal = () => {
    return products.reduce((total, product) => {
      return total + (product.pricePerUnit * product.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 10;
  const shippingDiscount = 0;
  const total = subtotal + shipping - shippingDiscount;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <Link href="/dashboard/user/marketplace" className="text-blue-600 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

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
                <h2 className="text-lg font-bold text-gray-900">Shopping Cart ({products.length} {products.length === 1 ? 'Item' : 'Items'})</h2>
                <button className="text-blue-600 text-sm font-medium hover:underline">Edit</button>
              </div>
              
              <div className="p-6 space-y-6">
                {products.map((product) => (
                  <div key={product._id}>
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
                            <img 
                                src={product.image || "/assets/images/earbuds.png"} 
                                alt={product.title} 
                                className="w-full h-full object-cover"
                                onError={(e) => {e.target.src = "https://placehold.co/100x100?text=Product"}}
                            />
                        </div>

                        {/* Details */}
                        <div className="flex-1 w-full">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                                <div>
                                    <h3 className="text-base font-bold text-gray-900 mb-1">{product.title}</h3>
                                    <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                                        <div className="flex items-center gap-6 mt-4">
                                             <div className="flex items-center gap-2">
                                                <span className="text-gray-600">Quantity:</span>
                                                <div className="flex items-center border border-gray-200 rounded text-sm">
                                                    <button type="button" onClick={() => decrementQuantity(product._id)} className="px-2 py-1 text-gray-500 hover:bg-gray-50">-</button>
                                                    <input 
                                                        type="text" 
                                                        value={product.quantity} 
                                                        readOnly 
                                                        className="w-10 text-center py-1 text-gray-900 font-medium focus:outline-none"
                                                    />
                                                    <button type="button" onClick={() => incrementQuantity(product._id)} className="px-2 py-1 text-gray-500 hover:bg-gray-50">+</button>
                                                </div>
                                             </div>

                                             <div className="flex items-center gap-1 text-gray-600">
                                                <span>Unit Price:</span>
                                                <span className="font-medium text-gray-900">${product.pricePerUnit.toFixed(2)}</span>
                                             </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                  onClick={() => removeFromCart(product._id)}
                                  className="text-red-500 hover:bg-red-50 p-2 rounded transition-colors self-end sm:self-center"
                                >
                                    <FiTrash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                  </div>
                ))}
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
                                src={products[0]?.image || "/assets/images/earbuds.png"} 
                                alt="Item" 
                                className="w-full h-full object-cover"
                                onError={(e) => {e.target.src = "https://placehold.co/50x50?text=Item"}}
                            />
                        </div>
                        <span className="absolute -top-2 -right-2 bg-[#240457] text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                            {products.length}
                        </span>
                    </div>

                    {/* Summary Lines */}
                    <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                            <span className="font-bold text-gray-700">Subtotal <span className="text-gray-500 font-normal">({String(products.length).padStart(2, '0')} Items)</span></span>
                            <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold text-gray-700">Shipping <span className="text-gray-500 font-normal">(Estimated)</span></span>
                            <span className="font-bold text-gray-900">${shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="font-bold text-gray-700">Shipping Discount <span className="text-gray-500 font-normal">(Estimated)</span></span>
                            <span className="font-bold text-gray-900">${shippingDiscount.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4 mb-6">
                         <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                            <span className="font-bold text-blue-800">Total Estimated</span>
                            <span className="font-bold text-blue-800 text-lg">${total.toFixed(2)}</span>
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

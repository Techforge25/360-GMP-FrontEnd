"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiTrash2, FiMinus, FiPlus, FiCheck } from "react-icons/fi";
import { HiShieldCheck } from "react-icons/hi";
import {
  RiMoneyDollarCircleLine,
  RiCustomerService2Line,
} from "react-icons/ri";
import { useCart } from "@/context/CartContext";
import productAPI from "@/services/productAPI";

const CartPage = () => {
  const router = useRouter();
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [productsCache, setProductsCache] = useState({});
  const [loading, setLoading] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);

  // Memoized products from cache and cart items
  const products = useMemo(() => {
    return cartItems
      .map((item) => {
        const cachedProduct = productsCache[item.productId];
        return cachedProduct
          ? {
              ...cachedProduct,
              quantity: item.quantity,
            }
          : null;
      })
      .filter(Boolean);
  }, [cartItems, productsCache]);

  useEffect(() => {
    const fetchMissingProducts = async () => {
      if (cartItems.length === 0) {
        setLoading(false);
        setInitialLoad(false);
        return;
      }

      // Find products not in cache
      const missingProducts = cartItems.filter(
        (item) => !productsCache[item.productId],
      );

      if (missingProducts.length === 0) {
        if (initialLoad) {
          setLoading(false);
          setInitialLoad(false);
        }
        return;
      }

      try {
        if (initialLoad) setLoading(true);

        const productPromises = missingProducts.map((item) =>
          productAPI.getById(item.productId),
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
        setInitialLoad(false);
      }
    };

    fetchMissingProducts();
  }, [cartItems, productsCache, initialLoad]);

  const incrementQuantity = useCallback(
    (productId) => {
      const item = cartItems.find((i) => i.productId === productId);
      if (item) {
        updateQuantity(productId, item.quantity + 1);
      }
    },
    [cartItems, updateQuantity],
  );

  const decrementQuantity = useCallback(
    (productId) => {
      const item = cartItems.find((i) => i.productId === productId);
      if (item && item.quantity > 1) {
        updateQuantity(productId, item.quantity - 1);
      }
    },
    [cartItems, updateQuantity],
  );

  const handleRemoveProduct = useCallback(
    (productId) => {
      removeFromCart(productId);
    },
    [removeFromCart],
  );

  const calculateSubtotal = () => {
    return products.reduce((total, product) => {
      return total + product.pricePerUnit * product.quantity;
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

  if (cartItems.length === 0 || products.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h2>
          <Link
            href="/dashboard/user/marketplace"
            className="text-blue-600 hover:underline"
          >
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
        <div className="text-sm sm:text-sm text-gray-500 flex flex-wrap items-center gap-1.5">
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

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Column - Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 flex justify-between items-center bg-[#F8F9FB]">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Shopping Cart ({products.length}{" "}
                  {products.length === 1 ? "Item" : "Items"})
                </h2>
                <button className="text-blue-600 text-sm sm:text-sm font-medium hover:underline">
                  Edit
                </button>
              </div>

              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {products.map((product) => (
                  <div key={product._id}>
                    {/* Supplier Info */}
                    <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 text-[10px] sm:text-sm font-medium border border-blue-100">
                        <div className="w-3 h-3 bg-blue-600 rounded-full flex items-center justify-center">
                          <FiCheck className="w-2 h-2 text-white" />
                        </div>
                        verified supplier
                      </span>
                      <span className="text-gray-300 text-sm hidden sm:inline">
                        •
                      </span>
                      <div className="flex items-center gap-2 text-sm sm:text-sm text-gray-600">
                        <span>3 yrs</span>
                        <span className="text-gray-300">•</span>
                        <span>Global Manufacturing</span>
                      </div>
                    </div>

                    {/* Product Item */}
                    <div className="border border-gray-200 rounded-xl p-3 sm:p-4 flex gap-3 sm:gap-6 items-start bg-white hover:border-gray-300 transition-colors">
                      {/* Image */}
                      <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden relative border border-gray-100">
                        <img
                          src={product.image || "/assets/images/earbuds.png"}
                          alt={product.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/100x100?text=Product";
                          }}
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-2 sm:gap-4">
                          <div>
                            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">
                              {product.title}
                            </h3>
                            {/* Mobile: Unit price shown here */}
                            <div className="sm:hidden text-sm font-bold text-gray-900 mb-2">
                              ${product.pricePerUnit.toFixed(2)}
                            </div>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleRemoveProduct(product._id);
                            }}
                            className="text-gray-400 hover:text-red-500 p-1.5 -mr-2 -mt-2 sm:mr-0 sm:mt-0 rounded-lg hover:bg-red-50 transition-colors"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-1 sm:mt-2">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <span className="text-sm sm:text-sm text-gray-500 hidden sm:inline">
                                Qty:
                              </span>
                              <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 h-8 sm:h-9">
                                <button
                                  type="button"
                                  onClick={() => decrementQuantity(product._id)}
                                  className="w-8 sm:w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-l-lg transition-colors"
                                >
                                  <FiMinus className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                                <input
                                  type="text"
                                  value={product.quantity}
                                  readOnly
                                  className="w-8 sm:w-12 h-full text-center bg-transparent text-gray-900 font-medium text-sm sm:text-sm focus:outline-none border-x border-gray-200"
                                />
                                <button
                                  type="button"
                                  onClick={() => incrementQuantity(product._id)}
                                  className="w-8 sm:w-9 h-full flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 rounded-r-lg transition-colors"
                                >
                                  <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="hidden sm:flex items-center gap-1 text-gray-600">
                            <span className="text-sm sm:text-sm">
                              Unit Price:
                            </span>
                            <span className="font-bold text-gray-900 text-sm sm:text-base">
                              ${product.pricePerUnit.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-[380px] space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  Order Summary ({products.length}{" "}
                  {products.length === 1 ? "Variation" : "Variations"})
                </h2>
              </div>

              <div className="p-4 sm:p-6">
                {/* Tiny Product Preview */}
                <div className="mb-4 sm:mb-6 relative inline-block">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded overflow-hidden border border-gray-200">
                    <img
                      src={products[0]?.image || "/assets/images/earbuds.png"}
                      alt="Item"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/50x50?text=Item";
                      }}
                    />
                  </div>
                  <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-[#240457] text-white text-sm sm:text-sm font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {products.length}
                  </span>
                </div>

                {/* Summary Lines */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex justify-between text-sm sm:text-sm">
                    <span className="font-bold text-gray-700">
                      Subtotal{" "}
                      <span className="text-gray-500 font-normal">
                        ({String(products.length).padStart(2, "0")} Items)
                      </span>
                    </span>
                    <span className="font-bold text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-sm">
                    <span className="font-bold text-gray-700">
                      Shipping{" "}
                      <span className="text-gray-500 font-normal">
                        (Estimated)
                      </span>
                    </span>
                    <span
                      className="font-bold text-gray-900 block truncate max-w-[80px] sm:max-w-none text-right"
                      title={`$${shipping.toFixed(2)}`}
                    >
                      ${shipping.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-sm">
                    <span className="font-bold text-gray-700">
                      Shipping Discount{" "}
                      <span className="text-gray-500 font-normal">
                        (Estimated)
                      </span>
                    </span>
                    <span className="font-bold text-gray-900">
                      ${shippingDiscount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
                  <div className="flex justify-between items-center bg-blue-50 p-2.5 sm:p-3 rounded-lg border border-blue-100">
                    <span className="font-bold text-blue-800 text-sm sm:text-base">
                      Total Estimated
                    </span>
                    <span className="font-bold text-blue-800 text-base sm:text-lg">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Link
                  href="/dashboard/user/checkout"
                  className="block w-full text-center bg-[#110026] text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-[#2a0b4d] transition-colors"
                >
                  Check Out
                </Link>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="space-y-4 sm:space-y-6 px-2">
              <div className="flex gap-3">
                <div className="shrink-0 mt-0.5 sm:mt-1">
                  <HiShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5 sm:mb-1">
                    Secure payments
                  </h3>
                  <p className="text-sm sm:text-sm text-gray-500 leading-relaxed">
                    Escrow Protection Assurance: Full B2B protection benefits
                    are exclusively provided for orders successfully placed and
                    paid through the secure 360GMP Escrow Service.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="shrink-0 mt-0.5 sm:mt-1">
                  <RiMoneyDollarCircleLine className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5 sm:mb-1">
                    Money-back protection
                  </h3>
                  <p className="text-sm sm:text-sm text-gray-500 leading-relaxed">
                    360GMP Order Protection: Claim a full refund if your goods
                    were not shipped, are missing, or arrive with verified
                    quality or product defects
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="shrink-0 mt-0.5 sm:mt-1">
                  <RiCustomerService2Line className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm mb-0.5 sm:mb-1">
                    24/7 support
                  </h3>
                  <p className="text-sm sm:text-sm text-gray-500 leading-relaxed">
                    Dedicated Global Support: Access our comprehensive virtual
                    help center 24/7 or connect with a live B2B support agent
                    for immediate assistance.
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

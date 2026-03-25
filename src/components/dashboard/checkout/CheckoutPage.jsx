"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiLock, FiGlobe, FiChevronDown, FiCheck, FiArrowRight } from "react-icons/fi";
import { HiShieldCheck, HiOutlineShieldCheck } from "react-icons/hi";
import { RiMoneyDollarCircleLine, RiCustomerService2Line } from "react-icons/ri";
import { useCart } from "@/context/CartContext";
import productAPI from "@/services/productAPI";
import DashboardFooter from "../DashboardFooter";
import axios from "axios"
import { toast } from "react-toastify";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutSchema } from "@/validations/cart";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const [productsCache, setProductsCache] = useState({});
  const [loading, setLoading] = useState(true);
  // Form State

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(checkoutSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      country: "United States",
      fullName: "",
      phone1: "",
      lineAddress1: "",
      lineAddress2: "",
      state: "",
      zipCode: "",
      isDefault: true,
    },
  });

  const [submitting, setSubmitting] = useState(false);

  const normalizedCart = cartItems.map((item) => {
    if (item.isTierSelected && item.selectedTier) {
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.selectedTier.price * Number(item.selectedTier.qty), // total price
        addedAt: item.addedAt,
      };
    } else {
      return {
        productId: item.productId,
        quantity: Number(item.quantity),
        price: item.price * Number(item.quantity),
        addedAt: item.addedAt,
      };
    }
  });
  console.log(normalizedCart, "normalized art")
  console.log(cartItems, "cart items")
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const onSubmit = async (data) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const res = await axios.post(
        `${API_URL}/orders/stripe`,
        {
          shippingAddress: {
            name: data.fullName,
            phone: data.phone1,
            lineAddress: [
              data.lineAddress1,
              data.lineAddress2,
            ].filter(Boolean),
            province: data.state,
            postalCode: data.zipCode,
          },
          items: normalizedCart,
        },
        { withCredentials: true }
      );

      const response = res.data?.data;

      if (response) {
        localStorage.removeItem("cart");
        window.location.href = response;
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message ||
        err.message ||
        "Something went wrong"
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Memoized products from cache and cart items
  const products = useMemo(() => {
    return cartItems.map(item => {
      const cachedProduct = productsCache[item.productId];
      return cachedProduct ? {
        ...cachedProduct,
        quantity: Number(item.quantity)
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
    return normalizedCart.reduce((total, product) => {
      return total + product.price;
    }, 0);
  };
  const subtotal = calculateSubtotal();
  const shipping = 10;
  const shippingDiscount = 0;
  const total = subtotal;

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
          <p className="text-gray-600 mb-6">Please add items to your cart before proceeding to checkout.</p>
          <Link href="/dashboard/user/marketplace" className="bg-[#240457] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2a0b4d] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // if (isPaid) {
  //   return (
  //     <div className="bg-[#FAFBFD] min-h-screen flex flex-col">
  //       {/* Main Content Area */}
  //       <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
  //         {/* Top Icon Area */}
  //         <div className="w-24 h-24 bg-[#E8F6ED] rounded-full flex items-center justify-center mb-6 mt-auto">
  //           <HiOutlineShieldCheck className="w-12 h-12 text-[#139D4C]" strokeWidth={1.5} />
  //         </div>

  //         {/* Title & Subtitle */}
  //         <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
  //           Payment Secured in Escrow
  //         </h1>
  //         <p className="text-gray-600 text-center max-w-2xl mb-12 text-base sm:text-lg">
  //           Great news! We&apos;ve secured your funds. The seller has been notified to prepare your shipment.{" "}
  //           <br className="hidden sm:inline" />
  //           Funds will only be released once you confirm delivery.
  //         </p>

  //         {/* Escrow Status Card */}
  //         <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 w-full max-w-lg overflow-hidden mb-auto">
  //           {/* Order Reference */}
  //           <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
  //             <span className="text-gray-900 font-bold text-base">Order Reference</span>
  //             <span className="text-gray-900 font-bold text-base"># 39201</span>
  //           </div>

  //           {/* Step Features */}
  //           <div className="p-6 space-y-6">
  //             <div className="flex gap-4 items-start">
  //               <div className="shrink-0 mt-0.5">
  //                 <div className="w-6 h-6 rounded-full border-[1.5px] border-[#139D4C] flex items-center justify-center">
  //                   <FiCheck className="w-3.5 h-3.5 text-[#139D4C]" strokeWidth={2.5} />
  //                 </div>
  //               </div>
  //               <div>
  //                 <h3 className="text-gray-800 font-semibold mb-1">Payment Verified</h3>
  //                 <p className="text-gray-500 text-sm">Your card was successfully charged.</p>
  //               </div>
  //             </div>

  //             <div className="flex gap-4 items-start">
  //               <div className="shrink-0 mt-0.5">
  //                 <HiOutlineShieldCheck className="w-6 h-6 text-[#139D4C]" strokeWidth={2} />
  //               </div>
  //               <div>
  //                 <h3 className="text-gray-800 font-semibold mb-1">Funds Locked</h3>
  //                 <p className="text-gray-500 text-sm">Money is currently in 360 Safe Vault.</p>
  //               </div>
  //             </div>
  //           </div>

  //           {/* Action Buttons */}
  //           <div className="px-6 py-5 border-t border-gray-100 flex gap-4">
  //             <Link
  //               href="/dashboard/user"
  //               className="flex-1 text-center py-2.5 px-4 border border-gray-200 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 hover:text-gray-900 transition-colors"
  //             >
  //               Back to Home
  //             </Link>
  //             <Link
  //               href={`/dashboard/user/orders/`}
  //               className="flex-1 flex items-center justify-center gap-2 bg-[#139D4C] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#0f843f] transition-colors shadow-sm"
  //             >
  //               Track Order <FiArrowRight className="w-4.5 h-4.5" />
  //             </Link>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Footer */}
  //       <DashboardFooter />
  //     </div>
  //   );
  // }

  console.log(products, "products")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
          <span>Marketplace</span>
          <span>&gt;</span>
          <span>Category</span>
          <span>&gt;</span>
          <span>Product Detail</span>
          <span>&gt;</span>
          <span>Cart</span>
          <span>&gt;</span>
          <span className="text-gray-900 font-medium">Check Out</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Shipping Address */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#F8F9FB]">
                <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>
                <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-2">
                  Use My Current Location
                  <FiGlobe className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                {/* Security Banner */}
                <div className="bg-[#E8F8EE] text-[#008A2E] px-4 py-3 rounded-lg flex items-center gap-2 mb-6">
                  <FiLock className="w-4 h-4" />
                  <span className="text-sm font-medium">your information is encrypted and secure</span>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pb-6">

                  {/* Full Name + Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Full Name */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Full Name
                      </label>

                      <input
                        type="text"
                        {...register("fullName")}
                        className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
                      />

                      <p className="text-red-500 text-xs mt-1">
                        {errors.fullName?.message}
                      </p>
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Phone
                      </label>

                      <Controller
                        name="phone1"
                        control={control}
                        render={({ field }) => (
                          <PhoneInput
                            {...field}
                            international
                            defaultCountry="PK"
                            placeholder="Phone Number *"

                            numberInputProps={{
                              className:
                                "flex-1 text-black px-4 py-3 text-sm focus:outline-none placeholder-gray-400",
                            }}

                            countrySelectProps={{
                              className:
                                "bg-gray-50 border-r border-gray-200 px-3 py-3 text-sm text-gray-700 min-w-[70px] flex items-center justify-center hover:bg-gray-100 transition-colors",
                            }}

                            className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#240457]"

                            aria-label="Phone number with country code"
                          />
                        )}
                      />

                      <p className="text-red-500 text-xs mt-1">
                        {errors.phone1?.message}
                      </p>

                      <p className="text-sm text-gray-400 mt-1">
                        Only Used To Contact You For Delivery Updates
                      </p>
                    </div>
                  </div>

                  {/* Line Address 1 + 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Line Address 1 */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Line Address 1
                      </label>

                      <input
                        type="text"
                        {...register("lineAddress1")}
                        placeholder="Line Address 1 *"
                        className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
                      />

                      <p className="text-red-500 text-xs mt-1">
                        {errors.lineAddress1?.message}
                      </p>
                    </div>

                    {/* Line Address 2 */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Line Address 2
                      </label>

                      <input
                        type="text"
                        {...register("lineAddress2")}
                        placeholder="Line Address 2 (optional)"
                        className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
                      />

                      <p className="text-red-500 text-xs mt-1">
                        {errors.lineAddress2?.message}
                      </p>
                    </div>
                  </div>

                  {/* State + Zip */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* State */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        State/Province
                      </label>

                      <input
                        type="text"
                        {...register("state")}
                        placeholder="State/Province *"
                        className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
                      />

                      <p className="text-red-500 text-xs mt-1">
                        {errors.state?.message}
                      </p>
                    </div>

                    {/* Zip */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Zip/Postal Code
                      </label>

                      <input
                        type="text"
                        {...register("zipCode")}
                        placeholder="e.g 2000 *"
                        className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
                      />

                      <p className="text-red-500 text-xs mt-1">
                        {errors.zipCode?.message}
                      </p>
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        {...register("isDefault")}
                        id="default-address"
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:bg-[#004D99] checked:border-[#004D99] transition-all"
                      />

                      <FiCheck className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 w-3.5 h-3.5" />
                    </div>

                    <label
                      htmlFor="default-address"
                      className="text-sm text-gray-500 cursor-pointer"
                    >
                      Set As Default Shipping Address
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting || loading || !isValid}
                    className={`block mt-6 w-full text-center py-3 rounded-lg font-medium text-base transition-colors
    ${submitting || loading || !isValid
                        ? "bg-gray-400 cursor-not-allowed opacity-60"
                        : "bg-[#240457] hover:bg-[#2a0b4d] text-white"
                      }
  `}
                  >
                    {submitting ? "Processing..." : "Continue To Payment"}
                  </button>
                </form>

              </div>
            </div>

          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-[380px] space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 pt-4">
                <h2 className="text-lg font-bold text-gray-900">Order Summary ({products.length} {products.length === 1 ? 'Variation' : 'Variations'})</h2>
              </div>

              <div className="p-6">
                {/* Tiny Product Preview */}
                <div className="flex gap-3">
                  {products?.map((product, index) => {
                    return (
                      <div key={index} className="mb-6 relative inline-block">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={product?.image || "/assets/images/earbuds.png"}
                            alt="Item"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = "https://placehold.co/50x50?text=Item" }}
                          />
                        </div>
                        <span className="absolute -top-2 -right-1 bg-[#240457] text-white text-xs font-semibold w-6 h-5 flex items-center justify-center rounded-full ">
                          {product.quantity}
                        </span>
                      </div>
                    )
                  })}
                </div>


                {/* Summary Lines */}
                <div className="space-y-3 mb-6 border border-[#240457] rounded-xl bg-gray-100 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-gray-700">Subtotal <span className="text-gray-500 font-normal">({String(products.length).padStart(2, '0')}Items)</span></span>
                    <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-gray-700">Shipping <span className="text-gray-500 font-normal">(Estimated)</span></span>
                    <span className="font-semibold text-gray-900">$0</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-gray-700">Shipping Discount <span className="text-gray-500 font-normal">(Estimated)</span></span>
                    <span className="font-semibold text-gray-900">$0.00</span>
                  </div>
                  <div className="border-t border-gray-400 pt-4">
                    <div className="flex justify-between items-center bg-blue-100 p-3 rounded-lg border border-[#185ADB]">
                      <span className="font-medium text-sm text-blue-800">Total Estimated</span>
                      <span className="font-semibold text-sm text-blue-800">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

              </div>
              {/* Trust Signals */}
              <div className="space-y-6 px-6">
                <div className="flex gap-3">
                  <div className="shrink-0 mt-1">
                    <Image src={"/assets/icon/escro-1.svg"} width={20} height={24.69} alt="icon" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Secure payments</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Escrow Protection Assurance: Full B2B protection benefits are exclusively provided for orders successfully placed and paid through the secure 360GMP Escrow Service.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="shrink-0 mt-1">
                    <Image src={"/assets/icon/escro-2.svg"} width={20} height={24.69} alt="icon" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">Money-back protection</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      360GMP Order Protection: Claim a full refund if your goods were not shipped, are missing, or arrive with verified quality or product defects
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pb-4">
                  <div className="shrink-0 mt-1">
                    <Image src={"/assets/icon/escro-3.svg"} width={20} height={24.69} alt="icon" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">24/7 support</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      Dedicated Global Support: Access our comprehensive virtual help center 24/7 or connect with a live B2B support agent for immediate assistance.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="pt-24">
        <DashboardFooter />
      </div>
    </div>
  );
};

export default CheckoutPage;

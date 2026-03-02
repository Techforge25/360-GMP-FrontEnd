"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image"; // Kept for consistency if migrated later, using img for now as per instructions preference
import { FiLock, FiGlobe, FiChevronDown, FiCheck, FiArrowRight } from "react-icons/fi";
import { HiShieldCheck, HiOutlineShieldCheck } from "react-icons/hi";
import { RiMoneyDollarCircleLine, RiCustomerService2Line } from "react-icons/ri";
import { useCart } from "@/context/CartContext";
import productAPI from "@/services/productAPI";
import DashboardFooter from "../DashboardFooter";
import axios from "axios"
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const [productsCache, setProductsCache] = useState({});
  const [loading, setLoading] = useState(true);
  const [isPaid, setIsPaid] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    country: "United State",
    fullName: "",
    phone1: "",
    streetAddress: "",
    phone2: "", // The second phone field from the screenshot
    state: "",
    zipCode: "",
    isDefault: true,
  });

  const [submitting, setSubmitting] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  // Simple validation (add more if needed)
  // if (!formData.fullName || !formData.phone1 || !formData.streetAddress || !formData.state || !formData.zipCode) {
  //   alert("Please fill all required shipping fields");
  //   return;
  // }


  const handleSubmit = async () => {
    if (submitting) return;


    setSubmitting(true);

 try {
  const res = await axios.post(`${API_URL}/orders/stripe`, {
    shippingAddress: {
      name: formData.fullName,
      phone: formData.phone1,
      lineAddress: [formData.lineAddress1, formData.lineAddress2 || ''],
      province: formData.state,
      postalCode: formData.zipCode,
    },
    items: cartItems, // [{ productId, quantity }]
  }, { withCredentials:true });

      const data = await res.data.data;

      if (data) {
        window.location.href = data; // redirect to Stripe Checkout
      } else {
        toast.error("Error creating session");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment setup failed");
    } finally {
      setSubmitting(false);
    }
  };


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('success')) {
      setIsPaid(true);
      // Optional: clear cart, save order to DB via another API call
    }
  }, []);



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

  const subtotal = calculateSubtotal();
  const shipping = 10;
  const shippingDiscount = 0;
  const total = subtotal + shipping - shippingDiscount;

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
          <p className="text-gray-600 mb-6">Please add items to your cart before proceeding to checkout.</p>
          <Link href="/dashboard/user/marketplace" className="bg-[#240457] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2a0b4d] transition-colors">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (isPaid) {
    return (
      <div className="bg-[#FAFBFD] min-h-screen flex flex-col">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
          {/* Top Icon Area */}
          <div className="w-24 h-24 bg-[#E8F6ED] rounded-full flex items-center justify-center mb-6 mt-auto">
            <HiOutlineShieldCheck className="w-12 h-12 text-[#139D4C]" strokeWidth={1.5} />
          </div>

          {/* Title & Subtitle */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 text-center">
            Payment Secured in Escrow
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mb-12 text-base sm:text-lg">
            Great news! We&apos;ve secured your funds. The seller has been notified to prepare your shipment.{" "}
            <br className="hidden sm:inline" />
            Funds will only be released once you confirm delivery.
          </p>

          {/* Escrow Status Card */}
          <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.04)] border border-gray-100 w-full max-w-lg overflow-hidden mb-auto">
            {/* Order Reference */}
            <div className="px-6 py-5 border-b border-gray-100 flex justify-between items-center">
              <span className="text-gray-900 font-bold text-base">Order Reference</span>
              <span className="text-gray-900 font-bold text-base"># 39201</span>
            </div>

            {/* Step Features */}
            <div className="p-6 space-y-6">
              <div className="flex gap-4 items-start">
                <div className="shrink-0 mt-0.5">
                  <div className="w-6 h-6 rounded-full border-[1.5px] border-[#139D4C] flex items-center justify-center">
                    <FiCheck className="w-3.5 h-3.5 text-[#139D4C]" strokeWidth={2.5} />
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-800 font-semibold mb-1">Payment Verified</h3>
                  <p className="text-gray-500 text-sm">Your card was successfully charged.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="shrink-0 mt-0.5">
                  <HiOutlineShieldCheck className="w-6 h-6 text-[#139D4C]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-gray-800 font-semibold mb-1">Funds Locked</h3>
                  <p className="text-gray-500 text-sm">Money is currently in 360 Safe Vault.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-5 border-t border-gray-100 flex gap-4">
              <Link
                href="/dashboard/user"
                className="flex-1 text-center py-2.5 px-4 border border-gray-200 rounded-lg text-gray-700 font-semibold hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                Back to Home
              </Link>
              <Link
                href="/dashboard/user/orders/39201"
                className="flex-1 flex items-center justify-center gap-2 bg-[#139D4C] text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-[#0f843f] transition-colors shadow-sm"
              >
                Track Order <FiArrowRight className="w-4.5 h-4.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <DashboardFooter />
      </div>
    );
  }

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
                <div className="space-y-6 pb-6">
                  {/* Country/Region */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Country/Region
                    </label>
                    <div className="relative">
                      <div className="w-full border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between bg-white cursor-pointer hover:border-gray-300 transition-colors">
                        <div className="flex items-center gap-3">
                          <img
                            src="https://flagcdn.com/w40/us.png"
                            alt="US"
                            className="w-6 h-4 object-cover rounded-sm"
                          />
                          <span className="text-sm text-gray-700">United State</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Row 1: Full Name & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name *"
                        className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Phone
                      </label>
                      <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#240457]">
                        <div className="px-3 py-3 bg-gray-50 border-r border-gray-200 text-sm text-gray-500">
                          +1
                        </div>
                        <input
                          type="text"
                          name="phone1"
                          placeholder="Phone Number *"
                          value={formData.phone1}
                          onChange={handleChange}
                          className="flex-1 text-black px-4 py-3 text-sm focus:outline-none placeholder-gray-400"
                        />
                      </div>
                      <p className="text-sm text-gray-400 mt-1">Only Used To Contact You For Delivery Updates</p>
                    </div>
                  </div>

                  {/* Row 2: Street Address & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Line Address 1
                      </label>
                      <input
                        type="text"
                        name="lineAddress1"
                        placeholder="Line Address 1 *"
                        value={formData.lineAddress1}
                        onChange={handleChange}
                        className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Line Address 2
                      </label>
                      <input
                        type="text"
                        name="lineAddress2"
                        placeholder="Line Address 2 *"
                        value={formData.lineAddress2}
                        onChange={handleChange}
                        className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Row 3: State/Province & Zip/Postal Code */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        State/Province
                      </label>
                      <input
                        type="text"
                        placeholder="State/Province *"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Zip/Postal Code
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="e.g 2000*"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
                      />
                    </div>
                  </div>

                  {/* Checkbox */}
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center">
                      <input
                        type="checkbox"
                        id="default-address"
                        // checked={formData.isDefault}
                        // onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                        className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:bg-[#004D99] checked:border-[#004D99] transition-all"
                      />
                      <FiCheck className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 w-3.5 h-3.5" />
                    </div>
                    <label htmlFor="default-address" className="text-sm text-gray-500 cursor-pointer">
                      Set As Default Shipping Address
                    </label>
                  </div>

                </div>

              </div>
            </div>
           <button
            onClick={handleSubmit}
            disabled={submitting || loading}
            className="block mt-6 w-full text-center bg-[#240457] text-white py-3 rounded-lg font-medium text-base hover:bg-[#2a0b4d] transition-colors disabled:opacity-50"
          >
            {submitting ? "Processing..." : "Continue To Payment"}
          </button>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-[380px] space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="px-6 pt-4">
                <h2 className="text-lg font-bold text-gray-900">Order Summary ({products.length} {products.length === 1 ? 'Variation' : 'Variations'})</h2>
              </div>

              <div className="p-6">
                {/* Tiny Product Preview */}
                <div className="mb-6 relative inline-block">
                  <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                    <img
                      src={products[0]?.image || "/assets/images/earbuds.png"}
                      alt="Item"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = "https://placehold.co/50x50?text=Item" }}
                    />
                  </div>
                  <span className="absolute -top-2 -right-1 bg-[#240457] text-white text-xs font-semibold w-6 h-5 flex items-center justify-center rounded-full ">
                    {products.length}
                  </span>
                </div>

                {/* Summary Lines */}
                <div className="space-y-3 mb-6 border border-[#240457] rounded-xl bg-gray-100 p-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-gray-700">Subtotal <span className="text-gray-500 font-normal">({String(products.length).padStart(2, '0')}Items)</span></span>
                    <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-gray-700">Shipping <span className="text-gray-500 font-normal">(Estimated)</span></span>
                    <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-gray-700">Shipping Discount <span className="text-gray-500 font-normal">(Estimagted)</span></span>
                    <span className="font-semibold text-gray-900">${shippingDiscount.toFixed(2)}</span>
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
                    <HiShieldCheck className="w-6 h-6 text-purple-600" />
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
                    <RiMoneyDollarCircleLine className="w-6 h-6 text-purple-600" />
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
                    <RiCustomerService2Line className="w-6 h-6 text-purple-600" />
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

// "use client";
// import React, { useEffect, useMemo, useState } from "react";
// import DashboardFooter from "@/components/dashboard/DashboardFooter";
// import { useRouter } from "next/navigation";
// import { FiArrowLeft, FiCalendar, FiCheck, FiDownload, FiStar, FiUser, FiCreditCard, FiClock, FiGlobe, FiLock } from "react-icons/fi";
// import { HiOutlineDocumentText, HiShieldCheck } from "react-icons/hi";
// import { TbTruckDelivery } from "react-icons/tb";
// import { BiCube } from "react-icons/bi";
// import { BsBoxSeam } from "react-icons/bs";
// import { IoShieldCheckmarkOutline } from "react-icons/io5";
// import { MdVerified } from "react-icons/md";
// import { useCart } from "@/context/CartContext";
// import { RiCustomerService2Line, RiMoneyDollarCircleLine } from "react-icons/ri";

// const steps = [
//     { label: "Order Placed", date: "Oct 24, 2025", icon: HiOutlineDocumentText },
//     { label: "prepare shipment", date: "Oct 25, 2025", icon: IoShieldCheckmarkOutline },
//     { label: "Shipped", date: "Oct 26, 2025", icon: TbTruckDelivery },
//     { label: "Delivered", date: "Oct 27, 2025", icon: BsBoxSeam },
//     { label: "Completed", date: "Oct 28, 2025", icon: FiCheck },
// ];

// const CheckoutPage = ({ orderId }) => {
//     const router = useRouter();
//     const [activeStep, setActiveStep] = useState(0);
//     const [isShippingFormOpen, setIsShippingFormOpen] = useState(false);
//     const [isShipped, setIsShipped] = useState(false);
//     const [isDelivered, setIsDelivered] = useState(false);
//     const [isCompleted, setIsCompleted] = useState(false);
//     const [showFinalCompletedUI, setShowFinalCompletedUI] = useState(false);
//     const [isRemainderSent, setIsRemainderSent] = useState(false);
//     const [isTracking, setIsTracking] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const { cartItems } = useCart();
//     const [productsCache, setProductsCache] = useState({});
  

    
//   // Form State
//   const [formData, setFormData] = useState({
    
//     country: "United State",
//     fullName: "",
//     phone1: "",
//     streetAddress: "",
//     phone2: "", // The second phone field from the screenshot
//     state: "",
//     zipCode: "",
//     isDefault: true,
//   });

//   const [submitting, setSubmitting] = useState(false);


//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
//   // Simple validation (add more if needed)
//   // if (!formData.fullName || !formData.phone1 || !formData.streetAddress || !formData.state || !formData.zipCode) {
//   //   alert("Please fill all required shipping fields");
//   //   return;
//   // }


//   const handleSubmit = async () => {
//     if (submitting) return;


//     setSubmitting(true);

//  try {
//   const res = await axios.post(`${API_URL}/orders/stripe`, {
//     shippingAddress: {
//       name: formData.fullName,
//       phone: formData.phone1,
//       lineAddress: [formData.lineAddress1, formData.lineAddress2 || ''],
//       province: formData.state,
//       postalCode: formData.zipCode,
//     },
//     items: cartItems, // [{ productId, quantity }]
//   }, { withCredentials:true });

//       const data = await res.data.data;

//       if (data) {
//         window.location.href = data; // redirect to Stripe Checkout
//       } else {
//         toast.error("Error creating session");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Payment setup failed");
//     } finally {
//       setSubmitting(false);
//     }
//   };


//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     if (urlParams.has('success')) {
//       setIsPaid(true);
//       // Optional: clear cart, save order to DB via another API call
//     }
//   }, []);



//   // Memoized products from cache and cart items
//   const products = useMemo(() => {
//     return cartItems.map(item => {
//       const cachedProduct = productsCache[item.productId];
//       return cachedProduct ? {
//         ...cachedProduct,
//         quantity: item.quantity
//       } : null;
//     }).filter(Boolean);
//   }, [cartItems, productsCache]);

//   useEffect(() => {
//     const fetchCartProducts = async () => {
//       if (cartItems.length === 0) {
//         setLoading(false);
//         return;
//       }

//       // Find products not in cache
//       const missingProducts = cartItems.filter(item => !productsCache[item.productId]);

//       if (missingProducts.length === 0) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const productPromises = missingProducts.map((item) =>
//           productAPI.getById(item.productId)
//         );
//         const results = await Promise.all(productPromises);

//         // Update cache with new products
//         const newCache = { ...productsCache };
//         results.forEach((result, index) => {
//           if (result.data) {
//             newCache[missingProducts[index].productId] = result.data;
//           }
//         });

//         setProductsCache(newCache);
//       } catch (error) {
//         console.error("Failed to fetch cart products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCartProducts();
//   }, [cartItems, productsCache]);

//  // Calculate totals
//   const calculateSubtotal = () => {
//     return products.reduce((total, product) => {
//       return total + (product.pricePerUnit * product.quantity);
//     }, 0);
//   };

//   const subtotal = calculateSubtotal();
//   const shipping = 10;
//   const shippingDiscount = 0;
//   const total = subtotal + shipping - shippingDiscount;

//     const handleTracking = () => {
//         setIsTracking(true);
//         setActiveStep(1)
//     }

//     const handleSubmitDetails = () => {
//         setIsShippingFormOpen(false);
//         setIsShipped(true);
//         setActiveStep(2);
//     };

//     const handleMarkAsShipped = () => {
//         setIsShipped(false);
//         setIsDelivered(true);
//         setActiveStep(3);
//     };

//     const handleSendRemainder = () => {
//         setIsRemainderSent(true);
//     };

//     const handleMarkAsCompleted = () => {
//         setIsDelivered(false);
//         setIsCompleted(true);
//         setShowFinalCompletedUI(true);
//         setActiveStep(4);
//     };

//     return (
//         <div className="bg-[#FAFBFD] min-h-screen flex flex-col font-sans">
          
          
//             <div className="grow max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-18">

//                 {/* Back Button */}
//                 <button
//                     onClick={() => router.back()}
//                     className="flex items-center text-sm font-semibold text-gray-700 hover:text-gray-900 mb-6 transition-colors"
//                 >
//                     <FiArrowLeft className="w-4 h-4 mr-2" />
//                     Back
//                 </button>



//   <div className="min-h-screen bg-gray-50">
//       {/* Breadcrumb */}
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <div className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
//           <span>Marketplace</span>
//           <span>&gt;</span>
//           <span>Category</span>
//           <span>&gt;</span>
//           <span>Product Detail</span>
//           <span>&gt;</span>
//           <span>Cart</span>
//           <span>&gt;</span>
//           <span className="text-gray-900 font-medium">Check Out</span>
//         </div>
//       </div>

//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row gap-8">
            
//           {/* Left Column - Shipping Address */}
//           <div className="flex-1">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               {/* Header */}
//               <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#F8F9FB]">
//                 <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>
//                 <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-2">
//                   Use My Current Location
//                   <FiGlobe className="w-4 h-4" />
//                 </button>
//               </div>

//               <div className="p-6">
//                 {/* Security Banner */}
//                 <div className="bg-[#E8F8EE] text-[#008A2E] px-4 py-3 rounded-lg flex items-center gap-2 mb-6">
//                   <FiLock className="w-4 h-4" />
//                   <span className="text-sm font-medium">your information is encrypted and secure</span>
//                 </div>

//                 {/* Form */}
//                 <div className="space-y-6 pb-6">
//                   {/* Country/Region */}
//                   <div>
//                     <label className="block text-sm font-bold text-gray-900 mb-2">
//                       Country/Region
//                     </label>
//                     <div className="relative">
//                       <div className="w-full border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between bg-white cursor-pointer hover:border-gray-300 transition-colors">
//                         <div className="flex items-center gap-3">
//                           <img
//                             src="https://flagcdn.com/w40/us.png"
//                             alt="US"
//                             className="w-6 h-4 object-cover rounded-sm"
//                           />
//                           <span className="text-sm text-gray-700">United State</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Row 1: Full Name & Phone */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-bold text-gray-900 mb-2">
//                         Full Name
//                       </label>
//                       <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         placeholder="Full Name *"
//                         className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-gray-900 mb-2">
//                         Phone
//                       </label>
//                       <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#240457]">
//                         <div className="px-3 py-3 bg-gray-50 border-r border-gray-200 text-sm text-gray-500">
//                           +1
//                         </div>
//                         <input
//                           type="text"
//                           name="phone1"
//                           placeholder="Phone Number *"
//                           value={formData.phone1}
//                           onChange={handleChange}
//                           className="flex-1 text-black px-4 py-3 text-sm focus:outline-none placeholder-gray-400"
//                         />
//                       </div>
//                       <p className="text-sm text-gray-400 mt-1">Only Used To Contact You For Delivery Updates</p>
//                     </div>
//                   </div>

//                   {/* Row 2: Street Address & Phone */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-bold text-gray-900 mb-2">
//                         Line Address 1
//                       </label>
//                       <input
//                         type="text"
//                         name="lineAddress1"
//                         placeholder="Line Address 1 *"
//                         value={formData.lineAddress1}
//                         onChange={handleChange}
//                         className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-gray-900 mb-2">
//                         Line Address 2
//                       </label>
//                       <input
//                         type="text"
//                         name="lineAddress2"
//                         placeholder="Line Address 2 *"
//                         value={formData.lineAddress2}
//                         onChange={handleChange}
//                         className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
//                       />
//                     </div>
//                   </div>

//                   {/* Row 3: State/Province & Zip/Postal Code */}
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-sm font-bold text-gray-900 mb-2">
//                         State/Province
//                       </label>
//                       <input
//                         type="text"
//                         placeholder="State/Province *"
//                         name="state"
//                         value={formData.state}
//                         onChange={handleChange}
//                         className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-gray-900 mb-2">
//                         Zip/Postal Code
//                       </label>
//                       <input
//                         type="text"
//                         name="zipCode"
//                         placeholder="e.g 2000*"
//                         value={formData.zipCode}
//                         onChange={handleChange}
//                         className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
//                       />
//                     </div>
//                   </div>

//                   {/* Checkbox */}
//                   <div className="flex items-center gap-2">
//                     <div className="relative flex items-center">
//                       <input
//                         type="checkbox"
//                         id="default-address"
//                         // checked={formData.isDefault}
//                         // onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
//                         className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:bg-[#004D99] checked:border-[#004D99] transition-all"
//                       />
//                       <FiCheck className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 w-3.5 h-3.5" />
//                     </div>
//                     <label htmlFor="default-address" className="text-sm text-gray-500 cursor-pointer">
//                       Set As Default Shipping Address
//                     </label>
//                   </div>

//                 </div>

//               </div>
//             </div>
//            <button
//             onClick={handleSubmit}
//             disabled={submitting || loading}
//             className="block mt-6 w-full text-center bg-[#240457] text-white py-3 rounded-lg font-medium text-base hover:bg-[#2a0b4d] transition-colors disabled:opacity-50"
//           >
//             {submitting ? "Processing..." : "Continue To Payment"}
//           </button>
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className="w-full lg:w-[380px] space-y-6">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//               <div className="px-6 pt-4">
//                 <h2 className="text-lg font-bold text-gray-900">Order Summary ({products.length} {products.length === 1 ? 'Variation' : 'Variations'})</h2>
//               </div>

//               <div className="p-6">
//                 {/* Tiny Product Preview */}
//                 <div className="mb-6 relative inline-block">
//                   <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
//                     <img
//                       src={products[0]?.image || "/assets/images/earbuds.png"}
//                       alt="Item"
//                       className="w-full h-full object-cover"
//                       onError={(e) => { e.target.src = "https://placehold.co/50x50?text=Item" }}
//                     />
//                   </div>
//                   <span className="absolute -top-2 -right-1 bg-[#240457] text-white text-xs font-semibold w-6 h-5 flex items-center justify-center rounded-full ">
//                     {products.length}
//                   </span>
//                 </div>

//                 {/* Summary Lines */}
//                 <div className="space-y-3 mb-6 border border-[#240457] rounded-xl bg-gray-100 p-4">
//                   <div className="flex justify-between text-sm">
//                     <span className="font-semibold text-gray-700">Subtotal <span className="text-gray-500 font-normal">({String(products.length).padStart(2, '0')}Items)</span></span>
//                     <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="font-semibold text-gray-700">Shipping <span className="text-gray-500 font-normal">(Estimated)</span></span>
//                     <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
//                   </div>
//                   <div className="flex justify-between text-sm">
//                     <span className="font-semibold text-gray-700">Shipping Discount <span className="text-gray-500 font-normal">(Estimagted)</span></span>
//                     <span className="font-semibold text-gray-900">${shippingDiscount.toFixed(2)}</span>
//                   </div>
//                   <div className="border-t border-gray-400 pt-4">
//                     <div className="flex justify-between items-center bg-blue-100 p-3 rounded-lg border border-[#185ADB]">
//                       <span className="font-medium text-sm text-blue-800">Total Estimated</span>
//                       <span className="font-semibold text-sm text-blue-800">${total.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//               </div>
//               {/* Trust Signals */}
//               <div className="space-y-6 px-6">
//                 <div className="flex gap-3">
//                   <div className="shrink-0 mt-1">
//                     <HiShieldCheck className="w-6 h-6 text-purple-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900 text-sm mb-1">Secure payments</h3>
//                     <p className="text-sm text-gray-500 leading-relaxed">
//                       Escrow Protection Assurance: Full B2B protection benefits are exclusively provided for orders successfully placed and paid through the secure 360GMP Escrow Service.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-3">
//                   <div className="shrink-0 mt-1">
//                     <RiMoneyDollarCircleLine className="w-6 h-6 text-purple-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900 text-sm mb-1">Money-back protection</h3>
//                     <p className="text-sm text-gray-500 leading-relaxed">
//                       360GMP Order Protection: Claim a full refund if your goods were not shipped, are missing, or arrive with verified quality or product defects
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex gap-3 pb-4">
//                   <div className="shrink-0 mt-1">
//                     <RiCustomerService2Line className="w-6 h-6 text-purple-600" />
//                   </div>
//                   <div>
//                     <h3 className="font-semibold text-gray-900 text-sm mb-1">24/7 support</h3>
//                     <p className="text-sm text-gray-500 leading-relaxed">
//                       Dedicated Global Support: Access our comprehensive virtual help center 24/7 or connect with a live B2B support agent for immediate assistance.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>

//       <div className="pt-24">
//         <DashboardFooter />
//       </div>
//     </div>

//                 {/* Header */}
//                 <div className="mb-8">
//                     <div className="flex items-center flex-wrap gap-4 mb-2">
//                         <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
//                             Order# {orderId || "39201"}
//                         </h1>
//                         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${showFinalCompletedUI ? "bg-[#EBF1FF] text-[#2962FF]" : (isDelivered || isCompleted) ? "bg-[#EBF1FF] text-[#2962FF]" : isShipped ? "bg-[#EBF1FF] text-[#2962FF]" : "bg-[#EBF1FF] text-[#2962FF]"}`}>
//                             {showFinalCompletedUI || isDelivered || isCompleted ? "Delivered" : isShipped ? "Shipped" : "Escrow Secured"}
//                         </span>
//                     </div>
//                     <p className="text-gray-500 text-sm font-medium">
//                         Placed by John Doe, Oct 24, 20252222
//                     </p>
//                 </div>

//                 {/* Custom Stepper */}
//                 <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 overflow-hidden">
//                     <div className="relative flex justify-between items-center w-full max-w-7xl mx-auto mb-6">
//                         {/* Connecting Line Background */}
//                         <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-gray-200 z-0"></div>

//                         {/* Active Line Progress */}
//                         <div
//                             className="absolute top-[22px] left-0 h-[2px] bg-[#1DAF61] transition-all duration-500 z-0"
//                             style={{ width: `${(Math.max(activeStep, 0) / (steps.length - 1)) * 100}%` }}
//                         ></div>

//                         {steps.map((step, index) => {
//                             const isPast = index < activeStep;
//                             const isActive = index === activeStep;
//                             const isFuture = index > activeStep;

//                             let iconBg = "bg-gray-100";
//                             let iconColor = "text-gray-400";
//                             let ringClass = "ring-white";

//                             if (isPast || (isActive && showFinalCompletedUI && index === 4)) {
//                                 iconBg = "bg-[#1DAF61]";
//                                 iconColor = "text-white";
//                                 ringClass = "ring-white ring-4";
//                             } else if (isActive) {
//                                 iconBg = "bg-[#5C24D2]";
//                                 iconColor = "text-white";
//                                 ringClass = "ring-white ring-4 shadow-[0_0_0_2px_#5C24D2]";
//                             } else if (isFuture) {
//                                 iconBg = "bg-white border-2 border-gray-200";
//                                 iconColor = "text-gray-300";
//                             }

//                             return (
//                                 <div key={index} className="relative z-10 flex flex-col items-center group">
//                                     <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 ${iconBg} ${ringClass}`}>
//                                         <step.icon className={`w-5 h-5 ${iconColor}`} />
//                                     </div>
//                                     <span className={`text-sm font-medium text-center tracking-tight leading-tight mb-1 ${isActive ? "text-gray-900" : !isFuture ? "text-gray-800" : "text-gray-400"}`}>
//                                         {step.label}
//                                     </span>
//                                     {step.date && (
//                                         <span className="text-[12px] text-gray-400 font-medium">
//                                             {step.date}
//                                         </span>
//                                     )}
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>

//                 {/* Main Content Grid */}
//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                     {/* Left Column */}
//                     <div className="lg:col-span-2 space-y-6">

//                         {/* Funds Alert */}
//                         {(isDelivered || isCompleted || showFinalCompletedUI) && (
//                             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-8">
//                                 <div className="flex items-center gap-3 mb-4">
//                                     <div className="w-6 h-6 rounded-full bg-[#139D4C] flex items-center justify-center shrink-0">
//                                         <FiCheck className="w-4 h-4 text-white stroke-3" />
//                                     </div>
//                                     <h2 className="font-bold text-[#139D4C] text-[17px]">Funds Successfully Released</h2>
//                                 </div>
//                                 <p className="text-[#8c9ca8] font-medium leading-[1.6] text-[15px]">
//                                     The payout of <span className="font-bold text-gray-900">$57,500</span> has been added to your wallet and is now available for withdrawal.
//                                 </p>
//                             </div>
//                         )}

//                         {/* Main Cards: Conditional based on showFinalCompletedUI */}
//                         {showFinalCompletedUI ? (
//                             <div className="space-y-6">
//                                 {/* Timeline Card */}
//                                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                                     <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
//                                         <div className="bg-[#FAF9FF] p-2 rounded-lg">
//                                             <HiOutlineDocumentText className="w-5 h-5 text-[#5C24D2]" />
//                                         </div>
//                                         <h2 className="font-bold text-gray-900 text-[17px]">Timeline</h2>
//                                     </div>
//                                     <div className="p-6">
//                                         <div className="relative pl-8 space-y-8 pb-4">
//                                             <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
//                                             {[
//                                                 {
//                                                     date: "OCT 28, 2025,", time: "10:30 AM",
//                                                     title: "Fund Released",
//                                                     desc: "Your Payout For This Transaction Was Processed And Released To Your Account On November 3, 2025",
//                                                     active: true
//                                                 },
//                                                 {
//                                                     date: "OCT 27, 2025,", time: "10:30 AM",
//                                                     title: "Delivered",
//                                                     desc: "Parcel Successfully Delivered To Buyer"
//                                                 },
//                                                 {
//                                                     date: "OCT 26, 2025,", time: "06:15 AM",
//                                                     title: "Shipped",
//                                                     desc: "Shipped The Item To Buyer Location Courier Service FedEx"
//                                                 },
//                                                 {
//                                                     date: "OCT 25, 2025,", time: "06:15 AM",
//                                                     title: "Prepare Shipment",
//                                                     desc: "Your Are Preparing The Parcel For Shipping"
//                                                 },
//                                                 {
//                                                     date: "OCT 24, 2025,", time: "12:15 AM",
//                                                     title: "Order placed",
//                                                     desc: "Order Placed By Buyer: Alex Morgan",
//                                                 }
//                                             ].map((item, idx) => (
//                                                 <div key={idx} className="relative">
//                                                     <div className={`absolute -left-[33px] mt-1.5 w-4 h-4 rounded-full ring-4 ring-white z-10 ${item.active ? 'bg-[#5C24D2]' : 'bg-[#1E0B4B]'}`}></div>
//                                                     <div className="flex items-center gap-2 text-[11px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-2">
//                                                         <span>{item.date}</span>
//                                                         <div className="w-1 h-1 bg-[#8c9ca8] rounded-full"></div>
//                                                         <span>{item.time}</span>
//                                                     </div>
//                                                     <h3 className="font-bold text-gray-900 text-[16px] mb-1">{item.title}</h3>
//                                                     <p className="text-[#8c9ca8] font-medium text-[14px] leading-relaxed max-w-2xl">{item.desc}</p>
//                                                 </div>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             <div className="space-y-6">
//                                 {/* Dynamic Action Card (Escrow / Shipping) */}
//                                 {!(isDelivered || isCompleted) && (
//                                     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                                         {!isShippingFormOpen ? (
//                                             <div className="p-6 sm:p-8">
//                                                 <div className="flex items-center gap-2 mb-4">
//                                                     <IoShieldCheckmarkOutline className="w-5 h-5 text-[#139D4C]" />
//                                                     <h2 className="font-bold text-[#139D4C] text-lg">Escrow Payment Status</h2>
//                                                 </div>
//                                                 <div className="border-b border-gray-100 pb-6 mb-6">
//                                                     <p className="text-gray-600 leading-relaxed text-[15px]">
//                                                         Your payment of <span className="font-bold text-gray-900">$57,500</span> is securely held in escrow. Funds will be released after <span className="font-bold text-gray-900">24 hours after Buyer Confirmation of Delivery.</span>
//                                                     </p>
//                                                 </div>
//                                                 {!isShipped ? (
//                                                     activeStep === 0 ? (
//                                                         <button onClick={handleTracking} className="bg-[#1DAF61] text-white px-6 py-3 rounded-lg font-bold text-[15px] hover:bg-[#189b53] transition-colors">Confirm Payment & Prepare Shipment</button>
//                                                     ) : (
//                                                         <button onClick={() => setIsShippingFormOpen(true)} className="bg-[#1DAF61] text-white px-6 py-3 rounded-lg font-bold text-[15px] hover:bg-[#189b53] transition-colors">Prepare Shipment & Get Tracking</button>
//                                                     )
//                                                 ) : (
//                                                     <div className="space-y-4">
//                                                         <div className="bg-[#FAFBFD] rounded-xl p-4 flex items-center gap-4">
//                                                             <div className="w-12 h-12 bg-[#1E0B4B] rounded-lg flex items-center justify-center shrink-0"><TbTruckDelivery className="w-6 h-6 text-white" /></div>
//                                                             <div><p className="font-bold text-gray-900 text-[15px]">Sipping Carrier</p><p className="font-semibold text-gray-500 text-sm mt-0.5">FedEx</p></div>
//                                                         </div>
//                                                         <button onClick={() => { setIsShippingFormOpen(true); setIsShipped(false); }} className="bg-[#1E0B4B] text-white px-6 py-2.5 rounded-lg font-bold text-[14px] hover:bg-[#140733] transition-colors">Edit Tracking Info</button>
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         ) : (
//                                             <div>
//                                                 <div className="px-6 py-5 border-b border-gray-100"><h2 className="font-bold text-gray-900 text-[17px]">Submit Shipment Details</h2></div>
//                                                 <div className="p-6 space-y-5">
//                                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                                                         <div className="space-y-1.5">
//                                                             <label className="block text-sm font-bold text-gray-900">Courier Partner <span className="text-red-500">*</span></label>
//                                                             <div className="relative">
//                                                                 <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-[15px]">
//                                                                     <option>DHL</option><option>FedEx</option><option>UPS</option><option>USPS</option>
//                                                                 </select>
//                                                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
//                                                                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                         <div className="space-y-1.5">
//                                                             <label className="block text-sm font-bold text-gray-900">Tracking Number <span className="text-red-500">*</span></label>
//                                                             <input type="text" placeholder="Enter tracking I.D." className="w-full bg-white border border-gray-200 text-gray-900 py-3 px-4 rounded-lg outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-[15px] placeholder-gray-400" />
//                                                         </div>
//                                                     </div>
//                                                     <div className="space-y-1.5">
//                                                         <label className="block text-sm font-bold text-gray-900">Notes for Buyer (Optional)</label>
//                                                         <textarea rows="3" placeholder="eg. Shipping container details..." className="w-full bg-white border border-gray-200 text-gray-900 py-3 px-4 rounded-lg outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-[15px] resize-none placeholder-gray-400"></textarea>
//                                                     </div>
//                                                 </div>
//                                                 <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-xl">
//                                                     <button onClick={() => setIsShippingFormOpen(false)} className="px-6 py-2.5 rounded-lg font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-[15px]">Cancel</button>
//                                                     <button onClick={handleSubmitDetails} className="px-6 py-2.5 rounded-lg font-semibold text-white bg-[#1E0B4B] hover:bg-[#140733] transition-colors text-[15px]">Submit Details</button>
//                                                 </div>
//                                             </div>
//                                         )}
//                                     </div>
//                                 )}

//                                 {/* Order Summary Card */}
//                                 <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                                     <h2 className="px-6 py-4 font-bold text-gray-900 border-b border-gray-100 text-[17px]">Order Summary</h2>
//                                     <div className="p-6">
//                                         <div className="flex items-center justify-between border border-gray-100 p-4 rounded-xl shadow-sm mb-6">
//                                             <div className="flex items-center gap-4">
//                                                 <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
//                                                     <img src="/assets/images/earbuds.png" alt="Item" className="w-12 h-12 object-contain" />
//                                                 </div>
//                                                 <div>
//                                                     <h3 className="font-semibold text-gray-900 text-[15px]">Precision Disc Brake System</h3>
//                                                     <p className="text-gray-500 text-sm mt-1">Quantity: 610 • Unit Price: $90.16</p>
//                                                 </div>
//                                             </div>
//                                             <div className="font-bold text-gray-900 text-lg">$57,500</div>
//                                         </div>
//                                         <div className="space-y-4 text-[15px]">
//                                             <div className="flex justify-between items-center"><span className="text-[#8c9ca8] font-medium">Item Total</span><span className="text-gray-600 font-medium">$55,000</span></div>
//                                             <div className="flex justify-between items-center"><span className="text-[#8c9ca8] font-medium">Shipping</span><span className="text-gray-600 font-medium">$2,500</span></div>
//                                             <div className="flex justify-between items-center"><span className="text-[#1DAF61] font-medium">Escrow Fee Deduction</span><span className="text-[#1DAF61] font-medium">-$0</span></div>
//                                         </div>
//                                         <div className="border-t border-gray-100 pt-5 mt-5">
//                                             <div className="flex justify-between items-center text-[15px] mb-3"><span className="text-[#8c9ca8] font-bold text-[15px]">Grand Total</span><span className="text-gray-900 font-bold">$57,500</span></div>
//                                             <div className="flex justify-between items-center text-xl mt-1"><span className="font-bold text-gray-900">Est. Net Payout</span><span className="font-bold text-gray-900">$57,500</span></div>
//                                         </div>
//                                     </div>
//                                 </div>

//                                 {/* Shipped Button */}
//                                 {isShipped && (
//                                     <button onClick={handleMarkAsShipped} className="w-full bg-[#1E0B4B] text-white py-4 px-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#140733] transition-colors text-[16px]">shipped <TbTruckDelivery className="w-5 h-5" /></button>
//                                 )}

//                                 {/* Courier Service */}
//                                 {(isDelivered || isCompleted) && (
//                                     <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                                         <h2 className="px-6 py-4 font-bold text-gray-900 text-[17px]">Courier Service</h2>
//                                         <div className="px-6 pb-6 mt-2">
//                                             <div className="flex items-center gap-4 mb-5">
//                                                 <div className="w-12 h-12 bg-[#1E0B4B] rounded-lg flex items-center justify-center shrink-0"><TbTruckDelivery className="w-6 h-6 text-white" /></div>
//                                                 <div><p className="font-bold text-gray-900 text-[15px]">FedEx</p><p className="font-semibold text-gray-500 text-[15px] mt-0.5">Tracking: #123456789</p></div>
//                                             </div>
//                                             <div className="bg-gray-50/70 p-3 rounded-lg flex items-center gap-2 text-sm font-medium text-gray-500"><BsBoxSeam className="w-4 h-4" /> Delivered On Oct 28, 2025</div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         )}
//                     </div>

//                     {/* Right Column / Sidebar */}
//                     <div className="space-y-6">
//                         {/* Shipment Progress */}
//                         {(isDelivered || isCompleted || showFinalCompletedUI) && (
//                             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                                 <div className="px-6 py-4 border-b border-gray-100">
//                                     <h2 className="font-bold text-gray-900 text-[17px]">Shipment Progress</h2>
//                                 </div>
//                                 <div className="p-6">
//                                     <div className="border border-gray-100 rounded-xl p-5 space-y-6">
//                                         <div className="flex items-center gap-4 relative">
//                                             <div className="relative flex items-center justify-center shrink-0">
//                                                 <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-100"></div>
//                                                 <div className="w-4 h-4 rounded-full border-[3.5px] border-[#A855F7] bg-white z-10"></div>
//                                             </div>
//                                             <span className="font-bold text-gray-900 text-[15px]">Shipped</span>
//                                         </div>
//                                         <div className="flex items-center gap-4 relative">
//                                             <div className="relative flex items-center justify-center shrink-0">
//                                                 <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-100"></div>
//                                                 <div className={`w-4 h-4 rounded-full border-[3.5px] bg-white z-10 ${(!showFinalCompletedUI && !isCompleted) ? 'border-[#A855F7] ring-4 ring-purple-50' : 'border-[#A855F7]'}`}></div>
//                                             </div>
//                                             <span className="font-bold text-gray-900 text-[15px]">Delivered</span>
//                                         </div>
//                                         <div className="flex items-center gap-4 relative">
//                                             <div className="absolute -top-7 left-[7px] w-0.5 h-8 bg-gray-100"></div>
//                                             <div className={`w-4 h-4 rounded-full border-[3.5px] bg-white shrink-0 ${showFinalCompletedUI ? 'border-[#A855F7]' : 'border-gray-200'}`}></div>
//                                             <span className={`text-[15px] ${showFinalCompletedUI ? 'font-bold text-gray-900' : 'font-semibold text-gray-400 lowercase'}`}>Completed</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Summary Card */}
//                         {showFinalCompletedUI ? (
//                             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                                 <div className="px-6 py-4 border-b border-gray-100">
//                                     <h2 className="font-bold text-gray-900 text-[17px]">Summary</h2>
//                                 </div>
//                                 <div className="p-6 border-b border-gray-100">
//                                     <div className="space-y-3">
//                                         <div className="flex justify-between items-center text-sm">
//                                             <span className="text-[#8c9ca8] font-medium">Gross Sale Amount</span>
//                                             <span className="font-bold text-gray-900">$57,500</span>
//                                         </div>
//                                         <div className="flex justify-between items-center text-sm text-red-500 font-medium">
//                                             <span>Platform Fee (5%)</span>
//                                             <span>-$300</span>
//                                         </div>
//                                         <div className="flex justify-between items-center text-sm text-red-500 font-medium">
//                                             <span>Shipping</span>
//                                             <span>-$200</span>
//                                         </div>
//                                         <div className="flex justify-between items-center text-sm text-[#1DAF61] font-medium">
//                                             <span>Escrow Fee Deduction</span>
//                                             <span>-$0</span>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="p-6">
//                                     <div className="flex justify-between items-center mb-6">
//                                         <span className="font-bold text-gray-900 text-[17px]">Est. Net Payout</span>
//                                         <span className="font-bold text-gray-900 text-[19px] tracking-tight">$57,000</span>
//                                     </div>
//                                     <button className="w-full bg-[#1DAF61] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#189b53] transition-colors text-[15px]">
//                                         <FiDownload className="w-5 h-5" /> Download Invoice
//                                     </button>
//                                 </div>
//                             </div>
//                         ) : (
//                             /* Buyer Info Card */
//                             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                                 <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-bold text-gray-900 text-[17px]">Buyer Information</h2></div>
//                                 <div className="p-6 space-y-4">
//                                     <div className="flex justify-between items-start gap-4"><span className="text-[#8c9ca8] text-sm shrink-0">Name</span><span className="text-gray-600 text-[15px] text-right">John Doe</span></div>
//                                     <div className="flex justify-between items-start gap-4"><span className="text-[#8c9ca8] text-sm shrink-0">Email</span><span className="text-gray-600 text-[15px] text-right">johndoe@example.com</span></div>
//                                     <div className="flex justify-between items-start gap-4"><span className="text-[#8c9ca8] text-sm shrink-0">Phone</span><span className="text-gray-600 text-[15px] text-right">+1 (123) 456 7890</span></div>
//                                     <div className="flex justify-between items-start gap-4"><span className="text-[#8c9ca8] text-sm shrink-0">Location</span><span className="text-gray-600 text-[15px] text-right">Texas, USA</span></div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Order Details or Payout Status */}
//                         {showFinalCompletedUI ? (
//                             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                                 <div className="px-6 py-4 border-b border-gray-100">
//                                     <h2 className="font-bold text-gray-900 text-[17px]">Order Details</h2>
//                                 </div>
//                                 <div className="p-6 transition-all duration-300">
//                                     <p className="text-[12px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-4">Buyer Detial</p>
//                                     <div className="flex items-center gap-3 mb-8">
//                                         <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
//                                             <img src="https://i.pravatar.cc/150?u=alex" alt="Alex Morgan" className="w-full h-full object-cover" />
//                                         </div>
//                                         <div>
//                                             <h3 className="font-bold text-gray-900 text-[15px]">Alex Morgan</h3>
//                                             <p className="text-[#8c9ca8] text-[13px] font-medium">Alexmorgan@Gmal.Com</p>
//                                             <div className="flex items-center gap-1.5 mt-1">
//                                                 <MdVerified className="w-4 h-4 text-[#2962FF]" />
//                                                 <span className="text-[#2962FF] text-[11px] font-bold">Verified Profile</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="space-y-6">
//                                         <div>
//                                             <p className="text-[12px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-1">Completion Date</p>
//                                             <p className="font-bold text-gray-900 text-[15px]">October 17, 2023</p>
//                                         </div>
//                                         <div>
//                                             <p className="text-[12px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-1">Transaction ID</p>
//                                             <p className="font-bold text-gray-900 text-[15px]">ESC-8849-XT-2023</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         ) : (
//                             /* Payout Status Card */
//                             <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//                                 <div className="px-6 py-4 border-b border-gray-100"><h2 className="font-bold text-gray-900 text-[17px]">Payout Status</h2></div>
//                                 <div className="p-6">
//                                     <div className="space-y-4">
//                                         <div className="flex justify-between items-center"><span className="text-[#8c9ca8] text-[15px]">Net Payout</span><span className="text-gray-500 font-medium text-[15px]">$57,500</span></div>
//                                         <div className="flex justify-between items-center"><span className="text-[#8c9ca8] text-[15px]">Escrow Status</span><span className={`px-2.5 py-1 rounded-sm text-[11px] font-bold tracking-wide ${(isDelivered || isCompleted) ? 'bg-[#EBFBF2] text-[#139D4C]' : 'bg-[#EBF1FF] text-[#2962FF]'}`}>{(isDelivered || isCompleted) ? 'Payment Released' : 'Payment on hold'}</span></div>
//                                     </div>
//                                     {(isDelivered || isCompleted) && (
//                                         <div className="mt-8 mb-6 text-center">
//                                             <p className="text-[#139D4C] font-bold text-[13.5px] leading-relaxed mb-6">Your payout for this transaction was processed and released to your account on November 3, 2025.</p>
//                                             {!isCompleted ? (
//                                                 !isRemainderSent ? (
//                                                     <button
//                                                         onClick={handleSendRemainder}
//                                                         className="w-full bg-[#F3F4F6] text-gray-700 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 text-[15px] hover:bg-gray-200 transition-colors"
//                                                     >
//                                                         <FiCalendar className="w-4 h-4" /> Send Remainder
//                                                     </button>
//                                                 ) : (
//                                                     <button
//                                                         onClick={handleMarkAsCompleted}
//                                                         className="w-full bg-[#1E0B4B] text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 text-[15px] hover:bg-[#140733] transition-colors shadow-lg shadow-purple-900/10"
//                                                     >
//                                                         Mark As Completed
//                                                     </button>
//                                                 )
//                                             ) : (
//                                                 <div className="w-full bg-[#1da15f] text-white py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-[15px]">
//                                                     <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
//                                                         <FiCheck className="w-4 h-4 text-[#1da15f] stroke-4" />
//                                                     </div>
//                                                     Marked As Completed
//                                                 </div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//             <DashboardFooter />
//         </div>
//     );
// };

// export default CheckoutPage;

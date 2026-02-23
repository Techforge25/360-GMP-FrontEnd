// ============================================
// ORIGINAL CHECKOUT CODE - WILL BE USED IN PHASE 5
// ============================================

// "use client";
// import React, { useState, useEffect, useMemo } from "react";
// import Link from "next/link";
// import Image from "next/image"; // Kept for consistency if migrated later, using img for now as per instructions preference
// import { FiLock, FiGlobe, FiChevronDown, FiCheck } from "react-icons/fi";
// import { HiShieldCheck } from "react-icons/hi";
// import { RiMoneyDollarCircleLine, RiCustomerService2Line } from "react-icons/ri";
// import { useCart } from "@/context/CartContext";
// import productAPI from "@/services/productAPI";

// const CheckoutPage = () => {
//   const { cartItems } = useCart();
//   const [productsCache, setProductsCache] = useState({});
//   const [loading, setLoading] = useState(true);

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

//   // Calculate totals
//   const calculateSubtotal = () => {
//     return products.reduce((total, product) => {
//       return total + (product.pricePerUnit * product.quantity);
//     }, 0);
//   };

//   const subtotal = calculateSubtotal();
//   const shipping = 10;
//   const shippingDiscount = 0;
//   const total = subtotal + shipping - shippingDiscount;

//   // Handle empty cart
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-900"></div>
//       </div>
//     );
//   }

//   if (cartItems.length === 0 || products.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
//           <p className="text-gray-600 mb-6">Please add items to your cart before proceeding to checkout.</p>
//           <Link href="/dashboard/user/marketplace" className="bg-[#240457] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#2a0b4d] transition-colors">
//             Continue Shopping
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 pb-12">
//       {/* Breadcrumb */}
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <div className="text-sm text-gray-500 flex items-center gap-1 flex-wrap">
//           <span>Business List</span>
//           <span>&gt;</span>
//           <span>Techvision Solutions</span>
//           <span>&gt;</span>
//           <span>Product List</span>
//           <span>&gt;</span>
//           <span>Product Detail</span>
//           <span>&gt;</span>
//           <span>Add To Cart</span>
//           <span>&gt;</span>
//           <span className="text-gray-900 font-medium">Check Out</span>
//         </div>
//       </div>

//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Left Column - Shipping Address */}
//           <div className="flex-1">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                 {/* Header */}
//                 <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-[#F8F9FB]">
//                     <h2 className="text-lg font-bold text-gray-900">Shipping Address</h2>
//                     <button className="text-blue-600 text-sm font-medium hover:underline flex items-center gap-2">
//                         Use My Current Location
//                         <FiGlobe className="w-4 h-4" />
//                     </button>
//                 </div>

//                 <div className="p-6">
//                     {/* Security Banner */}
//                     <div className="bg-[#E8F8EE] text-[#008A2E] px-4 py-3 rounded-lg flex items-center gap-2 mb-6">
//                         <FiLock className="w-4 h-4" />
//                         <span className="text-sm font-medium">your information is encrypted and secure</span>
//                     </div>

//                     {/* Form */}
//                     <div className="space-y-6">
//                         {/* Country/Region */}
//                         <div>
//                             <label className="block text-sm font-bold text-gray-900 mb-2">
//                                 Country/Region
//                             </label>
//                             <div className="relative">
//                                 <div className="w-full border border-gray-200 rounded-lg px-4 py-3 flex items-center justify-between bg-white cursor-pointer hover:border-gray-300 transition-colors">
//                                     <div className="flex items-center gap-3">
//                                         <img
//                                             src="https://flagcdn.com/w40/us.png"
//                                             alt="US"
//                                             className="w-6 h-4 object-cover rounded-sm"
//                                         />
//                                         <span className="text-sm text-gray-700">United State</span>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Row 1: Full Name & Phone */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                                     Full Name
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder="Full Name *"
//                                     className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400 placeholder:text-red-400"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                                     Phone
//                                 </label>
//                                 <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#240457]">
//                                     <div className="px-3 py-3 bg-gray-50 border-r border-gray-200 text-sm text-gray-500">
//                                         +1
//                                     </div>
//                                     <input
//                                         type="text"
//                                         placeholder="Phone Number *"
//                                         className="flex-1 text-black px-4 py-3 text-sm focus:outline-none placeholder-gray-400"
//                                     />
//                                 </div>
//                                 <p className="text-sm text-gray-400 mt-1">Only Used To Contact You For Delivery Updates</p>
//                             </div>
//                         </div>

//                         {/* Row 2: Street Address & Phone */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                                     Street Address
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder="Full Name *"
//                                     className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                                     Phone
//                                 </label>
//                                 <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-[#240457]">
//                                     <div className="px-3 py-3 bg-gray-50 border-r border-gray-200 text-sm text-gray-500">
//                                         +1
//                                     </div>
//                                     <input
//                                         type="text"
//                                         placeholder="Phone Number *"
//                                         className="flex-1 text-black px-4 py-3 text-sm focus:outline-none placeholder-gray-400"
//                                     />
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Row 3: State/Province & Zip/Postal Code */}
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                                     State/Province
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder="State/Province *"
//                                     className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block text-sm font-bold text-gray-900 mb-2">
//                                     Zip/Postal Code
//                                 </label>
//                                 <input
//                                     type="text"
//                                     placeholder="e.g 2000*"
//                                     className="w-full text-black border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent placeholder-gray-400"
//                                 />
//                             </div>
//                         </div>

//                         {/* Checkbox */}
//                         <div className="flex items-center gap-2">
//                             <div className="relative flex items-center">
//                                 <input
//                                     type="checkbox"
//                                     id="default-address"
//                                     checked={formData.isDefault}
//                                     onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
//                                     className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-gray-300 bg-white checked:bg-[#004D99] checked:border-[#004D99] transition-all"
//                                 />
//                                 <FiCheck className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 peer-checked:opacity-100 w-3.5 h-3.5" />
//                             </div>
//                             <label htmlFor="default-address" className="text-sm text-gray-500 cursor-pointer">
//                                 Set As Default Shipping Address
//                             </label>
//                         </div>

//                     </div>

//                     <Link href="/dashboard/user/payment" className="block w-full text-center bg-[#240457] text-white py-4 rounded-lg font-bold text-base hover:bg-[#2a0b4d] transition-colors">
//                         Continue To Payment
//                     </Link>
//                 </div>
//             </div>
//           </div>

//           {/* Right Column - Order Summary */}
//           <div className="w-full lg:w-[380px] space-y-6">
//             <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//                 <div className="px-6 py-4 border-b border-gray-200">
//                     <h2 className="text-lg font-bold text-gray-900">Order Summary ({products.length} {products.length === 1 ? 'Variation' : 'Variations'})</h2>
//                 </div>

//                 <div className="p-6">
//                     {/* Tiny Product Preview */}
//                     <div className="mb-6 relative inline-block">
//                         <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden border border-gray-200">
//                             <img
//                                 src={products[0]?.image || "/assets/images/earbuds.png"}
//                                 alt="Item"
//                                 className="w-full h-full object-cover"
//                                 onError={(e) => {e.target.src = "https://placehold.co/50x50?text=Item"}}
//                             />
//                         </div>
//                         <span className="absolute -top-2 -right-2 bg-[#240457] text-white text-sm font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
//                             {products.length}
//                         </span>
//                     </div>

//                     {/* Summary Lines */}
//                     <div className="space-y-3 mb-6">
//                         <div className="flex justify-between text-sm">
//                             <span className="font-bold text-gray-700">Subtotal <span className="text-gray-500 font-normal">({String(products.length).padStart(2, '0')}Items)</span></span>
//                             <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                             <span className="font-bold text-gray-700">Shipping <span className="text-gray-500 font-normal">(Estimated)</span></span>
//                             <span className="font-bold text-gray-900">${shipping.toFixed(2)}</span>
//                         </div>
//                         <div className="flex justify-between text-sm">
//                             <span className="font-bold text-gray-700">Shipping Discount <span className="text-gray-500 font-normal">(Estimated)</span></span>
//                             <span className="font-bold text-gray-900">${shippingDiscount.toFixed(2)}</span>
//                         </div>
//                     </div>

//                     <div className="border-t border-gray-200 pt-4 mb-6">
//                          <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
//                             <span className="font-bold text-blue-800">Total Estimated</span>
//                             <span className="font-bold text-blue-800 text-lg">${total.toFixed(2)}</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Trust Signals */}
//             <div className="space-y-6 px-2">
//                 <div className="flex gap-3">
//                     <div className="shrink-0 mt-1">
//                         <HiShieldCheck className="w-6 h-6 text-purple-600" />
//                     </div>
//                     <div>
//                         <h3 className="font-semibold text-gray-900 text-sm mb-1">Secure payments</h3>
//                         <p className="text-sm text-gray-500 leading-relaxed">
//                             Escrow Protection Assurance: Full B2B protection benefits are exclusively provided for orders successfully placed and paid through the secure 360GMP Escrow Service.
//                         </p>
//                     </div>
//                 </div>

//                 <div className="flex gap-3">
//                     <div className="shrink-0 mt-1">
//                         <RiMoneyDollarCircleLine className="w-6 h-6 text-purple-600" />
//                     </div>
//                     <div>
//                         <h3 className="font-semibold text-gray-900 text-sm mb-1">Money-back protection</h3>
//                         <p className="text-sm text-gray-500 leading-relaxed">
//                              360GMP Order Protection: Claim a full refund if your goods were not shipped, are missing, or arrive with verified quality or product defects
//                         </p>
//                     </div>
//                 </div>

//                  <div className="flex gap-3">
//                     <div className="shrink-0 mt-1">
//                         <RiCustomerService2Line className="w-6 h-6 text-purple-600" />
//                     </div>
//                     <div>
//                         <h3 className="font-semibold text-gray-900 text-sm mb-1">24/7 support</h3>
//                         <p className="text-sm text-gray-500 leading-relaxed">
//                             Dedicated Global Support: Access our comprehensive virtual help center 24/7 or connect with a live B2B support agent for immediate assistance.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
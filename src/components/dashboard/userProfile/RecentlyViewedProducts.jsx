// "use client";
// import React, { useEffect, useState } from "react";
// import productAPI from "@/services/productAPI";
// import RecentlyViewedProductCard from "./RecentlyViewedProductCard";

// const RecentlyViewedProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecentlyViewed = async () => {
//       try {
//         const res = await productAPI.getRecentlyViewed(4);
//         if (res.success) {
//           setProducts(res.data);
//         }
//       } catch (error) {
//         console.error("Failed to fetch recently viewed products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecentlyViewed();
//   }, []);

//   if (loading) {
//     return (
//       <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
//         <div className="animate-pulse space-y-6">
//           <div className="h-6 bg-gray-100 rounded w-48"></div>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
//             {[1, 2, 3, 4].map((i) => (
//               <div key={i} className="h-64 bg-gray-50 rounded-xl"></div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (products.length === 0) return null;

//   return (
//     <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100">
//       <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-6 px-1">
//         Recently Viewed Product
//       </h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
//         {products.map((product) => (
//           <RecentlyViewedProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentlyViewedProducts;

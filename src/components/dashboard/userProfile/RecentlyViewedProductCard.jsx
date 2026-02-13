// "use client";
// import React from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/Button";

// const RecentlyViewedProductCard = ({ product }) => {
//   return (
//     <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
//       {/* Product Image Section */}
//       <div className="relative aspect-[4/3] bg-gray-50/50 p-4 flex items-center justify-center group">
//         <div className="relative w-full h-full">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="w-full h-full object-contain mix-blend-multiply"
//             onError={(e) => {
//               e.target.src = "/assets/images/Portrait_Placeholder.png";
//             }}
//           />
//         </div>

//         {/* Stock Badge */}
//         <div className="absolute top-3 right-3 px-3 py-1 bg-[#16a34a] text-white text-[12px] font-bold rounded-full shadow-sm">
//           Stock {product.stockQty}
//         </div>
//       </div>

//       {/* Product Info Section */}
//       <div className="p-4 sm:p-5">
//         <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 line-clamp-1">
//           {product.title}
//         </h3>
//         <p className="text-sm sm:text-sm text-gray-500 mb-4 line-clamp-1 font-medium">
//           {product.detail}
//         </p>

//         {/* MOQ and Price Row */}
//         <div className="flex items-center justify-between text-sm sm:text-sm text-gray-400 font-medium mb-5">
//           <span>MOQ: {product.minOrderQty} pc</span>
//           <span className="text-gray-400">USD ${product.pricePerUnit}</span>
//         </div>

//         {/* Action Buttons */}
//         <div className="grid grid-cols-2 gap-3">
//           <Button className="bg-[#1e0a45] hover:bg-[#2d1166] text-white text-[11px] sm:text-sm font-bold h-9 sm:h-10 rounded-lg shadow-sm border-none">
//             Add To Cart
//           </Button>
//           <Button
//             variant="outline"
//             className="border-gray-200 text-[#1e0a45] hover:bg-gray-50 text-[11px] sm:text-sm font-bold h-9 sm:h-10 rounded-lg"
//           >
//             Chat Now
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecentlyViewedProductCard;

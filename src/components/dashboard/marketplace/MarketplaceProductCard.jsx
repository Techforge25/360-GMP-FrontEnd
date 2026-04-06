"use client";

import SlateRenderer from "@/components/ui/SlateRenderer";
import Image from "next/image";

export default function MarketplaceProductCard({
  product,
  isBusinessUser = false,
  handleProductClick,
  addToCart,
  router,
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative bg-gray-100 h-40 sm:h-48 cursor-pointer group">
        <Image
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onClick={() => handleProductClick(product)}
          width={100}
          height={100}
        />
        <div className="absolute top-2 right-2 flex gap-1">
          <div className="w-6 h-6 rounded-full flex items-center justify-center shadow bg-white">
            <img className="w-3 h-3 object-contain" src="/assets/images/star.png" alt="" />
          </div>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base line-clamp-1">
          {product.title}
        </h3>
        <div className="text-sm sm:text-sm text-gray-600 mb-3 h-[40px] overflow-hidden">
          <SlateRenderer content={product.detail || product.description} maxLength={60} />
        </div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm sm:text-sm text-gray-500">Min: {product.minOrderQty} pc</span>
          <span className="text-sm sm:text-sm text-gray-600">USD ${product.pricePerUnit}</span>
        </div>
        {isBusinessUser ? (
          <button
            onClick={() => handleProductClick(product)}
            className="w-full py-2.5 border border-[#240457] text-[#240457] rounded-lg text-sm sm:text-base hover:bg-[#240457] hover:text-white transition-colors"
          >
            View Product
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                addToCart(product, product.minOrderQty || 1);
                router.push("/dashboard/user/cart");
              }}
              className="py-2 border border-[#240457] text-[#240457] rounded-lg text-sm sm:text-sm hover:bg-[#240457] hover:text-white transition-colors"
            >
              Add To Cart
            </button>
            <button
              onClick={() => router.push(isBusinessUser ? "/dashboard/business/messages" : "/dashboard/user/messages")}
              className="py-2 border border-[#240457] text-[#fff] rounded-lg text-sm sm:text-sm bg-[#240457] hover:bg-[#fff] hover:text-[#240457] transition-colors"
            >
              Chat Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import SlateRenderer from "@/components/ui/SlateRenderer";

export default function MarketplaceTopDealsSection({
  deals = [],
  isBusinessUser = false,
  router,
  addToCart,
  onProductClick,
}) {
  if (!deals || deals.length === 0) return null;

  return (
    <div
      className="py-8 lg:py-12 mt-16 rounded-xl"
      style={{
        background:
          "radial-gradient(circle at 4% 50%, rgba(151, 71, 255, 0.08) 9%, rgba(242, 64, 255, 0.08) 38%, rgba(255, 176, 22, 0.08) 100%)",
      }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Top Deals</h2>
          <p className="text-gray-600 text-base">
            All our season products on curated marketing
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {deals.map((deal, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative bg-gray-100 h-48 flex items-center justify-center cursor-pointer group">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onClick={() => onProductClick(deal)}
                />
                {deal.extras && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-brand-primary text-white text-sm px-2 py-1 rounded">
                      {deal.extras}
                    </span>
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-base line-clamp-1">
                  {deal.title}
                </h3>
                <div className="text-sm text-gray-600 mb-3 h-[40px] overflow-hidden">
                  <SlateRenderer content={deal.detail || deal.description} maxLength={60} />
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="text-purple-600 font-bold text-xl">${deal.pricePerUnit}</span>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Min: {deal.minOrderQty}</span>
                </div>

                {isBusinessUser ? (
                  <button
                    onClick={() => onProductClick(deal)}
                    className="w-full py-2 border border-[#240457] text-[#240457] rounded-lg text-base hover:bg-[#240457] hover:text-white transition-colors"
                  >
                    View Product
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        addToCart(deal, deal.minOrderQty || 1);
                        router.push("/dashboard/user/cart");
                      }}
                      className="py-2 border border-[#240457] text-[#240457] rounded-lg text-sm hover:bg-[#240457] hover:text-white transition-colors"
                    >
                      Add To Cart
                    </button>
                    <button
                      onClick={() => router.push(isBusinessUser ? "/dashboard/business/messages" : "/dashboard/user/messages")}
                      className="py-2 border border-[#240457] text-[#fff] rounded-lg text-sm bg-[#240457] hover:bg-[#fff] hover:text-[#240457] transition-colors"
                    >
                      Chat Now
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import SlateRenderer from "@/components/ui/SlateRenderer";

export default function ProductSpecs({ product }) {
  const [activeTab, setActiveTab] = useState("specs");

  if (!product) return null;

  const specs = [
    { label: "Category", value: product.category },
    { label: "Shipping Method", value: product.shippingMethod },
    { label: "Shipping Cost", value: `$${product.shippingCost}` },
    { label: "Estimated Delivery", value: product.estimatedDeliveryDays },
    { label: "Stock Quantity", value: product.stockQty },
    { label: "Min Order Qty", value: product.minOrderQty },
  ];

  return (
    <div className="mb-12">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          onClick={() => setActiveTab("specs")}
          className={`pb-3 pr-6 text-sm font-bold border-b-2 transition-colors ${activeTab === "specs" ? "border-indigo-900 text-indigo-900" : "border-transparent text-gray-500 hover:text-gray-700"}`}
        >
          Product Specifications
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Table */}
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            {specs.map((spec, index) => (
              <div
                key={index}
                className={`flex text-sm ${index !== specs.length - 1 ? "border-b border-gray-200" : ""}`}
              >
                <div className="w-1/2 p-3 font-bold text-gray-700 bg-gray-100/50">
                  {spec.label}
                </div>
                <div className="w-1/2 p-3 text-gray-600 bg-gray-50">
                  {spec.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="w-full md:w-1/2 bg-gray-50/50 rounded-lg p-6 border border-gray-100">
          <h3 className="font-bold text-gray-900 mb-4 text-sm">
            Product Details
          </h3>
          <div className="text-sm text-gray-600 leading-relaxed">
            <SlateRenderer content={product.detail} />
          </div>
          {product.extras && (
            <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <span className="text-sm font-bold text-orange-600">
                {product.extras}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

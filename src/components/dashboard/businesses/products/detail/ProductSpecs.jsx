import React, { useState } from "react";
import SlateRenderer from "@/components/ui/SlateRenderer";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import DOMPurify from "dompurify"

export default function ProductSpecs({ product }) {
  const [activeTab, setActiveTab] = useState("specs");
  const router = useRouter()
  console.log(product, "product")

  const pathname = usePathname()
  const businessPathname = pathname.includes("/dashboard/business/products")

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
      <div className="flex justify-between mb-8">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-3 pr-6 text-sm font-bold border-b-2 transition-colors ${activeTab === "specs" ? "border-indigo-900 text-indigo-900" : "border-transparent text-gray-500 hover:text-gray-700"}`}
          >
            Product Specifications
          </button>
        </div>
        {!product.isOwner && (
          <div className="my-4">
            <Button onClick={() => router.push(businessPathname ? `/dashboard/business/businesses/${product?.businessId?._id}` : `/dashboard/user/businesses/${product?.businessId?._id}`)} variant="default">
              View Company Profile
            </Button>
          </div>
        )}

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
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.detail),
              }}
            />
            {/* <SlateRenderer content={product.detail} maxLength={100} /> */}
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
    </div >
  );
}

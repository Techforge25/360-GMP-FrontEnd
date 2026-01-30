"use client";
import React from "react";
import ProductListCard from "../ProductListCard";

export default function RelatedProducts({ businessId }) {
  // reusing the same card component but maybe simplified or same structure
  const products = [
    {
        id: 101,
        businessId: businessId || "mock-id",
        name: "Noise Reduction Headset",
        description: "Over-ear solution providing passive noise cancellation for operator..",
        moq: "12 pc",
        price: "USD $120 - $980",
        image: "/assets/images/products/headset.png",
        isNew: false
      },
      {
        id: 102,
        name: "Industrial Smart Watch",
        description: "Rugged, silent block suspension parts for vibration control in heavy machinery.",
        moq: "200 pc",
        price: "USD $120 - $980",
        image: "/assets/images/products/watch.png",
        isNew: false
      },
       {
        id: 103,
        name: "Multi-Port Industrial IoT Gateway",
        description: "DIN rail mountable system with Ethernet and CAN bus for data acquisition and control",
        moq: "10 pc",
        price: "USD $120 - $980",
        image: "/assets/images/products/gateway.png",
        isNew: false
      },
      {
          id: 104,
          name: "High-Speed USB-C Data Cable",
          description: "Precision machined cable for high-bandwidth data transfer and quick charging",
          moq: "100 pc",
          price: "USD $120 - $980",
          image: "/assets/images/products/cable.png",
          isNew: false
      },
       {
        id: 105,
        name: "Power Steering Rack & Pinion",
        description: "Precision steering assembly for modern electric vehicle (EV) platforms.",
        moq: "100 pc",
        price: "USD $120 - $980",
        image: "/assets/images/products/rack.png",
        isNew: false
      },
      {
        id: 106,
        name: "Precision Disc Brake System",
        description: "Precision milling and turning of complex geometries (3-axis, 5-axis) for critic...",
        moq: "12 pc",
        price: "USD $120 - $980",
        image: "/assets/images/products/disc.png",
        isNew: false
      },
      {
          id: 107,
          name: "High-Speed USB-C Data Cable",
          description: "Precision machined cable for high-bandwidth data transfer and quick charging",
          moq: "100 pc",
          price: "USD $120 - $980",
          image: "/assets/images/products/cable.png",
          isNew: false
      },
       {
        id: 108,
        name: "Noise Reduction Headset",
        description: "Over-ear solution providing passive noise cancellation for operator..",
        moq: "12 pc",
        price: "USD $120 - $980",
        image: "/assets/images/products/headset.png",
        isNew: false
      },
  ];

  return (
    <div className="border-t border-gray-100 pt-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Product</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((p) => (
                <ProductListCard key={p.id} product={p} />
            ))}
      </div>

       <div className="flex justify-center mt-8">
            <button className="bg-[#110026] text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-[#2a0b4d] transition-colors shadow-sm">
                Load More
            </button>
        </div>
    </div>
  );
}

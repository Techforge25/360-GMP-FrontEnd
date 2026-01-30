"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function ProfileProducts({ products }) {
  const dummyProducts = [
    {
      id: 1,
      name: "ANC Pro Wireless Earbuds",
      description: "High-fidelity audio with Active Noise Cancellation for professional use.",
      moq: "100 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/earbuds.png"
    },
     {
      id: 2,
      name: "Industrial Smart Watch",
      description: "Rugged, silent block suspension parts for vibration control in heavy machinery.",
      moq: "200 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/watch.png"
    },
     {
      id: 3,
      name: "High-Speed USB-C Data Cable",
      description: "Precision machined cable for high-bandwidth data transfer and quick charging",
      moq: "100 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/cable.png"
    },
    {
      id: 4,
      name: "Power Steering Rack & Pinion",
      description: "Precision steering assembly for modern electric vehicle (EV) platforms.",
      moq: "100 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/rack.png"
    },
    // Row 2
    {
      id: 5,
      name: "Precision Disc Brake System",
      description: "Precision milling and turning of complex geometries (3-axis, 5-axis) for critic...",
      moq: "12 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/disc.png"
    },
    {
      id: 6,
      name: "Noise Reduction Headset",
      description: "Over-ear solution providing passive noise cancellation for operator..",
      moq: "12 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/headset.png"
    },
    {
      id: 7,
      name: "Multi-Port Industrial IoT Gateway",
      description: "DIN rail mountable system with Ethernet and CAN bus for data acquisition and control",
      moq: "10 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/gateway.png"
    },
    {
      id: 8,
      name: "Wired QC/Inspection Headphone",
      description: "Entry-level wired headset for quality control stations and standardized audio testing.",
      moq: "12 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/wired-headphone.png"
    }

  ];

  const productList = products || dummyProducts;

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productList.map((product) => (
              <div key={product.id} className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-40 bg-gray-100 relative group">
                       <div className="absolute top-2 right-2 text-orange-400 bg-white p-1 rounded-full shadow-sm">
                           <FaStar className="text-xs" />
                       </div>
                       {/* Placeholder for image */}
                       <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                            {/* In real app use Image component */}
                           <span className="text-xs">Product Image</span>
                       </div>
                  </div>
                  
                  <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1 truncate" title={product.name}>{product.name}</h3>
                      <p className="text-xs text-gray-500 mb-4 line-clamp-2 h-8 leading-4">{product.description}</p>
                      
                      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                          <span>MOQ: {product.moq}</span>
                          <span>{product.price}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                           <button className="border border-indigo-900 text-indigo-900 rounded py-1.5 text-xs font-semibold hover:bg-slate-50 transition-colors">
                               Add To Cart
                           </button>
                           <button className="bg-[#110026] text-white rounded py-1.5 text-xs font-semibold hover:bg-[#2a0b4d] transition-colors">
                               Chat Now
                           </button>
                      </div>
                  </div>
              </div>
          ))}
      </div>

       <div className="mt-8 flex justify-center">
           <button className="bg-white border border-gray-200 text-gray-700 px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-gray-50 transition-colors shadow-sm">
               View All Product &rarr;
           </button>
       </div>
    </div>
  );
}

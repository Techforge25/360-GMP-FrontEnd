"use client";
import React from "react";
import { FiSearch } from "react-icons/fi";
import CompanyProductHeader from "./CompanyProductHeader";
import ProductFilterSidebar from "./ProductFilterSidebar";
import ProductListCard from "./ProductListCard";

export default function ProductListingContent() {
  const products = [
    {
      id: 1,
      name: "ANC Pro Wireless Earbuds",
      description: "High-fidelity audio with Active Noise Cancellation for professional use.",
      moq: "100 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/earbuds.png",
      isNew: true
    },
     {
      id: 2,
      name: "Industrial Smart Watch",
      description: "Rugged, silent block suspension parts for vibration control in heavy machinery.",
      moq: "200 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/watch.png",
      isNew: false
    },
     {
      id: 3,
      name: "High-Speed USB-C Data Cable",
      description: "Precision machined cable for high-bandwidth data transfer and quick charging",
      moq: "100 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/cable.png",
      isNew: false
    },
    {
      id: 4,
      name: "Power Steering Rack & Pinion",
      description: "Precision steering assembly for modern electric vehicle (EV) platforms.",
      moq: "100 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/rack.png",
      isNew: false
    },
     {
      id: 5,
      name: "Precision Disc Brake System",
      description: "Precision milling and turning of complex geometries (3-axis, 5-axis) for critic...",
      moq: "12 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/disc.png",
      isNew: false
    },
    {
      id: 6,
      name: "Noise Reduction Headset",
      description: "Over-ear solution providing passive noise cancellation for operator..",
      moq: "12 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/headset.png",
      isNew: true
    },
    {
      id: 7,
      name: "Multi-Port Industrial IoT Gateway",
      description: "DIN rail mountable system with Ethernet and CAN bus for data acquisition and control",
      moq: "10 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/gateway.png",
      isNew: false
    },
    {
      id: 8,
      name: "Wired QC/Inspection Headphone",
      description: "Entry-level wired headset for quality control stations and standardized audio testing.",
      moq: "12 pc",
      price: "USD $120 - $980",
      image: "/assets/images/products/wired-headphone.png",
      isNew: false
    },
    {
        id: 9,
        name: "ANC Pro Wireless Earbuds",
        description: "High-fidelity audio with Active Noise Cancellation for professional use.",
        moq: "100 pc",
        price: "USD $120 - $980",
        image: "/assets/images/products/earbuds.png",
        isNew: true
      },
      {
        id: 10,
        name: "Industrial Smart Watch",
        description: "Rugged, silent block suspension parts for vibration control in heavy machinery.",
        moq: "200 pc",
        price: "USD $120 - $980",
        image: "/assets/images/products/watch.png",
        isNew: false
      },
       {
        id: 11,
        name: "High-Speed USB-C Data Cable",
        description: "Precision machined cable for high-bandwidth data transfer and quick charging",
        moq: "100 pc",
        price: "USD $120 - $980",
        image: "/assets/images/products/cable.png",
        isNew: false
      }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6 font-medium">
                Business List <span className="mx-1">&gt;</span> Techvision Solutions <span className="mx-1 font-bold text-gray-900">&gt; Product List</span>
            </div>

            <CompanyProductHeader />
            
            {/* Search Bar */}
            <div className="flex justify-center mb-10">
                <div className="flex w-full max-w-2xl bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                    <div className="flex items-center px-4 text-gray-400">
                        <FiSearch className="text-lg" />
                    </div>
                    <input 
                        type="text"
                        placeholder="Search Products By Name,Model,Or SKU.."
                        className="flex-1 py-3 px-2 outline-none text-sm text-gray-700 placeholder-gray-400"
                    />
                    <button className="bg-[#110026] text-white px-8 py-3 font-semibold text-sm hover:bg-[#2a0b4d] transition-colors">
                        Search
                    </button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <ProductFilterSidebar />

                {/* Main Content */}
                <div className="flex-1">
                     <div className="flex justify-between items-center mb-6">
                         <h2 className="text-xl font-bold text-gray-900">Showing 150 Product</h2>
                         <div className="flex items-center gap-2">
                             <span className="text-sm text-gray-500">Sort By</span>
                             <select className="border border-gray-200 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-indigo-500">
                                 <option>Most Relevant</option>
                                 <option>Price: Low to High</option>
                                 <option>Price: High to Low</option>
                                 <option>Newest First</option>
                             </select>
                         </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                         {products.map((p) => (
                             <ProductListCard key={p.id} product={p} />
                         ))}
                     </div>
                     
                     {/* Load More */}
                     <div className="flex justify-center mt-12">
                         <button className="bg-[#110026] text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-[#2a0b4d] transition-colors">
                             Load More
                         </button>
                     </div>
                </div>
            </div>
       </div>
    </div>
  );
}

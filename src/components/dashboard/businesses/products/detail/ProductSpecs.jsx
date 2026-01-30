"use client";
import React, { useState } from "react";

export default function ProductSpecs() {
  const [activeTab, setActiveTab] = useState("specs");

  const specs = [
    { label: "Model Number", value: "ANC-X200 Pro" },
    { label: "Bluetooth Version", value: "V5.3 + EDR" },
    { label: "Battery Life", value: "30 Hours (with Case)" },
    { label: "Waterproof Standard", value: "IPX5" },
    { label: "Certification", value: "CE, RoHS, FCC" },
  ];

  return (
    <div className="mb-12">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
            <button 
                onClick={() => setActiveTab("specs")}
                className={`pb-3 pr-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'specs' ? 'border-indigo-900 text-indigo-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                Technical Specifications
            </button>
            <button 
                onClick={() => setActiveTab("company")}
                className={`pb-3 px-6 text-sm font-bold border-b-2 transition-colors ${activeTab === 'company' ? 'border-indigo-900 text-indigo-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
                Company Profile
            </button>
        </div>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8">
            {/* Table */}
            <div className="w-full md:w-1/2">
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                    {specs.map((spec, index) => (
                        <div key={index} className={`flex text-sm ${index !== specs.length - 1 ? 'border-b border-gray-200' : ''}`}>
                            <div className="w-1/2 p-3 font-bold text-gray-700 bg-gray-100/50">{spec.label}</div>
                            <div className="w-1/2 p-3 text-gray-600 bg-gray-50">{spec.value}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Highlights */}
            <div className="w-full md:w-1/2 bg-gray-50/50 rounded-lg p-6 border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-sm">Product Highlights</h3>
                <ul className="space-y-2">
                    {[
                        "Active Noise Cancellation up to 35dB",
                        "Transparency Mode for ambient awareness",
                        "Dual-mic ENC for crystal clear calls",
                        "Low latency gaming mode (60ms)"
                    ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></span>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  );
}

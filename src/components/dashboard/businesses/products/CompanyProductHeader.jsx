"use client";
import React from "react";
import { MdVerified } from "react-icons/md";

export default function CompanyProductHeader({ businessName = "TechVision Solutions." }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col md:flex-row items-center gap-6 mb-8">
      <div className="w-20 h-20 rounded-full border border-gray-100 p-3 bg-white flex items-center justify-center flex-shrink-0">
          <img src="/assets/images/profileLogo.png" alt="Logo" className="w-full h-full object-contain" />
      </div>
      
      <div className="text-center md:text-left">
          <p className="text-gray-500 text-sm mb-1">products offered by :</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{businessName}</h1>
          <div className="flex items-center justify-center md:justify-start gap-2 text-gray-500 text-sm">
               <span>Verified Supplier</span>
               <span className="w-1 h-1 rounded-full bg-gray-400"></span>
               <span>ISO 9001 Certified</span>
          </div>
      </div>
    </div>
  );
}

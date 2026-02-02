"use client";
import React from "react";
import Image from "next/image";
import { FaCheckCircle, FaStar, FaRegClock } from "react-icons/fa";
import { MdVerified, MdReportGmailerrorred } from "react-icons/md";
import { BsBuildings, BsCalendar3, BsGlobe } from "react-icons/bs";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { FiShare2 } from "react-icons/fi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useUserRole } from "@/context/UserContext";

export default function ProfileHeader({ business }) {
  const { user } = useUserRole();
  const isUserRole = user?.role === "user";
  
  const {
    name = "TechVision Solutions.",
    banner = "/assets/images/business-banner.jpg", // You might need a placeholder or create one
    logo = "/assets/images/profileLogo.png",
    verified = true,
    rating = 4.9,
    employees = "500-1000 Employees",
    revenue = "USD $3.6M+",
    age = "3 yrs",
    industry = "IT consulting",
    location = "New York USA",
    stats = {
      delivery: "100%",
      reorder: "<15%",
      response: "≤6h",
      revenue: "USD $3.6M+",
      products: "210"
    }
  } = business || {};

  return (
    <div>
      {/* Breadcrumb - constrained width */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-0">
        <div className="text-sm text-gray-700 mb-6 font-medium">
            Business List <span className="mx-1">&gt;</span> <span className="text-[#240457]">{name}</span> 
        </div>
      </div>

      {/* Banner - full width */}
      <div className="h-48 md:h-64 relative bg-gray-900 ">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-blue-900/50 mix-blend-multiply"></div>
        {/* Placeholder for banner image */}
        <div className="absolute inset-0 bg-[url('/assets/images/businessInnerPageBanner.png')] bg-cover bg-center opacity-60"></div>
        
        <div className="absolute bottom-4 right-4 flex gap-3">
             {isUserRole && (
               <button className="bg-[#f2994a] text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#e08a3e] transition-colors">
                   Post A Review <FiShare2 />
               </button>
             )}
             <button className="bg-white text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors">
                 Report <MdReportGmailerrorred className="text-lg"/>
             </button>
        </div>
      </div>

      {/* Profile Info Section - constrained width */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 rounded-xl mb-6 relative">
        {/* Logo - Overlapping Banner */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="w-24 h-24 bg-white rounded-xl shadow-lg p-2 flex items-center justify-center">
                 <div className="w-full h-full border border-cyan-100 rounded-lg flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
                 </div>
            </div>
        </div>

        {/* Main Text Info */}
        <div className="pt-16 pb-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className="text-2xl font-medium text-black">{name}</h1>
                {verified && <MdVerified className="text-blue-500 text-xl" />}
            </div>

            {/* Meta Row */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-400" />
                    <span className="text-gray-500">{rating} / 5</span>
                </div>
                <div className="flex items-center gap-1">
                    <BsBuildings />
                    <span>{employees}</span>
                </div>
                <div className="flex items-center gap-1">
                    <span>$ Revenue • {revenue}</span>
                </div>
                <div className="flex items-center gap-1">
                    <BsCalendar3 />
                    <span>{age}</span>
                </div>
                <div className="flex items-center gap-1">
                    <AiOutlineSafetyCertificate /> 
                    <span>{industry}</span>
                </div>
                 <div className="flex items-center gap-1">
                    <HiOutlineLocationMarker />
                    <span>{location}</span>
                </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-gray-100 border-t bg-[#F8F9FB] pt-6">
                <div className="px-4 text-center md:text-left">
                    <p className="text-sm font-semibold text-black mb-1">On-time delivery</p>
                    <p className="text-gray-500 text-sm">{stats.delivery}</p>
                </div>
                <div className="px-4 text-center md:text-left">
                    <p className="text-sm font-semibold text-black mb-1">Reorder rate</p>
                    <p className="text-gray-500 text-sm">{stats.reorder}</p>
                </div>
                <div className="px-4 text-center md:text-left">
                    <p className="text-sm font-semibold text-black mb-1">Response time</p>
                    <p className="text-gray-500 text-sm">{stats.response}</p>
                </div>
                 <div className="px-4 text-center md:text-left">
                    <p className="text-sm font-semibold text-black mb-1">Online revenue</p>
                    <p className="text-gray-500 text-sm">{stats.revenue}</p>
                </div>
                 <div className="px-4 text-center md:text-left border-r-0">
                    <p className="text-sm font-semibold text-black mb-1">Products Types</p>
                    <p className="text-gray-500 text-sm">{stats.products}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

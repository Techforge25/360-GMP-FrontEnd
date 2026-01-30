"use client";
import React from "react";
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram, FaCheckCircle } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineGlobe, HiOutlineLocationMarker } from "react-icons/hi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

export default function ProfileOverview({ business }) {
  const {
    description = "TechVision Solutions is the premier B2B platform specializing in the wholesale supply and trade of Advanced Electronics, Industrial Computing Hardware, and Manufacturing Components. We serve as the essential connection between global electronics manufacturers and buyers looking for verified, bulk supply solution",
    businessType = "Private Corporation",
    founded = "2021 (3 yrs ago)",
    operatingHours = "Monday - Friday: 9:00 AM - 6:00 PM PST",
    certifications = [
        { name: "ISO 9001:2025", desc: "Quality Management", icon: "iso" },
        { name: "CE Certified", desc: "European Conformity", icon: "ce" }
    ],
    contact = {
        email: "contact@techvision.com",
        phone: "+1 (347) 123 4698",
        website: "www.techvision.com",
        address: "123 abv, street 1, SanFransisco, Unites States"
    }
  } = business || {};

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-10">
      {/* Left Column: Overview */}
      <div className="flex-1 bg-white rounded-xl p-6 border border-gray-100 flex flex-col justify-between">
         <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed mb-10 text-sm">
                {description}
            </p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100 pt-6">
            <div>
                <p className="text-xs font-bold text-gray-900 mb-1">Business Type</p>
                <p className="text-gray-500 text-sm">{businessType}</p>
            </div>
            <div>
                <p className="text-xs font-bold text-gray-900 mb-1">Founded</p>
                <p className="text-gray-500 text-sm">{founded}</p>
            </div>
             <div>
                <p className="text-xs font-bold text-gray-900 mb-1">Operating Hours</p>
                <p className="text-gray-500 text-sm">{operatingHours}</p>
            </div>
         </div>
      </div>

      {/* Right Column: Sidebar */}
      <div className="w-full lg:w-96 space-y-6">
        
        {/* Certifications Box */}
        <div className="bg-white rounded-xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Certifications</h3>
            <div className="space-y-3">
                {certifications.map((cert, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 flex items-start gap-3">
                         <div className={`mt-1 ${cert.icon === 'iso' ? 'text-orange-500' : 'text-blue-500'}`}>
                            <IoShieldCheckmarkOutline className="text-xl" />
                         </div>
                         <div>
                             <p className="text-sm font-bold text-gray-900">{cert.name}</p>
                             <p className="text-xs text-gray-500">{cert.desc}</p>
                         </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Contact Info Box */}
        <div className="bg-gray-50/50 rounded-xl p-6 border border-gray-100">
             <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Info</h3>
             <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3 text-sm text-gray-600">
                    <HiOutlineMail className="text-lg mt-0.5 text-indigo-900"/>
                    <span>{contact.email}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                    <HiOutlinePhone className="text-lg mt-0.5 text-indigo-900"/>
                    <span>{contact.phone}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                    <HiOutlineGlobe className="text-lg mt-0.5 text-indigo-900"/>
                    <span>{contact.website}</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-600">
                    <HiOutlineLocationMarker className="text-lg mt-0.5 text-indigo-900"/>
                    <span>{contact.address}</span>
                </li>
             </ul>

             <div className="mb-4">
                 <p className="text-sm text-gray-500 mb-3">Social Media</p>
                 <div className="flex gap-3">
                     {[FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram].map((Icon, i) => (
                         <div key={i} className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-900 hover:bg-indigo-100 cursor-pointer transition-colors">
                             <Icon className="text-sm" />
                         </div>
                     ))}
                 </div>
             </div>
            
             {/* Map Placeholder */}
             <div className="rounded-lg overflow-hidden h-24 bg-gray-200 relative">
                  <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-74.0066,40.7135,12,0/300x200?access_token=YOUR_TOKEN')] bg-cover bg-center">
                    {/* Fallback pattern if no image */}
                  </div>
                  <img src="/assets/images/map_placeholder.png" className="w-full h-full object-cover" alt="Map Location" 
                       onError={(e) => e.target.style.display = 'none'} />
             </div>
        </div>

      </div>
    </div>
  );
}

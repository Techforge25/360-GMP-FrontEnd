"use client";
import React from "react";
import { FaStar } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BiLike } from "react-icons/bi";

export default function ProfileTestimonials() {
  const testimonials = [
    {
       name: "John Doe",
       avatar: "/assets/images/avatar1.png", // Use fallback
       date: "October 26, 2026",
       text: '"Before TechVision Solutions. Finding reliable suppliers for specialty alloys was a nightmare. Now, we\'ve secured three bulk contracts with verified partners in Europe. The B2B transaction tools are secure and simple."',
       company: "Tanaka Manufacturing, Japan",
       likes: 23
    },
    {
       name: "Dr. Lena Rossi",
       avatar: "/assets/images/avatar2.png", 
       date: "October 26, 2026",
       text: '"Before TechVision Solutions. Finding reliable suppliers for specialty alloys was a nightmare. Now, we\'ve secured three bulk contracts with verified partners in Europe. The B2B transaction tools are secure and simple."',
       company: "Global Pharma Solutions, Italy",
       likes: 40
    },
    {
       name: "Olivia",
       avatar: "/assets/images/avatar3.png", 
       date: "October 26, 2026",
       text: 'Before TechVision Solutions. Finding reliable suppliers for specialty alloys was a nightmare. Now, we\'ve secured three bulk contracts with verified partners in Europe. The B2B transaction tools are secure and simple."',
       company: "Future Energy Systems, USA",
       likes: 2
    },
    {
       name: "Jonathan",
       avatar: "/assets/images/avatar4.png", 
       date: "October 26, 2026",
       text: 'Before TechVision Solutions. Finding reliable suppliers for specialty alloys was a nightmare. Now, we\'ve secured three bulk contracts with verified partners in Europe. The B2B transaction tools are secure and simple."',
       company: "Tanaka Manufacturing, Japan",
       likes: 0
    }
  ];

  return (
    <div className="mb-20">
      <h2 className="text-center text-3xl font-semibold text-black mb-10">Testimonials</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
             <div key={i} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex justify-between items-start mb-4">
                     <div className="flex items-center gap-3">
                         <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                             {/* Avatar */}
                         </div>
                         <div>
                             <h4 className="font-bold text-gray-900">{t.name}</h4>
                             <div className="flex items-center gap-2">
                                 <div className="flex text-yellow-400 text-sm">
                                     <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                 </div>
                                 <span className="bg-indigo-50 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                                     <MdVerified /> Verified Purchaser
                                 </span>
                             </div>
                         </div>
                     </div>
                     <span className="text-sm text-gray-400">{t.date}</span>
                 </div>

                 <p className="text-gray-600 text-sm leading-relaxed mb-6">
                     {t.text}
                 </p>

                 <div className="flex items-center gap-4">
                     <span className="bg-gray-50 border border-gray-200 text-gray-600 px-3 py-1 rounded text-sm">
                         {t.company}
                     </span>
                     <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm border border-gray-200 px-3 py-1 rounded hover:bg-gray-50">
                         <BiLike /> Like ({t.likes})
                     </button>
                 </div>
             </div>
          ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-2">
           <button className="px-4 py-2 bg-gray-100 text-gray-500 rounded hover:bg-gray-200 text-sm"> &lt; Back </button>
           <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm">1</button>
           <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm">2</button>
           <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm">3</button>
           <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm">4</button>
           <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm">5</button>
           <span className="mx-1 text-gray-400">...</span>
           <button className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded text-gray-600 hover:bg-gray-50 text-sm">30</button>
           <button className="px-4 py-2 bg-[#110026] text-white rounded hover:bg-[#2a0b4d] text-sm"> Next &gt; </button>
      </div>
    </div>
  );
}

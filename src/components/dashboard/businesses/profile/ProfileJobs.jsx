"use client";
import React from "react";
import { FiMapPin, FiClock } from "react-icons/fi";
import { BsBagCheck } from "react-icons/bs";
import { Button } from "@/components/ui/Button"; // Check if Button exists, otherwise standard button

export default function ProfileJobs({ jobs }) {
  const dummyJobs = [
    {
      id: 1,
      title: "Social Media Marketer For Our Brand",
      company: "Tech Vision",
      location: "Ottawa-Canada",
      type: "Full Time",
      posted: "2 Days Ago",
      logo: "/assets/images/profileLogo.png" 
    },
    {
       id: 2,
      title: "PPC Expert",
      company: "Global Manufacturing Co.",
      location: "Ottawa-Canada",
      type: "Full Time",
      posted: "1 Month Ago",
      logo: "/assets/images/profileLogo.png" 
    }
  ];

  const jobsList = jobs || dummyJobs;

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 mb-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Jobs Posted By TechVision Solutions</h2>
      
      <div className="space-y-4">
        {jobsList.map((job) => (
          <div key={job.id} className="border border-gray-100 rounded-lg p-5 flex flex-col md:flex-row gap-4 hover:border-indigo-100 hover:shadow-sm transition-all">
             <div className="w-16 h-16 bg-cyan-50 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                 <img src={job.logo} alt={job.company} className="w-10 h-10 object-contain" />
             </div>
             
             <div className="flex-1">
                 <h3 className="text-lg font-bold text-gray-900 mb-1">{job.title}</h3>
                 <p className="text-sm text-indigo-900 font-medium mb-3">{job.company}</p>
                 
                 <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                     <div className="flex items-center gap-1">
                         <FiMapPin /> {job.location}
                     </div>
                     <div className="flex items-center gap-1">
                         <BsBagCheck /> {job.type}
                     </div>
                     <div className="flex items-center gap-1">
                         <FiClock /> {job.posted}
                     </div>
                 </div>
             </div>

             <div className="flex items-center">
                 <button className="border border-indigo-200 text-indigo-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors">
                     View Details &gt;
                 </button>
             </div>
          </div>
        ))}
      </div>

       <div className="mt-6">
           <button className="bg-[#110026] text-white px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#2a0b4d] transition-colors">
               View More Job &rarr;
           </button>
       </div>
    </div>
  );
}

"use client";
import React from "react";
import { BsGlobe } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";

export default function ProfileCommunities() {
  const communities = [
    {
      id: 1,
      title: "MedTech Pioneers Community",
      category: "Healthcare",
      description: "Connecting healthcare professionals to discuss telemedicine, AI diagnostics, and patient care...",
      active: "Active 8h ago",
      members: "56.3k Members",
      image: "healthcare-bg",
      avatars: [1, 2, 3]
    },
    {
      id: 2,
      title: "Future Of Fintech Community",
      category: "Finance",
      description: "Blockchain adoption, decentralized finance (DeFi), and digital banking security protocols.",
      active: "Active 5m ago",
      members: "50.8k Members",
      image: "finance-bg",
      avatars: [1, 2, 3]
    }
  ];

  return (
    <div className="mb-10 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">TechVision Solutions Communities</h2>
      <p className="text-gray-500 text-sm mb-8 max-w-3xl mx-auto">
        A dedicated professional hub for discussing the latest trends and practical applications in Industrial Technology, Manufacturing Automation, and Supply Chain Digitization. Join to share insights, find expert answers, and network with industry leaders in B2B Tech
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          {communities.map((comm) => (
              <div key={comm.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  {/* Banner */}
                  <div className="h-40 bg-gray-200 relative">
                       {/* Placeholder for banner */}
                       <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-20"></div>
                       
                       <span className="absolute top-3 right-3 bg-white px-2 py-1 rounded text-xs font-semibold shadow-sm">
                           {comm.category}
                       </span>

                       <div className="absolute bottom-3 right-3 bg-white p-1 rounded-full shadow-sm text-blue-500">
                           <BsGlobe />
                       </div>
                  </div>

                  <div className="p-5">
                      <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-900 text-lg leading-tight w-3/4">{comm.title}</h3>
                          <div className="flex -space-x-2">
                              {/* Dummy Avatars */}
                              <div className="w-6 h-6 rounded-full bg-gray-300 border border-white"></div>
                              <div className="w-6 h-6 rounded-full bg-gray-400 border border-white"></div>
                              <div className="w-6 h-6 rounded-full bg-gray-200 border border-white flex items-center justify-center text-[8px] font-bold text-gray-600">4k</div>
                          </div>
                      </div>

                      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                          {comm.description}
                      </p>

                      <div className="flex justify-between items-center text-xs text-gray-400 pt-4 border-t border-gray-100 mb-4">
                          <span>{comm.active}</span>
                          <span className="flex items-center gap-1"><HiOutlineUserGroup /> {comm.members}</span>
                      </div>

                      <button className="w-full border border-indigo-900 text-indigo-900 py-2 rounded-lg font-semibold hover:bg-slate-50 transition-colors">
                          Join Community
                      </button>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
}

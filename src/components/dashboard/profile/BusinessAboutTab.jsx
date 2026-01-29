"use client";
import React, { useState } from "react";
import { FiExternalLink, FiCamera, FiEdit2, FiTrash2 } from "react-icons/fi";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

// Custom Tooltip component - defined outside to prevent re-creation on each render
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-3 py-2 shadow-lg rounded-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-900">
          {payload[0].name}
        </p>
        <p className="text-sm text-gray-600">{payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const BusinessAboutTab = () => {
  // Mock data - replace with API data later
  const [aboutData] = useState({
    storyMission:
      "Global Manufacturing Co. is a leading Tier 1 and Tier 2 supplier specializing in high-tolerance components, advanced material production, and efficient sub-assembly modules. With over 15 years of operational excellence, we partner with automotive OEMs and other suppliers to ensure supply chain resilience, superior component quality, and compliance with strict industry standards (like IATF 16949). We drive manufacturing optimization from raw material input to just-in-time delivery.",
  });

  const [exportData] = useState([
    { name: "North America", value: 25, color: "#6366F1" },
    { name: "South America", value: 15, color: "#8B5CF6" },
    { name: "European Union", value: 30, color: "#F97316" },
    { name: "Asia Pacific", value: 20, color: "#3B82F6" },
    { name: "Other", value: 10, color: "#6B7280" },
  ]);

  const [certifications] = useState([
    {
      id: 1,
      name: "ISO 9001:2025",
      description: "Quality Management",
      icon: "🏅",
    },
    {
      id: 2,
      name: "CE Certified",
      description: "European Conformity",
      icon: "✓",
    },
  ]);

  const [gallery] = useState([
    {
      id: 1,
      title: "lab",
      description: "quality control and testing lab.",
      image: "/assets/images/gallery1.jpg",
    },
    {
      id: 2,
      title: "lab",
      description: "quality control and testing lab.",
      image: "/assets/images/gallery2.jpg",
    },
    {
      id: 3,
      title: "Packaging Area",
      description: "automated packaging and shipping",
      image: "/assets/images/gallery3.jpg",
    },
  ]);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Our Story & Mission */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-lg font-bold text-gray-900">
              Our Story & Mission
            </h2>
            <button className="flex items-center gap-2 text-[#240457] text-sm font-semibold hover:underline">
              Edit About Section
              <FiExternalLink className="w-4 h-4" />
            </button>
          </div>

          <p className="text-sm text-gray-600 leading-relaxed">
            {aboutData.storyMission}
          </p>
        </div>

        {/* Export Market Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-lg font-bold text-gray-900">
              Export Market Distribution
            </h2>
            <button className="flex items-center gap-2 text-[#240457] text-sm font-semibold hover:underline">
              Manage Featured Products
              <FiExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Chart */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-[300px] h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={exportData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {exportData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              {/* Center Label */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                <p className="text-xs text-gray-500">European Union</p>
                <p className="text-lg font-bold text-orange-500">30</p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {exportData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs text-gray-600">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
            <h2 className="text-lg font-bold text-gray-900">Gallery</h2>
            <button className="flex items-center gap-2 text-[#240457] text-sm font-semibold hover:underline">
              Add To Your Profile
              <span className="text-gray-400">|</span>
              <FiCamera className="w-4 h-4 text-green-600" />
              <span className="text-green-600">Photo/Video</span>
            </button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="relative rounded-xl overflow-hidden group aspect-[4/3]"
              >
                {/* Image */}
                <div className="absolute inset-0 bg-gray-200">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.style.background =
                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
                    }}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Action Buttons */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <button className="p-1.5 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                  <button className="p-1.5 bg-white text-gray-700 rounded-md hover:bg-gray-100 transition-colors">
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-base">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Certifications */}
      <div className="w-full lg:w-[320px] xl:w-[350px]">
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Certifications</h3>
            <button className="text-[#240457] text-sm font-semibold hover:underline">
              Manage
            </button>
          </div>

          <div className="space-y-3">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex items-start gap-3 p-4 bg-[#F8F5FF] rounded-xl"
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                  {cert.name.includes("ISO") ? (
                    <span className="text-lg">🏅</span>
                  ) : (
                    <div className="w-6 h-6 bg-[#240457] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-gray-900">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-gray-500">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessAboutTab;

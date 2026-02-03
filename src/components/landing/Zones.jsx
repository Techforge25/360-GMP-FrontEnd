"use client";
import React from "react";
import { BsHouseAdd } from "react-icons/bs";
import { FiGlobe, FiBriefcase, FiUsers, FiMessageCircle } from "react-icons/fi";

const Zones = () => {
  const zones = [
    {
      title: "Marketplace",
      icon: <img src="/assets/images/marketplaceIcon2.png" alt="" />,
      desc: "Browse single & bulk listings, compare pricing, chat securely with sellers, and purchase using the Escrow system.",
      border: "hover:border hover:border-brand-primary",
    },
    {
      title: "Business Zone",
      icon: <img src="/assets/images/zoneIcon.png" alt="" />,
      desc: "Manage your product catalog, handle order fulfillment, and utilize advanced tools for job posting & hiring.",
      border: "hover:border hover:border-brand-primary-light",
    },
    {
      title: "Job Portal",
      icon: <img src="/assets/images/jobIcon2.png" alt="" />,
      desc: "Find or post jobs, apply with one click, and manage all your candidate pipelines and application statuses in one place.",
      border: "hover:border hover:border-brown",
    },
    {
      title: "Community Hub",
      icon: <img src="/assets/images/hubIcon.png" alt="" />,
      desc: "Join industry-based groups for networking, knowledge sharing, direct discussions, and real-time collaboration.",
      border: "hover:border hover:border-blue-dark",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-[#F8F9FB] to-[#FFFFF5]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl max-w-xl mx-auto font-semibold text-black mb-4">
            Explore Our Dedicated Platform Zones
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {zones.map((zone, i) => (
            <div
              key={i}
              className={`bg-white p-6 ${zone.border} rounded-xl shadow-lg transition-all duration-600`}
            >
              <div
                className={`w-12 h-12 rounded-lg bg-[#EAE6EF] flex items-center justify-center mb-4`}
              >
                {zone.icon}
              </div>
              <h3 className="font-bold text-lg text-black mb-2">
                {zone.title}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed">
                {zone.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-gray-300 pt-10">
          <h3 className="text-center font-semibold text-3xl text-black mb-8">
            Key Features
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Global Supplier Matching",
                icon: <FiGlobe className="w-6 h-6 text-brand-primary" />,
                desc: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
                bg: "bg-highlight-green border-green",
              },
              {
                title: "New Business Opportunities",
                icon: <FiBriefcase className="w-6 h-6 text-brand-primary" />,
                desc: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
                bg: "bg-highlight-blue border-blue-dark",
              },
              {
                title: "Community Engagement",
                iconColor: "text-brown",
                desc: "lorem ipsum dolor sit amet consectetur adipisicing elit.",
                bg: "bg-highlight-yellow border-brown",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`${feature.bg} p-8 pt-6 pl-6 rounded-lg border transition-all duration-300 hover:shadow-lg flex flex-col gap-4`}
              >
                <h4 className="font-bold text-text-primary mb-2 flex items-center gap-2">
                  <BsHouseAdd className={`w-6 h-6 ${feature.iconColor}`} />
                  {feature.title}
                </h4>

                <p className="text-base text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Zones;

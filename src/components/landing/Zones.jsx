"use client";
import React from "react";
import { BsHouseAdd } from "react-icons/bs";
import { FiGlobe, FiBriefcase, FiUsers, FiMessageCircle } from "react-icons/fi";

const Zones = () => {
  const zones = [
    {
      title: "Marketplace",
      icon: <FiGlobe className="w-6 h-6 text-brand-primary" />,
      desc: "Browse global commodities, manufactured goods, and verified suppliers.",
      border: "hover:border hover:border-brand-primary",
    },
    {
      title: "Business Zone",
      icon: <FiBriefcase className="w-6 h-6 text-brand-primary" />,
      desc: "Manage your business profile, products, jobs, and orders in one place.",
      border: "hover:border hover:border-brand-primary-light",
    },
    {
      title: "Job Portal",
      icon: <FiUsers className="w-6 h-6 text-brand-primary" />,
      desc: "Find specialized talent or land your dream job with top manufacturers.",
      border: "hover:border hover:border-brown",
    },
    {
      title: "Community Hub",
      icon: <FiMessageCircle className="w-6 h-6 text-brand-primary" />,
      desc: "Network with peers, join industry groups, and share insights.",
      border: "hover:border hover:border-blue-dark",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-950 mb-4">
            Explore Our Dedicated Platform Zones
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Each zone is tailored to specific needs, creating a cohesive yet
            specialized experience for every user type.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {zones.map((zone, i) => (
            <div
              key={i}
              className={`bg-white p-6 ${zone.border} rounded-xl shadow-lg transition-all duration-600`}
            >
              <div
                className={`w-12 h-12 rounded-lg bg-highlight-purple flex items-center justify-center mb-4`}
              >
                {zone.icon}
              </div>
              <h3 className="font-bold text-lg text-brand-primary mb-2">
                {zone.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {zone.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h3 className="text-center font-semibold text-4xl text-brand-primary mb-8">
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

                <p className="text-sm text-text-secondary">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Zones;

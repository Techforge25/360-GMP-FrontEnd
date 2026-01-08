"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiShoppingBag, FiBriefcase, FiUser } from "react-icons/fi";

const Capabilities = () => {
  const cards = [
    {
      title: "For Buyers",
      icon: <FiShoppingBag className="w-6 h-6" />,
      color: "bg-highlight-purple text-brand-primary",
      borderColor: "border-brand-primary",
      features: [
        "Verified Sellers",
        "Secure Escrow",
        "Global Sourcing",
        "Quality Assurance",
      ],
    },
    {
      title: "For Businesses",
      icon: <FiBriefcase className="w-6 h-6" />,
      color: "bg-highlight-blue text-brand-primary",
      borderColor: "border-brand-primary-light",
      features: [
        "Global Exposure",
        "Verified Badge",
        "Deal Management",
        "Smart Analytics",
      ],
    },
    {
      title: "For Job Seekers",
      icon: <FiUser className="w-6 h-6" />,
      color: "bg-highlight-yellow text-brand-primary",
      borderColor: "border-accent-warning",
      features: [
        "Verified Employers",
        "Skill Matching",
        "Direct Applications",
        "Career Growth",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-brand-primary mb-4">
            Core Platform Capabilities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {cards.map((card, i) => (
            <div
              key={i}
              className={`bg-surface rounded-2xl p-8 border-t-6 ${card.borderColor} shadow-xl hover:shadow-2xl transition-all duration-300`}
            >
              <div
                className={`w-14 h-14 rounded-xl ${card.color} flex items-center justify-center mb-6`}
              >
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-4">
                {card.title}
              </h3>
              <ul className="space-y-3">
                {card.features.map((feat, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-3 text-text-secondary text-sm"
                  >
                    <FaCheckCircle className="text-accent-success" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-primary mb-12">
            How 360GMP Works Simple Steps
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              {
                step: 1,
                title: "Create Account",
                desc: "Sign up & choose role",
              },
              { step: 2, title: "Get Verified", desc: "Submit docs for trust" },
              {
                step: 3,
                title: "Connect &Trade",
                desc: "Access global market",
              },
              {
                step: 4,
                title: "Grow & Succeed",
                desc: "Expand your business",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center max-w-[200px]">
                <div className="w-16 h-16 rounded-full bg-white border-2 border-brand-primary shadow-sm flex items-center justify-center text-xl font-bold text-brand-primary mb-4 relative z-10">
                  {item.step}
                </div>
                <h4 className="font-bold text-brand-primary mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;

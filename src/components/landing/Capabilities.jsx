"use client";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiShoppingBag, FiBriefcase, FiUser } from "react-icons/fi";

const Capabilities = () => {
  const cards = [
    {
      title: "For Buyers",
      icon: <img src="/assets/images/buyerIcon.png" alt="" />,
      color: "bg-highlight-purple text-brand-primary",
      borderColor: "border-brand-primary",
      features: [
        "Buy single or bulk products",
        "View verified business catalogs",
        "Chat with sellers",
        "Apply for unlimited jobs",
        "Follow communities"
      ],
    },
    {
      title: "For Businesses",
      icon: <img src="/assets/images/businessIcon.png" alt="" />,
      color: "bg-highlight-blue text-brand-primary",
      borderColor: "border-brand-primary-light",
      features: [
        "Create single or bulk products",
        "View verified business catalogs",
        "Chat with buyer",
        "create unlimited jobs",
        "create communities"
      ],
    },
    {
      title: "For Job Seekers",
      icon: <img src="/assets/images/jobseekIcon.png" alt="" />,
      color: "bg-highlight-yellow text-brand-primary",
      borderColor: "border-accent-warning",
      features: [
        "Explore jobs across industries",
        "Apply with one click",
        "Track application status",
        "Receive instant updates",
      ],
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
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
          <h2 className="text-3xl font-semibold max-w-md mx-auto text-black mb-12">
            How 360GMP Works Simple Steps
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              {
                step: 1,
                title: "choose your account",
                desc: "Sign up in minutes and begin your Free Trial.",
              },
              { step: 2, title: "Explore Everything", desc: "Browse the Marketplace, Job Portal, and Business Catalogs." },
              {
                step: 3,
                title: "Upgrade to Membership",
                desc: "Unlock full features for unlimited scaling and access.",
              },
              {
                step: 4,
                title: "Start Earning / Hiring / Selling",
                desc: "Execute global transactions and build your professional network.",
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center max-w-[250px]">
                <div className="w-10 h-10 rounded-full bg-[#ECEFF6] shadow-sm flex items-center justify-center text-xl font-semibold text-brand-primary mb-4 relative z-10">
                  {item.step}
                </div>
                <h4 className="font-semibold capitalize text-black mb-1">
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

"use client";
import React from "react";
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import {
  FiShoppingBag,
  FiBriefcase,
  FiUser,
  FiLock,
  FiCreditCard,
} from "react-icons/fi";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { LuMinusSquare } from "react-icons/lu";

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
        "Follow communities",
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
        "create communities",
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

        <div className="text-center border-b-[1px] border-gray-300 pb-15">
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
              {
                step: 2,
                title: "Explore Everything",
                desc: "Browse the Marketplace, Job Portal, and Business Catalogs.",
              },
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

        {/* Built On Trust Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-semibold text-center text-black mb-12">
            Built On Trust And Security
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {/* Verified Business */}
            <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-green-500 bg-green-50/50 text-green-700 font-medium">
              <img src="/assets/images/verifyCheck.png" alt="" />
              <span>Verified Business</span>
            </div>

            {/* Secure Escrow Payments */}
            <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-blue-400 bg-blue-50/50 text-blue-600 font-medium">
              <img src="/assets/images/secureCheck.png" alt="" />
              <span>Secure Escrow Payments</span>
            </div>

            {/* Free Trial Available */}
            <div className="flex items-center gap-2 px-6 py-3 rounded-full border border-yellow-500 bg-yellow-50/50 text-yellow-700 font-medium">
              <img src="/assets/images/freeCheck.png" alt="" />
              <span>Free Trial Available</span>
            </div>
          </div>

          <div className="bg-[#F8FAFC] rounded-2xl p-8 md:p-12 border border-gray-100">
            <div className="flex flex-col gap-6 items-center text-sm md:text-base text-gray-600">
              {/* Row 1 */}
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-center">
                <span>Buyer pays</span>
                <HiOutlineArrowNarrowRight className="text-[#240457] text-lg md:text-2xl" />
                <span>Funds held securely</span>
                <HiOutlineArrowNarrowRight className="text-[#240457] text-lg md:text-2xl" />
                <span>Provider delivers service/goods</span>
                <HiOutlineArrowNarrowRight className="text-[#240457] text-lg md:text-2xl" />
                <span>Buyer approves</span>
                <HiOutlineArrowNarrowRight className="text-[#240457] text-lg md:text-2xl" />
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5 text-center">
                <span>Satisfaction</span>
                <HiOutlineArrowNarrowRight className="text-[#240457] text-lg md:text-2xl" />
                <span>Payment released to provider</span>
                <HiOutlineArrowNarrowRight className="text-[#240457] text-lg md:text-2xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;

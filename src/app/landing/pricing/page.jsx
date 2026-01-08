"use client";
import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/Button";
import { FiCheck, FiX } from "react-icons/fi";

const PricingPage = () => {
  const [isYearly, setIsYearly] = useState(false);

  const toggleBilling = () => setIsYearly(!isYearly);

  // Business Plans
  const businessPlans = [
    {
      name: "Free Trial",
      price: 0,
      description: "Basic features for 14 days",
      features: [
        "Basic Profile",
        "Limited Listings",
        "Community Access",
        "14 Days Validity",
      ],
      cta: "Start Free Trial",
      popular: false,
    },
    {
      name: "Gold",
      price: isYearly ? 1899 : 199,
      period: isYearly ? "/year" : "/mo",
      description: "For growing businesses",
      features: [
        "Verified Badge",
        "Unlimited Listings",
        "Analytics Dashboard",
        "Priority Support",
        "Global Reach",
      ],
      cta: "Get Started",
      popular: false,
      color: "text-yellow-600",
      borderColor: "border-yellow-200",
      bgHeader: "bg-yellow-50",
    },
    {
      name: "Platinum",
      price: isYearly ? 2899 : 299,
      period: isYearly ? "/year" : "/mo",
      description: "Maximum power & reach",
      features: [
        "All Gold Features",
        "Dedicated Manager",
        "API Access",
        "Featured Listings",
        "Zero Transaction Fees",
      ],
      cta: "Try Platinum",
      popular: true,
      color: "text-purple-600",
      borderColor: "border-purple-200",
      bgHeader: "bg-purple-50",
    },
  ];

  // User Plans (Mock data for display)
  const userPlans = [
    {
      name: "Free User",
      price: 0,
      description: "Basic access",
      features: ["Job Search", "Basic Profile", "Community Access"],
      cta: "Sign Up Free",
      popular: false,
      color: "text-green-600",
      borderColor: "border-green-200",
      bgHeader: "bg-green-50",
    },
    {
      name: "Gold User",
      price: isYearly ? 1899 : 199,
      period: isYearly ? "/year" : "/mo",
      description: "Enhanced visibility",
      features: [
        "Featured Profile",
        "Direct Messaging",
        "See Who Viewed You",
        "Skill Assessments",
      ],
      cta: "Get Started",
      popular: false,
      color: "text-orange-600",
      borderColor: "border-orange-200",
      bgHeader: "bg-orange-50",
    },
    {
      name: "Platinum User",
      price: isYearly ? 2899 : 299,
      period: isYearly ? "/year" : "/mo",
      description: "Maximum career growth",
      features: [
        "All Gold Features",
        "Career Coaching",
        "Salary Insights",
        "Priority Applications",
      ],
      cta: "Try Platinum",
      popular: true,
      color: "text-purple-600",
      borderColor: "border-purple-200",
      bgHeader: "bg-purple-50",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-950 mb-6">
              Choose Your Plan
            </h1>
            <p className="text-text-secondary max-w-2xl mx-auto mb-8">
              Unlock the full potential of 3SIXTY Global Marketplace with a plan
              that suits your needs.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-4">
              <span
                className={`text-sm font-bold ${
                  !isYearly ? "text-indigo-900" : "text-text-secondary"
                }`}
              >
                Monthly
              </span>
              <button
                onClick={toggleBilling}
                className="w-16 h-8 bg-indigo-900 rounded-full p-1 relative transition-colors"
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-sm absolute top-1 transition-all ${
                    isYearly ? "left-9" : "left-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-bold ${
                  isYearly ? "text-indigo-900" : "text-text-secondary"
                }`}
              >
                Yearly (Save 20%)
              </span>
            </div>
          </div>

          {/* Business Plans Section */}
          <div className="mb-20">
            <div className="flex justify-center mb-8">
              <span className="bg-indigo-900 text-white px-6 py-2 rounded-full text-sm font-bold">
                Business Plans
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {businessPlans.map((plan, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl overflow-hidden border ${
                    plan.popular
                      ? "border-purple-500 shadow-xl scale-105 z-10"
                      : "border-gray-200 shadow-sm"
                  } flex flex-col`}
                >
                  {plan.popular && (
                    <div className="bg-purple-600 text-white text-center py-1 text-xs font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <div
                    className={`p-8 text-center ${
                      plan.bgHeader || "bg-gray-50"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold mb-2 ${
                        plan.color || "text-gray-700"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <div className="flex items-end justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-500 mb-1">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feat, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full rounded-full py-6 font-bold ${
                        plan.popular
                          ? "bg-purple-900 hover:bg-purple-800"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User Plans Section */}
          <div>
            <div className="flex justify-center mb-8">
              <span className="bg-purple-900 text-white px-6 py-2 rounded-full text-sm font-bold">
                Individual Plans
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {userPlans.map((plan, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl overflow-hidden border ${
                    plan.popular
                      ? "border-purple-500 shadow-xl scale-105 z-10"
                      : "border-gray-200 shadow-sm"
                  } flex flex-col`}
                >
                  {plan.popular && (
                    <div className="bg-purple-600 text-white text-center py-1 text-xs font-bold">
                      MOST POPULAR
                    </div>
                  )}
                  <div
                    className={`p-8 text-center ${
                      plan.bgHeader || "bg-gray-50"
                    }`}
                  >
                    <h3
                      className={`text-lg font-bold mb-2 ${
                        plan.color || "text-gray-700"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <div className="flex items-end justify-center gap-1 mb-2">
                      <span className="text-4xl font-bold text-gray-900">
                        ${plan.price}
                      </span>
                      {plan.price > 0 && (
                        <span className="text-gray-500 mb-1">
                          {plan.period}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.features.map((feat, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-3 text-sm text-gray-600"
                        >
                          <FiCheck className="text-green-500 mt-0.5 flex-shrink-0" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={`w-full rounded-full py-6 font-bold ${
                        plan.popular
                          ? "bg-purple-900 hover:bg-purple-800"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;

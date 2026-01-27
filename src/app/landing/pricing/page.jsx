"use client";
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/Button";
import { FiCheck, FiX, FiInfo } from "react-icons/fi";
import { MdStars } from "react-icons/md";

const PricingPage = () => {
  const plans = [
    {
      role: "Business",
      tiers: [
        {
          name: "14 Day Trial",
          price: "0",
          description: "Explore the platform with limited features",
          cta: "Not Valid For Business",
          ctaVariant: "secondary",
          disabled: true,
          features: [
            {
              text: "Business account cannot be created during trial.",
              included: false,
            },
          ],
        },
        {
          name: "Silver",
          price: "199",
          description: "Perfect for discovering businesses",
          cta: "Buy Membership",
          ctaVariant: "outline",
          features: [
            { text: "Unlimited job postings", included: true },
            { text: "List up to 20 products", included: true },
            { text: "Create up to 10 communities", included: true },
            { text: "Analytics access", included: true },
          ],
        },
        {
          name: "Premium",
          price: "299",
          description: "Best for established enterprises",
          badge: "Premium",
          cta: "Buy Membership",
          ctaVariant: "default",
          accent: true,
          features: [
            { text: "Unlimited job postings", included: true },
            { text: "Unlimited product listings", included: true },
            { text: "Create up to 20 communities", included: true },
            { text: "Advanced analytics access", included: true },
          ],
        },
      ],
    },
    {
      role: "User",
      tiers: [
        {
          name: "14 Day Trial",
          price: "0",
          description: "Explore the platform with limited features",
          cta: "Start Your 14 Day Trial",
          ctaVariant: "outline",
          features: [
            { text: "Buy single product only", included: true },
            { text: "Send up to 2 messages to businesses", included: true },
            { text: "Join free communitie", included: true },
          ],
        },
        {
          name: "Silver",
          price: "199",
          description: "Perfect for discovering businesses",
          cta: "Buy Membership",
          ctaVariant: "outline",
          features: [
            {
              text: "Buy bulk products (up to 500 pieces) from 1 supplier",
              included: true,
            },
            { text: "Send up to 50 messages to businesses", included: true },
            { text: "Join up to 20 paid communities", included: true },
          ],
        },
        {
          name: "Premium",
          price: "299",
          description: "Best for established enterprises",
          badge: "Premium",
          cta: "Buy Membership",
          ctaVariant: "default",
          accent: true,
          features: [
            { text: "Buy bulk products (unlimited quantity)", included: true },
            { text: "Send up to 150 messages to businesses", included: true },
            { text: "Join up to 50 paid communities", included: true },
          ],
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Header Section */}
      <div className="relative mt-20 h-80 md:h-[450px] w-full overflow-hidden rounded-xl mx-auto max-w-[95%]">
        <div className="absolute inset-0 bg-[#240457] opacity-50 z-10" />
        <img
          src="/assets/images/ChooseYourPlanMain.png"
          alt="Choose Your Plan"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-semibold">
            Choose Your Plan
          </h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Select the perfect plan for your business needs. Upgrade anytime to
            unlock more features.
          </p>
        </div>

        {plans.map((section, sIdx) => (
          <div key={sIdx} className="mb-24">
            {/* Section Header with Lines */}
            <div className="relative flex items-center justify-center mb-12">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-purple-200"></div>
              </div>
              <div className="relative">
                <span className="bg-[#240457] text-white px-8 py-2 rounded-full text-xs font-semibold">
                  For {section.role}
                </span>
              </div>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              {section.tiers.map((plan, pIdx) => (
                <div
                  key={pIdx}
                  className={`relative bg-white rounded-2xl border ${
                    plan.accent
                      ? "shadow-xl border-purple-400"
                      : "border-gray-200"
                  } p-8 flex flex-col h-full transition-all hover:shadow-md`}
                >
                  <div className="text-center mb-8 flex flex-col items-center flex-1">
                    {/* Badge */}
                    <div className="h-8 mb-4">
                      {plan.name === "14 Day Trial" && (
                        <span className="bg-gray-100 text-gray-400 px-4 py-1 rounded-full text-xs font-medium">
                          14 Day Trial
                        </span>
                      )}
                      {plan.name === "Silver" && (
                        <span className="bg-[#FFF8E6] text-[#F3A531] px-4 py-1 rounded-full text-xs font-medium">
                          Silver
                        </span>
                      )}
                      {plan.badge === "Premium" && (
                        <span className="bg-[#F3E8FF] text-[#A855F7] px-4 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <MdStars className="text-sm" /> Premium
                        </span>
                      )}
                    </div>

                    <div className="flex items-start justify-center mb-2">
                      <span className="text-3xl md:text-5xl font-semibold text-black">
                        ${plan.price}
                      </span>
                      <span className="text-gray-400 text-sm mt-4">/month</span>
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[180px] mb-8">
                      {plan.description}
                    </p>

                    <Button
                      variant={plan.ctaVariant}
                      disabled={plan.disabled}
                      className={`w-full py-6 rounded-lg font-medium text-sm transition-all ${
                        plan.accent
                          ? "bg-[#240457] hover:bg-[#1a0340] text-white"
                          : plan.disabled
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed border-none"
                            : "bg-white text-gray-900 border-gray-200 hover:border-purple-600"
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </div>

                  <div className="border-t border-gray-100 pt-8 flex-1">
                    <ul className="space-y-4">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-3">
                          {feat.included ? (
                            <FiCheck className="text-green-500 mt-1 flex-shrink-0 text-sm" />
                          ) : (
                            <FiX className="text-red-500 mt-1 flex-shrink-0 text-sm" />
                          )}
                          <span
                            className={`text-sm leading-tight ${feat.included ? "text-gray-600" : "text-gray-400"}`}
                          >
                            {feat.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Footer Note */}
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm mt-12 pb-20">
          <FiInfo className="text-gray-400" />
          <span>
            All plans include a 14-day free trial. Credit/Debit Card Required
          </span>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;

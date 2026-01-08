"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const UnlockPotentialCTA = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20 text-center relative overflow-hidden">
      {/* Background Pattern/Curve from image */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
        <div className="absolute top-[-50%] left-[-10%] w-[50%] h-[200%] bg-white rounded-[100%] blur-3xl transform rotate-12" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
          Unlock Unlimited Potential
        </h2>
        <p className="text-purple-100 mb-12 text-sm md:text-base">
          Upgrade to Premium Membership
        </p>

        <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto mb-8 shadow-2xl">
          <h3 className="text-indigo-950 font-bold text-lg mb-6 text-center">
            Why You Should Upgrade Today
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-left max-w-2xl mx-auto">
            {[
              "Unlimited Product Listings",
              "Global Business Visibility",
              "Priority Technical Support",
              "Secure Escrow Transactions",
              "Unlimited Job Postings",
              "Unlimited Job Applications",
              "Direct Manufacturer Access (B2B)",
              "Access to special supplier networks",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-indigo-900 flex items-center justify-center text-white text-xs flex-shrink-0">
                  ✓
                </div>
                <span className="text-sm text-text-secondary">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
            <Link href="/landing/pricing">
              <Button className="bg-indigo-900 text-white hover:bg-indigo-800 px-8 py-3 rounded-md font-medium text-sm w-full sm:w-auto">
                Become A Premium Member →
              </Button>
            </Link>
            <Link href="/onboarding/role">
              <Button
                variant="outline"
                className="border border-gray-300 text-text-secondary hover:bg-gray-50 px-8 py-3 rounded-md font-medium text-sm w-full sm:w-auto"
              >
                Start Your 14 Day Free Trial →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UnlockPotentialCTA;

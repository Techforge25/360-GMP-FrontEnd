"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const Welcome = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md aspect-square">
              <div className="absolute inset-0 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/images/homeLearnMore.png"
                  alt="Welcome Graphic"
                  className="object-contain w-full h-full"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.parentElement.innerText = "Graphic Placeholder";
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-950 mb-6">
              Welcome
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Welcome to 3SIXTY Global Marketplace, the premier digital
              ecosystem designed to connect verified businesses, manufacturers,
              and professionals worldwide. Our platform bridges the gap between
              local capabilities and global opportunities, ensuring seamless
              trade, collaboration, and growth.
            </p>
            <Button className="bg-indigo-900 text-white px-8 rounded-full">
              Learn More
            </Button>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-8 md:p-12 shadow-sm border border-indigo-50">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-indigo-950 mb-4">
              In A Nutshell
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              A streamlined, secure, and smart way to navigate the global
              market. From discovering partners to closing deals, we simplify
              every step.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-border-light text-center group hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4 font-bold">
                1
              </div>
              <h3 className="font-bold text-indigo-950 mb-2">
                Discover Opportunities
              </h3>
              <p className="text-sm text-text-secondary">
                Find verified buyers/sellers globally.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-border-light text-center group hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4 font-bold">
                2
              </div>
              <h3 className="font-bold text-indigo-950 mb-2">
                Secure Transactions
              </h3>
              <p className="text-sm text-text-secondary">
                Safe escrow & contract management.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-border-light text-center group hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-indigo-100 text-indigo-900 rounded-lg flex items-center justify-center mx-auto mb-4 font-bold">
                3
              </div>
              <h3 className="font-bold text-indigo-950 mb-2">Grow Globally</h3>
              <p className="text-sm text-text-secondary">
                Expand your network and revenue.
              </p>
            </div>
          </div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-100/50 blur-3xl -z-0 rounded-full" />
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-center text-text-secondary max-w-3xl mx-auto italic">
            "3SIXTY bridges the gap between local manufacturers and the global
            market, providing a secure platform for growth, transparency, and
            efficiency."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Welcome;

"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";

const Welcome = () => {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center gap-12 mb-16 md:mb-24 relative">
          <div className="w-full md:w-1/2 flex justify-center relative">
            <img
              className="absolute -bottom-20 md:-bottom-40 left-0 w-24 md:w-auto opacity-50 md:opacity-100 hidden lg:block"
              src="/assets/images/threeLeft.png"
              alt=""
            />
            <img
              className="absolute top-0 right-0 w-24 md:w-auto opacity-50 md:opacity-100 hidden lg:block"
              src="/assets/images/threeRight.png"
              alt=""
            />
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

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-indigo-950 mb-6">
              Welcome
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8 max-w-xl mx-auto md:mx-0 text-base md:text-lg">
              Greetings from 360 Global Marketplace LLC! We're excited to
              welcome you to our platform, where you can find a wide array of
              products and services. Dive into our marketplace and uncover
              unique selections tailored to meet your every need. We appreciate
              you choosing us as your one stop global hub!
            </p>
            <Button className="bg-[#240457] text-white px-10 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
              Join Now <FiArrowRight className="ml-2 text-xl" />
            </Button>
          </div>
        </div>

        <div className="relative rounded-3xl p-8 md:p-12 shadow-sm border border-indigo-50 overflow-hidden">
          {/* Background Image */}
          {/* <div className="absolute inset-0 z-0">
            <img
              src="/assets/images/nutshellBg.png"
              alt="Nutshell Background"
              className="w-full h-full object-cover rounded-3xl"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/90 via-blue-50/85 to-white/90 rounded-3xl" />
          </div> */}
          <div className="relative z-10 text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
              In A Nutshell
            </h2>
            <p className="text-base md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed px-4">
              360 Global Marketplace revolutionizes the supply chain by giving
              small business owners direct access to manufacturers—removing
              middlemen, reducing costs, and accelerating growth.
            </p>
          </div>

          {/* Empowerment Section */}
          <div className="relative z-10 mb-20 md:mb-24">
            <h3 className="text-lg md:text-2xl font-semibold text-black text-center mb-12 md:mb-20 max-w-3xl mx-auto px-4">
              We Empower Organizations And Independent Business Owners By
            </h3>

            {/* Three Points with Dotted Connectors */}
            <div className="relative max-w-6xl mx-auto">
              {/* Dotted Line Connector - Hidden on mobile */}
              <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5">
                <svg className="w-full h-full" preserveAspectRatio="none">
                  <path
                    d="M 0 0 Q 25 -30, 50 0 T 100 0"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeDasharray="8,8"
                    fill="none"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* Point 1 */}
                <div className="bg-[#ECEFF6]/80 backdrop-blur-sm py-6 px-5 rounded-2xl shadow-sm border border-gray-200 border-dashed hover:shadow-md transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#240457] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                      1
                    </div>
                    <p className="text-base md:text-lg text-black font-medium leading-tight">
                      Eliminating inefficiencies
                    </p>
                  </div>
                </div>

                {/* Point 2 */}
                <div className="relative group">
                  <img
                    className="hidden lg:block absolute -top-12 -left-8 w-16 opacity-40 animate-pulse"
                    src="/assets/images/downArrow.png"
                    alt=""
                  />
                  <div className="bg-[#ECEFF6]/80 backdrop-blur-sm py-6 px-5 rounded-2xl shadow-sm border border-gray-200 border-dashed hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#240457] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                        2
                      </div>
                      <p className="text-base md:text-lg text-black font-medium leading-tight">
                        Supporting global expansion
                      </p>
                    </div>
                  </div>
                </div>

                {/* Point 3 */}
                <div className="relative group">
                  <div className="bg-[#ECEFF6]/80 backdrop-blur-sm py-6 px-5 rounded-2xl shadow-sm border border-gray-200 border-dashed hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-[#240457] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg shadow-md group-hover:scale-110 transition-transform">
                        3
                      </div>
                      <p className="text-base md:text-lg text-black font-medium leading-tight">
                        Increasing visibility and collaboration
                      </p>
                    </div>
                  </div>
                  <img
                    className="hidden lg:block absolute -bottom-12 -right-8 w-16 opacity-40 animate-pulse"
                    src="/assets/images/upArrow.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Background Blur Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-purple-200/30 blur-3xl -z-0 rounded-full pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default Welcome;

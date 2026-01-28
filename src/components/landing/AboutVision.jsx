"use client";
import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const AboutVision = () => {
  return (
    <section id="about" className="py-16 md:py-20 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#A347FF] opacity-30 blur-[100px] md:blur-[150px] rounded-full -translate-y-1/3 translate-x-1/3 z-0 pointer-events-none" />
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8 space-y-16 md:space-y-20">
        {/* About Us Section */}
        {/* bg-gradient-to-br from-purple-50 via-pink-50 to-white */}
        <div className="flex p-4 rounded-2xl flex-col sm:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-[45%] order-2 md:order-1 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              About Us
            </h2>
            <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-6">
              360 Global Marketplace is dedicated to revolutionizing the way
              businesses connect with suppliers and customers. Our platform
              provides a seamless and efficient way to facilitate mutually
              beneficial relationships, driving growth and success for all
              parties involved.
            </p>

            <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-6">
              By joining 360 Global Marketplace LLC, you're taking a significant
              step towards empowering businesses and creating a more equitable
              and connected global business community.
            </p>
            <div className="flex justify-center md:justify-start items-center">
              <img
                className="-mt-5 max-h-44 hidden sm:block md:block"
                src="/assets/images/rangeDot.png"
                alt=""
              />
              <ul className="space-y-[14px] mb-6 text-left inline-block">
                {[
                  "Corp to Corp",
                  "Corp to Business",
                  "Corp to Consumer",
                  "Business to consumer",
                  "Business to Business",
                ].map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-base md:text-xl text-gray-800"
                  >
                    <span className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0 sm:hidden" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 items-center sm:items-start">
              <Link href="/about">
                <button className="bg-[#240457] text-white px-8 py-3 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg whitespace-nowrap">
                  Subscribe Now
                  <FiArrowRight />
                </button>
              </Link>
              <Link href="/onboarding/role">
                <button className="border border-gray-300 hover:border-[#240457] text-gray-900 hover:text-[#240457] px-8 py-3 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                  Learn More
                  <FiArrowRight />
                </button>
              </Link>
            </div>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-lg">
              <img
                src="/assets/images/aboutUs.png"
                alt="About Us"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>

        {/* Header Section */}
        <div className="text-center py-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black">
            We Bring Your Vision To The
            <br />
            Global Marketplace
          </h2>
        </div>

        {/* Vision Section */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-md">
              <img
                src="/assets/images/vision.png"
                alt="Vision"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Vision
            </h3>
            <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-4">
              360 Global Marketplace is dedicated to revolutionizing the way
              businesses connect with suppliers and customers. Our platform
              provides a seamless and efficient way to facilitate mutually
              beneficial relationships, driving growth and success for all
              parties involved.
            </p>
            <p className="text-base md:text-xl text-gray-700 leading-relaxed">
              360 GLOBAL MARKETPLACE is committed to linking businesses ,
              fostering innovation, and connecting global markets that drive
              sustainable success
            </p>
            <div className="flex justify-center md:justify-start mt-10">
              <Link href="/onboarding/role">
                <button className="border border-gray-300 hover:border-[#240457] text-gray-900 hover:text-[#240457] px-8 py-3 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap">
                  Learn More
                  <FiArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative rounded-2xl overflow-hidden shadow-lg w-full max-w-md">
              <img
                src="/assets/images/mission.png"
                alt="Mission"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h3 className="text-xl md:text-4xl font-bold text-black mb-4">
              Mission
            </h3>
            <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-4">
              At 360 GLOBAL, we are dedicated to helping individuals,
              entreprenuers, businesses and corporations achieve their goals and
              realize their full potential.
            </p>
            <p className="text-base md:text-xl text-gray-700 leading-relaxed">
              <span className="font-bold text-[#240457]">OUR MISSION</span> is
              to provide expert guidance and support to the small business
              owners as well as large corporations. We Bring Your Vision To The
              Global Marketplace. We strive to be the ultimate resource hub for
              business owners and entrepreneurs worldwide
            </p>
            <div className="flex justify-center md:justify-start mt-8">
              <Link href="/about">
                <button className="bg-[#240457] text-white px-8 py-3 rounded-xl text-base font-semibold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap">
                  Learn More
                  <FiArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;

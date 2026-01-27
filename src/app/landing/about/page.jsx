"use client";
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import UnlockPotentialCTA from "@/components/landing/UnlockPotentialCTA";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-surface font-sans">
      <Navbar />

      {/* Header Section */}
      <div className="relative mt-20 h-80 md:h-[450px] w-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-[#240457] opacity-50 z-10" />
        <img
          src="/assets/images/aboutUsMain.png"
          alt="About Us Hero"
          className="absolute  inset-0 w-full h-full"
        />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">About Us</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Intro Text */}
        <div className="max-w-5xl mx-auto text-left md:text-center mb-16 text-sm md:text-[15px]">
          <p className="text-black/80 leading-relaxed mb-6">
            360 Global Marketplace is dedicated to revolutionizing the way
            businesses connect with suppliers and customers. Our platform
            provides a seamless and efficient way to facilitate mutually
            beneficial relationships, driving growth and success for all parties
            involved.
          </p>
          <p className="text-black/80 leading-relaxed">
            By joining 360 Global Marketplace LLC, you're taking a significant
            step towards empowering businesses and creating a more equitable and
            connected global business community.
          </p>
        </div>

        {/* Business Tabs/Pills */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            "Corp to Corp",
            "Corp to Business",
            "Corp to Consumer",
            "Business to consumer",
            "Business to Business",
          ].map((label, i) => (
            <div
              key={i}
              className="px-6 py-2.5 rounded-full border border-gray-400 text-sm md:text-base font-semibold text-black transition-colors cursor-default bg-white"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Large Skyscrapers Image */}
        <div className="relative w-full overflow-hidden mb-24 rounded-4xl shadow-sm">
          <img
            src="/assets/images/aboutPagebanner.png"
            alt="Modern Skyscrapers"
            className="w-full h-auto object-cover"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.backgroundColor = "#ccc";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#240457]/80 via-transparent to-transparent flex items-end justify-center pb-8 md:pb-16">
            <Button className="bg-white text-black hover:bg-gray-100 px-10 py-4 rounded-xl font-semibold text-sm shadow-lg">
              Join Us Now →
            </Button>
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
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md">
              <img
                src="/assets/images/vision.png"
                alt="Vision"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-[516.5px]">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              Vision
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              360 Global Marketplace is dedicated to revolutionizing the way
              businesses connect with suppliers and customers. Our platform
              provides a seamless and efficient way to facilitate mutually
              beneficial relationships, driving growth and success for all
              parties involved.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              360 GLOBAL MARKETPLACE is committed to linking businesses ,
              fostering innovation, and connecting global markets that drive
              sustainable success
            </p>
            <Link href="/onboarding/role">
              <button className="border mt-10 border-gray-300 hover:border-purple-600 text-gray-900 hover:text-purple-700 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                Learn More
                <FiArrowRight />
              </button>
            </Link>
          </div>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-12">
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl overflow-hidden shadow-lg max-w-md md:ml-auto">
              <img
                src="/assets/images/mission.png"
                alt="Mission"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h3 className="text-xl md:text-4xl font-medium text-black mb-4">
              Mission
            </h3>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
              At 360 GLOBAL, we are dedicated to helping individuals,
              entreprenuers, businesses and corporations achieve their goals and
              realize their full potential.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              <span className="font-bold text-[#240457]">OUR MISSION</span> is
              to provide expert guidance and support to the small business
              owners as well as large corporations. We Bring Your Vision To The
              Global Marketplace. We strive to be the ultimate resource hub for
              business owners and entrepreneurs worldwide
            </p>
            <Link href="/about">
              <button className="bg-[#240457] mt-4 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                Learn More
                <FiArrowRight />
              </button>
            </Link>
          </div>
        </div>
      </main>

      <UnlockPotentialCTA />

      <Footer />
    </div>
  );
};

export default AboutPage;

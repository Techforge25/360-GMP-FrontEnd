"use client";
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import UnlockPotentialCTA from "@/components/landing/UnlockPotentialCTA";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-surface font-sans">
      <Navbar />

      {/* Header Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-indigo-950/80 z-10" />
        {/* Placeholder background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900" />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          {/* Breadcrumbs or other info could go here */}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Intro Text */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-text-secondary leading-relaxed mb-6">
            360 Global Marketplace is dedicated to revolutionizing the way
            businesses connect with suppliers and customers. Our platform
            provides a seamless and efficient way to facilitate mutually
            beneficial relationships, driving growth and success for all parties
            involved.
          </p>
          <p className="text-text-secondary leading-relaxed">
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
              className="px-6 py-2 rounded-full border border-gray-300 text-sm md:text-base font-medium text-gray-600 hover:border-indigo-600 hover:text-indigo-600 transition-colors cursor-default bg-white"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Large Skyscrapers Image */}
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden mb-24 shadow-2xl group">
          {/* Using placeholder or similar look */}
          <img
            src="/assets/images/placeholder_skyscrapers.jpg"
            alt="Modern Skyscrapers"
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.style.backgroundColor = "#ccc";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 to-transparent flex items-end justify-center pb-12">
            <Button className="bg-white text-indigo-900 hover:bg-gray-100 px-8 py-3 rounded-md font-bold">
              Join Us Now →
            </Button>
          </div>
        </div>

        {/* Vision Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-indigo-950 max-w-2xl mx-auto">
            We Bring Your Vision To The Global Marketplace
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center mb-24">
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-square relative">
              <img
                src="/assets/images/placeholder_vision.jpg"
                alt="Vision Meeting"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.backgroundColor = "#ddd";
                }}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-bold text-indigo-950 mb-6">Vision</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              360 Global Marketplace is dedicated to revolutionizing the way
              businesses connect with suppliers and customers. Our platform
              provides a seamless and efficient way to facilitate mutually
              beneficial relationships, driving growth and success for all
              parties involved.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              360 GLOBAL MARKETPLACE is committed to helping businesses,
              fostering innovation, and connecting global markets that drive
              sustainable success.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed">
              Through expert guidance, digital solutions, and strategic
              insights, we equip enterprises with the tools and practical
              resources they need to advance, compete, and lead in an
              ever-evolving global market.
            </p>
          </div>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center mb-12">
          <div className="w-full md:w-1/2">
            <div className="rounded-2xl overflow-hidden shadow-lg aspect-square relative">
              <img
                src="/assets/images/placeholder_mission.jpg"
                alt="Mission City"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.parentElement.style.backgroundColor = "#ddd";
                }}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h3 className="text-3xl font-bold text-indigo-950 mb-6">Mission</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              At 360 GLOBAL, we are dedicated to helping individuals,
              entrepreneurs, businesses and corporations achieve their goals and
              realize their full potential.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mb-4">
              <span className="font-bold text-indigo-900">OUR MISSION</span> is
              to provide expert guidance and support to small business owners as
              well as large cooperations. We Bring Your Vision To The Global
              Marketplace. We strive to be the ultimate resource hub for
              business owners, market expansion, worldwide.
            </p>
            <p className="text-sm text-text-secondary leading-relaxed mb-8">
              Our mission is to provide the tools, insights, resources and
              support needed for a global model to foster growth, innovation,
              and success.
            </p>

            <Button className="bg-indigo-900 text-white hover:bg-indigo-800 px-6 py-2.5 rounded-md text-sm">
              Start Your 14 Day Free Trial →
            </Button>
          </div>
        </div>
      </main>

      <UnlockPotentialCTA />

      <Footer />
    </div>
  );
};

export default AboutPage;

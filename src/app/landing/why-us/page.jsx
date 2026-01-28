"use client";
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import UnlockPotentialCTA from "@/components/landing/UnlockPotentialCTA";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const WhyUsPage = () => {
  return (
    <div className="min-h-screen bg-surface font-sans">
      <Navbar />

      {/* Header Section */}
      <div className="relative h-64 md:h-80 w-full overflow-hidden">
        <div className="absolute inset-0 bg-indigo-950/80 z-10" />
        {/* Placeholder background */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900" />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome</h1>
          {/* Breadcrumbs or other info could go here */}
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Welcome Text */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-indigo-950 mb-6">Welcome</h2>
          <p className="text-text-secondary leading-relaxed">
            Greetings from 360 Global Marketplace LLC! We're excited to welcome
            you to our platform, where you can find a wide array of products and
            services. Dive into our marketplace and uncover unique selections
            tailored to meet your every need. We appreciate you choosing us as
            your one-stop global hub!
          </p>
        </div>

        {/* Spiral Image */}
        <div className="w-full flex justify-center mb-16">
          <div className="relative w-full max-w-3xl aspect-[16/9] md:aspect-[21/9]">
            {/* Placeholder for the spiral people image */}
            <img
              src="/assets/images/placeholder_spiral.jpg"
              alt="Global Connection"
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.parentElement.style.backgroundColor = "#f0f0f0";
                e.target.parentElement.style.borderRadius = "20px";
              }}
            />
          </div>
        </div>

        <div className="flex justify-center mb-24">
          <Button className="bg-indigo-900 text-white px-8 py-3 rounded-md font-medium text-base">
            JOIN NOW →
          </Button>
        </div>

        {/* In A Nutshell Component */}
        <div className="relative bg-gradient-to-br from-indigo-50 to-white rounded-3xl p-8 md:p-16 shadow-lg border border-indigo-50 mb-20 overflow-hidden">
          <div className="relative z-10 text-center">
            <h2 className="text-3xl font-bold text-indigo-950 mb-6">
              In A Nutshell
            </h2>
            <p className="text-text-secondary max-w-3xl mx-auto mb-16 leading-relaxed">
              360 Global Marketplace revolutionizes the supply chain by giving
              small business owners direct access to manufacturers—removing
              middlemen, reducing costs, and accelerating growth.
            </p>

            <h3 className="font-bold text-indigo-950 mb-16">
              We Empower Organizations And Independent Business Owners By
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Item 1 */}
              <div className="bg-indigo-50/50 rounded-xl p-4 flex items-center justify-center gap-2 border border-indigo-100 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-indigo-900 text-white flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <span className="text-base font-medium text-indigo-900">
                  Eliminating Inefficiencies
                </span>
              </div>

              {/* Item 2 */}
              <div className="bg-indigo-50/50 rounded-xl p-4 flex items-center justify-center gap-2 border border-indigo-100 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-indigo-900 text-white flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <span className="text-base font-medium text-indigo-900">
                  Supporting global expansion
                </span>
              </div>

              {/* Item 3 */}
              <div className="bg-indigo-50/50 rounded-xl p-4 flex items-center justify-center gap-2 border border-indigo-100 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-indigo-900 text-white flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <span className="text-base font-medium text-indigo-900">
                  Increasing visibility and collaboration
                </span>
              </div>
            </div>

            {/* Dotted lines illustration would be CSS/SVG here, skipping for complexity, using flex gap instead */}
          </div>
          {/* Decorative background blob */}
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50 z-0"></div>
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50 z-0"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-12">
          <p className="text-text-secondary text-base leading-relaxed border-l-4 border-indigo-500 pl-6 italic bg-gray-50 py-4 rounded-r-lg">
            360GMP is not just a marketplace—it's a global business ecosystem.
            360GMP is a unified digital ecosystem that connects buyers, sellers,
            job seekers, and companies in a single platform. With one account,
            you can buy products, apply to jobs, create a business profile, list
            products, post jobs, join communities, and access secure
            escrow-based transactions. It's simple. It's smart. It's scalable.
          </p>
        </div>
      </main>

      <UnlockPotentialCTA />
      <Footer />
    </div>
  );
};

export default WhyUsPage;

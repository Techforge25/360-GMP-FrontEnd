"use client";
import React from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import UnlockPotentialCTA from "@/components/landing/UnlockPotentialCTA";
import { Button } from "@/components/ui/Button";
import { FaCheckCircle } from "react-icons/fa";
import { HiMiniChevronDoubleDown } from "react-icons/hi2";
import { LuCircleDot } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { CiCircleCheck } from "react-icons/ci";

const WhyChooseUsPage = () => {
  return (
    <div className="min-h-screen bg-white font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[480px] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[#150037] opacity-60 z-10" />
        <img
          src="/assets/images/whyChooseUsMain.png"
          alt="Why Choose Us Hero"
          className="absolute inset-0 w-full h-full mt-10"
        />
        <h1 className="relative mt-10 z-20 text-white text-4xl md:text-6xl font-semibold tracking-tight">
          Why Choose Us
        </h1>
      </div>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Intro Section */}
        <div className="max-w-[1400px] mb-16">
          <h2 className="text-2xl md:text-3xl font-sm text-[#240457] mb-6 leading-tight">
            Your Trusted Partner For Global Trade, Growth & Business
            Connectivity
          </h2>
          <p className="text-gray-600 text-base md:text-xl leading-relaxed mb-12">
            360 Global Marketplace isn&apos;t just another platform. It is a
            complete digital ecosystem built to empower businesses,
            corporations, suppliers, and entrepreneurs worldwide. Here&apos;s
            why thousands of professionals choose us as their global business
            gateway.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0">
                <div className="">
                  <Image
                    src={"/assets/images/arrowicon.svg"}
                    alt="arrowicon"
                    width={50}
                    height={50}
                    className="w-[24px]"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  One Membership. All Features
                </h4>
                <p className="text-gray-500 text-base leading-relaxed">
                  No complicated pricing. No confusing upgrades. One premium
                  membership unlocks everything.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="mt-1 flex-shrink-0">
                <div className="">
                  <Image
                    src={"/assets/images/arrowicon.svg"}
                    alt="arrowicon"
                    width={50}
                    height={50}
                    className="w-[24px]"
                  />
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">
                  14-Day Free Trial
                </h4>
                <p className="text-gray-500 text-base leading-relaxed">
                  Try every feature. No restrictions. No payment required until
                  the trial ends.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Ecosystem Section */}
        <div className="mb-20 bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm">
          <div className="flex items-start gap-4 mb-8">
            <div className="">
              <Image
                src={"/assets/images/arrowicon.svg"}
                alt="arrowicon"
                width={50}
                height={50}
                className="w-[24px]"
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
                A True All-In-One Business Ecosystem
              </h3>
              <p className="text-gray-500 text-base md:text-xl">
                Most platforms offer one feature. We offer everything:
              </p>
            </div>
          </div>

          <div className="bg-green/10 border border-green rounded-2xl p-6 md:p-8">
            <div className="flex items-center md:justify-center flex-wrap md:gap-[20px] gap-[10px]">
              {[
                "Marketplace",
                "Supplier Access",
                "Business Profiles",
                "Product Listings",
                "Job Listings & Hiring",
                "Customer Matching",
                "Communities & Business Forums",
                "Analytics & Insights",
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CiCircleCheck
                    size={24}
                    className="text-green w-[24px] h-[24px] text-lg flex-shrink-0"
                  />
                  <span className="text-text-primary  text-[16px] md:text-[18px] whitespace-nowrap">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action/Visual Section */}
        <div className="mb-20">
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl">
            <img
              src="/assets/images/whyBanner.png"
              alt="Global Business Collaboration"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Escrow Section */}
        <div className="mb-20 bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm">
          <div className="flex items-start gap-4 mb-8">
            <div className="">
              <Image
                src={"/assets/images/arrowicon.svg"}
                alt="arrowicon"
                width={50}
                height={50}
                className="w-[24px]"
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">
                Escrow-Based Payments For Trusted Transactions
              </h3>
              <p className="text-gray-500 text-base md:text-xl max-w-2xl leading-relaxed">
                Online transactions can involve risks — fraud, delays,
                non-delivery, or disputes. Our Escrow Payment System protects
                both buyers and suppliers.
              </p>
            </div>
          </div>

          <div className="bg-[#E9F3FF] border border-blue-dark rounded-2xl p-6 md:p-8">
            <div className="flex items-center md:justify-center flex-wrap md:gap-[20px] gap-[10px]">
              {[
                "Funds are held safely by 360GMP",
                "Seller delivers product or service",
                "Buyer approves delivery",
                "Payment is released only after confirmation",
              ].map((step, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CiCircleCheck size={24} className="text-blue-dark text-lg flex-shrink-0" />
                  <span className="text-text-primary font-normal text-[16px] md:text-[18px] leading-tight">
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 pb-20">
          <Link href="/landing/contact-us">
            <Button className="bg-brand-primary hover:bg-brand-primary text-white px-10 py-4 rounded-xl font-semibold transition-all shadow-lg text-lg flex items-center gap-2">
              Get Started →
            </Button>
          </Link>
        </div>
      </main>

      <UnlockPotentialCTA />
      <Footer />
    </div>
  );
};

export default WhyChooseUsPage;

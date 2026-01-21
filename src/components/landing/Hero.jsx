"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0 px-2">
        <div className="absolute inset-0 z-10 rounded-lg" />
        <img
          src="/assets/images/landingBg.png"
          alt="Hero Background"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 md:mt-0">
        <div className="max-w-3xl">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-medium text-white mb-6 leading-tight animate-in slide-in-from-bottom-5 duration-700">
            Find Verified <br />
            <span className="text-white">
              Businesses Across
            </span>{" "}
            <br />
            The Globe
          </h1>

          <p className="text-md md:text-lg text-brand-primary mb-10 leading-relaxed max-w-2xl animate-in slide-in-from-bottom-6 duration-700 delay-100 text-white font-[200]">
            Discover thousands of trusted suppliers, unique product categories, verified corporations, and new business opportunities—all under one unified ecosystem designed to empower your success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-7 duration-700 delay-200">
            <Link href="/onboarding/role">
              <Button
                variant="secondary"
                className="transition-colors duration-300 hover:text-text-inverse hover:bg-gradient-to-l hover:from-brand-primary hover:to-brand-primary-light"
              >
                Join Now <FiArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

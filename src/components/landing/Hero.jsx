"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  return (
    <section className="relative w-full h-[90vh] min-h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/90 to-indigo-800/80 z-10" />
        <img
          src="/assets/images/placeholder_hero.jpg"
          alt="Hero Background"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = "none";
            e.target.parentElement.style.backgroundColor = "#1e1b4b"; // Fallback color
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 md:mt-0">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-in slide-in-from-bottom-5 duration-700">
            Find Verified <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
              Businesses Across
            </span>{" "}
            <br />
            The Globe
          </h1>

          <p className="text-lg md:text-xl text-brand-primary mb-10 leading-relaxed max-w-2xl animate-in slide-in-from-bottom-6 duration-700 delay-100">
            Join the ultimate global B2B marketplace connecting manufacturers,
            suppliers, and job seekers on a single verified platform.
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

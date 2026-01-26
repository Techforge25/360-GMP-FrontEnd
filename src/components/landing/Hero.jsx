"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-purple-900/40 via-purple-800/20 to-transparent" />
        <img
          src="/assets/images/landingBg.png"
          alt="Hero Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-tight">
            Find Verified
            <br />
            Businesses Across
            <br />
            The Globe
          </h1>

          <p className="text-xs sm:text-base md:text-lg text-white/90 mb-8 leading-relaxed max-w-xl">
            Discover thousands of trusted suppliers, unique product categories,
            verified corporations, and new business opportunities—all under one
            unified ecosystem designed to empower your success.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/onboarding/role">
              <Button
                variant="secondary"
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-6 py-3 rounded-md font-medium flex items-center justify-center gap-2"
              >
                Join Now
                <FiArrowRight className="text-lg" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-3">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeSlide
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Down Button */}
      <button
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
        className="absolute bottom-8 right-8 z-30 w-12 h-12 rounded-full bg-purple-700 hover:bg-purple-600 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Scroll down"
      >
        <FiChevronDown className="text-white text-2xl animate-bounce" />
      </button>
    </section>
  );
};

export default Hero;

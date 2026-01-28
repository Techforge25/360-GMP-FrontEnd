"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GoArrowDown } from "react-icons/go";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 3;

  return (
    <section className="relative w-full h-[90vh] md:h-screen min-h-[500px] flex items-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 m-2 sm:m-4 mt-20 sm:mt-24">
        <div className="absolute bg-[url('/assets/images/landingBg.png')] bg-cover bg-center rounded-xl inset-0 z-10" />
        <div className="absolute rounded-xl inset-0 z-10 bg-gradient-to-r from-purple-900/60 via-purple-800/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 w-full">
        <div className="max-w-3xl text-center sm:text-left">
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 leading-[1.2] sm:leading-tight">
            Find Verified
            <br className="hidden sm:block" />{" "}
            <span className="sm:inline">Businesses Across</span>
            <br className="hidden sm:block" /> The Globe
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl mx-auto sm:mx-0">
            Discover thousands of trusted suppliers, unique product categories,
            verified corporations, and new business opportunities—all under one
            unified ecosystem designed to empower your success.
          </p>

          <div className="flex sm:items-start items-center flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link href="/onboarding/role">
              <Button
                variant="secondary"
                className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-8 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
              >
                Join Now
                <FiArrowRight className="text-lg" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2.5">
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
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <button
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#240457]/90 hover:bg-[#240457] flex items-center justify-center transition-all duration-300 shadow-xl border border-white/10"
          aria-label="Scroll down"
        >
          <GoArrowDown className="text-white text-xl sm:text-2xl animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default Hero;

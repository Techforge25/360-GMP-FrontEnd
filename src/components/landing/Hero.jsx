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
    <section className="relative w-full h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0 m-4 mt-24 ">
        <div className="absolute bg-[url('/assets/images/landingBg.png')] bg-cover bg-center rounded-xl inset-0 z-10 " />
        <div className="absolute rounded-xl inset-0 z-10 bg-gradient-to-r from-purple-900/40 via-purple-800/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20 md:pt-0">
        <div className="max-w-3xl text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
            Find Verified
            <br className="hidden md:block" /> Businesses Across
            <br className="hidden md:block" /> The Globe
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/90 mb-10 leading-relaxed max-w-2xl mx-auto md:mx-0">
            Discover thousands of trusted suppliers, unique product categories,
            verified corporations, and new business opportunities—all under one
            unified ecosystem designed to empower your success.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link href="/onboarding/role" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-8 py-4 rounded-md font-semibold flex items-center justify-center gap-2 text-lg"
              >
                Join Now
                <FiArrowRight className="text-xl" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-3">
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
        className="absolute mx-auto bottom-0 right-[50%] translate-x-1/2 z-30 w-12 h-12 rounded-full bg-[#240457] flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
        aria-label="Scroll down"
      >
        <GoArrowDown className="text-white text-2xl" />
      </button>
    </section>
  );
};

export default Hero;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { GoArrowDown } from "react-icons/go";
import { FiArrowRight } from "react-icons/fi";

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      image: "/assets/images/landingBg.png",
      heading: (
        <>
          Find Verified
          <br className="hidden sm:block" />{" "}
          <span className="sm:inline">Businesses Across</span>
          <br className="hidden sm:block" /> The Globe
        </>
      ),
      para: "Discover thousands of trusted suppliers, unique product categories, verified corporations, and new business opportunities—all under one unified ecosystem designed to empower your success.",
    },
    {
      image: "/assets/images/slide2Image.png",
      heading: (
        <>
          Find Your Next Career Move
          <br className="hidden sm:block" />{" "}
          <span className="sm:inline">Across Global Industries</span>
        </>
      ),
      para: "Explore thousands of vetted job listings in Manufacturing, Logistics, and Industrial Tech, and apply with your verified professional profile to connect directly with global employers.",
    },
    {
      image: "/assets/images/slide3Image.png",
      heading: (
        <>
          Streamline Sourcing,
          <br className="hidden sm:block" />{" "}
          <span className="sm:inline">Reduce Middlemen Costs.</span>
        </>
      ),
      para: "Browse bulk and single listings, compare pricing, and transact safely with verified suppliers using our transparent, escrow-protected payment system for all B2B purchases.",
    },
  ];

  const totalSlides = slides.length;

  return (
    <section className="relative w-full h-[90vh] md:h-screen min-h-[500px] flex items-center overflow-hidden">
      {/* Background Images with Gradient Overlay */}
      <div className="absolute inset-0 z-0 m-2 sm:m-4 mt-20 sm:mt-24 rounded-xl overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center z-10"
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            <div className="absolute inset-0 z-10 bg-gradient-to-r from-purple-900/60 via-purple-800/20 to-transparent" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 w-full">
        <div className="max-w-3xl text-center sm:text-left">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ease-in-out absolute top-1/2 -translate-y-1/2 sm:static sm:translate-y-0 w-full ${
                index === activeSlide
                  ? "opacity-100 translate-x-0 pointer-events-auto"
                  : "opacity-0 translate-x-8 pointer-events-none absolute"
              }`}
            >
              {index === activeSlide && (
                <>
                  <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold text-white mb-6 leading-[1.2] sm:leading-tight pt-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {slide.heading}
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 leading-relaxed max-w-xl mx-auto sm:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                    {slide.para}
                  </p>

                  <div className="flex sm:items-start items-center flex-col sm:flex-row gap-4 justify-center sm:justify-start animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                    <Link href="/landing/pricing">
                      <Button
                        variant="secondary"
                        className="bg-white text-gray-900 hover:bg-gray-100 transition-all duration-300 px-8 py-3.5 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg"
                      >
                        Join Now
                        <FiArrowRight className="text-lg" />
                      </Button>
                    </Link>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-2.5">
        {slides.map((_, index) => (
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
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30">
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
          <GoArrowDown className="text-white text-xl sm:text-2xl" />
        </button>
      </div>
    </section>
  );
};

export default Hero;

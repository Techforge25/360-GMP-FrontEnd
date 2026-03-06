import React from "react";
import SearchInputs from "./SearchInputs";

const DashboardHero = () => {
  return (
    <div className="relative w-full min-h-[650px] flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-200 to-slate-300">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/images/authBG.png"
          alt="Modern buildings"
          className="w-full h-full object-cover opacity-90"
        />
      </div>

      {/* White fade overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        {/* White Content Card */}
        <div className="bg-white rounded-md shadow-2xl p-8 max-w-5xl mx-auto">
          {/* Heading */}
          <h1 className="text-lg sm:text-xl lg:text-3xl font-semibold text-black mb-5 text-center">
            Find Verified Businesses Across the Globe
          </h1>

          {/* Subheading */}
          <p className="text-base  text-[#444953] mb-10 max-w-[805px] mx-auto text-center leading-relaxed">
            Discover trusted businesses, connect with global communities, and
            grow your network with 360 Global Marketplace. Your gateway to
            worldwide business opportunities.
          </p>

          {/* Search Inputs Row and Popular Tags*/}
          <SearchInputs />

        </div>
      </div>
    </div>
  );
};

export default DashboardHero;

import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import Image from "next/image";
import React from "react";
import WhyUsPage from "../landing/why-us/page";

const page = () => {
  return (
    <div>
      <Navbar />
      <div className="relative mt-20 h-80 md:h-[450px] w-full overflow-hidden rounded-xl">
        <div className="absolute inset-0 bg-brand-primary opacity-50 z-10" />
        <Image
          src="/assets/images/nutshelDetail.png"
          alt="About Us Hero"
          height={1000}
          width={1000}
          className="absolute  inset-0 w-full h-full"
        />

        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome</h1>
        </div>
      </div>
      <WhyUsPage />
      <Footer />
    </div>
  );
};

export default page;

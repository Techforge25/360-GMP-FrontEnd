"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const AboutVision = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
              About Us
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              3SIXTY is more than just a marketplace; it's a comprehensive
              ecosystem dedicated to empowering businesses of all sizes. We
              combine cutting-edge technology with rigorous verification
              processes to create a trusted environment for B2B trade.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Verified Partners",
                "Global Reach",
                "Secure Payments",
                " Dedicated Support",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-text-primary font-medium"
                >
                  <span className="w-2 h-2 bg-brand-primary rounded-full" />{" "}
                  {item}
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <Button className="bg-brand-primary text-text-inverse px-6">
                Read More
              </Button>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative  aspect-video">
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src="/assets/images/aboutUs.png"
                  alt="About"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-6">
              We Bring Your Vision To The Global Marketplace
            </h2>
            <h3 className="text-xl font-bold text-brand-primary mb-4">
              Vision
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              Our vision is to become the world's most trusted and efficient B2B
              ecosystem, where verification builds confidence and connectivity
              drives prosperity. We envision a world where any legitimate
              business can seamlessly trade with any other, regardless of
              borders.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative max-w-sm mx-auto">
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src="/assets/images/vision.png"
                  alt="Vision"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <h3 className="text-xl font-bold text-brand-primary mb-4">
              Mission
            </h3>
            <p className="text-text-secondary leading-relaxed mb-6">
              Our mission is to democratize global trade by removing barriers to
              entry, reducing risk, and optimizing supply chains. We strive to
              provide the tools, data, and security needed for businesses to
              thrive in the digital age.
            </p>
            <Button className="bg-brand-primary text-text-inverse px-6">
              Join Us Now
            </Button>
          </div>
          <div className="w-full md:w-1/2">
            <div className="relative max-w-sm mx-auto">
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src="/assets/images/vision.png"
                  alt="Mission"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVision;

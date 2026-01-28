"use client";
import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FiMail, FiPhone, FiMapPin, FiPlusCircle } from "react-icons/fi";
import { LuCircleDot } from "react-icons/lu";

const ContactUsPage = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is 360GMP?",
      a: "360GMP is a global B2B marketplace connecting verified businesses and professionals.",
    },
    {
      q: "How does the free trial work?",
      a: "You get full access to standard features for 14 days, no credit card required initially.",
    },
    {
      q: "Do I need to pay to create a business?",
      a: "Creating a business account itself might be free, but listing products and jobs requires a premium membership.",
    },
    {
      q: "How does the escrow system work?",
      a: "Funds are held securely by a third party until terms of the trade are met.",
    },
    {
      q: "Can job-seekers use the platform for free?",
      a: "Yes, job seeking and application features are available to users at no cost.",
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Header Section */}
      <div className="relative mt-20 h-80 md:h-[450px] w-full overflow-hidden rounded-xl mx-auto max-w-[95%]">
        <div className="absolute inset-0 bg-[#240457] opacity-60 z-10" />
        <img
          src="/assets/images/whyChooseUsMain.png"
          alt="Contact Us"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 h-full flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-semibold">Contact Us</h1>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            Contact Us
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base md:text-xl">
            We're here to help with demos, support, partnerships, and inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Decorative Image with Glass Card */}
          <div className="lg:col-span-4 relative h-full w-full rounded-3xl overflow-hidden">
            <img
              src="/assets/images/contactBanner.png"
              alt="Decorative"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-full max-w-[300px] backdrop-blur-md bg-white/20 border border-white rounded-2xl p-8 text-black shadow-lg">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-sm bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <FiPhone className="text-indigo-900" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Call</h4>
                      <p className="text-sm text-black/70">+123456797-1</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-sm bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <FiMail className="text-indigo-900" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Message</h4>
                      <p className="text-sm text-black/70">info@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-sm bg-gray-200 flex items-center justify-center flex-shrink-0">
                      <FiMapPin className="text-indigo-900" />
                    </div>
                    <div>
                      <h4 className="font-medium text-base">Location</h4>
                      <p className="text-sm text-black/70 leading-relaxed">
                        70 Washington Square South, New York, NY 10012, United
                        States
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-8 bg-white border border-gray-100 rounded-3xl p-4 md:p-8 shadow-sm">
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    First Name
                  </label>
                  <Input
                    placeholder="John"
                    className="bg-[#F3F4F6] border-none rounded-lg py-6"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Last Name
                  </label>
                  <Input
                    placeholder="Doe"
                    className="bg-[#F3F4F6] border-none rounded-lg py-6"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <Input
                    placeholder="info@gmail.com"
                    type="email"
                    className="bg-[#F3F4F6] border-none rounded-lg py-6"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Phone
                  </label>
                  <Input
                    placeholder="+123456797-1"
                    className="bg-[#F3F4F6] border-none rounded-lg py-6"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Position
                </label>
                <Input
                  placeholder="info@gmail.com"
                  className="bg-[#F3F4F6] border-none rounded-lg py-6"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Position
                </label>
                <Input
                  placeholder="info@gmail.com"
                  className="bg-[#F3F4F6] border-none rounded-lg py-6"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-sm text-[#444953]">
                  Please State Your Question/Concern And One Of Our Highly
                  Skilled 360 Team Members Will Be In Contact With <br /> You.
                </label>
                <textarea
                  className="w-full bg-[#F3F4F6] border-none rounded-xl p-4 min-h-[150px] text-base focus:ring-1 focus:ring-purple-200 outline-none"
                  placeholder="*"
                />
              </div>

              <Button className="w-full bg-[#240457] hover:bg-[#1a0340] text-white py-4 rounded-xl font-semibold text-base transition-all shadow-lg">
                Submit
              </Button>
            </form>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="mt-32 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-black mb-16">
            FAQs
          </h2>
          <div className="space-y-6">
            {faqs.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors group"
                >
                  <span className="text-base md:text-xl font-medium text-gray-900">
                    {item.q}
                  </span>
                  <div
                    className={`transition-transform duration-300 ${openFaq === i ? "rotate-45" : ""}`}
                  >
                    <FiPlusCircle
                      className={`text-xl ${openFaq === i ? "text-[#240457]" : "text-black group-hover:text-gray-600"}`}
                    />
                  </div>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-base text-gray-500 leading-relaxed animate-in slide-in-from-top-2">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactUsPage;

"use client";
import React, { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { FiMail, FiPhone, FiMapPin, FiPlus, FiMinus } from "react-icons/fi";

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
      q: "How Does The Free Trial Work?",
      a: "You get full access to Standard features for 14 days, no credit card required initially.",
    },
    {
      q: "Do I need to be legally registered business?",
      a: "Yes, to operate as a business seller, verification of legal registration is required.",
    },
    {
      q: "How Does The Escrow System Work?",
      a: "Funds are held securely by a third party until terms of the trade are met.",
    },
    {
      q: "Can a user work and use the platform for free?",
      a: "Yes, standard user accounts for job seeking are free.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Header */}
      <div className="bg-indigo-950 text-white pt-32 pb-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-indigo-900/50" />
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-indigo-200 max-w-xl mx-auto">
            We are here to help. Reach out to us for any questions or support.
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                <FiMail />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Email</h3>
                <p className="text-sm text-gray-500">Support@3Sixty.com</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                <FiPhone />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Phone</h3>
                <p className="text-sm text-gray-500">+1 (888) 123-4567</p>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                <FiMapPin />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Address</h3>
                <p className="text-sm text-gray-500">
                  123 Business Avenue, Suite 100, NY
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <div className="border-2 border-dashed border-purple-200 rounded-xl p-8">
                <h2 className="text-2xl font-bold text-center text-indigo-950 mb-8">
                  Contact Us
                </h2>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name</label>
                    <Input placeholder="John" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name</label>
                    <Input placeholder="Doe" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input placeholder="+1 123..." />
                  </div>
                </div>
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    placeholder="How can we help?"
                  />
                </div>
                <Button className="w-full bg-indigo-900 hover:bg-indigo-800 text-white py-6">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-indigo-950 mb-12">
            FAQs
          </h2>
          <div className="space-y-4">
            {faqs.map((item, i) => (
              <div key={i} className="bg-white border-b border-gray-200">
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between py-6 text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-900">
                    {item.q}
                  </span>
                  {openFaq === i ? (
                    <FiMinus className="text-indigo-600" />
                  ) : (
                    <FiPlus className="text-gray-400" />
                  )}
                </button>
                {openFaq === i && (
                  <div className="pb-6 text-gray-500 leading-relaxed animate-in slide-in-from-top-2">
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

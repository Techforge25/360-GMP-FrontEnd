"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Mail,
  Phone,
  Plus,
  X,
  Upload,
  ArrowRight,
  ChevronDown,
} from "lucide-react";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function SupportPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Why was 10% deducted from my total sale?",
      answer:
        "A 10% platform fee is deducted from each sale to cover transaction processing and platform maintenance.",
    },
    {
      question: 'What are "Pending Settlements" in my wallet?',
      answer:
        "Pending settlements are funds that are currently being processed and will be available in your balance shortly.",
    },
    {
      question: "Why can't I buy products using my Business Profile?",
      answer:
        "Business profiles are designed for selling. To purchase products, please switch to a personal account.",
    },
    {
      question: "What happens if a buyer disputes an order?",
      answer:
        "If a buyer disputes an order, the funds are held until the dispute is resolved by our support team.",
    },
  ];

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-50/50 py-12 border-b border-gray-200 mb-8">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
        </div>
      </div>
      {/* Soft gradient background effect */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-purple-100/50 via-transparent to-transparent pointer-events-none" />

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 max-w-7xl mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4 border-t pt-6 border-gray-200">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-gray-200 rounded-xl transition-all duration-300 ${
                openIndex === index ? "bg-purple-50/30" : "bg-white"
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-gray-800 font-medium">
                  {faq.question}
                </span>
                <div
                  className={`flex-shrink-0 ml-4 w-6 h-6 rounded-full border-2 border-black flex items-center justify-center transition-colors ${openIndex === index ? "bg-gray-900 border-gray-900 text-white" : "text-gray-500"}`}
                >
                  {openIndex === index ? (
                    <X size={14} />
                  ) : (
                    <Plus size={14} className="text-black font-bold" />
                  )}
                </div>
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "grid-rows-[1fr] opacity-100 p-5 pt-0"
                    : "grid-rows-[0fr] opacity-0 overflow-hidden"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Get In Touch Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 max-w-7xl mx-auto mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Get In Touch
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6 border-gray-200">
          {/* Live Chat */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-start border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-[#DCDCDC33] flex items-center justify-center text-[#240457] mb-4">
              <MessageSquare size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Live Chat
            </h3>
            <p className="text-sm text-black mb-6 flex-grow leading-relaxed">
              Our Team Is Available 24/7 To Offer Quick Help And Guidance With
              Any Questions Or Issues You Might Have.
            </p>
            <button className="w-full bg-[#1E0B5D] text-white rounded-lg py-2 text-sm font-medium hover:bg-[#150840] transition-colors">
              Start Chat
            </button>
          </div>

          {/* Email Support */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-start border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-[#DCDCDC33] flex items-center justify-center text-[#240457] mb-4">
              <Mail size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Email Support
            </h3>
            <p className="text-sm text-black mb-6 flex-grow leading-relaxed">
              Expect A Response Within 24 Hours. Email Support Is Ideal For
              Non-Urgent Issues, Detailed Questions, Or Follow-Up Requests.
            </p>
            <button className="w-full bg-white border border-gray-200 text-[#1E0B5D] rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
              Email us
            </button>
          </div>

          {/* Call Support */}
          <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-start border border-gray-100 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-[#DCDCDC33] flex items-center justify-center text-[#240457] mb-4">
              <Phone size={20} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Call Support
            </h3>
            <p className="text-sm text-black mb-6 flex-grow leading-relaxed">
              Call Our Support Team Monday-Friday, 9 AM-5 PM EST At+1 (555)
              123-4567. We're Here To Help With Any Questions.
            </p>
            <button className="w-full bg-white border border-gray-200 text-[#1E0B5D] rounded-lg py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
              Call Us Now
            </button>
          </div>
        </div>
      </div>
      {/* Report An Issue Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 max-w-7xl mx-auto mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Report An Issue
        </h2>
        <form className="space-y-6 border-t pt-6 border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">
                Subject
              </label>
              <input
                type="text"
                placeholder="10% Platform Fee Calculation Error - Order #GMP-8821"
                className="w-full border border-gray-200 rounded-lg p-3 mt-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E0B5D] focus:border-transparent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">
                Category
              </label>
              <div className="relative mt-2 text-gray-900">
                <select className="w-full text-xs appearance-none border border-gray-200 rounded-lg p-3 text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E0B5D] focus:border-transparent transition-all pr-10">
                  <option className="text-gray-900">Wallet & Payments (Billing)</option>
                  <option className="text-gray-900">Order Issues</option>
                  <option className="text-gray-900">Profile & Account</option>
                  <option className="text-gray-900">Other</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
                  size={16}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              Description
            </label>
            <textarea
              rows={4}
              placeholder="I Am Writing Regarding Order #GMP-8821 For The Industrial Smart Watch Units. The Gross Sale Was $5,000, So The 10% Fee Should Be $500, Leaving A Net Balance Of $4,500. However, My Wallet Is Showing A Net Credit Of Only $4,350. Please Review The Transaction Ledger And Correct The Discrepancy. I Have Attached A Screenshot Of The Order Summary For Your Reference."
              className="w-full mt-2 border border-gray-200 rounded-lg p-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E0B5D] focus:border-transparent transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">
              Attached File (Optional)
            </label>
            <div className="border-2 mt-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 mb-3">
                <Upload size={20} />
              </div>
              <p className="text-xs font-medium text-gray-900">Upload a file</p>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, PDF up to 10MB
              </p>
              <input type="file" className="hidden" />
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="submit"
              className="bg-[#1E0B5D] text-white rounded-lg px-8 py-3 text-sm font-medium hover:bg-[#150840] transition-colors flex items-center gap-2"
            >
              Submit <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
      <div className="pt-8">
        <DashboardFooter />
      </div>
    </div>
  );
}

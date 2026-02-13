"use client";
import React from "react";
import {
  FiLifeBuoy,
  FiClock,
  FiMessageSquare,
  FiFileText,
  FiHelpCircle,
} from "react-icons/fi";

export default function UserSupportPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#110026] to-[#240457] px-8 py-12 text-center text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiLifeBuoy className="w-10 h-10" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Help Center & Support</h1>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              We're here to help. Get fast resolutions for your account,
              transactions, and technical queries directly from our support
              team.
            </p>
          </div>

          {/* Content Section */}
          <div className="px-8 py-12 text-center text-gray-900">
            <div className="max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-[#240457]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiClock className="w-8 h-8 text-[#240457]" />
              </div>

              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Coming Soon in Phase 5
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                The ultimate support dashboard is on its way. Soon you'll be
                able to chat with support staff in real-time, browse through
                curated FAQs, and find everything you need to navigate 360GMP
                effortlessly.
              </p>

              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#240457] rounded-lg flex items-center justify-center mx-auto mb-3 text-white">
                    <FiMessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">
                    Live Support
                  </h3>
                  <p className="text-sm text-gray-600">
                    Chat with experts for immediate help
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#9747FF] rounded-lg flex items-center justify-center mx-auto mb-3 text-white">
                    <FiHelpCircle className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">
                    Curated FAQs
                  </h3>
                  <p className="text-sm text-gray-600">
                    Quick answers to common questions
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg text-gray-900">
                  <div className="w-8 h-8 bg-[#0B8806] rounded-lg flex items-center justify-center mx-auto mb-3 text-white">
                    <FiFileText className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold mb-2">Issue Tracking</h3>
                  <p className="text-sm text-gray-600">
                    Easily monitor your support request status
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-[#110026] to-[#240457] text-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Want to be the first to know?
                </h3>
                <p className="text-gray-200 mb-4">
                  Sign up for notifications to get alerted when the new Support
                  Dashboard goes live.
                </p>
                <button className="bg-white text-[#240457] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import {
//   MessageSquare,
//   Mail,
//   Phone,
//   Plus,
//   X,
//   Upload,
//   ArrowRight,
//   ChevronDown,
// } from "lucide-react";
// import DashboardFooter from "@/components/dashboard/DashboardFooter";
// import { LuMinus } from "react-icons/lu";

// export default function SupportPage() {
//   const [openIndex, setOpenIndex] = useState(null);

//   const toggleAccordion = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   const faqs = [
//     {
//       question: "Why was 10% deducted from my total sale?",
//       answer:
//         "360GMP charges a standard 10% platform service fee on every successful transaction. This fee covers secure payment processing, platform maintenance, and the Guaranteed Fulfillment service.",
//     },
//     {
//       question: 'What are "Pending Settlements" in my wallet?',
//       answer:
//         "When a buyer purchases an item like ANC Pro Earbuds, the funds are held in Escrow. This protects both parties. Once the buyer confirms receipt and inspection of the goods, the funds (minus the 10% fee) are released to your Net Balance.",
//     },
//     {
//       question: "Why can't I buy products using my Business Profile?",
//       answer:
//         "On 360GMP, a Business Profile (e.g., Global Manufacturing Co.) is strictly for Selling products and Posting Jobs. To buy products or apply for jobs, you must switch to your User Profile via the profile switcher in your settings.",
//     },
//     {
//       question: "What happens if a buyer disputes an order?",
//       answer:
//         "If a buyer claims the Silent Block Suspension Parts are defective, the funds stay in Escrow. You will be asked to provide proof of quality and shipment in the Dispute Resolution Center.",
//     },
//   ];

//   return (
//     <div className="bg-gray-50">
//       {/* Header */}
//       <div className="bg-emerald-50/50 py-12 border-b border-gray-200 mb-8">
//         <div className="max-w-4xl mx-auto text-center space-y-2">
//           <h1 className="text-3xl font-bold text-gray-900">Help & Support</h1>
//         </div>
//       </div>
//       {/* Soft gradient background effect */}
//       <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-purple-100/50 via-transparent to-transparent pointer-events-none" />

//       {/* FAQ Section */}
//       <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 max-w-[1400px] mx-auto">
//         <h2 className="text-xl font-semibold text-gray-800 mb-6">
//           Frequently Asked Questions
//         </h2>
//         <div className="space-y-4 border-t pt-6 border-gray-200">
//           {faqs.map((faq, index) => (
//             <div
//               key={index}
//               className={`border border-t-gray-200 border-r-gray-200 border-b-gray-200 border-l-gray-200 rounded-xl transition-all duration-300 ${
//                 openIndex === index
//                   ? "bg-purple-50/30 border-b-4 border-b-purple-500"
//                   : "bg-white"
//               }`}
//             >
//               <button
//                 onClick={() => toggleAccordion(index)}
//                 className="w-full flex items-center justify-between p-5 text-left"
//               >
//                 <span className="text-gray-800 font-medium">
//                   {faq.question}
//                 </span>
//                 <div
//                   className={`flex-shrink-0 ml-4 w-6 h-6 rounded-full border-2 border-black flex items-center justify-center transition-colors ${openIndex === index ? "bg-gray-900 border-gray-900 text-white" : "text-gray-500"}`}
//                 >
//                   {openIndex === index ? (
//                     <LuMinus size={14} />
//                   ) : (
//                     <Plus size={14} className="text-black font-bold" />
//                   )}
//                 </div>
//               </button>
//               <div
//                 className={`grid transition-all duration-300 ease-in-out ${
//                   openIndex === index
//                     ? "grid-rows-[1fr] opacity-100 p-5 pt-0"
//                     : "grid-rows-[0fr] opacity-0 overflow-hidden"
//                 }`}
//               >
//                 <div className="overflow-hidden">
//                   <p className="text-gray-500 text-base leading-relaxed">
//                     {faq.answer}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Get In Touch Section */}
//       <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 max-w-[1400px] mx-auto mt-4">
//         <h2 className="text-xl font-semibold text-gray-800 mb-6">
//           Get In Touch
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6 border-gray-200">
//           {/* Live Chat */}
//           <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-start border border-gray-100 hover:shadow-md transition-shadow">
//             <div className="w-10 h-10 rounded-lg bg-[#DCDCDC33] flex items-center justify-center text-[#240457] mb-4">
//               <MessageSquare size={20} />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Live Chat
//             </h3>
//             <p className="text-base text-black mb-6 flex-grow leading-relaxed">
//               Our Team Is Available 24/7 To Offer Quick Help And Guidance With
//               Any Questions Or Issues You Might Have.
//             </p>
//             <button className="w-full bg-[#1E0B5D] text-white rounded-lg py-2 text-base font-medium hover:bg-[#150840] transition-colors">
//               Start Chat
//             </button>
//           </div>

//           {/* Email Support */}
//           <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-start border border-gray-100 hover:shadow-md transition-shadow">
//             <div className="w-10 h-10 rounded-lg bg-[#DCDCDC33] flex items-center justify-center text-[#240457] mb-4">
//               <Mail size={20} />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Email Support
//             </h3>
//             <p className="text-base text-black mb-6 flex-grow leading-relaxed">
//               Expect A Response Within 24 Hours. Email Support Is Ideal For
//               Non-Urgent Issues, Detailed Questions, Or Follow-Up Requests.
//             </p>
//             <button className="w-full bg-white border border-gray-200 text-[#1E0B5D] rounded-lg py-2 text-base font-medium hover:bg-gray-50 transition-colors">
//               Email us
//             </button>
//           </div>

//           {/* Call Support */}
//           <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-start border border-gray-100 hover:shadow-md transition-shadow">
//             <div className="w-10 h-10 rounded-lg bg-[#DCDCDC33] flex items-center justify-center text-[#240457] mb-4">
//               <Phone size={20} />
//             </div>
//             <h3 className="text-lg font-semibold text-gray-800 mb-2">
//               Call Support
//             </h3>
//             <p className="text-base text-black mb-6 flex-grow leading-relaxed">
//               Call Our Support Team Monday-Friday, 9 AM-5 PM EST At+1 (555)
//               123-4567. We're Here To Help With Any Questions.
//             </p>
//             <button className="w-full bg-white border border-gray-200 text-[#1E0B5D] rounded-lg py-2 text-base font-medium hover:bg-gray-50 transition-colors">
//               Call Us Now
//             </button>
//           </div>
//         </div>
//       </div>
//       {/* Report An Issue Section */}
//       <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 max-w-[1400px] mx-auto mt-8">
//         <h2 className="text-xl font-semibold text-gray-800 mb-6">
//           Report An Issue
//         </h2>
//         <form className="space-y-6 border-t pt-6 border-gray-200">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <label className="text-base font-semibold text-gray-900">
//                 Subject
//               </label>
//               <input
//                 type="text"
//                 placeholder="10% Platform Fee Calculation Error - Order #GMP-8821"
//                 className="w-full border border-gray-200 rounded-lg p-3 mt-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E0B5D] focus:border-transparent transition-all"
//               />
//             </div>
//             <div className="space-y-2">
//               <label className="text-base font-semibold text-gray-900">
//                 Category
//               </label>
//               <div className="relative mt-2 text-gray-900">
//                 <select className="w-full text-sm appearance-none border border-gray-200 rounded-lg p-3 text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-[#1E0B5D] focus:border-transparent transition-all pr-10">
//                   <option className="text-gray-900">
//                     Wallet & Payments (Billing)
//                   </option>
//                   <option className="text-gray-900">Order Issues</option>
//                   <option className="text-gray-900">Profile & Account</option>
//                   <option className="text-gray-900">Other</option>
//                 </select>
//                 <ChevronDown
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
//                   size={16}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-base font-semibold text-gray-900">
//               Description
//             </label>
//             <textarea
//               rows={4}
//               placeholder="I Am Writing Regarding Order #GMP-8821 For The Industrial Smart Watch Units. The Gross Sale Was $5,000, So The 10% Fee Should Be $500, Leaving A Net Balance Of $4,500. However, My Wallet Is Showing A Net Credit Of Only $4,350. Please Review The Transaction Ledger And Correct The Discrepancy. I Have Attached A Screenshot Of The Order Summary For Your Reference."
//               className="w-full mt-2 border border-gray-200 rounded-lg p-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1E0B5D] focus:border-transparent transition-all resize-none"
//             />
//           </div>

//           <div className="space-y-2">
//             <label className="text-base font-semibold text-gray-900">
//               Attached File (Optional)
//             </label>
//             <div className="border-2 mt-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-gray-400 hover:bg-gray-50 transition-colors cursor-pointer">
//               <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600 mb-3">
//                 <Upload size={20} />
//               </div>
//               <p className="text-sm font-medium text-gray-900">Upload a file</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 PNG, JPG, PDF up to 10MB
//               </p>
//               <input type="file" className="hidden" />
//             </div>
//           </div>

//           <div className="flex justify-center pt-2">
//             <button
//               type="submit"
//               className="bg-[#1E0B5D] text-white rounded-lg px-8 py-3 text-base font-medium hover:bg-[#150840] transition-colors flex items-center gap-2"
//             >
//               Submit <ArrowRight size={16} />
//             </button>
//           </div>
//         </form>
//       </div>
//       <div className="pt-8">
//         <DashboardFooter />
//       </div>
//     </div>
//   );
// }

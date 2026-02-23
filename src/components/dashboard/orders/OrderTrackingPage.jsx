"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiMessageSquare, FiAlertCircle, FiCheck, FiArrowRight } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiCube } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import DashboardFooter from "../DashboardFooter";

const steps = [
    { label: "Order Placed", date: "Oct 24, 2025", icon: HiOutlineDocumentText },
    { label: "Seller Preparing", date: "Oct 24, 2025", icon: BiCube },
    { label: "Shipped", date: "Oct 25, 2025", icon: TbTruckDelivery },
    { label: "Delivered", date: "Oct 26, 2025", icon: BsBoxSeam },
    { label: "Completed", date: "Oct 27, 2025", icon: FiCheck },
];

const OrderTrackingPage = ({ orderId }) => {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            {/* Top Header */}
            <div className="max-w-[1440px] mx-auto py-4 px-4 sm:px-8">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors mb-4"
                >
                    <FiArrowLeft className="w-4 h-4" /> Back
                </button>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Order# {orderId || "39201"}
                            </h1>
                            <span className="bg-[#EBF3FE] text-[#2F73F5] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                                Escrow Secured
                            </span>
                        </div>
                        <p className="text-gray-500 text-sm">Place on October 24, 2025</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white shadow-sm">
                            <FiMessageSquare className="w-4 h-4" /> Contact Seller
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors bg-white shadow-sm">
                            <FiAlertCircle className="w-4 h-4" /> Report Issue
                        </button>
                    </div>
                </div>
            </div>

            <div className=" max-w-[1440px] mx-auto pb-12 px-4 sm:px-8 mt-6 sm:mt-8 space-y-6">

                {/* Progress Stepper */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-10 mb-6">
                    <div className="relative flex justify-between items-start max-w-7xl mx-auto">
                        {/* Background Lines */}
                        <div className="absolute top-[22px] left-0 w-full h-[2px] bg-gray-200 -z-0"></div>

                        {/* Active Line (Calculated Width based on Active Step) */}
                        <div
                            className="absolute top-[22px] left-0 h-[2px] bg-[#139D4C] transition-all duration-300 ease-in-out -z-0"
                            style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {/* Stepper Nodes */}
                        {steps.map((step, index) => {
                            const isPast = index < activeStep;
                            const isActive = index === activeStep;
                            const isFuture = index > activeStep;

                            return (
                                <div
                                    key={index}
                                    className="relative z-10 flex flex-col items-center cursor-pointer group w-24 sm:w-32"
                                    onClick={() => setActiveStep(index)}
                                >
                                    <div className={`w-11 h-11 rounded-full flex items-center justify-center border-[3px] bg-white transition-colors duration-200
                    ${isPast ? "border-[#139D4C]" : ""}
                    ${isActive ? "border-transparent bg-[#5C24D2]" : ""}
                    ${isFuture ? "border-gray-200 text-gray-400 group-hover:border-gray-300" : ""}
                  `}>

                                        {/* Inner Content of Node */}
                                        {isPast ? (
                                            <div className="w-full h-full rounded-full bg-[#139D4C] flex items-center justify-center">
                                                <FiCheck className="w-5 h-5 text-white stroke-[3]" />
                                            </div>
                                        ) : isActive ? (
                                            <div className="w-full h-full rounded-full bg-[#5C24D2] flex items-center justify-center">
                                                <step.icon className="w-5 h-5 text-white" />
                                            </div>
                                        ) : (
                                            <step.icon className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>

                                    <div className="mt-3 text-center">
                                        <p className={`text-sm font-semibold transition-colors duration-200
                      ${(isPast || isActive) ? "text-gray-900" : "text-gray-400"}
                    `}>
                                            {step.label}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">{step.date}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Dynamic Content Grid */}
                <div className="flex flex-col lg:flex-row gap-6">

                    {/* Left Column (Changes based on activeStep) */}
                    <div className="flex-1 space-y-6">

                        {/* Items Ordered Card (Always shows) */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <h2 className="px-6 py-4 font-bold text-gray-900 border-b border-gray-100">
                                Items Ordered
                            </h2>
                            <div className="p-6">
                                <div className="flex items-center justify-between border border-gray-100 p-4 rounded-xl shadow-sm">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                            <img src="/assets/images/earbuds.png" alt="Item" className="w-12 h-12 object-contain"
                                                onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Part" }} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900">Precision Disc Brake System</h3>
                                            <p className="text-gray-500 text-sm mt-0.5">Quantity: 610</p>
                                        </div>
                                    </div>
                                    <div className="font-bold text-gray-900 text-lg">
                                        $57,500
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dynamic Card (Order Placed vs Seller Preparing) */}
                        {activeStep === 0 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <h2 className="px-6 py-4 font-bold text-gray-900 border-b border-gray-100">
                                    Seller information
                                </h2>
                                <div className="p-6">
                                    <div className="flex items-center justify-between border border-gray-100 p-4 rounded-xl shadow-sm">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-[#7A40F2] rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
                                                V
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">VintageTime LLC</h3>
                                                <p className="text-gray-500 text-sm mt-0.5">4.9/5 Rating (1.2k+ sales)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeStep === 1 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <h2 className="px-6 py-4 font-bold text-gray-900 border-b border-gray-100">
                                    Seller is preparing your order
                                </h2>
                                <div className="p-8 flex items-center justify-center">
                                    <div className="w-full max-w-sm h-48 bg-[#F0FBFF] rounded-2xl flex items-center justify-center relative overflow-hidden border border-[#D5F3FE]">
                                        {/* Using an inline SVG illustration mockup to match the feel */}
                                        <svg viewBox="0 0 400 200" className="w-full h-full object-cover">
                                            <rect width="400" height="200" fill="#ffffff" />
                                            <path d="M120 200 L180 140 L220 140 L280 200 Z" fill="#000000" />
                                            <path d="M0 200 L150 140 L250 140 L400 200 Z" fill="#00BFFF" opacity="0.9" />
                                            {/* Person Silhouette */}
                                            <circle cx="200" cy="100" r="30" fill="#ffffff" stroke="#000000" strokeWidth="6" />
                                            {/* Hair */}
                                            <path d="M170 100 C 170 50, 230 50, 230 100 C 240 120, 240 140, 230 150 C 190 140, 170 140, 160 120 C 150 110, 160 100, 170 100" fill="#000000" />
                                            {/* Shoulders */}
                                            <path d="M180 130 Q 200 150 220 130 Q 240 160 260 200 L140 200 Q 160 160 180 130" fill="#ffffff" stroke="#000000" strokeWidth="4" />
                                            {/* Face features */}
                                            <circle cx="190" cy="95" r="3" fill="#000000" />
                                            <circle cx="210" cy="95" r="3" fill="#000000" />
                                            <path d="M195 110 Q 200 115 205 110" stroke="#000000" strokeWidth="3" fill="none" strokeLinecap="round" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeStep === 2 && (
                            <div className="space-y-6">
                                {/* Tracking Information Card */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-[#1E0B4B] rounded-xl flex items-center justify-center shrink-0">
                                                <TbTruckDelivery className="w-7 h-7 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg">Tracking Information</h3>
                                                <p className="text-gray-500 text-sm mt-0.5">Shipping carrier: FedEx</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 w-fit">
                                            <HiOutlineDocumentText className="w-4 h-4 text-gray-500" />
                                            <span className="font-semibold text-gray-700">#123456789</span>
                                        </div>
                                    </div>

                                    <button className="w-full flex items-center justify-center gap-2 bg-[#1E0B4B] text-white py-3 px-4 rounded-xl font-semibold hover:bg-[#140733] transition-colors shadow-sm text-[15px]">
                                        Track Your Order <FiArrowRight className="w-4.5 h-4.5" />
                                    </button>
                                </div>

                                {/* Shipping Details Card */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                    <h2 className="px-6 py-4 font-bold text-gray-900 border-b border-gray-100 text-lg">
                                        Shipping Details
                                    </h2>
                                    <div className="p-6">
                                        <div className="space-y-2">
                                            <p className="text-[#8c9ca8] font-medium text-sm">
                                                Name: <span className="text-[#8c9ca8]">Alex Morgan</span>
                                            </p>
                                            <p className="text-[#8c9ca8] font-medium text-sm leading-relaxed">
                                                Location: <span className="text-[#8c9ca8]">124 Tec Parkway,Suite 100 San Francisco,CA 94105 United State</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeStep === 3 && (
                            <div className="space-y-4">
                                <button className="w-full flex items-center justify-center gap-2 bg-[#1DAF61] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#189b53] transition-colors shadow-sm text-[16px]">
                                    <FiCheck className="w-5 h-5" strokeWidth={2.5} /> Mark as Received
                                </button>
                                <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 py-4 px-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm text-[16px]">
                                    <FiAlertCircle className="w-5 h-5" /> Create a Dispute
                                </button>
                                <p className="text-center text-[#8c9ca8] text-sm mt-2">
                                    This will release funds to seller.
                                </p>
                            </div>
                        )}

                        {/* Cancel Order Button */}
                        {(activeStep === 0 || activeStep === 1) && (
                            <div className="pt-2">
                                <button className="flex items-center gap-2 bg-[#2D1B54] text-white px-5 py-3 rounded-lg font-semibold text-sm hover:bg-[#1a0e36] transition-colors shadow-sm">
                                    Cancel Order <FiArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}

                        {activeStep === 4 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                                    <div className="bg-[#F8F6FF] text-[#5C24D2] p-1.5 rounded-md flex items-center justify-center shrink-0">
                                        <HiOutlineDocumentText className="w-5 h-5 text-[#5C24D2]" />
                                    </div>
                                    <h2 className="font-bold text-gray-900 text-lg">Timeline</h2>
                                </div>
                                <div className="p-6">
                                    <div className="relative pl-6 space-y-6">
                                        {/* Timeline Line */}
                                        <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#5C24D2] via-[#5C24D2] to-transparent"></div>

                                        {/* Timeline Items */}
                                        {[
                                            {
                                                date: "OCT 25, 2025,", time: "10:30 AM",
                                                title: "Order # 39201 Placed And fund Secure in Escrow",
                                                desc: "You Started The Transaction. $500.00 Was Debited From Your Wallet"
                                            },
                                            {
                                                date: "OCT 26, 2025,", time: "10:30 AM",
                                                title: "Seller Is Preparing Your Order",
                                                desc: "Seller Is Preparing Your Parcel"
                                            },
                                            {
                                                date: "OCT 27, 2025,", time: "06:15 AM",
                                                title: "Shipped Your Parcel",
                                                desc: "Shipping Carrier: FedEx"
                                            },
                                            {
                                                date: "OCT 27, 2025,", time: "06:15 AM",
                                                title: "Delivery Confirmed",
                                                desc: "Carrier Marked Item As Delivered. Please Inspect Your Item And Confirm."
                                            },
                                            {
                                                date: "OCT 28, 2025,", time: "12:15 AM",
                                                title: "Funds Released",
                                                desc: "Waiting For Your Confirmation..    Pending.."
                                            }
                                        ].map((item, idx) => (
                                            <div key={idx} className="relative">
                                                <div className="absolute -left-[27px] mt-1 w-[14px] h-[14px] bg-[#5C24D2] rounded-full ring-[4px] ring-white"></div>
                                                <div className="flex items-center gap-2 text-xs text-[#8c9ca8] font-medium mb-1 tracking-wide">
                                                    <span>{item.date}</span>
                                                    <div className="w-1 h-1 bg-[#8c9ca8] rounded-full"></div>
                                                    <span>{item.time}</span>
                                                </div>
                                                <h3 className="font-bold text-gray-900 text-base mb-1">{item.title}</h3>
                                                <p className="text-[#8c9ca8] text-sm">{item.desc}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8">
                                        <button className="w-full flex items-center justify-center gap-2 bg-[#1DAF61] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#189b53] transition-colors shadow-sm text-[16px]">
                                            <FiCheck className="w-5 h-5" strokeWidth={2.5} /> Completed
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>

                    {/* Right Column (Summary & Escrow) */}
                    <div className="w-full lg:w-[350px] space-y-6">

                        {/* Summary Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <h2 className="px-6 py-4 font-bold text-gray-900 border-b border-gray-100">
                                Summary
                            </h2>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between text-[15px]">
                                    <span className="text-gray-500 font-medium">Item Total</span>
                                    <span className="text-gray-700 font-semibold">$55,000</span>
                                </div>
                                <div className="flex justify-between text-[15px]">
                                    <span className="text-gray-500 font-medium">Shipping</span>
                                    <span className="text-gray-700 font-semibold">$2,500</span>
                                </div>
                                <div className="flex justify-between text-[15px]">
                                    <span className="text-[#139D4C] font-medium">Escrow Fee Deduction</span>
                                    <span className="text-[#139D4C] font-semibold">-$0</span>
                                </div>

                                <div className="border-t border-gray-100 pt-4 mt-2">
                                    <div className="flex justify-between text-[15px] mb-3">
                                        <span className="text-gray-600 font-semibold">Grand Total</span>
                                        <span className="text-gray-900 font-bold">$57,500</span>
                                    </div>
                                    <div className="flex justify-between items-center text-lg">
                                        <span className="font-bold text-gray-900">Est. Net Payout</span>
                                        <span className="font-bold text-gray-900">$57,500</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Escrow Status Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <IoShieldCheckmarkOutline className="w-5 h-5 text-[#139D4C]" />
                                    <span className="font-bold text-gray-900">Escrow Status</span>
                                </div>

                                {/* Mini Progress Bar */}
                                <div className="w-full h-2 bg-[#B7EFCD] rounded-full mb-2 overflow-hidden flex">
                                    <div className="h-full bg-[#1DAF61] rounded-full transition-all duration-500" style={{ width: activeStep === 4 ? "100%" : "35%" }}></div>
                                </div>

                                <div className="flex justify-between text-xs font-semibold mb-6">
                                    <span className={activeStep === 4 ? "text-[#1DAF61]" : "text-[#1DAF61]"}>Funds Locked</span>
                                    <span className={activeStep === 4 ? "text-[#1DAF61]" : "text-[#96C7A9]"}>Funds Released</span>
                                </div>

                                <p className="text-[#8c9ca8] font-medium text-[13px] leading-relaxed">
                                    {activeStep === 4
                                        ? "Funds have been released to the seller. Thank you for your business."
                                        : "Funds are securely held. Seller has not been paid yet."}
                                </p>
                            </div>
                        </div>

                        {/* Seller Information (Only activeStep === 4) */}
                        {activeStep === 4 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                                    <div className="bg-gray-100 text-gray-600 p-2 rounded-lg flex items-center justify-center">
                                        {/* Replace with User icon if needed, using a generic user icon */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h2 className="font-bold text-gray-900 text-lg">Seller Information</h2>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div>
                                        <p className="text-[11px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-0.5">SELLER NAME</p>
                                        <p className="font-semibold text-gray-900 text-[15px]">VintageTime LLC</p>
                                    </div>
                                    <div>
                                        <p className="text-[11px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-0.5">EMAIL</p>
                                        <p className="font-semibold text-gray-900 text-[15px]">VintageTime @gmail.com</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Pay Method (Only activeStep === 4) */}
                        {activeStep === 4 && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                                    <div className="bg-[#FAFBFD] text-[#5C24D2] p-2 rounded-lg flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#5C24D2]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <h2 className="font-bold text-gray-900 text-lg">Pay Method</h2>
                                </div>
                                <div className="p-6 space-y-6">
                                    <p className="text-gray-600 font-medium text-[15px] flex items-center">
                                        Visa <span className="text-gray-400 font-bold mx-2">••••</span> 4321
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-900 text-[15px]">Escro Fee</span>
                                        <span className="font-semibold text-[#1DAF61] text-[15px]">Free</span>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>

            {/* Footer */}
            <DashboardFooter />
        </div>
    );
};

export default OrderTrackingPage;

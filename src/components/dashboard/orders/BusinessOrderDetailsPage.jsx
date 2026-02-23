"use client";
import React, { useState } from "react";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiCalendar, FiCheck } from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
import { BiCube } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

const steps = [
    { label: "Order Placed", date: "Oct 24, 2025", icon: HiOutlineDocumentText },
    { label: "prepare shipment", date: "Oct 25, 2025", icon: IoShieldCheckmarkOutline },
    { label: "Shipped", date: "Oct 26, 2025", icon: TbTruckDelivery },
    { label: "Delivered", date: "Oct 27, 2025", icon: BsBoxSeam },
    { label: "Completed", date: "Oct 28, 2025", icon: FiCheck },
];

const BusinessOrderDetailsPage = ({ orderId }) => {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0); // 1 = Payment Secured
    const [isShippingFormOpen, setIsShippingFormOpen] = useState(false);
    const [isShipped, setIsShipped] = useState(false);
    const [isDelivered, setIsDelivered] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isTracking, setIsTracking] = useState(false);

    const handleTracking = () => {
        setIsTracking(true);
        setActiveStep(1)
    }

    const handleSubmitDetails = () => {
        setIsShippingFormOpen(false);
        setIsShipped(true);
        setActiveStep(2); // Move stepper to "Shipped" (index 2)
    };

    const handleMarkAsShipped = () => {
        setIsShipped(false);
        setIsDelivered(true);
        setActiveStep(3); // Move stepper to "Delivered" (index 3)
    };

    const handleMarkAsCompleted = () => {
        setIsDelivered(false);
        setIsCompleted(true);
        setActiveStep(4); // Move stepper to "Completed" (index 4)
    };

    return (
        <div className="bg-[#FAFBFD] min-h-screen flex flex-col font-sans">
            <div className="grow max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-18">

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center text-sm font-semibold text-gray-700 hover:text-gray-900 mb-6 transition-colors"
                >
                    <FiArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>

                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center flex-wrap gap-4 mb-2">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                            Order# {orderId || "39201"}
                        </h1>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isDelivered || isCompleted ? "bg-[#EBF1FF] text-[#2962FF]" : isShipped ? "bg-[#EBF1FF] text-[#2962FF]" : "bg-[#EBF1FF] text-[#2962FF]"}`}>
                            {isDelivered || isCompleted ? "Delivered" : isShipped ? "Shipped" : "Escrow Secured"}
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm font-medium">
                        Placed by John Doe, Oct 24, 2025
                    </p>
                </div>

                {/* Custom Stepper */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 overflow-hidden">
                    <div className="relative flex justify-between items-center w-full max-w-7xl mx-auto mb-6">
                        {/* Connecting Line Background */}
                        <div className="absolute top-[22px] left-0 right-0 h-[2px] bg-gray-200 z-0"></div>

                        {/* Active Line Progress */}
                        <div
                            className="absolute top-[22px] left-0 h-[2px] bg-[#1DAF61] transition-all duration-500 z-0"
                            style={{ width: `${(Math.max(activeStep, 0) / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((step, index) => {
                            const isCompleted = index < activeStep;
                            const isActive = index === activeStep;
                            const isPending = index > activeStep;

                            let iconBg = "bg-gray-100";
                            let iconColor = "text-gray-400";
                            let ringClass = "ring-white";

                            if (isCompleted) {
                                iconBg = "bg-[#1DAF61]";
                                iconColor = "text-white";
                                ringClass = "ring-white ring-[4px]";
                            } else if (isActive) {
                                iconBg = "bg-[#5C24D2]";
                                iconColor = "text-white";
                                ringClass = "ring-white ring-[4px] shadow-[0_0_0_2px_#5C24D2]";
                            } else if (isPending) {
                                iconBg = "bg-white border-2 border-gray-200";
                                iconColor = "text-gray-300";
                            }

                            return (
                                <div key={index} className="relative z-10 flex flex-col items-center group">
                                    <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-3 transition-colors duration-300 ${iconBg} ${ringClass}`}>
                                        <step.icon className={`w-5 h-5 ${iconColor}`} />
                                    </div>
                                    <span className={`text-sm font-medium text-center tracking-tight leading-tight mb-1 ${isActive ? "text-gray-900" : isCompleted ? "text-gray-800" : "text-gray-400"}`}>
                                        {step.label}
                                    </span>
                                    {step.date && (
                                        <span className="text-[12px] text-gray-400 font-medium">
                                            {step.date}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column (Main details & Actions) */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Funds Successfully Released Alert (Delivered & Completed State) */}
                        {(isDelivered || isCompleted) && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <IoShieldCheckmarkOutline className="w-5 h-5 text-[#139D4C]" />
                                    <h2 className="font-bold text-[#139D4C] text-lg">Funds Successfully Released</h2>
                                </div>
                                <p className="text-gray-500 leading-relaxed text-[15px]">
                                    The payout of <span className="font-bold text-gray-900">$57,500</span> has been added to your wallet and is now available for withdrawal.
                                </p>
                            </div>
                        )}

                        {/* Dynamic Action Card (Escrow Status / Shipping Form) */}
                        {!(isDelivered || isCompleted) && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                {!isShippingFormOpen ? (
                                    <div className="p-6 sm:p-8">
                                        <div className="flex items-center gap-2 mb-4">
                                            <IoShieldCheckmarkOutline className="w-5 h-5 text-[#139D4C]" />
                                            <h2 className="font-bold text-[#139D4C] text-lg">Escrow Payment Status</h2>
                                        </div>
                                        <div className="border-b border-gray-100 pb-6 mb-6">
                                            <p className="text-gray-600 leading-relaxed text-[15px]">
                                                Your payment of <span className="font-bold text-gray-900">$57,500</span> is securely held in escrow. Funds will be released after <span className="font-bold text-gray-900">24 hours after Buyer Confirmation of Delivery.</span>
                                            </p>
                                        </div>
                                        {!isShipped ? (
                                            activeStep === 0 ? (
                                                <button
                                                    onClick={handleTracking}
                                                    className="bg-[#1DAF61] text-white px-6 py-3 rounded-lg font-bold text-[15px] hover:bg-[#189b53] transition-colors"
                                                >
                                                    Confirm Payment & Prepare Shipment
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => setIsShippingFormOpen(true)}
                                                    className="bg-[#1DAF61] text-white px-6 py-3 rounded-lg font-bold text-[15px] hover:bg-[#189b53] transition-colors"
                                                >
                                                    Prepare Shipment & Get Tracking
                                                </button>
                                            )
                                        ) : (
                                            <div className="space-y-4">
                                                <div className="bg-[#FAFBFD] rounded-xl p-4 flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-[#1E0B4B] rounded-lg flex items-center justify-center shrink-0">
                                                        <TbTruckDelivery className="w-6 h-6 text-white" />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-[15px]">Sipping Carrier</p>
                                                        <p className="font-semibold text-gray-500 text-sm mt-0.5">FedEx</p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => {
                                                        setIsShippingFormOpen(true);
                                                        setIsShipped(false);
                                                    }}
                                                    className="bg-[#1E0B4B] text-white px-6 py-2.5 rounded-lg font-bold text-[14px] hover:bg-[#140733] transition-colors"
                                                >
                                                    Edit Tracking Info
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <div className="px-6 py-5 border-b border-gray-100">
                                            <h2 className="font-bold text-gray-900 text-[17px]">Submit Shipment Details</h2>
                                        </div>
                                        <div className="p-6 space-y-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                                {/* Courier Partner */}
                                                <div className="space-y-1.5">
                                                    <label className="block text-sm font-bold text-gray-900">
                                                        Courier Partner <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="relative">
                                                        <select className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-[15px]">
                                                            <option>DHL</option>
                                                            <option>FedEx</option>
                                                            <option>UPS</option>
                                                            <option>USPS</option>
                                                        </select>
                                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Tracking Number */}
                                                <div className="space-y-1.5">
                                                    <label className="block text-sm font-bold text-gray-900">
                                                        Tracking Number <span className="text-red-500">*</span>
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter tracking I.D."
                                                        className="w-full bg-white border border-gray-200 text-gray-900 py-3 px-4 rounded-lg outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-[15px] placeholder-gray-400"
                                                    />
                                                </div>
                                            </div>

                                            {/* Notes */}
                                            <div className="space-y-1.5">
                                                <label className="block text-sm font-bold text-gray-900">
                                                    Notes for Buyer (Optional)
                                                </label>
                                                <textarea
                                                    rows="3"
                                                    placeholder="eg. Shipping container details..."
                                                    className="w-full bg-white border border-gray-200 text-gray-900 py-3 px-4 rounded-lg outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-[15px] resize-none placeholder-gray-400"
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-xl">
                                            <button
                                                onClick={() => setIsShippingFormOpen(false)}
                                                className="px-6 py-2.5 rounded-lg font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-[15px]"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleSubmitDetails}
                                                className="px-6 py-2.5 rounded-lg font-semibold text-white bg-[#1E0B4B] hover:bg-[#140733] transition-colors text-[15px]"
                                            >
                                                Submit Details
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Order Summary Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <h2 className="px-6 py-4 font-bold text-gray-900 border-b border-gray-100 text-[17px]">
                                Order Summary
                            </h2>
                            <div className="p-6">
                                <div className="flex items-center justify-between border border-gray-100 p-4 rounded-xl shadow-sm mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                                            <img src="/assets/images/earbuds.png" alt="Item" className="w-12 h-12 object-contain"
                                                onError={(e) => { e.target.src = "https://placehold.co/100x100?text=Part" }} />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-900 text-[15px]">Precision Disc Brake System</h3>
                                            <p className="text-gray-500 text-sm mt-1">Quantity: 610 <span className="mx-1">•</span> Unit Price: $90.16</p>
                                        </div>
                                    </div>
                                    <div className="font-bold text-gray-900 text-lg">
                                        $57,500
                                    </div>
                                </div>

                                <div className="space-y-4 text-[15px]">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#8c9ca8] font-medium">Item Total</span>
                                        <span className="text-gray-600 font-medium">$55,000</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#8c9ca8] font-medium">Shipping</span>
                                        <span className="text-gray-600 font-medium">$2,500</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#1DAF61] font-medium">Escrow Fee Deduction</span>
                                        <span className="text-[#1DAF61] font-medium">-$0</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-5 mt-5">
                                    <div className="flex justify-between items-center text-[15px] mb-3">
                                        <span className="text-[#8c9ca8] font-bold text-[15px]">Grand Total</span>
                                        <span className="text-gray-900 font-bold">$57,500</span>
                                    </div>
                                    <div className="flex justify-between items-center text-xl mt-1">
                                        <span className="font-bold text-gray-900">Est. Net Payout</span>
                                        <span className="font-bold text-gray-900">$57,500</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Large Shipped Button placed below order summary */}
                        {isShipped && (
                            <button
                                onClick={handleMarkAsShipped}
                                className="w-full bg-[#1E0B4B] text-white py-4 px-4 rounded-xl font-medium tracking-wide flex items-center justify-center gap-2 hover:bg-[#140733] transition-colors text-[16px]"
                            >
                                shipped <TbTruckDelivery className="w-5 h-5" />
                            </button>
                        )}

                        {/* Courier Service Card (Delivered & Completed State) */}
                        {(isDelivered || isCompleted) && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <h2 className="px-6 py-4 font-bold text-gray-900 text-[17px]">
                                    Courier Service
                                </h2>
                                <div className="px-6 pb-6">
                                    <div className="flex items-center gap-4 mb-5 mt-2">
                                        <div className="w-12 h-12 bg-[#1E0B4B] rounded-lg flex items-center justify-center shrink-0">
                                            <TbTruckDelivery className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-[15px]">FedEx</p>
                                            <p className="font-semibold text-gray-500 text-[15px] mt-0.5 tracking-wide">Tracking: #123456789</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50/70 p-3 rounded-lg flex items-center gap-2 text-sm font-medium text-gray-500">
                                        <BsBoxSeam className="w-4 h-4" />
                                        Delivered On Oct 28, 2025
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column (Sidebar details) */}
                    <div className="space-y-6">
                        {/* Shipment Progress Card (Only in Delivered & Completed State) */}
                        {(isDelivered || isCompleted) && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <div className="px-6 py-4 border-b border-gray-100">
                                    <h2 className="font-bold text-gray-900 text-[17px]">Shipment Progress</h2>
                                </div>
                                <div className="p-6">
                                    <div className="border border-gray-100 rounded-xl p-5 space-y-6">

                                        <div className="flex items-center gap-4 relative">
                                            <div className="relative flex items-center justify-center shrink-0">
                                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-100"></div>
                                                <div className="w-4 h-4 rounded-full border-[3.5px] border-[#A855F7] bg-white z-10"></div>
                                            </div>
                                            <span className="font-bold text-gray-900 text-[15px]">Shipped</span>
                                        </div>

                                        <div className="flex items-center gap-4 relative">
                                            <div className="relative flex items-center justify-center shrink-0">
                                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-px h-8 bg-gray-100"></div>
                                                <div className={`w-4 h-4 rounded-full border-[3.5px] bg-white z-10 ${!isCompleted ? 'border-[#A855F7] ring-4 ring-purple-50' : 'border-[#A855F7]'}`}></div>
                                            </div>
                                            <span className="font-bold text-gray-900 text-[15px]">Delivered</span>
                                        </div>

                                        <div className="flex items-center gap-4 relative">
                                            <div className="absolute -top-7 left-[7px] w-0.5 h-8 bg-gray-100"></div>
                                            <div className="w-4 h-4 rounded-full border-[3px] border-gray-300 bg-white shrink-0"></div>
                                            <span className="font-semibold text-gray-400 text-[15px] lowercase">completed</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        )}
                        {/* Buyer Information Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h2 className="font-bold text-gray-900 text-[17px]">Buyer Information</h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-start gap-4">
                                    <span className="text-[#8c9ca8] text-sm shrink-0">Name</span>
                                    <span className="text-gray-600 text-[15px] text-right">John Doe</span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="text-[#8c9ca8] text-sm shrink-0">Email</span>
                                    <span className="text-gray-600 text-[15px] text-right">johndoe@example.com</span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="text-[#8c9ca8] text-sm shrink-0">Phone</span>
                                    <span className="text-gray-600 text-[15px] text-right">+1 (123) 456 7890</span>
                                </div>
                                <div className="flex justify-between items-start gap-4">
                                    <span className="text-[#8c9ca8] text-sm shrink-0">Location</span>
                                    <span className="text-gray-600 text-[15px] text-right">Texas, United States of America</span>
                                </div>
                            </div>
                        </div>

                        {/* Payout Status Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100">
                                <h2 className="font-bold text-gray-900 text-[17px]">Payout Status</h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#8c9ca8] text-[15px]">Net Payout</span>
                                        <span className="text-gray-500 font-medium text-[15px]">$57,500</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#8c9ca8] text-[15px]">Escrow Status</span>
                                        {(isDelivered || isCompleted) ? (
                                            <span className="bg-[#EBFBF2] text-[#139D4C] px-2.5 py-1 rounded-sm text-[11px] font-bold tracking-wide">
                                                Payment Released
                                            </span>
                                        ) : (
                                            <span className="bg-[#EBF1FF] text-[#2962FF] px-2.5 py-1 rounded-sm text-[11px] font-bold tracking-wide">
                                                Payment on hold
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {(isDelivered || isCompleted) ? (
                                    <div className="mt-8 mb-6">
                                        <p className="text-[#139D4C] font-bold text-[13.5px] leading-relaxed text-center px-2">
                                            Your payout for this transaction was processed and released to your account on November 3, 2025.
                                        </p>
                                        {!isCompleted ? (
                                            <button
                                                onClick={handleMarkAsCompleted}
                                                className="w-full mt-6 bg-[#F3F4F6] hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-colors text-[15px]"
                                            >
                                                <FiCalendar className="w-4 h-4" /> {/* Using FiCalendar as substitute icon for Remainder */}
                                                Send Remainder
                                            </button>
                                        ) : (
                                            <div className="mt-6 flex justify-center">
                                                <div className="w-full bg-[#1da15f] text-white py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-[15px]">
                                                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                                                        <FiCheck className="w-4 h-4 text-[#1da15f] stroke-4" />
                                                    </div>
                                                    Marked As Completed
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="border-t border-gray-100 mt-6 pt-5">
                                        <p className="text-[#8c9ca8] text-[13.5px] leading-relaxed">
                                            Estimated delivery date: Approx. 2 days after delivery confirmation.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            {/* Footer */}
            <DashboardFooter />
        </div>
    );
};

export default BusinessOrderDetailsPage;

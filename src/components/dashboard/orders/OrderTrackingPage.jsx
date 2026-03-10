"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCreditCard,
  FiLock,
  FiMessageSquare,
  FiStar,
  FiUser,
} from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { BiCube } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { BsBoxSeam } from "react-icons/bs";
import DashboardFooter from "../DashboardFooter";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import ConfirmModal from "@/components/modal/ConfirmModal";
import api from "@/lib/axios";

const OrderTrackingPage = ({ orderId }) => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isFinalCompleted, setIsFinalCompleted] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    if (!orderId) {
      setError("Order ID not found");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${API_URL}/orders/${orderId}/view`, {
          withCredentials: true,
        });
        if (!res.data.success) throw new Error(res.data.message);

        const orderData = res.data.data;
        setOrder(orderData);

        const status = orderData.status?.toLowerCase() || "pending";
        let step = 0;
        if (status.includes("prepar")) step = 1;
        else if (status.includes("process")) step = 2;
        else if (status.includes("ship")) step = 3;
        else if (status.includes("deliv")) step = 4;
        else if (status.includes("comp")) step = 5;

        setActiveStep(step);
        setIsFinalCompleted(status === "completed");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleMarkAsCompleted = async () => {
    try {
      const res = await axios.patch(
        `${API_URL}/orders/${orderId}/complete`,
        { status: "completed" },
        { withCredentials: true },
      );
      if (res.data.success) {
        toast.success("Order completed!");
        setIsFinalCompleted(true);
        setActiveStep(4);
        setOrder((prev) => ({ ...prev, status: "completed" }));
      } else {
        toast.error(res.data.message || "Failed to complete order");
      }
    } catch (err) {
      toast.error("Failed to complete order");
    }
  };

  const steps = [
    {
      label: "Order Placed",
      date: order
        ? new Date(order.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        : "Pending",
      icon: HiOutlineDocumentText,
    },
    {
      label: "Seller Preparing", date: order
        ? new Date(order.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        : "Pending", icon: BiCube
    },
    {
      label: "Shipped", date: order
        ? new Date(order.tracking.shippedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        : "Pending", icon: TbTruckDelivery
    },
    {
      label: "Delivered", date: order
        ? new Date(order.tracking.deliveredAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        : "Pending", icon: BsBoxSeam
    },
    {
      label: "Completed", date: order
        ? new Date(order.completedAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        : "Pending", icon: FiCheck
    },
  ];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleCancelOrder = async () => {
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    setCancelling(true);
    setShowCancelModal(false);

    try {
      const res = await axios.get(`${API_URL}/orders/${orderId}/cancel`, {
        withCredentials: true,
      });

      // await axios.delete(`${API_URL}/orders/${orderId}/cancel`, { withCredentials: true });

      if (res.data.success) {
        toast.success("Order cancelled successfully!");
        router.push("/dashboard/user/checkout");
      } else {
        toast.error(res.data.message || "Failed to cancel");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error cancelling order");
    } finally {
      setCancelling(false);
    }
  };

  const handleUpdateCompletion = async () => {
    setIsFinalCompleted(true)

    try {
      const res = await api.patch({
        url: `/orders/${orderId}/complete`,
      });

      if (res.success) {
        toast.success("Order Completed successfully!");
      }
    } catch (err) {
      const errorMessage = err.message || "Error in Completing Order";
    } finally {
      setLoading(false);
    }
  }

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
                Order# {order?._id || orderId || "N/A"}{" "}
              </h1>
              <span className="bg-[#EBF3FE] text-[#2F73F5] text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                Escrow Secured
              </span>
            </div>
            <p className="text-gray-500 text-sm">
              Placed on {new Date(order?.createdAt).toLocaleDateString()}
            </p>
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
              className="absolute top-5.5 left-0 h-[2px] bg-[#139D4C] transition-all duration-300 ease-in-out"
              style={{
                width: `${Math.min(
                  (activeStep / (steps.length - 1)) * 100,
                  100
                )}%`
              }}
            />
            {/* Stepper Nodes */}
            {steps.map((step, index) => {
              const isPast = index < activeStep;
              const isActive = index === activeStep;
              const isFuture = index > activeStep;
              return (
                <div
                  key={index}
                  className="relative z-10 flex flex-col items-center cursor-pointer group w-24 sm:w-32"
                // onClick={() => setActiveStep(index)}
                >
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center border-[3px] bg-white transition-colors duration-200
                    ${isPast ? "border-[#139D4C]" : ""}
                    ${isActive ? "border-transparent bg-[#5C24D2]" : ""}
                    ${isFuture ? "border-gray-200 text-gray-400 group-hover:border-gray-300" : ""}
                  `}
                  >
                    {/* Inner Content of Node */}
                    {isPast ? (
                      <div className="w-full h-full rounded-full bg-[#139D4C] flex items-center justify-center">
                        <FiCheck className="w-5 h-5 text-white stroke-3" />
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
                    <p
                      className={`text-sm font-semibold transition-colors duration-200
                      ${isPast || isActive ? "text-gray-900" : "text-gray-400"}
                    `}
                    >
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
                {order?.items.map((item) => {
                  const product = order?.products.find(
                    (p) => p._id === item.productId,
                  );

                  return (
                    <div
                      key={item.productId}
                      className="flex items-center justify-between border border-gray-100 p-4 rounded-xl shadow-sm"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden shrink-0">
                          <img
                            src={
                              product?.image ||
                              "https://placehold.co/100x100?text=No+Image"
                            }
                            alt={product?.title || "Item"}
                            className="w-12 h-12 object-contain"
                            onError={(e) => {
                              e.target.src =
                                "https://placehold.co/100x100?text=No+Image";
                            }}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {product?.title || "Unknown Product"}
                          </h3>
                          <p className="text-gray-500 text-sm mt-0.5">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="font-bold text-gray-900 text-lg">
                        ${item.priceAtPurchase * item.quantity}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Card (Order Placed vs Seller Preparing) */}
            {activeStep === 0 && order?.businessProfile && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="px-6 py-4 font-bold text-gray-900 border-b border-gray-100">
                  Seller Information
                </h2>
                <div className="p-6">
                  <div className="flex items-center justify-between border border-gray-100 p-4 rounded-xl shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[#7A40F2] rounded-full flex items-center justify-center text-white text-xl font-bold shrink-0">
                        {order?.businessProfile.companyName?.charAt(0) || "S"}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">
                          {order?.businessProfile.companyName ||
                            "Unknown Seller"}
                        </h3>
                        <p className="text-gray-500 text-sm mt-0.5">
                          {/* Optional: You can dynamically fetch rating or sales if you have it */}
                          {order?.businessProfile.rating
                            ? `${order?.businessProfile.rating}/5 Rating (${order?.businessProfile.sales} sales)`
                            : "No rating available"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 1 && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <h2 className="px-6 py-4 font-semibold text-gray-900 text-xl">
                  Seller is preparing your order
                </h2>
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-[430px] rounded-2xl flex items-center justify-center relative overflow-hidden">
                    {/* Using an inline SVG illustration mockup to match the feel */}
                    <img
                      src="/assets/images/orderPreparing.png"
                      alt="orderPreparing"
                      className="w-full h-full object-cover"
                    />
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
                        <h3 className="font-bold text-gray-900 text-lg">
                          Tracking Information
                        </h3>
                        <p className="text-gray-500 text-sm mt-0.5">
                          Shipping carrier: FedEx
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 w-fit">
                      <HiOutlineDocumentText className="w-4 h-4 text-gray-500" />
                      <span className="font-semibold text-gray-700">
                        #123456789
                      </span>
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
                        Name:{" "}
                        <span className="text-[#8c9ca8]">
                          {order?.shippingAddress?.name}
                        </span>
                      </p>
                      <p className="text-[#8c9ca8] font-medium text-sm leading-relaxed">
                        Location:{" "}
                        <span className="text-[#8c9ca8]">
                          {order?.shippingAddress?.lineAddress?.join(", ")},{" "}
                          {order?.shippingAddress?.province},{" "}
                          {order?.shippingAddress?.postalCode}
                        </span>
                      </p>
                      <p className="text-[#8c9ca8] font-medium text-sm leading-relaxed">
                        Phone:{" "}
                        <span className="text-[#8c9ca8]">
                          {order?.shippingAddress?.phone}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 3 && (
              <div className="space-y-4">
                <button
                  onClick={handleMarkAsCompleted}
                  className="w-full flex items-center justify-center gap-2 bg-[#1DAF61] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#189b53] transition-colors shadow-sm text-[16px]"
                >
                  <FiCheck className="w-5 h-5" strokeWidth={2.5} /> Mark as
                  Received
                </button>
                <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-800 py-4 px-4 rounded-xl font-semibold border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm text-[16px]">
                  <FiAlertCircle className="w-5 h-5" /> Create a Dispute
                </button>
              </div>
            )}

            {/* Cancel Order Button */}
            {(activeStep === 0 || activeStep === 1) && (
              <div className="pt-2">
                <button
                  onClick={handleCancelOrder}
                  disabled={cancelling}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg font-semibold text-sm transition-colors shadow-sm disabled:opacity-70"
                >
                  {cancelling ? "Cancelling..." : "Cancel Order"}
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {activeStep === 4 && !isFinalCompleted && (
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
                    <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-linear-to-b from-[#5C24D2] via-[#5C24D2] to-transparent"></div>

                    {/* Timeline Items */}
                    {[
                      {
                        date: "OCT 25, 2025,",
                        time: "10:30 AM",
                        title: "Order # 39201 Placed And fund Secure in Escrow",
                        desc: "You Started The Transaction. $500.00 Was Debited From Your Wallet",
                      },
                      {
                        date: "OCT 26, 2025,",
                        time: "10:30 AM",
                        title: "Seller Is Preparing Your Order",
                        desc: "Seller Is Preparing Your Parcel",
                      },
                      {
                        date: "OCT 27, 2025,",
                        time: "06:15 AM",
                        title: "Shipped Your Parcel",
                        desc: "Shipping Carrier: FedEx",
                      },
                      {
                        date: "OCT 27, 2025,",
                        time: "06:15 AM",
                        title: "Delivery Confirmed",
                        desc: "Carrier Marked Item As Delivered. Please Inspect Your Item And Confirm.",
                      },
                      {
                        date: "OCT 28, 2025,",
                        time: "12:15 AM",
                        title: "Funds Released",
                        desc: "Waiting For Your Confirmation..    Pending..",
                      },
                    ].map((item, idx) => (
                      <div key={idx} className="relative">
                        <div className="absolute -left-[27px] mt-1 w-[14px] h-[14px] bg-[#5C24D2] rounded-full ring-4 ring-white"></div>
                        <div className="flex items-center gap-2 text-xs text-[#8c9ca8] font-medium mb-1 tracking-wide">
                          <span>{item.date}</span>
                          <div className="w-1 h-1 bg-[#8c9ca8] rounded-full"></div>
                          <span>{item.time}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-base mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[#8c9ca8] text-sm">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={() => {
                        handleUpdateCompletion()
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-[#1DAF61] text-white py-4 px-4 rounded-xl font-semibold hover:bg-[#189b53] transition-colors shadow-sm text-[16px]"
                    >
                      <FiCheck className="w-5 h-5" strokeWidth={2.5} />{" "}
                      Completed
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeStep === 4 && isFinalCompleted && (
              <div className="space-y-6">
                {/* Shipping Details Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <h2 className="px-6 py-4 font-bold text-gray-900 border-b border-gray-100 text-[17px]">
                    Shipping Details
                  </h2>
                  <div className="p-6">
                    <div className="space-y-2">
                      <p className="text-[#8c9ca8] font-medium text-sm">
                        Name:{" "}
                        <span className="text-gray-900 font-semibold">
                          {order?.shippingAddress?.name || "—"}
                        </span>
                      </p>
                      <p className="text-[#8c9ca8] font-medium text-sm leading-relaxed">
                        Location:{" "}
                        <span className="text-gray-900 font-semibold">
                          {order?.shippingAddress?.lineAddress?.join(", ") ||
                            "—"}
                          , {order?.shippingAddress?.province || "—"},{" "}
                          {order?.shippingAddress?.postalCode || "—"}
                        </span>
                      </p>
                      <p className="text-[#8c9ca8] font-medium text-sm">
                        Phone:{" "}
                        <span className="text-gray-900 font-semibold">
                          {order?.shippingAddress?.phone || "—"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Seller Information Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <FiUser className="w-5 h-5 text-gray-500" />
                      </div>
                      <h2 className="font-bold text-gray-900 text-[17px]">
                        Seller Information
                      </h2>
                    </div>
                    <div className="p-6 space-y-5">
                      <div>
                        <p className="text-[11px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-1">
                          SELLER NAME
                        </p>
                        <p className="font-bold text-gray-900 text-[16px]">
                          {order?.businessProfile?.companyName || "—"}
                        </p>
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-1">
                          EMAIL
                        </p>
                        <p className="font-bold text-gray-900 text-[16px]">
                          {order?.businessProfile?.email || "—"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Pay Method Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                      <div className="bg-purple-50 p-2 rounded-lg">
                        <FiCreditCard className="w-5 h-5 text-[#5C24D2]" />
                      </div>
                      <h2 className="font-bold text-gray-900 text-[17px]">
                        Pay Method
                      </h2>
                    </div>
                    <div className="p-6 space-y-6">
                      <p className="text-gray-600 font-bold text-[16px] flex items-center tracking-wide">
                        Visa{" "}
                        <span className="text-gray-400 font-black mx-2 text-xs">
                          ••••
                        </span>{" "}
                        4321
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900 text-[15px]">
                          Escro Fee
                        </span>
                        <span className="font-bold text-[#1DAF61] text-[15px]">
                          Free
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Funds Released Alert Card */}
                <div className="bg-[#EBFBF2] rounded-xl border border-[#D5F3D1] p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-6 rounded-full bg-[#139D4C] flex items-center justify-center shrink-0">
                      <FiCheck className="w-4 h-4 text-white stroke-[3]" />
                    </div>
                    <h2 className="font-bold text-[#139D4C] text-[17px]">
                      Funds Successfully Released
                    </h2>
                  </div>
                  <p className="text-[#139D4C] font-medium leading-[1.6] text-[15px] mb-8">
                    The transaction is complete. Funds have been securely
                    released to{" "}
                    <span className="font-bold">Camera Pro Outlet</span>. Thank
                    you for using our escrow service for a secure purchase.
                  </p>
                  <button className="w-full bg-[#1E0B4B] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#140733] transition-colors text-[16px]">
                    Leave Feedback <FiStar className="w-4 h-4 fill-white" />
                  </button>
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
              <div className="p-6">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[15px]">
                    <span className="text-gray-400 font-medium">
                      Item Total
                    </span>
                    <span className="text-gray-500 font-bold">
                      ${order?.totalAmount - (order?.shippingCost || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[15px]">
                    <span className="text-gray-400 font-medium">Shipping</span>
                    <span className="text-gray-500 font-bold">
                      ${order?.shippingCost || 0}
                    </span>
                  </div>
                  <div className="flex justify-between text-[15px]">
                    <span className="text-[#139D4C] font-medium">
                      Escrow Fee Deduction
                    </span>
                    <span className="text-[#139D4C] font-bold">
                      -${order?.escrowFee || 0}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-[15px] mb-3">
                    <span className="text-gray-400 font-bold">Grand Total</span>
                    <span className="text-gray-900 font-bold">
                      ${order?.totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xl mt-1">
                    <span className="font-bold text-gray-900">
                      Est. Net Payout
                    </span>
                    <span className="font-bold text-gray-900">
                      ${order?.totalAmount}
                    </span>
                  </div>
                </div>

                {isFinalCompleted && (
                  <div className="mt-8 bg-[#F8F9FA] rounded-xl border border-gray-100 p-5">
                    <div className="flex items-center gap-2.5 mb-4">
                      <div className="bg-white p-1 rounded border border-gray-200">
                        <FiLock className="w-3.5 h-3.5 text-gray-500" />
                      </div>
                      <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                        RELEASED FROM ESCROW
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[15px] font-bold text-gray-900">
                        Final Amount
                      </span>
                      <span className="text-[15px] font-bold text-gray-900">
                        ${order?.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 mt-2">
                      Paid To Seller On{" "}
                      {new Date(order?.updatedAt).toLocaleDateString()}, At{" "}
                      {new Date(order?.updatedAt).toLocaleTimeString()}
                    </p>
                  </div>
                )}
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
                <div className="w-full h-2.5 bg-[#B7EFCD] rounded-full mb-3 overflow-hidden flex">
                  <div
                    className="h-full bg-[#1DAF61] rounded-full transition-all duration-500"
                    style={{ width: activeStep === 4 ? "100%" : "35%" }}
                  ></div>
                </div>

                <div className="flex justify-between text-[11px] font-bold mb-6">
                  <span className="text-[#1DAF61] uppercase tracking-wider">
                    Funds Locked
                  </span>
                  <span
                    className={`uppercase tracking-wider ${isFinalCompleted ? "text-[#1DAF61]" : "text-[#96C7A9]"}`}
                  >
                    Funds Released
                  </span>
                </div>

                <p className="text-[#8c9ca8] font-bold text-[13px] leading-relaxed">
                  {isFinalCompleted
                    ? "Funds have been released to the seller. Thank you for your business."
                    : "Funds are securely held. Seller has not been paid yet."}
                </p>
              </div>
            </div>

            {/* Seller Information & Pay Method were removed from here as they are moved to the left column in completed state */}
            {activeStep !== 4 && activeStep === 4 && (
              <>
                {/* This is just to satisfy the previous structure if needed, but they are gone in activeStep 4 */}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <DashboardFooter />
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? This action cannot be undone."
        confirmText="Yes, Cancel Order"
        cancelText="No, Keep Order"
        isLoading={cancelling}
        danger={true} // red button
      />
    </div>
  );
};

export default OrderTrackingPage;

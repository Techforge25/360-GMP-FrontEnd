"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiCreditCard,
  FiDownload,
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
import { toast } from "react-toastify";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import ConfirmModal from "@/components/modal/ConfirmModal";
import api from "@/lib/axios";
import useSocket from "@/hooks/useSocket";
import { getStatusColor } from "@/constants/index";
import BusinessProductReviewModal from "./BusinessProductReviewModal";

const OrderTrackingPage = ({ orderId }) => {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("")
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isFinalCompleted, setIsFinalCompleted] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false)
  const [cancelling, setCancelling] = useState(false);
  const [reason, setReason] = useState("")
  const [steps, setSteps] = useState([
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
  ])

  const formatDate = (date) => {
    if (!date) return "Pending";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

 const [open, setOpen] = useState(false);

  useSocket("update-order-status", (data) => {
    if (!data?.status) return;

    const status = data.status.toLowerCase();


    // Update order state
    setOrder((prev) => ({
      ...prev,
      status,
      createdAt: prev.createdAt,
      updatedAt: currentDate.toISOString(),
      tracking: {
        ...prev.tracking,
        shippedAt: status === "shipped" ? currentDate.toISOString() : prev.tracking?.shippedAt,
        deliveredAt: status === "delivered" ? currentDate.toISOString() : prev.tracking?.deliveredAt,
      },
      completedAt: status === "completed" ? currentDate.toISOString() : prev.completedAt,
    }));

    // Update steps dynamically
    setSteps((prevSteps) => {
      const updated = [...prevSteps];

      switch (status) {
        case "processing":
        case "preparing":
          updated[1].date = formattedDate; // Seller Preparing
          setActiveStep(1);
          break;
        case "shipped":
          updated[2].date = formattedDate; // Shipped
          setActiveStep(2);
          break;
        case "delivered":
          updated[3].date = formattedDate; // Delivered
          setActiveStep(3);
          break;
        case "completed":
          updated[4].date = formattedDate; // Completed
          setActiveStep(4);
          setIsFinalCompleted(true);
          break;
        default:
          updated[0].date = formattedDate;
          setActiveStep(0);
          break;
      }
      return updated;
    });
  });

  console.log(steps, "steps")

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
        setOrderStatus(orderData.status)
        console.log(orderData, "ordersadasds data")
        setSteps((prevSteps) => {
          const updated = [...prevSteps];
          switch (orderData.status) {
            case "processing":
            case "preparing":
              updated[1].date = formattedDate; // Seller Preparing
              setActiveStep(1);
              break;
            case "shipped":
              updated[2].date = formattedDate; // Shipped
              setActiveStep(2);
              break;
            case "delivered":
              updated[3].date = formattedDate; // Delivered
              setActiveStep(3);
              break;
            case "completed":
              updated[4].date = formattedDate; // Completed
              setActiveStep(4);
              setIsFinalCompleted(true);
              break;
            default:
              updated[0].date = formattedDate;
              setActiveStep(0);
              break;
          }
          return updated;
        });
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
  }, [orderId, activeStep]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleCancelOrder = async () => {
    setShowCancelModal(true);
  };

  const confirmCancel = async () => {
    setCancelling(true);
    setShowCancelModal(false);

    try {
      const res = await axios.patch(`${API_URL}/orders/${orderId}/cancel`, {
        withCredentials: true,
      });

      // await axios.delete(`${API_URL}/orders/${orderId}/cancel`, { withCredentials: true });

      if (res.data.success) {
        toast.success("Order cancelled successfully!");
        router.push("/dashboard/user/marketplace");
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
    setIsCompleting(false);
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
      setIsCompleting(false);
      setLoading(false)
    }
  }

  const goToInvoice = () => {
    if (!order?._id) {
      toast.error("Order ID nahi mila");
      return;
    }
    router.push(`/dashboard/invoice/${order._id}`);
  };

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
              <span className={`${getStatusColor(order?.status)} text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1`}>
                {order?.status}
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
              const isPast = index < activeStep || (index === steps.length - 1 && isFinalCompleted);
              const isActive = index === activeStep && !isFinalCompleted;
              const isFuture = index > activeStep;
              console.log(step, "stepped")
              return (
                <div key={index} className="relative z-10 flex flex-col items-center cursor-pointer group w-24 sm:w-32">
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
        {order?.status === "cancelled" ? (
          <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200 text-center">
            <div className="flex flex-col items-center space-y-4">
              <svg
                className="w-16 h-16 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>

              {/* Heading */}
              <h2 className="text-2xl font-bold text-gray-900">
                Order Cancelled
              </h2>

              {/* Message */}
              <p className="text-gray-600 text-base">
                You have cancelled this order.
              </p>

              {/* Optional Button */}
              <button className="mt-4 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition" onClick={() => router.push("/dashboard/user/orders")}>
                Back To Orders
              </button>
            </div>
          </div>
        ) : (
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

              {orderStatus === "completed" && (
                <div className="space-y-6">
                  {/* Timeline Card */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-3">
                      <div className="bg-[#FAF9FF] p-2 rounded-lg">
                        <HiOutlineDocumentText className="w-5 h-5 text-[#5C24D2]" />
                      </div>
                      <h2 className="font-bold text-gray-900 text-[17px]">Timeline</h2>
                    </div>
                    <div className="p-6">
                      <div className="relative pl-8 space-y-8 pb-4">
                        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
                        {[
                          {
                            date: order?.createdAt
                              ? new Date(order.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                              : "Pending",
                            time: order?.createdAt
                              ? new Date(order.createdAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                              : "Pending",
                            title: "Order placed",
                            desc: `Order Placed By Buyer: ${order?.userProfile?.fullName || "Customer"}`,
                            active: true,
                          },
                          {
                            date: order?.createdAt
                              ? new Date(order.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                              : "Pending",
                            time: order?.createdAt
                              ? new Date(order.createdAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                              : "Pending",
                            title: "Prepare Shipment",
                            desc: "You Are Preparing The Parcel For Shipping",
                            active: order?.status !== "pending",
                          },
                          {
                            date: order?.tracking?.shippedAt
                              ? new Date(order.tracking.shippedAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                              : "Pending",
                            time: order?.tracking?.shippedAt
                              ? new Date(order.tracking.shippedAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                              : "Pending",
                            title: "Shipped",
                            desc: "Shipped The Item To Buyer Location Courier Service FedEx",
                            active: ["shipped", "delivered", "completed"].includes(order?.status),
                          },
                          {
                            date: order?.tracking?.deliveredAt
                              ? new Date(order.tracking.deliveredAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                              : "Pending",
                            time: order?.tracking?.deliveredAt
                              ? new Date(order.tracking.deliveredAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                              : "Pending",
                            title: "Delivered",
                            desc: "Parcel Successfully Delivered To Buyer",
                            active: ["delivered", "completed"].includes(order?.status),
                          },
                          {
                            date: order?.tracking?.deliveredAt
                              ? new Date(order.tracking.deliveredAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })
                              : "Pending",
                            time: order?.tracking?.deliveredAt
                              ? new Date(order.tracking.deliveredAt).toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              })
                              : "Pending", // if you have a real date, you can format it dynamically too
                            title: "Fund Released",
                            desc: `Your Payout For This Transaction Was Processed And Released To Your Account (${order?.totalAmount || 0})`,
                            active: order?.status === "completed",
                          },
                        ].map((item, idx) => (
                          <div key={idx} className="relative">
                            <div
                              className={`absolute -left-[33px] mt-1.5 w-4 h-4 rounded-full ring-4 ring-white z-10 ${item.active ? "bg-[#5C24D2]" : "bg-[#1E0B4B]"
                                }`}
                            ></div>

                            <div className="flex items-center gap-2 text-[11px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-2">
                              <span>{item.date}</span>
                              <div className="w-1 h-1 bg-[#8c9ca8] rounded-full"></div>
                              <span>{item.time}</span>
                            </div>

                            <h3 className="font-bold text-gray-900 text-[16px] mb-1">
                              {item.title}
                            </h3>

                            <p className="text-[#8c9ca8] font-medium text-[14px] leading-relaxed max-w-2xl">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
              {(activeStep === 0) && (
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

              {/* {activeStep === 4 && isFinalCompleted && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                    <div className="bg-[#F8F6FF] text-[#5C24D2] p-1.5 rounded-md flex items-center justify-center shrink-0">
                      <HiOutlineDocumentText className="w-5 h-5 text-[#5C24D2]" />
                    </div>
                    <h2 className="font-bold text-gray-900 text-lg">Timeline</h2>
                  </div>
                  <div className="p-6">
                    <div className="relative pl-8 space-y-8 pb-4">
                      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
                      {[
                        {
                          date: order?.createdAt
                            ? new Date(order.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                            : "Pending",
                          time: order?.createdAt
                            ? new Date(order.createdAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            : "Pending",
                          title: "Order placed",
                          desc: `Order Placed By Buyer: ${order?.userProfile?.fullName || "Customer"}`,
                          active: true,
                        },
                        {
                          date: order?.createdAt
                            ? new Date(order.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                            : "Pending",
                          time: order?.createdAt
                            ? new Date(order.createdAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            : "Pending",
                          title: "Prepare Shipment",
                          desc: "You Are Preparing The Parcel For Shipping",
                          active: order?.status !== "pending",
                        },
                        {
                          date: order?.tracking?.shippedAt
                            ? new Date(order.tracking.shippedAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                            : "Pending",
                          time: order?.tracking?.shippedAt
                            ? new Date(order.tracking.shippedAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            : "Pending",
                          title: "Shipped",
                          desc: "Shipped The Item To Buyer Location Courier Service FedEx",
                          active: ["shipped", "delivered", "completed"].includes(order?.status),
                        },
                        {
                          date: order?.tracking?.deliveredAt
                            ? new Date(order.tracking.deliveredAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })
                            : "Pending",
                          time: order?.tracking?.deliveredAt
                            ? new Date(order.tracking.deliveredAt).toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            : "Pending",
                          title: "Delivered",
                          desc: "Parcel Successfully Delivered To Buyer",
                          active: ["delivered", "completed"].includes(order?.status),
                        },
                        {
                          date: "MAR 13, 2026",
                          time: "10:30 AM", // if you have a real date, you can format it dynamically too
                          title: "Fund Released",
                          desc: `Your Payout For This Transaction Was Processed And Released To Your Account (${order?.totalAmount || 0})`,
                          active: order?.status === "completed",
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="relative">
                          <div
                            className={`absolute -left-[33px] mt-1.5 w-4 h-4 rounded-full ring-4 ring-white z-10 ${item.active ? "bg-[#5C24D2]" : "bg-[#1E0B4B]"
                              }`}
                          ></div>

                          <div className="flex items-center gap-2 text-[11px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-2">
                            <span>{item.date}</span>
                            <div className="w-1 h-1 bg-[#8c9ca8] rounded-full"></div>
                            <span>{item.time}</span>
                          </div>

                          <h3 className="font-bold text-gray-900 text-[16px] mb-1">
                            {item.title}
                          </h3>

                          <p className="text-[#8c9ca8] font-medium text-[14px] leading-relaxed max-w-2xl">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )} */}

              {activeStep === 4 && isFinalCompleted && (
                <>
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
                      <button onClick={() => setOpen(true)} className="w-full bg-[#1E0B4B] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#140733] transition-colors text-[16px]">
                        Leave Feedback <FiStar className="w-4 h-4 fill-white" />
                      </button>
                    </div>
                  </div>
                </>
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
                        {new Date(order?.completedAt).toLocaleDateString()}, At{" "}
                        {new Date(order?.completedAt).toLocaleTimeString()}
                      </p>
                      <button
                        onClick={goToInvoice}
                        className="w-full bg-[#1DAF61] text-white my-3 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#189b53] transition-colors text-[15px]"
                        disabled={!order?._id} // optional: disable agar order nahi hai
                      >
                        <FiDownload className="w-5 h-5" /> Download Invoice
                      </button>
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
                      style={{ width: activeStep === 0 ? "0%" : activeStep === 1 ? "25%" : activeStep === 2 ? "50%" : activeStep === 3 ? "75%" : "100%" }}
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
                      SELLER EMAIL
                    </p>
                    <p className="font-bold text-gray-900 text-[16px]">
                      {order?.businessProfile?.sellerEmail || "—"}
                    </p>
                  </div>
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
        )}

      </div>

      {showCancelModal && (
        <ConfirmModal
          isOpen={showCancelModal}
          onClose={() => setShowCancelModal(false)}
          orderId={orderId}
          // onConfirm={confirmCancel}
          title="Cancel Order"
          message="Are you sure you want to cancel this order? This action cannot be undone."
          confirmText="Yes, Cancel Order"
          cancelText="No, Keep Order"
          isLoading={cancelling}
          setReason={setReason}
          reason={reason}
          setCancelling={setCancelling}
          setShowCancelModal={setShowCancelModal}
          danger={true} // red button
        />
      )}

      {/* Leave Fedback Modal */}

       {open && (
        <BusinessProductReviewModal onClose={() => setOpen(false)} />
      )}



      {/* Footer */}
      <DashboardFooter />

      {/* <ConfirmModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={confirmCancel}
        title="Cancel Order"
        message="Are you sure you want to cancel this order? This action cannot be undone."
        confirmText="Yes, Cancel Order"
        cancelText="No, Keep Order"
        isLoading={cancelling}
        danger={true} // red button
      /> */}
    </div>
  );
};

export default OrderTrackingPage;

"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // ← Yeh add karo
import axios from "axios"; // ← Yeh add karo agar pehle nahi tha
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import {
  FiArrowLeft,
  FiMessageSquare,
  FiAlertCircle,
  FiCheck,
  FiArrowRight,
  FiStar,
  FiLock,
  FiUser,
  FiCreditCard,
  FiCalendar,
  FiDownload,
  FiClock,
} from "react-icons/fi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { TbTruckDelivery } from "react-icons/tb";
import { BiCube } from "react-icons/bi";
import { BsBoxSeam } from "react-icons/bs";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { io } from "socket.io-client";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;


const BusinessOrderDetailsPage = () => {
  const { id: orderId } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courierName, setCourierName] = useState("");
const [trackingId, setTrackingId] = useState("");

  // Shipping & Tracking states (aapke original)
  const [isShippingFormOpen, setIsShippingFormOpen] = useState(false);
  const [isShipped, setIsShipped] = useState(false);
  const [isDelivered, setIsDelivered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showFinalCompletedUI, setShowFinalCompletedUI] = useState(false);
  const [isRemainderSent, setIsRemainderSent] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);

  const [activeStep, setActiveStep] = useState(0);

  // Stepper with real dates
  const [steps, setSteps] = useState([
    { label: "Order Placed", date: "Loading...", icon: HiOutlineDocumentText },
    { label: "Prepare Shipment", date: "Loading...", icon: IoShieldCheckmarkOutline },
    { label: "Shipped", date: "Loading...", icon: TbTruckDelivery },
    { label: "Delivered", date: "Loading...", icon: BsBoxSeam },
    { label: "Completed", date: "Loading...", icon: FiCheck },
  ]);

  const [socket, setSocket] = useState(null);

  // Fetch + Real-time Polling (every 15 seconds)
  useEffect(() => {
  const socketIo = io(BASE_URL, { withCredentials: true });
  setSocket(socketIo);

  socketIo.on("statusChanged", (newStatus) => {
  toast.info(`Order status changed to ${newStatus}`);
  setOrder((prev) => ({ ...prev, status: newStatus }));

  // Stepper aur date sync
  setSteps((prev) => {
    const currentDate = new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    let updatedSteps = [...prev];

    if (newStatus.includes("prepar")) {
      updatedSteps[1].date = currentDate; // Prepare Shipment date
      setActiveStep(1);
    }
    if (newStatus.includes("ship")) {
      updatedSteps[2].date = currentDate; // Shipped date
      setIsShipped(true);
      setActiveStep(2);
    }
    if (newStatus.includes("deliv")) {
      updatedSteps[3].date = currentDate; // Delivered date
      setIsDelivered(true);
      setActiveStep(3);
    }
    if (newStatus === "completed") {
      updatedSteps[4].date = currentDate; // Completed date
      setIsCompleted(true);
      setShowFinalCompletedUI(true);
      setActiveStep(4);
    }

    return updatedSteps;
  });
});

  return () => socketIo.disconnect();
}, [orderId]);

  useEffect(() => {

    if (!orderId) {
      setError("Order ID not found");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/orders/${orderId}/view`, {
          withCredentials: true,
        });

        if (!res.data.success) throw new Error(res.data.message);

        const orderData = res.data.data;
        setOrder(orderData);

        // Real createdAt date
        const createdDate = new Date(orderData.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });

        setSteps(prev => [{ ...prev[0], date: createdDate }, ...prev.slice(1)]);

        // Status sync
        const status = orderData.status?.toLowerCase() || "pending";
        if (status.includes("pending") || status === "paid") setActiveStep(0);
        else if (status.includes("prepar")) setActiveStep(1);
        else if (status.includes("ship")) { setActiveStep(2); setIsShipped(true); }
        else if (status.includes("deliv")) { setActiveStep(3); setIsDelivered(true); }
        else if (status === "completed") {
          setActiveStep(4);
          setIsCompleted(true);
          setShowFinalCompletedUI(true);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
    // const interval = setInterval(fetchOrder, 1000); 
    // return () => clearInterval(interval);
  }, [orderId]);


// Seller "Mark as Shipped" ya "Delivered" update karega
const updateOrderStatus = async (newStatus, trackingData = null) => {
  if (!orderId) {
    toast.error("Order ID is missing");
    console.error("orderId is undefined");
    return;
  }

  try {
    // Agar status "shipped" hai to tracking data bhejna zaroori hai
    const payload = { status: newStatus };

    if (newStatus === "shipped") {
      if (!trackingData || !trackingData.trackingId || !trackingData.courierName) {
        toast.error("Tracking ID and Courier Name are required for Shipped status");
        return;
      }
      payload.tracking = {
        trackingId: trackingData.trackingId,
        courierName: trackingData.courierName,
      };
    }

    console.log("Sending PATCH request:", {
      url: `${BASE_URL}/orders/${orderId}/status`,
      payload,
    });

    const res = await axios.patch(
      `${BASE_URL}/orders/${orderId}/status`,
      payload,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("API Response:", res.data);

    if (res.data.success) {
      toast.success(`Order status updated to ${newStatus}`);

      // Local state update
      setOrder((prev) => ({
        ...prev,
        status: newStatus,
        ...(newStatus === "shipped" && { tracking: payload.tracking }),
      }));

      // Real-time socket broadcast
      if (socket) {
        socket.emit("statusUpdate", { orderId, newStatus });
      }

      // Stepper + UI sync + date update
      const currentDate = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      setSteps((prev) => {
        let updated = [...prev];

        if (newStatus === "processing") {
          updated[1].date = currentDate; // Prepare Shipment
          setIsShipped(true);
          setActiveStep(1);
        } else if (newStatus === "shipped") {
          updated[2].date = currentDate; // Shipped
          setIsShipped(true);
          setActiveStep(2);
        } else if (newStatus === "delivered") {
          updated[3].date = currentDate; // Delivered
          setIsDelivered(true);
          setActiveStep(3);
        }

        return updated;
      });
    } else {
      toast.error(res.data.message || "API returned failure");
    }
  } catch (err) {
    console.error("Status update error:", err);
    toast.error(
      err.response?.data?.message ||
      err.message ||
      "Failed to update status. Check console."
    );
  }
};


    const handleTracking = () => {
        setIsTracking(true);
        setActiveStep(1)
    }

    const   handleSubmitDetails = () => {
        setIsShippingFormOpen(false);
        setIsShipped(true);
        setActiveStep(2);
    };

    const handleMarkAsShipped = () => {
        setIsShipped(false);
        setIsDelivered(true);
        setActiveStep(3);
    };

    const handleSendRemainder = () => {
        setIsRemainderSent(true);
    };

    const handleMarkAsCompleted = () => {
        setIsDelivered(false);
        setIsCompleted(true);
        setShowFinalCompletedUI(true);
        setActiveStep(4);
    };
    const handlePrepareShipment = async () => {
      await updateOrderStatus("processing");
      setIsShippingFormOpen(true);
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
                    Order# {order?._id || orderId || "N/A"}
                    </h1>
                    <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        showFinalCompletedUI || order?.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order?.status === "delivered"
                        ? "bg-green-100 text-green-700"
                        : order?.status === "shipped"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                    >
                    {order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1) || "Pending"}
                    </span>
                </div>
                <p className="text-gray-500 text-sm font-medium">
                    Placed by {order?.userProfile?.fullName || "Unknown Buyer"}, {steps[0].date}
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
                      const isPast = index < activeStep;
                      const isActive = index === activeStep;
                      const isFuture = index > activeStep;

                      // Extra check for Prepare Shipment (step 1)
                      const isPreparingActive = isActive && index === 1 && isPreparing;

                      return (
                        <div key={index} className="relative z-10 flex flex-col items-center group w-24 sm:w-32">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 transition-all duration-300 transform
                              ${isPast ? "bg-[#1DAF61] border-4 border-[#1DAF61]/30" : ""}
                              ${isActive || isPreparingActive ? "bg-[#5C24D2] border-4 border-[#5C24D2]/30 shadow-xl scale-110 ring-4 ring-[#5C24D2]/20" : ""}
                              ${isFuture ? "bg-white border-4 border-gray-200" : ""}
                            `}
                          >
                            {isPast ? (
                              <FiCheck className="w-6 h-6 text-white" strokeWidth={3} />
                            ) : (
                              <step.icon className={`w-6 h-6 ${isActive || isPreparingActive ? "text-white" : "text-gray-400"}`} />
                            )}
                          </div>

                          <span
                            className={`text-sm font-semibold text-center
                              ${isActive || isPreparingActive ? "text-[#5C24D2] font-bold" : isPast ? "text-[#1DAF61]" : "text-gray-500"}
                            `}
                          >
                            {step.label}
                          </span>

                          <span className="text-xs text-gray-400 mt-1">{step.date}</span>
                        </div>
                      );
                    })}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Funds Alert */}
                        {(isDelivered || isCompleted || showFinalCompletedUI) && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-8">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-6 h-6 rounded-full bg-[#139D4C] flex items-center justify-center shrink-0">
                                        <FiCheck className="w-4 h-4 text-white stroke-3" />
                                    </div>
                                    <h2 className="font-bold text-[#139D4C] text-[17px]">Funds Successfully Released</h2>
                                </div>
                                <p className="text-[#8c9ca8] font-medium leading-[1.6] text-[15px]">
                                    The payout of <span className="font-bold text-gray-900">$57,500</span> has been added to your wallet and is now available for withdrawal.
                                </p>
                            </div>
                        )}

                        {/* Main Cards: Conditional based on showFinalCompletedUI */}
                        {showFinalCompletedUI ? (
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
                                                    date: "OCT 28, 2025,", time: "10:30 AM",
                                                    title: "Fund Released",
                                                    desc: "Your Payout For This Transaction Was Processed And Released To Your Account On November 3, 2025",
                                                    active: true
                                                },
                                                {
                                                    date: "OCT 27, 2025,", time: "10:30 AM",
                                                    title: "Delivered",
                                                    desc: "Parcel Successfully Delivered To Buyer"
                                                },
                                                {
                                                    date: "OCT 26, 2025,", time: "06:15 AM",
                                                    title: "Shipped",
                                                    desc: "Shipped The Item To Buyer Location Courier Service FedEx"
                                                },
                                                {
                                                    date: "OCT 25, 2025,", time: "06:15 AM",
                                                    title: "Prepare Shipment",
                                                    desc: "Your Are Preparing The Parcel For Shipping"
                                                },
                                                {
                                                    date: "OCT 24, 2025,", time: "12:15 AM",
                                                    title: "Order placed",
                                                    desc: "Order Placed By Buyer: Alex Morgan",
                                                }
                                            ].map((item, idx) => (
                                                <div key={idx} className="relative">
                                                    <div className={`absolute -left-[33px] mt-1.5 w-4 h-4 rounded-full ring-4 ring-white z-10 ${item.active ? 'bg-[#5C24D2]' : 'bg-[#1E0B4B]'}`}></div>
                                                    <div className="flex items-center gap-2 text-[11px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-2">
                                                        <span>{item.date}</span>
                                                        <div className="w-1 h-1 bg-[#8c9ca8] rounded-full"></div>
                                                        <span>{item.time}</span>
                                                    </div>
                                                    <h3 className="font-bold text-gray-900 text-[16px] mb-1">{item.title}</h3>
                                                    <p className="text-[#8c9ca8] font-medium text-[14px] leading-relaxed max-w-2xl">{item.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* Dynamic Action Card (Escrow / Shipping) */}
                               {/* Dynamic Action Card (Escrow / Shipping) */}
                           {/* Dynamic Action Card (Escrow / Shipping) */}
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
            Your payment of <span className="font-bold text-gray-900">${order?.totalAmount?.toFixed(2) || "0.00"}</span> is securely held in escrow. Funds will be released after buyer confirms delivery.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Prepare / Mark as Shipped Button */}
          <button
            // onClick={() => {
            //   handlePrepareShipment
             
                // Already shipped → edit mode
                // setIsShippingFormOpen(true);
                // setIsPreparing(true);
                // setIsShippingFormOpen(false);
              
                // Not shipped → open form + move to Step 2
                // if (!isShipped) {
                      // setActiveStep(1);           // ← Move to "Prepare Shipment" step
                    // }
              
            // }}
            onClick={handlePrepareShipment}
            className={`flex-1 py-3.5 px-6 rounded-xl font-bold text-[15px] transition-colors shadow-sm flex items-center justify-center gap-2 ${
              isShipped 
                ? "bg-[#1E0B4B] text-white hover:bg-[#140733]" 
                : "bg-[#1DAF61] text-white hover:bg-[#189b53]"
            }`}
          >
            <TbTruckDelivery className="w-5 h-5" />
            {isShipped ? "Edit Shipment Details" : "Prepare Shipment & Get Tracking"}
          </button>

          {/* Mark as Delivered (only visible after shipped) */}
          {isShipped && (
            <button
              onClick={() => updateOrderStatus("delivered")}
              className="flex-1 bg-[#1DAF61] text-white py-3.5 px-6 rounded-xl font-bold text-[15px] hover:bg-[#189b53] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <BsBoxSeam className="w-5 h-5" />
              Mark as Delivered
            </button>
          )}
        </div>
      </div>
    ) : (
      /* Shipping Form – tracking details daalne wala */
      <div>
        <div className="px-6 py-5 border-b border-gray-100">
          <h2 className="font-bold text-gray-900 text-[17px]">Submit Shipment Details</h2>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-900">
                Courier Partner <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select value={courierName} onChange={(e) => setCourierName(e.target.value)} className="w-full appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded-lg outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-[15px]">
                  <option value="">Select Courier</option>
                  <option>DHL</option>
                  <option>FedEx</option>
                  <option>UPS</option>
                  <option>USPS</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-sm font-bold text-gray-900">
                Tracking Number <span className="text-red-500">*</span>
              </label>
              <input
               type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                placeholder="Enter tracking I.D."
                className="w-full bg-white border border-gray-200 text-gray-900 py-3 px-4 rounded-lg outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-[15px] placeholder-gray-400"
              />
            </div>
          </div>

          {/* <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-900">Notes for Buyer (Optional)</label>
            <textarea
              rows="3"
              placeholder="eg. Shipping container details..."
              className="w-full bg-white border border-gray-200 text-gray-900 py-3 px-4 rounded-lg outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 text-[15px] resize-none placeholder-gray-400"
            ></textarea>
          </div> */}
        </div>

        <div className="px-6 py-5 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-xl">
          <button
            onClick={() => setIsShippingFormOpen(false)}
            className="px-6 py-2.5 rounded-lg font-semibold text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors text-[15px]"
          >
            Cancel
          </button>

          <button
           onClick={() => {
              if (!courierName || !trackingId.trim()) {
                toast.error("Courier Name and Tracking ID are required");
                return;
              }

              updateOrderStatus("shipped", {
                trackingId: trackingId.trim(),
                courierName,
              });

              setIsShippingFormOpen(false);
              setActiveStep(2);               // ← Move to "Shipped" step
              toast.success("Shipment details submitted & order marked as Shipped!");
            }}
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
                              {/* Order Summary Card */}
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <h2 className="px-6 py-4 font-bold text-gray-900 border-b border-gray-100 text-[17px]">
                                    Order Summary
                                </h2>

                                <div className="p-6 space-y-4">
                                    {/* Products */}
                                    {order?.items?.length > 0 ? (
                                    order.items.map((item, idx) => {
                                        const product =
                                        order?.products?.find(p => p._id === item.productId) || {};

                                        const itemTotal =
                                        (item?.quantity || 0) * (item?.priceAtPurchase || 0);

                                        return (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between border border-gray-100 p-4 rounded-xl shadow-sm"
                                        >
                                            <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-lg overflow-hidden shrink-0">
                                                <img
                                                src={product?.image || "/assets/images/earbuds.png"}
                                                alt={product?.title || "Product"}
                                                className="w-full h-full object-cover"
                                                onError={(e) =>
                                                    (e.currentTarget.src =
                                                    "https://placehold.co/100x100?text=Item")
                                                }
                                                />
                                            </div>

                                            <div>
                                                <h3 className="font-semibold text-gray-900 text-[15px]">
                                                {product?.title || "Unknown Product"}
                                                </h3>
                                                <p className="text-gray-500 text-sm mt-1">
                                                Quantity: {item?.quantity || 0} • Unit Price: $
                                                {(item?.priceAtPurchase || 0).toFixed(2)}
                                                </p>
                                            </div>
                                            </div>

                                            <div className="font-bold text-gray-900 text-lg">
                                            ${itemTotal.toFixed(2)}
                                            </div>
                                        </div>
                                        );
                                    })
                                    ) : (
                                    <p className="text-gray-500 text-center py-6">
                                        No items found
                                    </p>
                                    )}

                                    {/* Totals */}
                                    <div className="space-y-4 text-[15px] pt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#8c9ca8] font-medium">Item Total</span>
                                        <span className="text-gray-600 font-medium">
                                        ${(order?.totalAmount || 0).toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-[#8c9ca8] font-medium">Shipping</span>
                                        <span className="text-gray-600 font-medium">
                                        ${(order?.shippingFee || 0).toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <span className="text-[#1DAF61] font-medium">
                                        Escrow Fee Deduction
                                        </span>
                                        <span className="text-[#1DAF61] font-medium">
                                        -${(order?.escrowFee || 0).toFixed(2)}
                                        </span>
                                    </div>
                                    </div>

                                    {/* Grand Total */}
                                    <div className="border-t border-gray-100 pt-5 mt-5">
                                    <div className="flex justify-between items-center text-[15px] mb-3">
                                        <span className="text-[#8c9ca8] font-bold">
                                        Grand Total
                                        </span>
                                        <span className="text-gray-900 font-bold">
                                        ${(order?.totalAmount || 0).toFixed(2)}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center text-xl">
                                        <span className="font-bold text-gray-900">
                                        Est. Net Payout
                                        </span>
                                        <span className="font-bold text-gray-900">
                                        ${(order?.totalAmount || 0).toFixed(2)}
                                        </span>
                                    </div>
                                    </div>
                                </div>
                                </div>

                                {/* Shipped Button */}
                               {/* Courier Service */}
                            {(isDelivered || isCompleted) && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                                <h2 className="px-6 py-4 font-bold text-gray-900 text-[17px]">
                                Courier Service
                                </h2>

                                <div className="px-6 pb-6 mt-2">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 bg-[#1E0B4B] rounded-lg flex items-center justify-center shrink-0">
                                    <TbTruckDelivery className="w-6 h-6 text-white" />
                                    </div>

                                    <div>
                                    <p className="font-bold text-gray-900 text-[15px]">
                                        {order?.courierName || "Courier Assigned"}
                                    </p>
                                    <p className="font-semibold text-gray-500 text-[15px] mt-0.5">
                                        Tracking: {order?.trackingNumber || "Pending"}
                                    </p>
                                    </div>
                                </div>

                                <div className="bg-gray-50/70 p-3 rounded-lg flex items-center gap-2 text-sm font-medium text-gray-500">
                                    <BsBoxSeam className="w-4 h-4" />
                                    Delivered on{" "}
                                    {order?.deliveredAt
                                    ? new Date(order.deliveredAt).toLocaleDateString()
                                    : "—"}
                                </div>
                                </div>
                            </div>
                            )}
                            </div>
                        )}
                    </div>

                    {/* Right Column / Sidebar */}
                    <div className="space-y-6">
                        {/* Shipment Progress */}
                      {/* Shipment Progress */}
                    {["shipped", "delivered", "completed"].includes(order?.status) && (
                      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100">
                          <h2 className="font-bold text-gray-900 text-[17px]">
                            Shipment Progress
                          </h2>
                        </div>

                        <div className="p-6">
                          <div className="border border-gray-100 rounded-xl p-5 space-y-6">
                            {/* Shipped */}
                            <div className="flex items-center gap-4 relative">
                              <div className="w-4 h-4 rounded-full border-[3.5px] border-[#A855F7]" />
                              <span className="font-bold text-gray-900 text-[15px]">
                                Shipped
                              </span>
                            </div>

                            {/* Delivered */}
                            <div className="flex items-center gap-4 relative">
                              <div
                                className={`w-4 h-4 rounded-full border-[3.5px] ${
                                  ["delivered", "completed"].includes(order.status)
                                    ? "border-[#A855F7]"
                                    : "border-gray-200"
                                }`}
                              />
                              <span
                                className={`text-[15px] ${
                                  ["delivered", "completed"].includes(order.status)
                                    ? "font-bold text-gray-900"
                                    : "font-semibold text-gray-400"
                                }`}
                              >
                                Delivered
                              </span>
                            </div>

                            {/* Completed */}
                            <div className="flex items-center gap-4 relative">
                              <div
                                className={`w-4 h-4 rounded-full border-[3.5px] ${
                                  order.status === "completed"
                                    ? "border-[#A855F7]"
                                    : "border-gray-200"
                                }`}
                              />
                              <span
                                className={`text-[15px] ${
                                  order.status === "completed"
                                    ? "font-bold text-gray-900"
                                    : "font-semibold text-gray-400"
                                }`}
                              >
                                Completed
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                        {/* Summary Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
  {/* Header */}
  <div className="px-6 py-4 border-b border-gray-100">
    <h2 className="font-bold text-gray-900 text-[17px]">
      {showFinalCompletedUI ? "Summary" : "Buyer Information"}
    </h2>
  </div>

  {/* BODY */}
  {showFinalCompletedUI ? (
    <>
      {/* Summary Breakdown */}
      <div className="p-6 border-b border-gray-100">
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#8c9ca8] font-medium">
              Gross Sale Amount
            </span>
            <span className="font-bold text-gray-900">
              ${(order?.totalAmount || 0).toFixed(2)}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm text-red-500 font-medium">
            <span>Platform Fee</span>
            <span>—</span>
          </div>

          <div className="flex justify-between items-center text-sm text-red-500 font-medium">
            <span>Shipping</span>
            <span>—</span>
          </div>

          <div className="flex justify-between items-center text-sm text-[#1DAF61] font-medium">
            <span>Escrow Fee Deduction</span>
            <span>—</span>
          </div>
        </div>
      </div>

      {/* Net Payout */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <span className="font-bold text-gray-900 text-[17px]">
            Est. Net Payout
          </span>
          <span className="font-bold text-gray-900 text-[19px] tracking-tight">
            ${(order?.totalAmount || 0).toFixed(2)}
          </span>
        </div>

        <button className="w-full bg-[#1DAF61] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#189b53] transition-colors text-[15px]">
          <FiDownload className="w-5 h-5" /> Download Invoice
        </button>
      </div>
    </>
  ) : (
    /* Buyer Info */
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-start gap-4">
        <span className="text-[#8c9ca8] text-sm shrink-0">Name</span>
        <span className="text-gray-600 text-[15px] text-right">
          {order?.userProfile?.fullName || "—"}
        </span>
      </div>

     <div className="flex justify-between items-start gap-4">
  <span className="text-[#8c9ca8] text-sm shrink-0">Address</span>
  <div className="text-gray-600 text-[15px] text-right space-y-1">
    <div>{order?.shippingAddress?.name}</div>
    <div>{order?.shippingAddress?.lineAddress}</div>
    <div>{order?.shippingAddress?.province}, {order?.shippingAddress?.postalCode}</div>
    <div>{order?.shippingAddress?.phone}</div>
  </div>
</div>

      <div className="flex justify-between items-start gap-4">
        <span className="text-[#8c9ca8] text-sm shrink-0">Order ID</span>
        <span className="text-gray-600 text-[15px] text-right">
          {order?._id || "—"}
        </span>
      </div>
    </div>
  )}
</div>

                        {/* Order Details or Payout Status */}
                       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    {/* Header */}
    <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-bold text-gray-900 text-[17px]">
            {showFinalCompletedUI ? "Order Details" : "Payout Status"}
        </h2>
    </div>

    {/* Body */}
    <div className="p-6 transition-all duration-300">
        {showFinalCompletedUI ? (
            <>
                {/* Buyer Detail */}
                <p className="text-[12px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-4">
                    Buyer Detail
                </p>

                <div className="flex items-center gap-3 mb-8">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 border border-gray-100">
                        <img
                            src="https://i.pravatar.cc/150?u=alex"
                            alt="Alex Morgan"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 text-[15px]">
                            Alex Morgan
                        </h3>
                        <p className="text-[#8c9ca8] text-[13px] font-medium">
                            alexmorgan@gmail.com
                        </p>

                        <div className="flex items-center gap-1.5 mt-1">
                            <MdVerified className="w-4 h-4 text-[#2962FF]" />
                            <span className="text-[#2962FF] text-[11px] font-bold">
                                Verified Profile
                            </span>
                        </div>
                    </div>
                </div>

                {/* Order Info */}
                <div className="space-y-6">
                    <div>
                        <p className="text-[12px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-1">
                            Completion Date
                        </p>
                        <p className="font-bold text-gray-900 text-[15px]">
                            October 17, 2023
                        </p>
                    </div>

                    <div>
                        <p className="text-[12px] font-bold text-[#8c9ca8] uppercase tracking-wider mb-1">
                            Transaction ID
                        </p>
                        <p className="font-bold text-gray-900 text-[15px]">
                            ESC-8849-XT-2023
                        </p>
                    </div>
                </div>
            </>
        ) : (
            <>
                {/* Payout Info */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-[#8c9ca8] text-[15px]">
                            Net Payout
                        </span>
                        <span className="text-gray-500 font-medium text-[15px]">
                            $57,500
                        </span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-[#8c9ca8] text-[15px]">
                            Escrow Status
                        </span>
                        <span
                            className={`px-2.5 py-1 rounded-sm text-[11px] font-bold tracking-wide ${
                                isDelivered || isCompleted
                                    ? "bg-[#EBFBF2] text-[#139D4C]"
                                    : "bg-[#EBF1FF] text-[#2962FF]"
                            }`}
                        >
                            {isDelivered || isCompleted
                                ? "Payment Released"
                                : "Payment on hold"}
                        </span>
                    </div>
                </div>

                {(isDelivered || isCompleted) && (
                    <div className="mt-8 text-center">
                        <p className="text-[#139D4C] font-bold text-[13.5px] mb-6">
                            Your payout was released on November 3, 2025.
                        </p>

                        {!isCompleted ? (
                            !isRemainderSent ? (
                                <button
                                    onClick={handleSendRemainder}
                                    className="w-full bg-[#F3F4F6] text-gray-700 font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 hover:bg-gray-200"
                                >
                                    <FiCalendar className="w-4 h-4" />
                                    Send Reminder
                                </button>
                            ) : (
                                <button
                                    onClick={handleMarkAsCompleted}
                                    className="w-full bg-[#1E0B4B] text-white font-semibold py-3.5 rounded-xl hover:bg-[#140733]"
                                >
                                    Mark As Completed
                                </button>
                            )
                        ) : (
                            <div className="w-full bg-[#1da15f] text-white py-4 rounded-xl flex items-center justify-center gap-3 font-semibold">
                                <FiCheck className="w-4 h-4" />
                                Marked As Completed
                            </div>
                        )}
                    </div>
                )}
            </>
        )}
    </div>
</div>
                    </div>
                </div>
            </div>
            <DashboardFooter />
        </div>
    );
};

export default BusinessOrderDetailsPage;


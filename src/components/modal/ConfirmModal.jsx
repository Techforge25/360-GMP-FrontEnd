// components/ui/ConfirmModal.jsx
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ImCross } from "react-icons/im";

const ConfirmModal = ({
  isOpen,
  onClose,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Yes, Proceed",
  cancelText = "Cancel",
  isLoading = false,
  danger = false,
  setReason,
  orderId,
  reason,
  setCancelling,
  setShowCancelModal
}) => {
  if (!isOpen) return null;
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const [otherReason, setOtherReason] = useState("")
  const router = useRouter()

  const confirmCancel = async () => {
    setCancelling(true);

    try {
      const payload =
        reason === "Other"
          ? {
            cancellation: {
              reason: "Other",
              other: otherReason,
            },
          }
          : {
            cancellation: {
              reason: reason,
            },
          };

      const res = await axios.patch(
        `${API_URL}/orders/${orderId}/cancel`,
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Order cancelled successfully!");
        setShowCancelModal(false);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="max-w-md mx-auto mt-10 p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
        <div className="flex justify-end mb-3 cursor-pointer" onClick={() => setShowCancelModal(false)}>
          <ImCross color="red" />
        </div>
        <div className="flex flex-col space-y-6">
          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Please Specify The Reason For Cancelling
          </h2>

          {/* Radio Options */}
          <div className="space-y-3">

            {[
              "Changed Mind",
              "Found a Better Option",
              "Wrong Item Ordered",
              "Delayed Preparing Time",
            ].map((reason, index) => (
              <label key={index} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="cancelReason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{reason}</span>
              </label>
            ))}

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="cancelReason"
                value="Other"
                onChange={(e) => setReason(e.target.value)}
                className="w-4 h-4"
              />
              <span className="text-gray-700">Other</span>
            </label>

            {/* Show Input If Other Selected */}
            {reason === "Other" && (
              <input
                type="text"
                placeholder="Please specify reason..."
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            )}

          </div>

          {/* Submit Button */}
          <button
            onClick={confirmCancel}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg transition"
          >
            Submit Reason
          </button>

        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
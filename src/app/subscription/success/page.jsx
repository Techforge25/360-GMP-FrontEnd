"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/navigation";
import subscriptionAPI from "@/services/subscriptionAPI";
import { BsCheckCircleFill } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { useUser, useUserRole } from "@/context/UserContext";
import { toast } from "react-toastify";

function SubscriptionSuccessContent() {
  const router = useRouter();
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("Verifying your subscription...");
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [checkSubscriptionUpdate, setCheckSubscriptionUpdate] = useState({
    planUpdate: false,
    planUpdateRoute: ""
  });
  const { user } = useUser();

  useEffect(() => {
    const getSubscriptionDetails = async () => {
      try {
        const response = await subscriptionAPI.getMySubscriptions()
        console.log(response.data, "response of subs")
        subscriptionAPI.storeSubscription(response.data);
        setStatus(response.data.status)
        setMessage("Subscription has been activated Successfully!")
        setSubscriptionData(response.data);
        const planUpdate = localStorage.getItem("planUpdate");
        const planUpdateRoute = localStorage.getItem("planUpdateRoute");
        setCheckSubscriptionUpdate({
          planUpdate: planUpdate,
          planUpdateRoute: planUpdateRoute
        })
      } catch (e) {
        toast.error(e)
      }
    }
    getSubscriptionDetails()
  }, [])

  const handleContinue = () => {
    const storedSub = subscriptionAPI.getStoredSubscription();
    console.log(subscriptionData, "subscription data")
    const role = storedSub?.role || user?.role || "user";
    const isNew = user?.isNewToPlatform ?? true;

    if (checkSubscriptionUpdate.planUpdate) {
      return router.push(checkSubscriptionUpdate.planUpdateRoute)
    }

    if (isNew) {
      role === "user"
        ? router.push("/onboarding/user-profile")
        : router.push("/onboarding/business-profile");
    } else {
      role === "user"
        ? router.push("/dashboard/user")
        : router.push("/dashboard/business");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        {/* Status Icon */}
        <div className="flex justify-center mb-6">
          {status === "pending" && (
            <div className="animate-spin h-16 w-16 border-4 border-brand-primary border-t-transparent rounded-full"></div>
          )}
          {status === "active" && (
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
              <BsCheckCircleFill className="w-10 h-10 text-green-500" />
            </div>
          )}
          {status === "error" && (
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <FiX className="w-10 h-10 text-red-500" />
            </div>
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl text-black font-bold text-center mb-2">
          {status === "pending" && "Verifying Payment"}
          {status === "active" && "Subscription Activated!"}
          {status === "error" && "Verification Failed"}
        </h1>

        {/* Message */}
        <p className="text-center text-gray-600 mb-6">{message}</p>

        {/* Subscription Details */}
        {status === "active" && subscriptionData && (
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-base mb-3 text-indigo-900">
              Subscription Details
            </h3>
            <div className="space-y-2 text-base">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium text-gray-900">
                  {subscriptionData.plan || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium text-green-600 capitalize">
                  {subscriptionData.status || "Active"}
                </span>
              </div>
              {subscriptionData.startDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(subscriptionData.startDate).toLocaleDateString()}
                  </span>
                </div>
              )}
              {subscriptionData.endDate && (
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium text-gray-900">
                    {new Date(subscriptionData.endDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {status === "active" && (
          <Button
            onClick={handleContinue}
            className="w-full bg-[#240457] hover:bg-indigo-800 text-white"
          >
            Continue
          </Button>
        )}

        {status === "error" && (
          <div className="space-y-3">
            <Button
              onClick={() => router.push("/onboarding/plans")}
              className="w-full bg-[#240457] hover:bg-indigo-800 text-white"
            >
              Back to Plans
            </Button>
            <Button
              onClick={() => router.push("/dashboard/user")}
              variant="outline"
              className="w-full"
            >
              Go to Dashboard
            </Button>
          </div>
        )}

        {status === "pending" && (
          <p className="text-sm text-center text-gray-500">
            Please wait while we confirm your payment...
          </p>
        )}
      </div>
    </div>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-2 border-brand-primary border-t-transparent rounded-full"></div>
        </div>
      }
    >
      <SubscriptionSuccessContent />
    </Suspense>
  );
}

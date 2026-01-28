"use client";
import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardContent } from "@/components/ui/Card";
import { FiCheck, FiX } from "react-icons/fi";
import { FaCrown, FaPaypal, FaStripe, FaBitcoin } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { BsCheckCircleFill } from "react-icons/bs";
import { useUserRole } from "@/context/UserContext";
import api from "@/lib/axios";
import subscriptionAPI from "@/services/subscriptionAPI";

const CheckItem = ({ children }) => (
  <div className="flex items-start gap-3">
    <FiCheck className="h-5 w-5 text-accent-success shrink-0 mt-0.5" />
    <span className="text-base text-text-secondary">{children}</span>
  </div>
);

const PlanCard = ({
  title,
  price,
  period = "/month",
  description,
  features = [],
  buttonText,
  variant = "default",
  badge,
  disabled = false,
  disabledMessage,
  onSelect,
}) => {
  const variants = {
    default: {
      badge: "bg-green-100 text-green-700",
      border: "border-[#D1D7E3]",
    },
    orange: {
      badge: "bg-orange-100 text-orange-800",
      border: "border-[#CC6A21]",
    },
    purple: {
      badge: "bg-purple-100 text-purple-800",
      border: "border-purple-200 ring-1 ring-purple-100",
    },
  };
  const currentVariant = variants[variant];
  return (
    <Card
      className={cn(
        "w-full max-w-[400px] flex flex-col transition-all duration-300 bg-white",
        variant === "purple"
          ? "scale-105 shadow-xl z-10"
          : "shadow-md hover:shadow-lg",
        disabled && "opacity-60 grayscale-[0.5]",
        currentVariant.border,
      )}
    >
      <CardContent className="flex-1 p-8">
        {/* Badge */}
        {badge && (
          <div className="flex justify-center mb-6">
            <span
              className={cn(
                "px-4 py-1.5 rounded-full text-base font-medium flex items-center gap-1",
                currentVariant.badge,
              )}
            >
              {variant === "purple" && <FaCrown className="w-3 h-3" />}
              {badge}
            </span>
          </div>
        )}
        {/* Price */}
        <div className="text-center mb-2">
          <span className="text-6xl font-semibold text-gray-900">${price}</span>
          <span className="text-gray-500 text-md ml-1">{period}</span>
        </div>

        {/* Description */}
        <p className="text-center text-gray-600 mb-8 px-4">{description}</p>

        {/* CTA Button */}
        <Button
          onClick={onSelect}
          disabled={disabled}
          className={cn(
            "w-full mb-8 font-medium py-3 px-4 rounded-lg transition-colors cursor-pointer",
            variant === "purple"
              ? "bg-indigo-900 text-white hover:bg-indigo-800"
              : variant === "orange"
                ? "bg-white text-orange-900 border border-orange-200 hover:bg-orange-50"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50",
          )}
        >
          {disabled && disabledMessage ? disabledMessage : buttonText}
        </Button>

        {disabled && disabledMessage && (
          <div className="mb-6 flex items-center gap-2 text-sm text-red-500 justify-center font-medium">
            <FiX /> {disabledMessage}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-gray-200 mb-8"></div>

        {/* Features List */}
        <div className="space-y-4">
          {features.length === 0 ? (
            <p className="text-base text-gray-400 italic text-center">
              No features listed
            </p>
          ) : (
            features.map((feature, i) => (
              <div key={i} className="flex items-start gap-3">
                <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const PaymentModal = ({ isOpen, onClose, onConfirm, planName }) => {
  if (!isOpen) return null;
  const [method, setMethod] = useState("stripe");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-lg bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <CardContent className="p-8 text-center pt-10">
          <h2 className="text-xl font-medium mb-1">
            Get Ready To{" "}
            <span className="text-brand-primary">Unlock {planName}</span>
          </h2>
          <p className="text-base text-text-secondary mb-8">
            Select Payment Method
          </p>

          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={() => setMethod("stripe")}
              className={cn(
                "flex-1 h-14 border rounded-md flex items-center justify-center gap-2 transition-all",
                method === "stripe"
                  ? "border-brand-primary ring-1 ring-brand-primary bg-brand-primary/5"
                  : "border-border-light hover:bg-gray-50",
              )}
            >
              <span className="font-bold text-indigo-600 flex items-center gap-1">
                <div className="w-4 h-4 rounded-full border-4 border-indigo-600 mr-1"></div>{" "}
                stripe
              </span>
            </button>
            <button
              onClick={() => setMethod("paypal")}
              className={cn(
                "flex-1 h-14 border rounded-md flex items-center justify-center gap-2 transition-all",
                method === "paypal"
                  ? "border-brand-primary ring-1 ring-brand-primary bg-brand-primary/5"
                  : "border-border-light hover:bg-gray-50",
              )}
            >
              <FaPaypal className="text-blue-700" />{" "}
              <span className="font-bold text-blue-700">PayPal</span>
            </button>
            <button
              onClick={() => setMethod("bitpay")}
              className={cn(
                "flex-1 h-14 border rounded-md flex items-center justify-center gap-2 transition-all",
                method === "bitpay"
                  ? "border-brand-primary ring-1 ring-brand-primary bg-brand-primary/5"
                  : "border-border-light hover:bg-gray-50",
              )}
            >
              <span className="font-bold text-slate-700">bitpay</span>
            </button>
          </div>

          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 h-11 border-border-light"
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 h-11 bg-indigo-900 hover:bg-indigo-800 text-white"
            >
              Confirm
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ConfirmationModal = ({
  isOpen,
  featureName,
  isError,
  message,
  onNext,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <Card className="w-full max-w-md bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <CardContent className="p-8 text-center pt-10">
          <div
            className={cn(
              "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4",
              isError ? "bg-red-50" : "bg-green-50",
            )}
          >
            {isError ? (
              <FiX className="w-8 h-8 text-red-500" />
            ) : (
              <BsCheckCircleFill className="w-8 h-8 text-green-400" />
            )}
          </div>

          <h2 className="text-xl font-bold mb-2">Subscription Confirmed!</h2>
          <p className="text-base text-text-secondary mb-6">{message}</p>

          <div className="border border-indigo-100 rounded-lg p-4 bg-indigo-50/30 mb-6">
            <div className="text-base font-medium mb-4 pb-2 border-b border-indigo-100">
              Featured Activated
            </div>

            {isError ? (
              <div className="flex items-center justify-center gap-3 text-base text-text-secondary py-4">
                <FiX className="text-red-500 font-bold" />
                <span className="max-w-[200px] leading-tight">
                  Business account cannot be created during trial.
                </span>
              </div>
            ) : (
              <div className="space-y-3 text-left pl-4">
                <div className="flex items-center gap-2 text-base text-text-secondary">
                  <FiCheck className="text-green-500" /> Create up to 10
                  communities
                </div>
                <div className="flex items-center gap-2 text-base text-text-secondary">
                  <FiCheck className="text-green-500" /> Unlimited job postings
                </div>
                <div className="flex items-center gap-2 text-base text-text-secondary">
                  <FiCheck className="text-green-500" /> List up to 20 products
                </div>
                <div className="flex items-center gap-2 text-base text-text-secondary">
                  <FiCheck className="text-green-500" /> Analytics access
                </div>
              </div>
            )}
          </div>

          <Button
            onClick={onNext}
            className="w-full h-11 bg-indigo-900 hover:bg-indigo-800 text-white mb-2"
          >
            Next
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

function PlansList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const { onboardingRole } = useUserRole();

  // Prefer context role, fallback to query param, default to "user"
  const role = onboardingRole || searchParams.get("role") || "user";
  const isBusiness = role === "business";

  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  const [paymentPlan, setPaymentPlan] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get({ url: "/plan" });
        setSubscription(response);
      } catch (err) {
        console.error("Failed to fetch plans", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = async (plan) => {
    if (isBusiness && !plan.allowsBusinessAccess) {
      setConfirmationData({
        featureName: plan.name,
        isError: true,
        message: "This plan is not available for business accounts.",
      });
      return;
    }

    // For paid plans, show payment modal first
    if (plan.price > 0) {
      setPaymentPlan({ id: plan.backendId, name: plan.name });
    } else {
      // For free trial, directly create Stripe session and redirect
      try {
        console.log("Creating Free Trial Stripe checkout session...");
        console.log("Plan ID:", plan.backendId);
        console.log("Role:", role);

        const successUrl = `${window.location.origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${window.location.origin}/onboarding/plans`;

        const response = await subscriptionAPI.createStripeCheckout(
          plan.backendId,
          role,
          successUrl,
          cancelUrl,
        );

        console.log("Free Trial Stripe response:", response);

        // Robust check for checkout URL - only accept strings starting with http
        const isUrl = (str) =>
          typeof str === "string" &&
          (str.startsWith("http://") || str.startsWith("https://"));
        const checkoutUrl = isUrl(response.data)
          ? response.data
          : isUrl(response.data?.url)
            ? response.data.url
            : null;

        // Detect if this is a trial activation
        const isTrialPlan = plan.name?.toLowerCase().includes("trial");
        const isTrialSuccess =
          response.success &&
          (isTrialPlan ||
            response.message?.toLowerCase().includes("trial") ||
            (typeof response.data === "string" &&
              response.data.toLowerCase().includes("trial")) ||
            !checkoutUrl);

        if (isTrialSuccess) {
          console.log(
            "Trial started successfully, redirecting to success page",
          );

          // Store as 'pending' so the success page can 'activate' it locally
          const subscriptionData = {
            planId: plan.backendId,
            planName: plan.name,
            role: role,
            status: "pending",
            createdAt: new Date().toISOString(),
          };

          subscriptionAPI.storeSubscription(subscriptionData);

          // Redirect to success page on frontend
          router.push(`/subscription/success?session_id=trial`);
        } else if (response.success && checkoutUrl) {
          // Paid plan with valid Stripe URL
          const subscriptionData = {
            planId: plan.backendId,
            planName: plan.name,
            role: role,
            status: "pending",
            createdAt: new Date().toISOString(),
          };
          subscriptionAPI.storeSubscription(subscriptionData);

          console.log("Redirecting to Stripe checkout:", checkoutUrl);
          window.location.href = checkoutUrl;
        } else {
          console.error("Failed to handle plan selection:", response);
          setConfirmationData({
            featureName: plan.name,
            isError: true,
            message:
              response.message || "Failed to process plan. Please try again.",
          });
        }
      } catch (error) {
        console.error("Failed to create Free Trial - Full error:", error);
        console.error("Error details:", {
          message: error.message,
          statusCode: error.statusCode,
          data: error.data,
          stack: error.stack,
        });

        let errorMessage = "Failed to start trial. Please try again.";

        if (error.statusCode === 404) {
          errorMessage =
            "Subscription endpoint not found. Please check the API configuration.";
        } else if (error.statusCode === 401 || error.statusCode === 403) {
          errorMessage = "Authentication required. Please log in first.";
        } else if (error.statusCode >= 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (error.message) {
          errorMessage = error.message;
        } else if (!navigator.onLine) {
          errorMessage = "No internet connection. Please check your network.";
        }

        setConfirmationData({
          featureName: plan.name,
          isError: true,
          message: errorMessage,
        });
      }
    }
  };

  const handlePaymentConfirm = async () => {
    const plan = paymentPlan;
    setPaymentPlan(null);

    try {
      console.log("Creating Stripe checkout session...");
      console.log("Plan object:", plan);
      console.log("Plan ID:", plan.id);
      console.log("Plan backendId:", plan.backendId);
      console.log("Role:", role);

      const successUrl = `${window.location.origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/onboarding/plans`;

      // Call backend to create Stripe checkout session
      const response = await subscriptionAPI.createStripeCheckout(
        plan.id,
        role,
        successUrl,
        cancelUrl,
      );

      console.log("Stripe checkout response:", response);
      console.log("Response data:", response.data);
      console.log("Response success:", response.success);
      console.log("Full response object:", JSON.stringify(response, null, 2));

      // Check if data contains url property or IS the url string
      const checkoutUrl =
        typeof response.data === "string" ? response.data : response.data?.url;

      if (response.success && checkoutUrl) {
        // Store plan info before redirecting
        const subscriptionData = {
          planId: plan.id,
          planName: plan.name,
          role: role,
          status: "pending",
          createdAt: new Date().toISOString(),
        };

        console.log("Storing paid subscription with role:", role);
        console.log("Full subscription data:", subscriptionData);

        subscriptionAPI.storeSubscription(subscriptionData);

        // Redirect to Stripe checkout
        console.log("Redirecting to Stripe checkout:", checkoutUrl);
        window.location.href = checkoutUrl;
      } else {
        console.error("Invalid response from Stripe checkout API:", response);
        setConfirmationData({
          featureName: plan.name,
          isError: true,
          message: "Failed to create checkout session. Please try again.",
        });
      }
    } catch (error) {
      console.error("Failed to create Stripe checkout - Full error:", error);
      console.error("Error details:", {
        message: error.message,
        statusCode: error.statusCode,
        data: error.data,
        stack: error.stack,
      });

      let errorMessage = "Failed to process payment. Please try again.";

      if (error.statusCode === 404) {
        errorMessage =
          "Subscription endpoint not found. Please check the API configuration.";
      } else if (error.statusCode === 401 || error.statusCode === 403) {
        errorMessage = "Authentication required. Please log in first.";
      } else if (error.statusCode >= 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (error.message) {
        errorMessage = error.message;
      } else if (!navigator.onLine) {
        errorMessage = "No internet connection. Please check your network.";
      }

      setConfirmationData({
        featureName: plan.name,
        isError: true,
        message: errorMessage,
      });
    }
  };

  const handleNext = () => {
    if (confirmationData?.isError) {
      setConfirmationData(null);
      return;
    }

    if (isBusiness) {
      // router.push(`/onboarding/business-profile`);
      // Temporarily skip business profile creation due to subscription requirement
      router.push(`/dashboard/business`);
    } else {
      if (confirmationData?.isTrial) {
        router.push(`/dashboard/user`);
      } else {
        router.push(`/onboarding/user-profile`);
      }
    }
  };

  // if (isBusiness) {
  //     router.push("/onboarding/business-profile");
  //   } else {
  //     router.push("/onboarding/user-profile");
  //   }
  // };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading plans...
      </div>
    );
  }

  if (!subscription || !subscription.data || subscription.data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load plans or no plans available.
      </div>
    );
  }

  const subscribePlansColor = {
    trial: {
      id: "trial",
      variant: "default",
      color: "gray",
      buttonText: isBusiness
        ? "Not Valid For Business"
        : "Start Your 14 Day Trial",
    },
    silver: {
      id: "silver",
      variant: "orange",
      color: "orange",
      buttonText: isBusiness ? "Upgrade to Silver" : "Buy Membership",
    },
    premium: {
      id: "premium",
      variant: "purple",
      color: "purple",
      buttonText: isBusiness ? "Upgrade to Premium" : "Buy Membership",
    },
  };

  const subscriptionPlans = subscription.data.map((plan) => {
    const planKey = plan.name ? plan.name.toLowerCase() : "trial";
    const uiConfig = subscribePlansColor[planKey] || subscribePlansColor.trial;

    return {
      id: planKey,
      backendId: plan._id,
      name: plan.name,
      price: plan.price,
      description: plan.description,
      allowsBusinessAccess: plan.allowsBusinessAccess,
      variant: uiConfig.variant,
      color: uiConfig.color,
      buttonText: uiConfig.buttonText,
      features: plan.features || [],
    };
  });

  console.log(subscriptionPlans);
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl text-text-primary font-semibold mb-3">
          Choose Your Plan
        </h1>
        <p className="text-text-secondary">
          Select the perfect plan for your {isBusiness ? "business" : "career"}{" "}
          needs. Upgrade anytime to unlock more features.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-stretch">
        {subscriptionPlans.map((plan) => (
          <PlanCard
            key={plan.backendId}
            title={plan.name}
            price={plan.price}
            badge={plan.name}
            description={plan.description}
            buttonText={plan.buttonText}
            variant={plan.variant}
            features={plan.features}
            onSelect={() => handleSelectPlan(plan)}
          />
        ))}
      </div>

      <div className="text-center mt-12 text-base text-text-secondary flex items-center justify-center gap-2">
        <IoMdInformationCircleOutline size={18} className="inline" />
        <p>All plans include a 14-day money-back guarantee.</p>
      </div>

      {/* Modals */}
      <PaymentModal
        isOpen={!!paymentPlan}
        planName={paymentPlan?.name}
        onClose={() => setPaymentPlan(null)}
        onConfirm={handlePaymentConfirm}
      />

      <ConfirmationModal
        isOpen={!!confirmationData}
        {...confirmationData}
        onNext={handleNext}
      />
    </div>
  );
}

export default function PlansPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlansList />
    </Suspense>
  );
}

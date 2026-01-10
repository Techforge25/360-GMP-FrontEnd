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

const CheckItem = ({ children }) => (
  <div className="flex items-start gap-3">
    <FiCheck className="h-5 w-5 text-accent-success shrink-0 mt-0.5" />
    <span className="text-sm text-text-secondary">{children}</span>
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
      header: "bg-surface-muted",
      button: "bg-surface-muted text-text-primary hover:bg-surface-muted/80",
      badge: "bg-surface-muted text-text-secondary",
    },
    orange: {
      header: "text-orange-900",
      button:
        "bg-white text-orange-900 border border-orange-200 hover:bg-orange-50",
      badge: "bg-orange-100 text-orange-800",
      border: "border-orange-200",
    },
    purple: {
      header: "text-purple-900",
      button: "bg-indigo-900 text-white hover:bg-indigo-800",
      badge: "bg-purple-100 text-purple-800",
      border: "border-purple-200 ring-1 ring-purple-100",
    },
  };

  const currentVariant = variants[variant];

  return (
    <Card
      className={cn(
        "w-full max-w-[350px] flex flex-col transition-all duration-300",
        variant === "purple"
          ? "scale-105 shadow-xl z-10"
          : "shadow-md hover:shadow-lg",
        disabled && "opacity-60 grayscale-[0.5]",
        currentVariant.border
      )}
    >
      <CardHeader className="text-center pb-2 pt-8 relative items-center">
        {badge && (
          <span
            className={cn(
              "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1",
              currentVariant.badge
            )}
          >
            {variant === "purple" && <FaCrown className="w-3 h-3" />}
            {badge}
          </span>
        )}
        <h3 className="text-5xl font-semibold mb-1 flex items-baseline justify-center gap-1">
          ${price}
          <span className="text-base font-normal text-text-secondary">
            {period}
          </span>
        </h3>
        <p className="text-sm max-w-[200px] text-text-secondary px-4">
          {description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 py-8">
        <Button
          onClick={onSelect}
          // Disabled prop removed here to allow clicking for error popup
          className={cn("w-full mb-8 font-semibold", currentVariant.button)}
          variant={variant === "default" ? "secondary" : "default"}
        >
          {disabled && disabledMessage ? disabledMessage : buttonText}
        </Button>

        {disabled && disabledMessage && (
          <div className="mb-6 flex items-center gap-2 text-xs text-red-500 justify-center font-medium">
            <FiX /> {disabledMessage}
          </div>
        )}

        <div className="space-y-4">
          {features.map((feature, i) => (
            <CheckItem key={i}>{feature}</CheckItem>
          ))}
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
          <p className="text-sm text-text-secondary mb-8">
            Select Payment Method
          </p>

          <div className="flex gap-4 justify-center mb-8">
            <button
              onClick={() => setMethod("stripe")}
              className={cn(
                "flex-1 h-14 border rounded-md flex items-center justify-center gap-2 transition-all",
                method === "stripe"
                  ? "border-brand-primary ring-1 ring-brand-primary bg-brand-primary/5"
                  : "border-border-light hover:bg-gray-50"
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
                  : "border-border-light hover:bg-gray-50"
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
                  : "border-border-light hover:bg-gray-50"
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
              isError ? "bg-red-50" : "bg-green-50"
            )}
          >
            {isError ? (
              <FiX className="w-8 h-8 text-red-500" />
            ) : (
              <BsCheckCircleFill className="w-8 h-8 text-green-400" />
            )}
          </div>

          <h2 className="text-xl font-bold mb-2">Subscription Confirmed!</h2>
          <p className="text-sm text-text-secondary mb-6">{message}</p>

          <div className="border border-indigo-100 rounded-lg p-4 bg-indigo-50/30 mb-6">
            <div className="text-sm font-medium mb-4 pb-2 border-b border-indigo-100">
              Featured Activated
            </div>

            {isError ? (
              <div className="flex items-center justify-center gap-3 text-sm text-text-secondary py-4">
                <FiX className="text-red-500 font-bold" />
                <span className="max-w-[200px] leading-tight">
                  Business account cannot be created during trial.
                </span>
              </div>
            ) : (
              <div className="space-y-3 text-left pl-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <FiCheck className="text-green-500" /> Create up to 10
                  communities
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <FiCheck className="text-green-500" /> Unlimited job postings
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <FiCheck className="text-green-500" /> List up to 20 products
                </div>
                <div className="flex items-center gap-2 text-sm text-text-secondary">
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

  const handleSelectPlan = (plan) => {
    if (isBusiness && !plan.allowsBusinessAccess) {
      setConfirmationData({
        featureName: plan.name,
        isError: true,
        message: "This plan is not available for business accounts.",
      });
      return;
    }

    if (plan.price > 0) {
      setPaymentPlan({ id: plan.backendId, name: plan.name });
    } else {
      setConfirmationData({
        featureName: plan.name,
        isError: false,
        message: "Thank you! Your trial has started.",
      });
    }
  };

  const handlePaymentConfirm = () => {
    const plan = paymentPlan;
    setPaymentPlan(null);
    // Show success confirmation
    setConfirmationData({
      featureName: plan.name,
      isError: false,
      message: `Thank You! Your Account Is Now (${plan.name} Plan)`,
    });
  };

  const handleNext = () => {
    if (confirmationData?.isError) {
      setConfirmationData(null);
      return;
    }

    if (isBusiness) {
      router.push(`/onboarding/business-profile`);
    } else {
      router.push(`/onboarding/user-profile`);
    }
  };

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

      <div className="text-center mt-12 text-sm text-text-secondary flex items-center justify-center gap-2">
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

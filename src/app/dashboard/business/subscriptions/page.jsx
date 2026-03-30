"use client";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import React, { useEffect, useState } from "react";
import subscriptionAPI from "@/services/subscriptionAPI";
import api from "@/lib/axios";

import SubscriptionHeader from "@/components/subscriptions/SubscriptionHeader";
import ShowPlanUpdate from "@/components/subscriptions/ShowPlanUpdate";
import SubscriptionCard from "@/components/subscriptions/SubscriptionCard";
import PaymentPlans from "@/components/subscriptions/PaymentPlans";

const BusinessSubscriptionsPage = () => {
  const [subscription, setSubscription] = useState(null);
  const [totalSpent, setTotalSpent] = useState(0);
  const [businessUsage, setBusinessUsage] = useState({
    communities: 0,
    jobs: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);
  const [showPlans, setShowPlans] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [checkStatusDetail, setCheckStatusDetail] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchSubscriptionData = async () => {
      try {
        const [subResponse, totalSpentResponse] = await Promise.all([
          subscriptionAPI.getMySubscription(),
          subscriptionAPI.getTotalSpent(),
        ]);

        const subData = Array.isArray(subResponse?.data)
          ? subResponse.data[0]
          : subResponse?.data;

        let finalSubscription = subData || null;

        if (!finalSubscription) {
          const stored = subscriptionAPI.getStoredSubscription();
          if (stored?.planName) {
            finalSubscription = {
              ...stored,
              plan: { name: stored.planName, price: stored.price },
            };
          }
        }

        // Fetch business usage counts
        const usageCounts = await subscriptionAPI.getBusinessUsage();

        if (isMounted) {
          setSubscription(finalSubscription);
          setTotalSpent(totalSpentResponse?.data ?? 0);
          setBusinessUsage(usageCounts);
        }
      } catch (error) {
        console.error("Failed to fetch subscription data", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSubscriptionData();

    return () => {
      isMounted = false;
    };
  }, []);

  const fetchPlans = async () => {
    setLoadingPlans(true);
    try {
      const response = await api.get({ url: "/plan" });
      if (response?.data) {
        setPlans(response.data);
      }
    } catch (err) {
      console.error("Failed to fetch plans", err);
    } finally {
      setLoadingPlans(false);
    }
  };

  useEffect(() => {
    if (showPlans && plans.length === 0) {
      fetchPlans();
    }
  }, [showPlans]);

  const handleSelectPlan = async (plan) => {
    try {
      const response = await subscriptionAPI.checkSubscriptionStatus(plan._id);

      if (response?.success) {
        const data = response.data;
        if (data.isSamePlan) {
          setCheckStatusDetail({
            type: "same",
            message:
              response.message || "You are already subscribed to this plan.",
            planId: plan._id,
          });
        } else if (data.canUpgrade) {
          setCheckStatusDetail({
            type: "upgrade",
            message:
              response.message ||
              "You already have an active subscription. If you choose a new plan, your current subscription access will end immediately, and access to the new plan will begin.",
            planId: plan._id,
            planName: plan.name,
            price: plan.price,
          });
        } else {
          // New subscription or trial
          setPaymentPlan({ id: plan._id, name: plan.name, price: plan.price });
        }
      }
    } catch (err) {
      console.error("Failed to check subscription status", err);
    }
  };

  const handlePaymentConfirm = async (selectedPlan) => {
    const plan = selectedPlan || paymentPlan;
    setPaymentPlan(null);
    setCheckStatusDetail(null);
    setIsProcessing(true);

    try {
      const successUrl = `${window.location.origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${window.location.origin}/dashboard/business/subscriptions`;

      const response = await subscriptionAPI.createStripeCheckout(
        plan.id || plan.planId,
        "business",
        successUrl,
        cancelUrl,
      );

      const isUrl = (str) =>
        typeof str === "string" &&
        (str.startsWith("http://") || str.startsWith("https://"));
      const checkoutUrl = isUrl(response.data)
        ? response.data
        : isUrl(response.data?.url)
          ? response.data.url
          : null;

      if (response.success && checkoutUrl) {
        // Store plan info before redirecting
        const subscriptionData = {
          planId: plan.id || plan.planId,
          planName: plan.name || plan.planName,
          role: "business",
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        subscriptionAPI.storeSubscription(subscriptionData);
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Failed to create Stripe checkout:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const planName =
    subscription?.plan || subscription?.planName || "Current Plan";
  const planPriceRaw = subscription?.plan?.price ?? subscription?.price ?? 0;
  const planPrice =
    typeof planPriceRaw === "number" ? planPriceRaw : Number(planPriceRaw) || 0;
  const status = subscription?.status || "active";
  const statusLabel =
    status === "active"
      ? "Active"
      : status === "canceled"
        ? "Canceled"
        : "Expired";
  const renewalDate = subscription?.endDate || subscription?.nextBillingDate;

  // Plan limits based on subscription plan
  const getPlanLimits = () => {
    const planNameLower = planName.toLowerCase();
    if (planNameLower.includes("premium")) {
      return { communities: 15, jobs: 200, products: 50 };
    } else if (planNameLower.includes("silver")) {
      return { communities: 10, jobs: 100, products: 20 };
    } else if (planNameLower.includes("gold")) {
      return { communities: 12, jobs: 150, products: 35 };
    } else {
      return { communities: 5, jobs: 50, products: 10 }; // Free/Basic plan
    }
  };

  const planLimits = getPlanLimits();

  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value || 0);

  const formatDate = (value) => {
    if (!value) return "N/A";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className=" bg-gray-50">
      <SubscriptionHeader showPlans={showPlans} />

      <ShowPlanUpdate handlePaymentConfirm={handlePaymentConfirm} planLimits={planLimits} businessUsage={businessUsage} formatCurrency={formatCurrency} totalSpent={totalSpent} loading={loading} showPlans={showPlans} handleSelectPlan={handleSelectPlan} formatDate={formatDate} planName={planName} planPrice={planPrice} renewalDate={renewalDate} statusLabel={statusLabel} status={status} subscription={subscription} setShowPlans={setShowPlans} plans={plans} loadingPlans={loadingPlans} />

      <div className="pt-4 sm:pt-6 lg:pt-8">
        <DashboardFooter />
      </div>

      <PaymentPlans setPaymentPlan={setPaymentPlan} paymentPlan={paymentPlan} isProcessing={isProcessing} handlePaymentConfirm={handlePaymentConfirm} />

      <SubscriptionCard checkStatusDetail={checkStatusDetail} setCheckStatusDetail={setCheckStatusDetail} handlePaymentConfirm={handlePaymentConfirm} isProcessing={isProcessing} />
    </div>
  );
};

export default BusinessSubscriptionsPage;

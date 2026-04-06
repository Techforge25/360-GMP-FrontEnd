"use client";
import DashboardFooter from "@/components/dashboard/DashboardFooter";
import React, { useEffect, useState } from "react";
import subscriptionAPI from "@/services/subscriptionAPI";
import SubscriptionHeader from "@/components/subscriptions/SubscriptionHeader";
import ShowPlanUpdate from "@/components/subscriptions/ShowPlanUpdate";
import SubscriptionCard from "@/components/subscriptions/SubscriptionCard";
import PaymentPlans from "@/components/subscriptions/PaymentPlans";
import useSubscriptionPlan from "@/hooks/useSubscriptionPlan";
import api from "@/lib/axios";
import { useUserRole } from "@/context/UserContext";

const BusinessSubscriptionsPage = () => {
  const [paymentPlan, setPaymentPlan] = useState(null);
  const [checkStatusDetail, setCheckStatusDetail] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loadingPlans, setLoadingPlans] = useState(false);
  const { subscription, totalSpent, loading, planName, planPrice, statusLabel, renewalDate, status } = useSubscriptionPlan()
  const { user } = useUserRole()
  console.log(user?.role, "user role subs")

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
    fetchPlans();
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
        user?.role,
        successUrl,
        cancelUrl,
      );
      window.location.href = response?.data;
    } catch (error) {
      console.error("Failed to create Stripe checkout:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50">
      <SubscriptionHeader showPlans={showPlans} />
      <ShowPlanUpdate handlePaymentConfirm={handlePaymentConfirm} totalSpent={totalSpent} loading={loading} showPlans={showPlans} handleSelectPlan={handleSelectPlan} planName={planName} planPrice={planPrice} renewalDate={renewalDate} statusLabel={statusLabel} status={status} subscription={subscription} setShowPlans={setShowPlans} plans={plans} loadingPlans={loadingPlans} />
      <div className="pt-4 sm:pt-6 lg:pt-8">
        <DashboardFooter />
      </div>
      <PaymentPlans setPaymentPlan={setPaymentPlan} paymentPlan={paymentPlan} isProcessing={isProcessing} handlePaymentConfirm={handlePaymentConfirm} />
      <SubscriptionCard checkStatusDetail={checkStatusDetail} setCheckStatusDetail={setCheckStatusDetail} handlePaymentConfirm={handlePaymentConfirm} isProcessing={isProcessing} />
    </div>
  );
};

export default BusinessSubscriptionsPage;

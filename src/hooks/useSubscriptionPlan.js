import api from "@/lib/axios";
import subscriptionAPI from "@/services/subscriptionAPI";
import { useEffect, useState } from "react";

export default function useSubscriptionPlan() {
     const [subscription, setSubscription] = useState(null);
     const [totalSpent, setTotalSpent] = useState(0);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchSubscriptionData = async () => {
               try {
                    const [activeSubResponse, totalSpentResponse] = await Promise.all([
                         subscriptionAPI.getMySubscription(),
                         subscriptionAPI.getTotalSpent(),
                    ]);

                    const activeSubscription = activeSubResponse?.data

                    setSubscription(activeSubscription);
                    setTotalSpent(totalSpentResponse?.data ?? 0);
               } catch (error) {
                    console.error("Failed to fetch subscription data", error);
               } finally {
                    setLoading(false);
               }
          };

          fetchSubscriptionData();
     }, []);
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

     return { subscription, totalSpent, loading, planName, planPrice, statusLabel, renewalDate, status }
}
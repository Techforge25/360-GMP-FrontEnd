"use client";
import { useParams, useSearchParams } from "next/navigation";
import OrderTrackingPage from "@/components/dashboard/orders/OrderTrackingPage";

export default function Page() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || id;

  return <OrderTrackingPage orderId={orderId} />;
}
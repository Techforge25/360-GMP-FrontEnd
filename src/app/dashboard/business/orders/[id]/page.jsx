"use client";  // ← Yeh line add karo

import BusinessOrderDetailsPage from "@/components/dashboard/orders/BusinessOrderDetailsPage";
import { useParams, useSearchParams } from "next/navigation";

export default function OrderDetailsRoute() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const orderId = searchParams.get("orderId") || params.id;

  return <BusinessOrderDetailsPage orderId={orderId} />;
}
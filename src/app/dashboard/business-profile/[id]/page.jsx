"use client";
import { useParams } from "next/navigation";
import BusinessProfileDetail from "@/components/dashboard/businesses/BusinessProfileDetail";

export default function BusinessProfilePage() {
  const params = useParams();
  
  return <BusinessProfileDetail businessId={params.id} />;
}
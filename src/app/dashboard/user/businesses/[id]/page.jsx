"use client";
import React, { use } from "react";
import BusinessProfileDetail from "@/components/dashboard/businesses/BusinessProfileDetail";

export default function BusinessDetailsPage({ params }) {
  const { id } = use(params);
  return <BusinessProfileDetail businessId={id} />;
}

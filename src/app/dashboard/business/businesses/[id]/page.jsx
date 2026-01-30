"use client";
import React from "react";
import BusinessProfileDetail from "@/components/dashboard/businesses/BusinessProfileDetail";

export default function BusinessDetailsPage({ params }) {
  const { id } = params;
  return <BusinessProfileDetail businessId={id} />;
}

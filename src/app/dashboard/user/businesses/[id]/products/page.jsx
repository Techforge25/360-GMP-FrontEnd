"use client";
import React from "react";
import ProductListingContent from "@/components/dashboard/businesses/products/ProductListingContent";

export default function BusinessProductsPage({ params }) {
  const { id } = params;
  return <ProductListingContent businessId={id} />;
}

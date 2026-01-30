"use client";
import React from "react";
import ProductDetailContent from "@/components/dashboard/businesses/products/ProductDetailContent";

export default function ProductDetailPage({ params }) {
  const { id, productId } = params;
  return <ProductDetailContent productId={productId} businessId={id} />;
}

"use client";
import React from "react";
import ProductDetailContent from "@/components/dashboard/businesses/products/ProductDetailContent";

export default function ProductDetailPage({ params }) {
  const unwrappedParams = React.use(params);
  const { id, productId } = unwrappedParams;
  return <ProductDetailContent productId={productId} businessId={id} />;
}

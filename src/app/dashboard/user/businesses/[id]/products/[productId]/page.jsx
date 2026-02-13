"use client";
import React from "react";
import ProductDetailContent from "@/components/dashboard/businesses/products/ProductDetailContent";

export default function ProductDetailPage({ params }) {
  const { id, productId } = React.use(params);
  return <ProductDetailContent productId={productId} businessId={id} />;
}

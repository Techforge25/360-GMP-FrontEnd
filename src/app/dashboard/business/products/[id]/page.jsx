"use client";
import { useParams } from "next/navigation";
import ProductDetailContent from "@/components/dashboard/businesses/products/ProductDetailContent";

export default function ProductDetailPage() {
  const params = useParams();
  
  return <ProductDetailContent productId={params.id} />;
}
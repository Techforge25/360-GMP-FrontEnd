"use client";

import { useParams } from "next/navigation";
import JobsPageContent from "@/components/dashboard/jobs/JobsPageContent";
import MarketplaceContent from "@/components/dashboard/marketplace/MarketplaceContent";
import BusinessesPageContent from "@/components/dashboard/businesses/BusinessesPageContent";
import ProductListContent from "@/components/dashboard/products/ProductListContent";
import ProductDetailContent from "@/components/dashboard/businesses/products/ProductDetailContent";
import BusinessProfileDetail from "@/components/dashboard/businesses/BusinessProfileDetail";
import ProductListingContent from "@/components/dashboard/businesses/products/ProductListingContent";

export function JobsRoutePage() {
  return <JobsPageContent />;
}

export function MarketplaceRoutePage() {
  return <MarketplaceContent />;
}

export function BusinessesRoutePage() {
  return <BusinessesPageContent />;
}

export function ProductsRoutePage() {
  return <ProductListContent isProfileView={false} />;
}

export function ProductDetailRoutePage() {
  const { id } = useParams();
  return <ProductDetailContent productId={id} />;
}

export function BusinessDetailRoutePage() {
  const { id } = useParams();
  return <BusinessProfileDetail businessId={id} />;
}

export function BusinessProductsRoutePage() {
  const { id } = useParams();
  return <ProductListingContent businessId={id} />;
}

export function BusinessProductDetailRoutePage() {
  const { id, productId } = useParams();
  return <ProductDetailContent productId={productId} businessId={id} />;
}

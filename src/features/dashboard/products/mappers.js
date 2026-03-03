import { getSlateText } from "@/lib/utils";
import { getDashboardPathForRole } from "@/lib/auth/session";

export const mapProductCard = (product) => ({
  id: product._id || product.productId,
  name: product.title || "Unnamed Product",
  image: product.image || "/assets/images/Portrait_Placeholder.png",
  desc: getSlateText(product.detail)?.substring(0, 50) || "No description",
  price: `$${product.pricePerUnit?.toFixed(2) || "0.00"}`,
  category: product.category || "General",
  tag: product.isFeatured
    ? "Featured"
    : product.status === "approved"
      ? "Approved"
      : "New",
  minOrder: product.minOrderQty || product.moq || 1,
  stock: product.stockQty || 0,
  shipping: product.shippingMethod || "Standard",
  deliveryDays: product.estimatedDeliveryDays || "5-7 days",
});

export const getProductsBasePath = (role) =>
  `${getDashboardPathForRole(role)}/products`;

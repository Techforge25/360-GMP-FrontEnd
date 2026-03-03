import { getDashboardPathForRole } from "@/lib/auth/session";

export const extractEntityId = (value) => {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object") return value._id || value.id || null;
  return null;
};

export const buildMarketplaceQueryParams = ({
  page = 1,
  limit = 8,
  query,
  selectedCategories,
  selectedCountry,
}) => {
  const params = { page, limit };

  if (query) {
    params.search = query;
  }
  if (selectedCategories.length > 0) {
    params.category = selectedCategories.join(",");
  }
  if (selectedCountry) {
    params.country = selectedCountry.toLowerCase();
  }

  return params;
};

export const getMarketplaceProductPath = (role, businessId, productId) =>
  `${getDashboardPathForRole(role)}/businesses/${businessId}/products/${productId}`;

const SECRET_KEY = "Gd:maC!qW@3(RIG0"

export const encodePassword = (password) => {
  // Combine SECRET_KEY + password and convert to Base64
  return btoa(SECRET_KEY + password);
};

export const decodePassword = (encoded) => {
  // Decode Base64 and remove SECRET_KEY prefix
  const decoded = atob(encoded);
  return decoded.slice(SECRET_KEY.length);
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);

export const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};


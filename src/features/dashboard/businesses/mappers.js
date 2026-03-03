import { getDashboardPathForRole } from "@/lib/auth/session";

export const mapBusinessProfile = (profile) => ({
  id: profile._id,
  name: profile.companyName || "Unknown Company",
  description: profile.description || "No description available",
  verified: profile.isVerified || false,
  location: profile.location
    ? `${profile.location.city || ""}, ${profile.location.country || ""}`
        .trim()
        .replace(/^,|,$/g, "") || "Location not specified"
    : "Location not specified",
  category: profile.businessType || profile.primaryIndustry || "General",
  logo: profile.logo || "/assets/images/profileLogo.png",
  banner: profile.banner || "/assets/images/pBG.png",
  website: profile.website || "#",
  email: profile.b2bContact?.email || profile.email || "N/A",
  phone: profile.b2bContact?.phone || "#",
  latitude: profile.latitude,
  longitude: profile.longitude,
  rawLocation: profile.location,
});

export const getBusinessesBasePath = (role) =>
  `${getDashboardPathForRole(role)}/businesses`;

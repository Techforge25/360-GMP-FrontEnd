"use client";
import React from "react";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaCheckCircle,
} from "react-icons/fa";
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineGlobe,
  HiOutlineLocationMarker,
} from "react-icons/hi";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { FiGlobe } from "react-icons/fi";
import { useUserRole } from "@/context/UserContext";
import { FaCrown } from "react-icons/fa";
import SlateRenderer from "@/components/ui/SlateRenderer";

export default function ProfileOverview({ business, socialLinks = [] }) {
  const { user } = useUserRole();
  const role = user?.role;
  // Robust check for free trial (role or subscription plan)
  const isFreeTrial =
    role === "free_trial" ||
    user?.subscription?.planName?.toLowerCase()?.includes("trial") ||
    user?.subscription?.plan?.name?.toLowerCase()?.includes("trial");

  if (!business) return null;

  const description = business.description || "No description provided.";
  const businessType =
    business.businessType || business.primaryIndustry || "Business Profile";

  const getSocialIcon = (platform) => {
    const p = platform?.toLowerCase() || "";
    if (p.includes("linkedin")) return FaLinkedinIn;
    if (p.includes("twitter")) return FaTwitter;
    if (p.includes("facebook")) return FaFacebookF;
    if (p.includes("instagram")) return FaInstagram;
    return FiGlobe;
  };

  // Format founded date
  const foundedDate = business.foundedDate
    ? new Date(business.foundedDate).getFullYear()
    : null;
  const age = business.age || "";
  const founded = foundedDate ? `${foundedDate} (${age})` : age || "N/A";

  const operatingHours =
    business.operationHour || "Operating hours not specified";

  // Handle certifications (potential array of strings or objects)
  const rawCertifications = business.certifications || [];
  const certifications = rawCertifications
    .map((cert) => {
      if (typeof cert !== "string") {
        return {
          name: cert.name || cert.title || "Certification",
          desc: cert.desc || cert.description || "Verified Credential",
          icon: cert.icon || "iso",
          url: cert.url,
        };
      }

      const isPiped = cert.includes("|");
      const name = isPiped ? cert.split("|")[0] : cert;
      const url = isPiped ? cert.split("|")[1] : null;

      // Filter out raw URLs (legacy format)
      if (cert.startsWith("http") && !isPiped) return null;

      return {
        name,
        desc: url ? "View Certificate" : "Verified Credential",
        url,
        icon: "iso",
      };
    })
    .filter(Boolean);

  const contact = {
    email:
      business.b2bContact?.supportEmail ||
      business.email ||
      "No email available",
    phone: business.b2bContact?.phone || "No phone available",
    website: business.website || "No website available",
    address: business.location
      ? [
          business.location.addressLine,
          business.location.city,
          business.location.country,
        ]
          .filter(Boolean)
          .join(", ")
      : "Location not specified",
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 mb-10">
      {/* Left Column: Overview */}
      <div className="flex-1 rounded-xl p-6 border border-[#E6E6E6]">
        <div>
          <h2 className="text-3xl font-medium text-black mb-4">Overview</h2>
          <SlateRenderer
            content={description}
            className="text-gray-600 leading-relaxed mb-6 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-[#E6E6E6] pt-6">
          <div>
            <p className="text-sm font-bold text-gray-900 mb-1">
              Business Type
            </p>
            <p className="text-gray-500 text-sm">{businessType}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 mb-1">Founded</p>
            <p className="text-gray-500 text-sm">{founded}</p>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 mb-1">
              Operating Hours
            </p>
            <p className="text-gray-500 text-sm">{operatingHours}</p>
          </div>
        </div>
      </div>

      {/* Right Column: Sidebar */}
      <div className="w-full lg:w-96 space-y-6 border border-[#E6E6E6] rounded-xl p-4">
        {/* Certifications Box */}
        <div className="rounded-xl p-6 border border-[#E6E6E6]">
          <h3 className="text-2xl font-medium text-black mb-4">
            Certifications
          </h3>
          <div className="space-y-3">
            {certifications.map((cert, index) => {
              const Content = (
                <div className="bg-gray-50 rounded-lg p-3 flex items-start gap-3 h-full hover:bg-gray-100 transition-colors">
                  <div
                    className={`mt-1 ${cert.icon === "iso" ? "text-orange-500" : "text-blue-500"}`}
                  >
                    <IoShieldCheckmarkOutline className="text-xl" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 line-clamp-1">
                      {cert.name}
                    </p>
                    <p className="text-sm text-gray-500">{cert.desc}</p>
                  </div>
                </div>
              );

              if (cert.url) {
                return (
                  <a
                    key={index}
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    {Content}
                  </a>
                );
              }

              return <div key={index}>{Content}</div>;
            })}
          </div>
        </div>

        {/* Contact Info Box */}
        <div className="bg-gray-50/50 rounded-xl border border-gray-100 relative overflow-hidden">
          <h3 className="text-2xl font-medium text-black mb-4 px-4 pt-4">
            Contact Info
          </h3>

          <div className="relative p-4">
            <ul
              className={`space-y-4 bg-[#F0F0F0] p-4 rounded-lg transition-all duration-300 ${isFreeTrial ? "blur-[6px] select-none pointer-events-none" : ""}`}
            >
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <HiOutlineMail className="text-lg mt-0.5 text-indigo-900" />
                <span>{contact.email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <HiOutlinePhone className="text-lg mt-0.5 text-indigo-900" />
                <span>{contact.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <HiOutlineGlobe className="text-lg mt-0.5 text-indigo-900" />
                <span>{contact.website}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-600">
                <HiOutlineLocationMarker className="text-lg mt-0.5 text-indigo-900" />
                <span>{contact.address}</span>
              </li>
            </ul>

            {isFreeTrial && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-full shadow-lg mb-3 transform hover:scale-105 transition-transform cursor-pointer">
                  <FaCrown className="text-sm" />
                  <span className="text-sm font-bold uppercase tracking-wide">
                    Upgrade
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-700 max-w-[200px] leading-snug">
                  Upgrade your plan to view contact information.
                </p>
              </div>
            )}
          </div>

          {socialLinks.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-3">Social Media</p>
              <div className="flex gap-3">
                {socialLinks.map((link) => {
                  const Icon = getSocialIcon(link.platformName);
                  return (
                    <a
                      key={link._id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-900 hover:bg-indigo-100 cursor-pointer transition-colors"
                    >
                      <Icon className="text-sm" />
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Map Display */}
          <div className="relative mt-4">
            <div
              className={`rounded-lg overflow-hidden h-64 bg-gray-200 relative z-0 transition-all duration-300 ${isFreeTrial ? "blur-[8px] select-none pointer-events-none" : ""}`}
            >
              {business.latitude && business.longitude ? (
                <>
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${business.longitude - 0.01}%2C${business.latitude - 0.01}%2C${business.longitude + 0.01}%2C${business.latitude + 0.01}&layer=mapnik&marker=${business.latitude}%2C${business.longitude}`}
                    className="border-none"
                  />
                  <div className="absolute bottom-2 right-2 flex gap-2">
                    <a
                      href={`https://www.openstreetmap.org/?mlat=${business.latitude}&mlon=${business.longitude}#map=15/${business.latitude}/${business.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-indigo-900 border border-indigo-200 hover:bg-white transition-colors"
                    >
                      View Larger Map
                    </a>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center border border-dashed border-gray-300">
                  <p className="text-sm text-gray-500">
                    Location coordinates not available
                  </p>
                </div>
              )}
            </div>

            {isFreeTrial && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-full shadow-xl mb-4 transform hover:scale-105 transition-transform cursor-pointer">
                  <FaCrown className="text-base" />
                  <span className="text-sm font-bold uppercase tracking-wide">
                    Upgrade
                  </span>
                </div>
                <p className="text-base font-semibold text-gray-800 max-w-[250px] leading-tight">
                  Upgrade your plan to view location information
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { FiMapPin, FiPhone, FiGlobe, FiX } from "react-icons/fi";
import businessProfileAPI from "@/services/businessProfileAPI";
import Link from "next/link";
import { useRouter } from "next/navigation";

const BusinessGrid = () => {
  const router = useRouter();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [selectedBusinessContact, setSelectedBusinessContact] = useState(null);
  const [mapLocation, setMapLocation] = useState(null);

  useEffect(() => {
    fetchBusinessProfiles();
  }, []);

  const handleBusinessClick = async (businessId) => {
    try {
      // Call the view API to track view and get complete business data
      await businessProfileAPI.viewBusinessProfile(businessId);
      // Navigate to the shared business profile page (accessible to both users and businesses)
      router.push(`/dashboard/business-profile/${businessId}`);
    } catch (error) {
      console.error("Failed to view business profile:", error);
      // Still navigate even if tracking fails
      router.push(`/dashboard/business-profile/${businessId}`);
    }
  };

  const fetchBusinessProfiles = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await businessProfileAPI.getAll({ limit: 6 });

      if (response.success && response.data) {
        const businessesData = response.data.docs || [];
        const transformedData = businessesData.map(transformBusinessProfile);

        setBusinesses(transformedData);
      }
    } catch (err) {
      console.error("Failed to fetch business profiles:", err);
      setError(err.message || "Failed to load business profiles");
    } finally {
      setLoading(false);
    }
  };

  const transformBusinessProfile = (profile) => {
    return {
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
    };
  };

  const handleContactClick = (business, event) => {
    event.preventDefault();
    event.stopPropagation();
    setSelectedBusinessContact(business);
    setShowContactModal(true);
  };

  const handleGetDirection = async (businessId, businessName, event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      setSelectedBusiness(businessName);
      const response =
        (await businessProfileAPI.getDirection?.(businessId)) ||
        (await fetch(`/api/businessProfile/${businessId}/getDirection`).then(
          (res) => res.json(),
        ));

      if (response?.data?.location) {
        setMapLocation(response.data.location);
        setShowMapModal(true);
      } else {
        // Fallback: Use business location from current data
        const business = businesses.find((b) => b.id === businessId);
        if (business) {
          setMapLocation({ address: business.location });
          setShowMapModal(true);
        }
      }
    } catch (error) {
      console.error("Failed to get direction:", error);
      // Fallback: Use business location from current data
      const business = businesses.find((b) => b.id === businessId);
      if (business) {
        setMapLocation({ address: business.location });
        setShowMapModal(true);
      }
    }
  };

  const generateMapUrl = (location) => {
    const address =
      location.address ||
      `${location.addressLine || ""}, ${location.city || ""}, ${location.country || ""}`
        .trim()
        .replace(/^,|,$/g, "");
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  if (loading) {
    return (
      <section className="py-12 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-indigo-950 mb-2">
              Businesses
            </h2>
            <p className="text-base text-gray-500">Loading businesses...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!businesses || businesses.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mx-auto text-black mb-2 max-w-sm mb-2">
            Businesses
          </h2>
          <p className="text-base text-gray-900">
            Explore verified businesses around the world.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <p className="text-red-600 text-base text-center">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((biz) => (
            <div
              key={biz.id}
              onClick={() => handleBusinessClick(biz.id)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
            >
              {/* Cover Image */}
              <div className="h-32 bg-gray-200 relative">
                <img
                  src={biz.banner}
                  alt={biz.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/images/pBG.png";
                  }}
                />
                {/* Logo Overlay */}
                <div className="absolute -bottom-8 left-4">
                  <div className="flex items-center gap-2">
                    <div className="w-12  h-12 rounded-lg bg-white p-1 shadow-sm border border-gray-100 flex items-center justify-center">
                      <img
                        src={biz.logo}
                        alt={biz.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = "/assets/images/profileLogo.png";
                        }}
                      />
                    </div>
                    <h1 className="text-lg text-black mt-6 ">{biz.name}</h1>
                  </div>
                </div>
              </div>

              <div className="pt-10 px-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <img
                        src="/assets/images/companyIcon.png"
                        alt=""
                        className="w-4 h-4"
                      />
                      <h3 className="text-sm text-gray-500 mt-1">{biz.name}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleGetDirection(biz.id, biz.name, e);
                        }}
                        className="flex items-center hover:text-[#240457] transition-colors cursor-pointer"
                      >
                        <FiMapPin className="mr-1 w-3 h-3 text-black hover:text-[#240457]" />
                        {biz.location}
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {biz.website !== "#" && (
                      <a
                        href={biz.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400"
                      >
                        <FiGlobe className="w-4 h-4 text-[#240457]" />
                      </a>
                    )}
                    {biz.website !== "#" && (
                      <a
                        href={biz.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400"
                      >
                        <img src="/assets/images/twoArrows.png" alt="" />
                      </a>
                    )}
                    {biz.phone !== "#" && (
                      <button
                        onClick={(e) => handleContactClick(biz, e)}
                        className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400"
                      >
                        <FiPhone className="w-4 h-4 text-[#240457]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link
            href="/dashboard/business/businesses"
            className="px-6 py-2 bg-white border border-gray-300 rounded-xl  text-base font-medium text-gray-900 hover:bg-gray-50 shadow-sm"
          >
            Browse All Businesses
          </Link>
        </div>

        {/* Map Modal */}
        {showMapModal && mapLocation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Get Directions to {selectedBusiness}
                </h3>
                <button
                  onClick={() => setShowMapModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-4">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600 mb-2">Location:</p>
                  <p className="text-base font-medium text-gray-900">
                    {mapLocation.address ||
                      `${mapLocation.addressLine || ""}, ${mapLocation.city || ""}, ${mapLocation.country || ""}`
                        .trim()
                        .replace(/^,|,$/g, "")}
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={generateMapUrl(mapLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#240457] text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-[#1a0340] transition-colors"
                  >
                    Open in Google Maps
                  </a>
                  <button
                    onClick={() => setShowMapModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Contact Info Modal */}
        {showContactModal && selectedBusinessContact && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl max-w-md w-full overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <FiX className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                {/* Business Name */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Business Name</p>
                  <p className="text-base font-semibold text-gray-900">
                    {selectedBusinessContact.name}
                  </p>
                </div>

                {/* Email */}
                {/* <div>
                  <p className="text-sm text-gray-500 mb-1">Email</p>
                  <a
                    href={`mailto:${selectedBusinessContact.email || "N/A"}`}
                    className="text-base text-[#240457] hover:underline"
                  >
                    {selectedBusinessContact.email || "Not available"}
                  </a>
                </div> */}

                {/* Phone */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Phone Number</p>
                  <a
                    href={`tel:${selectedBusinessContact.phone}`}
                    className="text-base text-[#240457] hover:underline"
                  >
                    {selectedBusinessContact.phone}
                  </a>
                </div>

                {/* Location */}
                <div>
                  <p className="text-sm text-gray-500 mb-1">Location</p>
                  <p className="text-base text-gray-900">
                    {selectedBusinessContact.location}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <a
                    href={`tel:${selectedBusinessContact.phone}`}
                    className="flex-1 bg-[#240457] text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-[#1a0340] transition-colors"
                  >
                    Call Now
                  </a>
                  <button
                    onClick={() => setShowContactModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BusinessGrid;

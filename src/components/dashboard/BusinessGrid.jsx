"use client";
import React, { useState, useEffect } from "react";
import { FiMapPin, FiPhone, FiGlobe } from "react-icons/fi";
import businessProfileAPI from "@/services/businessProfileAPI";
import Link from "next/link";

const BusinessGrid = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBusinessProfiles();
  }, []);

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
      phone: profile.b2bContact?.phone || "#",
    };
  };

  if (loading) {
    return (
      <section className="py-12 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-indigo-950 mb-2">
              Businesses
            </h2>
            <p className="text-sm text-gray-500">Loading businesses...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!businesses || businesses.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold mx-auto text-black mb-2 max-w-sm mb-2">
            Businesses
          </h2>
          <p className="text-sm text-gray-900">
            Explore verified businesses around the world.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 max-w-2xl mx-auto">
            <p className="text-red-600 text-sm text-center">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businesses.map((biz) => (
            <div
              key={biz.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
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
                      <h3 className="text-xs text-gray-500 mt-1">{biz.name}</h3>
                    </div>
                    <div className="flex items-center text-xs text-gray-500 mt-1">
                      <FiMapPin className="mr-1 w-3 h-3 text-black" />
                      {biz.location}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {biz.website !== "#" && (
                      <a
                        href={biz.website}
                        target="_blank"
                        rel="noopener noreferrer"
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
                        className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400"
                      >
                        <img src="/assets/images/twoArrows.png" alt="" />
                      </a>
                    )}
                    {biz.phone !== "#" && (
                      <a
                        href={`tel:${biz.phone}`}
                        className="w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400"
                      >
                        <FiPhone className="w-4 h-4 text-[#240457]" />
                      </a>
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
            className="px-6 py-2 bg-white border border-gray-300 rounded-xl  text-sm font-medium text-gray-900 hover:bg-gray-50 shadow-sm"
          >
            Browse All Businesses
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BusinessGrid;

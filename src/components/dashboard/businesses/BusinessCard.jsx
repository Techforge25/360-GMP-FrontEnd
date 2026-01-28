"use client";
import React from "react";
import { FiMapPin, FiGlobe, FiPhone, FiCheck, FiFolder } from "react-icons/fi";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import { useUserRole } from "@/context/UserContext";

const BusinessCard = ({ business }) => {
  const { role } = useUserRole();
  const isFreeTrial = role === "free_trial";

  // Mock data handling if props not provided
  const {
    name = "TechVision Solutions",
    logo = "/assets/images/logo_placeholder_1.png",
    verified = true,
    rating = 4.8,
    reviews = 124,
    category = "Manufacturing",
    established = "2012",
    location = "Sydney, Australia",
    description = "TechVision Solutions is a premier B2B platform specializing in the wholesale supply and trade of advanced electronic components. Connecting buyers and manufacturers components.",
    stats = {
      minOrder: "100 Pcs",
      responseRate: ">95%",
      onTime: "98%",
      transactions: "500+",
      products: "200+",
    },
    actions = {
      website: "#",
      directions: "#",
      contact: "#",
      profile: "#",
    },
    sponsored = false,
  } = business || {};

  return (
    <div
      className={`bg-white rounded-xl p-6 border ${
        sponsored
          ? "border-indigo-200 shadow-md ring-1 ring-indigo-50"
          : "border-gray-200"
      } mb-4 relative`}
    >
      {sponsored && (
        <span className="absolute top-4 right-4 bg-gray-200 text-gray-600 text-[10px] px-2 py-0.5 rounded font-medium">
          Ad
        </span>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="w-16 h-16 rounded-full border border-gray-100 shadow-sm flex items-center justify-center p-2 bg-white flex-shrink-0">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900">{name}</h3>
            {verified && <FaCheckCircle className="text-blue-500 text-base" />}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-2">
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />{" "}
              <span className="font-bold text-gray-700">{rating}</span>
              <span className="text-gray-400">({reviews})</span>
            </div>
            <span className="flex items-center gap-1">
              <FiFolder /> {category}
            </span>
            <span className="flex items-center gap-1">Est {established}</span>
            <span className="flex items-center gap-1">
              <FiMapPin /> {isFreeTrial ? "Hidden Location" : location}
            </span>
          </div>

          <p className="text-base text-gray-600 leading-relaxed mb-4">
            {description}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 bg-gray-50/50 rounded-lg p-4 mb-6 border border-gray-100">
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
            Min Order
          </p>
          <p className="text-sm font-bold text-gray-900">{stats.minOrder}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
            Response Rate
          </p>
          <p className="text-sm font-bold text-gray-900">
            {stats.responseRate}
          </p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
            On-time Del
          </p>
          <p className="text-sm font-bold text-gray-900">{stats.onTime}</p>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
            Start Trans
          </p>
          <span className="text-[10px] bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded font-bold">
            Supplier
          </span>
        </div>
        <div>
          <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">
            Products
          </p>
          <p className="text-sm font-bold text-gray-900">{stats.products}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Button
          variant="outline"
          className="h-9 text-sm font-medium border-indigo-100 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-200"
          disabled={isFreeTrial}
        >
          <FiGlobe className="mr-2" /> Website
        </Button>
        <Button
          variant="outline"
          className="h-9 text-sm font-medium border-indigo-100 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-200"
          disabled={isFreeTrial}
        >
          <FiMapPin className="mr-2" /> Get Directions
        </Button>
        <Button
          variant="outline"
          className="h-9 text-sm font-medium border-indigo-100 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-200"
          disabled={isFreeTrial && role !== "business"}
        >
          <FiPhone className="mr-2" /> Contact
        </Button>
        <Button
          variant="outline"
          className="h-9 text-sm font-medium border-indigo-100 text-indigo-700 bg-indigo-50 hover:bg-indigo-100 hover:border-indigo-200"
        >
          <FiFolder className="mr-2" /> View Profile
        </Button>
      </div>
    </div>
  );
};

export default BusinessCard;

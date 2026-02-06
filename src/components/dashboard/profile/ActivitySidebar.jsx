"use client";
import React, { useState, useEffect } from "react";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiMail,
  FiPhone,
  FiGlobe,
  FiMapPin,
  FiEdit2,
} from "react-icons/fi";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import businessProfileAPI from "@/services/businessProfileAPI";
import socialLinkAPI from "@/services/socialLinkAPI";
import MapModal from "./MapModal";
import dynamic from "next/dynamic";

// Dynamically import Leaflet map to avoid SSR issues
const DynamicMap = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false },
);
const DynamicTileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false },
);
const DynamicMarker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false },
);

const getSocialIcon = (platform) => {
  const p = platform?.toLowerCase() || "";
  if (p.includes("linkedin")) return FaLinkedinIn;
  if (p.includes("twitter")) return FaTwitter;
  if (p.includes("facebook")) return FaFacebookF;
  if (p.includes("instagram")) return FaInstagram;
  return FiGlobe;
};

const ActivitySidebar = () => {
  const [lowStockItems, setLowStockItems] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isEditing2, setIsEditing2] = useState(false);
  const [socialLinks, setSocialLinks] = useState([]);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapLocation, setMapLocation] = useState([51.505, -0.09]); // Default location
  const [isClient, setIsClient] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({
    platformName: "linkedin",
    url: "",
  });
  const [formData, setFormData] = useState({
    supportEmail: "",
    phone: "",
    website: "",
    addressLine: "",
    city: "",
    country: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveContact = async () => {
    try {
      // Filter out empty fields to avoid validation errors
      const filteredData = Object.fromEntries(
        Object.entries(formData).filter(
          ([key, value]) => value && value.trim() !== "",
        ),
      );

      // Only send data if we have at least one field to update
      if (Object.keys(filteredData).length === 0) {
        console.warn("No data to update");
        setIsEditing(false);
        return;
      }

      await businessProfileAPI.updateContactInfo(filteredData);
      setIsEditing(false);

      // Refresh the profile data
      const profileRes = await businessProfileAPI.getMyProfile();
      if (profileRes?.data) {
        setProfile(profileRes.data);
      }
    } catch (error) {
      console.error("Failed to update contact info:", error);
      alert(
        "Failed to update contact info. Please check your input and try again.",
      );
    }
  };

  const handleAddSocialLink = async () => {
    if (!newSocialLink.url) return;
    try {
      await socialLinkAPI.create(newSocialLink);
      // Refresh links
      const res = await socialLinkAPI.getByBusinessProfileId(profile._id);
      if (res?.data) setSocialLinks(res.data);
      setNewSocialLink({ platformName: "linkedin", url: "" });
      setIsEditing2(false);
    } catch (error) {
      console.error("Failed to add social link:", error);
    }
  };

  const handleDeleteSocialLink = async (id) => {
    try {
      await socialLinkAPI.delete(id);
      setSocialLinks((prev) => prev.filter((link) => link._id !== id));
    } catch (error) {
      console.error("Failed to delete social link:", error);
    }
  };

  const handleEditToggle = () => {
    if (!isEditing && profile) {
      // When starting to edit, populate form with current profile data
      setFormData({
        supportEmail: profile?.b2bContact?.supportEmail || "",
        phone: profile?.b2bContact?.phone || "",
        website: profile?.website || "",
        addressLine: profile?.location?.addressLine || "",
        city: profile?.location?.city || "",
        country: profile?.location?.country || "",
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSaveMapLocation = async (mapURL, coordinates) => {
    try {
      await businessProfileAPI.updateMapURL(mapURL);
      setMapLocation(coordinates);
      setShowMapModal(false);

      // Update profile with new mapURL
      setProfile((prev) => ({
        ...prev,
        mapURL,
      }));
    } catch (error) {
      console.error("Failed to update map location:", error);
      alert("Failed to update map location. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const results = await Promise.allSettled([
          businessProfileAPI.getLowStockProducts({ limit: 2 }),
          businessProfileAPI.getRecentJobApplications(),
          businessProfileAPI.getMyProfile(),
        ]);

        const [lowStockRes, applicantsRes, profileRes] = results;

        // Handle low stock items
        if (
          lowStockRes.status === "fulfilled" &&
          lowStockRes.value?.data?.docs
        ) {
          setLowStockItems(lowStockRes.value.data.docs);
        } else if (
          lowStockRes.status === "rejected" &&
          process.env.NODE_ENV === "development"
        ) {
          console.warn(
            "Low stock products API not available:",
            lowStockRes.reason?.message || "No data",
          );
        }

        // Handle applicants
        if (applicantsRes.status === "fulfilled" && applicantsRes.value?.data) {
          setApplicants(applicantsRes.value.data);
        } else if (
          applicantsRes.status === "rejected" &&
          process.env.NODE_ENV === "development"
        ) {
          console.warn(
            "Job applications API not available:",
            applicantsRes.reason?.message || "No data",
          );
        }

        // Handle profile data
        if (profileRes.status === "fulfilled" && profileRes.value?.data) {
          setProfile(profileRes.value.data);
          // Populate form data with existing profile data
          setFormData({
            supportEmail: profileRes.value.data?.b2bContact?.supportEmail || "",
            phone: profileRes.value.data?.b2bContact?.phone || "",
            website: profileRes.value.data?.website || "",
            addressLine: profileRes.value.data?.location?.addressLine || "",
            city: profileRes.value.data?.location?.city || "",
            country: profileRes.value.data?.location?.country || "",
          });

          // Fetch social links
          try {
            const socialRes = await socialLinkAPI.getByBusinessProfileId(
              profileRes.value.data._id,
            );
            if (socialRes?.data) {
              setSocialLinks(socialRes.data);
            }
          } catch (e) {
            console.error("Failed to fetch social links", e);
          }
        } else if (profileRes.status === "rejected") {
          console.error("Failed to fetch profile:", profileRes.reason);
        }
      } catch (error) {
        console.error("Failed to fetch sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const getFullAddress = (location) => {
    if (!location) return "No location provided";
    const parts = [
      location.addressLine,
      location.city,
      location.country,
    ].filter(Boolean);
    return parts.join(", ");
  };

  if (loading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5 h-40 sm:h-44 lg:h-48 animate-pulse bg-gray-50"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Recent Critical Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">
          Recent Critical Activity
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {lowStockItems.length > 0 ? (
            lowStockItems.map((item, index) => (
              <ActivityItem
                key={item._id || index}
                title={`Low Stock: ${item.title}`}
                time="Just now" // API doesn't provide updated time for low stock, usually
                action="Update Inventory"
                severity="high"
                stockQty={item.stockQty}
                threshold={item.lowStockThreshold}
              />
            ))
          ) : (
            <p className="text-sm sm:text-sm text-gray-500">
              No critical alerts
            </p>
          )}
        </div>
      </div>

      {/* Recent Applicant */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5">
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">
          Recent Applicant
        </h3>
        <div className="space-y-3 sm:space-y-4">
          {applicants.length > 0 ? (
            applicants.map((app, index) => (
              <ApplicantItem
                key={app._id || index}
                name={app.applicantName || "Unknown Candidate"} // Assuming applicantName or similar field
                time={formatTimeAgo(app.createdAt)}
              />
            ))
          ) : (
            <p className="text-sm sm:text-sm text-gray-500">
              No recent applicants
            </p>
          )}
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 lg:p-5 relative">
        <button
          onClick={handleEditToggle}
          className="absolute top-3 sm:top-4 lg:top-5 right-3 sm:right-4 lg:right-5 text-gray-400 hover:text-gray-600"
        >
          <FiEdit2
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isEditing ? "text-indigo-600" : ""}`}
          />
        </button>
        <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 sm:mb-4">
          Contact Info
        </h3>

        {isEditing ? (
          <div className="space-y-3 bg-[#B4B4B433] p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <img
                src="/assets/images/mailIcon.png"
                className="w-[16px] h-[16px]"
                alt="email"
              />
              <input
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleInputChange}
                placeholder="Support Email"
                className="flex-1 text-sm p-1 text-black rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/assets/images/phoneIcon.png"
                className="w-[16px] h-[16px]"
                alt="phone"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="flex-1 text-sm p-1 text-black rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <img
                src="/assets/images/globeIcon.png"
                className="w-[16px] h-[16px]"
                alt="website"
              />
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                placeholder="Website"
                className="flex-1 text-sm p-1 text-black rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="space-y-2 pt-2 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <FiMapPin className="w-[16px] h-[16px] text-purple-900" />
                <input
                  type="text"
                  name="addressLine"
                  value={formData.addressLine}
                  onChange={handleInputChange}
                  placeholder="Address Line"
                  className="flex-1 text-sm p-1 text-black rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex gap-2 pl-6">
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-1/2 text-sm p-1 text-black rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="w-1/2 text-sm p-1 text-black rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSaveContact}
                className="flex-1 mt-2 bg-[#240457] text-white py-1.5 rounded text-sm font-semibold hover:bg-[#240457] transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex-1 mt-2 bg-gray-500 text-white py-1.5 rounded text-sm font-semibold hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <ul className="space-y-5 bg-[#B4B4B433] p-3 rounded-lg">
            <ContactItem
              icon="/assets/images/mailIcon.png"
              text={profile?.b2bContact?.supportEmail || "No email"}
            />
            <ContactItem
              icon="/assets/images/phoneIcon.png"
              text={profile?.b2bContact?.phone || "No phone"}
            />
            <ContactItem
              icon="/assets/images/globeIcon.png"
              text={profile?.website || "No website"}
            />
            <ContactItem
              icon="/assets/images/locationIcon.png"
              text={getFullAddress(profile?.location)}
            />
          </ul>
        )}

        <div className="mt-6 mb-2">
          <p className="text-sm text-[#556179] mb-3">Social Media</p>
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => {
              const Icon = getSocialIcon(link.platformName);
              return (
                <div key={link._id} className="relative group">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-7 h-7 rounded-full bg-[#ECEFF6] flex items-center justify-center text-[#240457] transition-colors hover:bg-indigo-100"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                  {isEditing2 && (
                    <button
                      onClick={() => handleDeleteSocialLink(link._id)}
                      className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-white text-[8px]"
                    >
                      ✕
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {isEditing2 ? (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-sm font-semibold mb-2">Add Social Link</p>
            <select
              className="w-full text-black text-sm p-1 mb-2 rounded border border-gray-300"
              value={newSocialLink.platformName}
              onChange={(e) =>
                setNewSocialLink({
                  ...newSocialLink,
                  platformName: e.target.value,
                })
              }
            >
              <option value="linkedin">LinkedIn</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="instagram">Instagram</option>
              <option value="website">Website</option>
            </select>
            <input
              type="text"
              placeholder="URL"
              className="w-full text-sm p-1 text-black mb-2 rounded border border-gray-300"
              value={newSocialLink.url}
              onChange={(e) =>
                setNewSocialLink({ ...newSocialLink, url: e.target.value })
              }
            />
            <button
              onClick={handleAddSocialLink}
              className="w-full bg-[#240457] text-white py-1 rounded text-sm"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsEditing2(true)}
            className="w-full mt-4 bg-[#240457] text-white py-2 rounded-lg text-sm font-semibold hover:bg-[#240457] transition-colors flex items-center justify-center gap-2"
          >
            Add Social Link <span>+</span>
          </button>
        )}
        {/* Map / Location */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden py-3 px-5 mt-4">
          <div className="aspect-square bg-blue-50 relative rounded-lg overflow-hidden">
            {isClient && (
              <DynamicMap
                center={mapLocation}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
                scrollWheelZoom={false}
                dragging={false}
                zoomControl={false}
              >
                <DynamicTileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DynamicMarker position={mapLocation} />
              </DynamicMap>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowMapModal(true)}
          className="w-full py-3 bg-[#240457] text-white text-sm font-semibold hover:bg-[#240457]/90 transition-colors flex items-center justify-center gap-2 mt-4 rounded-lg"
        >
          Update Location <FiMapPin className="w-3 h-3" />
        </button>
      </div>

      {/* Map Modal */}
      <MapModal
        isOpen={showMapModal}
        onClose={() => setShowMapModal(false)}
        onSave={handleSaveMapLocation}
        initialLocation={mapLocation}
      />
    </div>
  );
};

const ActivityItem = ({ title, time, action, severity }) => (
  <div
    className={`p-3 rounded-lg border ${severity === "high" ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-100"}`}
  >
    <div className="flex items-start gap-2">
      <FiAlertTriangle
        className={`w-5 h-5 mt-4 mr-1 flex-shrink-0 ${severity === "high" ? "text-red-500" : "text-gray-500"}`}
      />
      <div>
        <p className="text-sm font-semibold text-gray-800">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-gray-500">({time})</span>
          <span className="text-[30px] text-gray-500">•</span>
          <button
            className={`text-[14px] font-medium flex items-center hover:underline ${severity === "high" ? "text-[#185ADB]" : "text-gray-600"}`}
          >
            {action} <FiArrowRight className="w-2 h-2 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

const ApplicantItem = ({ name, time }) => (
  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-100 rounded-lg">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-green-700 text-sm font-bold -mt-2">
        <img
          src="/assets/images/newApplicantIcon.png"
          alt="alert"
          className="w-5 h-5"
        />
      </div>
      <div>
        <p className="text-[14px] font-medium text-black">
          New Applicant: {name}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-gray-500">({time} ago)</span>
          <span className="text-[30px] text-gray-500">•</span>
          <button className="text-[14px] text-[#185ADB] font-medium text-blue-600 flex items-center hover:underline whitespace-nowrap">
            View Detail <FiArrowRight className="w-2 h-2 ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

import { FiUser } from "react-icons/fi";

const ContactItem = ({ icon: Icon, text }) => (
  <li className="flex items-start gap-3">
    <div className="mt-0.5 text-purple-900">
      <img src={Icon} alt="icon" className="w-[16px] h-[16px]" />
    </div>
    <span className="text-sm text-[#40444C] break-all">{text}</span>
  </li>
);

const SocialIcon = ({ icon: Icon }) => (
  <a
    href="#"
    className="w-7 h-7 rounded-full bg-[#ECEFF6] flex items-center justify-center text-[#240457] transition-colors"
  >
    <Icon className="w-4 h-4" />
  </a>
);

export default ActivitySidebar;

"use client";
import React from "react";
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

const ActivitySidebar = () => {
  return (
    <div className="space-y-6">
      {/* Recent Critical Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">
          Recent Critical Activity
        </h3>
        <div className="space-y-3">
          <ActivityItem
            title="Low Stock Alert: (32 units left)"
            time="2 hours ago"
            action="Update Inventory"
            severity="high"
          />
          <ActivityItem
            title="Low Stock Alert: (32 units left)"
            time="2 hours ago"
            action="Update Inventory"
            severity="high"
          />
        </div>
      </div>

      {/* Recent Applicant */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-900 mb-4">
          Recent Applicant
        </h3>
        <div className="space-y-4">
          <ApplicantItem name="Joseph" time="45 min ago" />
          <ApplicantItem name="Sarah Connor" time="3 hours ago" />
          <ApplicantItem name="Alex" time="13 hours ago" />
        </div>
      </div>

      {/* Contact Info */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 relative">
        <button className="absolute top-5 right-5 text-gray-400 hover:text-gray-600">
          <FiEdit2 className="w-3.5 h-3.5" />
        </button>
        <h3 className="text-sm font-bold text-gray-900 mb-4">Contact Info</h3>
        <ul className="space-y-3">
          <ContactItem icon={FiMail} text="contact@globalmanufacturing.com" />
          <ContactItem icon={FiPhone} text="+1 (347) 123 4690" />
          <ContactItem icon={FiGlobe} text="www.globalmanufacturing.com" />
          <ContactItem
            icon={FiMapPin}
            text="123 abv, street 1, SanFransisco, United States"
          />
        </ul>

        <div className="mt-6 mb-2">
          <p className="text-xs text-gray-500 mb-3">Social Media</p>
          <div className="flex gap-2">
            <SocialIcon icon={FaLinkedinIn} />
            <SocialIcon icon={FaTwitter} />
            <SocialIcon icon={FaFacebookF} />
            <SocialIcon icon={FaInstagram} />
          </div>
        </div>

        <button className="w-full mt-4 bg-[#240457] text-white py-2 rounded-lg text-xs font-semibold hover:bg-indigo-900 transition-colors flex items-center justify-center gap-2">
          Add Social Link <span>+</span>
        </button>
      </div>

      {/* Map / Location */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-1 overflow-hidden">
        <div className="aspect-square bg-blue-50 relative rounded-lg overflow-hidden">
          {/* Placeholder for Map */}
          <div className="w-full h-full flex items-center justify-center text-blue-300">
            <FiMapPin className="w-8 h-8" />
          </div>
        </div>
        <button className="w-full py-3 bg-[#240457] text-white text-xs font-semibold hover:bg-indigo-900 transition-colors flex items-center justify-center gap-2">
          Update Location <FiMapPin className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

const ActivityItem = ({ title, time, action, severity }) => (
  <div
    className={`p-3 rounded-lg border ${severity === "high" ? "bg-red-50 border-red-100" : "bg-gray-50 border-gray-100"}`}
  >
    <div className="flex items-start gap-2">
      <FiAlertTriangle
        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${severity === "high" ? "text-red-500" : "text-gray-500"}`}
      />
      <div>
        <p className="text-xs font-semibold text-gray-800">{title}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[10px] text-gray-500">({time})</span>
          <span className="text-[10px] text-gray-400">•</span>
          <button
            className={`text-[10px] font-medium flex items-center hover:underline ${severity === "high" ? "text-blue-600" : "text-gray-600"}`}
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
      <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center text-green-700 text-xs font-bold">
        <FiUser className="w-3.5 h-3.5" />
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-800">
          New Applicant: {name}
        </p>
        <span className="text-[10px] text-gray-500">{time} ago</span>
      </div>
    </div>
    <button className="text-[10px] font-medium text-blue-600 flex items-center hover:underline whitespace-nowrap">
      View Detail <FiArrowRight className="w-2 h-2 ml-0.5" />
    </button>
  </div>
);

import { FiUser } from "react-icons/fi";

const ContactItem = ({ icon: Icon, text }) => (
  <li className="flex items-start gap-3">
    <div className="mt-0.5 text-purple-900">
      <Icon className="w-3.5 h-3.5" />
    </div>
    <span className="text-xs text-gray-600 break-all">{text}</span>
  </li>
);

const SocialIcon = ({ icon: Icon }) => (
  <a
    href="#"
    className="w-7 h-7 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
  >
    <Icon className="w-3 h-3" />
  </a>
);

export default ActivitySidebar;

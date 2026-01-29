"use client";
import React from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const CommunityMembersWidget = ({ members = [], totalCount = 0 }) => {
  // Mock members if none provided
  const displayMembers =
    members.length > 0
      ? members
      : [
          {
            id: 1,
            name: "Michael Torres",
            role: "Senior Sustainability Consultant",
            image: "/assets/images/Portrait_Placeholder.png",
          },
          {
            id: 2,
            name: "Sofia Andrade",
            role: "Materials & Metallurgy Engineer",
            image: "/assets/images/Portrait_Placeholder.png",
          },
          {
            id: 3,
            name: "Ethan Ramirez",
            role: "Mechanical Design Lead",
            image: "/assets/images/Portrait_Placeholder.png",
          },
          {
            id: 4,
            name: "Marcus Bennett",
            role: "Manufacturing Operations Manager",
            image: "/assets/images/Portrait_Placeholder.png",
          },
          {
            id: 5,
            name: "David Kim",
            role: "Environmental Policy Analyst",
            image: "/assets/images/Portrait_Placeholder.png",
          },
          {
            id: 6,
            name: "Ava Thompson",
            role: "Automotive Parts Quality Inspector",
            image: "/assets/images/Portrait_Placeholder.png",
          },
        ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-bold text-gray-900">Community Members</h3>
        <span className="text-gray-500 text-sm font-semibold">
          {totalCount || 321}
        </span>
      </div>

      <div className="space-y-4">
        {displayMembers.slice(0, 6).map((member, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-100">
              <img
                src={member.image || "/assets/images/Portrait_Placeholder.png"}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/images/Portrait_Placeholder.png";
                }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate">
                {member.name}
              </h4>
              <p className="text-xs text-gray-500 truncate">
                {member.role || "Member"}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="#"
        className="flex items-center justify-center gap-1 mt-5 pt-4 border-t border-gray-100 text-[#240457] font-semibold text-sm hover:underline"
      >
        View All Members
        <FiArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default CommunityMembersWidget;

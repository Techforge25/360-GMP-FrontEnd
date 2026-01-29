"use client";
import React from "react";
import Image from "next/image";
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
            image: "/assets/images/user1.png",
          },
          {
            id: 2,
            name: "Sofia Andrade",
            role: "Materials & Metallurgy Engineer",
            image: "/assets/images/user2.png",
          },
          {
            id: 3,
            name: "Ethan Ramirez",
            role: "Mechanical Design Lead",
            image: "/assets/images/user3.png",
          },
          {
            id: 4,
            name: "Marcus Bennett",
            role: "Manufacturing Operations Manager",
            image: "/assets/images/user4.png",
          },
          {
            id: 5,
            name: "David Kim",
            role: "Environmental Policy Analyst",
            image: "/assets/images/user5.png",
          },
        ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Community Members</h3>
        <span className="text-gray-500 text-sm font-medium">
          {totalCount || 321}
        </span>
      </div>

      <div className="space-y-5">
        {displayMembers.slice(0, 5).map((member, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src={member.image || "/assets/images/Portrait_Placeholder.png"}
                alt={member.name}
                fill
                className="rounded-full object-cover border border-gray-100"
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
        className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-gray-50 text-[#240457] font-semibold text-sm hover:underline"
      >
        View All Members
        <FiArrowRight />
      </Link>
    </div>
  );
};

export default CommunityMembersWidget;

"use client";
import React from "react";
import { FiBriefcase, FiBookmark, FiCalendar } from "react-icons/fi";
import userProfileAPI from "@/services/userProfileAPI";

const ProfileSummarySection = () => {
  const [loading, setLoading] = React.useState(true);
  const [analyticsData, setAnalyticsData] = React.useState({
    totalProductsPurchased: 0,
    totalAppliedJobs: 0,
    totalSavedJobs: 0,
    totalInterviewInvites: 0,
  });

  React.useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await userProfileAPI.getAnalytics("7d");
        if (response.status === "fulfilled" && response.value?.data) {
          setAnalyticsData(response.value.data);
        }
      } catch (error) {
        console.error("Failed to fetch user analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const stats = [
    {
      label: "Total Product Purchased",
      value: analyticsData.totalProductsPurchased,
      subLabel: "Career resources",
      icon: FiBriefcase,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      iconBg: "bg-blue-600",
    },
    {
      label: "Total Applied Jobs",
      value: analyticsData.totalAppliedJobs,
      subLabel: "Total applications",
      icon: FiBriefcase,
      color: "bg-gray-50 border-gray-200",
      iconColor: "text-white",
      iconBg: "bg-black",
    },
    {
      label: "Saved Jobs",
      value: analyticsData.totalSavedJobs,
      subLabel: "Opportunity pipeline",
      icon: FiBookmark,
      color: "bg-yellow-50 border-yellow-200",
      iconColor: "text-white",
      iconBg: "bg-yellow-600",
    },
    {
      label: "Interview Invites",
      value: analyticsData.totalInterviewInvites,
      subLabel: "Strong profile effectiveness",
      icon: FiCalendar,
      color: "bg-green-50 border-green-200",
      iconColor: "text-white",
      iconBg: "bg-green-600",
    },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Summary</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-5 rounded-xl border ${stat.color} relative transition-all duration-200 hover:shadow-sm`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3
                  className={`text-3xl font-bold text-gray-900 mb-1 ${index === 0 ? "text-blue-600" : index === 2 ? "text-yellow-600" : index === 3 ? "text-green-600" : ""}`}
                >
                  {loading ? (
                    <div className="h-9 w-16 bg-gray-200 animate-pulse rounded"></div>
                  ) : (
                    stat.value
                  )}
                </h3>
                <p className="text-sm font-semibold text-gray-900 mb-2 sm:mb-8 leading-tight">
                  {stat.label}
                </p>
                <p className="text-sm text-gray-500">{stat.subLabel}</p>{" "}
                {/* Fixed className typo from text-smtext-gray-500 */}
              </div>
              <div
                className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center ${stat.iconColor} shadow-sm`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileSummarySection;

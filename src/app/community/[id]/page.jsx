"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUserRole } from "@/context/UserContext";
import communityAPI from "@/services/communityAPI";
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import CommunityHeader from "@/components/community/CommunityHeader";
import CommunityInfoCard from "@/components/community/CommunityInfoCard";
import CommunityMembersWidget from "@/components/community/CommunityMembersWidget";
import FeedInput from "@/components/community/FeedInput";
import FeedTabs from "@/components/community/FeedTabs";
import PostCard from "@/components/community/PostCard";
import { IoChevronBack } from "react-icons/io5";

export default function CommunityDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUserRole();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recent");

  // Mock Posts Data
  const [posts] = useState([
    {
      id: 1,
      author: {
        name: "Michael Torres",
        role: "Senior Sustainability Consultant",
        image: "/assets/images/user1.png",
      },
      timeAgo: "1 minute ago",
      title:
        "What is the BEST strategy for negotiating salary after receiving a verbal job offer in the Manufacturing sector?",
      type: "question",
      options: [
        { text: "Focus Solely On A Higher Base Salary" },
        { text: "Negotiate A Higher Bonus Structure" },
      ],
      likes: 14,
      comments: 6,
      shares: 0,
    },
    {
      id: 2,
      author: {
        name: "David Kim",
        role: "Environmental Policy Analyst",
        image: "/assets/images/user5.png",
      },
      timeAgo: "4 hours ago",
      title: "What are best practices for carbon footprint tracking?",
      content:
        "Looking for recommendations on tools and methodologies for accurate carbon footprint measurement. What are your experiences with different platforms?",
      likes: 24,
      comments: 22,
      shares: 2,
    },
    {
      id: 3,
      author: {
        name: "Michael Torres",
        role: "Senior Sustainability Consultant",
        image: "/assets/images/user1.png",
      },
      timeAgo: "1 day ago",
      title: "Just completed a major renewable energy project...",
      content:
        "Just completed a major renewable energy project with a Fortune 500 company. The transition to sustainable practices is accelerating faster than ever. Happy to share insights and answer questions about implementation",
      image:
        "",
      likes: 134,
      comments: 16,
      shares: 10,
    },
  ]);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        if (!params.id) return;

        // Check if params.id is a mock ID or real MongoID
        // In real app, always fetch. For existing bad links, handle gracefully.

        const response = await communityAPI.getById(params.id);
        if (response.success) {
          setCommunity(response.data);
        } else {
          console.error("Failed to load community");
        }
      } catch (error) {
        console.error("Error fetching community:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommunity();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AuthNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#240457]"></div>
        </div>
      </div>
    );
  }

  // Fallback if not found
  if (!community) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <AuthNavbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Community Not Found
          </h1>
          <p className="text-gray-500 mb-6">
            The community you're looking for doesn't exist or you don't have
            access.
          </p>
          <Link
            href="/dashboard/business/communities"
            className="px-6 py-2 bg-[#240457] text-white rounded-lg"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  const isOwner =
    user?.role === "business" &&
    (community.businessId?._id === user?.businessId ||
      community.businessId === user?.businessId);
  const isMember = true; // TODO: Check actual membership

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthNavbar />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-1 hover:text-gray-800"
          >
            <IoChevronBack /> Back
          </Link>
          <span>/</span>
          <Link
            href="/dashboard/business/communities"
            className="hover:text-gray-800"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium truncate max-w-[200px]">
            {community.name}
          </span>
        </div>

        {/* Header */}
        <CommunityHeader
          community={community}
          isOwner={isOwner}
          isMember={isMember}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <CommunityInfoCard community={community} />
            <CommunityMembersWidget
              totalCount={community.memberCount}
              members={[]} // Pass actual members here
            />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-8">
            <FeedInput />

            <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}

              <div className="flex justify-center mt-8 mb-12">
                <button className="px-6 py-2 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
                  Load more
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

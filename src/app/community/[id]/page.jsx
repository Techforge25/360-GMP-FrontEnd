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
import CommunityMembersView from "@/components/community/CommunityMembersView";
import FeedInput from "@/components/community/FeedInput";
import FeedTabs from "@/components/community/FeedTabs";
import PostCard from "@/components/community/PostCard";
import { IoChevronBack } from "react-icons/io5";
import Footer from "@/components/landing/Footer";

export default function CommunityDetailsPage({ params: paramsPromise }) {
  const params = React.use(paramsPromise);
  const router = useRouter();
  const { user } = useUserRole();
  const [community, setCommunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("recent");
  const [showMembersView, setShowMembersView] = useState(false);
  const [isMember, setIsMember] = useState(false);
  const [membershipStatus, setMembershipStatus] = useState(null);

  // Mock Posts Data
  const [posts] = useState([
    {
      id: 1,
      author: {
        name: "Michael Torres",
        role: "Senior Sustainability Consultant",
        image: "/assets/images/Portrait_Placeholder.png",
      },
      timeAgo: "1 minute ago",
      title:
        "What is the BEST strategy for negotiating salary after receiving a verbal job offer in the Manufacturing sector?",
      type: "question",
      tag: "Question",
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
        image: "/assets/images/Portrait_Placeholder.png",
      },
      timeAgo: "4 hours ago",
      tag: "Discussions",
      content:
        "Looking for recommendations on tools and methodologies for accurate carbon footprint measurement. What are your experiences with different platforms?",
      likes: 22,
      comments: 22,
      shares: 0,
      commentsList: [
        {
          author: "Sarah Chen",
          content: "We have been using CarbonTrack Pro..."
        }
      ]
    },
    {
      id: 3,
      author: {
        name: "Michael Torres",
        role: "Senior Sustainability Consultant",
        image: "/assets/images/Portrait_Placeholder.png",
      },
      timeAgo: "1 day ago",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      image: "/assets/images/placeholderBanner.jpg",
      readMore: true,
      likes: 14,
      comments: 6,
      shares: 0,
    },
    {
      id: 4,
      type: "event",
      title: "Virtual Sustainability Summit 2025",
      date: "DEC 25",
      description: "Join industry leaders for a day of insights, networking, and innovative solutions for sustainable business practices.",
      time: "10:00 AM - 4:00 PM EST",
      location: "Virtual Event",
      attendees: 156,
      tag: "Event",
    },
    {
      id: 5,
      type: "document",
      author: {
        name: "David Kim",
        role: "Environmental Policy Analyst",
        image: "/assets/images/Portrait_Placeholder.png",
      },
      timeAgo: "1 day ago",
      title: "Sustainability Metrics Dashboard Template",
      fileType: "EXCEL",
      description: "Comprehensive template for tracking and visualizing key sustainability metrics across your organization.",
      downloads: 36,
    },
    {
      id: 6,
      author: {
        name: "David Kim",
        role: "Environmental Policy Analyst",
        image: "/assets/images/Portrait_Placeholder.png",
      },
      timeAgo: "1 day ago",
      content:
        "Michael Torres shared a video",
      videoTitle: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
      videoThumbnail: "/assets/images/placeholderBanner.jpg",
      readMore: true,
      likes: 14,
      comments: 6,
      shares: 0,
    },
  ]);

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        setLoading(true);
        const response = await communityAPI.getById(params.id);
        
        if (response.success) {
          setCommunity(response.data.community);
          setIsMember(response.data.isMember || false);
          setMembershipStatus(response.data.membershipStatus || null);
        } else {
          console.error("Failed to fetch community:", response.message);
          setCommunity(null);
        }
      } catch (error) {
        console.error("Error fetching community:", error);
        setCommunity(null);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchCommunity();
    }
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
      community.businessId === user?.businessId ||
      community.businessId?._id === user?.profilePayload?._id);

  // Debug isOwner calculation
  console.log("=== isOwner Debug ===");
  console.log("user:", user);
  console.log("user.role:", user?.role);
  console.log("user.businessId:", user?.businessId);
  console.log("user.profilePayload._id:", user?.profilePayload?._id);
  console.log("community.businessId:", community.businessId);
  console.log("community.businessId._id:", community.businessId?._id);
  console.log("isOwner result:", isOwner);
  console.log("==================");

  const handleMembershipUpdate = (updateData) => {
    setIsMember(updateData.isMember);
    setMembershipStatus(updateData.membershipStatus);
    
    // Optionally update community member count if joined successfully
    if (updateData.isMember && community) {
      setCommunity(prev => ({
        ...prev,
        memberCount: (prev.memberCount || 0) + 1
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AuthNavbar />

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Back Button */}
        <div className="mb-4">
          <Link
            href="/dashboard/user/profile"
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <IoChevronBack className="w-4 h-4" /> Back
          </Link>
        </div>

        {/* Header */}
        <CommunityHeader
          community={community}
          isOwner={isOwner}
          isMember={isMember}
          membershipStatus={membershipStatus}
          user={user}
          onMembershipUpdate={handleMembershipUpdate}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3 space-y-6">
            <CommunityInfoCard community={community} />
            <CommunityMembersWidget
              totalCount={community.memberCount}
              members={[]}
              onViewAll={() => setShowMembersView(true)}
            />
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-9">
            {showMembersView ? (
              <CommunityMembersView
                onBack={() => setShowMembersView(false)}
                community={community}
                isOwner={isOwner}
              />
            ) : (
              <>
                <FeedInput />

                <FeedTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                <div className="space-y-4 mt-6">
                  {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}

                  <div className="flex justify-center mt-8 mb-12">
                    <button className="px-8 py-3 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
                      Load more
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

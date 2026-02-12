"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUserRole } from "@/context/UserContext";
import communityAPI from "@/services/communityAPI";
import postsAPI from "@/services/postsAPI";
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
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(false);
  const [pagination, setPagination] = useState(null);

  // Fetch community posts
  const fetchCommunityPosts = async (page = 1, filterType = activeTab) => {
    if (!params.id) return;

    try {
      setPostsLoading(true);
      const queryParams = {
        page,
        limit: 10,
      };

      // Add filter based on active tab
      if (filterType && filterType !== "recent") {
        // Map tab names to post types
        const typeMapping = {
          posts: "post",
          events: "event",
          polls: "poll",
          discussions: "discussion",
          resources: "document",
        };
        queryParams.type = typeMapping[filterType] || filterType;
      }

      const response = await postsAPI.getCommunityPosts(params.id, queryParams);

      if (response.success) {
        const posts = response.data.posts || [];

        // Temporary fix: Check if current user liked posts client-side
        const processedPosts = posts.map((post) => {
          if (!post.likedByUser && user && post.likes) {
            const currentUserId = user.profilePayload?._id;
            if (currentUserId) {
              post.likedByUser = post.likes.some(
                (like) =>
                  like.userId === currentUserId ||
                  like.userId?._id === currentUserId,
              );
            }
          }
          return post;
        });

        if (page === 1) {
          setPosts(processedPosts);
        } else {
          setPosts((prev) => [...prev, ...processedPosts]);
        }
        setPagination(response.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching community posts:", error);
      setPosts([]);
    } finally {
      setPostsLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setPosts([]); // Clear existing posts
    fetchCommunityPosts(1, newTab); // Fetch posts for new tab
  };

  // Get post counts by type for tabs
  const getPostCounts = () => {
    const totalPosts = posts.length;
    const postTypes = posts.reduce((acc, post) => {
      const type = post.type || "post";
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return {
      total: totalPosts,
      posts: postTypes.post || 0,
      discussions: postTypes.discussion || 0,
      events: postTypes.event || 0,
      polls: postTypes.poll || 0,
      resources: postTypes.document || postTypes.resource || 0,
    };
  };

  // Handle new post creation
  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  // Handle post updates (likes, comments, etc.)
  const handlePostUpdate = (updatedPost) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === updatedPost._id ? { ...post, ...updatedPost } : post,
      ),
    );
  };

  // Handle post deletion
  const handlePostDelete = (postId) => {
    setPosts((prev) => prev.filter((post) => post._id !== postId));
  };

  useEffect(() => {
    const fetchCommunity = async () => {
      try {
        setLoading(true);
        const response = await communityAPI.getById(params.id);

        console.log("Community API Response:", response);
        console.log("Membership Info:", {
          isMember: response.data?.isMember,
          membershipStatus: response.data?.membershipStatus,
          membership: response.data?.membership,
        });

        if (response.success) {
          setCommunity(response.data.community);
          setIsMember(response.data.isMember || false);
          setMembershipStatus(response.data.membershipStatus || null);

          console.log("State values set:", {
            isMember: response.data.isMember || false,
            membershipStatus: response.data.membershipStatus || null,
          });

          // Fetch posts after community is loaded
          fetchCommunityPosts(1);
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

  // Owner check: community is owned by business profile (businessId)
  const userBusinessId =
    user?.businessId ||
    user?.profiles?.businessProfileId ||
    user?.profilePayload?._id ||
    user?.id;
  const communityBusinessId = community.businessId?._id || community.businessId;
  const isOwner =
    user?.role === "business" &&
    userBusinessId &&
    communityBusinessId &&
    String(communityBusinessId) === String(userBusinessId);

  const handleMembershipUpdate = (updateData) => {
    setIsMember(updateData.isMember);
    setMembershipStatus(updateData.membershipStatus);

    // Optionally update community member count if joined successfully
    if (updateData.isMember && community) {
      setCommunity((prev) => ({
        ...prev,
        memberCount: (prev.memberCount || 0) + 1,
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
              communityId={community._id}
              community={community}
              totalCount={community.memberCount}
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
                <FeedInput
                  communityId={community._id}
                  onPostCreated={handlePostCreated}
                  isMember={isMember}
                  membershipStatus={membershipStatus}
                  isOwner={isOwner}
                />

                <FeedTabs
                  activeTab={activeTab}
                  setActiveTab={handleTabChange}
                  postCounts={getPostCounts()}
                />

                <div className="space-y-4 mt-6">
                  {postsLoading && posts.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#240457]"></div>
                    </div>
                  ) : posts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p className="text-lg font-medium mb-2">No posts yet</p>
                      <p className="text-sm">
                        Be the first to share something with this community!
                      </p>
                    </div>
                  ) : (
                    <>
                      {posts.map((post) => (
                        <PostCard
                          key={post._id}
                          post={post}
                          onUpdate={handlePostUpdate}
                          onDelete={handlePostDelete}
                          currentUser={user}
                        />
                      ))}

                      {pagination && pagination.hasNextPage && (
                        <div className="flex justify-center mt-8 mb-12">
                          <button
                            onClick={() =>
                              fetchCommunityPosts(
                                pagination.currentPage + 1,
                                activeTab,
                              )
                            }
                            disabled={postsLoading}
                            className="px-8 py-3 bg-white border border-gray-300 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-colors disabled:opacity-50"
                          >
                            {postsLoading ? "Loading..." : "Load more"}
                          </button>
                        </div>
                      )}
                    </>
                  )}
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

"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useUserRole } from "@/context/UserContext";
import communityAPI from "@/services/communityAPI";
import postsAPI from "@/services/postsAPI";
import businessProfileAPI from "@/services/businessProfileAPI";
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
  const [isOwnerState, setIsOwnerState] = useState(false);
  const [myBusinessProfileId, setMyBusinessProfileId] = useState(null);
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
        // Map tab names to backend types for API filtering
        const typeMapping = {
          posts: "post",
          events: "event",
          polls: "poll",
          discussion: "post", // Documents are created as 'post' type with files
        };
        queryParams.type = typeMapping[filterType] || filterType;
      }

      const response = await postsAPI.getCommunityPosts(params.id, queryParams);

      if (response.success) {
        const postsData = response.data.posts || [];

        // Temporary fix: Check if current user liked posts client-side
        const processedPosts = postsData.map((post) => {
          if (!post.likedByUser && user && post.likes) {
            const currentUserId =
              user.profilePayload?._id || user.id || user._id;

            if (currentUserId) {
              post.likedByUser = post.likes.some((like) => {
                const likeUserId = like.userId?._id || like.userId || like;
                return String(likeUserId) === String(currentUserId);
              });
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

  // Fix: Re-calculate likedByUser when user context becomes available
  // This handles the race condition where posts are fetched before the user profile is loaded
  useEffect(() => {
    if (!user || posts.length === 0) return;

    const currentUserId = user.profilePayload?._id || user.id || user._id;
    if (!currentUserId) return;

    setPosts((currentPosts) => {
      let hasChanges = false;
      const updatedPosts = currentPosts.map((post) => {
        if (!post.likes) return post;

        const isLiked = post.likes.some((like) => {
          const likeUserId = like.userId?._id || like.userId || like;
          return String(likeUserId) === String(currentUserId);
        });

        if (post.likedByUser !== isLiked) {
          hasChanges = true;
          return { ...post, likedByUser: isLiked };
        }
        return post;
      });

      return hasChanges ? updatedPosts : currentPosts;
    });
  }, [user, posts.length]);

  // Handle tab change
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setPosts([]); // Clear existing posts
    fetchCommunityPosts(1, newTab); // Fetch posts for new tab
  };

  // Client-side filtering logic to ensure precision within the fetched data
  const filteredPosts = posts.filter((post) => {
    if (activeTab === "recent") return true;

    // Posts tab: Show only simple text/image posts (no documents/polls/events)
    if (activeTab === "posts") {
      return post.type === "post" && !post.file;
    }

    // Documents (discussion) tab: Show posts with files
    if (activeTab === "discussion") {
      return post.type === "file" || (post.type === "post" && !!post.file);
    }

    // Events tab
    if (activeTab === "events") {
      return post.type === "event";
    }

    // Polls tab
    if (activeTab === "polls") {
      return post.type === "poll";
    }

    return true;
  });

  // Get post counts for tabs based on all available data
  const getPostCounts = () => {
    const counts = posts.reduce(
      (acc, post) => {
        if (post.type === "event") acc.events++;
        else if (post.type === "poll") acc.polls++;
        else if (post.type === "file" || (post.type === "post" && post.file))
          acc.discussions++;
        else if (post.type === "post" && !post.file) acc.posts++;
        return acc;
      },
      { total: posts.length, posts: 0, discussions: 0, events: 0, polls: 0 },
    );

    return counts;
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

          // Determine if the current user is the owner by checking the
          // membership role field from the backend schema (role: "owner")
          const memberRole =
            response.data.memberRole || response.data.membership?.role || null;
          const backendIsOwner =
            response.data.isOwner === true || memberRole === "owner";

          setIsOwnerState(backendIsOwner);

          // Owner always counts as an approved member for posting purposes
          setIsMember(backendIsOwner || response.data.isMember || false);
          setMembershipStatus(
            backendIsOwner
              ? "approved"
              : response.data.membershipStatus || null,
          );

          console.log("Community ownership debug:", {
            backendIsOwner,
            memberRole,
            isMember: response.data.isMember,
            membershipStatus: response.data.membershipStatus,
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

  // Fetch the current user's own business profile ID so we can reliably
  // determine ownership without depending on localStorage profilePayload.
  useEffect(() => {
    if (user?.role !== "business") return;

    const fetchMyBusinessProfile = async () => {
      try {
        const response = await businessProfileAPI.getMyProfile();
        if (response.success && response.data?._id) {
          setMyBusinessProfileId(String(response.data._id));
        }
      } catch {
        // Non-critical — fall back to client-side ID comparison
      }
    };

    fetchMyBusinessProfile();
  }, [user?.role]);

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

  // Owner check: prefer backend-provided flag, then fetched profile ID, then localStorage fallback
  const communityBusinessId = community.businessId?._id || community.businessId;

  const userBusinessIds = [
    myBusinessProfileId,
    user?.businessId,
    user?.profiles?.businessProfileId,
    user?.profilePayload?._id,
    user?.id,
    user?._id,
  ]
    .filter(Boolean)
    .map(String);

  const clientSideIsOwner =
    user?.role === "business" &&
    !!communityBusinessId &&
    userBusinessIds.includes(String(communityBusinessId));

  const isOwner = isOwnerState || clientSideIsOwner;

  console.log("DEBUG: FIX APPLIED - isOwner V2", {
    isOwner,
    userIds: userBusinessIds,
    communityId: String(communityBusinessId),
    userProfilePayloadId: user?.profilePayload?._id,
  });

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
                  ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <p className="text-lg font-medium mb-2">No posts yet</p>
                      <p className="text-sm">
                        Be the first to share something with this community!
                      </p>
                    </div>
                  ) : (
                    <>
                      {filteredPosts.map((post) => (
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

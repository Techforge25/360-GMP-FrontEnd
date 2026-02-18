"use client";
import React, { useState, useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { BiSearch, BiDotsHorizontalRounded } from "react-icons/bi";
import { BsChat } from "react-icons/bs";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import communityAPI from "@/services/communityAPI";

const CommunityMembersView = ({ onBack, community, isOwner }) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [members, setMembers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [processingId, setProcessingId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const itemsPerPage = 5;

  // Fetch members
  const fetchMembers = async () => {
    if (!community?._id) return;

    try {
      setLoading(true);
      const response = await communityAPI.getMembers(community._id, {
        page: currentPage,
        limit: itemsPerPage,
      });

      if (response.success) {
        setMembers(response.data.members || []);
        setTotalMembers(response.data.total || 0);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch pending requests (only for owners/admins)
  const fetchPendingRequests = async () => {
    if (!community?._id || !isOwner) return;

    try {
      setLoading(activeTab === "requests");
      const response = await communityAPI.getPendingRequests(community._id, {
        page: activeTab === "requests" ? currentPage : 1,
        limit: itemsPerPage,
      });

      if (response.success) {
        // Handle different possible response structures
        const requests =
          response.data?.pendingRequests ||
          response.data?.requests ||
          response.data?.data ||
          (Array.isArray(response.data) ? response.data : []);
        const total =
          response.data?.total ||
          response.data?.totalCount ||
          requests.length ||
          0;

        setPendingRequests(requests);
        setTotalPending(total);
      }
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch pending count on mount (for badge)
  useEffect(() => {
    if (isOwner && community?._id) {
      fetchPendingRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [community?._id, isOwner]);

  // Reset to page 1 when search query changes
  useEffect(() => {
    if (searchQuery) {
      setCurrentPage(1);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (activeTab === "requests") {
      fetchPendingRequests();
    } else {
      fetchMembers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [community?._id, activeTab, currentPage]);

  // Clear selection when tab or page changes
  useEffect(() => {
    setSelectedIds([]);
  }, [activeTab, currentPage]);

  // Filter members by search query (name only)
  const filterBySearch = (data) => {
    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((item) => {
      const name = getMemberDisplayName(item);
      return name.toLowerCase().includes(query);
    });
  };

  // Creator = business profile. Use community.businessId for owner, else memberId when BusinessProfile
  const getMemberDisplayName = (member) => {
    if (member.role === "owner" && community?.businessId) {
      return (
        community.businessId?.companyName ||
        community.businessId?.name ||
        "Business"
      );
    }
    if (member.memberModel === "BusinessProfile") {
      return (
        member.memberId?.companyName ||
        member.userProfileId?.fullName ||
        "Unknown"
      );
    }
    return (
      member.userProfileId?.fullName ||
      member.memberId?.companyName ||
      "Unknown"
    );
  };

  const getMemberDisplayImage = (member) => {
    if (member.role === "owner" && community?.businessId) {
      return (
        community.businessId?.logo || "/assets/images/Portrait_Placeholder.png"
      );
    }
    if (member.memberModel === "BusinessProfile") {
      return (
        member.memberId?.logo ||
        member.userProfileId?.imageProfile ||
        "/assets/images/Portrait_Placeholder.png"
      );
    }
    return (
      member.userProfileId?.imageProfile ||
      member.memberId?.logo ||
      "/assets/images/Portrait_Placeholder.png"
    );
  };

  const getMemberDisplaySubtitle = (member) => {
    if (member.role === "owner" && community?.businessId) {
      return (
        community.businessId?.primaryIndustry ||
        community.businessId?.businessType ||
        "Business"
      );
    }
    if (member.memberModel === "BusinessProfile") {
      return (
        member.memberId?.primaryIndustry ||
        member.memberId?.businessType ||
        "Business"
      );
    }
    return (
      member.userProfileId?.title ||
      member.memberId?.primaryIndustry ||
      "Member"
    );
  };

  // Filter for admins from members
  const filteredAdmins = members.filter(
    (member) =>
      member.role === "admin" ||
      member.role === "owner" ||
      member.role === "moderator",
  );

  const getCurrentData = () => {
    let data;
    switch (activeTab) {
      case "all":
        data = members;
        break;
      case "admins":
        data = filteredAdmins;
        break;
      case "requests":
        data = pendingRequests;
        break;
      default:
        data = members;
    }

    // Apply search filter
    return filterBySearch(data);
  };

  const handleToggleSelectAll = () => {
    const pageData = getCurrentData();
    const pageIds = pageData.map((item) => item._id);
    const allSelected =
      pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));

    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
    } else {
      setSelectedIds((prev) => [...new Set([...prev, ...pageIds])]);
    }
  };

  const handleToggleSelectId = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleAcceptRequest = async (userProfileId) => {
    if (!community?._id) return;

    try {
      setProcessingId(userProfileId);
      const response = await communityAPI.approveMembership(
        community._id,
        userProfileId,
        "approved",
      );

      if (response.success) {
        // Remove from pending requests
        setPendingRequests((prev) =>
          prev.filter((req) => req.userProfileId?._id !== userProfileId),
        );
        setTotalPending((prev) => prev - 1);
        // Refresh members list
        fetchMembers();
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleIgnoreRequest = async (userProfileId) => {
    if (!community?._id) return;

    try {
      setProcessingId(userProfileId);
      const response = await communityAPI.approveMembership(
        community._id,
        userProfileId,
        "rejected",
      );

      if (response.success) {
        // Remove from pending requests
        setPendingRequests((prev) =>
          prev.filter((req) => req.userProfileId?._id !== userProfileId),
        );
        setTotalPending((prev) => prev - 1);
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleRemoveMember = async (memberId) => {
    if (!community?._id) return;

    if (confirm("Are you sure you want to remove this member?")) {
      try {
        console.log(
          "Attempting to remove member. CommunityID:",
          community._id,
          "TargetMemberID:",
          memberId,
        );
        setProcessingId(memberId);
        const response = await communityAPI.removeMember(
          community._id,
          memberId,
        );
        if (response.success) {
          fetchMembers();
          setActiveDropdown(null);
        }
      } catch (error) {
        console.error("Error removing member:", error);
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleMakeAdmin = async (memberId) => {
    if (!community?._id) return;

    if (confirm("Are you sure you want to make this member an admin?")) {
      try {
        setProcessingId(memberId);
        const response = await communityAPI.updateMemberRole(
          community._id,
          memberId,
          "admin",
        );
        if (response.success) {
          fetchMembers();
          setActiveDropdown(null);
        }
      } catch (error) {
        console.error("Error making member admin:", error);
      } finally {
        setProcessingId(null);
      }
    }
  };

  const formatMemberCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "k";
    }
    return count?.toString() || "0";
  };

  const totalPages = Math.ceil(
    (activeTab === "requests" ? totalPending : totalMembers) / itemsPerPage,
  );

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <IoChevronBack className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-4">
            {/* Community Logo */}
            <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center overflow-hidden">
              {community?.profileImage || community?.logo ? (
                <img
                  src={community.profileImage || community.logo}
                  alt={community.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-white text-xl font-bold">
                  {community?.name?.charAt(0) || "C"}
                </span>
              )}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {community?.name || "Community"}
              </h1>
              <p className="text-sm text-gray-500 line-clamp-1">
                {community?.shortDescription || community?.description || ""}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {formatMemberCount(community?.memberCount)} Members •{" "}
                {community?.status === "active"
                  ? "Active Community"
                  : "Community"}{" "}
                •{" "}
                <span className="capitalize">
                  {community?.type || "Public"}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="search by name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-black pl-10 pr-24 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#240457] focus:border-transparent"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          <button
            onClick={() => {
              setActiveTab("all");
              setCurrentPage(1);
              setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "all"
                ? "bg-[#240457] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            All Members
          </button>
          {/* <button
            onClick={() => {
              setActiveTab("admins");
              setCurrentPage(1);
              setSearchQuery("");
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "admins"
                ? "bg-[#240457] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Admins
          </button> */}
          {isOwner && (
            <button
              onClick={() => {
                setActiveTab("requests");
                setCurrentPage(1);
                setSearchQuery("");
              }}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === "requests"
                  ? "bg-[#240457] text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              Request
              {totalPending > 0 && (
                <span className="bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center">
                  {totalPending}
                </span>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#240457]"></div>
          </div>
        ) : (
          <>
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 py-3 px-4 bg-gray-50 rounded-lg mb-4">
              <div className="col-span-1">
                <input
                  type="checkbox"
                  className="rounded border-gray-300"
                  checked={
                    getCurrentData().length > 0 &&
                    getCurrentData().every((item) =>
                      selectedIds.includes(item._id),
                    )
                  }
                  onChange={handleToggleSelectAll}
                />
              </div>
              <div className="col-span-3 text-sm font-medium text-gray-600">
                Profile
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-600">
                Joined
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-600">
                Role
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-600">
                Status
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-600">
                Actions
              </div>
            </div>

            {/* Table Content */}
            <div className="space-y-3">
              {getCurrentData().length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  {activeTab === "requests"
                    ? "No pending requests"
                    : "No members found"}
                </div>
              ) : activeTab === "requests" ? (
                // Requests View
                pendingRequests.map((request) => (
                  <div
                    key={request._id}
                    className="grid grid-cols-12 gap-4 py-4 px-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="col-span-1 flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedIds.includes(request._id)}
                        onChange={() => handleToggleSelectId(request._id)}
                      />
                    </div>
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={
                            request.userProfileId?.imageProfile ||
                            "/assets/images/Portrait_Placeholder.png"
                          }
                          alt={request.userProfileId?.fullName}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "/assets/images/Portrait_Placeholder.png";
                          }}
                        />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {request.userProfileId?.fullName || "Unknown User"}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {request.userProfileId?.title || "Member"}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-500">
                        {formatDate(request.createdAt)}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span className="px-2 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <div className="flex items-center gap-2">
                        <BiDotsHorizontalRounded className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleAcceptRequest(request.userProfileId?._id)
                        }
                        disabled={processingId === request.userProfileId?._id}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm rounded-md hover:bg-blue-200 transition-colors disabled:opacity-50"
                      >
                        {processingId === request.userProfileId?._id
                          ? "..."
                          : "Accept"}
                      </button>
                      <button
                        onClick={() =>
                          handleIgnoreRequest(request.userProfileId?._id)
                        }
                        disabled={processingId === request.userProfileId?._id}
                        className="px-3 py-1.5 bg-red-100 text-red-700 text-sm rounded-md hover:bg-red-200 transition-colors disabled:opacity-50"
                      >
                        Ignore
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                // Members View
                getCurrentData().map((member) => (
                  <div
                    key={member._id}
                    className="grid grid-cols-12 gap-4 py-4 px-4 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="col-span-1 flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedIds.includes(member._id)}
                        onChange={() => handleToggleSelectId(member._id)}
                      />
                    </div>
                    <div className="col-span-3 flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={getMemberDisplayImage(member)}
                          alt={getMemberDisplayName(member)}
                          className="w-10 h-10 rounded-full object-cover"
                          onError={(e) => {
                            e.target.src =
                              "/assets/images/Portrait_Placeholder.png";
                          }}
                        />
                        {(member.memberModel === "BusinessProfile" ||
                          (member.role === "owner" &&
                            community?.businessId)) && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#240457] rounded-full flex items-center justify-center">
                            <span className="text-white text-sm font-bold">
                              B
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                          {getMemberDisplayName(member)}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {getMemberDisplaySubtitle(member)}
                        </p>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span className="text-sm text-gray-500">
                        Joined {formatDate(member.joinedAt)}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-medium ${
                          member.role === "owner"
                            ? "bg-purple-100 text-purple-800"
                            : member.role === "admin"
                              ? "bg-blue-100 text-blue-800"
                              : member.role === "moderator"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {member.role === "owner"
                          ? "Creator"
                          : member.role?.charAt(0).toUpperCase() +
                              member.role?.slice(1) || "Member"}
                      </span>
                    </div>
                    <div className="col-span-2 flex items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400"></div>
                        <span className="text-sm text-gray-600">Online</span>
                      </div>
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <BsChat className="w-4 h-4 text-gray-600" />
                      </button>
                      {isOwner && member.role !== "owner" && (
                        <div className="relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveDropdown(
                                activeDropdown === member._id
                                  ? null
                                  : member._id,
                              );
                            }}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <BiDotsHorizontalRounded className="w-4 h-4 text-gray-600" />
                          </button>

                          {activeDropdown === member._id && (
                            <>
                              <div
                                className="fixed inset-0 z-10"
                                onClick={() => setActiveDropdown(null)}
                              />
                              <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-40">
                                {member.role !== "admin" && (
                                  <button
                                    onClick={() => handleMakeAdmin(member._id)}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                                  >
                                    Make Admin
                                  </button>
                                )}
                                <button
                                  onClick={() =>
                                    handleRemoveMember(
                                      member.userProfileId?._id ||
                                        member.memberId?._id,
                                    )
                                  }
                                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                                >
                                  Remove
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {getCurrentData().length > 0 && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold">
                    {(currentPage - 1) * itemsPerPage + 1}-
                    {Math.min(
                      currentPage * itemsPerPage,
                      activeTab === "requests" ? totalPending : totalMembers,
                    )}
                  </span>{" "}
                  Of{" "}
                  <span className="font-semibold">
                    {activeTab === "requests" ? totalPending : totalMembers}
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(1, prev - 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronLeft className="w-4 h-4" />
                    Back
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from(
                      { length: Math.min(5, totalPages) },
                      (_, i) => i + 1,
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                          page === currentPage
                            ? "bg-[#240457] text-white"
                            : "text-gray-600 hover:bg-gray-100 border border-gray-200"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    {totalPages > 5 && (
                      <>
                        <span className="text-gray-400 px-1">...</span>
                        <button
                          onClick={() => setCurrentPage(totalPages)}
                          className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                            totalPages === currentPage
                              ? "bg-[#240457] text-white"
                              : "text-gray-600 hover:bg-gray-100 border border-gray-200"
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                    }
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="flex items-center gap-1 px-3 py-2 text-sm bg-[#240457] text-white rounded-lg hover:bg-[#1a0340] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityMembersView;

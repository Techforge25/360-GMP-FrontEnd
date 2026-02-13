"use client";
import React, { useState } from "react";
import {
  FiMoreHorizontal,
  FiThumbsUp,
  FiMessageSquare,
  FiShare2,
  FiClock,
  FiMapPin,
  FiUsers,
  FiEye,
  FiDownload,
  FiPlay,
  FiEdit3,
  FiTrash2,
} from "react-icons/fi";
import { AiFillLike } from "react-icons/ai";
import postsAPI from "@/services/postsAPI";

const PostCard = ({ post, onUpdate, onDelete, currentUser }) => {
  // Debug logging to check if post has proper _id
  React.useEffect(() => {
    if (!post?._id) {
      console.error("PostCard received post without _id:", post);
    }
  }, [post]);

  const [liked, setLiked] = useState(post.likedByUser || false);
  const [likeCount, setLikeCount] = useState(post.likeCount || 0);
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content || "");
  const [isUpdating, setIsUpdating] = useState(false);

  // Read more state
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);

  // Comment state
  const [commentText, setCommentText] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);
  const [comments, setComments] = useState([]);

  // Update local state when post prop changes (e.g., after refresh)
  React.useEffect(() => {
    console.log("PostCard received post data:", {
      postId: post?._id,
      hasPost: !!post,
      postKeys: post ? Object.keys(post) : [],
    });

    setLiked(post.likedByUser || false);
    setLikeCount(post.likeCount || 0);
    setEditContent(post.content || "");
    // Reset editing state if post changes
    setIsEditing(false);

    // Check if read more is needed (more than 3 lines of text)
    if (post.content && post.content.length > 180) {
      setShowReadMore(true);
    } else {
      setShowReadMore(false);
      setIsExpanded(true);
    }

    // Reset comments when post changes
    setComments([]);
  }, [
    post.likedByUser,
    post.likeCount,
    post._id,
    post.content,
    post.commentCount,
  ]);

  // Load comments when comments section is opened
  React.useEffect(() => {
    if (showComments && comments.length === 0 && (post.commentCount || 0) > 0) {
      handleLoadComments();
    }
  }, [showComments]);

  // Helper function to format time ago
  const formatTimeAgo = (dateString) => {
    if (!dateString) return "Just now";

    const date = new Date(dateString);
    const now = new Date();
    const diffInMilliseconds = now - date;
    const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60)
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  // Handle like/unlike
  const handleLike = async () => {
    if (isLiking) return;

    // Validate post ID
    if (!post?._id) {
      console.error("Post ID is missing for like action");
      alert(
        "Error: Post ID is missing. Please refresh the page and try again.",
      );
      return;
    }

    try {
      setIsLiking(true);

      // Optimistic update
      const newLiked = !liked;
      const newLikeCount = newLiked
        ? likeCount + 1
        : Math.max(0, likeCount - 1);

      setLiked(newLiked);
      setLikeCount(newLikeCount);

      console.log("Liking post:", post._id);
      const response = await postsAPI.likePost(post._id);

      if (response.success) {
        // Update with actual server response
        setLiked(response.data.isLiked);
        setLikeCount(response.data.likeCount);

        if (onUpdate) {
          onUpdate({
            _id: post._id,
            likedByUser: response.data.isLiked,
            likeCount: response.data.likeCount,
          });
        }
      } else {
        // Revert optimistic update on failure
        setLiked(liked);
        setLikeCount(likeCount);
      }
    } catch (error) {
      console.error("Error liking post:", error);
      // Revert optimistic update on error
      setLiked(liked);
      setLikeCount(likeCount);
    } finally {
      setIsLiking(false);
    }
  };

  // Check if current user is post author
  const isPostAuthor = () => {
    if (!currentUser || !post.authorId) return false;

    // Compare with current user's profile ID
    if (currentUser.role === "business") {
      return post.authorId._id === currentUser.profilePayload?._id;
    } else {
      return post.authorId._id === currentUser.profilePayload?._id;
    }
  };

  // Handle delete post
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      const response = await postsAPI.deletePost(post._id);
      if (response.success && onDelete) {
        onDelete(post._id);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  // Handle edit post
  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(post.content || "");
    setShowOptions(false);
  };

  // Handle save edit
  const handleSaveEdit = async () => {
    if (!editContent.trim()) {
      alert("Post content cannot be empty");
      return;
    }

    try {
      setIsUpdating(true);
      const response = await postsAPI.updatePost(post._id, {
        content: editContent.trim(),
      });

      if (response.success) {
        // Update the post data
        if (onUpdate) {
          onUpdate({
            ...post,
            content: editContent.trim(),
            isEdited: true,
            editedAt: new Date().toISOString(),
          });
        }
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating post:", error);
      alert(
        "Failed to update post: " +
          (error.response?.data?.message || error.message),
      );
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContent(post.content || "");
  };

  // Handle comment submission
  const handleComment = async () => {
    if (!commentText.trim()) return;

    // Validate post ID
    if (!post?._id) {
      console.error("Post ID is missing");
      alert(
        "Error: Post ID is missing. Please refresh the page and try again.",
      );
      return;
    }

    try {
      setIsCommenting(true);
      console.log("Adding comment to post:", {
        postId: post._id,
        content: commentText.trim(),
        postTitle: post.content?.substring(0, 50) + "...",
      });

      const response = await postsAPI.addComment(post._id, commentText.trim());

      if (response.success) {
        console.log("Comment added successfully:", response.data);
        // Add new comment to local state
        setComments((prev) => [response.data.comment, ...prev]);
        setCommentText("");

        // Update post comment count
        if (onUpdate) {
          onUpdate({
            _id: post._id,
            commentCount: response.data.commentCount,
          });
        }
      } else {
        console.error("Comment submission failed:", response);
        alert("Failed to add comment. Please try again.");
      }
    } catch (error) {
      console.error("Error adding comment:", {
        error,
        postId: post._id,
        errorMessage: error.response?.data?.message || error.message,
        errorStatus: error.response?.status,
        fullErrorResponse: error.response?.data,
      });

      const errorMessage = error.response?.data?.message || error.message;
      if (errorMessage.includes("Post ID is required")) {
        alert(
          "⚠️ Validation Error: The system requires a valid post ID for commenting. Please refresh the page and try again.",
        );
      } else if (errorMessage.includes("approved member")) {
        alert(
          "⚠️ Permission Error: You need to be an approved member to comment on this post.",
        );
      } else {
        alert("Failed to add comment: " + errorMessage);
      }
    } finally {
      setIsCommenting(false);
    }
  };

  // Handle load comments
  const handleLoadComments = async () => {
    if (comments.length > 0) {
      // If comments are already loaded, just toggle visibility
      setShowComments(!showComments);
      return;
    }

    try {
      setShowComments(true);
      const response = await postsAPI.getPostComments(post._id, { limit: 5 });

      if (response.success) {
        setComments(response.data.comments || []);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
      setShowComments(false);
    }
  };

  // Get author info
  const getAuthorInfo = () => {
    if (!post.authorId)
      return {
        name: "Unknown User",
        role: "Member",
        image: "/assets/images/Portrait_Placeholder.png",
      };

    if (post.authorModel === "BusinessProfile") {
      return {
        name: post.authorId.companyName || "Business",
        role: "Business",
        image: post.authorId.logo || "/assets/images/Portrait_Placeholder.png",
      };
    } else {
      return {
        name: post.authorId.fullName || "User",
        role: post.authorId.title || "Member",
        image:
          post.authorId.imageProfile ||
          "/assets/images/Portrait_Placeholder.png",
      };
    }
  };

  const author = getAuthorInfo();

  // Guard clause - don't render if post doesn't have required _id
  if (!post?._id) {
    console.error("PostCard: Cannot render post without _id");
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
        <p className="text-red-600 text-sm">
          Error: Post data is incomplete. Please refresh the page.
        </p>
      </div>
    );
  }

  // Event Post Type
  if (post.type === "event" && post.event) {
    const { name, description, date, location } = post.event;
    const eventDate = new Date(date);
    const dateDay = eventDate.getDate();
    const dateMonth = eventDate
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const time = eventDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return (
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Author Header */}
        <div className="p-4 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={author.image}
                alt={author.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/images/Portrait_Placeholder.png";
                }}
              />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                {author.name}
              </h4>
              <p className="text-sm text-gray-500">
                {formatTimeAgo(post.createdAt)}
              </p>
            </div>
          </div>
          {/* Options Menu */}
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="text-gray-400 hover:text-gray-600 p-1 rounded"
            >
              <FiMoreHorizontal size={20} />
            </button>
            {showOptions && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowOptions(false)}
                />
                <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48">
                  {isPostAuthor() && (
                    <>
                      <button
                        onClick={() => {
                          setShowOptions(false);
                          handleDelete();
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Delete Post
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Event Banner */}
        {post.images && post.images.length > 0 && (
          <div className="w-full h-48 sm:h-64 relative">
            <img
              src={post.images[0]}
              alt={name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex flex-col items-center shadow-lg">
              <span className="text-sm font-bold text-red-500 uppercase">
                {dateMonth}
              </span>
              <span className="text-xl font-bold text-gray-900 leading-none">
                {dateDay}
              </span>
            </div>
          </div>
        )}

        <div className="p-5">
          {/* Event Details */}
          <div className="flex gap-4">
            {!post.images?.length && (
              <div className="flex-shrink-0 w-14 h-14 bg-blue-50 text-blue-600 rounded-lg flex flex-col items-center justify-center border border-blue-100">
                <span className="text-sm font-bold uppercase">{dateMonth}</span>
                <span className="text-xl font-bold leading-none">
                  {dateDay}
                </span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="text-lg font-bold text-gray-900 leading-tight">
                  {name}
                </h3>
              </div>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {description}
              </p>

              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center gap-2.5">
                  <FiClock className="w-4 h-4 text-gray-400" />
                  <span>{time}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <FiMapPin className="w-4 h-4 text-gray-400" />
                  <span className="break-all">{location}</span>
                </div>
                {/* 
                <div className="flex items-center gap-2.5">
                  <FiUsers className="w-4 h-4 text-gray-400" />
                  <span>{post.attendees || 0} Attending</span>
                </div>
                */}
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-t border-gray-100">
          <div className="flex -space-x-2">
            {/* Placeholder for attendees avatars if available */}
          </div>
          {/* <button className="px-6 py-2 bg-[#240457] text-white rounded-lg font-semibold text-sm hover:bg-[#1a0340] transition-colors shadow-sm w-full sm:w-auto">
            View Details
          </button> */}
        </div>
      </div>
    );
  }

  // Document Post Type
  if (post.type === "file" || (post.type === "post" && post.file)) {
    const file = post.file || {};
    const fileExtension = file.name?.split(".").pop().toUpperCase() || "DOC";

    const handleDownload = () => {
      if (file.url) {
        window.open(file.url, "_blank");
      } else {
        alert("File URL not found");
      }
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {/* Author Header */}
        {post.authorId && (
          <div className="flex items-start justify-between mb-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/images/Portrait_Placeholder.png";
                  }}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-gray-900">
                  {author.name}
                </h4>
                <div className="flex items-center text-sm text-gray-500 gap-1">
                  <span>{author.role}</span>
                  <span>•</span>
                  <span>{formatTimeAgo(post.createdAt)}</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiMoreHorizontal size={20} />
              </button>
              {showOptions && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowOptions(false)}
                  />
                  <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48">
                    {isPostAuthor() && (
                      <button
                        onClick={() => {
                          setShowOptions(false);
                          handleDelete();
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        Delete Post
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Document Card */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          {/* File Icon */}
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-green-600 text-sm font-bold">
              {fileExtension}
            </span>
          </div>

          {/* Document Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 mb-1">
              {file.name || "Untitled Document"}
            </h3>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {post.content || post.description || "No description"}
            </p>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <FiDownload className="w-3 h-3" />
              <span>
                {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                {post.downloads || 0} Downloads
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-4 py-2 hover:bg-gray-50 rounded-lg text-gray-600 text-sm font-medium transition-colors flex items-center gap-2"
            >
              <FiEye className="w-4 h-4" />
              <span>Preview</span>
            </button>
          </div>
          <button
            onClick={handleDownload}
            className="px-4 py-2 bg-[#240457] text-white rounded-lg font-semibold text-sm hover:bg-[#1a0340] transition-colors flex items-center gap-2"
          >
            <FiDownload className="w-4 h-4" />
            <span>Download</span>
          </button>
        </div>
      </div>
    );
  }

  // Poll Post Type
  if (post.type === "poll" && post.poll) {
    const { question, options, duration } = post.poll;
    const [selectedOption, setSelectedOption] = useState(null);
    const [hasVoted, setHasVoted] = useState(false);
    const [pollOptions, setPollOptions] = useState(options || []);

    const totalVotes = pollOptions.reduce(
      (sum, opt) => sum + (opt.votes || 0),
      0,
    );
    const isPollExpired = duration && new Date(duration) < new Date();

    const handleVote = async (optionIndex) => {
      if (hasVoted || isPollExpired) return;

      try {
        // Optimistic update
        const newOptions = [...pollOptions];
        newOptions[optionIndex].votes =
          (newOptions[optionIndex].votes || 0) + 1;
        setPollOptions(newOptions);
        setSelectedOption(optionIndex);
        setHasVoted(true);

        // TODO: Call API to record vote
        // const response = await postsAPI.votePoll(post._id, optionIndex);
      } catch (error) {
        console.error("Error voting on poll:", error);
        // Revert on error
        setPollOptions(options);
        setSelectedOption(null);
        setHasVoted(false);
      }
    };

    const formatDuration = (dateString) => {
      if (!dateString) return "No expiration";
      const date = new Date(dateString);
      const now = new Date();
      const diff = date - now;

      if (diff < 0) return "Poll ended";

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );

      if (days > 0) return `${days} day${days > 1 ? "s" : ""} left`;
      if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} left`;
      return "Less than 1 hour left";
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        {/* Author Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={author.image}
                alt={author.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/images/Portrait_Placeholder.png";
                }}
              />
            </div>
            <div>
              <h4 className="text-sm font-bold text-gray-900">{author.name}</h4>
              <div className="flex items-center text-sm text-gray-500 gap-1">
                <span>{author.role}</span>
                <span>•</span>
                <span>{formatTimeAgo(post.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowOptions(!showOptions)}
              className="text-gray-400 hover:text-gray-600"
            >
              <FiMoreHorizontal size={20} />
            </button>
            {showOptions && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowOptions(false)}
                />
                <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48">
                  {isPostAuthor() && (
                    <button
                      onClick={() => {
                        setShowOptions(false);
                        handleDelete();
                      }}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <FiTrash2 className="w-4 h-4" />
                      Delete Post
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Poll Question */}
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{question}</h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiClock className="w-4 h-4" />
            <span>{formatDuration(duration)}</span>
            <span>•</span>
            <span>
              {totalVotes} vote{totalVotes !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Poll Options */}
        <div className="space-y-3 mb-4">
          {pollOptions.map((option, index) => {
            const percentage =
              totalVotes > 0 ? ((option.votes || 0) / totalVotes) * 100 : 0;
            const isSelected = selectedOption === index;

            return (
              <button
                key={index}
                onClick={() => handleVote(index)}
                disabled={hasVoted || isPollExpired}
                className={`w-full text-left relative overflow-hidden rounded-lg border-2 transition-all ${
                  hasVoted
                    ? isSelected
                      ? "border-[#240457] bg-purple-50"
                      : "border-gray-200 bg-gray-50"
                    : "border-gray-200 hover:border-[#240457] hover:bg-purple-50"
                } ${isPollExpired ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {/* Progress Bar */}
                {hasVoted && (
                  <div
                    className={`absolute inset-0 ${isSelected ? "bg-purple-100" : "bg-gray-100"} transition-all`}
                    style={{ width: `${percentage}%` }}
                  />
                )}

                {/* Option Content */}
                <div className="relative px-4 py-3 flex items-center justify-between">
                  <span className="font-medium text-gray-900 text-sm">
                    {option.option}
                  </span>
                  {hasVoted && (
                    <span className="font-semibold text-gray-700 text-sm">
                      {percentage.toFixed(0)}%
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Tags */}
        {post.tags && (
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Tagged:</span> {post.tags}
            </p>
          </div>
        )}

        {/* Interactions Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2 pt-3 border-t border-gray-100">
          <span>
            {likeCount || 0} Likes • {post.commentCount || 0} Comments
          </span>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 mb-3" />

        {/* Action Buttons */}
        <div className="flex items-center justify-around">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm font-medium transition-colors ${liked ? "text-blue-600" : "text-gray-600"} disabled:opacity-50`}
          >
            {liked ? (
              <AiFillLike className="w-4 h-4" />
            ) : (
              <FiThumbsUp className="w-4 h-4" />
            )}
            <span>Like</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-gray-600 text-sm font-medium transition-colors"
          >
            <FiMessageSquare className="w-4 h-4" />
            <span>Comment</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-gray-600 text-sm font-medium transition-colors">
            <FiShare2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            {/* Comment Input */}
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                <img
                  src={
                    currentUser?.profilePayload?.imageProfile ||
                    currentUser?.profilePayload?.logo ||
                    "/assets/images/Portrait_Placeholder.png"
                  }
                  alt="Your profile"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/assets/images/Portrait_Placeholder.png";
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="relative">
                  <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full bg-gray-50 border text-black border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={1}
                    onInput={(e) => {
                      e.target.style.height = "auto";
                      e.target.style.height = e.target.scrollHeight + "px";
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleComment();
                      }
                    }}
                  />
                  {commentText.trim() && (
                    <button
                      onClick={handleComment}
                      disabled={isCommenting}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 disabled:opacity-50 text-sm font-medium"
                    >
                      {isCommenting ? "Posting..." : "Post"}
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Comments List */}
            {comments.length > 0 && (
              <div className="space-y-3">
                {comments.map((comment, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                      <img
                        src={
                          comment.userId?.imageProfile ||
                          comment.userId?.logo ||
                          "/assets/images/Portrait_Placeholder.png"
                        }
                        alt={
                          comment.userId?.fullName ||
                          comment.userId?.companyName ||
                          "User"
                        }
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src =
                            "/assets/images/Portrait_Placeholder.png";
                        }}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg px-3 py-2">
                        <h5 className="text-sm font-semibold text-gray-900 mb-1">
                          {comment.userId?.fullName ||
                            comment.userId?.companyName ||
                            "Anonymous User"}
                        </h5>
                        <p className="text-sm text-gray-700">
                          {comment.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                        <span>{formatTimeAgo(comment.commentedAt)}</span>
                        <button className="hover:text-gray-700">Like</button>
                        <button className="hover:text-gray-700">Reply</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View More Comments */}
            {(post.commentCount || 0) > comments.length && (
              <button
                onClick={() => {
                  handleLoadComments();
                }}
                className="text-sm text-gray-600 hover:text-gray-800 mt-3 font-medium"
              >
                View more comments ({(post.commentCount || 0) - comments.length}{" "}
                more)
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Regular Post (with optional image, video, or poll)
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Post Header */}
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          <img
            src={author.image}
            alt={author.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "/assets/images/Portrait_Placeholder.png";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-semibold text-gray-900">
                {author.name}
              </h4>
              <p className="text-sm text-gray-600">
                {author.role} • {formatTimeAgo(post.createdAt)}
                {post.isEdited && (
                  <>
                    <span> • </span>
                    <span className="text-sm">Edited</span>
                  </>
                )}
              </p>
            </div>

            {/* Options Menu */}
            <div className="relative">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded"
              >
                <FiMoreHorizontal size={20} />
              </button>

              {showOptions && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowOptions(false)}
                  />
                  <div className="absolute right-0 top-8 z-20 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-48">
                    {isPostAuthor() && (
                      <>
                        <button
                          onClick={handleEdit}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                          <FiEdit3 className="w-4 h-4" />
                          Edit Post
                        </button>
                        <button
                          onClick={() => {
                            setShowOptions(false);
                            handleDelete();
                          }}
                          className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                        >
                          <FiTrash2 className="w-4 h-4" />
                          Delete Post
                        </button>
                      </>
                    )}
                    <button className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                      Report Post
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Shared content indicator */}
          {post.images && post.images.length > 0 && (
            <p className="text-sm text-gray-600 mt-1">
              {author.name} shared a photo
            </p>
          )}
        </div>
      </div>

      {/* Post Content */}
      {post.content && (
        <div className="mb-3">
          {isEditing ? (
            <div className="space-y-3">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full text-black p-3 border border-gray-300 rounded-lg text-sm leading-relaxed resize-none focus:ring-2 focus:ring-[#240457] focus:border-transparent"
                rows={3}
                placeholder="Edit your post..."
                maxLength={1000}
              />
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  {editContent.length}/1000 characters
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelEdit}
                    disabled={isUpdating}
                    className="px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    disabled={isUpdating || !editContent.trim()}
                    className="px-3 py-1.5 text-sm bg-[#240457] text-white rounded-md hover:bg-[#1a0340] transition-colors disabled:opacity-50"
                  >
                    {isUpdating ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-gray-900 leading-relaxed whitespace-pre-wrap">
                {showReadMore && !isExpanded
                  ? post.content.substring(0, 180) + "..."
                  : post.content}
              </p>
              {showReadMore && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-1"
                >
                  {isExpanded ? "Show less" : "Read more..."}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Post Images */}
      {post.images && post.images.length > 0 && (
        <div className="mb-3 -mx-4">
          {post.images.length === 1 ? (
            <div className="relative w-full">
              <img
                src={post.images[0]}
                alt="Post"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-1">
              {post.images.slice(0, 4).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                  {index === 3 && post.images.length > 4 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-semibold">
                        +{post.images.length - 4} more
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Interactions Stats */}
      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span>
          {likeCount || 0} Likes • {post.commentCount || 0} Comments • 0 Shares
        </span>
      </div>

      {/* Divider */}
      <hr className="border-gray-200 mb-3" />

      {/* Action Buttons */}
      <div className="flex items-center justify-around">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-sm font-medium transition-colors ${liked ? "text-blue-600" : "text-gray-600"} disabled:opacity-50`}
        >
          {liked ? (
            <AiFillLike className="w-4 h-4" />
          ) : (
            <FiThumbsUp className="w-4 h-4" />
          )}
          <span>Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-gray-600 text-sm font-medium transition-colors"
        >
          <FiMessageSquare className="w-4 h-4" />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded text-gray-600 text-sm font-medium transition-colors">
          <FiShare2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          {/* Comment Input */}
          <div className="flex gap-3 mb-4">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={
                  currentUser?.profilePayload?.imageProfile ||
                  currentUser?.profilePayload?.logo ||
                  "/assets/images/Portrait_Placeholder.png"
                }
                alt="Your profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/assets/images/Portrait_Placeholder.png";
                }}
              />
            </div>
            <div className="flex-1">
              <div className="relative">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="w-full bg-gray-50 border text-black border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={1}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = e.target.scrollHeight + "px";
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleComment();
                    }
                  }}
                />
                {commentText.trim() && (
                  <button
                    onClick={handleComment}
                    disabled={isCommenting}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800 disabled:opacity-50 text-sm font-medium"
                  >
                    {isCommenting ? "Posting..." : "Post"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Comments List */}
          {comments.length > 0 && (
            <div className="space-y-3">
              {comments.map((comment, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={
                        comment.userId?.imageProfile ||
                        comment.userId?.logo ||
                        "/assets/images/Portrait_Placeholder.png"
                      }
                      alt={
                        comment.userId?.fullName ||
                        comment.userId?.companyName ||
                        "User"
                      }
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "/assets/images/Portrait_Placeholder.png";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg px-3 py-2">
                      <h5 className="text-sm font-semibold text-gray-900 mb-1">
                        {comment.userId?.fullName ||
                          comment.userId?.companyName ||
                          "Anonymous User"}
                      </h5>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span>{formatTimeAgo(comment.commentedAt)}</span>
                      <button className="hover:text-gray-700">Like</button>
                      <button className="hover:text-gray-700">Reply</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* View More Comments */}
          {(post.commentCount || 0) > comments.length && (
            <button
              onClick={() => {
                handleLoadComments();
              }}
              className="text-sm text-gray-600 hover:text-gray-800 mt-3 font-medium"
            >
              View more comments ({(post.commentCount || 0) - comments.length}{" "}
              more)
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;

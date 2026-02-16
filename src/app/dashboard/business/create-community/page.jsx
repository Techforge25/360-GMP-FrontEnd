"use client";
import React, { useState } from "react";
import { FiUpload, FiPlus, FiX, FiGlobe, FiLock } from "react-icons/fi";
import { LuCrown } from "react-icons/lu";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import communityAPI from "@/services/communityAPI";
import { useUser } from "@/context/UserContext";
import { uploadToCloudinary } from "@/lib/cloudinary";
import dynamic from "next/dynamic";

const SlateEditor = dynamic(() => import("@/components/ui/SlateEditor"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[150px] bg-gray-50 animate-pulse rounded-md border" />
  ),
});

export default function CreateCommunityPage() {
  const router = useRouter();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [purposeLength, setPurposeLength] = useState(0);
  const [rulesLength, setRulesLength] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    industry: "",
    category: "",
    shortDescription: "",
    purpose: JSON.stringify([
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ]),
    tags: [],
    rules: JSON.stringify([
      {
        type: "paragraph",
        children: [{ text: "" }],
      },
    ]),
    privacyType: "public",
    postingPermissions: "all",
    coverImage: null,
    accentColor: "#3F82EE",
    bannerTagline: "",
    region: "",
  });

  const [logoPreview, setLogoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [currentTag, setCurrentTag] = useState("");

  const popularTags = [
    "Innovation",
    "Networking",
    "Industry News",
    "Best Practices",
    "Technology",
  ];

  const exampleCommunities = [
    {
      name: "Automotive Manufacturing Network",
      industry: "Auto Parts & Manufacturing",
      description:
        "Connect with automotive professionals and suppliers worldwide",
    },
    {
      name: "Precision Engineering Community",
      industry: "Engineering",
      description:
        "Share technical insights and innovations in precision engineering",
    },
    {
      name: "Logistics & Supply Chain Hub",
      industry: "Logistics",
      description: "Optimize your supply chain with industry experts",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (formData.tags.length >= 3) {
      alert("Maximum 3 tags allowed");
      return;
    }
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleFileUpload = (field, file) => {
    if (file) {
      handleInputChange(field, file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "logo") {
          setLogoPreview(reader.result);
        } else if (field === "coverImage") {
          setCoverPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (field) => {
    handleInputChange(field, null);
    if (field === "logo") {
      setLogoPreview(null);
    } else if (field === "coverImage") {
      setCoverPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Creator = business profile (not user). Send businessProfileId so backend can set owner correctly.
      const businessProfileId =
        user?.businessId ||
        user?.profilePayload?._id ||
        user?.profiles?.businessProfileId ||
        user?.id;

      let payload = {
        name: formData.name,
        type: formData.privacyType,
        description: formData.shortDescription,
        businessId: user?.businessId,
      };

      // Add details for all community types
      payload = {
        ...payload,
        category: formData.category || formData.industry,
        purpose: formData.purpose,
        tags: formData.tags,
        rules: formData.rules,
        industry: formData.industry,
        region: formData.region,
      };

      // Upload images to Cloudinary (Universal for all types)
      if (formData.coverImage instanceof File) {
        console.log("📤 Uploading cover image to Cloudinary...");
        const coverImageUrl = await uploadToCloudinary(
          formData.coverImage,
          "communities/covers",
        );
        payload.coverImage = coverImageUrl;
        console.log("✅ Cover image uploaded:", coverImageUrl);
      }

      if (formData.logo instanceof File) {
        console.log("📤 Uploading profile image to Cloudinary...");
        const profileImageUrl = await uploadToCloudinary(
          formData.logo,
          "communities/profiles",
        );
        payload.profileImage = profileImageUrl;
        console.log("✅ Profile image uploaded:", profileImageUrl);
      }

      console.log("📤 Creating community with payload:", payload);

      // Call API
      const response = await communityAPI.create(payload);

      console.log("📥 API Response:", response);
      console.log("📥 Response data:", response?.data);

      if (response.success) {
        console.log("✅ Community created successfully:", response.data);
        // Navigate to communities page or the new community page
        router.push("/dashboard/business/communities");
      } else {
        console.error("❌ API returned success=false:", response);
      }
    } catch (error) {
      console.error("💥 Failed to create community:", error);
      console.error("💥 Error message:", error?.message);
      console.error("💥 Error response:", error?.response?.data);

      // Show user-friendly error
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to create community. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/assets/images/community-hero.png')] bg-cover bg-center"></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-700 mb-6">
            <Link
              href="/dashboard"
              className="hover:text-gray-900 flex items-center gap-1"
            >
              <IoChevronBack className="w-4 h-4" />
              Back
            </Link>
            <span className="text-gray-400">›</span>
            <Link
              href="/dashboard/business/communities"
              className="hover:text-gray-900"
            >
              Home
            </Link>
            <span className="text-gray-400">›</span>
            <span className="text-gray-900 font-medium">Create Community</span>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              Create a Community
            </h1>
            <p className="text-lg text-gray-700">
              Build a space for professionals to connect, learn, and
              collaborate.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Community Info */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Community Info
                </h2>

                {/* Community Name */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Community Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="eg. Automotive Manufacturing Network"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Short, clear and brand-friendly
                  </p>
                </div>

                {/* Community Logo */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Community Logo <span className="text-red-500">*</span>
                  </label>
                  {logoPreview ? (
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 group">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile("logo")}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <FiX className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <input
                        type="file"
                        id="logo-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload("logo", e.target.files[0])
                        }
                      />
                      <label htmlFor="logo-upload" className="cursor-pointer">
                        <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">
                          Upload
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Recommended: Square image, at least 400×400px
                        </p>
                        <p className="text-sm text-gray-500">
                          SVG, JPG, or PNG. Max file size 5MB.
                        </p>
                      </label>
                    </div>
                  )}
                </div>

                {/* Industry/Category */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Industry / Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      handleInputChange("industry", e.target.value)
                    }
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    required
                  >
                    <option value="">Select an industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Logistics">Logistics</option>
                    <option value="Automotive">Automotive</option>
                    <option value="Sports">Sports</option>
                  </select>
                </div>

                {/* Region */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Region (Optional)
                  </label>
                  <select
                    value={formData.region}
                    onChange={(e) =>
                      handleInputChange("region", e.target.value)
                    }
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  >
                    <option value="">Select a region</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="North America">North America</option>
                    <option value="South America">South America</option>
                    <option value="Africa">Africa</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="One-line explanation of what is this community about"
                    value={formData.shortDescription}
                    onChange={(e) =>
                      handleInputChange("shortDescription", e.target.value)
                    }
                    maxLength={120}
                    rows={2}
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {formData.shortDescription.length}/120 characters
                  </p>
                </div>
              </div>

              {/* Community Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Community Details
                </h2>

                {/* Community Purpose */}
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Community Purpose <span className="text-red-500">*</span>
                  </label>
                  <span
                    className={`text-sm ${purposeLength >= 5000 ? "text-red-500 font-medium" : "text-gray-500"}`}
                  >
                    {purposeLength}/5000 characters
                  </span>
                </div>
                <SlateEditor
                  value={formData.purpose}
                  onChange={(val) => handleInputChange("purpose", val)}
                  onLengthChange={(len) => setPurposeLength(len)}
                  placeholder="Why does this community exists? Who is it for? What value does it provide?"
                  maxLength={5000}
                  className="text-black"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Minimum 10 characters required
                </p>

                {/* Tags/Topics */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Tags / Topics (Optional)
                  </label>
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        placeholder={
                          formData.tags.length >= 3
                            ? "Maximum tags reached"
                            : "Add a tag and press enter"
                        }
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        disabled={formData.tags.length >= 3}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddTag();
                          }
                        }}
                        className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base disabled:bg-gray-50 disabled:cursor-not-allowed"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                        {formData.tags.length}/3
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddTag}
                      disabled={formData.tags.length >= 3}
                      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiPlus className="w-5 h-5 text-gray-700" />
                    </button>
                  </div>

                  {/* Added Tags */}
                  {formData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-red-600"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Popular Tags */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Popular Tags:</p>
                    <div className="flex flex-wrap gap-2">
                      {popularTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            if (formData.tags.length >= 3) {
                              alert("Maximum 3 tags allowed");
                              return;
                            }
                            if (!formData.tags.includes(tag)) {
                              setFormData((prev) => ({
                                ...prev,
                                tags: [...prev.tags, tag],
                              }));
                            }
                          }}
                          disabled={formData.tags.length >= 3}
                          className="px-3 py-1.5 bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-lg text-sm text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Rules & Guidelines */}
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Rules & Guidelines <span className="text-red-500">*</span>
                  </label>
                  <span
                    className={`text-sm ${rulesLength >= 5000 ? "text-red-500 font-medium" : "text-gray-500"}`}
                  >
                    {rulesLength}/5000 characters
                  </span>
                </div>
                <SlateEditor
                  value={formData.rules}
                  onChange={(val) => handleInputChange("rules", val)}
                  onLengthChange={(len) => setRulesLength(len)}
                  placeholder="Set clear expectation for community behavior and content..."
                  maxLength={5000}
                  className="text-black"
                />
                <div className="mt-1">
                  <p className="text-sm text-gray-500">
                    Minimum 10 characters required
                  </p>
                </div>
              </div>

              {/* Membership Settings */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Membership Settings
                </h2>

                {/* Privacy Settings */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-3">
                    Privacy Settings <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    {/* Public */}
                    <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                      <input
                        type="radio"
                        name="privacy"
                        value="public"
                        checked={formData.privacyType === "public"}
                        onChange={(e) =>
                          handleInputChange("privacyType", e.target.value)
                        }
                        className="mt-1 w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FiGlobe className="w-5 h-5 text-blue-600" />
                          <span className="font-medium text-gray-900">
                            Public
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Viewable by all, anyone can join to participate
                        </p>
                      </div>
                    </label>

                    {/* Private */}
                    <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                      <input
                        type="radio"
                        name="privacy"
                        value="private"
                        checked={formData.privacyType === "private"}
                        onChange={(e) =>
                          handleInputChange("privacyType", e.target.value)
                        }
                        className="mt-1 w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <FiLock className="w-5 h-5 text-purple-600" />
                          <span className="font-medium text-gray-900">
                            Private
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Join requests require approval from moderators
                        </p>
                      </div>
                    </label>

                    {/* Featured Only */}
                    <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-400 transition-colors has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50">
                      <input
                        type="radio"
                        name="privacy"
                        value="featured"
                        checked={formData.privacyType === "featured"}
                        onChange={(e) =>
                          handleInputChange("privacyType", e.target.value)
                        }
                        className="mt-1 w-5 h-5 text-blue-600"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <LuCrown className="w-5 h-5 text-yellow-600" />
                          <span className="font-medium text-gray-900">
                            Featured
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          Only Silver and Premium members can access
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Posting Permissions */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Posting Permissions <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.postingPermissions}
                    onChange={(e) =>
                      handleInputChange("postingPermissions", e.target.value)
                    }
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  >
                    <option value="all">All members</option>
                    <option value="moderators">Moderators only</option>
                    <option value="approved">Approved members</option>
                  </select>
                </div>
              </div>

              {/* Community Appearance */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Community Appearance
                </h2>

                {/* Cover Image */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Cover Image <span className="text-red-500">*</span>
                  </label>
                  {coverPreview ? (
                    <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 group">
                      <img
                        src={coverPreview}
                        alt="Cover preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFile("coverImage")}
                        className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Remove image"
                      >
                        <FiX className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
                      <input
                        type="file"
                        id="cover-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) =>
                          handleFileUpload("coverImage", e.target.files[0])
                        }
                      />
                      <label htmlFor="cover-upload" className="cursor-pointer">
                        <FiUpload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">
                          Click to upload cover image
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Recommended: 1200×300px
                        </p>
                      </label>
                    </div>
                  )}
                </div>

                {/* Highlight Color */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Highlight Color / Accent Color (Optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <input
                        type="color"
                        value={formData.accentColor}
                        onChange={(e) =>
                          handleInputChange("accentColor", e.target.value)
                        }
                        className="w-12 text-black h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                      />
                    </div>
                    <input
                      type="text"
                      value={formData.accentColor}
                      onChange={(e) =>
                        handleInputChange("accentColor", e.target.value)
                      }
                      className="flex-1 text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                      placeholder="#3F82EE"
                    />
                  </div>
                </div>

                {/* Banner Tagline */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Banner Tagline (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="A catchy tagline for your community header"
                    value={formData.bannerTagline}
                    onChange={(e) =>
                      handleInputChange("bannerTagline", e.target.value)
                    }
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-red-600">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      Fill in all required fields
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      href="/dashboard/business/communities"
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </Link>
                    {/* <button
                      type="button"
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      disabled={isSubmitting}
                    >
                      View as Public
                    </button> */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 bg-[#240457] text-white rounded-lg font-medium hover:bg-[#1a0340] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Creating...
                        </>
                      ) : (
                        "Create a Community"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Sidebar - Example Communities */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Example Communities
              </h3>
              <div className="space-y-4">
                {exampleCommunities.map((community, index) => (
                  <div
                    key={index}
                    className="pb-4 border-b border-gray-200 last:border-0 last:pb-0"
                  >
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {community.name}
                    </h4>
                    <p className="text-sm text-blue-600 italic mb-2">
                      {community.industry}
                    </p>
                    <p className="text-sm text-gray-600">
                      {community.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1a1a2e] text-white py-6 mt-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400">
              © 2025 360GMP. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

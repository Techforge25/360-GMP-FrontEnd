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
import CKEditorField from "@/components/ui/CKEditor";
import { popularTags } from "@/constants/index";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createCommunitySchema } from "@/validations/communities";

export default function CreateCommunityPage() {
  const router = useRouter();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    logo: null,
    industry: "",
    category: "",
    shortDescription: "",
    purpose: "",
    tags: [],
    rules: "",
    type: "public",
    postingPermissions: "all",
    coverImage: null,
    accentColor: "#3F82EE",
    bannerTagline: "",
    region: "",
  });

  const {
    setValue,
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createCommunitySchema),
    mode: "all",
    defaultValues: {
      name: "",
      logo: null,
      industry: "",
      category: "",
      shortDescription: "",
      purpose: "",
      tags: [],
      rules: "",
      privacyType: "public",
      postingPermissions: "all",
      coverImage: null,
      accentColor: "#3F82EE",
      bannerTagline: "",
      region: "",
    },
  });


  const tags = watch("tags");
  const [logoPreview, setLogoPreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  const [currentTag, setCurrentTag] = useState("");

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const handleAddTag = () => {
  //   if (formData.tags.length >= 3) {
  //     alert("Maximum 3 tags allowed");
  //     return;
  //   }
  //   if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       tags: [...prev.tags, currentTag.trim()],
  //     }));
  //     setCurrentTag("");
  //   }
  // };

  const handleAddTag = () => {
  const trimmedTag = currentTag.trim();

  if (tags.length >= 3) {
    alert("Maximum 3 tags allowed");
    return;
  }

  if (!trimmedTag) return;

  // if (!alphaNumericPattern.test(trimmedTag)) {
  //   alert("Tags can only contain letters, numbers, spaces, and hyphens");
  //   return;
  // }

  if (trimmedTag.length < 2 || trimmedTag.length > 30) {
    alert("Tag must be between 2 and 30 characters");
    return;
  }

  if (tags.some((tag) => tag.toLowerCase() === trimmedTag.toLowerCase())) {
    alert("Duplicate tag not allowed");
    return;
  }

  setValue("tags", [...tags, trimmedTag], { shouldValidate: true });
  setCurrentTag("");
};

const handleRemoveTag = (tagToRemove) => {
  setValue(
    "tags",
    tags.filter((tag) => tag !== tagToRemove),
    { shouldValidate: true }
  );
};




  // const handleRemoveTag = (tagToRemove) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     tags: prev.tags.filter((tag) => tag !== tagToRemove),
  //   }));
  // };

  const handleFileUpload = (field, file) => {
    if (file) {
      handleInputChange(field, file);
      uploadToCloudinary(
        file,
        field === "logo" ? "communities/profiles" : "communities/covers",
      ).then((url) => {
        handleInputChange(field, url);
        if (field === "logo") {
          setValue(field, url, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        } else if (field === "coverImage") {
          setValue(field, url, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
          });
        }
      });

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

  const onSubmit = async (data) => {
    console.log("Form data to submit:", data);
    // e.preventDefault();
    setIsSubmitting(true);

    try {
      let payload = {
        name: data.name,
        type: data.privacyType,
        description: data.shortDescription,
        businessId: data?.businessId,
      };

      // Add details for all community types
      payload = {
        ...payload,
        category: data.category,
        purpose: data.purpose,
        tags: data.tags,
        rules: data.rules,
        // industry: data.industry,
        region: data.region,
        profileImage: data.logo,
        coverImage: data.coverImage,
      };

      const response = await communityAPI.create(payload);

      if (response.success) {
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
      {/* Breadcrumb */}
      <div className="flex max-w-[1400px] mx-auto items-center gap-2 text-sm text-black px-6 pt-6 mb-6">
        <Link
          href="/dashboard/business/communities"
          className="hover:text-black flex items-center gap-1"
        >
          <IoChevronBack className="w-4 h-4" />
          Back
        </Link>
        <p className="text-gray-600 ">Home</p>
        <span className="text-brand-primary">
          <MdKeyboardArrowRight className="w-4 h-4" />
        </span>
        <span className="text-brand-primary font-medium">Create Community</span>
      </div>
      <div className="relative bg-gradient-to-r from-blue-400 via-blue-300 to-blue-200 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/assets/images/community-hero.png')] bg-cover bg-center"></div>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    {...register("name")}
                    className={`w-full text-black px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 text-base 
                    ${errors.name ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.name.message}
                    </p>
                  )}
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
                    {...register("category")}
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
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
                  {errors.industry && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.industry.message}
                    </p>
                  )}
                </div>

                {/* Region */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Region (Optional)
                  </label>
                  <select
                  {...register("region")}
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

                {
                  errors.region && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.region.message}
                    </p>
                  )
                }
                </div>

                {/* Short Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="One-line explanation of what is this community about"
                    {...register("shortDescription")}
                    maxLength={120}
                    rows={2}
                    className={`w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base resize-none ${errors.shortDescription ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors.shortDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.shortDescription.message}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-1">
                    {watch("shortDescription").length || 0}/120 characters
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
                </div>
                <Controller
                  name="purpose"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <CKEditorField
                      value={field.value}
                      onChange={(val) => field.onChange(val)}
                      placeholder="Detailed job description..."
                      maxLength={2000}
                    />
                  )}
                />
                {errors.purpose && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.purpose.message}
                  </p>
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Minimum 10 characters required
                </p>

                {/* Tags/Topics */}
                {/* <div className="mb-6">
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
                </div> */}




                <div className="mb-6">
  <label className="block text-sm font-medium text-gray-900 mb-2">
    Tags / Topics (Optional)
  </label>

  <div className="flex gap-2 mb-3">
    <div className="flex-1 relative">
      <input
        type="text"
        placeholder={
          tags.length >= 3
            ? "Maximum tags reached"
            : "Add a tag and press enter"
        }
        value={currentTag}
        onChange={(e) => setCurrentTag(e.target.value)}
        disabled={tags.length >= 3}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleAddTag();
          }
        }}
        className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base disabled:bg-gray-50 disabled:cursor-not-allowed"
      />

      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
        {tags.length}/3
      </span>
    </div>

    <button
      type="button"
      onClick={handleAddTag}
      disabled={tags.length >= 3}
      className="px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FiPlus className="w-5 h-5 text-gray-700" />
    </button>
  </div>

  {/* Added Tags */}
  {tags.length > 0 && (
    <div className="flex flex-wrap gap-2 mb-3">
      {tags.map((tag) => (
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
            if (tags.length >= 3) {
              alert("Maximum 3 tags allowed");
              return;
            }

            if (!tags.includes(tag)) {
              setValue("tags", [...tags, tag], { shouldValidate: true });
            }
          }}
          disabled={tags.length >= 3}
          className="px-3 py-1.5 bg-white border border-gray-300 hover:border-blue-400 hover:bg-blue-50 rounded-lg text-sm text-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {tag}
        </button>
      ))}
    </div>
  </div>

  {/* Error */}
  {errors.tags && (
    <p className="text-red-500 text-sm mt-1">
      {errors.tags.message}
    </p>
  )}
</div>














                {/* Rules & Guidelines */}
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Rules & Guidelines <span className="text-red-500">*</span>
                  </label>
                </div>
                <Controller
                  name="rules"
                  defaultValue=""
                  control={control}
                  render={({ field }) => (
                    <CKEditorField
                      value={field.value}
                      onChange={(val) => {
                        field.onChange(val);
                      }}
                      placeholder="Rules description..."
                      maxLength={2000}
                    />
                  )}
                />
                {errors.rules && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.rules.message}
                  </p>
                )}
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
                        checked={watch("type") === "public"}
                        {...register("type")}
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
                        checked={watch("type") === "private"}
                        {...register("type")}
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
                        checked={watch("type") === "featured"}
                        {...register("type")}
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
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.type.message}
                    </p>
                  )}
                </div>

                {/* Posting Permissions */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Posting Permissions <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("postingPermissions")}
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
                  {errors.coverImage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.coverImage.message}
                    </p>
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
                        {...register("accentColor")}
                        className="w-12 text-black h-12 rounded-lg border-2 border-gray-300 cursor-pointer"
                      />
                    </div>
                    <input
                      type="text"
                      {...register("accentColor")}
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
                    {...register("bannerTagline")}
                    className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  />
                </div>
              </div>

              {/* Form Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    <Link
                      href="/dashboard/business/communities"
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </Link>
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
        </div>
      </div>
    </div>
  );
}

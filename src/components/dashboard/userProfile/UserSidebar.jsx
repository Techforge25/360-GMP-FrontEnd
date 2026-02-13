"use client";
import React, { useState, useEffect } from "react";
import {
  FiMapPin,
  FiEdit2,
  FiMail,
  FiPhone,
  FiTrash2,
  FiPlus,
  FiDownload,
  FiEye,
  FiBriefcase,
  FiX,
  FiChevronRight,
} from "react-icons/fi";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import userProfileAPI from "@/services/userProfileAPI";
import workExperienceAPI from "@/services/workExperienceAPI";
import WorkExperienceModal from "./WorkExperienceModal";
import SocialLinkModal from "./SocialLinkModal";
import { uploadToCloudinary } from "@/lib/cloudinary";

const UserSidebar = () => {
  const [profileData, setProfileData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingContact, setIsEditingContact] = useState(false);
  const [isUpdatingContact, setIsUpdatingContact] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);
  const [workExperiences, setWorkExperiences] = useState([]);
  const [isLoadingExperiences, setIsLoadingExperiences] = useState(true);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [socialLinks, setSocialLinks] = useState([]);
  const [isLoadingSocialLinks, setIsLoadingSocialLinks] = useState(true);
  const [showSocialLinkModal, setShowSocialLinkModal] = useState(false);
  const [editingSocialLink, setEditingSocialLink] = useState(null);
  const [jobMatches, setJobMatches] = useState([]);
  const [isLoadingJobMatches, setIsLoadingJobMatches] = useState(true);
  const [contactForm, setContactForm] = useState({
    email: "",
    phone: "",
    location: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);
        const response = await userProfileAPI.getMyProfile();
        if (response?.data) {
          setProfileData(response.data);
          // Populate contact form with existing data
          setContactForm({
            email: response.data.email || "",
            phone: response.data.phone || "",
            location: response.data.location || "",
          });
        }
      } catch (error) {
        // Handle 404 errors gracefully (profile doesn't exist yet)
        if (error?.status === 404 || error?.statusCode === 404) {
          console.log("Profile not found - user hasn't created profile yet");
          setProfileData(null);
          return;
        }
        console.error("Failed to fetch user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchWorkExperiences = async () => {
      try {
        setIsLoadingExperiences(true);
        const response = await workExperienceAPI.getMyWorkExperiences();
        if (response?.data) {
          setWorkExperiences(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch work experiences:", error);
        setWorkExperiences([]);
      } finally {
        setIsLoadingExperiences(false);
      }
    };

    const fetchSocialLinks = async () => {
      try {
        setIsLoadingSocialLinks(true);
        const response = await userProfileAPI.getSocialLinks();
        if (response?.data) {
          setSocialLinks(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch social links:", error);
        setSocialLinks([]);
      } finally {
        setIsLoadingSocialLinks(false);
      }
    };

    const fetchJobMatches = async () => {
      try {
        setIsLoadingJobMatches(true);
        const response = await userProfileAPI.getJobMatches(1, 3);
        if (response?.data?.docs) {
          setJobMatches(response.data.docs);
        }
      } catch (error) {
        console.error("Failed to fetch job matches:", error);
        setJobMatches([]);
      } finally {
        setIsLoadingJobMatches(false);
      }
    };

    fetchUserProfile();
    fetchWorkExperiences();
    fetchSocialLinks();
    fetchJobMatches();
  }, []);

  const [showChecklistModal, setShowChecklistModal] = useState(false);

  // Calculate profile strength based on available data
  const calculateProfileStrength = () => {
    if (!profileData) return 0;

    let strength = 0;

    // Profile image (logo) - 10%
    if (profileData.logo) strength += 10;

    // Social Links - 10%
    if (socialLinks && socialLinks.length > 0) strength += 10;

    // Profile Banner - 10%
    if (profileData.banner) strength += 10;

    // User Info (fullName, bio) - 10%
    if (profileData.fullName && profileData.bio) strength += 10;

    // Contact info (email, phone, location) - 15%
    const contactFields = [
      profileData.email,
      profileData.phone,
      profileData.location,
    ].filter(Boolean);
    if (contactFields.length === 3) {
      strength += 15;
    } else if (contactFields.length === 2) {
      strength += 10;
    } else if (contactFields.length === 1) {
      strength += 5;
    }

    // Work experience - 15%
    if (workExperiences && workExperiences.length > 0) strength += 15;

    // Resume - 10%
    if (profileData.resumeUrl) strength += 10;

    // Education - 10%
    if (
      profileData.education &&
      (profileData.education.institution || profileData.education.degree)
    ) {
      strength += 10;
    }

    // Job Preferences (targetJob, employmentType, salary) - 10%
    const hasJobPreferences =
      profileData.targetJob ||
      (profileData.employmentType && profileData.employmentType.length > 0) ||
      (profileData.minSalary && profileData.maxSalary);
    if (hasJobPreferences) strength += 10;

    return Math.min(strength, 100); // Cap at 100%
  };

  const profileStrength = calculateProfileStrength();

  // Get missing items for the checklist
  const getMissingItems = () => {
    if (!profileData) return [];

    const missing = [];

    if (!profileData.logo) {
      missing.push({
        id: "logo",
        label: "Profile Photo",
        icon: (
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
            <FiPlus className="w-4 h-4" />
          </div>
        ),
        description: "Upload a professional photo to stand out.",
      });
    }

    if (!profileData.banner) {
      missing.push({
        id: "banner",
        label: "Profile Banner",
        icon: (
          <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
            <FiPlus className="w-4 h-4" />
          </div>
        ),
        description: "Add a banner image to personalize your profile.",
      });
    }

    if (!profileData.fullName || !profileData.bio) {
      missing.push({
        id: "info",
        label: "Summary & Bio",
        icon: (
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
            <FiEdit2 className="w-4 h-4" />
          </div>
        ),
        description: "Introduce yourself with a compelling bio.",
      });
    }

    const contactFields = [
      profileData.email,
      profileData.phone,
      profileData.location,
    ].filter(Boolean);
    if (contactFields.length < 3) {
      missing.push({
        id: "contact",
        label: "Contact Details",
        icon: (
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
            <FiPhone className="w-4 h-4" />
          </div>
        ),
        description: "Add your email, phone, and location info.",
      });
    }

    if (!workExperiences || workExperiences.length === 0) {
      missing.push({
        id: "experience",
        label: "Work Experience",
        icon: (
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
            <FiBriefcase className="w-4 h-4" />
          </div>
        ),
        description: "Showcase your career history and roles.",
      });
    }

    if (!profileData.resumeUrl) {
      missing.push({
        id: "resume",
        label: "Resume/CV",
        icon: (
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <FiPlus className="w-4 h-4" />
          </div>
        ),
        description: "Upload your latest resume for applications.",
      });
    }

    const hasEducation =
      profileData.education &&
      (profileData.education.institution || profileData.education.degree);
    if (!hasEducation) {
      missing.push({
        id: "education",
        label: "Education",
        icon: (
          <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
            <FiPlus className="w-4 h-4" />
          </div>
        ),
        description: "Add your academic background and degrees.",
      });
    }

    const hasJobPreferences =
      profileData.targetJob ||
      (profileData.employmentType && profileData.employmentType.length > 0) ||
      (profileData.minSalary && profileData.maxSalary);
    if (!hasJobPreferences) {
      missing.push({
        id: "preferences",
        label: "Job Preferences",
        icon: (
          <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <FiEye className="w-4 h-4" />
          </div>
        ),
        description: "Set your target job, salary, and work type.",
      });
    }

    if (!socialLinks || socialLinks.length === 0) {
      missing.push({
        id: "social",
        label: "Social Links",
        icon: (
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#240457]">
            <FiPlus className="w-4 h-4" />
          </div>
        ),
        description: "Add your LinkedIn or Portfolio links.",
      });
    }

    return missing;
  };

  const missingItems = getMissingItems();

  // Handle contact info editing
  const handleEditContact = () => {
    setContactForm({
      email: profileData?.email || "",
      phone: profileData?.phone || "",
      location: profileData?.location || "",
    });
    setIsEditingContact(true);
  };

  const handleCancelContactEdit = () => {
    setIsEditingContact(false);
    setContactForm({
      email: profileData?.email || "",
      phone: profileData?.phone || "",
      location: profileData?.location || "",
    });
  };

  const handleUpdateContact = async () => {
    try {
      setIsUpdatingContact(true);
      const response = await userProfileAPI.updateContactInfo(contactForm);
      if (response?.data) {
        setProfileData((prev) => ({
          ...prev,
          email: response.data.email,
          phone: response.data.phone,
          location: response.data.location,
        }));
        setIsEditingContact(false);
      }
    } catch (error) {
      console.error("Failed to update contact info:", error);
      alert("Failed to update contact information. Please try again.");
    } finally {
      setIsUpdatingContact(false);
    }
  };

  const handleContactFormChange = (field, value) => {
    setContactForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle checklist item clicks
  const handleChecklistItemClick = (itemId) => {
    // Close checklist modal first
    setShowChecklistModal(false);

    // Trigger specific action based on item ID
    switch (itemId) {
      case "experience":
        handleAddExperience();
        break;
      case "social":
        handleAddSocialLink();
        break;
      case "resume":
        document.getElementById("resume-upload")?.click();
        break;
      case "contact":
        handleEditContact();
        break;
      case "logo":
      case "banner":
      case "info":
      case "education":
      case "preferences":
        // Scroll to top for general profile fields as they are usually in the main form
        window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      default:
        break;
    }
  };

  // Handle resume upload
  const handleResumeUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!allowedTypes.includes(file.type)) {
      alert("Please upload a PDF, Word document, or image (JPG, PNG)");
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size must be less than 5MB");
      return;
    }

    try {
      setIsUploadingResume(true);

      // Upload to Cloudinary
      const resumeUrl = await uploadToCloudinary(file, "user/resume");

      const response = await userProfileAPI.updateResume({ resumeUrl });
      if (response?.data) {
        // Support both object response and string response
        const newUrl =
          response.data.resumeUrl ||
          (typeof response.data === "string" ? response.data : resumeUrl);

        setProfileData((prev) => ({
          ...prev,
          resumeUrl: newUrl,
        }));

        // Optional: Re-fetch profile to ensure everything (like updatedAt) is in sync
        const freshProfile = await userProfileAPI.getMyProfile();
        if (freshProfile?.data) {
          setProfileData(freshProfile.data);
        }
      }
    } catch (error) {
      console.error("Failed to upload resume:", error);
      alert("Failed to upload resume. Please try again.");
    } finally {
      setIsUploadingResume(false);
      // Clear the input so the same file can be selected again
      if (event.target) {
        event.target.value = "";
      }
    }
  };

  const handleDeleteResume = async () => {
    if (!confirm("Are you sure you want to delete your resume?")) return;

    try {
      const response = await userProfileAPI.updateResume({ resumeUrl: "" });
      if (response?.data || response?.status === 200) {
        setProfileData((prev) => ({
          ...prev,
          resumeUrl: null,
        }));
      }
    } catch (error) {
      console.error("Failed to delete resume:", error);
      alert("Failed to delete resume. Please try again.");
    }
  };

  const handleGenerateResume = async () => {
    try {
      const response = await userProfileAPI.generateResume();

      // Create blob from response
      const blob = new Blob([response], { type: "application/pdf" });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${profileData?.fullName || "User"}-Resume-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to generate resume:", error);
      alert("Failed to generate resume. Please try again.");
    }
  };

  // Work Experience Management - Only Add functionality
  const handleAddExperience = () => {
    setEditingExperience(null);
    setShowExperienceModal(true);
  };

  const handleSaveExperience = async (experienceData) => {
    try {
      // Only create new experience from sidebar
      const response = await workExperienceAPI.create(experienceData);
      if (response?.data) {
        // Fetch updated list
        const updatedResponse = await workExperienceAPI.getMyWorkExperiences();
        if (updatedResponse?.data) {
          setWorkExperiences(updatedResponse.data);
        }
        // Dispatch event to notify UserExperience component to refresh
        window.dispatchEvent(new CustomEvent("workExperienceUpdated"));
      }
      setShowExperienceModal(false);
    } catch (error) {
      console.error("Failed to save work experience:", error);
      throw error;
    }
  };

  const handleDeleteExperience = async (experienceId) => {
    if (!confirm("Are you sure you want to delete this work experience?"))
      return;

    try {
      await workExperienceAPI.delete(experienceId);
      setWorkExperiences((prev) =>
        prev.filter((exp) => exp._id !== experienceId),
      );
    } catch (error) {
      console.error("Failed to delete work experience:", error);
      alert("Failed to delete work experience. Please try again.");
    }
  };

  // Social Links Management
  const handleAddSocialLink = () => {
    setEditingSocialLink(null);
    setShowSocialLinkModal(true);
  };

  const handleEditSocialLink = (link) => {
    setEditingSocialLink(link);
    setShowSocialLinkModal(true);
  };

  const handleSaveSocialLink = async (linkData) => {
    try {
      if (editingSocialLink) {
        // Update existing link
        const response = await userProfileAPI.updateSocialLink(
          editingSocialLink._id,
          linkData,
        );
        if (response?.data) {
          setSocialLinks((prev) =>
            prev.map((link) =>
              link._id === editingSocialLink._id ? response.data : link,
            ),
          );
        }
      } else {
        // Create new link
        const response = await userProfileAPI.createSocialLink(linkData);
        if (response?.data) {
          setSocialLinks((prev) => [...prev, response.data]);
        }
      }
      setShowSocialLinkModal(false);
      setEditingSocialLink(null);
    } catch (error) {
      console.error("Failed to save social link:", error);
      throw error; // Let modal handle the error display
    }
  };

  const handleDeleteSocialLink = async (linkId) => {
    if (!confirm("Are you sure you want to delete this social link?")) return;

    try {
      await userProfileAPI.deleteSocialLink(linkId);
      setSocialLinks((prev) => prev.filter((link) => link._id !== linkId));
    } catch (error) {
      console.error("Failed to delete social link:", error);
      alert("Failed to delete social link. Please try again.");
    }
  };

  const socialIcons = {
    linkedin: FaLinkedinIn,
    twitter: FaTwitter,
    facebook: FaFacebookF,
    instagram: FaInstagram,
    github: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
    website: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    ),
    other: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
      </svg>
    ),
  };

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        {/* Profile Strength */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 text-center">
          <div className="flex items-center gap-1.5 sm:gap-2 justify-center mb-1.5 sm:mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-[#240457]">
              Profile Strength
            </h3>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5 sm:mb-2">
            {profileStrength}%
          </p>

          <div className="w-full bg-gray-100 rounded-full h-2 sm:h-2.5 mb-4 sm:mb-6">
            <div
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 sm:h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${profileStrength}%` }}
            ></div>
          </div>

          <button
            onClick={() => setShowChecklistModal(true)}
            className="w-full bg-[#240457] text-white py-2 sm:py-2.5 rounded-lg text-sm sm:text-sm font-medium hover:bg-[#240457] transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
          >
            <span className="hidden sm:inline">Complete Your Profile</span>
            <span className="sm:hidden">Complete Profile</span>
            <svg
              width="14"
              height="14"
              className="sm:w-4 sm:h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 relative">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Contact Info
            </h3>
            <button
              onClick={
                isEditingContact ? handleCancelContactEdit : handleEditContact
              }
              disabled={isUpdatingContact}
              className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-md transition-colors text-gray-400 disabled:opacity-50"
            >
              <FiEdit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          <div className="space-y-3 sm:space-y-4 bg-gray-50/50 rounded-lg p-3 sm:p-4">
            {isLoading ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
                </div>
              </div>
            ) : profileData ? (
              <>
                {isEditingContact ? (
                  <div className="space-y-3">
                    {/* Email Input */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#240457]">
                        <FiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) =>
                          handleContactFormChange("email", e.target.value)
                        }
                        placeholder="Enter email"
                        className="flex-1 text-sm sm:text-sm text-gray-600 bg-white border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#240457]"
                      />
                    </div>
                    {/* Phone Input */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#240457]">
                        <FiPhone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <input
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) =>
                          handleContactFormChange("phone", e.target.value)
                        }
                        placeholder="Enter phone number"
                        className="flex-1 text-sm sm:text-sm text-gray-600 bg-white border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#240457]"
                      />
                    </div>
                    {/* Location Input */}
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#240457]">
                        <FiMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <input
                        type="text"
                        value={contactForm.location}
                        onChange={(e) =>
                          handleContactFormChange("location", e.target.value)
                        }
                        placeholder="Enter location"
                        className="flex-1 text-sm sm:text-sm text-gray-600 bg-white border border-gray-200 rounded px-2 py-1 focus:outline-none focus:border-[#240457]"
                      />
                    </div>
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={handleUpdateContact}
                        disabled={isUpdatingContact}
                        className="flex-1 bg-[#240457] text-white py-1.5 rounded text-sm font-medium hover:bg-[#240457]/90 transition-colors disabled:opacity-50"
                      >
                        {isUpdatingContact ? "Updating..." : "Save"}
                      </button>
                      <button
                        onClick={handleCancelContactEdit}
                        disabled={isUpdatingContact}
                        className="flex-1 bg-gray-200 text-gray-700 py-1.5 rounded text-sm font-medium hover:bg-gray-300 transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {profileData.email && (
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#240457]">
                          <FiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-sm sm:text-sm text-gray-600 truncate">
                          {profileData.email}
                        </span>
                      </div>
                    )}
                    {profileData.phone && (
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#240457]">
                          <FiPhone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-sm sm:text-sm text-gray-600">
                          {profileData.phone}
                        </span>
                      </div>
                    )}
                    {profileData.location && (
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-50 flex items-center justify-center text-[#240457]">
                          <FiMapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-sm sm:text-sm text-gray-600">
                          {profileData.location}
                        </span>
                      </div>
                    )}
                    {!profileData.email &&
                      !profileData.phone &&
                      !profileData.location && (
                        <p className="text-sm sm:text-sm text-gray-500 text-center py-4">
                          No contact information available. Click edit to add.
                        </p>
                      )}
                  </>
                )}
              </>
            ) : (
              <p className="text-sm sm:text-sm text-gray-500 text-center py-4">
                No profile found. Please complete your profile setup.
              </p>
            )}
          </div>

          <div className="mt-4 sm:mt-6">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <p className="text-sm sm:text-sm text-gray-500">Social Media</p>
              <button
                onClick={handleAddSocialLink}
                className="text-[#240457] hover:text-[#240457]/80 p-1"
                title="Add Social Link"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>

            {isLoadingSocialLinks ? (
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-200 animate-pulse"
                  ></div>
                ))}
              </div>
            ) : socialLinks.length > 0 ? (
              <div className="space-y-2">
                {socialLinks.map((link, index) => {
                  const IconComponent = socialIcons[link.platformName];
                  return (
                    <div
                      key={link._id || `social-link-${index}`}
                      className="flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#ECEFF6] flex items-center justify-center text-[#240457]">
                          {IconComponent ? (
                            <IconComponent />
                          ) : (
                            <FiMail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 capitalize">
                            {link.platformName}
                          </p>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800 truncate block"
                          >
                            {link.url}
                          </a>
                        </div>
                      </div>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditSocialLink(link)}
                          className="text-gray-400 hover:text-blue-600 p-1"
                          title="Edit"
                        >
                          <FiEdit2 className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDeleteSocialLink(link._id)}
                          className="text-gray-400 hover:text-red-600 p-1"
                          title="Delete"
                        >
                          <FiTrash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No social links added yet.
              </p>
            )}
          </div>
        </div>

        {/* Resume Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
            Resume
          </h3>

          {isLoading ? (
            <div className="border border-gray-200 rounded-lg p-2.5 sm:p-3 flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="bg-gray-200 p-1.5 sm:p-2 rounded animate-pulse w-8 h-8 sm:w-10 sm:h-10"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-16 mb-1 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
              <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ) : profileData?.resumeUrl ? (
            <div className="border border-gray-200 rounded-lg p-2.5 sm:p-3 flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="bg-gray-100 p-1.5 sm:p-2 rounded">
                  <svg
                    width="20"
                    height="20"
                    className="sm:w-6 sm:h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-gray-500"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div>
                  <p className="text-sm sm:text-sm font-medium text-gray-900">
                    Resume
                  </p>
                  <p className="text-sm sm:text-sm text-gray-500">
                    {profileData.updatedAt
                      ? `Updated ${new Date(profileData.updatedAt).toLocaleDateString()}`
                      : "Available"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={profileData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-700 p-1"
                  title="View Uploaded Resume"
                >
                  <FiEye className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : (
            <div className="border border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center mb-3 sm:mb-4">
              <div className="text-gray-400 mb-2">
                <svg
                  width="32"
                  height="32"
                  className="mx-auto"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <p className="text-sm sm:text-sm text-gray-500">
                No resume uploaded yet
              </p>
            </div>
          )}

          <div className="relative">
            <input
              type="file"
              accept=".pdf,.doc,.docx,image/*"
              onChange={handleResumeUpload}
              className="hidden"
              id="resume-upload"
            />
            <button
              onClick={() => document.getElementById("resume-upload")?.click()}
              disabled={isUploadingResume}
              className="w-full bg-[#240457] text-white py-2 sm:py-2.5 rounded-lg text-sm sm:text-sm font-medium hover:bg-[#240457] transition-colors flex items-center justify-center gap-1.5 sm:gap-2 disabled:opacity-50"
            >
              <span className="hidden sm:inline">
                {isUploadingResume
                  ? "Uploading..."
                  : profileData?.resumeUrl
                    ? "Update Resume/Portfolio"
                    : "Upload Resume/Portfolio"}
              </span>
              <span className="sm:hidden">
                {isUploadingResume
                  ? "Uploading..."
                  : profileData?.resumeUrl
                    ? "Update Resume"
                    : "Upload Resume"}
              </span>
              {!isUploadingResume && (
                <svg
                  width="14"
                  height="14"
                  className="sm:w-4 sm:h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
              )}
            </button>

            {/* Generate Resume Button */}
            <button
              onClick={handleGenerateResume}
              className="w-full mt-2 bg-green-600 text-white py-2 sm:py-2.5 rounded-lg text-sm sm:text-sm font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <FiDownload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Generate Resume from Profile</span>
            </button>
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
            <FiBriefcase className="w-4 h-4 sm:w-5 sm:h-5" />
            Work Experience
          </h3>

          <div className="mt-2 border-t border-gray-100 pt-3 sm:pt-4">
            <button
              onClick={handleAddExperience}
              className="w-full py-2 sm:py-2 border border-dashed border-gray-300 rounded-lg text-sm sm:text-sm font-medium text-gray-500 hover:text-[#240457] hover:border-[#240457] transition-all flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <FiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Add Work Experience</span>
              <span className="sm:hidden">Add Experience</span>
            </button>
          </div>
        </div>

        {/* Job Matches Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6">
          <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
            Job Matches
          </h3>

          {isLoadingJobMatches ? (
            <div className="space-y-2 sm:space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gray-200 animate-pulse"></div>
                    <div className="flex-1 min-w-0">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-1 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ) : jobMatches.length > 0 ? (
            <div className="space-y-2 sm:space-y-3">
              {jobMatches.slice(0, 3).map((job, index) => {
                const colors = [
                  "bg-orange-500",
                  "bg-teal-500",
                  "bg-blue-500",
                  "bg-purple-500",
                  "bg-green-500",
                ];
                const bgColor = colors[index % colors.length];
                const companyInitial =
                  job.businessProfileId?.businessName
                    ?.charAt(0)
                    .toUpperCase() || "J";

                return (
                  <div
                    key={job._id}
                    className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${bgColor} flex items-center justify-center text-white font-bold text-sm sm:text-base`}
                      >
                        {companyInitial}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-medium text-gray-900 truncate">
                          {job.jobTitle}
                        </p>
                        <p className="text-sm sm:text-sm text-gray-500">
                          {job.businessProfileId?.businessName ||
                            "Company Name"}
                        </p>
                      </div>
                    </div>
                    <svg
                      width="16"
                      height="16"
                      className="sm:w-5 sm:h-5 text-gray-400"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6">
              <div className="text-gray-400 mb-2">
                <svg
                  width="32"
                  height="32"
                  className="mx-auto"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
              </div>
              <p className="text-sm text-gray-500">No job matches found</p>
              <p className="text-sm text-gray-400 mt-1">
                Complete your profile to get better matches
              </p>
            </div>
          )}

          {/* View All Matches Button */}
          <button className="w-full mt-4 sm:mt-5 py-2.5 sm:py-3 border border-[#240457] text-[#240457] rounded-lg text-sm sm:text-base font-medium hover:bg-[#240457] hover:text-white transition-colors flex items-center justify-center gap-2">
            View All Matches
            <svg
              width="16"
              height="16"
              className="sm:w-5 sm:h-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Work Experience Modal */}
      {showExperienceModal && (
        <WorkExperienceModal
          isOpen={showExperienceModal}
          onClose={() => setShowExperienceModal(false)}
          onSave={handleSaveExperience}
          editingExperience={editingExperience}
        />
      )}

      {/* Social Link Modal */}
      {showSocialLinkModal && (
        <SocialLinkModal
          isOpen={showSocialLinkModal}
          onClose={() => setShowSocialLinkModal(false)}
          onSave={handleSaveSocialLink}
          editingLink={editingSocialLink}
        />
      )}

      {/* Profile Checklist Modal */}
      {showChecklistModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h2 className="text-xl font-bold text-[#240457]">
                  Profile Completion
                </h2>
                <p className="text-sm text-gray-500">
                  {100 - profileStrength}% left to reach full profile strength
                </p>
              </div>
              <button
                onClick={() => setShowChecklistModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 scrollbar-hide">
              {missingItems.length > 0 ? (
                <div className="space-y-4">
                  <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-2">
                    <p className="text-sm text-indigo-700 leading-relaxed">
                      Complete these sections to improve your visibility to
                      employers and get better job matches.
                    </p>
                  </div>

                  {missingItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleChecklistItemClick(item.id)}
                      className="w-full flex items-start text-left gap-4 p-4 rounded-xl border border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/50 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="shrink-0 mt-0.5 relative z-10">
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0 relative z-10">
                        <h4 className="text-sm font-bold text-gray-900 mb-0.5 group-hover:text-indigo-600 transition-colors">
                          {item.label}
                        </h4>
                        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                          {item.description}
                        </p>
                      </div>
                      <div className="self-center relative z-10 translation-transform group-hover:translate-x-1 duration-200">
                        <FiChevronRight className="w-5 h-5 text-gray-300 group-hover:text-indigo-500 transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 px-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                    <FiCheck size={32} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    Profile Complete!
                  </h3>
                  <p className="text-gray-500">
                    Excellent work! Your profile is 100% complete and optimized
                    for success.
                  </p>
                </div>
              )}
            </div>

            <div className="p-5 border-t border-gray-100">
              <button
                onClick={() => setShowChecklistModal(false)}
                className="w-full bg-[#240457] text-white py-3 rounded-xl font-semibold hover:bg-[#1a0340] transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserSidebar;

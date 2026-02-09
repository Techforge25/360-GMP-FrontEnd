"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiMapPin,
  FiBriefcase,
  FiClock,
  FiDollarSign,
  FiShare2,
  FiBookmark,
  FiEdit,
} from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import jobAPI from "@/services/jobAPI";
import businessProfileAPI from "@/services/businessProfileAPI";
import JobApplicationModal from "@/components/dashboard/jobs/JobApplicationModal";
import { useUserRole } from "@/context/UserContext";

export default function JobDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const { id } = params;
  const { user } = useUserRole();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewTracked, setViewTracked] = useState(false); // Ref to ensure single tracking per mount

  // Determine if the current user is the business owner of this job
  const isBusinessOwner =
    user?.role === "business" && job?.businessId?._id === user?.id;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await jobAPI.getById(id);
        if (response.data && response.data.data) {
          setJob(response.data.data);
        } else {
          // Fallback if structure is different
          setJob(response.data || null);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch job details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  // Track view when job is loaded and user is not owner
  useEffect(() => {
    const trackView = async () => {
      if (job && job.businessId && user && !isBusinessOwner && !viewTracked) {
        try {
          const businessId = job.businessId._id || job.businessId; // Handle populated or raw ID

          // Only proceed if we have a valid business ID
          if (!businessId) return;

          setViewTracked(true); // Mark as tracked immediately to prevent double calls

          const response =
            await businessProfileAPI.viewBusinessProfile(businessId);

          if (response?.success && response?.data) {
            const businessData = response.data;
            const viewCount = businessData.viewsCount || 0;
            const uniqueViewers = businessData.viewedBy?.length || 0;

            console.log("=".repeat(60));
            console.log(
              `✅ Job Viewed -> Business Profile Tracked: ${businessData.companyName}`,
            );
            console.log(`📊 Total Business Views: ${viewCount}`);
            console.log(`👥 Unique Viewers: ${uniqueViewers}`);
            console.log(
              `ℹ️  Note: Tracking triggered by viewing job: ${job.jobTitle}`,
            );
            console.log("=".repeat(60));
          }
        } catch (err) {
          console.error(
            "❌ Failed to track business profile view from job:",
            err,
          );
        }
      }
    };

    trackView();
  }, [job, user, isBusinessOwner, viewTracked]);

  const getTimeAgo = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const diffInDays = Math.floor(diffInSeconds / 86400);

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    return `${diffInDays} Days Ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          {error || "Job Not Found"}
        </h2>
        <p className="text-text-secondary mb-6">
          The job posting you are looking for does not exist or has been
          removed.
        </p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  const business = job.businessId || {};
  const locationStr = job.location
    ? `${job.location.city || ""}, ${job.location.country || ""}`
    : "Location not specified";
  const salaryStr =
    job.salaryMin && job.salaryMax
      ? `$ ${job.salaryMin}-${job.salaryMax}/Month`
      : "Salary not specified";

  return (
    <div className="min-h-screen pb-20">
      {/* Gradient Header Section containing Back Button & Job Info */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 pb-10 pt-6">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div>
            <button
              onClick={() => router.back()}
              className="flex items-center text-black hover:text-text-primary transition-colors text-sm font-medium gap-2"
            >
              <FiArrowLeft /> Back
            </button>
          </div>

          {/* Job Header Info */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-white border border-border-light flex-shrink-0 relative overflow-hidden shadow-sm p-1">
                <div className="relative w-full h-full">
                  <Image
                    src={business.logo || "/assets/images/placeholder-logo.png"}
                    alt={business.companyName || "Company"}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-text-primary mb-1">
                  {job.jobTitle}
                </h1>
                <div className="flex flex-wrap items-center gap-x-2 text-sm md:text-base mb-3">
                  <span className="font-semibold text-brand-primary-light underline cursor-pointer hover:text-brand-primary">
                    {business.companyName}
                  </span>
                  <span className="text-text-secondary">•</span>
                  <span
                    className={`font-medium italic ${
                      job.status === "open" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {job.status === "open" ? "Active" : "Closed"}
                  </span>
                </div>

                <div>
                  <div className="flex flex-wrap items-center bg-white/80 backdrop-blur-sm border border-white/50 rounded-lg overflow-hidden text-sm text-text-secondary shadow-sm">
                    <div className="flex items-center gap-2 px-3 py-2">
                      <FiMapPin className="text-text-secondary" />
                      <span>{locationStr}</span>
                    </div>

                    <div className="w-px h-4 bg-border-light" />

                    <div className="flex items-center gap-2 px-3 py-2">
                      <FiBriefcase className="text-text-secondary" />
                      <span>{job.employmentType}</span>
                    </div>

                    <div className="w-px h-4 bg-border-light" />

                    <div className="flex items-center gap-2 px-3 py-2">
                      <FiClock className="text-text-secondary" />
                      <span>{getTimeAgo(job.createdAt)}</span>
                    </div>

                    <div className="w-px h-4 bg-border-light" />

                    <div className="flex items-center gap-2 px-3 py-2">
                      <FiDollarSign className="text-text-secondary" />
                      <span>{salaryStr}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full md:w-auto self-start md:self-center">
              {isBusinessOwner ? (
                <Button
                  onClick={() =>
                    router.push(`/dashboard/business/jobs/edit/${job._id}`)
                  }
                  className="w-full md:w-auto px-8 h-10 bg-[#2E1065] hover:bg-[#4c1d95] text-white rounded-lg flex items-center justify-center gap-2"
                >
                  <FiEdit /> Edit Job
                </Button>
              ) : (
                <Button
                  onClick={() => setIsModalOpen(true)}
                  disabled={job.status !== "open"}
                  className="w-full md:w-auto px-8 h-10 bg-[#2E1065] hover:bg-[#4c1d95] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {job.status === "open" ? "Apply Now" : "Position Closed"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Content (Description) */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 mt-4">
        <Card className="bg-white border-border-light shadow-sm min-h-[500px]">
          <CardContent className="p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-border-light">
              <h2 className="text-xl font-bold text-text-primary">
                Job Description
              </h2>
              <div className="flex items-center gap-2">
                <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-gray-50 rounded-full transition-colors">
                  <FiShare2 size={20} />
                </button>
                <button className="p-2 text-text-secondary hover:text-brand-primary hover:bg-gray-50 rounded-full transition-colors">
                  <FiBookmark size={20} />
                </button>
              </div>
            </div>

            <div className="space-y-8 text-text-secondary">
              <section>
                <div className="leading-relaxed whitespace-pre-wrap">
                  {job.description}
                </div>
              </section>
            </div>

            {/* Report Job - Subtle at bottom, only for non-owners */}
            {!isBusinessOwner && (
              <div className="mt-12 pt-6 border-t border-border-light">
                <Button
                  variant="outline"
                  className="text-base font-medium flex items-center gap-2 transition-colors px-4 py-2 rounded-lg"
                >
                  Report A Job
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {job && !isBusinessOwner && (
        <JobApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          jobTitle={job.jobTitle}
          jobId={job._id}
          onSubmit={(data) => {
            console.log("Application Submitted:", data);
            // Modal handles success state internally
          }}
        />
      )}
    </div>
  );
}

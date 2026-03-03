import { getDashboardPathForRole } from "@/lib/auth/session";

export const getTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} mins ago`;
  return "Just now";
};

export const mapLatestJobs = (jobs = []) =>
  jobs.map((job) => ({
    id: job._id,
    company: job.businessId?.companyName || "Unknown Company",
    logo: job.businessId?.logo || null,
    title: job.jobTitle,
    location: job.location
      ? `${job.location.city}, ${job.location.country}`
      : "Remote",
    type: job.employmentType,
    posted: getTimeAgo(job.createdAt),
  }));

export const getJobsBasePath = (role) =>
  `${getDashboardPathForRole(role)}/jobs`;

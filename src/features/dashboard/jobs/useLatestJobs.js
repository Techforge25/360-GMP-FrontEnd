"use client";

import { useEffect, useState } from "react";
import jobAPI from "@/services/jobAPI";
import { mapLatestJobs } from "@/features/dashboard/jobs/mappers";

export const useLatestJobs = (limit = 4) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await jobAPI.getLatestJobs(limit);

        if (response.success && response.data) {
          const jobsData = Array.isArray(response.data)
            ? response.data
            : response.data.jobs || response.data.docs || [];

          setJobs(mapLatestJobs(jobsData));
        } else {
          setJobs([]);
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
        setError("Failed to load jobs");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [limit]);

  return { jobs, loading, error };
};

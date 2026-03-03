"use client";

import { useEffect, useState } from "react";
import businessProfileAPI from "@/services/businessProfileAPI";
import { mapBusinessProfile } from "@/features/dashboard/businesses/mappers";

export const useFeaturedBusinesses = (limit = 6) => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessProfiles = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await businessProfileAPI.getAll({ limit });

        if (response.success && response.data) {
          const businessesData = response.data.docs || [];
          setBusinesses(businessesData.map(mapBusinessProfile));
        } else {
          setBusinesses([]);
        }
      } catch (err) {
        console.error("Failed to fetch business profiles:", err);
        setError(err.message || "Failed to load business profiles");
        setBusinesses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessProfiles();
  }, [limit]);

  return { businesses, loading, error };
};

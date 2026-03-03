"use client";

import { useEffect, useState } from "react";
import productAPI from "@/services/productAPI";
import { mapProductCard } from "@/features/dashboard/products/mappers";

export const useProductSectionsData = () => {
  const [featured, setFeatured] = useState([]);
  const [topRanking, setTopRanking] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const [featuredRes, topRankingRes, newProductsRes, flashDealsRes] =
          await Promise.all([
            productAPI.getFeatured(10),
            productAPI.getTopRanking(8),
            productAPI.getNewProducts(8),
            productAPI.getFlashDeals(4),
          ]);

        const nextFeatured =
          featuredRes.success && featuredRes.data?.docs?.length
            ? featuredRes.data.docs.map(mapProductCard)
            : [];

        const flashProducts =
          flashDealsRes.success && Array.isArray(flashDealsRes.data)
            ? flashDealsRes.data.map(mapProductCard)
            : [];

        const topProducts =
          topRankingRes.success && Array.isArray(topRankingRes.data)
            ? topRankingRes.data.map(mapProductCard)
            : [];

        const nextTopRanking = Array.from(
          new Map([...flashProducts, ...topProducts].map((item) => [item.id, item])).values(),
        );

        const nextNewProducts =
          newProductsRes.success && Array.isArray(newProductsRes.data)
            ? newProductsRes.data.map(mapProductCard)
            : [];

        setFeatured(nextFeatured);
        setTopRanking(nextTopRanking);
        setNewProducts(nextNewProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError(err.message || "Failed to load products");
        setFeatured([]);
        setTopRanking([]);
        setNewProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllProducts();
  }, []);

  return { featured, topRanking, newProducts, loading, error };
};

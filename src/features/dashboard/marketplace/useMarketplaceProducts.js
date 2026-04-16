"use client";

import { useCallback, useEffect, useState } from "react";
import productAPI from "@/services/productAPI";
import { buildMarketplaceQueryParams } from "@/features/dashboard/marketplace/helpers";
import { useUserRole } from "@/context/UserContext";

export const useMarketplaceProducts = ({
  query,
  searchedParam,
  selectedCategories,
  selectedCountry,
}) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [topRankingProducts, setTopRankingProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);


  const fetchMarketplaceProducts = useCallback(async () => {
    setLoading(true);
    setFilteredProducts([]);
    setAllProducts([]);
    try {
      const params = buildMarketplaceQueryParams({
        page: 1,
        limit: 8,
        query,
        searchedParam,
        selectedCategories,
        selectedCountry,
      });

      const [featuredRes, topRankingRes, newRes, flashRes, allRes] =
        await Promise.all([
          productAPI.getFeatured(6),
          productAPI.getTopRanking(20),
          productAPI.getNewProducts(20),
          productAPI.getFlashDeals(3),
          productAPI.getAll(params),
        ]);

      setFeaturedProducts(
        featuredRes.success ? featuredRes.data?.docs || featuredRes.data || [] : [],
      );

      const rawTopRanking = topRankingRes.success
        ? topRankingRes.data?.docs || topRankingRes.data || []
        : [];
      const rawFlashDeals = flashRes.success
        ? flashRes.data?.docs || flashRes.data || []
        : [];

      const uniqueTopRanking = Array.from(
        new Map(
          [...rawFlashDeals, ...rawTopRanking].map((product) => [
            product._id || product.id,
            product,
          ]),
        ).values(),
      );

      setTopRankingProducts(uniqueTopRanking);
      setFlashDeals(rawFlashDeals.slice(0, 3));
      setNewProducts(newRes.success ? newRes.data?.docs || newRes.data || [] : []);

      if (allRes.success) {
        const productsList = allRes.data?.docs || allRes.data || [];
        setFilteredProducts(productsList);
        setAllProducts(productsList);
        setHasMore(allRes.data?.hasNextPage || false);
        setPage(2);
      } else {
        setFilteredProducts([]);
        setAllProducts([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch marketplace data", error);
      setFilteredProducts([]);
      setAllProducts([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [query, selectedCategories, selectedCountry, searchedParam]);

  const loadMoreProducts = useCallback(async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const params = buildMarketplaceQueryParams({
        page,
        limit: 8,
        query,
        searchedParam,
        selectedCategories,
        selectedCountry,
      });

      const res = await productAPI.getAll(params);

      if (res.success && res.data) {
        const nextProducts =
          res.data.docs || (Array.isArray(res.data) ? res.data : []);

        setAllProducts((prev) => [...prev, ...nextProducts]);
        setFilteredProducts((prev) => [...prev, ...nextProducts]);
        setHasMore(res.data.hasNextPage || false);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to load more products", error);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, page, selectedCategories, selectedCountry]);

  useEffect(() => {
    fetchMarketplaceProducts();
  }, [selectedCategories, selectedCountry]);

  return {
    featuredProducts,
    topRankingProducts,
    newProducts,
    flashDeals,
    allProducts,
    filteredProducts,
    loading,
    loadingMore,
    hasMore,
    fetchMarketplaceProducts,
    loadMoreProducts,
  };
};

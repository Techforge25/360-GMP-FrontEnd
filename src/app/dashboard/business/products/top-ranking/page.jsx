"use client";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/navigation";
import productAPI from "@/services/productAPI";
import ProductFilterSidebar from "@/components/dashboard/businesses/products/ProductFilterSidebar";
import ProductListCard from "@/components/dashboard/businesses/products/ProductListCard";

export default function TopRankingProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchTopRankingProducts();
  }, []);

  const fetchTopRankingProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getTopRanking(100);

      if (response.success && Array.isArray(response.data)) {
        const transformedProducts = response.data.map(transformProduct);
        setProducts(transformedProducts);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Failed to fetch top ranking products:", err);
      setError(err.message || "Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const transformProduct = (product) => {
    return {
      id: product._id || product.productId,
      name: product.title || "Unnamed Product",
      description: product.detail || "No description",
      moq: `${product.minOrderQty || product.moq || 1} pc`,
      price: `$${product.pricePerUnit?.toFixed(2) || "0.00"}`,
      image: product.image || "/assets/images/Portrait_Placeholder.png",
      isNew: product.status === "new",
      businessId: product.businessId || product.business?._id,
    };
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setProducts(filtered);
    } else {
      fetchTopRankingProducts();
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pb-24">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <div className="animate-spin h-8 w-8 border-2 border-brand-primary border-t-transparent rounded-full mx-auto"></div>
            <p className="text-base text-gray-500 mt-4">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6 font-medium">
          <span
            onClick={() => router.push("/dashboard/business")}
            className="cursor-pointer hover:text-gray-700"
          >
            Dashboard
          </span>
          <span className="mx-1">&gt;</span>
          <span className="font-bold text-gray-900">Top Ranking Products</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-xl border border-gray-100 p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Top Ranking Products
          </h1>
          <p className="text-gray-500 text-sm">
            Highest priced premium products
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-10">
          <div className="flex w-full max-w-2xl bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
            <div className="flex items-center px-4 text-gray-400">
              <FiSearch className="text-lg" />
            </div>
            <input
              type="text"
              placeholder="Search Products By Name, Model, Or SKU.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="flex-1 py-3 px-2 outline-none text-sm text-gray-700 placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="bg-[#110026] text-white px-8 py-3 font-semibold text-sm hover:bg-[#2a0b4d] transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600 text-base text-center">
              <strong>Error:</strong> {error}
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <ProductFilterSidebar />

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Showing {products.length} Product
                {products.length !== 1 ? "s" : ""}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort By</span>
                <select className="border border-gray-200 rounded px-3 py-1.5 text-sm bg-white outline-none focus:border-indigo-500">
                  <option>Price: High to Low</option>
                  <option>Price: Low to High</option>
                  <option>Most Relevant</option>
                  <option>Newest First</option>
                </select>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-base">No products found</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((p) => (
                    <ProductListCard key={p.id} product={p} />
                  ))}
                </div>

                {/* Load More */}
                {products.length >= 20 && (
                  <div className="flex justify-center mt-12">
                    <button className="bg-[#110026] text-white px-8 py-3 rounded-lg font-semibold text-sm hover:bg-[#2a0b4d] transition-colors">
                      Load More
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

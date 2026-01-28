"use client";
import React, { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiSearch,
  FiMapPin,
  FiBriefcase,
  FiUsers,
  FiBox,
  FiShoppingBag,
  FiArrowRight,
} from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import businessProfileAPI from "@/services/businessProfileAPI";
import productAPI from "@/services/productAPI";
import jobAPI from "@/services/jobAPI";
import communityAPI from "@/services/communityAPI";
import { useUserRole } from "@/context/UserContext";

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";
  const initialTab = searchParams.get("type") || "all";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({
    businesses: [],
    products: [],
    communities: [],
    jobs: [],
  });

  const { user } = useUserRole();

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const commonParams = { search: query, limit: 10 };
        const locationParams = location ? { location } : {};

        // Parallel data fetching
        const [bizRes, prodRes, commRes, jobRes] = await Promise.allSettled([
          businessProfileAPI.getAll({ ...commonParams, ...locationParams }),
          productAPI.getAll({ ...commonParams }),
          communityAPI.getAll({ ...commonParams }),
          jobAPI.getAll({ ...commonParams, ...locationParams }),
        ]);

        const getDocs = (res) => {
          if (res.status !== "fulfilled" || !res.value.success) return [];
          const data = res.value.data;
          if (Array.isArray(data)) return data;
          if (data && Array.isArray(data.docs)) return data.docs;
          return [];
        };

        let businesses = getDocs(bizRes);
        // Client-side filtering for businesses if backend ignores search param
        if (query && businesses.length > 0) {
          const lowerQuery = query.toLowerCase();
          businesses = businesses.filter(
            (b) =>
              (b.companyName &&
                b.companyName.toLowerCase().includes(lowerQuery)) ||
              (b.description &&
                b.description.toLowerCase().includes(lowerQuery)),
          );
        }

        setResults({
          businesses: businesses,
          products: getDocs(prodRes),
          communities: getDocs(commRes),
          jobs: getDocs(jobRes),
        });
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };

    if (query || location) {
      fetchResults();
    }
  }, [query, location]);

  const tabs = [
    { id: "all", label: "All Results", icon: FiSearch },
    { id: "businesses", label: "Businesses", icon: BsBuilding },
    { id: "products", label: "Products", icon: FiBox },
    { id: "communities", label: "Communities", icon: FiUsers },
    { id: "jobs", label: "Jobs", icon: FiBriefcase },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    const params = new URLSearchParams(searchParams);
    if (tabId === "all") params.delete("type");
    else params.set("type", tabId);
    router.replace(`/dashboard/search?${params.toString()}`);
  };

  const ResultSection = ({ title, items, icon: Icon, type, linkPrefix }) => {
    if (!items || items.length === 0) return null;

    // Determine how many to show based on active tab
    const displayItems = activeTab === "all" ? items.slice(0, 4) : items;

    return (
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
            <Icon className="text-brand-primary" /> {title}
            <span className="text-base font-normal text-gray-500 ml-2">
              ({items.length} found)
            </span>
          </h2>
          {activeTab === "all" && items.length > 4 && (
            <Button
              variant="ghost"
              onClick={() => handleTabChange(type)}
              className="text-brand-primary hover:text-brand-primary-dark font-medium flex items-center gap-1"
            >
              View All <FiArrowRight />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {displayItems.map((item) => (
            <Card
              key={item._id}
              className="hover:shadow-md transition-all border-none shadow-sm bg-white"
            >
              <CardContent className="p-4 flex gap-4">
                {/* Image/Icon Placeholder */}
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden relative">
                  {item.image || item.coverImage || item.logo ? (
                    <img
                      src={item.image || item.coverImage || item.logo}
                      alt={item.name || item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <Icon size={24} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate pr-2">
                    {item.name || item.title || item.companyName}
                  </h3>

                  {/* Subtitle / Meta */}
                  <p className="text-base text-gray-500 mb-2 truncate">
                    {type === "businesses" && (item.industry || item.email)}
                    {type === "products" &&
                      `$${item.price} • ${item.category || "General"}`}
                    {type === "communities" &&
                      `${item.memberCount || 0} members • ${item.privacy || "Public"}`}
                    {type === "jobs" &&
                      (item.company?.companyName ||
                        (typeof item.location === "object"
                          ? `${item.location.city || ""}, ${item.location.country || ""}`
                          : item.location) ||
                        item.type)}
                  </p>

                  <div className="flex items-center gap-2">
                    <Link href={`${linkPrefix}/${item._id}`}>
                      <span className="text-sm font-medium text-indigo-600 hover:text-indigo-800 hover:underline">
                        View Details
                      </span>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const NoResults = () => (
    <div className="text-center py-16 bg-white rounded-xl shadow-sm">
      <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
        <FiSearch className="text-gray-300 text-3xl" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No results found
      </h3>
      <p className="text-gray-500">
        We couldn't find anything matching "<strong>{query}</strong>"
        {location && (
          <span>
            {" "}
            in "<strong>{location}</strong>"
          </span>
        )}
        .
      </p>
      <Button
        variant="outline"
        className="mt-6"
        onClick={() => router.push("/dashboard/" + (user?.role || "user"))}
      >
        Go back to Dashboard
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>
          <p className="text-gray-500 mt-2">
            Found results for{" "}
            <span className="font-semibold text-gray-900">"{query}"</span>
            {location && (
              <span className="ml-1">
                near{" "}
                <span className="font-semibold text-gray-900">
                  "{location}"
                </span>
              </span>
            )}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto pb-2 gap-2 mb-8 scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-full text-base font-medium transition-all whitespace-nowrap
                ${
                  activeTab === tab.id
                    ? "bg-indigo-900 text-white shadow-md"
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-900 mb-4"></div>
            <p className="text-gray-500">Searching across the platform...</p>
          </div>
        ) : (
          <div>
            {/* Show all or tabs based on activeTab */}
            {(activeTab === "all" || activeTab === "businesses") &&
              results.businesses.length > 0 && (
                <ResultSection
                  title="Businesses"
                  items={results.businesses}
                  icon={BsBuilding}
                  type="businesses"
                  linkPrefix="/dashboard/business/businesses"
                />
              )}

            {(activeTab === "all" || activeTab === "products") &&
              results.products.length > 0 && (
                <ResultSection
                  title="Products"
                  items={results.products}
                  icon={FiBox}
                  type="products"
                  linkPrefix="/dashboard/business/marketplace" // Adjust based on role? Or generic link.
                />
              )}

            {(activeTab === "all" || activeTab === "communities") &&
              results.communities.length > 0 && (
                <ResultSection
                  title="Communities"
                  items={results.communities}
                  icon={FiUsers}
                  type="communities"
                  linkPrefix="/community"
                />
              )}

            {(activeTab === "all" || activeTab === "jobs") &&
              results.jobs.length > 0 && (
                <ResultSection
                  title="Jobs"
                  items={results.jobs}
                  icon={FiBriefcase}
                  type="jobs"
                  linkPrefix="/dashboard/business/jobs"
                />
              )}

            {/* Empty State */}
            {Object.values(results).every((arr) => arr.length === 0) && (
              <NoResults />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={<div className="p-12 text-center">Loading search...</div>}
    >
      <SearchResults />
    </Suspense>
  );
}

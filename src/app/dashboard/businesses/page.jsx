"use client";
import React from "react";
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import Footer from "@/components/landing/Footer";
import BusinessHero from "@/components/dashboard/businesses/BusinessHero";
import BusinessCard from "@/components/dashboard/businesses/BusinessCard";
import FilterSidebar from "@/components/dashboard/businesses/FilterSidebar";
import { Button } from "@/components/ui/Button";
import { CiMenuBurger } from "react-icons/ci";

export default function BusinessesPage() {
  // Mock List Data
  const businesses = [
    {
      name: "TechVision Solutions",
      description:
        "TechVision Solutions is the world's B2B platform specializing in the wholesale supply and trade of advanced Electronic Components.",
      verified: true,
      location: "Sydney, Australia",
      rating: 4.8,
      category: "Manufacturing",
      established: "2012",
      stats: {
        minOrder: "100 Pcs",
        responseRate: ">95%",
        onTime: "98%",
        transactions: "500+",
        products: "200+",
      },
      logo: "/assets/images/profileLogo.png",
    },
    {
      name: "Aegis Precision Components",
      description:
        "A leading manufacturer of precision metal components, offering high-grade aerospace parts and automotive components.",
      verified: true,
      location: "Ottawa, Canada",
      rating: 4.9,
      category: "Custom Manufacturing",
      established: "2015",
      stats: {
        minOrder: "50 Units",
        responseRate: ">97%",
        onTime: "99%",
        transactions: "Supplier",
        products: "350+",
      },
      sponsored: true,
      logo: "/assets/images/profileLogo.png",
    },
    {
      name: "Varidian Industrial Solutions",
      description:
        "Dedicated industrial solutions provider aiming to streamline efficiency with top-tier machinery and tools.",
      verified: true,
      location: "Ottawa, Canada",
      rating: 4.5,
      category: "Custom Manufacturing",
      established: "2018",
      stats: {
        minOrder: "1 Unit",
        responseRate: ">90%",
        onTime: "95%",
        transactions: "Supplier",
        products: "200+",
      },
      logo: "/assets/images/profileLogo.png",
    },
    {
      name: "Quantum Composites",
      description:
        "Advanced composite manufacturing company specializing in lightweight and high-performance materials.",
      verified: true,
      location: "Ottawa, Canada",
      rating: 4.8,
      category: "Manufacturing",
      established: "2019",
      stats: {
        minOrder: "100 kg",
        responseRate: ">95%",
        onTime: "98%",
        transactions: "Supplier",
        products: "150+",
      },
      logo: "/assets/images/profileLogo.png",
    },
    {
      name: "Sterling Dynamics, Inc.",
      description:
        "Providing dynamic engineering solutions and consulting for the modern manufacturing era.",
      verified: true,
      location: "Ottawa, Canada",
      rating: 4.6,
      category: "Consulting",
      established: "2010",
      stats: {
        minOrder: "N/A",
        responseRate: ">92%",
        onTime: "96%",
        transactions: "Supplier",
        products: "210",
      },
      logo: "/assets/images/profileLogo.png",
    },
    {
      name: "Nova Forge Systems",
      description:
        "Specialized in forging heavy-duty metal parts for construction and mining equipment.",
      verified: true,
      location: "Ottawa, Canada",
      rating: 4.9,
      category: "Custom Manufacturing",
      established: "2008",
      stats: {
        minOrder: "10 Tons",
        responseRate: ">98%",
        onTime: "99%",
        transactions: "Supplier",
        products: "50+",
      },
      sponsored: true,
      logo: "/assets/images/profileLogo.png",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <AuthNavbar />

      <main className="pb-24">
        <BusinessHero />

        <div className="mx-auto px-4 sm:px-6 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <FilterSidebar />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  65,340 Registered Companies
                </h2>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-indigo-900 text-white text-xs"
                  >
                    <span className="mr-1">
                      <CiMenuBurger />
                    </span>{" "}
                    Map View
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {businesses.map((biz, i) => (
                  <BusinessCard key={i} business={biz} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center mt-12 gap-2">
                <button className="px-3 py-1 bg-gray-100 rounded text-gray-500 text-sm hover:bg-gray-200">
                  Prev
                </button>
                <button className="px-3 py-1 bg-indigo-900 text-white rounded text-sm">
                  1
                </button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 text-sm hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 text-sm hover:bg-gray-50">
                  4
                </button>
                <span className="text-gray-400">...</span>
                <button className="px-3 py-1 bg-white border border-gray-200 rounded text-gray-600 text-sm hover:bg-gray-50">
                  352
                </button>
                <button className="px-3 py-1 bg-gray-100 rounded text-gray-500 text-sm hover:bg-gray-200">
                  Next &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

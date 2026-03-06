"use client"
import { tags } from "@/constants/index";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { Button } from "../ui/Button";

export default function SearchInputs() {
     const router = useRouter();
     const [query, setQuery] = useState("");
     const [location, setLocation] = useState("");
     const [type, setType] = useState("");
     const handleSearch = () => {
          // Allow search if at least one field has input
          if (!query.trim() && !location.trim()) return;

          const params = new URLSearchParams();
          if (query.trim()) params.append("q", query.trim());
          if (location.trim()) params.append("location", location.trim());
          if (type.trim()) params.append("businessType", type.trim());

          router.push(`/dashboard/search?${params.toString()}`);
     };

     const handleKeyDown = (e) => {
          if (e.key === "Enter") {
               handleSearch();
          }
     };

     const handlePopularTagClick = (tag) => {
          setType(tag);
          // Trigger search with the new tag
          const params = new URLSearchParams();
          if (query.trim()) params.append("q", query.trim());
          if (location.trim()) params.append("location", location.trim());
          params.append("businessType", tag);
          router.push(`/dashboard/search?${params.toString()}`);
     };
     return (
          <>
               <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    {/* Business Search Input */}
                    <div className="flex-1 flex items-center gap-3 px-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                         <FiSearch className="text-gray-400 w-6 h-6 flex-shrink-0" />
                         <input
                              type="text"
                              placeholder="Businesses, products, communities..."
                              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                              value={query}
                              onChange={(e) => setQuery(e.target.value)}
                              onKeyDown={handleKeyDown}
                         />
                    </div>

                    {/* Location Input */}
                    <div className="flex-1 flex items-center gap-3 px-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all sm:max-w-xs">
                         <FiMapPin className="text-gray-400 w-5 h-5 flex-shrink-0" />
                         <input
                              type="text"
                              placeholder="City, country..."
                              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                              value={location}
                              onChange={(e) => setLocation(e.target.value)}
                              onKeyDown={handleKeyDown}
                         />
                    </div>

                    {/* Search Button */}
                    <Button
                         onClick={handleSearch}
                         className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl px-8 py-4 font-medium transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                         disabled={query === "" || location === ""}
                    >
                         Search
                    </Button>
               </div>

               <div className="flex flex-wrap items-center gap-3 justify-center">
                    <span className="text-gray-500 text-base font-medium">
                         Popular:
                    </span>
                    {tags.map((tag, index) => {
                         return (
                              <button
                                   onClick={() => handlePopularTagClick(tag)}
                                   key={index}
                                   className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-base rounded-full transition-colors font-medium"
                              >
                                   {tag}
                              </button>
                         )
                    })}
               </div>
          </>
     )
}
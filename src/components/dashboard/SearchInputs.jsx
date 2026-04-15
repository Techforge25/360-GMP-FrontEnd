"use client"
import { tags } from "@/constants/index";
import { useRouter } from "next/navigation";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { Button } from "../ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchSchema } from "@/validations/dashboard";

export default function SearchInputs() {
     const router = useRouter();
     const {
          register,
          watch,
          setValue,
          handleSubmit
     } = useForm({
          resolver: yupResolver(searchSchema),
          defaultValues: {
               query: "",
               location: "",
               type: ""
          }
     });

     const query = watch("query");
     const location = watch("location");

     const handleSearch = (data) => {
          if (!data.query.trim() && !data.location.trim()) return;
          router.push(
               `/dashboard/search?q=${encodeURIComponent(data.query.trim())}`
          );
     };
     const handleKeyDown = (e) => {

          if (
               !/^[a-zA-Z\s]$/.test(e.key) &&
               !["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(e.key)
          ) {
               e.preventDefault();
          }

          if (e.key === "Enter") {
               handleSubmit(handleSearch)();
          }
     };

     const handlePopularTagClick = (tag) => {
          router.push(
               `/dashboard/search?q=${encodeURIComponent(tag.trim())}`
          );
     };

     return (
          <>
               <div className="flex flex-col sm:flex-row gap-3 mb-6">

                    {/* Business Search Input */}
                    <div className="flex-1 flex items-center gap-3 px-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all">
                         <FiSearch className="text-gray-400 w-6 h-6 flex-shrink-0" />

                         <input
                              type="text"
                              placeholder="Search Businesses"
                              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                              {...register("query")}
                         />
                    </div>

                    {/* Location Input */}
                    <div className="flex-1 flex items-center gap-3 px-5 bg-white rounded-xl border border-gray-200 hover:border-gray-300 focus-within:border-purple-500 focus-within:ring-2 focus-within:ring-purple-100 transition-all sm:max-w-xs">
                         <FiMapPin className="text-gray-400 w-5 h-5 flex-shrink-0" />

                         <input
                              type="text"
                              placeholder="City, country..."
                              className="flex-1 bg-transparent border-none focus:outline-none text-sm text-gray-700 placeholder:text-gray-400"
                              {...register("location")}
                              onKeyDown={handleKeyDown}
                         />
                    </div>

                    {/* Search Button */}
                    <Button
                         onClick={handleSubmit(handleSearch)}
                         className="bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl px-8 py-4 font-medium transition-all shadow-md hover:shadow-lg whitespace-nowrap"
                    >
                         Search
                    </Button>
               </div >

               <div className="flex flex-wrap items-center gap-3 justify-center">
                    <span className="text-gray-500 text-base font-medium">
                         Popular:
                    </span>

                    {tags.map((tag, index) => (
                         <button
                              onClick={() => handlePopularTagClick(tag)}
                              key={index}
                              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-base rounded-full transition-colors font-medium"
                         >
                              {tag}
                         </button>
                    ))}
               </div>
          </>
     )
}
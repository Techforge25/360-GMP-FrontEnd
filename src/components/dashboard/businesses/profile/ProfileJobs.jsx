"use client";
import React, { useState, useEffect } from "react";
import { FiMapPin, FiClock } from "react-icons/fi";
import { BsBagCheck } from "react-icons/bs";
import { Button } from "@/components/ui/Button";
import jobAPI from "@/services/jobAPI";

export default function ProfileJobs({ jobs, businessId }) {
  const [recentJobs, setRecentJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (businessId) {
      fetchRecentJobs();
    }
  }, [businessId]);

  const fetchRecentJobs = async () => {
    try {
      setLoading(true);
      const response = await jobAPI.getAll({ businessId, limit: 2 });
      
      console.log("Recent Jobs API Response:", response);

      if (response.success && response.data) {
        const jobsData = response.data.docs || response.data || [];
        setRecentJobs(jobsData);
      }
    } catch (error) {
      console.error("Failed to fetch recent jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (date) => {
    if (!date) return "Recently";
    const now = new Date();
    const posted = new Date(date);
    const diffTime = Math.abs(now - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 7) return `${diffDays} Days Ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} Weeks Ago`;
    return `${Math.floor(diffDays / 30)} Months Ago`;
  };

  const dummyJobs = [
    {
      id: 1,
      title: "Social Media Marketer For Our Brand",
      company: "Tech Vision",
      location: "Ottawa-Canada",
      type: "Full Time",
      posted: "2 Days Ago",
      logo: "/assets/images/profileLogo.png" 
    },
    {
       id: 2,
      title: "PPC Expert",
      company: "Global Manufacturing Co.",
      location: "Ottawa-Canada",
      type: "Full Time",
      posted: "1 Month Ago",
      logo: "/assets/images/profileLogo.png" 
    }
  ];

  const jobsList = recentJobs.length > 0 ? recentJobs : (jobs || dummyJobs);

  if (loading) {
    return (
      <div className="rounded-xl p-6 border border-[#E6E6E6] mb-10">
        <h2 className="text-3xl font-medium text-black mb-6">Recent Jobs Posted</h2>
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading jobs...</div>
        </div>
      </div>
    );
  }

  if (recentJobs.length === 0 && !jobs) {
    return (
      <div className="rounded-xl p-6 border border-[#E6E6E6] mb-10">
        <h2 className="text-3xl font-medium text-black mb-6">Recent Jobs Posted</h2>
        <div className="text-center py-8 text-gray-500">
          No jobs posted yet
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl p-6 border border-[#E6E6E6] mb-10">
      <h2 className="text-3xl font-medium text-black mb-6">Recent Jobs Posted</h2>
      
      <div className="space-y-4">
        {jobsList.map((job) => (
          <div key={job.id || job._id} className="border border-gray-100 rounded-lg p-5 flex flex-col md:flex-row gap-4 hover:border-indigo-100 hover:shadow-sm transition-all">
             <div className="w-16 h-16 bg-cyan-50 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                 <img 
                   src={job.businessId?.logo || job.logo || "/assets/images/profileLogo.png"} 
                   alt={job.businessId?.companyName || job.company || "Company"} 
                   className="w-10 h-10 object-contain" 
                 />
             </div>
             
             <div className="flex-1">
                 <h3 className="text-lg font-bold text-gray-900 mb-1">{job.jobTitle || job.title}</h3>
                 <p className="text-sm text-indigo-900 font-medium mb-3">{job.businessId?.companyName || job.company || "Company"}</p>
                 
                 <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                     <div className="flex items-center gap-1">
                         <FiMapPin /> {job.location?.city && job.location?.country 
                           ? `${job.location.city}-${job.location.country}` 
                           : job.location || "Remote"}
                     </div>
                     <div className="flex items-center gap-1">
                         <BsBagCheck /> {job.employmentType || job.type || "Full Time"}
                     </div>
                     <div className="flex items-center gap-1">
                         <FiClock /> {formatTimeAgo(job.createdAt) || job.posted || "Recently"}
                     </div>
                 </div>
             </div>

             <div className="flex items-center">
                 <button className="border border-indigo-200 text-indigo-900 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors">
                     View Details &gt;
                 </button>
             </div>
          </div>
        ))}
      </div>

       <div className="mt-6">
           <button className="bg-[#110026] text-white px-6 py-2.5 rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-[#2a0b4d] transition-colors">
               View More Job &rarr;
           </button>
       </div>
    </div>
  );
}

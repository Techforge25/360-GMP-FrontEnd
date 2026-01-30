"use client";
import React from "react";
import ProfileHeader from "./profile/ProfileHeader";
import ProfileOverview from "./profile/ProfileOverview";
import ProfileJobs from "./profile/ProfileJobs";
import ProfileProducts from "./profile/ProfileProducts";
import ProfileCommunities from "./profile/ProfileCommunities";
import ProfileGallery from "./profile/ProfileGallery";
import ProfileTestimonials from "./profile/ProfileTestimonials";

export default function BusinessProfileDetail({ businessId }) {
  // In a real app, fetch business details using businessId
  const businessData = {
      // Mock data passed to components
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
         <ProfileHeader business={businessData} />
         <ProfileOverview business={businessData} />
         <ProfileJobs />
         <ProfileProducts />
         <ProfileCommunities />
         <ProfileGallery />
         <ProfileTestimonials />
      </div>
    </div>
  );
}

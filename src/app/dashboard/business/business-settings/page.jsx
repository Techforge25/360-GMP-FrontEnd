"use client"
import BusinessSideNav from "@/components/dashboard/businesses/businessSettings/BusinessSideNav";
import SettingHeader from "@/components/dashboard/businesses/businessSettings/SettingHeader";
import React from "react";

const page = () => {
  const [activeTab, setActiveTab] = React.useState("company identity");
  return (
    <>
      <SettingHeader />
      <BusinessSideNav setActiveTab={setActiveTab} activeTab={activeTab} />
    </>
  );
};

export default page;

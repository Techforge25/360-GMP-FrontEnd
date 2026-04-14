import CompanyIdentity from "@/components/dashboard/businesses/businessSettings/CompanyIdentity";
import SettingHeader from "@/components/dashboard/businesses/businessSettings/SettingHeader";
import React from "react";

const page = () => {
  return (
    <>
      <SettingHeader saveButton backButton />
      <CompanyIdentity />
    </>
  );
};

export default page;

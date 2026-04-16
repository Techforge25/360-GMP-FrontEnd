import DocumentationAndVerificationForm from "@/components/dashboard/businesses/businessSettings/DocumentationAndVerificationForm";
import SettingHeader from "@/components/dashboard/businesses/businessSettings/SettingHeader";
import React from "react";

const page = () => {
  return (
    <div>
      <SettingHeader backButton saveButton />
      <DocumentationAndVerificationForm />
    </div>
  );
};

export default page;

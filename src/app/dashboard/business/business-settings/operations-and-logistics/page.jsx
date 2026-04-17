import OperationsandLogisticsForm from "@/components/dashboard/businesses/businessSettings/OperationsandLogisticsForm";
import SettingHeader from "@/components/dashboard/businesses/businessSettings/SettingHeader";
import React from "react";

const page = () => {
  return (
    <div>
      <SettingHeader backButton />
      <OperationsandLogisticsForm />
    </div>
  );
};

export default page;

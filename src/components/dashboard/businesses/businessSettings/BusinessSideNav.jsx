import { settingsTabs } from "@/constants/index";
import Image from "next/image";
import React, { useRef } from "react";
import CompanyIdentity from "./CompanyIdentity";
import { RiArrowDropLeftLine, RiArrowDropRightLine } from "react-icons/ri";
import OperationsAndLogistics from "./OperationsAndLogistics";
import BusinessIntelligence from "./BusinessIntelligence";
import DocumentationAndVerification from "./DocumentationAndVerification";

const BusinessSideNav = ({ setActiveTab, activeTab }) => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -170,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 170,
        behavior: "smooth",
      });
    }
  };
  console.log(activeTab, "active tab");

  return (
    <div className="p-6 flex items-start sm:flex-row flex-col justify-between gap-[16px]">
      <div className="sm:sticky sm:top-28 relative sm:border-[1px] sm:border-border-gray-light sm:bg-white sm:max-w-[275px] w-full rounded-[12px] overflow-hidden">
        {/* Buttons */}
        <button
          onClick={scrollLeft}
          className="sm:hidden absolute -left-0.5 top-13 -translate-y-1/2 z-10 bg-white shadow p-0.5 rounded-full"
        >
          <RiArrowDropLeftLine
            size={20}
            className="text-brand-secondary-dark"
          />
        </button>

        <button
          onClick={scrollRight}
          className="sm:hidden absolute -right-1 top-13 -translate-y-1/2 z-10 bg-white shadow p-0.5 rounded-full"
        >
          <RiArrowDropRightLine
            size={20}
            className="text-brand-secondary-dark"
          />
        </button>

        <div
          ref={scrollRef}
          className="flex sm:flex-col gap-3 py-[32px] px-[16px] overflow-x-auto scroll-smooth whitespace-nowrap scrollbar-hide"
        >
          {settingsTabs.map((tab, ind) => (
            <div key={ind} className="">
              <button
                onClick={() => setActiveTab(tab.title)}
                className={`flex items-center md:gap-[10px] gap-[5px] ${activeTab === tab.title ? "bg-brand-setting-tab border-border-gray-light" : "bg-white "} sm:w-full min-w-[171px] px-[12px] py-[12px] rounded-[8px]`}
              >
                <Image
                  src={tab.icon}
                  alt={"icon"}
                  width={24}
                  height={24}
                  className="sm:w-[20px] w-[18px] h-[18px] sm:h-[20px]"
                />
                <p className="font-secondary leading-[20px] text-text-dark md:text-[14px] text-[12px] text-nowrap capitalize">
                  {tab.title}
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeTab === "company identity" ? (
        <CompanyIdentity />
      ) : activeTab === "Operations & Logistics" ? (
        <OperationsAndLogistics />
      ) : activeTab === "Business Intelligence" ? (
        <BusinessIntelligence />
      ) : activeTab === "Documentation & Verification" ? (
        <DocumentationAndVerification />
      ) : (
        "No Data Found"
      )}
    </div>
  );
};

export default BusinessSideNav;

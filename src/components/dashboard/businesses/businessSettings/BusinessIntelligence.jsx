import {
  BusinessIntelligenceDetails,
  companyIdentityLeftData,
  OperationsAndLogisticsData,
  regionOfOperations,
  standerdUnitWeight,
} from "@/constants/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

const BusinessIntelligence = () => {
  return (
    <div className="settingsContainer">
      {/* Header Business Settings */}
      <div className="flex items-center justify-between border-b-[1px] border-border-gray-light pb-4">
        <div className="flex items-center gap-[8px]">
          <div>
            <Image
              src={"/assets/images/BusinessIntelligence.svg"}
              alt="/assets/images/BusinessIntelligence.svg"
              height={30}
              width={30}
            />
          </div>
          <p className="capitalize text-text-dark text-[22px] font-semibold font-primary">
            Business Intelligence
          </p>
        </div>
        <Link href={"business-settings/business-Intelligence"}>
          <button className="edit-button">
            <span className="text-[14px] font-secondary ">Edit</span>
            <span>
              <FaEdit size={20} />
            </span>
          </button>
        </Link>
      </div>

      {/* Info Heading  */}
      <div className="my-6 border-b border-border-gray-light pb-2">
        <p className="settings-subheading">
          Primary B2B Contact
        </p>
      </div>

      {/* User Details  */}

      <div className="grid grid-cols-1 md:grid-cols-2 -gap-[16px]">
        {/* Start Left */}
        {BusinessIntelligenceDetails.map((item, ind) => (
          <div key={ind}  className="w-full">
            <div className="my-2">
              <p className="settings-title">{item.lable}</p>
              <p className="settings-name">{item.fieldsData}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legal compliance */}

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="settings-subheading">
            Stack Holder discolosure
          </p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="settings-title">
            Owner & Leadership
          </p>
          <p className="settings-name">
            <span className="uppercase">CEO,MD,OFFICER</span>{" "}
            <span className="w-[6px] h-[6px] bg-text-secondary rounded-full inline-block" />{" "}
            <span>5 members</span>
          </p>
        </div>
      </div>

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="settings-subheading">
            Operational & Trade Profile
          </p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="settings-title">
            Region Of Operation
          </p>
          <div className="flex items-center gap-[12px] flex-wrap md:py-[8px] py-[6px]">
            
              <button
                className="py-[11px] px-[29px] font-secondary font-medium text-[14px] text-white border-[1px] border-border-outline-light rounded-[8px]   bg-brand-primary "
              >
                Eurape
              </button>
           
          </div>
        </div>
      </div>

      <div className="flex items-center md:flex-row flex-col justify-between gap-[4px]">
        <div className="w-full">
          <h6 className="settings-title">
            Product Capacity
          </h6>
          <p className="settings-name">
            50,000+ Units per month
          </p>
        </div>
        <div className="w-full">
          <h6 className="settings-title">
            Trade affiliation
          </h6>
          <p className="settings-name">
            Trade affiliation
          </p>
        </div>
      </div>

      <div className="md:py-[32px] sm:py-[28px] py-[22px] ">
        <div className="border-b border-border-gray-light pb-2">
          <p className="settings-subheading">
            Financial and Regulatory
          </p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="settings-title">
            Auditing Agency
          </p>
          <p className="settings-name">
            SGS, Intertek, PWC, or Local Auditor
          </p>
        </div>
      </div>
    </div>
  );
};

export default BusinessIntelligence;

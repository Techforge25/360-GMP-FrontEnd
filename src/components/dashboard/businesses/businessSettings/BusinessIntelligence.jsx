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
    <div className="w-full h-[909px] bg-white border-[1px] border-border-gray-light rounded-[12px] py-[22px] px-[16px] overflow-hidden overflow-y-auto">
      {/* Header Business Settings */}
      <div className="flex items-center justify-between border-b-[1px] border-border-gray-light pb-4">
        <div className="flex items-center gap-[8px]">
          <span>
            <Image
              src={"/assets/images/BusinessIntelligence.svg"}
              alt="/assets/images/BusinessIntelligence.svg"
              height={30}
              width={30}
            />
          </span>
          <span className="capitalize text-text-dark text-[22px] font-semibold font-primary">
            Business Intelligence
          </span>
        </div>
        <Link href={"business-settings/business-Intelligence"}>
          <button className="text-text-dark font-secondary flex items-center gap-2 border-[1px] border-border-gray-light px-[18px] py-[6px] rounded-[8px] ">
            <span className="text-[14px] font-secondary ">Edit</span>
            <span>
              <FaEdit size={20} />
            </span>
          </button>
        </Link>
      </div>

      {/* Info Heading  */}
      <div className="my-6 border-b border-border-gray-light pb-2">
        <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
          primary B2B contact
        </p>
      </div>

      {/* User Details  */}

      <div className="flex items-center md:justify-between justify-start sm:flex-row flex-col gap-[16px]">
        {/* Start Left */}
        <div className="w-full">
          {BusinessIntelligenceDetails?.slice(0, 2).map((item, ind) => (
            <div key={ind} className={`${ind === 0 ? "" : "sm:my-6 my-2"}`}>
              <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
                {item.lable}
              </p>
              <p className="font-secondary text-text-secondary text-[14px] font-bold leading-[28px]  ">
                {item.fieldsData}
              </p>
            </div>
          ))}
        </div>
        {/* Start Right */}

        <div className="w-full">
          {BusinessIntelligenceDetails?.slice(2).map((item, ind) => (
            <div className={`${ind === 0 ? "" : "sm:my-6 my-2"}`} key={ind}>
              <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
                {item.lable}
              </p>
              <p className="font-secondary text-text-secondary text-[14px] font-bold leading-[28px]  ">
                {item.fieldsData}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Legal compliance */}

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
            Stack Holder discolosure
          </p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
            Owner & Leadership
          </p>
          <p className="font-secondary text-text-secondary text-[14px] leading-[28px]  ">
            <span className="uppercase">CEO,MD,OFFICER</span>{" "}
            <span className="w-[6px] h-[6px] bg-text-secondary rounded-full inline-block" />{" "}
            <span>5 members</span>
          </p>
        </div>
      </div>

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
            Operational & Trade Profile
          </p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark capitalize ">
            region of operation
          </p>
          <div className="flex items-center gap-[12px] flex-wrap md:py-[8px] py-[6px]">
            {regionOfOperations.map((item, ind) => (
              <button key={ind} className="py-[11px] px-[16px] font-secondary font-medium text-[14px] text-text-dark border-[1px] border-border-outline-light rounded-[8px]   bg-brand-business-button-light ">{item}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center md:flex-row flex-col justify-between gap-[4px]">
        <div className="w-full">
            <h6 className="text-text-dark font-semibold text-[16px] font-primary capitalize ">product capacity</h6>
            <p className="font-secondary text-[14px] text-text-secondary capitalize">50,000+ Units per month</p>
        </div>
        <div className="w-full">
            <h6 className="text-text-dark font-semibold text-[16px] font-primary capitalize ">Trade affiliation</h6>
            <p className="font-secondary text-[14px] text-text-secondary capitalize">Trade affiliation</p>
        </div>

      </div>

      <div className="md:py-[32px] sm:py-[28px] py-[22px] ">
        <div className="border-b border-border-gray-light pb-2">
          <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
            financial and regulatory 
          </p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark capitalize ">
            Auditing Agency
          </p>
          <p className="font-primary md:text-[16px] text-[14px] text-text-dark capitalize ">SGS, Intertek, PWC, or Local Auditor</p>
        </div>
      </div>

    </div>
  );
};

export default BusinessIntelligence;

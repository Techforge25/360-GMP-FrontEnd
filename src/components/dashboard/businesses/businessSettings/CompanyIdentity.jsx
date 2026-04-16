import {
  companyIdentityData,
  companyIdentityLeftData,
} from "@/constants/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

const CompanyIdentity = () => {
  return (
    <div className="w-full h-[909px] bg-white border-[1px] border-border-gray-light rounded-[12px] py-[22px] px-[16px] overflow-hidden overflow-y-auto">
      {/* Header Business Settings */}
      <div className="flex items-center justify-between border-b-[1px] border-border-gray-light pb-4">
        <div className="flex items-center gap-[8px]">
          <span>
            <Image
              src={"/assets/images/companyIdentityIcon.svg"}
              alt="/assets/images/companyIdentityIcon.svg"
              height={30}
              width={30}
            />
          </span>
          <span className="capitalize text-text-dark text-[22px] font-semibold font-primary">
            company identity
          </span>
        </div>
        <Link href={"business-settings/company-identity"}>
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
          basic info
        </p>
      </div>

      {/* User Details  */}

      <div className="flex items-center md:justify-between justify-start sm:flex-row flex-col gap-[16px]">
        {/* Start Left */}
        <div className="w-full">
          {companyIdentityData.map((item, ind) => (
            <div key={ind} className={`${ind === 0 ? "" : "sm:my-6 my-2"}`}>
              <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
                {item.lable}
              </p>
              <p className="font-secondary text-text-secondary text-[14px] leading-[28px]  ">
                {item.fieldsData}
              </p>
            </div>
          ))}
        </div>
        {/* Start Right */}

        <div className="w-full">
          {companyIdentityLeftData.map((item, ind) => (
            <div className={`${ind === 0 ? "" : "sm:my-6 my-2"}`} key={ind}>
              <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
                {item.lable}
              </p>
              <p className="font-secondary text-text-secondary text-[14px] leading-[28px]  ">
                {item.fieldsData}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Mission/Bio */}

      <div className="sm:pb-6 pb-4">
        <h4 className="sm:text-[16px] text-[14px] font-primary font-semibold text-text-dark ">
          Mission/Bio
        </h4>
        <p className="sm:text-[16px] text-[14px]  font-secondary text-text-gray-more text-justify sm:mt-2 md:mt-1 ">
          Global Manufacturing Co. is a leading Tier 1 and Tier 2 supplier
          specializing in high-tolerance components, advanced material
          production, and efficient sub-assembly modules. With over 15 years of
          operational excellence, we partner with automotive OEMs and other
          suppliers to ensure supply chain resilience, superior component
          quality, and compliance with strict industry standards (like IATF
          16949). We drive manufacturing optimization from raw material input to
          just-in-time delivery.
        </p>
      </div>

      {/* Legal compliance */}

      <div className="border-b border-border-gray-light pb-2">
        <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
          Legal compliance
        </p>
      </div>

      {/* Legal compliance details */}
      <div className="flex items-center md:justify-between justify-start sm:flex-row flex-col gap-[16px]">
        <div className="w-full">
          <div className="sm:my-4 my-2">
            <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
              Registration Numbers
            </p>
            <p className="font-secondary text-text-secondary text-[14px] leading-[28px]  ">
              Reg No: 987654321-ABC
            </p>
          </div>

          <div className="sm:my-4 my-2">
            <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
              Duns Number
            </p>
            <p className="font-secondary text-text-secondary text-[14px] leading-[28px]  ">
              123
            </p>
          </div>
        </div>

        <div className="w-full">
          <div className="sm:my-4 my-2">
            <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
              Text identification number
            </p>
            <p className="font-secondary text-text-secondary text-[14px] leading-[28px]  ">
              VAT: EU123456789
            </p>
          </div>

          <div className="sm:my-4 my-2">
            <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
              select primary industry
            </p>
            <p className="font-secondary text-text-secondary text-[14px] leading-[28px]  ">
              Manufacturing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyIdentity;

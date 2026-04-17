import { companyIdentityData } from "@/constants/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

const CompanyIdentity = () => {
  return (
    <div className="settingsContainer">
      {/* Header Business Settings */}
      <div className="flex items-center justify-between border-b-[1px] border-border-gray-light pb-4">
        <div className="flex items-center gap-[8px]">
          <div>
            <Image
              src={"/assets/images/companyIdentityIcon.svg"}
              alt="/assets/images/companyIdentityIcon.svg"
              height={30}
              width={30}
            />
          </div>
          <p className="settings-primary-heading">
            Company Identity
          </p>
        </div>
        <Link href={"business-settings/company-identity"}>
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
        <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
          basic info
        </p>
      </div>

      {/* User Details  flex items-center md:justify-between justify-start sm:flex-row flex-col gap-[16px] */}

      <div className="grid grid-cols-1 md:grid-cols-2 -gap-[16px]">
        {/* Start Left */}
        {companyIdentityData.map((item, ind) => (
          <div key={ind} className="w-full">
            <div className="my-2">
              <p className="settings-title">
                {item.lable}
              </p>
              <p className="settings-name">
                {item.fieldsData}
              </p>
            </div>
          </div>
        ))}
        {/* Start Right */}
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
        <p className="settings-subheading">Legal Compliance</p>
      </div>

      {/* Legal compliance details */}
      <div className="flex items-center md:justify-between justify-start sm:flex-row flex-col gap-[16px]">
        <div className="w-full">
          <div className="sm:my-4 my-2">
            <p className="settings-title">Registration Numbers</p>
            <p className="settings-name">Reg No: 987654321-ABC</p>
          </div>

          <div className="sm:my-4 my-2">
            <p className="settings-title">Duns Number</p>
            <p className="settings-name">123</p>
          </div>
        </div>

        <div className="w-full">
          <div className="sm:my-4 my-2">
            <p className="settings-title">Text identification number</p>
            <p className="settings-name">VAT: EU123456789</p>
          </div>

          <div className="sm:my-4 my-2">
            <p className="settings-title ">
              Select Primary Industry
            </p>
            <p className="settings-name ">
              Manufacturing
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyIdentity;

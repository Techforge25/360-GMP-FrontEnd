import { companyIdentityData } from "@/constants/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import DOMPurify from "dompurify"

const CompanyIdentity = ({ companyIdentity }) => {
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
          {companyIdentity?.basicInfo?.headingName}
        </p>
      </div>

      {/* User Details  flex items-center md:justify-between justify-start sm:flex-row flex-col gap-[16px] */}

      <div className="grid grid-cols-1 md:grid-cols-2 -gap-[16px]">
        {/* Start Left */}
        {companyIdentity?.basicInfo?.details?.map((item, ind) => (
          <div key={ind} className="w-full">
            <div className="my-2">
              <p className="settings-title">
                {item?.key}
              </p>
              {item?.key === "Mission/Bio" ? (
                <p className="settings-name"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item?.value),
                  }}
                />
              ) : (
                <>
                  <p className="settings-name">
                    {item?.value}
                  </p>
                </>
              )}
            </div>
          </div>
        ))
        }
        {/* Start Right */}
      </div >

      {/* Mission/Bio */}

      {/* Legal compliance */}

      < div className="border-b border-border-gray-light pb-2" >
        <p className="settings-subheading">{companyIdentity?.legalCompliance?.headingName}</p>
      </div >

      {/* Legal compliance details */}
      < div className="grid grid-cols-1 md:grid-cols-2 -gap-[16px]" >
        {companyIdentity?.legalCompliance?.details?.map((legal, index) => {
          return (
            <div className="w-full" key={index}>
              <div className="sm:my-4 my-2">
                <p className="settings-title">{legal?.key}</p>
                <p className="settings-name">{legal?.value}</p>
              </div>
            </div>
          )
        })}
      </div >
    </div >
  );
};

export default CompanyIdentity;

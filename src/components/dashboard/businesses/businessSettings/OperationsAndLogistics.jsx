import {
  companyIdentityData,
  companyIdentityLeftData,
  OperationsAndLogisticsData,
  standerdUnitWeight,
} from "@/constants/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

const OperationsAndLogistics = ({ operationsLogistics }) => {
  console.log(operationsLogistics, "operations")
  return (
    <div className="settingsContainer">
      {/* Header Business Settings */}
      <div className="flex items-center justify-between border-b-[1px] border-border-gray-light pb-4">
        <div className="flex items-center gap-[8px]">
          <span>
            <Image
              src={"/assets/images/operationandlogestic.svg"}
              alt="/assets/images/operationandlogestic.svg"
              height={30}
              width={30}
            />
          </span>
          <span className="settings-primary-heading">
            Operations & Logistics
          </span>
        </div>
        <Link href={"business-settings/operations-and-logistics"}>
          <button className="edit-button ">
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
          {operationsLogistics?.companyLocation?.headingName}
        </p>
      </div>

      {/* User Details  */}

      <div className="grid grid-cols-1 md:grid-cols-2 -gap-[16px]">
        {/* Start Left */}
        {operationsLogistics?.companyLocation?.details?.map((item, ind) => (
          <div key={ind} className="w-full">
            <div className="my-2">
              <p className="settings-title">
                {item?.key}
              </p>
              <p className="settings-name">
                {item?.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Legal compliance */}

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="settings-subheading">{operationsLogistics?.incoTerms?.headingName}</p>
        </div>


        {operationsLogistics?.incoTerms?.details?.map((terms, index) => {
          return (
            <div className="sm:my-4 my-2" key={index}>
              <p className="settings-title">{terms?.key}</p>
              <p className="settings-name">{terms?.value}</p>
            </div>
          )
        })}

      </div>

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
            {operationsLogistics?.shippingInfo?.headingName}
          </p>
        </div>

        {operationsLogistics?.shippingInfo?.details?.map((detail, index) => {
          return (
            <div className="sm:my-4 my-2">
              <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
                {detail?.key}
              </p>
              <p className="font-secondary text-text-secondary text-[14px] leading-[28px]">
                {detail?.value}
              </p>&nbsp;
            </div>
          )
        })}
      </div>

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="settings-subheading">{operationsLogistics?.productPackagingDefault?.headingName}</p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="settings-title">Standard Unit Weight</p>
          <div className="flex items-center flex-wrap gap-[8px] my-1">
            {operationsLogistics?.productPackagingDefault?.details?.map((item, ind) => (
              <button
                key={ind}
                className="capitalize bg-brand-business-button-light rounded-[8px] border-[1px] py-[6px] px-[12px] border-border-outline-light flex items-center gap-[17px] "
              >
                <span className="text-text-dark font-secondary font-medium text-[14px] ">
                  {item.key}
                </span>
                <span className="capitalize bg-white font-secondary font-medium text-[14px] py-[4px] px-[7px] text-text-setting-light ">
                  {item.value}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsAndLogistics;

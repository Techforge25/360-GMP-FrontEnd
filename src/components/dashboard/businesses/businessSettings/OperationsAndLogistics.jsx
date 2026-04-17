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

const OperationsAndLogistics = () => {
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
          company location
        </p>
      </div>

      {/* User Details  */}

      <div className="grid grid-cols-1 md:grid-cols-2 -gap-[16px]">
        {/* Start Left */}
        {OperationsAndLogisticsData?.map((item, ind) => (
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
      </div>

      {/* Legal compliance */}

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="settings-subheading">Incoterms</p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="settings-title">international commercial terms</p>
          <p className="settings-name">FOB, CIF, EXW</p>
        </div>
      </div>

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
            Shipping Info
          </p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
            Terms capability
          </p>
          <p className="font-secondary text-text-secondary text-[14px] leading-[28px]  ">
            Global Sea/Air Freight, Preferred: DHL/Maersk
          </p>
        </div>
      </div>

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="settings-subheading">Product packaging default</p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="settings-title">Standard Unit Weight</p>
          <div className="flex items-center flex-wrap gap-[8px] my-1">
            {standerdUnitWeight.map((item, ind) => (
              <button
                key={ind}
                className="capitalize bg-brand-business-button-light rounded-[8px] border-[1px] py-[6px] px-[12px] border-border-outline-light flex items-center gap-[17px] "
              >
                <span className="text-text-dark font-secondary font-medium text-[14px] ">
                  {item.unit}
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

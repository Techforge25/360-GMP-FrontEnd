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
    <div className="w-full h-[909px] bg-white border-[1px] border-border-gray-light rounded-[12px] py-[22px] px-[16px] overflow-hidden overflow-y-auto">
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
          <span className="capitalize text-text-dark text-[22px] font-semibold font-primary">
            Operations & Logistics
          </span>
        </div>
        <Link href={"business-settings/operations-and-logistics"}>
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
          company location
        </p>
      </div>

      {/* User Details  */}

      <div className="flex items-center md:justify-between justify-start sm:flex-row flex-col gap-[16px]">
        {/* Start Left */}
        <div className="w-full">
          {OperationsAndLogisticsData?.slice(0, 4).map((item, ind) => (
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
          {OperationsAndLogisticsData?.slice(4).map((item, ind) => (
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

      {/* Legal compliance */}

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
            incoterms
          </p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
            international commercial terms
          </p>
          <p className="font-secondary text-text-secondary text-[14px] leading-[28px]  ">
            FOB, CIF, EXW
          </p>
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
          <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
            Product packaging default
          </p>
        </div>

        <div className="sm:my-4 my-2">
          <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
            Packaging Types
          </p>
          <button className="bg-brand-business rounded-[8px] py-[6px] px-[16px] mt-[8px] text-[14px] font-secondary text-white font-medium capitalize border-[1px] border-border-outline-light ">
            costume box
          </button>
        </div>

        <div className="sm:my-4 my-2">
          <p className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize ">
            Standard Unit Weight
          </p>
          <div className="flex items-center flex-wrap gap-[8px]">
            {standerdUnitWeight.map((item, ind) => (
              <button key={ind} className="capitalize bg-brand-business-button-light rounded-[8px] border-[1px] py-[6px] px-[12px] border-border-outline-light flex items-center gap-[17px] ">
                <span className="text-text-dark font-secondary font-medium text-[14px] ">{item.unit}</span>
                <span className="capitalize bg-white font-secondary font-medium text-[14px] py-[4px] px-[7px] text-text-setting-light " >{item.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsAndLogistics;

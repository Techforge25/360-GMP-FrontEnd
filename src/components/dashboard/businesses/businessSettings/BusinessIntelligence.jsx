import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";

const BusinessIntelligence = ({ businessIntelligence }) => {
  console.log(businessIntelligence, "business intelligence")
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
          {businessIntelligence?.primaryB2BContact?.headingName}
        </p>
      </div>

      {/* User Details  */}

      <div className="grid grid-cols-1 md:grid-cols-2 -gap-[16px]">
        {/* Start Left */}
        {businessIntelligence?.primaryB2BContact?.details?.map((item, ind) => (
          <div key={ind} className="w-full">
            <div className="my-2">
              <p className="settings-title">{item.key}</p>
              <p className="settings-name">{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Legal compliance */}

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="settings-subheading">
            {businessIntelligence?.stakeHolderDisclosure?.headingName}
          </p>
        </div>

        {businessIntelligence?.stakeHolderDisclosure?.details?.map((detail, index) => {
          return (
            <div key={index} className="sm:my-4 my-2">
              <p className="settings-title">
                {detail?.key}
              </p>
              {detail?.value?.map((val, index) => {
                return (
                  <p className="settings-name" key={index}>
                    <span className="uppercase">{val}</span>{" "}
                  </p>
                )
              })}

            </div>
          )
        })}

      </div>

      <div>
        <div className="border-b border-border-gray-light pb-2">
          <p className="settings-subheading">
            {businessIntelligence?.operationalTradeProfile?.headingName}
          </p>
        </div>

        {businessIntelligence?.operationalTradeProfile?.details?.map((ops, index) => {
          const isArray = Array.isArray(ops?.value);

          return (
            <div key={index} className="sm:my-4 my-2">
              <p className="settings-title">{ops?.key}</p>

              <div className="flex items-center gap-3">
                {isArray ? (
                  ops?.value?.map((region, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-[12px] flex-wrap md:py-[8px] py-[6px]"
                    >
                      {ops.key === "Region Of Operation" ? (
                        <button className="py-[11px] px-[29px] font-secondary font-medium text-[14px] text-white border-[1px] border-border-outline-light rounded-[8px] bg-brand-primary">
                          {region}
                        </button>
                      ) : (
                        <p className="settings-name">{ops?.value}</p>
                      )}

                    </div>
                  ))
                ) : (
                  <p className="settings-name">{ops?.value}</p>
                )}
              </div>
            </div>
          );
        })}

      </div>

      <div className="md:py-[32px] sm:py-[28px] py-[22px] ">
        <div className="border-b border-border-gray-light pb-2">
          <p className="settings-subheading">
            {businessIntelligence?.financialAndRegulatory?.headingName}
          </p>
        </div>

        {businessIntelligence?.financialAndRegulatory?.details?.map((detail, index) => {
          return (
            <div className="sm:my-4 my-2">
              <p className="settings-title">
                {detail?.key}
              </p>
              <p className="settings-name">
                {detail?.value}
              </p>
            </div>
          )
        })}

      </div>
    </div>
  );
};

export default BusinessIntelligence;

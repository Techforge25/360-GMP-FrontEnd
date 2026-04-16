import {
  BusinessIntelligenceDetails,
  regionOfOperations,
} from "@/constants/index";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaEdit } from "react-icons/fa";
import { GrDocumentText } from "react-icons/gr";
import { IoEyeOutline } from "react-icons/io5";
import { MdOutlinePictureAsPdf } from "react-icons/md";

const DocumentationAndVerification = () => {
  return (
    <div className="w-full h-[447px] bg-white border-[1px] border-border-gray-light rounded-[12px] py-[22px] px-[16px] overflow-hidden overflow-y-auto">
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
            Documentation & Verification
          </span>
        </div>
        <Link href={"business-settings/documentation-verification"}>
          <button className="text-text-dark font-secondary flex items-center gap-2 border-[1px] border-border-gray-light px-[18px] py-[6px] rounded-[8px] ">
            <span className="text-[14px] font-secondary ">Edit</span>
            <span>
              <FaEdit size={20} />
            </span>
          </button>
        </Link>
      </div>

      {/* Info Heading  */}
      <div>
        <div className="my-6 border-b border-border-gray-light pb-2">
          <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
            documentation and verification assets
          </p>
        </div>

        <div className="flex items-center md:flex-row flex-col justify-between flex-wrap gap-[12px]">
          <div className="flex items-center justify-between border-[1px] border-border-gray-light rounded-[8px] px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] w-full md:w-[48%]">
            <div className="px-[8px] sm:px-[10px] py-[8px] sm:py-[10px] bg-brand-business-icon-light rounded-[8px]">
              <MdOutlinePictureAsPdf className="text-accent-danger" size={20} />
            </div>

            <div className="flex-1 px-[10px]">
              <p className="text-text-dark font-semibold text-[14px] sm:text-[16px] font-primary">
                Certificate of Incorporation
              </p>
              <p className="text-text-secondary text-[12px] sm:text-[14px] break-all">
                Globalmanufacturing_Cert_2026.pdf
              </p>
            </div>

            <div>
              <IoEyeOutline className="text-text-setting-light" size={20} />
            </div>
          </div>

          <div className="flex items-center justify-between border-[1px] border-border-gray-light rounded-[8px] px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] w-full md:w-[48%]">
            <div className="px-[8px] sm:px-[10px] py-[8px] sm:py-[10px] bg-[#DFEDFF] rounded-[8px]">
              <GrDocumentText
                className="text-brand-business-icon-dark"
                size={20}
              />
            </div>

            <div className="flex-1 px-[10px]">
              <p className="text-text-dark font-semibold text-[14px] sm:text-[16px] font-primary">
                Test Registration Certificate
              </p>
              <p className="text-text-secondary text-[12px] sm:text-[14px] break-all">
                TRC_V9_Final_Signed.pdf26.pdf
              </p>
            </div>

            <div>
              <IoEyeOutline className="text-text-setting-light" size={20} />
            </div>
          </div>
        </div>

        <div className="my-6 border-b border-border-gray-light pb-2">
          <p className="capitalize text-text-gray-more font-primary font-semibold text-[18px] ">
            Other certification
          </p>
        </div>

        <div className="flex items-center md:flex-row flex-col justify-between flex-wrap gap-[12px]">
          <div className="flex items-center justify-between border-[1px] border-border-gray-light rounded-[8px] px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] w-full md:w-[48%]">
            <div className="px-[8px] sm:px-[10px] py-[8px] sm:py-[10px] bg-brand-business-icon-light rounded-[8px]">
              <Image
                src={"/assets/images/settingcrown.svg"}
                width={20}
                height={20}
                alt="icon"
              />
            </div>

            <div className="flex-1 px-[10px]">
              <p className="text-text-dark font-semibold text-[14px] sm:text-[16px] font-primary">
                Certificate of Incorporation
              </p>
              <p className="text-text-secondary text-[12px] sm:text-[14px] break-all">
                Globalmanufacturing_Cert_2026.pdf
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between border-[1px] border-border-gray-light rounded-[8px] px-[12px] sm:px-[16px] py-[12px] sm:py-[16px] w-full md:w-[48%]">
            <div className="px-[8px] sm:px-[10px] py-[8px] sm:py-[10px] bg-[#DFEDFF] rounded-[8px]">
              <Image
                src={"/assets/images/protect.svg"}
                width={30}
                height={30}
                alt="icon"
              />
            </div>

            <div className="flex-1 px-[10px]">
              <p className="text-text-dark font-semibold text-[14px] sm:text-[16px] font-primary">
                Test Registration Certificate
              </p>
              <p className="text-text-secondary text-[12px] sm:text-[14px] break-all">
                TRC_V9_Final_Signed.pdf26.pdf
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationAndVerification;

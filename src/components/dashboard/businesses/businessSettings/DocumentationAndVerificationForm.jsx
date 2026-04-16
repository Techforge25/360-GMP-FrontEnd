import { UploadField } from "@/components/ui/UploadField";
import { IOS_OPTIONS, PAKING_TYPES, SHIPPING_OPTIONS } from "@/constants/index";
import { uploadToCloudinary } from "@/lib/cloudinary";
import React from "react";
import { GrDocumentText } from "react-icons/gr";
import { IoEyeOutline, IoLocationOutline, IoTrash } from "react-icons/io5";
import { MdOutlinePictureAsPdf } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";

const DocumentationAndVerificationForm = () => {
  return (
    <main className="py-[32px] px-[20px]">
      <div className="p-[30px] bg-white border border-border-outline-light rounded-[12px]">
        <div>
          <h2 className="font-semibold font-primary md:text-[28px] sm:text-[22px] text-[18px] text-text-setting-darks ">
            Documentation & Verification Assets
          </h2>
          <div className="md:py-[32px] sm:py-[22px] py-[18px] ">
            <div className="bg-border-outline-light h-[1px]" />
          </div>
        </div>

        <div className="md:pb-[52px] sm:pb-[32px] pb-[20px] ">
          <h4 className="font-primary font-semibold md:text-[22px] sm:text-[18px] text-[16px] text-text-setting-dark  ">
            Certificates
          </h4>
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

            <div className="flex items-center gap-[12px] ">
              <IoEyeOutline className="text-text-setting-light" size={20} />
              <IoTrash className="text-accent-danger " size={20} />
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

            <div className="flex items-center gap-[12px] ">
              <IoEyeOutline className="text-text-setting-light" size={20} />
              <IoTrash className="text-accent-danger " size={20} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-[32px]">
          <div className="sm:mt-4 mt-2 w-full">
            <UploadField
              label="Profile Image"
              isImage={true}
              value={"logo"}
              //   loading={uploading === ".pdf"}
              //   onUpload={async (file) => {
              // try {
              //   setUploading(".pdf");
              //   const url = await uploadToCloudinary(file, ".pdf");
              //   setValue(url);
              // } catch (err) {
              //   console.error(err);
              // } finally {
              //   setUploading(null);
              // }
              //   }}
              //   onRemove={() => setValue(null)}
            />
          </div>
          <div className="sm:mt-4 mt-2 w-full">
            <UploadField
              label="Profile Image"
              isImage={true}
              value={"logo"}
              //   loading={uploading === ".pdf"}
              //   onUpload={async (file) => {
              // try {
              //   setUploading(".pdf");
              //   const url = await uploadToCloudinary(file, ".pdf");
              //   setValue(url);
              // } catch (err) {
              //   console.error(err);
              // } finally {
              //   setUploading(null);
              // }
              //   }}
              //   onRemove={() => setValue(null)}
            />
          </div>
        </div>

        <div>
          <div className="md:pb-[52px] sm:pb-[32px] pb-[20px] mt-18 ">
            <h4 className="font-primary font-semibold md:text-[22px] sm:text-[18px] text-[16px] text-text-setting-dark  ">
              Other certification
            </h4>
          </div>

          <div className="flex items-center sm:gap-[8px] flex-wrap gap-[4px]">
            
              {IOS_OPTIONS.slice(0,3).map((option, index) => (
                <div key={index} className="flex items-center gap-[8px] py-4 w-[30%]">
                  <input
                    type="checkbox"
                    id={option}
                    className="cursor-pointer accent-brand-primary w-[17px] h-[17px] "
                  />
                  <label
                    htmlFor={option}
                    className="text-[14px] font-secondary cursor-pointer text-text-gray-more"
                  >
                    {option}
                  </label>
                </div>
              ))}
          </div>
          <div className="flex items-center sm:gap-[8px] flex-wrap gap-[4px]">
            
              {IOS_OPTIONS.slice(3).map((option, index) => (
                <div key={index} className="flex items-center gap-[8px] py-4 w-[30%]">
                  <input
                    type="checkbox"
                    id={option}
                    className="cursor-pointer accent-brand-primary w-[17px] h-[17px] "
                  />
                  <label
                    htmlFor={option}
                    className="text-[14px] font-secondary cursor-pointer text-text-gray-more"
                  >
                    {option}
                  </label>
                </div>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DocumentationAndVerificationForm;

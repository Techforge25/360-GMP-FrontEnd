"use client";
import { UploadField } from "@/components/ui/UploadField";
import { COUNTRIES } from "@/constants/index";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { createBusinessProfileSchema } from "@/validations/business-onboarding";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const CompanyIdentity = () => {
     const {
        register,
        handleSubmit,
        control,
        trigger,
        setValue,
        getValues,
        watch,
        formState: { errors, isValid }
      } = useForm({
        resolver: yupResolver(createBusinessProfileSchema),
        mode: "all",
        defaultValues: {
          ownerName: "",
          identificationOfBusinessOwner: "",
          companyName: "",
          tradeName: "",
          businessType: "",
          companySize: "",
          foundedDate: null,
          primaryIndustry: "",
          operationHour: "",
          countryOfRegistration: "",
          businessRegistrationNumber: "",
          taxIdentificationNumber: "",
          dunsNumber: "",
          incoterms: "",
          complianceScreeningStatus: false,
          location: {
            country: "",
            city: "",
            addressLine: "",
            warehouseAddress: "",
            additionalWarehouseAddress: "",
            mandatoryPickupAddress: "",
            businessRegistrationAddress: "",
            internationalOffices: []
          },
          shipping: {
            capabilities: [],
            exportExperience: false
          },
          executiveLeadership: [],
          stakeholderDisclosure: [],
          regionOfOperations: [],
          productionCapacity: "",
          tradeAffiliations: [],
          annualRevenueRange: "",
          auditingAgency: "",
          certificateOfIncorporation: "",
          taxRegistrationCertificate: "",
          standardProductDimensions: {
            length: 0,
            width: 0,
            height: 0,
            weight: 0
          },
          certifications: [],
          b2bContact: {
            name: "",
            title: "",
            phone: "",
            supportEmail: ""
          },
          logo: "",
          banner: "",
          website: "",
          description: ""
        }
      });

  return (
    <main className="p-4 ">
      <div className="p-[30px] bg-white border border-border-outline-light rounded-[12px]">
        {/* main Headigng */}
        <h1 className="font-semibold font-primary text-text-dark md:text-[28px] sm:text-[24px] text-[20px] pb-2 border-b-[1px] border-border-gray-light   ">
          Basic Identity & Legal
        </h1>

        {/* info Heading */}
        <div className="my-6 border-b border-border-gray-light pb-2">
          <p className="capitalize text-[#40444C] font-primary font-semibold text-[18px] ">
            basic info
          </p>
        </div>

        {/* Info Edit Form */}

        <form  >
          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px]">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="ownerName"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                Owner Name
              </label>
              <input
                type="text"
                id="ownerName"
                placeholder="Alex"
                className="py-[12px] px-[16px] font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>

            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="identification of business owner name"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                identification of business owner name
              </label>
              <input
                type="text"
                id="identification of business owner name"
                placeholder="identification of business owner name"
                className="py-[12px] px-[16px] font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px] sm:mt-4 mt-2">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="companyName"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                company name
              </label>
              <input
                type="text"
                id="companyName"
                placeholder="Alex"
                className="py-[12px] px-[16px] font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>

            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="countryOfRegistration"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                select primary industry
              </label>
              <select
                id="countryOfRegistration"
                className="py-[12px] px-[16px] cursor-pointer font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px] text-text-gray-more"
              >
                <option
                  value=""
                  selected
                  disabled
                  className="text-text-gray-more md:text-[14px] text-[12px] "
                >
                  select primary industry
                </option>
                {COUNTRIES.map((country, ind) => (
                  <option
                    key={ind}
                    value={country}
                    className="text-text-gray-more cursor-pointer md:text-[14px] text-[12px] "
                  >
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px] sm:mt-4 mt-2">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="tradeName"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                trade name{" "}
                <span className="text-text-light-gray-more text-[14px]">
                  {"(optional)"}
                </span>
              </label>
              <input
                type="text"
                id="tradeName"
                placeholder="trade name "
                className="py-[12px] px-[16px] font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>

            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="countryOfRegistration"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                country of registration
              </label>
              <select
                id="countryOfRegistration"
                className="py-[12px] px-[16px] cursor-pointer font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px] text-text-gray-more"
              >
                <option
                  value=""
                  selected
                  disabled
                  className="text-text-gray-more md:text-[14px] text-[12px] "
                >
                  select country
                </option>
                {COUNTRIES.map((country, ind) => (
                  <option
                    key={ind}
                    value={country}
                    className="text-text-gray-more cursor-pointer md:text-[14px] text-[12px] "
                  >
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px] sm:mt-4 mt-2">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="businessType"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                business type
              </label>
              <input
                type="text"
                id="businessType"
                placeholder="Private Corporation"
                className="py-[12px] px-[16px] font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>

            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="companySize"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                company size
              </label>
              <select
                id="companySize"
                className="py-[12px] px-[16px] cursor-pointer font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px] text-text-gray-more"
              >
                <option
                  value=""
                  selected
                  disabled
                  className="text-text-gray-more md:text-[14px] text-[12px] "
                >
                  Company Size
                </option>
                {COUNTRIES.map((country, ind) => (
                  <option
                    key={ind}
                    value={country}
                    className="text-text-gray-more cursor-pointer md:text-[14px] text-[12px] "
                  >
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px] sm:mt-4 mt-2">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="foundedDate"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                founded date
              </label>
              <input
                type="date"
                id="foundedDate"
                defaultValue={new Date().toISOString().split("T")[0]}
                placeholder="Private Corporation"
                className="py-[12px] px-[16px] font-secondary text-[14px] cursor-pointer  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>

            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="operatingHours"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                Operating Hours
              </label>
              <input
                type="time"
                id="operatingHours"
                defaultValue={new Date().toISOString().split("T")[0]}
                placeholder="Private Corporation"
                className="py-[12px] px-[16px] font-secondary text-[14px] cursor-pointer  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>
          </div>

          <div className=" sm:mt-4 mt-2">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="officialCompanyWebsite"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                official company website
              </label>
              <input
                type="text"
                id="officialCompanyWebsite"
                placeholder=" "
                className="py-[12px] px-[16px] font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>
          </div>

          <div className=" sm:mt-4 mt-2">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="companyMissionAndBio"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                company mission and bio
              </label>
              <textarea
                minLength={200}
                maxLength={20000}
                type="text"
                id="companyMissionAndBio"
                placeholder="*"
                className="py-[12px] px-[16px] h-25 font-secondary text-[14px] text-text-dark  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>
          </div>

          {/* info Heading */}
          <div className="my-6 border-b border-border-gray-light pb-2">
            <p className="capitalize text-[#40444C] font-primary font-semibold text-[18px] ">
              Legal compliance
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px]">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="businessRegistrationNumber"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                Business Registration Number
              </label>
              <input
                type="text"
                id="businessRegistrationNumber"
                placeholder="Registration Number"
                className="py-[12px] px-[16px] font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>

            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="textIdentificationNumber"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                Text identification number
              </label>
              <input
                type="text"
                id="textIdentificationNumber"
                placeholder="Text Identification Number"
                className="py-[12px] px-[16px] font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px]">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="dunsNumber"
                className="font-primary font-semibold md:text-[16px] text-[14px] text-text-dark leading-[28px] capitalize cursor-pointer"
              >
                Duns Number
              </label>
              <input
                type="text"
                id="dunsNumber"
                placeholder="data universal numbering system"
                className="py-[12px] px-[16px] font-secondary text-[14px]  outline-none border-[1px] border-border-outline-light rounded-[12px]"
              />
            </div>
          </div>

          <div className="sm:mt-4 mt-2">
            <div className="flex flex-row-reverse justify-end md:gap-[8px] gap-[6px]">
              <label
                htmlFor="complianceScreeningStatus"
                className="font-primary font-semibold md:text-[14px] text-[12px] text-text-gray-more leading-[28px] capitalize cursor-pointer"
              >
                compliance screening status
              </label>
              <input
                type="checkbox"
                id="complianceScreeningStatus"
                className=""
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px] ">

            <div className="sm:mt-4 mt-2">
              <UploadField
                label="Profile Image"
                isImage={true}
                // value={"logo"}
                // loading={uploading === ".pdf"}
                // onUpload={async (file) => {
                //   try {
                //     setUploading(".pdf");
                //     const url = await uploadToCloudinary(file, ".pdf");
                //     setValue(url);
                //   } catch (err) {
                //     console.error(err);
                //   } finally {
                //     setUploading(null);
                //   }
                // }}
                onRemove={() => setValue(null)}
              />
            </div>

            <div className="sm:mt-4 mt-2">
              <UploadField
                label="Banner Image"
                isImage={true}
                // value={"logo"}
                // loading={uploading === ".pdf"}
                // onUpload={async (file) => {
                //   try {
                //     setUploading(".pdf");
                //     const url = await uploadToCloudinary(file, ".pdf");
                //     setValue(url);
                //   } catch (err) {
                //     console.error(err);
                //   } finally {
                //     setUploading(null);
                //   }
                // }}
                // onRemove={() => setValue(null)}
              />
            </div>
          </div>

          

            



        </form>
      </div>
    </main>
  );
};

export default CompanyIdentity;

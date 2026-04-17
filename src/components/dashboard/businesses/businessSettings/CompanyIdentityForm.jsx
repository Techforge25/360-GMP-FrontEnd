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
    formState: { errors, isValid },
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
        internationalOffices: [],
      },
      shipping: {
        capabilities: [],
        exportExperience: false,
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
        weight: 0,
      },
      certifications: [],
      b2bContact: {
        name: "",
        title: "",
        phone: "",
        supportEmail: "",
      },
      logo: "",
      banner: "",
      website: "",
      description: "",
    },
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
          <p className="settings-subheading">Basic Info</p>
        </div>

        {/* Info Edit Form */}

        <form>
          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px]">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label htmlFor="ownerName" className="label">
                Owner Name
              </label>
              <input
                type="text"
                id="ownerName"
                placeholder="Alex"
                className="inputs"
              />
            </div>

            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label
                htmlFor="identification of business owner name"
                className="label"
              >
                identification of business owner name
              </label>
              <input
                type="text"
                id="identification of business owner name"
                placeholder="identification of business owner name"
                className="inputs"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px] sm:mt-4 mt-2">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label htmlFor="companyName" className="label">
                company name
              </label>
              <input
                type="text"
                id="companyName"
                placeholder="Alex"
                className="inputs"
              />
            </div>

            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label htmlFor="countryOfRegistration" className="label">
                select primary industry
              </label>
              <select id="countryOfRegistration" className="select-list">
                <option value="" selected disabled className="select-option">
                  select primary industry
                </option>
                {COUNTRIES.map((country, ind) => (
                  <option key={ind} value={country} className="select-option">
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px] sm:mt-4 mt-2">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label htmlFor="tradeName" className="label">
                trade name{" "}
                <span className="text-text-light-gray-more text-[14px]">
                  {"(optional)"}
                </span>
              </label>
              <input
                type="text"
                id="tradeName"
                placeholder="trade name "
                className="inputs"
              />
            </div>

            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label htmlFor="countryOfRegistration" className="label">
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
                  <option key={ind} value={country} className="select-option ">
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px] sm:mt-4 mt-2">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label htmlFor="businessType" className="label">
                business type
              </label>
              <input
                type="text"
                id="businessType"
                placeholder="Private Corporation"
                className="inputs"
              />
            </div>

            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label htmlFor="companySize" className="label">
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
                  <option key={ind} value={country} className="select-option ">
                    {country}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px] sm:mt-4 mt-2">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label htmlFor="foundedDate" className="label">
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
              <label htmlFor="operatingHours" className="label">
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
              <label htmlFor="officialCompanyWebsite" className="label">
                official company website
              </label>
              <input
                type="text"
                id="officialCompanyWebsite"
                placeholder=" "
                className="inputs"
              />
            </div>
          </div>

          <div className=" sm:mt-4 mt-2">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label htmlFor="companyMissionAndBio" className="label">
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
              <label htmlFor="businessRegistrationNumber" className="label">
                Business Registration Number
              </label>
              <input
                type="text"
                id="businessRegistrationNumber"
                placeholder="Registration Number"
                className="inputs"
              />
            </div>

            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label htmlFor="textIdentificationNumber" className="label">
                Text identification number
              </label>
              <input
                type="text"
                id="textIdentificationNumber"
                placeholder="Text Identification Number"
                className="inputs"
              />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 md:gap-[16px] gap-[8px]">
            <div className="flex flex-col md:gap-[8px] gap-[6px]">
              <label htmlFor="dunsNumber" className="label">
                Duns Number
              </label>
              <input
                type="text"
                id="dunsNumber"
                placeholder="data universal numbering system"
                className="inputs"
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

            <div>
              <button className="bg-brand-primary px-[24] py-[10] rounded-[12px] hover:bg-brand-primary ">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CompanyIdentity;

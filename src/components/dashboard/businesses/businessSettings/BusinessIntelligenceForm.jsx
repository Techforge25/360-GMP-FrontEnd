"use client";
import {
  INCOTERMS_OPTIONS,
  productionCapacityBusiness,
  regionOfOperations,
  REGIONS,
} from "@/constants/index";
import AddExecutiveLeadershipInputs from "./AddExecutiveLeadershipInputs";
import AddStakeHolderInputs from "./AddStakeHolderInputs";
import { RxCross2 } from "react-icons/rx";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useState } from "react";

const BusinessIntelligenceForm = () => {
  const [selectedRegions, setSelectedRegions] = useState(["Europe"]);
  const [formData, setFormData] = useState({
    leadership: [""],
    affiliations: [""],
    offices: [""],
  });

  const handleChange = (region) => {
    setSelectedRegions(
      (prev) =>
        prev.includes(region)
          ? prev.filter((item) => item !== region) // remove
          : [...prev, region], // add
    );
  };

  const removeRegion = (region) => {
    setSelectedRegions((prev) => prev.filter((item) => item !== region));
  };

  console.log(formData,"formData");

  return (
    <main className="py-[32px] px-[20px]">
      <div className="p-[30px] bg-white border border-border-outline-light rounded-[12px]">
        <div>
          <h2 className="font-semibold font-primary md:text-[28px] sm:text-[22px] text-[18px] text-text-setting-darks">
            Business Intelligence
          </h2>
          <div className="md:py-[32px] sm:py-[22px] py-[18px] ">
            <div className="bg-border-outline-light h-[1px]" />
          </div>
        </div>

        {/* Company Location */}
        <div>
          <div>
            <h6 className="settings-subheading">Primary B2B Contact</h6>
            <div className="md:pt-[16px] sm:pt-[14px] pb-[28px] md:pb-[32px] ">
              <div className="bg-border-outline-light h-[1px]" />
            </div>
          </div>

          <form className="flex flex-col md:gap-[20px] sm:gap-[18px] gap-[16px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[8px] md:gap-[16px]">
              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="label">Contact Person Name</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="e.g John Doe"
                    className="operations-input"
                  />
                </div>
              </div>

              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="label">title</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    className="operations-input"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[8px] md:gap-[16px]">
              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="label">phone</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="e.g +1 234 567 890"
                    className="operations-input"
                  />
                </div>
              </div>

              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="label">support Email</label>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="e.g john.doe@example.com"
                    className="operations-input"
                  />
                </div>
              </div>
            </div>

            <div className="md:py-[52px] sm:py-[42px] py-[28px]">
              <div>
                <h6 className="font-semibold font-primary md:text-[18px] text-[16px] text-text-setting-dark capitalize">
                  owner and leader ship
                </h6>
                <div className="md:pt-[16px] sm:pt-[14px] pb-[28px] md:pb-[32px] ">
                  <div className="bg-border-outline-light h-[1px]" />
                </div>
              </div>

              <div className="space-y-[10px]">
                <AddStakeHolderInputs />
                <AddExecutiveLeadershipInputs
                  heading={"Executive Leadership"}
                  buttonName={"Add Leadership"}
                  placeholder={"e.g John Doe CEO"}
                  name={"leadership"}
                  formData={formData}
                  setFormData={setFormData}
                />
                <AddExecutiveLeadershipInputs
                  heading={"Trade Affiliations"}
                  buttonName={"Add Affiliations"}
                  placeholder={"e.g Trade  Association"}
                  name={"affiliations"}
                  formData={formData}
                  setFormData={setFormData}
                />
                <AddExecutiveLeadershipInputs
                  heading={"International Offices"}
                  buttonName={"Add Offices"}
                  placeholder={"e.g Ottawa canada"}
                  name={"offices"}
                  formData={formData}
                  setFormData={setFormData}
                />
              </div>
            </div>

            <div className="">
              <div>
                <div>
                  <h6 className="font-semibold font-primary md:text-[18px] text-[16px] text-text-setting-dark capitalize">
                    Operational & Trade Profile
                  </h6>
                  <div className="md:pt-[16px] sm:pt-[14px] pb-[28px] md:pb-[32px] ">
                    <div className="bg-border-outline-light h-[1px]" />
                  </div>
                </div>

                <div>
                  <p className="text-text-primary font-primary font-semibold text-[14px] capitalize">
                    Region of Operation
                  </p>

                  <div className="flex items-center flex-wrap gap-[12px] py-[12px]">
                    {selectedRegions.map((region, index) => (
                      <button
                        key={index}
                        type="button"
                        className="flex items-center gap-[4px] text-[14px] font-secondary py-[11px] px-[16px] bg-brand-primary border-[1px] border-border-outline-light rounded-[8px] text-white"
                      >
                        <span onClick={() => removeRegion(region)}>
                          <RxCross2 size={20} />
                        </span>
                        <span>{region}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center flex-wrap justify-between">
                {REGIONS.map((region, index) => (
                  <div
                    key={index}
                    className="flex items-center sm:gap-[8px] gap-[4px]"
                  >
                    <input
                      type="checkbox"
                      id={region}
                      checked={selectedRegions.includes(region)}
                      onChange={() => handleChange(region)}
                      className="cursor-pointer accent-brand-primary w-[17px] h-[17px] "
                    />
                    <label
                      htmlFor={region}
                      className="text-[14px] font-secondary cursor-pointer text-text-gray-more"
                    >
                      {region}
                    </label>
                  </div>
                ))}
              </div>

              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] py-[16px] ">
                <div>
                  <label className="label">Product Capacity</label>
                </div>
                <div className="relative">
                  <select className="w-full appearance-none md:py-[12px] py-[10px] md:px-[16px] px-[12px] pr-[40px] border border-border-gray-light rounded-[12px] cursor-pointer text-[14px] font-secondary text-text-gray-more outline-none">
                    <option>Select option</option>
                    {productionCapacityBusiness.map((option, ind) => (
                      <option
                        className="text-[14px] font-secondary text-text-gray-more"
                        key={ind}
                        value={option}
                      >
                        {option}
                      </option>
                    ))}
                  </select>

                  {/* Custom Icon */}
                  <RiArrowDropDownLine
                    size={26}
                    className="absolute right-[12px] top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none text-black "
                  />
                </div>

                <div>
                  <label className="label">Trade affiliation</label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Trade affiliation"
                    className="operations-input"
                  />
                </div>
              </div>

              <div>
                <div>
                  <h6 className="font-semibold font-primary md:text-[18px] text-[16px] text-text-setting-dark capitalize">
                    financial and regulatory
                  </h6>
                  <div className="md:pt-[16px] sm:pt-[14px] pb-[28px] md:pb-[32px] ">
                    <div className="bg-border-outline-light h-[1px]" />
                  </div>
                </div>

                <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                  <div>
                    <label className="label">Auditing Agency</label>
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="e.g., SGS, Intertek, PWC, or Local Auditor"
                      className="operations-input"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button className="bg-brand-primary px-[24] py-[10] rounded-[12px] hover:bg-brand-primary ">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default BusinessIntelligenceForm;

import { PAKING_TYPES, SHIPPING_OPTIONS } from "@/constants/index";
import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { RiArrowDropDownLine } from "react-icons/ri";

const OperationsandLogisticsForm = () => {
  return (
    <main className="py-[32px] px-[20px]">
      <div className="p-[30px] bg-white border border-border-outline-light rounded-[12px]">
        <div>
          <h2 className="font-semibold font-primary md:text-[28px] sm:text-[22px] text-[18px] text-text-setting-darks ">
            Operations & Logistics
          </h2>
          <div className="md:py-[32px] sm:py-[22px] py-[18px] ">
            <div className="bg-border-outline-light h-[1px]" />
          </div>
        </div>

        <div className="md:pb-[52px] sm:pb-[32px] pb-[20px] ">
          <h4 className="font-primary font-semibold md:text-[22px] sm:text-[18px] text-[16px] text-text-setting-dark  ">
            Operations & Logistics
          </h4>
        </div>

        {/* Company Location */}
        <div>
          <div>
            <h6 className="font-semibold font-primary md:text-[18px] text-[16px] text-text-setting-darks capitalize">
              company location
            </h6>
            <div className="md:pt-[16px] sm:pt-[14px] pb-[28px] md:pb-[32px] ">
              <div className="bg-border-outline-light h-[1px]" />
            </div>
          </div>

          <form className="flex flex-col md:gap-[20px] sm:gap-[18px] gap-[16px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[8px] md:gap-[16px]">
              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    country{" "}
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="e.g Canada"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px]  "
                  />
                </div>
              </div>

              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    City
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Ottawa"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px]  "
                  />
                </div>
              </div>

              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    address line
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="street address"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px]  "
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[8px] md:gap-[16px]">
              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    warehouse address
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ware hours address"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px]  "
                  />
                  <IoLocationOutline
                    size={20}
                    className="absolute right-[12px] top-1/2 -translate-y-1/2 text-text-gray-more pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    additional ware house address
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="additional ware hours address"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px]  "
                  />
                  <IoLocationOutline
                    size={20}
                    className="absolute right-[12px] top-1/2 -translate-y-1/2 text-text-gray-more pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    mandatory pickup address
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Pickup address"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px]  "
                  />
                  <IoLocationOutline
                    size={20}
                    className="absolute right-[12px] top-1/2 -translate-y-1/2 text-text-gray-more pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[8px] md:gap-[16px]">
              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    business registration address
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="business registration address"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px]  "
                  />
                  <IoLocationOutline
                    size={20}
                    className="absolute right-[12px] top-1/2 -translate-y-1/2 text-text-gray-more pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    international office
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="international office address"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px]  "
                  />
                  <IoLocationOutline
                    size={20}
                    className="absolute right-[12px] top-1/2 -translate-y-1/2 text-text-gray-more pointer-events-none"
                  />
                </div>
              </div>
            </div>

            <div className="md:py-[52px] sm:py-[38px] py-[28px] ">
              <div>
                <h6 className="font-semibold font-primary md:text-[18px] text-[16px] text-text-setting-dark capitalize">
                  incoterms
                </h6>
                <div className="md:pt-[16px] sm:pt-[14px] pb-[28px] md:pb-[32px] ">
                  <div className="bg-border-outline-light h-[1px]" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="sm:text-[14px] text-[12px] text-text-primary font-semibold font-primary">
                  international commercial terms
                </label>
                <textarea
                  placeholder="*.."
                  className="border-[1px] border-border-outline-light placeholder:text-text-gray-more placeholder:text-[14px] font-secondary rounded-[12px] py-[12px] px-[16px] text-text-gray-more outline-none "
                />
              </div>
            </div>

            <div className="py-[32px] sm:py-[28px] py-[18px] ">
              <div>
                <h6 className="font-semibold font-primary md:text-[18px] text-[16px] text-text-setting-dark capitalize">
                  Shipping Info
                </h6>
                <div className="md:pt-[16px] sm:pt-[14px] pb-[28px] md:pb-[32px] ">
                  <div className="bg-border-outline-light h-[1px]" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <label className="sm:text-[14px] text-[12px] text-text-primary font-semibold font-primary">
                  Terms capability
                </label>

                <div className="relative">
                  <select className="w-full appearance-none md:py-[12px] py-[10px] md:px-[16px] px-[12px] pr-[40px] border border-border-gray-light rounded-[12px] text-[14px] font-secondary text-text-gray-more outline-none">
                    <option>Select option</option>
                    {SHIPPING_OPTIONS.map((option, ind) => (
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
                <div className="flex items-center sm:gap-[8px] gap-[4px]">
                  <input
                    type="checkbox"
                    id="exportexperience"
                    className="cursor-pointer accent-brand-primary w-[17px] h-[17px] "
                  />
                  <label
                    htmlFor="exportexperience"
                    className="text-[14px] font-secondary cursor-pointer text-text-gray-more"
                  >
                    Export Experience
                  </label>
                </div>
              </div>
            </div>

            <div className="">
              <div>
                <h6 className="font-semibold font-primary md:text-[18px] text-[16px] text-text-setting-dark capitalize">
                  Product packaging default
                </h6>
                <div className="md:pt-[16px] sm:pt-[14px] pb-[28px] md:pb-[32px] ">
                  <div className="bg-border-outline-light h-[1px]" />
                </div>
              </div>
              <div className="flex flex-col gap-[8px]">
                <h5 className="sm:text-[14px] text-[12px] text-text-primary font-semibold font-primary">
                  Packaging Types
                </h5>

                <div className="flex items-center flex-wrap gap-[12px] ">
                  {PAKING_TYPES.map((type, ind) => (
                    <div
                      className="flex cursor-pointer items-center gap-[4px] py-[11px] px-[16px] border-[1px] border-border-outline-light rounded-[8px] "
                      key={ind}
                    >
                      <input
                        type="radio"
                        id={type}
                        name="packingType"
                        className="accent-radio-button w-[16px] h-[16px]"
                      />
                      <label
                        htmlFor={type}
                        className="text-[14px] cursor-pointer text-text-setting-light font-medium font-secondary capitalize  "
                      >
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="py-[18px] space-y-[20px] ">
                {/* Standard Unit Weight */}
                <div>
                  <label className="block text-[14px] font-semibold font-primary text-text-primary  mb-1">
                    Standard Unit Weight
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="00.00"
                      className="w-full border  outline-none placeholder:text-text-gray-more placeholder:text-[14px]  py-[10px] md:px-[16px] px-[12px] rounded-[8px] border-border-outline-light text-text-gray-more "
                    />

                    <select className=" w-[317px] border  outline-none placeholder:text-text-gray-more placeholder:text-[14px]  py-[10px] md:px-[16px] px-[12px] rounded-[8px] border-border-outline-light text-text-gray-more ">
                      <option>Kg</option>
                      <option>g</option>
                    </select>

                  </div>
                </div>

                {/* Dimensions */}
                <div className="flex items-center gap-2">
                  {/* Length */}
                  <input
                    type="text"
                    placeholder="L"
                    className="w-full border  outline-none placeholder:text-text-gray-more placeholder:text-[14px]  py-[10px] md:px-[16px] px-[12px] rounded-[8px] border-border-outline-light text-text-gray-more "
                  />

                  <span className="text-gray-500 text-sm">X</span>

                  {/* Width */}
                  <input
                    type="text"
                    placeholder="W"
                    className="w-full border  outline-none placeholder:text-text-gray-more placeholder:text-[14px]  py-[10px] md:px-[16px] px-[12px] rounded-[8px] border-border-outline-light text-text-gray-more "
                  />

                  <span className="text-gray-500 text-sm">X</span>

                  {/* Height */}
                  <input
                    type="text"
                    placeholder="H"
                    className="w-full border  outline-none placeholder:text-text-gray-more placeholder:text-[14px]  py-[10px] md:px-[16px] px-[12px] rounded-[8px] border-border-outline-light text-text-gray-more "
                  />

                  {/* Unit */}
                  <select className="border  outline-none placeholder:text-text-gray-more placeholder:text-[14px]  py-[10px] md:px-[16px] px-[12px] rounded-[8px] border-border-outline-light text-text-gray-more">
                    <option>Cm</option>
                    <option>Inch</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default OperationsandLogisticsForm;

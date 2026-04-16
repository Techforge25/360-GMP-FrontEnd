import { regionOfOperations } from "@/constants/index";
import AddExecutiveLeadershipInputs from "./AddExecutiveLeadershipInputs";
import AddStakeHolderInputs from "./AddStakeHolderInputs";
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const BusinessIntelligenceForm = () => {
  return (
    <main className="py-[32px] px-[20px]">
      <div className="p-[30px] bg-white border border-border-outline-light rounded-[12px]">
        <div>
          <h2 className="font-semibold font-primary md:text-[28px] sm:text-[22px] text-[18px] text-text-setting-darks ">
            Business Intelligence
          </h2>
          <div className="md:py-[32px] sm:py-[22px] py-[18px] ">
            <div className="bg-border-outline-light h-[1px]" />
          </div>
        </div>

        {/* Company Location */}
        <div>
          <div>
            <h6 className="font-semibold font-primary md:text-[18px] text-[16px] text-text-setting-dark capitalize">
              primary B2B contact
            </h6>
            <div className="md:pt-[16px] sm:pt-[14px] pb-[28px] md:pb-[32px] ">
              <div className="bg-border-outline-light h-[1px]" />
            </div>
          </div>

          <form className="flex flex-col md:gap-[20px] sm:gap-[18px] gap-[16px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[8px] md:gap-[16px]">
              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    contact person name
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="e.g John Doe"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more  "
                  />
                </div>
              </div>

              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    title
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more  "
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[8px] md:gap-[16px]">
              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    phone
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="e.g +1 234 567 890"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more  "
                  />
                </div>
              </div>

              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    support Email
                  </label>
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="e.g john.doe@example.com"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more  "
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
                <AddExecutiveLeadershipInputs />
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
                    region of operation
                  </p>

                  <div className="flex items-center flex-wrap gap-[12px] py-[12px]">
                    {regionOfOperations.map((region, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-[4px] text-[14px] font-secondary py-[11px] px-[16px] bg-brand-primary border-[1px] border-border-outline-light rounded-[8px] text-white"
                      >
                        <span>
                          <RxCross2 size={20} />
                        </span>
                        <span>{region}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <input
                  type="text"
                  className="md-py-[12px] py-[10px] md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px]    "
                />
                <IoIosSearch
                  size={20}
                  className="absolute left-[12px] top-1/2 -translate-y-1/2 text-text-gray-more pointer-events-none"
                />
              </div>

              <div className="flex flex-col md:gap-[8px] sm:gap-[6px] gap-[4px] py-[16px] ">
                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    product capacity
                  </label>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="00.00"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more  "
                  />
                </div>

                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[8px] md:gap-[16px]">
                  <select  className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more w-full  " >
                    <option value="">Prices</option>
                    <option value="">400$</option>
                    <option value="">600$</option>
                  </select>

                    <select  className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more w-full  " >
                    <option value="">Per Month</option>
                    <option value="">400$</option>
                    <option value="">600$</option>
                  </select>
                 
                </div>

                <div>
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    Trade affiliation
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Trade affiliation"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more  "
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
                  <label className="text-[14px] font-semibold font-primary text-text-primary capitalize">
                    Auditing Agency
                  </label>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="e.g., SGS, Intertek, PWC, or Local Auditor"
                    className="md:py-[12px] py-[10px] md:px-[16px] px-[12px]  w-full outline-none border-[1px] text-text-gray-more border-border-gray-light rounded-[12px] text-[14px] font-secondary placeholder:capitalize placeholder:text-text-gray-more placeholder:text-[14px] text-text-gray-more  "
                  />
                </div>
              </div>

                
              </div>







            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default BusinessIntelligenceForm;

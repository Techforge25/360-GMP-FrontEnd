import { sortOptionsByTime } from "@/constants/index";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { MdOutlineArrowDropDown } from "react-icons/md";

export default function TabsRight({ activeTabs }) {
     return (
          <>
               {activeTabs === "My Wallet" && (
                    <button className="flex items-center gap-2 bg-brand-primary text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer border-0">
                         Withdraw <FaCircleDollarToSlot />
                    </button>
               )}

               {activeTabs === "Earnings" && (
                    <div className="flex items-center gap-3">
                         <p className="text-[#768299]">Last Updated: Oct24, 14:30PM</p>
                         <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                              <span>Export Report</span>
                              <FiDownload className="w-4 h-4" />
                         </button>
                    </div>
               )}

               {activeTabs === "Transactions" && (
                    <div className="flex items-center gap-3">
                         <p className="text-[#768299]">Sort By</p>

                         <div className="relative inline-flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white hover:border-gray-400">
                              <select
                                   className="appearance-none bg-transparent text-black text-sm px-2 outline-none cursor-pointer"
                              >
                                   {sortOptionsByTime.map((sort, index) => (
                                        <option key={index} value={sort}>
                                             {sort}
                                        </option>
                                   ))}
                              </select>

                              <MdOutlineArrowDropDown color="#000000" size={15} />
                         </div>
                    </div>
               )}
          </>
     )
}
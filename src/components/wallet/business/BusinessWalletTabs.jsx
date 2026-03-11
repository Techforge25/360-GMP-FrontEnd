"use client";
import { businessWalletTabs } from "@/constants/index";
import { useWallet } from "@/context/WalletContext";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";

export default function BusinessWalletTabs() {
     const { activeTabs, setActiveTabs } = useWallet();
     return (
          <section className="flex items-center py-5 justify-between">
               <div className="flex items-center gap-3">
                    {businessWalletTabs.map((tab) => (
                         <button
                              key={tab}
                              onClick={() => setActiveTabs(tab)}
                              className={`px-4 py-2 text-sm transition-colors ${activeTabs === tab
                                   ? "border-b-2 border-text-brand-primary text-brand-primary font-semibold"
                                   : "border-b-2 border-transparent text-gray-500 hover:text-gray-800"
                                   }`}
                         >
                              {tab}
                         </button>
                    ))}
               </div>
               {activeTabs === "My Wallet" ? (
                    <button className="flex items-center gap-2 bg-brand-primary text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer border-0">
                         Withdraw <FaCircleDollarToSlot />
                    </button>
               ) : (
                    <>
                         <div className="flex items-center gap-3">
                              <p className="text-[#768299]">Last Updated: Oct24, 14:30PM</p>
                              <button
                                   className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                   <span>Export Report</span>
                                   <FiDownload className="w-4 h-4" />
                              </button>
                         </div>
                    </>
               )}

          </section>
     );
}
import { useWallet } from "@/context/WalletContext";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiDownload } from "react-icons/fi";

export default function TablesHeaderBusiness({ tablesCommon }) {
     const [activeTab, setActiveTab] = useState("All");
     const { activeTabs } = useWallet()
     const myWalletCond = activeTabs === "My Wallet"
     const earningsCond = activeTabs === "Earnings"
     const transactionCond = activeTabs === "Transactions"
     return (
          <div className="w-full bg-white px-6 py-5 font-sans">
               {
                    myWalletCond ? (
                         <>
                              <div className="flex items-start justify-between">
                                   <div>
                                        <h1 className="text-lg font-bold text-black leading-tight">
                                             Recent Transactions
                                        </h1>
                                   </div>
                              </div>
                              <div className="flex items-center justify-between py-3">
                                   <div className="flex items-center gap-1">
                                        {tablesCommon.map((tab) => (
                                             <button
                                                  key={tab}
                                                  onClick={() => setActiveTab(tab)}
                                                  className={`px-4 py-3 text-md rounded-lg transition-colors ${activeTab === tab
                                                       ? "bg-brand-primary text-primary-foreground"
                                                       : "text-[#444953] hover:text-foreground"
                                                       }`}
                                             >
                                                  {tab}
                                             </button>
                                        ))}
                                   </div>

                                   <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                                        <span>Export Report</span>
                                        <FiDownload className="w-4 h-4" />
                                   </button>
                              </div>
                         </>
                    ) : earningsCond ? (
                         <div className="flex items-start justify-between">
                              <div>
                                   <h1 className="text-lg font-bold text-black leading-tight">
                                        Detailed Earning Table
                                   </h1>
                              </div>
                         </div>
                    ) : transactionCond ? (
                         <>
                              <div className="flex items-start justify-between mb-5">
                                   <div>
                                        <h1 className="text-lg font-bold text-black leading-tight">
                                             Transactions
                                        </h1>
                                        <p className="text-[13px] text-[#768299] mt-0.5">
                                             A Complete History Of Your Business Payments And Withdrawals.
                                        </p>
                                   </div>
                              </div>
                         </>
                    ) : null
               }

          </div>
     )
}
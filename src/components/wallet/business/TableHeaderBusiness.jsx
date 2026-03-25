import { useWallet } from "@/context/WalletContext";
import { useState } from "react";

export default function TablesHeaderBusiness({ tablesCommon }) {
     const [activeTab, setActiveTab] = useState("All");
     const { activeTabs, setUserTransactionTab } = useWallet()
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
                                        <h1 className="text-black font-open font-semibold text-[22px] leading-[100%] tracking-normal capitalize">
                                             Recent Transactions
                                        </h1>
                                   </div>
                              </div>
                              <div className="flex items-center justify-between py-3">
                                   <div className="flex items-center gap-1">
                                        {tablesCommon.map((tab) => (
                                             <button
                                                  key={tab}
                                                  onClick={() => {
                                                       setActiveTab(tab)
                                                       setUserTransactionTab(tab)
                                                  }}
                                                  className={`px-4 py-2 text-md rounded-lg transition-colors ${activeTab === tab
                                                       ? "bg-brand-primary text-primary-foreground font-inter font-normal text-sm leading-6 tracking-normal text-center align-middle capitalize"
                                                       : "text-[#444953] hover:text-foreground font-inter font-normal text-sm leading-6 tracking-normal text-center align-middle capitalize"
                                                       }`}
                                             >
                                                  {tab}
                                             </button>
                                        ))}
                                   </div>
                              </div>
                         </>
                    ) : earningsCond ? (
                         <div className="flex items-start justify-between">
                              <div>
                                   <h1 className="text-black font-open font-semibold text-[22px] leading-[100%] tracking-normal capitalize">
                                        Detailed Earning Table
                                   </h1>
                              </div>
                         </div>
                    ) : transactionCond ? (
                         <>
                              <div className="flex items-start justify-between mb-5">
                                   <div>
                                        <h1 className="text-black font-open font-semibold text-[22px] leading-[100%] tracking-normal capitalize">
                                             Transactions
                                        </h1>
                                        <p className="text-[#768299] mt-1 font-inter font-normal text-[14px] leading-[16px] tracking-normal align-middle capitalize">
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
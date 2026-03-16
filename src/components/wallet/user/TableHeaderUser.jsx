import { useWallet } from "@/context/WalletContext";
import { useState } from "react";
import { FiDownload } from "react-icons/fi";

export default function TablesHeaderUser({ tablesCommon }) {
     const [transactionTab, setTransactionTab] = useState("All")
     const { setUserTransactionTab } = useWallet()
     return (
          <div className="w-full bg-white px-6 py-5 font-sans">
               <div className="flex items-start justify-between">
                    <div>
                         <h1 className="text-lg font-bold text-black leading-tight">
                              Transactions
                         </h1>
                    </div>
               </div>
               <div className="flex items-center justify-between py-3">
                    <div className="flex items-center justify-between py-3">
                         <div className="flex items-center gap-1">
                              {tablesCommon.map((tab) => (
                                   <button
                                        key={tab}
                                        onClick={() => {
                                             setTransactionTab(tab)
                                             setUserTransactionTab(tab)
                                        }}
                                        className={`px-4 py-2 text-md rounded-lg transition-colors ${transactionTab === tab
                                             ? "bg-brand-primary text-primary-foreground font-inter font-normal text-sm leading-6 tracking-normal text-center align-middle capitalize"
                                             : "text-[#444953] hover:text-foreground font-inter font-normal text-sm leading-6 tracking-normal text-center align-middle capitalize"
                                             }`}
                                   >
                                        {tab}
                                   </button>
                              ))}
                         </div>
                    </div>
               </div>
          </div >
     )
}
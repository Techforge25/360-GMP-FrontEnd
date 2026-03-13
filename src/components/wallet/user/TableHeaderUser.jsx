import { useState } from "react";
import { FiDownload } from "react-icons/fi";

export default function TablesHeaderUser({ tablesCommon }) {
     const [transactionTab, setTransactionTab] = useState("All")
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
                    <div className="flex items-center gap-1">
                         {tablesCommon.map((tab) => (
                              <button
                                   key={tab}
                                   onClick={() => {
                                        setTransactionTab(tab)
                                   }}
                                   className={`px-4 py-3 text-md rounded-lg transition-colors ${tab === transactionTab
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
          </div >
     )
}
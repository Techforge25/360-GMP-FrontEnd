import { useWallet } from "@/context/WalletContext";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiDownload } from "react-icons/fi";

export default function TablesHeader({ tablesCommon }) {
     const [activeTab, setActiveTab] = useState("All");
     const [searchQuery, setSearchQuery] = useState("");
     const pathname = usePathname()
     const { activeTabs } = useWallet()
     const recentTransactionsCond = activeTabs === "My Wallet" || pathname !== "/wallet/user/view-all-transactions"
     const detailedEarningTableCond = activeTabs === "Earnings" || pathname !== "/wallet/user/view-all-transactions"
     const transactionCond = activeTabs === "Transactions" || pathname === "/wallet/user/view-all-transactions"
     return (
          <div className="w-full bg-white px-6 py-5 font-sans">
               {
                    recentTransactionsCond ? (
                         <div className="flex items-start justify-between">
                              <div>
                                   <h1 className="text-lg font-bold text-black leading-tight">
                                        Recent Transactions
                                   </h1>
                              </div>

                              <div className="relative">
                                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#768299]" />
                                   <input
                                        type="text"
                                        placeholder="Search Transaction..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 pr-4 py-2 w-[320px] text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                   />
                              </div>
                         </div>
                    ) : detailedEarningTableCond ? (
                         <div className="flex items-start justify-between">
                              <div>
                                   <h1 className="text-lg font-bold text-black leading-tight">
                                        Detailed Earning Table
                                   </h1>
                              </div>

                              <div className="relative">
                                   <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#768299]" />
                                   <input
                                        type="text"
                                        placeholder="Search Transaction..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-9 pr-4 py-2 w-[320px] text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                   />
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

                                   <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#768299]" />
                                        <input
                                             type="text"
                                             placeholder="Search Transaction..."
                                             value={searchQuery}
                                             onChange={(e) => setSearchQuery(e.target.value)}
                                             className="pl-9 pr-4 py-2 w-[320px] text-sm border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                                        />
                                   </div>
                              </div>

                              <div className="flex items-center justify-between pb-0">
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
                    ) : null
               }

          </div>
     )
}
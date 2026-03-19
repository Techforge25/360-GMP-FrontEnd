import { getStatusColor, transactionsUserWallet } from "@/constants/index";
import walletUserAPI from "@/services/walletUserAPI";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RecentTransactions() {
     const [transactions, setTransactions] = useState(null)
     useEffect(() => {
          const fetchTransactions = async () => {
               const transactData = await walletUserAPI.getWalletUserTransactions({
                    limit: 5,
                    currentPage: 1,
                    getCond: ""
               })
               setTransactions(transactData.data.docs)
          }
          fetchTransactions()
     }, [])

     return (
          <div className="bg-white rounded-xl border border-border p-5 h-full">
               <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-black">Recent Transaction</h2>
                    <Link href="/wallet/user/view-all-transactions" className="text-sm text-[#185adb] font-medium text-primary hover:underline">View All</Link>
               </div>

               <div className="space-y-1">
                    {transactions?.slice(0, 5).map((tx) => (
                         <div key={tx.orderId} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                   <div className="text-[13px] font-medium text-black">
                                        {tx?.orderId
                                             ? tx.orderId.slice(0, -5).replace(/./g, "*") + tx.orderId.slice(-5)
                                             : "N/A"}
                                   </div>
                                   <p className="text-[11px] text-[#768299] mt-0.5">{tx.createdAt}</p>
                              </div>

                              {/* Amount & Status */}
                              <div className="text-right shrink-0">
                                   <p className="text-sm font-semibold text-black">${tx.amount}</p>
                                   <span className={`inline-block mt-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(tx.status)}`}>
                                        {tx.status}
                                   </span>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

import { getStatusColor, transactionsUserWallet } from "@/constants/index";
import { ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";

export default function RecentTransactions() {
     return (
          <div className="bg-card rounded-xl border border-border p-5 h-full">
               <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-bold text-black">Recent Transaction</h2>
                    <Link href="/wallet/user/view-all-transactions" className="text-sm text-[#185adb] font-medium text-primary hover:underline">View All</Link>
               </div>

               <div className="space-y-1">
                    {transactionsUserWallet.map((tx) => (
                         <div key={tx.id} className="flex items-center gap-3 py-3 border-b border-border last:border-0">
                              {/* Icon */}
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.type === "debit" ? "bg-yellow/10" : "bg-yellow/10"
                                   }`}>
                                   {tx.type === "debit" ? (
                                        <ArrowUp className="h-4 w-4 text-accent-danger" />
                                   ) : (
                                        <ArrowDown className="h-4 w-4 text-accent-warning" />
                                   )}
                              </div>

                              {/* Details */}
                              <div className="flex-1 min-w-0">
                                   <p className="text-sm font-medium text-black">{tx.title}</p>
                                   <p className="text-[11px] text-[#768299] mt-0.5">{tx.date}</p>
                              </div>

                              {/* Amount & Status */}
                              <div className="text-right shrink-0">
                                   <p className="text-sm font-semibold text-black">{tx.amount}</p>
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

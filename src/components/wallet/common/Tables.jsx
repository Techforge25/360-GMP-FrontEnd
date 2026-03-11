import { businessTableTabs, getStatusColor, transactions } from "@/constants/index";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { MdKeyboardArrowRight, MdOutlineCallReceived } from "react-icons/md";

export default function Tables() {
     return (
          <div className="bg-white rounded-xl border border-gray-200 mt-4">
               <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
                    <h2 className="text-base font-semibold text-gray-900">Recent Transactions</h2>
                    <a href="#" className="text-[13px] text-brand-primary font-medium flex items-center gap-1">
                         View All <FaArrowRight />
                    </a>
               </div>

               <table className="min-w-full border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                         <tr className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                              <th className="w-[40px] px-6 py-2.5">
                                   <input type="checkbox" className="cursor-pointer" />
                              </th>
                              {businessTableTabs.map((tab, index) => (
                                   <th key={index} className="px-6 py-2.5 text-left">
                                        {tab}
                                   </th>
                              ))}
                         </tr>
                    </thead>

                    {/* BODY */}
                    <tbody>
                         {transactions.map((tx, i) => (
                              <tr
                                   key={tx.id}
                                   className={`hover:bg-gray-50 transition-colors ${i < transactions.length - 1 ? "border-b border-gray-50" : ""}`}
                              >
                                   <td className="px-6 py-3.5">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                             <MdOutlineCallReceived color="green" />
                                        </div>
                                   </td>
                                   <td className="px-6 py-3.5">
                                        <Link href={`/wallet/business/transaction-details/1`}>
                                             <div className="text-[13px] font-medium text-gray-900">{tx.description}</div>
                                        </Link>
                                        <div className="text-xs text-gray-400 mt-0.5">{tx.date}</div>
                                   </td>
                                   <td className="px-6 py-3.5 text-[13px] text-gray-600">{tx.method}</td>
                                   <td className="px-6 py-3.5 whitespace-nowrap">
                                        <span
                                             className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(tx.status)}`}
                                        >
                                             {tx.status}
                                        </span>
                                   </td>
                                   <td className={`flex items-center gap-3 px-6 py-3.5 text-[13px] font-semibold ${tx.positive ? "text-emerald-600" : "text-red-500"}`}>
                                        {tx.amount} <MdKeyboardArrowRight />
                                   </td>
                              </tr>
                         ))}
                    </tbody>
               </table>
          </div>
     )
}
import { getStatusColor, tabsTransactionBusinessWallet } from "@/constants/index";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useWallet } from "@/context/WalletContext";
import TablesHeaderBusiness from "./TableHeaderBusiness";

export default function TablesBusiness({ tableData, tablesTabHeader }) {
     const { activeTabs } = useWallet()
     const transactionTabsBusinessOrUser = activeTabs === "My Wallet" && tabsTransactionBusinessWallet
     return (
          <div className="bg-white rounded-xl border border-gray-200">
               <TablesHeaderBusiness tablesCommon={transactionTabsBusinessOrUser} />
               <table className="min-w-full border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                         <tr className="">
                              {tablesTabHeader.map((tab, index) => (
                                   <th key={index} className="leading-[24%] px-6 py-2.5 text-left text-[#22252b] text-[16px]">
                                        {tab}
                                   </th>
                              ))}
                         </tr>
                    </thead>
                    <tbody>
                         {activeTabs === "My Wallet" ? (
                              tableData?.length > 0 ? (
                                   tableData.map((item) => (
                                        <tr key={item.orderId}>
                                             <td className="px-6 py-3.5">
                                                  <Link href={`/wallet/business/transaction-details/1`}>
                                                       <div className="text-[13px] font-medium text-gray-900">
                                                            {item?.orderId
                                                                 ? item.orderId.slice(0, -5).replace(/./g, "*") + item.orderId.slice(-5)
                                                                 : "N/A"}
                                                       </div>
                                                  </Link>
                                             </td>
                                             <td className="px-5 py-4 whitespace-nowrap">
                                                  <span
                                                       className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.stripe)}`}
                                                  >
                                                       {item.paymentMethod || "Unknown"}
                                                  </span>
                                             </td>
                                             <td className="px-5 py-4 whitespace-nowrap">
                                                  <span
                                                       className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}
                                                  >
                                                       {item.status || "Unknown"}
                                                  </span>
                                             </td>
                                             <Link href={`/wallet/business/transaction-details/${item.orderId}`}>
                                                  <td className="flex items-center gap-3 px-6 py-3.5 text-[16px] font-semibold text-black">
                                                       {item.amount} <MdKeyboardArrowRight />
                                                  </td>
                                             </Link>
                                        </tr>
                                   ))
                              ) : (
                                   <tr>
                                        <td colSpan={3} className="text-center py-6 text-gray-400 text-center">
                                             No Data Found
                                        </td>
                                   </tr>
                              )
                         ) : activeTabs === "Earnings" ? (
                              tableData?.length > 0 ? (
                                   tableData.map((item) => (
                                        <tr key={item.orderId}>
                                             <td className="px-6 py-3.5 text-gray-600">
                                                  <div>
                                                       {new Date(item.createdAt).toLocaleDateString("en-US", {
                                                            month: "short",
                                                            day: "2-digit",
                                                            year: "numeric",
                                                       })}
                                                  </div>
                                                  <div className="text-xs text-gray-400">
                                                       {new Date(item.createdAt).toLocaleTimeString("en-US", {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: true,
                                                       })}
                                                  </div>
                                             </td>
                                             <td className="px-6 py-3.5 text-[13px] text-gray-600">
                                                  ${item.totalAmount}
                                             </td>
                                             <td className="px-6 py-3.5 text-[13px] text-gray-600">
                                                  ${item.platformFee}
                                             </td>
                                             <td className="px-6 py-3.5 text-[13px] text-gray-600">
                                                  ${item.netAmount}
                                             </td>
                                             <td className="flex items-center gap-3 px-6 py-3.5 text-[13px] font-semibold text-black">
                                                  <span className={`inline-block mt-1 text-[11px] font-medium px-2.5 py-0.5 rounded-full ${getStatusColor(item.status)}`}>
                                                       {item.status}
                                                  </span>
                                             </td>
                                        </tr>
                                   ))
                              ) : (
                                   <tr>
                                        <td colSpan={3} className="text-center py-6 text-gray-400 text-center">
                                             No Data Found
                                        </td>
                                   </tr>
                              )
                         ) : activeTabs === "Transactions" ? (
                              tableData?.length > 0 ? (
                                   tableData.map((item) => (
                                        <tr key={item.id}>
                                             <td className="px-6 py-3.5">
                                                  <Link href={`/wallet/business/transaction-details/1`}>
                                                       <div className="text-[13px] font-medium text-gray-900">
                                                            {item?.id
                                                                 ? item.id.slice(0, -5).replace(/./g, "*") + item.id.slice(-5)
                                                                 : "N/A"}
                                                       </div>
                                                  </Link>
                                             </td>
                                             <td className="px-5 py-4 whitespace-nowrap">
                                                  <span
                                                       className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.stripe)}`}
                                                  >
                                                       {item.paymentMethod || "Unknown"}
                                                  </span>
                                             </td>
                                             <td className="px-5 py-4 whitespace-nowrap">
                                                  <span
                                                       className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}
                                                  >
                                                       {item.status || "Unknown"}
                                                  </span>
                                             </td>
                                             <Link href={`/wallet/business/transaction-details/${item.orderId}`}>
                                                  <td className="flex items-center gap-3 px-6 py-3.5 text-[16px] font-semibold text-black">
                                                       {item.amount} <MdKeyboardArrowRight />
                                                  </td>
                                             </Link>
                                        </tr>
                                   ))
                              ) : (
                                   <tr>
                                        <td colSpan={3} className="text-center py-6 text-gray-400 text-center">
                                             No Data Found
                                        </td>
                                   </tr>
                              )
                         ) : null}
                    </tbody>
               </table>
          </div>
     )
}
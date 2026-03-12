import { tabsTransactionBusinessWallet, tabsTransactionUserWallet } from "@/constants/index";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import TablesHeader from "@/components/wallet/common/TablesHeader";
import { useWallet } from "@/context/WalletContext";
import { usePathname } from "next/navigation";

export default function Tables({ tableData, tablesTabHeader }) {
     const { activeTabs } = useWallet()
     const pathname = usePathname()
     const transactionTabsBusinessOrUser = pathname === "/wallet/business" ? tabsTransactionBusinessWallet : tabsTransactionUserWallet
     return (
          <div className="bg-white rounded-xl border border-gray-200 mt-4">
               <TablesHeader tablesCommon={transactionTabsBusinessOrUser} />
               <table className="min-w-full border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                         <tr className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                              <th className="w-[40px] px-6 py-2.5">
                                   <input type="checkbox" className="cursor-pointer" />
                              </th>
                              {tablesTabHeader.map((tab, index) => (
                                   <th key={index} className="px-6 py-2.5 text-left">
                                        {tab}
                                   </th>
                              ))}
                         </tr>
                    </thead>

                    <tbody>
                         {activeTabs === "My Wallet" ? (
                              tableData?.map((item) => (
                                   <tr key={item.orderId}>
                                        <td className="px-6 py-3.5">
                                             <Link href={`/wallet/business/transaction-details/1`}>
                                                  <div className="text-[13px] font-medium text-gray-900">{item.orderId.slice(0, -5).replace(/./g, "*") + item.orderId.slice(-5)}</div>
                                             </Link>
                                             <div className="text-xs text-gray-400 mt-0.5">{item.paymentMethod}</div>
                                        </td>
                                        <td className="px-6 py-3.5 text-[13px] text-gray-600">{item.status}</td>
                                        <td className={`flex items-center gap-3 px-6 py-3.5 text-[13px] font-semibold text-black`}>
                                             {item.totalAmount} <MdKeyboardArrowRight />
                                        </td>
                                   </tr>
                              ))
                         ) : activeTabs === "Earnings" ? (
                              tableData?.map((item) => (
                                   <tr key={item.orderId}>
                                        <td className="px-6 py-3.5 text-gray-600">
                                             {item.createdAt}
                                        </td>
                                        <td className="px-6 py-3.5 text-[13px] text-gray-600">${item.netAmount}</td>                                        <td className={`flex items-center gap-3 px-6 py-3.5 text-[13px] font-semibold text-black`}>
                                             {item.totalAmount} <MdKeyboardArrowRight />
                                        </td>
                                   </tr>
                              ))
                         ) : activeTabs === "Transactions" ? (
                              tableData?.map((item) => (
                                   <tr key={item.orderId}>
                                        <td className="px-6 py-3.5">
                                             <Link href={`/wallet/business/transaction-details/1`}>
                                                  <div className="text-[13px] font-medium text-gray-900">{item.orderId.slice(0, -5).replace(/./g, "*") + item.orderId.slice(-5)}</div>
                                             </Link>
                                             <div className="text-xs text-gray-400 mt-0.5">{item.date}</div>
                                        </td>
                                        <td className="px-6 py-3.5 text-[13px] text-gray-600">{item.paymentMethod}</td>                                        <td className={`flex items-center gap-3 px-6 py-3.5 text-[13px] font-semibold text-black`}>
                                             {item.totalAmount} <MdKeyboardArrowRight />
                                        </td>
                                   </tr>
                              ))
                         ) : null}
                    </tbody>
               </table>
          </div>
     )
}
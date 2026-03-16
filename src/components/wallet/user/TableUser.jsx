import {
     getStatusColor,
     tabsTransactionUserWallet,
} from "@/constants/index";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import TablesHeaderUser from "./TableHeaderUser";
import walletUserAPI from "@/services/walletUserAPI";
import { useWallet } from "@/context/WalletContext";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";

export default function TablesUser({ tablesTabHeader }) {

     const [transactions, setTransactions] = useState([])
     const [page, setPage] = useState(1)
     const [hasMore, setHasMore] = useState(true)
     const [loading, setLoading] = useState(false)

     const { userTransactionTab } = useWallet()

     const transactionTabsBusinessOrUser = tabsTransactionUserWallet

     const limit = 10

     const fetchTransactions = async (currentPage = 1, reset = false) => {

          setLoading(true)

          const getCond =
               userTransactionTab === "All"
                    ? ""
                    : userTransactionTab?.toLowerCase()

          const transact =
               await walletUserAPI.getWalletUserTransactions({
                    getCond,
                    currentPage,
                    limit
               }
               )

          const newData = transact?.data?.docs || []

          if (reset) {
               setTransactions(newData)
          } else {
               setTransactions((prev) => [...prev, ...newData])
          }

          if (newData.length < limit) {
               setHasMore(false)
          }

          setLoading(false)
     }

     useEffect(() => {
          setPage(1)
          setHasMore(true)
          fetchTransactions(1, true)
     }, [userTransactionTab])

     const handleLoadMore = () => {
          const nextPage = page + 1
          setPage(nextPage)
          fetchTransactions(nextPage)
     }

     return (
          <div className="bg-white rounded-xl border border-gray-200">

               <TablesHeaderUser tablesCommon={transactionTabsBusinessOrUser} />

               <table className="min-w-full border-collapse">

                    <thead className="bg-gray-50 border-b border-gray-100">
                         <tr>
                              {tablesTabHeader.map((tab, index) => (
                                   <th
                                        key={index}
                                        className="px-6 py-2.5 text-left text-[#22252b] text-[16px]"
                                   >
                                        {tab}
                                   </th>
                              ))}
                         </tr>
                    </thead>

                    <tbody>

                         {transactions?.length > 0 ? (

                              transactions.map((item) => (

                                   <tr key={item.orderId}>

                                        {/* ID */}
                                        <td className="px-6 py-3.5">
                                             <Link href={`/wallet/business/transaction-details/${item.orderId}`}>
                                                  <div className="text-[13px] font-medium text-gray-900">
                                                       {item?.orderId
                                                            ? item.orderId
                                                                 .slice(0, -5)
                                                                 .replace(/./g, "*") +
                                                            item.orderId.slice(-5)
                                                            : "N/A"}
                                                  </div>
                                             </Link>
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4 whitespace-nowrap">
                                             <span
                                                  className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                       item.status
                                                  )}`}
                                             >
                                                  {item.status || "Unknown"}
                                             </span>
                                        </td>

                                        {/* Amount */}
                                        <td className="px-6 py-3.5">
                                             <Link
                                                  href={`/wallet/business/transaction-details/${item.orderId}`}
                                                  className="flex items-center gap-3 text-[16px] font-semibold text-black"
                                             >
                                                  ${item.amount}
                                                  <MdKeyboardArrowRight />
                                             </Link>
                                        </td>

                                   </tr>

                              ))

                         ) : (

                              <tr>
                                   <td
                                        colSpan={tablesTabHeader.length}
                                        className="text-center py-6 text-gray-400"
                                   >
                                        No Data Found
                                   </td>
                              </tr>

                         )}

                    </tbody>

               </table>

               {/* LOAD MORE BUTTON */}

               {hasMore && transactions.length > 0 && (

                    <div className="flex justify-center py-6">

                         <Button
                              variant="default"
                              onClick={handleLoadMore}
                              disabled={loading}
                         >
                              {loading ? "Loading..." : "Load More"}
                         </Button>
                    </div>

               )}

          </div>
     )
}
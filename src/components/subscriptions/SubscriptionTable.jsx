import { getStatusColor, subscriptionTableHeaders } from "@/constants/index";
import { formatDate } from "@/helpers";
import subscriptionAPI from "@/services/subscriptionAPI"
import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import ReactPaginate from "react-paginate";

export default function SubscriptionTable() {
     const [subscription, setSubscription] = useState(null);
     const [status, setStatus] = useState("All Status");
     const [page, setPage] = useState(1);
     const [dropdownOpen, setDropdownOpen] = useState(false);

     useEffect(() => {
          const fetchAllSubscriptions = async () => {
               const response = await subscriptionAPI.getAllMySubscriptions({ page: page, status: status.toLowerCase() });
               setSubscription(response?.data);
          }
          fetchAllSubscriptions();
     }, [page, status])

     const handlePageClick = (data) => {
          setPage(data.selected + 1)
     }

     return (
          <div className="bg-white flex flex-col gap-4 px-4">
               <div className="relative flex justify-end">
                    <button
                         onClick={() => setDropdownOpen(!dropdownOpen)}
                         className="mt-4 flex items-center justify-between w-48 gap-2 px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-sm sm:text-base text-gray-800 hover:bg-gray-50"
                    >
                         <span>{status}</span>
                         <FiChevronDown className="w-4 h-4" />
                    </button>

                    {dropdownOpen && (
                         <div className="absolute z-10 mt-15 w-48 bg-white border border-gray-200 rounded-lg shadow-lg">
                              {["All Status", "Paid", "Failed"].map((val) => (
                                   <div
                                        key={val}
                                        onClick={() => {
                                             setStatus(val)
                                             setDropdownOpen(false)
                                        }}
                                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                                   >
                                        {val}
                                   </div>
                              ))}
                         </div>
                    )}
               </div>
               <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                         <table className="w-full min-w-[700px]">
                              <thead className="bg-gray-50 border-b border-gray-200">
                                   <tr>
                                        {subscriptionTableHeaders.map((val, index) => (
                                             <th
                                                  key={index}
                                                  className="px-3 sm:px-4 lg:px-6 py-3 text-left text-sm font-medium text-black uppercase tracking-wider"
                                             >
                                                  {val}
                                             </th>
                                        ))}
                                   </tr>
                              </thead>

                              <tbody className="divide-y divide-gray-200">
                                   {subscription?.docs?.length === 0 ? (
                                        <tr>
                                             <td
                                                  colSpan="5"
                                                  className="px-3 sm:px-4 lg:px-6 py-10 text-center text-gray-500"
                                             >
                                                  No active subscription found
                                             </td>
                                        </tr>
                                   ) : (
                                        subscription?.docs?.map((subs) => (
                                             <tr key={subs.invoiceId} className="hover:bg-gray-50">

                                                  <td className="px-3 sm:px-4 lg:px-6 py-4">
                                                       <div className="text-sm font-medium text-gray-900">
                                                            {formatDate(subs.startDate || subs.createdAt)}
                                                       </div>
                                                       <div className="text-sm text-gray-500">
                                                            {new Date(
                                                                 subs.startDate || subs.createdAt || Date.now()
                                                            ).toLocaleTimeString("en-US", {
                                                                 hour: "2-digit",
                                                                 minute: "2-digit",
                                                                 hour12: true,
                                                            })}
                                                       </div>
                                                  </td>

                                                  <td className="px-3 sm:px-4 lg:px-6 py-4 text-sm text-gray-500">
                                                       {subs.invoiceId}
                                                  </td>

                                                  <td className="px-3 sm:px-4 lg:px-6 py-4 text-sm text-gray-500">
                                                       {subs.planName}
                                                  </td>

                                                  <td className="px-3 sm:px-4 lg:px-6 py-4 text-sm text-gray-500">
                                                       ${subs.amount}
                                                  </td>

                                                  <td className="px-3 sm:px-4 lg:px-6 py-4">
                                                       <span
                                                            className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
                                                                 subs.status
                                                            )}`}
                                                       >
                                                            {subs.status}
                                                       </span>
                                                  </td>

                                             </tr>
                                        ))
                                   )}
                              </tbody>
                         </table>
                    </div>
               </div >
               <div className="flex items-center justify-between">
                    {subscription?.totalPages > 1 && (
                         <>
                              <div>
                                   <p className="text-black"> <span className="font-bold">Showing</span> {page} of {subscription?.totalPages}</p>
                              </div>
                              <ReactPaginate
                                   breakLabel="..."
                                   nextLabel="Next ›"
                                   previousLabel="‹ Back"
                                   onPageChange={handlePageClick}
                                   pageRangeDisplayed={2}
                                   pageCount={subscription?.totalPages || 0}
                                   renderOnZeroPageCount={null}
                                   containerClassName="flex items-center justify-center gap-2 mt-6"
                                   pageClassName=""
                                   pageLinkClassName="px-4 py-2 border border-black-400 bg-white text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                                   activeClassName=""
                                   activeLinkClassName="bg-gray-200 text-black font-semibold hover:cursor-pointer"
                                   previousClassName=""
                                   previousLinkClassName="px-4 py-2 border text-gray-400 bg-gray-100 cursor-not-allowed"
                                   nextClassName=""
                                   nextLinkClassName="px-4 py-2 bg-[#240457] text-white"
                                   breakClassName=""
                                   breakLinkClassName="px-3 py-2 text-gray-500"
                              />
                         </>
                    )}

               </div>

          </div>
     )
}
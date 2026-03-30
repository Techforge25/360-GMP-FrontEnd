export default function SubscriptionSummaryCards({ formatDate, formatCurrency, planName, statusLabel, renewalDate, planPrice, totalSpent }) {
     return (
          <>
               <div className="text-center space-y-2 mb-6 sm:mb-8 px-4">
                    <h2 className="text-xl sm:text-2xl font-medium text-gray-900">
                         Subscription History & Invoices
                    </h2>
                    <p className="text-sm sm:text-base text-gray-500">
                         Manage Your Billing Details And Download Past Invoices{" "}
                         <br className="hidden sm:block" /> For Global Manufacturing Co.
                    </p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                         <div className="flex items-center gap-2 mb-2">
                              <img
                                   src="/assets/images/workspace_premium.png"
                                   alt="check"
                                   className="w-3 h-4 sm:w-4 sm:h-5 flex-shrink-0"
                              />
                              <span className="text-gray-500 text-sm sm:text-base font-semibold">
                                   Current Plan
                              </span>
                         </div>
                         <p className="text-xl sm:text-2xl font-medium text-gray-900">
                              {planName}
                         </p>
                         <p className="text-sm sm:text-sm text-gray-500 mt-1">
                              Status: {statusLabel}
                         </p>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                         <div className="flex items-center gap-2 mb-2">
                              <img
                                   src="/assets/images/calendar_month.png"
                                   alt="check"
                                   className="w-3 h-4 sm:w-4 sm:h-5 flex-shrink-0"
                              />
                              <span className="text-gray-500 text-sm sm:text-base font-semibold">
                                   Next Billing Date
                              </span>
                         </div>
                         <p className="text-xl sm:text-2xl font-medium text-gray-900">
                              {formatDate(renewalDate)}
                         </p>
                         <p className="text-sm sm:text-sm text-gray-500 mt-1">
                              Amount: {formatCurrency(planPrice)}
                         </p>
                    </div>

                    <div className="bg-white p-4 sm:p-6 rounded-xl border border-gray-100 shadow-sm">
                         <div className="flex items-center gap-2 mb-2">
                              <img
                                   src="/assets/images/attach_money.png"
                                   alt="check"
                                   className="w-2.5 h-4 sm:w-3 sm:h-5 flex-shrink-0"
                              />
                              <span className="text-gray-500 text-sm sm:text-base font-semibold">
                                   Total Spent YTD
                              </span>
                         </div>
                         <p className="text-xl sm:text-2xl font-medium text-gray-900">
                              {formatCurrency(totalSpent)}
                         </p>
                    </div>
               </div>
          </>
     )
}
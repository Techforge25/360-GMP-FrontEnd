import { FiInfo } from "react-icons/fi";
import { SiStripe } from "react-icons/si";

export default function BillingAndPaymentMethod({ formatDate, formatCurrency, renewalDate, planPrice }
) {
     return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
               {/* Billing Cycle Card */}
               <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <h3 className="text-base sm:text-lg font-medium text-black mb-4 sm:mb-6">
                         Billing Cycle
                    </h3>

                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                         <div className="rounded-lg text-indigo-600 flex-shrink-0">
                              <img
                                   src="/assets/images/bilingIcon.png"
                                   alt="billingIcon"
                                   className="w-6 h-6 sm:w-auto sm:h-auto"
                              />
                              {/* Using Info icon as existing calendar one might differ, styled to match */}
                         </div>
                         <div>
                              <p className="text-sm sm:text-base text-gray-500 mb-1">
                                   Next billing date
                              </p>
                              <p className="text-base sm:text-lg font-medium text-black">
                                   {formatDate(renewalDate)}
                              </p>
                         </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-600 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 flex items-start sm:items-center gap-2 sm:gap-3">
                         <FiInfo className="w-4 h-4 sm:w-5 sm:h-5 text-white border border-blue-600 rounded-full bg-blue-600 mt-0.5 sm:mt-0 flex-shrink-0" />
                         <p className="text-sm sm:text-sm text-blue-500">
                              Your account will be charged{" "}
                              <span className="font-bold">{formatCurrency(planPrice)}</span>{" "}
                              automatically.
                         </p>
                    </div>
               </div>

               {/* Payment Method Card */}
               <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
                         <h3 className="text-base sm:text-lg font-medium text-black">
                              Payment Method
                         </h3>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 flex items-center justify-between">
                         <div className="flex items-center gap-2 sm:gap-3">
                              <div className="bg-white p-1 rounded border border-gray-200 flex-shrink-0">
                                   <SiStripe className="w-6 h-4 sm:w-8 sm:h-5 text-blue-600" />
                              </div>
                              <div>
                                   <p className="text-sm sm:text-base font-medium text-gray-900">
                                        stripe
                                   </p>
                              </div>
                         </div>
                         <img
                              src="/assets/images/check_circle.png"
                              alt="check"
                              className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0"
                         />
                    </div>
               </div>
          </div>
     )
}
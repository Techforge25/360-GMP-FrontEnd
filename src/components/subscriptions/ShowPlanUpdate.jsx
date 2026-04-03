import { ChevronLeft } from "lucide-react";
import { FiArrowRight, FiCheck, FiInfo } from "react-icons/fi";
import { SiStripe } from "react-icons/si";
import SubscriptionTable from "./SubscriptionTable";
import {
     Card as UICard,
     CardContent as UICardContent,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { usePathname } from "next/navigation";
import { formatCurrency, formatDate } from "@/helpers";

export default function ShowPlanUpdate({ totalSpent, loading, showPlans, handleSelectPlan, planName, planPrice, renewalDate, statusLabel, status, subscription, setShowPlans, plans, loadingPlans }) {
     const pathname = usePathname()
     return (
          <>
               {showPlans ? (
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16" >
                         <div className="flex justify-between items-center mb-8">
                              <button
                                   onClick={() => setShowPlans(false)}
                                   className="inline-flex items-center gap-2 text-[#240457] font-semibold hover:underline"
                              >
                                   <ChevronLeft className="w-5 h-5" />
                                   <span>Back to Overview</span>
                              </button>
                         </div>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
                              {loadingPlans ? (
                                   <div className="col-span-full py-20 text-center text-gray-500">
                                        Loading plans...
                                   </div>
                              ) : (
                                   plans.map((plan) => {
                                        const planKey = plan.name?.toLowerCase() || "";
                                        const isPremium =
                                             planKey.includes("premium") || planKey.includes("gold");
                                        const isSilver = planKey.includes("silver");

                                        return (
                                             <UICard
                                                  key={plan._id}
                                                  className={cn(
                                                       "flex flex-col transition-all duration-300 bg-white shadow-md hover:shadow-lg border",
                                                       isPremium
                                                            ? "scale-105 shadow-xl ring-1 ring-purple-100 border-purple-200"
                                                            : "border-gray-200",
                                                  )}
                                             >
                                                  <UICardContent className="p-8 flex-1 flex flex-col">
                                                       <div className="text-center mb-6">
                                                            <span
                                                                 className={cn(
                                                                      "px-4 py-1.5 rounded-full text-sm font-medium",
                                                                      isPremium
                                                                           ? "bg-purple-100 text-purple-700"
                                                                           : isSilver
                                                                                ? "bg-orange-100 text-orange-700"
                                                                                : "bg-green-100 text-green-700",
                                                                 )}
                                                            >
                                                                 {plan.name}
                                                            </span>
                                                       </div>

                                                       <div className="text-center mb-2">
                                                            <span className="text-5xl font-semibold text-gray-900">
                                                                 ${plan.price}
                                                            </span>
                                                            <span className="text-gray-500 ml-1">/month</span>
                                                       </div>

                                                       <p className="text-center text-gray-600 mb-8 text-sm">
                                                            {plan.description}
                                                       </p>

                                                       <Button
                                                            onClick={() => handleSelectPlan(plan)}
                                                            disabled={pathname.includes("business") && plan?.name === "TRIAL"}
                                                            className={cn(
                                                                 "w-full mb-8 font-medium",
                                                                 isPremium
                                                                      ? "bg-[#240457] text-white hover:bg-indigo-800"
                                                                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                                                            )}
                                                       >
                                                            {String(
                                                                 subscription?.planId || subscription?.plan?._id,
                                                            ) === String(plan._id)
                                                                 ? "Current Plan"
                                                                 : pathname.includes("business") && plan?.name === "TRIAL" ? "Not Valid For Business" : "Choose Plan"}
                                                       </Button>

                                                       <div className="space-y-4 mb-4">
                                                            {plan.features?.map((feature, i) => (
                                                                 <div key={i} className="flex items-start gap-3">
                                                                      <FiCheck className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                                      <span className="text-sm text-gray-700">
                                                                           {feature}
                                                                      </span>
                                                                 </div>
                                                            ))}
                                                       </div>
                                                  </UICardContent>
                                             </UICard>
                                        );
                                   })
                              )}
                         </div>
                    </div>
               ) : (
                    <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 space-y-4 sm:space-y-6">
                         {/* Active Plan Card */}
                         <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
                              {/* Gradient Background Effect */}
                              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-purple-50 via-white to-white pointer-events-none opacity-50" />

                              <div className="relative z-10">
                                   <span
                                        className={`inline-block px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-sm sm:text-sm font-semibold mb-4 sm:mb-6 ${status === "active"
                                             ? "bg-[#E6F6E9] border border-[#0B8806] text-[#0B8806]"
                                             : "bg-red-50 border border-red-500 text-red-600"
                                             }`}
                                   >
                                        {statusLabel}
                                   </span>

                                   <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 mb-2">
                                        {loading ? "Loading plan..." : planName}
                                   </h2>

                                   <div className="flex items-baseline gap-1 mb-2">
                                        <span className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#240457]">
                                             ${planPrice}
                                        </span>
                                        <span className="text-[#240457] text-base sm:text-lg">
                                             /Month
                                        </span>
                                   </div>

                                   <p className="text-sm sm:text-base text-gray-700 mb-6 sm:mb-8">
                                        Renews Automatically On {formatDate(renewalDate)}
                                   </p>

                                   <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                                        <button
                                             onClick={() => {
                                                  localStorage.setItem("planUpdate", true)
                                                  localStorage.setItem("planUpdateRoute", pathname)
                                                  setShowPlans(true)
                                             }}
                                             className="flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#240457] text-white rounded-lg text-sm sm:text-base font-medium hover:bg-gray-900 transition-colors"
                                        >
                                             <span>Update Plan</span>
                                             <FiArrowRight />
                                        </button>
                                   </div>
                              </div>
                         </div>

                         {/* Lower Grid Section */}
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

                         {/* Subscription History & Invoices Section */}
                         <div className="pt-8 sm:pt-10 lg:pt-12">
                              <div className="text-center space-y-2 mb-6 sm:mb-8 px-4">
                                   <h2 className="text-xl sm:text-2xl font-medium text-gray-900">
                                        Subscription History & Invoices
                                   </h2>
                                   <p className="text-sm sm:text-base text-gray-500">
                                        Manage Your Billing Details And Download Past Invoices{" "}
                                        <br className="hidden sm:block" /> For Global Manufacturing Co.
                                   </p>
                              </div>
                              {/* Summary Cards */}
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
                                             Amount: ${planPrice}
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
                                             ${totalSpent}
                                        </p>
                                   </div>
                              </div>
                              <SubscriptionTable />
                         </div>
                    </div>
               )
               }
          </>
     )
}
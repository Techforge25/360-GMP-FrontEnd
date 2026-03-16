import { getAmounts } from "@/helpers/wallet";
import { DollarSign } from "lucide-react";

export default function FinancialBreakdown({ data }) {
     const getAmountsFinancial = getAmounts(data)
     return (
          <div className="rounded-lg border bg-white border-border bg-card p-6">
               <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center bg-[#f1f1f0] text-primary">
                         <DollarSign className="h-4 w-4" color="#240457" />
                    </div>
                    <h2 className="text-lg font-semibold text-black">Financial Breakdown</h2>
               </div>
               <div className="border-t border-border" />
               <div className="space-y-0">
                    <div className="py-8">
                         {getAmountsFinancial?.map((breakdown, index) => {
                              return (
                                   <div className="flex items-center justify-between py-4" key={index}>
                                        <div>
                                             <p className="text-lg font-semibold text-black">{breakdown?.type}</p>
                                             <p className="mt-0.5 text-md text-[#768299]">{breakdown?.desc}</p>
                                        </div>
                                        <p className={`text-base font-bold text-black`}>${breakdown?.amount}</p>
                                   </div>
                              )
                         })}
                    </div>
                    <div className="border-t-2 border-dashed border-border" />
                    <div className="flex items-center justify-between pt-4">
                         <div>
                              <p className="text-lg font-semibold text-black">Total Net Payout</p>
                         </div>
                         <p className="text-base font-bold text-black">${data?.netAmount}</p>
                    </div>
               </div>
          </div>
     );
};
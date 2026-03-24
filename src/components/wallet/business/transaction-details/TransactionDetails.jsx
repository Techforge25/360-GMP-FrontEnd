import { getTransactionDetails } from "@/helpers/wallet"
import Image from "next/image"

export default function TransactionDetails({ data }) {
     console.log(data, "data")
     const getTransaction = getTransactionDetails(data)
     return (
          <div className="rounded-lg bg-white border border-border bg-card p-6 my-3">
               <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary">
                         <Image src={"/assets/images/transaction-timeline.png"} width={32} height={30} alt="transaction" />
                    </div>
                    <h2 className="text-lg font-semibold text-black">Transaction Details</h2>
               </div>
               <div className="mb-4 border-t border-border" />
               <div className="relative ml-2 space-y-0">
                    {getTransaction?.map((event, index) => (
                         <div key={index} className="relative pb-8 last:pb-0">
                              <div className="-mt-0.5">
                                   <p className="text-[#8c9ca8] font-medium">
                                        {event.key}
                                   </p>
                                   <p className="font-bold text-gray-900">
                                        {event.value}
                                   </p>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     )
}
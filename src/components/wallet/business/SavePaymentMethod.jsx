import { Button } from "@/components/ui/Button";
import { paymentCards } from "@/constants/index";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";

export default function SavePaymentMethod() {
     return (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
               <div className="flex items-center justify-between pb-5">
                    <h2 className="text-base font-semibold text-gray-900">Save Payment Method</h2>
                    <Button className="h-9 text-[14px] font-semibold border-text-primary hover:text-text-primary text-text-primary bg-indigo-50 hover:bg-indigo-100"
                         variant="outline">Add New Payment Method &nbsp; <FaArrowRight />
                    </Button>
               </div>

               <div className="flex flex-col gap-3">
                    {paymentCards.map((card, index) => {
                         return (
                              <div key={index} className="flex items-center justify-between px-3 bg-[#f8f8f8] py-3.5 border-b border-gray-100">
                                   <div className="flex items-center gap-4">
                                        <Image src={card.logo} width={44} height={44} alt="card" />
                                        <div className="flex flex-col">
                                             <p className="text-[13px] font-semibold text-gray-900">{card.cardName}</p>
                                             <div className="text-xs text-gray-400">globalmanufacturing@gmail.com</div>
                                        </div>
                                   </div>
                                   <button className={`text-[13px] ${card.btnText === "Disconnect" ? "text-red-500 font-medium hover:text-red-600" : "text-brand-primary font-medium hover:text-brand-primary"}  cursor-pointer bg-transparent border-0`}>{card.btnText}</button>
                              </div>
                         )
                    })}
               </div>
          </div>
     )
}
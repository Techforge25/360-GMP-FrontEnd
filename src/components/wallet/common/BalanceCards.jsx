import Image from "next/image";

export default function BalanceCards({ cards, card }) {
     const cardGrid = card === "user" ? "grid grid-cols-2 gap-4 pb-4" : "grid grid-cols-1 md:grid-cols-4 gap-4 pb-4"
     return (
          <div className={cardGrid}>
               {cards?.map((card, index) => {
                    const textClass = card.text2 === "Available for withdrawal" ? "text-[#0b8806]" : card.text2 === "Held in escrow" ? "text-[#ff8d28]" : card.text2 === "Total Sales Volume" ? "text-[#185ADB]" : "text-[#768299]"
                    return (
                         <div key={index} className="bg-white rounded-xl border border-gray-200 p-5 flex justify-between items-start">
                              <div>
                                   <div className="text-[22px] font-bold text-gray-900 tracking-tight">${card.amount}</div>
                                   <div className="text-xs text-gray-500 mt-1">{card.text}</div>
                                   <div className={`text-xs ${textClass} font-medium mt-5`}>{card.text2}</div>
                              </div>
                              <div className="bg-emerald-100 rounded-lg w-9 h-9 flex items-center justify-center shrink-0">
                                   <Image src={card.icon} width={42} height={42} alt="icon" />
                              </div>
                         </div>
                    )
               })}
          </div>
     )
}
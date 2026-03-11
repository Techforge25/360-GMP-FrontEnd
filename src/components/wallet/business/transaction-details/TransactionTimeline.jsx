import { events } from "@/constants/index";
import Image from "next/image";

export default function TransactionTimeline() {
     return (
          <div className="rounded-lg border border-border bg-card p-6">
               <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-primary">
                         <Image src={"/assets/images/transaction-timeline.png"} width={32} height={30} alt="transaction" />
                    </div>
                    <h2 className="text-lg font-semibold text-black">Transaction Timeline</h2>
               </div>
               <div className="mb-4 border-t border-border" />
               <div className="relative ml-2 space-y-0">
                    {events.map((event, index) => (
                         <div key={index} className="relative flex gap-2 pb-8 last:pb-0">
                              <Image src={event.isLast ? "/assets/images/timeline-purple.png" : "/assets/images/timeline-gray.png"} width={14} height={73} alt="timeline" />
                              <div className="relative z-10 mt-1.5 h-3 w-3 flex-shrink-0 rounded-full bg-timeline-dot" />
                              <div className="-mt-0.5">
                                   <p className="text-xs text-[#768299]">
                                        {event.date} <span className="text-[#768299]">● {event.time}</span>
                                   </p>
                                   <h3 className="mt-1 text-sm font-semibold text-black">{event.title}</h3>
                                   {event.description && <p className="mt-0.5 text-sm text-[#768299]">{event.description}</p>}
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};
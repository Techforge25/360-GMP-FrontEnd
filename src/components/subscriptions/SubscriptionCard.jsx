import { FiInfo } from "react-icons/fi";
import {
     Card as UICard,
     CardContent as UICardContent,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";

export default function SubscriptionCard({ handlePaymentConfirm, checkStatusDetail, isProcessing, setCheckStatusDetail }) {
     return (
          <>
               {checkStatusDetail && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                         <UICard className="w-full max-w-md bg-white shadow-2xl">
                              <UICardContent className="p-8 text-center pt-10">
                                   <div
                                        className={cn(
                                             "mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4",
                                             checkStatusDetail.type === "same"
                                                  ? "bg-blue-50"
                                                  : "bg-amber-50",
                                        )}
                                   >
                                        {checkStatusDetail.type === "same" ? (
                                             <FiInfo className="w-8 h-8 text-blue-500" />
                                        ) : (
                                             <IoMdInformationCircleOutline className="w-8 h-8 text-amber-500" />
                                        )}
                                   </div>
                                   <h2 className="text-xl font-bold mb-2">
                                        {checkStatusDetail.type === "same"
                                             ? "Already Subscribed"
                                             : "Change Subscription"}
                                   </h2>
                                   <p className="text-sm text-text-secondary mb-6 leading-relaxed">
                                        {checkStatusDetail.message}
                                   </p>

                                   <div className="flex gap-4">
                                        <Button
                                             variant="outline"
                                             onClick={() => setCheckStatusDetail(null)}
                                             className="flex-1"
                                        >
                                             {checkStatusDetail.type === "same" ? "Close" : "Cancel"}
                                        </Button>
                                        {checkStatusDetail.type !== "same" && (
                                             <Button
                                                  onClick={() => handlePaymentConfirm(checkStatusDetail)}
                                                  isLoading={isProcessing}
                                                  className="flex-1 bg-[#240457] text-white"
                                             >
                                                  Confirm & Proceed
                                             </Button>
                                        )}
                                   </div>
                              </UICardContent>
                         </UICard>
                    </div>
               )}
          </>
     )
}

const IoMdInformationCircleOutline = ({ className, size }) => (
     <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 512 512"
          className={className}
          height={size}
          width={size}
          xmlns="http://www.w3.org/2000/svg"
     >
          <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48zm0 400c-105.87 0-192-86.13-192-192S150.13 64 256 64s192 86.13 192 192-86.13 192-192 192z"></path>
          <path d="M272 240H240a16 16 0 0 0-16 16v112a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V256a16 16 0 0 0-16-16zM256 160a24 24 0 1 0 24 24 24 24 0 0 0-24-24z"></path>
     </svg>
);
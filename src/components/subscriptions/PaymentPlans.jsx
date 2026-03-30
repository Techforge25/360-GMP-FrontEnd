import { Button } from "@/components/ui/Button";
import {
     Card as UICard,
     CardContent as UICardContent,
} from "@/components/ui/Card";

export default function PaymentPlans({
     paymentPlan,
     setPaymentPlan,
     handlePaymentConfirm,
     isProcessing,
}) {
     if (!paymentPlan) return null;

     return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
               <UICard className="w-full max-w-lg bg-white shadow-2xl">
                    <UICardContent className="p-8 text-center pt-10">
                         <h2 className="text-xl font-medium mb-1">
                              Get Ready To{" "}
                              <span className="text-brand-primary">
                                   Unlock {paymentPlan.name}
                              </span>
                         </h2>
                         <p className="text-base text-text-secondary mb-8">
                              Select Payment Method
                         </p>

                         <div className="flex gap-4 justify-center mb-8">
                              <button className="flex-1 h-14 border rounded-md flex items-center justify-center gap-2 border-brand-primary ring-1 ring-brand-primary bg-brand-primary/5">
                                   <span className="font-bold text-indigo-600 flex items-center gap-1">
                                        <div className="w-4 h-4 rounded-full border-4 border-indigo-600"></div>
                                        stripe
                                   </span>
                              </button>
                         </div>

                         <div className="flex gap-4">
                              <Button
                                   variant="outline"
                                   onClick={() => setPaymentPlan(null)}
                                   className="flex-1"
                              >
                                   Cancel
                              </Button>
                              <Button
                                   onClick={handlePaymentConfirm}
                                   isLoading={isProcessing}
                                   className="flex-1 bg-[#240457] text-white"
                              >
                                   Confirm
                              </Button>
                         </div>
                    </UICardContent>
               </UICard>
          </div>
     );
}
"use client"
import { Button } from "@/components/ui/Button";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function FundAddCard() {
     const [amount, setAmount] = useState("");
     const [loading, setLoading] = useState(false)
     const quickAmounts = [50, 100, 200, 300];
     const router = useRouter()

     const handleQuickAmount = (val) => {
          setAmount((prev) => String((parseFloat(prev) || 0) + val));
     };

     const addFunds = async () => {
          try {
               const res = await api.post({
                    url: "/wallet/user/add-funds",
                    payload: {
                         funds: amount
                    },
               });

               if (res.success) {
                    window.open(res.data, "_blank");
               }
          } catch (err) {
               toast.error(err)
          } finally {
               setLoading(false);
          }
     }

     return (
          <div className="rounded-2xl px-10 py-8" style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #F0FDF4 100%)", border: "1px solid #E5E7EB" }}>
               <h1 className="text-center mb-6" style={{ fontSize: "22px", fontWeight: 600, color: "#111827", letterSpacing: "-0.01em" }}>
                    Add Fund Amount
               </h1>
               <div className="bg-white rounded-xl mx-auto px-6 py-5" style={{ maxWidth: "440px", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                    <div className="flex items-center gap-1 mb-4">
                         <span style={{ fontSize: "22px", fontWeight: 400, color: "#374151", lineHeight: 1 }}>$</span>
                         <input
                              type="number"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                              placeholder="0"
                              className="outline-none border-none bg-transparent"
                              style={{ fontSize: "36px", fontWeight: 700, color: "#111827", width: "100%", lineHeight: 1, caretColor: "#111827" }}
                         />
                         <span style={{ fontSize: "28px", fontWeight: 300, color: "#9CA3AF", lineHeight: 1 }}>|</span>
                    </div>
                    <div className="flex items-center gap-3">
                         {quickAmounts.map((val) => (
                              <button
                                   key={val}
                                   onClick={() => handleQuickAmount(val)}
                                   style={{ fontSize: "13px", fontWeight: 500, color: "#374151", backgroundColor: "#F3F4F6", border: "1px solid #E5E7EB", borderRadius: "6px", padding: "4px 12px", cursor: "pointer" }}
                              >
                                   + ${val}
                              </button>
                         ))}
                    </div>
               </div>
               {amount && (
                    <div className="bg-[#9747ff] flex items-center justify-between rounded-xl mx-auto px-6 py-5 mt-3" style={{ maxWidth: "440px", border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                         <div className="flex flex-col gap-1 mb-4">
                              <span style={{ fontSize: "16px", fontWeight: 400, color: "#768299" }}>Total to pay</span>
                              <h4 style={{ fontSize: "24px", fontWeight: 400, color: "#FFFFFF" }}>${amount}</h4>
                         </div>
                         <div>
                              <Button onClick={() => addFunds()} variant="secondary" disabled={loading}>
                                   Proceed To Payment&nbsp; <FaArrowRightLong />
                              </Button>
                         </div>
                    </div>
               )}

          </div>
     )
}
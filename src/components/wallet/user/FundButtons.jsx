"use client"
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { MdSend } from "react-icons/md";

export default function FundButtons() {
     const router = useRouter()
     return (
          <div className="flex items-center gap-5 py-6">
               <Button variant="secondary">
                    Withdraw&nbsp; <MdSend color="#240457" />
               </Button>
               <Button variant="default" onClick={() => router.push("/wallet/user/add-fund")}>
                    Add Fund&nbsp; <FaCircleDollarToSlot />
               </Button>
          </div>
     )
}
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import WithDrawButton from "../common/WithdrawButton";

export default function TabsRight({ activeTabs }) {
     const [withdrawOpen, setWithdrawOpen] = useState(false);
     return (
          <>
               {activeTabs === "My Wallet" && (
                    <>
                         <Button variant="default" onClick={() => setWithdrawOpen(true)}>
                              Withdraw&nbsp; <FaCircleDollarToSlot />
                         </Button>
                         <WithDrawButton withdrawOpen={withdrawOpen} setWithdrawOpen={setWithdrawOpen} />
                    </>


               )}
          </>
     )
}
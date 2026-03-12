"use client"
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import BalanceCards from "@/components/wallet/common/BalanceCards";
import WalletBanner from "@/components/wallet/common/WalletBanner";
import { cardsUser } from "@/constants/index";
import FundButtons from "@/components/wallet/user/FundButtons";
import SpendingChart from "./SpendingChart";
import RecentTransactions from "./RecentTransactions";

export default function UserWalletMainComp() {
     return (
          <>
               <AuthNavbar />
               <WalletBanner activeTabs={"Welcome Back Alex"} />
               <div className="font-sans px-6 bg-gray-50">
                    <FundButtons />
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-5">
                         <div className="">
                              <BalanceCards cards={cardsUser} card="user" />
                              <SpendingChart />
                         </div>
                         <RecentTransactions />
                    </div>
               </div>
          </>
     );
}
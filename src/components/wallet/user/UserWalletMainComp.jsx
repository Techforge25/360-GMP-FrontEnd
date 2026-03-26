"use client"
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import BalanceCards from "@/components/wallet/common/BalanceCards";
import WalletBanner from "@/components/wallet/common/WalletBanner";
import { cardsUser } from "@/constants/index";
import FundButtons from "@/components/wallet/user/FundButtons";
import SpendingChart from "./SpendingChart";
import RecentTransactions from "./RecentTransactions";
import { useEffect, useState } from "react";
import walletUserAPI from "@/services/walletUserAPI";
import { getUserAnalytics } from "@/helpers/wallet";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function UserWalletMainComp() {
     const [analytics, setAnalytics] = useState(null)
     useEffect(() => {
          const fetchAnalytics = async () => {
               const response = await walletUserAPI.getWalletUserAnalytics()
               const analyticsDashboard = getUserAnalytics(response.data, response.message)
               setAnalytics(analyticsDashboard)
          }
          fetchAnalytics()
     }, [])

     return (
          <>
               <AuthNavbar />
               <WalletBanner activeTabs={"Welcome Back"} />
               <div className="font-sans px-6 bg-gray-50">
                    <FundButtons />
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-5">
                         <div className="">
                              <BalanceCards cards={analytics} card="user" />
                              <SpendingChart />
                         </div>
                         <RecentTransactions />
                    </div>
               </div>
               <DashboardFooter />
          </>
     );
}
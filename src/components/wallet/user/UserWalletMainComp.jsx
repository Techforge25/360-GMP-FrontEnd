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

export default function UserWalletMainComp() {
     const [analytics, setAnalytics] = useState(null)
     const [errMsg, setErrMsg] = useState("")
     useEffect(() => {
          const fetchAnalytics = async () => {
               const response = await walletUserAPI.getWalletUserAnalytics()
               console.log(response.message, "responsess")
               // if (response.message === "You need to setup your wallet account") {
               //      setErrMsg(response.message)
               // } else {
               const analyticsDashboard = getUserAnalytics(response.data, response.message)
               setAnalytics(analyticsDashboard)
               // }
          }
          fetchAnalytics()
     }, [])

     // useEffect(() => {
     //      const loggedIn = JSON.parse(localStorage.getItem("user"))
     //      setProfile(loggedIn.profileData)
     // }, [])

     console.log(errMsg, "error message")
     return (
          <>
               <AuthNavbar />
               <WalletBanner activeTabs={"Welcome Back"} />
               <div className="font-sans px-6 bg-gray-50">
                    <FundButtons />
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_500px] gap-5">
                         <div className="">
                              {errMsg !== "" ? (
                                   <>
                                        <p className="text-[#240457] text-center my-3">Please setup your wallet Account to view Balance.</p>
                                        <p>Setup Account</p>
                                   </>
                              ) : (
                                   <BalanceCards cards={analytics} card="user" />
                              )}
                              <SpendingChart />
                         </div>
                         <RecentTransactions />
                    </div>
               </div>
          </>
     );
}
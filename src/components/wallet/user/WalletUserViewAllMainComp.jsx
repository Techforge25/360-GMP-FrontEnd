"use client"
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import WalletBanner from "@/components/wallet/common/WalletBanner";
import { walletTransactionTabs } from "@/constants/index";
import { WalletProvider } from "@/context/WalletContext";
import walletUserAPI from "@/services/walletUserAPI";
import { useEffect, useState } from "react";
import TablesUser from "@/components/wallet/user/TableUser";

export default function WalletUserViewAllMainComp() {
     const [userName, setUserName] = useState("")
     const tablesHeader = walletTransactionTabs
     useEffect(() => {
          const getName = () => {
               const name = JSON.parse(localStorage.getItem("user"))
               setUserName(name?.profilePayload?.fullName)
          }
          getName()
     }, [])
     return (
          <>
               <WalletProvider>
                    <AuthNavbar />
                    <WalletBanner activeTabs={`Welcome Back ${userName ?? "User"}`} />
                    <div className="font-sans px-6 bg-gray-50 min-h-screen">
                         <TablesUser tablesTabHeader={tablesHeader} />
                    </div>
               </WalletProvider>
          </>
     );
}
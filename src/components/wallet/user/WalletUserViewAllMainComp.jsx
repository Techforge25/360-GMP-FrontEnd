"use client"
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import WalletBanner from "@/components/wallet/common/WalletBanner";
import { walletTransactionTabs } from "@/constants/index";
import { WalletProvider } from "@/context/WalletContext";
import walletUserAPI from "@/services/walletUserAPI";
import { useEffect, useState } from "react";
import TablesUser from "@/components/wallet/user/TableUser";

export default function WalletUserViewAllMainComp() {
     const [transactions, setTransactions] = useState()
     const [userName, setUserName] = useState("")
     const tablesHeader = walletTransactionTabs
     useEffect(() => {
          const fetchTransactions = async () => {
               const transact = await walletUserAPI.getWalletUserTransactions()
               setTransactions(transact.data.docs)
          }
          const name = JSON.parse(localStorage.getItem("user"))
          console.log(name?.profilePayload?.fullName, "names")
          setUserName(name?.profilePayload?.fullName)
          fetchTransactions()
     }, [])

     return (
          <>
               <WalletProvider>
                    <AuthNavbar />
                    <WalletBanner activeTabs={`Welcome Back ${userName ?? "User"}`} />
                    <div className="font-sans px-6 bg-gray-50 min-h-screen">
                         <TablesUser tableData={transactions} tablesTabHeader={tablesHeader} />
                    </div>
               </WalletProvider>
          </>
     );
}
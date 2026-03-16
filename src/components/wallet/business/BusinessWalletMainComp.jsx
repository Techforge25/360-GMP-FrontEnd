"use client"
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import BusinessWalletTabs from "@/components/wallet/business/BusinessWalletTabs";
import NeedHelp from "@/components/wallet/business/NeedHelp";
import BalanceCards from "@/components/wallet/common/BalanceCards";
import WalletBanner from "@/components/wallet/common/WalletBanner";
import Chart from "@/components/wallet/business/Chart";
import { useWallet } from "@/context/WalletContext";
import { walletMyWalletsTabs, walletTransactionTabs, walletEarningsTabs } from "@/constants/index";
import walletBusinessAPI from "@/services/walletBusinessAPI";
import { useEffect, useState } from "react";
import { getAnalytics } from "@/helpers/wallet";
import { useTablesData } from "@/hooks/useTablesData";
import TablesBusiness from "@/components/wallet/business/TablesBusiness";

export default function BusinessWalletMainComp() {
     const { activeTabs } = useWallet()
     const [analytics, setAnalytics] = useState(null)
     const tablesTabHeader = activeTabs === "Transactions" ? walletTransactionTabs : activeTabs === "My Wallet" ? walletMyWalletsTabs : walletEarningsTabs
     const tablesData = useTablesData(activeTabs)

     useEffect(() => {
          const fetchAnalytics = async () => {
               const response = await walletBusinessAPI.getWalletBusinessAnalytics()
               const analyticsDashboard = getAnalytics(response.data)
               setAnalytics(analyticsDashboard)
          }
          fetchAnalytics()
     }, [])

     return (
          <>
               <AuthNavbar />
               <WalletBanner activeTabs={activeTabs} />
               <div className="font-sans px-6 bg-gray-50 min-h-screen">
                    <BusinessWalletTabs />
                    {activeTabs === "My Wallet" && (
                         <>
                              <BalanceCards cards={analytics} card="business" />
                         </>
                    )}
                    {activeTabs === "Earnings" && (
                         <>
                              <BalanceCards cards={analytics} card="business" />
                              <Chart />
                         </>
                    )}
                    <TablesBusiness tableData={tablesData} tablesTabHeader={tablesTabHeader} />
                    {activeTabs === "My Wallet" && <NeedHelp />}
               </div>
          </>
     );
}
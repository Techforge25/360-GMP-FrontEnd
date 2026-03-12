"use client"
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import WalletBanner from "@/components/wallet/common/WalletBanner";
import { walletTransactionTabs } from "@/constants/index";
import Tables from "@/components/wallet/common/Tables";
import { WalletProvider } from "@/context/WalletContext";

export default function ViewAllTransactions() {
     const tablesHeader = walletTransactionTabs
     return (
          <>
               <WalletProvider>
                    <AuthNavbar />
                    <WalletBanner activeTabs={"Welcome Back Alex"} />
                    <div className="font-sans px-6 bg-gray-50 min-h-screen">
                         <Tables tablesTabHeader={tablesHeader} />
                    </div>
               </WalletProvider>
          </>
     );
}
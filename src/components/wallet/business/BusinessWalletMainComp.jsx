"use client"
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import BusinessWalletTabs from "@/components/wallet/business/BusinessWalletTabs";
import NeedHelp from "@/components/wallet/business/NeedHelp";
import SavePaymentMethod from "@/components/wallet/business/SavePaymentMethod";
import BalanceCards from "@/components/wallet/common/BalanceCards";
import Tables from "@/components/wallet/common/Tables";
import WalletBanner from "@/components/wallet/common/WalletBanner";
import Chart from "../common/Chart";
import { useWallet } from "@/context/WalletContext";

export default function BusinessWalletMainComp() {
     const { activeTabs } = useWallet()
     return (
          <>
               <AuthNavbar />
               <WalletBanner />
               <div className="font-sans px-6 bg-gray-50 min-h-screen">
                    <BusinessWalletTabs />
                    <BalanceCards />
                    {activeTabs === "My Wallet" ? <SavePaymentMethod /> : <Chart />}
                    <Tables />
                    <NeedHelp />
               </div>
          </>
     );
}
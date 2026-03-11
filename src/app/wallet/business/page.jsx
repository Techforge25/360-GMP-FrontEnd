import BusinessWalletMainComp from "@/components/wallet/business/BusinessWalletMainComp";
import { WalletProvider } from "@/context/WalletContext";

export default function BusinessWalletPage() {
     return (
          <WalletProvider>
               <BusinessWalletMainComp />
          </WalletProvider>
     )
}
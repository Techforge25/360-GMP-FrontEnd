
import WalletUserViewAllMainComp from "@/components/wallet/user/WalletUserViewAllMainComp";
import { WalletProvider } from "@/context/WalletContext";

export default function ViewAllTransactions() {
     return (
          <>
               <WalletProvider>
                    <WalletUserViewAllMainComp />
               </WalletProvider>
          </>
     );
}
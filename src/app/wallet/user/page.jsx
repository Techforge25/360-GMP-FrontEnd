import UserWalletMainComp from "@/components/wallet/user/UserWalletMainComp";
import { WalletProvider } from "@/context/WalletContext";

export default function UserWallet() {
    return (
        <WalletProvider>
            <UserWalletMainComp />
        </WalletProvider>
    )
}
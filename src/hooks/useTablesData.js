import { useWallet } from "@/context/WalletContext"
import walletBusinessAPI from "@/services/walletBusinessAPI"
import { useEffect, useState } from "react"

export const useTablesData = (activeTabs) => {
     const [tablesData, setTablesData] = useState(null)
     const { userTransactionTab } = useWallet()
     useEffect(() => {
          const fetchRecentTransactions = async () => {
               try {
                    let data = null

                    if (activeTabs === "My Wallet") {
                         const response = await walletBusinessAPI.getWalletBusinessTransactions({
                              type: userTransactionTab
                         })
                         data = response.data.docs
                    }
                    else if (activeTabs === "Earnings") {
                         const response = await walletBusinessAPI.getBusinessEarnings()
                         data = response.data.docs
                    }
                    else {
                         const response = await walletBusinessAPI.getWithdrawalsEarning()
                         data = response.data.docs
                    }

                    setTablesData(data)
               } catch (error) {
                    console.error("Error fetching tables data", error)
               }
          }

          fetchRecentTransactions()

     }, [activeTabs, userTransactionTab])

     return tablesData
}
import { useWallet } from "@/context/WalletContext"
import walletBusinessAPI from "@/services/walletBusinessAPI"
import { useEffect, useState } from "react"

export const useTablesData = (activeTabs) => {
     const [tablesData, setTablesData] = useState([])
     const [page, setPage] = useState(1)
     const [hasMore, setHasMore] = useState(true)
     const [loading, setLoading] = useState(false)

     const { userTransactionTab } = useWallet()

     const fetchRecentTransactions = async (pageNumber = 1, isLoadMore = false) => {
          try {
               setLoading(true)
               let response

               if (activeTabs === "My Wallet") {
                    response = await walletBusinessAPI.getWalletBusinessTransactions({
                         type: userTransactionTab,
                         page: pageNumber,
                         limit: 10
                    })
               }
               else if (activeTabs === "Earnings") {
                    response = await walletBusinessAPI.getBusinessEarnings({
                         page: pageNumber,
                         limit: 10
                    })
               }
               else {
                    response = await walletBusinessAPI.getWithdrawalsEarning({
                         page: pageNumber,
                         limit: 10
                    })
               }

               const newData = response.data.docs || []

               setTablesData(prev =>
                    isLoadMore ? [...prev, ...newData] : newData
               )

               const currentPage = response.data.page || pageNumber
               const totalPages = response.data.totalPages || 1

               setHasMore(currentPage < totalPages)
               setPage(currentPage)

          } catch (error) {
               console.error("Error fetching tables data", error)
          } finally {
               setLoading(false)
          }
     }

     const loadMore = () => {
          if (!loading && hasMore) {
               fetchRecentTransactions(page + 1, true)
          }
     }

     useEffect(() => {
          setTablesData([])
          setPage(1)
          setHasMore(true)
          fetchRecentTransactions(1, false)
     }, [activeTabs, userTransactionTab])

     return {
          data: tablesData,
          loadMore,
          hasMore,
          loading
     }
}
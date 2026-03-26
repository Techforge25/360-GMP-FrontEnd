import api from "@/lib/axios";

class WalletBusinessAPI {
     // get business wallet analytics
     async getWalletBusinessAnalytics(params) {
          // If params contain arrays (like industries), we might need to join them
          // But BusinessesPageContent will handle joining for regex fields
          const url = `/wallet/business/analytics`
          return await api.get({
               url,
               activateLoader: true,
               enableSuccessMessage: false,
               enableErrorMessage: true,
          });
     }

     // get business recent transactions
     async getWalletBusinessTransactions(params) {
          const { type, page, limit } = params
          const url = type === "All" ? `/wallet/business/recent-transaction?page=${page}&limit=${limit}` : `/wallet/business/recent-transaction?type=${type.toLowerCase()}&page=${page}&limit=${limit}`
          return await api.get({
               url,
               activateLoader: true,
               enableSuccessMessage: false,
               enableErrorMessage: true,
          });
     }

     // get business earnings
     async getBusinessEarnings(params) {
          const { page, limit } = params
          const url = `/wallet/business/earnings?page=${page}&limit=${limit}`
          return await api.get({
               url,
               activateLoader: true,
               enableSuccessMessage: false,
               enableErrorMessage: true,
          });
     }

     // get financial performance
     async getFinancialPerformance() {
          const url = "/wallet/business/financialPerformance"
          return await api.get({
               url,
               activateLoader: true,
               enableSuccessMessage: false,
               enableErrorMessage: true,
          });
     }

     // get single transaction details
     async getSingleTransactionDetails(orderId) {
          return await api.get({
               url: `/orders/${orderId}/view`,
               activateLoader: true,
               enableSuccessMessage: false,
               enableErrorMessage: true,
               withCredentials: true,
          });
     }

     // get withdrawals earning
     async getWithdrawalsEarning(params) {
          const { page, limit } = params
          const url = `/wallet/business/withdrawals?page=${page}&limit=${limit}`
          return await api.get({
               url,
               activateLoader: true,
               enableSuccessMessage: false,
               enableErrorMessage: true,
          });
     }
}

const walletBusinessAPI = new WalletBusinessAPI();

export default walletBusinessAPI;

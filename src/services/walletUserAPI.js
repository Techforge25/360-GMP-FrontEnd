import api from "@/lib/axios";

class WalletUserAPI {
     // get business wallet analytics
     async getWalletUserAnalytics() {
          const url = "/wallet/user/analytics"
          return await api.get({
               url,
               activateLoader: true,
               enableSuccessMessage: false,
               enableErrorMessage: true,
          });
     }

     // get financial performance
     async getSpendingActivity() {
          const url = "/wallet/user/spending-activity"
          return await api.get({
               url,
               activateLoader: true,
               enableSuccessMessage: false,
               enableErrorMessage: true,
          });
     }

     // get financial performance
     async getWalletUserTransactions(params) {
          console.log(params, "paramter")
          const url = params.getCond !== "" ? `/wallet/user/purchases?type=${params.getCond}&page=${params.currentPage}&limit=${params.limit}` : `/wallet/user/purchases?page=${params.currentPage}&limit=${params.limit}`
          return await api.get({
               url,
               activateLoader: true,
               enableSuccessMessage: false,
               enableErrorMessage: true,
          });
     }
}

const walletUserAPI = new WalletUserAPI();

export default walletUserAPI;

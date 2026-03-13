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
     async getWalletUserTransactions(params = {}) {
          const queryParams = new URLSearchParams(params).toString().toLowerCase();
          const url = queryParams ? `/wallet/user/purchases?type=${params}` : "/wallet/user/purchases"
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

export const getAnalytics = (analytics) => {
     return [
          {
               amount: analytics.availableBalance,
               icon: "/assets/images/card-1.png",
               text: "Net Balance",
               text2: "Available for withdrawal"
          },
          {
               amount: analytics.pendingBalance,
               icon: "/assets/images/card-2.png",
               text: "Pending Settlements",
               text2: "Held in escrow"
          },
          {
               amount: analytics.totalSalesVolume,
               icon: "/assets/images/card-3.png",
               text: "Total Sales Volume",
               text2: "Total Sales Volume"
          },
          {
               amount: analytics.totalPlatformFees,
               icon: "/assets/images/card-4.png",
               text: "Platform & Service Deductions",
               text2: "Total Fee"
          },
     ]
}
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

export const getUserAnalytics = (analytics) => {
     return [
          {
               amount: analytics.availableBalance,
               icon: "/assets/images/card-1.png",
               text: "Net Balance",
               text2: "Available for withdrawal"
          },
          {
               amount: analytics.totalPendingEscrow,
               icon: "/assets/images/card-2.png",
               text: "Pending Settlements",
               text2: "Held in escrow"
          },
     ]
}

export const getFormattedChartData = (data) => {
     const { graph } = data
     return [
          { day: "Mon", value: graph.monday, escrowVolume: data.totalEscrowVolume, netIncome: data.netEarning },
          { day: "Tue", value: graph.tuesday, escrowVolume: data.totalEscrowVolume, netIncome: data.netEarning },
          { day: "Wed", value: graph.wednesday, escrowVolume: data.totalEscrowVolume, netIncome: data.netEarning },
          { day: "Thu", value: graph.thursday, escrowVolume: data.totalEscrowVolume, netIncome: data.netEarning },
          { day: "Fri", value: graph.friday, escrowVolume: data.totalEscrowVolume, netIncome: data.netEarning },
          { day: "Sat", value: graph.saturday, escrowVolume: data.totalEscrowVolume, netIncome: data.netEarning },
          { day: "Sun", value: graph.sunday, escrowVolume: data.totalEscrowVolume, netIncome: data.netEarning },
     ]
}

export const getFormattedSpendingChartData = (data) => {
     // const { graph } = data;
     return [
          { month: "Mon", value: 20, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Tue", value: 34, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Wed", value: 50, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Thurs", value: 60, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Fri", value: 70, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Sat", value: 90, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Sun", value: 100, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
     ]
}
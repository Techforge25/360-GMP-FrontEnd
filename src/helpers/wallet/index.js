export const getAnalytics = (analytics) => {
     return [
          {
               amount: analytics.availableBalance === 0 ? 0 : analytics.availableBalance,
               icon: "/assets/images/card-1.png",
               text: "Net Balance",
               text2: "Available for withdrawal"
          },
          {
               amount: analytics.pendingBalance === 0 ? 0 : analytics.pendingBalance,
               icon: "/assets/images/card-2.png",
               text: "Pending Settlements",
               text2: "Held in escrow"
          },
          {
               amount: analytics.totalSalesVolume === 0 ? 0 : analytics.totalSalesVolume,
               icon: "/assets/images/card-3.png",
               text: "Total Sales Volume",
               text2: "Total Sales Volume"
          },
          {
               amount: analytics.totalPlatformFees === 0 ? 0 : analytics.totalPlatformFees,
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

export const getTransactionDetails = (data) => {
     console.log(data, "data")
     return [
          {
               key: "SELLER NAME",
               value: data?.buyerDetails?.name,
          },
          {
               key: "EMAIL",
               value: data?.buyerDetails?.email,
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
     const { graph } = data;
     return [
          { month: "Mon", value: graph.monday, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Tue", value: graph.tuesday, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Wed", value: graph.wednesday, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Thurs", value: graph.thursday, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Fri", value: graph.friday, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Sat", value: graph.saturday, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
          { month: "Sun", value: graph.sunday, totalSpend: data.totalSpend, totalRefund: data.totalRefund },
     ]
}

export const formatEventDate = (date) => {
     if (!date) return { date: "", time: "" }

     const d = new Date(date)

     const formattedDate = d.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
     }).toUpperCase()

     const formattedTime = d.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
     })

     return {
          date: formattedDate + ",",
          time: formattedTime
     }
}

export const getEvents = (data) => {
     const placed = formatEventDate(data?.orderPlacedAt)
     const shipped = formatEventDate(data?.shippedAt)
     const delivered = formatEventDate(data?.deliveredAt)
     const completed = formatEventDate(data?.completedAt)

     return [
          {
               date: placed.date ?? "Not Done yet.",
               time: placed.time,
               title: "Order Placed",
               description: "Order Created."
          },
          {
               date: shipped.date ?? "Not Done yet.",
               time: shipped.time,
               title: "Shipped At",
               description: "Business has Shipped the product."
          },
          {
               date: delivered.date ?? "Not Done yet.",
               time: delivered.time,
               title: "Delivery Confirmed",
               description: "Buyer Confirmed Receipt Of Goods."
          },
          {
               date: completed.date ?? "Not Done yet.",
               time: completed.time,
               title: "Completed At",
               description: "Payout Successfully Transferred To Seller Wallet",
               isLast: true
          }
     ]
}

export const getAmounts = (data) => {
     return [
          {
               type: "Gross Sale Amount",
               desc: "Total Order Value",
               amount: data?.grossSaleAmount
          },
          {
               type: "Platform Fee",
               desc: "Standard Service Rate (10%)",
               amount: data?.platformFee
          },
          {
               type: "VAT/TAX",
               desc: "Applied Regional Tax (0%)",
               amount: "..."
          }
     ]
}
import { BsTagsFill } from "react-icons/bs";
import { CiCircleMore, CiWallet } from "react-icons/ci";
import { GrApps } from "react-icons/gr";

export const orders = [
  {
    id: "#39202",
    buyer: "Bio Pharm Supply Co.",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "Awaiting Shipment",
  },
  {
    id: "#39203",
    buyer: "Pioneer Labs",
    date: "Nov 26, 2025",
    total: "$8,890",
    type: "Single",
    status: "Delivered",
  },
  {
    id: "#39201",
    buyer: "TechGlobal Inc.",
    date: "Nov 24, 2025",
    total: "$13,475",
    type: "Bulk",
    status: "Delivered",
  },
  {
    id: "#39203",
    buyer: "Pioneer Labs",
    date: "Nov 26, 2025",
    total: "$8,890",
    type: "Single",
    status: "Delivered",
  },
  {
    id: "#39202",
    buyer: "Bio Pharm Supply Co.",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "In Transit",
  },
  {
    id: "#39202",
    buyer: "Bio Pharm Supply Co.",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "Delivered",
  },
  {
    id: "#39202",
    buyer: "Pioneer Labs",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "Delivered",
  },
  {
    id: "#39202",
    buyer: "Bio Pharm Supply Co.",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "Cancelled",
  },
  {
    id: "#39201",
    buyer: "Pioneer Labs",
    date: "Nov 24, 2025",
    total: "$13,475",
    type: "Bulk",
    status: "Delivered",
  },
  {
    id: "#39203",
    buyer: "TechGlobal Inc.",
    date: "Nov 26, 2025",
    total: "$8,890",
    type: "Single",
    status: "Delivered",
  },
  {
    id: "#39202",
    buyer: "TechGlobal Inc.",
    date: "Nov 25, 2025",
    total: "$57,500",
    type: "Bulk",
    status: "Delivered",
  },
  {
    id: "#39201",
    buyer: "Pioneer Labs",
    date: "Nov 24, 2025",
    total: "$13,475",
    type: "Bulk",
    status: "Completed",
  },
];

export const businessTabs = {
  "All Orders": "/orders/business/all-orders",
  "New": "/orders/business/new-orders",
  "Prepare Shipment": "/orders/business/processing-orders",
  "Shipped": "/orders/business/in-transit-orders",
  "Delivered": "/orders/business/delivered-orders",
  "Completed": "/orders/business/completed-orders",
  "Cancelled": "/orders/business/cancelled-orders",
};

export const userTabs = {
  "All Orders": "/orders/user/all-orders",
  "New": "/orders/user/new-orders",
  "Seller Preparing": "/orders/user/processing-orders",
  "Shipped": "/orders/user/in-transit-orders",
  "Delivered": "/orders/user/delivered-orders",
  "Completed": "/orders/user/completed-orders",
  "Cancelled": "/orders/user/cancelled-orders",
};

export const tabs = [
  "All Orders",
  "New",
  "Prepare Shipment",
  "Shipped",
  "Delivered",
  "Completed",
  "Cancelled",
];

export const getStatusColor = (status) => {
  switch (status) {
    case "Awaiting Shipment":
      return "bg-amber-100 text-amber-700";
    case "stripe":
      return "bg-amber-100 text-amber-700";
    case "held":
      return "bg-amber-100 text-amber-700";
    case "In Transit":
      return "bg-purple-100 text-purple-700";
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Completed":
      return "bg-green-100 text-green-700";
    case "completed":
      return "bg-green-100 text-green-700";
    case "released":
      return "bg-green-100 text-green-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    case "refunded":
      return "bg-red-100 text-red-700";
    case "Failed":
      return "bg-red-100 text-red-700";
    case "failed":
      return "bg-red-100 text-red-700";
    case "Canceled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const tags = ["Manufacturing", "Healthcare", "Technology", "Consulting"]

export const cardsBusiness = [
  {
    amount: "$12,450.00",
    icon: "/assets/images/card-1.png",
    text: "Net Balance",
    text2: "Available for withdrawal"
  },
  {
    amount: "$3,200.00",
    icon: "/assets/images/card-2.png",
    text: "Pending Settlements",
    text2: "Held in escrow"
  },
  {
    amount: "$156,500.00",
    icon: "/assets/images/card-3.png",
    text: "Total Sales Volume",
    text2: "Total Sales Volume"
  },
  {
    amount: "$3,200.00",
    icon: "/assets/images/card-4.png",
    text: "Platform & Service Deductions",
    text2: "Total Fee"
  },
]

export const cardsUser = [
  {
    amount: "$12,450.00",
    icon: "/assets/images/card-1.png",
    text: "Net Balance",
    text2: "Available for withdrawal"
  },
  {
    amount: "$3,200.00",
    icon: "/assets/images/card-2.png",
    text: "Pending Settlements",
    text2: "Held in escrow"
  },
]

export const transactions = [
  { id: 1, description: "Sale - CNC Machined Component", date: "OCT 24, 2025, 10:30 AM", method: "Visa **** 4321", status: "Completed", amount: "+$900.00", positive: true },
  { id: 2, description: "Sale - High-Speed USB-C Data Cable", date: "OCT 22, 2025, 10:30 AM", method: "Visa **** 4321", status: "Pending", amount: "+$100.00", positive: true },
  { id: 3, description: "Sale - Industrial Smart Watch", date: "OCT 27, 2025, 10:30 AM", method: "Visa **** 4321", status: "Completed", amount: "+$600.00", positive: true },
  { id: 4, description: "Sale - Noise Reduction Headset", date: "OCT 29, 2025, 10:30 AM", method: "Visa **** 4321", status: "Completed", amount: "+$2,000.00", positive: true },
  { id: 5, description: "Sale - High-Speed USB-C Data Cable", date: "OCT 22, 2025, 10:30 AM", method: "Visa **** 4321", status: "Pending", amount: "+$100.00", positive: true },
  { id: 6, description: "Withdrawal To Bank Account ****4567", date: "OCT 22, 2025, 10:30 AM", method: "Bank Account ****4567", status: "Completed", amount: "-$100.00", positive: false },
  { id: 7, description: "Sale - Industrial Smart Watch", date: "OCT 27, 2025, 10:30 AM", method: "Visa **** 4321", status: "Completed", amount: "+$600.00", positive: true },
  { id: 8, description: "Sale - Noise Reduction Headset", date: "OCT 29, 2025, 10:30 AM", method: "Visa **** 4321", status: "Completed", amount: "+$2,000.00", positive: true },
  { id: 9, description: "Sale - High-Speed USB-C Data Cable", date: "OCT 22, 2025, 10:30 AM", method: "Visa **** 4321", status: "Pending", amount: "+$100.00", positive: true },
];

export const businessWalletTabs = ["My Wallet",
  "Earnings",
  "Transactions"]

export const paymentCards = [
  {
    logo: "/assets/images/mastercard.png",
    cardName: "Mastercard · Default Method",
    extraInfo: "globalmanufacturing@gmail.com",
    btnText: "Disconnect"
  },
  {
    logo: "/assets/images/visa.png",
    cardName: "visa ****2125",
    extraInfo: "Expiry · 12/27",
    btnText: "Set as Default"
  },
]


export const events = [
  { date: "OCT 25, 2025,", time: "10:30 AM", title: "Order Placed", description: "Order #ORD-2025-55 Crated." },
  { date: "OCT 26, 2025,", time: "10:30 AM", title: "Escrow Period", description: "Fund Held Securely Pending Delivery." },
  { date: "OCT 27, 2025,", time: "06:15 AM", title: "Delivery Confirmed", description: "Buyer Confirmed Receipt Of Goods." },
  { date: "OCT 28, 2025,", time: "12:15 AM", title: "Funds Released", description: "Payout Successfully Transferred To Seller Wallet", isLast: true },
];

export const financialBreakdown = [
  {
    type: "Gross Sale Amount",
    desc: "Total Order Value",
    amount: "$900"
  },
  {
    type: "Platform Fee",
    desc: "Standard Service Rate (10%)",
    amount: "-$100.00"
  },
  {
    type: "VAT/TAX",
    desc: "Applied Regional Tax (0%)",
    amount: "..."
  }
]

export const chartData = [
  { day: "Mon", escrowVolume: 2200, netIncome: 3200 },
  { day: "Tue", escrowVolume: 1200, netIncome: 3000 },
  { day: "Wed", escrowVolume: 8900, netIncome: 2000 },
  { day: "Thu", escrowVolume: 3200, netIncome: 2800 },
  { day: "Fri", escrowVolume: 3500, netIncome: 2200 },
  { day: "Sat", escrowVolume: 2800, netIncome: 2600 },
  { day: "Sun", escrowVolume: 3400, netIncome: 3000 },
];

export const sortOptionsByTime = ["Last 3 Month", "Last 2 Weeks", "Last 1 Week"]

export const tabsTransactionBusinessWallet = ["All", "Withdrawal"]

export const tabsTransactionUserWallet = ["All", "Refund"]

export const walletTransactionTabs = ["Description/Date", "Status", "Amount"]

export const walletMyWalletsTabs = ["Description/Date", "Payment Method", "Status", "Amount"]

export const walletEarningsTabs = ["Date", "Gross Amounts", "Fee (10%)", "Net Profit", "Status"]

export const transactionsUserWallet = [
  { id: 1, title: "Buy - High-Speed USB-C Data Cable", date: "TODAY, 14:23 AM", amount: "- $100.00", type: "debit", status: "Completed" },
  { id: 2, title: "Service Subscription", date: "OCT 22, 2025, 9:30 AM", amount: "- $199.00", type: "debit", status: "Completed" },
  { id: 3, title: "Buy - Earbuds", date: "OCT 22, 2025, 11:30 AM", amount: "- $99.00", type: "debit", status: "Failed" },
  { id: 4, title: "Refund From Store-ABC", date: "OCT 22, 2025, 10:30 AM", amount: "+ $100.00", type: "credit", status: "Completed" },
  { id: 5, title: "Refund From Store-ABC", date: "OCT 22, 2025, 10:30 AM", amount: "+ $100.00", type: "credit", status: "Completed" },
];

export const chartDataUser = [
  { month: "Mon", marketplace: 800, refund: 200 },
  { month: "Tue", marketplace: 1000, refund: 250 },
  { month: "Wed", marketplace: 880, refund: 130 },
  { month: "Thurs", marketplace: 1500, refund: 300 },
  { month: "Fri", marketplace: 2000, refund: 280 },
  { month: "Sat", marketplace: 2200, refund: 350 },
  { month: "Sun", marketplace: 2200, refund: 350 },
]
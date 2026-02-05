"use client";
import React from "react";
import { FiCreditCard, FiClock, FiDollarSign, FiGift, FiShield, FiZap } from "react-icons/fi";
import DashboardFooter from "@/components/dashboard/DashboardFooter";

export default function UserWalletPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-[#240457] to-[#9747FF] px-8 py-12 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCreditCard className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Your Digital Wallet
            </h1>
            <p className="text-white/90 text-lg max-w-[1400px] mx-auto">
              Store funds, manage payments, earn rewards, and enjoy seamless transactions across the platform.
            </p>
          </div>

          <div className="px-8 py-12 text-center">
            <div className="max-w-[1400px] mx-auto">
              <div className="w-16 h-16 bg-[#240457]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiClock className="w-8 h-8 text-[#240457]" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Coming Soon in Phase 5
              </h2>
              
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We are creating an innovative digital wallet that will make your transactions faster, safer, and more rewarding. Get ready for a seamless payment experience with exclusive benefits and cashback offers.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#240457] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiDollarSign className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Easy Payments</h3>
                  <p className="text-sm text-gray-600">One-click checkout & transfers</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#9747FF] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiGift className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Rewards Program</h3>
                  <p className="text-sm text-gray-600">Earn cashback on purchases</p>
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#0B8806] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiShield className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Secure Storage</h3>
                  <p className="text-sm text-gray-600">Protected transactions</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Wallet Will Feature:</h3>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#240457] rounded-full"></div>
                    <span>Instant money transfers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#9747FF] rounded-full"></div>
                    <span>Cashback rewards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#0B8806] rounded-full"></div>
                    <span>Transaction history</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#F4B400] rounded-full"></div>
                    <span>Budget tracking</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#D60000] rounded-full"></div>
                    <span>Bill payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#240457] rounded-full"></div>
                    <span>Multiple payment methods</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#240457] to-[#9747FF] text-white p-6 rounded-xl">
                <FiZap className="w-8 h-8 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">
                  Get Ready for Smart Spending
                </h3>
                <p className="text-white/90 mb-4">
                  Be among the first to experience our innovative wallet with exclusive launch benefits.
                </p>
                <button className="bg-white text-[#240457] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DashboardFooter />
    </div>
  );
}

// Future Wallet Implementation - Phase 5
// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import {
//   FiMoreHorizontal,
//   FiEdit2,
//   FiPlus,
//   FiCreditCard,
//   FiDownload,
//   FiArrowUpRight,
//   FiArrowDownLeft,
//   FiHelpCircle,
// } from "react-icons/fi";
// import {
//   MdOutlineAccountBalanceWallet,
//   MdPendingActions,
//   MdLocalOffer,
//   MdContentCut,
// } from "react-icons/md";
// import { BsBank, BsGrid } from "react-icons/bs";
// import { ChevronRight } from "lucide-react";
// import DashboardFooter from "@/components/dashboard/DashboardFooter";

// const WalletPage = () => {
//   const [activeTab, setActiveTab] = useState("Wallet");

//   const stats = [
//     {
//       label: "Net Balance",
//       amount: "$12,450.00",
//       subLabel: "Available for withdrawal",
//       subLabelColor: "text-[#0B8806]",
//       icon: "/assets/images/withdrawalIcon.png",
//       iconColor: "text-green-600",
//       bg: "bg-[#0B8806]",
//     },
//     {
//       label: "Pending Settlements",
//       amount: "$3,200.00",
//       subLabel: "Held in escrow",
//       subLabelColor: "text-[#FF8D28]",
//       icon: "/assets/images/escrowIcon.png",
//       iconColor: "text-orange-600",
//       bg: "bg-[#FF8D28]",
//     },
//     {
//       label: "Total Sales Volume",
//       amount: "$156,500.00",
//       subLabel: "Total Sales Volume",
//       subLabelColor: "text-[#185ADB]",
//       icon: "/assets/images/salesIcon.png",
//       iconColor: "text-blue-600",
//       bg: "bg-[#185ADB]",
//     },
//     {
//       label: "Platform & Service Deductions",
//       amount: "$15,650.00",
//       subLabel: "Total Fee",
//       subLabelColor: "text-gray-500",
//       icon: "/assets/images/feeIcon.png",
//       iconColor: "text-gray-600",
//       bg: "bg-[#B4B4B433]",
//     },
//   ];

//   const transactions = [
//     {
//       id: 1,
//       desc: "Sale - CNC Machined Component",
//       date: "OCT 24, 2025, 10:30 AM",
//       method: "Visa **** 4321",
//       status: "Completed",
//       amount: "+ $900.00",
//       isIncoming: true,
//     },
//     {
//       id: 2,
//       desc: "Sale - High-Speed USB-C Data Cable",
//       date: "OCT 22, 2025, 10:30 AM",
//       method: "Visa **** 4321",
//       status: "Pending",
//       amount: "+ $100.00",
//       isIncoming: true,
//     },
//     {
//       id: 3,
//       desc: "Sale - Industrial Smart Watch",
//       date: "OCT 27, 2025, 10:30 AM",
//       method: "Visa **** 4321",
//       status: "Completed",
//       amount: "+ $600.00",
//       isIncoming: true,
//     },
//     {
//       id: 4,
//       desc: "Sale - Noise Reduction Headset",
//       date: "OCT 29, 2025, 10:30 AM",
//       method: "Visa **** 4321",
//       status: "Completed",
//       amount: "+ $2,000.00",
//       isIncoming: true,
//     },
//     {
//       id: 5,
//       desc: "Sale - High-Speed USB-C Data Cable",
//       date: "OCT 22, 2025, 10:30 AM",
//       method: "Visa **** 4321",
//       status: "Pending",
//       amount: "+ $100.00",
//       isIncoming: true,
//     },
//     {
//       id: 6,
//       desc: "Withdrawal To Bank Account ****4567",
//       date: "OCT 22, 2025, 10:30 AM",
//       method: "Bank Account ****4567",
//       status: "Completed",
//       amount: "- $100.00",
//       isIncoming: false,
//     },
//     {
//       id: 7,
//       desc: "Sale - Industrial Smart Watch",
//       date: "OCT 27, 2025, 10:30 AM",
//       method: "Visa **** 4321",
//       status: "Completed",
//       amount: "+ $600.00",
//       isIncoming: true,
//     },
//     {
//       id: 8,
//       desc: "Sale - Noise Reduction Headset",
//       date: "OCT 29, 2025, 10:30 AM",
//       method: "Visa **** 4321",
//       status: "Completed",
//       amount: "+ $2,000.00",
//       isIncoming: true,
//     },
//     {
//       id: 9,
//       desc: "Sale - High-Speed USB-C Data Cable",
//       date: "OCT 22, 2025, 10:30 AM",
//       method: "Visa **** 4321",
//       status: "Pending",
//       amount: "+ $100.00",
//       isIncoming: true,
//     },
//   ];

//   return (
//     <div className="bg-gray-50">
//        1. Header Section 
//       <p className="text-gray-500 text-base max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         My Wallet
//       </p>
//       <div className="relative bg-[#8B5CF6] h-48 overflow-hidden flex items-center justify-center">
//          Background Pattern 
//         <div className="absolute inset-0 opacity-20"></div>
//         <div
//           className="absolute inset-0 opacity-200"
//           style={{
//             backgroundImage: "url('/assets/images/walletBanner.png')", // Reusing existing banner pattern or similar
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         ></div>

//         <h1 className="text-3xl font-bold text-white relative z-10 transition-all duration-500 transform hover:scale-105">
//           Wallet
//         </h1>
//       </div>

//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8  mt-6 relative z-10 space-y-8">
//          2. Tabs & Withdraw 
//         <div className="flex flex-col md:flex-row items-center justify-between gap-4">
//           <div className="flex items-center gap-6 text-base font-medium border-b border-transparent md:border-none w-full md:w-auto overflow-x-auto">
//             {["Wallet", "Earning", "Transactions"].map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`pb-2 md:pb-0 whitespace-nowrap border-b-2 transition-colors ${activeTab === tab ? "text-[#2e1065] border-[#2e1065]" : "text-gray-500 border-transparent hover:text-gray-700"}`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>
//           <button className="flex items-center gap-2 bg-[#2e1065] text-white px-4 py-2 rounded-lg text-base font-semibold hover:bg-[#1e0a45] transition-colors shadow-sm">
//              Using Download icon as placeholder for Withdraw or similar 
//             Withdraw
//             <img src="/assets/images/withdrawIcon.png" alt="" />
//           </button>
//         </div>

//          3. Stats Cards 
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="bg-white p-5 rounded-lg border border-gray-100 shadow-sm flex flex-col justify-between h-32 hover:shadow-md transition-shadow"
//             >
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h2 className="text-2xl font-medium text-black">
//                     {stat.amount}
//                   </h2>
//                   <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
//                 </div>
//                 <div className={`p-2 rounded-lg ${stat.bg}`}>
//                   <img
//                     src={stat.icon}
//                     alt=""
//                     className={`w-5 h-5 ${stat.iconColor}`}
//                   />
//                 </div>
//               </div>
//               <p className={`text-[14px] font-medium ${stat.subLabelColor}`}>
//                 {stat.subLabel}
//               </p>
//             </div>
//           ))}
//         </div>

//          4. Payment Method & Messaging (Mock) 
//         <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 relative overflow-hidden">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-medium text-black">
//               Save Payment Method
//             </h3>
//              Messaging Widget Overlay (Matches design) 
//              <div className="hidden md:flex absolute top-4 right-4 items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-1.5 shadow-sm z-10">
//               <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center text-orange-600">
//                 <span className="font-bold text-sm">M</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="text-sm font-semibold text-gray-900">
//                   Messaging
//                 </span>
//                 <span className="text-[14px] text-gray-500">
//                   Global Manufacturing Co.
//                 </span>
//               </div>
//               <div className="flex gap-2 ml-2 text-gray-400">
//                 <FiMoreHorizontal className="cursor-pointer hover:text-gray-600" />
//                 <FiEdit2 className="cursor-pointer hover:text-gray-600 w-3 h-3" />
//               </div>
//             </div> 
//           </div>

//           <div className="space-y-3">
//              Master Card 
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 group hover:border-gray-200 transition-colors">
//               <div className="flex items-start gap-4">
//                 <div className="w-10 h-6 bg-white border border-gray-200 py-4 rounded flex items-center justify-center">
//                   <div className="flex -space-x-1">
//                     <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
//                     <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
//                   </div>
//                 </div>
//                 <div>
//                   <p className="text-base font-semibold text-gray-900 flex items-center gap-2">
//                     Mastercard{" "}
//                     <span className="text-[#240457] text-sm font-normal">
//                       • Default Method
//                     </span>
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     globalmanufacturing@gmail.com
//                   </p>
//                 </div>
//               </div>
//               <button className="text-sm text-[#FF383C] font-medium mt-2 sm:mt-0 opacity-100 transition-opacity underline">
//                 Disconnect
//               </button>
//             </div>

//              Visa Card 
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 group hover:border-gray-200 transition-colors">
//               <div className="flex items-start gap-4">
//                 <div className="w-10 h-6 bg-white border border-gray-200 py-4 rounded flex items-center justify-center text-blue-800 font-bold italic text-[8px]">
//                   VISA
//                 </div>
//                 <div>
//                   <p className="text-base font-semibold text-gray-900">
//                     visa ****2125
//                   </p>
//                   <p className="text-sm text-gray-500">Expiry - 12/27</p>
//                 </div>
//               </div>
//               <button className="text-sm text-[#240457] font-medium underline mt-2 sm:mt-0">
//                 Set as Default
//               </button>
//             </div>
//           </div>
//         </div>

//          5. Recent Transactions 
//         <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden">
//           <div className="p-6 flex items-center justify-between border-b border-gray-100">
//             <h3 className="text-lg font-medium text-gray-900">
//               Recent Transactions
//             </h3>
//             <button className="text-sm font-medium text-[#2e1065] flex items-center gap-1 hover:underline">
//               View All <FiArrowUpRight className="rotate-45" />
//             </button>
//           </div>

//            Table Header 
//           <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 text-sm font-semibold text-gray-500">
//             <div className="col-span-1">
//               <input
//                 type="checkbox"
//                 className="rounded border-gray-300 text-indigo-600 focus:ring-0"
//               />
//             </div>
//             <div className="col-span-4 text-[#22252B]">Description/Date</div>
//             <div className="col-span-3 text-[#22252B]">Payment Method</div>
//             <div className="col-span-2 text-[#22252B]">Status</div>
//             <div className="col-span-2 text-right text-[#22252B]">Amount</div>
//           </div>

//           <div className="divide-y divide-gray-100">
//             {transactions.map((tx) => (
//               <div
//                 key={tx.id}
//                 className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors"
//               >
//                 <div className="col-span-1 flex items-center">
//                   <div
//                     className={`w-6 h-6 rounded-full flex items-center justify-center ${tx.isIncoming ? "bg-[#B4B4B433] text-[#0B8806]" : "bg-red-50 text-red-600"}`}
//                   >
//                     {tx.isIncoming ? <FiArrowDownLeft /> : <FiArrowUpRight />}
//                   </div>
//                 </div>
//                 <div className="col-span-4">
//                   <p className="text-base font-semibold text-gray-900 mb-0.5">
//                     {tx.desc}
//                   </p>
//                   <p className="text-[14px] text-gray-500">{tx.date}</p>
//                 </div>
//                 <div className="col-span-3 text-sm text-gray-600">
//                   {tx.method}
//                 </div>
//                 <div className="col-span-2">
//                   <span
//                     className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[14px] font-medium
//                                 ${tx.status === "Completed" ? "bg-green-100 text-green-700" : ""}
//                                 ${tx.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
//                             `}
//                   >
//                     {tx.status}
//                   </span>
//                 </div>
//                 <div
//                   className={`col-span-2 flex items-center justify-end text-right text-base font-medium ${tx.isIncoming ? "text-green-600" : "text-gray-900"}`}
//                 >
//                   <h4 className="flex items-center gap-2">
//                     {tx.amount}{" "}
//                     <span>
//                       <ChevronRight className="w-4 h-4 text-[#768299]" />
//                     </span>
//                   </h4>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//          6. Help Footer 
//         <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-4 flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 rounded-sm bg-[#DCDCDC33] flex items-center justify-center text-[#2e1065]">
//               <img src="/assets/images/helpIcon.png" alt="help" />
//             </div>
//             <div>
//               <h4 className="text-base font-bold text-gray-900">Need Help?</h4>
//               <p className="text-sm text-gray-500">
//                 your payment information is processed securely. for any billing
//                 questions, please contact our support center.
//               </p>
//             </div>
//           </div>
//           <button className="bg-[#240457] text-white px-6 py-2 rounded-md text-sm font-semibold hover:bg-[#1a0340] transition-colors whitespace-nowrap">
//             Contact Support
//           </button>
//         </div>
//       </div>
//       <DashboardFooter />
//     </div>
//   );
// };

// export default WalletPage;
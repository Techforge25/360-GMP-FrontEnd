"use client"
import AuthNavbar from "@/components/dashboard/AuthNavbar";
import FundAddCard from "@/components/wallet/user/FundAddCard";
import PaymentSelectionMethod from "@/components/wallet/user/PaymentSelectionMethod";

function ChevronRightIcon() {
     return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
               <polyline points="9,18 15,12 9,6" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
     );
}


export default function AddFund() {
     return (
          <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#F9FAFB", fontFamily: "'Inter', sans-serif" }}>
               {/* Breadcrumb */}

               <AuthNavbar />
               {/* Main Content */}
               <div className="px-6 w-full flex flex-col gap-6">
                    <div className="pt-3 px-6 w-full">
                         <div className="flex items-center gap-1.5">
                              <span style={{ fontSize: "13px", color: "#6B7280" }}>My Wallet</span>
                              <ChevronRightIcon />
                              <span style={{ fontSize: "13px", color: "#111827" }}>Add Fund</span>
                         </div>
                    </div>
                    <FundAddCard />

                    {/* Payment Method Selection */}
                    <PaymentSelectionMethod />
               </div>
          </div>
     );
}
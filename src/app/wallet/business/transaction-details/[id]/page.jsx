import AuthNavbar from "@/components/dashboard/AuthNavbar";
import FinancialBreakdown from "@/components/wallet/business/transaction-details/FinancialBreakdown";
import TransactionHeader from "@/components/wallet/business/transaction-details/TransactionHeader";
import TransactionTimeline from "@/components/wallet/business/transaction-details/TransactionTimeline";

export const revalidate = 0;

export async function generateStaticParams() {
     return [
          { id: "1" },
          { id: "2" },
     ]
}

export default async function TransactionDetailsPage({ params }) {
     const { id } = params
     const transactionData = {
          id: id,
          description: "Sale - CNC Machined Component",
          date: "OCT 24, 2025, 10:30 AM",
          amount: "$900.00",
          status: "Completed",
     };
     return (
          <>
               <AuthNavbar />
               <section className="flex min-h-screen bg-white flex-col">
                    <div className="px-6 py-6">
                         <nav className="mb-4 text-sm">
                              <span className="text-[#444953]">My Wallet</span>
                              <span className="mx-2 text-brand-primary">&gt;</span>
                              <span className="font-medium text-brand-primary underline">Transaction Detail</span>
                         </nav>
                         <TransactionHeader />
                         <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
                              <div className="lg:col-span-3">
                                   <TransactionTimeline />
                              </div>
                              <div className="lg:col-span-2">
                                   <FinancialBreakdown />
                              </div>
                         </div>
                    </div>
               </section>
          </>
     );
}

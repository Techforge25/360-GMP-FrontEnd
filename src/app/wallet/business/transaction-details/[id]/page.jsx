import AuthNavbar from "@/components/dashboard/AuthNavbar";
import FinancialBreakdown from "@/components/wallet/business/transaction-details/FinancialBreakdown";
import TransactionHeader from "@/components/wallet/business/transaction-details/TransactionHeader";
import TransactionTimeline from "@/components/wallet/business/transaction-details/TransactionTimeline";
import walletBusinessApi from "@/services/walletBusinessAPI";

export const revalidate = 0;

export default async function TransactionDetailsPage({ params }) {
     const { id } = params;
     const response = await walletBusinessApi.getSingleTransactionDetails(id);
     const transactionData = response?.data;

     return (
          <>
               <AuthNavbar />
               <section className="flex min-h-screen bg-white flex-col">
                    <div className="px-6 py-6">
                         <nav className="mb-4 text-sm">
                              <span className="text-[#343f54]">My Wallet</span>
                              <span className="mx-2 text-brand-primary">&gt;</span>
                              <span className="font-medium text-brand-primary underline">
                                   Transaction Detail
                              </span>
                         </nav>

                         <TransactionHeader data={transactionData} />

                         <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
                              <div className="lg:col-span-3">
                                   <TransactionTimeline data={transactionData} />
                              </div>

                              <div className="lg:col-span-2">
                                   <FinancialBreakdown data={transactionData} />
                              </div>
                         </div>
                    </div>
               </section>
          </>
     );
}
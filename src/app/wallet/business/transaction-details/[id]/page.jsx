"use client";

import AuthNavbar from "@/components/dashboard/AuthNavbar";
import FinancialBreakdown from "@/components/wallet/business/transaction-details/FinancialBreakdown";
import TransactionHeader from "@/components/wallet/business/transaction-details/TransactionHeader";
import TransactionTimeline from "@/components/wallet/business/transaction-details/TransactionTimeline";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { use } from "react";

export default function TransactionDetailsPage({ params }) {
     const { id } = use(params);

     const [transactionData, setTransactionData] = useState(null);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);

     const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

     const fetchOrder = useCallback(async () => {
          if (!id) return;

          setLoading(true);
          setError(null);

          try {
               const res = await axios.get(`${API_URL}/wallet/${id}/transaction-timeline`, {
                    withCredentials: true,
               });

               if (res.data.success) {
                    setTransactionData(res.data.data);
               } else {
                    throw new Error("Transaction details not fetched");
               }
          } catch (err) {
               setError(err.message || "Failed to fetch transaction");
               console.error(err);
          } finally {
               setLoading(false);
          }
     }, [id]);

     useEffect(() => {
          fetchOrder();
     }, [fetchOrder]);

     console.log(transactionData, "transactiond ata details")

     return (
          <>
               <AuthNavbar />

               <section className="flex min-h-screen bg-white flex-col">
                    <div className="px-6 py-6">
                         {loading && <p>Loading...</p>}
                         {error && <p className="text-red-500">{error}</p>}

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
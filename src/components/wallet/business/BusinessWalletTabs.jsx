"use client";
import { businessWalletTabs } from "@/constants/index";
import { useWallet } from "@/context/WalletContext";
import TabsRight from "@/components/wallet/business/TabsRight";

export default function BusinessWalletTabs() {
     const { activeTabs, setActiveTabs } = useWallet();
     return (
          <section className="flex items-center py-5 justify-between">
               <div className="flex items-center gap-3">
                    {businessWalletTabs.map((tab) => (
                         <button
                              key={tab}
                              onClick={() => setActiveTabs(tab)}
                              className={`px-4 py-2 text-sm transition-colors ${activeTabs === tab
                                   ? "border-b-2 border-text-brand-primary text-brand-primary font-semibold"
                                   : "border-b-2 border-transparent text-gray-500 hover:text-gray-800"
                                   }`}
                         >
                              {tab}
                         </button>
                    ))}
               </div>
               <TabsRight activeTabs={activeTabs} />
          </section>
     );
}
"use client"
import { useWallet } from "@/context/WalletContext"

export default function WalletBanner() {
     const { activeTabs } = useWallet()
     return (
          <section className="w-full">
               {/* Header Label */}
               <div className="bg-gray-50 px-8 py-2.5">
                    <span className="text-[13px] text-gray-500">{activeTabs}</span>
               </div>

               {/* Main Banner Container */}
               <div className="relative h-[186px] flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#41099A] to-[#A968FF]">

                    {/* Topographic Background Overlay */}
                    <div
                         className="absolute inset-0 opacity-10 pointer-events-none"
                         style={{
                              backgroundImage: `url("https://www.transparenttextures.com/patterns/topography.png")`,
                              backgroundSize: '700px', // Scaled up to prevent visible tiling
                              backgroundRepeat: 'no-repeat',
                              backgroundPosition: 'center'
                         }}
                    />

                    {/* LEFT IMAGE: Peeking from the center-left edge, rotated up */}
                    <div className="absolute -left-12 top-0 w-[210px] opacity-20 mix-blend-screen pointer-events-none">
                         <img
                              src="/assets/images/wallet-left.png"
                              alt=""
                              className="w-full h-auto brightness-[10] grayscale"
                         />
                    </div>

                    {/* CENTER TITLE */}
                    <div className="flex flex-col items-center">
                         <h1 className="relative z-10 text-white text-[42px] font-bold tracking-tight">
                              {activeTabs}
                         </h1>
                         {activeTabs === "Earnings" &&
                              <p className="mt-2">Track your financial performance, escrow status, and withdrawals.</p>
                         }
                    </div>
                    {/* RIGHT IMAGE: Peeking from the bottom-right corner, rotated up */}
                    <div className="absolute right-0 -bottom-1 w-[240px] opacity-20 mix-blend-screen pointer-events-none">
                         <img
                              src="/assets/images/wallet-right.png"
                              alt=""
                              className="w-full h-auto"
                         />
                    </div>

               </div>
          </section>
     )
}
"use client"
import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
     const [activeTabs, setActiveTabs] = useState("My Wallet");
     const [transactionTab, setTransactionTab] = useState("All")

     return (
          <WalletContext.Provider value={{ activeTabs, setActiveTabs, transactionTab, setTransactionTab }}>
               {children}
          </WalletContext.Provider>
     );
}

export function useWallet() {
     return useContext(WalletContext);
}
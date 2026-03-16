"use client"
import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
     const [activeTabs, setActiveTabs] = useState("My Wallet");
     const [userTransactionTab, setUserTransactionTab] = useState("All")

     return (
          <WalletContext.Provider value={{ activeTabs, setActiveTabs, userTransactionTab, setUserTransactionTab }}>
               {children}
          </WalletContext.Provider>
     );
}

export function useWallet() {
     return useContext(WalletContext);
}
"use client"
import { createContext, useContext, useState } from "react";

const WalletContext = createContext();

export function WalletProvider({ children }) {
     const [activeTabs, setActiveTabs] = useState("My Wallet");

     return (
          <WalletContext.Provider value={{ activeTabs, setActiveTabs }}>
               {children}
          </WalletContext.Provider>
     );
}

export function useWallet() {
     return useContext(WalletContext);
}
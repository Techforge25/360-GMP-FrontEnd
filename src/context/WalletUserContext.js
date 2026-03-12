"use client"
import { createContext, useContext, useState } from "react";

const WalletUserContext = createContext();

export function WalletUserProvider({ children }) {
     const [activeTabs, setActiveTabs] = useState("Welcome Back");

     return (
          <WalletUserContext.Provider value={{ activeTabs, setActiveTabs }}>
               {children}
          </WalletUserContext.Provider>
     );
}

export function useWallet() {
     return useContext(WalletUserContext);
}
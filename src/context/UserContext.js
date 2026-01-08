"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Mock Role: 'business', 'paid_user', 'free_trial'
  const [role, setRole] = useState("paid_user"); 

  // In a real app, this would be fetched from an API or session
  
  const switchRole = (newRole) => {
    setRole(newRole);
    console.log(`Switched to role: ${newRole}`);
  };

  return (
    <UserContext.Provider value={{ role, switchRole }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserRole = () => useContext(UserContext);

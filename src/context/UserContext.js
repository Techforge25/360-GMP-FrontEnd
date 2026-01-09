"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Mock Role: 'business', 'paid_user', 'free_trial'
  const [role, setRole] = useState("paid_user");

  // Persistent Onboarding Role
  const [onboardingRole, setOnboardingRoleState] = useState("user");

  useEffect(() => {
    // Load from localStorage on mount
    const stored = localStorage.getItem("onboardingRole");
    if (stored) {
      setOnboardingRoleState(stored);
    }
  }, []);

  const setOnboardingRole = (role) => {
    setOnboardingRoleState(role);
    localStorage.setItem("onboardingRole", role);
  };

  const switchRole = (newRole) => {
    setRole(newRole);
    console.log(`Switched to role: ${newRole}`);
  };

  return (
    <UserContext.Provider
      value={{ role, switchRole, onboardingRole, setOnboardingRole }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserRole = () => useContext(UserContext);

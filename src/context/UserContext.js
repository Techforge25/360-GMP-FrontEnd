"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Full User State
  const [user, setUserState] = useState(null);

  useEffect(() => {
    // Load from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUserState(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const setOnboardingRole = async (role) => {
    try {
      const response = await api.get({
        url: `/auth/refreshToken/updateRole?role=${role}`,
        enableSuccessMessage: false,
        enableErrorMessage: false,
      });

      if (response.success && response.data) {
        // Merge the new data (which confirms the role change) into the existing user state
        const updatedUser = {
          ...user,
          ...response.data, // This might contain partial updates, e.g., just role or new profilePayload
          role: role, // Ensure role is explicitly set locally
        };
        login(updatedUser);
      }
    } catch (error) {
      console.error("Failed to sync role with backend", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ user, login, setOnboardingRole, onboardingRole: user?.role }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserRole = () => useContext(UserContext);

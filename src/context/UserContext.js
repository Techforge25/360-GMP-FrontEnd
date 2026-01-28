"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Full User State
  const [user, setUserState] = useState(undefined);

  useEffect(() => {
    // Load from localStorage on mount
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    } else {
      setUserState(null); // Explicitly null if nothing in localStorage
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

      console.log("setOnboardingRole response:", response);

      if (response.success) {
        // Merge the new data (which confirms the role change) into the existing user state
        // Even if response.data is empty, we must update the role locally
        const updatedUser = {
          ...user,
          ...(response.data || {}),
          role: role, // Ensure role is explicitly set locally
        };
        login(updatedUser);
      } else {
        console.warn("setOnboardingRole failed:", response.message);
        throw new Error(response.message || "Failed to update role");
      }
    } catch (error) {
      // Handle "Business profile not found" or "User profile not found" error (404)
      // This happens when selecting a role before creating the profile.
      // We process the local update anyway to let the user proceed to plans/profile creation.
      const errorMessage =
        error?.response?.data?.message || error?.message || "";
      const isProfileMissing =
        (error?.response?.status === 404 || error?.data?.statusCode === 404) &&
        (errorMessage.includes("Business profile") ||
          errorMessage.includes("User profile") ||
          role === "business" ||
          role === "user");

      if (isProfileMissing) {
        console.warn(
          "Backend sync skipped (Profile missing). Updating local state to proceed.",
        );
        const updatedUser = {
          ...user,
          role: role,
        };
        login(updatedUser);
        return; // Treat as success so UI proceeds
      }
      console.error(
        "Failed to sync role with backend",
        error.response?.data || error,
      );
      throw error; // Re-throw to handle in UI
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
export const useUser = () => useContext(UserContext);

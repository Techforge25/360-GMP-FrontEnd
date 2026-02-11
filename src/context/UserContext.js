"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/axios";
import useSocket from "@/hooks/useSocket";

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
          profileData: role === "business" ? "business" : "user",
        };

        // Capture any fresh access token returned by backend so subsequent
        // requests (subscription, profile creation, dashboards) don't use
        // a stale token that can cause 403 "Access Denied" on first login.
        const token =
          response.accessToken ||
          response.token ||
          response.data?.accessToken ||
          response.data?.token;

        if (token) {
          updatedUser.accessToken = token;
          updatedUser.token = token; // legacy key support
        }

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
          profileData: role === "business" ? "business" : "user",
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

  useSocket("notification", (data) => {
    console.log("Received notification:", data);
    // Here you can implement logic to show notifications in the UI
    
  });

  return (
    <UserContext.Provider
      value={{ 
        user, 
        login, 
        setOnboardingRole, 
        onboardingRole: user?.role,
        onboardingProfileData: user?.profileData 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserRole = () => useContext(UserContext);
export const useUser = () => useContext(UserContext);

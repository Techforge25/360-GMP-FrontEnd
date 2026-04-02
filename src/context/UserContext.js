"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/axios";
import useSocket from "@/hooks/useSocket";
import {
  clearStoredSession,
  getProfileDataForRole,
  getStoredUser,
  persistUser,
  redirectTo,
  refreshRoleSession,
} from "@/lib/auth/session";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // Full User State
  const [user, setUserState] = useState(undefined);
  const [roleSelection, setRoleSelection] = useState("business")
  const [isRoleSelected, setIsRoleSelected] = useState(false)
  const [isSwitchProfile, setIsSwitchProfile] = useState({
    profile: "",
    isInActivated: true
  })

  useEffect(() => {

    // 1. Initial Load from localStorage
    let currentUser = getStoredUser();

    // 2. URL/Hash Token Capture (Priority for Google OAuth/Production redirects)
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));

      const urlToken =
        searchParams.get("token") ||
        searchParams.get("accessToken") ||
        hashParams.get("token") ||
        hashParams.get("accessToken");

      if (urlToken) {
        console.log("🎟️ Found token in URL/Hash, initializing session...");

        // Construct user object or merge with existing
        const userData = {
          ...(currentUser || {}),
          accessToken: urlToken,
          token: urlToken,
          isNewToPlatform:
            searchParams.get("isNew") === "true" ||
            currentUser?.isNewToPlatform ||
            true,
        };

        // Save and update state
        login(userData);
        currentUser = userData;

        // CRITICAL: Clean URL to remove token for security - prevents leaking auth via shared links
        const cleanURL =
          window.location.pathname + window.location.hash.split("?")[0];
        window.history.replaceState({}, document.title, cleanURL);
        console.log("🧹 URL cleaned: Token removed from search parameters.");
      }
    }

    // 3. Verify user validity with backend if token exists
    const verifySession = async (userToVerify) => {
      const userId = userToVerify?._id || userToVerify?.id;
      if (userId && (userToVerify?.token || userToVerify?.accessToken)) {
        console.log("🔍 Verifying session for user:", userId);
        const exists = await checkUserExistence(userId);
        if (!exists) {
          console.error("❌ Session invalid or user not found. Logging out.");
          logout();
          return null;
        }
        console.log("✅ Session verified.");
        return userToVerify;
      }
      return userToVerify;
    };

    const initialize = async () => {
      if (currentUser) {
        const verifiedUser = await verifySession(currentUser);
        setUserState(verifiedUser || null);
      }
      else {
        setUserState(null);
      }
    };

    initialize();
  }, []);

  const logout = () => {
    setUserState(null);
    clearStoredSession();
    redirectTo("/login");
  };

  const login = (userData) => {
    // Prevent passing just a string (like role) which would corrupt the state
    let finalizedData = userData;
    if (typeof userData === "string") {
      console.warn(
        "⚠️ login() called with string, converting to object:",
        userData,
      );
      finalizedData = { role: userData };
    }

    // Recovery: If we somehow got a corrupted object with numeric keys, clean it up
    if (
      finalizedData &&
      typeof finalizedData === "object" &&
      "0" in finalizedData
    ) {
      console.warn("⚠️ Corrupted user object detected, cleaning up...");
      const {
        0: _0,
        1: _1,
        2: _2,
        3: _3,
        4: _4,
        5: _5,
        6: _6,
        7: _7,
        ...cleanData
      } = finalizedData;
      finalizedData = cleanData;
    }

    setUserState(finalizedData);
    persistUser(finalizedData);
  };

  const setOnboardingRole = async (role) => {
    try {
      const response = await refreshRoleSession(role, user);

      console.log("setOnboardingRole response:", response);

      if (response.success) {
        // Merge the new data (which confirms the role change) into the existing user state
        // Even if response.data is empty, we must update the role locally
        const updatedUser = {
          ...(typeof user === "object" && user !== null ? user : {}),
          ...(response.user || {}),
          role: role, // Ensure role is explicitly set locally
          profileData: getProfileDataForRole(role),
          // Preserve isNewToPlatform flag - don't let backend override it
          isNewToPlatform:
            (typeof user === "object" ? user?.isNewToPlatform : true) ??
            response.user?.isNewToPlatform ??
            true,
        };

        login(updatedUser);
        return updatedUser;
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
          ...(typeof user === "object" && user !== null ? user : {}),
          role: role,
          profileData: getProfileDataForRole(role),
          // Preserve isNewToPlatform flag, default to true for new Google OAuth users
          isNewToPlatform:
            (typeof user === "object" ? user?.isNewToPlatform : true) ?? true,
        };
        console.log("Local fallback user state:", updatedUser);
        login(updatedUser);
        return updatedUser; // Return the updated state so caller can use it
      }
      if (error?.response?.status === 401 || error?.statusCode === 401) {
        console.error(
          "❌ 401 Unauthorized during role sync. Token might be invalid or missing.",
        );
      }
      console.error(
        "Failed to sync role with backend",
        error.response?.data || error,
      );
      throw error; // Re-throw to handle in UI
    }
  };

  const checkUserExistence = async (userId) => {
    try {
      if (!userId) return false;
      const response = await api.post({
        url: "/auth/user/existence",
        payload: { userId },
        activateLoader: false,
        enableErrorMessage: false,
        enableSuccessMessage: false,
      });
      return response.success;
    } catch (error) {
      console.error("Verification failed:", error);
      return false;
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
        role: user?.role,
        login,
        logout,
        setOnboardingRole,
        onboardingRole: user?.role,
        onboardingProfileData: user?.profileData,
        setRoleSelection,
        roleSelection,
        setIsRoleSelected,
        isRoleSelected,
        setIsSwitchProfile,
        isSwitchProfile
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserRole = () => useContext(UserContext);
export const useUser = () => useContext(UserContext);

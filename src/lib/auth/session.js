"use client";

import api from "@/lib/axios";

const USER_STORAGE_KEY = "user";
const TOKEN_STORAGE_KEY = "token";

const USER_ROLE_SET = new Set(["user", "paid_user", "free_trial"]);

export const isBusinessRole = (role) => role === "business";

export const isUserRole = (role) => USER_ROLE_SET.has(role);

export const getProfileDataForRole = (role) =>
  isBusinessRole(role) ? "business" : "user";

export const getDashboardPathForRole = (role) =>
  isBusinessRole(role) ? "/dashboard/business" : "/dashboard/user";

export const getProfilePathForRole = (role) =>
  isBusinessRole(role)
    ? "/dashboard/business/profile"
    : "/dashboard/user/profile";

export const getProfileSetupPathForRole = (role) =>
  isBusinessRole(role)
    ? "/onboarding/business-profile"
    : "/onboarding/user-profile";

export const getStoredUser = () => {
  if (typeof window === "undefined") return null;

  try {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse stored user", error);
    return null;
  }
};

export const persistUser = (user) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));

  const token = user?.token || user?.accessToken;
  if (token) {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  } else {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};

export const clearStoredSession = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};

export const redirectTo = (path) => {
  if (typeof window !== "undefined") {
    window.location.href = path;
  }
};

const mergeRefreshedToken = (baseUser, refreshResponse) => {
  const nextUser = {
    ...baseUser,
    ...(refreshResponse?.data || {}),
  };

  const refreshedToken =
    refreshResponse?.accessToken ||
    refreshResponse?.token ||
    refreshResponse?.data?.accessToken ||
    refreshResponse?.data?.token;

  if (refreshedToken) {
    nextUser.accessToken = refreshedToken;
    nextUser.token = refreshedToken;
  }

  return nextUser;
};

export const refreshRoleSession = async (role, baseUser = {}) => {
  const refresh = await api.get({
    url: `/auth/refreshToken/updateRole?role=${role}`,
    activateLoader: false,
    enableSuccessMessage: false,
    enableErrorMessage: false,
  });

  if (!refresh?.success) {
    return {
      success: false,
      user: {
        ...baseUser,
        role,
        profileData: getProfileDataForRole(role),
      },
    };
  }

  return {
    success: true,
    user: mergeRefreshedToken(baseUser, refresh),
  };
};

export const completeOnboardingSession = async ({
  role,
  createdProfile,
  newToken,
  login,
}) => {
  const baseUser = getStoredUser() || {};
  let refreshedUser = { ...baseUser };

  try {
    const refreshResult = await refreshRoleSession(role, baseUser);
    refreshedUser = refreshResult.user;
  } catch (error) {
    console.warn(`Token refresh after ${role} profile creation failed`, error);
  }

  const finalUser = {
    ...refreshedUser,
    role,
    profileData: getProfileDataForRole(role),
    isNewToPlatform: false,
  };

  if (createdProfile) {
    finalUser.profilePayload = createdProfile;
  }

  if (newToken) {
    finalUser.accessToken = newToken;
    finalUser.token = newToken;
  }

  persistUser(finalUser);

  if (login) {
    login(finalUser);
  }

  redirectTo(getDashboardPathForRole(role));
};

export const logoutToLogin = () => {
  clearStoredSession();
  redirectTo("/login");
};

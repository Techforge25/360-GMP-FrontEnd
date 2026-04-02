"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FiShoppingCart,
  FiBell,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { useUserRole } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
import api from "@/lib/axios";
import userProfileAPI from "@/services/userProfileAPI";
import {
  getDashboardPathForRole,
  getProfileDataForRole,
  getProfileSetupPathForRole,
  logoutToLogin,
  persistUser,
  refreshRoleSession,
} from "@/lib/auth/session";
import {
  getHeaderIconLinks,
  getMobileAccountLinks,
  getPrimaryNavLinks,
  getProfileMenuLinks,
  SYSTEM_ACTIONS,
} from "@/components/dashboard/config/navigation";

import ProfileSwitchModal from "./ProfileSwitchModal";
import SignOutModal from "./SignOutModal";
import { MdArrowDropDown } from "react-icons/md";

const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [businessProfile, setBusinessProfile] = useState(null);
  const { user, setIsSwitchProfile } = useUserRole();
  const { cartCount } = useCart();
  const pathname = usePathname();

  // Fetch profile image based on user role
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user?.role) return;

      try {
        // Always try to fetch business profile to get companyName for the switch modal
        const busResponse = await api
          .get({
            url: "/businessProfile/me",
            enableSuccessMessage: false,
            enableErrorMessage: false,
          })
          .catch((err) => {
            if (err?.status === 404 || err?.statusCode === 404) return null;
            throw err;
          });

        if (busResponse?.data) {
          setBusinessProfile(busResponse.data);
          if (user.role === "business" && busResponse.data.logo) {
            setProfileImage(busResponse.data.logo);
          }
        }

        if (user.role !== "business") {
          // Fetch user profile using userProfileAPI for avatar
          const response = await userProfileAPI.getMyProfile();
          if (response?.data?.logo) {
            setProfileImage(response.data.logo);
          }
        }
      } catch (error) {
        // Handle 404 errors gracefully (profile doesn't exist yet)
        if (error?.status === 404 || error?.statusCode === 404) {
          console.log("Profile not found - user hasn't created profile yet");
          return;
        }
        console.error("Failed to fetch profile image or business data:", error);
      }
    };

    fetchProfileImage();
  }, [user?.role]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSwitch = async () => {
    const targetRole = user?.role === "business" ? "user" : "business";
    console.log(targetRole, "target role")

    try {
      const response = await refreshRoleSession(targetRole, user);

      if (response.success) {
        // Update user context and redirect
        const updatedUser = {
          ...(response.user || user),
          role: targetRole,
          profileData: getProfileDataForRole(targetRole),
          isNewToPlatform: false, // User switching roles from dashboard is not new
        };
        setIsSwitchProfile({
          profile: targetRole,
          isInActivated: false
        })
        persistUser(updatedUser);
        window.location.href = getDashboardPathForRole(targetRole);
      }
    } catch (error) {
      // Check if it's a profile not found error
      const errorMessage = error?.message || "";
      const isProfileMissing =
        error?.statusCode === 404 &&
        (errorMessage.includes("Business profile") ||
          errorMessage.includes("User profile"));

      if (isProfileMissing) {
        // Redirect to profile creation page
        window.location.href = getProfileSetupPathForRole(targetRole);
      } else {
        console.error("Failed to switch role:", error);
      }
    }
  };

  const navLinks = getPrimaryNavLinks(user?.role);
  const headerIconLinks = getHeaderIconLinks(user?.role);
  const profileMenuLinks = getProfileMenuLinks(user?.role);
  const mobileAccountLinks = getMobileAccountLinks(user?.role);

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-21">
            {/* Logo */}
            <Link
              href={
                user?.role === "business"
                  ? "/dashboard/business"
                  : "/dashboard/user"
              }
              className="flex-shrink-0"
            >
              <Image
                src="/assets/images/Logo.png"
                alt="3SIXTY Logo"
                width={120}
                height={40}
                className="h-auto  w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation Links - Centered */}
            <div className="hidden sm:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`text-base font-medium transition-colors relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-[#240457] after:transition-all ${isActive
                        ? "text-[#240457] text-[18px] after:w-full"
                        : "text-gray-700 text-[18px] hover:text-[#240457] after:w-0"
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="hidden sm:flex items-center gap-4">
              {/* Icon Group */}
              <div className="flex items-center gap-4 border border-gray-200 rounded-full py-2 px-4">
                {/* Cart Icon */}
                {headerIconLinks.cart && (
                  <Link href={headerIconLinks.cart} className="block relative">
                    <img
                      src="/assets/images/cartIcon.png"
                      alt="Cart"
                      className="w-6 h-6"
                    />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                )}
                <Link href={headerIconLinks.notifications} className="relative">
                  <img
                    src="/assets/images/notificationIcon.png"
                    alt=""
                    className="w-5 h-5"
                  />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
                    2
                  </span>
                </Link>
                <Link
                  href={headerIconLinks.messages}
                  className="text-gray-600 hover:text-indigo-600 transition-colors relative mt-1 flex items-center justify-center p-0 bg-transparent border-none appearance-none cursor-pointer"
                >
                  <img
                    src="/assets/images/messageIcon.png"
                    alt=""
                    className="w-5 h-5"
                  />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
                    1
                  </span>
                </Link>
              </div>
              {/* User Profile with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 hover:opacity-80 transition-opacity focus:outline-none"
                >
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/images/Logo.png";
                      }}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-base">
                      {user?.role === "business"
                        ? user?.companyName?.[0]?.toUpperCase() || "B"
                        : user?.firstName?.[0]?.toUpperCase() ||
                        user?.fullName?.[0]?.toUpperCase() ||
                        "U"}
                    </div>
                  )}
                  <MdArrowDropDown
                    className={`w-4 h-4 text-[#240457] transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsProfileOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-20 animate-in fade-in zoom-in-95 duration-100">
                      <div className="flex flex-col">
                        {profileMenuLinks.map((link) => {
                          const Icon = link.icon;
                          return (
                            <Link
                              key={link.label}
                              href={link.href}
                              className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <Icon className="w-5 h-5 text-gray-900" />
                              <span>{link.label}</span>
                            </Link>
                          );
                        })}

                        <div className="h-px bg-gray-100 my-1 mx-4" />

                        {SYSTEM_ACTIONS.map((action) => {
                          const Icon = action.icon;
                          const onClick = () => {
                            setIsProfileOpen(false);
                            if (action.key === "switch") {
                              setIsSwitchModalOpen(true);
                              return;
                            }
                            setIsSignOutModalOpen(true);
                          };

                          return (
                            <button
                              key={action.key}
                              className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left"
                              onClick={onClick}
                            >
                              <Icon className={`w-5 h-5 ${action.desktopIconClassName}`} />
                              <span>{action.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="sm:hidden flex items-center gap-4">
              <Link href={headerIconLinks.notifications} className="text-gray-600 hover:text-indigo-600 relative">
                <FiBell className="w-5 h-5 text-[#240457]" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-primary text-white text-[14px] flex items-center justify-center rounded-full font-semibold">
                  2
                </span>
              </Link>
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-indigo-600 focus:outline-none"
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden bg-white border-t border-gray-100 shadow-xl fixed top-16 w-full left-0 z-40 h-[calc(100vh-64px)] overflow-y-auto">
            <div className="px-6 py-6 space-y-8">
              {/* Navigation Links Section */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Navigation
                </h3>
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        className={`block text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                          ? "text-white bg-gradient-to-r from-[#240457] to-[#3B1A78] shadow-lg transform scale-[0.98]"
                          : "text-gray-700 hover:text-[#240457] hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md"
                          }`}
                        onClick={toggleMenu}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Profile & Actions Section */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Account
                </h3>
                <div className="space-y-1">
                  {mobileAccountLinks.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-[#240457] px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md transition-all duration-200"
                        onClick={toggleMenu}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${link.mobileIconClassName}`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2 pb-8">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3 px-2">
                    System
                  </h3>
                  {SYSTEM_ACTIONS.map((action) => {
                    const Icon = action.icon;
                    const onClick = () => {
                      toggleMenu();
                      if (action.key === "switch") {
                        setIsSwitchModalOpen(true);
                        return;
                      }
                      setIsSignOutModalOpen(true);
                    };

                    return (
                      <button
                        key={action.key}
                        className={`w-full flex items-center gap-3 text-base font-medium px-4 py-3 rounded-xl hover:shadow-md transition-all duration-200 text-left ${action.mobileTextClassName ||
                          "text-gray-700 hover:text-[#240457] hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50"
                          }`}
                        onClick={onClick}
                      >
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.mobileIconClassName}`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span>{action.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Profile Switch Modal */}
      <ProfileSwitchModal
        isOpen={isSwitchModalOpen}
        onClose={() => setIsSwitchModalOpen(false)}
        userRole={user?.role}
        onSwitch={handleSwitch}
        businessName={businessProfile?.companyName}
        businessLogo={businessProfile?.logo}
      />

      {/* Sign Out Modal */}
      <SignOutModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirm={logoutToLogin}
      />
    </>
  );
};

export default AuthNavbar;

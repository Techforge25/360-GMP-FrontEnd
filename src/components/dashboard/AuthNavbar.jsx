"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FiShoppingCart,
  FiMessageSquare,
  FiBell,
  FiUser,
  FiMenu,
  FiX,
  FiChevronDown,
  FiBox,
  FiCreditCard,
  FiShoppingBag,
  FiLayers,
  FiHelpCircle,
  FiRepeat,
  FiLogOut,
} from "react-icons/fi";
import { useUserRole } from "@/context/UserContext";
import { useCart } from "@/context/CartContext";
import { MdOutlineMessage } from "react-icons/md";
import api from "@/lib/axios";

import ProfileSwitchModal from "./ProfileSwitchModal";
import SignOutModal from "./SignOutModal";

const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const { user } = useUserRole();
  const { cartCount } = useCart();
  const pathname = usePathname();

  // Fetch profile image based on user role
  useEffect(() => {
    const fetchProfileImage = async () => {
      if (!user?.role) return;

      try {
        if (user.role === "business") {
          // Fetch business profile
          const response = await api.get({
            url: "/businessProfile/me",
            enableSuccessMessage: false,
            enableErrorMessage: false,
          });
          if (response?.data?.logo) {
            setProfileImage(response.data.logo);
          }
        } else {
          // Fetch user profile
          const response = await api.get({
            url: "/userProfile/me",
            enableSuccessMessage: false,
            enableErrorMessage: false,
          });
          if (response?.data?.imageProfile) {
            setProfileImage(response.data.imageProfile);
          }
        }
      } catch (error) {
        // Handle 404 errors gracefully (profile doesn't exist yet)
        if (error?.status === 404 || error?.statusCode === 404) {
          console.log("Profile not found - user hasn't created profile yet");
          setProfileImage(null); // Use default avatar
          return;
        }
        console.error("Failed to fetch profile image:", error);
      }
    };

    fetchProfileImage();
  }, [user?.role]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSwitch = async () => {
    const targetRole = user?.role === "business" ? "user" : "business";

    try {
      // Call the API to check and switch role
      const response = await api.get({
        url: `/auth/refreshToken/updateRole?role=${targetRole}`,
        enableSuccessMessage: false,
        enableErrorMessage: false,
      });

      if (response.success) {
        // Update user context and redirect
        const updatedUser = {
          ...user,
          role: targetRole,
          isNewToPlatform: false, // User switching roles from dashboard is not new
        };

        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(updatedUser));
          // Redirect to the appropriate dashboard based on the new role
          const dashboardUrl =
            targetRole === "business"
              ? "/dashboard/business"
              : "/dashboard/user";
          window.location.href = dashboardUrl;
        }
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
        const profileCreationUrl =
          targetRole === "business"
            ? "/onboarding/business-profile"
            : "/onboarding/user-profile";

        if (typeof window !== "undefined") {
          window.location.href = profileCreationUrl;
        }
      } else {
        console.error("Failed to switch role:", error);
      }
    }
  };

  const userLinks = [
    { label: "Explore", href: "/dashboard/user" },
    { label: "Businesses", href: "/dashboard/user/businesses" },
    { label: "Marketplace", href: "/dashboard/user/marketplace" },
    { label: "Jobs", href: "/dashboard/user/jobs" },
    { label: "Communities", href: "/dashboard/user/communities" },
  ];

  const businessLinks = [
    { label: "Explore", href: "/dashboard/business" },
    { label: "Businesses", href: "/dashboard/business/businesses" },
    { label: "Marketplace", href: "/dashboard/business/marketplace" },
    { label: "Jobs", href: "/dashboard/business/jobs" },
    { label: "Communities", href: "/dashboard/business/communities" },
  ];

  const navLinks = user?.role === "business" ? businessLinks : userLinks;

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
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
                className="h-auto w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation Links - Centered */}
            <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
              <div className="flex items-center space-x-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`text-base font-medium transition-colors relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-indigo-600 after:transition-all ${
                        isActive
                          ? "text-[#240457] after:w-full"
                          : "text-gray-700 hover:text-[#240457] after:w-0"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Icon Group */}
              <div className="flex items-center gap-4 border border-gray-200 rounded-full py-2 px-4">
                {/* Cart Icon */}
                {user?.role === "user" && (
                  <Link href="/dashboard/user/cart" className="block relative">
                    <img
                      src="/assets/images/cartIcon.png"
                      alt="Cart"
                      className="w-5 h-5"
                    />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-primary text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
                        {cartCount}
                      </span>
                    )}
                  </Link>
                )}

                <Link
                  href={
                    user?.role === "business"
                      ? "/dashboard/business/notifications"
                      : "/dashboard/user/notifications"
                  }
                  className="relative"
                >
                  <img
                    src="/assets/images/notificationIcon.png"
                    alt=""
                    className="w-4 h-5"
                  />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#9747FF] text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
                    2
                  </span>
                </Link>

                <Link
                  href={
                    user?.role === "business"
                      ? "/dashboard/business/messages"
                      : "/dashboard/user/messages"
                  }
                  className="text-gray-600 hover:text-indigo-600 transition-colors relative mt-1 flex items-center justify-center p-0 bg-transparent border-none appearance-none cursor-pointer"
                >
                  <img
                    src="/assets/images/messageIcon.png"
                    alt=""
                    className="w-5 h-5"
                  />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#9747FF] text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
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
                      className="w-9 h-9 rounded-md object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/assets/images/Logo.png";
                      }}
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-base">
                      {user?.role === "business" 
                        ? (user?.companyName?.[0]?.toUpperCase() || "B")
                        : (user?.firstName?.[0]?.toUpperCase() || user?.fullName?.[0]?.toUpperCase() || "U")}
                    </div>
                  )}
                  <FiChevronDown
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
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
                        <Link
                          href={
                            user?.role === "business"
                              ? "/dashboard/business/profile"
                              : "/dashboard/user/profile"
                          }
                          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiUser className="w-5 h-5 text-gray-900" />
                          <span>My Profile</span>
                        </Link>

                        {user?.role === "business" && (
                          <Link
                            href="/dashboard/business/products"
                            className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <FiBox className="w-5 h-5 text-gray-900" />
                            <span>My Products</span>
                          </Link>
                        )}

                        <Link
                          href={
                            user?.role === "business"
                              ? "/dashboard/business/wallet"
                              : "/dashboard/user/wallet"
                          }
                          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiCreditCard className="w-5 h-5 text-gray-900" />
                          <span>Wallet</span>
                        </Link>

                        <Link
                          href={
                            user?.role === "business"
                              ? "/dashboard/business/orders"
                              : "/dashboard/user/orders"
                          }
                          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiShoppingBag className="w-5 h-5 text-gray-900" />
                          <span>Orders</span>
                        </Link>

                        <Link
                          href={
                            user?.role === "business"
                              ? "/dashboard/business/subscriptions"
                              : "/dashboard/user/subscriptions"
                          }
                          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiLayers className="w-5 h-5 text-gray-900" />
                          <span>Subscriptions</span>
                        </Link>

                        <Link
                          href={
                            user?.role === "business"
                              ? "/dashboard/business/support"
                              : "/dashboard/user/support"
                          }
                          className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiHelpCircle className="w-5 h-5 text-gray-900" />
                          <span>Support</span>
                        </Link> 

                        <div className="h-px bg-gray-100 my-1 mx-4" />

                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left"
                          onClick={() => {
                            setIsProfileOpen(false);
                            setIsSwitchModalOpen(true);
                          }}
                        >
                          <FiRepeat className="w-5 h-5 text-gray-900" />
                          <span>Switch</span>
                        </button>

                        <button
                          className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left"
                          onClick={() => {
                            setIsProfileOpen(false);
                            setIsSignOutModalOpen(true);
                          }}
                        >
                          <FiLogOut className="w-5 h-5 text-gray-900" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-4">
              <Link
                href={
                  user?.role === "business"
                    ? "/dashboard/business/notifications"
                    : "/dashboard/user/notifications"
                }
                className="text-gray-600 hover:text-indigo-600 relative"
              >
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
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 z-40">
            <div className="px-6 py-6">
              {/* Navigation Links Section */}
              <div className="mb-6">
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
                        className={`block text-base font-medium px-4 py-3 rounded-xl transition-all duration-200 ${
                          isActive
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
                  <Link
                    href={
                      user?.role === "business"
                        ? "/dashboard/business/messages"
                        : "/dashboard/user/messages"
                    }
                    className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-[#240457] px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <MdOutlineMessage className="w-4 h-4 text-white" />
                    </div>
                    <span>Messages</span>
                  </Link>
                  
                  <Link
                    href={
                      user?.role === "business"
                        ? "/dashboard/business/profile"
                        : "/dashboard/user/profile"
                    }
                    className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-[#240457] px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                      <FiUser className="w-4 h-4 text-white" />
                    </div>
                    <span>My Profile</span>
                  </Link>

                  {user?.role === "business" && (
                    <Link
                      href="/dashboard/business/products"
                      className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-[#240457] px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md transition-all duration-200"
                      onClick={toggleMenu}
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <FiBox className="w-4 h-4 text-white" />
                      </div>
                      <span>My Products</span>
                    </Link>
                  )}

                  <Link
                    href={
                      user?.role === "business"
                        ? "/dashboard/business/wallet"
                        : "/dashboard/user/wallet"
                    }
                    className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-[#240457] px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <FiCreditCard className="w-4 h-4 text-white" />
                    </div>
                    <span>Wallet</span>
                  </Link>

                  <Link
                    href={
                      user?.role === "business"
                        ? "/dashboard/business/orders"
                        : "/dashboard/user/orders"
                    }
                    className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-[#240457] px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <FiShoppingBag className="w-4 h-4 text-white" />
                    </div>
                    <span>Orders</span>
                  </Link>

                  <Link
                    href={
                      user?.role === "business"
                        ? "/dashboard/business/subscriptions"
                        : "/dashboard/user/subscriptions"
                    }
                    className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-[#240457] px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                      <FiLayers className="w-4 h-4 text-white" />
                    </div>
                    <span>Subscriptions</span>
                  </Link>

                  <Link
                    href={
                      user?.role === "business"
                        ? "/dashboard/business/support"
                        : "/dashboard/user/support"
                    }
                    className="flex items-center gap-3 text-base font-medium text-gray-700 hover:text-[#240457] px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md transition-all duration-200"
                    onClick={toggleMenu}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg flex items-center justify-center">
                      <FiHelpCircle className="w-4 h-4 text-white" />
                    </div>
                    <span>Support</span>
                  </Link>
                </div>

                {/* Bottom Actions */}
                <div className="mt-6 pt-4 border-t border-gray-100 space-y-2">
                  <button
                    className="w-full flex items-center gap-3 text-base font-medium text-gray-700 hover:text-[#240457] px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 hover:shadow-md transition-all duration-200 text-left"
                    onClick={() => {
                      toggleMenu();
                      setIsSwitchModalOpen(true);
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                      <FiRepeat className="w-4 h-4 text-white" />
                    </div>
                    <span>Switch Role</span>
                  </button>

                  <button
                    className="w-full flex items-center gap-3 text-base font-medium text-red-600 hover:text-red-700 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:shadow-md transition-all duration-200 text-left"
                    onClick={() => {
                      toggleMenu();
                      setIsSignOutModalOpen(true);
                    }}
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center">
                      <FiLogOut className="w-4 h-4 text-white" />
                    </div>
                    <span>Sign Out</span>
                  </button>
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
      />

      {/* Sign Out Modal */}
      <SignOutModal
        isOpen={isSignOutModalOpen}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirm={() => {
          // Handle sign out logic
          if (typeof window !== "undefined") {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            window.location.href = "/login";
          }
        }}
      />
    </>
  );
};

export default AuthNavbar;

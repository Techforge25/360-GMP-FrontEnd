"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user } = useUserRole();
  const { cartCount } = useCart();

  const toggleMenu = () => setIsOpen(!isOpen);

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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-[#240457] transition-colors relative pb-1 hover:after:w-full after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-indigo-600 after:transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Icon Group */}
            <div className="flex items-center gap-4 border border-gray-200 rounded-full py-2 px-4">
              {/* Cart Icon */}
              <button className=" relative">
                <img
                  src="/assets/images/cartIcon.png"
                  alt=""
                  className="w-5 h-5"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-600 text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
                    {cartCount}
                  </span>
                )}
              </button>

              <button className=" relative">
                <img
                  src="/assets/images/notificationIcon.png"
                  alt=""
                  className="w-4 h-5"
                />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-600 text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
                  2
                </span>
              </button>

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
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-600 text-white text-[8px] flex items-center justify-center rounded-full font-semibold">
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
                <div className="w-9 h-9 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                  M
                </div>
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
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FiUser className="w-5 h-5 text-gray-900" />
                        <span>My Profile</span>
                      </Link>

                      {user?.role === "business" && (
                        <Link
                          href="/dashboard/business/products"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <FiBox className="w-5 h-5 text-gray-900" />
                          <span>My Products</span>
                        </Link>
                      )}

                      <Link
                        href="/dashboard/business/wallet"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
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
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
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
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FiLayers className="w-5 h-5 text-gray-900" />
                        <span>Subscriptions</span>
                      </Link>

                      <Link
                        href="/dashboard/business/support"
                        className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FiHelpCircle className="w-5 h-5 text-gray-900" />
                        <span>Support</span>
                      </Link>

                      <div className="h-px bg-gray-100 my-1 mx-4" />

                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FiRepeat className="w-5 h-5 text-gray-900" />
                        <span>Switch</span>
                      </button>

                      <button
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors text-left"
                        onClick={() => setIsProfileOpen(false)}
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
            <button className="text-gray-600 hover:text-indigo-600 relative">
              <FiBell className="w-5 h-5 text-[#240457]" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 text-white text-[10px] flex items-center justify-center rounded-full font-semibold">
                2
              </span>
            </button>
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
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-md transition-colors"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-4 mt-4">
              <Link
                href={
                  user?.role === "business"
                    ? "/dashboard/business/messages"
                    : "/dashboard/user/messages"
                }
                className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md hover:bg-gray-50"
                onClick={toggleMenu}
              >
                <MdOutlineMessage className="w-5 h-5" />
                <span>Messages</span>
              </Link>
              <Link
                href={
                  user?.role === "business"
                    ? "/dashboard/business/settings"
                    : "/dashboard/user/profile"
                }
                className="flex items-center gap-3 text-sm font-medium text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md hover:bg-gray-50 mt-2"
                onClick={toggleMenu}
              >
                <FiUser className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AuthNavbar;

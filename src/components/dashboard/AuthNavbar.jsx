"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiSearch,
  FiShoppingCart,
  FiMessageSquare,
  FiBell,
  FiUser,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import { useUserRole } from "@/context/UserContext";

const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUserRole();

  const toggleMenu = () => setIsOpen(!isOpen);

  const userLinks = [
    { label: "Explorer", href: "/dashboard/user" },
    { label: "Marketplace", href: "/dashboard/user/marketplace" }, // Products for users
    { label: "Jobs", href: "/dashboard/user/jobs" },
    { label: "Communities", href: "/dashboard/user/communities" },
  ];

  const businessLinks = [
    { label: "Dashboard", href: "/dashboard/business" },
    { label: "My Profile", href: "/dashboard/business/profile" },
    { label: "Products", href: "/dashboard/business/products" }, // Manage products
    { label: "Jobs", href: "/dashboard/business/jobs" }, // Manage jobs
    { label: "Communities", href: "/dashboard/business/communities" }, // Manage communities
  ];

  // Default to userLinks if no role found (or handle partial loading state)
  // Check specifically for 'business' (case-insensitive if needed, but usually typically lowercase in this app)
  const navLinks = user?.role === "business" ? businessLinks : userLinks;

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-12">
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
                width={140}
                height={45}
                className="h-auto w-auto object-contain"
                priority
              />
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 hover:text-indigo-900 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 border border-border-light px-4 py-2 rounded-full">
              <button className="text-gray-500 hover:text-indigo-900 transition-colors relative">
                <FiShoppingCart className="w-5 h-5" />
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-purple-600 text-white text-[10px] flex items-center justify-center rounded-full">
                  0
                </span>
              </button>
              <Link
                href={
                  user?.role === "business"
                    ? "/dashboard/business/messages"
                    : "/dashboard/user/messages"
                }
              >
                <button className="text-gray-500 hover:text-indigo-900 transition-colors relative">
                  <FiMessageSquare className="w-5 h-5" />
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-purple-600 text-white text-[10px] flex items-center justify-center rounded-full">
                    0
                  </span>
                </button>
              </Link>
              <button className="text-gray-500 hover:text-indigo-900 transition-colors relative">
                <FiBell className="w-5 h-5" />
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-purple-600 text-white text-[10px] flex items-center justify-center rounded-full">
                  0
                </span>
              </button>
            </div>
            <div className="h-8 w-[1px] bg-gray-200 mx-2" />

            <Link
              href={
                user?.role === "business"
                  ? "/dashboard/business/settings"
                  : "/dashboard/user/profile"
              }
            >
              <button className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700">
                  <FiUser className="w-4 h-4" />
                </div>
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button className="text-gray-500 hover:text-indigo-900 relative">
              <FiMessageSquare className="w-5 h-5" />
            </button>
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-indigo-900 focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg absolute w-full left-0 animate-in slide-in-from-top-2">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="block text-base font-medium text-gray-700 hover:text-indigo-900 hover:bg-gray-50 px-3 py-2 rounded-md"
                onClick={toggleMenu}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-100 pt-4 flex gap-4 px-3">
              <div className="flex flex-col gap-3 w-full">
                <button className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <FiShoppingCart className="w-4 h-4" /> Cart
                </button>
                <button className="flex items-center gap-2 text-sm font-medium text-gray-600">
                  <FiBell className="w-4 h-4" /> Alerts
                </button>
                <Link
                  href={
                    user?.role === "business"
                      ? "/dashboard/business/settings"
                      : "/dashboard/user/profile"
                  }
                  className="flex items-center gap-2 text-sm font-medium text-gray-600"
                  onClick={toggleMenu}
                >
                  <FiUser className="w-4 h-4" /> Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AuthNavbar;

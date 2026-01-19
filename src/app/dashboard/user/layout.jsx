"use client";
import React from "react";
import Footer from "@/components/landing/Footer";
import AuthNavbar from "@/components/dashboard/AuthNavbar";

export default function UserDashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
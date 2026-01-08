"use client";
import React from "react";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaTwitter,
  FaFacebookF,
  FaInstagram,
} from "react-icons/fa";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image
                src="/assets/images/Logo.png"
                alt="3SIXTY Logo"
                width={150}
                height={50}
                className="h-auto w-full object-contain rounded-lg"
                priority
              />
            </Link>
            <p className="text-indigo-200 text-sm leading-relaxed max-w-xs">
              The premier B2B global marketplace connecting businesses,
              expanding networks, and unlocking new opportunities worldwide.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center hover:bg-brand-primary transition-colors text-white"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center hover:bg-brand-primary transition-colors text-white"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-indigo-900/50 flex items-center justify-center hover:bg-brand-primary transition-colors text-white"
              >
                <FaFacebookF />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-4 text-indigo-200 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-white transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/landing/pricing"
                  className="hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/landing/contact-us"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-indigo-200 text-sm">
              <li>
                <Link
                  href="/login"
                  className="hover:text-white transition-colors"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="hover:text-white transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4 text-indigo-200 text-sm">
              <li>
                <span className="block text-white font-medium mb-1">Email</span>
                Support@3Sixty.com
              </li>
              <li>
                <span className="block text-white font-medium mb-1">Phone</span>
                +1 (888) 123-4567
              </li>
              <li>
                <span className="block text-white font-medium mb-1">
                  Location
                </span>
                123 Business Avenue,
                <br /> Suite 100
                <br /> New York, NY 10001
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-900/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-indigo-300">
          <p>© 2024 3SIXTY Global Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-white">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

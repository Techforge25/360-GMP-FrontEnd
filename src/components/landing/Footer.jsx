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
    <footer className="bg-[#0B192C] text-white pt-16 pb-8">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="bg-white p-2 rounded-lg">
                <Image
                  src="/assets/images/Logo.png"
                  alt="3SIXTY Logo"
                  width={100}
                  height={50}
                  className="h-auto w-full object-contain rounded-lg min-w-[100px]"
                  priority
                />
              </div>
            </Link>
            <p className="text-[#FFFFFF99] text-base leading-relaxed max-w-[400px]">
              Our mission is to make global trade easier, faster, safer, and
              more accessible for every buyer, seller, and job seeker,
              eliminating friction through a unified digital platform.
            </p>
          </div>

          <div>
            <h3 className="font-medium text-white text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-white text-base">
              <li>
                <Link
                  href="/dashboard/business/businesses"
                  className="hover:text-white transition-colors"
                >
                  Business
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/business/marketplace"
                  className="hover:text-white transition-colors"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/business/jobs"
                  className="hover:text-white transition-colors"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/business/community"
                  className="hover:text-white transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white text-lg mb-6 capitalize">
              resources/legal
            </h3>
            <ul className="space-y-4 text-white text-base">
              <li className="">
                <Link
                  href="/dashboard/business/businesses"
                  className="hover:text-white transition-colors "
                >
                  help center
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/business/marketplace"
                  className="hover:text-white transition-colors "
                >
                  community guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/business/jobs"
                  className="hover:text-white transition-colors "
                >
                  privacy policy
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/business/community"
                  className="hover:text-white transition-colors "
                >
                  disclaimer
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-white text-lg mb-6 capitalize">
              contact us
            </h3>
            <ul className="space-y-4 text-white text-base">
              <li className="">
                <Link
                  href="/dashboard/business/businesses"
                  className="hover:text-white transition-colors"
                >
                  Email: <br />
                  info360@gmail.com
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/business/marketplace"
                  className="hover:text-white transition-colors"
                >
                  Follow Us:
                </Link>
              </li>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#9747FF] flex items-center justify-center hover:bg-brand-primary transition-colors text-white"
                >
                  <FaLinkedinIn className="text-white w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#9747FF] flex items-center justify-center hover:bg-brand-primary transition-colors text-white"
                >
                  <FaFacebookF className="text-white w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-[#9747FF] flex items-center justify-center hover:bg-brand-primary transition-colors text-white"
                >
                  <FaInstagram className="text-white w-4 h-4" />
                </a>
              </div>
            </ul>
          </div>
        </div>

        <div className="border-t border-indigo-900/50 pt-8 gap-4 text-sm text-[#FFFFFF99]">
          <p className="text-center">
            © 2024 3SIXTY Global Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

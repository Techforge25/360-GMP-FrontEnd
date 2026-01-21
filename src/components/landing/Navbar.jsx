"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinkClass = `
  relative inline-block text-md text-text-secondary
  transition-colors duration-300
  hover:text-brand-primary-light
  after:content-['']
  after:absolute after:left-0 after:-bottom-1
  after:h-[2px] after:w-full
  after:bg-brand-primary-light
  after:origin-left after:scale-x-0
  after:transition-transform after:duration-300
  hover:after:scale-x-100
`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex-shrink-1 flex items-center">
            <Image
              src="/assets/images/Logo.png"
              alt="3SIXTY Logo"
              width={150}
              height={50}
              className="h-auto"
              priority
            />
          </Link>

          <div className="hidden md:flex items-center space-x-12">
            <Link href="/" className={navLinkClass}>
              Home
            </Link>
            <Link href="/landing/about" className={navLinkClass}>
              About
            </Link>
            <Link href="/landing/why-us" className={navLinkClass}>
              Why Choose Us
            </Link>
            <Link href="/landing/pricing" className={navLinkClass}>
              Prices
            </Link>
            <Link href="/landing/contact-us" className={navLinkClass}>
              Contact Us
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button
                variant="ghost"
                className="text-text-secondary hover:text-brand-primary font-medium"
              >
                Log In
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="default">Sign Up</Button>
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-text-secondary hover:text-text-primary focus:outline-none"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-border-light animate-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-brand-primary hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-brand-primary hover:bg-gray-50"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="/#services"
              className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-brand-primary hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Our Services
            </Link>
            <Link
              href="/landing/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-brand-primary hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Prices
            </Link>
            <Link
              href="/landing/contact-us"
              className="block px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-brand-primary hover:bg-gray-50"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            <div className="pt-4 flex flex-col gap-3">
              <Link href="/login" onClick={toggleMenu}>
                <Button variant="outline" className="w-full justify-center">
                  Log In
                </Button>
              </Link>
              <Link href="/signup" onClick={toggleMenu}>
                <Button className="w-full bg-indigo-900 hover:bg-indigo-800 text-white justify-center">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

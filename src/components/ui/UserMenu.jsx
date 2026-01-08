import React, { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import {
  FiUser,
  FiSettings,
  FiLogOut,
  FiBriefcase,
  FiCreditCard,
  FiHelpCircle,
  FiChevronDown,
} from "react-icons/fi";
import { Card } from "@/components/ui/Card";

const UserMenu = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const { name = "John Doe", role = "Admin" } = user || {};

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const menuItems = [
    { icon: <FiUser />, label: "My Profile" },
    { icon: <FiBriefcase />, label: "Orders" },
    { icon: <FiCreditCard />, label: "Wallet" },
    { icon: <FiBriefcase />, label: "Subscriptions" }, // Using Briefcase as placeholder for laptop icon
    { icon: <FiHelpCircle />, label: "Support" },
  ];

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <Button
        variant="ghost"
        className="flex h-16 items-center gap-3 rounded-xl border bg-card px-4 py-2 hover:bg-accent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="h-10 w-10 bg-brand-primary text-text-inverse">
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="hidden text-left md:block">
          <p className="text-sm font-semibold text-text-primary">{name}</p>
          <p className="text-xs text-text-secondary">{role}</p>
        </div>
        <FiChevronDown
          className={cn(
            "ml-2 transition-transform",
            isOpen ? "rotate-180" : ""
          )}
        />
      </Button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-64 origin-top-right overflow-hidden rounded-xl bg-surface-elevated shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                className="flex w-full items-center px-4 py-3 text-sm text-text-primary hover:bg-surface-muted"
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div className="my-1 h-px bg-border-light" />
            <button
              className="flex w-full items-center px-4 py-3 text-sm text-text-primary hover:bg-surface-muted"
              onClick={() => setIsOpen(false)}
            >
              <span className="mr-3 text-lg">
                <FiSettings />
              </span>
              Switch
            </button>
            <button
              className="flex w-full items-center px-4 py-3 text-sm text-accent-danger hover:bg-surface-muted"
              onClick={() => setIsOpen(false)}
            >
              <span className="mr-3 text-lg">
                <FiLogOut />
              </span>
              Sign Out
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};

export { UserMenu };

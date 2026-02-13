"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { cn } from "@/lib/utils";

const staticCountries = [
  { name: "United States", code: "US", dialCode: "+1", flag: "🇺🇸" },
  { name: "Canada", code: "CA", dialCode: "+1", flag: "🇨🇦" },
  { name: "United Kingdom", code: "GB", dialCode: "+44", flag: "🇬🇧" },
  { name: "Australia", code: "AU", dialCode: "+61", flag: "🇦🇺" },
  { name: "India", code: "IN", dialCode: "+91", flag: "🇮🇳" },
  { name: "Pakistan", code: "PK", dialCode: "+92", flag: "🇵🇰" },
  { name: "United Arab Emirates", code: "AE", dialCode: "+971", flag: "🇦🇪" },
  { name: "Saudi Arabia", code: "SA", dialCode: "+966", flag: "🇸🇦" },
  { name: "Germany", code: "DE", dialCode: "+49", flag: "🇩🇪" },
  { name: "France", code: "FR", dialCode: "+33", flag: "🇫🇷" },
  { name: "China", code: "CN", dialCode: "+86", flag: "🇨🇳" },
  { name: "Japan", code: "JP", dialCode: "+81", flag: "🇯🇵" },
  { name: "Brazil", code: "BR", dialCode: "+55", flag: "🇧🇷" },
  { name: "South Africa", code: "ZA", dialCode: "+27", flag: "🇿🇦" },
].sort((a, b) => a.name.localeCompare(b.name));

export const PhoneInputWithCountry = ({
  value,
  onChange,
  placeholder = "Phone number",
  className,
  required = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [countries, setCountries] = useState(staticCountries);
  const [selectedCountry, setSelectedCountry] = useState(
    staticCountries.find((c) => c.code === "IN") || staticCountries[0],
  );
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);

  // Fetch countries dynamically from REST Countries API (Geonames alternative)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flag",
        );
        const data = await response.json();

        const mappedCountries = data
          .filter((c) => c.idd?.root) // Ensure dial code exists
          .map((c) => ({
            name: c.name.common,
            code: c.cca2,
            dialCode: c.idd.root + (c.idd.suffixes?.[0] || ""),
            flag: c.flag,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        if (mappedCountries.length > 0) {
          setCountries(mappedCountries);

          // If we have an initial value, find the country
          if (value && typeof value === "string") {
            const found = mappedCountries.find((c) =>
              value.startsWith(c.dialCode),
            );
            if (found) {
              setSelectedCountry(found);
            }
          } else {
            // Default to India or first in list
            const defaultCountry =
              mappedCountries.find((c) => c.code === "IN") ||
              mappedCountries[0];
            setSelectedCountry(defaultCountry);
          }
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Parse initial value if it contains a dial code
  useEffect(() => {
    if (!loading && value && typeof value === "string") {
      const found = countries.find((c) => value.startsWith(c.dialCode));
      if (found) {
        setSelectedCountry(found);
      }
    }
  }, [value, loading, countries]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);

    // Update phone number with new dial code
    const baseNumber = value ? value.replace(/^\+\d+\s?/, "") : "";
    onChange(`${country.dialCode} ${baseNumber.trim()}`);
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    // Keep dial code and update rest
    const baseNumber = input.replace(/^\+\d+\s?/, "");
    onChange(`${selectedCountry.dialCode} ${baseNumber}`);
  };

  return (
    <div
      className={cn(
        "relative flex h-11 w-full rounded-md border border-border-light bg-surface",
        className,
      )}
    >
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center h-full px-3 border-r border-border-light hover:bg-gray-50 transition-colors gap-1 min-w-[80px]"
        >
          <span className="text-xl leading-none">{selectedCountry.flag}</span>
          <span className="text-sm font-medium text-text-secondary">
            {selectedCountry.dialCode}
          </span>
          <FiChevronDown
            className={cn(
              "w-3 h-3 text-text-hint transition-transform",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-white border border-border-light rounded-md shadow-lg z-50">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleCountrySelect(country)}
                className={cn(
                  "flex items-center w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors gap-3",
                  selectedCountry.code === country.code &&
                    "bg-brand-primary/5 text-brand-primary",
                )}
              >
                <span className="text-xl">{country.flag}</span>
                <span className="flex-1 text-sm">{country.name}</span>
                <span className="text-sm text-text-hint font-mono">
                  {country.dialCode}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <input
        type="tel"
        value={value ? value.replace(/^\+\d+\s?/, "") : ""}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        className="flex-1 h-full px-3 py-2 text-base bg-transparent focus:outline-none placeholder:text-text-hint"
        required={required}
      />
    </div>
  );
};

"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiChevronDown, FiSearch } from "react-icons/fi";
import { cn } from "@/lib/utils";
import Image from "next/image";

const staticCountries = [
  {
    name: "India",
    code: "IN",
    dialCode: "+91",
    flag: "https://flagcdn.com/w320/in.png",
  },
  {
    name: "United Kingdom",
    code: "GB",
    dialCode: "+44",
    flag: "https://flagcdn.com/w320/gb.png",
  },
  {
    name: "United States",
    code: "US",
    dialCode: "+1",
    flag: "https://flagcdn.com/w320/us.png",
  },
  {
    name: "Pakistan",
    code: "PK",
    dialCode: "+92",
    flag: "https://flagcdn.com/w320/pk.png",
  },
  {
    name: "United Arab Emirates",
    code: "AE",
    dialCode: "+971",
    flag: "https://flagcdn.com/w320/ae.png",
  },
  {
    name: "Canada",
    code: "CA",
    dialCode: "+1",
    flag: "https://flagcdn.com/w320/ca.png",
  },
  {
    name: "Australia",
    code: "AU",
    dialCode: "+61",
    flag: "https://flagcdn.com/w320/au.png",
  },
  {
    name: "Germany",
    code: "DE",
    dialCode: "+49",
    flag: "https://flagcdn.com/w320/de.png",
  },
  {
    name: "France",
    code: "FR",
    dialCode: "+33",
    flag: "https://flagcdn.com/w320/fr.png",
  },
  {
    name: "Saudi Arabia",
    code: "SA",
    dialCode: "+966",
    flag: "https://flagcdn.com/w320/sa.png",
  },
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(
    staticCountries.find((c) => c.code === "IN") || staticCountries[0],
  );
  const [loading, setLoading] = useState(true);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Fetch countries dynamically from REST Countries API
  useEffect(() => {
    const fetchCountriesFromAPI = async () => {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,cca2,idd,flags",
        );
        const data = await response.json();

        const mappedCountries = data
          .filter((c) => c.idd?.root) // Ensure dial code exists
          .map((c) => ({
            name: c.name.common,
            code: c.cca2,
            dialCode: c.idd.root + (c.idd.suffixes?.[0] || ""),
            flag: c.flags.svg || c.flags.png,
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        if (mappedCountries.length > 0) {
          setCountries(mappedCountries);

          // If we have an initial value, find the country
          if (value && typeof value === "string") {
            // Find longest matching dial code to be accurate (e.g. +1 vs +1242)
            const matchedCountries = mappedCountries.filter((c) =>
              value.startsWith(c.dialCode),
            );
            const found = matchedCountries.sort(
              (a, b) => b.dialCode.length - a.dialCode.length,
            )[0];
            if (found) {
              setSelectedCountry(found);
            }
          }
        }
      } catch (error) {
        console.error("Failed to fetch countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountriesFromAPI();
  }, []);

  // Filter countries based on search query
  const filteredCountries = countries.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.dialCode.includes(searchQuery) ||
      c.code.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchQuery("");

    // Update phone number with new dial code
    const baseNumber = value ? value.replace(/^\+\d+\s?/, "") : "";
    onChange(`${country.dialCode} ${baseNumber.trim()}`);
  };

  const handlePhoneChange = (e) => {
    const input = e.target.value;
    // Remove non-numeric characters for the base number
    const numericInput = input.replace(/\D/g, "");
    onChange(`${selectedCountry.dialCode} ${numericInput}`);
  };

  return (
    <div
      className={cn(
        "relative flex h-11 w-full rounded-md border border-border-light bg-surface shadow-sm focus-within:ring-2 focus-within:ring-brand-primary/20 transition-all",
        className,
      )}
    >
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center h-full px-3 border-r border-border-light hover:bg-gray-50 transition-colors gap-2 min-w-[100px]"
        >
          <div className="relative w-6 h-4 rounded-sm overflow-hidden flex-shrink-0 border border-gray-100">
            <Image
              src={selectedCountry.flag}
              alt={selectedCountry.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-text-secondary">
            {selectedCountry.dialCode}
          </span>
          <FiChevronDown
            className={cn(
              "w-3 h-3 text-text-hint transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-border-light rounded-xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Search Bar */}
            <div className="px-3 pb-2 border-b border-gray-50">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search country..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 text-sm bg-gray-50 border-none rounded-lg focus:ring-2 focus:ring-brand-primary/20 outline-none"
                />
              </div>
            </div>

            {/* Country List */}
            <div className="max-h-64 overflow-y-auto custom-scrollbar">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => handleCountrySelect(country)}
                    className={cn(
                      "flex items-center w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors gap-3 group",
                      selectedCountry.code === country.code &&
                        "bg-brand-primary/5 text-brand-primary",
                    )}
                  >
                    <div className="relative w-6 h-4 rounded-sm overflow-hidden flex-shrink-0 border border-gray-100 group-hover:scale-110 transition-transform">
                      <Image
                        src={country.flag}
                        alt={country.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="flex-1 text-sm font-medium">
                      {country.name}
                    </span>
                    <span className="text-xs text-text-hint font-mono bg-gray-100 px-1.5 py-0.5 rounded">
                      {country.dialCode}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center">
                  <p className="text-sm text-text-hint">No countries found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <input
        type="tel"
        value={value ? value.replace(/^\+\d+\s?/, "") : ""}
        onChange={handlePhoneChange}
        placeholder={placeholder}
        className="flex-1 h-full px-4 py-2 text-base bg-transparent focus:outline-none placeholder:text-text-hint font-medium"
        required={required}
      />
    </div>
  );
};

import React, { useState, useEffect, useRef } from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";
import { Input } from "./Input";

export const LocationSearch = ({
  onLocationSelect,
  placeholder = "Search for a location...",
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`,
          {
            headers: {
              "Accept-Language": "en",
            },
          },
        );
        const data = await response.json();
        setSuggestions(data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Location search error:", error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (location) => {
    const address = location.address || {};

    // Extract location components
    const locationData = {
      country: address.country || "",
      city:
        address.city ||
        address.town ||
        address.village ||
        address.municipality ||
        "",
      address:
        address.road ||
        address.suburb ||
        location.display_name.split(",")[0] ||
        "",
      fullAddress: location.display_name,
    };

    setQuery(location.display_name);
    setShowDropdown(false);
    onLocationSelect(locationData);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <FiSearch className="absolute left-3 top-3.5 text-text-secondary" />
        <Input
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
          className="pl-10"
        />
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-border-light rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading && (
            <div className="p-3 text-sm text-text-secondary text-center">
              Searching...
            </div>
          )}
          {!loading &&
            suggestions.map((location) => (
              <button
                key={location.place_id}
                type="button"
                onClick={() => handleSelect(location)}
                className="w-full px-4 py-3 text-left hover:bg-surface-muted transition-colors border-b border-border-light last:border-b-0 flex items-start gap-3"
              >
                <FiMapPin className="text-brand-primary mt-1 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary truncate">
                    {location.display_name}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {location.type}
                  </p>
                </div>
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

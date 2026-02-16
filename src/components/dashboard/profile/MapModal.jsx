"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to handle map clicks
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
}

// Helper to change map view
function ChangeView({ center }) {
  const map = useMapEvents({});
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

const MapModal = ({
  isOpen,
  onClose,
  onSave,
  initialLocation,
  initialSearchQuery,
}) => {
  const [position, setPosition] = useState(initialLocation || [51.505, -0.09]);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearchedInitially, setHasSearchedInitially] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Determine the position to use: prioritiy to initialLocation if valid, otherwise fallback
    const validLocation =
      initialLocation &&
      Array.isArray(initialLocation) &&
      initialLocation[0] !== 0
        ? initialLocation
        : [51.505, -0.09];
    setPosition(validLocation);
  }, [initialLocation]);

  useEffect(() => {
    // If we have an initial search query and the position is default, search automatically
    const isDefaultPosition =
      !position || (position[0] === 51.505 && position[1] === -0.09);

    if (
      isOpen &&
      initialSearchQuery &&
      isDefaultPosition &&
      !hasSearchedInitially
    ) {
      handleSearch(initialSearchQuery);
      setHasSearchedInitially(true);
    }
  }, [isOpen, initialSearchQuery, position, hasSearchedInitially]);

  const handleSave = () => {
    const [lat, lng] = position;
    const mapURL = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`;
    onSave(mapURL, position);
  };

  const handleSearch = async (queryOverride) => {
    const query = queryOverride || searchQuery;
    if (!query || !query.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query,
        )}`,
      );
      const data = await response.json();
      setSearchResults(data);

      // If it's an automatic search and we got results, select the first one
      if (queryOverride && data.length > 0) {
        handleSelectLocation(data[0].lat, data[0].lon);
      }
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectLocation = (lat, lon) => {
    const newPos = [parseFloat(lat), parseFloat(lon)];
    setPosition(newPos);
    setSearchResults([]); // Clear results
    setSearchQuery(""); // Optional: clear query
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-500 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Update Business Location
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Search for your address or click on the map to pin the location
          </p>

          {/* Search Bar */}
          <div className="mt-4 relative z-[1001]">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search city, street, or place..."
                className="flex-1 text-black border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#240457]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={() => handleSearch()}
                disabled={isSearching}
                className="px-4 py-2 bg-[#240457] text-white rounded-lg text-sm font-medium hover:bg-[#1a0340] disabled:opacity-50"
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto z-[1002]">
                {searchResults.map((result, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectLocation(result.lat, result.lon)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 text-sm text-gray-700 block"
                  >
                    {result.display_name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative min-h-[300px] sm:min-h-[400px]">
          {isClient && (
            <MapContainer
              center={position}
              zoom={13}
              style={{ height: "100%", width: "100%" }}
              className="z-0"
            >
              <ChangeView center={position} />
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker position={position} setPosition={setPosition} />
            </MapContainer>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
          <div className="mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Selected Coordinates:</span>
            </p>
            <p className="text-sm text-gray-900 font-mono">
              Latitude: {position[0].toFixed(6)}, Longitude:{" "}
              {position[1].toFixed(6)}
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-[#240457] rounded-lg hover:bg-[#240457]/90 transition-colors"
            >
              Save Location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;

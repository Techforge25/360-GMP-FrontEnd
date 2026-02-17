import React from "react";
import {
  FiMoreVertical,
  FiFileText,
  FiBox,
  FiBookmark,
  FiAlertCircle,
  FiPhone,
  FiVideo,
} from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";

export default function ChatProfileSidebar({ user, products }) {
  if (!user) return null;

  return (
    <div className="h-full bg-white border-l border-gray-100 overflow-y-auto custom-scrollbar p-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <Avatar className="w-24 h-24 mb-4 ring-4 ring-gray-50">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
        </Avatar>

        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-bold text-gray-900 text-lg">{user.name}</h2>
          {user.verified && (
            <span className="text-blue-500" title="Verified">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M256 48C141.601 48 48 141.601 48 256s93.601 208 208 208 208-93.601 208-208S370.399 48 256 48zm-33.801 303.497L136.046 265.34l23.597-23.597 62.556 62.556 129.243-129.243 23.597 23.597-152.84 152.844z"></path>
              </svg>
            </span>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-6">
          {user.country} • {user.experience}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 w-full bg-gray-50 rounded-xl p-4 mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-1">Avg. Response</p>
            <p className="font-bold text-gray-900">{user.avgResponse}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Revenue</p>
            <p className="font-bold text-gray-900">{user.revenue}</p>
          </div>
        </div>

        <Button
          variant="outline"
          className="w-full border-gray-200 hover:bg-gray-50"
        >
          View Full Profile
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-900 text-sm mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <FiBookmark className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Favorite</span>
          </button>
          <button className="flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
            <FiAlertCircle className="w-5 h-5 text-gray-700" />
            <span className="text-sm font-medium text-gray-700">Report</span>
          </button>
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-sm">Featured Products</h3>
          <button className="text-sm text-brand-primary font-medium hover:underline">
            See All
          </button>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                <img
                  src={product.image}
                  className="w-full h-full object-cover"
                  alt={product.name}
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-gray-900 truncate group-hover:text-brand-primary transition-colors">
                  {product.name}
                </h4>
                <p className="text-sm font-medium text-gray-500 mb-0.5">
                  {product.priceRange}
                </p>
                <p className="text-[10px] text-gray-400">MOQ: {product.moq}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

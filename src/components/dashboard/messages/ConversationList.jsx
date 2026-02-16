import React from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

export default function ConversationList({
  conversations,
  selectedId,
  onSelect,
}) {
  const [filter, setFilter] = React.useState("All"); // All or Unread

  const filteredConversations = conversations.filter((c) => {
    if (filter === "Unread") return c.unread > 0;
    return true;
  });

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-100">
      {/* Header & Search */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => setFilter("All")}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors",
              filter === "All"
                ? "bg-blue-50 text-[#2563EB]"
                : "text-gray-500 hover:bg-gray-50",
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter("Unread")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium",
              filter === "Unread"
                ? "bg-gray-500 text-black"
                : "text-gray-500 hover:bg-gray-50",
            )}
          >
            Unread
          </button>
          <div className="ml-auto">
            <button className="text-gray-400 hover:text-gray-600 flex items-center gap-1">
              <img src="/assets/icon/newestIcon.png" alt="" />
              <span className="ml-1 text-sm text-black">Newest</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#556179] w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, product..."
            className="w-full text-[#556179] pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary/50"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredConversations.map((conv) => (
          <div
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "p-4 cursor-pointer transition-colors border-b border-gray-50 hover:bg-gray-50",
              selectedId === conv.id ? "bg-blue-50/50" : "",
            )}
          >
            <div className="flex gap-3">
              <div className="relative">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={conv.user.avatar} />
                  <AvatarFallback>{conv.user.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
                {conv.user.status === "Online" && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1">
                  <h3
                    className={cn(
                      "font-semibold text-sm truncate pr-2",
                      selectedId === conv.id
                        ? "text-brand-primary"
                        : "text-gray-900",
                    )}
                  >
                    {conv.user.name}
                  </h3>
                  <span className="text-sm text-gray-400 whitespace-nowrap">
                    {conv.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p
                    className={cn(
                      "text-sm truncate",
                      conv.isUnread
                        ? "text-gray-900 font-medium"
                        : "text-gray-500",
                    )}
                  >
                    {conv.lastMessage}
                  </p>
                  {conv.unread > 0 && (
                    <span className="ml-2 bg-[#240457] text-white text-[10px] font-bold h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full">
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

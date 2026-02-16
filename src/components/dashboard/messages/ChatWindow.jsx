import React from "react";
import {
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiPaperclip,
  FiImage,
  FiSmile,
  FiSend,
  FiArrowLeft,
} from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export default function ChatWindow({ conversation, onBack }) {
  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400">
        Select a conversation to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white relative">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <FiArrowLeft size={24} />
          </button>

          <div className="relative">
            <Avatar className="w-10 h-10">
              <AvatarImage src={conversation.user.avatar} />
              <AvatarFallback>
                {conversation.user.name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            {conversation.user.status === "Online" && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>

          <div>
            <h2 className="font-bold text-gray-900">
              {conversation.user.name}
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{conversation.user.role}</span>
              <span>•</span>
              <span>{conversation.user.country}</span>
              <span>•</span>
              <span
                className={
                  conversation.user.status === "Online"
                    ? "text-green-600 font-medium"
                    : "text-gray-400"
                }
              >
                {conversation.user.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600"
          >
            <FiPhone size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600"
          >
            <FiVideo size={20} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-gray-600"
          >
            <FiMoreVertical size={20} />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-slate-50 space-y-6 custom-scrollbar">
        {conversation.messages.map((msg, index) => (
          <div key={msg.id}>
            {/* Date Separator */}
            {msg.dateHeader && (
              <div className="flex justify-center mb-6">
                <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">
                  {msg.dateHeader}
                </span>
              </div>
            )}

            <div
              className={cn(
                "flex w-full",
                msg.sender === "me" ? "justify-end" : "justify-start",
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] md:max-w-[60%]",
                  msg.sender === "me" ? "items-end" : "items-start",
                )}
              >
                {/* Message Content */}
                {msg.type === "text" && (
                  <div
                    className={cn(
                      "p-4 rounded-2xl text-sm shadow-sm",
                      msg.sender === "me"
                        ? "bg-brand-primary text-white rounded-tr-none"
                        : "bg-white text-gray-800 border border-gray-100 rounded-tl-none",
                    )}
                  >
                    {msg.content}
                  </div>
                )}

                {msg.type === "product" && (
                  <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 max-w-sm">
                    <div className="flex gap-4 mb-3">
                      <img
                        src={msg.content.image}
                        className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm">
                          {msg.content.title}
                        </h4>
                        <p className="text-brand-primary font-bold text-sm my-1">
                          {msg.content.price}
                        </p>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          MOQ: {msg.content.moq}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 pt-3 border-t border-gray-100">
                      {msg.content.text}
                    </p>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-brand-primary text-sm font-semibold"
                    >
                      View Product Details
                    </Button>
                  </div>
                )}

                {msg.type === "quotation" && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden w-80">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                      <span className="font-bold text-gray-900 text-sm">
                        Official Quotation
                      </span>
                      <div className="p-1.5 bg-white border rounded">
                        <span className="text-lg">📄</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      {msg.content.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.name}</span>
                          <span className="font-medium text-gray-900">
                            {item.price}
                          </span>
                        </div>
                      ))}
                      <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                          Total Amount
                        </span>
                        <span className="font-bold text-brand-primary text-lg">
                          {msg.content.total}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div
                  className={cn(
                    "flex items-center gap-2 mt-1.5 text-[11px] text-gray-400",
                    msg.sender === "me" ? "justify-end" : "justify-start",
                  )}
                >
                  <span>{msg.time}</span>
                  {msg.sender === "me" && (
                    <span>
                      • {msg.status === "read" ? "Read" : "Delivered"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100">
        <div className="relative flex items-end gap-2 bg-white border border-gray-200 rounded-xl p-2 shadow-sm focus-within:ring-1 focus-within:ring-brand-primary/50 focus-within:border-brand-primary">
          <textarea
            placeholder="Type your message here..."
            className="w-full max-h-32 min-h-[44px] py-2.5 px-3 bg-transparent text-sm resize-none focus:outline-none custom-scrollbar"
            rows={1}
          />

          <div className="flex items-center gap-1 pb-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-brand-primary"
            >
              <span className="text-lg">+</span>
            </Button>
          </div>

          <div className="absolute bottom-2 right-2">
            <Button
              size="icon"
              className="h-8 w-8 rounded-lg bg-brand-primary hover:bg-brand-primary/90"
            >
              <FiSend className="w-4 h-4 text-white" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 mt-3 px-1">
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors">
            <span className="text-lg">+</span> Documents
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors">
            <span className="text-lg">📦</span> Products
          </button>
          <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-brand-primary transition-colors">
            <span className="text-lg">💲</span> Offer Price
          </button>
        </div>
      </div>
    </div>
  );
}

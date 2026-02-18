"use client";
import React, { useState } from "react";
import ConversationList from "@/components/dashboard/messages/ConversationList";
import ChatWindow from "@/components/dashboard/messages/ChatWindow";
import ChatProfileSidebar from "@/components/dashboard/messages/ChatProfileSidebar";
import {
  mockConversations,
  featuredProducts,
} from "@/components/dashboard/messages/mockData";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";

export default function BusinessMessagesPage() {
  const [selectedId, setSelectedId] = useState(1);
  const [showMobileChat, setShowMobileChat] = useState(false);

  const selectedConversation = mockConversations.find(
    (c) => c.id === selectedId,
  );

  const handleSelectConversation = (id) => {
    setSelectedId(id);
    setShowMobileChat(true);
  };

  const handleBackToConversations = () => {
    setShowMobileChat(false);
  };

  return (
    <div className="">
      <p className="text-black max-w-[1400px] mt-4 mx-auto flex items-center gap-2">
        {" "}
        <ArrowLeftIcon className="w-4 h-4" /> Back
      </p>
      <div className="h-[calc(100vh-64px)] border border-gray-300 my-4 rounded-2xl max-w-[1400px] mx-auto flex overflow-hidden">
        {/* Left Sidebar - Conversation List */}
        <div
          className={cn(
            "w-full md:w-[320px] border-r border-gray-300 lg:w-[380px] h-full flex-shrink-0 bg-white  transition-all duration-300",
            showMobileChat ? "hidden md:flex" : "flex",
          )}
        >
          <ConversationList
            conversations={mockConversations}
            selectedId={selectedId}
            onSelect={handleSelectConversation}
          />
        </div>

        {/* Center - Chat Window */}
        <div
          className={cn(
            "flex-1 h-full min-w-0 bg-white border-r border-gray-300 transition-all duration-300",
            showMobileChat ? "flex" : "hidden md:flex",
          )}
        >
          <ChatWindow
            conversation={selectedConversation}
            onBack={handleBackToConversations}
          />
        </div>

        {/* Right Sidebar - Profile Info */}
        {/* Hidden on Tablet/Mobile for now, can be a drawer or toggle */}
        <div className="hidden xl:block w-[350px] flex-shrink-0 h-full bg-white border-l border-gray-300">
          <ChatProfileSidebar
            user={selectedConversation?.user}
            products={featuredProducts}
          />
        </div>
      </div>
    </div>
  );
}

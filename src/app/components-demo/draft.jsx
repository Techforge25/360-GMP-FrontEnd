






// // Messages Coming Soon in phase 5

// "use client";
// import React from "react";
// import { FiMessageSquare, FiClock, FiStar, FiUsers } from "react-icons/fi";
// import DashboardFooter from "@/components/dashboard/DashboardFooter";

// export default function UserMessagesPage() {
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Main Content */}
//       <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-[#240457] to-[#9747FF] px-8 py-12 text-center">
//             <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
//               <FiMessageSquare className="w-10 h-10 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold text-white mb-4">
//               Your Messages Hub
//             </h1>
//             <p className="text-white/90 text-lg max-w-[1400px] mx-auto">
//               Stay connected with businesses, get support, and manage all your conversations in one place.
//             </p>
//           </div>

//           {/* Content Section */}
//           <div className="px-8 py-12 text-center">
//             <div className="max-w-[1400px] mx-auto">
//               <div className="w-16 h-16 bg-[#240457]/10 rounded-full flex items-center justify-center mx-auto mb-6">
//                 <FiClock className="w-8 h-8 text-[#240457]" />
//               </div>
              
//               <h2 className="text-2xl font-bold text-gray-900 mb-4">
//                 Coming Soon in Phase 5
//               </h2>
              
//               <p className="text-gray-600 text-lg mb-8 leading-relaxed">
//                 We're developing a comprehensive messaging platform that will make communication with businesses seamless and efficient. Get ready for instant support, order updates, and direct business communication.
//               </p>

//               {/* Features Preview */}
//               <div className="grid md:grid-cols-3 gap-6 mb-8">
//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <div className="w-8 h-8 bg-[#240457] rounded-lg flex items-center justify-center mx-auto mb-3">
//                     <FiMessageSquare className="w-4 h-4 text-white" />
//                   </div>
//                   <h3 className="font-semibold text-gray-900 mb-2">Direct Chat</h3>
//                   <p className="text-sm text-gray-600">Message businesses directly</p>
//                 </div>
                
//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <div className="w-8 h-8 bg-[#9747FF] rounded-lg flex items-center justify-center mx-auto mb-3">
//                     <FiUsers className="w-4 h-4 text-white" />
//                   </div>
//                   <h3 className="font-semibold text-gray-900 mb-2">Group Support</h3>
//                   <p className="text-sm text-gray-600">Community help channels</p>
//                 </div>
                
//                 <div className="p-4 bg-gray-50 rounded-lg">
//                   <div className="w-8 h-8 bg-[#0B8806] rounded-lg flex items-center justify-center mx-auto mb-3">
//                     <FiStar className="w-4 h-4 text-white" />
//                   </div>
//                   <h3 className="font-semibold text-gray-900 mb-2">Order Updates</h3>
//                   <p className="text-sm text-gray-600">Real-time notifications</p>
//                 </div>
//               </div>

//               {/* CTA */}
//               <div className="bg-gradient-to-r from-[#240457] to-[#9747FF] text-white p-6 rounded-xl">
//                 <h3 className="text-lg font-semibold mb-2">
//                   Be the first to know!
//                 </h3>
//                 <p className="text-white/90 mb-4">
//                   Get notified when our messaging feature goes live with early access benefits.
//                 </p>
//                 <button className="bg-white text-[#240457] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
//                   Notify Me
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       <DashboardFooter />
//     </div>
//   );
// }







// "use client";
// import React, { useState } from "react";
// import ConversationList from "@/components/dashboard/messages/ConversationList";
// import ChatWindow from "@/components/dashboard/messages/ChatWindow";
// import ChatProfileSidebar from "@/components/dashboard/messages/ChatProfileSidebar";
// import {
//   mockConversations,
//   featuredProducts,
// } from "@/components/dashboard/messages/mockData";
// import { cn } from "@/lib/utils";
// import { ArrowLeftIcon } from "lucide-react";

// export default function BusinessMessagesPage() {
//   const [selectedId, setSelectedId] = useState(1);
//   const [showMobileChat, setShowMobileChat] = useState(false);

//   const selectedConversation = mockConversations.find(
//     (c) => c.id === selectedId,
//   );

//   const handleSelectConversation = (id) => {
//     setSelectedId(id);
//     setShowMobileChat(true);
//   };

//   const handleBackToConversations = () => {
//     setShowMobileChat(false);
//   };

//   return (
//     <div className="">
//       <p className="text-black max-w-[1400px] mt-4 mx-auto flex items-center gap-2">
//         {" "}
//         <ArrowLeftIcon className="w-4 h-4" /> Back
//       </p>
//       <div className="h-[calc(100vh-64px)] border border-gray-300 my-4 rounded-2xl max-w-[1400px] mx-auto flex overflow-hidden">
//         {/* Left Sidebar - Conversation List */}
//         <div
//           className={cn(
//             "w-full md:w-[320px] border-r border-gray-300 lg:w-[380px] h-full flex-shrink-0 bg-white  transition-all duration-300",
//             showMobileChat ? "hidden md:flex" : "flex",
//           )}
//         >
//           <ConversationList
//             conversations={mockConversations}
//             selectedId={selectedId}
//             onSelect={handleSelectConversation}
//           />
//         </div>

//         {/* Center - Chat Window */}
//         <div
//           className={cn(
//             "flex-1 h-full min-w-0 bg-white border-r border-gray-300 transition-all duration-300",
//             showMobileChat ? "flex" : "hidden md:flex",
//           )}
//         >
//           <ChatWindow
//             conversation={selectedConversation}
//             onBack={handleBackToConversations}
//           />
//         </div>

//         {/* Right Sidebar - Profile Info */}
//         {/* Hidden on Tablet/Mobile for now, can be a drawer or toggle */}
//         <div className="hidden xl:block w-[350px] flex-shrink-0 h-full bg-white border-l border-gray-300">
//           <ChatProfileSidebar
//             user={selectedConversation?.user}
//             products={featuredProducts}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

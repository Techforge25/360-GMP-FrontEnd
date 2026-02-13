"use client";
import React from "react";
import { FiVideo, FiClock, FiCalendar, FiUsers } from "react-icons/fi";

export default function InterviewsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-[#240457] to-[#9747FF] px-8 py-12 text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiVideo className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Interview Management Center
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Schedule, manage, and conduct interviews with top talent
              seamlessly within the platform.
            </p>
          </div>

          {/* Content Section */}
          <div className="px-8 py-12 text-center">
            <div className="max-w-4xl mx-auto">
              <div className="w-16 h-16 bg-[#240457]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiClock className="w-8 h-8 text-[#240457]" />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Coming Soon in Phase 2
              </h2>

              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                We're building an integrated interview platform specifically for
                business owners. Soon you'll be able to schedule video calls,
                manage interview pipelines, and rate candidates directly here.
              </p>

              {/* Features Preview */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#240457] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiVideo className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Video Calls
                  </h3>
                  <p className="text-sm text-gray-600">
                    Built-in high-quality video conferencing
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#9747FF] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiCalendar className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Smart Scheduling
                  </h3>
                  <p className="text-sm text-gray-600">
                    Avoid back-and-forth with automated booking
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-[#0B8806] rounded-lg flex items-center justify-center mx-auto mb-3">
                    <FiUsers className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Candidate Scoring
                  </h3>
                  <p className="text-sm text-gray-600">
                    Collaborative evaluation and ranking
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-[#240457] to-[#9747FF] text-white p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-2">
                  Want to be notified when it's ready?
                </h3>
                <p className="text-white/90 mb-4">
                  We'll send you an update as soon as the interview platform
                  becomes available.
                </p>
                <button className="bg-white text-[#240457] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";
// import React, { useState, useEffect } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   FiArrowLeft,
//   FiPhone,
//   FiVideo,
//   FiMoreVertical,
//   FiPaperclip,
//   FiSend,
// } from "react-icons/fi";

// const InterviewsPage = () => {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const candidateId = searchParams.get("candidateId");
//   const jobId = searchParams.get("jobId");

//   const [selectedCandidate, setSelectedCandidate] = useState(null);
//   const [status, setStatus] = useState("interviewing");
//   const [message, setMessage] = useState("");

//   // Dummy candidates data - replace with actual API call
//   const candidates = [
//     {
//       _id: "1",
//       name: "johns doe",
//       location: "Chicago,IL",
//       experience: "7 Years Of Experience",
//       avatar: "/assets/images/Portrait_Placeholder.png",
//       lastMessage: "1:23 PM",
//       online: true,
//     },
//   ];

//   useEffect(() => {
//     if (candidateId && candidates.length > 0) {
//       const candidate = candidates.find((c) => c._id === candidateId);
//       setSelectedCandidate(candidate || candidates[0]);
//     } else if (candidates.length > 0) {
//       setSelectedCandidate(candidates[0]);
//     }
//   }, [candidateId]);

//   const handleSendMessage = () => {
//     if (message.trim()) {
//       console.log("Sending message:", message);
//       setMessage("");
//     }
//   };

//   const handleBack = () => {
//     router.back();
//   };

//   return (
//     <div className="max-w-[1400px] mx-auto flex h-screen bg-white">
//       {/* Left Sidebar - Candidates List */}
//       <div className="w-80 border-r border-gray-200 flex flex-col">
//         {/* Sidebar Header */}
//         <div className="p-4 border-b border-gray-200">
//           <button
//             onClick={handleBack}
//             className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-3"
//           >
//             <FiArrowLeft className="w-5 h-5" />
//             <span className="text-sm font-medium">Back</span>
//           </button>
//           <div className="flex items-center justify-between">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Home &gt; Business List &gt; Global Manufacturing Co.
//             </h2>
//           </div>
//         </div>

//         {/* Candidates List */}
//         <div className="flex-1 overflow-y-auto">
//           {candidates.map((candidate) => (
//             <div
//               key={candidate._id}
//               onClick={() => setSelectedCandidate(candidate)}
//               className={`p-4 cursor-pointer transition-colors border-b border-gray-100 ${
//                 selectedCandidate?._id === candidate._id
//                   ? "bg-blue-50"
//                   : "hover:bg-gray-50"
//               }`}
//             >
//               <div className="flex items-start gap-3">
//                 <div className="relative">
//                   <img
//                     src={candidate.avatar}
//                     alt={candidate.name}
//                     className="w-12 h-12 rounded-full object-cover"
//                     onError={(e) => {
//                       e.target.src = "/assets/images/Portrait_Placeholder.png";
//                     }}
//                   />
//                   {candidate.online && (
//                     <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between">
//                     <h3 className="font-semibold text-gray-900 text-sm truncate">
//                       {candidate.name}
//                     </h3>
//                     <span className="text-sm text-gray-500">
//                       {candidate.lastMessage}
//                     </span>
//                   </div>
//                   <p className="text-sm text-gray-500 truncate">
//                     {candidate.location} • {candidate.experience}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {selectedCandidate ? (
//           <>
//             {/* Chat Header */}
//             <div className="p-4 border-b border-gray-200 flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <button
//                   onClick={handleBack}
//                   className="lg:hidden text-gray-600 hover:text-gray-900"
//                 >
//                   <FiArrowLeft className="w-5 h-5" />
//                 </button>
//                 <div className="relative">
//                   <img
//                     src={selectedCandidate.avatar}
//                     alt={selectedCandidate.name}
//                     className="w-10 h-10 rounded-full object-cover"
//                     onError={(e) => {
//                       e.target.src = "/assets/images/Portrait_Placeholder.png";
//                     }}
//                   />
//                   {selectedCandidate.online && (
//                     <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
//                   )}
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-900">
//                     {selectedCandidate.name}
//                   </h3>
//                   <p className="text-sm text-gray-500">
//                     {selectedCandidate.location} •{" "}
//                     {selectedCandidate.experience}
//                     {selectedCandidate.online && (
//                       <span className="ml-2 text-green-600">• Online</span>
//                     )}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-6">
//                 {/* Update Status */}
//                 <div className="flex items-center gap-4">
//                   <span className="text-sm font-medium text-gray-700">
//                     Update Status
//                   </span>
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="status"
//                       value="interviewing"
//                       checked={status === "interviewing"}
//                       onChange={(e) => setStatus(e.target.value)}
//                       className="w-4 h-4 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-sm text-gray-700">Interviewing</span>
//                   </label>
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="radio"
//                       name="status"
//                       value="hired"
//                       checked={status === "hired"}
//                       onChange={(e) => setStatus(e.target.value)}
//                       className="w-4 h-4 text-blue-600 focus:ring-blue-500"
//                     />
//                     <span className="text-sm text-gray-700">Hired</span>
//                   </label>
//                 </div>

//                 {/* Action Icons */}
//                 <div className="flex items-center gap-3">
//                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <FiPhone className="w-5 h-5 text-gray-600" />
//                   </button>
//                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <FiVideo className="w-5 h-5 text-gray-600" />
//                   </button>
//                   <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                     <FiMoreVertical className="w-5 h-5 text-gray-600" />
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Messages Area */}
//             <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
//               {/* Date Separator */}
//               <div className="flex justify-center mb-6">
//                 <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-500 shadow-sm">
//                   Today
//                 </span>
//               </div>

//               {/* Sample Messages */}
//               <div className="space-y-4 max-w-3xl mx-auto">
//                 {/* Received Message */}
//                 <div className="flex items-start gap-3">
//                   <img
//                     src={selectedCandidate.avatar}
//                     alt={selectedCandidate.name}
//                     className="w-8 h-8 rounded-full object-cover flex-shrink-0"
//                     onError={(e) => {
//                       e.target.src = "/assets/images/Portrait_Placeholder.png";
//                     }}
//                   />
//                   <div className="flex-1">
//                     <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-md">
//                       <p className="text-sm text-gray-800">
//                         Hello hello can we talk an interview in video call
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-sm text-gray-500">
//                         Today, 9:19 AM
//                       </span>
//                       <span className="text-sm text-blue-600">✓✓</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Sent Message */}
//                 <div className="flex justify-end">
//                   <div className="flex flex-col items-end max-w-md">
//                     <div className="bg-gray-200 rounded-lg rounded-tr-none p-3">
//                       <p className="text-sm text-gray-800">yes bro</p>
//                     </div>
//                     <span className="text-sm text-gray-500 mt-1">
//                       Today, 9:20 AM
//                     </span>
//                   </div>
//                 </div>

//                 {/* Received Message */}
//                 <div className="flex items-start gap-3">
//                   <img
//                     src={selectedCandidate.avatar}
//                     alt={selectedCandidate.name}
//                     className="w-8 h-8 rounded-full object-cover flex-shrink-0"
//                     onError={(e) => {
//                       e.target.src = "/assets/images/Portrait_Placeholder.png";
//                     }}
//                   />
//                   <div className="flex-1">
//                     <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-md">
//                       <p className="text-sm text-gray-800">ok</p>
//                     </div>
//                     <div className="flex items-center gap-2 mt-1">
//                       <span className="text-sm text-gray-500">
//                         Today, 9:20 AM
//                       </span>
//                       <span className="text-sm text-blue-600">✓✓</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Message Input */}
//             <div className="p-4 border-t border-gray-200 bg-white">
//               <div className="flex items-center gap-3 max-w-4xl mx-auto">
//                 <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//                   <FiPaperclip className="w-5 h-5 text-gray-600" />
//                 </button>
//                 <input
//                   type="text"
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyPress={(e) => {
//                     if (e.key === "Enter") handleSendMessage();
//                   }}
//                   placeholder="Message"
//                   className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="w-10 h-10 bg-[#2E1065] hover:bg-[#1a0340] rounded-full flex items-center justify-center transition-colors"
//                 >
//                   <FiSend className="w-5 h-5 text-white" />
//                 </button>
//               </div>
//             </div>
//           </>
//         ) : (
//           <div className="flex-1 flex items-center justify-center text-gray-500">
//             Select a candidate to start messaging
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default InterviewsPage;

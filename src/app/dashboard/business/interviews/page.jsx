"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FiArrowLeft,
  FiPhone,
  FiVideo,
  FiMoreVertical,
  FiPaperclip,
  FiSend,
} from "react-icons/fi";

const InterviewsPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const candidateId = searchParams.get("candidateId");
  const jobId = searchParams.get("jobId");

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [status, setStatus] = useState("interviewing");
  const [message, setMessage] = useState("");

  // Dummy candidates data - replace with actual API call
  const candidates = [
    {
      _id: "1",
      name: "johns doe",
      location: "Chicago,IL",
      experience: "7 Years Of Experience",
      avatar: "/assets/images/Portrait_Placeholder.png",
      lastMessage: "1:23 PM",
      online: true,
    },
  ];

  useEffect(() => {
    if (candidateId && candidates.length > 0) {
      const candidate = candidates.find((c) => c._id === candidateId);
      setSelectedCandidate(candidate || candidates[0]);
    } else if (candidates.length > 0) {
      setSelectedCandidate(candidates[0]);
    }
  }, [candidateId]);

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      setMessage("");
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="max-w-[1400px] mx-auto flex h-screen bg-white">
      {/* Left Sidebar - Candidates List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors mb-3"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Home &gt; Business List &gt; Global Manufacturing Co.
            </h2>
          </div>
        </div>

        {/* Candidates List */}
        <div className="flex-1 overflow-y-auto">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              onClick={() => setSelectedCandidate(candidate)}
              className={`p-4 cursor-pointer transition-colors border-b border-gray-100 ${
                selectedCandidate?._id === candidate._id
                  ? "bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <img
                    src={candidate.avatar}
                    alt={candidate.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "/assets/images/Portrait_Placeholder.png";
                    }}
                  />
                  {candidate.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                      {candidate.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {candidate.lastMessage}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    {candidate.location} • {candidate.experience}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedCandidate ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBack}
                  className="lg:hidden text-gray-600 hover:text-gray-900"
                >
                  <FiArrowLeft className="w-5 h-5" />
                </button>
                <div className="relative">
                  <img
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "/assets/images/Portrait_Placeholder.png";
                    }}
                  />
                  {selectedCandidate.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedCandidate.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    {selectedCandidate.location} •{" "}
                    {selectedCandidate.experience}
                    {selectedCandidate.online && (
                      <span className="ml-2 text-green-600">• Online</span>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                {/* Update Status */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-700">
                    Update Status
                  </span>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="interviewing"
                      checked={status === "interviewing"}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Interviewing</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="hired"
                      checked={status === "hired"}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">Hired</span>
                  </label>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiPhone className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiVideo className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <FiMoreVertical className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              {/* Date Separator */}
              <div className="flex justify-center mb-6">
                <span className="px-3 py-1 bg-white rounded-full text-xs text-gray-500 shadow-sm">
                  Today
                </span>
              </div>

              {/* Sample Messages */}
              <div className="space-y-4 max-w-3xl mx-auto">
                {/* Received Message */}
                <div className="flex items-start gap-3">
                  <img
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.src = "/assets/images/Portrait_Placeholder.png";
                    }}
                  />
                  <div className="flex-1">
                    <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-md">
                      <p className="text-sm text-gray-800">
                        Hello hello can we talk an interview in video call
                      </p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        Today, 9:19 AM
                      </span>
                      <span className="text-xs text-blue-600">✓✓</span>
                    </div>
                  </div>
                </div>

                {/* Sent Message */}
                <div className="flex justify-end">
                  <div className="flex flex-col items-end max-w-md">
                    <div className="bg-gray-200 rounded-lg rounded-tr-none p-3">
                      <p className="text-sm text-gray-800">yes bro</p>
                    </div>
                    <span className="text-xs text-gray-500 mt-1">
                      Today, 9:20 AM
                    </span>
                  </div>
                </div>

                {/* Received Message */}
                <div className="flex items-start gap-3">
                  <img
                    src={selectedCandidate.avatar}
                    alt={selectedCandidate.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.src = "/assets/images/Portrait_Placeholder.png";
                    }}
                  />
                  <div className="flex-1">
                    <div className="bg-white rounded-lg rounded-tl-none p-3 shadow-sm max-w-md">
                      <p className="text-sm text-gray-800">ok</p>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">
                        Today, 9:20 AM
                      </span>
                      <span className="text-xs text-blue-600">✓✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex items-center gap-3 max-w-4xl mx-auto">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiPaperclip className="w-5 h-5 text-gray-600" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") handleSendMessage();
                  }}
                  placeholder="Message"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-10 h-10 bg-[#2E1065] hover:bg-[#1a0340] rounded-full flex items-center justify-center transition-colors"
                >
                  <FiSend className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Select a candidate to start messaging
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewsPage;

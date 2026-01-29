"use client";
import React, { useState } from "react";
import { FiArrowLeft, FiDownload, FiMoreVertical, FiFile } from "react-icons/fi";

const CandidatesView = ({ job, onBack }) => {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  // Dummy data for candidates
  const dummyCandidates = [
    {
      _id: "1",
      name: "Johns Doe",
      location: "Chicago,IL",
      experience: "7 Years Of Experience",
      appliedAgo: "2h Ago",
      matchPercentage: 95,
      avatar: "/assets/images/Portrait_Placeholder.png",
      summary:
        "Experienced Supply Chain Analyst With A Strong Background In GMP Environments. Proven Track Record In Optimizing Inventory Turnover And Reducing Waste. Certified In Six Sigma Green Belt.",
      fullName: "John Doe",
      email: "info@gmail.com",
      about:
        "Lorem ipsum is simply dummy text of the printing and typesetting industry. lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1980s with the release of letraset sheets containing lorem ipsum passages",
      city: "Ottawa-Canada",
      phone: "+1 289 7959631",
      employerQuestions: [
        { question: "How Many Year Of Experience", answer: "4" },
        {
          question: "This Is Urgent Role To Fill Can You Join Immediatiely?",
          answer: "Yes",
        },
        {
          question: "What Is Your Salary Expectation For This Role?",
          answer: "$1000-1500",
        },
      ],
      resume: {
        name: "My Cv.Pdf",
        uploadedAt: "Today 11:23 PM",
      },
      portfolioLink: "https:// portfolio.com",
    },
    {
      _id: "2",
      name: "Jensen",
      location: "Los Angles ,USA",
      experience: "7 Years Of Experience",
      appliedAgo: "2h Ago",
      matchPercentage: 95,
      avatar: "/assets/images/Portrait_Placeholder.png",
      summary:
        "Dedicated logistics professional with extensive experience in supply chain optimization and vendor management.",
      fullName: "Jensen Smith",
      email: "jensen@gmail.com",
      about:
        "Supply chain specialist with proven track record in optimizing logistics operations and reducing costs.",
      city: "Los Angeles, USA",
      phone: "+1 555 1234567",
      employerQuestions: [
        { question: "How Many Year Of Experience", answer: "7" },
        {
          question: "This Is Urgent Role To Fill Can You Join Immediatiely?",
          answer: "Yes",
        },
        {
          question: "What Is Your Salary Expectation For This Role?",
          answer: "$2000-2500",
        },
      ],
      resume: {
        name: "Jensen_Resume.Pdf",
        uploadedAt: "Yesterday 3:45 PM",
      },
      portfolioLink: "https:// jensen-portfolio.com",
    },
    {
      _id: "3",
      name: "Mike",
      location: "Los Angles ,USA",
      experience: "7 Years Of Experience",
      appliedAgo: "2h Ago",
      matchPercentage: 95,
      avatar: "/assets/images/Portrait_Placeholder.png",
      summary:
        "Results-driven analyst with strong analytical skills and experience in data-driven decision making.",
      fullName: "Mike Johnson",
      email: "mike.j@gmail.com",
      about:
        "Passionate about supply chain efficiency and continuous improvement methodologies.",
      city: "San Francisco, USA",
      phone: "+1 555 9876543",
      employerQuestions: [
        { question: "How Many Year Of Experience", answer: "7" },
        {
          question: "This Is Urgent Role To Fill Can You Join Immediatiely?",
          answer: "No",
        },
        {
          question: "What Is Your Salary Expectation For This Role?",
          answer: "$1800-2200",
        },
      ],
      resume: {
        name: "Mike_CV.Pdf",
        uploadedAt: "2 Days Ago",
      },
      portfolioLink: "https:// mike-works.com",
    },
    {
      _id: "4",
      name: "Loreen",
      location: "Los Angles ,USA",
      experience: "7 Years Of Experience",
      appliedAgo: "2h Ago",
      matchPercentage: 70,
      avatar: "/assets/images/Portrait_Placeholder.png",
      summary:
        "Detail-oriented professional with background in inventory management and procurement.",
      fullName: "Loreen Williams",
      email: "loreen.w@gmail.com",
      about:
        "Experienced in managing complex supply chains across multiple regions and industries.",
      city: "New York, USA",
      phone: "+1 555 4567890",
      employerQuestions: [
        { question: "How Many Year Of Experience", answer: "5" },
        {
          question: "This Is Urgent Role To Fill Can You Join Immediatiely?",
          answer: "Yes",
        },
        {
          question: "What Is Your Salary Expectation For This Role?",
          answer: "$1500-1800",
        },
      ],
      resume: {
        name: "Loreen_Resume.Pdf",
        uploadedAt: "3 Days Ago",
      },
      portfolioLink: "https:// loreen-portfolio.com",
    },
    {
      _id: "5",
      name: "Olivia",
      location: "Los Angles ,USA",
      experience: "7 Years Of Experience",
      appliedAgo: "2h Ago",
      matchPercentage: 95,
      avatar: "/assets/images/Portrait_Placeholder.png",
      summary:
        "Strategic thinker with excellent communication skills and leadership experience.",
      fullName: "Olivia Brown",
      email: "olivia.b@gmail.com",
      about:
        "Passionate about driving operational excellence and building high-performing teams.",
      city: "Boston, USA",
      phone: "+1 555 7890123",
      employerQuestions: [
        { question: "How Many Year Of Experience", answer: "8" },
        {
          question: "This Is Urgent Role To Fill Can You Join Immediatiely?",
          answer: "Yes",
        },
        {
          question: "What Is Your Salary Expectation For This Role?",
          answer: "$2200-2800",
        },
      ],
      resume: {
        name: "Olivia_CV.Pdf",
        uploadedAt: "1 Week Ago",
      },
      portfolioLink: "https:// olivia-works.com",
    },
    {
      _id: "6",
      name: "Jensen",
      location: "Los Angles ,USA",
      experience: "7 Years Of Experience",
      appliedAgo: "2h Ago",
      matchPercentage: 95,
      avatar: "/assets/images/Portrait_Placeholder.png",
      summary:
        "Innovative problem solver with strong technical and analytical capabilities.",
      fullName: "Jensen Davis",
      email: "jensen.d@gmail.com",
      about:
        "Focused on leveraging technology to streamline supply chain operations.",
      city: "Seattle, USA",
      phone: "+1 555 2345678",
      employerQuestions: [
        { question: "How Many Year Of Experience", answer: "6" },
        {
          question: "This Is Urgent Role To Fill Can You Join Immediatiely?",
          answer: "Yes",
        },
        {
          question: "What Is Your Salary Expectation For This Role?",
          answer: "$1900-2300",
        },
      ],
      resume: {
        name: "Jensen_D_Resume.Pdf",
        uploadedAt: "4 Days Ago",
      },
      portfolioLink: "https:// jensen-d.com",
    },
    {
      _id: "7",
      name: "Mike",
      location: "Los Angles ,USA",
      experience: "7 Years Of Experience",
      appliedAgo: "2h Ago",
      matchPercentage: 95,
      avatar: "/assets/images/Portrait_Placeholder.png",
      summary:
        "Experienced analyst with strong background in manufacturing and distribution.",
      fullName: "Mike Anderson",
      email: "mike.a@gmail.com",
      about:
        "Dedicated to continuous improvement and lean manufacturing principles.",
      city: "Dallas, USA",
      phone: "+1 555 3456789",
      employerQuestions: [
        { question: "How Many Year Of Experience", answer: "7" },
        {
          question: "This Is Urgent Role To Fill Can You Join Immediatiely?",
          answer: "No",
        },
        {
          question: "What Is Your Salary Expectation For This Role?",
          answer: "$1700-2100",
        },
      ],
      resume: {
        name: "Mike_A_CV.Pdf",
        uploadedAt: "5 Days Ago",
      },
      portfolioLink: "https:// mike-anderson.com",
    },
    {
      _id: "8",
      name: "Loreen",
      location: "Los Angles ,USA",
      experience: "7 Years Of Experience",
      appliedAgo: "2h Ago",
      matchPercentage: 70,
      avatar: "/assets/images/Portrait_Placeholder.png",
      summary:
        "Proactive professional with expertise in vendor relations and contract negotiations.",
      fullName: "Loreen Taylor",
      email: "loreen.t@gmail.com",
      about:
        "Skilled in managing supplier relationships and driving cost savings.",
      city: "Miami, USA",
      phone: "+1 555 4567890",
      employerQuestions: [
        { question: "How Many Year Of Experience", answer: "5" },
        {
          question: "This Is Urgent Role To Fill Can You Join Immediatiely?",
          answer: "Yes",
        },
        {
          question: "What Is Your Salary Expectation For This Role?",
          answer: "$1400-1700",
        },
      ],
      resume: {
        name: "Loreen_T_Resume.Pdf",
        uploadedAt: "1 Week Ago",
      },
      portfolioLink: "https:// loreen-t.com",
    },
  ];

  // Set first candidate as selected by default
  const currentCandidate = selectedCandidate || dummyCandidates[0];

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return "bg-green-100 text-green-700";
    if (percentage >= 70) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            Candidates: ({job?.jobTitle || "Lead Supply Chain Analyst"})
          </h1>
          <p className="text-sm text-gray-500">
            Total {dummyCandidates.length} • (3 New In This Week)
          </p>
        </div>
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors self-start sm:self-auto"
        >
          <FiArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* Left Sidebar - Candidates List */}
        <div className="w-full lg:w-72 xl:w-80 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white overflow-y-auto max-h-64 lg:max-h-[600px]">
          <div className="p-3 space-y-2">
            {dummyCandidates.map((candidate) => (
              <div
                key={candidate._id}
                onClick={() => setSelectedCandidate(candidate)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  currentCandidate?._id === candidate._id
                    ? "border-2 border-blue-500 bg-blue-50/50"
                    : "border border-gray-200 hover:border-gray-300 bg-white"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                      {candidate.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate">
                      {candidate.location} • {candidate.experience}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Applied {candidate.appliedAgo}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 px-2 py-0.5 rounded text-xs font-medium ${getMatchColor(
                      candidate.matchPercentage
                    )}`}
                  >
                    {candidate.matchPercentage} % Match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Content - Candidate Details */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 max-h-[600px]">
          {currentCandidate ? (
            <div className="max-w-3xl mx-auto">
              {/* Profile Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <img
                      src={currentCandidate.avatar}
                      alt={currentCandidate.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src =
                          "/assets/images/Portrait_Placeholder.png";
                      }}
                    />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-base sm:text-lg">
                      {currentCandidate.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {currentCandidate.location} •{" "}
                      {currentCandidate.experience}
                    </p>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiMoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* Summary */}
              <div className="bg-gray-100 rounded-xl p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
                <p className="text-sm text-amber-700">
                  {currentCandidate.summary}
                </p>
              </div>

              {/* General Information */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  General Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Full Name
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      {currentCandidate.fullName}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Email Address
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      {currentCandidate.email}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      About
                    </label>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {currentCandidate.about}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      City , State
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      {currentCandidate.city}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 block mb-1">
                      Phone
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      {currentCandidate.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Employer Question */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Employer Question
                </h3>

                <div className="space-y-4">
                  {currentCandidate.employerQuestions.map((item, index) => (
                    <div key={index}>
                      <label className="text-xs text-gray-500 block mb-1">
                        {item.question}
                      </label>
                      <p className="text-sm text-gray-900 font-medium">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resume */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Resume</h3>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                      <FiFile className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {currentCandidate.resume.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Uploaded {currentCandidate.resume.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[#240457] text-[#240457] rounded-full text-sm font-medium hover:bg-[#240457]/5 transition-colors">
                    Download Resume
                    <FiDownload className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Portfolio Link */}
              <div className="mb-8">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Portfolio Link
                </h3>
                <a
                  href={currentCandidate.portfolioLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {currentCandidate.portfolioLink}
                </a>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-4">
                <button className="w-full sm:w-auto px-8 py-3 bg-[#240457] text-white rounded-lg font-semibold hover:bg-[#1a0340] transition-colors flex items-center justify-center gap-2">
                  Move To Interview
                  <span>→</span>
                </button>
                <button className="w-full sm:w-auto px-8 py-3 border-2 border-orange-400 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Reject
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              Select a candidate to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidatesView;

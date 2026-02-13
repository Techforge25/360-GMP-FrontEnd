"use client";
import jobAPI from "@/services/jobAPI";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  FiArrowLeft,
  FiDownload,
  FiMoreVertical,
  FiFile,
} from "react-icons/fi";

const CandidatesView = ({ job, onBack }) => {
  const router = useRouter();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleMoveToInterview = () => {
    if (currentCandidate && job) {
      router.push(
        `/dashboard/business/interviews?candidateId=${currentCandidate._id}&jobId=${job._id}`,
      );
    }
  };

  React.useEffect(() => {
    const fetchCandidates = async () => {
      try {
        if (!job?._id) return;
        setLoading(true);
        const response = await jobAPI.getJobApplications(job._id);
        if (response?.success && response?.data) {
          // Map backend data to frontend structure
          const mappedCandidates = (response.data.docs || response.data).map(
            (app) => ({
              _id: app._id,
              applicationId: app._id,
              userProfileId: app.userProfileId?._id,
              name:
                app.userProfileId?.fullName ||
                `${app.userProfileId?.firstName || ""} ${app.userProfileId?.lastName || ""}`.trim() ||
                "Unknown Candidate",
              location:
                app.userProfileId?.location ||
                `${app.userProfileId?.city || ""}${app.userProfileId?.city && app.userProfileId?.country ? ", " : ""}${app.userProfileId?.country || ""}`.trim() ||
                "Location not specified",
              experience: `${app.yearsOfExperience || 0} Years Of Experience`,
              appliedAgo: new Date(app.createdAt).toLocaleDateString(),
              matchPercentage: 0,
              avatar:
                app.userProfileId?.logo ||
                "/assets/images/Portrait_Placeholder.png",
              // summary: app.userProfileId?.bio || "No summary provided",
              fullName:
                app.userProfileId?.fullName ||
                `${app.userProfileId?.firstName || ""} ${app.userProfileId?.lastName || ""}`.trim(),
              email: app.userProfileId?.email,
              about: app.userProfileId?.bio,
              city:
                app.userProfileId?.location ||
                `${app.userProfileId?.city || ""}${app.userProfileId?.city && app.userProfileId?.country ? ", " : ""}${app.userProfileId?.country || ""}`.trim(),
              phone: app.userProfileId?.phone,
              employerQuestions: [
                {
                  question: "How Many Year Of Experience",
                  answer: app.yearsOfExperience?.toString() || "N/A",
                },
                {
                  question:
                    "This Is Urgent Role To Fill Can You Join Immediatiely?",
                  answer: app.immediateJoiningStatus || "N/A",
                },
                {
                  question: "What Is Your Salary Expectation For This Role?",
                  answer: app.expectedSalary || "N/A",
                },
              ],
              resume: {
                name: app.resumeUrl ? "Resume.pdf" : "No Resume",
                url: app.resumeUrl,
                uploadedAt: new Date(app.createdAt).toLocaleDateString(),
              },
              portfolioLink: app.portfolioLink,
              status: app.status,
            }),
          );
          setCandidates(mappedCandidates);
          if (mappedCandidates.length > 0) {
            setSelectedCandidate(mappedCandidates[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch candidates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, [job]);

  const currentCandidate = selectedCandidate;

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return "bg-green-100 text-green-700";
    if (percentage >= 70) return "bg-amber-100 text-amber-700";
    return "bg-red-100 text-red-700";
  };

  const calculateNewCandidates = () => {
    // Logic to count candidates from last 7 days
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    return candidates.filter((c) => new Date(c.appliedAgo) > oneWeekAgo).length;
  };

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 flex justify-center items-center h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E1065]"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 sm:px-6 py-4 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-gray-900">
            Candidates: ({job?.jobTitle || "Job Title"})
          </h1>
          <p className="text-sm text-gray-500">
            Total {candidates.length} • ({calculateNewCandidates()} New In This
            Week)
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
      <div className="flex flex-col lg:flex-row min-h-[600px] bg-white">
        {/* Left Sidebar - Candidates List */}
        <div className="w-full lg:w-72 xl:w-80 border-b lg:border-b-0 lg:border-r border-gray-200 bg-white overflow-y-auto max-h-64 lg:max-h-[600px]">
          {candidates.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No candidates found for this job.
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {candidates.map((candidate) => (
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
                      <p className="text-sm text-gray-500 truncate">
                        {candidate.location} • {candidate.experience}
                      </p>
                      <p className="text-sm text-blue-600 mt-1">
                        Applied {candidate.appliedAgo}
                      </p>
                    </div>
                    {/* <span
                      className={`shrink-0 px-2 py-0.5 rounded text-sm font-medium ${getMatchColor(
                        candidate.matchPercentage
                      )}`}
                    >
                      {candidate.matchPercentage} % Match
                    </span> */}
                  </div>
                </div>
              ))}
            </div>
          )}
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
                {/* <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FiMoreVertical className="w-5 h-5 text-gray-500" />
                </button> */}
              </div>

              {/* Summary */}
              {/* {currentCandidate.summary && (
                <div className="bg-gray-100 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Summary</h3>
                  <p className="text-sm text-amber-700">
                    {currentCandidate.summary}
                  </p>
                </div>
              )} */}

              {/* General Information */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-4">
                  General Information
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 block mb-1">
                      Full Name
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      {currentCandidate.fullName || "N/A"}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">
                      Email Address
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      {currentCandidate.email || "N/A"}
                    </p>
                  </div>

                  {currentCandidate.about && (
                    <div>
                      <label className="text-sm text-gray-500 block mb-1">
                        About
                      </label>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {currentCandidate.about}
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">
                      City , State
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      {currentCandidate.city || currentCandidate.location}
                    </p>
                  </div>

                  <div>
                    <label className="text-sm text-gray-500 block mb-1">
                      Phone
                    </label>
                    <p className="text-sm text-gray-900 font-medium">
                      {currentCandidate.phone || "N/A"}
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
                      <label className="text-sm text-gray-500 block mb-1">
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
                {currentCandidate.resume.url ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-gray-200 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <FiFile className="w-5 h-5 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {currentCandidate.resume.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          Uploaded {currentCandidate.resume.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <a
                      href={currentCandidate.resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-[#240457] text-[#240457] rounded-full text-sm font-medium hover:bg-[#240457]/5 transition-colors"
                    >
                      Download Resume
                      <FiDownload className="w-4 h-4" />
                    </a>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No resume uploaded
                  </p>
                )}
              </div>

              {/* Portfolio Link */}
              {currentCandidate.portfolioLink && (
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
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pb-4">
                <button
                  onClick={handleMoveToInterview}
                  className="w-full sm:w-auto px-8 py-3 bg-[#240457] text-white rounded-lg font-semibold hover:bg-[#1a0340] transition-colors flex items-center justify-center gap-2"
                >
                  Move To Interview
                  <span>→</span>
                </button>
                {/* <button className="w-full sm:w-auto px-8 py-3 border-2 border-orange-400 text-orange-500 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Reject
                </button> */}
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

"use client";
import React, { useState, useEffect } from "react";
import { FiPlus, FiBriefcase, FiEdit2, FiTrash2 } from "react-icons/fi";
import workExperienceAPI from "@/services/workExperienceAPI";
import WorkExperienceModal from "./WorkExperienceModal";

const UserExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showExperienceModal, setShowExperienceModal] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);

  useEffect(() => {
    fetchWorkExperiences();

    // Listen for work experience updates from UserSidebar
    const handleWorkExperienceUpdate = () => {
      fetchWorkExperiences();
    };

    window.addEventListener('workExperienceUpdated', handleWorkExperienceUpdate);

    return () => {
      window.removeEventListener('workExperienceUpdated', handleWorkExperienceUpdate);
    };
  }, []);

  const fetchWorkExperiences = async () => {
    try {
      setIsLoading(true);
      const response = await workExperienceAPI.getMyWorkExperiences();
      if (response?.data) {
        setExperiences(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch work experiences:", error);
      setExperiences([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddExperience = () => {
    setEditingExperience(null);
    setShowExperienceModal(true);
  };

  const handleEditExperience = (experience) => {
    setEditingExperience(experience);
    setShowExperienceModal(true);
  };

  const handleSaveExperience = async (experienceData) => {
    try {
      if (editingExperience) {
        // Update existing experience
        const response = await workExperienceAPI.update(editingExperience._id, experienceData);
        if (response?.data) {
          setExperiences(prev => 
            prev.map(exp => exp._id === editingExperience._id ? response.data : exp)
          );
        }
      } else {
        // Create new experience
        await workExperienceAPI.create(experienceData);
        // Fetch updated list
        await fetchWorkExperiences();
      }
      setShowExperienceModal(false);
    } catch (error) {
      console.error('Failed to save work experience:', error);
      throw error;
    }
  };

  const handleDeleteExperience = async (experienceId) => {
    if (!confirm('Are you sure you want to delete this work experience?')) return;
    
    try {
      await workExperienceAPI.delete(experienceId);
      setExperiences(prev => prev.filter(exp => exp._id !== experienceId));
    } catch (error) {
      console.error('Failed to delete work experience:', error);
      alert('Failed to delete work experience. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const calculateDuration = (startDate, endDate, isCurrentlyWorking) => {
    const start = new Date(startDate);
    const end = isCurrentlyWorking ? new Date() : new Date(endDate);
    
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    
    let totalMonths = years * 12 + months;
    if (totalMonths < 0) totalMonths = 0;
    
    const displayYears = Math.floor(totalMonths / 12);
    const displayMonths = totalMonths % 12;
    
    let duration = '';
    if (displayYears > 0) duration += `${displayYears} year${displayYears > 1 ? 's' : ''}`;
    if (displayMonths > 0) {
      if (duration) duration += ' ';
      duration += `${displayMonths} month${displayMonths > 1 ? 's' : ''}`;
    }
    
    return duration || '1 month';
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-purple-100/50 flex items-center justify-center text-[#240457]">
              <FiBriefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </span>
            Work Experience
          </h2>
        </div>

        {isLoading ? (
          <div className="space-y-6 sm:space-y-8">
            {[1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : experiences.length > 0 ? (
          <div className="relative border-l-2 border-gray-100 ml-2 sm:ml-3 space-y-6 sm:space-y-8 lg:space-y-10 pl-4 sm:pl-6 lg:pl-8 pb-2 sm:pb-4">
            {experiences.map((exp, index) => (
              <div key={exp._id} className="relative group">
                {/* Timeline Dot */}
                <div className={`absolute -left-[23px] sm:-left-[31px] lg:-left-[39px] top-1.5 w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-white shadow-sm ${exp.isCurrentlyWorking ? "bg-[#240457]" : "bg-[#240457]"}`}></div>

                {/* Action Buttons */}
                <div className="absolute top-0 right-0 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleEditExperience(exp)}
                    className="text-gray-400 hover:text-blue-500 p-1.5 bg-white rounded shadow-sm border border-gray-100"
                    title="Edit experience"
                  >
                    <FiEdit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(exp._id)}
                    className="text-gray-400 hover:text-red-500 p-1.5 bg-white rounded shadow-sm border border-gray-100"
                    title="Delete experience"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mb-1 pr-16">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">{exp.jobTitle}</h3>
                  <p className="text-sm sm:text-sm font-medium text-[#556179] mb-0.5 sm:mb-1">
                    {exp.companyName}
                  </p>
                  <p className="text-sm sm:text-sm text-[#240457] mb-1 sm:mb-2">
                    {formatDate(exp.startDate)} – {exp.isCurrentlyWorking ? 'Present' : formatDate(exp.endDate)} 
                    {" "} ({calculateDuration(exp.startDate, exp.endDate, exp.isCurrentlyWorking)})
                  </p>
                  {exp.employmentType?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2">
                      {exp.employmentType.map((type, typeIndex) => (
                        <span key={typeIndex} className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                          {type}
                        </span>
                      ))}
                    </div>
                  )}
                  {exp.location && (
                    <p className="text-sm sm:text-sm text-gray-500 mb-2">{exp.location}</p>
                  )}
                </div>

                {exp.description && (
                  <div className="pr-16">
                    <p className="text-sm sm:text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiBriefcase className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No work experience yet</h3>
            <p className="text-gray-500 mb-4">Add your work experience to showcase your professional journey</p>
            <button 
              onClick={handleAddExperience}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#240457] text-white rounded-lg hover:bg-[#240457]/90 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              Add Your First Experience
            </button>
          </div>
        )}


      </div>

      {/* Work Experience Modal */}
      {showExperienceModal && (
        <WorkExperienceModal
          isOpen={showExperienceModal}
          onClose={() => setShowExperienceModal(false)}
          onSave={handleSaveExperience}
          editingExperience={editingExperience}
        />
      )}
    </>
  );
};

export default UserExperience;
